<template>
  <Story title="Components/Card">
    <Variant title="Playground" :initState="() => ({ interactive: false })">
      <template #default="{ state }">
        <bch-card :interactive="state.interactive">
          <div style="padding: 16px">Contenido de la tarjeta</div>
        </bch-card>
      </template>
      <template #controls="{ state }">
        <HstCheckbox v-model="state.interactive" title="Interactiva" />
      </template>
    </Variant>
    <Variant title="Por defecto">
      <bch-card>
        <div style="padding: 16px">Contenido de la tarjeta</div>
      </bch-card>
    </Variant>
    <Variant title="Interactiva">
      <bch-card interactive>
        <div style="padding: 16px">Tarjeta que se puede pulsar</div>
      </bch-card>
    </Variant>
    <Variant title="Con pie de tarjeta">
      <bch-card>
        <div style="padding: 16px">Contenido principal</div>
        <div
          style="
            padding: 8px 16px;
            border-top: 1px solid var(--bch-color-border-micro);
            font-size: 0.875rem;
            color: var(--bch-color-text-muted);
          "
        >
          Pie de tarjeta
        </div>
      </bch-card>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Card (`bch-card`)

Contenedor de superficie elevada para agrupar contenido relacionado.

## Props

| Prop          | Tipo      | Default | Descripción                        |
| ------------- | --------- | ------- | ---------------------------------- |
| `interactive` | `boolean` | `false` | Si es pulsable (emite `bchPress`). |

## Eventos

| Evento     | Detail                        | Cuándo se dispara                 |
| ---------- | ----------------------------- | --------------------------------- |
| `bchPress` | `MouseEvent \| KeyboardEvent` | Al pulsar la tarjeta interactiva. |
</docs>
