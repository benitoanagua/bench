# Third-party notices

## Carbon Icons

`src/data/carbon-outline.json` is sourced from Carbon Icons, the icon set of the
Carbon Design System (IBM). Bench standardizes on Carbon per
`bench-design-system.md` §2.8 — the same design lineage as Bench's typography
(IBM Plex, §2.7), not an incidental style match.

- Project: https://carbondesignsystem.com/guidelines/icons/library
- Source data: https://github.com/carbon-design-system/carbon
- License: Apache License 2.0
- Copyright IBM Corp.
- Grid: 32×32

```
Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

Copyright IBM Corp.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

**Migration status** (see `docs/architecture/adr-008-carbon-icons.md`): as of
this notice, `carbon-outline.json` ships a curated ~40-icon subset — the exact
set verified across the six Bench reference demos in `docs/demos/` — not
Carbon's full catalog. A regeneration script that pulls the complete dataset
from the real `@carbon/icons` npm package (mirroring exactly how this file's
Tabler-era predecessor, `tabler-outline.json`, was generated — see git history)
is the tracked follow-up. Until then, `resolveCarbonIcon()` returns `undefined`
— no error — for any Carbon-valid name outside the curated set.

## Tabler Icons (superseded)

Bench used Tabler Icons prior to this migration. No Tabler code, data, or
assets remain in this package; this entry is kept only so the change is
traceable in one place instead of silently disappearing from history.

- Project: https://tabler.io/icons — License: MIT — Copyright (c) 2020-2026 Paweł Kuna
