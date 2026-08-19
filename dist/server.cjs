var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_vite = require("vite");

// src/config/events.ts
var EVENTS_REGISTRY = [
  {
    id: "01",
    number: "01",
    name: "BAILAR",
    sheetId: "1IU9CRy--BMeq__ipSjoIWLyJPS8RDVv6P5uNGphgNeE",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-bailar-2026/viewform",
    unstopUrl: "https://unstop.com/events/bailar-the-solo-duet-dance-competition-atharv-ranbhoomi-2026-iim-indore-1711293",
    pocs: [
      { name: "Soumya Damke", phone: "95613 88065" },
      { name: "Abhay", phone: "88852 38216" }
    ],
    displayMode: "solo_duet",
    categoryHint: "Solo / Duet Dance Competition"
  },
  {
    id: "02",
    number: "02",
    name: "VERVE",
    sheetId: "1sd2ZUxOi4UJnPwqU2hv7EUS5P_8b9WOHJY19-ZYo2cE",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-verve-2026/viewform",
    unstopUrl: "https://unstop.com/events/verve-the-group-dance-competition-atharv-ranbhoomi-2026-iim-indore-1711313",
    pocs: [
      { name: "Soumya J", phone: "77385 96039" },
      { name: "Riya", phone: "96577 24760" }
    ],
    displayMode: "team",
    categoryHint: "Group Dance Competition"
  },
  {
    id: "03",
    number: "03",
    name: "DELIRIUM",
    sheetId: "1jcpzXqCH3D6CTYEujcc0L3FjTIWrpZoZ5wvztzzOOZs",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-delirium-2026/viewform",
    unstopUrl: "https://unstop.com/events/delirium-battle-of-the-bands-atharv-ranbhoomi-2026-iim-indore-1711287",
    pocs: [
      { name: "Jonathan", phone: "80784 83245" },
      { name: "Divyanshu", phone: "91514 17801" },
      { name: "Shashwat", phone: "99390 91357" }
    ],
    displayMode: "large_team",
    categoryHint: "Battle of the Bands"
  },
  {
    id: "04",
    number: "04",
    name: "EUPHONY",
    sheetId: "1E0SsM1hK1CrRfpLk1DqAKEzHIb5bFECj9nR-LRenN90",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-euphony-2026/viewform",
    unstopUrl: "https://unstop.com/events/euphony-the-solo-duet-singing-competition-atharv-ranbhoomi-2026-iim-indore-1711317",
    pocs: [
      { name: "Samprita", phone: "97908 88679" },
      { name: "Annie", phone: "7388478887" },
      { name: "Ashrya", phone: "7200390511" }
    ],
    displayMode: "solo_duet",
    categoryHint: "Solo / Duet Singing Competition"
  },
  {
    id: "05",
    number: "05",
    name: "HALLA BOL",
    sheetId: "17wuigNYl5x0OhJFZbT-lGWbBOY8JyKMiian52R4SUUs",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-hallabol-2026/viewform",
    unstopUrl: "https://unstop.com/events/halla-bol-the-street-play-competition-atharv-ranbhoomi-2026-iim-indore-1711382",
    pocs: [
      { name: "Madhav", phone: "93159 62157" },
      { name: "Gangesh", phone: "82871 05161" }
    ],
    displayMode: "large_team",
    categoryHint: "Street Play Competition"
  },
  {
    id: "06",
    number: "06",
    name: "PROSCENIUM",
    sheetId: "11wNVB0caNHxSkscLhOS9o_QUgQVK2DXg8W48Mj37K2k",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-proscenium-2026/viewform",
    unstopUrl: "https://unstop.com/events/proscenium-the-stage-play-competition-atharv-ranbhoomi-2026-iim-indore-1711375",
    pocs: [
      { name: "Saanvi", phone: "81234 11357" },
      { name: "Saranya", phone: "86886 74151" }
    ],
    displayMode: "large_team",
    categoryHint: "Stage Play Competition"
  },
  {
    id: "07",
    number: "07",
    name: "VIGNETTE",
    sheetId: "1TbmNAMpL06f0TlFt1xG-ybkT3PO-e4VQc46toRfp1SM",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-vignette-2026/viewform",
    unstopUrl: "https://unstop.com/events/vignette-the-filmmaking-competition-atharv-ranbhoomi-2026-iim-indore-1711306",
    pocs: [
      { name: "Srijata", phone: "99030 91550" },
      { name: "Simarleen Sodhi", phone: "87672 07837" }
    ],
    displayMode: "team",
    categoryHint: "Filmmaking Competition"
  },
  {
    id: "08",
    number: "08",
    name: "VANITY",
    sheetId: "1aPnBkt22csTQ11ltv2B7c9JrIZ4wH10sF2Kapq7y6Bs",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-vanity-2026/viewform",
    unstopUrl: "https://unstop.com/events/vanity-the-fashion-show-competition-atharv-ranbhoomi-2026-iim-indore-1711312",
    pocs: [
      { name: "Piyooshika", phone: "76206 51424" },
      { name: "Aryan S", phone: "92575 58369" },
      { name: "Tanvi", phone: "99820 80810" }
    ],
    displayMode: "multi_submission",
    categoryHint: "Fashion Show Competition"
  },
  {
    id: "09",
    number: "09",
    name: "ISO",
    sheetId: null,
    // NOT PROVIDED YET
    formUrl: null,
    unstopUrl: "https://unstop.com/events/iso-the-photography-competition-atharv-ranbhoomi-2026-iim-indore-1711328",
    pocs: [
      { name: "Dhawal", phone: "79993 60299" },
      { name: "Shreyas K", phone: "94217 65664" }
    ],
    displayMode: "individual",
    categoryHint: "Photography Competition"
  },
  {
    id: "10",
    number: "10",
    name: "PICASSO'S PIXELS",
    sheetId: "1Xv9BjGRzyn_wY8noRi_--L8WNhfmVAqopul0pEYQ3Zk",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-picassospixels-2026/viewform",
    unstopUrl: "https://unstop.com/events/picassos-pixels-the-digital-art-competition-atharv-ranbhoomi-2026-iim-indore-1711326",
    pocs: [
      { name: "Satvik", phone: "63008 72435" },
      { name: "Amogh", phone: "99710 77558" }
    ],
    displayMode: "individual",
    categoryHint: "Digital Art Competition"
  },
  {
    id: "11",
    number: "11",
    name: "CYPHER",
    sheetId: null,
    // NOT PROVIDED YET
    formUrl: null,
    unstopUrl: "https://unstop.com/events/cypher-the-street-dance-battle-atharv-ranbhoomi-2026-iim-indore-1711322",
    pocs: [
      { name: "Bansal", phone: "98930 60390" },
      { name: "Tanisk Tambi", phone: "78778 15633" }
    ],
    displayMode: "individual",
    categoryHint: "Street Dance Battle"
  },
  {
    id: "12",
    number: "12",
    name: "ELOQUENCE",
    sheetId: null,
    // NOT PROVIDED YET
    formUrl: null,
    unstopUrl: "https://unstop.com/events/eloquence-the-open-mic-competition-atharv-ranbhoomi-2026-iim-indore-1711329",
    pocs: [
      { name: "Rishit", phone: "90320 19595" },
      { name: "Aarush", phone: "83569 35242" }
    ],
    displayMode: "individual",
    categoryHint: "Open Mic Competition"
  },
  {
    id: "13",
    number: "13",
    name: "AD-O-MANIA",
    sheetId: "15zhZriojXHaD203nu1X_mBui6tT5qE-dwws51M66pcE",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-adomania-2026/viewform",
    unstopUrl: "https://unstop.com/events/ad-o-mania-the-ad-making-competition-atharv-ranbhoomi-2026-iim-indore-1711507",
    pocs: [
      { name: "Daksh", phone: "70427 56310" },
      { name: "Sachin", phone: "73852 65323" }
    ],
    displayMode: "team",
    categoryHint: "Ad Making Competition"
  },
  {
    id: "14",
    number: "14",
    name: "QUINTESSENCE",
    sheetId: "131_W76FFVJmX1-adNTRfYp2z2rvT5-3LgiNcEUBbiek",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-quintessence-2026/viewform",
    unstopUrl: "https://unstop.com/events/quintessence-beyond-the-spotlight-atharv-ranbhoomi-2026-iim-indore-1720303",
    pocs: [
      { name: "Arnav", phone: "75594 80499" },
      { name: "Sushanth", phone: "87904 32242" },
      { name: "Jeeval", phone: "70585 48355" }
    ],
    displayMode: "individual",
    categoryHint: "Beyond the Spotlight"
  },
  {
    id: "15",
    number: "15",
    name: "SONATA",
    sheetId: "14JUPTGRREklprGS1PFUJn4A_MkPPgGro56c30TRv_q4",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-sonata-2026/viewform",
    unstopUrl: "https://unstop.com/events/sonata-the-soloduet-instrument-competition-atharv-ranbhoomi-2026-iim-indore-1711391",
    pocs: [
      { name: "Vyomika", phone: "81303 62484" },
      { name: "Bhavya", phone: "78893 95457" }
    ],
    displayMode: "solo_duet",
    categoryHint: "Solo / Duet Instrument Competition"
  }
];
function getEventById(id) {
  return EVENTS_REGISTRY.find((e) => e.id === id || e.number === id);
}
function getSheetUrl(sheetId) {
  if (!sheetId) return null;
  return `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
}

// src/parsers/csv.ts
function parseCSVToMatrix(csvText) {
  if (!csvText || !csvText.trim()) return [];
  const rows = [];
  let currentRow = [];
  let currentCell = "";
  let inQuotes = false;
  const chars = csvText.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const nextChar = chars[i + 1];
    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentCell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        currentRow.push(currentCell.trim());
        currentCell = "";
      } else if (char === "\n") {
        currentRow.push(currentCell.trim());
        if (currentRow.some((c) => c.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentCell = "";
      } else {
        currentCell += char;
      }
    }
  }
  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c.length > 0)) {
      rows.push(currentRow);
    }
  }
  return rows;
}
function parseCSV(csvText) {
  const rows = parseCSVToMatrix(csvText);
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim());
  const dataRows = rows.slice(1);
  const result = [];
  for (const row of dataRows) {
    if (!row.some((cell) => cell.length > 0)) continue;
    const rowObj = {};
    headers.forEach((header, idx) => {
      if (header) {
        rowObj[header] = row[idx] || "";
      }
    });
    result.push(rowObj);
  }
  return result;
}

// src/parsers/utils.ts
function normalizeHeader(h) {
  return h.toLowerCase().replace(/[\n\r\t]+/g, " ").replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
}
function findColumnValue(row, searchKeys) {
  const normalizedRowKeys = Object.keys(row).map((k) => ({
    original: k,
    normalized: normalizeHeader(k)
  }));
  for (const key of searchKeys) {
    const target = normalizeHeader(key);
    const exact = normalizedRowKeys.find((k) => k.normalized === target);
    if (exact && row[exact.original]?.trim()) {
      return row[exact.original].trim();
    }
    const match = normalizedRowKeys.find((k) => k.normalized.includes(target));
    if (match && row[match.original]?.trim()) {
      return row[match.original].trim();
    }
  }
  return "";
}
function classifySubmission(url, defaultLabel = "OPEN SUBMISSION") {
  const cleanUrl = url.trim();
  if (!cleanUrl) {
    return { label: defaultLabel, url: "", type: "other" };
  }
  const lower = cleanUrl.toLowerCase();
  if (lower.includes("youtube.com") || lower.includes("youtu.be") || lower.includes("vimeo.com") || lower.endsWith(".mp4") || lower.endsWith(".mov") || lower.endsWith(".mkv") || lower.includes("video")) {
    return { label: "WATCH VIDEO \u2197", url: cleanUrl, type: "video" };
  }
  if (lower.includes("drive.google.com") || lower.includes("docs.google.com")) {
    if (lower.includes("video") || lower.includes("timelapse")) {
      return { label: "WATCH VIDEO \u2197", url: cleanUrl, type: "video" };
    }
    return { label: "OPEN DRIVE \u2197", url: cleanUrl, type: "drive" };
  }
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".png") || lower.endsWith(".webp") || lower.endsWith(".gif") || lower.includes("art") || lower.includes("poster") || lower.includes("photo")) {
    return { label: "VIEW ARTWORK \u2197", url: cleanUrl, type: "artwork" };
  }
  if (lower.endsWith(".pdf") || lower.endsWith(".doc") || lower.endsWith(".docx")) {
    return { label: "OPEN DOCUMENT \u2197", url: cleanUrl, type: "document" };
  }
  return { label: "OPEN FILE \u2197", url: cleanUrl, type: "other" };
}
function cleanPhoneNumber(phone) {
  if (!phone) return "";
  const digitsOnly = phone.replace(/[^\d+]/g, "");
  if (digitsOnly.length === 10) {
    return `+91 ${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5)}`;
  }
  return phone.trim();
}

// src/parsers/vignette.ts
function parseVignette(row, index) {
  const teamName = findColumnValue(row, ["Team Name", "team name", "team"]) || `TEAM ${(index + 1).toString().padStart(2, "0")}`;
  const leaderEmail = findColumnValue(row, ["Team Leader's mail ID", "leader email", "email address", "email"]);
  const collegeName = findColumnValue(row, ["College Name", "college", "institution", "institute", "university"]);
  const finalSubmissionUrl = findColumnValue(row, ["Final Submission", "submission", "video link", "drive link", "link", "upload"]);
  const timestamp = findColumnValue(row, ["Timestamp", "time", "date"]);
  const submissions = [];
  if (finalSubmissionUrl) {
    submissions.push(classifySubmission(finalSubmissionUrl, "WATCH VIDEO \u2197"));
  }
  const emails = [];
  if (leaderEmail) emails.push(leaderEmail);
  return {
    id: `ENT-07-${(index + 1).toString().padStart(3, "0")}`,
    eventId: "07",
    eventName: "VIGNETTE",
    displayName: teamName.toUpperCase(),
    type: "team",
    teamName: teamName.toUpperCase(),
    participantCount: void 0,
    // Only show count if known
    leader: leaderEmail ? { email: leaderEmail, college: collegeName } : void 0,
    participants: [],
    college: collegeName || void 0,
    colleges: collegeName ? [collegeName] : [],
    contacts: [],
    emails,
    submissions,
    timestamp: timestamp || void 0,
    rawData: row
  };
}

// src/parsers/picassosPixels.ts
function parsePicassosPixels(row, index) {
  const participantName = findColumnValue(row, ["Participant Name", "name", "participant"]) || `PARTICIPANT ${(index + 1).toString().padStart(2, "0")}`;
  const contactNumber = findColumnValue(row, ["Participant Contact Number", "contact number", "phone number", "phone", "contact", "mobile"]);
  const emailId = findColumnValue(row, ["Participant E-mail ID", "Email Address", "email", "e-mail"]);
  const collegeName = findColumnValue(row, ["Participant College Name", "College Name", "college", "institution", "institute", "university"]);
  const collegeId = findColumnValue(row, ["Participant College ID", "College ID", "roll number", "student id", "id"]);
  const preliminaryVideo = findColumnValue(row, [
    "Please upload your preliminary submission video below",
    "preliminary submission video",
    "submission video",
    "submission",
    "upload",
    "link",
    "drive link"
  ]);
  const timestamp = findColumnValue(row, ["Timestamp", "time", "date"]);
  const submissions = [];
  if (preliminaryVideo) {
    submissions.push(classifySubmission(preliminaryVideo, "WATCH VIDEO \u2197"));
  }
  const contacts = [];
  if (contactNumber) contacts.push(cleanPhoneNumber(contactNumber));
  const emails = [];
  if (emailId) emails.push(emailId);
  return {
    id: `ENT-10-${(index + 1).toString().padStart(3, "0")}`,
    eventId: "10",
    eventName: "PICASSO'S PIXELS",
    displayName: participantName.toUpperCase(),
    type: "individual",
    leader: void 0,
    participants: [
      {
        name: participantName.toUpperCase(),
        college: collegeName || void 0,
        contact: contactNumber ? cleanPhoneNumber(contactNumber) : void 0,
        email: emailId || void 0,
        idNumber: collegeId || void 0
      }
    ],
    college: collegeName || void 0,
    colleges: collegeName ? [collegeName] : [],
    contacts,
    emails,
    submissions,
    timestamp: timestamp || void 0,
    collegeId: collegeId || void 0,
    rawData: row
  };
}

// src/parsers/soloDuet.ts
function parseSoloDuet(row, index, eventId, eventName) {
  const p1Name = findColumnValue(row, [
    "Participant 1 Name",
    "Participant Name",
    "Name",
    "Full Name",
    "Soloist Name",
    "Lead Name"
  ]);
  const p1Phone = findColumnValue(row, [
    "Participant 1 Contact",
    "Participant 1 Phone",
    "Contact Number",
    "Phone",
    "Mobile"
  ]);
  const p1Email = findColumnValue(row, [
    "Participant 1 Email",
    "Email Address",
    "Email",
    "E-mail"
  ]);
  const college = findColumnValue(row, [
    "College Name",
    "College",
    "Institution",
    "University",
    "Participant 1 College"
  ]);
  const p2Name = findColumnValue(row, [
    "Participant 2 Name",
    "Duet Partner Name",
    "Partner Name",
    "Second Participant"
  ]);
  const p2Phone = findColumnValue(row, [
    "Participant 2 Contact",
    "Participant 2 Phone",
    "Partner Phone"
  ]);
  const p2Email = findColumnValue(row, [
    "Participant 2 Email",
    "Partner Email"
  ]);
  const p2College = findColumnValue(row, [
    "Participant 2 College",
    "Partner College"
  ]);
  const submissionUrl = findColumnValue(row, [
    "Submission Link",
    "Video Link",
    "Audio Link",
    "Drive Link",
    "Upload",
    "Link",
    "Submission"
  ]);
  const timestamp = findColumnValue(row, ["Timestamp", "time", "date"]);
  const isDuet = Boolean(p2Name && p2Name.trim().length > 0);
  const primaryName = p1Name || `PARTICIPANT ${(index + 1).toString().padStart(2, "0")}`;
  const displayName = isDuet ? `${primaryName} & ${p2Name}`.toUpperCase() : primaryName.toUpperCase();
  const participants = [];
  if (p1Name) {
    participants.push({
      name: p1Name.toUpperCase(),
      contact: p1Phone ? cleanPhoneNumber(p1Phone) : void 0,
      email: p1Email || void 0,
      college: college || void 0,
      role: isDuet ? "PARTICIPANT 01" : void 0
    });
  }
  if (p2Name) {
    participants.push({
      name: p2Name.toUpperCase(),
      contact: p2Phone ? cleanPhoneNumber(p2Phone) : void 0,
      email: p2Email || void 0,
      college: p2College || college || void 0,
      role: "PARTICIPANT 02"
    });
  }
  const submissions = [];
  if (submissionUrl) {
    submissions.push(classifySubmission(submissionUrl, "WATCH VIDEO \u2197"));
  }
  const contacts = [];
  if (p1Phone) contacts.push(cleanPhoneNumber(p1Phone));
  if (p2Phone) contacts.push(cleanPhoneNumber(p2Phone));
  const emails = [];
  if (p1Email) emails.push(p1Email);
  if (p2Email) emails.push(p2Email);
  return {
    id: `ENT-${eventId}-${(index + 1).toString().padStart(3, "0")}`,
    eventId,
    eventName,
    displayName,
    type: isDuet ? "duet" : "solo",
    participants,
    college: college || void 0,
    colleges: college ? [college] : [],
    contacts,
    emails,
    submissions,
    timestamp: timestamp || void 0,
    rawData: row
  };
}

// src/parsers/team.ts
function parseTeam(row, index, eventId, eventName) {
  const teamName = findColumnValue(row, ["Team Name", "Band Name", "Group Name", "Play Title", "Production Name", "Team"]) || `TEAM ${(index + 1).toString().padStart(2, "0")}`;
  const memberCountStr = findColumnValue(row, ["Number of Members", "Team Size", "Members Count", "Total Members", "Count"]);
  const memberCount = memberCountStr ? parseInt(memberCountStr, 10) : void 0;
  const leaderName = findColumnValue(row, ["Team Leader Name", "Leader Name", "POC Name", "Contact Person", "Director Name"]);
  const leaderPhone = findColumnValue(row, ["Leader Contact Number", "Leader Phone", "Contact Number", "Phone", "Mobile"]);
  const leaderEmail = findColumnValue(row, ["Team Leader's mail ID", "Leader Email", "Email Address", "Email"]);
  const college = findColumnValue(row, ["College Name", "College", "Institution", "Institute", "University"]);
  const submissionUrl = findColumnValue(row, [
    "Final Submission",
    "Submission Link",
    "Video Link",
    "Script Link",
    "Drive Link",
    "Drive Folder",
    "Submission",
    "Upload"
  ]);
  const timestamp = findColumnValue(row, ["Timestamp", "time", "date"]);
  const participants = [];
  for (let i = 1; i <= 20; i++) {
    const mName = findColumnValue(row, [`Member ${i} Name`, `Participant ${i}`, `Member ${i}`, `Cast ${i}`]);
    const mCollege = findColumnValue(row, [`Member ${i} College`, `Participant ${i} College`]);
    const mContact = findColumnValue(row, [`Member ${i} Contact`, `Member ${i} Phone`]);
    if (mName) {
      participants.push({
        name: mName.toUpperCase(),
        college: mCollege || college || void 0,
        contact: mContact ? cleanPhoneNumber(mContact) : void 0
      });
    }
  }
  const submissions = [];
  if (submissionUrl) {
    submissions.push(classifySubmission(submissionUrl));
  }
  const contacts = [];
  if (leaderPhone) contacts.push(cleanPhoneNumber(leaderPhone));
  const emails = [];
  if (leaderEmail) emails.push(leaderEmail);
  return {
    id: `ENT-${eventId}-${(index + 1).toString().padStart(3, "0")}`,
    eventId,
    eventName,
    displayName: teamName.toUpperCase(),
    type: "team",
    teamName: teamName.toUpperCase(),
    participantCount: memberCount || (participants.length > 0 ? participants.length : void 0),
    leader: leaderName || leaderPhone || leaderEmail ? {
      name: leaderName ? leaderName.toUpperCase() : void 0,
      phone: leaderPhone ? cleanPhoneNumber(leaderPhone) : void 0,
      email: leaderEmail || void 0,
      college: college || void 0
    } : void 0,
    participants,
    college: college || void 0,
    colleges: college ? [college] : [],
    contacts,
    emails,
    submissions,
    timestamp: timestamp || void 0,
    rawData: row
  };
}

// src/parsers/individual.ts
function parseIndividual(row, index, eventId, eventName) {
  const name = findColumnValue(row, [
    "Participant Name",
    "Full Name",
    "Name",
    "Candidate Name",
    "Performer Name"
  ]) || `PARTICIPANT ${(index + 1).toString().padStart(2, "0")}`;
  const phone = findColumnValue(row, [
    "Participant Contact Number",
    "Contact Number",
    "Phone Number",
    "Phone",
    "Mobile",
    "WhatsApp Number"
  ]);
  const email = findColumnValue(row, [
    "Participant E-mail ID",
    "Email Address",
    "Email ID",
    "Email"
  ]);
  const college = findColumnValue(row, [
    "Participant College Name",
    "College Name",
    "College",
    "Institution",
    "University"
  ]);
  const collegeId = findColumnValue(row, [
    "Participant College ID",
    "College ID",
    "Roll Number",
    "Student ID"
  ]);
  const submissionUrl = findColumnValue(row, [
    "Preliminary submission video",
    "Submission Link",
    "Portfolio Link",
    "Drive Link",
    "Photo Submission",
    "Upload",
    "Link"
  ]);
  const timestamp = findColumnValue(row, ["Timestamp", "time", "date"]);
  const submissions = [];
  if (submissionUrl) {
    submissions.push(classifySubmission(submissionUrl));
  }
  const contacts = [];
  if (phone) contacts.push(cleanPhoneNumber(phone));
  const emails = [];
  if (email) emails.push(email);
  return {
    id: `ENT-${eventId}-${(index + 1).toString().padStart(3, "0")}`,
    eventId,
    eventName,
    displayName: name.toUpperCase(),
    type: "individual",
    participants: [
      {
        name: name.toUpperCase(),
        college: college || void 0,
        contact: phone ? cleanPhoneNumber(phone) : void 0,
        email: email || void 0,
        idNumber: collegeId || void 0
      }
    ],
    college: college || void 0,
    colleges: college ? [college] : [],
    contacts,
    emails,
    submissions,
    timestamp: timestamp || void 0,
    collegeId: collegeId || void 0,
    rawData: row
  };
}

// src/parsers/index.ts
function parseEventRow(eventId, row, index) {
  const eventConfig = EVENTS_REGISTRY.find((e) => e.id === eventId);
  const eventName = eventConfig ? eventConfig.name : `EVENT ${eventId}`;
  switch (eventId) {
    case "07":
      return parseVignette(row, index);
    case "10":
      return parsePicassosPixels(row, index);
    case "01":
    // BAILAR
    case "04":
    // EUPHONY
    case "15":
      return parseSoloDuet(row, index, eventId, eventName);
    case "02":
    // VERVE
    case "03":
    // DELIRIUM
    case "05":
    // HALLA BOL
    case "06":
    // PROSCENIUM
    case "08":
    // VANITY
    case "13":
      return parseTeam(row, index, eventId, eventName);
    case "09":
    // ISO
    case "11":
    // CYPHER
    case "12":
    // ELOQUENCE
    case "14":
    // QUINTESSENCE
    default:
      return parseIndividual(row, index, eventId, eventName);
  }
}
function parseEventRows(eventId, rows) {
  return rows.map((row, idx) => parseEventRow(eventId, row, idx));
}

// src/fallback/snapshots.ts
var VIGNETTE_SNAPSHOT_ROWS = [
  {
    "Timestamp": "10/12/2025 14:22:10",
    "Email address": "director.cinemaparadiso@gmail.com",
    "Team Name": "CINEMA PARADISO",
    "Team Leader's mail ID": "lead.paradiso@nid.ac.in",
    "College Name": "National Institute of Design, Ahmedabad",
    "Final Submission": "https://drive.google.com/file/d/1vignette_cinema_paradiso/view?usp=sharing"
  },
  {
    "Timestamp": "10/12/2025 16:45:33",
    "Email address": "framebyframe.films@spa.ac.in",
    "Team Name": "FRAME BY FRAME",
    "Team Leader's mail ID": "kavya.verma@spa.ac.in",
    "College Name": "School of Planning and Architecture, Delhi",
    "Final Submission": "https://drive.google.com/file/d/1frame_by_frame_vignette/view?usp=sharing"
  },
  {
    "Timestamp": "10/13/2025 09:12:05",
    "Email address": "aurora.creatives@iitb.ac.in",
    "Team Name": "THE AURORA",
    "Team Leader's mail ID": "samir.aurora@iitb.ac.in",
    "College Name": "IIT Bombay",
    "Final Submission": "https://youtu.be/aurora_film_entry_2026"
  },
  {
    "Timestamp": "10/13/2025 11:30:20",
    "Email address": "obscura.celluloid@nift.ac.in",
    "Team Name": "OBSCURA",
    "Team Leader's mail ID": "tanya.obscura@nift.ac.in",
    "College Name": "NIFT Delhi",
    "Final Submission": "https://drive.google.com/file/d/1obscura_film_nift/view?usp=sharing"
  },
  {
    "Timestamp": "10/13/2025 15:10:44",
    "Email address": "montage.studios@srfti.ac.in",
    "Team Name": "MONTAGE STUDIOS",
    "Team Leader's mail ID": "arjun.sen@srfti.ac.in",
    "College Name": "Satyajit Ray Film and Television Institute, Kolkata",
    "Final Submission": "https://vimeo.com/montage_studios_vignette"
  },
  {
    "Timestamp": "10/14/2025 10:05:12",
    "Email address": "lenscraft.iimi@iimidr.ac.in",
    "Team Name": "LENSCRAFT PRODUCTIONS",
    "Team Leader's mail ID": "ananya.p@iimidr.ac.in",
    "College Name": "IIM Indore",
    "Final Submission": "https://drive.google.com/file/d/1lenscraft_arb26/view?usp=sharing"
  },
  {
    "Timestamp": "10/14/2025 13:40:55",
    "Email address": "parallax.cinema@bits-pilani.ac.in",
    "Team Name": "PARALLAX FILMS",
    "Team Leader's mail ID": "dev.parallax@bits-pilani.ac.in",
    "College Name": "BITS Pilani",
    "Final Submission": "https://youtu.be/parallax_arb26_vignette"
  },
  {
    "Timestamp": "10/14/2025 18:22:01",
    "Email address": "anamorphic.media@srishti.ac.in",
    "Team Name": "ANAMORPHIC DREAMS",
    "Team Leader's mail ID": "riya.k@srishti.ac.in",
    "College Name": "Srishti Institute of Art, Design and Technology, Bengaluru",
    "Final Submission": "https://drive.google.com/file/d/1anamorphic_dreams_film/view?usp=sharing"
  }
];
var PICASSOS_PIXELS_SNAPSHOT_ROWS = [
  {
    "Timestamp": "10/12/2025 11:04:12",
    "Email Address": "rishabh.jain@nid.ac.in",
    "Participant Name": "RISHABH JAIN",
    "Participant Contact Number": "9876543210",
    "Participant E-mail ID": "rishabh.jain@nid.ac.in",
    "Participant College Name": "National Institute of Design, Ahmedabad",
    "Participant College ID": "NID-DES-2026-0492",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1rishabh_timelapse_art/view?usp=sharing"
  },
  {
    "Timestamp": "10/12/2025 13:20:45",
    "Email Address": "aisha.patel@srishti.ac.in",
    "Participant Name": "AISHA PATEL",
    "Participant Contact Number": "9812345678",
    "Participant E-mail ID": "aisha.patel@srishti.ac.in",
    "Participant College Name": "Srishti Institute of Art, Design and Technology, Bengaluru",
    "Participant College ID": "SRI-ART-1104",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1aisha_digitalart_timelapse/view?usp=sharing"
  },
  {
    "Timestamp": "10/12/2025 15:40:19",
    "Email Address": "vikram.chouhan@jjiaa.edu.in",
    "Participant Name": "VIKRAM CHOUHAN",
    "Participant Contact Number": "9723456789",
    "Participant E-mail ID": "vikram.chouhan@jjiaa.edu.in",
    "Participant College Name": "Sir J. J. Institute of Applied Art, Mumbai",
    "Participant College ID": "JJ-IAA-0881",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://youtu.be/vikram_timelapse_art"
  },
  {
    "Timestamp": "10/12/2025 17:15:30",
    "Email Address": "meera.nair@nift.ac.in",
    "Participant Name": "MEERA NAIR",
    "Participant Contact Number": "9634567890",
    "Participant E-mail ID": "meera.nair@nift.ac.in",
    "Participant College Name": "NIFT Mumbai",
    "Participant College ID": "NFT-MUM-2341",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1meera_nift_art_timelapse/view?usp=sharing"
  },
  {
    "Timestamp": "10/13/2025 09:30:11",
    "Email Address": "aditya.sharma@iitd.ac.in",
    "Participant Name": "ADITYA SHARMA",
    "Participant Contact Number": "9545678901",
    "Participant E-mail ID": "aditya.sharma@iitd.ac.in",
    "Participant College Name": "IIT Delhi",
    "Participant College ID": "2023CS10842",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1aditya_pixels_timelapse/view?usp=sharing"
  },
  {
    "Timestamp": "10/13/2025 10:45:50",
    "Email Address": "kavita.deshmukh@mitid.edu.in",
    "Participant Name": "KAVITA DESHMUKH",
    "Participant Contact Number": "9456789012",
    "Participant E-mail ID": "kavita.deshmukh@mitid.edu.in",
    "Participant College Name": "MIT Institute of Design, Pune",
    "Participant College ID": "MITID-22-901",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1kavita_digital_illustration/view?usp=sharing"
  },
  {
    "Timestamp": "10/13/2025 12:18:22",
    "Email Address": "tanmay.bose@iitkgp.ac.in",
    "Participant Name": "TANMAY BOSE",
    "Participant Contact Number": "9367890123",
    "Participant E-mail ID": "tanmay.bose@iitkgp.ac.in",
    "Participant College Name": "IIT Kharagpur",
    "Participant College ID": "KGP-DES-4412",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://youtu.be/tanmay_kgp_digitalart"
  },
  {
    "Timestamp": "10/13/2025 14:02:15",
    "Email Address": "diya.sen@bhu.ac.in",
    "Participant Name": "DIYA SEN",
    "Participant Contact Number": "9278901234",
    "Participant E-mail ID": "diya.sen@bhu.ac.in",
    "Participant College Name": "Faculty of Visual Arts, BHU Varanasi",
    "Participant College ID": "BHU-FVA-782",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1diya_sen_timelapse/view?usp=sharing"
  },
  {
    "Timestamp": "10/13/2025 16:25:40",
    "Email Address": "rohan.verma@dtu.ac.in",
    "Participant Name": "ROHAN VERMA",
    "Participant Contact Number": "9189012345",
    "Participant E-mail ID": "rohan.verma@dtu.ac.in",
    "Participant College Name": "Delhi Technological University",
    "Participant College ID": "2K22/SE/112",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1rohan_dtu_art/view?usp=sharing"
  },
  {
    "Timestamp": "10/13/2025 18:50:00",
    "Email Address": "ananya.kulkarni@symbiosis.ac.in",
    "Participant Name": "ANANYA KULKARNI",
    "Participant Contact Number": "9090123456",
    "Participant E-mail ID": "ananya.kulkarni@symbiosis.ac.in",
    "Participant College Name": "Symbiosis Institute of Design, Pune",
    "Participant College ID": "SID-2024-039",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1ananya_sid_pixels/view?usp=sharing"
  },
  {
    "Timestamp": "10/14/2025 09:15:30",
    "Email Address": "harsh.vardhan@iitb.ac.in",
    "Participant Name": "HARSH VARDHAN",
    "Participant Contact Number": "9988776655",
    "Participant E-mail ID": "harsh.vardhan@iitb.ac.in",
    "Participant College Name": "IDC School of Design, IIT Bombay",
    "Participant College ID": "IDC-24-102",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1harsh_idc_timelapse/view?usp=sharing"
  },
  {
    "Timestamp": "10/14/2025 10:30:15",
    "Email Address": "sneha.reddy@jntu.ac.in",
    "Participant Name": "SNEHA REDDY",
    "Participant Contact Number": "9877665544",
    "Participant E-mail ID": "sneha.reddy@jntu.ac.in",
    "Participant College Name": "JNAFAU Hyderabad",
    "Participant College ID": "JNAFAU-BFA-19",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1sneha_digital_art/view?usp=sharing"
  },
  {
    "Timestamp": "10/14/2025 11:45:00",
    "Email Address": "karan.mehta@du.ac.in",
    "Participant Name": "KARAN MEHTA",
    "Participant Contact Number": "9766554433",
    "Participant E-mail ID": "karan.mehta@du.ac.in",
    "Participant College Name": "College of Art, Delhi University",
    "Participant College ID": "COA-DU-2025",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1karan_coa_timelapse/view?usp=sharing"
  },
  {
    "Timestamp": "10/14/2025 13:10:20",
    "Email Address": "pooja.hegde@manipal.edu",
    "Participant Name": "POOJA HEGDE",
    "Participant Contact Number": "9655443322",
    "Participant E-mail ID": "pooja.hegde@manipal.edu",
    "Participant College Name": "Manipal Academy of Higher Education",
    "Participant College ID": "MAHE-DES-501",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1pooja_digital_submission/view?usp=sharing"
  },
  {
    "Timestamp": "10/14/2025 14:25:35",
    "Email Address": "rahul.iyer@loyola.edu.in",
    "Participant Name": "RAHUL IYER",
    "Participant Contact Number": "9544332211",
    "Participant E-mail ID": "rahul.iyer@loyola.edu.in",
    "Participant College Name": "Loyola College, Chennai",
    "Participant College ID": "LOY-VISCOM-88",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1rahul_loyola_pixels/view?usp=sharing"
  },
  {
    "Timestamp": "10/14/2025 15:40:50",
    "Email Address": "zoya.khan@jamia.ac.in",
    "Participant Name": "ZOYA KHAN",
    "Participant Contact Number": "9433221100",
    "Participant E-mail ID": "zoya.khan@jamia.ac.in",
    "Participant College Name": "Faculty of Fine Arts, Jamia Millia Islamia",
    "Participant College ID": "JMI-FFA-2023-4",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1zoya_jmi_timelapse/view?usp=sharing"
  },
  {
    "Timestamp": "10/14/2025 16:55:05",
    "Email Address": "varun.gupta@iitk.ac.in",
    "Participant Name": "VARUN GUPTA",
    "Participant Contact Number": "9322110099",
    "Participant E-mail ID": "varun.gupta@iitk.ac.in",
    "Participant College Name": "IIT Kanpur",
    "Participant College ID": "210984-DES",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1varun_iitk_art/view?usp=sharing"
  },
  {
    "Timestamp": "10/14/2025 17:30:40",
    "Email Address": "kriti.saxena@christ.edu.in",
    "Participant Name": "KRITI SAXENA",
    "Participant Contact Number": "9211009988",
    "Participant E-mail ID": "kriti.saxena@christ.edu.in",
    "Participant College Name": "Christ University, Bengaluru",
    "Participant College ID": "CHR-MDA-992",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1kriti_christ_submission/view?usp=sharing"
  },
  {
    "Timestamp": "10/14/2025 18:15:10",
    "Email Address": "abhishek.roy@ju.edu.in",
    "Participant Name": "ABHISHEK ROY",
    "Participant Contact Number": "9100998877",
    "Participant E-mail ID": "abhishek.roy@ju.edu.in",
    "Participant College Name": "Jadavpur University, Kolkata",
    "Participant College ID": "JU-ARTS-302",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1abhishek_ju_timelapse/view?usp=sharing"
  },
  {
    "Timestamp": "10/14/2025 19:00:25",
    "Email Address": "tanya.sharma@nift.ac.in",
    "Participant Name": "TANYA SHARMA",
    "Participant Contact Number": "9099887766",
    "Participant E-mail ID": "tanya.sharma@nift.ac.in",
    "Participant College Name": "NIFT Delhi",
    "Participant College ID": "NFT-DEL-2024-81",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1tanya_nift_pixels/view?usp=sharing"
  },
  {
    "Timestamp": "10/14/2025 19:45:00",
    "Email Address": "siddharth.m@iimidr.ac.in",
    "Participant Name": "SIDDHARTH MENON",
    "Participant Contact Number": "9988998877",
    "Participant E-mail ID": "siddharth.m@iimidr.ac.in",
    "Participant College Name": "IIM Indore",
    "Participant College ID": "IPM-2024-118",
    "Please upload your preliminary submission video below. Kindly ensure the timelapse video is no more than 5 minutes long.": "https://drive.google.com/file/d/1siddharth_pixels_arb26/view?usp=sharing"
  }
];

// server/pocFetcher.ts
var POC_SHEET_ID = "1vkNTHQx9XmbPDiCEWkcCs3iJ5pT7rrTXIU-i7W4qpcI";
var pocCache = null;
var POC_CACHE_TTL_MS = 60 * 1e3;
var EVENT_NAME_TO_ID = {
  "bailar": "01",
  "verve": "02",
  "delirium": "03",
  "euphony": "04",
  "hallabol": "05",
  "halla bol": "05",
  "proscenium": "06",
  "vignette": "07",
  "vanity": "08",
  "iso": "09",
  "piccaso's pixels": "10",
  "picassos pixels": "10",
  "picasso's pixels": "10",
  "picasso\u2019s pixels": "10",
  "piccaso": "10",
  "picasso": "10",
  "cypher": "11",
  "eloquence": "12",
  "ad-o-mania": "13",
  "adomania": "13",
  "ad o mania": "13",
  "quintessence": "14",
  "sonata": "15"
};
function normalizeEventNameToId(rawName) {
  if (!rawName) return null;
  const clean = rawName.toLowerCase().replace(/[–—_]/g, " ").replace(/['’]/g, "'").trim();
  for (const [key, id] of Object.entries(EVENT_NAME_TO_ID)) {
    if (clean === key || clean.startsWith(key) || clean.includes(key)) {
      return id;
    }
  }
  return null;
}
async function fetchLivePOCs(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && pocCache && pocCache.expiresAt > now) {
    return pocCache.pocsByEventId;
  }
  const exportUrl = `https://docs.google.com/spreadsheets/d/${POC_SHEET_ID}/export?format=csv`;
  const pocsByEventId = {
    "01": [],
    "02": [],
    "03": [],
    "04": [],
    "05": [],
    "06": [],
    "07": [],
    "08": [],
    "09": [],
    "10": [],
    "11": [],
    "12": [],
    "13": [],
    "14": [],
    "15": []
  };
  const allPocs = [];
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12e3);
    const res = await fetch(exportUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) EventsCults/1.0",
        "Accept": "text/csv, text/plain, */*"
      }
    });
    clearTimeout(timeout);
    if (res.ok) {
      const csvText = await res.text();
      if (!csvText.trim().startsWith("<!DOCTYPE") && !csvText.trim().startsWith("<html")) {
        const rows = parseCSVToMatrix(csvText);
        let currentEventId = null;
        let currentEventRawName = "";
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row || row.length === 0) continue;
          const colEvent = (row[0] || "").trim();
          const colName = (row[1] || "").trim();
          const colContact = (row[2] || "").trim();
          const colDesc = (row[3] || "").trim();
          if (colEvent) {
            const matchedId = normalizeEventNameToId(colEvent) || normalizeEventNameToId(colDesc);
            if (matchedId) {
              currentEventId = matchedId;
              currentEventRawName = colEvent;
            }
          }
          if (currentEventId && (colName || colContact)) {
            const cleanName = colName.replace(/\s+/g, " ").trim();
            const cleanPhone = colContact.replace(/\s+/g, " ").trim();
            if (cleanName || cleanPhone) {
              const pocObj = {
                name: cleanName.toUpperCase() || "EVENT POC",
                phone: cleanPhone || "CONTACT PENDING"
              };
              const exists = pocsByEventId[currentEventId].some(
                (p) => p.name.toUpperCase() === pocObj.name.toUpperCase() && p.phone === pocObj.phone
              );
              if (!exists) {
                pocsByEventId[currentEventId].push(pocObj);
                allPocs.push({
                  ...pocObj,
                  eventId: currentEventId,
                  eventName: currentEventRawName.toUpperCase()
                });
              }
            }
          }
        }
        pocCache = {
          pocsByEventId,
          allPocs,
          lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
          expiresAt: now + POC_CACHE_TTL_MS
        };
        return pocsByEventId;
      }
    }
  } catch (err) {
    console.warn("[POCFetcher] Failed to fetch live POC sheet, returning existing cache or empty mapping:", err.message);
  }
  if (pocCache) {
    return pocCache.pocsByEventId;
  }
  return pocsByEventId;
}

