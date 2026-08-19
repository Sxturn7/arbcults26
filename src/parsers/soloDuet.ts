import { NormalizedRegistration, ParticipantItem } from '../types.ts';
import { findColumnValue, classifySubmission, cleanPhoneNumber } from './utils.ts';

export function parseSoloDuet(
  row: Record<string, string>,
  index: number,
  eventId: string,
  eventName: string
): NormalizedRegistration {
  const p1Name = findColumnValue(row, [
    'Participant 1 Name',
    'Participant Name',
    'Name',
    'Full Name',
    'Soloist Name',
    'Lead Name',
  ]);
  const p1Phone = findColumnValue(row, [
    'Participant 1 Contact',
    'Participant 1 Phone',
    'Contact Number',
    'Phone',
    'Mobile',
  ]);
  const p1Email = findColumnValue(row, [
    'Participant 1 Email',
    'Email Address',
    'Email',
    'E-mail',
  ]);
  const college = findColumnValue(row, [
    'College Name',
    'College',
    'Institution',
    'University',
    'Participant 1 College',
  ]);
  const p2Name = findColumnValue(row, [
    'Participant 2 Name',
    'Duet Partner Name',
    'Partner Name',
    'Second Participant',
  ]);
  const p2Phone = findColumnValue(row, [
    'Participant 2 Contact',
    'Participant 2 Phone',
    'Partner Phone',
  ]);
  const p2Email = findColumnValue(row, [
    'Participant 2 Email',
    'Partner Email',
  ]);
  const p2College = findColumnValue(row, [
    'Participant 2 College',
    'Partner College',
  ]);

  const submissionUrl = findColumnValue(row, [
    'Submission Link',
    'Video Link',
    'Audio Link',
    'Drive Link',
    'Upload',
    'Link',
    'Submission',
  ]);
  const timestamp = findColumnValue(row, ['Timestamp', 'time', 'date']);

  const isDuet = Boolean(p2Name && p2Name.trim().length > 0);
  const primaryName = p1Name || `PARTICIPANT ${(index + 1).toString().padStart(2, '0')}`;
  const displayName = isDuet ? `${primaryName} & ${p2Name}`.toUpperCase() : primaryName.toUpperCase();

  const participants: ParticipantItem[] = [];
  if (p1Name) {
    participants.push({
      name: p1Name.toUpperCase(),
      contact: p1Phone ? cleanPhoneNumber(p1Phone) : undefined,
      email: p1Email || undefined,
      college: college || undefined,
      role: isDuet ? 'PARTICIPANT 01' : undefined,
    });
  }
  if (p2Name) {
    participants.push({
      name: p2Name.toUpperCase(),
      contact: p2Phone ? cleanPhoneNumber(p2Phone) : undefined,
      email: p2Email || undefined,
      college: p2College || college || undefined,
      role: 'PARTICIPANT 02',
    });
  }

  const submissions = [];
  if (submissionUrl) {
    submissions.push(classifySubmission(submissionUrl, 'WATCH VIDEO ↗'));
  }

  const contacts: string[] = [];
  if (p1Phone) contacts.push(cleanPhoneNumber(p1Phone));
  if (p2Phone) contacts.push(cleanPhoneNumber(p2Phone));

  const emails: string[] = [];
  if (p1Email) emails.push(p1Email);
  if (p2Email) emails.push(p2Email);

  return {
    id: `ENT-${eventId}-${(index + 1).toString().padStart(3, '0')}`,
    eventId,
    eventName,
    displayName,
    type: isDuet ? 'duet' : 'solo',
    participants,
    college: college || undefined,
    colleges: college ? [college] : [],
    contacts,
    emails,
    submissions,
    timestamp: timestamp || undefined,
    rawData: row,
  };
}
