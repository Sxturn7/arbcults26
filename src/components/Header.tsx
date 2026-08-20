import React from 'react';
import { ViewMode } from '../types.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { Sun, Moon, ArrowLeft, Lock, BookOpen } from 'lucide-react';
import { AccessRole, ACCESS_ROLES } from '../config/access.ts';

interface HeaderProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onSelectEvent?: (id: string | null) => void;
  onOpenThemeModal?: () => void;
  accessRole?: AccessRole | null;
  onExitAccess?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onSelectEvent,
  accessRole,
  onExitAccess,
}) => {
  const { theme, themeId, toggleTheme } = useTheme();

  const isDark = themeId === 'black';
  const logoSrc = isDark ? '/ATHARV RANBHOOMI black.png' : '/ATHARV RANBHOOMI white.png';
  const isEC = accessRole === 'ec';

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-150"
      style={{
        backgroundColor: `${theme.colors.bg}FA`,
        borderColor: theme.colors.border,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 h-16 sm:h-20 md:h-24 flex items-center justify-between gap-2">
        {/* Left Branding with Prominent Logo and Back to Portal button */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 min-w-0">
          {onExitAccess && (
            <button
              id="back-to-event-cults-btn"
              onClick={onExitAccess}
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 border rounded-lg text-xs font-semibold uppercase tracking-wider transition-all hover:brightness-95 active:scale-95 cursor-pointer shadow-2xs shrink-0"
              style={{
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
              }}
              title="Return to Portal Selection"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Portals</span>
            </button>
          )}

          <div
            id="header-brand"
            onClick={() => {
              if (onSelectEvent) onSelectEvent(null);
              onViewChange('events');
            }}
            className="cursor-pointer flex items-center gap-2.5 sm:gap-4 md:gap-5 group select-none py-1 min-w-0"
          >
            <img
              src={logoSrc}
              alt="Atharv Ranbhoomi Logo"
              className="h-9 sm:h-12 md:h-16 w-auto object-contain transition-transform group-hover:scale-102 shrink-0"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex flex-col justify-center min-w-0">
              <span
                className="text-sm sm:text-base md:text-lg font-bold tracking-tight uppercase leading-none truncate"
                style={{ color: theme.colors.text }}
              >
                ARB &apos;26
              </span>
              <span
                className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-wider uppercase mt-0.5"
                style={{ color: theme.colors.accent }}
              >
                CULTS
              </span>
            </div>
          </div>

          {/* Active Access Badge */}
          {accessRole && (
            <div
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase border"
              style={{
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surface,
                color: isEC ? theme.colors.text : theme.colors.accent,
              }}
            >
              {isEC ? <BookOpen className="w-3 h-3 text-emerald-600" /> : <Lock className="w-3 h-3" />}
              <span>{ACCESS_ROLES[accessRole].badge}</span>
            </div>
          )}
        </div>

        {/* Center / Right Navigation */}
        <nav className="flex items-center gap-2.5 sm:gap-4 md:gap-6 text-xs font-semibold tracking-wider uppercase shrink-0">
          <button
            id="nav-events-btn"
            onClick={() => {
              if (onSelectEvent) onSelectEvent(null);
              onViewChange('events');
            }}
            className="transition-colors relative py-1 cursor-pointer text-xs"
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

          {/* Core Team Only Database & Search */}
          {!isEC && (
            <>
              <button
                id="nav-database-btn"
                onClick={() => onViewChange('database')}
                className="transition-colors relative py-1 cursor-pointer text-xs"
                style={{
                  color: currentView === 'database' ? theme.colors.accent : theme.colors.text,
                }}
              >
                <span className="hidden sm:inline">DATABASE</span>
                <span className="sm:hidden">DATA</span>
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
                className="transition-colors relative py-1 cursor-pointer text-xs"
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
            </>
          )}

          {/* Theme 1-Click Switcher Toggle */}
          <button
            id="theme-trigger-btn"
            onClick={toggleTheme}
            title={`Switch to ${isDark ? 'White' : 'Black'} theme`}
            className="px-2.5 sm:px-3 py-1.5 border rounded-lg flex items-center gap-1.5 sm:gap-2 text-xs font-semibold tracking-wider cursor-pointer transition-all hover:brightness-95 active:scale-95 shadow-2xs"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              color: theme.colors.text,
            }}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="uppercase text-xs hidden sm:inline">WHITE</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5" style={{ color: theme.colors.accent }} />
                <span className="uppercase text-xs hidden sm:inline">BLACK</span>
              </>
            )}
          </button>

          {/* Exit Button */}
          {onExitAccess && (
            <button
              id="exit-portal-btn"
              onClick={onExitAccess}
              title="Exit portal"
              className="p-1.5 sm:px-3 sm:py-1.5 border rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-red-500/10 cursor-pointer flex items-center gap-1.5 shadow-2xs"
              style={{
                borderColor: !isEC ? theme.colors.accent : theme.colors.border,
                color: !isEC ? theme.colors.accent : theme.colors.muted,
              }}
            >
              {!isEC && <Lock className="w-3 h-3" />}
              <span className="hidden sm:inline">Exit</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
