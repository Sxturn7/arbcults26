import { EVENTS_REGISTRY, getEventById, getSheetUrl } from '../config/events.ts';
import { EventDataResponse, NormalizedRegistration, OverviewMetrics, EventStat, POC } from '../types.ts';
import { parseCSV, parseCSVToMatrix } from '../parsers/csv.ts';
import { parseEventRows } from '../parsers/index.ts';
import { VIGNETTE_SNAPSHOT_ROWS, PICASSOS_PIXELS_SNAPSHOT_ROWS } from '../fallback/snapshots.ts';

export const POC_SHEET_ID = '1vkNTHQx9XmbPDiCEWkcCs3iJ5pT7rrTXIU-i7W4qpcI';

interface CacheEntry {
  data: EventDataResponse;
  expiresAt: number;
}

const CACHE_TTL_MS = 60 * 1000;
const eventCache = new Map<string, CacheEntry>();

interface CachedPocData {
  pocsByEventId: Record<string, POC[]>;
  allPocs: Array<POC & { eventId: string; eventName: string }>;
  expiresAt: number;
}

let pocCache: CachedPocData | null = null;

export const EVENT_NAME_TO_ID: Record<string, string> = {
  'bailar': '01',
  'verve': '02',
  'delirium': '03',
  'euphony': '04',
  'hallabol': '05',
  'halla bol': '05',
  'proscenium': '06',
  'vignette': '07',
  'vanity': '08',
  'iso': '09',
  "piccaso's pixels": '10',
  'picassos pixels': '10',
  "picasso's pixels": '10',
  'picasso’s pixels': '10',
  'piccaso': '10',
  'picasso': '10',
  'cypher': '11',
  'eloquence': '12',
  'ad-o-mania': '13',
  'adomania': '13',
  'ad o mania': '13',
  'quintessence': '14',
  'sonata': '15',
};

export function normalizeEventNameToId(rawName: string): string | null {
  if (!rawName) return null;
  const clean = rawName
    .toLowerCase()
    .replace(/[–—_]/g, ' ')
    .replace(/['’]/g, "'")
    .trim();

  for (const [key, id] of Object.entries(EVENT_NAME_TO_ID)) {
    if (clean === key || clean.startsWith(key) || clean.includes(key)) {
      return id;
    }
  }
  return null;
}

export async function fetchLivePOCsClient(forceRefresh = false): Promise<Record<string, POC[]>> {
  const now = Date.now();
  if (!forceRefresh && pocCache && pocCache.expiresAt > now) {
    return pocCache.pocsByEventId;
  }

  const pocsByEventId: Record<string, POC[]> = {
    '01': [],
    '02': [],
    '03': [],
    '04': [],
    '05': [],
    '06': [],
    '07': [],
    '08': [],
    '09': [],
    '10': [],
    '11': [],
    '12': [],
    '13': [],
    '14': [],
    '15': [],
  };
  const allPocs: Array<POC & { eventId: string; eventName: string }> = [];

  const endpoints = [
    `https://docs.google.com/spreadsheets/d/${POC_SHEET_ID}/gviz/tq?tqx=out:csv`,
    `https://docs.google.com/spreadsheets/d/${POC_SHEET_ID}/export?format=csv`,
  ];

  for (const url of endpoints) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);

      if (res.ok) {
        const csvText = await res.text();
        if (!csvText.trim().startsWith('<!DOCTYPE') && !csvText.trim().startsWith('<html')) {
          const rows = parseCSVToMatrix(csvText);
          let currentEventId: string | null = null;
          let currentEventRawName = '';

          for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length === 0) continue;

            const colEvent = (row[0] || '').trim();
            const colName = (row[1] || '').trim();
            const colContact = (row[2] || '').trim();
            const colDesc = (row[3] || '').trim();

            if (colEvent) {
              const matchedId = normalizeEventNameToId(colEvent) || normalizeEventNameToId(colDesc);
              if (matchedId) {
                currentEventId = matchedId;
                currentEventRawName = colEvent;
              }
            }

            if (currentEventId && (colName || colContact)) {
              const cleanName = colName.replace(/\s+/g, ' ').trim();
              const cleanPhone = colContact.replace(/\s+/g, ' ').trim();

              if (cleanName || cleanPhone) {
                const pocObj: POC = {
                  name: cleanName.toUpperCase() || 'EVENT POC',
                  phone: cleanPhone || 'CONTACT PENDING',
                };

                const exists = pocsByEventId[currentEventId].some(
                  (p) => p.name.toUpperCase() === pocObj.name.toUpperCase() && p.phone === pocObj.phone
                );

                if (!exists) {
                  pocsByEventId[currentEventId].push(pocObj);
                  allPocs.push({
                    ...pocObj,
                    eventId: currentEventId,
                    eventName: currentEventRawName.toUpperCase(),
                  });
                }
              }
            }
          }

          pocCache = {
            pocsByEventId,
            allPocs,
            expiresAt: now + CACHE_TTL_MS,
          };

          return pocsByEventId;
        }
      }
    } catch {
      // Continue to next endpoint
    }
  }

  return pocCache?.pocsByEventId || pocsByEventId;
}

