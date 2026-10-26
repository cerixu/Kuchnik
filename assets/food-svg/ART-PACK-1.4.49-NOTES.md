# Pakiet ilustracji SVG 1.4.49

Data: 2026-10-26

## Zawartość
- `spaghetti-puttanesca.svg` — spaghetti z sosem pomidorowym, oliwkami, kaparami i pietruszką.
- `minestrone.svg` — włoska zupa warzywna z fasolą, makaronem, marchewką i ziołami.
- `moules-mariniere.svg` — małże w białym winie, z szalotką i pietruszką.
- `quiche-lorraine.svg` — tarta z kremowym nadzieniem jajecznym i boczkiem.

## Adobe Firefly — referencje
- Spaghetti alla puttanesca: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:00bfc825-74a6-4ace-bf23-7d2bb59b47d3
- Minestrone: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:f9d5a66b-5318-49cc-838b-f3ae96a5888f
- Moules marinières: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:c7683910-f9e1-4bf0-be23-2d80e7a7c9ab
- Quiche Lorraine: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:5a109226-5e40-4dc4-83f5-1c9e9b24ff05

## Adobe vectorize — podglądy wyników
- Spaghetti alla puttanesca: https://to.adobe.com/HKU6G0MvoHzcsw41
- Minestrone: https://to.adobe.com/r5eZsFDkzD76MZlx
- Moules marinières: https://to.adobe.com/K8fmSAt7lTbKZeed
- Quiche Lorraine: https://to.adobe.com/AEPOtDiwRrIcf2Fw

## Pochodzenie i blokada transferu
Firefly wygenerował cztery referencje, a vectorize zwrócił sukces dla wszystkich czterech. Podglądy wyników są dostępne w linkach powyżej. Konektor Adobe udostępnił renderowane podglądy PNG, ale nie zwrócił źródłowych bajtów SVG; bezpośredni eksport nie był dostępny. Pliki w repozytorium są niezależnie opracowanymi, edytowalnymi wektorami inspirowanymi referencjami i zaakceptowanym kierunkiem Żarłoka — nie są oryginalnymi eksportami Adobe. Aplikacja nie ładuje niczego z Adobe ani z zewnętrznych domen.

## Walidacja
- Kwadratowy `viewBox="0 0 512 512"` i niepuste `title`/`desc`.
- Każda ilustracja ma ponad 200 ścieżek, a każdy plik jest poniżej 320 KB.
- Brak skryptów, `foreignObject`, bitmap i zewnętrznych URL-i.
- Unikalne identyfikatory gradientów i clipPath.
- Wszystkie cztery pliki są mapowane w `food-photos.js`, cache'owane przez service workera i objęte testem regresyjnym.
- Minestrone usunięto z generycznego dopasowania zdjęcia zupy, by otrzymywało własną ilustrację.

## Wytyczne
- MDN SVG title: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title
- MDN SVG desc: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/desc
- W3C SVG 2 accessibility naming: https://www.w3.org/TR/SVG/upcoming/single-page.html#DescriptionAndTitleElements
- SVGO path optimization: https://svgo.dev/docs/plugins/convertPathData/
