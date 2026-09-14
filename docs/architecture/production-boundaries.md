# BENCH production boundaries

BENCH is a UI library, not an application framework.

It must not contain domain concepts, network clients, authentication, persistence, exchange-rate logic, transaction logic, or application-specific state.

The component layer owns presentation, interaction, semantics, and accessibility. Applications own domain state and orchestration.
