# Bench — Design System para Power Users

*(Bench, de "Workbench" — el banco de trabajo: la superficie donde alguien que domina su oficio deja las herramientas exactamente donde las necesita, todos los días, durante años. No es un escritorio de oficina genérico; es el puesto de trabajo de quien pasa 8 horas o más frente a la misma herramienta y espera que responda con precisión.)*

Estructura de este documento: **0 Filosofía** (por qué existe) → **1 Reglas inviolables** (las leyes) → **2 Tokens** (la implementación de esas leyes, en un solo lugar) → **3 Accesibilidad** (infraestructura de foco) → **4 Catálogo de patrones** (cada dominio de componente, completo: patrón + especificación técnica + decisiones de diseño, todo junto) → **5 Research** (de qué sistema viene cada patrón) → **6 Checklist**. Cada tema vive en un solo lugar; el resto del documento lo referencia, nunca lo repite.

---

## 0. Filosofía — por qué existe Bench

Bench existe para que una persona que trabaja 8 horas o más frente a esta interfaz sienta que cada pantalla responde con precisión a lo que hace, sin pedirle atención que no necesita gastar. La luz señala qué es interactivo y qué es solo dato; la profundidad ordena lo que importa por encima de lo que es contexto; el movimiento confirma, nunca decora; los materiales dan peso real a paneles y superficies según lo que contienen; y la escala permite que la misma herramienta se sienta correcta tanto en un monitor de escritorio denso como en una pantalla táctil pequeña. Bench optimiza para repetición, no para primera impresión — la densidad es una virtud, no un defecto a corregir. Todo lo que aquí se define proviene de convención estándar de la industria o de precedente histórico probado (Solaris CDE, Mac OS Classic, NeXTSTEP, HyperCard, Photoshop clásico, Oracle EBS, SAP, AS/400), filtrado por una sola restricción no negociable: debe funcionar dentro de un navegador, sin competir con él.

### 0.1 La razón de fondo

Casi todo el diseño de interfaz que se produce hoy está optimizado para la **primera visita**: onboarding suave, curva de aprendizaje mínima, superficie visual limpia para una captura de pantalla bonita. Ese objetivo es legítimo para un producto de consumo que alguien abre 3 minutos al día. Es activamente hostil para alguien que abre la misma pantalla 200 veces al día, todos los días, durante años.

Bench parte de una premisa distinta: **el usuario no es un visitante, es un residente.** Un power user de 8+ horas no necesita que la interfaz le explique qué hacer — necesita que la interfaz deje de estorbarle mientras hace lo que ya sabe hacer. Cada regla de este documento existe para resolver un problema específico y real de esa persona, no una preferencia estética abstracta:

| Problema real del power user | Cómo responde Bench |
|---|---|
| Repite la misma tarea cientos de veces al día — cualquier fricción se multiplica | Reglas 1-2, Omnibar (4.1), Macros (4.5) |
| Su memoria muscular es su activo más valioso, y una interfaz inconsistente la destruye | Regla 4, Tokens de borde y línea (2.2-2.3) |
| No puede permitirse perder trabajo por un error de la app, del navegador, o suyo propio | Regla 3, Historial visible y persistencia (4.6) |
| Trabaja con datos financieros/operativos donde un error de lectura cuesta dinero real | Extensión financiera (2.9) |
| Pasa la vista por cientos de filas por hora — cualquier animación decorativa es fricción acumulada | Movimiento con propósito (2.4), densidad configurable (2.8) |
| Su entorno de trabajo (mouse, teclado, resolución, segundo monitor) es suyo, no genérico | Regla 6, Layout y multitarea (4.3) |
| Necesita confiar en que el sistema no le va a sorprender nunca | Regla 5, Regla 2 |
| Ya invirtió tiempo aprendiendo esta herramienta — cada cambio de comportamiento sin razón le cuesta ese tiempo invertido | Regla 9, Tokens (convención estándar, nunca capricho) |

Esta tabla no es decorativa: **es el criterio de aceptación de cualquier feature nueva.** Antes de agregar algo a Bench, la pregunta no es "¿se ve bien?" — es "¿a cuál de estos problemas reales le resuelve algo a la persona que va a mirar esta pantalla 8 horas hoy, y otra vez mañana?". Si la respuesta no es clara, la propuesta no entra todavía.

---

## 1. Reglas inviolables

Nueve reglas, dos categorías con distinto grado de negociabilidad. No es una lista plana — es una jerarquía. La implementación concreta (tokens, CSS) de las reglas 7 y 9 vive en la sección **2 · Tokens**; aquí solo está la ley y su criterio de violación.

### Categoría A — Principios de UX con expresión en UI
Gobiernan **comportamiento**. Se pueden reinterpretar o ajustar si aparece un caso de producto que lo justifique, siempre que el cambio se documente como nueva variante aprobada.

1. **Toda función ejecutable tiene una ruta de acceso por clic + foco, independiente de cualquier atajo.** Un atajo es siempre una aceleración, nunca una puerta. *Se viola cuando* una acción solo es alcanzable con una combinación de teclas, sin botón, ítem de menú o entrada en el omnibar equivalente.
2. **Ningún estado del sistema es solo momentáneo si afecta cómo se interpreta la siguiente acción del usuario.** Modo activo, filtro aplicado, macro grabándose, selección múltiple en curso: todos necesitan un indicador que permanezca en pantalla mientras el estado dure. *Se viola cuando* la única evidencia de un estado activo fue un toast que ya se disolvió.
3. **Toda edición se refleja en la interfaz antes de pedir confirmación, nunca al revés; la confirmación bloqueante se reserva para lo genuinamente irreversible.** *Se viola cuando* aparece un modal antes de que la acción tenga efecto visible, para algo que un historial visible podría revertir igual de bien después.
4. **Un mismo tipo de componente tiene una única definición de interacción en todo el sistema.** El componente no sabe en qué módulo está. *Se viola cuando* el mismo tipo de componente responde a un clic, atajo o patrón de validación distinto según la pantalla donde aparece.
5. **Ninguna superficie de interacción compite por el mismo gesto de forma ambigua** — ni con otro componente propio, ni con la UI nativa del navegador. *Se viola cuando* el resultado de un clic depende de qué capa "ganó" esa vez, en vez de estar determinado por el diseño.
6. **Densidad, tema visual y comportamiento de apertura son atributos configurables, nunca valores fijos en el componente — y responden tanto a la preferencia manual del usuario como al viewport, con breakpoints convencionales.** *Se viola cuando* un componente ignora la preferencia global o fija un breakpoint arbitrario en vez de la escala estándar (`640/768/1024/1280/1536px`).

### Categoría B — Reglas de diseño visual, autoral, innegociables
Gobiernan **apariencia**. No dependen del contexto de producto, no son negociables por ningún equipo.

