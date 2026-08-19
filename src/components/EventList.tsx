import React, { useEffect, useState } from 'react';
import { RefreshCw, ArrowRight } from 'lucide-react';
import { EVENTS_REGISTRY } from '../config/events.ts';
import { OverviewMetrics, EventStat } from '../types.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { FoldText } from './reactbits/FoldText.tsx';

interface EventListProps {
  onSelectEvent: (eventId: string) => void;
}

export const EventList: React.FC<EventListProps> = ({ onSelectEvent }) => {
  const { theme, themeId } = useTheme();
  const [metrics, setMetrics] = useState<OverviewMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('LIVE');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const isDark = themeId === 'black';
  const logoSrc = isDark ? '/ATHARV RANBHOOMI black.png' : '/ATHARV RANBHOOMI white.png';

  const fetchMetrics = async (forceRefresh = false) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/overview${forceRefresh ? '?refresh=true' : ''}`);
      const json = await res.json();
      if (json.success && json.data) {
        setMetrics(json.data);
        setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      console.error('Failed to fetch overview metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

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

  // Map stats by event ID for quick lookups
  const statsMap = new Map<string, EventStat>();
  if (metrics?.eventStats) {
    metrics.eventStats.forEach((st) => statsMap.set(st.id, st));
  }

  const renderEventItem = (event: typeof EVENTS_REGISTRY[0], globalIndex: number) => {
    const stat = statsMap.get(event.id);
    const regCount = stat ? stat.registrationCount : 0;
    const subCount = stat ? stat.submissionCount : 0;
    const pocCount = stat ? stat.pocCount : event.pocs.length;
    const isSelected = selectedIndex === globalIndex;

    return (
      <div
        key={event.id}
        id={`event-item-${event.id}`}
        onClick={() => onSelectEvent(event.id)}
        onMouseEnter={() => setSelectedIndex(globalIndex)}
        className={`px-4 py-3.5 sm:py-4 rounded-lg flex items-center justify-between group cursor-pointer transition-all duration-150 select-none ${
          isSelected
            ? (isDark ? 'bg-[#141414] translate-x-1.5' : 'bg-[#F2F2F2] translate-x-1.5')
            : (isDark ? 'hover:bg-[#0E0E0E] hover:translate-x-1' : 'hover:bg-[#F8F8F8] hover:translate-x-1')
        }`}
      >
        {/* Left: Oversized Event Number (Outfit 300 Light) + Event Name (Outfit 600 Semibold, never truncated) */}
        <div className="flex items-baseline gap-4 sm:gap-6 min-w-0 pr-4">
          <span
            className="text-xl sm:text-2xl font-light tracking-tight shrink-0 select-none"
            style={{ color: isSelected ? theme.colors.accent : theme.colors.muted }}
          >
            {event.number}
          </span>
          <span
            className="text-base sm:text-lg md:text-xl font-semibold tracking-tight uppercase leading-snug group-hover:text-[var(--accent-maroon)] transition-colors duration-150 break-words"
            style={{ color: theme.colors.text }}
          >
            {event.name}
          </span>
        </div>

        {/* Right: Live POC count (Outfit 400) + Live Registrations (Outfit 700) + Arrow */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <span
            className="hidden sm:inline text-xs font-normal uppercase tracking-wider"
            style={{ color: theme.colors.muted }}
          >
            {pocCount} POCs
          </span>

          <div className="text-right">
            <span
              className="text-lg sm:text-xl font-bold tracking-tight transition-colors group-hover:text-[var(--accent-maroon)]"
              style={{ color: theme.colors.text }}
            >
              {regCount}
            </span>
            {subCount > 0 && (
              <span
                className="block text-[11px] font-normal uppercase tracking-wider transition-opacity opacity-80 group-hover:opacity-100"
                style={{ color: theme.colors.accent }}
              >
                {subCount} subs
              </span>
            )}
          </div>

          <ArrowRight
            className="w-4 h-4 transition-all duration-150 opacity-40 group-hover:opacity-100 group-hover:translate-x-1"
            style={{ color: theme.colors.accent }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-10 sm:py-14 font-outfit">
      {/* Title & Large Logo Header Area with Outfit Typography */}
      <div
        className="flex flex-col md:flex-row md:items-center justify-between pb-10 mb-10 border-b gap-8"
        style={{ borderColor: theme.colors.border }}
      >
        <div className="flex items-center gap-6 sm:gap-8">
          <div className="p-2 shrink-0 flex items-center justify-center">
            <img
              src={logoSrc}
              alt="Atharv Ranbhoomi"
              className="h-24 sm:h-32 lg:h-36 w-auto object-contain select-none"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="text-xs font-medium tracking-wider uppercase mb-1" style={{ color: theme.colors.muted }}>
              ATHARV RANBHOOMI &apos;26
            </div>
            {/* Opening Page FoldText Primary Title: Outfit 800 Extrabold */}
            <div className="cursor-default tracking-tight">
              <FoldText
                text="EVENTS : CULTS"
                fontSize="clamp(2.25rem, 5.5vw, 3.75rem)"
                fontWeight={800}
                color={theme.colors.text}
                hinge="top"
                trigger="mount"
                duration={0.6}
                stagger={0.03}
              />
            </div>
          </div>
        </div>

        {/* Live Indicator & Manual Refresh */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-2" style={{ color: theme.colors.muted }}>
            <span
              className="inline-block w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: theme.colors.accent }}
            />
            <span className="uppercase tracking-wider text-xs">
              LIVE • {lastRefreshed}
            </span>
          </div>

          <button
            onClick={() => fetchMetrics(true)}
            disabled={loading}
            title="Refresh Live Google Sheet Data"
            className="p-2.5 border transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
            style={{
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
            }}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Numerical Metrics: Large Numbers First (Outfit 700 Bold / 500 Medium) */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 pb-10 mb-14 border-b"
        style={{ borderColor: theme.colors.border }}
      >
        <div>
          <div
            className="text-3xl sm:text-5xl font-bold tracking-tight mb-1"
            style={{ color: theme.colors.text }}
          >
            {metrics?.totalEvents ?? 15}
          </div>
          <div
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: theme.colors.muted }}
          >
            EVENTS
          </div>
        </div>

        <div>
          <div
            className="text-3xl sm:text-5xl font-bold tracking-tight mb-1"
            style={{ color: theme.colors.text }}
          >
            {(metrics?.totalRegistrations ?? 0).toLocaleString()}
          </div>
          <div
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: theme.colors.muted }}
          >
            REGISTRATIONS
          </div>
        </div>

        <div>
          <div
            className="text-3xl sm:text-5xl font-bold tracking-tight mb-1"
            style={{ color: theme.colors.text }}
          >
            {(metrics?.totalParticipants ?? 0).toLocaleString()}
          </div>
          <div
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: theme.colors.muted }}
          >
            PARTICIPANTS
          </div>
        </div>

        <div>
          <div
            className="text-3xl sm:text-5xl font-bold tracking-tight mb-1"
            style={{ color: theme.colors.accent }}
          >
            {(metrics?.totalSubmissions ?? 0).toLocaleString()}
          </div>
          <div
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: theme.colors.accent }}
          >
            SUBMISSIONS
          </div>
        </div>
      </div>

      {/* Directory Index Header */}
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight uppercase"
            style={{ color: theme.colors.text }}
          >
            DIRECTORY INDEX
          </h2>
          <span
            className="text-xs font-medium uppercase tracking-wider block mt-0.5"
            style={{ color: theme.colors.muted }}
          >
            15 TRACKS
          </span>
        </div>
      </div>

      {/* Dual Column Menu (Spacious, No Line Separators, Outfit Hierarchy) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-1 sm:gap-y-2">
        {/* Column 1: Tracks 01 to 08 */}
        <div className="space-y-1 sm:space-y-1.5">
          {EVENTS_REGISTRY.slice(0, 8).map((event, idx) =>
            renderEventItem(event, idx)
          )}
        </div>

        {/* Column 2: Tracks 09 to 15 */}
        <div className="space-y-1 sm:space-y-1.5">
          {EVENTS_REGISTRY.slice(8, 15).map((event, idx) =>
            renderEventItem(event, idx + 8)
          )}
        </div>
      </div>
    </div>
  );
};
