import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BchSlider } from './index';
import { eventNameFromProp } from './create-wrapper';

let container: HTMLDivElement;
let root: Root;
let mounted: boolean;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  mounted = true;
});

afterEach(() => {
  if (mounted) React.act(() => root.unmount());
  container.remove();
});

function render(element: React.ReactElement) {
  React.act(() => {
    root.render(element);
  });
}

function slider(): HTMLElement {
  const element = container.querySelector('bch-slider');
  if (!element) throw new Error('bch-slider not rendered');
  return element as HTMLElement;
}

describe('createWrapper event bridge', () => {
  it('mapea onBch* al nombre de evento del custom element', () => {
    expect(eventNameFromProp('onBchChange')).toBe('bchChange');
    expect(eventNameFromProp('onBchOpenChange')).toBe('bchOpenChange');
    expect(eventNameFromProp('onBchFilesChange')).toBe('bchFilesChange');
  });

  it('dispara el handler con el CustomEvent y su detail', () => {
    const handler = vi.fn();
    render(<BchSlider onBchChange={handler} />);

    const event = new CustomEvent('bchChange', { detail: 42 });
    React.act(() => {
      slider().dispatchEvent(event);
    });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0]).toBe(event);
    expect((handler.mock.calls[0][0] as CustomEvent<number>).detail).toBe(42);
  });

  it('no deja listeners activos tras desmontar', () => {
    const handler = vi.fn();
    render(<BchSlider onBchChange={handler} />);
    const element = slider();

    React.act(() => root.unmount());
    mounted = false;
    element.dispatchEvent(new CustomEvent('bchChange', { detail: 1 }));

    expect(handler).not.toHaveBeenCalled();
  });

  it('usa el handler más reciente sin re-suscribirse', () => {
    const addEventListener = vi.spyOn(HTMLElement.prototype, 'addEventListener');
    const removeEventListener = vi.spyOn(HTMLElement.prototype, 'removeEventListener');
    const first = vi.fn();
    const second = vi.fn();

    render(<BchSlider onBchChange={first} />);
    const element = slider();
    render(<BchSlider onBchChange={second} />);

    React.act(() => {
      element.dispatchEvent(new CustomEvent('bchChange', { detail: 2 }));
    });

    const bchAdds = addEventListener.mock.calls.filter(([name]) => name === 'bchChange');
    const bchRemoves = removeEventListener.mock.calls.filter(([name]) => name === 'bchChange');
    expect(bchAdds).toHaveLength(1);
    expect(bchRemoves).toHaveLength(0);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);

    addEventListener.mockRestore();
    removeEventListener.mockRestore();
  });

  it('combina el ref del usuario con el ref interno', () => {
    const objectRef = React.createRef<HTMLElement>();
    const callbackRef = vi.fn();

    render(
      <>
        <BchSlider ref={objectRef} />
        <BchSlider ref={callbackRef} />
      </>,
    );

    const elements = container.querySelectorAll('bch-slider');
    expect(objectRef.current).toBe(elements[0]);
    expect(callbackRef).toHaveBeenCalledWith(elements[1]);
  });

  it('no reenvía props onBch* como atributos del elemento', () => {
    const handler = vi.fn();
    render(<BchSlider onBchChange={handler} />);

    expect(slider().hasAttribute('onBchChange')).toBe(false);
    expect(slider().hasAttribute('onbchchange')).toBe(false);
  });
});
