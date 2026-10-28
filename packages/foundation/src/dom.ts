export function getFocusableElements(root: ParentNode): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
    ),
  );
}

export function createId(prefix = 'bch'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Direct children of `host` with the given tag name (case-insensitive).
 * Equivalent to `host.querySelectorAll(':scope > tag')` but does not rely on
 * the `:scope` pseudo-class, which Stencil's mock-doc (jest spec tests) does
 * not support.
 */
export function getDirectChildren(host: HTMLElement, tagName: string): HTMLElement[] {
  const wanted = tagName.toLowerCase();
  return Array.from(host.children).filter(
    (el): el is HTMLElement => (el as Element).tagName?.toLowerCase() === wanted,
  );
}
