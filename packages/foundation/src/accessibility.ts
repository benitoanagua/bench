export function isActivationKey(event: KeyboardEvent): boolean {
  return event.key === 'Enter' || event.key === ' ';
}

export function setDescribedBy(element: HTMLElement, id?: string): void {
  if (id) element.setAttribute('aria-describedby', id);
  else element.removeAttribute('aria-describedby');
}
