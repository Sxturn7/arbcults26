import { NormalizedRegistration } from '../types.ts';
import { findColumnValue, classifySubmission, cleanPhoneNumber } from './utils.ts';

export function parseIndividual(
  row: Record<string, string>,
  index: number,
  eventId: string,
  eventName: string
): NormalizedRegistration {
  const name = findColumnValue(row, [
    'Participant Name',
    'Full Name',
    'Name',
    'Candidate Name',
    'Performer Name',
  ]) || `PARTICIPANT ${(index + 1).toString().padStart(2, '0')}`;

  const phone = findColumnValue(row, [
    'Participant Contact Number',
    'Contact Number',
    'Phone Number',
    'Phone',
    'Mobile',
    'WhatsApp Number',
  ]);

  const email = findColumnValue(row, [
    'Participant E-mail ID',
    'Email Address',
    'Email ID',
    'Email',
  ]);

  const college = findColumnValue(row, [
    'Participant College Name',
    'College Name',
    'College',
    'Institution',
    'University',
  ]);

  const collegeId = findColumnValue(row, [
    'Participant College ID',
    'College ID',
    'Roll Number',
    'Student ID',
  ]);

  const submissionUrl = findColumnValue(row, [
    'Preliminary submission video',
    'Submission Link',
    'Portfolio Link',
    'Drive Link',
    'Photo Submission',
    'Upload',
    'Link',
  ]);

  const timestamp = findColumnValue(row, ['Timestamp', 'time', 'date']);

  const submissions = [];
  if (submissionUrl) {
    submissions.push(classifySubmission(submissionUrl));
  }

  const contacts: string[] = [];
  if (phone) contacts.push(cleanPhoneNumber(phone));

  const emails: string[] = [];
  if (email) emails.push(email);

  return {
    id: `ENT-${eventId}-${(index + 1).toString().padStart(3, '0')}`,
    eventId,
    eventName,
    displayName: name.toUpperCase(),
    type: 'individual',
    participants: [
      {
        name: name.toUpperCase(),
        college: college || undefined,
        contact: phone ? cleanPhoneNumber(phone) : undefined,
        email: email || undefined,
        idNumber: collegeId || undefined,
      },
    ],
    college: college || undefined,
    colleges: college ? [college] : [],
    contacts,
    emails,
    submissions,
    timestamp: timestamp || undefined,
    collegeId: collegeId || undefined,
    rawData: row,
  };
}