7. **Proporcionalidad del borde según jerarquía de contenedor.** A menor tamaño del elemento, borde más fino y radio menor; a mayor tamaño, borde más grueso y radio mayor. Escala cerrada de 4 niveles → **ver Tokens 2.2**. *Se viola cuando* un componente usa un `border-width`/`border-radius` que no corresponde a ninguno de los 4 niveles.
8. **Semántica del estilo de línea — sólido, discontinuo, doble, triple — cada uno atado a un estado específico, nunca a preferencia estética** → **ver Tokens 2.3**. La escasez del triple es lo que le da su poder. *Se viola cuando* se introduce un estilo de línea nuevo sin definir qué estado representa, o se usa fuera de estado sólido/confirmado por preferencia estética.
9. **Profundidad (elevación) y material siguen convención estándar de la industria, nunca valores inventados a mano** → **ver Tokens 2.4 y 2.5**. `--elev-3` se reserva a la misma situación que activa el borde triple — sombra y borde escalan juntos. *Se viola cuando* alguien propone una curva, duración o valor de blur/sombra "porque se ve mejor así" en vez de tomarlo de la banda documentada, o introduce un tercer material.

### Tabla de decisión rápida

| Pregunta | Si la respuesta es sí → |
|---|---|
| ¿El atajo usa `Ctrl`/`Cmd`/`Alt` + una tecla? | Verificar contra reservados del navegador; tratarlo como oportunista, nunca único camino |
| ¿Depende de una API con soporte parcial entre navegadores? | Implementar con feature detection, como mejora progresiva |
| ¿El usuario puede asignar su propia combinación de teclas? | No permitirlo — redirigir a comando de texto (omnibar) o secuencia sin modificador |
| ¿La interacción vive dentro de un input con foco? | Libre de restricciones — el navegador no reclama ese espacio |
| ¿Es una curva, sombra, blur o breakpoint nuevo? | Tomarlo de la banda convencional documentada en Tokens, nunca inventarlo |

---

## 2. Tokens de Bench

Fuente única de verdad para todo valor visual del sistema. Todo lo demás en este documento (reglas, patrones) referencia esta sección — nada se repite fuera de ella.

### 2.1 Luz — color y estados de interacción

```css
/* Paleta base */
--primary: #1F5C4E; --primary-strong: #143F35; --primary-soft: #E3EEEA;
--success: #1F5C4E; --warning: #9A6B12; --error: #A23B2E; --pending: #2B5FAD;
--warning-soft: #F3EBD8; --error-soft: #F5E7E4; --pending-soft: #E4ECF8;

/* Superficies — modo claro */
--bg-light: #E7EAEE; --surface-light: #FFFFFF; --text-light: #1B2430; --muted-light: #626C7A;

/* Superficies — modo oscuro (ciudadano de primera clase, no invertido automáticamente) */
--bg-dark: #0F1417; --surface-dark: #171C21; --text-dark: #E8EBEE; --muted-dark: #8A94A0;

/* Estados de interacción */
--state-hover-light:  color-mix(in srgb, var(--surface-light) 92%, var(--text-light));
--state-active-light: color-mix(in srgb, var(--surface-light) 85%, var(--text-light));
--state-hover-dark:   color-mix(in srgb, var(--surface-dark) 88%, white);
--state-active-dark:  color-mix(in srgb, var(--surface-dark) 78%, white);
--state-focus-ring:   var(--primary);
```

**Regla de aplicación:** hover/active cambian luminosidad ±6-8%, nunca cambian de familia de color — un botón `--primary` en hover sigue siendo `--primary`, solo más oscuro.

### 2.2 Borde — escala de 4 niveles (implementa Regla 7)

| Nivel | Ejemplos | Border-width | Border-radius | Color (claro) | Color (oscuro) |
|---|---|---|---|---|---|
| 1 — Micro | badges, chips, checkboxes | 1px | 1px | `#C3C9D1` | `#2A3138` |
| 2 — Control | inputs, botones, celdas de grid | 1px | 2px | `#9AA3AF` | `#3D4650` |
| 3 — Contenedor | paneles, tarjetas de registro, toolbar | 1.5px | 4px | `#6B7480` | `#55606B` |
| 4 — Superficie flotante | tarjetas flotantes, modales | 2px | 6px | `#4B5563` | `#77828C` |

### 2.3 Semántica de línea (implementa Regla 8)

| Estilo | Significado | Ejemplo de uso |
|---|---|---|
| Sólido (default) | Estado persistido/confirmado | Comportamiento por defecto en todo el sistema |
| Discontinuo | Estado provisional, aún no confirmado | Celda en edición, registro recién duplicado sin guardar |
| Doble | Frontera de cierre o totalización | Fila de totales, resumen de cierre |
| Triple | Confirmación irreversible real | Confirmación de eliminación permanente |

### 2.4 Profundidad — elevación (implementa Regla 9)

```css
--elev-0: none;                                                       /* superficies ancladas al layout: grid, toolbar, status bar */
--elev-1: 0 1px 3px rgba(15,20,25,.10), 0 1px 2px rgba(15,20,25,.06);  /* tarjetas de registro, tiles */
--elev-2: 0 6px 16px rgba(15,20,25,.16), 0 2px 4px rgba(15,20,25,.08); /* flotantes, menús contextuales, modales */
--elev-3: 0 12px 32px rgba(15,20,25,.24), 0 0 0 1px var(--error);      /* reservado casi nunca: confirmación irreversible */
```

| Elevación | Componente equivalente | Nivel de borde |
|---|---|---|
| `--elev-0` | Grid principal, toolbar, status bar, botones | Nivel 2 |
| `--elev-1` | `record-card`, tiles del panel derecho | Nivel 3 |
| `--elev-2` | Tarjeta flotante (HyperCard), menú contextual, help modal | Nivel 3-4 |
| `--elev-3` | Confirmación de eliminación (`state-irreversible`) | Nivel 2 + borde triple |

### 2.5 Movimiento — bandas convencionales

Regla madre: **toda animación comunica un cambio de estado real, nunca decora una interacción neutra.**

| Caso de uso | Duración | Curva | Comportamiento |
|---|---|---|---|
| Hover / focus | 80ms | `ease-out` | Solo cambio de luminosidad, sin desplazamiento |
| Confirmación de acción (guardado, edición) | 180ms | `ease-out` | Flash de color hacia `--primary-soft` y vuelta |
| Cambio de estado de badge/indicador | 220ms | `ease-in-out` | Cruce directo de color en el mismo lugar, sin fade genérico ni escala |
| Apertura de panel flotante/modal | 140ms | `ease-out` | Opacidad + traslación máxima de 4px, nunca escala desde 0, nunca bounce |
| Datos en streaming/tiempo real | 0ms en el valor, 300ms en el highlight | `linear` | El dato nunca "cuentagotea" hacia el valor final |

```css
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.001ms !important; animation-duration: 0.001ms !important; }
}
```

Bandas de referencia: **micro** (80-150ms) hover/focus/toggle; **estándar** (150-250ms) aparición/cambio de estado; **nunca por encima de 400ms**.

