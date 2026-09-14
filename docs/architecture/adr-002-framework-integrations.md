# ADR-002: Framework integrations are adapters, not implementations

BENCH's canonical API is the Web Component API. React, Vue, and Angular packages exist only to make registration, typing, and template compilation ergonomic. They must not reimplement state, accessibility, visual behavior, events, or business logic.
