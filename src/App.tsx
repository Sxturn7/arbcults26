import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { EventList } from './components/EventList.tsx';
import { EventWorkspace } from './components/EventWorkspace.tsx';
import { MasterDatabase } from './components/MasterDatabase.tsx';
import { GlobalSearch } from './components/GlobalSearch.tsx';
import { RegistrationDetail } from './components/RegistrationDetail.tsx';
import { POCOverlay } from './components/POCOverlay.tsx';
import { ThemeModal } from './components/ThemeModal.tsx';
import { PixelSnow } from './components/reactbits/PixelSnow.tsx';
import { ViewMode, NormalizedRegistration, EventConfig, POC } from './types.ts';
import { getEventById } from './config/events.ts';
import { ThemeProvider, useTheme } from './context/ThemeContext.tsx';

function AppContent() {
  const { theme, themeId } = useTheme();
  const [currentView, setCurrentView] = useState<ViewMode>('events');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<NormalizedRegistration | null>(null);
  const [pocModalEvent, setPocModalEvent] = useState<EventConfig | null>(null);
  const [pocModalCustomPocs, setPocModalCustomPocs] = useState<POC[] | undefined>(undefined);
  const [themeModalOpen, setThemeModalOpen] = useState(false);

  const selectedEventConfig = selectedEventId ? getEventById(selectedEventId) : null;

  const handleSelectEvent = (eventId: string | null) => {
    setSelectedEventId(eventId);
    if (eventId) {
      setCurrentView('events');
    }
  };

  const handleViewChange = (view: ViewMode) => {
    setCurrentView(view);
    if (view !== 'events') {
      setSelectedEventId(null);
    }
  };

  const handleOpenPOCs = (event: EventConfig, customPocs?: POC[]) => {
    setPocModalEvent(event);
    setPocModalCustomPocs(customPocs);
  };

  const isDark = themeId === 'black';

  return (
    <div
      className="min-h-screen flex flex-col font-sans transition-colors duration-200 relative overflow-x-hidden"
      style={{
        backgroundColor: theme.colors.bg,
        color: theme.colors.text,
      }}
    >
      {/* React Bits: PixelSnow with subtle, balanced ambient density */}
      {isDark ? (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-15 transition-opacity">
          <PixelSnow
            color="#FFFFFF"
            density={0.08}
            speed={0.4}
            flakeSize={0.008}
            minFlakeSize={0.8}
            pixelResolution={140}
            brightness={0.7}
            variant="square"
          />
        </div>
      ) : (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-5 transition-opacity">
          <PixelSnow
            color="#6B7280"
            density={0.005}
            speed={0.25}
            flakeSize={0.004}
            minFlakeSize={0.6}
            pixelResolution={120}
            brightness={0.2}
            variant="square"
          />
        </div>
      )}

      {/* Top Fixed Header */}
      <div className="relative z-10">
        <Header
          currentView={currentView}
          onViewChange={handleViewChange}
          onSelectEvent={handleSelectEvent}
          onOpenThemeModal={() => setThemeModalOpen(true)}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {currentView === 'events' && (
          <>
            {selectedEventConfig ? (
              <EventWorkspace
                event={selectedEventConfig}
                onBack={() => setSelectedEventId(null)}
                onSelectRecord={(rec) => setSelectedRecord(rec)}
                onOpenPOCs={handleOpenPOCs}
                onSelectEvent={(id) => handleSelectEvent(id)}
              />
            ) : (
              <EventList onSelectEvent={(id) => handleSelectEvent(id)} />
            )}
          </>
        )}

        {currentView === 'database' && (
          <MasterDatabase
            onSelectRecord={(rec) => setSelectedRecord(rec)}
            onSelectEvent={(eventId) => handleSelectEvent(eventId)}
          />
        )}

        {currentView === 'search' && (
          <GlobalSearch
            onSelectRecord={(rec) => setSelectedRecord(rec)}
            onSelectEvent={(eventId) => handleSelectEvent(eventId)}
          />
        )}
      </main>

      {/* Global Modals / Panels */}
      {selectedRecord && (
        <RegistrationDetail
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          onOpenPOCs={(evt) => handleOpenPOCs(evt)}
        />
      )}

      {pocModalEvent && (
        <POCOverlay
          isOpen={Boolean(pocModalEvent)}
          onClose={() => {
            setPocModalEvent(null);
            setPocModalCustomPocs(undefined);
          }}
          event={pocModalEvent}
          customPocs={pocModalCustomPocs}
        />
      )}

      {themeModalOpen && (
        <ThemeModal
          isOpen={themeModalOpen}
          onClose={() => setThemeModalOpen(false)}
        />
      )}

      {/* Global Persistent Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
