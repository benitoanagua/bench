<template>
  <Story title="Foundations/Tokens">
    <Variant title="Paleta de colores">
      <div style="padding: 16px">
        <p style="font-size: 0.875rem; color: var(--bch-color-text-muted); margin: 0 0 12px 0">
          Tokens de color definidos en <code>packages/tokens/src/tokens.css</code> y
          <code>themes.css</code>. Se aplican mediante variables CSS
          <code>--bch-color-*</code> sobre <code>&lt;html data-bch-theme="light|dark"&gt;</code>.
        </p>
        <HstColorShades :shades="colorShades" search="Buscar color" />
      </div>
    </Variant>
    <Variant title="Tipografía">
      <div style="padding: 16px">
        <p style="font-size: 0.875rem; color: var(--bch-color-text-muted); margin: 0 0 12px 0">
          Fuente: IBM Plex Sans y IBM Plex Mono (self-hosted vía <code>@bench/fonts</code>). Escala
          tipográfica en <code>packages/tokens/src/type-scale.css</code>.
        </p>
        <h1 style="font-size: 1.875rem; font-weight: 600; margin: 0 0 0.5rem 0">Título H1</h1>
        <h2 style="font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0">Título H2</h2>
        <p style="font-size: 1rem; margin: 0 0 1rem 0">Texto de cuerpo estándar (rem).</p>
        <p style="font-size: 0.875rem; color: var(--bch-color-text-muted); margin: 0">
          Texto pequeño / secundario.
        </p>
        <code
          style="
            font-family: 'IBM Plex Mono', monospace;
            background: #eef0f2;
            padding: 2px 6px;
            border-radius: 4px;
          "
        >
          código monoespaciado
        </code>
      </div>
    </Variant>
    <Variant title="Densidad">
      <div style="padding: 16px">
        <p style="font-size: 0.875rem; color: var(--bch-color-text-muted); margin: 0 0 12px 0">
          Las densidades se activan con <code>data-bch-density</code> en un contenedor raíz:
          <code>compact</code>, <code>comfortable</code> (default) y <code>spacious</code>. También
          se eligen desde la barra de herramientas de Histoire y desde el control de densidad de
          cada story.
        </p>
        <div style="display: flex; gap: 16px">
          <bch-button size="small">compact (26 px de fila)</bch-button>
          <bch-button size="medium">comfortable (36 px de fila)</bch-button>
          <bch-button size="large">spacious (48 px de fila)</bch-button>
        </div>
      </div>
    </Variant>
    <Variant title="Espaciado y bordes">
      <div style="padding: 16px">
        <p style="font-size: 0.875rem; color: var(--bch-color-text-muted); margin: 0 0 12px 0">
          Escala de borde de 4 niveles (micro, control, contenedor, flotante) según Regla 7 de
          <code>bench-design-system.md</code>.
        </p>
        <div style="display: flex; gap: 16px">
          <div
            style="
              border: 1px solid var(--bch-color-border-micro);
              padding: 12px;
              border-radius: 4px;
            "
          >
            Borde micro
          </div>
          <div
            style="
              border: 1px solid var(--bch-color-border-control);
              padding: 12px;
              border-radius: 6px;
            "
          >
            Borde control
          </div>
          <div
            style="
              border: 1px solid var(--bch-color-border-container);
              padding: 12px;
              border-radius: 8px;
            "
          >
            Borde contenedor
          </div>
          <div
            style="
              border: 1px solid var(--bch-color-border-floating);
              padding: 12px;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            "
          >
            Borde flotante
          </div>
        </div>
      </div>
    </Variant>
    <Variant title="Tokens de diseño">
      <div style="padding: 16px">
        <HstTokenList :tokens="designTokens" get-name="tokenName" />
      </div>
    </Variant>
  </Story>
</template>

<script setup>
const colorShades = {
  neutral: {
    0: '#ffffff',
    50: '#e7eaee',
    100: '#eef0f2',
    200: '#dfe3e6',
    300: '#c3c9d1',
    500: '#9aa3af',
    700: '#626c7a',
    900: '#1b2430',
  },
  primary: { 600: '#1f5c4e' },
  danger: { 600: '#a23b2e' },
};
function shadeName(key, color) {
  return `${key} · ${color}`;
}
const designTokens = {
  '--bch-color-surface': '#ffffff / #171c21',
  '--bch-color-background': '#e7eaee / #0f1417',
  '--bch-color-text': '#1b2430 / #e8ebee',
  '--bch-color-text-muted': '#626c7a / #8a94a0',
  '--bch-color-border-control': '#9aa3af / #3d4650',
  '--bch-color-border-floating': '#4b5563 / #77828c',
  '--bch-color-action': '#1f5c4e / #1f5c4e',
  '--bch-color-action-soft': '#e3eeea / #16342c',
  '--bch-radius-md': '2px',
  '--bch-radius-xl': '6px',
  '--bch-motion-normal': '180ms',
  '--bch-motion-loop': '1.4s',
};
function tokenName(key, value) {
  return key;
}
</script>

<docs lang="md">
# Foundations — Tokens

Los tokens de Bench son variables CSS con el prefijo `--bch-*`. Se definen en
`packages/tokens/src/` y se consumen en componentes y productos.

## Temas

`data-bch-theme="light"` (default) y `data-bch-theme="dark"` cambian las
superficies, textos y bordes. Historia alterna la clase `dark` en `<html>` del
sandbox y el setup de Bench la sincroniza con `data-bch-theme`.

## Densidad

`data-bch-density="compact|comfortable|spacious"` ajusta el chrome denso
(filas de grid, celdas, texto de dato). Nunca se usa `terminal` como tema
global: solo sobre paneles con `data-bch-panel="raw-data"`.
</docs>
