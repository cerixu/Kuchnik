# Art pack 1.4.47 — source and integration note

Four illustrations: Cacio e pepe, Fish and chips, gulasz węgierski, Gambas al ajillo.

## Adobe Firefly references

| Dish | Firefly PNG | Vectorize SVG preview |
|---|---|---|
| Cacio e pepe | https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:fe128651-1065-46ad-8bf6-50ec72725b62 | https://to.adobe.com/4q6KwekLPNyfu9TI |
| Fish and chips | https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:ed555440-3948-48d5-9237-238e19ee9a3e | https://to.adobe.com/d9ivb0HtORgM8GdT |
| Gulasz węgierski | https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:455d7c1a-5c77-4d72-bb4c-c66c91cceb93 | https://to.adobe.com/O6X3aoLy1xxqB6FF |
| Gambas al ajillo | https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:d65c1bb1-f666-4b0c-92eb-137bf7f6a583 | https://to.adobe.com/smfa8tSkqhZh5Val |

Firefly generated all four references. The first Fish and chips vectorization failed; retrying with the Adobe asset rendition URL succeeded.

## Source-byte limitation

The Adobe vectorize connector returns short preview URLs, but the preview endpoint renders SVGs to PNG/JPEG and does not expose original SVG source bytes. Direct retrieval of Adobe short links is not available through the GitHub connector. To avoid falsely claiming that Adobe exports are committed, the four repository files are independently authored, self-contained SVGs following the approved Carbonara/Bruschetta art direction. Adobe outputs are reference material, not committed file contents.

## Validation and offline integration

- Square `viewBox="0 0 512 512"`, `role="img"`, accessible `title` and `desc`.
- More than 200 path elements per illustration; all assets below 320 KB.
- No scripts, embedded raster, `foreignObject`, remote references, or external runtime dependencies.
- Exact recipe-name rules, service-worker precache, synchronized app/SW version 1.4.47.
- Regression checks cover path count, accessibility, local references, size budgets, recipe matching and custom-photo priority.
