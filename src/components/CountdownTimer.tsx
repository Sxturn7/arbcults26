import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isStarted: boolean;
}

export const CountdownTimer: React.FC = () => {
  const { theme } = useTheme();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const currentYear = now.getFullYear();
    // October 30 of the current year (Month 9 is October in 0-indexed JS Date)
    let festDate = new Date(currentYear, 9, 30, 0, 0, 0);

    // If October 30 has already passed this year, target next year
    if (now.getTime() > festDate.getTime() + 3 * 24 * 60 * 60 * 1000) {
      festDate = new Date(currentYear + 1, 9, 30, 0, 0, 0);
    }

    const difference = festDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isStarted: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isStarted: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes, shortLabel: 'MINS' },
    { label: 'SECONDS', value: timeLeft.seconds, shortLabel: 'SECS' },
  ];

  return (
    <div
      id="fest-countdown-container"
      className="p-4 sm:p-6 rounded-2xl border transition-all shadow-2xs mb-6 sm:mb-10"
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        {/* Left Label / Context */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" style={{ color: theme.colors.accent }} />
            <span
              className="text-[11px] sm:text-xs font-bold tracking-widest uppercase"
              style={{ color: theme.colors.accent }}
            >
              30TH OCTOBER • ATHARV RANBHOOMI 26&apos;
            </span>
          </div>
          <p
            className="text-xs sm:text-sm font-medium tracking-tight"
            style={{ color: theme.colors.text }}
          >
            {timeLeft.isStarted ? 'Atharv Ranbhoomi is Live!' : 'Countdown to Atharv Ranbhoomi 26\''}
          </p>
        </div>

        {/* Right: Digital Countdown Blocks */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center justify-center min-w-[3.5rem] sm:min-w-[4.25rem] px-2.5 py-1.5 sm:py-2 rounded-xl border"
              style={{
                backgroundColor: theme.colors.bg,
                borderColor: theme.colors.border,
              }}
            >
              <span
                className="text-lg sm:text-2xl font-black tracking-tight leading-tight tabular-nums"
                style={{ color: theme.colors.text }}
              >
                {String(unit.value).padStart(2, '0')}
              </span>
              <span
                className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mt-0.5"
                style={{ color: theme.colors.muted }}
              >
                <span className="hidden sm:inline">{unit.label}</span>
                <span className="sm:hidden">{unit.shortLabel || unit.label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
