/* ==========================================================================
   Kuchnik — dziennik zmian per wersja, wzorowany na sprawdzonym rozwiązaniu
   z Zaruok-App. Każde wydanie powinno mieć własny wpis.
   ========================================================================== */
export const CHANGELOG = Object.freeze({
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
