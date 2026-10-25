/* ==========================================================================
   Kuchnik — dziennik zmian per wersja, wzorowany na sprawdzonym rozwiązaniu
   z Zaruok-App. Każde wydanie powinno mieć własny wpis.
   ========================================================================== */
export const CHANGELOG = Object.freeze({
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
