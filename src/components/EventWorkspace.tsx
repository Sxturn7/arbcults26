import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Check,
  Copy,
  Phone,
} from 'lucide-react';
import { EventConfig, EventDataResponse, NormalizedRegistration, ActiveTab, POC } from '../types.ts';
import { getSheetUrl, EVENTS_REGISTRY } from '../config/events.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface EventWorkspaceProps {
  event: EventConfig;
  onBack: () => void;
  onSelectRecord: (record: NormalizedRegistration) => void;
  onOpenPOCs: (event: EventConfig, customPocs?: POC[]) => void;
  onSelectEvent?: (eventId: string) => void;
}

export const EventWorkspace: React.FC<EventWorkspaceProps> = ({
  event,
  onBack,
  onSelectRecord,
  onOpenPOCs,
  onSelectEvent,
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<ActiveTab>('registrations');
  const [data, setData] = useState<EventDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const loadData = async (force = false) => {
    try {
      if (force) setRefreshing(true);
      else setLoading(true);

      const res = await fetch(`/api/events/${event.id}${force ? '?refresh=true' : ''}`);
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);
      }
      const json = await res.json();
      if (json.success) {
        setData(json.data);
        if (force) {
          setLastRefreshed('UPDATED JUST NOW');
          setTimeout(() => setLastRefreshed(null), 3000);
        }
      }
    } catch (err) {
      console.error('Failed to load event data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData(false);
  }, [event.id]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhone(text);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const sheetUrl = getSheetUrl(event.sheetId);
  const activePocs: POC[] = (data?.pocs && data.pocs.length > 0) ? data.pocs : event.pocs;
  const rawRecords = data?.records || [];
  const submissionRecords = rawRecords.filter((r) => r.submissions && r.submissions.length > 0);

  // Filtered records according to search
  const filteredRecords = useMemo(() => {
    const list = activeTab === 'submissions' ? submissionRecords : rawRecords;
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter((r) => {
      const inName = r.displayName.toLowerCase().includes(q);
      const inCollege = (r.college || '').toLowerCase().includes(q);
      const inId = r.id.toLowerCase().includes(q);
      const inEmail = r.emails.some((e) => e.toLowerCase().includes(q));
      const inPhone = r.contacts.some((c) => c.toLowerCase().includes(q));
      return inName || inCollege || inId || inEmail || inPhone;
    });
  }, [rawRecords, submissionRecords, activeTab, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-12 py-8 sm:py-12 font-outfit">
      {/* Editorial Top Navigation */}
      <div className="flex items-center justify-between pb-8">
        <button
          id="back-to-events-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase group transition-colors cursor-pointer"
          style={{ color: theme.colors.muted }}
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span className="group-hover:underline">EVENTS INDEX</span>
        </button>

        {/* Quick Track Switcher dropdown */}
        {onSelectEvent && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: theme.colors.muted }}>
              TRACK:
            </span>
            <select
              value={event.id}
              onChange={(e) => onSelectEvent(e.target.value)}
              className="border-b py-1 px-2 text-xs font-medium uppercase outline-hidden cursor-pointer transition-colors"
              style={{
                backgroundColor: 'transparent',
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
            >
              {EVENTS_REGISTRY.map((e) => (
                <option key={e.id} value={e.id} style={{ backgroundColor: theme.colors.bg, color: theme.colors.text }}>
                  {e.number} {e.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Editorial Event Header */}
      <header className="mb-10">
        {/* Track Number */}
        <div
          className="text-4xl sm:text-6xl font-light tracking-tight mb-2"
          style={{ color: theme.colors.accent }}
        >
          {event.number}
        </div>

        {/* Event Name */}
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-none mb-6 break-words"
          style={{ color: theme.colors.text }}
        >
          {event.name}
        </h1>

        {/* Editorial Metrics Line */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium uppercase tracking-wider mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-semibold" style={{ color: theme.colors.text }}>
              {rawRecords.length}
            </span>
            <span style={{ color: theme.colors.muted }}>REGISTRATIONS</span>
          </div>

          <span style={{ color: theme.colors.border }}>•</span>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-semibold" style={{ color: theme.colors.text }}>
              {submissionRecords.length}
            </span>
            <span style={{ color: theme.colors.muted }}>SUBMISSIONS</span>
          </div>

          <span style={{ color: theme.colors.border }}>•</span>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-semibold" style={{ color: theme.colors.text }}>
              {activePocs.length}
            </span>
            <span style={{ color: theme.colors.muted }}>POCs</span>
          </div>
        </div>

        {/* Subtle Editorial Utility Line */}
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t text-xs font-medium tracking-wider uppercase"
          style={{ borderColor: theme.colors.border }}
        >
          <a
            href={event.unstopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-colors inline-flex items-center gap-1"
            style={{ color: theme.colors.text }}
          >
            <span>UNSTOPP ↗</span>
          </a>

          {event.registrationFormUrl && (
            <a
              href={event.registrationFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors inline-flex items-center gap-1"
              style={{ color: theme.colors.text }}
            >
              <span>FORM ↗</span>
            </a>
          )}

          <a
            href={sheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-colors inline-flex items-center gap-1"
            style={{ color: theme.colors.text }}
          >
            <span>SHEET ↗</span>
          </a>

          <button
            onClick={() => onOpenPOCs(event, activePocs)}
            className="hover:underline transition-colors cursor-pointer inline-flex items-center gap-1"
            style={{ color: theme.colors.accent }}
          >
            <span>POCs ({activePocs.length}) ↗</span>
          </button>

          <span className="hidden sm:inline" style={{ color: theme.colors.border }}>|</span>

          <button
            onClick={() => loadData(true)}
            disabled={refreshing || loading}
            className="cursor-pointer transition-colors hover:underline inline-flex items-center gap-1 disabled:opacity-50"
            style={{ color: theme.colors.muted }}
          >
            {refreshing ? (
              <span>REFRESHING...</span>
            ) : lastRefreshed ? (
              <span style={{ color: theme.colors.accent }}>{lastRefreshed}</span>
            ) : (
              <span>REFRESH ↻</span>
            )}
          </button>
        </div>
      </header>

      {/* Tabs & Search Area */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-8"
        style={{ borderColor: theme.colors.border }}
      >
        {/* Tabs */}
        <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('registrations')}
            className="pb-2 relative cursor-pointer transition-colors"
            style={{
              color: activeTab === 'registrations' ? theme.colors.accent : theme.colors.muted,
              fontWeight: activeTab === 'registrations' ? 600 : 500,
            }}
          >
            <span>REGISTRATIONS {rawRecords.length}</span>
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
              fontWeight: activeTab === 'submissions' ? 600 : 500,
            }}
          >
            <span>SUBMISSIONS {submissionRecords.length}</span>
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
              fontWeight: activeTab === 'pocs' ? 600 : 500,
            }}
          >
            <span>POCs {activePocs.length}</span>
            {activeTab === 'pocs' && (
              <div
                className="absolute bottom-[-17px] left-0 right-0 h-[2px]"
                style={{ backgroundColor: theme.colors.accent }}
              />
            )}
          </button>
        </div>

        {/* Minimal Search Bar (when on registrations/submissions) */}
        {activeTab !== 'pocs' && (
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.colors.muted }} />
            <input
              type="text"
              placeholder="SEARCH NAME, COLLEGE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-b py-1.5 pl-8 pr-3 text-xs font-normal uppercase outline-hidden tracking-wider"
              style={{
                backgroundColor: 'transparent',
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
          <div className="text-xs uppercase tracking-widest font-medium" style={{ color: theme.colors.muted }}>
            SYNCING LIVE ARCHIVE...
          </div>
        </div>
      ) : activeTab === 'pocs' ? (
        /* POCs View - Editorial Rows */
        <div className="space-y-6 max-w-2xl">
          <div className="text-xs font-medium uppercase tracking-wider" style={{ color: theme.colors.muted }}>
            POINTS OF CONTACT FOR {event.name}
          </div>
          <div className="divide-y" style={{ borderColor: theme.colors.border }}>
            {activePocs.map((poc, idx) => (
              <div
                key={idx}
                className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                style={{ borderTopColor: theme.colors.border }}
              >
                <div>
                  <div className="text-xs font-light tracking-tight mb-1" style={{ color: theme.colors.accent }}>
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold uppercase tracking-tight" style={{ color: theme.colors.text }}>
                    {poc.name}
                  </h3>
                  <div className="text-sm font-normal mt-1" style={{ color: theme.colors.muted }}>
                    {poc.phone}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider">
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
        /* Registrations / Submissions List: Large Editorial Rows */
        <div className="divide-y" style={{ borderColor: theme.colors.border }}>
          {filteredRecords.map((record, index) => {
            const entryNum = (index + 1).toString().padStart(2, '0');
            const hasSubmission = record.submissions && record.submissions.length > 0;
            const primarySubmission = hasSubmission ? record.submissions[0] : null;

            return (
              <div
                key={record.id || index}
                onClick={() => onSelectRecord(record)}
                className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group transition-all"
                style={{ borderTopColor: theme.colors.border }}
              >
                {/* Left: Number, Name, College */}
                <div className="flex items-start gap-4 sm:gap-8 flex-1 min-w-0">
                  {/* Entry Number: changes to accent on hover */}
                  <span
                    className="text-lg sm:text-2xl font-light w-8 sm:w-10 shrink-0 group-hover:text-accent transition-colors"
                    style={{ color: theme.colors.muted }}
                  >
                    {entryNum}
                  </span>

                  <div className="min-w-0 flex-1">
                    {/* Participant / Team Name */}
                    <h2
                      className="text-lg sm:text-2xl font-semibold tracking-tight uppercase leading-snug group-hover:translate-x-1 transition-transform"
                      style={{ color: theme.colors.text }}
                    >
                      {record.displayName}
                    </h2>

                    {/* College / Institution */}
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
                      className="text-xs font-medium uppercase tracking-wider hover:underline transition-colors"
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
    </div>
  );
};
