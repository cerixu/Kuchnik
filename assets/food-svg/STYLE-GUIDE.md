# Food illustration style standard

**Approved visual references:** `assets/food-svg/carbonara.svg` and `assets/food-svg/bruschetta.svg`. These two files are the source of truth for the visual direction.

## Art direction

Every new dish illustration must follow the same polished, detailed, semi-realistic vector-painting style:

- Make the food the hero: appetizing, identifiable, carefully composed and rendered with dish-specific ingredients.
- Use dimensional forms, layered highlights and shadows, soft reflected light, and material detail. Pasta should look like pasta; toasted bread, tomato, herbs, sauce and ceramic should each have their own texture.
- Use a dark charcoal or black ceramic plate with a subtle rim and realistic light response. Preserve the reference's rich warm food colours, natural greens and controlled highlights.
- Keep the composition deliberate and legible at phone-card size. Use a tasteful background that suits the composition; the two reference pieces show that a clean light background and a dark vignette can both work when the dish remains the focus.
- Make each illustration bespoke to the dish. Do not reuse a generic plate full of unrelated shapes.

## Do not use

- Flat pictograms, emoji, generic symbols or minimalist clip-art.
- Simplified geometric piles of coloured shapes in place of real food detail.
- Thin outlines or neon accents as a substitute for volume, lighting and texture.
- Wrong ingredients, decorative duplicates, arbitrary garnishes, or a generic dish illustration assigned to a specific recipe.
- A new visual style without an explicit request to change this direction.

## SVG and app integration

- Use a scalable `viewBox`, an accessible `title` and `desc`, and no scripts, embedded HTML or external image dependencies.
- Optimize path precision and remove editor noise without visibly changing the reference artwork.
- Map each illustration only to names that actually describe that dish; keep custom user photos higher priority than library artwork.
- Add every new local SVG to the service-worker precache and regression tests, and bump the app and service-worker versions together.
- Inspect the result at the actual iPhone PWA display size before calling it finished. A technically valid SVG is not enough if the illustration does not match the approved visual standard.

Before adding a new dish illustration, compare it side by side against both references. Never replace or restyle these two approved references without explicit user approval.
