export function getFocusableElements(root: ParentNode): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
    ),
  );
}

export function createId(prefix = 'hh'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}
