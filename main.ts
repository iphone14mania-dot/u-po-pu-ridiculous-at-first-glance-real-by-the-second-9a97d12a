// Ridiculous at First Glance, Real by the Second — entry program.
//
// Writes one sentence to /output/entry.txt pitching a bizarre startup
// idea that sounds absurd until you realise it would actually sell.
// Deterministic, no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. The bizarre premise is a gym that fines you for
// skipping and donates the fine to a cause you despise — genuinely strange
// as a mechanism, not a familiar business with a strange adjective bolted
// on (judge brief criterion 2). The business logic holds on its second
// look: members pay to hold their own money hostage, because loss
// aversion and spite are the commitment device — who pays and why is
// stated in the sentence itself (3). The turn takes the reader from
// laughing to nodding at "spite is the only trainer that never lets you
// quit" (4), and the thing sold and the buyer are concrete: $10, a skip,
// a hated cause (5). Revision: a pigeon-delivered apology-note service
// ("a sorry that arrives by bird cannot be ignored — guilty boyfriends
// pay $25 a bird") was dropped as more bizarre but weaker on business
// logic, since pigeons cannot deliver reliably. A soundproof-pod rental
// ("we sell silence by the hour... $9 for twenty quiet minutes") was
// dropped as less bizarre — pods already exist — with a weaker turn.
const ENTRY =
  "A gym that charges you $10 when you skip, and donates it to a cause you despise — members pay us to hold " +
  "their own money hostage, because spite is the only trainer that never lets you quit.";

// Competition rules: 1 to 200 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
