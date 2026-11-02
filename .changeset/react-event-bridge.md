---
'@bench/react': patch
---

Corregir el puente de eventos de los wrappers: los handlers `onBch*` se registran con `addEventListener` sobre el custom element (React 18 los descartaba al no ser props conocidas), se actualizan sin re-suscribir y se limpian al desmontar. Añadir tests con Vitest + jsdom.
