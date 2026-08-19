import { EVENTS_REGISTRY, getEventById, getSheetUrl } from '../src/config/events.ts';
import { EventDataResponse, NormalizedRegistration, OverviewMetrics, EventStat } from '../src/types.ts';
import { parseCSV } from '../src/parsers/csv.ts';
import { parseEventRows } from '../src/parsers/index.ts';
import { VIGNETTE_SNAPSHOT_ROWS, PICASSOS_PIXELS_SNAPSHOT_ROWS } from '../src/fallback/snapshots.ts';
import { fetchLivePOCs } from './pocFetcher.ts';

interface CacheEntry {
  data: EventDataResponse;
  expiresAt: number;
}

const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL
const cache = new Map<string, CacheEntry>();

export async function fetchEventData(eventId: string, forceRefresh = false): Promise<EventDataResponse> {
  const event = getEventById(eventId);
  if (!event) {
    throw new Error(`Event with ID ${eventId} not found`);
  }

  const livePocMap = await fetchLivePOCs(forceRefresh);
  const livePocs = livePocMap[eventId] || [];

  const cacheKey = `event_${eventId}`;
  const now = Date.now();

  if (!forceRefresh && cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)!;
    if (cached.expiresAt > now) {
      return {
        ...cached.data,
        pocs: livePocs,
      };
    }
  }

  const sheetUrl = getSheetUrl(event.sheetId);

  // If no sheet ID configured yet
  if (!event.sheetId) {
    const response: EventDataResponse = {
      eventId: event.id,
      eventName: event.name,
      records: [],
      totalCount: 0,
      lastUpdated: new Date().toISOString(),
      source: 'not_configured',
      sheetUrl: null,
      unstopUrl: event.unstopUrl,
      formUrl: event.formUrl,
      pocs: livePocs,
    };
    cache.set(cacheKey, { data: response, expiresAt: now + CACHE_TTL_MS });
    return response;
  }

  // Attempt live Google Sheet fetch
  try {
    const exportUrl = `https://docs.google.com/spreadsheets/d/${event.sheetId}/export?format=csv`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(exportUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) EventsCults/1.0',
        'Accept': 'text/csv, text/plain, */*',
      },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const csvText = await res.text();
      if (!csvText.trim().startsWith('<!DOCTYPE') && !csvText.trim().startsWith('<html')) {
        const rawRows = parseCSV(csvText);
        if (rawRows.length > 0) {
          const records = parseEventRows(eventId, rawRows);
          const response: EventDataResponse = {
            eventId: event.id,
            eventName: event.name,
            records,
            totalCount: records.length,
            lastUpdated: new Date().toISOString(),
            source: 'live',
            sheetUrl,
            unstopUrl: event.unstopUrl,
            formUrl: event.formUrl,
            pocs: livePocs,
          };
          cache.set(cacheKey, { data: response, expiresAt: now + CACHE_TTL_MS });
          return response;
        }
      }
    }
  } catch (err) {
    console.warn(`[SheetFetcher] Live fetch failed for event ${eventId} (${event.name}):`, (err as Error).message);
  }

  // Secondary live attempt with gviz endpoint
  try {
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${event.sheetId}/gviz/tq?tqx=out:csv`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(gvizUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const csvText = await res.text();
      if (!csvText.trim().startsWith('<!DOCTYPE') && !csvText.trim().startsWith('<html')) {
        const rawRows = parseCSV(csvText);
        if (rawRows.length > 0) {
          const records = parseEventRows(eventId, rawRows);
          const response: EventDataResponse = {
            eventId: event.id,
            eventName: event.name,
            records,
            totalCount: records.length,
            lastUpdated: new Date().toISOString(),
            source: 'live',
            sheetUrl,
            unstopUrl: event.unstopUrl,
            formUrl: event.formUrl,
            pocs: livePocs,
          };
          cache.set(cacheKey, { data: response, expiresAt: now + CACHE_TTL_MS });
          return response;
        }
      }
    }
  } catch {
    // Continue to fallback snapshot
  }

  // Fallback to authentic snapshot if available
  let fallbackRecords: NormalizedRegistration[] = [];
  if (eventId === '07') {
    fallbackRecords = parseEventRows('07', VIGNETTE_SNAPSHOT_ROWS);
  } else if (eventId === '10') {
    fallbackRecords = parseEventRows('10', PICASSOS_PIXELS_SNAPSHOT_ROWS);
  }

  const response: EventDataResponse = {
    eventId: event.id,
    eventName: event.name,
    records: fallbackRecords,
    totalCount: fallbackRecords.length,
    lastUpdated: new Date().toISOString(),
    source: fallbackRecords.length > 0 ? 'fallback' : 'live',
    sheetUrl,
    unstopUrl: event.unstopUrl,
    formUrl: event.formUrl,
    pocs: livePocs,
    error: fallbackRecords.length === 0 ? 'Live sheet is connecting. Access directly using shortcut.' : undefined,
  };

  cache.set(cacheKey, { data: response, expiresAt: now + 30000 });
  return response;
}

export async function fetchAllEventsDatabase(forceRefresh = false): Promise<NormalizedRegistration[]> {
  const promises = EVENTS_REGISTRY.map((event) => fetchEventData(event.id, forceRefresh));
  const results = await Promise.allSettled(promises);

  const allRecords: NormalizedRegistration[] = [];
  results.forEach((res) => {
    if (res.status === 'fulfilled' && res.value.records) {
      allRecords.push(...res.value.records);
    }
  });

  return allRecords;
}

export async function fetchOverviewMetrics(forceRefresh = false): Promise<OverviewMetrics> {
  const [eventResults, livePocMap] = await Promise.all([
    Promise.allSettled(EVENTS_REGISTRY.map((event) => fetchEventData(event.id, forceRefresh))),
    fetchLivePOCs(forceRefresh),
  ]);

  let totalRegistrations = 0;
  let totalParticipants = 0;
  let totalSubmissions = 0;
  const eventStats: EventStat[] = [];

  eventResults.forEach((res, index) => {
    const event = EVENTS_REGISTRY[index];
    const livePocsForEvent = livePocMap[event.id] || [];

    if (res.status === 'fulfilled') {
      const records = res.value.records || [];
      const regCount = records.length;
      let partCount = 0;
      let subCount = 0;

      records.forEach((r) => {
        partCount += r.participantCount || (r.participants && r.participants.length > 0 ? r.participants.length : 1);
        if (r.submissions && r.submissions.length > 0) {
          subCount += r.submissions.filter((s) => Boolean(s.url && s.url.trim())).length;
        }
      });

      totalRegistrations += regCount;
      totalParticipants += partCount;
      totalSubmissions += subCount;

      eventStats.push({
        id: event.id,
        number: event.number,
        name: event.name,
        registrationCount: regCount,
        participantCount: partCount,
        submissionCount: subCount,
        pocCount: livePocsForEvent.length,
      });
    } else {
      eventStats.push({
        id: event.id,
        number: event.number,
        name: event.name,
        registrationCount: 0,
        participantCount: 0,
        submissionCount: 0,
        pocCount: livePocsForEvent.length,
      });
    }
  });

  return {
    totalEvents: EVENTS_REGISTRY.length,
    totalRegistrations,
    totalParticipants,
    totalSubmissions,
    lastUpdated: new Date().toISOString(),
    eventStats,
  };
}
