/* ==========================================================================
   Żarłok — dziennik zmian widoczny w oknie „Co nowego”.
   KAŻDE nowe wydanie musi mieć tutaj własny wpis. app.js wyświetla wpis
   odpowiadający APP_VERSION; test mobilny sprawdza jego obecność.
   ========================================================================== */

export const CHANGELOG = Object.freeze({
  '1.5.6': Object.freeze({
    intro: 'Kuchnik 1.5.6 — pewniejszy odczyt kodów kreskowych.',
    items: [
      'Skaner sprawdza kolejne kąty przed zaakceptowaniem EAN-8, ograniczając błędne odczyty fragmentów EAN-13.',
      'Zachowano odczyt kodów pod kątem, kontrolę cyfry EAN i opcjonalne wyszukiwanie nazwy produktu.',
      'Magazyn i automatyczne zużycie składników pozostają dostępne offline.'
    ]
  }),
  '1.5.5': Object.freeze({
    intro: 'Kuchnik 1.5.5 — spójne stany magazynu podczas całego gotowania.',
    items: [
      'Magazyn ładuje się już przy starcie, więc automatyczne zużycie działa także bez wcześniejszego otwierania zakładki Magazyn.',
      'Skaner EAN ma podgląd kamery, animowaną linię i przełącznik latarki.',
      'Dodawanie produktów, alerty terminów, niski stan i rejestrowanie strat działają w jednym ekranie.',
      'Zachowano działanie offline i lokalny zapis danych.'
    ]
  }),
  '1.5.4': Object.freeze({
    intro: 'Kuchnik 1.5.4 — szybsza praca z magazynem i kodami EAN.',
    items: [
      'Magazyn pozwala dodawać produkty, kontrolować niski stan i terminy oraz rejestrować straty.',
      'Skaner EAN używa kamery, ma linię skanowania i przełącznik latarki.',
      'Gotowanie i lista kontrolna mogą automatycznie odejmować zużyte składniki.',
      'Zdjęcia potraw i nowe ekrany są dostępne w pamięci offline.'
    ]
  }),
  '1.5.3': Object.freeze({
    intro: 'Kuchnik 1.5.3 — osobne ekrany gotowania i magazynu.',
    items: [
      'Dodano dedykowany ekran Gotuję z wyszukiwaniem receptur i szybkim dostępem do minutników.',
      'Dodano Magazyn: stany produktów, progi niskiego stanu, terminy, koszty strat i braki do zakupów.',
      'Przeniesiono kalkulatory, zakupy, wyszukiwanie i ustawienia do menu Więcej.',
      'Zachowano lokalny zapis danych i działanie offline.'
    ]
  }),
  '1.5.2': Object.freeze({
    intro: 'Kuchnik 1.5.2 — dopracowane zdjęcia potraw i aktualizacje offline.',
    items: [
      'Dodano 40 lokalnych fotografii dopasowanych do konkretnych potraw.',
      'Zdjęcia działają w kartach receptur i na ekranie szczegółów bez zewnętrznych API.',
      'Pamięć offline obejmuje wszystkie fotografie wykorzystywane przez moduł zdjęć.',
      'Poprawiono moment podpinania zdjęć podczas pierwszego renderowania na iPhonie.',
      'Zachowano tryb profesjonalny i amatorski oraz istniejące dane użytkownika.'
    ]
  }),
  '1.5.1': Object.freeze({
    intro: 'Kuchnik 1.5.1 — większa biblioteka zdjęć i pewniejsze działanie offline.',
    items: [
      'Dodano 40 lokalnych fotografii dopasowanych do konkretnych potraw.',
      'Zdjęcia są ładowane na kartach receptur i na ekranie szczegółów bez zewnętrznych API.',
      'Wszystkie zdjęcia używane przez moduł fotografii trafiają do pamięci offline.',
      'Poprawiono ładowanie zdjęć podczas pierwszego renderowania na iPhonie.',
      'Zachowano tryb profesjonalny i amatorski oraz istniejące dane użytkownika.'
    ]
  }),
  '1.5.0': Object.freeze({
    intro: 'Kuchnik 1.5.0 — dopracowany wygląd i więcej lokalnych receptur.',
    items: [
      'Dodano kolejną wyselekcjonowaną porcję receptur z opisami i instrukcjami po polsku.',
      'Dopasowane fotografie potraw działają lokalnie i mogą być używane bez internetu.',
      'Odświeżono wygląd aplikacji i pamięć podręczną dla trybu offline.',
      'Zachowano ilustracje zastępcze, gdy nie ma pewnego zdjęcia konkretnego dania.'
    ]
  }),
  '2.1.9': Object.freeze({
    intro: 'Żarłok 2.1.9 — nowy, autorski zestaw fotografii dań przygotowany w Adobe Firefly.',
    items: [
      'Wymieniono 40 lokalnych fotografii na osobno wygenerowane zdjęcia dopasowane do konkretnych potraw.',
      'Zdjęcia są przechowywane lokalnie w aplikacji i mogą działać offline po zapisaniu w pamięci podręcznej.',
      'Zachowano ilustrację zastępczą, gdy brak pewnego dopasowania do konkretnej potrawy.',
      'Odświeżono wersję aplikacji i pamięci podręcznej, aby pobrać nowy zestaw zdjęć.'
    ]
  }),
  '2.1.8': Object.freeze({
    intro: 'Żarłok 2.1.8 — spójniejsze zdjęcia i bezpieczniejsze dopasowanie potraw.',
    items: [
      'Usunięto powtórzone reguły przypisywania zdjęć do receptur.',
      'Nieznana potrawa nie dostaje już automatycznie zdjęcia deseru — pozostaje jej ilustracja zastępcza.',
      'Ujednolicono kadrowanie, tła i obramowania zdjęć w kartach na iPhonie.',
      'Kategorie bez pasującej fotografii, takie jak sosy bazowe i prep, zachowują ilustrację zamiast pokazywać przypadkowe danie.',
      'Odświeżono wersję pamięci podręcznej dla aktualizacji aplikacji i pracy offline.'
    ]
  }),
  '2.1.6': Object.freeze({
    intro: 'Poprawiona fotografia na ekranie Start — bez widocznej ciemnej ramki i nakładki.',
    items: [
      'Zdjęcie wyróżnionego przepisu wypełnia cały zaokrąglony kafel.',
      'Usunięto dodatkowe tło spod tekstu i skorygowano kadr fotografii.',
      'Zaktualizowano pamięć podręczną dla Safari i trybu offline.'
    ]
  }),
  '2.1.5': Object.freeze({
    intro: 'Żarłok 2.1.5 — nowy kierunek graficzny inspirowany iOS i szkłem.',
    items: [
      'Dodano spójną warstwę graficzną: grafitowe powierzchnie, miedziane akcenty i subtelne szkło.',
      'Dopracowano stany aktywne, pola formularzy, kafelki, przyciski i dolną nawigację.',
      'Zachowano tryb offline, lokalne zasoby i obsługę ograniczenia animacji.',
      'Przygotowano autorskie materiały art direction w Adobe Firefly do dalszej integracji.'
    ]
  }),
  '2.1.4': Object.freeze({
    intro: 'Żarłok 2.1.4 — uporządkowany ekran receptur na iPhonie.',
    items: [
      'Zdjęcia receptur mają wspólne proporcje, stabilne kadrowanie i spokojniejszą obróbkę kolorów.',
      'Bagietka ma teraz osobną fotografię zamiast zdjęcia okrągłego bochenka na zakwasie.',
      'Wyłączono rozmycie animowane przy ładowaniu zdjęć.',
      'Dolna nawigacja jest niższa, ma bardziej czytelne zakładki i nie zasłania końca listy.',
      'Poprawiono wykrywanie klawiatury iOS, aby komunikaty aktualizacji nie pojawiały się nad wyszukiwarką.'
    ],
  }),
  '2.1.3': Object.freeze({
    intro: 'Żarłok 2.1.3 — spójniejsze ikony i dokładniejsze dopasowanie zdjęć.',
    items: [
      'Kafelki kategorii korzystają z jednego zestawu ikon SVG zamiast mieszaniny emoji.',
      'Cynamon, sól i pieprz mają odrębne symbole składników.',
      'Zdjęcie Moscow Mule nie jest już przypisywane do innych koktajli; Aperol Spritz zachowuje własną fotografię.',
      'Poprawki grafiki nie zmieniają receptur ani stanów magazynowych.'
    ],
  }),
  '2.1.2': Object.freeze({
    intro: 'Żarłok 2.1.2 — dopracowany interfejs mobilny.',
    items: [
      'Ujednolicono odstępy, pola wyszukiwania, filtry i siatkę receptur na iPhonie.',
      'Poprawiono czytelność aktywnych filtrów i głównego przycisku oraz zachowanie elementów dotykowych.',
      'Dopracowano kontrast w jasnym motywie i uwzględniono ustawienie ograniczenia animacji.',
      'Bez zmian w recepturach, magazynie, kalkulatorach i formacie danych.'
    ],
  }),
  '2.1.1': Object.freeze({
    intro: 'Żarłok 2.1.1 — pewniejsze przygotowanie aplikacji do pracy offline.',
    items: [
      'Brak pojedynczego zdjęcia, ikony lub fontu nie blokuje już instalacji całego Service Workera.',
      'Pliki niezbędne do uruchomienia aplikacji nadal są wymagane podczas aktualizacji — nie ukrywamy braków kodu.',
      'Nie zmieniono receptur, stanów magazynowych ani formatu kopii zapasowych.'
    ],
  }),
  '2.1.0': Object.freeze({
    intro: 'Żarłok 2.1 — przebudowany interfejs na iPhone, oparty na zdjęciach i wyraźnej hierarchii.',
    items: [
      'Ekran Start ma teraz duży fotograficzny panel dania, skróty w kaflach i czytelniejsze karty magazynu oraz zakupów.',
      'Receptury i kategorie korzystają z większych, uporządkowanych kafli zamiast drobnych, okrągłych elementów.',
      'Karta receptury, pola, okna i dolny dock otrzymały jeden spójny system powierzchni, odstępów i akcentów.',
      'Zachowano dotychczasową logikę, zapis danych, wyszukiwanie, magazyn i działanie offline.'
    ],
  }),
  '2.0.1': Object.freeze({
    intro: 'Żarłok 2.0.1 — fotograficzny interfejs i 38 zdjęć potraw dostępnych offline.',
    items: [
      'Dodano 38 lokalnych fotografii potraw: od pizzy, makaronów i zup po pierogi, pieczywo, desery, dania azjatyckie i koktajle.',
      'Ekran Start, karty receptur, szczegóły dań i widok Gotuję korzystają z większych zdjęć dopasowanych do potraw.',
      'Własne zdjęcia zapisane przy recepturze nadal mają pierwszeństwo, a lokalna ilustracja SVG pozostaje awaryjnym fallbackiem.',
      'Wszystkie fotografie są zapisane w aplikacji i buforowane przez Service Workera, także do pracy offline.',
      'Zachowano zapisane receptury, ustawienia i magazyn; zmiany dotyczą warstwy wizualnej i zdjęć.'
    ],
  }),
  '2.0.0': Object.freeze({
    intro: 'Żarłok 2.0 — prawdziwe zdjęcia potraw działające także offline.',
    items: [
      'Dodano cztery oryginalne zdjęcia potraw: pizzę Margherita, carbonarę, risotto ai funghi i łososia z masłem cytrynowym.',
      'Zdjęcia są przechowywane lokalnie w aplikacji zamiast na zewnętrznym serwerze, więc działają stabilniej i po utracie połączenia.',
      'Nowe zdjęcia są wstępnie buforowane przez Service Workera i mają lokalne ilustracje SVG jako awaryjny fallback.',
      'Poprawiono dopasowanie zdjęcia risotta i odświeżono cache aplikacji do wersji 2.0.0.'
    ],
  }),
  '1.9.31': Object.freeze({
    intro: 'Oryginalne zdjęcia potraw i bardziej dopracowane mikroanimacje.',
    items: [
      'Wygenerowane w Adobe Firefly zdjęcia pizzy, carbonary, risotta i łososia są przypisane do pasujących receptur.',
      'Jeśli zdjęcie nie załaduje się lub aplikacja działa offline, automatycznie wraca ilustracja SVG.',
      'Dodano subtelne wejście zdjęć, zoom kart, sprężyste serca ulubionych i lepsze stany fokusu.',
      'Ustawienie systemowe „Ogranicz ruch” wyłącza dodatkowe animacje.'
    ],
  }),
  '1.9.30': Object.freeze({
    intro: 'Dopracowane animacje i płynniejsze reakcje interfejsu.',
    items: [
      'Sekcje pojawiają się łagodnie, a aktywne zakładki i ulubione mają krótką animację sprężystą.',
      'Karty receptur, kategorie i okna dialogowe reagują subtelniej na dotyk.',
      'Animacje respektują systemowe ustawienie „Ogranicz ruch”.',
      'Dotychczasowe ilustracje SVG pozostają dostępne jako niezależny od sieci fallback.'
    ],
  }),

  '1.9.29': Object.freeze({
    intro: 'Nowa, spójna szata graficzna Żarłoka — dopracowana pod iPhone’a.',
    items: [
      'Ujednolicono szkło Liquid Glass, tła, karty i obramowania w całej aplikacji.',
      'Zdjęcia receptur otrzymały bardziej dopracowaną oprawę, a typografia wyraźniejszą hierarchię.',
      'Dolna nawigacja stała się pływającym, czytelnym dokiem; główne przyciski mają spójny miedziany akcent.',
      'Dopracowano pola, okna, magazyn i zachowanie na wąskich ekranach. Funkcje aplikacji pozostają bez zmian.'
    ],
  }),

  '1.9.28': Object.freeze({
    intro: 'Magazyn rozpoznaje osobne partie produktów i pilnuje kolejności zużycia.',
    items: [
      'Każda nowa dostawa może być zapisana jako osobna partia z własną ilością, datą przyjęcia, terminem i ceną.',
      'Podczas gotowania składniki są odliczane najpierw z partii z najbliższym terminem (FEFO), a przy remisie ze starszej dostawy (FIFO).',
      'Stary stan magazynowy jest automatycznie zachowywany jako partia legacy; dotychczasowe dane nie są zerowane.',
      'Kopie zapasowe, import, scalanie i czyszczenie obejmują również partie magazynowe.'
    ],
    footer: 'Stan widoczny na karcie produktu nadal jest sumą wszystkich partii. Stare pozycje bez terminu pozostają bez daty do czasu dodania partii z terminem.'
  }),
  '1.9.27': Object.freeze({
    intro: 'Pilnuj terminów przydatności bezpośrednio w magazynie.',
    items: [
      'Do produktu magazynowego można dodać termin przydatności.',
      'Magazyn pokazuje osobne liczniki produktów po terminie i z terminem w ciągu 3 dni.',
      'Pilne pozycje mają wyróżnione ostrzeżenia na kartach i w panelu „Terminy do sprawdzenia”.',
      'Panel i oznaczenia działają lokalnie, również bez połączenia z internetem.'
    ],
    footer: 'Termin jest przypisany do całego wpisu produktu, a nie do poszczególnych partii.'
  }),
  '1.9.26': Object.freeze({
    intro: 'Bezpieczniejsze kopie i bardziej precyzyjny magazyn.',
    items: [
      'Kopie zapasowe obejmują teraz produkty magazynowe i pełną historię ruchów; import, scalanie i czyszczenie uwzględniają oba magazyny danych.',
      'Przy scalaniu kopii nowszy stan produktu wygrywa, a istniejące ruchy nie są duplikowane. Starsze kopie bez magazynu nadal można importować.',
      'Dopasowanie nazw rozpoznaje typowe odmiany polskie, a sztuki można przeliczyć na gramy tylko dla produktów z oszacowaną masą pojedynczej sztuki.',
      'Karty magazynu zyskały spójne piktogramy składników, również w jasnym motywie.'
    ],
    footer: 'Masa pojedynczej sztuki jest orientacyjna. Gdy nie ma wiarygodnego przelicznika, Żarłok nie zgaduje konwersji.'
  }),
  '1.9.25': Object.freeze({
    intro: 'Dokładniejsze ilustracje receptur i dodatków.',
    items: [
      'Poprawiono ilustracje 25 pozycji, które wcześniej dziedziczyły zbyt ogólny lub mylący obrazek kategorii.',
      'Wieprzowina, pierogi z mięsem, risotto, frytki, ziemniaki puree i pieczone, ryż jaśminowy oraz kasze otrzymały trafniejsze motywy.',
      'Dopracowano ilustracje wybranych sosów i dodatków — m.in. pesto, beszamelu, aioli, chimichurri, satayu orzechowego, winegretu, gremolaty i colesława.',
      'Rozszerzono automatyczny audyt przypisań ilustracji, aby wychwytywał te konkretne przypadki przy kolejnych zmianach.'
    ],
    footer: 'Ilustracje są wbudowane w aplikację i działają także bez połączenia z internetem.'
  }),
  '1.9.24': Object.freeze({
    intro: 'Naprawiono informacje o wydaniu i uzupełniono brakujące podsumowanie ostatnich poprawek.',
    items: [
      'Okno „Co nowego” opisuje teraz konkretne zmiany aktualnej wersji zamiast stale powtarzać nieaktualną listę starszych funkcji.',
      'Uzupełniono opis dziewięciu receptur wokowych: instrukcje smażenia są dopasowane do produktu, a kroki Pad See Ew mają czytelniejszą kolejność.',
      'W „Tofu z czarnym pieprzem” sos ostrygowy zastąpiono sosem sojowym; automatyczny audyt sprawdza, czy wegetariańska receptura nie zawiera sosu ostrygowego.',
      'Poprawiono semantyczne ikony składników: bazylia i świeże zioła mają ikonę liści, a świeża papryka jest odróżniona od papryki mielonej i wędzonej.',
      'Dopracowano dobór ilustracji receptur: tofu i kaczka mają własne motywy, dania Pad See Ew/Pad Thai używają ilustracji makaronu azjatyckiego, a smażony ryż — ilustracji ryżu.'
    ],
    footer: 'Twoje zapisane receptury, ustawienia i magazyn pozostają na tym urządzeniu.'
  }),
  '1.9.23': Object.freeze({
    intro: 'Dopracowanie dań z woka.',
    items: [
      'Dopracowano dziewięć receptur wokowych — ogólne „obsmaż białko” zastąpiono instrukcjami dopasowanymi do kurczaka, wołowiny, krewetek, tofu, wieprzowiny i kaczki.',
      'Poprawiono kolejność i czytelność kroków w Pad See Ew.',
      'W wegetariańskim przepisie na tofu z czarnym pieprzem sos ostrygowy zastąpiono sosem sojowym; rozszerzono audyt receptur i odświeżono cache PWA.'
    ],
    footer: 'Aktualizacja odświeżała też pliki aplikacji zapisane do pracy offline.'
  }),
  '1.9.22': Object.freeze({
    intro: 'Poprawki językowe i jakości danych receptur.',
    items: [
      'Poprawiono polską odmianę i treść kroków w dwunastu recepturach z wołowiną, wieprzowiną, kaczką, bazylią tajską, Pad See Ew, sosem orzechowym i Kung Pao.',
      'Rozszerzono audyt danych, aby wychwytywał błędne formy nazw mięs w instrukcjach.'
    ],
    footer: 'Dane receptur zostały sprawdzone automatycznie przed publikacją.'
  })
});
