// Invent a Word We Need — entry program (program/v1).
// Writes the coined word and its one-line definition to /output/entry.txt.
//
// The entry text is fixed: a single invented English word, "Tabnesia",
// defined in one clear line of 77 characters (limit 140).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The entry, verbatim. Do not edit this string: it is the judged text.
const COINED_WORD = "Tabnesia";
const ENTRY_TEXT =
  "Tabnesia (n.) — opening a new tab and instantly forgetting why you opened it.";

// The sealed scorer accepts UTF-8 text of 1 to 140 characters.
const MAX_CHARS = 140;

function validateEntry(text: string): void {
  if (text.length === 0) {
    throw new Error("entry text must not be empty");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `entry text is ${text.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry text must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry text must not start or end with whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry text must be a single line");
  }
  // The coinage itself must lead the entry, so an accidental edit to the
  // text can never silently submit a definition without its word.
  if (!text.startsWith(COINED_WORD)) {
    throw new Error(`entry text must start with the coined word ${COINED_WORD}`);
  }
}

function resolveOutputCandidates(): string[] {
  // The grader sandbox provides /output. Honour an explicit override
  // first so the program stays runnable outside the sandbox.
  const override = process.env.ENTRY_OUTPUT_PATH;
  if (override && override.trim().length > 0) {
    return [override];
  }
  // Primary target first, local fallback second: if the sandbox path is
  // not writable (local runs, restricted filesystems), still produce the
  // entry instead of failing outright.
  return ["/output/entry.txt", join(process.cwd(), "output", "entry.txt")];
}

function writeEntry(outputPath: string): void {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, ENTRY_TEXT, "utf8");

  // Read the file back and confirm the bytes on disk are exactly the entry.
  const written = readFileSync(outputPath, "utf8");
  if (written !== ENTRY_TEXT) {
    throw new Error("verification failed: entry file differs from entry text");
  }
  console.log(`wrote ${written.length} characters to ${outputPath}`);
}

function main(): void {
  validateEntry(ENTRY_TEXT);

  const candidates = resolveOutputCandidates();
  const failures: string[] = [];
  for (const candidate of candidates) {
    try {
      writeEntry(candidate);
      return;
    } catch (error) {
      failures.push(`${candidate}: ${(error as Error).message}`);
    }
  }
  throw new Error(`could not write entry anywhere: ${failures.join("; ")}`);
}

main();
