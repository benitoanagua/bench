# Despliegue de Storybook en GitHub Pages

El artefacto principal de Bench es el Storybook público, construido con
`pnpm build:storybook:ci` y listo para desplegar en
**GitHub Pages** mediante GitHub Actions.

## URL esperada

Si el repositorio es `org/bench`, el sitio queda disponible en:

```
https://org.github.io/bench/
```

(sirve bajo la subruta `/bench/`). Si se usa un dominio propio en la raíz
del repositorio (ver más abajo), no hace falta subruta.

## Paso manual único (una sola vez)

En GitHub, ve a **Settings → Pages → Build and deployment → Source** y
selecciona **GitHub Actions**. Con eso, GitHub Pages publicará lo que el
workflow `storybook-pages.yml` suba como artifact.

Después de esto no hay que tocar nada más: cada deploy es un disparo del
workflow.

## Cómo lanzar el deploy

El workflow **no despliega por defecto**. Construye y sube el artifact en
cada `push` a `main` y en cada `pull_request`, pero el deploy solo ocurre
si lo disparas manualmente:

1. Ve a **Actions → "Storybook Pages"**.
2. Pulsa **Run workflow**.
3. Elige la rama `main`.
4. Marca el input **deploy = true**.
5. Pulsa **Run workflow**.

El job `deploy` requiere el environment `github-pages` (Settings →
Environments → github-pages). Si requiere aprobación, apruébalo antes de
que el deploy continúe.

## Dominio propio (custom domain)

Si el repo usará un dominio propio en la raíz (ej. `bench.design`):

1. Añade un archivo `CNAME` con el dominio en `apps/storybook/static/`
   (se copia al output de `storybook-static` vía `staticDirs`).
2. Configura el registro DNS (A/AAAA/CNAME) apuntando a las IPs de
   GitHub Pages.
3. Verifica el dominio en la cuenta/organización de GitHub
   (Settings → Pages → Custom domain).

Cuando usas dominio propio en la raíz, el sitio no vive bajo subruta y el
paso 16 de la fase (servir bajo `/bench-main/`) solo aplica para la
verificación local.

## Quitar el noindex

Mientras el sitio no sea oficial, `preview-head.html` y
`manager-head.html` inyectan:

```html
<meta name="robots" content="noindex" />
```

para evitar indexación en motores de búsqueda. Cuando quieras que el
sitio sea indexable, elimina esas dos líneas de ambos archivos y vuelve a
desplegar.

## Limitaciones

- **Sin cabeceras personalizadas:** GitHub Pages no soporta archivos de
  reglas de cabecera ni archivos de configuración de edge; no se crean
  dichos archivos y no se pueden forzar políticas de caché ni CORS
  personalizadas.
- **Caché gestionado por GitHub:** los assets se sirven con la caché de
  GitHub Pages; no hay control fino de `Cache-Control`.
- **Sitio público aunque el repo sea privado:** salvo en GitHub
  Enterprise, un sitio de Pages de un repositorio privado es público.
- **Límite de tamaño:** el sitio publicado no debe exceder 1 GB
  (storybook-static suele ser bien inferior; ver fase de entrega).
- **No despliega desde forks ni desde pull_request:** el job `deploy`
  solo corre con `workflow_dispatch` e `inputs.deploy == true`.

## Verificación local (sin desplegar)

```sh
# Construye paquetes + storybook (salida en apps/storybook/storybook-static)
pnpm build:storybook:ci

# Sirve bajo la subruta /bench-main/ y ejecuta el smoke test:
node scripts/storybook-pages-smoke.mjs
```

El smoke verifica: `index.html`, `iframe.html` e `index.json` 200 bajo
`/bench-main/`, ≥126 entradas en `index.json` con al menos una de tipo
`docs`, sin 404 de assets ni errores de consola en Button/Primary y una
story por categoría, y que el cambio de tema modifica
`--bch-color-surface`.
