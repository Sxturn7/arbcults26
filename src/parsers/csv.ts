/**
 * Robust CSV parser that handles quotes, escaped quotes, multiline values, and commas.
 */
export function parseCSVToMatrix(csvText: string): string[][] {
  if (!csvText || !csvText.trim()) return [];

  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  const chars = csvText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const nextChar = chars[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped quote
          currentCell += '"';
          i++;
        } else {
          // Closing quote
          inQuotes = false;
        }
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if (char === '\n') {
        currentRow.push(currentCell.trim());
        if (currentRow.some((c) => c.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
  }

  // Last cell
  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

export function parseCSV(csvText: string): Array<Record<string, string>> {
  const rows = parseCSVToMatrix(csvText);
  if (rows.length === 0) return [];

  const headers = rows[0].map((h) => h.trim());
  const dataRows = rows.slice(1);

  const result: Array<Record<string, string>> = [];

  for (const row of dataRows) {
    // Check if entire row is empty
    if (!row.some((cell) => cell.length > 0)) continue;

    const rowObj: Record<string, string> = {};
    headers.forEach((header, idx) => {
      if (header) {
        rowObj[header] = row[idx] || '';
      }
    });
    result.push(rowObj);
  }

  return result;
}
