import { NormalizedRegistration } from '../types.ts';
import { findColumnValue, classifySubmission, cleanPhoneNumber } from './utils.ts';

export function parsePicassosPixels(row: Record<string, string>, index: number): NormalizedRegistration {
  const participantName = findColumnValue(row, ['Participant Name', 'name', 'participant']) || `PARTICIPANT ${(index + 1).toString().padStart(2, '0')}`;
  const contactNumber = findColumnValue(row, ['Participant Contact Number', 'contact number', 'phone number', 'phone', 'contact', 'mobile']);
  const emailId = findColumnValue(row, ['Participant E-mail ID', 'Email Address', 'email', 'e-mail']);
  const collegeName = findColumnValue(row, ['Participant College Name', 'College Name', 'college', 'institution', 'institute', 'university']);
  const collegeId = findColumnValue(row, ['Participant College ID', 'College ID', 'roll number', 'student id', 'id']);
  const preliminaryVideo = findColumnValue(row, [
    'Please upload your preliminary submission video below',
    'preliminary submission video',
    'submission video',
    'submission',
    'upload',
    'link',
    'drive link',
  ]);
  const timestamp = findColumnValue(row, ['Timestamp', 'time', 'date']);

  const submissions = [];
  if (preliminaryVideo) {
    submissions.push(classifySubmission(preliminaryVideo, 'WATCH VIDEO ↗'));
  }

  const contacts: string[] = [];
  if (contactNumber) contacts.push(cleanPhoneNumber(contactNumber));

  const emails: string[] = [];
  if (emailId) emails.push(emailId);

  return {
    id: `ENT-10-${(index + 1).toString().padStart(3, '0')}`,
    eventId: '10',
    eventName: "PICASSO'S PIXELS",
    displayName: participantName.toUpperCase(),
    type: 'individual',
    leader: undefined,
    participants: [
      {
        name: participantName.toUpperCase(),
        college: collegeName || undefined,
        contact: contactNumber ? cleanPhoneNumber(contactNumber) : undefined,
        email: emailId || undefined,
        idNumber: collegeId || undefined,
      },
    ],
    college: collegeName || undefined,
    colleges: collegeName ? [collegeName] : [],
    contacts,
    emails,
    submissions,
    timestamp: timestamp || undefined,
    collegeId: collegeId || undefined,
    rawData: row,
  };
}
