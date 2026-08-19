import React, { useState } from 'react';
import { X, Phone, Copy, Check, ExternalLink } from 'lucide-react';
import { POC, EventConfig } from '../types.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface POCOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventConfig;
  customPocs?: POC[];
}

export const POCOverlay: React.FC<POCOverlayProps> = ({ isOpen, onClose, event, customPocs }) => {
  const { theme } = useTheme();
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  if (!isOpen) return null;

  const pocList = (customPocs && customPocs.length > 0) ? customPocs : event.pocs;

  const handleCopy = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-outfit">
      <div
        className="w-full max-w-md p-6 sm:p-8 shadow-2xl relative border animate-in fade-in zoom-in-95 duration-150"
        style={{
          backgroundColor: theme.colors.bg,
          borderColor: theme.colors.border,
          color: theme.colors.text,
        }}
      >
        {/* Close Button */}
        <button
          id="close-poc-modal"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 transition-colors cursor-pointer"
          style={{ color: theme.colors.muted }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div
          className="border-b pb-4 mb-6"
          style={{ borderColor: theme.colors.border }}
        >
          <div
            className="text-xs font-medium tracking-wider uppercase mb-1"
            style={{ color: theme.colors.muted }}
          >
            POC DIRECTORY • TRACK {event.number}
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">
            {event.name}
          </h3>
        </div>

        {/* Minimal POC List: Name 600, Phone 400, Action 500 */}
        <div className="space-y-3 mb-6">
          {pocList.map((poc: POC, idx: number) => (
            <div
              key={idx}
              className="p-4 border flex items-center justify-between gap-4 transition-colors"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              }}
            >
              <div>
                <div
                  className="text-xs font-medium uppercase tracking-wider mb-0.5"
                  style={{ color: theme.colors.muted }}
                >
                  POC 0{idx + 1}
                </div>
                <div className="font-semibold text-base uppercase" style={{ color: theme.colors.text }}>
                  {poc.name}
                </div>
                <div className="text-xs font-normal mt-0.5" style={{ color: theme.colors.muted }}>
                  {poc.phone}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${poc.phone.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 text-white transition-all text-xs font-medium tracking-wider uppercase inline-flex items-center gap-1.5 shrink-0 hover:brightness-110"
                  style={{ backgroundColor: theme.colors.accent }}
                >
                  <Phone className="w-3 h-3" />
                  <span>CALL</span>
                </a>

                <button
                  onClick={() => handleCopy(poc.phone)}
                  title="Copy Phone Number"
                  className="p-1.5 border transition-all cursor-pointer hover:brightness-95"
                  style={{
                    backgroundColor: theme.colors.bg,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  }}
                >
                  {copiedPhone === poc.phone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Link to Unstop: Outfit 500 */}
        <div
          className="pt-4 border-t flex justify-between items-center text-xs"
          style={{ borderColor: theme.colors.border }}
        >
          <span className="text-xs font-normal uppercase tracking-wider" style={{ color: theme.colors.muted }}>
            UNSTOPP PORTAL
          </span>
          <a
            href={event.unstopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline uppercase inline-flex items-center gap-1"
            style={{ color: theme.colors.accent }}
          >
            <span>OPEN ↗</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
