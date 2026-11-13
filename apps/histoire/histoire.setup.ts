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

  // El lienzo del catálogo sigue el tema (las superficies de los componentes
  // tienen su propio color; el fondo vacío no debe quedarse blanco en modo
  // oscuro, donde contrasta mal con el texto).
  function syncCanvas() {
    if (typeof document.head === 'undefined') return;
    const computed = getComputedStyle(html);
    const bg =
      computed.getPropertyValue('--bch-color-background').trim() ||
      (html.classList.contains('dark') ? '#0f1417' : '#e7eaee');
    // Una regla de hoja de estilos (no un estilo en línea) para que el
    // cálculo de color de fondo de herramientas como axe sea correcto.
    let style = document.getElementById('bch-canvas-style') as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement('style');
      style.id = 'bch-canvas-style';
      document.head.appendChild(style);
    }
    style.textContent = `html, body { background-color: ${bg}; }`;
  }

  syncCanvas();

  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      syncTheme();
      syncCanvas();
    });
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
