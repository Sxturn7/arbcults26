import React, { useEffect } from 'react';
import { X, Check, Sun, Moon } from 'lucide-react';
import { useTheme, THEMES } from '../context/ThemeContext.tsx';
import { ThemeId } from '../types.ts';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose }) => {
  const { themeId, setThemeId, theme } = useTheme();

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const themes: ThemeId[] = ['white', 'black'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 font-outfit"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md shadow-2xl relative border overflow-hidden animate-in zoom-in-95 duration-150"
        style={{
          backgroundColor: theme.colors.bg,
          borderColor: theme.colors.border,
          color: theme.colors.text,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          }}
        >
          <span
            className="text-xs font-medium tracking-wider uppercase"
            style={{ color: theme.colors.muted }}
          >
            THEME • ATHARV RANBHOOMI &apos;26
          </span>

          <button
            onClick={onClose}
            className="p-1 transition-colors cursor-pointer hover:opacity-70"
            style={{ color: theme.colors.muted }}
            aria-label="Close theme selector"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: 2 Themes */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {themes.map((id) => {
              const t = THEMES[id];
              const isSelected = themeId === id;
              const Icon = id === 'white' ? Sun : Moon;

              return (
                <button
                  key={id}
                  onClick={() => {
                    setThemeId(id);
                  }}
                  className="p-4 border text-left transition-all cursor-pointer relative group flex flex-col justify-between h-36"
                  style={{
                    backgroundColor: t.colors.bg,
                    borderColor: isSelected ? theme.colors.accent : theme.colors.border,
                    borderWidth: isSelected ? '2px' : '1px',
                  }}
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="w-4 h-4"
                        style={{ color: isSelected ? t.colors.accent : t.colors.muted }}
                      />
                      <span
                        className="text-xs font-light tracking-tight"
                        style={{ color: isSelected ? t.colors.accent : t.colors.muted }}
                      >
                        {t.number}
                      </span>
                    </div>

                    {isSelected && (
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: t.colors.accent, color: '#FFFFFF' }}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h4
                      className="font-bold text-base tracking-tight uppercase"
                      style={{ color: t.colors.text }}
                    >
                      {id.toUpperCase()}
                    </h4>
                    <p
                      className="text-xs mt-0.5 leading-snug font-normal"
                      style={{ color: t.colors.muted }}
                    >
                      {id === 'white' ? 'Light mode (White logo)' : 'Dark mode (Black logo)'}
                    </p>
                  </div>

                  {/* Micro color chips */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <div
                      className="h-2 w-6 rounded-xs border"
                      style={{ backgroundColor: t.colors.bg, borderColor: t.colors.border }}
                    />
                    <div
                      className="h-2 w-6 rounded-xs"
                      style={{ backgroundColor: t.colors.accent }}
                    />
                    <div
                      className="h-2 w-6 rounded-xs"
                      style={{ backgroundColor: t.colors.text }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info bar */}
        <div
          className="px-6 py-3 border-t text-xs flex items-center justify-between"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            color: theme.colors.muted,
          }}
        >
          <span className="font-medium">ACTIVE: {themeId.toUpperCase()}</span>
          <button
            onClick={onClose}
            className="font-medium uppercase tracking-wider px-4 py-1.5 text-white text-xs cursor-pointer transition-opacity hover:opacity-90"
            style={{ backgroundColor: theme.colors.accent }}
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};
