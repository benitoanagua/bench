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
this notice, `carbon-outline.json` ships a curated ~54-icon subset — the exact
set verified across the six Bench reference demos in `docs/demos/` — not
Carbon's full catalog. A regeneration script that pulls the complete dataset
from the real `@carbon/icons` npm package (mirroring exactly how this file's
Tabler-era predecessor, `tabler-outline.json`, was generated — see git history)
is the tracked follow-up. Until then, `resolveCarbonIcon()` returns `undefined`
— no error — for any Carbon-valid name outside the curated set.

## IBM Plex (fonts)

The `@bench/fonts` package copies the official IBM Plex Sans and IBM Plex
Mono `.woff2` assets from the `@ibm/plex-sans` / `@ibm/plex-mono` npm
packages at build time (`tooling/typography/build.mjs`). The generated
`dist/` output is not versioned.

- Project: https://github.com/IBM/plex
- License: SIL Open Font License, Version 1.1
- Copyright: Copyright IBM Corp. All rights reserved.
- Full license text: https://scripts.sil.org/OFL

```
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007

Copyright (c) IBM Corp. All rights reserved.

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://scripts.sil.org/OFL

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The fonts,
including any derivative works, can be bundled, embedded, redistributed
and/or sold with any software provided that any reserved names are not used
by derivative works. The fonts and derivatives, however, cannot be released
under any other type of license. The requirement for fonts to remain under
this license does not apply to any document created using the fonts or their
derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright Holder
under this license. This may include source files, build scripts and
documentation.
"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).
"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).
"Modified Version" refers to any derivative made by adding to, deleting, or
substituting — in part or in whole — any of the components of the Original
Version, by changing formats or by porting the Font Software to a new
environment.
"Author" refers to any designer, engineer, programmer, technical writer or
other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining a copy
of the Font Software, to use, study, copy, merge, embed, modify, redistribute,
and sell modified and unmodified copies of the Font Software, subject to the
following conditions:
1) Neither the Font Software nor any of its individual components, in
Original or Modified Versions, may be sold by itself.
2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy contains
the above copyright notice and this license. These can be included either as
stand-alone text files, human-readable headers or in the appropriate
machine-readable metadata fields within text or binary files as long as those
fields can be easily viewed by the user.
3) No Modified Version of the Font Software may use the Reserved Font Name(s)
unless explicit written permission is granted by the corresponding Copyright
Holder. This restriction only applies to the primary font name as presented
to the users.
4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any Modified
Version, except to acknowledge the contribution(s) of the Copyright Holder(s)
and the Author(s) or with their explicit written permission.
5) The Font Software, modified or unmodified, in part or in whole, must be
distributed entirely under this license, and must not be distributed under
any other license. The requirement for fonts to remain under this license
does not apply to any document created using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF COPYRIGHT, PATENT,
TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING ANY GENERAL, SPECIAL,
INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF THE USE OR INABILITY TO USE
THE FONT SOFTWARE OR FROM OTHER DEALINGS IN THE FONT SOFTWARE.
```

## Tabler Icons (superseded)

Bench used Tabler Icons prior to this migration. No Tabler code, data, or
assets remain in this package; this entry is kept only so the change is
traceable in one place instead of silently disappearing from history.

- Project: https://tabler.io/icons — License: MIT — Copyright (c) 2020-2026 Paweł Kuna