export async function fetchEventDataClient(eventId: string, forceRefresh = false): Promise<EventDataResponse> {
  const event = getEventById(eventId);
  if (!event) {
    throw new Error(`Event with ID ${eventId} not found`);
  }

  const livePocMap = await fetchLivePOCsClient(forceRefresh);
  const livePocs = livePocMap[eventId] || [];

  const cacheKey = `event_${eventId}`;
  const now = Date.now();

  if (!forceRefresh && eventCache.has(cacheKey)) {
    const cached = eventCache.get(cacheKey)!;
    if (cached.expiresAt > now) {
      return {
        ...cached.data,
        pocs: livePocs,
      };
    }
  }

  const sheetUrl = getSheetUrl(event.sheetId);

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
    eventCache.set(cacheKey, { data: response, expiresAt: now + CACHE_TTL_MS });
    return response;
  }

  const fetchUrls = [
    `https://docs.google.com/spreadsheets/d/${event.sheetId}/gviz/tq?tqx=out:csv`,
    `https://docs.google.com/spreadsheets/d/${event.sheetId}/export?format=csv`,
  ];

  for (const exportUrl of fetchUrls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(exportUrl, { signal: controller.signal });
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
            eventCache.set(cacheKey, { data: response, expiresAt: now + CACHE_TTL_MS });
            return response;
          }
        }
      }
    } catch {
      // Continue to next URL
    }
  }

  // Fallback to snapshot if available
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

  eventCache.set(cacheKey, { data: response, expiresAt: now + 30000 });
  return response;
}

export async function fetchAllEventsDatabaseClient(forceRefresh = false): Promise<NormalizedRegistration[]> {
  const promises = EVENTS_REGISTRY.map((event) => fetchEventDataClient(event.id, forceRefresh));
  const results = await Promise.allSettled(promises);

  const allRecords: NormalizedRegistration[] = [];
  results.forEach((res) => {
    if (res.status === 'fulfilled' && res.value.records) {
      allRecords.push(...res.value.records);
    }
  });

  return allRecords;
}

export async function fetchOverviewMetricsClient(forceRefresh = false): Promise<OverviewMetrics> {
  const [eventResults, livePocMap] = await Promise.all([
    Promise.allSettled(EVENTS_REGISTRY.map((event) => fetchEventDataClient(event.id, forceRefresh))),
    fetchLivePOCsClient(forceRefresh),
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

      const effectivePocCount = livePocsForEvent.length > 0 ? livePocsForEvent.length : (event.pocs ? event.pocs.length : 0);

      eventStats.push({
        id: event.id,
        number: event.number,
        name: event.name,
        registrationCount: regCount,
        participantCount: partCount,
        submissionCount: subCount,
        pocCount: effectivePocCount,
      });
    } else {
      const effectivePocCount = livePocsForEvent.length > 0 ? livePocsForEvent.length : (event.pocs ? event.pocs.length : 0);
      eventStats.push({
        id: event.id,
        number: event.number,
        name: event.name,
        registrationCount: 0,
        participantCount: 0,
        submissionCount: 0,
        pocCount: effectivePocCount,
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
