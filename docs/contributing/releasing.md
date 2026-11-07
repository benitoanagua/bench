# Release y publicación

El versionado y la publicación van por **Changesets**. Los paquetes privados
(`@bench/fonts`, `@bench/showcase`, `@bench/storybook`, `@bench/testing`) están
en `ignore` de `.changeset/config.json`; los 7 paquetes públicos se publican a
npm con `access: public` y provenance.

## 1. Agregar un changeset

Antes de mergear a `main`, quien hizo el cambio ejecuta:

```sh
pnpm exec changeset
```

y describe el cambio por paquete con el tipo de bump correcto
(`patch` para fixes internos, `minor` para API nueva, `major` para breaking).
No hay release sin changeset: es la única vía por la que entra una versión.

## 2. Versionar (PR Version Packages — manual)

Con el CI en verde (`pnpm check`), ejecute `changeset version` en local o
abra el PR **Version Packages** con los bumps de versión y los
`CHANGELOG.md`. Revise y mergee a `main`.

El mismo paso en local es `pnpm exec changeset version` (los manifests y
CHANGELOGs quedan versionados; después, `pnpm format`).

> Nota: esta repo no usa `changesets/action` para versionar ni publicar; el
> versionado es manual y deliberado para evitar releases automáticos no
> revisados.

## 3. Publicar (workflow `release.yml`, seguro por defecto)

La publicación se dispara únicamente con `workflow_dispatch` y requiere dos
barreras antes de tocar el registry:

1. **Input `publish: true`** al lanzar el workflow (Settings → Actions →
   "Release" → Run workflow → `publish = true`). Con `publish = false`
   (valor por defecto) el workflow corre el gate completo
   (`pnpm check`, contratos, a11y, build) y un
   `pnpm publish -r --dry-run --access public --no-git-checks` sin publicar
   nada: es un ensayo que valida el contenido de los tarballs de los 7
   paquetes publicables.
2. **Environment `npm-release`** requiere aprobación manual
   (Settings → Environments → npm-release → Required reviewers).

Solo con `publish = true` **y** aprobación del environment se corre
`pnpm release` (es decir, `changeset publish` para los 7 paquetes
publicables, versión `0.2.0` en adelante).

### Cómo habilitar la publicación real en el futuro

- Crear el environment `npm-release` en el repo de GitHub y marcar los
  reviewers que deben aprobar.
- Guardar el token de automatización de npm como secret `NPM_TOKEN`.
- Verificar en npmjs.com que la organización **`@bench`** exista y que el
  repo sea público (provenance exige componentes públicos).
- Lanzar el workflow con `publish = true`; si el gate falla no hay
  publicación.

### Scope de npm

El scope a publicar es `@bench` (pendiente de confirmar con la cuenta de
npm de la organización). Mientras no se confirme, el workflow permanece en
modo dry-run.

## 4. Verificación post-release

- Comprobar en npmjs.com que la versión figure con el badge Provenance.
- `pnpm pack --dry-run` en cada paquete ya se valida localmente antes del
  release (ver docs/audit/cleanup-log.md); el contenido publicado del tarball
  no cambia respecto de ese chequeo.
- Bump final: los cambios de versión quedan en `main`; el tag lo agrega
  `changeset publish` por paquete (`@bench/tokens@0.2.0`, etc.).

## Reglas

- **Nunca** publicar desde una máquina local salvo emergencia documentada
  (`pnpm release` con `NPM_TOKEN` en el ambiente): el camino normal es el
  workflow.
- Los changesets se consumen en orden; no editar el changeset de un release ya
  versionado — corre `changeset version` y agrega un changeset nuevo para lo
  que falte.
- Breaking changes → `major` + migración en `docs/`; el CHANGELOG debe
  enlazar el doc.