### 2.6 Material — máximo dos

```css
.material-base   { background: var(--surface); backdrop-filter: none; }
.material-acento { background: color-mix(in srgb, var(--surface) 88%, transparent); backdrop-filter: blur(8px); }
```

`material-base` es el default en todo el sistema. `material-acento` (translúcido, blur 8px) se reserva a overlays informativos no editables: tooltip de precio/dato, notificaciones. En modo oscuro reduce la opacidad base de 88% a ~80%. **Nunca** sobre superficies con datos editables — la transparencia introduce ambigüedad sobre qué es interactivo.

### 2.7 Tipografía

**Dualidad sans + monoespaciada: IBM Plex Sans + IBM Plex Mono.** Ya no es solo "misma tradición" — desde que Carbon (sección 2.8) quedó fijado como librería de íconos, la tipografía deja de ser una elección paralela y pasa a ser **literalmente la misma decisión**: IBM Plex es el tipo oficial documentado del Carbon Design System. Bench no imita a Carbon — comparte su fuente de verdad tipográfica. El ojo además necesita distinguir "esto es interfaz" de "esto es dato a escanear en columna": mezclar ambos roles en una sola familia hace que las columnas numéricas se vean irregulares, porque las sans-serif normales no garantizan ancho fijo entre caracteres.

```css
--font-sans: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
--font-mono: 'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace;
```

Los fallbacks no son arbitrarios — son el stack oficial que usa Carbon, por si IBM Plex tarda en cargar o falla la red.

**Productive, no Expressive.** Carbon distingue dos sets de tipografía: *Productive* (para producto, foco en tarea, tratamiento condensado) y *Expressive* (editorial/marketing, jerarquía dramática). Bench usa exclusivamente el set **Productive** — es la misma decisión que ya tomamos al rechazar jerarquía tipográfica dramática en toda la sección de densidad. Un ERP de 8 horas nunca es una pieza editorial.

**Pesos — dos, no tres.** Alineado con la disciplina real de Carbon: **400 Regular** para cuerpo/datos, **600 Semi-Bold** para títulos, headers de columna y estados activos. Se elimina el peso intermedio (500) — Carbon nunca lo usa en su type scale productivo, y sostener solo dos pesos reduce aún más la superficie de "casi-jerarquía" ambigua. Ultra-light (≤300) sigue descartado para todo texto funcional — ilegible y cansador en sesiones largas con reflejo de pantalla.

```css
--weight-regular: 400;   /* cuerpo, datos, texto por defecto */
--weight-emphasis: 600;  /* títulos de sección, headers de columna, tab activo, badge de estado */
```

**Letter-spacing — token explícito, antes ausente.** Carbon especifica tracking preciso por tamaño, y Bench no lo tenía documentado:

```css
--tracking-body: 0.16px;  /* texto de 14-16px: labels, cuerpo, headers de UI */
--tracking-mono: 0.32px;  /* dato monoespaciado pequeño: código, IDs, hashes a 12px */
```

**Números tabulares:**
```css
font-variant-numeric: tabular-nums; /* toda celda numérica: grid, status bar, badges, telemetría */
```

**Interlineado por rol** (ya alineado con el rango que Carbon documenta para cuerpo largo):
```css
--leading-data: 1.3;   /* filas de tabla, monoespaciado */
--leading-ui: 1.5;      /* labels, botones, texto de interfaz */
--leading-prose: 1.6;   /* texto largo: ayuda, descripciones, errores */
```

**Legibilidad a tamaño real:** cualquier fuente candidata se prueba a 12px real (modo compacto), nunca a 48px de mockup. Distinción clara `0`/`O`, `1`/`l`/`I`, `S`/`5`.

**Escala ligada a densidad** (sin cambios — ya coincidía con el rango productivo de Carbon):

| Uso | Cómodo | Compacto |
|---|---|---|
| Dato en grid / status bar | 13px | 12px |
| Label de UI | 12.5px | 11.5px |
| Texto secundario / muted | 11px | 10.5px |
| Título de panel/sección | 14px | 13px |

Nada por encima de 14-16px salvo estado vacío o error crítico — se busca consistencia, no jerarquía dramática.

**Cómo se sirve la fuente — 3 decisiones cerradas** (reemplaza la nota anterior de "pendiente de escala del proyecto"):

1. **Variable font, no pesos estáticos separados.** `IBM Plex Sans var` / `IBM Plex Mono var` — un solo archivo por familia cubre todo el rango de peso (incluyendo los dos tokens `--weight-regular`/`--weight-emphasis` de arriba), en vez de cargar un `.woff2` estático por peso. Menos peticiones de red, tiempo de carga más predecible.
2. **Autohospedado, no CDN de terceros.** Para una herramienta abierta 8 horas al día, la fuente debe quedar cacheada localmente desde la primera sesión, sin depender de la disponibilidad de un servicio externo (Google Fonts, Iconify u otro) en cada carga. Los `.woff2` viven en la infraestructura propia del producto — deja de ser "aceptable para el prototipo", pasa a ser el estándar desde el primer entorno productivo.
3. **`font-display: swap` con fallback dimensionado.** Mientras carga la fuente real, una pila de fallback con métricas ajustadas (`ascent-override`, `descent-override`, `size-adjust`) evita que el texto "salte" de tamaño al reemplazar el fallback por la fuente real. En una grilla densa, un salto de 1-2px por fila descoloca visualmente toda la tabla — no es cosmético, es lo que preserva la Regla A6 (consistencia) durante la carga inicial.

```css
@font-face {
  font-family: 'IBM Plex Sans Fallback';
  src: local('Arial');
  ascent-override: 92%;
  descent-override: 23%;
  size-adjust: 105%;
  font-display: swap;
}
/* uso: font-family: 'IBM Plex Sans', 'IBM Plex Sans Fallback', 'Helvetica Neue', Arial, sans-serif; */
```

### 2.8 Iconografía

**Tamaño según frecuencia** *(herencia: IRIX/SGI)*: acción frecuente (toolbar, celdas, status bar) 14-18px monocromo trazo simple; selección infrecuente (elegir entre 12 reportes) 24-32px con más detalle.

**Alto contraste** *(herencia: Susan Kare, Windows 95/Mac OS Classic)*: formas con corrección óptica para legibilidad a 16-20px — el mismo rango que "acción frecuente" arriba. Color reservado a significado, mismos tokens de 2.1: gris (`--muted`) default, `--primary` activo, `--warning` advertencia, `--error` destructivo.

