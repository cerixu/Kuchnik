# Kucharzyna 👨‍🍳

> **Wersja pośrednia 1.4.26.** Naprawiono krytyczny import funkcji EAN, który zatrzymywał ładowanie modułów i mógł zostawiać ekran startowy. Skaner odrzuca również część fałszywych trafień EAN-8 wewnątrz dłuższych kodów. Cały rozruch ma wspólny limit 60 sekund; po jego przekroczeniu spóźnione operacje nie mogą już zamontować aplikacji nad ekranem błędu. Dziennik zmian jest wersjonowany osobno, a test regresyjny symuluje spóźnione wczytanie magazynu. Dodano ekran „Gotuję”, 28 lokalnych zdjęć dań i osobny Cache-First cache mediów zachowywany między wydaniami. Dopasowywanie nazw składników w magazynie rozpoznaje częste polskie odmiany i ignoruje opisy przygotowania, bez łączenia ogólnych nazw z bardziej szczegółowymi produktami. Historia ruchów magazynowych nie jest automatycznie usuwana po roku. Dane użytkownika pozostają nietknięte. Jeśli awaryjna pamięć localStorage zawiera niepoprawny JSON, aplikacja nie nadpisze go pustą listą — wstrzyma zapis i zachowa oryginalną zawartość do odzyskania. Sześć lekkich ilustracji SVG jest pre-cache'owanych i służy jako lokalny fallback offline.

Prywatny notatnik szefa kuchni na iPhone'a (działa też na innych telefonach i komputerze).
Instalowalna aplikacja PWA, **działa bez internetu**, bez kont, reklam, śledzenia i płatnych API.
Wszystkie dane są w pamięci Twojego urządzenia.

## Co potrafi

- **Safari (1.3):** baza danych ma ponawianie, limit czasu otwarcia, naprawę magazynów i **tryb awaryjny** (localStorage), więc aplikacja otwiera się nawet gdy iOS zablokuje IndexedDB (tryb prywatny, Lockdown, zawieszenie). Przy awarii pokazuje prawdziwy komunikat błędu, przyciski „Spróbuj ponownie” i „Tryb awaryjny”; stan magazynu widać w Ustawieniach.
- **Nowe menu główne i dok (1.3):** nagłówek jak „We have special offer”, karuzela dużych kart „Polecane na dziś 🔥”, okrągłe przyciski akcji, „Skąd jest przepis” (kuchnie świata z flagami), kategorie; pływający dok z unoszoną aktywną ikoną.
- **Karty z opisem i pochodzeniem (1.3):** każda receptura ma krótki opis, 🇵🇱 kraj pochodzenia i źródło (Kucharzyna, strona, TheMealDB…); filtr po kraju. W szczegółach: chipy z krajem i źródłem oraz pływający przycisk GOTUJĘ po rozwinięciu.
- **Wygląd z makiety (1.2):** ciemny grafit, szare karty z miedzianą krawędzią i światłem u dołu, **okrągłe zdjęcia dań**, ocena ★ i kalorie po prawej stronie karty, pasek ikon bez podpisów, font Poppins. Szczegóły receptury: duże okrągłe zdjęcie, tytuł z oceną, **składniki na łuku** (okrągłe ikony) i „Pokaż szczegóły ⌄”. Jasny motyw, tryb Amator i suwak „Przezroczystość szkła” nadal są w Ustawieniach, podpisy pod ikonami paska włączysz tam jednym przełącznikiem.
- **228 przykładowych receptur:** polska kuchnia (zupy, mięsa, pierogi, ciasta, wigilijne), kuchnie świata (Włochy, Francja, Hiszpania, Grecja, Meksyk, USA, Azja, Bliski Wschód…), śniadania, wege i wegańskie, desery, sosy bazowe, prep, przetwory, ponad 20 drinków. Tradycyjne są oznaczone gwiazdką i flagą kraju. Każdą receptura możesz edytować lub usunąć; usunięta nie wraca po aktualizacji, a „Przywróć przykładowe receptury” w Ustawieniach przywraca brakujące.
- **Ilustracje dań** rysowane w kodzie (ok. 90 wariantów: zupy, makarony, mięsa, desery, drinki…) na ciemnej porcelanie — wszędzie tam, gdzie receptura nie ma własnego zdjęcia. Własne zdjęcie dodajesz w edytorze (kompresowane lokalnie).
- **Szacunek kalorii na porcję** z tabel wartości odżywczej (pokazywany tylko, gdy rozpoznano ≥ 70% składników; to przybliżenie).
- **Lista receptur:** kafelki lub lista, wczytywanie partiami po 40, wyszukiwarka bez względu na polskie znaki, kategorie, tagi (stuknij tag w recepturze), filtry, sortowanie, ulubione, ostatnie, „Polecane na dziś”, kategorie na Starcie.
- **GOTUJĘ — „Prowadź mnie” krok po kroku:** ekran „Przygotuj” (składniki, zmiana porcji), potem jeden krok na ekranie z potrzebnymi składnikami i wykrytymi minutnikami; przesuwanie palcem, czytanie na głos, wznawianie, ocena 1–5 i notatka na koniec. Obok klasyczna „Lista kontrolna”.
- **Wiele minutników naraz** z pastylką widoczną na każdym ekranie.
- **Szukaj w sieci — w samej aplikacji** (patrz niżej).
- **Start i diagnostyka:** jeśli ładowanie modułów albo bazy się zawiesi, aplikacja pokaże ekran diagnostyczny z przyciskiem odświeżenia zamiast bez końca wyświetlać animację startową. Limit czasu rozruchu wykrywa problem z bazą.
- **Magazyn:** osobny ekran dostępny ze Startu; wyszukiwanie, filtrowanie po lokalizacji, dodawanie i edycja produktów, szybkie zwiększanie stanów, zapisywanie strat i podgląd ich kosztu. Po pełnym zakończeniu trybu GOTUJĘ aplikacja może po potwierdzeniu odjąć dostępne składniki od stanu magazynu, zgodnie z przeliczoną liczbą porcji. Skaner EAN uruchamia kamerę, automatycznie wykrywa kod i opcjonalnie pobiera nazwę produktu z Open Food Facts. Testy kamery na fizycznym iPhonie pozostają do wykonania.
- **Narzędzia kuchenne** (zakładka Kalkulatory): pizza/ciasto z procentami piekarskimi — obliczanie od liczby i masy kulek albo bezpośrednio od ilości mąki (np. 7,5 kg), procenty, przeliczanie receptury, koszt i food cost, sól i solanki, zakwas, forma do pieczenia, przelicznik jednostek (także g ↔ ml), temperatury mięs, czasy gotowania z minutnikiem, zamienniki, „Co mam w lodówce?”, „Co dziś gotujemy?”.
- **Przelicz**, **procenty piekarskie**, **food cost**, **zakupy** (z alejkami), **import z tekstu**, **historia zmian** z przywracaniem wersji, **kopia zapasowa JSON** — jak w poprzednich wersjach.

