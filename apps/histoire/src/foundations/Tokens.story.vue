<template>
  <Story title="Foundations/Tokens">
    <Variant name="Paleta de colores">
      <div style="padding: 16px;">
        <p style="font-size: 0.875rem; color: var(--bch-color-text-muted); margin: 0 0 12px 0;">
          Tokens de color definidos en <code>packages/tokens/src/tokens.css</code> y <code>themes.css</code>. Se aplican mediante variables CSS <code>--bch-color-*</code> sobre <code>&lt;html data-bch-theme="light|dark"&gt;</code>.
        </p>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
          <div style="background:#ffffff; border:1px solid #c3c9d1; padding:12px; border-radius:6px; font-size:0.875rem;">neutral-0<br><code style="opacity:0.7">#ffffff</code></div>
          <div style="background:#e7eaee; border:1px solid #c3c9d1; padding:12px; border-radius:6px; font-size:0.875rem;">neutral-50<br><code style="opacity:0.7">#e7eaee</code></div>
          <div style="background:#1f5c4e; color:#ffffff; padding:12px; border-radius:6px; font-size:0.875rem;">primary-600<br><code style="opacity:0.8">#1f5c4e</code></div>
          <div style="background:#a23b2e; color:#ffffff; padding:12px; border-radius:6px; font-size:0.875rem;">red-600<br><code style="opacity:0.8">#a23b2e</code></div>
        </div>
      </div>
    </Variant>
    <Variant name="Tipografía">
      <div style="padding: 16px;">
        <p style="font-size: 0.875rem; color: var(--bch-color-text-muted); margin: 0 0 12px 0;">
          Fuente: IBM Plex Sans y IBM Plex Mono (self-hosted vía <code>@bench/fonts</code>). Escala tipográfica en <code>packages/tokens/src/type-scale.css</code>.
        </p>
        <h1 style="font-size: 1.875rem; font-weight: 600; margin: 0 0 0.5rem 0;">Título H1</h1>
        <h2 style="font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0;">Título H2</h2>
        <p style="font-size: 1rem; margin: 0 0 1rem 0;">Texto de cuerpo estándar (rem).</p>
        <p style="font-size: 0.875rem; color: var(--bch-color-text-muted); margin: 0;">Texto pequeño / secundario.</p>
        <code style="font-family: 'IBM Plex Mono', monospace; background: #eef0f2; padding: 2px 6px; border-radius: 4px;">código monoespaciado</code>
      </div>
    </Variant>
    <Variant name="Espaciado y bordes">
      <div style="padding: 16px;">
        <p style="font-size: 0.875rem; color: var(--bch-color-text-muted); margin: 0 0 12px 0;">
          Escala de borde de 4 niveles (micro, control, contenedor, flotante) según Regla 7 de <code>bench-design-system.md</code>.
        </p>
        <div style="display: flex; gap: 16px;">
          <div style="border: 1px solid var(--bch-color-border-micro); padding: 12px; border-radius: 4px;">Borde micro</div>
          <div style="border: 1px solid var(--bch-color-border-control); padding: 12px; border-radius: 6px;">Borde control</div>
          <div style="border: 1px solid var(--bch-color-border-container); padding: 12px; border-radius: 8px;">Borde contenedor</div>
          <div style="border: 1px solid var(--bch-color-border-floating); padding: 12px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">Borde flotante</div>
        </div>
      </div>
    </Variant>
  </Story>
</template>