**Librería: Carbon Icons (IBM).** No es una elección estética aislada — es continuidad directa de la tipografía base (IBM Plex, sección 2.7) y del linaje de estaciones de trabajo empresariales que fundamenta todo Bench (AS/400, OS/2 Warp, ver sección 5). Carbon fue construido específicamente para el mismo tipo de producto que Bench: consolas densas de datos operativos, no apps de consumo. Descartadas explícitamente:
- **Phosphor** — 6 pesos de trazo disponibles es una invitación estructural a que dos equipos usen variantes distintas sin darse cuenta, violando la Regla 8 (nunca a elección del implementador).
- **Feather/Material Icons/mezclas** — el grosor y las proporciones nunca coinciden exactamente entre librerías distintas, incluso cuando "se parecen" a simple vista.

**Nota técnica de migración — cambio de paradigma de renderizado:** a diferencia de un set de solo-trazo (`stroke` uniforme de 1.5-2px, como Lucide/Tabler), Carbon usa formas mixtas optimizadas ópticamente — no siempre es un `<path>` de contorno simple, algunos íconos usan relleno parcial corregido para legibilidad a tamaño pequeño. Esto significa que un ícono de Carbon no es intercambiable 1:1 con un `<svg stroke-width="1.75">` genérico: se importa el asset tal como lo entrega el paquete oficial (`@carbon/icons` o `@carbon/icons-react`), sin reconstruirlo a mano en un estilo de trazo propio. El costo de este cambio se paga una sola vez, al configurar el set — no en cada uso posterior.

**Entrega del asset — mismo principio que la tipografía (2.7): nunca una URL externa en runtime.** Un CDN de terceros (Iconify u otro) que resuelve el ícono en el momento de la carga introduce una dependencia de red que puede fallar silenciosamente según el entorno (sandboxes con política de red restrictiva, por ejemplo) — el ícono simplemente no aparece, sin error visible. El asset se empaqueta en build time desde el paquete oficial y se embebe en el bundle final, igual que la fuente autohospedada. En un prototipo aislado sin paso de build, la alternativa válida es embeber el SVG inline directamente en el HTML — nunca cargarlo por URL en el momento de render.

**Icono solo, con excepción justificada:** válido solo para acciones de altísima frecuencia y convención universal (guardar, deshacer, cerrar). Todo lo demás: icono + label o icono + tooltip obligatorio.

**El cursor es iconografía:** cambio de forma por modo (`crosshair`, `grab`) con el mismo criterio de alto contraste, incluyendo cursores custom donde CSS nativo no alcance — el cursor no usa Carbon (es un recurso de sistema, no un ícono de UI), pero sigue el mismo principio de legibilidad inmediata.

### 2.9 Escala — densidad y viewport

**Densidad — 4 modos:**

| Modo | Alto de fila | Padding vertical | Padding horizontal | Fuente | Uso |
|---|---|---|---|---|---|
| Compacto | 26px | 4px | 8px | 12px | Trading, grids de alto volumen |
| Cómodo (default) | 36px | 8px | 12px | 13px | Uso general |
| Espacioso | 48px | 13px | 16px | 14px | Onboarding, primera configuración |
| Terminal | 22px | 3px | 8px | 12px | Logs, monitoreo — reservado a `data-panel-type="raw-data"` |

```css
:root, [data-density="comfortable"]{ --row-h:36px; --cell-py:8px; --cell-px:12px; --fs-data:13px; --fs-ui:13px; }
[data-density="compact"]{ --row-h:26px; --cell-py:4px; --cell-px:8px; --fs-data:12px; --fs-ui:12px; }
[data-density="spacious"]{ --row-h:48px; --cell-py:13px; --cell-px:16px; --fs-data:14px; --fs-ui:14px; }
[data-density="terminal"]{ --row-h:22px; --cell-py:3px; --cell-px:8px; --fs-data:12px; --fs-ui:12px;
  --bg-panel:#0C1210; --text-panel:#7FD9A0; --border-panel:#17352A; }
```

`--density` es preferencia global persistida (Regla 6); el modo terminal **nunca** es tema de toda la app, solo de paneles marcados explícitamente.

**Viewport:** breakpoints convencionales `640/768/1024/1280/1536px`. En pantallas grandes se prioriza densidad de información (más columnas, más cuadrantes de tiling); por debajo de `768px` los layouts multi-panel colapsan a una columna sin ocultar funciones — nunca se sacrifica la Regla 1 por falta de espacio.

### 2.10 Extensión financiera (opt-in)

Todo lo anterior en esta sección 2 es obligatorio en **todo** Bench. Lo siguiente se activa **solo** en los módulos que califican:

```css
--risk: #8B2942;      --risk-soft: #F2E1E6;      /* exposición/advertencia, distinto de --error (fallo consumado) */
--security: #146B5C;  --security-soft: #DCEEEA;  /* 2FA/firma confirmada, distinto de --success */
```

**Criterio de calificación — un módulo activa esta extensión si cumple al menos una:**
1. Muestra un saldo/monto persistido que puede cambiar de estado (pendiente → pagado).
2. Escribe o modifica un registro de ledger/transacción real (no una proyección derivada).
3. Requiere confirmación de dos pasos porque un error de lectura numérica tendría consecuencia monetaria directa.

Con este criterio: **Facturación, Pagos, Nómina, Inventario valorizado** — sí. **Reportes** (solo lectura, sin edición de saldo) y **Configuración** — no, aunque muestren números, porque no hay transacción real en juego. Aplicar la extensión a pantallas de solo lectura sería fricción sin beneficio — el mismo tipo de "protección" excesiva que entrena a la gente a ignorar las confirmaciones reales (Regla 3).

**Formato de datos:**
- **Números:** `1,234,567.89` (fiat, 2 decimales fijos); decimales completos para cripto (`0.00001234 BTC`, nunca redondeo silencioso); notación científica solo bajo el umbral de legibilidad, con valor completo en tooltip.
- **Direcciones:** truncado `0x4f2a…9c31`, tooltip con valor completo, clic copia con confirmación de 800ms.
- **Timestamps:** relativo en feeds de actividad reciente; absoluto siempre en filas de ledger o comprobantes auditables.
- **Todo hash/dirección/ID de transacción** usa fuente monoespaciada (2.7) incluso fuera de tablas.

---

## 3. Accesibilidad: foco visible

Dado que la Regla 1 exige que todo sea alcanzable por `Tab`/foco, el indicador de foco es infraestructura funcional, no estética. Usa `--state-focus-ring` (2.1).

```css
:focus-visible { outline: 2px solid var(--state-focus-ring); outline-offset: 1px; }

/* Dentro de grids: el foco no puede depender solo de outline exterior,
   porque las celdas son contiguas y se solaparía con la celda vecina. */
td[tabindex]:focus-visible {
  outline: 2px solid var(--state-focus-ring);
  outline-offset: -2px; /* hacia adentro, nunca hacia afuera en grids densos */
  z-index: 2; position: relative;
}
```

