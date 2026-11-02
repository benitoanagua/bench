import test from 'node:test';
import assert from 'node:assert/strict';
import { createThrottledRenderer } from '../dist/throttled-renderer.js';

function fakeScheduler() {
  let nextId = 1;
  const timers = new Map();
  return {
    timers,
    scheduler: {
      setTimeout(callback, delayMs) {
        const id = nextId++;
        timers.set(id, { callback, delayMs });
        return id;
      },
      clearTimeout(handle) {
        timers.delete(handle);
      },
    },
    run(id) {
      const timer = timers.get(id);
      if (!timer) return;
      timers.delete(id);
      timer.callback();
    },
  };
}

test('scheduling paints once when the interval elapses', () => {
  const { timers, scheduler, run } = fakeScheduler();
  let paints = 0;
  const renderer = createThrottledRenderer(() => (paints += 1), { scheduler, intervalMs: 50 });

  renderer.schedule();
  renderer.schedule();
  renderer.schedule();
  assert.equal(timers.size, 1);
  assert.equal(paints, 0);
  assert.equal(renderer.isPending(), true);

  run([...timers.keys()][0]);
  assert.equal(paints, 1);
  assert.equal(renderer.isPending(), false);
});

test('the interval is configurable', () => {
  const { timers, scheduler } = fakeScheduler();
  createThrottledRenderer(() => {}, { scheduler, intervalMs: 250 }).schedule();
  assert.equal([...timers.values()][0].delayMs, 250);
});

test('flush paints immediately and clears the pending timer', () => {
  const { timers, scheduler } = fakeScheduler();
  let paints = 0;
  const renderer = createThrottledRenderer(() => (paints += 1), { scheduler });

  renderer.schedule();
  renderer.flush();
  assert.equal(paints, 1);
  assert.equal(timers.size, 0);
  assert.equal(renderer.isPending(), false);
});

test('flush without a pending paint does not render', () => {
  const { scheduler } = fakeScheduler();
  let paints = 0;
  const renderer = createThrottledRenderer(() => (paints += 1), { scheduler });
  renderer.flush();
  assert.equal(paints, 0);
});

test('cancel drops the pending paint', () => {
  const { timers, scheduler } = fakeScheduler();
  let paints = 0;
  const renderer = createThrottledRenderer(() => (paints += 1), { scheduler });

  renderer.schedule();
  renderer.cancel();
  assert.equal(timers.size, 0);
  assert.equal(renderer.isPending(), false);
  assert.equal(paints, 0);
});

test('a paint after the interval can be scheduled again', () => {
  const { timers, scheduler, run } = fakeScheduler();
  let paints = 0;
  const renderer = createThrottledRenderer(() => (paints += 1), { scheduler });

  renderer.schedule();
  run([...timers.keys()][0]);
  renderer.schedule();
  assert.equal(timers.size, 1);
  run([...timers.keys()][0]);
  assert.equal(paints, 2);
});
