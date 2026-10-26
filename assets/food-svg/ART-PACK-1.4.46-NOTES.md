# Art pack 1.4.46 — provenance and integration note

Four dishes were prepared for this pack: Coq au vin, Tom yum goong, Ratatouille niçoise, and Crème brûlée.

## Adobe reference outputs

- Coq au vin SVG preview: https://to.adobe.com/bBYMqQ3DgumWhKuz
- Tom yum SVG preview: https://to.adobe.com/HfXtlvRYj2nb3c8P
- Ratatouille SVG preview: https://to.adobe.com/fC1uxfXU5C9EdWfe
- Crème brûlée SVG preview: https://to.adobe.com/mnOUCCsj403cnKZy

Adobe Firefly generation and vectorization both reported success. The available connector, however, returned a rendered PNG preview for the SVG short links and did not expose the original SVG source bytes. Direct retrieval attempts returned a cache miss or gateway timeout. To avoid falsely claiming that those Adobe exports were committed, the four repository files are independently authored, self-contained SVG alternatives inspired by the approved Carbonara/Bruschetta art direction and the generated previews. No remote image is embedded or requested by the app.

## Validation requirements

- square viewBox, accessible title/desc, local-only definitions
- no scripts, foreign objects, embedded raster images, or external references
- more than 200 paths per dish illustration
- explicit recipe-name matching and service-worker precache
- app and service-worker version stay synchronized
