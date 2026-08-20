import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Check,
  Copy,
  RefreshCw,
  BookOpen,
  Phone,
  ExternalLink,
  Users,
  Award,
} from 'lucide-react';
import { EventConfig, EventDataResponse, NormalizedRegistration, ActiveTab, POC } from '../types.ts';
import { getSheetUrl, getRuleBookUrl, EVENTS_REGISTRY, eventCultsBrochureUrl } from '../config/events.ts';
import { getEventData } from '../services/dataService.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { AccessRole } from '../config/access.ts';

interface EventWorkspaceProps {
  event: EventConfig;
  onBack: () => void;
  onSelectRecord: (record: NormalizedRegistration) => void;
  onOpenPOCs: (event: EventConfig, customPocs?: POC[]) => void;
  onSelectEvent: (eventId: string) => void;
  accessRole?: AccessRole | null;
}

export const EventWorkspace: React.FC<EventWorkspaceProps> = ({
  event,
  onBack,
  onSelectRecord,
  onOpenPOCs,
  onSelectEvent,
  accessRole,
}) => {
  const { theme } = useTheme();
  const [data, setData] = useState<EventDataResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('registrations');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const isEC = accessRole === 'ec';

  const loadData = async (forceRefresh = false) => {
    if (isEC) return; // EC does not fetch registration data
    if (forceRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await getEventData(event.id, forceRefresh);
      setData(res);
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.error('Failed to load event data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!isEC) {
      loadData();
    }
  }, [event.id, isEC]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhone(text);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  // Previous & Next event navigation
  const currentIndex = EVENTS_REGISTRY.findIndex((e) => e.id === event.id);
  const prevEvent = currentIndex > 0 ? EVENTS_REGISTRY[currentIndex - 1] : null;
  const nextEvent = currentIndex < EVENTS_REGISTRY.length - 1 ? EVENTS_REGISTRY[currentIndex + 1] : null;

  const sheetUrl = getSheetUrl(event.sheetId);
  const ruleBookUrl = event.ruleBookUrl || getRuleBookUrl(event.id) || getRuleBookUrl(event.name);
  const activePocs: POC[] = (data?.pocs && data.pocs.length > 0) ? data.pocs : event.pocs;
  const rawRecords = isEC ? [] : (data?.records || []);
  const submissionRecords = isEC ? [] : rawRecords.filter((r) => r.submissions && r.submissions.length > 0);

  // Filtered records according to search (Core team only)
  const filteredRecords = useMemo(() => {
    if (isEC) return [];
    const list = activeTab === 'submissions' ? submissionRecords : rawRecords;
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter((r) => {
      const inName = r.displayName.toLowerCase().includes(q);
      const inCollege = r.college?.toLowerCase().includes(q);
      const inId = r.id.toLowerCase().includes(q);
      const inEmail = r.emails.some((e) => e.toLowerCase().includes(q));
      const inPhone = r.contacts.some((c) => c.toLowerCase().includes(q));
      return inName || inCollege || inId || inEmail || inPhone;
    });
  }, [rawRecords, submissionRecords, activeTab, searchQuery, isEC]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 py-6 sm:py-8 md:py-12 font-outfit">
      {/* Top Navigation Row: Back Button & Previous/Next track switcher */}
      <div className="flex items-center justify-between pb-6 sm:pb-8 mb-6 sm:mb-8 border-b gap-2" style={{ borderColor: theme.colors.border }}>
        <button
          id="back-to-directory-btn"
          onClick={onBack}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 border rounded-lg text-xs font-semibold uppercase tracking-wider transition-all hover:brightness-95 active:scale-95 cursor-pointer shadow-2xs shrink-0"
          style={{
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
          }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Events Directory</span>
          <span className="sm:hidden">Events</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-4 text-xs font-semibold uppercase tracking-wider shrink-0">
          {prevEvent && (
            <button
              onClick={() => onSelectEvent(prevEvent.id)}
              className="px-2 sm:px-2.5 py-1 rounded border transition-colors hover:brightness-95 cursor-pointer max-w-[120px] sm:max-w-none truncate"
              style={{
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surface,
                color: theme.colors.muted,
              }}
              title={prevEvent.name}
            >
              ← <span className="hidden sm:inline">{prevEvent.name}</span><span className="sm:hidden">{prevEvent.number}</span>
            </button>
          )}
          {nextEvent && (
            <button
              onClick={() => onSelectEvent(nextEvent.id)}
              className="px-2 sm:px-2.5 py-1 rounded border transition-colors hover:brightness-95 cursor-pointer max-w-[120px] sm:max-w-none truncate"
              style={{
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surface,
                color: theme.colors.muted,
              }}
              title={nextEvent.name}
            >
              <span className="hidden sm:inline">{nextEvent.name}</span><span className="sm:hidden">{nextEvent.number}</span> →
            </button>
          )}
        </div>
      </div>

      {/* Main Track Header */}
      <header className="pb-6 sm:pb-8 mb-6 sm:mb-8 border-b space-y-3 sm:space-y-4" style={{ borderColor: theme.colors.border }}>
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <span
            className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
            style={{ color: theme.colors.accent }}
          >
            {event.number}
          </span>
          <span style={{ color: theme.colors.border }}>•</span>
          {event.categoryHint && (
            <span
              className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border"
              style={{
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surface,
                color: theme.colors.muted,
              }}
            >
              {event.categoryHint.toUpperCase()}
            </span>
          )}
        </div>

        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-tight"
          style={{ color: theme.colors.text }}
        >
          {event.name}
        </h1>

        {/* Action Links Bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1 sm:pt-2">
          {/* Rule Book Button */}
          {ruleBookUrl && (
            <a
              id="event-rulebook-btn"
              href={ruleBookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white transition-transform hover:brightness-110 shadow-2xs"
              style={{ backgroundColor: theme.colors.accent }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Rule Book ↗</span>
            </a>
          )}

          {/* Unstop Listing Link */}
          {event.unstopUrl && (
            <a
              href={event.unstopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 border rounded-lg text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors hover:brightness-95 shadow-2xs"
              style={{
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
              }}
            >
              <span>Unstop ↗</span>
            </a>
          )}

          {/* Brochure Link */}
          <a
            href={eventCultsBrochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 border rounded-lg text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors hover:brightness-95 shadow-2xs"
            style={{
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surface,
              color: theme.colors.muted,
            }}
          >
            <span>Brochure ↗</span>
          </a>

          {/* Core Team Only Actions */}
          {!isEC && (
            <>
              {sheetUrl && (
                <a
                  href={sheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1"
                  style={{ color: theme.colors.accent }}
                >
                  <span>Sheet ↗</span>
                </a>
              )}

              <button
                onClick={() => onOpenPOCs(event, activePocs)}
                className="hover:underline transition-colors cursor-pointer text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1"
                style={{ color: theme.colors.accent }}
              >
                <span>POCs ({activePocs.length}) ↗</span>
              </button>

              <button
                onClick={() => loadData(true)}
                disabled={refreshing || loading}
                className="cursor-pointer transition-colors hover:underline inline-flex items-center gap-1.5 disabled:opacity-50 text-xs font-semibold uppercase tracking-wider"
                style={{ color: theme.colors.muted }}
                title="Force refresh live data from Google Sheet"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} style={{ color: theme.colors.accent }} />
                <span>{refreshing ? 'SYNCING...' : lastRefreshed ? lastRefreshed : 'SYNC'}</span>
              </button>
            </>
          )}
        </div>
      </header>

      {/* Extended Core View: Event Details, Rule Book & Points of Contact (POCs) ONLY */}
      {isEC ? (
        <div className="space-y-8">
          {/* Rule Book Highlight Card */}
          <div
            className="p-6 sm:p-8 border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            }}
          >
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" style={{ color: theme.colors.accent }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.colors.accent }}>
                  OFFICIAL GUIDELINES & RULE BOOK
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight" style={{ color: theme.colors.text }}>
                {event.name} Guidelines & Rounds
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.colors.muted }}>
                Detailed round rules, judging criteria, time limits, music submissions, and eligibility requirements for {event.name}.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-medium" style={{ color: theme.colors.muted }}>
                {event.categoryHint && <span>• Track: {event.categoryHint}</span>}
                <span>• Format: {event.displayMode.replace('_', ' ').toUpperCase()}</span>
              </div>
            </div>

            {ruleBookUrl && (
              <a
                href={ruleBookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white text-center transition-all hover:brightness-110 shrink-0 inline-flex items-center justify-center gap-2 shadow-md"
                style={{ backgroundColor: theme.colors.accent }}
              >
                <BookOpen className="w-4 h-4" />
                <span>OPEN RULE BOOK ↗</span>
              </a>
            )}
          </div>

          {/* Points of Contact (POCs) Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: theme.colors.border }}>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" style={{ color: theme.colors.accent }} />
                <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: theme.colors.text }}>
                  EVENT POINTS OF CONTACT (POCS)
                </h3>
              </div>
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: theme.colors.muted }}>
                {activePocs.length} ASSIGNED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activePocs.map((poc, idx) => (
                <div
                  key={idx}
                  className="p-5 border rounded-2xl flex items-center justify-between gap-4 transition-all hover:brightness-98 shadow-xs"
                  style={{
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  }}
                >
                  <div className="min-w-0 flex-1">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border mb-1.5 inline-block"
                      style={{
                        borderColor: theme.colors.border,
                        backgroundColor: theme.colors.bg,
                        color: theme.colors.accent,
                      }}
                    >
                      POC 0{idx + 1}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold uppercase tracking-tight truncate" style={{ color: theme.colors.text }}>
                      {poc.name}
                    </h4>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: theme.colors.muted }}>
                      {poc.phone}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`tel:${poc.phone.replace(/\s+/g, '')}`}
                      className="px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white transition-all hover:brightness-110 flex items-center gap-1.5 shadow-2xs"
                      style={{ backgroundColor: theme.colors.accent }}
                      title={`Call ${poc.name}`}
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                    <button
                      onClick={() => handleCopy(poc.phone)}
                      className="p-2 border rounded-lg text-xs font-semibold uppercase transition-colors hover:brightness-95 cursor-pointer shadow-2xs"
                      style={{
                        borderColor: theme.colors.border,
                        backgroundColor: theme.colors.bg,
                        color: theme.colors.text,
                      }}
                      title="Copy phone number"
                    >
                      {copiedPhone === poc.phone ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Core Team View: Tabs, Registrations & Submissions */
        <>
          {/* Tabs & Search Area */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-8"
            style={{ borderColor: theme.colors.border }}
          >
            {/* Tabs */}
            <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('registrations')}
                className="pb-2 relative cursor-pointer transition-colors"
                style={{
                  color: activeTab === 'registrations' ? theme.colors.accent : theme.colors.muted,
                  fontWeight: activeTab === 'registrations' ? 700 : 500,
                }}
              >
                <span>REGISTRATIONS ({rawRecords.length})</span>
                {activeTab === 'registrations' && (
                  <div
                    className="absolute bottom-[-17px] left-0 right-0 h-[2px]"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab('submissions')}
                className="pb-2 relative cursor-pointer transition-colors"
                style={{
                  color: activeTab === 'submissions' ? theme.colors.accent : theme.colors.muted,
                  fontWeight: activeTab === 'submissions' ? 700 : 500,
                }}
              >
                <span>SUBMISSIONS ({submissionRecords.length})</span>
                {activeTab === 'submissions' && (
                  <div
                    className="absolute bottom-[-17px] left-0 right-0 h-[2px]"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab('pocs')}
                className="pb-2 relative cursor-pointer transition-colors"
                style={{
                  color: activeTab === 'pocs' ? theme.colors.accent : theme.colors.muted,
                  fontWeight: activeTab === 'pocs' ? 700 : 500,
                }}
              >
                <span>POCs ({activePocs.length})</span>
                {activeTab === 'pocs' && (
                  <div
                    className="absolute bottom-[-17px] left-0 right-0 h-[2px]"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                )}
              </button>
            </div>

            {/* Minimal Search Bar */}
            {activeTab !== 'pocs' && (
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.colors.muted }} />
                <input
                  type="text"
                  placeholder="SEARCH NAME, COLLEGE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border rounded-lg py-1.5 pl-8 pr-3 text-xs font-normal uppercase outline-hidden tracking-wider shadow-2xs"
                  style={{
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  }}
                />
              </div>
            )}
          </div>

          {/* Main Content Area */}
          {loading ? (
            <div className="py-24 text-center">
              <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: theme.colors.muted }}>
                SYNCING LIVE REGISTRATIONS FROM GOOGLE SHEETS...
              </div>
            </div>
          ) : activeTab === 'pocs' ? (
            /* POCs View */
            <div className="space-y-6 max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.colors.muted }}>
                POINTS OF CONTACT FOR {event.name}
              </div>
              <div className="divide-y" style={{ borderColor: theme.colors.border }}>
                {activePocs.map((poc, idx) => (
                  <div
                    key={idx}
                    className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    style={{ borderTopColor: theme.colors.border }}
                  >
                    <div>
                      <div className="text-xs font-bold tracking-tight mb-1" style={{ color: theme.colors.accent }}>
                        POC 0{idx + 1}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight" style={{ color: theme.colors.text }}>
                        {poc.name}
                      </h3>
                      <div className="text-sm font-normal mt-1" style={{ color: theme.colors.muted }}>
                        {poc.phone}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider">
                      <a
                        href={`tel:${poc.phone.replace(/\s+/g, '')}`}
                        className="hover:underline transition-colors"
                        style={{ color: theme.colors.accent }}
                      >
                        CALL ↗
                      </a>
                      <span style={{ color: theme.colors.border }}>•</span>
                      <button
                        onClick={() => handleCopy(poc.phone)}
                        className="cursor-pointer hover:underline transition-colors"
                        style={{ color: theme.colors.text }}
                      >
                        {copiedPhone === poc.phone ? (
                          <span className="text-emerald-600 inline-flex items-center gap-1">
                            <Check className="w-3 h-3" /> COPIED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            <Copy className="w-3 h-3" /> COPY
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredRecords.length > 0 ? (
            /* Registrations List */
            <div className="divide-y" style={{ borderColor: theme.colors.border }}>
              {filteredRecords.map((record, index) => {
                const entryNum = (index + 1).toString().padStart(2, '0');
                const hasSubmission = record.submissions && record.submissions.length > 0;
                const primarySubmission = hasSubmission ? record.submissions[0] : null;

                return (
                  <div
                    key={record.id || index}
                    onClick={() => onSelectRecord(record)}
                    className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group transition-all hover:translate-x-1"
                    style={{ borderTopColor: theme.colors.border }}
                  >
                    {/* Left: Number, Name, College */}
                    <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
                      <span
                        className="text-lg sm:text-2xl font-bold w-8 sm:w-10 shrink-0 group-hover:text-accent transition-colors"
                        style={{ color: theme.colors.muted }}
                      >
                        {entryNum}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h2
                          className="text-base sm:text-xl font-bold tracking-tight uppercase leading-snug group-hover:text-[var(--accent-maroon)] transition-colors"
                          style={{ color: theme.colors.text }}
                        >
                          {record.displayName}
                        </h2>

                        {record.college && (
                          <p
                            className="text-xs sm:text-sm font-normal mt-1 leading-relaxed max-w-2xl truncate sm:whitespace-normal"
                            style={{ color: theme.colors.muted }}
                          >
                            {record.college}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right: Submission Action + Arrow */}
                    <div className="flex items-center gap-4 sm:gap-6 shrink-0 sm:pl-4">
                      {primarySubmission && (
                        <a
                          href={primarySubmission.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-semibold uppercase tracking-wider hover:underline transition-colors"
                          style={{ color: theme.colors.accent }}
                        >
                          SUBMISSION ↗
                        </a>
                      )}

                      <ArrowRight
                        className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                        style={{ color: theme.colors.accent }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-xs uppercase tracking-wider font-normal" style={{ color: theme.colors.muted }}>
                {searchQuery ? `NO RECORDS MATCHING "${searchQuery}"` : 'NO REGISTRATIONS RECORDED YET.'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