- **Nunca `outline: none` sin sustituto igual o más visible.**
- **Contraste mínimo 3:1** contra el fondo adyacente (WCAG 2.4.11), verificado en los 4 modos de densidad/tema.
- **Orden de foco = orden visual, siempre.** Componentes con CSS Grid/Flexbox donde el DOM difiere del orden visual necesitan `tabindex` explícito — Tab y lectores de pantalla siguen el DOM, no `order` en CSS.
- **Trampas de foco solo en modales verdaderos.** Un panel dockable o flotante no modal nunca atrapa el foco. *Implementación verificada en 4.7 (demo 4):* `Tab`/`Shift+Tab` ciclan solo entre los elementos enfocables dentro del modal mientras está abierto; el foco vuelve al elemento que lo abrió al cerrarse — nunca se pierde en el body de la página.
- **El modo de interacción se anuncia a lectores de pantalla** vía `aria-live="polite"` sobre el badge de modo, no solo visualmente.

---

## 4. Catálogo de patrones

Cada dominio a continuación es autocontenido: patrón de interacción, especificación técnica y decisiones de diseño ya resueltas — todo en un mismo bloque, para no tener que saltar entre secciones. Filtro aplicado en todo el catálogo: solo features viables al 100% en navegador, sin depender de atajos/gestos reservados. Todo funciona por clic, foco (`Tab`), o teclas sin modificador.

### 4.1 Navegación: Omnibar y comandos

**Patrón** *(herencia: Oracle EBS, CLI-in-browser)*: campo de búsqueda persistente en el layout con búsqueda fuzzy de cualquier función/pantalla, breadcrumb jerárquico (`Facturación › Ventas › Nueva factura`) en cada resultado. El mismo campo interpreta texto libre como búsqueda de función, o sintaxis `campo:valor` como filtro/operación sobre los datos en pantalla — un solo punto de entrada, no dos componentes. Flechas para navegar resultados, `Enter` ejecuta. Todo el teclado usado vive dentro de un input ya enfocado, sin conflicto con el navegador.

**Alias:** el usuario/admin define alias cortos (`nf` = "Nueva Factura") con prioridad absoluta sobre el fuzzy match, resueltos desde una tabla `alias -> functionId`.

**Arquitectura de datos:**
```ts
type FunctionEntry = {
  id: string;                  // identificador estable, no cambia entre versiones
  nombre: string;
  path: string[];               // ["Facturación", "Ventas", "Nueva factura"]
  sinonimos?: string[];
  alias?: string;
  permisos?: string[];
  tipo: 'pantalla' | 'accion' | 'macro' | 'reporte';
  frecuenciaUso?: number;
}
```

**Cómo se puebla el índice — decisión cerrada:** cada módulo declara sus funciones en un manifiesto explícito (`bench.functions.json`), verificado en CI. **No** se usa scraping de rutas ni inferencia automática. *Por qué:* el omnibar es la ruta de acceso garantizada a toda función (Regla 1) — si el índice se poblara por inferencia, una falla de heurística rompería la confianza del usuario la primera vez que busque algo que existe y no aparezca. Más trabajo de setup, cero sorpresas. Las macros grabadas (4.5) se inyectan automáticamente como `FunctionEntry` de `tipo:'macro'` con `id` autogenerado (`m1`, `m2`...).

**Ranking:** (1) alias exacto, (2) nombre exacto, (3) fuzzy match sobre nombre+sinónimos+path con scoring (ej. Fuse.js, pesos 0.6/0.3/0.1), (4) desempate por `frecuenciaUso`, (5) sin texto: `Recientes` (últimos 5) + `Frecuentes` (top 5). Registrar búsquedas sin resultado detecta nomenclatura poco intuitiva — la métrica más barata de "salud de la navegación".

**Gramática del parser `campo:valor`:**
```
comando        := filtro (conector filtro)* | accion_macro | limpieza | busqueda_libre
filtro         := campo operador? valor
operador       := ":" | ":>" | ":<" | ":>=" | ":<="
conector       := " " (AND implícito) | " or " (OR explícito)
accion_macro   := "run:" nombre_macro | nombre_macro_corto
limpieza       := "clear"
campo          := identificador de columna visible en el contexto actual
valor          := texto libre (case-insensitive, parcial) | número | fecha ISO
nombre_macro_corto := "m" + entero (m1, m2)
```

**Encadenamiento — decisión cerrada:** espacio entre pares = **AND** implícito siempre; `or` explícito es la única forma de ampliar. *Por qué:* un power user que ya usa Excel, SQL, Gmail o Jira trae el modelo mental de que el espacio significa "y además" — un OR implícito lo sorprendería la primera vez que filtre por dos campos esperando estrechar resultados y en cambio los vea multiplicarse (viola Regla 5).

**Operadores de comparación — decisión cerrada:** `>`, `<`, `>=`, `<=` están en v1, no pospuestos, limitados a campos numéricos/fecha (`monto:>1000`, `vence:<2026-09-15`); sobre texto se ignoran silenciosamente. *Por qué:* revisar facturas vencidas o montos sobre un umbral es tarea diaria de un power user financiero — posponerlo mientras el resto del sistema ya está construido es la fricción acumulada que Bench existe para eliminar.

Reglas adicionales del parser: si el campo no existe en el contexto visible, respuesta explícita ("no existe el campo 'X' en esta vista"), nunca fallo silencioso. El dropdown muestra cómo se interpretará el texto mientras se escribe, antes de presionar `Enter`.

**Secuencias de teclas sin modificador (leader key)** *(herencia: Gmail, Vim)*: `g`+`i`, activas solo fuera de un campo de texto — recupera el espíritu de los mnemónicos `Alt+letra` sin tocar `Alt` (reservado por el navegador). **Especificación del estado armado** *(implementado, ver demo 2 — sección 5)*: al presionar la primera tecla (`g`), el sistema entra en un estado transitorio "esperando segunda tecla" que **debe tener indicador visible** (badge en la barra superior + overlay momentáneo) — es una instancia directa de la Regla 2 (ningún estado momentáneo sin indicador si afecta la siguiente tecla que el usuario presione). El estado armado expira solo tras un timeout corto (~1.5s) o `Escape` explícito; nunca queda armado indefinidamente sin señal. Descubribilidad general vía overlay de ayuda (`?`).

**Command Palette (`Ctrl+K`/`Cmd+K`):** se mantiene como atajo oportunista, nunca único camino — compite de forma inconsistente con la barra de direcciones del navegador. El omnibar visible es siempre el camino principal.

**Menús contextuales:** clic derecho con solo las 8-10 acciones relevantes al objeto, conservando siempre copiar/pegar/seleccionar-todo nativos junto a las acciones custom.

### 4.2 Densidad y edición de datos

**Grid editable in-place, con virtualización a escala** *(herencia: AS/400, Lotus 1-2-3, Oracle Forms)*: edición directa de celdas sin modal por fila. Doble clic/`Enter` para editar, flechas/`Tab` para moverse, `Escape` cancela, validación inline. Virtual scrolling con recycling de DOM para cientos de miles de filas — el rendimiento viene de virtualización + `transform`, no de "aceleración GPU" literal sobre texto. Pegado masivo desde Excel/Sheets con detección automática de tipo de columna. Autoguardado en vez de pelear por `Ctrl+S` (reservado por el navegador).

