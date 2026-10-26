# ART-PACK 1.4.52 — provenance and QA

Generated: 2026-10-26.

## Why these dishes
The previously proposed Beef Wellington, Arancini, Gnocchi alla sorrentina and Katsu curry do not occur in the current seed recipes. To avoid unused mappings, this pack covers four real seeded recipes that had no dedicated SVG or dish-specific photo rule: Tortilla española, Guacamole, Brownie czekoladowe and Sałatka caprese.

## Assets and structural checks
- `tortilla-espanola.svg` — 39852 bytes, 298 path elements, 12 unique IDs, 12 local references.
- `guacamole.svg` — 34750 bytes, 252 path elements, 12 unique IDs, 11 local references.
- `brownie-czekoladowe.svg` — 42283 bytes, 321 path elements, 13 unique IDs, 13 local references.
- `salatka-caprese.svg` — 34060 bytes, 226 path elements, 18 unique IDs, 27 local references.

Each SVG has a square 512×512 viewBox, root title/desc, local gradients and clip paths, no scripts, embedded raster images, external URLs or dependencies, and more than 200 paths. Each file is below 320 KB.

## Adobe provenance
Firefly generated these PNG references and vectorize reported success. The connector showed rendered previews but did not expose source SVG bytes; direct retrieval returned a cache miss. Committed SVGs are independently authored local vectors informed by the references, not original Adobe exports.

| Dish | Firefly PNG | Vectorize preview |
|---|---|---|
| Tortilla española | https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:5dc5bcf9-0752-48aa-aadd-588042d470eb | https://to.adobe.com/1yrmDh0HSoeaY1aN |
| Guacamole | https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:173a5d8a-6511-495b-a761-a72594d93c62 | https://to.adobe.com/Wg3T5OPaSbq9f9bq |
| Brownie czekoladowe | https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:2327346f-2516-46d7-8646-f2a288da5da3 | https://to.adobe.com/e3IRM15TFQ8FseKF |
| Sałatka caprese | https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:d418ff73-a449-4fe2-a22a-668283b3c9a6 | https://to.adobe.com/vv0KJ03Sag5XBrkb |

## Integration
Exact matching is added to food-photos.js, all assets are in service-worker CORE, and app/cache versions are synchronized to 1.4.52. Tests cover mapping, accessibility, path detail, local references, byte budget and user-photo priority.

SVGO CLI was not available in this run; no separate SVGO invocation is claimed. Guidance: https://svgo.dev/docs/introduction/ and https://svgomg.net/guides/paths-and-geometry/.
