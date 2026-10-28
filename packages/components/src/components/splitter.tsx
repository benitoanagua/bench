import { Component, Event, type EventEmitter, Prop, h } from '@stencil/core';
import { BCH_SPLITTER_KEY_STEP } from './splitter-bounds';

/**
 * A pane separator of the tiling layout (§4.3): the splitter is ~6px of hit
 * area whose visible line is 1px and "thickens" to 2px + primary color on
 * hover/drag — the same feedback pattern used by the rest of the system
 * (never a silent change).
 *
 * The splitter does NOT own the layout:
 *   Horizontal orientation (columns, vertical line, `col-resize` cursor) and
 *   vertical orientation (rows, horizontal line, `row-resize`) alike simply
 *   emit `bchDrag` with `{ deltaPx }`; the application adjusts the
 *   `flex-basis` of the target panel. The hard minimums below are exported so
 *   the app can clamp before applying the delta:
 *
 * - Minimum pane WIDTH when orientation is horizontal (columns): 160px.
 * - Minimum pane HEIGHT when orientation is vertical (rows): 80px.
 * These constants come from the spec (§4.3) — "un mínimo duro (160px
 * horizontal / 80px vertical) para que ningún panel pueda colapsarse hasta
 * ser inutilizable".
 *
/*
 * Keyboard: native focus (with focus outline token) + ArrowLeft/Right or
 * ArrowUp/Down adjust by 16px per keypress; the exported key-step and hard
 * minimum constants live in `splitter-bounds.ts` (the app clamps panes).
 * ARIA: `role="separator"` with `aria-orientation` describing the *visual*
 * line (perpendicular to the drag axis), matching what a native
 * `aria-orientation` on a separator is expected to say.
 */

/** Spec §4.3: "separador de ~6px" hit area around the 1px visual line. */
const SPLITTER_HIT = '6px';

@Component({ tag: 'bch-splitter', styleUrl: 'splitter.css', shadow: false, scoped: true })
export class BchSplitter {
  /** `horizontal` = the divider splits columns (vertical line, col-resize cursor). */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';
  /** Fired on each drag/keyboard step with the pixel delta of that step. */
  @Event() bchDrag!: EventEmitter<{ deltaPx: number }>;

  private lastPointer?: { x: number; y: number };

  private onPointerDown = (event: PointerEvent) => {
    this.lastPointer = { x: event.clientX, y: event.clientY };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  private onPointerMove = (event: PointerEvent) => {
    if (!this.lastPointer) return;
    const horizontal = this.orientation === 'horizontal';
    const delta = horizontal
      ? event.clientX - this.lastPointer.x
      : event.clientY - this.lastPointer.y;
    this.lastPointer = { x: event.clientX, y: event.clientY };
    if (delta !== 0) this.bchDrag.emit({ deltaPx: delta });
  };

  private onPointerUp = () => {
    this.lastPointer = undefined;
  };

  private onKeyDown = (event: KeyboardEvent) => {
    const step = -BCH_SPLITTER_KEY_STEP; // negative = "shrink toward start"
    const horizontal = this.orientation === 'horizontal';
    let delta = 0;
    if (horizontal) {
      if (event.key === 'ArrowLeft') delta = step;
      else if (event.key === 'ArrowRight') delta = -step;
    } else {
      if (event.key === 'ArrowUp') delta = step;
      else if (event.key === 'ArrowDown') delta = -step;
    }
    if (delta !== 0) {
      event.preventDefault();
      this.bchDrag.emit({ deltaPx: delta });
    }
  };

  render() {
    // aria-orientation describes the *visual line*: vertical when dragging
    // columns, horizontal when dragging rows.
    return (
      <div
        class={{ 'bch-splitter': true, 'is-horizontal': this.orientation === 'horizontal' }}
        role="separator"
        aria-orientation={this.orientation === 'horizontal' ? 'vertical' : 'horizontal'}
        tabindex={0}
        onPointerDown={this.onPointerDown}
        onPointerMove={this.onPointerMove}
        onPointerUp={this.onPointerUp}
        onKeyDown={(e: KeyboardEvent) => this.onKeyDown(e)}
        style={{ '--bch-splitter-hit': SPLITTER_HIT }}
      />
    );
  }
}
