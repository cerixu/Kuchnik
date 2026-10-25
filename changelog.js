/* ==========================================================================
   Kuchnik — dziennik zmian per wersja, wzorowany na sprawdzonym rozwiązaniu
   z Zaruok-App. Każde wydanie powinno mieć własny wpis.
   ========================================================================== */
export const CHANGELOG = Object.freeze({
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
