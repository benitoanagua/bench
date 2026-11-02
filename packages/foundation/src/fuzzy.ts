/**
 * Pure fuzzy scoring for the omnibar (§4.1, ADR-009 tier b).
 *
 * No DOM, no timers, no side effects: the function only maps two strings to a
 * number. Applications feed the score into their own ranking; BENCH never
 * decides what a "good enough" match is for a given product.
 *
 * The score is normalized to the 0..1 range so it can be combined with other
 * signals (frequency, recency) without magic numbers.
 */

/** Combining diacritics so "facturación" matches "facturacion". */
const COMBINING_MARKS = /[\u0300-\u036f]/g;

/** Lowercase, without diacritics, with collapsed whitespace. */
export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Score of `query` against `candidate`:
 *
 * - `1`    exact match (after normalization)
 * - `0.9`  the candidate starts with the query
 * - `0.7`  the query appears inside the candidate
 * - `0.3..0.65` the query is a subsequence of the candidate; the score grows
 *   with the density of the match (fewer gaps between matched characters)
 * - `0`    no match at all
 *
 * An empty query carries no signal and always scores `0`: "no query" is a
 * ranking state of its own, not a match against everything.
 */
export function fuzzyScore(query: string, candidate: string): number {
  const wanted = normalizeText(query);
  const text = normalizeText(candidate);
  if (wanted === '' || text === '') return 0;
  if (text === wanted) return 1;
  if (text.startsWith(wanted)) return 0.9;
  if (text.includes(wanted)) return 0.7;

  let matched = 0;
  let gaps = 0;
  for (const char of text) {
    if (char === wanted[matched]) {
      matched += 1;
      if (matched === wanted.length) break;
    } else if (matched > 0) {
      gaps += 1;
    }
  }
  if (matched < wanted.length) return 0;
  const density = wanted.length / (wanted.length + gaps);
  return 0.3 + 0.35 * density;
}
