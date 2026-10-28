/**
 * ISO date helpers shared by every component that accepts `yyyy-mm-dd`
 * values (currently `bch-date-picker` and `bch-data-table` date columns).
 * Parsing is local-time (`new Date(y, m - 1, d)`) — never UTC — matching
 * native `<input type="date">` semantics as documented on `bch-date-picker`.
 */
export function parseISODate(s: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const [y, m, d] = s.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : date;
}
