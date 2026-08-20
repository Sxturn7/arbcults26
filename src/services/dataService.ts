import { OverviewMetrics, EventDataResponse, NormalizedRegistration, POC } from '../types.ts';
import {
  fetchOverviewMetricsClient,
  fetchEventDataClient,
  fetchAllEventsDatabaseClient,
  fetchLivePOCsClient,
} from './sheetFetcherClient.ts';

export async function getOverviewMetrics(forceRefresh = false): Promise<OverviewMetrics> {
  // First attempt via /api/overview
  try {
    const res = await fetch(`/api/overview${forceRefresh ? '?refresh=true' : ''}`);
    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.data) {
        // If API returned meaningful data (or if events were actually fetched)
        if (json.data.eventStats && json.data.eventStats.length > 0) {
          const totalRegs = json.data.totalRegistrations || 0;
          // If totalRegs > 0 or it's genuinely loaded, return it
          if (totalRegs > 0) {
            return json.data;
          }
        }
      }
    }
  } catch (err) {
    console.warn('[DataService] /api/overview failed or unreachable, switching to direct client fetch:', err);
  }

  // Universal client fallback directly querying Google Sheets
  return fetchOverviewMetricsClient(forceRefresh);
}

export async function getEventData(eventId: string, forceRefresh = false): Promise<EventDataResponse> {
  // First attempt via /api/events/:id
  try {
    const res = await fetch(`/api/events/${eventId}${forceRefresh ? '?refresh=true' : ''}`);
    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.data) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn(`[DataService] /api/events/${eventId} failed, switching to direct client fetch:`, err);
  }

  // Universal client fallback directly querying Google Sheets
  return fetchEventDataClient(eventId, forceRefresh);
}

export async function getMasterDatabase(forceRefresh = false): Promise<NormalizedRegistration[]> {
  // First attempt via /api/database
  try {
    const res = await fetch(`/api/database${forceRefresh ? '?refresh=true' : ''}`);
    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.data && Array.isArray(json.data.records)) {
        if (json.data.records.length > 0) {
          return json.data.records;
        }
      }
    }
  } catch (err) {
    console.warn('[DataService] /api/database failed, switching to direct client fetch:', err);
  }

  // Universal client fallback
  return fetchAllEventsDatabaseClient(forceRefresh);
}

export async function getLivePOCs(forceRefresh = false): Promise<Record<string, POC[]>> {
  // First attempt via /api/pocs
  try {
    const res = await fetch(`/api/pocs${forceRefresh ? '?refresh=true' : ''}`);
    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.data) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn('[DataService] /api/pocs failed, switching to direct client fetch:', err);
  }

  // Universal client fallback
  return fetchLivePOCsClient(forceRefresh);
}
