# BENCH quality gates

A component is production-ready only when all applicable gates pass:

1. TypeScript/Stencil build.
2. Unit tests for state and public API.
3. Keyboard interaction tests.
4. Accessibility contract tests.
5. Visual snapshots at 320×800, 375×812, 768×1024, and 1440×900.
6. Light and dark theme coverage.
7. Reduced-motion coverage for animated components.
8. Public export and documentation.
9. Dependency-rule validation.
10. No legacy icon provider references.
