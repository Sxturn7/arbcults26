import { NormalizedRegistration } from '../types.ts';
import { findColumnValue, classifySubmission } from './utils.ts';

export function parseVignette(row: Record<string, string>, index: number): NormalizedRegistration {
  const teamName = findColumnValue(row, ['Team Name', 'team name', 'team']) || `TEAM ${(index + 1).toString().padStart(2, '0')}`;
  const leaderEmail = findColumnValue(row, ["Team Leader's mail ID", 'leader email', 'email address', 'email']);
  const collegeName = findColumnValue(row, ['College Name', 'college', 'institution', 'institute', 'university']);
  const finalSubmissionUrl = findColumnValue(row, ['Final Submission', 'submission', 'video link', 'drive link', 'link', 'upload']);
  const timestamp = findColumnValue(row, ['Timestamp', 'time', 'date']);

  const submissions = [];
  if (finalSubmissionUrl) {
    submissions.push(classifySubmission(finalSubmissionUrl, 'WATCH VIDEO ↗'));
  }

  const emails: string[] = [];
  if (leaderEmail) emails.push(leaderEmail);

  return {
    id: `ENT-07-${(index + 1).toString().padStart(3, '0')}`,
    eventId: '07',
    eventName: 'VIGNETTE',
    displayName: teamName.toUpperCase(),
    type: 'team',
    teamName: teamName.toUpperCase(),
    participantCount: undefined, // Only show count if known
    leader: leaderEmail ? { email: leaderEmail, college: collegeName } : undefined,
    participants: [],
    college: collegeName || undefined,
    colleges: collegeName ? [collegeName] : [],
    contacts: [],
    emails,
    submissions,
    timestamp: timestamp || undefined,
    rawData: row,
  };
}
