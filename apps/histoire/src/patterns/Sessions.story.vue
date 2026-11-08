<template>
  <Story title="Patterns/Sessions">
    <Variant name="Vista de sesión">
      <div style="padding: 24px; display: flex; gap: 24px;">
        <bch-nav orientation="vertical" style="width: 200px;">
          <bch-nav-item href="/sesiones" active>Sesiones</bch-nav-item>
          <bch-nav-item href="/actividad">Actividad</bch-nav-item>
          <bch-nav-item href="/configuracion">Configuración</bch-nav-item>
        </bch-nav>
        <div style="flex: 1;">
          <bch-status-bar>
            <span style="margin-right: auto;">Sesión activa: María García</span>
            <bch-mode-badge mode="light" label="Modo claro"></bch-mode-badge>
          </bch-status-bar>
          <bch-card style="margin-top: 16px;">
            <div style="padding: 16px;">
              <h3 style="margin: 0 0 8px 0;">Última actividad</h3>
              <p style="margin: 0;">Acceso desde Madrid • 14:32</p>
            </div>
          </bch-card>
        </div>
      </div>
    </Variant>
  </Story>
</template>
