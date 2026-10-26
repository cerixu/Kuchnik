# ART-PACK 1.4.51 — provenance and QA

Generated 2026-10-26.

## Pack contents
- `spaghetti-amatriciana.svg` — 35 KB, 259 path elements.
- `panzanella.svg` — 34 KB, 241 path elements.
- `saltimbocca-romana.svg` — 34 KB, 242 path elements.
- `spanakopita.svg` — 34 KB, 244 path elements.

All four assets use square `viewBox="0 0 512 512"`, `title` and `desc`, local gradients/clipping, and contain no scripts, embedded bitmaps or external URLs.

## Adobe Firefly reference PNGs
- Spaghetti all'amatriciana: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:5f5af8cc-c4d6-4325-8786-576d91faa030
- Panzanella: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:fa2fe4c0-78b8-4898-b0d9-42dd43cd4476
- Saltimbocca alla romana: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:86e38b5f-813a-4822-9cbe-50effb635767
- Spanakopita: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:19859383-4336-49b9-a415-f9aea4331d14

## Adobe vectorize previews
- Spaghetti all'amatriciana: https://to.adobe.com/38SJcUJutvjSvukr
- Panzanella: https://to.adobe.com/94hhMsP05HRQMtPQ
- Saltimbocca alla romana: https://to.adobe.com/1BT7pa7pgSCoyK5c
- Spanakopita: https://to.adobe.com/9tpHYFo3HPAC0HVM

## Source-transfer limitation
Adobe vectorize reported success, but the connector exposed preview URLs rather than retrievable SVG source bytes. `asset_inline_preview` failed internally; web open returned cache misses, and the execution container could not resolve `to.adobe.com` for direct download. The committed files are independently authored detailed SVGs informed by Firefly references and the approved graphite/matte-ceramic, natural-color, soft-light and copper-accent direction. They are **not claimed to be original Adobe SVG exports**.

## Validation
- Square viewBox, unique IDs, non-empty title/desc, balanced root/defs.
- No scripts, foreignObject, image elements, embedded raster payloads or external URLs.
- More than 200 vector paths per illustration; each remains well below 320 KB.
- Concise path geometry, shared local gradients, clipped texture marks, no editor metadata.
- SVGO CLI was not available, so no CLI optimization pass is claimed.

Guidance checked: MDN SVG title https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title ; MDN SVG desc https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/desc ; SVGO convertPathData https://svgo.dev/docs/plugins/convertPathData/ ; SVGOMG path optimization https://svgomg.net/guides/paths-and-geometry/ .

Offline integration: four exact recipe rules, four SVG_FILES entries, four service-worker CORE entries, synchronized app/cache version 1.4.51, regression coverage.
