/**
 * Throttled renderer factory (§4.1 "throttled renderer", ADR-009 tier b).
 *
 * A panel that receives a stream of updates (telemetry, quotes, log lines)
 * must not repaint on every event: the renderer batches them into one paint
 * per interval. The factory owns the timer and the dirty flag, never the DOM:
 * the caller provides the render callback and owns what it paints.
 *
 * The timer functions are injectable so the behaviour can be tested without
 * real time, and so an application can plug its own scheduler (a worker tick,
 * a requestAnimationFrame bridge) without the helper changing.
 */

export type TimerHandle = unknown;

export type Scheduler = {
  setTimeout: (callback: () => void, delayMs: number) => TimerHandle;
  clearTimeout: (handle: TimerHandle) => void;
};

export type ThrottledRendererOptions = {
  /** Minimum milliseconds between two paints. Defaults to 100ms. */
  intervalMs?: number;
  /** Timer implementation. Defaults to the global timers. */
  scheduler?: Scheduler;
};

export type ThrottledRenderer = {
  /** Requests a paint. Repeated calls inside the interval are coalesced. */
  schedule: () => void;
  /** Paints right now (if there is something pending) and clears the timer. */
  flush: () => void;
  /** Drops the pending paint without rendering. */
  cancel: () => void;
  /** Whether a paint is pending. */
  isPending: () => boolean;
};

const defaultScheduler: Scheduler = {
  setTimeout: (callback, delayMs) => setTimeout(callback, delayMs),
  clearTimeout: (handle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
};

export function createThrottledRenderer(
  render: () => void,
  options: ThrottledRendererOptions = {},
): ThrottledRenderer {
  const intervalMs = options.intervalMs ?? 100;
  const scheduler = options.scheduler ?? defaultScheduler;
  let timer: TimerHandle | undefined;
  let dirty = false;

  const stopTimer = () => {
    if (timer === undefined) return;
    scheduler.clearTimeout(timer);
    timer = undefined;
  };

  const paint = () => {
    stopTimer();
    if (!dirty) return;
    dirty = false;
    render();
  };

  return {
    schedule: () => {
      dirty = true;
      if (timer !== undefined) return;
      timer = scheduler.setTimeout(paint, intervalMs);
    },
    flush: () => {
      paint();
    },
    cancel: () => {
      stopTimer();
      dirty = false;
    },
    isPending: () => dirty,
  };
}
