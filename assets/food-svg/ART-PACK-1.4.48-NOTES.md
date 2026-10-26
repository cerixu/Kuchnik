# Pakiet ilustracji SVG 1.4.48

Data: 2026-10-26

## Zawartość
- `gnocchi-burro-salvia.svg` — gnocchi z masłem szałwiowym.
- `tarte-tatin.svg` — karmelizowane jabłka i kruche ciasto.
- `moussaka.svg` — widoczne warstwy bakłażana, mięsa, ziemniaków i beszamelu.
- `ramen-shoyu.svg` — klarowny bulion shoyu, makaron, chashu, ajitama, nori i menma.

## Adobe Firefly — wygenerowane referencje
- Gnocchi: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:067618a4-9617-4467-bde5-e994ba7e5304
- Tarte Tatin: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:072aa364-8a9e-4f8b-8938-5d4d72312341
- Mussaka: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:89a6c7c7-3eb6-4b17-a353-502df9ed2c6b
- Ramen shoyu: https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:d2ef7fad-c771-4751-9c41-f6af35ef27ce

## Adobe vectorize — wyniki
- Gnocchi: https://to.adobe.com/jXKR3sE5LhdDGyJw
- Tarte Tatin: https://to.adobe.com/wAlu2Wr6SA9rWARU
- Mussaka: https://to.adobe.com/540mQgqMYzefi9YM
- Ramen shoyu: https://to.adobe.com/SBzA85uq1qy4VnLH

## Pochodzenie i ograniczenie transferu
Firefly i vectorize zwróciły sukces, a wyniki referencyjne zostały wyświetlone. Konektor Adobe udostępnił krótkie linki do podglądu, ale nie zwrócił źródłowych bajtów SVG do zapisania w GitHubie; bezpośredni odczyt SVG przez podgląd inline kończył się błędem narzędzia. Dlatego pliki SVG w tym pakiecie są niezależnie opracowanymi, edytowalnymi wektorami inspirowanymi referencjami i zaakceptowanym kierunkiem artystycznym — nie są oryginalnymi eksportami Adobe. Nie ma zewnętrznych zasobów w aplikacji.

## Kontrole źródeł
- Kwadratowy `viewBox="0 0 512 512"`.
- Dostępne `title` i `desc`.
- Brak skryptów, `foreignObject`, osadzonych bitmap i zewnętrznych URL-i.
- Ponad 200 ścieżek na ilustrację; każdy plik poniżej 320 KB.
- Mapowania są konkretne; gnocchi z masłem szałwiowym nie dziedziczy już grafiki gnocchi al pomodoro.
- Wszystkie nowe pliki są dodane do precache service workera i testów regresyjnych.

## Wytyczne użyte do kontroli
- MDN SVG title: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title
- MDN SVG desc: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/desc
- SVGO convertPathData: https://svgo.dev/docs/plugins/convertPathData/
- MDN PWA caching: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching
