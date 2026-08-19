export type DisplayMode = 'solo_duet' | 'team' | 'large_team' | 'individual' | 'multi_submission';

export interface POC {
  name: string;
  phone: string;
}

export interface EventConfig {
  id: string; // "01" - "15"
  number: string; // "01"
  name: string; // "BAILAR"
  sheetId: string | null;
  formUrl: string | null;
  unstopUrl: string;
  pocs: POC[];
  displayMode: DisplayMode;
  categoryHint?: string;
}

export interface SubmissionItem {
  label: string;
  url: string;
  type: 'video' | 'artwork' | 'timelapse' | 'drive' | 'document' | 'other';
}

export interface ParticipantItem {
  name: string;
  college?: string;
  contact?: string;
  email?: string;
  role?: string;
  idNumber?: string;
}

export interface NormalizedRegistration {
  id: string; // e.g. "ENT-07-001"
  eventId: string; // "07"
  eventName: string; // "VIGNETTE"
  displayName: string; // Primary team or participant name
  type: 'team' | 'individual' | 'solo' | 'duet';
  teamName?: string;
  participantCount?: number;
  leader?: {
    name?: string;
    email?: string;
    phone?: string;
    college?: string;
  };
  participants: ParticipantItem[];
  college?: string;
  colleges: string[];
  contacts: string[];
  emails: string[];
  submissions: SubmissionItem[];
  timestamp?: string;
  collegeId?: string;
  rawData: Record<string, string>;
}

export interface EventDataResponse {
  eventId: string;
  eventName: string;
  records: NormalizedRegistration[];
  totalCount: number;
  lastUpdated: string;
  source: 'live' | 'fallback' | 'not_configured';
  sheetUrl: string | null;
  unstopUrl: string;
  formUrl: string | null;
  pocs: POC[];
  error?: string;
}

export interface EventStat {
  id: string;
  number: string;
  name: string;
  registrationCount: number;
  participantCount: number;
  submissionCount: number;
  pocCount: number;
}

export interface OverviewMetrics {
  totalEvents: number;
  totalRegistrations: number;
  totalParticipants: number;
  totalSubmissions: number;
  lastUpdated: string;
  eventStats: EventStat[];
}

export type ActiveTab = 'registrations' | 'submissions' | 'pocs';
export type ViewMode = 'events' | 'database' | 'search';
export type ThemeId = 'white' | 'black';
