import { NormalizedRegistration, ParticipantItem } from '../types.ts';
import { findColumnValue, classifySubmission, cleanPhoneNumber } from './utils.ts';

export function parseTeam(
  row: Record<string, string>,
  index: number,
  eventId: string,
  eventName: string
): NormalizedRegistration {
  const teamName = findColumnValue(row, ['Team Name', 'Band Name', 'Group Name', 'Play Title', 'Production Name', 'Team']) ||
    `TEAM ${(index + 1).toString().padStart(2, '0')}`;
  
  const memberCountStr = findColumnValue(row, ['Number of Members', 'Team Size', 'Members Count', 'Total Members', 'Count']);
  const memberCount = memberCountStr ? parseInt(memberCountStr, 10) : undefined;

  const leaderName = findColumnValue(row, ['Team Leader Name', 'Leader Name', 'POC Name', 'Contact Person', 'Director Name']);
  const leaderPhone = findColumnValue(row, ['Leader Contact Number', 'Leader Phone', 'Contact Number', 'Phone', 'Mobile']);
  const leaderEmail = findColumnValue(row, ["Team Leader's mail ID", 'Leader Email', 'Email Address', 'Email']);
  const college = findColumnValue(row, ['College Name', 'College', 'Institution', 'Institute', 'University']);

  const submissionUrl = findColumnValue(row, [
    'Final Submission',
    'Submission Link',
    'Video Link',
    'Script Link',
    'Drive Link',
    'Drive Folder',
    'Submission',
    'Upload',
  ]);
  const timestamp = findColumnValue(row, ['Timestamp', 'time', 'date']);

  // Extract numbered members if available in columns like "Member 1", "Member 2", etc.
  const participants: ParticipantItem[] = [];
  for (let i = 1; i <= 20; i++) {
    const mName = findColumnValue(row, [`Member ${i} Name`, `Participant ${i}`, `Member ${i}`, `Cast ${i}`]);
    const mCollege = findColumnValue(row, [`Member ${i} College`, `Participant ${i} College`]);
    const mContact = findColumnValue(row, [`Member ${i} Contact`, `Member ${i} Phone`]);
    if (mName) {
      participants.push({
        name: mName.toUpperCase(),
        college: mCollege || college || undefined,
        contact: mContact ? cleanPhoneNumber(mContact) : undefined,
      });
    }
  }

  const submissions = [];
  if (submissionUrl) {
    submissions.push(classifySubmission(submissionUrl));
  }

  const contacts: string[] = [];
  if (leaderPhone) contacts.push(cleanPhoneNumber(leaderPhone));

  const emails: string[] = [];
  if (leaderEmail) emails.push(leaderEmail);

  return {
    id: `ENT-${eventId}-${(index + 1).toString().padStart(3, '0')}`,
    eventId,
    eventName,
    displayName: teamName.toUpperCase(),
    type: 'team',
    teamName: teamName.toUpperCase(),
    participantCount: memberCount || (participants.length > 0 ? participants.length : undefined),
    leader: (leaderName || leaderPhone || leaderEmail) ? {
      name: leaderName ? leaderName.toUpperCase() : undefined,
      phone: leaderPhone ? cleanPhoneNumber(leaderPhone) : undefined,
      email: leaderEmail || undefined,
      college: college || undefined,
    } : undefined,
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
