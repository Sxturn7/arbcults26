import React from 'react';
import { ViewMode } from '../types.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onSelectEvent?: (id: string | null) => void;
  onOpenThemeModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onSelectEvent,
}) => {
  const { theme, themeId, toggleTheme } = useTheme();

  const isDark = themeId === 'black';
  const logoSrc = isDark ? '/ATHARV RANBHOOMI black.png' : '/ATHARV RANBHOOMI white.png';

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-150"
      style={{
        backgroundColor: `${theme.colors.bg}FA`,
        borderColor: theme.colors.border,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 sm:h-24 flex items-center justify-between">
        {/* Left Branding with Prominent Logo */}
        <div
          id="header-brand"
          onClick={() => {
            if (onSelectEvent) onSelectEvent(null);
            onViewChange('events');
          }}
          className="cursor-pointer flex items-center gap-4 sm:gap-5 group select-none py-2"
        >
          <img
            src={logoSrc}
            alt="Atharv Ranbhoomi Logo"
            className="h-12 sm:h-16 w-auto object-contain transition-transform group-hover:scale-102"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col justify-center">
            <span
              className="text-base sm:text-lg font-bold tracking-tight uppercase leading-none"
              style={{ color: theme.colors.text }}
            >
              ARB &apos;26
            </span>
            <span
              className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase mt-0.5"
              style={{ color: theme.colors.accent }}
            >
              CULTS
            </span>
          </div>
        </div>

        {/* Center / Right Nav: Outfit 500 (Medium) */}
        <nav className="flex items-center gap-5 sm:gap-8 text-xs font-medium tracking-wider uppercase">
          <button
            id="nav-events-btn"
            onClick={() => {
              if (onSelectEvent) onSelectEvent(null);
              onViewChange('events');
            }}
            className="transition-colors relative py-1 cursor-pointer"
            style={{
              color: currentView === 'events' ? theme.colors.accent : theme.colors.text,
            }}
          >
            EVENTS
            {currentView === 'events' && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ backgroundColor: theme.colors.accent }}
              />
            )}
          </button>

          <button
            id="nav-database-btn"
            onClick={() => onViewChange('database')}
            className="transition-colors relative py-1 cursor-pointer"
            style={{
              color: currentView === 'database' ? theme.colors.accent : theme.colors.text,
            }}
          >
            DATABASE
            {currentView === 'database' && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ backgroundColor: theme.colors.accent }}
              />
            )}
          </button>

          <button
            id="nav-search-btn"
            onClick={() => onViewChange('search')}
            className="transition-colors relative py-1 cursor-pointer"
            style={{
              color: currentView === 'search' ? theme.colors.accent : theme.colors.text,
            }}
          >
            SEARCH
            {currentView === 'search' && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ backgroundColor: theme.colors.accent }}
              />
            )}
          </button>

          {/* Theme 1-Click Switcher Toggle (Outfit 500) */}
          <button
            id="theme-trigger-btn"
            onClick={toggleTheme}
            title={`Switch to ${isDark ? 'White' : 'Black'} theme`}
            className="px-3 py-1.5 border flex items-center gap-2 text-[11px] font-medium tracking-wider cursor-pointer transition-all hover:brightness-95 active:scale-95 shadow-xs"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              color: theme.colors.text,
            }}
          >
            {isDark ? (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-400" />
                <span className="uppercase text-[11px] font-medium">BLACK</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5" style={{ color: theme.colors.accent }} />
                <span className="uppercase text-[11px] font-medium">WHITE</span>
              </>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
