/**
 * ========================================================================
 * ARB '26 - CENTRALIZED RULE BOOKS & BROCHURES CONFIGURATION
 * Version: "To be updated"
 * ========================================================================
 * 
 * This file centralizes all official Google Docs Rule Books and Brochure links
 * for Atharv Ranbhoomi '26 (IIM Indore).
 * 
 * TO UPDATE OR REPLACE A RULE BOOK:
 * Simply replace the corresponding URL in the `eventRuleBooks` map below.
 * All event workspaces and links throughout the application will immediately
 * reflect the change without modifying any other component or file.
 */

export interface EventRuleBookEntry {
  eventId: string;
  eventNumber: string;
  eventName: string;
  category: string;
  ruleBookUrl: string;
  docTitle?: string;
}

/**
 * Centralized mapping of all 15 Events to their respective Google Docs Rule Books.
 * Verified and mapped accurately by inspecting document headers & contents.
 */
export const eventRuleBooks: Record<string, string> = {
  // 01. BAILAR (The Solo and Duet Dance Event)
  '01': 'https://docs.google.com/document/d/14p1_3wGU3Gm7AQzUyrgCJ0fs6j4xuRWm/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  'BAILAR': 'https://docs.google.com/document/d/14p1_3wGU3Gm7AQzUyrgCJ0fs6j4xuRWm/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',

  // 02. VERVE (The Group Dance Event)
  '02': 'https://docs.google.com/document/d/1ERTEMm5o0gKmJk0Qrq__jmu85DGOOq34/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  'VERVE': 'https://docs.google.com/document/d/1ERTEMm5o0gKmJk0Qrq__jmu85DGOOq34/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',

  // 03. DELIRIUM (Battle of the Bands)
  '03': 'https://docs.google.com/document/d/12zu-pCOAov6RBUGV0r9yhpJxecC9R8Bf/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  'DELIRIUM': 'https://docs.google.com/document/d/12zu-pCOAov6RBUGV0r9yhpJxecC9R8Bf/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',

  // 04. EUPHONY (The Solo/Duet Music Event)
  '04': 'https://docs.google.com/document/d/1gAnsGFZNFI4gYjn2W03MS4MVbFw68wGr/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  'EUPHONY': 'https://docs.google.com/document/d/1gAnsGFZNFI4gYjn2W03MS4MVbFw68wGr/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',

  // 05. HALLA BOL (The Street Play Event)
  '05': 'https://docs.google.com/document/d/1i2SGm5lT5Z0OSGnC7WQt7guEkQkQGO5F/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  'HALLA BOL': 'https://docs.google.com/document/d/1i2SGm5lT5Z0OSGnC7WQt7guEkQkQGO5F/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',

  // 06. PROSCENIUM (The Stage Play Event)
  '06': 'https://docs.google.com/document/d/1F-F9fx65ALs4Meo6PabdzML2M4X015oV/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  'PROSCENIUM': 'https://docs.google.com/document/d/1F-F9fx65ALs4Meo6PabdzML2M4X015oV/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',

  // 07. VIGNETTE (The Filmmaking Event)
  '07': 'https://docs.google.com/document/d/1PFfyh_BvqQ6HHb4eqsz601PrCifmcR52/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  'VIGNETTE': 'https://docs.google.com/document/d/1PFfyh_BvqQ6HHb4eqsz601PrCifmcR52/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',

  // 08. VANITY (The Fashion Show Event)
  '08': 'https://docs.google.com/document/d/1lduWlQyYB88JbB1gDVx4dGclkWuWIQCc/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  'VANITY': 'https://docs.google.com/document/d/1lduWlQyYB88JbB1gDVx4dGclkWuWIQCc/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',

  // 09. ISO (The Photography Event)
  '09': 'https://docs.google.com/document/d/11yX4wzGzdt9N8UjERGW_o545FRby4QDJ/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  'ISO': 'https://docs.google.com/document/d/11yX4wzGzdt9N8UjERGW_o545FRby4QDJ/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',

  // 10. PICASSO'S PIXELS (The Digital Art Competition)
  '10': 'https://docs.google.com/document/d/1hwqyF6MMM9FThOwIJU4xR4qWZdKHplzh/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  "PICASSO'S PIXELS": 'https://docs.google.com/document/d/1hwqyF6MMM9FThOwIJU4xR4qWZdKHplzh/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',

  // 11. CYPHER (The Street Dance Event)
  '11': 'https://docs.google.com/document/d/1Vyc_8yrdUGbw6FEGhknkHKiT1JB59Zki/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  'CYPHER': 'https://docs.google.com/document/d/1Vyc_8yrdUGbw6FEGhknkHKiT1JB59Zki/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',

  // 12. ELOQUENCE (The Open Mic Event)
  '12': 'https://docs.google.com/document/d/1G69ziA6ugSJOj4B-QJN6joESVe_EgQ1U/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  'ELOQUENCE': 'https://docs.google.com/document/d/1G69ziA6ugSJOj4B-QJN6joESVe_EgQ1U/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',

  // 13. AD-O-MANIA (The Ad Making Event)
  '13': 'https://docs.google.com/document/d/1YjFSTPNoh4gh5K3IpDsk3PGY417Hztog/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  'AD-O-MANIA': 'https://docs.google.com/document/d/1YjFSTPNoh4gh5K3IpDsk3PGY417Hztog/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',

  // 14. QUINTESSENCE / MR. & MS. ARB (Mr. & Ms. Atharv Ranbhoomi - Beyond the Spotlight)
  '14': 'https://docs.google.com/document/d/18DeAsc6heER9uyo5mX7XI8nKww3ukPFo/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  'QUINTESSENCE': 'https://docs.google.com/document/d/18DeAsc6heER9uyo5mX7XI8nKww3ukPFo/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  'MR. & MS. ARB': 'https://docs.google.com/document/d/18DeAsc6heER9uyo5mX7XI8nKww3ukPFo/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',

  // 15. SONATA (The Solo/Duet Instrument Event)
  '15': 'https://docs.google.com/document/d/13nV0ZBZucpmSZkMtvfEij9Mt3Gwk_5Jf/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
  'SONATA': 'https://docs.google.com/document/d/13nV0ZBZucpmSZkMtvfEij9Mt3Gwk_5Jf/edit?usp=sharing&ouid=108452064136028976643&rtpof=true&sd=true',
};

/**
 * ========================================================================
 * BROCHURE CONFIGURATIONS
 * ========================================================================
 */

/**
 * 1. Event Cults Brochure (Cultural Events Only)
 * Permanent official link for Cultural Events Cult brochure.
 */
export const eventCultsBrochureUrl =
  'https://drive.google.com/file/d/1y4Rf8KtLMDV2YQF9sIIKBGPzjqE5u-Fx/view?usp=sharing';

/**
 * 2. ARB Event Brochure (Complete Atharv Ranbhoomi Fest Brochure)
 * Link intended for the full fest brochure across all domains and events.
 * (Placeholder link provided; update here when final full-fest brochure link is ready)
 */
export const arbEventBrochureUrl =
  'https://drive.google.com/file/d/1y4Rf8KtLMDV2YQF9sIIKBGPzjqE5u-Fx/view?usp=sharing';

/**
 * Helper function to retrieve the Rule Book URL for any event by ID or Name.
 */
export function getRuleBookUrl(eventIdOrName: string): string | null {
  if (!eventIdOrName) return null;
  const key = eventIdOrName.trim().toUpperCase();
  return eventRuleBooks[key] || eventRuleBooks[eventIdOrName] || null;
}
