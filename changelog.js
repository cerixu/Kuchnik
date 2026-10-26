/* ==========================================================================
   Kuchnik — dziennik zmian per wersja, wzorowany na sprawdzonym rozwiązaniu
   z Zaruok-App. Każde wydanie powinno mieć własny wpis.
   ========================================================================== */
export const CHANGELOG = Object.freeze({
  '1.4.50': Object.freeze({
    intro: 'Kuchnik 1.4.50 — cztery nowe ilustracje SVG w malarskim kierunku grafitowo-miedzianym.',
    items: [
      'Dodano dedykowane ilustracje Pad Thai z krewetkami, Spaghetti aglio e olio, Biryani z kurczakiem i Falafela.',
      'Każda receptura ma precyzyjne dopasowanie SVG; nie dodano ogólnych reguł przechwytujących inne dania.',
      'Wszystkie ilustracje są lokalne, samodzielne, dostępne i dodane do precache service workera.',
      'Firefly wygenerował referencje, a Adobe vectorize zgłosił powodzenie. Konektor udostępnił jedynie renderowane podglądy, nie bajty źródłowe SVG; repo zawiera niezależnie opracowane wektory, co opisano w ART-PACK-1.4.50-NOTES.md.'
    ],
    footer: 'Cztery nowe ilustracje są lokalne, opisane i objęte testami regresyjnymi.'
  }),
  '1.4.49': Object.freeze({
    intro: 'Kuchnik 1.4.49 — cztery nowe, szczegółowe ilustracje SVG w grafitowo-miedzianym kierunku Żarłoka.',
    items: [
      'Dodano dedykowane ilustracje spaghetti alla puttanesca, minestrone, moules marinières i quiche Lorraine.',
      'Minestrone ma własne mapowanie SVG zamiast generycznego zdjęcia zupy; pozostałe trzy potrawy również korzystają z precyzyjnych nazw.',
      'Pliki są lokalne, mają kwadratowy viewBox, title/desc, szczegółowe ścieżki i cache offline.',
      'Firefly i vectorize przygotowały referencje. Konektor nie udostępnił źródłowych bajtów SVG; repo zawiera niezależnie opracowane wektory, a blokada jest opisana w ART-PACK-1.4.49-NOTES.md.'
    ],
    footer: 'Cztery nowe ilustracje są lokalne, opisane i objęte testami regresyjnymi.'
  }),
  '1.4.48': Object.freeze({
    intro: 'Kuchnik 1.4.48 — cztery nowe, szczegółowe ilustracje SVG w grafitowo-miedzianym kierunku Żarłoka.',
    items: [
      'Dodano ilustracje Gnocchi z masłem szałwiowym, Tarte Tatin, Mussaka i Ramen shoyu.',
      'Poprawiono mapowanie gnocchi: wariant szałwiowy ma własną grafikę, a generyczne gnocchi nie przechwytuje receptur o innym sosie.',
      'Wszystkie cztery SVG są lokalne, opisane title/desc, mają kwadratowy viewBox i są uwzględnione w cache offline.',
      'Firefly i vectorize przygotowały referencje; konektor nie udostępnił źródłowych bajtów SVG. W repo zapisano niezależnie opracowane wektory, a ograniczenie udokumentowano w ART-PACK-1.4.48-NOTES.md.'
    ],
    footer: 'Cztery nowe ilustracje są lokalne, szczegółowe i gotowe do cache offline.'
  }),
  '1.4.47': Object.freeze({
    intro: 'Kuchnik 1.4.47 — cztery nowe ilustracje SVG w malarskim kierunku kulinarnym.',
    items: [
      'Dodano dedykowane ilustracje Cacio e pepe, Fish and chips, gulaszu węgierskiego i Gambas al ajillo.',
      'Grafiki mają kwadratowy viewBox, opisy title/desc, ponad 200 ścieżek każda i brak zewnętrznych zasobów.',
      'Dodano dokładne mapowania nazw, precache service workera oraz regresyjne testy bezpieczeństwa, rozmiaru i szczegółowości.',
      'Firefly i vectorize przygotowały materiały referencyjne; konektor nie udostępnił bajtów źródłowych SVG. Pliki w repo są niezależnie opracowanymi wektorami, a nie eksportami Adobe; szczegóły są w ART-PACK-1.4.47-NOTES.md.'
    ],
    footer: 'Cztery nowe ilustracje są lokalne, opisane i gotowe do cache offline.'
  }),
  '1.4.46': Object.freeze({
    intro: 'Kuchnik 1.4.46 — cztery nowe, szczegółowe ilustracje SVG.',
    items: [
      'Dodano lokalne ilustracje Coq au vin, Tom yum goong, Ratatouille niçoise i Crème brûlée.',
      'Każda grafika ma kwadratowy viewBox, opis dostępności i ponad 200 ścieżek wektorowych; pliki pozostają lekkie i samodzielne.',
      'Dodano dokładne mapowanie receptur, precache service workera oraz testy regresyjne i bezpieczeństwa.',
      'Weryfikacja Adobe: Firefly i vectorize wygenerowały materiały referencyjne, lecz dostępny konektor udostępniał podgląd PNG zamiast pobieralnego źródła SVG. Pliki w repo są więc niezależnie opracowanymi wektorami zastępczymi, nie eksportami Adobe.'
    ],
    footer: 'Cztery nowe ilustracje są lokalne, opisane i gotowe do użycia offline.'
  }),
  '1.4.45': Object.freeze({
    intro: 'Kuchnik 1.4.45 — korekta kadrów ilustracji SVG.',
    items: [
      'Poprawiono kwadratowe kadrowanie ramen tonkotsu, sushi maki i panna cotty; usunięto puste pasy tła bez przycinania potraw.',
      'Ponownie zwektoryzowano i zoptymalizowano ścieżki SVG do rozmiaru odpowiedniego dla kart mobilnych.',
      'Zachowano opisy title/desc, mapowania receptur, cache offline i pierwszeństwo własnych zdjęć użytkownika.',
      'Nie zmieniano zatwierdzonych wzorców Carbonary i Bruschetty ani danych użytkownika.'
    ],
    footer: 'Kadry są kwadratowe, grafiki lokalne i dostępne offline.'
  }),
  '1.4.44': Object.freeze({
    intro: 'Kuchnik 1.4.44 — cztery nowe, szczegółowe ilustracje SVG.',
    items: [
      'Dodano lokalne ilustracje dla Boeuf bourguignon, Paella de marisco, Parmigiana di melanzane i francuskiej zupy cebulowej.',
      'Grafiki wygenerowano w Adobe Firefly, zwektoryzowano i zoptymalizowano przez SVGO; każdy plik ma viewBox oraz opis dostępności.',
      'Dodano precyzyjne mapowanie receptur, cache service workera i regresyjne testy bezpieczeństwa, rozmiaru oraz szczegółowości ścieżek.',
      'Wszystkie zasoby pozostają lokalne i działają offline; własne zdjęcia użytkownika zachowują pierwszeństwo.'
    ],
    footer: 'Cztery nowe ilustracje są zintegrowane z biblioteką receptur i cache offline.'
  }),
  '1.4.43': Object.freeze({
    intro: 'Kuchnik 1.4.43 — cztery nowe, szczegółowe ilustracje potraw.',
    items: [
      'Dodano nowe ilustracje SVG dla ramen tonkotsu, sushi maki, sałatki Caesar i panna cotty.',
      'Grafiki wygenerowano w Adobe Firefly, zwektoryzowano i zoptymalizowano pod kątem czytelności na ekranie telefonu.',
      'Zachowano lokalne pliki, istniejące mapowania receptur, cache service workera i działanie offline bez zewnętrznych zasobów.',
      'Nie zmieniano zatwierdzonych wzorców Carbonary i Bruschetty ani danych użytkownika.'
    ],
    footer: 'Cztery nowe ilustracje są lokalne, opisane i gotowe do użycia offline.'
  }),
  '1.4.42': Object.freeze({
    intro: 'Kuchnik 1.4.42 — zaakceptowany wzorzec ilustracji potraw.',
    items: ['Podmieniono ilustracje Carbonary i Bruschetty na pliki SVG przekazane i zatwierdzone przez użytkownika.','Te dwa obrazy wyznaczają docelowy kierunek wizualny dla kolejnych ilustracji.','Odrzucono dalsze wdrażanie paczki ilustracji w poprzednim, uproszczonym stylu.','Zachowano lokalne pliki, cache offline i pierwszeństwo własnych zdjęć użytkownika.'],
    footer: 'Nowe ilustracje mają być dopasowane do zatwierdzonego wzorca.'
  }),
  '1.4.42': Object.freeze({
    intro: 'Kuchnik 1.4.42 — ilustracje w zatwierdzonym, szczegółowym stylu.',
    items: ['Podmieniono ilustracje carbonary i bruschetty na dwa dostarczone wzorce: dopracowane wektorowe potrawy na ceramicznych talerzach z realistycznym światłem i cieniowaniem.','Zdefiniowano wspólny kierunek dla kolejnych ilustracji: bez płaskich piktogramów, prostych ikonek i uproszczonych emoji.','Zoptymalizowano SVG bez zastępowania ich bitmapami; zachowano własne zdjęcia użytkownika jako priorytet.','Bez migracji bazy, zmian magazynu ani usuwania danych użytkownika.'],
    footer: 'Przyszłe ilustracje mają trzymać się wzorca carbonary i bruschetty.'
  }),
  '1.4.41': Object.freeze({
    intro: 'Kuchnik 1.4.41 — pakiet 20 nowych ilustracji SVG.',
    items: ['Dodano 20 lokalnych ilustracji potraw w spójnym kierunku graficznym ciemnej porcelany i ciepłych akcentów.','Rozszerzono mapowanie nazw receptur i cache offline.','Pliki SVG są samodzielne, opisane i bez zewnętrznych zależności.','Bez migracji bazy, zmian magazynu i usuwania danych użytkownika.'],
    footer: 'Ilustracje pozostają lekkimi, skalowalnymi plikami lokalnymi.'
  }),
  '1.4.40': Object.freeze({
    intro: 'Kuchnik 1.4.40 — trzy nowe ilustracje SVG działające offline.',
    items: [
      'Dodano autorskie ilustracje ramen tonkotsu, sushi maki i croissanta w spójnym stylu ciemnej porcelany.',
      'Rozszerzono precyzyjne dopasowanie ilustracji do nazw receptur.',
      'Nowe SVG są częścią cache service workera; brak sieci nie blokuje ich wyświetlania.',
      'Zdjęcia użytkownika nadal mają pierwszeństwo; bez zmian bazy i bez usuwania danych.'
    ],
    footer: 'Ilustracje są lekkie, wektorowe i skalują się na ekranach Retina.'
  }),
  '1.4.39': Object.freeze({
    intro: 'Kuchnik 1.4.39 — pojedyncze zapisy w trybie awaryjnym nie publikują zmian, których localStorage nie utrwalił.',
    items: [
      'Operacje put, putMany, delete i clear przygotowują nowy stan na osobnej mapie.',
      'Błąd zapisu odrzuca operację i zachowuje poprzedni stan pamięci oraz zapisany klucz.',
      'Dodano testy regresyjne awarii limitu pamięci dla wszystkich czterech operacji.',
      'Bez migracji IndexedDB i bez automatycznego usuwania danych.'
    ],
    footer: 'Po błędzie zapisu sprawdź stan pamięci w Ustawieniach i wykonaj kopię danych.'
  }),
  '1.4.38': Object.freeze({
    intro: 'Kuchnik 1.4.38 — transakcje magazynowe w trybie awaryjnym nie pozostawiają częściowych zmian.',
    items: [
      'Operacje wielomagazynowe są najpierw przygotowywane na odłączonych kopiach danych.',
      'Błąd callbacku nie zmienia pamięci ani localStorage.',
      'Jeśli zapis jednego z magazynów nie powiedzie się, wcześniejsze zapisy są cofane, a operacja zgłasza błąd.',
      'Dodano test regresyjny błędu callbacku i limitu pamięci; bez migracji IndexedDB.'
    ],
    footer: 'Dane istniejące przed transakcją pozostają zachowane.'
  }),
  '1.4.37': Object.freeze({
    intro: 'Kuchnik 1.4.37 — usuwanie produktu magazynowego nie rozjeżdża stanu pamięci.',
    items: [
      'Produkt znika z bieżącego widoku dopiero po potwierdzonym usunięciu z IndexedDB.',
      'Błąd zapisu nie powoduje zniknięcia produktu, który nadal istnieje w bazie.',
      'Dodano test regresyjny awarii usuwania; historia ruchów pozostaje nietknięta.'
    ],
    footer: 'Bez migracji bazy danych i bez kasowania historii magazynowej.'
  }),
  '1.4.36': Object.freeze({
    intro: 'Kuchnik 1.4.36 — zapis produktu magazynowego jest odporniejszy na błędy.',
    items: [
      'Nieudany zapis produktu nie publikuje niezapisanej zmiany w pamięci aplikacji.',
      'Jeśli edycja produktu zapisuje również ruch magazynowy, oba wpisy trafiają do jednej transakcji IndexedDB.',
      'Dodano test regresyjny awarii zapisu; istniejące dane i historia pozostają zachowane.'
    ],
    footer: 'Bez migracji bazy danych i bez usuwania istniejących danych.'
  }),
  '1.4.35': Object.freeze({
    intro: 'Kuchnik 1.4.35 — bezpieczniejsze przyjmowanie zakupów i odczyt magazynu.',
    items: [
      'Równoległe przyjęcie tej samej pozycji z listy zakupów nie nalicza drugi raz stanu ani historii ruchów.',
      'Błąd odczytu magazynu nie czyści ostatniego poprawnego widoku w pamięci; rozruch przechodzi do diagnostyki zamiast udawać pusty magazyn.',
      'Dodano testy regresyjne dla równoległych przyjęć i błędów odczytu.'
    ],
    footer: 'Bez migracji bazy danych. Istniejące receptury, stany i historia pozostają zachowane.'
  }),
  '1.4.34': Object.freeze({
    intro: 'Kuchnik 1.4.34 — kalkulator pizzy z aktywnym zakwasem 1:1:2.',
    items: [
      'Tryby „Mam mąkę” i „Na kulki” obsługują teraz również aktywny zakwas.',
      'Mąka i woda z zakwasu są wliczane do docelowej hydracji i masy ciasta; zakwas macierzysty jest ograniczony do 1% całkowitej mąki.',
      'Zapis receptury i lista zakupów uwzględniają osobno mąkę oraz wodę do dokarmienia zakwasu.',
      'Dodano testy bilansu masy, zgodności trybu kulek i obsługi nieprawidłowych danych liczbowych.'
    ],
    footer: 'Zachowano dotychczasowe ustawienia kalkulatora. Nie zmieniono ani nie usunięto danych receptur i magazynu.'
  }),
  '1.4.33': Object.freeze({
    intro: 'Kuchnik 1.4.33 — bezpieczniejsze operacje magazynowe.',
    items: [
      'Zmiana stanu i wpis historii są zapisywane w jednej transakcji.',
      'Odjęcie składników całej receptury odbywa się jako jedna operacja; awaria nie zostawia częściowo odjętych stanów.',
      'Cofnięcie kilku ruchów jest transakcyjne i ignoruje powtórzone identyfikatory, żeby nie cofnąć tego samego ruchu dwa razy.'
    ],
    footer: 'Brak migracji bazy. Receptury, ustawienia i istniejąca historia magazynu pozostają zachowane.'
  }),
  '1.4.32': Object.freeze({
    intro: 'Kuchnik 1.4.32 — dedykowana ilustracja tagliatelle al ragù.',
    items: [
      'Dodano lekką, lokalną ilustrację SVG tagliatelle al ragù (około 3,6 KB), przeniesioną ze sprawdzonego wariantu hybrydowego Żarłoka.',
      'Dopasowanie obejmuje konkretne nazwy tagliatelle z ragù lub sosem bolognese; nie przypisuje ilustracji przypadkowym daniom makaronowym.',
      'Plik znajduje się w cache Service Workera i jest objęty testami dostępności offline.'
    ],
    footer: 'Zdjęcia dodane przez użytkownika nadal mają pierwszeństwo. Nie zmieniono receptur ani danych magazynowych.'
  }),
  '1.4.31': Object.freeze({
    intro: 'Kuchnik 1.4.31 — cztery nowe ilustracje potraw.',
    items: [
      'Dodano lokalne ilustracje lasagne, gnocchi al pomodoro, bruschetty i panna cotty przeniesione z Żarłoka.',
      'Dopasowanie ilustracji opiera się na konkretnych nazwach potraw; zdjęcia dodane przez użytkownika nadal mają pierwszeństwo.',
      'Service worker zapisuje nowe ilustracje w cache, aby były dostępne offline.'
    ],
    footer: 'Dodano pliki graficzne i reguły dopasowania; dane użytkownika pozostają bez zmian.'
  }),
  '1.4.30': Object.freeze({
    intro: 'Kuchnik 1.4.30 — odporniejsza instalacja service workera.',
    items: [
      'Brak opcjonalnej ilustracji, ikony lub fontu nie blokuje instalacji aktualizacji.',
      'Wymagane pliki aplikacji nadal muszą zostać poprawnie zapisane w cache.',
      'Dodano test regresyjny symulujący brak jednego z opcjonalnych zasobów.'
    ],
    footer: 'Zmiana dotyczy wyłącznie cache plików. Receptury, ustawienia i historia magazynu pozostają bez zmian.'
  }),
  '1.4.29': Object.freeze({
    intro: 'Kuchnik 1.4.29 — ograniczenie czasu oczekiwania service workera.',
    items: [
      'Nawigacja nie czeka bez końca na sieć, jeśli odpowiedź nie istnieje jeszcze w cache.',
      'Przy dostępnej kopii aplikacja wraca do cache po krótkim limicie sieciowym.',
      'Dodano testy regresyjne dla braku cache, wolnej sieci i szybkiej odpowiedzi.'
    ],
    footer: 'Zmiana dotyczy wyłącznie pobierania zasobów; receptury, magazyn i historia pozostają bez zmian.'
  }),
  '1.4.28': Object.freeze({
    intro: 'Kuchnik 1.4.28 — test trwałości ulubionych.',
    items: [
      'Dodano test przeglądarkowy sprawdzający, czy zmiana ulubionej receptury przetrwa pełne przeładowanie aplikacji.',
      'Test przywraca początkowy stan ulubionej receptury i działa na odizolowanym profilu testowym.',
      'Poprzednia poprawka skanera EAN nadal ignoruje wyniki dekodowania, które docierają po zamknięciu okna skanera.'
    ],
    footer: 'Testy nie usuwają ani nie modyfikują danych z Twojego urządzenia.'
  }),
  '1.4.27': Object.freeze({
    intro: 'Kuchnik 1.4.27 — anulowanie skanera jest bezpieczniejsze.',
    items: [
      'Wynik dekodowania kodu EAN jest ignorowany, jeśli skaner został zamknięty w trakcie odczytu.',
      'Dodano test przeglądarkowy, który symuluje opóźniony odczyt kamery i sprawdza, czy po zamknięciu skanera nie otwiera się formularz produktu.',
      'Nie zmieniono danych magazynowych ani formatu kopii zapasowych.'
    ],
    footer: 'Skaner można bezpiecznie zamknąć również wtedy, gdy dekoder właśnie analizuje klatkę.'
  }),
  '1.4.26': Object.freeze({
    intro: 'Kuchnik 1.4.26 — bezpieczniejsze zakończenie rozruchu.',
    items: [
      'Jeśli globalny limit startu zostanie przekroczony, spóźnione operacje nie zamontują później interfejsu nad ekranem błędu.',
      'Dodano test regresyjny symulujący opóźnione wczytanie magazynu.',
      'Okno „Co nowego” korzysta teraz z osobnego dziennika wersji, dzięki czemu kolejne wydania mogą pokazywać tylko aktualne poprawki.'
    ],
    footer: 'Receptury, stany magazynowe i historia operacji pozostają bez zmian.'
  })
});
