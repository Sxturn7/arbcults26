import { EventConfig } from '../types.ts';
import { eventRuleBooks, getRuleBookUrl, eventCultsBrochureUrl, arbEventBrochureUrl } from './rulebooks.ts';

export { eventRuleBooks, getRuleBookUrl, eventCultsBrochureUrl, arbEventBrochureUrl };

export const EVENTS_REGISTRY: EventConfig[] = [
  {
    id: '01',
    number: '01',
    name: 'BAILAR',
    sheetId: '1IU9CRy--BMeq__ipSjoIWLyJPS8RDVv6P5uNGphgNeE',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-bailar-2026/viewform',
    unstopUrl: 'https://unstop.com/events/bailar-the-solo-duet-dance-competition-atharv-ranbhoomi-2026-iim-indore-1711293',
    ruleBookUrl: eventRuleBooks['01'],
    pocs: [
      { name: 'Soumya Damke', phone: '95613 88065' },
      { name: 'Abhay', phone: '88852 38216' },
    ],
    displayMode: 'solo_duet',
    categoryHint: 'Solo / Duet Dance Competition',
  },
  {
    id: '02',
    number: '02',
    name: 'VERVE',
    sheetId: '1sd2ZUxOi4UJnPwqU2hv7EUS5P_8b9WOHJY19-ZYo2cE',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-verve-2026/viewform',
    unstopUrl: 'https://unstop.com/events/verve-the-group-dance-competition-atharv-ranbhoomi-2026-iim-indore-1711313',
    ruleBookUrl: eventRuleBooks['02'],
    pocs: [
      { name: 'Soumya J', phone: '77385 96039' },
      { name: 'Riya', phone: '96577 24760' },
    ],
    displayMode: 'team',
    categoryHint: 'Group Dance Competition',
  },
  {
    id: '03',
    number: '03',
    name: 'DELIRIUM',
    sheetId: '1jcpzXqCH3D6CTYEujcc0L3FjTIWrpZoZ5wvztzzOOZs',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-delirium-2026/viewform',
    unstopUrl: 'https://unstop.com/events/delirium-battle-of-the-bands-atharv-ranbhoomi-2026-iim-indore-1711287',
    ruleBookUrl: eventRuleBooks['03'],
    pocs: [
      { name: 'Jonathan', phone: '80784 83245' },
      { name: 'Divyanshu', phone: '91514 17801' },
      { name: 'Shashwat', phone: '99390 91357' },
    ],
    displayMode: 'large_team',
    categoryHint: 'Battle of the Bands',
  },
  {
    id: '04',
    number: '04',
    name: 'EUPHONY',
    sheetId: '1E0SsM1hK1CrRfpLk1DqAKEzHIb5bFECj9nR-LRenN90',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-euphony-2026/viewform',
    unstopUrl: 'https://unstop.com/events/euphony-the-solo-duet-singing-competition-atharv-ranbhoomi-2026-iim-indore-1711317',
    ruleBookUrl: eventRuleBooks['04'],
    pocs: [
      { name: 'Samprita', phone: '97908 88679' },
      { name: 'Annie', phone: '7388478887' },
      { name: 'Ashrya', phone: '7200390511' },
    ],
    displayMode: 'solo_duet',
    categoryHint: 'Solo / Duet Singing Competition',
  },
  {
    id: '05',
    number: '05',
    name: 'HALLA BOL',
    sheetId: '17wuigNYl5x0OhJFZbT-lGWbBOY8JyKMiian52R4SUUs',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-hallabol-2026/viewform',
    unstopUrl: 'https://unstop.com/events/halla-bol-the-street-play-competition-atharv-ranbhoomi-2026-iim-indore-1711382',
    ruleBookUrl: eventRuleBooks['05'],
    pocs: [
      { name: 'Madhav', phone: '93159 62157' },
      { name: 'Gangesh', phone: '82871 05161' },
    ],
    displayMode: 'large_team',
    categoryHint: 'Street Play Competition',
  },
  {
    id: '06',
    number: '06',
    name: 'PROSCENIUM',
    sheetId: '11wNVB0caNHxSkscLhOS9o_QUgQVK2DXg8W48Mj37K2k',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-proscenium-2026/viewform',
    unstopUrl: 'https://unstop.com/events/proscenium-the-stage-play-competition-atharv-ranbhoomi-2026-iim-indore-1711375',
    ruleBookUrl: eventRuleBooks['06'],
    pocs: [
      { name: 'Saanvi', phone: '81234 11357' },
      { name: 'Saranya', phone: '86886 74151' },
    ],
    displayMode: 'large_team',
    categoryHint: 'Stage Play Competition',
  },
  {
    id: '07',
    number: '07',
    name: 'VIGNETTE',
    sheetId: '1TbmNAMpL06f0TlFt1xG-ybkT3PO-e4VQc46toRfp1SM',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-vignette-2026/viewform',
    unstopUrl: 'https://unstop.com/events/vignette-the-filmmaking-competition-atharv-ranbhoomi-2026-iim-indore-1711306',
    ruleBookUrl: eventRuleBooks['07'],
    pocs: [
      { name: 'Srijata', phone: '99030 91550' },
      { name: 'Simarleen Sodhi', phone: '87672 07837' },
    ],
    displayMode: 'team',
    categoryHint: 'Filmmaking Competition',
  },
  {
    id: '08',
    number: '08',
    name: 'VANITY',
    sheetId: '1aPnBkt22csTQ11ltv2B7c9JrIZ4wH10sF2Kapq7y6Bs',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-vanity-2026/viewform',
    unstopUrl: 'https://unstop.com/events/vanity-the-fashion-show-competition-atharv-ranbhoomi-2026-iim-indore-1711312',
    ruleBookUrl: eventRuleBooks['08'],
    pocs: [
      { name: 'Piyooshika', phone: '76206 51424' },
      { name: 'Aryan S', phone: '92575 58369' },
      { name: 'Tanvi', phone: '99820 80810' },
    ],
    displayMode: 'multi_submission',
    categoryHint: 'Fashion Show Competition',
  },
  {
    id: '09',
    number: '09',
    name: 'ISO',
    sheetId: null, // NOT PROVIDED YET
    formUrl: null,
    unstopUrl: 'https://unstop.com/events/iso-the-photography-competition-atharv-ranbhoomi-2026-iim-indore-1711328',
    ruleBookUrl: eventRuleBooks['09'],
    pocs: [
      { name: 'Dhawal', phone: '79993 60299' },
      { name: 'Shreyas K', phone: '94217 65664' },
    ],
    displayMode: 'individual',
    categoryHint: 'Photography Competition',
  },
  {
    id: '10',
    number: '10',
    name: "PICASSO'S PIXELS",
    sheetId: '1Xv9BjGRzyn_wY8noRi_--L8WNhfmVAqopul0pEYQ3Zk',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-picassospixels-2026/viewform',
    unstopUrl: 'https://unstop.com/events/picassos-pixels-the-digital-art-competition-atharv-ranbhoomi-2026-iim-indore-1711326',
    ruleBookUrl: eventRuleBooks['10'],
    pocs: [
      { name: 'Satvik', phone: '63008 72435' },
      { name: 'Amogh', phone: '99710 77558' },
    ],
    displayMode: 'individual',
    categoryHint: 'Digital Art Competition',
  },
  {
    id: '11',
    number: '11',
    name: 'CYPHER',
    sheetId: null, // NOT PROVIDED YET
    formUrl: null,
    unstopUrl: 'https://unstop.com/events/cypher-the-street-dance-battle-atharv-ranbhoomi-2026-iim-indore-1711322',
    ruleBookUrl: eventRuleBooks['11'],
    pocs: [
      { name: 'Bansal', phone: '98930 60390' },
      { name: 'Tanisk Tambi', phone: '78778 15633' },
    ],
    displayMode: 'individual',
    categoryHint: 'Street Dance Battle',
  },
  {
    id: '12',
    number: '12',
    name: 'ELOQUENCE',
    sheetId: null, // NOT PROVIDED YET
    formUrl: null,
    unstopUrl: 'https://unstop.com/events/eloquence-the-open-mic-competition-atharv-ranbhoomi-2026-iim-indore-1711329',
    ruleBookUrl: eventRuleBooks['12'],
    pocs: [
      { name: 'Rishit', phone: '90320 19595' },
      { name: 'Aarush', phone: '83569 35242' },
    ],
    displayMode: 'individual',
    categoryHint: 'Open Mic Competition',
  },
  {
    id: '13',
    number: '13',
    name: 'AD-O-MANIA',
    sheetId: '15zhZriojXHaD203nu1X_mBui6tT5qE-dwws51M66pcE',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-adomania-2026/viewform',
    unstopUrl: 'https://unstop.com/events/ad-o-mania-the-ad-making-competition-atharv-ranbhoomi-2026-iim-indore-1711507',
    ruleBookUrl: eventRuleBooks['13'],
    pocs: [
      { name: 'Daksh', phone: '70427 56310' },
      { name: 'Sachin', phone: '73852 65323' },
    ],
    displayMode: 'team',
    categoryHint: 'Ad Making Competition',
  },
  {
    id: '14',
    number: '14',
    name: 'QUINTESSENCE',
    sheetId: '131_W76FFVJmX1-adNTRfYp2z2rvT5-3LgiNcEUBbiek',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-quintessence-2026/viewform',
    unstopUrl: 'https://unstop.com/events/quintessence-beyond-the-spotlight-atharv-ranbhoomi-2026-iim-indore-1720303',
    ruleBookUrl: eventRuleBooks['14'],
    pocs: [
      { name: 'Arnav', phone: '75594 80499' },
      { name: 'Sushanth', phone: '87904 32242' },
      { name: 'Jeeval', phone: '70585 48355' },
    ],
    displayMode: 'individual',
    categoryHint: 'Beyond the Spotlight',
  },
  {
    id: '15',
    number: '15',
    name: 'SONATA',
    sheetId: '14JUPTGRREklprGS1PFUJn4A_MkPPgGro56c30TRv_q4',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-sonata-2026/viewform',
    unstopUrl: 'https://unstop.com/events/sonata-the-soloduet-instrument-competition-atharv-ranbhoomi-2026-iim-indore-1711391',
    ruleBookUrl: eventRuleBooks['15'],
    pocs: [
      { name: 'Vyomika', phone: '81303 62484' },
      { name: 'Bhavya', phone: '78893 95457' },
    ],
    displayMode: 'solo_duet',
    categoryHint: 'Solo / Duet Instrument Competition',
  },
];

export function getEventById(id: string): EventConfig | undefined {
  return EVENTS_REGISTRY.find((e) => e.id === id || e.number === id);
}

export function getSheetUrl(sheetId: string | null): string | null {
  if (!sheetId) return null;
  return `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
}
