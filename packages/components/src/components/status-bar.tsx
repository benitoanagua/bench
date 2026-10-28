import { Component, h } from '@stencil/core';

/**
 * Bottom status bar (§4.4 "barra de estado + telemetría"): a persistent,
 * content-injecting strip along the bottom edge. The application fills the
 * four semantic slots — `start`, `mode`, `telemetry`, `end` — and owns every
 * text of it (page, zoom, mode, language remain always visible *there*); the
 * component carries no events and no domain state.
 *
 *   <bch-status-bar>
 *     <span slot="start">Page 3 of 42</span>
 *     <span slot="mode">EDIT</span>
 *     <span slot="telemetry">1.25 ms · 132 págs/min</span>
 *     <span slot="end">es-MX · 100%</span>
 *   </bch-status-bar>
 *
 * Style: density data font size, tabular numerals in the telemetry slot so
 * digits don't jitter while they update. The bottom-left corner below the
 * start slot stays visually free — that margin-of-freedom region is the strip
 * the browser renders link previews into, so content must not creep there.
 */
@Component({ tag: 'bch-status-bar', styleUrl: 'status-bar.css', shadow: false, scoped: true })
export class BchStatusBar {
  render() {
    return (
      <div class="bch-status-bar">
        <div class="bch-status-bar__browser-corner" aria-hidden="true" data-free-zone />
        <div class="bch-status-bar__start">
          <slot name="start" />
        </div>
        <div class="bch-status-bar__mode">
          <slot name="mode" />
        </div>
        <div class="bch-status-bar__telemetry">
          <slot name="telemetry" />
        </div>
        <div class="bch-status-bar__end">
          <slot name="end" />
        </div>
      </div>
    );
  }
}
