import * as React from 'react';

/**
 * React 18 does not forward `onBch*` props to custom elements as DOM event
 * listeners: unknown props on a custom element are written as attributes, so
 * the handler is silently dropped. This helper keeps the typed wrapper API
 * (`onBchChange`, `onBchSelect`, …) but wires each handler with
 * `addEventListener` on the element instance.
 *
 * Subscription is keyed by the *set of event props*, not by their identity, so
 * passing a fresh inline handler on every render does not detach/reattach the
 * listener. The latest handler is read from a ref when the event fires.
 */

type BchEventHandler = (event: CustomEvent<unknown>) => void;

/** `onBchChange` → `bchChange`; `onBchOpenChange` → `bchOpenChange`. */
export function eventNameFromProp(prop: string): string {
  return prop.charAt(2).toLowerCase() + prop.slice(3);
}

export function createWrapper<P extends object>(
  tagName: string,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<HTMLElement>> {
  const Wrapper = React.forwardRef<HTMLElement, P>((props, forwardedRef) => {
    const elementRef = React.useRef<HTMLElement | null>(null);
    const handlersRef = React.useRef<Record<string, BchEventHandler | undefined>>({});

    const elementProps: Record<string, unknown> = {};
    const bindings: Array<{ prop: string; event: string }> = [];
    const handlers: Record<string, BchEventHandler | undefined> = {};

    for (const [key, value] of Object.entries(props as Record<string, unknown>)) {
      if (/^onBch[A-Z]/.test(key) && typeof value === 'function') {
        const handler = value as BchEventHandler;
        handlers[key] = handler;
        bindings.push({ prop: key, event: eventNameFromProp(key) });
      } else {
        elementProps[key] = value;
      }
    }
    handlersRef.current = handlers;

    // Re-subscribe only when the event names change, never when a handler
    // identity changes. Handlers themselves are read live from `handlersRef`.
    const subscriptionKey = bindings
      .map(({ prop, event }) => `${prop}:${event}`)
      .sort()
      .join('|');

    React.useLayoutEffect(() => {
      const element = elementRef.current;
      if (!element) return;
      const listeners = bindings.map(({ prop, event }) => {
        const listener = (domEvent: Event) => {
          handlersRef.current[prop]?.(domEvent as CustomEvent<unknown>);
        };
        element.addEventListener(event, listener);
        return { event, listener };
      });
      return () => {
        for (const { event, listener } of listeners) {
          element.removeEventListener(event, listener);
        }
      };
      // `bindings` is intentionally excluded: `subscriptionKey` encodes the
      // only thing the effect needs from it, so inline handlers don't churn.
    }, [subscriptionKey]);

    const setRef = React.useCallback(
      (node: HTMLElement | null) => {
        elementRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      [forwardedRef],
    );

    return React.createElement(tagName, { ...elementProps, ref: setRef });
  });

  Wrapper.displayName = `Bch(${tagName})`;
  return Wrapper;
}
