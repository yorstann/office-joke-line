import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "Make the AI Judge Laugh: Office
// Jokes" bounty. The program writes a single office joke to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt).
// Pass 2 (final): the escape-room joke. A team-building exercise in
// an escape room sets up an innocent reading of "escaped" — fastest
// out of the room — and the last word, "quit", flips it: Dave's
// record time was leaving the company. The twist lands on the very
// final word, the scene is a real modern-office ritual, and a named
// character makes it visual. It replaces the pass-1 meetings joke,
// whose irony had no such end-loaded turn.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const JOKE_BEATS = [
  "Our team-building exercise was an escape room,",
  "and the fastest anyone escaped was Dave, who just quit.",
] as const;

export function buildEntryLine(): string {
  return JOKE_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 199;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
