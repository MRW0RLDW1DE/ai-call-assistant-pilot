import fs from 'fs';
import path from 'path';

export type CallEntry = {
  id: string;
  phoneNumber: string;
  timestamp: string;
  status: string;
  summary?: string;
};

// Path to the call history JSON file
const filePath = path.join(process.cwd(), 'calls.json');

/**
 * Read the call history from the JSON file.
 * Returns an array of CallEntry objects.
 */
export function getCallHistory(): CallEntry[] {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as CallEntry[];
  } catch (err) {
    return [];
  }
}

/**
 * Add a new call entry to the history.
 */
export function addCallEntry(entry: CallEntry): void {
  const history = getCallHistory();
  history.push(entry);
  fs.writeFileSync(filePath, JSON.stringify(history, null, 2));
}
