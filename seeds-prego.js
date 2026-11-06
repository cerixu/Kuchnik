/* PREGO! Kamienna Góra — robocze receptury opracowane na podstawie karty restauracji.
   Składniki pochodzą z karty; gramatury i procedury są orientacyjnym szkicem do zatwierdzenia
   przez kuchnię. Nie są oficjalnymi recepturami produkcyjnymi restauracji. */
export const SEED_PREGO = String.raw`
# Marinara
@ cat=prego id=marinara price=19 servings=1 prep=10 cook=2 illustration=prego-marinara tags=prego,pizza-rosso,robocza
: Sos San Marzano, czosnek, oregano i świeża bazylia. Cena z karty: 19 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA
280 g | Kula ciasta do pizzy PREGO!
80 g | Sos pomidorowy San Marzano
6 g | Czosnek
1 g | Oregano suszone
3 g | Świeża bazylia
8 g | Oliwa extra vergine
> Rozciągnij kulę ciasta na placek, pozostawiając wyższy rant.
> Rozprowadź sos, dodaj czosnek i oregano. Piecz w maksymalnie rozgrzanym piecu do wypieczenia i zrumienienia rantu.
> Po wypieku dodaj świeżą bazylię i oliwę. Dodatki z karty: mięso +6 zł, burrata +11 zł, krewetki +11 zł, pozostałe +5 zł.

# Margherita
@ cat=prego id=margherita price=29 servings=1 prep=10 cook=2 illustration=prego-margherita tags=prego,pizza-rosso,robocza
: San Marzano, mozzarella fior di latte i świeża bazylia. Cena z karty: 29 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA
280 g | Kula ciasta do pizzy PREGO!
80 g | Sos pomidorowy San Marzano
90 g | Mozzarella fior di latte
4 g | Świeża bazylia
8 g | Oliwa extra vergine
> Rozciągnij kulę ciasta, rozprowadź sos i rozłóż porwaną mozzarellę.
> Piecz w maksymalnie rozgrzanym piecu do wypieczenia rantu.
> Po wypieku dodaj bazylię i oliwę. Dodatki z karty: mięso +6 zł, burrata +11 zł, krewetki +11 zł, pozostałe +5 zł.

# Milano Classica
@ cat=prego id=milano-classica price=35 servings=1 prep=10 cook=2 illustration=prego-milano-classica tags=prego,pizza-rosso,robocza
: San Marzano, fior di latte, salami Milano i oliwki. Cena z karty: 35 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA
280 g | Kula ciasta do pizzy PREGO!
80 g | Sos pomidorowy San Marzano
90 g | Mozzarella fior di latte
45 g | Salami Milano
25 g | Oliwki
> Rozciągnij ciasto, rozprowadź sos, dodaj mozzarellę, salami i oliwki.
> Piecz w maksymalnie rozgrzanym piecu do wypieczenia rantu i roztopienia sera. Uwaga: oliwki mogą sporadycznie zawierać pestki.
> Podawaj od razu. Dodatki z karty: mięso +6 zł, burrata +11 zł, krewetki +11 zł, pozostałe +5 zł.

# Capriciosa Mia
@ cat=prego id=capriciosa-mia price=38 servings=1 prep=10 cook=2 illustration=prego-capriciosa-mia tags=prego,pizza-rosso,robocza
: San Marzano, fior di latte, pieczarki i świeże prosciutto cotto. Cena z karty: 38 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA
280 g | Kula ciasta do pizzy PREGO!
80 g | Sos pomidorowy San Marzano
90 g | Mozzarella fior di latte
55 g | Pieczarki
45 g | Prosciutto cotto
> Rozciągnij ciasto, dodaj sos, mozzarellę i pokrojone pieczarki.
> Piecz w maksymalnie rozgrzanym piecu; prosciutto cotto ułóż zgodnie ze standardem kuchni przed lub po wypieku.
> Podawaj od razu. Dodatki z karty: mięso +6 zł, burrata +11 zł, krewetki +11 zł, pozostałe +5 zł.

# Parma
@ cat=prego id=parma-pizza price=41 servings=1 prep=12 cook=2 illustration=prego-parma-pizza tags=prego,pizza-rosso,robocza
: San Marzano, fior di latte, rukola, prosciutto crudo, pomidorki koktajlowe i sos balsamiczny. Cena z karty: 41 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA
280 g | Kula ciasta do pizzy PREGO!
80 g | Sos pomidorowy San Marzano
90 g | Mozzarella fior di latte
35 g | Rukola
45 g | Prosciutto crudo
50 g | Pomidorki koktajlowe
12 g | Sos balsamiczny
> Rozciągnij ciasto, rozprowadź sos i dodaj mozzarellę.
> Piecz w maksymalnie rozgrzanym piecu do wypieczenia.
> Po wypieku ułóż rukolę, prosciutto i pomidorki, skrop sosem balsamicznym. Dodatki z karty: mięso +6 zł, burrata +11 zł, krewetki +11 zł, pozostałe +5 zł.

# Mortadella Reale
@ cat=prego id=mortadella-reale price=45 servings=1 prep=12 cook=2 illustration=prego-mortadella-reale tags=prego,pizza-rosso,robocza
: San Marzano, fior di latte, mortadella pistacjowa, burrata i pesto bazyliowe. Cena z karty: 45 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA
280 g | Kula ciasta do pizzy PREGO!
80 g | Sos pomidorowy San Marzano
90 g | Mozzarella fior di latte
50 g | Mortadella z pistacjami
60 g | Burrata
18 g | Pesto bazyliowe
12 g | Pistacje
> Rozciągnij ciasto, rozprowadź sos i dodaj mozzarellę.
> Piecz w maksymalnie rozgrzanym piecu do wypieczenia rantu.
> Po wypieku dodaj mortadellę, burratę, pesto i posiekane pistacje.

# Nduja Lava
@ cat=prego id=nduja-lava price=41 servings=1 prep=12 cook=2 illustration=prego-nduja-lava tags=prego,pizza-rosso,robocza
: San Marzano, fior di latte, salami spianata, nduja, czerwona cebula i ricotta. Cena z karty: 41 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA
280 g | Kula ciasta do pizzy PREGO!
80 g | Sos pomidorowy San Marzano
90 g | Mozzarella fior di latte
35 g | Salami spianata
20 g | Nduja
25 g | Czerwona cebula
35 g | Ricotta
> Rozciągnij ciasto i rozprowadź sos.
> Dodaj mozzarellę, salami, nduję i cienko pokrojoną cebulę; piecz do wypieczenia.
> Po wypieku dodaj ricottę. Dodatki z karty: mięso +6 zł, burrata +11 zł, krewetki +11 zł, pozostałe +5 zł.

# Dolce Roso
@ cat=prego id=dolce-roso price=41 servings=1 prep=15 cook=2 illustration=prego-dolce-roso tags=prego,pizza-rosso,robocza
: San Marzano, fior di latte, grillowana cukinia i papryka, chutney z czerwonej cebuli, ricotta. Cena z karty: 41 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA
280 g | Kula ciasta do pizzy PREGO!
80 g | Sos pomidorowy San Marzano
90 g | Mozzarella fior di latte
45 g | Grillowana cukinia
40 g | Grillowana papryka
25 g | Chutney z czerwonej cebuli
35 g | Ricotta
> Rozciągnij ciasto, rozprowadź sos i dodaj mozzarellę.
> Ułóż grillowaną cukinię i paprykę, następnie piecz do wypieczenia rantu.
> Po wypieku dodaj chutney i ricottę.

# Diavola
@ cat=prego id=diavola price=41 servings=1 prep=10 cook=2 illustration=prego-diavola tags=prego,pizza-rosso,robocza
: San Marzano, fior di latte, salami spianata, czerwona cebula i chili. Cena z karty: 41 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA
280 g | Kula ciasta do pizzy PREGO!
80 g | Sos pomidorowy San Marzano
90 g | Mozzarella fior di latte
45 g | Salami spianata
25 g | Czerwona cebula
3 g | Chili
> Rozciągnij ciasto, rozprowadź sos, dodaj mozzarellę, salami, cebulę i chili.
> Piecz w maksymalnie rozgrzanym piecu do wypieczenia i roztopienia sera.
> Podawaj od razu. Dodatki z karty: mięso +6 zł, burrata +11 zł, krewetki +11 zł, pozostałe +5 zł.

# Siciliano
@ cat=prego id=siciliano price=42 servings=1 prep=12 cook=2 illustration=prego-siciliano tags=prego,pizza-rosso,robocza
: San Marzano, fior di latte, salami spianata, oliwki i chutney z czerwonej cebuli. Cena z karty: 42 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA
280 g | Kula ciasta do pizzy PREGO!
80 g | Sos pomidorowy San Marzano
90 g | Mozzarella fior di latte
40 g | Salami spianata
25 g | Oliwki
25 g | Chutney z czerwonej cebuli
> Rozciągnij ciasto, rozprowadź sos i dodaj mozzarellę z salami.
> Piecz do wypieczenia rantu. Po wypieku dodaj oliwki i chutney według standardu kuchni.
> Oliwki mogą sporadycznie zawierać pestki. Dodatki z karty: mięso +6 zł, burrata +11 zł, krewetki +11 zł, pozostałe +5 zł.

# Sole e Mare
@ cat=prego id=sole-e-mare price=49 servings=1 prep=15 cook=2 illustration=prego-sole-e-mare tags=prego,pizza-rosso,robocza
: San Marzano, fior di latte, czosnek, krewetki, pietruszka i oliwa cytrynowa. Cena z karty: 49 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA
280 g | Kula ciasta do pizzy PREGO!
80 g | Sos pomidorowy San Marzano
90 g | Mozzarella fior di latte
6 g | Czosnek
65 g | Krewetki
5 g | Natka pietruszki
10 g | Oliwa cytrynowa
> Rozciągnij ciasto, rozprowadź sos, dodaj mozzarellę i czosnek.
> Piecz zgodnie ze standardem pieca; krewetki przygotuj do pełnej obróbki termicznej.
> Po wypieku dodaj natkę i oliwę cytrynową.

# Verde Spinachi
@ cat=prego id=verde-spinachi price=43 servings=1 prep=12 cook=2 illustration=prego-verde-spinachi tags=prego,pizza-rosso,robocza
: San Marzano, fior di latte, świeży szpinak, gorgonzola i półsuszone pomidorki. Cena z karty: 43 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA
280 g | Kula ciasta do pizzy PREGO!
80 g | Sos pomidorowy San Marzano
85 g | Mozzarella fior di latte
30 g | Świeży szpinak
35 g | Gorgonzola
35 g | Półsuszone pomidorki koktajlowe
> Rozciągnij ciasto, rozprowadź sos, dodaj mozzarellę, szpinak, gorgonzolę i pomidorki.
> Piecz w maksymalnie rozgrzanym piecu do wypieczenia i roztopienia sera.

# Tonno e Cipolla
@ cat=prego id=tonno-e-cipolla price=42 servings=1 prep=12 cook=2 illustration=prego-tonno-e-cipolla tags=prego,pizza-rosso,robocza
: San Marzano, fior di latte, tuńczyk i czerwona cebula. Cena z karty: 42 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA
280 g | Kula ciasta do pizzy PREGO!
80 g | Sos pomidorowy San Marzano
90 g | Mozzarella fior di latte
60 g | Tuńczyk odsączony
25 g | Czerwona cebula
> Rozciągnij ciasto, rozprowadź sos, dodaj mozzarellę, odsączonego tuńczyka i cienko pokrojoną cebulę.
> Piecz do wypieczenia rantu i roztopienia sera.

# Focaccia
@ cat=prego id=focaccia price=13 servings=1 prep=15 cook=12 illustration=prego-focaccia tags=prego,antipasti,robocza
: Placek z własnego wypieku z oregano, rozmarynem i grubo mieloną solą. Cena z karty: 13 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## FOCACCIA
250 g | Porcja ciasta na focaccię
18 g | Oliwa extra vergine
1 g | Oregano
1 g | Rozmaryn
2 g | Sól grubo mielona
> Rozciągnij ciasto na placek i zrób palcami wgłębienia.
> Skrop oliwą, posyp oregano, rozmarynem i solą.
> Piecz w mocno nagrzanym piecu do złotego koloru.

# Krem z pomidorów
@ cat=prego id=krem-z-pomidorow price=19 servings=1 prep=15 cook=30 illustration=prego-krem-z-pomidorow tags=prego,antipasti,robocza
: Krem z dojrzałych pomidorów z bazylią, oliwą, mozzarellą i pieczywem. Cena z karty: 19 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## ZUPA
250 g | Dojrzałe pomidory
70 g | Passata pomidorowa
25 g | Cebula
4 g | Czosnek
12 ml | Oliwa extra vergine
120 ml | Bulion warzywny
25 ml | Śmietanka
20 g | Mozzarella
5 g | Świeża bazylia
60 g | Pieczywo własnego wypieku
> Cebulę i czosnek zeszklij na oliwie.
> Dodaj pomidory i passatę, duś do miękkości, dolej bulion i krótko gotuj.
> Zblenduj na krem, dodaj śmietankę i dopraw. Podaj z mozzarellą, bazylią, oliwą i pieczywem.

# Talerz włoskich specjałów
@ cat=prego id=talerz-wloskich-specjalow price=43 servings=2 prep=15 illustration=prego-talerz-wloskich-specjalow tags=prego,antipasti,robocza
: Selekcja włoskich serów i wędlin, półsuszone pomidorki, oliwki i pieczywo. Cena z karty: 43 zł. Wersja robocza — dobór i gramatury należy zatwierdzić w kuchni PREGO!.
## TALERZ
100 g | Włoskie sery — selekcja
90 g | Włoskie wędliny dojrzewające — selekcja
60 g | Półsuszone pomidorki
50 g | Oliwki
100 g | Pieczywo własnego wypieku
> Sery i wędliny wyjmij z chłodni zgodnie ze standardem kuchni.
> Ułóż selekcję na talerzu, dodaj pomidorki, oliwki i pieczywo. Oliwki mogą sporadycznie zawierać pestki.

# Burrata z pomidorami
@ cat=prego id=burrata-z-pomidorami price=28 servings=1 prep=12 illustration=prego-burrata-z-pomidorami tags=prego,antipasti,robocza
: Burrata, pieczone pomidorki, czosnek, oliwa, świeże zioła, krem balsamiczny i pieczywo. Cena z karty: 28 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## TALERZ
125 g | Burrata
150 g | Pieczone pomidorki koktajlowe
4 g | Czosnek
10 ml | Oliwa z oliwek
4 g | Świeże zioła
8 g | Krem balsamiczny
70 g | Pieczywo własnego wypieku
> Pomidorki upiecz z czosnkiem i oliwą do zmięknięcia.
> Burratę podaj z ciepłymi pomidorkami, ziołami i kremem balsamicznym.
> Podawaj z pieczywem.

# Ravioli
@ cat=prego id=ravioli price=27 servings=1 prep=10 cook=4 illustration=prego-ravioli tags=prego,antipasti,robocza
: Dziesięć ravioli z jednym wybranym farszem: szpinak i ricotta, kaczka i gruszka, borowik i ricotta albo dynia i pigwa; podawane na maśle szafranowym. Cena z karty: 27 zł. Wersja robocza — farsz i gramatury do potwierdzenia.
## PORCJA
10 szt. | Ravioli z wybranym farszem
20 g | Masło
0,1 g | Szafran
10 g | Woda z gotowania ravioli
> Ugotuj ravioli zgodnie z czasem właściwym dla użytego farszu.
> Na patelni rozpuść masło z szafranem i odrobiną wody z gotowania.
> Przełóż ravioli na patelnię i delikatnie połącz z masłem.

# Bruschetta
@ cat=prego id=bruschetta price=28 servings=1 prep=20 cook=5 illustration=prego-bruschetta tags=prego,panini,robocza
: Trzy bruschetty: pesto, stracciatella i pomidorki; salami piccante, stracciatella i chili; pesto, pomidorki, rukola i prosciutto crudo. Wykończone Grana Padano. Cena z karty: 28 zł. Wersja robocza — gramatury i układ należy zatwierdzić w kuchni PREGO!.
## TRZY BRUSCHETTY
180 g | Pieczywo na bruschettę
18 g | Pesto bazyliowe
90 g | Stracciatella
90 g | Pieczone pomidorki koktajlowe
35 g | Salami piccante
3 g | Chili
15 g | Rukola
35 g | Prosciutto crudo
12 g | Grana Padano
12 ml | Oliwa extra vergine
8 g | Krem balsamiczny
> Pieczywo pokrój, skrop oliwą i podpiecz do lekkiej chrupkości.
> Przygotuj trzy różne grzanki: pesto ze stracciatellą i pomidorkami; salami piccante ze stracciatellą i chili; pesto z pomidorkami, rukolą i prosciutto crudo.
> Posyp Grana Padano. Pierwszą grzankę wykończ kremem balsamicznym zgodnie z kartą.

# Panuozzo
@ cat=prego id=panuozzo price=28 servings=1 prep=15 cook=8 illustration=prego-panuozzo tags=prego,panini,robocza
: Bułka z ciasta na pizzę z pesto, stracciatellą, rukolą, pieczonymi pomidorkami, prosciutto cotto i kremem balsamicznym. Cena z karty: 28 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PANUOZZO
220 g | Ciasto na panuozzo
15 g | Pesto bazyliowe
60 g | Stracciatella
15 g | Rukola
55 g | Pieczone pomidorki koktajlowe
45 g | Prosciutto cotto
8 g | Krem balsamiczny
> Uformuj i wypiecz podłużną bułkę z ciasta na pizzę.
> Po przestudzeniu natnij bułkę i wypełnij pesto, stracciatellą, rukolą, pomidorkami i prosciutto cotto.
> Wykończ kremem balsamicznym.

# Pere e Gorgonzola
@ cat=prego id=pere-e-gorgonzola price=31 servings=1 prep=15 illustration=prego-pere-e-gorgonzola tags=prego,salatka,robocza
: Baby szpinak, rukola, gruszka, orzechy włoskie, szynka parmeńska, gorgonzola i dressing. Cena z karty: 31 zł. Wersja robocza — proporcje dressingu i gramatury należy zatwierdzić w kuchni PREGO!.
## SAŁATKA
35 g | Baby szpinak
25 g | Rukola
100 g | Gruszka
15 g | Orzechy włoskie
35 g | Szynka parmeńska
35 g | Gorgonzola
25 ml | Dressing do sałatki
> Liście umyj i dokładnie osusz.
> Gruszkę pokrój w cienkie plastry; połącz z liśćmi, orzechami, szynką i gorgonzolą.
> Skrop dressingiem tuż przed podaniem.

# Parma
@ cat=prego id=parma-salatka price=29 servings=1 prep=12 illustration=prego-parma-salatka tags=prego,salatka,robocza
: Rukola, pomidorki koktajlowe, szynka parmeńska, Grana Padano, oliwa extra vergine i pieprz. Cena z karty: 29 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## SAŁATKA
45 g | Rukola
80 g | Pomidorki koktajlowe
35 g | Szynka parmeńska
18 g | Grana Padano
12 ml | Oliwa extra vergine
1 g | Świeżo mielony pieprz
> Rukolę umyj i osusz, pomidorki przekrój.
> Ułóż rukolę z pomidorkami i szynką, dodaj płatki Grana Padano.
> Skrop oliwą i dopraw pieprzem.

# Caprese
@ cat=prego id=caprese price=34 servings=1 prep=15 illustration=prego-caprese tags=prego,salatka,robocza
: Świeże, półsuszone i suszone pomidory, rukola, mozzarella perlina, burrata, bazylia, oregano, oliwa i krem balsamiczny. Cena z karty: 34 zł. Wersja robocza — dobór pomidorów i gramatury należy zatwierdzić w kuchni PREGO!.
## SAŁATKA
80 g | Świeże pomidory
40 g | Półsuszone pomidory
20 g | Suszone pomidory
20 g | Rukola
60 g | Mozzarella perlina
50 g | Burrata
4 g | Świeża bazylia
1 g | Oregano
10 ml | Oliwa z oliwek
8 g | Krem balsamiczny
> Pomidory pokrój, rukolę umyj i osusz.
> Ułóż składniki z mozzarellą, burratą i bazylią.
> Skrop oliwą, oprósz oregano i wykończ kremem balsamicznym.

# Penne al Pomodoro
@ cat=prego id=penne-al-pomodoro price=38 servings=1 prep=10 cook=12 illustration=prego-penne-al-pomodoro tags=prego,pasta,robocza
: Penne, oliwa, czosnek, San Marzano, bazylia, Grana Padano, natka i świeża bazylia. Opcjonalnie burrata +11 zł. Cena z karty: 38 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## MAKARON
120 g | Makaron penne suchy
8 ml | Oliwa extra vergine
5 g | Czosnek
180 g | Pomidory San Marzano
15 g | Grana Padano
4 g | Natka pietruszki
4 g | Świeża bazylia
10 g | Burrata — opcjonalnie
> Ugotuj penne al dente, zachowaj część wody z gotowania.
> Na oliwie krótko podgrzej czosnek, dodaj pomidory i duś do uzyskania sosu.
> Połącz sos z makaronem, odrobiną wody i Grana Padano. Dodaj zioła; burratę podaj jako opcjonalny dodatek (+11 zł).

# Penne all'Arrabbiata
@ cat=prego id=penne-all-arrabbiata price=39 servings=1 prep=10 cook=12 illustration=prego-penne-all-arrabbiata tags=prego,pasta,robocza
: Penne, oliwa, peperoncino, czosnek, San Marzano, bazylia, Grana Padano i natka. Opcjonalnie pancetta +7 zł jako penne all'amatriciana. Cena z karty: 39 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## MAKARON
120 g | Makaron penne suchy
8 ml | Oliwa extra vergine
1 g | Peperoncino
5 g | Czosnek
180 g | Pomidory San Marzano
15 g | Grana Padano
4 g | Natka pietruszki
4 g | Świeża bazylia
30 g | Pancetta — opcjonalnie (+7 zł)
> Ugotuj penne al dente, zachowaj część wody z gotowania.
> Na oliwie podgrzej czosnek i peperoncino, dodaj pomidory i duś do uzyskania sosu.
> Połącz sos z makaronem, wodą z gotowania, Grana Padano i ziołami. Pancetta jest opcjonalną zmianą na penne all'amatriciana (+7 zł).

# Cacio e Pepe
@ cat=prego id=cacio-e-pepe price=39 servings=1 prep=8 cook=10 illustration=prego-cacio-e-pepe tags=prego,pasta,robocza
: Spaghetti, prażony grubo mielony pieprz i Pecorino Romano. Cena z karty: 39 zł. Wersja robocza — proporcje sera, wody i technikę należy zatwierdzić w kuchni PREGO!.
## MAKARON
120 g | Spaghetti suche
45 g | Pecorino Romano
3 g | Pieprz czarny grubo mielony
50 ml | Woda z gotowania makaronu
> Ugotuj spaghetti al dente, zachowując wodę z gotowania.
> Pieprz krótko podpraż na suchej patelni.
> Zdejmij patelnię z ognia, dodaj makaron i stopniowo wmieszaj Pecorino oraz wodę do uzyskania kremowej emulsji.

# Carbonara
@ cat=prego id=carbonara price=46 servings=1 prep=10 cook=12 illustration=prego-carbonara tags=prego,pasta,robocza
: Spaghetti, guanciale, żółtko, Pecorino Romano i grubo mielony pieprz. Cena z karty: 46 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## MAKARON
120 g | Spaghetti suche
45 g | Guanciale
2 szt. | Żółtko
38 g | Pecorino Romano
2 g | Pieprz czarny grubo mielony
50 ml | Woda z gotowania makaronu
> Ugotuj spaghetti al dente i zachowaj wodę z gotowania.
> Guanciale wytapiaj na patelni do zrumienienia.
> Żółtka wymieszaj z Pecorino i pieprzem. Zdejmij patelnię z ognia, dodaj makaron i masę jajeczno-serową, regulując konsystencję wodą. Nie ścinaj żółtek na ogniu.

# Bolognese
@ cat=prego id=bolognese price=46 servings=1 prep=20 cook=90 illustration=prego-bolognese tags=prego,pasta,robocza
: Tagliatelle, wieprzowo-wołowe mięso mielone, pancetta, warzywa, czerwone wino, San Marzano, Grana Padano i bazylia. Cena z karty: 46 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## SOS I MAKARON
120 g | Tagliatelle suche
90 g | Mięso mielone wieprzowo-wołowe
25 g | Pancetta
25 g | Cebula
15 g | Seler naciowy
20 g | Marchew
35 ml | Czerwone wino wytrawne
150 g | Pomidory San Marzano
15 g | Grana Padano
4 g | Świeża bazylia
> Pancettę wytop, dodaj mięso i obsmaż.
> Dodaj drobno pokrojoną cebulę, seler i marchew; dolej wino i odparuj.
> Dodaj pomidory i duś na małym ogniu do miękkości sosu.
> Ugotuj tagliatelle, połącz z sosem i podaj z Grana Padano oraz bazylią.

# Bosco Bianco
@ cat=prego id=bosco-bianco price=42 servings=1 prep=12 cook=2 illustration=prego-bosco-bianco tags=prego,pizza-bianca,robocza
: Crème fraîche, fior di latte, gorgonzola, pancetta, kurki i pietruszka. Cena z karty: 42 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA BIANCA
280 g | Kula ciasta do pizzy PREGO!
45 g | Crème fraîche
85 g | Mozzarella fior di latte
35 g | Gorgonzola
35 g | Pancetta
35 g | Kurki
4 g | Świeża pietruszka
> Rozciągnij ciasto i cienko rozprowadź crème fraîche.
> Dodaj sery, pancettę i przygotowane kurki.
> Piecz w maksymalnie rozgrzanym piecu do wypieczenia rantu. Po wypieku dodaj pietruszkę.

# Pera Divina
@ cat=prego id=pera-divina price=39 servings=1 prep=12 cook=2 illustration=prego-pera-divina tags=prego,pizza-bianca,robocza
: Crème fraîche, fior di latte, gorgonzola, gruszka, orzechy włoskie i gruszkowo-orzechowy sos balsamiczny. Cena z karty: 39 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA BIANCA
280 g | Kula ciasta do pizzy PREGO!
45 g | Crème fraîche
85 g | Mozzarella fior di latte
35 g | Gorgonzola
55 g | Gruszka
12 g | Orzechy włoskie
12 g | Sos balsamiczny gruszkowo-orzechowy
> Rozciągnij ciasto i rozprowadź crème fraîche.
> Dodaj mozzarellę i gorgonzolę; piecz do wypieczenia rantu.
> Po wypieku dodaj gruszkę, orzechy i sos balsamiczny.

# Pancetta
@ cat=prego id=pancetta price=38 servings=1 prep=10 cook=2 illustration=prego-pancetta tags=prego,pizza-bianca,robocza
: Oliwa extra vergine, fior di latte, pancetta i świeżo mielony pieprz. Cena z karty: 38 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA BIANCA
280 g | Kula ciasta do pizzy PREGO!
10 ml | Oliwa extra vergine
90 g | Mozzarella fior di latte
45 g | Pancetta
2 g | Świeżo mielony pieprz
> Rozciągnij ciasto, skrop oliwą i dodaj mozzarellę oraz pancettę.
> Piecz w maksymalnie rozgrzanym piecu do wypieczenia rantu.
> Dopraw świeżo mielonym pieprzem.

# Quattro Formaggi
@ cat=prego id=quattro-formaggi price=41 servings=1 prep=10 cook=2 illustration=prego-quattro-formaggi tags=prego,pizza-bianca,robocza
: Fior di latte, gorgonzola, scamorza i Grana Padano. Cena z karty: 41 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA BIANCA
280 g | Kula ciasta do pizzy PREGO!
95 g | Mozzarella fior di latte
35 g | Gorgonzola
35 g | Scamorza
18 g | Grana Padano
> Rozciągnij ciasto i równomiernie rozłóż sery.
> Piecz w maksymalnie rozgrzanym piecu do wypieczenia rantu i roztopienia serów.

# Delicata
@ cat=prego id=delicata price=40 servings=1 prep=12 cook=2 illustration=prego-delicata tags=prego,pizza-bianca,robocza
: Crème fraîche, mozzarella fior di latte, gorgonzola, pieczarki i prosciutto cotto. Cena z karty: 40 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA BIANCA
280 g | Kula ciasta do pizzy PREGO!
45 g | Crème fraîche
85 g | Mozzarella fior di latte
30 g | Gorgonzola
45 g | Pieczarki
40 g | Prosciutto cotto
> Rozciągnij ciasto i rozprowadź crème fraîche.
> Dodaj sery i pieczarki, piecz w maksymalnie rozgrzanym piecu do wypieczenia.
> Prosciutto cotto dodaj zgodnie ze standardem kuchni.

# Liguria
@ cat=prego id=liguria price=44 servings=1 prep=12 cook=2 illustration=prego-liguria tags=prego,pizza-bianca,robocza
: Crème fraîche, mozzarella fior di latte, rukola, prosciutto cotto, Grana Padano i pesto bazyliowe. Cena z karty: 44 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA BIANCA
280 g | Kula ciasta do pizzy PREGO!
45 g | Crème fraîche
85 g | Mozzarella fior di latte
25 g | Rukola
45 g | Prosciutto cotto
15 g | Grana Padano
15 g | Pesto bazyliowe
> Rozciągnij ciasto, posmaruj crème fraîche i dodaj mozzarellę.
> Piecz do wypieczenia rantu.
> Po wypieku dodaj rukolę, prosciutto cotto, Grana Padano i pesto.

# Dolce
@ cat=prego id=dolce price=35 servings=1 prep=10 cook=2 illustration=prego-dolce tags=prego,pizza-bianca,robocza
: Nutella, owoce sezonowe i pistacje. Cena z karty: 35 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## PIZZA DOLCE
280 g | Kula ciasta do pizzy PREGO!
45 g | Nutella
60 g | Owoce sezonowe
10 g | Pistacje
> Wypiecz placek z ciasta do pizzy bez słonych dodatków.
> Po lekkim przestudzeniu posmaruj Nutellą, dodaj owoce i posiekane pistacje.

# Zimowa herbata King of Ceylon
@ cat=prego id=zimowa-herbata-king-of-ceylon price=22 servings=1 prep=5 cook=5 illustration=prego-zimowa-herbata tags=prego,sezonowe,napoj,robocza
: Herbata King of Ceylon, syropy malinowy i imbirowy, cytryna, pomarańcza, goździki, anyż, cynamon i opcjonalny miód. Cena z karty: 22 zł. Wersja robocza — proporcje należy zatwierdzić w kuchni PREGO!.
## NAPAR
250 ml | Napar z herbaty King of Ceylon
15 ml | Syrop malinowy
10 ml | Syrop imbirowy
15 g | Cytryna
20 g | Pomarańcza
2 szt. | Goździki
1 szt. | Anyż gwiazdkowy
1 g | Cynamon
10 g | Miód — opcjonalnie
> Zaparz herbatę zgodnie z zaleceniami producenta.
> Dodaj syropy, cytrynę, pomarańczę i przyprawy.
> Miód podaj jako opcjonalny dodatek do osłodzenia.

# Pasta Boscaiola
@ cat=prego id=pasta-boscaiola price=46 servings=1 prep=15 cook=25 illustration=prego-pasta-boscaiola tags=prego,sezonowe,pasta,robocza
: Tagliatelle, grzyby leśne, pancetta, cebula, czosnek, śmietana, pietruszka i Grana Padano. Cena z karty: 46 zł. Wersja robocza — gramatury i technikę należy zatwierdzić w kuchni PREGO!.
## SOS I MAKARON
120 g | Tagliatelle suche
100 g | Grzyby leśne
30 g | Pancetta
25 g | Cebula
5 g | Czosnek
60 ml | Śmietanka
5 g | Świeża pietruszka
18 g | Grana Padano
> Ugotuj tagliatelle al dente i zachowaj trochę wody z gotowania.
> Pancettę wytop, dodaj cebulę i czosnek, następnie grzyby; podsmaż do odparowania nadmiaru płynu.
> Dodaj śmietankę i krótko zredukuj. Połącz z makaronem, dopraw i podaj z pietruszką oraz Grana Padano.
`;