**Densidad configurable:** toggle vía los tokens de 2.9 — nunca un valor propio por componente.

**Validación en `blur`, no en cada tecla:** auditoría obligatoria del orden de `Tab` en cada formulario nuevo — bug silencioso en layouts CSS Grid/Flexbox donde el DOM difiere del orden visual.

### 4.3 Layout y multitarea

**Paneles dockables y tiling real** *(herencia: CDE, X Window, terminales de trading)*: paneles flotantes/acoplables, separables, movibles, con estado persistente entre sesiones. Tiling: subdivisión real del espacio en cuadrantes redimensionables, cada uno con su propio flujo de datos en tiempo real, sin solaparse.

**Implementación del redimensionado** *(verificado, demo 2)*: separador (`splitter`) de ~6px entre paneles, con línea visual de 1px que se engruesa a 2px y cambia a `--primary` en hover/arrastre (mismo patrón de feedback que el resto del sistema — nunca un cambio silencioso). El arrastre ajusta el `flex-basis` del panel objetivo en píxeles absolutos, con un mínimo duro (`160px` horizontal / `80px` vertical) para que ningún panel pueda colapsarse hasta ser inutilizable. Cursor `col-resize`/`row-resize` durante el arrastre — coherente con la Regla de cursor dinámico por modo (4.4).

**Throttling para datos en tiempo real** — con múltiples cuadrantes recibiendo actualizaciones, renderizar en cada mensaje genera fatiga visual real en turnos de 8h:
```js
const BATCH_INTERVAL_MS = 400; // punto de partida, no fijo
function createThrottledRenderer(renderFn, intervalMs = BATCH_INTERVAL_MS) {
  let pending = [], scheduled = false;
  return function enqueue(update) {
    pending.push(update);
    if (!scheduled) {
      scheduled = true;
      setTimeout(() => { renderFn(pending); pending = []; scheduled = false; }, intervalMs);
    }
  };
}
```
Paneles de alerta crítica pueden bajar a 100-150ms; paneles informativos toleran 2-3s. Nunca más de un cuadrante "parpadeando" perceptiblemente a la vez — desincronizar ventanas de batching con offset ±100ms. Un indicador de actividad (punto pulsante) comunica "vivo" mejor que un flash por evento.

**Panel de propiedades contextual (Inspector):** panel fijo que cambia de contenido según selección, sin modal. Sub-tabs internos *(herencia: NeXTSTEP)* para objetos con muchas propiedades, en vez de scroll infinito.

**Agrupación de paneles decidida por el usuario** *(herencia: BeOS/Haiku)*: tabs armados por drag del usuario sobre otro panel, no predefinidos por el desarrollador.

**Selector de workspace siempre visible** *(herencia: Solaris CDE, AmigaOS)*: miniaturas/preview permanentes de cada espacio de trabajo, nunca ocultas tras un gesto o atajo.

**Paletas flotantes en segundo monitor:** vía Multi-Screen Window Placement API — soporte real limitado (Chromium con permiso explícito; sin soporte en Safari/Firefox). **Decisión cerrada — degradación silenciosa:** se detecta soporte una sola vez, sin pedir permiso proactivamente; el permiso se solicita solo cuando el usuario intenta enviar una tarjeta al segundo monitor (acción explícita). Si la API no existe o se deniega, la tarjeta simplemente sigue flotando en la ventana actual, sin mensaje de error ni banner de "función no disponible". *Por qué:* interrumpir con un prompt no solicitado, por una función que la mayoría de navegadores ni soporta, viola la Regla 2 — el camino principal (tarjeta flotante en la misma ventana) ya funciona perfecto sin la API.

**Tarjetas de registro (HyperCard) — paradigma complementario para pantallas grandes y multi-monitor:** HyperCard (1987) organizaba cada registro como una tarjeta completa y navegable, con campos editables y botones que enlazaban a tarjetas relacionadas — antecesor del hipertexto, no el "card" decorativo de dashboard SaaS actual. El grid denso sigue siendo el modo por defecto; las tarjetas son un **segundo modo, no un reemplazo**, para revisar o comparar pocos registros. Panel no bloqueante — se puede anclar abierta mientras se trabaja en el grid, y coexistir varias lado a lado. La tarjeta (no la fila del grid) es la unidad natural para el segundo monitor, porque tiene contexto completo por sí misma. **Enlaces entre tarjetas** (herencia directa de HyperCard): un campo de relación (ej. "Cliente") se comporta como link — clic abre la tarjeta relacionada sin perder la de origen. Misma edición in-place que el grid, solo cambia el contenedor. Nunca default silencioso — toggle explícito "Vista Grid"/"Vista Tarjetas".

### 4.4 Modos operativos y feedback de estado

**Modos explícitos con retroalimentación visual** *(herencia: Vim, AutoCAD)*: una tecla sin modificador cambia el modo de interacción (`v` = selección múltiple, `Escape` = normal). Cursor dinámico (`crosshair`/`grab`) vía CSS — una línea, no requiere WebGL. Redundancia obligatoria: el cursor solo es visible sobre el lienzo, siempre acompañado de un indicador secundario fijo (badge en la barra de estado).

**Indicador de modo persistente** *(herencia: Word Insert/Overtype)*: "modo solo lectura", "editando versión anterior", "offline" — visible ambientalmente.

**Tooltips sin delay artificial:** delay adaptativo — el primero ~450ms, los siguientes en modo exploración sin delay.

**Ayuda contextual opcional** *(herencia: Balloon Help)*: activable/desactivable, nunca forzada. **Implementación** *(verificado, demo 2)*: los elementos que la ofrecen se marcan con un atributo de datos (`data-balloon="texto explicativo"`), distinto de `data-tip` (tooltip corto siempre activo, sección 4.4 arriba) — el globo solo se dispara cuando el modo está activo, y su texto es explicación extendida, no una repetición del tooltip corto. Mientras el modo está activo, los elementos con ayuda disponible llevan un indicador visual pasivo (contorno discontinuo sutil) para que el usuario sepa dónde puede pedir más contexto sin tener que pasar el mouse por toda la pantalla a ciegas.

**Barra de estado inferior + telemetría** *(herencia: Sun/SGI workstations)*: página, zoom, modo, idioma siempre visibles, con margen libre en la esquina inferior izquierda (zona del preview de links del navegador). Telemetría vía `Performance API` como fuente principal; `navigator.deviceMemory` solo si el navegador lo expone, nunca como requisito.

**Modo terminal:** tipografía monoespaciada de alto contraste, alternativo y opcional para paneles de datos crudos — ver tokens en 2.9.

### 4.5 Automatización: Macros

