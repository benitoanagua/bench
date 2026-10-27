/**
 * Direct children of `host` with the given tag name (case-insensitive).
 * Equivalent to `host.querySelectorAll(':scope > tag')` but implemented over
 * `childNodes`: Stencil's mock-doc (jest spec tests) neither supports the
 * `:scope` pseudo-class nor reliably exposes slotted nodes as direct
 * children. Because mock-doc *physically projects* slotted light-DOM nodes
 * into the target element (real browsers keep them at the host), we fall
 * back to a descendant query when the direct-children scan finds nothing.
 */
export function getDirectChildrenForBench(host: HTMLElement, tagName: string): HTMLElement[] {
  const wanted = tagName.toLowerCase();
  const direct = Array.from(host.childNodes ?? []).filter(
    (node): node is HTMLElement =>
      (node as HTMLElement).nodeType === 1 &&
      (node as unknown as Element).tagName?.toLowerCase() === wanted,
  );
  if (direct.length > 0) return direct;
  return Array.from(host.querySelectorAll(wanted));
}
