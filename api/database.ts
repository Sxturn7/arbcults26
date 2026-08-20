import type { IncomingMessage, ServerResponse } from 'http';
import { fetchAllEventsDatabase } from '../server/sheetFetcher.ts';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
    const forceRefresh = url.searchParams.get('refresh') === 'true';
    const records = await fetchAllEventsDatabase(forceRefresh);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: true,
        data: {
          records,
          totalCount: records.length,
          lastUpdated: new Date().toISOString(),
        },
      })
    );
  } catch (err) {
    console.error('[API Database] Error:', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: (err as Error).message || 'Failed to fetch database' }));
  }
}
