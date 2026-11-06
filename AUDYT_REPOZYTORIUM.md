# Audyt repozytorium Kuchnik / ŻARŁOK

Data: 6 listopada 2026  
Audytowany stan bazowy: `main` — `45148d26a268e38506668ff1211c75f9fe4f9e8c` (wersja 1.4.96).  
Aktualizacja po audycie: wersja 1.5.3; dodano kategorię PREGO! i migrację istniejących instalacji.

## Podsumowanie

To istniejąca, rozbudowana aplikacja PWA. Repozytorium zawiera bazę przepisów, lokalne ilustracje i ikony, własny system nawigacji, kalkulatory oraz obsługę offline. Największy wykryty problem wydajnościowy był w instalacji Service Workera: próbowała od razu pobrać wszystkie ilustracje dań (około 98,4 MB). Zmieniono to na pobieranie ilustracji przy oglądaniu, z osobną opcją zapisania całego pakietu offline w Ustawieniach. Obrazy zachowane przez starszą wersję pozostają dostępne offline.

## Branch, historia i rozmiar

- Główna gałąź: `main`; stan bazowy audytu: `45148d26`.
- Repozytorium ma ponad 500 śledzonych ścieżek: 47 głównych modułów JavaScript, 5 plików HTML, testy `qa/` i `tests/`, grafiki PNG/SVG/JPG oraz fonty.
- Ostatnie commity przed audytem koncentrowały się na menu i ciemnym Liquid Glass, mieszankach mąk i dwustopniowej fermentacji pizzy, testach mobilnych i stabilności Service Workera.
- Aplikacja to czyste moduły ES, bez bundlera i bez produkcyjnych bibliotek zewnętrznych.

## Architektura i funkcje

- `app.js`, `router.js`, `ui.js`, `components.js` — start, routing hash, ekrany i elementy interfejsu.
- `db.js`, `recipes.js`, `backup.js` — IndexedDB, dane i migracje, kopie/eksport/import; localStorage i pamięć karty są ścieżkami awaryjnymi.
- `seeds*.js`, `views-recipes.js`, `views-detail.js`, `views-editor.js`, `views-search.js`, `views-import.js` — baza, kategorie, filtrowanie, wyszukiwanie, ulubione, edycja i import.
- `views-cook.js`, `views-guide.js`, `timers.js`, `kitchen.js` — gotowanie krok po kroku, minutniki i dopasowanie składników.
- `calculator.js`, `views-calc.js`, `views-tools.js` — pizza od ilości mąki, mieszanki mąk, hydracja, fermentacja pokojowa i chłodna, procenty piekarskie, skalowanie, koszt, food cost oraz narzędzia kuchenne.
- `shopping.js`, `views-inventory.js`, `inventory.js`, `barcode.js` — zakupy, magazyn, ruchy i skanowanie kodów.
- `sw.js`, `pwa.js`, `manifest.webmanifest` — cache offline, aktualizacje, instalacja PWA, ikony w tym maskable.
- Nie znaleziono aktywnego przełącznika jasnego motywu ani trybu amatora w routingu lub ekranach.

## Audyt receptur i ilustracji

- Łącznie **228 receptur**: 225 w czterech plikach seedów oraz 3 klasyki dopisane w `recipes.js` (Carbonara, Pizza Napoletana, Sos pomidorowy).
- `food-illustrations.js` zawiera 228 mapowań do 228 lokalnych PNG w `assets/food-illustrations/`; ścieżki istnieją, pliki mają unikalne treści, nazwy mapowań są jednoznaczne.
- Brakujących plików ilustracji dań: **0**. W rejestrze wszystkie 228 mają jednak status `pending`, czyli są dodane i przypisane, ale nie oznaczone jako zaakceptowane.
- Składniki: 567 unikalnych nazw mapuje się do 84 lokalnych ikon PNG; nie znaleziono brakujących mapowań.
- W repo są również lokalne SVG potraw oraz 28 starszych JPG. Receptury korzystają z nowych rysunków PNG; starsza ścieżka zdjęć pozostaje w kodzie dla zgodności i zdjęć użytkownika. Nie usuwano danych ani obsługi własnych zdjęć.
- Galeria `galeria-kredkowa.html` pokazuje lokalne grafiki, status, partię i pełny rozmiar; stary adres podglądu przekierowuje do niej.

