import { SubmissionItem } from '../types.ts';

export function normalizeHeader(h: string): string {
  return h
    .toLowerCase()
    .replace(/[\n\r\t]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function findColumnValue(row: Record<string, string>, searchKeys: string[]): string {
  const normalizedRowKeys = Object.keys(row).map((k) => ({
    original: k,
    normalized: normalizeHeader(k),
  }));

  for (const key of searchKeys) {
    const target = normalizeHeader(key);
    // Exact match first
    const exact = normalizedRowKeys.find((k) => k.normalized === target);
    if (exact && row[exact.original]?.trim()) {
      return row[exact.original].trim();
    }
    // Substring match
    const match = normalizedRowKeys.find((k) => k.normalized.includes(target));
    if (match && row[match.original]?.trim()) {
      return row[match.original].trim();
    }
  }
  return '';
}

export function classifySubmission(url: string, defaultLabel = 'OPEN SUBMISSION'): SubmissionItem {
  const cleanUrl = url.trim();
  if (!cleanUrl) {
    return { label: defaultLabel, url: '', type: 'other' };
  }

  const lower = cleanUrl.toLowerCase();
  if (
    lower.includes('youtube.com') ||
    lower.includes('youtu.be') ||
    lower.includes('vimeo.com') ||
    lower.endsWith('.mp4') ||
    lower.endsWith('.mov') ||
    lower.endsWith('.mkv') ||
    lower.includes('video')
  ) {
    return { label: 'WATCH VIDEO ↗', url: cleanUrl, type: 'video' };
  }

  if (
    lower.includes('drive.google.com') ||
    lower.includes('docs.google.com')
  ) {
    if (lower.includes('video') || lower.includes('timelapse')) {
      return { label: 'WATCH VIDEO ↗', url: cleanUrl, type: 'video' };
    }
    return { label: 'OPEN DRIVE ↗', url: cleanUrl, type: 'drive' };
  }

  if (
    lower.endsWith('.jpg') ||
    lower.endsWith('.jpeg') ||
    lower.endsWith('.png') ||
    lower.endsWith('.webp') ||
    lower.endsWith('.gif') ||
    lower.includes('art') ||
    lower.includes('poster') ||
    lower.includes('photo')
  ) {
    return { label: 'VIEW ARTWORK ↗', url: cleanUrl, type: 'artwork' };
  }

  if (lower.endsWith('.pdf') || lower.endsWith('.doc') || lower.endsWith('.docx')) {
    return { label: 'OPEN DOCUMENT ↗', url: cleanUrl, type: 'document' };
  }

  return { label: 'OPEN FILE ↗', url: cleanUrl, type: 'other' };
}

export function cleanPhoneNumber(phone: string): string {
  if (!phone) return '';
  const digitsOnly = phone.replace(/[^\d+]/g, '');
  if (digitsOnly.length === 10) {
    return `+91 ${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5)}`;
  }
  return phone.trim();
}
