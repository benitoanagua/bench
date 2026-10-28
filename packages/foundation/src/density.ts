/**
 * Global density preference (bench-design-system.md §1 Regla 6 + §2.9).
 *
 * Density is a *preference*, not a component property: the components read the
 * `--bch-density-*` tokens, which only change when the root element carries
 * `[data-bch-density="compact|comfortable|spacious"]`. This helper owns the
 * user-facing API for that attribute:
 *
 * - `getDensity()` / `setDensity(mode)` read/write the attribute on the root.
 * - `setDensity` persists the choice (localStorage — the single documented
 *   exception to the "no storage in the library" rule, per
 *   docs/architecture/production-boundaries.md; it stores a UI-preference
 *   string only, never domain data).
 * - `resolveViewportDensity` (pure, tested) collapses the density to `compact`
 *   below the conventional 768px (md) breakpoint when the user chose `auto`,
 *   so small viewports get denser rows without hiding functionality — while a
 *   manual preference always wins over the viewport (Rule 6: preference AND
 *   viewport, not viewport overriding the user's own choice).
 * - `installDensityObserver` keeps the attribute in sync on viewport changes.
 */
/**
 * Deep import (not @bench/tokens): the tokens' index pulls the CSS files with
 * bare specifiers that Node (node --test) cannot resolve. breakpoints.js is a
 * plain, dependency-free module.
 */
import { breakpoints as BREAKPOINTS } from '@bench/tokens/breakpoints';
import { breakpoints } from '@bench/tokens/breakpoints';

export type BchDensity = 'compact' | 'comfortable' | 'spacious';
export type BchDensityPreference = 'auto' | BchDensity;

export const DENSITY_STORAGE_KEY = 'bch-density';
export const DENSITY_ATTRIBUTE = 'data-bch-density';
/** terminal is per-panel only ([data-bch-panel="raw-data"]) — never settable as a global preference. */
export const GLOBAL_DENSITIES: readonly BchDensity[] = ['compact', 'comfortable', 'spacious'];

export function isValidDensity(value: string): value is BchDensity {
  return (GLOBAL_DENSITIES as readonly string[]).includes(value);
}

function root(): HTMLElement | null {
  return typeof document === 'undefined' ? null : document.documentElement;
}

export function getDensityPreference(): BchDensityPreference {
  const attr = root()?.getAttribute(DENSITY_ATTRIBUTE) ?? '';
  if (isValidDensity(attr)) return attr;
  try {
    const stored = window.localStorage.getItem(DENSITY_STORAGE_KEY) ?? '';
    if (isValidDensity(stored)) return stored;
  } catch {
    /* localStorage may be unavailable (privacy mode) — fall through to 'auto'. */
  }
  return 'auto';
}

export function getDensity(): BchDensity {
  const attr = root()?.getAttribute(DENSITY_ATTRIBUTE) ?? '';
  if (isValidDensity(attr)) return attr;
  return resolveViewportDensity({ preference: 'auto', viewportWidth: window.innerWidth });
}

export function setDensity(preference: BchDensityPreference): void {
  const el = root();
  if (!el) return;
  try {
    window.localStorage.setItem(DENSITY_STORAGE_KEY, preference);
  } catch {
    /* non-fatal: still honor the request for this session */
  }
  el.setAttribute(
    DENSITY_ATTRIBUTE,
    resolveViewportDensity({ preference, viewportWidth: window.innerWidth }),
  );
}

/** Pure: which density token set applies for a preference at a given viewport. */
export function resolveViewportDensity({
  preference,
  viewportWidth,
}: {
  preference: BchDensityPreference;
  viewportWidth: number;
}): BchDensity {
  if (preference !== 'auto') return preference;
  return viewportWidth >= BREAKPOINTS.md ? 'comfortable' : 'compact';
}

/**
 * Idempotently applies the resolved preference and re-resolves it when the
 * viewport crosses the md breakpoint. Returns a disposer.
 */
export function installDensityObserver(win: Window = window): () => void {
  const apply = () => {
    const preference = getDensityPreference();
    win.document.documentElement.setAttribute(
      DENSITY_ATTRIBUTE,
      resolveViewportDensity({ preference, viewportWidth: win.innerWidth }),
    );
  };
  apply();
  const mq = win.matchMedia(`(min-width: ${BREAKPOINTS.md}px)`);
  mq.addEventListener('change', apply);
  return () => mq.removeEventListener('change', apply);
}
