import React, { useState } from 'react';
import {
  ArrowLeft,
  X,
  Phone,
  Mail,
  Check,
  Share2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { NormalizedRegistration, EventConfig } from '../types.ts';
import { getEventById } from '../config/events.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface RegistrationDetailProps {
  record: NormalizedRegistration | null;
  onClose: () => void;
  onOpenPOCs?: (event: EventConfig) => void;
}

export const RegistrationDetail: React.FC<RegistrationDetailProps> = ({
  record,
  onClose,
  onOpenPOCs,
}) => {
  const { theme } = useTheme();
  const [showRawData, setShowRawData] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!record) return null;

  const eventConfig = getEventById(record.eventId);

  const handleCopySummary = () => {
    const text = `ARB '26 Registration / ${record.eventName}\nID: ${record.id}\nName: ${record.displayName}\nCollege: ${record.college || 'N/A'}\nEmails: ${record.emails.join(', ') || 'N/A'}\nContacts: ${record.contacts.join(', ') || 'N/A'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasSubmissions = record.submissions && record.submissions.length > 0;
  const memberCount = record.participants?.length || 1;

  // Determine submission action label
  const getSubmissionLabel = (sub: { label: string; url: string; type?: string }) => {
    const urlLower = sub.url.toLowerCase();
    if (urlLower.includes('drive.google.com') || urlLower.includes('docs.google.com')) {
      return 'OPEN DRIVE ↗';
    }
    if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be') || sub.type === 'video') {
      return 'OPEN VIDEO ↗';
    }
    if (sub.type === 'art' || urlLower.includes('instagram.com') || urlLower.includes('behance.net')) {
      return 'VIEW ARTWORK ↗';
    }
    return 'OPEN SUBMISSION ↗';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs font-outfit"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl h-full overflow-y-auto p-6 sm:p-12 shadow-2xl flex flex-col justify-between border-l animate-in slide-in-from-right duration-200"
        style={{
          backgroundColor: theme.colors.bg,
          borderColor: theme.colors.border,
          color: theme.colors.text,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-10">
          {/* Editorial Top Navigation Header */}
          <div
            className="flex items-center justify-between pb-6 border-b"
            style={{ borderColor: theme.colors.border }}
          >
            {/* Back to Event */}
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider group transition-colors cursor-pointer"
              style={{ color: theme.colors.text }}
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span className="group-hover:underline">← {record.eventName}</span>
            </button>

            {/* Utility Actions: ID, POCs, Share, Close */}
            <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider">
              {eventConfig && onOpenPOCs && (
                <button
                  onClick={() => onOpenPOCs(eventConfig)}
                  className="hover:underline cursor-pointer transition-colors"
                  style={{ color: theme.colors.accent }}
                >
                  POCs ({eventConfig.pocs.length}) ↗
                </button>
              )}

              <button
                onClick={handleCopySummary}
                title="Copy Record Summary"
                className="hover:underline cursor-pointer inline-flex items-center gap-1 transition-colors"
                style={{ color: theme.colors.muted }}
              >
                {copied ? (
                  <span className="text-emerald-600 inline-flex items-center gap-1">
                    <Check className="w-3 h-3" /> COPIED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <Share2 className="w-3 h-3" /> SHARE ↗
                  </span>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-1 cursor-pointer transition-colors hover:opacity-70"
                style={{ color: theme.colors.muted }}
                aria-label="Close detail panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Record Metadata Line */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-normal" style={{ color: theme.colors.muted }}>
            <span className="font-medium" style={{ color: theme.colors.text }}>{record.id}</span>
            {record.timestamp && (
              <>
                <span>•</span>
                <span>{record.timestamp}</span>
              </>
            )}
            <span>•</span>
            <span className="uppercase font-medium" style={{ color: theme.colors.accent }}>
              {record.type.toUpperCase()}
            </span>
          </div>

          {/* Dominant Content: Participant / Team Name (Huge Outfit 700, no box) */}
          <div>
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-none break-words"
              style={{ color: theme.colors.text }}
            >
              {record.displayName}
            </h1>
          </div>

          {/* Institution / College (Whitespace + Typography, No Boxes) */}
          {record.college && (
            <div className="space-y-1.5 pt-2">
              <div
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: theme.colors.muted }}
              >
                INSTITUTION
              </div>
              <div
                className="text-base sm:text-lg font-normal leading-relaxed"
                style={{ color: theme.colors.text }}
              >
                {record.college}
              </div>
              {record.collegeId && (
                <div className="text-xs font-normal pt-0.5" style={{ color: theme.colors.muted }}>
                  ID: <span style={{ color: theme.colors.text }}>{record.collegeId}</span>
                </div>
              )}
            </div>
          )}

          {/* Contact Details (Clean Aligned Information) */}
          {((record.contacts && record.contacts.length > 0) || (record.emails && record.emails.length > 0) || record.leader) && (
            <div className="space-y-4 pt-2">
              <div
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: theme.colors.muted }}
              >
                CONTACT
              </div>

              <div className="space-y-3 text-sm">
                {/* Phones */}
                {record.contacts && record.contacts.length > 0 && (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <span className="text-xs font-medium uppercase w-16 shrink-0" style={{ color: theme.colors.muted }}>
                      PHONE
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      {record.contacts.map((phone, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="font-normal" style={{ color: theme.colors.text }}>{phone}</span>
                          <a
                            href={`tel:${phone.replace(/\s+/g, '')}`}
                            className="text-xs font-medium uppercase hover:underline inline-flex items-center gap-1"
                            style={{ color: theme.colors.accent }}
                          >
                            <Phone className="w-3 h-3" /> CALL ↗
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Emails */}
                {record.emails && record.emails.length > 0 && (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <span className="text-xs font-medium uppercase w-16 shrink-0" style={{ color: theme.colors.muted }}>
                      EMAIL
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      {record.emails.map((email, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="font-normal" style={{ color: theme.colors.text }}>{email}</span>
                          <a
                            href={`mailto:${email}`}
                            className="text-xs font-medium uppercase hover:underline inline-flex items-center gap-1"
                            style={{ color: theme.colors.accent }}
                          >
                            <Mail className="w-3 h-3" /> MAIL ↗
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submissions Section (Prominent Text Action, No Raw URL) */}
          <div className="space-y-3 pt-2">
            <div
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: theme.colors.muted }}
            >
              SUBMISSION
            </div>

            {hasSubmissions ? (
              <div className="space-y-3">
                {record.submissions.map((sub, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <a
                      href={sub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-semibold uppercase hover:underline inline-flex items-center gap-2 transition-colors"
                      style={{ color: theme.colors.accent }}
                    >
                      <span>{getSubmissionLabel(sub)}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs font-normal" style={{ color: theme.colors.muted }}>
                NO DIGITAL SUBMISSION RECORDED
              </div>
            )}
          </div>

          {/* Registered Members Section (Clean list with thin dividers) */}
          {record.participants && record.participants.length > 0 && (
            <div className="space-y-4 pt-4 border-t" style={{ borderColor: theme.colors.border }}>
              <div
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: theme.colors.muted }}
              >
                MEMBERS {memberCount}
              </div>

              <div className="divide-y" style={{ borderColor: theme.colors.border }}>
                {record.participants.map((p, idx) => (
                  <div
                    key={idx}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    style={{ borderTopColor: theme.colors.border }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-xs font-light w-5 shrink-0" style={{ color: theme.colors.accent }}>
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <div>
                        <div className="font-semibold text-sm uppercase" style={{ color: theme.colors.text }}>
                          {p.name}
                        </div>
                        {p.college && (
                          <div className="text-xs font-normal mt-0.5" style={{ color: theme.colors.muted }}>
                            {p.college}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider pl-9 sm:pl-0">
                      {p.contact && (
                        <a
                          href={`tel:${p.contact.replace(/\s+/g, '')}`}
                          className="hover:underline transition-colors"
                          style={{ color: theme.colors.accent }}
                        >
                          CALL ↗
                        </a>
                      )}
                      {p.email && (
                        <a
                          href={`mailto:${p.email}`}
                          className="hover:underline transition-colors"
                          style={{ color: theme.colors.muted }}
                        >
                          MAIL ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Raw Spreadsheet Data (Hidden behind tiny admin disclosure) */}
          <div className="pt-6 border-t" style={{ borderColor: theme.colors.border }}>
            <button
              onClick={() => setShowRawData(!showRawData)}
              className="text-xs font-medium uppercase tracking-wider cursor-pointer hover:underline inline-flex items-center gap-1.5 transition-colors"
              style={{ color: theme.colors.muted }}
            >
              <span>{showRawData ? 'HIDE RAW SOURCE DATA -' : 'VIEW RAW SOURCE DATA +'}</span>
              {showRawData ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showRawData && (
              <div
                className="mt-4 p-4 border text-xs space-y-2 overflow-x-auto"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                }}
              >
                {Object.entries(record.rawData).map(([key, val]) => (
                  <div key={key} className="border-b pb-1" style={{ borderColor: theme.colors.border }}>
                    <span className="font-medium" style={{ color: theme.colors.muted }}>{key}: </span>
                    <span className="break-all font-normal" style={{ color: theme.colors.text }}>{val || 'N/A'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation (Clean Back Link, No Giant Black Button) */}
        <div
          className="pt-10 mt-10 border-t flex items-center justify-between text-xs font-medium uppercase tracking-wider"
          style={{ borderColor: theme.colors.border }}
        >
          <button
            onClick={onClose}
            className="hover:underline cursor-pointer transition-colors"
            style={{ color: theme.colors.muted }}
          >
            ← BACK TO {record.eventName}
          </button>

          <span style={{ color: theme.colors.muted }}>
            RECORD {record.id}
          </span>
        </div>
      </div>
    </div>
  );
};
