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

## 2. Versionar (PR Version Packages)

CI (`ci.yml`) corre `pnpm check` y las suites e2e en cada push a `main`.
Con el CI en verde, `release.yml` (disparado por `workflow_run` sobre main, o
manualmente con `workflow_dispatch`) corre `changesets/action`:

1. Si hay changesets pendientes, el action abre/mantiene el PR **Version
   Packages** con los bumps de versión y los `CHANGELOG.md`.
2. El PR se revisa y se mergea.

El mismo paso en local es `pnpm exec changeset version` (los manifests y
CHANGELOGs quedan versionados; después, `pnpm format`).

## 3. Publicar

Al mergear el PR Version Packages ya no hay changesets pendientes: el mismo
workflow corre el paso `publish` (`pnpm build && pnpm release`, es decir
`changeset publish` después de un build fresco). El job:

- corre **después de `pnpm check`, `test:contracts` y `test:a11y`**, y de
  `pnpm build`;
- exige el secret `NPM_TOKEN` (token de automatización npm con permisos de
  publish de `@bench`);
- publica con **provenance** (`id-token: write` + `NPM_CONFIG_PROVENANCE`).

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
