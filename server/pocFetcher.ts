import { parseCSVToMatrix } from '../src/parsers/csv.ts';
import { POC } from '../src/types.ts';

export const POC_SHEET_ID = '1vkNTHQx9XmbPDiCEWkcCs3iJ5pT7rrTXIU-i7W4qpcI';

interface CachedPocData {
  pocsByEventId: Record<string, POC[]>;
  allPocs: Array<POC & { eventId: string; eventName: string }>;
  lastUpdated: string;
  expiresAt: number;
}

let pocCache: CachedPocData | null = null;
const POC_CACHE_TTL_MS = 60 * 1000; // 60s cache

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

export async function fetchLivePOCs(forceRefresh = false): Promise<Record<string, POC[]>> {
  const now = Date.now();
  if (!forceRefresh && pocCache && pocCache.expiresAt > now) {
    return pocCache.pocsByEventId;
  }

  const exportUrl = `https://docs.google.com/spreadsheets/d/${POC_SHEET_ID}/export?format=csv`;
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

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(exportUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) EventsCults/1.0',
        'Accept': 'text/csv, text/plain, */*',
      },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const csvText = await res.text();
      if (!csvText.trim().startsWith('<!DOCTYPE') && !csvText.trim().startsWith('<html')) {
        const rows = parseCSVToMatrix(csvText);
        
        let currentEventId: string | null = null;
        let currentEventRawName = '';

        // Iterate over rows starting after header (row 0 is EVENT, POC NAME, POC CONTACT)
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row || row.length === 0) continue;

          const colEvent = (row[0] || '').trim();
          const colName = (row[1] || '').trim();
          const colContact = (row[2] || '').trim();
          const colDesc = (row[3] || '').trim();

          // If colEvent is present, update current active event
          if (colEvent) {
            const matchedId = normalizeEventNameToId(colEvent) || normalizeEventNameToId(colDesc);
            if (matchedId) {
              currentEventId = matchedId;
              currentEventRawName = colEvent;
            }
          }

          // If we have a POC row and an active event
          if (currentEventId && (colName || colContact)) {
            // Clean up name & phone
            const cleanName = colName.replace(/\s+/g, ' ').trim();
            const cleanPhone = colContact.replace(/\s+/g, ' ').trim();

            if (cleanName || cleanPhone) {
              const pocObj: POC = {
                name: cleanName.toUpperCase() || 'EVENT POC',
                phone: cleanPhone || 'CONTACT PENDING',
              };

              // Prevent duplicates
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
          lastUpdated: new Date().toISOString(),
          expiresAt: now + POC_CACHE_TTL_MS,
        };

        return pocsByEventId;
      }
    }
  } catch (err) {
    console.warn('[POCFetcher] Failed to fetch live POC sheet, returning existing cache or empty mapping:', (err as Error).message);
  }

  if (pocCache) {
    return pocCache.pocsByEventId;
  }

  return pocsByEventId;
}

export function getCachedPOCsForEvent(eventId: string): POC[] {
  if (pocCache && pocCache.pocsByEventId[eventId]) {
    return pocCache.pocsByEventId[eventId];
  }
  return [];
}