### Zestaw 25 wcześniej zaakceptowanych rysunków

W aktualnym repo nie ma listy, która wskazywałaby te 25 nazw lub oznaczała je jako zaakceptowane. `ARTWORK_TRACKER.md` ma 228 pozycji `pending`. Jedynymi wskazanymi w obecnym przewodniku stylu wzorcami są SVG Carbonary i Bruschetty. Nie przypisano statusu „zaakceptowana” na podstawie domysłu; stan ten trzeba odtworzyć z historii rozmowy i zapisać przy konkretnych pozycjach.

## PWA, wydajność i bezpieczeństwo danych

- IndexedDB jest główną bazą danych; aplikacja ma odzyskiwanie i awaryjne tryby dla problemów Safari.
- Manifest ma `display: standalone` oraz ikony maskable.
- Service Worker używa cache-first dla mediów i fontów, stale-while-revalidate dla statycznych modułów JS/CSS, network-first z limitem dla nawigacji i pozostałych żądań same-origin oraz zapasu offline.
- Przed poprawką lista instalacyjna obejmowała 228 ilustracji dań, razem około **98,4 MB**. Skutkiem było ryzyko długiego pierwszego uruchomienia i nadmiernego transferu na iPhonie.
- W wersji 1.4.99 usunięto generyczny obraz kategorii z ekranu „Gotuję” dla własnych receptur bez ilustracji; wszystkie takie miejsca pokazują neutralny komunikat, a zdjęcia użytkownika pozostają bez zmian. W wersji 1.4.99 pliki JS/CSS korzystają ze strategii stale-while-revalidate. Nowe instalacje zapisują powłokę i mniejsze grafiki; rysunki dań zapisują się przy pierwszym użyciu. Ustawienia oferują pobranie całego pakietu (~94 MiB), licznik postępu i przerwanie. Wcześniej pobrane rysunki w starym cache są nadal dostępne i wykrywane przez licznik.
- Po czystej instalacji pełny zestaw ilustracji offline wymaga pobrania pakietu z Ustawień albo wcześniejszego otwarcia potrzebnych przepisów.

## Znalezione długi i dalsze kroki

### Do poprawy

1. **Status akceptacji ilustracji.** Brakuje mapy 25 zaakceptowanych rysunków i spójnego przeglądu wszystkich 228 prac. Rejestr i galeria obecnie pokazują wszystkie jako oczekujące.
2. **Manualny test iPhone.** Skaner EAN i kamera wymagają sprawdzenia na fizycznym iPhonie; automatyczny smoke test nie zastępuje zgody aparatu i rzeczywistej kamery.
3. **Starsze obrazy.** 28 JPG i historyczne SVG pozostają w repozytorium. Przed usunięciem trzeba potwierdzić, że nie są potrzebne dla zgodności i niestandardowych receptur.

### Do wykonania

- Odtworzyć listę zaakceptowanych 25 grafik z wiarygodnego źródła i zapisać statusy w trackerze oraz galerii.
- Ręcznie przejść główne trasy i gotowanie na iPhonie; sprawdzić aparat, safe area i klawiaturę.
- Ocenić obrazy na ekranie i uzupełnić pliki, jeśli kontrola wizualna wykaże braki (pliki i mapowania są kompletne).
- Zdecydować, czy archiwalne JPG/SVG można bezpiecznie usunąć.

## Tracker postępu

- **Gotowe:** audyt gałęzi i commitów; spis funkcji; kontrola 228 przepisów, 228 plików PNG, 84 ikon i 567 mapowań składników; poprawa strategii instalacji; neutralny fallback dla własnych przepisów bez ilustracji; dokumentacja wersji 1.4.99, odstępu treści nad dolnym dokiem w 1.5.0 i ilustracji składników w ekranach gotowania w 1.5.1 i wyrównania odznak w 1.5.2 i kategorii PREGO! w 1.5.3.
- **W trakcie:** przegląd statusu wizualnego i odnajdywanie 25 wcześniej zaakceptowanych rysunków w wiarygodnym źródle.
- **Do poprawy:** weryfikacja fizycznej kamery.
- **Do wykonania:** ręczny przegląd PWA i UI na iPhonie oraz uzupełnienie statusów ilustracji po potwierdzeniu listy.
