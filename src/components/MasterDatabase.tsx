import React, { useState, useEffect, useMemo } from 'react';
import { Search, Download, RefreshCw, Film, ArrowRight } from 'lucide-react';
import { NormalizedRegistration } from '../types.ts';
import { EVENTS_REGISTRY } from '../config/events.ts';
import { AccessRole } from '../config/access.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { getMasterDatabase } from '../services/dataService.ts';

interface MasterDatabaseProps {
  onSelectRecord: (record: NormalizedRegistration) => void;
  onSelectEvent: (eventId: string) => void;
  accessRole?: AccessRole | null;
}

export const MasterDatabase: React.FC<MasterDatabaseProps> = ({
  onSelectRecord,
  onSelectEvent,
  accessRole,
}) => {
  const { theme } = useTheme();
  const isEC = accessRole === 'ec';
  const [records, setRecords] = useState<NormalizedRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [onlySubmissions, setOnlySubmissions] = useState(false);

  const fetchDatabase = async (force = false) => {
    try {
      if (force) setRefreshing(true);
      else setLoading(true);

      const data = await getMasterDatabase(force);
      if (data) {
        setRecords(data);
      }
    } catch (err) {
      console.error('Failed to load master database:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDatabase(false);
  }, []);

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      // Event filter
      if (selectedEventId !== 'ALL' && r.eventId !== selectedEventId) return false;

      // Type filter
      if (selectedType !== 'ALL' && r.type !== selectedType) return false;

      // Submissions only (only allowed for Core Team)
      if (!isEC && onlySubmissions && (!r.submissions || r.submissions.length === 0)) return false;

      // Search query
      if (!query.trim()) return true;
      const q = query.toLowerCase();

      const inName = r.displayName.toLowerCase().includes(q);
      const inCollege = (r.college || '').toLowerCase().includes(q);
      const inEvent = r.eventName.toLowerCase().includes(q);
      const inEmail = r.emails.some((e) => e.toLowerCase().includes(q));
      const inContact = r.contacts.some((c) => c.toLowerCase().includes(q));
      const inParticipants = r.participants.some((p) => p.name.toLowerCase().includes(q));
      const inId = r.id.toLowerCase().includes(q);

      return inName || inCollege || inEvent || inEmail || inContact || inParticipants || inId;
    });
  }, [records, selectedEventId, selectedType, onlySubmissions, query, isEC]);

  const handleExportCSV = () => {
    if (filteredRecords.length === 0) return;
    const headers = isEC
      ? ['Entry ID', 'Event ID', 'Event Name', 'Participant / Team', 'Type', 'College', 'Emails', 'Contacts', 'Timestamp']
      : ['Entry ID', 'Event ID', 'Event Name', 'Participant / Team', 'Type', 'College', 'Emails', 'Contacts', 'Submissions', 'Timestamp'];

    const rows = filteredRecords.map((r) => {
      const baseRow = [
        `"${r.id}"`,
        `"${r.eventId}"`,
        `"${r.eventName}"`,
        `"${r.displayName}"`,
        `"${r.type}"`,
        `"${r.college || ''}"`,
        `"${r.emails.join('; ')}"`,
        `"${r.contacts.join('; ')}"`,
      ];
      if (!isEC) {
        baseRow.push(`"${r.submissions.map((s) => s.url).join('; ')}"`);
      }
      baseRow.push(`"${r.timestamp || ''}"`);
      return baseRow;
    });

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ARB26_CULTS_DATABASE_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-6 sm:py-8 md:py-12 font-outfit">
      {/* Header */}
      <div
        className="border-b pb-4 sm:pb-6 mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6"
        style={{ borderColor: theme.colors.border }}
      >
        <div>
          <div
            className="text-[10px] sm:text-xs font-medium tracking-wider uppercase mb-1"
            style={{ color: theme.colors.muted }}
          >
            ATHARV RANBHOOMI &apos;26 • MASTER REGISTRY
          </div>
          <h1
            className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase"
            style={{ color: theme.colors.text }}
          >
            DATABASE
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => fetchDatabase(true)}
            disabled={refreshing || loading}
            className="px-3 sm:px-4 py-2 border transition-all text-xs font-medium tracking-wider uppercase inline-flex items-center gap-1.5 sm:gap-2 cursor-pointer disabled:opacity-50 hover:brightness-95 shadow-2xs"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              color: theme.colors.text,
            }}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'SYNCING...' : 'SYNC ALL'}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 sm:px-4 py-2 text-white transition-all text-xs font-medium tracking-wider uppercase inline-flex items-center gap-1.5 sm:gap-2 cursor-pointer hover:brightness-110 shadow-2xs"
            style={{ backgroundColor: theme.colors.accent }}
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      {/* Query & Filter Bar */}
      <div
        className="border p-4 sm:p-6 mb-8 space-y-4"
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        }}
      >
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: theme.colors.muted }} />
          <input
            type="text"
            placeholder="SEARCH BY NAME, COLLEGE, EMAIL, OR RECORD ID..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border py-2.5 pl-11 pr-4 text-xs sm:text-sm outline-hidden uppercase tracking-wider font-normal"
            style={{
              backgroundColor: theme.colors.bg,
              borderColor: theme.colors.border,
              color: theme.colors.text,
            }}
          />
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t"
          style={{ borderColor: theme.colors.border }}
        >
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Event Filter */}
            <div className="flex items-center gap-2">
              <span className="uppercase text-xs font-medium" style={{ color: theme.colors.muted }}>
                EVENT:
              </span>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="border px-3 py-1.5 text-xs font-normal outline-hidden uppercase cursor-pointer"
                style={{
                  backgroundColor: theme.colors.bg,
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                }}
              >
                <option value="ALL">ALL 15 EVENTS</option>
                {EVENTS_REGISTRY.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.number} {e.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <span className="uppercase text-xs font-medium" style={{ color: theme.colors.muted }}>
                TYPE:
              </span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border px-3 py-1.5 text-xs font-normal outline-hidden uppercase cursor-pointer"
                style={{
                  backgroundColor: theme.colors.bg,
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                }}
              >
                <option value="ALL">ALL TYPES</option>
                <option value="team">TEAM</option>
                <option value="individual">INDIVIDUAL</option>
                <option value="solo">SOLO</option>
                <option value="duet">DUET</option>
              </select>
            </div>

            {/* Only Submissions toggle (Core Team only) */}
            {!isEC && (
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlySubmissions}
                  onChange={(e) => setOnlySubmissions(e.target.checked)}
                />
                <span className="uppercase text-xs font-medium" style={{ color: theme.colors.text }}>
                  SUBMISSIONS ONLY
                </span>
              </label>
            )}
          </div>

          {!isEC && (
            <div className="text-xs font-normal" style={{ color: theme.colors.muted }}>
              SHOWING <span className="font-semibold" style={{ color: theme.colors.text }}>{filteredRecords.length}</span> OF{' '}
              <span className="font-semibold" style={{ color: theme.colors.text }}>{records.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4" style={{ color: theme.colors.muted }}>
          <RefreshCw className="w-6 h-6 animate-spin" style={{ color: theme.colors.accent }} />
          <div className="text-xs tracking-wider uppercase font-medium">
            LOADING LIVE DATABASE...
          </div>
        </div>
      ) : filteredRecords.length > 0 ? (
        <div className="overflow-x-auto border" style={{ borderColor: theme.colors.border }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="border-b text-xs font-medium uppercase tracking-wider"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  color: theme.colors.muted,
                }}
              >
                <th className="py-3 px-4 w-12 font-medium">#</th>
                <th className="py-3 px-4 w-36 font-medium">EVENT</th>
                <th className="py-3 px-4 w-32 font-medium">ENTRY ID</th>
                <th className="py-3 px-4 font-medium">PARTICIPANT / TEAM</th>
                <th className="py-3 px-4 font-medium">INSTITUTION</th>
                <th className="py-3 px-4 w-36 font-medium">CONTACT</th>
                {!isEC && <th className="py-3 px-4 w-28 text-center font-medium">SUBMISSION</th>}
                <th className="py-3 px-4 w-16 text-right font-medium"></th>
              </tr>
            </thead>
            <tbody
              className="divide-y text-xs"
              style={{
                backgroundColor: theme.colors.bg,
                borderColor: theme.colors.border,
              }}
            >
              {filteredRecords.map((r, idx) => (
                <tr
                  key={r.id || idx}
                  onClick={() => onSelectRecord(r)}
                  className="hover:brightness-95 cursor-pointer transition-all group"
                  style={{ borderTopColor: theme.colors.border }}
                >
                  <td className="py-3.5 px-4 font-light" style={{ color: theme.colors.muted }}>
                    {(idx + 1).toString().padStart(2, '0')}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvent(r.eventId);
                      }}
                      className="font-medium uppercase hover:underline text-left cursor-pointer"
                      style={{ color: theme.colors.accent }}
                    >
                      {r.eventName}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 font-normal" style={{ color: theme.colors.muted }}>
                    {r.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold uppercase" style={{ color: theme.colors.text }}>
                      {r.displayName}
                    </div>
                    {r.teamName && (
                      <div className="text-[11px] uppercase font-normal" style={{ color: theme.colors.muted }}>
                        {r.teamName}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-normal" style={{ color: theme.colors.muted }}>
                    {r.college || '—'}
                  </td>
                  <td className="py-3.5 px-4 font-normal" style={{ color: theme.colors.muted }}>
                    <div>{r.contacts[0] || '—'}</div>
                    <div className="text-[11px] truncate max-w-[140px]">{r.emails[0] || ''}</div>
                  </td>
                  {!isEC && (
                    <td className="py-3.5 px-4 text-center">
                      {r.submissions && r.submissions.length > 0 ? (
                        <span
                          className="px-2 py-0.5 text-[11px] font-semibold uppercase border rounded inline-flex items-center gap-1"
                          style={{
                            borderColor: theme.colors.border,
                            backgroundColor: theme.colors.surface,
                            color: theme.colors.accent,
                          }}
                        >
                          <Film className="w-3 h-3" />
                          <span>{r.submissions.length}</span>
                        </span>
                      ) : (
                        <span style={{ color: theme.colors.muted }}>—</span>
                      )}
                    </td>
                  )}
                  <td className="py-3.5 px-4 text-right">
                    <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all inline" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-20 text-center border" style={{ borderColor: theme.colors.border }}>
          <p className="text-xs uppercase tracking-wider font-normal" style={{ color: theme.colors.muted }}>
            NO RECORDS MATCH YOUR FILTERS
          </p>
        </div>
      )}
    </div>
  );
};
