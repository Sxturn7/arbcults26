import express from 'express';
import { EVENTS_REGISTRY } from '../src/config/events.ts';
import { fetchEventData, fetchAllEventsDatabase, fetchOverviewMetrics } from './sheetFetcher.ts';
import { fetchLivePOCs } from './pocFetcher.ts';

const app = express();

app.use(express.json());

// API Route: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Route: Get list of all 15 events
app.get('/api/events', (req, res) => {
  res.json({
    success: true,
    data: EVENTS_REGISTRY,
  });
});

// API Route: Get live POCs directly from Google Sheet
app.get('/api/pocs', async (req, res) => {
  try {
    const forceRefresh = req.query.refresh === 'true';
    const pocsByEventId = await fetchLivePOCs(forceRefresh);
    res.json({ success: true, data: pocsByEventId });
  } catch (err) {
    console.error('[API] Error fetching POCs:', err);
    res.status(500).json({
      success: false,
      error: (err as Error).message || 'Failed to fetch POCs',
    });
  }
});

// API Route: Get overview calculated metrics
app.get('/api/overview', async (req, res) => {
  try {
    const forceRefresh = req.query.refresh === 'true';
    const overview = await fetchOverviewMetrics(forceRefresh);
    res.json({ success: true, data: overview });
  } catch (err) {
    console.error('[API] Error fetching overview metrics:', err);
    res.status(500).json({
      success: false,
      error: (err as Error).message || 'Failed to fetch overview metrics',
    });
  }
});

// API Route: Get specific event registration data (with live sheet fetch)
app.get('/api/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const forceRefresh = req.query.refresh === 'true';
    const data = await fetchEventData(eventId, forceRefresh);
    res.json({ success: true, data });
  } catch (err) {
    console.error('[API] Error fetching event:', err);
    res.status(500).json({
      success: false,
      error: (err as Error).message || 'Failed to fetch event data',
    });
  }
});

// API Route: Get master database of all events
app.get('/api/database', async (req, res) => {
  try {
    const forceRefresh = req.query.refresh === 'true';
    const records = await fetchAllEventsDatabase(forceRefresh);
    res.json({
      success: true,
      data: {
        records,
        totalCount: records.length,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('[API] Error fetching master database:', err);
    res.status(500).json({
      success: false,
      error: (err as Error).message || 'Failed to fetch database',
    });
  }
});

// Export Express app for Vercel Serverless Functions
export default app;
