import type { IncomingMessage, ServerResponse } from 'http';
import { fetchOverviewMetrics } from '../server/sheetFetcher.ts';

export default async function handler(req: IncomingMessage & { query?: Record<string, string> }, res: ServerResponse & { status?: (code: number) => any; json?: (data: any) => void }) {
  // Support CORS
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
    const overview = await fetchOverviewMetrics(forceRefresh);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: overview }));
  } catch (err) {
    console.error('[API Overview] Error:', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: (err as Error).message || 'Failed to fetch overview' }));
  }
}
