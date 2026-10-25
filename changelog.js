/* ==========================================================================
   Kuchnik — dziennik zmian per wersja, wzorowany na sprawdzonym rozwiązaniu
   z Zaruok-App. Każde wydanie powinno mieć własny wpis.
   ========================================================================== */
export const CHANGELOG = Object.freeze({
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
