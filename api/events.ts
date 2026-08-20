import type { IncomingMessage, ServerResponse } from 'http';
import { EVENTS_REGISTRY } from '../src/config/events.ts';
import { fetchEventData } from '../server/sheetFetcher.ts';

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
    const eventId = url.searchParams.get('id');
    const forceRefresh = url.searchParams.get('refresh') === 'true';

    if (eventId) {
      const data = await fetchEventData(eventId, forceRefresh);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: EVENTS_REGISTRY }));
  } catch (err) {
    console.error('[API Events] Error:', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: (err as Error).message || 'Failed to fetch events' }));
  }
}
