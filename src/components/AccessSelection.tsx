import React, { useState } from 'react';
import { Lock, ArrowRight, X, Sun, Moon, KeyRound, BookOpen, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';
import { CORE_ACCESS_PASSWORD, AccessRole } from '../config/access.ts';

interface AccessSelectionProps {
  onSelectRole: (role: AccessRole) => void;
}

export const AccessSelection: React.FC<AccessSelectionProps> = ({ onSelectRole }) => {
  const { theme, themeId, toggleTheme } = useTheme();
  const isDark = themeId === 'black';

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const logoSrc = isDark ? '/ATHARV RANBHOOMI black.png' : '/ATHARV RANBHOOMI white.png';

  const handleSelectEC = () => {
    onSelectRole('ec');
  };

  const handleOpenCorePasswordModal = () => {
    setPasswordInput('');
    setErrorMessage(null);
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passwordInput.trim() === CORE_ACCESS_PASSWORD) {
      setIsPasswordModalOpen(false);
      onSelectRole('core');
    } else {
      setErrorMessage('Incorrect password. Please verify and try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between items-center px-6 py-8 sm:py-12 font-outfit select-none transition-colors duration-150"
      style={{
        backgroundColor: theme.colors.bg,
        color: theme.colors.text,
      }}
    >
      {/* Top Bar: Title & Theme Switcher */}
      <header className="w-full max-w-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: theme.colors.accent }}
          >
            ARB &apos;26
          </span>
          <span style={{ color: theme.colors.border }}>•</span>
          <span
            className="text-xs font-semibold tracking-wider uppercase"
            style={{ color: theme.colors.muted }}
          >
            IIM INDORE
          </span>
        </div>

        <button
          onClick={toggleTheme}
          className="px-3 py-1.5 border rounded-lg flex items-center gap-2 text-xs font-semibold tracking-wider uppercase transition-all hover:brightness-95 active:scale-95 cursor-pointer shadow-2xs"
          style={{
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
          }}
          title={isDark ? 'Switch to White mode' : 'Switch to Black mode'}
        >
          {isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>WHITE</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5" style={{ color: theme.colors.accent }} />
              <span>BLACK</span>
            </>
          )}
        </button>
      </header>

      {/* Center Container: Clean Editorial Card Layout */}
      <main className="w-full max-w-lg mx-auto my-auto py-8 text-center flex flex-col items-center">
        {/* ARB Logo */}
        <div className="mb-6">
          <img
            src={logoSrc}
            alt="Atharv Ranbhoomi Logo"
            className="h-20 sm:h-24 w-auto object-contain mx-auto transition-transform hover:scale-102"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Title */}
        <div className="mb-8">
          <span
            className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border mb-2 inline-block"
            style={{
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surface,
              color: theme.colors.accent,
            }}
          >
            CULTURAL FESTIVAL
          </span>
          <h1
            className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mt-1"
            style={{ color: theme.colors.text }}
          >
            EVENT CULTS
          </h1>
          <p className="text-xs sm:text-sm font-normal mt-1.5" style={{ color: theme.colors.muted }}>
            Select your access level to proceed to the portal
          </p>
        </div>

        {/* Access Role Cards */}
        <div className="w-full space-y-4">
          {/* Extended Core (EC) Option */}
          <button
            id="access-option-ec"
            onClick={handleSelectEC}
            className="w-full p-5 border rounded-2xl flex items-center justify-between text-left transition-all hover:brightness-95 active:scale-[0.99] cursor-pointer group shadow-xs"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            }}
          >
            <div className="flex items-start gap-4 min-w-0 flex-1 pr-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: theme.colors.bg,
                  borderColor: theme.colors.border,
                  color: theme.colors.accent,
                }}
              >
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="text-base font-bold uppercase tracking-tight"
                    style={{ color: theme.colors.text }}
                  >
                    Extended Core (EC)
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border"
                    style={{
                      borderColor: theme.colors.border,
                      backgroundColor: theme.colors.bg,
                      color: theme.colors.accent,
                    }}
                  >
                    PUBLIC EC
                  </span>
                </div>
                <p className="text-xs font-normal mt-1 leading-relaxed" style={{ color: theme.colors.muted }}>
                  Rule books, guidelines, and Points of Contact (POCs)
                </p>
              </div>
            </div>

            <ArrowRight
              className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1"
              style={{ color: theme.colors.accent }}
            />
          </button>

          {/* Core Team / PoCs Option */}
          <button
            id="access-option-core"
            onClick={handleOpenCorePasswordModal}
            className="w-full p-5 border rounded-2xl flex items-center justify-between text-left transition-all hover:brightness-95 active:scale-[0.99] cursor-pointer group shadow-xs"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            }}
          >
            <div className="flex items-start gap-4 min-w-0 flex-1 pr-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: theme.colors.bg,
                  borderColor: theme.colors.border,
                  color: theme.colors.accent,
                }}
              >
                <Users className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="text-base font-bold uppercase tracking-tight"
                    style={{ color: theme.colors.text }}
                  >
                    Core Team / PoCs
                  </span>
                  <Lock className="w-3.5 h-3.5" style={{ color: theme.colors.accent }} />
                </div>
                <p className="text-xs font-normal mt-1 leading-relaxed" style={{ color: theme.colors.muted }}>
                  Live registrations, sheets sync, attendee data, and submissions
                </p>
              </div>
            </div>

            <ArrowRight
              className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1"
              style={{ color: theme.colors.accent }}
            />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-lg text-center">
        <p className="text-xs uppercase tracking-widest font-medium" style={{ color: theme.colors.muted }}>
          ATHARV RANBHOOMI &apos;26 • IIM INDORE
        </p>
      </footer>

      {/* Clean Password Modal for Core Access */}
      {isPasswordModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={() => setIsPasswordModalOpen(false)}
        >
          <div
            id="core-password-modal"
            className="w-full max-w-sm p-6 border rounded-2xl shadow-2xl relative"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-md hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: theme.colors.muted }}
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <KeyRound className="w-4 h-4" style={{ color: theme.colors.accent }} />
              <h3 className="text-base font-bold uppercase tracking-tight" style={{ color: theme.colors.text }}>
                Core Team Access
              </h3>
            </div>
            <p className="text-xs font-normal mb-4" style={{ color: theme.colors.muted }}>
              Enter the core authorization key to unlock registration rosters and live sync
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <div>
                <input
                  id="core-password-input"
                  type="password"
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Enter Password"
                  className="w-full px-3.5 py-2.5 border rounded-xl text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: theme.colors.bg,
                    borderColor: errorMessage ? '#EF4444' : theme.colors.border,
                    color: theme.colors.text,
                  }}
                />
              </div>

              {errorMessage && (
                <p className="text-xs text-red-500 font-medium">
                  {errorMessage}
                </p>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1 px-3 py-2.5 border rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors hover:opacity-80 cursor-pointer"
                  style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.muted,
                  }}
                >
                  Cancel
                </button>
                <button
                  id="core-password-submit-btn"
                  type="submit"
                  className="flex-1 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110 cursor-pointer"
                  style={{
                    backgroundColor: theme.colors.accent,
                  }}
                >
                  Authorize
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
