# Art pack 1.4.50 — source and integration notes

Date: 2026-10-26

## Illustrations added
- pad-thai.svg — Pad Thai with prawns, tofu, egg, bean sprouts, lime and crushed peanuts.
- spaghetti-aglio-olio.svg — spaghetti with olive oil, toasted garlic, red chili and parsley.
- biryani.svg — chicken biryani with basmati rice, browned chicken, caramelized onion and herbs.
- falafel.svg — falafel with tahini, pita, cucumber, tomato and herbs.

## Adobe work and concrete limitation
Adobe Firefly generated four raster reference images; Adobe vectorize returned success for all four. The connector returned preview URLs but did not expose the source SVG bytes. Attempts to retrieve vectorized output as source content returned rasterized PNG previews or gateway/cache failures. The SVG files committed in this repository are independently authored vector illustrations, not claimed to be Adobe exports.

### Firefly PNG references
- Pad Thai: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:a6cc9863-062f-4312-ae7b-b3423a69d5c4
- Spaghetti aglio e olio: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:5b556c13-915d-4f2f-bc95-e6dee735e377
- Biryani: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:2a92af7a-056d-455c-8a74-ef0b012ddcd5
- Falafel: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:0c4261c4-0994-4980-a7db-8ce7bdf547b1

### Adobe vectorize previews
- Pad Thai: https://to.adobe.com/MP4PX9pMIJA6GxOp
- Spaghetti aglio e olio: https://to.adobe.com/xzJqSozdZR4JtM3t
- Biryani: https://to.adobe.com/uU8dXAJha2OZjPCB
- Falafel: https://to.adobe.com/uKXevFHdcsmZ5ueJ

## SVG quality and app behavior
All four local files use viewBox="0 0 512 512", accessible title and desc, local gradients and paths, no scripts, embedded bitmaps, or external dependencies. They are mapped to exact dish names and precached by the service worker. User-supplied recipe photos retain priority.

References:
- MDN SVG title: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title
- MDN SVG desc: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/desc
- MDN PWA caching: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching
- SVGO: https://github.com/svg/svgo

No SVGO CLI run is claimed in this pack. Structural checks and repository CI are the validation gates.
