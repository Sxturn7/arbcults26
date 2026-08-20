import React, { useState, useEffect, useMemo } from 'react';
import { Search, ArrowRight, Building, X, Film } from 'lucide-react';
import { NormalizedRegistration } from '../types.ts';
import { EVENTS_REGISTRY } from '../config/events.ts';
import { AccessRole } from '../config/access.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { getMasterDatabase } from '../services/dataService.ts';

interface GlobalSearchProps {
  onSelectRecord: (record: NormalizedRegistration) => void;
  onSelectEvent: (eventId: string) => void;
  accessRole?: AccessRole | null;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  onSelectRecord,
  onSelectEvent,
  accessRole,
}) => {
  const { theme } = useTheme();
  const isEC = accessRole === 'ec';
  const [query, setQuery] = useState('');
  const [allRecords, setAllRecords] = useState<NormalizedRegistration[]>([]);
  const [, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const records = await getMasterDatabase();
        if (records) {
          setAllRecords(records);
        }
      } catch (err) {
        console.error('Failed to load records for search:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const matchedEvents = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return EVENTS_REGISTRY.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.number.includes(q) ||
        (e.categoryHint && e.categoryHint.toLowerCase().includes(q)) ||
        e.pocs.some((p) => p.name.toLowerCase().includes(q) || p.phone.includes(q))
    );
  }, [query]);

  const matchedRecords = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allRecords.filter((r) => {
      const inName = r.displayName.toLowerCase().includes(q);
      const inCollege = (r.college || '').toLowerCase().includes(q);
      const inEvent = r.eventName.toLowerCase().includes(q);
      const inEmail = r.emails.some((e) => e.toLowerCase().includes(q));
      const inContact = r.contacts.some((c) => c.toLowerCase().includes(q));
      const inParticipants = r.participants.some((p) => p.name.toLowerCase().includes(q));
      const inId = r.id.toLowerCase().includes(q);

      return inName || inCollege || inEvent || inEmail || inContact || inParticipants || inId;
    });
  }, [allRecords, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-6 sm:py-8 md:py-12 font-outfit">
      {/* Header */}
      <div
        className="border-b pb-4 sm:pb-6 mb-6 sm:mb-8"
        style={{ borderColor: theme.colors.border }}
      >
        <div
          className="text-[10px] sm:text-xs font-medium tracking-wider uppercase mb-1"
          style={{ color: theme.colors.muted }}
        >
          ATHARV RANBHOOMI &apos;26 • UNIFIED SEARCH
        </div>
        <h1
          className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase"
          style={{ color: theme.colors.text }}
        >
          SEARCH
        </h1>
      </div>

      {/* Large Minimal Search Input */}
      <div className="relative mb-6 sm:mb-10">
        <Search
          className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2"
          style={{ color: theme.colors.muted }}
        />
        <input
          type="text"
          placeholder="SEARCH ANY PARTICIPANT, TEAM, COLLEGE, OR TRACK..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full border py-3 sm:py-4 pl-10 sm:pl-12 pr-10 text-xs sm:text-base outline-hidden uppercase tracking-wider font-normal transition-colors shadow-2xs"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            color: theme.colors.text,
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 p-1 cursor-pointer hover:opacity-70 transition-opacity"
            style={{ color: theme.colors.muted }}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {!query.trim() ? (
        <div className="py-20 text-center border" style={{ borderColor: theme.colors.border }}>
          <p className="text-xs uppercase tracking-wider font-normal" style={{ color: theme.colors.muted }}>
            TYPE TO SEARCH ACROSS 15 EVENTS AND ALL REGISTRATIONS.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Matched Events Section */}
          {matchedEvents.length > 0 && (
            <div>
              <div
                className="text-xs font-medium uppercase tracking-wider border-b pb-2 mb-4 flex items-center justify-between"
                style={{ borderColor: theme.colors.border, color: theme.colors.muted }}
              >
                <span>MATCHING TRACKS</span>
                <span>[{matchedEvents.length}]</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onSelectEvent(event.id)}
                    className="p-5 border hover:brightness-95 cursor-pointer transition-all flex flex-col justify-between group"
                    style={{
                      backgroundColor: theme.colors.bg,
                      borderColor: theme.colors.border,
                    }}
                  >
                    <div>
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-xl font-light" style={{ color: theme.colors.accent }}>
                          {event.number}
                        </span>
                        <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: theme.colors.accent }} />
                      </div>
                      <h3 className="text-lg font-bold uppercase tracking-tight" style={{ color: theme.colors.text }}>
                        {event.name}
                      </h3>
                      {event.categoryHint && (
                        <p className="text-xs mt-1 uppercase" style={{ color: theme.colors.muted }}>
                          {event.categoryHint}
                        </p>
                      )}
                    </div>

                    <div
                      className="mt-4 pt-3 border-t text-xs font-normal flex justify-between"
                      style={{ borderColor: theme.colors.border, color: theme.colors.muted }}
                    >
                      <span>POCs: {event.pocs.map((p) => p.name).join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Registrations Section */}
          <div>
            <div
              className="text-xs font-medium uppercase tracking-wider border-b pb-2 mb-4 flex items-center justify-between"
              style={{ borderColor: theme.colors.border, color: theme.colors.muted }}
            >
              <span>MATCHING PARTICIPANTS & TEAMS</span>
              {!isEC && <span>[{matchedRecords.length}]</span>}
            </div>

            {matchedRecords.length > 0 ? (
              <div
                className="divide-y border"
                style={{
                  backgroundColor: theme.colors.bg,
                  borderColor: theme.colors.border,
                }}
              >
                {matchedRecords.map((r, idx) => (
                  <div
                    key={r.id || idx}
                    onClick={() => onSelectRecord(r)}
                    className="p-4 sm:p-4.5 hover:brightness-95 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    style={{ borderTopColor: theme.colors.border }}
                  >
                    <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
                      <span className="text-xs font-medium w-24 shrink-0 uppercase" style={{ color: theme.colors.accent }}>
                        {r.eventName}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <h4
                            className="text-base sm:text-lg font-semibold group-hover:pl-1 transition-all uppercase truncate"
                            style={{ color: theme.colors.text }}
                          >
                            {r.displayName}
                          </h4>
                          <span
                            className="text-[11px] px-2 py-0.5 border uppercase font-normal"
                            style={{
                              backgroundColor: theme.colors.surface,
                              borderColor: theme.colors.border,
                              color: theme.colors.muted,
                            }}
                          >
                            {r.type}
                          </span>
                        </div>
                        {r.college && (
                          <div className="text-xs mt-0.5 truncate flex items-center gap-1.5 font-normal" style={{ color: theme.colors.muted }}>
                            <Building className="w-3 h-3" />
                            <span>{r.college}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {!isEC && r.submissions && r.submissions.length > 0 && (
                        <span
                          className="px-2 py-0.5 text-xs font-medium border uppercase flex items-center gap-1"
                          style={{
                            backgroundColor: theme.colors.surface,
                            borderColor: theme.colors.border,
                            color: theme.colors.accent,
                          }}
                        >
                          <Film className="w-3 h-3" />
                          <span>MEDIA</span>
                        </span>
                      )}
                      <ArrowRight
                        className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                        style={{ color: theme.colors.accent }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="py-12 text-center border"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                }}
              >
                <p className="text-xs uppercase font-normal" style={{ color: theme.colors.muted }}>
                  NO RECORDS FOUND MATCHING &quot;{query}&quot;.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