**Macros grabables, ejecutadas por comando** *(herencia: Lotus 1-2-3, WordPerfect)*: grabar una secuencia de acciones repetitivas y asignarles un nombre. **Corrección de mecanismo:** nunca se dispara por atajo con modificador arbitrario — cualquier combinación "libre" hoy puede chocar con un atajo futuro del navegador. Se ejecuta como comando dentro del omnibar (`run:macro1` o el nombre directo, ver 4.1), o vía secuencia sin modificador (`m1`, `m2`). Cada macro grabada se integra automáticamente al índice de funciones del omnibar (4.1) como una entrada más, buscable igual que cualquier pantalla del sistema.

### 4.6 Reversibilidad y persistencia

**Patrón "Aplicar" en configuración:** preview en vivo + botón explícito de "descartar cambios" para revertir todo el bloque de una vez. **Implementación** *(verificado, demo 2)*: al abrir el panel se toma un snapshot del estado actual; cada cambio en un control (ej. checkbox) escribe directo al estado en vivo y dispara el re-render del panel afectado — el efecto es visible antes de cualquier confirmación (Regla 3). "Aplicar" confirma el snapshot y mantiene el panel abierto para seguir ajustando; "Aceptar" confirma y cierra; "Descartar" restaura el snapshot completo de una sola vez, nunca campo por campo.

**Confirmaciones solo en lo irreversible:** `beforeunload` + autoguardado real en vez de pelear con el navegador por el cierre de pestaña.

**Historial de undo/redo visible y granular:** panel clickeable tipo "History" de Photoshop, no un stack ciego. `Ctrl+Z` es ambiguo fuera de un input en algunos navegadores — el panel visible es el camino principal, el atajo solo un acceso secundario.

**Plantillas reutilizables** *(herencia: OS/2 Warp)*: cualquier objeto/registro se marca como plantilla y genera copias con un gesto directo.

**Estado persistente completo vía IndexedDB + Web Worker:** no solo los datos — selección múltiple activa y pila de undo/redo forman parte del snapshot restaurado. Guardado en Web Worker para no bloquear el hilo principal. `IndexedDB` en vez de `localStorage`. El usuario nunca debe distinguir entre "minimicé la pestaña" y "la cerré por error".

---

## 4.7 Componentes de estructura genérica

Los seis dominios anteriores (4.1-4.6) son patrones específicos de Bench. Estos cuatro son componentes de estructura más genéricos — presentes en casi cualquier sistema de diseño — pero se documentan igual porque Bench les impone las mismas reglas que a todo lo demás: nada de comportamiento a elección del implementador (Regla 4), y la escala de borde/elevación/movimiento de la sección 2 aplica sin excepción.

**Árbol de navegación (Tree)** — complemento visual del índice de funciones que ya alimenta el omnibar (4.1): mismo dato (`FunctionEntry.path`), dos formas de recorrerlo — buscar por texto, o navegar la jerarquía visualmente. Nunca son dos índices distintos. Navegación por teclado siguiendo el patrón estándar de treeview (roving tabindex, no todos los nodos en el orden de `Tab`): `↓`/`↑` mueve el foco entre nodos visibles, `→` expande o entra al primer hijo, `←` colapsa o sube al padre, `Enter` selecciona. Nivel de borde 1 (micro) en cada fila — es contenido de alta repetición, no contenedor.

**Accordion** — divulgación progresiva de grupos de campos densos, sin necesitar una pantalla nueva por grupo. Un mismo componente de accordion se reutiliza en dos contextos de esta demo (detalle de registro y filtros del offcanvas) — es la prueba de la Regla 4 en la práctica: el componente no sabe en qué panel vive. Expansión/colapso vía `max-height` con la banda de movimiento "apertura de panel" ya definida (140-180ms, `ease-out`) — nunca una animación de altura arbitraria.

**Offcanvas** — panel que desliza desde el borde (no modal, no bloqueante), mismo principio que las tarjetas flotantes de 4.3: el usuario puede seguir interactuando con el resto de la pantalla mientras está abierto. Nivel de borde 4 + `--elev-2` (misma superficie flotante que ya usa el resto del sistema). Se cierra con `Escape`, clic fuera, o el botón de cierre — nunca atrapa el foco, porque no es un modal.

**Modal bloqueante** — la única superficie del sistema donde la trampa de foco (sección 3, "trampas de foco solo en modales verdaderos") **sí** aplica: `Tab` nunca escapa del diálogo mientras está abierto, y el foco vuelve al elemento que lo abrió al cerrarse. Se reserva para decisiones que de verdad requieren que el usuario no pueda hacer nada más hasta resolver — coherente con la Regla 3 (confirmación bloqueante solo ante lo irreversible, o donde la acción exige una decisión explícita antes de continuar). Dos variantes de intensidad, mismo componente: un modal estándar (Nivel 4 de borde, `--elev-2`, sólido) para acciones reversibles como archivar, y un modal crítico (borde triple + `--elev-3`, Regla 8) para acciones irreversibles reales — la misma escalada visual que ya usa la confirmación inline de eliminar en el grid (4.6), ahora también disponible como diálogo de aplicación completa cuando la acción no está atada a una sola fila.

---

## 4.9 Autenticación y sesiones de larga duración

Un dominio que ningún demo anterior había tocado, y que conecta más directo que ningún otro con la tabla de la sección 0.1 — la fila "no puede permitirse perder trabajo por un error de la app" es, casi literalmente, la razón de ser de este patrón.

**Indicador de Bloq Mayús** — reaplicación directa del patrón "indicador de modo persistente" (4.4, herencia Word Insert/Overtype) al campo de contraseña: el estado del teclado no es visible por sí mismo, y un power user escribiendo su contraseña sin mirar el teclado es exactamente el escenario que ese patrón ya cubría. Mismo componente, contexto distinto — otra vez la Regla 4 en la práctica.

**Selector de organización/workspace a nivel de cuenta** — el mismo componente que el selector de espacio de trabajo de la barra superior (3.3.4), reutilizado en el flujo de login para elegir entre organizaciones/tenants. No se construye un segundo selector "para login" — es el mismo patrón, en otro punto del recorrido.

**Aviso de expiración de sesión — patrón nuevo, específico de Bench.** Ninguna aplicación de consumo necesita esto con la misma urgencia que una herramienta abierta 8 horas seguidas: cerrar sesión sin avisar, en medio de un turno de trabajo, es exactamente el tipo de sorpresa que la Regla 2 prohíbe. Especificación:

- El aviso aparece **con tiempo de sobra** antes del cierre real — nunca en el último segundo.
- Es un **modal bloqueante real** (4.7), con trampa de foco — a diferencia de un toast, esta decisión sí necesita que el usuario no pueda ignorarla por accidente mientras se aleja del teclado.
- Dos salidas igual de visibles: extender la sesión (default, botón primario) o cerrar sesión ahora — nunca solo una opción de "aceptar".
- Si el usuario no responde y la sesión se cierra, el mensaje posterior confirma explícitamente que el trabajo ya estaba guardado (4.6) — la ansiedad real detrás de un cierre de sesión no es la sesión en sí, es no saber si se perdió algo.

