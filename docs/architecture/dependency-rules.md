# Dependency Rules

1. `@bench/tokens` has no runtime package dependencies.
2. `@bench/foundation` may consume tokens, but never components.
3. `@bench/icons` has no runtime package dependencies (Carbon data is generated at build time).
4. `@bench/components` may consume tokens, foundation, and icons.
5. `@bench/fonts` only publishes generated font assets; it has no runtime package dependencies.
6. No BENCH package may depend on application/domain code.
7. Lit is forbidden. React/Vue/Angular are not runtime dependencies of core packages.
8. Consumers must not depend on internal source paths.
