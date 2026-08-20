import React from 'react';
import { useTheme } from '../context/ThemeContext.tsx';
import { eventCultsBrochureUrl, arbEventBrochureUrl } from '../config/events.ts';

interface FooterProps {
  onRefreshData?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRefreshData }) => {
  const { theme } = useTheme();

  return (
    <footer
      className="px-6 sm:px-12 py-5 flex flex-col sm:flex-row items-center justify-between mt-auto border-t gap-4 font-outfit transition-colors"
      style={{
        backgroundColor: theme.colors.darkBar,
        color: theme.colors.darkBarText,
        borderColor: theme.colors.border,
      }}
    >
      <div className="flex flex-wrap items-center gap-6 sm:gap-8">
        <span
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: theme.colors.muted }}
        >
          DIRECT ACCESS
        </span>
        <div className="flex flex-wrap items-center gap-6 text-xs font-medium tracking-wider uppercase">
          <a
            href={eventCultsBrochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer transition-colors hover:underline font-semibold"
            style={{ color: theme.colors.accent }}
            title="Cultural Events Brochure Only"
          >
            EVENT CULTS BROCHURE ↗
          </a>
          <a
            href="https://unstop.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer transition-colors hover:underline"
            style={{ color: theme.colors.darkBarText }}
          >
            UNSTOPP ↗
          </a>
          <span style={{ color: theme.colors.muted }} className="hidden sm:inline">•</span>
          <span className="text-xs font-normal tracking-wider uppercase" style={{ color: theme.colors.muted }}>
            ATHARV RANBHOOMI &apos;26
          </span>
        </div>
      </div>

      <div className="text-xs font-normal tracking-wider uppercase flex items-center gap-2" style={{ color: theme.colors.muted }}>
        <span>ARCHIVE CONTROL</span>
        {onRefreshData && (
          <>
            <span>•</span>
            <button
              onClick={onRefreshData}
              className="transition-colors cursor-pointer font-medium hover:underline"
              style={{ color: theme.colors.darkBarText }}
            >
              SYNC ↻
            </button>
          </>
        )}
      </div>
    </footer>
  );
};