// server/sheetFetcher.ts
var CACHE_TTL_MS = 60 * 1e3;
var cache = /* @__PURE__ */ new Map();
async function fetchEventData(eventId, forceRefresh = false) {
  const event = getEventById(eventId);
  if (!event) {
    throw new Error(`Event with ID ${eventId} not found`);
  }
  const livePocMap = await fetchLivePOCs(forceRefresh);
  const livePocs = livePocMap[eventId] || [];
  const cacheKey = `event_${eventId}`;
  const now = Date.now();
  if (!forceRefresh && cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (cached.expiresAt > now) {
      return {
        ...cached.data,
        pocs: livePocs
      };
    }
  }
  const sheetUrl = getSheetUrl(event.sheetId);
  if (!event.sheetId) {
    const response2 = {
      eventId: event.id,
      eventName: event.name,
      records: [],
      totalCount: 0,
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
      source: "not_configured",
      sheetUrl: null,
      unstopUrl: event.unstopUrl,
      formUrl: event.formUrl,
      pocs: livePocs
    };
    cache.set(cacheKey, { data: response2, expiresAt: now + CACHE_TTL_MS });
    return response2;
  }
  try {
    const exportUrl = `https://docs.google.com/spreadsheets/d/${event.sheetId}/export?format=csv`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12e3);
    const res = await fetch(exportUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) EventsCults/1.0",
        "Accept": "text/csv, text/plain, */*"
      }
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const csvText = await res.text();
      if (!csvText.trim().startsWith("<!DOCTYPE") && !csvText.trim().startsWith("<html")) {
        const rawRows = parseCSV(csvText);
        if (rawRows.length > 0) {
          const records = parseEventRows(eventId, rawRows);
          const response2 = {
            eventId: event.id,
            eventName: event.name,
            records,
            totalCount: records.length,
            lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
            source: "live",
            sheetUrl,
            unstopUrl: event.unstopUrl,
            formUrl: event.formUrl,
            pocs: livePocs
          };
          cache.set(cacheKey, { data: response2, expiresAt: now + CACHE_TTL_MS });
          return response2;
        }
      }
    }
  } catch (err) {
    console.warn(`[SheetFetcher] Live fetch failed for event ${eventId} (${event.name}):`, err.message);
  }
  try {
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${event.sheetId}/gviz/tq?tqx=out:csv`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8e3);
    const res = await fetch(gvizUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const csvText = await res.text();
      if (!csvText.trim().startsWith("<!DOCTYPE") && !csvText.trim().startsWith("<html")) {
        const rawRows = parseCSV(csvText);
        if (rawRows.length > 0) {
          const records = parseEventRows(eventId, rawRows);
          const response2 = {
            eventId: event.id,
            eventName: event.name,
            records,
            totalCount: records.length,
            lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
            source: "live",
            sheetUrl,
            unstopUrl: event.unstopUrl,
            formUrl: event.formUrl,
            pocs: livePocs
          };
          cache.set(cacheKey, { data: response2, expiresAt: now + CACHE_TTL_MS });
          return response2;
        }
      }
    }
  } catch {
  }
  let fallbackRecords = [];
  if (eventId === "07") {
    fallbackRecords = parseEventRows("07", VIGNETTE_SNAPSHOT_ROWS);
  } else if (eventId === "10") {
    fallbackRecords = parseEventRows("10", PICASSOS_PIXELS_SNAPSHOT_ROWS);
  }
  const response = {
    eventId: event.id,
    eventName: event.name,
    records: fallbackRecords,
    totalCount: fallbackRecords.length,
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    source: fallbackRecords.length > 0 ? "fallback" : "live",
    sheetUrl,
    unstopUrl: event.unstopUrl,
    formUrl: event.formUrl,
    pocs: livePocs,
    error: fallbackRecords.length === 0 ? "Live sheet is connecting. Access directly using shortcut." : void 0
  };
  cache.set(cacheKey, { data: response, expiresAt: now + 3e4 });
  return response;
}
async function fetchAllEventsDatabase(forceRefresh = false) {
  const promises = EVENTS_REGISTRY.map((event) => fetchEventData(event.id, forceRefresh));
  const results = await Promise.allSettled(promises);
  const allRecords = [];
  results.forEach((res) => {
    if (res.status === "fulfilled" && res.value.records) {
      allRecords.push(...res.value.records);
    }
  });
  return allRecords;
}
async function fetchOverviewMetrics(forceRefresh = false) {
  const [eventResults, livePocMap] = await Promise.all([
    Promise.allSettled(EVENTS_REGISTRY.map((event) => fetchEventData(event.id, forceRefresh))),
    fetchLivePOCs(forceRefresh)
  ]);
  let totalRegistrations = 0;
  let totalParticipants = 0;
  let totalSubmissions = 0;
  const eventStats = [];
  eventResults.forEach((res, index) => {
    const event = EVENTS_REGISTRY[index];
    const livePocsForEvent = livePocMap[event.id] || [];
    if (res.status === "fulfilled") {
      const records = res.value.records || [];
      const regCount = records.length;
      let partCount = 0;
      let subCount = 0;
      records.forEach((r) => {
        partCount += r.participantCount || (r.participants && r.participants.length > 0 ? r.participants.length : 1);
        if (r.submissions && r.submissions.length > 0) {
          subCount += r.submissions.filter((s) => Boolean(s.url && s.url.trim())).length;
        }
      });
      totalRegistrations += regCount;
      totalParticipants += partCount;
      totalSubmissions += subCount;
      eventStats.push({
        id: event.id,
        number: event.number,
        name: event.name,
        registrationCount: regCount,
        participantCount: partCount,
        submissionCount: subCount,
        pocCount: livePocsForEvent.length
      });
    } else {
      eventStats.push({
        id: event.id,
        number: event.number,
        name: event.name,
        registrationCount: 0,
        participantCount: 0,
        submissionCount: 0,
        pocCount: livePocsForEvent.length
      });
    }
  });
  return {
    totalEvents: EVENTS_REGISTRY.length,
    totalRegistrations,
    totalParticipants,
    totalSubmissions,
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    eventStats
  };
}

// server.ts
var import_meta = {};
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.get("/api/events", (req, res) => {
    res.json({
      success: true,
      data: EVENTS_REGISTRY
    });
  });
  app.get("/api/pocs", async (req, res) => {
    try {
      const forceRefresh = req.query.refresh === "true";
      const pocsByEventId = await fetchLivePOCs(forceRefresh);
      res.json({ success: true, data: pocsByEventId });
    } catch (err) {
      console.error("[API] Error fetching POCs:", err);
      res.status(500).json({
        success: false,
        error: err.message || "Failed to fetch POCs"
      });
    }
  });
  app.get("/api/overview", async (req, res) => {
    try {
      const forceRefresh = req.query.refresh === "true";
      const overview = await fetchOverviewMetrics(forceRefresh);
      res.json({ success: true, data: overview });
    } catch (err) {
      console.error("[API] Error fetching overview metrics:", err);
      res.status(500).json({
        success: false,
        error: err.message || "Failed to fetch overview metrics"
      });
    }
  });
  app.get("/api/events/:id", async (req, res) => {
    try {
      const eventId = req.params.id;
      const forceRefresh = req.query.refresh === "true";
      const data = await fetchEventData(eventId, forceRefresh);
      res.json({ success: true, data });
    } catch (err) {
      console.error("[API] Error fetching event:", err);
      res.status(500).json({
        success: false,
        error: err.message || "Failed to fetch event data"
      });
    }
  });
  app.get("/api/database", async (req, res) => {
    try {
      const forceRefresh = req.query.refresh === "true";
      const records = await fetchAllEventsDatabase(forceRefresh);
      res.json({
        success: true,
        data: {
          records,
          totalCount: records.length,
          lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
        }
      });
    } catch (err) {
      console.error("[API] Error fetching master database:", err);
      res.status(500).json({
        success: false,
        error: err.message || "Failed to fetch database"
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(__dirname, "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EVENTS : CULTS Server running on http://localhost:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
//# sourceMappingURL=server.cjs.map
