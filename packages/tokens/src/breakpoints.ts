/**
 * Breakpoint values in px, mirroring the --bch-breakpoint-* custom properties
 * in tokens.css. CSS custom properties can't be read inside an @media
 * condition, so any JS that needs to branch on viewport width (matchMedia,
 * ResizeObserver thresholds, conditional rendering) should import this
 * instead of hardcoding numbers.
 *
 * If you change a value here, change the matching --bch-breakpoint-* value
 * in tokens.css too — these are two views of one source of truth, not two
 * independent scales.
 */
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/** UPPER_CASE alias — same object, imported by $bench/foundation etc. */
 // BREAKPOINTS alias removed as unused; consumers import `breakpoints`

export type BreakpointKey = keyof typeof breakpoints;

/** Returns a `(min-width: ...)` media query string for the given breakpoint. */
export function minWidthQuery(key: BreakpointKey): string {
  return `(min-width: ${breakpoints[key]}px)`;
}

/**
 * Lightweight matchMedia helper for components/apps that need to react to a
 * breakpoint at runtime. Returns an unsubscribe function.
 *
 * const unsubscribe = watchBreakpoint('md', (matches) => { ... });
 */
export function watchBreakpoint(
  key: BreakpointKey,
  callback: (matches: boolean) => void,
): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mql = window.matchMedia(minWidthQuery(key));
  const listener = (event: MediaQueryListEvent) => callback(event.matches);
  callback(mql.matches);
  mql.addEventListener('change', listener);
  return () => mql.removeEventListener('change', listener);
}
