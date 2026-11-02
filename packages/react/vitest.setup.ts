// React 18 requires this flag for `act()` to flush effects synchronously and
// to silence the "not configured to support act" warning in jsdom.
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