---

## 4.10 Trazabilidad: qué demo cubre qué patrón

Bench se valida con demos ejecutables, no solo con prosa — esta tabla evita que un patrón quede "documentado pero nunca probado" sin que se note.

| Patrón / sección | Demo 1 | Demo 2 | Demo 3 | Demo 4 | Demo 5 (`wallet-ledger`) | Demo 6 (`auth-sesiones`) |
|---|---|---|---|---|---|---|
| Omnibar + parser (AND/OR, comparación) — 4.1 | ✅ | — | — | — | — | — |
| Grid editable in-place — 4.2 | ✅ | — | — | — | — | — |
| Vista Tarjetas (HyperCard) + enlaces — 4.3 | ✅ | — | — | — | — | — |
| Tiling con separadores arrastrables — 4.3 | — | ✅ | — | — | — | — |
| Throttling con cadencia diferenciada — 4.3 | — | ✅ | — | — | — | — |
| Multi-monitor, degradación silenciosa — 4.3 | parcial | ✅ | — | — | — | — |
| Selector de workspace (3.3.4) | ✅ (tabs) | — | — | — | — | ✅ (a nivel de cuenta) |
| Modos sin modificador (`v`/`Esc`) — 4.4 | ✅ | — | — | — | — | — |
| Leader key (`g`+letra) — 4.1/4.4 | — | ✅ | — | — | — | — |
| Balloon Help — 4.4 | — | ✅ | — | — | — | — |
| Indicador de modo persistente — 4.4 | — | — | — | — | — | ✅ (Bloq Mayús) |
| Tooltips con delay adaptativo — 4.4 | ✅ | — | — | — | ✅ (ticker) | — |
| Modo terminal — 4.4 | ✅ | — | — | — | — | — |
| Macros grabables + comando — 4.5 | ✅ | — | — | — | — | — |
| Patrón "Aplicar" — 4.6 | — | ✅ | — | — | — | — |
| Historial / undo-redo — 4.6 | ✅ | — | ✅ | — | — | — |
| Plantillas (estado provisional) — 4.6 | ✅ | — | — | — | — | — |
| Persistencia de estado completo — 4.6 | — | — | ✅ (simulada) | — | — | mencionada (post-timeout) |
| Virtualización a escala — 4.2 | — | — | ✅ | — | — | — |
| Pegado masivo con detección de tipo — 4.2 | — | — | ✅ | — | — | — |
| Árbol de navegación (Tree) — 4.7 | — | — | — | ✅ | — | — |
| Accordion — 4.7 | — | — | — | ✅ | — | — |
| Offcanvas — 4.7 | parcial | — | — | ✅ | — | — |
| Modal bloqueante + trampa de foco — 4.7 | — | — | — | ✅ | ✅ (2 pasos) | ✅ (expiración) |
| Extensión financiera (2.10) completa | badges | — | — | — | ✅ (a fondo) | — |
| Aviso de expiración de sesión — 4.9 | — | — | — | — | — | ✅ (patrón nuevo) |
| Validación en blur vs. en submit — Regla 3 | ✅ | — | — | — | ✅ | ✅ (distinción explícita) |
| Tokens: borde, línea, elevación, material — 2.2-2.6 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tipografía autohospedada + fallback — 2.7 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Iconografía Carbon inline — 2.8 | ✅ | ✅ | parcial | parcial | parcial | parcial |

**Nota sobre la fila de persistencia:** la demo 3 simula el efecto del patrón (dato + selección + historial sobreviviendo a un "cierre accidental") con estado en memoria, no con `IndexedDB` real — mismo motivo que ya aplicamos a tipografía (2.7) e iconos (2.8): un archivo HTML autocontenido no debe depender de una API de almacenamiento del navegador que puede comportarse distinto según el entorno de previsualización. La implementación real en producción sigue siendo la especificada arriba (Web Worker + IndexedDB).

---

## 5. Sistemas operativos y software de origen (research base)

Referencia rápida de qué se rescató de dónde:

| Sistema/software | Qué aportó | Dónde vive en este documento |
|---|---|---|
| Oracle EBS | Omnibar con breadcrumb jerárquico | 4.1 |
| SAP | Densidad extrema, códigos de transacción cortos | 2.9, 4.1 |
| AS/400, Lotus 1-2-3 | Grid como paradigma central, orientado a teclado | 4.2 |
| Windows 95/98 | Mnemónicos, tooltips instantáneos, iconografía de alto contraste (Susan Kare) | 2.8, 4.1, 4.4 |
| Mac OS Classic | Balloon Help, consistencia radical de interfaz | 4.4 |
| NeXTSTEP | Dock, inspector con sub-tabs, Services entre apps | 4.3 |
| BeOS/Haiku | Tabs de ventana agrupados por el usuario | 4.3 |
| AmigaOS | Screens deslizables, drag-and-drop nativo temprano | 4.3 |
| Solaris CDE / OpenWindows | Front Panel, workspace switcher visible | 4.3 |
| SGI IRIX | Iconos grandes para selección infrecuente vs. densidad para repetitiva | 2.8 |
| OS/2 Warp | Plantillas arrastrables, escritorio orientado a objetos | 4.6 |
| Photoshop / CorelDRAW clásico | Paletas flotantes no modales, historial visible | 4.3, 4.6 |
| HyperCard | Tarjetas de registro con enlaces relacionales | 4.3 |
| Vim / AutoCAD | Modos explícitos con retroalimentación de cursor | 4.4 |
| Gmail | Secuencias de teclas sin modificador | 4.1 |

---

## 6. Checklist de cierre para implementación real

- [ ] Tokens de la sección 2 convertidos a variables CSS reales en el sistema de diseño (Figma + código).
- [ ] Auditoría de foco/tabindex (sección 3) en cada componente antes de marcarlo como "listo".
- [ ] Manifiesto de funciones (4.1) con al menos registro manual inicial por módulo.
- [ ] Parser de comandos (4.1) como función pura y testeada aisladamente, antes de conectarlo al omnibar.
- [ ] Intervalo de throttling (4.3) definido por tipo de panel antes de conectarlo a datos reales.
- [ ] Tipografía (2.7) validada a 12px real; pesos limitados a 400/600, tracking aplicado según los tokens `--tracking-body`/`--tracking-mono`; variable font autohospedada con fallback dimensionado (`ascent-override`/`descent-override`/`size-adjust`) configurado.
- [ ] Set de iconos Carbon (2.8) auditado: assets importados del paquete oficial, ningún ícono reconstruido a mano en estilo de trazo propio, ninguno aislado sin tooltip/label.
- [ ] Contraste WCAG del `material-acento` (2.6) verificado en modo oscuro.
- [ ] Lista de módulos que activan la extensión financiera (2.10) revisada contra el criterio de calificación.
