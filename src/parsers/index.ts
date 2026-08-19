import { NormalizedRegistration } from '../types.ts';
import { parseVignette } from './vignette.ts';
import { parsePicassosPixels } from './picassosPixels.ts';
import { parseSoloDuet } from './soloDuet.ts';
import { parseTeam } from './team.ts';
import { parseIndividual } from './individual.ts';
import { EVENTS_REGISTRY } from '../config/events.ts';

export function parseEventRow(
  eventId: string,
  row: Record<string, string>,
  index: number
): NormalizedRegistration {
  const eventConfig = EVENTS_REGISTRY.find((e) => e.id === eventId);
  const eventName = eventConfig ? eventConfig.name : `EVENT ${eventId}`;

  switch (eventId) {
    case '07': // VIGNETTE
      return parseVignette(row, index);

    case '10': // PICASSO'S PIXELS
      return parsePicassosPixels(row, index);

    case '01': // BAILAR
    case '04': // EUPHONY
    case '15': // SONATA
      return parseSoloDuet(row, index, eventId, eventName);

    case '02': // VERVE
    case '03': // DELIRIUM
    case '05': // HALLA BOL
    case '06': // PROSCENIUM
    case '08': // VANITY
    case '13': // AD-O-MANIA
      return parseTeam(row, index, eventId, eventName);

    case '09': // ISO
    case '11': // CYPHER
    case '12': // ELOQUENCE
    case '14': // QUINTESSENCE
    default:
      return parseIndividual(row, index, eventId, eventName);
  }
}

export function parseEventRows(eventId: string, rows: Array<Record<string, string>>): NormalizedRegistration[] {
  return rows.map((row, idx) => parseEventRow(eventId, row, idx));
}
