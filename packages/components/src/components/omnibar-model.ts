/** Omnibar data contract (§4.1). The entry type lives in @bench/foundation next to the pure parser. */
export type { BchFunctionEntry } from '@bench/foundation';
import type { BchFunctionEntry } from '@bench/foundation';

/** Value emitted by `bchRun`: a function entry, or the raw query text. */
export type BchOmnibarResult = BchFunctionEntry | { text: string };
