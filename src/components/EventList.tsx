import React, { useEffect, useState } from 'react';
import { ArrowRight, RefreshCw, BookOpen, ExternalLink, Phone } from 'lucide-react';
import { EVENTS_REGISTRY, getRuleBookUrl, eventCultsBrochureUrl } from '../config/events.ts';
import { OverviewMetrics, EventStat } from '../types.ts';
import { AccessRole } from '../config/access.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { getOverviewMetrics } from '../services/dataService.ts';
import { CountdownTimer } from './CountdownTimer.tsx';

interface EventListProps {
  onSelectEvent: (eventId: string) => void;
  accessRole?: AccessRole | null;
}

export const EventList: React.FC<EventListProps> = ({ onSelectEvent, accessRole }) => {
  const { theme, themeId } = useTheme();
  const [metrics, setMetrics] = useState<OverviewMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('LIVE');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const isDark = themeId === 'black';
  const logoSrc = isDark ? '/ATHARV RANBHOOMI black.png' : '/ATHARV RANBHOOMI white.png';
  const isEC = accessRole === 'ec';

  const fetchMetrics = async (forceRefresh = false) => {
    if (isEC) return; // EC does not fetch registration metrics
    setLoading(true);
    try {
      const data = await getOverviewMetrics(forceRefresh);
      if (data) {
        setMetrics(data);
        setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      console.error('Failed to fetch overview metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isEC) {
      fetchMetrics();
    }
  }, [isEC]);

  // Keyboard navigation support across events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % EVENTS_REGISTRY.length);
      } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
        e.preventDefault();
        setSelectedIndex((prev) => (prev <= 0 ? EVENTS_REGISTRY.length - 1 : prev - 1));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        const selected = EVENTS_REGISTRY[selectedIndex];
        if (selected) {
          onSelectEvent(selected.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onSelectEvent]);

  // Render individual track item
  const renderEventItem = (event: typeof EVENTS_REGISTRY[0], globalIndex: number) => {
    const stat: EventStat | undefined = metrics?.eventStats?.find((e) => e.id === event.id);
    const regCount = stat?.registrationCount ?? 0;
    const subCount = stat?.submissionCount ?? 0;
    const isSelected = selectedIndex === globalIndex;

    return (
      <div
        key={event.id}
        id={`event-item-${event.id}`}
        onClick={() => onSelectEvent(event.id)}
        onMouseEnter={() => setSelectedIndex(globalIndex)}
        className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 group cursor-pointer transition-all duration-150 select-none shadow-2xs ${
          isSelected
            ? 'translate-x-1 ring-1 ring-offset-0'
            : 'hover:translate-x-1'
        }`}
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: isSelected ? theme.colors.accent : theme.colors.border,
        }}
      >
        {/* Left: Number, Title & Category */}
        <div className="flex items-start gap-4 min-w-0 flex-1">
          <span
            className="text-lg sm:text-2xl font-bold tracking-tight shrink-0 select-none"
            style={{ color: isSelected ? theme.colors.accent : theme.colors.muted }}
          >
            {event.number}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3
                className="text-base sm:text-lg font-bold tracking-tight uppercase leading-snug group-hover:text-[var(--accent-maroon)] transition-colors"
                style={{ color: theme.colors.text }}
              >
                {event.name}
              </h3>
              {event.categoryHint && (
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border"
                  style={{
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.bg,
                    color: theme.colors.muted,
                  }}
                >
                  {event.categoryHint}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0">
          {/* Registration & Submissions count only visible to Core Team */}
          {!isEC && (
            <div className="text-right min-w-[3.5rem]">
              <span
                className="text-lg font-bold tracking-tight transition-colors group-hover:text-[var(--accent-maroon)]"
                style={{ color: theme.colors.text }}
              >
                {regCount}
              </span>
              {subCount > 0 && (
                <span
                  className="block text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: theme.colors.accent }}
                >
                  {subCount} subs
                </span>
              )}
            </div>
          )}

          <ArrowRight
            className="w-4 h-4 transition-all duration-150 opacity-40 group-hover:opacity-100 group-hover:translate-x-1"
            style={{ color: theme.colors.accent }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-6 sm:py-10 md:py-14 font-outfit">
      {/* Title & Large Logo Header Area */}
      <div
        className="flex flex-col-reverse sm:flex-row sm:items-center justify-between pb-6 sm:pb-10 mb-6 sm:mb-10 border-b gap-4 sm:gap-8"
        style={{ borderColor: theme.colors.border }}
      >
        <div className="space-y-2 sm:space-y-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span
              className="text-[11px] sm:text-xs md:text-sm font-bold tracking-widest uppercase"
              style={{ color: theme.colors.accent }}
            >
              ATHARV RANBHOOMI &apos;26
            </span>
            <span style={{ color: theme.colors.muted }}>•</span>
            <span
              className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase"
              style={{ color: theme.colors.muted }}
            >
              CULTURAL FESTIVAL
            </span>
            {isEC && (
              <>
                <span style={{ color: theme.colors.muted }}>•</span>
                <span
                  className="text-[10px] sm:text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border"
                  style={{
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.accent,
                  }}
                >
                  EC PORTAL
                </span>
              </>
            )}
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight uppercase leading-none select-none"
            style={{ color: theme.colors.text }}
          >
            EVENT CULTS
          </h1>
        </div>

        {/* Official Atharv Ranbhoomi Logo */}
        <div className="shrink-0 flex items-center justify-start sm:justify-end">
          <img
            src={logoSrc}
            alt="Atharv Ranbhoomi Logo"
            className="h-16 sm:h-24 md:h-36 w-auto object-contain select-none transition-transform hover:scale-102"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Fest Countdown Timer (For both EC & Core Team) */}
      <CountdownTimer />

      {/* Top Overview Metrics (Core Team Only) */}
      {!isEC && (
        <div className="pb-6 sm:pb-10 mb-6 sm:mb-10 border-b space-y-4 sm:space-y-6" style={{ borderColor: theme.colors.border }}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider" style={{ color: theme.colors.muted }}>
              LIVE REGISTRATION STATS
            </span>
            <button
              id="live-refresh-metrics-btn"
              onClick={() => fetchMetrics(true)}
              disabled={loading}
              className="px-2.5 sm:px-3.5 py-1.5 border rounded-lg text-[10px] sm:text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all hover:brightness-95 disabled:opacity-50 shadow-2xs shrink-0"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
              title="Fetch fresh live data from all connected Google Sheets"
            >
              <RefreshCw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${loading ? 'animate-spin' : ''}`} style={{ color: theme.colors.accent }} />
              <span>{loading ? 'SYNCING...' : `SYNC • ${lastRefreshed}`}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-10">
            <div>
              <div
                className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-0.5"
                style={{ color: theme.colors.text }}
              >
                15
              </div>
              <div
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
                style={{ color: theme.colors.muted }}
              >
                TOTAL TRACKS
              </div>
            </div>

            <div>
              <div
                className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-0.5"
                style={{ color: theme.colors.text }}
              >
                {(metrics?.totalRegistrations ?? 0).toLocaleString()}
              </div>
              <div
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
                style={{ color: theme.colors.muted }}
              >
                REGISTRATIONS
              </div>
            </div>

            <div>
              <div
                className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-0.5"
                style={{ color: theme.colors.text }}
              >
                {(metrics?.totalParticipants ?? 0).toLocaleString()}
              </div>
              <div
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
                style={{ color: theme.colors.muted }}
              >
                PARTICIPANTS
              </div>
            </div>

            <div>
              <div
                className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-0.5"
                style={{ color: theme.colors.accent }}
              >
                {(metrics?.totalSubmissions ?? 0).toLocaleString()}
              </div>
              <div
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
                style={{ color: theme.colors.accent }}
              >
                SUBMISSIONS
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Directory Index Header with Brochure Button */}
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <h2
            className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight uppercase"
            style={{ color: theme.colors.text }}
          >
            {isEC ? 'CULTURAL EVENTS' : 'DIRECTORY INDEX'}
          </h2>
          <span
            className="text-[10px] sm:text-xs font-medium uppercase tracking-wider block mt-0.5"
            style={{ color: theme.colors.muted }}
          >
            15 TRACKS • SELECT TO VIEW
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Official Events Brochure Button */}
          <a
            id="event-cults-brochure-link"
            href={eventCultsBrochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 border rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all hover:brightness-95 select-none cursor-pointer shadow-2xs"
            style={{
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surface,
              color: theme.colors.accent,
            }}
            title="Open Official Event Cults Brochure"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Brochure ↗</span>
          </a>
        </div>
      </div>

      {/* Dual Column Menu */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Column 1: Tracks 01 to 08 */}
        <div className="space-y-3">
          {EVENTS_REGISTRY.slice(0, 8).map((event, idx) =>
            renderEventItem(event, idx)
          )}
        </div>

        {/* Column 2: Tracks 09 to 15 */}
        <div className="space-y-3">
          {EVENTS_REGISTRY.slice(8, 15).map((event, idx) =>
            renderEventItem(event, idx + 8)
          )}
        </div>
      </div>
    </div>
  );
};
