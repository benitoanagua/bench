# Dependency Rules

1. `@bench/tokens` has no runtime package dependencies.
2. `@bench/foundation` may consume tokens, but never components.
3. `@bench/primitives` may consume tokens and foundation.
4. `@bench/components` may consume tokens, foundation, primitives, and icons.
5. 6. No BENCH package may depend on application/domain code.
7. Lit is forbidden. React/Vue/Angular are not runtime dependencies of core packages.
8. Consumers must not depend on internal source paths.
