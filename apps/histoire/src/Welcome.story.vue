<template>
  <Story title="Welcome">
    <Variant name="Bienvenida">
      <div style="padding: 24px; max-width: 720px;">
        <h1 style="font-size: 1.875rem; font-weight: 600; margin: 0 0 1rem 0;">Bench Design System</h1>
        <p style="font-size: 1rem; margin: 0 0 1rem 0;">
          Sistema de diseño construido con <strong>Stencil</strong> y <strong>Web Components</strong> para usuarios expertos.
        </p>
        <h2 style="font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.5rem 0;">Catálogo de componentes</h2>
        <p style="font-size: 1rem; margin: 0 0 1rem 0;">
          Explora los componentes desde la navegación lateral. Cada componente incluye sus variantes reales: estados, tamaños, tonos, deshabilitado, error y carga.
        </p>
        <h2 style="font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.5rem 0;">Temas y densidad</h2>
        <p style="font-size: 1rem; margin: 0 0 1rem 0;">
          Bench soporta <code>data-bch-theme="light|dark"</code> y <code>data-bch-density</code> en <code>&lt;html&gt;</code>. Historia sincroniza automáticamente su clase <code>dark</code> con el atributo de tema de Bench.
        </p>
        <h2 style="font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.5rem 0;">Especificación</h2>
        <p style="font-size: 1rem; margin: 0;">
          Consulta <code>docs/bench-design-system.md</code> para las 9 reglas inviolables, la arquitectura y los patrones de aplicación.
        </p>
      </div>
    </Variant>
  </Story>
</template>
