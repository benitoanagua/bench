/**
 * Hard pane minimums for the tiling splitter (spec §4.3): the application
 * clamps the `bchDrag` deltas against these so no panel can collapse to the
 * point of being unusable. The splitter itself only reports `{ deltaPx }`.
 */

/** Minimum pane WIDTH for horizontal divisions (columns). */
export const BCH_MIN_PANE_WIDTH = 160;
/** Minimum pane HEIGHT for vertical divisions (rows). */
export const BCH_MIN_PANE_HEIGHT = 80;
/** Keyboard arrow step (px). */
export const BCH_SPLITTER_KEY_STEP = 16;
