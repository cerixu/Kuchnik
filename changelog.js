/* ==========================================================================
   Kuchnik — dziennik zmian per wersja, wzorowany na sprawdzonym rozwiązaniu
   z Zaruok-App. Każde wydanie powinno mieć własny wpis.
   ========================================================================== */
export const CHANGELOG = Object.freeze({
  '1.4.98': Object.freeze({
    intro: 'ŻARŁOK / Kuchnik 1.4.98 — szybsze odświeżanie statycznych plików i lekki start PWA.',
    items: ['Pliki JavaScript i CSS korzystają z cache od razu, a nowa kopia pobiera się w tle.', 'Pierwsza instalacja nie ściąga już całej biblioteki 228 ilustracji dań.', 'W Ustawieniach można pobrać cały pakiet offline, śledzić postęp i bezpiecznie przerwać.'],
    footer: 'Lokalne ilustracje, kopie zapasowe i dane użytkownika są zachowane.'
  }),

  '1.4.97': Object.freeze({
    intro: 'ŻARŁOK / Kuchnik 1.4.97 — szybszy start i pełna biblioteka rysunków offline na życzenie.',
    items: ['Nowa instalacja zapisuje najpierw powłokę aplikacji, a rysunki dań buforuje podczas oglądania przepisów.', 'W Ustawieniach można pobrać wszystkie 228 ilustracji offline, sprawdzić postęp i przerwać pobieranie.', 'Aktualizacja zachowuje wcześniej zapisane ilustracje i udostępnia je nowej wersji bez ponownego transferu.'],
    footer: 'Dane użytkownika i wszystkie przepisy pozostają bez zmian.'
  }),

  '1.4.96': Object.freeze({
    intro: 'ŻARŁOK / Kuchnik 1.4.96 — wyrównane menu i spokojniejsze ilustracje kategorii.',
    items: ['Nagłówek po przewinięciu zakrywa karty równą, ciemną taflą szkła, a pasek przewijania nie odciąga uwagi od treści.', 'Kuchnie świata i kategorie mają prostsze, spójne obramowania oraz większe, wyśrodkowane własne rysunki.', 'Ilustracje dań w karuzeli są powiększone i wycentrowane; dolne zakładki mają równe pola i podpisy.'],
    footer: 'Zachowano dotychczasowe przepisy, funkcje i własne ilustracje.'
  }),

  '1.4.95': Object.freeze({
    intro: 'ŻARŁOK / Kuchnik 1.4.95 — uporządkowane menu i spójne ekrany.',
    items: ['Skróty na ekranie Start zostały podzielone na Gotowanie, Twoją bibliotekę, Zapasy i zakupy oraz Odkrywaj.', 'Przyciski, karty, pola i nagłówki dostały wspólną grafitowo-miedzianą oprawę z ręcznie kreskowanymi detalami.', 'Dolny pasek ma równy układ pięciu zakładek i wycentrowane podpisy na iPhonie.'],
    footer: 'Wszystkie dotychczasowe funkcje, receptury i dane użytkownika pozostają zachowane.'
  }),

  '1.4.94': Object.freeze({
    intro: 'ŻARŁOK / Kuchnik 1.4.94 — mieszanki mąk i dwustopniowa fermentacja pizzy.',
    items: ['Kalkulator pozwala łączyć mąki Caputo w dowolnych proporcjach części, pokazuje przeliczone udziały oraz średnie ważone W, białka i hydracji.', 'Dodano fermentację w dwóch etapach: wybierz 6, 7 lub 8 godzin w temperaturze pokojowej, a następnie 48 godzin w lodówce; podpowiedź drożdży uwzględnia oba etapy.', 'Zapis receptury i lista zakupów zachowują wybrane mąki oraz ich proporcje.'],
    footer: 'Dotychczasowe ustawienia kalkulatora i dane użytkownika pozostają zachowane.'
  }),
  '1.4.93': Object.freeze({
    intro: 'ŻARŁOK / Kuchnik 1.4.93 — autorskie rysunki i odświeżony szklany dok.',
    items: ['Dolna nawigacja została wycentrowana i otrzymała pięć ręcznie narysowanych znaków oraz wielowarstwową powierzchnię Liquid Glass.', 'Kuchnie świata i kategorie korzystają teraz z własnych wektorowych rysunków w grafitowej, kremowej i miedzianej palecie.', 'Ozdobne emoji usunięto z widocznych części aplikacji; stare ikony zapisane przy kategoriach pozostają zgodne i wyświetlają nowy rysunek.'],
    footer: 'Przepisy, ilustracje, ustawienia i dane w IndexedDB pozostają bez zmian.'
  }),
  '1.4.92': Object.freeze({
    intro: 'ŻARŁOK / Kuchnik 1.4.92 — spójne nazwy aplikacji.',
    items: ['Komunikat aktualizacji Service Workera, źródło przykładowych receptur i eksport listy zakupów używają teraz nazwy ŻARŁOK / Kuchnik.', 'Starsze receptury ze źródłem „Kucharzyna” są wyświetlane pod nową nazwą.'],
    footer: 'Dotychczasowe kopie zapasowe pozostają zgodne.'
  }),
  '1.4.91': Object.freeze({
    intro: 'ŻARŁOK / Kuchnik 1.4.91 — spokojne, grafitowe tło.',
    items: ['Usunięto starą rasterową teksturę z tła ekranu, która przykrywała treść kreskami.', 'Pozostawiono subtelną miedzianą poświatę i delikatny własny wzór na przyciskach.'],
    footer: 'Nowe menu i ekran Start z 1.4.90 pozostają bez zmian.'
  }),
  '1.4.90': Object.freeze({
    intro: 'ŻARŁOK / Kuchnik 1.4.90 — nowe menu i spokojniejszy ekran startowy.',
    items: ['Przebudowano dolny pasek: wyśrodkowana szklana kapsuła, własne piktogramy i wyraźny aktywny widok.', 'Ekran Start dostał widoczny znak ŻARŁOK / Kuchnik, przycisk losowania i czytelniejszą sekcję skrótów; karuzela dań została zachowana.', 'Ustawienia mają teraz spójne nagłówki z ikonami i nie pokazują pustej informacji o motywie.', 'Przyciszono fakturę kreskową tła, zachowując ją jako subtelny akcent na przyciskach.'],
    footer: 'Przepisy, ustawienia i zapisane dane pozostają bez zmian.'
  }),
  '1.4.89': Object.freeze({
    intro: 'ŻARŁOK / Kuchnik 1.4.89 — komplet rysunkowych ikon składników.',
    items: ['Dodano 48 nowych ilustracji kredką; biblioteka składników liczy teraz 84 lokalne grafiki.', 'Poprawiono mapowanie wszystkich 567 nazw składników z bazy 228 przepisów, w tym przypadki wcześniej kierowane do niewłaściwych kategorii.', 'Service Worker buforuje całą bibliotekę ikon do pracy offline.', 'Przyciszono powtarzającą się fakturę tła, zostawiając ciemną, spójną oprawę aplikacji.'],
    footer: 'Dane, przepisy i ustawienia użytkownika pozostają bez zmian.'
  }),
  '1.4.88': Object.freeze({
    intro: 'ŻARŁOK / Kuchnik 1.4.88 — spójna grafitowa oprawa dla całej aplikacji.',
    items: ['Ujednolicono karty, przyciski, pola i pasek nawigacji w ciemnej palecie grafitu i miedzi.', 'Usunięto jasne powierzchnie kart i ograniczono widoczność faktury tła, zachowując rysunkowy charakter ilustracji.'],
    footer: 'Przepisy, ustawienia i dane użytkownika pozostają bez zmian.'
  }),
  '1.4.87': Object.freeze({
    intro: 'ŻARŁOK / Kuchnik 1.4.87 — kreskowy interfejs i nowy kalkulator mąk do pizzy.',
    items: ['Nowy ciemny wygląd, wyśrodkowane ilustracje i odświeżony dolny pasek.', 'Dodano kredkowe ilustracje składników oraz ikonę ŻARŁOK.', 'Kalkulator ciasta uwzględnia cztery mąki Caputo, suwaki i podpowiedzi o hydracji oraz fermentacji.', 'Ustawienia interfejsu uproszczono do stałego ciemnego stylu.'],
    footer: 'Dotychczasowe przepisy i ich ilustracje pozostają na miejscu.'
  }),
  '1.4.86': Object.freeze({
    intro: 'Kuchnik 1.4.86 — uzupełnienie ilustracji widocznych na stronie.',
    items: ['Dodano rysunki kredką dla Carbonary, Pizza Napoletana i sosu pomidorowego.', 'Baza aplikacji obejmuje teraz 228 mapowań i osobnych grafik.'],
    footer: 'Galeria: 228 ilustracji, 0 brakujących.'
  }),
  '1.4.85': Object.freeze({
    intro: 'Kuchnik 1.4.85 — komplet ilustracji dla wszystkich 225 przepisów.',
    items: ['Dodano ostatnie siedem rysunków: Whisky sour, Gin tonic, Caipirinha, Bloody Mary, Hugo, Grzaniec i Lemonada domowa.', 'Każdy przepis w bazie ma teraz własny plik PNG oraz mapowanie; lista braków jest pusta.'],
    footer: 'Galeria: 225 ilustracji w repo, 0 przepisów do wykonania.'
  }),
  '1.4.84': Object.freeze({
    intro: 'Kuchnik 1.4.84 — partia 26 ilustracji kredkowych.',
    items: ['Dodano ciasto na pierogi, zakwas żytni, marynatę do kurczaka, nachos z serem, frytki z piekarnika, kanapkę club, Cosmopolitan, Daiquiri, Moscow Mule i Piña coladę.', 'Każdy przepis ma własny plik PNG, osobne mapowanie i status pending.'],
    footer: 'Galeria: 218 ilustracji w repo, 7 przepisów do wykonania.'
  }),
  '1.4.83': Object.freeze({
    intro: 'Kuchnik 1.4.83 — partia 25 ilustracji kredkowych.',
    items: ['Dodano mus czekoladowy, sernik nowojorski, tartę cytrynową, ciasto czekoladowe bez mąki, biszkopt, bulion warzywny, sos BBQ, sos czosnkowy, dżem truskawkowy i kruche ciasto.', 'Każdy przepis ma własny plik PNG, osobne mapowanie i status pending.'],
    footer: 'Galeria: 208 ilustracji w repo, 17 przepisów do wykonania.'
  }),
  '1.4.82': Object.freeze({
    intro: 'Kuchnik 1.4.82 — partia 24 ilustracji kredkowych.',
    items: ['Dodano placuszki bananowe, curry z ciecierzycy, kotlety z soczewicy, burgera wegańskiego, tofu z warzywami, krem z brokułów, zapiekankę makaronową, muffinki, ciastka owsiane i lody waniliowe.', 'Każdy przepis ma własny plik PNG, osobne mapowanie i status pending.'],
    footer: 'Galeria: 198 ilustracji w repo, 27 przepisów do wykonania.'
  }),
  '1.4.81': Object.freeze({
    intro: 'Kuchnik 1.4.81 — partia 23 ilustracji kredkowych.',
    items: ['Dodano langosz, boeuf Stroganow, chaczapuri, tagine z kurczakiem, Shepherd’s pie, owsiankę, tosty francuskie, granolę, tost z awokado i smoothie bowl.', 'Każdy przepis ma własny plik PNG, osobne mapowanie i status pending.'],
    footer: 'Galeria: 188 ilustracji w repo, 37 przepisów do wykonania.'
  }),
  '1.4.80': Object.freeze({
    intro: 'Kuchnik 1.4.80 — partia 22 ilustracji kredkowych.',
    items: ['Dodano satay, dal, biryani, tabbouleh, baba ganoush, koftę, shawarmę, käsespätzle, currywurst i leczo.', 'Każdy przepis ma własny plik PNG, osobne mapowanie i status pending.'],
    footer: 'Galeria: 178 ilustracji w repo, 47 przepisów do wykonania.'
  }),
  '1.4.79': Object.freeze({
    intro: 'Kuchnik 1.4.79 — partia 21 ilustracji kredkowych.',
    items: ['Dodano skrzydełka buffalo, sałatkę Cobb, sushi maki z ogórkiem i łososiem, zielone curry, kurczaka teriyaki, smażony ryż z jajkiem, pho bo, gyoza, kung pao i zupę miso.', 'Każdy przepis ma własny plik PNG, osobne mapowanie i status pending.'],
    footer: 'Galeria: 168 ilustracji w repo, 57 przepisów do wykonania.'
  }),
  '1.4.78': Object.freeze({
    intro: 'Kuchnik 1.4.78 — partia 20 ilustracji kredkowych.',
    items: ['Dodano mussakę, souvlaki, spanakopitę, quesadillę z kurczakiem, enchiladas, pico de gallo, burrito bowl, mac and cheese, BBQ ribs i pulled pork.', 'Każdy przepis ma własny plik PNG, osobne mapowanie i status pending.'],
    footer: 'Galeria: 158 ilustracji w repo, 67 przepisów do wykonania.'
  }),
  '1.4.77': Object.freeze({
    intro: 'Kuchnik 1.4.77 — aktualizacja kontroli ilustracji.',
    items: ['Zaktualizowano sprawdzenie regresji: Minestrone ma teraz własną grafikę, a brak grafiki sprawdzany jest niezależnie.'],
    footer: 'Galeria: 148 ilustracji w repo, 77 przepisów do wykonania.'
  }),
  '1.4.76': Object.freeze({
    intro: 'Kuchnik 1.4.76 — partia 19 ilustracji kredkowych.',
    items: ['Dodano parmigianę, zupę cebulową, boeuf bourguignon, croque monsieur, moules marinières, sałatkę niçoise, tartę tatin, crêpes, patatas bravas i albóndigas.', 'Każdy przepis ma własny plik PNG, osobne mapowanie i status pending.'],
    footer: 'Galeria: 148 ilustracji w repo, 77 przepisów do wykonania.'
  }),
  '1.4.75': Object.freeze({
    intro: 'Kuchnik 1.4.75 — partia 18 ilustracji kredkowych.',
    items: ['Dodano risotto alla milanese, gnocchi z masłem szałwiowym, spaghetti alla puttanesca i all’amatriciana, ragù alla bolognese, penne all’arrabbiata, fettuccine Alfredo, minestrone, panzanellę i saltimbocca alla romana.', 'Każdy przepis ma własny plik PNG, osobne mapowanie i status pending.'],
    footer: 'Galeria: 138 ilustracji w repo, 87 przepisów do wykonania.'
  }),
  '1.4.74': Object.freeze({
    intro: 'Kuchnik 1.4.74 — partia 17 ilustracji kredkowych.',
    items: ['Dodano faworki, kisiel żurawinowy, ciasto marchewkowe, placek drożdżowy ze śliwkami, kutię, pierniczki, śledzie w śmietanie, pastę jajeczną, smalec ze skwarkami i uszka do barszczu.', 'Każdy przepis ma własny plik PNG, osobne mapowanie i status pending.'],
    footer: 'Galeria: 128 ilustracji w repo, 97 przepisów do wykonania.'
  }),
  '1.4.73': Object.freeze({
    intro: 'Kuchnik 1.4.73 — partia 16 ilustracji kredkowych.',
    items: [
      'Dodano łazanki z kapustą, kapustę zasmażaną, buraczki, ogórki kiszone, fasolkę z bułką tartą, sernik na zimno, drożdżówkę z serem, babkę piaskową, mazurek kajmakowy i pączki.',
      'Każdy przepis ma własny plik PNG, osobne mapowanie i status pending.'
    ],
    footer: 'Galeria: 118 ilustracji w repo, 107 przepisów do wykonania.'
  }),
  '1.4.72': Object.freeze({
    intro: 'Kuchnik 1.4.72 — dziesięć kolejnych ilustracji kredkowych.',
    items: [
      'Dodano zupę koperkową, flaki, chłodnik litewski, zupę szczawiową, grochówkę, zupę fasolową, zrazy, wątróbkę z cebulą, żeberka w miodzie i schab pieczony.',
      'Każdy przepis ma własny plik PNG, osobne mapowanie i status pending.'
    ],
    footer: 'Galeria: 108 ilustracji w repo, 117 przepisów do wykonania.'
  }),
  '1.4.71': Object.freeze({
    intro: 'Kuchnik 1.4.71 — dziesięć kolejnych rysunków kredkowych.',
    items: [
      'Dodano ilustracje pancakes amerykańskich, dwóch rodzajów chleba, pięciu koktajli i krupniku.',
      'Każdy przepis otrzymał osobny lokalny plik i dokładne mapowanie.',
      'Poprawiono test zdjęć użytkownika: helper ilustracji nie ustawia bezpośrednio fotografii dodanej przez użytkownika.'
    ],
    footer: 'Galeria: 98 ilustracji w repo, 127 przepisów do wykonania.'
  }),
  '1.4.70': Object.freeze({
    intro: 'Kuchnik 1.4.70 — kolejna partia ilustracji i aktualizacja regresji.',
    items: [
      'Dodano rysunki sosu beszamelowego, sosu holenderskiego, majonezu, vinaigrette, bulionu drobiowego, masła ziołowego, karmelizowanej cebuli, marynowanej czerwonej cebuli, gambas al ajillo i crème brûlée.',
      'Każdy przepis ma własny plik PNG; rejestr ma 88 zaznaczonych receptur i 137 pozostałych.',
      'Test regresji uwzględnia teraz nową ilustrację spaghetti aglio e olio, a także potwierdza, że legacy SVG samo w sobie nie jest fallbackiem.'
    ],
    footer: 'Nowe rysunki oczekują na ocenę stylu.'
  }),
  '1.4.69': Object.freeze({
    intro: 'Kuchnik 1.4.69 — 10 kolejnych ilustracji kredkowych.',
    items: [
      'Dodano osobne ilustracje Wiener Schnitzel, kurczaka tikka masala, coq au vin, naleśników, spaghetti aglio e olio, cacio e pepe, pad thai, pesto genovese, guacamole i tzatziki.',
      'Każde danie zostało sprawdzone w kolejce przed generowaniem i ma dokładnie jeden plik PNG.',
      'Rejestr obejmuje teraz 78 z 225 przepisów; 147 pozostało do narysowania.'
    ],
    footer: 'Czarne naczynia z miedzianym rantem, osobna ilustracja dla każdej receptury.'
  }),
  '1.4.68': Object.freeze({
    intro: 'Kuchnik 1.4.68 — kolejna partia ilustracji kredkowych.',
    items: [
      'Dodano 10 osobnych rysunków: zupa ogórkowa, pieczeń rzymska, kluski śląskie, karp smażony, szarlotka, tiramisu, paella z owocami morza, tacos al pastor, ramen shoyu i bibimbap.',
      'Każdy plik jest przypisany do jednego przepisu; plansza zawiera wyłącznie nowe pozycje z kolejki.',
      'Usunięto 10 powtórnych wpisów galerii, pozostawiając po jednym mapowaniu na danie.'
    ],
    footer: 'Galeria: 68 rysunków oczekuje na ocenę, 157 przepisów w kolejce.'
  }),
  '1.4.67': Object.freeze({
    intro: 'Kuchnik 1.4.67 — wersje testów regresji zsynchronizowane.',
    items: [
      'Wersje aplikacji, Service Workera, README i testu ilustracji są zgodne.',
      'Testy rozróżniają stare SVG, nowe rysunki kredkowe i prywatne zdjęcia.'
    ],
    footer: 'Galeria: 58 rysunków oczekuje na ocenę, 167 przepisów w kolejce.'
  }),
  '1.4.66': Object.freeze({
    intro: 'Kuchnik 1.4.66 — wersje i testy regresji są zsynchronizowane.',
    items: [
      'Testy rozróżniają stare mapowania SVG od nowych rysunków kredkowych przypisanych do przepisów.',
      'Własne zdjęcia i nowe grafiki pozostają dostępne; brakujące rysunki pokazują neutralny komunikat.'
    ],
    footer: 'Galeria: 58 nowych ilustracji, 167 przepisów w kolejce.'
  }),
  '1.4.65': Object.freeze({
    intro: 'Kuchnik 1.4.65 — testy uwzględniają wymianę ilustracji.',
    items: [
      'Testy regresji potwierdzają, że stare SVG nie zastępują brakującego rysunku kredkowego.',
      'Nowe lokalne ilustracje i prywatne zdjęcia nadal są widoczne.'
    ],
    footer: 'Galeria: 58 ilustracji oczekuje na ocenę, 167 przepisów pozostaje w kolejce.'
  }),
  '1.4.64': Object.freeze({
    intro: 'Kuchnik 1.4.64 — walidacja podmiany ilustracji poprawiona.',
    items: [
      'Testy sprawdzają, że stare SVG nie są już fallbackiem, a nowe grafiki kredkowe i własne zdjęcia pozostają widoczne.',
      'Galeria prowadzi wymianę 225 ilustracji: 58 oczekuje na ocenę, 167 pozostaje do wykonania.'
    ],
    footer: 'Stare SVG nie są używane jako ilustracje przepisów.'
  }),
  '1.4.63': Object.freeze({
    intro: 'Kuchnik 1.4.63 — stare ilustracje nie są już pokazywane jako zastępstwo.',
    items: [
      'Karty przepisów używają własnego zdjęcia użytkownika lub rysunku kredkowego przypisanego do konkretnego dania.',
      'Przepisy bez nowej ilustracji pokazują status „Rysunek w przygotowaniu”; stare SVG nie udają wykonanej podmiany.',
      'Galeria obejmuje 225 przepisów: 58 nowych ilustracji oczekuje na ocenę, a 167 pozostało do wykonania.'
    ],
    footer: 'Własne zdjęcia i dane użytkownika pozostają zachowane.'
  }),
  '1.4.62': Object.freeze({
    intro: 'Kuchnik 1.4.62 — kolejna dziesiątka rysunków kredką.',
    items: [
      'Dodano rysunki jajecznicy, jajek w koszulkach, racuchów z jabłkami, knedli ze śliwkami, makowca, sernika, brownie, fish and chips, śledzia w oleju i hummusu.',
      'Każda ilustracja jest osobnym lokalnym plikiem na czarnym naczyniu z miedzianym rantem.',
      'Galeria: 58 ilustracji czeka na ocenę, 167 przepisów pozostało do wykonania.'
    ],
    footer: 'Nowe ilustracje pozostają oczekujące na ocenę stylu.'
  }),
  '1.4.61': Object.freeze({
    intro: 'Kuchnik 1.4.61 — kolejna partia 10 rysunków kredką.',
    items: [
      'Dodano rysunki pierogów z kapustą i grzybami, z jagodami, pierogów leniwych, ryby po grecku, kurczaka, pstrąga z migdałami, karkówki, pulpetów koperkowych, sałatki jarzynowej i surówki marchewkowo-jabłkowej.',
      'Czarne naczynia mają cienki miedziany rant; grafiki są lokalne i mają dokładne mapowanie.',
      'Galeria: 48 ilustracji czeka na ocenę, 177 przepisów pozostało do wykonania.'
    ],
    footer: 'Nowe ilustracje pozostają oczekujące na ocenę stylu.'
  }),
  '1.4.60': Object.freeze({
    intro: 'Kuchnik 1.4.60 — partia 10 ilustracji na czarnych talerzach.',
    items: [
      'Dodano 10 osobnych rysunków kredką: lasagne, bruschettę, quiche, focaccię, calzone, pizzę quattro formaggi, kopytka, tortillę española, falafel i ratatouille.',
      'Matowe czarne talerze mają cienki miedziany rant. Każda ilustracja ma około 396 × 396 px źródłowej rozdzielczości.',
      'Galeria: 38 ilustracji czeka na ocenę stylu, 187 receptur pozostaje do wykonania.'
    ],
    footer: 'Nowe ilustracje pozostają oczekujące na ocenę stylu.'
  }),
  '1.4.60': Object.freeze({
    intro: 'Kuchnik 1.4.60 — partia 10 ilustracji na czarnych talerzach.',
    items: [
      'Dodano 10 osobnych rysunków kredką: lasagne, bruschettę, quiche, focaccię, calzone, pizzę quattro formaggi, kopytka, tortillę española, falafel i ratatouille.',
      'Czarne matowe talerze mają cienki miedziany rant. Każdy kadr ma około 396 × 396 px przed przygotowaniem miniatury.',
      'Galeria: 38 ilustracji oczekuje na ocenę stylu, 187 receptur pozostaje do wykonania.'
    ],
    footer: 'Nowe ilustracje pozostają oczekujące na ocenę stylu.'
  }),
  '1.4.59': Object.freeze({
    intro: 'Kuchnik 1.4.59 — siódma partia rysunków kredką.',
    items: [
      'Dodano rysunki: kaczki pieczonej z jabłkami, łososia z cytryną, pizzy pepperoni i panna cotty z truskawkami.',
      'Galeria obejmuje 225 receptur; 28 ilustracji oczekuje na ocenę, a 197 pozostało do wykonania.',
      'Każdy plik jest lokalny, ma własne mapowanie i trafia do cache offline.'
    ],
    footer: 'Nowe ilustracje pozostają oczekujące na ocenę stylu.'
  }),
  '1.4.58': Object.freeze({
    intro: 'Kuchnik 1.4.58 — szósta partia rysunków kredką.',
    items: [
      'Dodano Tom yum z krewetkami, gazpacho, chili con carne i burgera domowego.',
      'Galeria obejmuje 225 receptur; 24 ilustracje oczekują na ocenę, a 201 pozostało do wykonania.',
      'Każdy obraz jest lokalny, ma dokładne mapowanie i działa offline.'
    ],
    footer: 'Nowe ilustracje pozostają oczekujące na ocenę stylu.'
  }),
  '1.4.57': Object.freeze({
    intro: 'Kuchnik 1.4.57 — piąta partia rysunków kredką.',
    items: [
      'Dodano rysunki: kotleta mielonego, naleśników z serem, placków ziemniaczanych i zupy grzybowej.',
      'Galeria obejmuje 225 receptur; 20 ilustracji oczekuje na ocenę, a 205 pozostało do wykonania.',
      'Nowe pliki są lokalne, dokładnie przypisane i dostępne offline.'
    ],
    footer: 'Nowe ilustracje pozostają oczekujące na ocenę stylu.'
  }),
  '1.4.56': Object.freeze({
    intro: 'Kuchnik 1.4.56 — czwarta partia rysunków kredką.',
    items: [
      'Dodano cztery osobne rysunki sałatek: greckiej, caprese, Cezar i mizerii.',
      'Galeria obejmuje 225 receptur; 16 ilustracji oczekuje na ocenę, a 209 pozostało do wykonania.',
      'Nowe pliki są lokalne, dopasowane do nazw przepisów i dostępne w cache offline.'
    ],
    footer: 'Nowe ilustracje pozostają oczekujące na ocenę stylu.'
  }),
  '1.4.55': Object.freeze({
    intro: 'Kuchnik 1.4.55 — trzecia partia rysunków kredką.',
    items: [
      'Dodano cztery różne ilustracje: bigos staropolski, gołąbki w sosie pomidorowym, gulasz węgierski i szakszukę.',
      'Galeria obejmuje 225 receptur; 12 rysunków czeka na ocenę, a 213 pozostało do wykonania.',
      'Nowe pliki są osobne, lokalne, mają dokładne mapowanie i są cache’owane offline.'
    ],
    footer: 'Nowe ilustracje pozostają oczekujące na ocenę stylu.'
  }),
  '1.4.54': Object.freeze({
    intro: 'Kuchnik 1.4.54 — druga partia rysunków kredką.',
    items: [
      'Dodano cztery nowe ilustracje zup: żurku, barszczu czerwonego, kremu z dyni i kapuśniaku.',
      'Galeria obejmuje 225 receptur; 8 rysunków czeka na ocenę, a 217 pozostało do wykonania.',
      'Każdy plik ma osobny kadr, dokładne mapowanie i lokalny cache offline.'
    ],
    footer: 'Zestaw nadal jest w trakcie ujednolicania i nie jest oznaczony jako zatwierdzony.'
  }),
  '1.4.53': Object.freeze({
    intro: 'Kuchnik 1.4.53 — start wymiany zdjęć na rysunki kredką.',
    items: [
      'Dodano pierwszą partię czterech osobnych, rysowanych ilustracji: rosół z kury, kotlet schabowy, pierogi ruskie i zupę pomidorową.',
      'Nowa galeria pokazuje status ilustracji dla wszystkich 225 przepisów; cztery pliki czekają na ocenę, a pozostałe pozycje są w kolejce.',
      'Domyślne JPG przestały zastępować rysunki. Własne zdjęcia użytkownika zachowują pierwszeństwo, a istniejące SVG pozostają przejściowym fallbackiem.'
    ],
    footer: 'Pliki są lokalne i uwzględnione w cache offline.'
  }),
  '1.4.52': Object.freeze({
    intro: 'Kuchnik 1.4.52 — centralna galeria ilustracji repozytorium.',
    items: [
      'Podgląd pokazuje lokalne pliki ilustracji, zdjęcia, przypisane receptury, numer partii i status zatwierdzenia.',
      'Lista brakujących grafik powstaje bezpośrednio z aktualnej bazy 225 receptur i reguł mapowania.',
      'Pięć niepodpiętych ilustracji review pozostaje oznaczonych jako oczekujące; zaakceptowane wzorce Carbonara i Bruschetta są opisane osobno.',
      'Dodano obsługę galerii w Service Workerze, tak aby otwarcie tej strony nie było przekierowane do powłoki aplikacji.'
    ],
    footer: 'Galeria czyta lokalne pliki repozytorium i nie pobiera grafik z zewnętrznych źródeł.'
  }),
  '1.4.51': Object.freeze({
    intro: 'Kuchnik 1.4.51 — cztery nowe ilustracje SVG w malarskim kierunku grafitowo-miedzianym.',
    items: [
      'Dodano dedykowane ilustracje Spaghetti all’amatriciana, Panzanella, Saltimbocca alla romana i Spanakopita.',
      'Każda potrawa ma precyzyjne mapowanie SVG; nie dodano ogólnych reguł przechwytujących inne dania.',
      'Ilustracje są lokalne, mają kwadratowy viewBox, title/desc, szczegółowe ścieżki i są uwzględnione w precache service workera.',
      'Firefly wygenerował cztery referencje, a Adobe vectorize potwierdził powodzenie. Konektor udostępnił podglądy SVG, ale nie bajty źródłowe; repo zawiera niezależnie opracowane wektory, a ograniczenie opisano w ART-PACK-1.4.51-NOTES.md.'
    ],
    footer: 'Cztery nowe ilustracje są lokalne, opisane i objęte testami regresyjnymi.'
  }),
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

