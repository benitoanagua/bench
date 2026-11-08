/**
 * Historia setup de Bench.
 *
 * Se ejecuta en el contexto de Historia (app principal y, cuando
 * Histoire lo soporta, en cada sandbox). Carga las hojas de estilo de
 * tokens y fuentes, registra los custom elements de Stencil y mantiene
 * `data-bch-theme`/`data-bch-density` sincronizados con la clase `dark`
 * que Histoire alterna en el sandbox (`sandboxDarkClass`).
 *
 * Todo está guardado por si `document`/`window` no están disponibles
 * (por ejemplo durante `histoire build` en Node).
 */
import '@bench/tokens/tokens.css';
import '@bench/tokens/themes.css';
import '@bench/tokens/type-scale.css';
import '@bench/fonts/fonts.css';
import { defineCustomElements } from '@bench/components/loader';

if (typeof window !== 'undefined' && typeof defineCustomElements === 'function') {
  void defineCustomElements(window);
}

if (typeof document !== 'undefined' && typeof document.documentElement !== 'undefined') {
  const html = document.documentElement;

  // Puente de tema: Histoire escribe la clase `dark` en <html> del sandbox
  // al cambiar el tema desde su UI; Bench lee `data-bch-theme`.
  function syncTheme() {
    html.setAttribute('data-bch-theme', html.classList.contains('dark') ? 'dark' : 'light');
  }

  syncTheme();

  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(syncTheme);
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  }

  // Densidad: parámetro de URL `?density=compact|comfortable|spacious`
  // (la solución más simple que funciona, sin infraestructura extra).
  if (typeof location !== 'undefined') {
    const density = new URLSearchParams(location.search).get('density');
    if (density) {
      html.setAttribute('data-bch-density', density);
    }
  }
}