## Struktura plików

Repozytorium jest **płaskie — wszystkie pliki leżą w jednym katalogu głównym, bez żadnych folderów**
(dzięki temu da się je wgrać z iPhone'a, który nie przesyła folderów). Aplikacja nigdzie nie szuka podkatalogów.

```
index.html              powłoka aplikacji, meta tagi iOS, wczesne ustawienie motywu
styles.css              wszystkie style (motywy, safe-area, komponenty, ekrany)
manifest.webmanifest    manifest PWA
sw.js                   service worker (cache offline + wykrywanie aktualizacji)
app.js                  start, motyw, nawigacja dolna, klawiatura iOS, trasy
router.js               router po hashu (#/…), pamięć przewijania
pwa.js                  rejestracja SW, „Nowa wersja → Odśwież", trwały magazyn
db.js                   IndexedDB (recipes, ingredients, categories, shoppingItems, settings, history)
recipes.js              model danych, zapis, historia, kategorie, dane startowe
calculator.js           przeliczanie, procenty piekarskie, pizza, food cost
seeds.js                format receptur startowych + parser + pierwsze 60 receptur
seeds-pl.js, seeds-world.js, seeds-more.js   kolejne 160+ receptur (polska, świat, śniadania/wege/desery/drinki)
nutrition.js            szacunek kalorii na porcję
art-kit.js, art-extra.js   klocki i warianty ilustracji dań
poppins-300/400/500/700.woff   font Poppins (podzbiór łacińsko-polski, bez internetu)
bg-texture.png          delikatna faktura tła (jak matowy grafit na makiecie)
art.js                  ilustracje potraw (SVG rysowane w kodzie)
timers.js               wiele minutników, pastylka, arkusz minutników
kitchen.js              dopasowanie składników do kroków i do „lodówki”
search.js               wyszukiwanie w sieci: Google API, baza przepisów, URL, tłumaczenie
tools-data.js, calc-kit.js   dane i klocki narzędzi kuchennych
importer.js             parser tekstu przepisu (PL/EN, JSON-LD)
backup.js               eksport/import JSON
shopping.js             lista zakupów (logika + widok)
ui.js, util.js, components.js     elementy interfejsu, narzędzia
views-start.js          ekran Start
views-recipes.js        lista receptur, menedżer kategorii
views-detail.js         podgląd receptury, Przelicz, procenty, koszt, historia
views-editor.js         edytor receptury
views-cook.js           tryb GOTUJĘ + minutnik
views-calc.js           kalkulatory (pizza, procenty, przeliczanie, koszt)
views-tools.js          przelicznik, temperatury, czasy, zamienniki, solanki, zakwas, formy, lodówka, losowanie
views-guide.js          „Prowadź mnie” — gotowanie krok po kroku
views-search.js         Szukaj w sieci
views-import.js         import i „Znajdź przepis w internecie"
views-settings.js       ustawienia
views-inventory.js     magazyn: stany, terminy, straty
apple-touch-icon.png    ikona na ekran początkowy iPhone'a (180×180)
icon-192.png, icon-512.png, icon-maskable-512.png    ikony PWA
README.md               ten plik
```

Brak bundlera i zależności — czyste moduły ES. Nic nie trzeba instalować ani budować.

## Uruchomienie lokalnie

Service worker i instalacja wymagają `http://localhost` albo HTTPS (otwarcie pliku z dysku przez `file://` nie zadziała).

```bash
cd kucharzyna
python3 -m http.server 8080
# albo: npx serve .
```

Otwórz `http://localhost:8080`.

## Publikacja na GitHub Pages (także z samego iPhone'a)

1. Pobierz `kucharzyna.zip`, w aplikacji **Pliki** stuknij go, żeby się rozpakował (powstanie folder z plikami).
2. W Safari wejdź na github.com → **New repository** (np. `kucharzyna`, publiczne) → **Create repository**.
3. Na stronie pustego repozytorium stuknij **uploading an existing file** (albo **Add file → Upload files**).
4. Stuknij **choose your files** → w oknie wyboru wejdź do rozpakowanego folderu → **Zaznacz** → zaznacz **wszystkie pliki** (jest ich 50, same pliki, bez folderów) → **Otwórz**. Poczekaj, aż wszystkie się wgrają (lista na stronie).
5. Na dole **Commit changes**.
6. **Settings → Pages → Build and deployment → Source: Deploy from a branch**, gałąź `main`, folder `/ (root)` → **Save**.
7. Po minucie–dwóch aplikacja jest pod `https://TWOJA-NAZWA.github.io/kucharzyna/`.

Przy późniejszych aktualizacjach wgrywasz tylko zmienione pliki tą samą drogą (**Add file → Upload files**) — pliki o tej samej nazwie zostaną podmienione.

Wszystkie ścieżki są względne i płaskie, więc działa w podkatalogu repozytorium. Jeśli repozytorium jest publiczne, to publiczny jest tylko kod aplikacji — Twoje receptury zostają w telefonie.

## Szukanie przepisów w aplikacji — co działa i jak to ustawić

Strona na GitHub Pages nie ma własnego serwera, a przeglądarka **nie może pobrać wyników zwykłego Google** (blokada CORS i regulamin Google). Dlatego aplikacja ma trzy źródła, które działają legalnie i bez opuszczania aplikacji (Receptury → **Szukaj w sieci**):

1. **Baza przepisów (TheMealDB)** — działa od razu, bez konfiguracji, ze zdjęciami (kilkaset przepisów, po angielsku). Polskie hasła (kurczak, makaron, sernik, pierogi…) tłumaczy słownik, resztę MyMemory.
2. **Google** — prawdziwe wyniki Google przez oficjalne API Google Programmable Search. Wymaga **Twojego darmowego klucza** (100 zapytań dziennie), konfiguracja jednorazowo:
   1. Wejdź na `programmablesearchengine.google.com` → **Dodaj** → zaznacz „Przeszukuj całą sieć” → utwórz → skopiuj **identyfikator wyszukiwarki (cx)**.
   2. Wejdź do Google Cloud Console, włącz **Custom Search API** i utwórz **klucz API**.
   3. W aplikacji: **Ustawienia → Wyszukiwanie w sieci** → wklej klucz i cx → **Sprawdź połączenie**.
   Klucz zostaje tylko w tym telefonie i **nie trafia do kopii zapasowej**.
3. **Adres strony** — wklej adres w pole wyszukiwania: aplikacja pobierze stronę i wczyta z niej przepis (dane schema.org/Recipe: nazwa, składniki, kroki, czasy, zdjęcie).

W każdym wyniku możesz stuknąć **+** (dodaje od razu) albo otworzyć podgląd i dodać stamtąd. Obce przepisy są tłumaczone na polski (MyMemory, darmowe, dzienny limit — wpisanie e-maila w Ustawieniach zwiększa limit).

**Pośrednik CORS.** Pobranie cudzej strony z poziomu strony na GitHub Pages wymaga pośrednika. Tryb **Auto** używa publicznych darmowych pośredników (allorigins, corsproxy, codetabs) — widzą oni adres wczytywanej strony i bywają zawodni lub limitowani. Możesz ustawić **własnego** (np. prosty Cloudflare Worker, szablon z `{url}`) albo **wyłączyć** (wtedy działa tylko baza przepisów i Google bez wczytywania pełnych stron — pełny przepis dodasz importem z tekstu).

Uwaga: przepisy z cudzych stron są chronione prawem autorskim — aplikacja zapisuje je tylko w Twoim telefonie, z adresem źródła, do prywatnego użytku, i tylko po Twoim stuknięciu.

## Instalacja na iPhonie

1. Otwórz adres aplikacji w **Safari** (nie w innej przeglądarce — instalacja jest tylko z Safari).
2. Stuknij **Udostępnij** (kwadrat ze strzałką) → **Do ekranu początkowego** → **Dodaj**.
3. Uruchom aplikację **z ikony na ekranie początkowym**. Przy pierwszym uruchomieniu miej internet — wtedy zapisuje się pamięć offline.
4. Sprawdź: włącz tryb samolotowy i otwórz aplikację. Powinna działać normalnie.

**Ważne:** na iOS aplikacja z ekranu początkowego ma **osobną pamięć** od karty Safari. Receptury dodane w Safari przed instalacją nie pojawią się w zainstalowanej aplikacji. Najlepiej zainstalować od razu, a jeśli już coś wpisałeś w Safari — zrób kopię JSON i wczytaj ją w aplikacji.

## Gdzie są dane

W **IndexedDB** w przeglądarce / zainstalowanej aplikacji na tym urządzeniu (stores: `recipes`, `ingredients`, `categories`, `shoppingItems`, `settings`, `history`). Nic nie jest wysyłane na żaden serwer. Zdjęcia są kompresowane i przechowywane razem z recepturą.

Skutki: dane jednego telefonu nie pojawią się na drugim (przenoś kopią JSON), a **usunięcie danych witryny lub aplikacji kasuje receptury**. Przeglądarka może też wyczyścić pamięć, gdy brakuje miejsca albo długo jej nie używasz — dlatego rób kopie.

## Kopia zapasowa

- **Ustawienia → Eksportuj kopię** — na iPhonie otworzy się arkusz udostępniania: wybierz **Zachowaj w Plikach** (np. iCloud Drive). Plik ma nazwę `kucharzyna-kopia-RRRR-MM-DD.json`.
- **Ustawienia → Wczytaj kopię z pliku**: **Połącz** (dodaje brakujące, przy tej samej recepturze zostaje nowsza wersja) albo **Zastąp wszystko** (po dodatkowym potwierdzeniu).
- Kopia obejmuje receptury, katalog składników z cenami, kategorie, uwagi, ulubione, ustawienia, zakupy i historię zmian. Szkice edytora nie są w niej zapisywane.
- Aplikacja przypomina o kopii, gdy ostatnia ma ponad 14 dni.

## Aktualizacje aplikacji

1. Zmień pliki, podbij wersję w **`sw.js`** (`VERSION = 'kucharzyna-1.3.1'`) i w **`util.js`** (`APP_VERSION = '1.3.1'`) — muszą być zgodne.
2. Wypchnij zmiany na GitHub.
3. Telefon wykryje nową wersję i pokaże: **„Nowa wersja Kucharzyny jest dostępna” → Odśwież**. Ręcznie: Ustawienia → Sprawdź aktualizacje.

Service worker pobiera pliki z sieci w pierwszej kolejności (z krótkim limitem czasu), więc po stronie telefonu nic nie „zalega” przez dni; offline używa zapisanej kopii.

## Czego aplikacja nie robi (świadomie)

- Nie ma wbudowanej bazy „wszystkich przepisów z internetu” (wymagałoby to serwera i licencji). Szukanie w sieci działa przez źródła opisane wyżej i wymaga internetu.
- Nie pobiera stron w tle ani masowo — tylko pojedyncze strony po Twoim stuknięciu.
- Tłumaczenie obcych przepisów na polski jest maszynowe i wymaga internetu; jakość bywa przeciętna — popraw w edytorze.
- Ilustracje potraw to rysunki, nie zdjęcia.
- Ceny w przykładowych recepturach to wartości przykładowe — ustaw własne.

## Prywatność

Brak kont, reklam, analityki i śledzenia. Internet jest używany wyłącznie wtedy, gdy sam użyjesz „Szukaj w sieci” (zapytania idą do wybranego źródła: Google API, TheMealDB, MyMemory lub pośrednika CORS), albo gdy aplikacja sprawdza własne aktualizacje na hostingu, z którego jest serwowana.
