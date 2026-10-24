/* ==========================================================================
   seeds-curated.js — dodatkowe receptury po audycie językowym i jakościowym.
   Zbiór wejściowy: wybrane receptury z audytu Groka; wpisy mają opis i kroki
   dopasowane do rodzaju dania. Odrzucono duplikaty i powtarzalne warianty.
   ========================================================================== */
export const SEED_CURATED = `
# Pierogi z mięsem
@ cat=mieso origin=PL trad servings=1 prep=32 cook=48 art=food tags=tradycyjne,pierogi,mięso,kuchnia-polska
: Domowe pierogi z delikatnym ciastem i doprawionym farszem mięsno-cebulowym.
90 g | mąka pszenna
17 g | jajko (roztrzepane)
40 ml | woda
100 g | mięso wołowo-wieprzowe
0,5 szt. | cebula
3 g | sól
1 g | pieprz czarny
10 g | masło
> Posiekaj cebulę i zeszklij ją na maśle. Dodaj mięso, rozdrobnij łopatką i smaż, aż będzie całkowicie ugotowane. Dopraw solą oraz pieprzem i odstaw farsz do przestudzenia.
> Z mąki, jajka, wody i szczypty soli zagnieć gładkie, elastyczne ciasto. Przykryj i odstaw na 15–20 minut, aby odpoczęło.
> Rozwałkuj ciasto cienko i wytnij krążki. Na każdy nałóż porcję farszu, złóż na pół i dokładnie zlep brzegi.
> Gotuj pierogi partiami w osolonym wrzątku. Po wypłynięciu gotuj jeszcze 2–3 minuty, zależnie od grubości ciasta.
> Podawaj od razu, polane roztopionym masłem lub z cebulką podsmażoną na maśle.

# Uszka z grzybami
@ cat=inne origin=PL trad servings=1 prep=24 cook=36 art=food tags=tradycyjne,wigilijne,zupa,kuchnia-polska
: Małe pierożki do barszczu, nadziewane grzybami.
60 g | mąka pszenna
30 ml | woda
10 g | grzyby suszone
0,5 szt. | cebula
12 ml | oliwa z oliwek
3 g | sól
> Grzyby namocz i ugotuj do miękkości. Posiekaj bardzo drobno i połącz z zeszkloną cebulą. Farsz powinien być zwarty, nie wodnisty.
> Z mąki, wody i soli zagnieć gładkie ciasto. Przykryj i odstaw na 15 minut.
> Rozwałkuj bardzo cienko i pokrój na małe kwadraty. Na środek każdego nałóż odrobinę farszu.
> Złóż kwadrat w trójkąt, dokładnie zlep brzegi, a następnie połącz dwa końce wokół palca.
> Gotuj w osolonym wrzątku 2–3 minuty od wypłynięcia. Podawaj z barszczem.

# Żurek staropolski
@ cat=zupy origin=PL trad servings=1 prep=20 cook=30 art=soup tags=tradycyjne,zupa,wielkanoc,kuchnia-polska
: Zupa na zakwasie żytnim z kiełbasą, jajkiem i ziemniakami.
80 ml | zakwas żytni
60 g | kiełbasa biała
80 g | ziemniaki
1 szt. | jajko
1 szt. | czosnek
2 g | majeranek
20 ml | śmietana 18%
3 g | sól
> Ziemniaki pokrój w kostkę. Białą kiełbasę zalej wodą lub bulionem, dodaj czosnek i przyprawy, po czym gotuj łagodnie, aż kiełbasa będzie ugotowana.
> Wyjmij kiełbasę, pokrój ją w plastry, a do wywaru dodaj ziemniaki. Gotuj do miękkości.
> Zakwas wymieszaj i wlej stopniowo do zupy, próbując kwasowość. Gotuj kilka minut na małym ogniu.
> Śmietanę zahartuj kilkoma łyżkami gorącej zupy i wlej do garnka. Dodaj majeranek oraz kiełbasę.
> Podawaj gorący, z jajkiem na twardo, jeśli jest w składnikach.

# Sernik krakowski
@ cat=desery origin=PL trad servings=1 prep=36 cook=54 art=dessert tags=tradycyjne,ciasto,sernik,kuchnia-polska
: Sernik na kruchym spodzie z twarogu i skórką cytrynową.
180 g | twaróg
1 szt. | jajko
40 g | cukier
30 g | masło
40 g | mąka pszenna
2 g | skórka cytrynowa
> Zimne masło pokrój w kostkę i szybko rozetrzyj z mąką oraz połową cukru. Dodaj żółtko, jeśli oddzielisz je z jajka, zagnieć kruche ciasto i schłodź przez 20 minut.
> Twaróg zmiel lub dokładnie rozgnieć. Wymieszaj z jajkiem, pozostałym cukrem i skórką cytrynową tylko do uzyskania gładkiej masy.
> Ciasto wylep cienką warstwą na dnie małej formy wyłożonej papierem. Nakłuj widelcem, podpiecz 10 minut w 180°C, a następnie rozprowadź masę serową.
> Piecz w 165–170°C przez około 35–45 minut, aż brzegi będą ścięte, a środek lekko sprężysty. Jeśli wierzch zbyt szybko się rumieni, przykryj luźno papierem.
> Wyłącz piekarnik i pozostaw sernik przy uchylonych drzwiczkach przez 15 minut. Ostudź całkowicie przed krojeniem; przechowuj w lodówce.

# Pączki różane
@ cat=desery origin=PL trad servings=1 prep=60 cook=90 art=dessert tags=tradycyjne,tłusty-czwartek,drożdżowe,kuchnia-polska
: Puszyste pączki z nadzieniem różanym, w cukrze pudrze.
80 g | mąka pszenna
40 ml | mleko
4 g | drożdże świeże
22 g | jajko (roztrzepane)
12 g | masło
10 g | cukier
20 g | marmolada różana
80 ml | olej do smażenia
> Podgrzej mleko do letniej temperatury. Rozetrzyj drożdże z łyżeczką cukru i częścią mleka, po czym odstaw na 8–10 minut, aż zaczną pracować.
> Do mąki dodaj pozostały cukier, jajko, zaczyn i resztę mleka. Wyrabiaj 5–7 minut, następnie dodaj miękkie masło i wyrabiaj, aż ciasto będzie elastyczne.
> Przykryj miskę i pozostaw ciasto w ciepłym miejscu na 45–60 minut, aż wyraźnie zwiększy objętość. Podziel na porcje, spłaszcz i umieść na każdej marmoladę; dokładnie zlep.
> Ułóż pączki złączeniem w dół, przykryj i pozostaw do napuszenia na 20–30 minut. Rozgrzej olej do 170–175°C i smaż partiami po około 2 minuty z każdej strony.
> Osącz na kratce lub ręczniku papierowym. Po lekkim przestudzeniu oprósz cukrem pudrem; nie przepełniaj garnka i kontroluj temperaturę oleju.

# Spaghetti Carbonara
@ cat=pasta origin=IT trad servings=1 prep=18 cook=26 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Klasyczna rzymska carbonara z guanciale i pecorino.
90 g | spaghetti
35 g | guanciale
1 szt. | żółtko
25 g | pecorino
1 g | pieprz czarny
> Guanciale pokrój w krótkie paski i wytapiaj na chłodnej patelni, stopniowo zwiększając ogień. Gdy będzie złote, zdejmij patelnię z palnika.
> W misce połącz żółtka z drobno startym pecorino i świeżo mielonym pieprzem. Masa powinna być gęsta i jednolita.
> Ugotuj spaghetti al dente. Zachowaj kubek wody z gotowania, a makaron przełóż do patelni z guanciale.
> Zdejmij patelnię z ognia. Dodaj masę jajeczno-serową i mieszaj energicznie, dolewając po trochu wody z makaronu, aż powstanie kremowy sos.
> Podawaj natychmiast, z dodatkowym pecorino i pieprzem.

# Spaghetti alle vongole
@ cat=pasta origin=IT trad servings=1 prep=17 cook=25 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Spaghetti z małżami, czosnkiem i pietruszką.
90 g | spaghetti
150 g | małże
1 szt. | czosnek
40 ml | białe wino
4 g | natka pietruszki
12 ml | oliwa z oliwek
> Małże dokładnie oczyść. Odrzuć sztuki z pękniętą muszlą oraz te, które nie zamykają się po stuknięciu.
> Ugotuj spaghetti al dente w osolonej wodzie; zachowaj kubek wody z gotowania.
> Na dużej patelni delikatnie podgrzej oliwę z czosnkiem. Dodaj małże i białe wino, przykryj i gotuj, aż muszle się otworzą. Zamknięte po obróbce odrzuć.
> Przełóż makaron na patelnię, dodaj odrobinę wody z gotowania i potrząsaj patelnią, aż sos połączy się z makaronem.
> Posyp natką pietruszki i podawaj od razu.

# Tagliatelle al ragù
@ cat=pasta origin=IT trad servings=1 prep=14 cook=22 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Wstążki z wolno duszonym ragù bolońskim.
90 g | tagliatelle
70 g | wołowina mielona
0,5 szt. | cebula
20 g | marchew
15 g | seler naciowy
60 ml | przecier pomidorowy
> Posiekaj cebulę, marchew i seler naciowy. Podsmaż powoli na tłuszczu przewidzianym w recepturze, aż zmiękną.
> Dodaj mieloną wołowinę i smaż, rozdrabniając ją łopatką, aż straci surowy kolor i zacznie się rumienić.
> Dodaj przecier pomidorowy i duś ragù na małym ogniu przez 15–20 minut, mieszając co kilka minut. Jeśli sos zacznie przywierać, dolej łyżkę wody; dopraw solą i pieprzem.
> Ugotuj tagliatelle al dente i połącz z ragù. Jeśli sos jest zbyt gęsty, dolej odrobinę wody z gotowania.
> Podawaj od razu, z tartym serem, jeśli jest w składnikach.

# Linguine al pesto
@ cat=pasta origin=IT trad servings=1 prep=14 cook=21 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Linguine z genueńskim pesto.
90 g | linguine
20 g | bazylia
8 g | piniole
20 g | parmezan
1 szt. | czosnek
12 ml | oliwa z oliwek
> Ugotuj linguine al dente i zachowaj część wody z gotowania.
> Utrzyj lub krótko zmiksuj bazylię, czosnek, orzeszki piniowe i ser. Wlewaj oliwę do uzyskania gęstego pesto.
> Przełóż pesto do miski lub na patelnię zdjętą z ognia. Nie gotuj go, aby bazylia zachowała świeży aromat.
> Dodaj linguine i odrobinę wody z gotowania. Mieszaj, aż pesto równomiernie oblepi makaron.
> Podawaj od razu, z dodatkowym serem, jeśli został.

# Bucatini all'amatriciana
@ cat=pasta origin=IT trad servings=1 prep=9 cook=14 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Bucatini z guanciale i pecorino.
90 g | bucatini
35 g | guanciale
90 g | pomidory pelati
20 g | pecorino
> Ugotuj bucatini al dente. Zachowaj trochę wody z gotowania.
> Guanciale pokrój w paski i wytapiaj na patelni, aż będzie złote. Chili dodaj pod koniec, jeśli jest w składnikach.
> Dodaj pomidory pelati, rozgnieć je łopatką i gotuj 10–15 minut, aż sos zgęstnieje.
> Wrzuć makaron do sosu, dolej odrobinę wody z gotowania i dokładnie wymieszaj.
> Zdejmij patelnię z ognia, dodaj pecorino i podawaj natychmiast.

# Tonnarelli cacio e pepe
@ cat=pasta origin=IT trad servings=1 prep=14 cook=20 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Rzymski makaron tonnarelli z pecorino i świeżo mielonym pieprzem.
90 g | tonnarelli
40 g | pecorino
1 g | pieprz czarny
> Ugotuj tonnarelli w wodzie z umiarkowaną ilością soli. Zachowaj co najmniej kubek wody z gotowania.
> Na suchej patelni krótko podgrzej świeżo mielony pieprz, aż zacznie pachnieć.
> Przełóż makaron na patelnię i dodaj kilka łyżek gorącej wody z gotowania.
> Zdejmij patelnię z ognia. Stopniowo wsypuj drobno starte pecorino, mieszając i dolewając wodę po trochu, aż powstanie kremowy sos.
> Podawaj natychmiast z dodatkowym pieprzem.

# Pasta alla Norma
@ cat=pasta origin=IT trad servings=1 prep=16 cook=24 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Sycylijski makaron z bakłażanem, pomidorami i ricottą salata.
90 g | rigatoni
80 g | bakłażan
80 ml | przecier pomidorowy
20 g | ricotta salata
4 g | bazylia
> Bakłażana pokrój w kostkę, oprósz solą i po kilku minutach osusz. Usmaż lub upiecz do miękkości i lekkiego zrumienienia.
> Na oliwie krótko podsmaż czosnek, dodaj pomidory i duś sos 10–15 minut. Dopraw solą.
> Ugotuj makaron al dente i zachowaj trochę wody z gotowania.
> Połącz makaron z sosem i bakłażanem. Dolej odrobinę wody z gotowania, jeśli sos jest zbyt gęsty.
> Podawaj z ricottą salata i bazylią.

# Orecchiette z brokułem
@ cat=pasta origin=IT trad servings=1 prep=16 cook=23 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Makaron orecchiette z brokułami, czosnkiem, anchois i oliwą.
90 g | orecchiette
100 g | brokuł
1 szt. | czosnek
8 g | anchois
12 ml | oliwa z oliwek
> Brokuł podziel na małe różyczki. Makaron ugotuj w osolonej wodzie; brokuł dodaj w ostatnich minutach, aby zmiękł, ale się nie rozpadł.
> Na patelni podgrzej oliwę z czosnkiem i anchois. Rozetrzyj anchois łopatką, aż połączą się z oliwą.
> Przełóż makaron i brokuł na patelnię. Dolej trochę wody z gotowania i rozgnieć część brokułów, aby zagęściły sos.
> Spróbuj i dopraw pieprzem; sól dodawaj ostrożnie, bo anchois jest słone.
> Podawaj na gorąco.

# Gnocchi al gorgonzola
@ cat=pasta origin=IT servings=1 prep=11 cook=17 art=pasta tags=włochy,makaron,kuchnia-włoska
: Kopytka w sosie z gorgonzolą.
150 g | gnocchi
35 g | gorgonzola
30 ml | śmietana 18%
8 g | orzechy włoskie
> Zagotuj osoloną wodę i ugotuj gnocchi zgodnie z instrukcją na opakowaniu. Odcedź, gdy wypłyną, zachowując odrobinę wody.
> Delikatnie podgrzej śmietankę w rondelku. Dodaj pokruszoną gorgonzolę i mieszaj, aż powstanie gładki sos.
> Połącz gnocchi z sosem. Jeśli jest zbyt gęsty, dolej trochę wody z gotowania.
> Posiekaj orzechy włoskie i rozsyp je na wierzchu.
> Podawaj natychmiast.

# Ravioli ricotta e spinaci
@ cat=pasta origin=IT trad servings=1 prep=12 cook=18 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Ravioli ze szpinakiem i ricottą, masło szałwiowe.
140 g | ravioli
10 g | masło
4 g | szałwia
15 g | parmezan
> Zagotuj dużą ilość osolonej wody i ugotuj ravioli delikatnie według instrukcji na opakowaniu. Zachowaj odrobinę wody z gotowania.
> Na patelni rozpuść masło i dodaj szałwię. Podgrzewaj krótko, aż masło zacznie pachnieć orzechowo, ale nie przypali się.
> Przełóż ravioli na patelnię, dodaj łyżkę wody z gotowania i delikatnie obtocz w maśle szałwiowym.
> Posyp drobno startym parmezanem i spróbuj przed dosoleniem.
> Podawaj od razu, zanim masło z szałwią ostygnie.

# Risotto z grzybami
@ cat=warzywa origin=IT servings=1 prep=12 cook=22 art=food tags=włochy,ryż,kuchnia-włoska
: Kremowe risotto z grzybami leśnymi, masłem i parmezanem.
80 g | ryż arborio
70 g | grzyby mieszane
240 ml | bulion
18 g | parmezan
10 g | masło
0,25 szt. | cebula
30 ml | białe wino wytrawne
> Posiekaj cebulę, oczyść grzyby i pokrój większe sztuki. Zeszklij cebulę na połowie masła, dodaj grzyby i smaż 3–4 minuty.
> Wsyp ryż arborio i mieszaj 1–2 minuty, aż ziarenka staną się lekko przezroczyste na brzegach.
> Wlej białe wino i odparuj, następnie dolewaj gorący bulion po jednej chochli, często mieszając i czekając na wchłonięcie płynu.
> Gotuj około 16–18 minut, aż ryż będzie kremowy, ale pozostanie al dente; w razie potrzeby dolej odrobinę bulionu.
> Zdejmij z ognia, wmieszaj resztę masła i parmezan, odstaw na minutę i podawaj od razu.


# Penne alla vodka
@ cat=pasta origin=IT servings=1 prep=15 cook=22 art=pasta tags=włochy,makaron,kuchnia-włoska
: Penne w kremowym sosie pomidorowym z wódką.
90 g | penne
70 ml | przecier pomidorowy
30 ml | śmietana 18%
15 ml | wódka
1 szt. | czosnek
> Ugotuj penne al dente i zachowaj trochę wody z gotowania.
> Na oliwie krótko podsmaż czosnek. Dodaj przecier pomidorowy i duś kilka minut.
> Wlej wódkę i gotuj chwilę, by złagodzić ostry zapach alkoholu. Dodaj śmietankę i łagodnie podgrzej.
> Wrzuć penne do sosu, dolej odrobinę wody z gotowania i wymieszaj.
> Podawaj od razu, z serem lub ziołami, jeśli są w składnikach.

# Spaghetti puttanesca
@ cat=pasta origin=IT trad servings=1 prep=15 cook=23 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Ostry makaron z kaparami, oliwkami i anchois.
90 g | spaghetti
20 g | oliwki
8 g | kapary
8 g | anchois
70 ml | przecier pomidorowy
> Ugotuj spaghetti al dente. Zachowaj trochę wody z gotowania.
> Na oliwie krótko podgrzej czosnek, dodaj anchois i rozetrzyj je łopatką.
> Dodaj pomidory, posiekane oliwki i kapary. Gotuj 8–12 minut, aż sos lekko zgęstnieje; spróbuj przed dosoleniem.
> Połącz spaghetti z sosem i odrobiną wody z gotowania.
> Wymieszaj makaron z sosem na patelni przez minutę, dodając odrobinę wody z gotowania, jeśli sos jest zbyt gęsty. Spróbuj przed dosoleniem, bo anchois, kapary i oliwki są słone.

# Trofie al pesto
@ cat=pasta origin=IT trad servings=1 prep=9 cook=14 art=pasta tags=tradycyjne,włochy,makaron,kuchnia-włoska
: Trofie z pesto, ziemniakami i fasolką.
90 g | trofie
30 g | pesto
40 g | ziemniaki
30 g | fasolka szparagowa
> Ziemniaki pokrój w małą kostkę. Ugotuj je i fasolkę w osolonej wodzie; trofie dołóż zgodnie z czasem gotowania na opakowaniu.
> Odcedź, zachowując trochę wody z gotowania. Przełóż wszystkie składniki do dużej miski.
> Dodaj pesto i kilka łyżek ciepłej wody z gotowania. Wymieszaj delikatnie, aż sos oblepi makaron i warzywa.
> Spróbuj i w razie potrzeby dopraw.
> Podawaj od razu, zanim pesto straci świeży aromat.

# Cannelloni ricotta
@ cat=pasta origin=IT servings=1 prep=11 cook=16 art=pasta tags=włochy,makaron,kuchnia-włoska
: Cannelloni z ricottą i szpinakiem zapiekane w pomidorach.
80 g | cannelloni
70 g | ricotta
40 g | szpinak
80 ml | przecier pomidorowy
15 g | parmezan
> Krótko podduś szpinak, aż zwiędnie. Ostudź, odciśnij nadmiar płynu i wymieszaj z ricottą oraz przyprawami z listy.
> Napełnij cannelloni masą serowo-szpinakową. Jeśli makaron wymaga wcześniejszego gotowania, wykonaj ten krok zgodnie z instrukcją na opakowaniu.
> Na dnie naczynia rozprowadź część sosu pomidorowego. Ułóż cannelloni i przykryj resztą sosu, aby makaron nie pozostał suchy.
> Posyp parmezanem i piecz w 180°C przez około 30–35 minut, aż makaron zmięknie, a wierzch się zarumieni.
> Odczekaj 5 minut przed podaniem.

# Pizza Margherita
@ cat=pizza origin=IT trad servings=1 prep=10 ferm=120 cook=15 art=pizza tags=tradycyjne,pizza,pieczone,kuchnia-włoska
: Pizza na sosie pomidorowym z mozzarellą i świeżą bazylią.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
50 g | sos pomidorowy
70 g | mozzarella
4 g | świeża bazylia
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozsmaruj cienką warstwę sosu pomidorowego, pozostawiając 1–1,5 cm wolnego rantu. Rozłóż równomiernie: mozzarella.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Upiecz pizzę w maksymalnie nagrzanym piecu, aż rant mocno wyrośnie, a spód się zarumieni. Po wyjęciu ułóż świeże liście bazylii i podawaj od razu.

# Pizza Marinara
@ cat=pizza origin=IT trad servings=1 prep=10 ferm=120 cook=15 art=pizza tags=tradycyjne,pizza,pieczone,kuchnia-włoska
: Pizza neapolitańska z sosem pomidorowym, czosnkiem i oregano; bez sera.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
50 g | sos pomidorowy
4 g | czosnek
1 g | oregano
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozsmaruj cienką warstwę sosu pomidorowego, pozostawiając 1–1,5 cm wolnego rantu. Rozłóż równomiernie: czosnek, oregano.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Po wyjęciu odczekaj około minuty, pokrój i podawaj, gdy rant pozostaje chrupiący.

# Pizza Diavola
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z mozzarellą, pikantnym salami i chili.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
60 g | mozzarella
35 g | salami pikantne
1 g | chili
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozsmaruj cienką warstwę sosu pomidorowego, pozostawiając 1–1,5 cm wolnego rantu. Rozłóż równomiernie: mozzarella, salami pikantne, chili.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Po wyjęciu odczekaj około minuty, pokrój i podawaj, gdy rant pozostaje chrupiący.

# Pizza Capricciosa
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z szynką, pieczarkami, karczochami i oliwkami.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
50 g | mozzarella
25 g | szynka gotowana
25 g | pieczarki
20 g | karczochy
10 g | oliwki
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozsmaruj cienką warstwę sosu pomidorowego, pozostawiając 1–1,5 cm wolnego rantu. Rozłóż równomiernie: mozzarella, szynka gotowana, pieczarki, karczochy, oliwki.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Po wyjęciu odczekaj około minuty, pokrój i podawaj, gdy rant pozostaje chrupiący.

# Pizza Prosciutto e rucola
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z szynką parmeńską, rukolą i parmezanem.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
40 g | sos pomidorowy
50 g | mozzarella
25 g | szynka parmeńska
15 g | rukola
10 g | parmezan
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozsmaruj cienką warstwę sosu pomidorowego, pozostawiając 1–1,5 cm wolnego rantu. Rozłóż równomiernie: mozzarella.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Upiecz pizzę z sosem i mozzarellą, aż rant się zarumieni. Po wyjęciu rozłóż szynkę parmeńską i rukolę, posyp płatkami parmezanu i podawaj od razu.

# Pizza Quattro stagioni
@ cat=pizza origin=IT trad servings=1 prep=10 ferm=120 cook=15 art=pizza tags=tradycyjne,pizza,pieczone,kuchnia-włoska
: Pizza z czterema dodatkami: szynką, pieczarkami, karczochami i oliwkami.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
50 g | mozzarella
20 g | szynka gotowana
20 g | pieczarki
20 g | karczochy
10 g | oliwki
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozsmaruj cienką warstwę sosu pomidorowego, pozostawiając 1–1,5 cm wolnego rantu. Rozłóż równomiernie: mozzarella, szynka gotowana, pieczarki, karczochy, oliwki.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Po wyjęciu odczekaj około minuty, pokrój i podawaj, gdy rant pozostaje chrupiący.

# Pizza Ortolana
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Wegetariańska pizza z cukinią, bakłażanem i papryką.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
50 g | mozzarella
25 g | cukinia
25 g | bakłażan
25 g | papryka
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozsmaruj cienką warstwę sosu pomidorowego, pozostawiając 1–1,5 cm wolnego rantu. Rozłóż równomiernie: mozzarella, cukinia, bakłażan, papryka.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Po wyjęciu odczekaj około minuty, pokrój i podawaj, gdy rant pozostaje chrupiący.

# Pizza Tonno e cipolla
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z tuńczykiem, cebulą i kaparami.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
45 g | mozzarella
40 g | tuńczyk odsączony
20 g | cebula
5 g | kapary
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozsmaruj cienką warstwę sosu pomidorowego, pozostawiając 1–1,5 cm wolnego rantu. Rozłóż równomiernie: mozzarella, tuńczyk odsączony, cebula, kapary.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Po wyjęciu odczekaj około minuty, pokrój i podawaj, gdy rant pozostaje chrupiący.

# Pizza Boscaiola
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z włoską kiełbasą salsiccia i pieczarkami.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
40 g | sos pomidorowy
55 g | mozzarella
35 g | włoska kiełbasa salsiccia
30 g | pieczarki
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozsmaruj cienką warstwę sosu pomidorowego, pozostawiając 1–1,5 cm wolnego rantu. Rozłóż równomiernie: mozzarella, włoska kiełbasa salsiccia, pieczarki. Surową salsiccię wcześniej podsmaż do pełnej gotowości i odsącz tłuszcz przed nałożeniem.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Po wyjęciu odczekaj około minuty, pokrój i podawaj, gdy rant pozostaje chrupiący.

# Pizza Frutti di mare
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z owocami morza, czosnkiem i natką pietruszki.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
60 g | owoce morza
3 g | czosnek
3 g | natka pietruszki
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozsmaruj cienką warstwę sosu pomidorowego, pozostawiając 1–1,5 cm wolnego rantu. Rozłóż równomiernie: owoce morza, czosnek.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Owoce morza krótko podsmaż z czosnkiem, aby odparować nadmiar płynu. Rozłóż je na pizzy przed pieczeniem; po wypieku posyp posiekaną natką pietruszki.

# Pizza Calzone
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Zamknięta pizza calzone z ricottą, mozzarellą i szynką.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
35 g | sos pomidorowy
50 g | mozzarella
30 g | ricotta
30 g | szynka gotowana
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Na połowie ciasta rozprowadź cienko sos pomidorowy, zostawiając około 2 cm wolnego brzegu. Rozłóż mozzarellę, ricottę i szynkę gotowaną.
> Złóż placek na pół i dokładnie zlep brzegi, dociskając je palcami. Zrób 2 małe nacięcia w wierzchu, aby para mogła uchodzić.
> Przełóż calzone na rozgrzany kamień lub blachę i piecz w 230–250°C, aż ciasto będzie wyraźnie rumiane, zwykle 12–18 minut. Odczekaj minutę przed przekrojeniem.

# Pizza Bianca z ziemniakami
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Biała pizza z cienko krojonymi ziemniakami, rozmarynem i pecorino.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
60 g | ziemniaki cienko pokrojone
35 g | mozzarella
20 g | pecorino
1 g | rozmaryn
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Nie dodawaj sosu; rozprowadź dodatki bezpośrednio na cieście, zostawiając wolny rant. Rozłóż równomiernie: ziemniaki cienko pokrojone, mozzarella, pecorino, rozmaryn. Ziemniaki ułóż bardzo cienko, lekko zachodzącymi na siebie plasterkami.
> Piecz na kamieniu lub stali w maksymalnie nagrzanym piecu; kontroluj spód i dopiekaj do chwili, gdy cienkie plastry ziemniaka będą miękkie, a rant rumiany.
> Po wyjęciu odczekaj około minuty, pokrój i podawaj, gdy rant pozostaje chrupiący.

# Pizza Salsiccia e friarielli
@ cat=pizza origin=IT trad servings=1 prep=10 ferm=120 cook=15 art=pizza tags=tradycyjne,pizza,pieczone,kuchnia-włoska
: Pizza z kiełbasą salsiccia i brokułami friarielli.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
35 g | sos pomidorowy
45 g | mozzarella
40 g | kiełbasa salsiccia
40 g | brokuł włoski friarielli
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozsmaruj cienką warstwę sosu pomidorowego, pozostawiając 1–1,5 cm wolnego rantu. Rozłóż równomiernie: mozzarella, kiełbasa salsiccia, brokuł włoski friarielli. Surową salsiccię wcześniej podsmaż do pełnej gotowości i odsącz tłuszcz przed nałożeniem.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Po wyjęciu odczekaj około minuty, pokrój i podawaj, gdy rant pozostaje chrupiący.

# Pizza ’Nduja z miodem
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z pikantną ndują, mozzarellą i odrobiną miodu.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
35 g | sos pomidorowy
60 g | mozzarella
25 g | nduja
8 g | miód
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozsmaruj cienką warstwę sosu pomidorowego, pozostawiając 1–1,5 cm wolnego rantu. Rozłóż równomiernie: mozzarella, nduja.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Rozłóż nduję i mozzarellę na cieście z sosem. Upiecz do zarumienienia rantu, a po wyjęciu skrop pizzę miodem cienką strużką.

# Pizza z truflą i pieczarkami
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Biała pizza z pieczarkami, pastą truflową i parmezanem.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
50 g | mozzarella
35 g | pieczarki
5 g | pasta truflowa
15 g | parmezan
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Nie dodawaj sosu; rozprowadź dodatki bezpośrednio na cieście, zostawiając wolny rant. Rozłóż równomiernie: mozzarella, pieczarki.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Pieczarki pokrój cienko i rozłóż na cieście z mozzarellą. Piecz do zarumienienia; po wyjęciu dodaj pastę truflową i posyp parmezanem.

# Pizza Hawajska
@ cat=pizza origin=US servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-amerykańska
: Pizza z szynką i ananasem.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
60 g | mozzarella
30 g | szynka gotowana
30 g | ananas
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozsmaruj cienką warstwę sosu pomidorowego, pozostawiając 1–1,5 cm wolnego rantu. Rozłóż równomiernie: mozzarella, szynka gotowana, ananas. Ananasa dokładnie odsącz, żeby nie zawilgocił środka.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Po wyjęciu odczekaj około minuty, pokrój i podawaj, gdy rant pozostaje chrupiący.

# Pizza BBQ kurczak
@ cat=pizza origin=US servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-amerykańska
: Pizza z kurczakiem, sosem barbecue, mozzarellą i czerwoną cebulą.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
35 g | sos barbecue
50 g | mozzarella
40 g | kurczak pieczony
20 g | czerwona cebula
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozprowadź cienką, równą warstwę sosu barbecue. Rozłóż równomiernie: mozzarella, kurczak pieczony, czerwona cebula.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Po wyjęciu odczekaj około minuty, pokrój i podawaj, gdy rant pozostaje chrupiący.

# Pizza Spinaci e uovo
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Biała pizza ze szpinakiem, jajkiem i pecorino.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
40 g | mozzarella
40 g | szpinak
1 szt. | jajko
15 g | pecorino
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Nie dodawaj sosu; rozprowadź dodatki bezpośrednio na cieście, zostawiając wolny rant. Rozłóż równomiernie: mozzarella, szpinak, pecorino. Szpinak wcześniej krótko podduś i odparuj nadmiar wody.
> Piecz na rozgrzanym kamieniu lub stali do wyrośnięcia rantu. Po około 3–4 minutach ostrożnie wbij jajko i dopiekaj, aż białko się zetnie.
> Szpinak krótko podsmaż i dobrze odciśnij z płynu. Rozłóż go z mozzarellą na cieście, wbij jajko na środku i piecz do ścięcia białka; pecorino dodaj pod koniec pieczenia.

# Pizza Gorgonzola e pere
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Biała pizza z gorgonzolą, gruszką i orzechami włoskimi.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
30 g | mozzarella
25 g | gorgonzola
30 g | gruszka
8 g | orzechy włoskie
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Nie dodawaj sosu; rozprowadź dodatki bezpośrednio na cieście, zostawiając wolny rant. Rozłóż równomiernie: mozzarella, gorgonzola, gruszka, orzechy włoskie.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Po wyjęciu odczekaj około minuty, pokrój i podawaj, gdy rant pozostaje chrupiący.

# Pizza Pesto i pomidorki
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z pesto, pomidorkami koktajlowymi i mozzarellą.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
20 g | pesto alla genovese
40 g | pomidorki koktajlowe
50 g | mozzarella
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozprowadź cienką warstwę pesto, nie dochodząc do samego brzegu. Rozłóż równomiernie: pomidorki koktajlowe, mozzarella.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Po wyjęciu odczekaj około minuty, pokrój i podawaj, gdy rant pozostaje chrupiący.

# Pizza Cotto e funghi
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Pizza z gotowaną szynką, pieczarkami i mozzarellą.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
45 g | sos pomidorowy
60 g | mozzarella
30 g | szynka gotowana
30 g | pieczarki
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Rozsmaruj cienką warstwę sosu pomidorowego, pozostawiając 1–1,5 cm wolnego rantu. Rozłóż równomiernie: mozzarella, szynka gotowana, pieczarki.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Po wyjęciu odczekaj około minuty, pokrój i podawaj, gdy rant pozostaje chrupiący.

# Pizza Zucca e salsiccia
@ cat=pizza origin=IT servings=1 prep=10 ferm=120 cook=15 art=pizza tags=pizza,pieczone,kuchnia-włoska
: Biała pizza z dynią, kiełbasą salsiccia i szałwią.
110 g | mąka pszenna 00
70 ml | woda
1,5 g | drożdże
3 g | sól
8 ml | oliwa z oliwek
50 g | dynia pieczona
45 g | mozzarella
35 g | kiełbasa salsiccia
1 g | szałwia
> W misie wymieszaj mąkę z wodą i drożdżami, dodaj sól, a oliwę wlej pod koniec wyrabiania. Wyrabiaj 8–10 minut, aż ciasto będzie gładkie i sprężyste.
> Uformuj kulę, przykryj i pozostaw na około 2 godziny w temperaturze pokojowej, aż wyraźnie urośnie. Delikatnie odgazuj i rozciągnij placek, zostawiając grubszy rant.
> Nie dodawaj sosu; rozprowadź dodatki bezpośrednio na cieście, zostawiając wolny rant. Rozłóż równomiernie: dynia pieczona, mozzarella, kiełbasa salsiccia.
> Piecz na mocno nagrzanym kamieniu lub stali do wyrośnięcia rantu i rumianego spodu. W piecu domowym przy 250–300°C zajmuje to zwykle 6–9 minut; w piecu profesjonalnym kontroluj już po 1–3 minutach.
> Rozłóż na cieście pieczoną dynię, mozzarellę i rozdrobnioną salsiccię. Piecz do zarumienienia rantu i pełnego dopieczenia kiełbasy; po wyjęciu dodaj drobno posiekaną szałwię.

# Bouillabaisse
@ cat=zupy origin=FR trad servings=1 prep=10 cook=16 art=soup tags=tradycyjne,zupa,kuchnia-francuska
: Prowansalska zupa rybna z szafranem.
140 g | ryba mieszana
40 g | małże
50 g | pomidor
0,1 g | szafran
1 szt. | czosnek
20 g | fenkuł
> Fenkuł pokrój w cienkie plasterki, pomidora w kostkę, a czosnek posiekaj. W garnku rozgrzej odrobinę oliwy, dodaj fenkuł i czosnek, smaż 3–4 minuty bez rumienienia.
> Dodaj pomidora, szafran i około 250 ml bulionu rybnego lub wody. Gotuj 8–10 minut, aż fenkuł zmięknie i wywar nabierze aromatu.
> Rybę pokrój na duże kawałki i włóż do lekko wrzącego wywaru. Gotuj delikatnie 3–5 minut, zależnie od grubości, nie mieszając intensywnie.
> Małże dodaj na końcu i gotuj pod przykryciem, aż się otworzą. Odrzuć muszle, które pozostały zamknięte; spróbuj wywaru i dopraw solą.
> Rozdziel kawałki ryby i małże między podgrzane miski, zalej gorącym wywarem i podawaj natychmiast.

# Miso shiru
@ cat=zupy origin=JP trad servings=1 prep=14 cook=20 art=soup tags=tradycyjne,zupa,kuchnia-japońska
: Klasyczna japońska zupa miso z tofu, wakame i dymką na aromatycznym bulionie dashi.
18 g | pasta miso
220 ml | dashi
40 g | tofu
3 g | wakame
8 g | cebula dymka
> Pokrój tofu w niewielką kostkę. Wakame przygotuj zgodnie z instrukcją na opakowaniu, jeśli używasz suszonych wodorostów; dymkę drobno posiekaj.
> Podgrzej dashi w garnku do gorącej temperatury, ale nie doprowadzaj do gwałtownego wrzenia.
> Odlej kilka łyżek gorącego dashi do miseczki, dodaj pastę miso i mieszaj, aż całkowicie się rozpuści.
> Zmniejsz ogień, wlej pastę miso z powrotem do garnka, dodaj tofu i wakame. Podgrzej delikatnie; nie gotuj intensywnie po dodaniu miso.
> Przelej zupę do miski i posyp dymką. Podawaj od razu, gdy bulion jest gorący, a tofu pozostaje delikatne.

# Tom yum
@ cat=zupy servings=1 prep=24 cook=35 art=soup tags=tradycyjne,zupa,kuchnia-azjatycka
: Pikantno-kwaśna tajska zupa z krewetkami.
80 g | krewetki
8 g | trawa cytrynowa
5 g | galangal
0,4 szt. | limonka
12 g | pasta tom yum
30 g | pieczarki
> Przygotuj bulion. Dodaj trawę cytrynową, galangal lub imbir, liście limonki i chili, jeśli są w składnikach. Gotuj kilka minut, aby uwolnić aromaty.
> Dodaj grzyby i twardsze warzywa, a po chwili krewetki lub inne owoce morza.
> Gotuj tylko do momentu, gdy owoce morza będą gotowe — zbyt długie gotowanie sprawia, że stają się gumowate.
> Zdejmij garnek z ognia i dopraw sokiem z limonki oraz sosem rybnym z receptury. Spróbuj równowagi kwaśnego, słonego i ostrego smaku.
> Zdejmij zupę z ognia, dodaj sok z limonki i spróbuj. Dopraw pastą tom yum do pożądanej ostrości; podawaj od razu, zanim krewetki staną się twarde.

# Tom kha gai
@ cat=zupy servings=1 prep=19 cook=29 art=soup tags=tradycyjne,zupa,kuchnia-azjatycka
: Tajska zupa kokosowa z kurczakiem.
80 g | filet z kurczaka
150 ml | mleko kokosowe
5 g | galangal
0,3 szt. | limonka
6 g | trawa cytrynowa
> Podgrzej bulion z mlekiem kokosowym. Dodaj trawę cytrynową, galangal lub imbir oraz liście limonki z receptury.
> Gotuj łagodnie kilka minut, aby płyn nabrał aromatu. Nie dopuszczaj do gwałtownego wrzenia mleka kokosowego.
> Dodaj pokrojonego kurczaka i grzyby. Gotuj delikatnie, aż mięso będzie całkowicie ugotowane.
> Zdejmij z ognia i dopraw sokiem z limonki oraz sosem rybnym. Sprawdź równowagę słoności i kwasowości.
> Podawaj gorącą, z kolendrą lub innymi ziołami z listy.

# Avgolemono
@ cat=zupy servings=1 prep=20 cook=30 art=soup tags=tradycyjne,zupa,kuchnia-śródziemnomorska
: Grecka zupa cytrynowo-jajeczna z ryżem.
240 ml | bulion z kury
25 g | ryż
44 g | jajko (roztrzepane)
0,3 szt. | cytryna
3 g | sól
> Przepłucz ryż. W garnku zagotuj bulion z kurczaka, wsyp ryż i gotuj na małym ogniu 15–18 minut, aż będzie miękki.
> W misce roztrzep jajko z sokiem z cytryny. Stopniowo wlewaj chochlę gorącego bulionu, cały czas ubijając, aby ogrzać jajko bez ścięcia.
> Zdejmij garnek z ognia i powoli wlej zahartowaną mieszankę jajeczno-cytrynową do zupy, energicznie mieszając.
> Podgrzewaj bardzo łagodnie przez 1–2 minuty, nie doprowadzając do wrzenia, bo jajko może się zwarzyć. Spróbuj i dopraw solą.
> Podawaj od razu, gdy zupa jest jedwabista i gorąca; po dodaniu jajka nie gotuj jej ponownie.

# Zupa z soczewicy
@ cat=zupy servings=1 prep=20 cook=29 art=soup tags=tradycyjne,zupa,kuchnia-śródziemnomorska
: Zupa z czerwonej soczewicy z kuminem.
50 g | soczewica czerwona
0,5 szt. | cebula
2 g | kumin
0,3 szt. | cytryna
4 g | kolendra
> Soczewicę wypłucz na sicie. Cebulę, marchew i inne warzywa z receptury pokrój w drobną kostkę.
> Podsmaż cebulę i przyprawy na tłuszczu z receptury, aż zaczną pachnieć. Dodaj pozostałe warzywa.
> Wsyp soczewicę, wlej bulion lub wodę i gotuj łagodnie, aż soczewica będzie miękka.
> Jeśli chcesz uzyskać gęstszą konsystencję, rozgnieć część soczewicy lub krótko zblenduj zupę. Dopraw solą i kwasem z receptury.
> Podawaj gorącą, z ziołami lub jogurtem, jeśli są w składnikach.

# Clam chowder
@ cat=zupy origin=US trad servings=1 prep=20 cook=29 art=soup tags=tradycyjne,zupa,kuchnia-amerykańska
: Kremowa zupa z małżami, ziemniakami i boczkiem.
80 g | małże
70 g | ziemniaki
30 ml | śmietana 18%
20 g | seler naciowy
15 g | boczek
8 g | masło
8 g | mąka pszenna
120 ml | bulion rybny lub drobiowy
80 ml | mleko
0,25 szt. | cebula
> Pokrój cebulę, seler i ziemniaki w drobną kostkę. Boczek wytop w garnku, dodaj masło, cebulę i seler; smaż 3–4 minuty.
> Wsyp mąkę i mieszaj przez minutę, następnie stopniowo wlewaj bulion, mleko i śmietanę, cały czas mieszając.
> Dodaj ziemniaki i gotuj łagodnie 12–15 minut, aż zmiękną. Jeśli zupa jest zbyt gęsta, dolej trochę bulionu.
> Dodaj małże na ostatnie 3–5 minut, tylko do ich ogrzania i pełnego ugotowania; nie gotuj długo, by nie stwardniały.
> Dopraw pieprzem i solą po spróbowaniu, a następnie podawaj gorącą.


# Pozole
@ cat=zupy origin=MX trad servings=1 prep=25 cook=38 art=soup tags=tradycyjne,zupa,kuchnia-meksykańska
: Meksykańska zupa z hominy i wieprzowiną.
90 g | wieprzowina
60 g | kukurydza hominy
2 g | oregano
20 g | rzodkiewka
0,3 szt. | limonka
> Wieprzowinę pokrój na większe kawałki. W garnku obsmaż mięso z każdej strony, aby nabrało koloru, a następnie dodaj wodę lub bulion tak, by było przykryte.
> Gotuj bardzo łagodnie 30–45 minut, aż mięso zacznie mięknąć; zdejmuj pianę z powierzchni. Dodaj odsączoną kukurydzę hominy i oregano.
> Gotuj kolejne 15–20 minut, aż wieprzowina będzie miękka. Wyjmij mięso, rozdziel widelcami na włókna i włóż z powrotem do garnka.
> Spróbuj wywaru i dopraw solą oraz oregano. Jeśli zupa jest zbyt gęsta, dolej trochę gorącej wody lub bulionu.
> Podawaj gorące, dodając do każdej porcji pokrojoną rzodkiewkę i sok z limonki. Dopraw oregano tuż przed podaniem.

# Mulligatawny
@ cat=zupy origin=IN trad servings=1 prep=14 cook=20 art=soup tags=tradycyjne,zupa,kuchnia-indyjska
: Indyjska zupa curry z soczewicą.
40 g | soczewica
50 g | kurczak
6 g | curry
40 ml | mleko kokosowe
20 g | jabłko
> Kurczaka pokrój w kostkę, jabłko obierz i pokrój, a soczewicę przepłucz. W garnku rozgrzej odrobinę oleju i obsmaż kurczaka przez 2–3 minuty.
> Dodaj curry i mieszaj przez 30 sekund, aż przyprawa zacznie pachnieć. Wsyp soczewicę i jabłko, po czym wlej około 300 ml bulionu.
> Gotuj łagodnie 18–22 minuty, aż soczewica zmięknie, a kurczak będzie całkowicie ugotowany. Mieszaj co kilka minut, aby soczewica nie przywarła.
> Wlej mleko kokosowe i podgrzewaj jeszcze 2–3 minuty na małym ogniu. Jeśli zupa jest zbyt gęsta, dolej bulionu.
> Spróbuj i skoryguj ilość curry oraz soli. Podawaj gorącą, najlepiej od razu po przygotowaniu.

# Gulaszowa zupa
@ cat=zupy servings=1 prep=24 cook=37 art=soup tags=tradycyjne,zupa
: Węgierska zupa gulaszowa z papryką.
90 g | wołowina
0,5 szt. | cebula
8 g | papryka słodka
60 g | ziemniaki
1 g | kminek
> Wołowinę pokrój w kostkę, cebulę posiekaj, a ziemniaki pokrój w większą kostkę. W garnku rozgrzej olej i obsmaż mięso partiami.
> Dodaj cebulę i smaż 3–4 minuty, aż zmięknie. Zdejmij garnek na chwilę z ognia, wsyp paprykę i kminek, szybko wymieszaj, aby papryka nie zgorzkniała.
> Wlej około 350 ml bulionu lub wody, zeskrob przypieczone drobiny z dna i duś pod przykryciem 35–50 minut, aż wołowina zacznie mięknąć.
> Dodaj ziemniaki i gotuj kolejne 15–20 minut, aż mięso i ziemniaki będą miękkie. W razie potrzeby uzupełnij płyn.
> Spróbuj, dopraw solą i pieprzem, a następnie podawaj bardzo gorącą.

# Caprese
@ cat=salatki origin=IT trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sałatka,świeże,kuchnia-włoska
: Pomidor, mozzarella, bazylia, oliwa.
100 g | pomidor
70 g | mozzarella
5 g | bazylia
12 ml | oliwa z oliwek
5 ml | ocet balsamiczny
> Pomidory i mozzarellę pokrój w plastry podobnej grubości.
> Ułóż na talerzu na przemian plastry pomidora i mozzarelli.
> Rozłóż świeże liście bazylii. Skrop oliwą z oliwek.
> Dopraw solą i świeżo mielonym pieprzem tuż przed podaniem.
> Podawaj w temperaturze pokojowej, aby pomidory zachowały pełnię smaku.

# Niçoise
@ cat=salatki origin=FR trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sałatka,świeże,kuchnia-francuska
: Tuńczyk, jajko, fasolka, oliwki, anchois.
60 g | tuńczyk
1 szt. | jajko
40 g | fasolka szparagowa
40 g | ziemniaki
15 g | oliwki
> Ugotuj ziemniaki do miękkości, ostudź i pokrój. Fasolkę gotuj 3–4 minuty w osolonej wodzie, a następnie schłodź w zimnej wodzie, by zachowała kolor.
> Jajko ugotuj na półtwardo lub twardo, zależnie od preferencji, obierz i przekrój. Tuńczyka odsącz; oliwki przekrój na połówki.
> Z oliwy, soku z cytryny, soli i pieprzu przygotuj dressing, energicznie mieszając do połączenia.
> Ułóż ziemniaki, fasolkę, tuńczyka, jajko i oliwki na talerzu. Polej dressingiem tuż przed podaniem, nie mieszając nadmiernie delikatnych składników.
> Spróbuj i skoryguj sól oraz kwasowość. Podawaj od razu, zanim fasolka straci chrupkość.

# Fattoush
@ cat=salatki servings=1 prep=8 cook=12 art=food tags=tradycyjne,sałatka,świeże,kuchnia-śródziemnomorska
: Chrupiący chleb pita, warzywa, sumak.
30 g | pita
40 g | ogórek
50 g | pomidor
2 g | sumak
20 g | rzodkiewka
12 ml | oliwa z oliwek
> Warzywa umyj i osusz. Pomidory, ogórek, rzodkiewkę i pozostałe składniki pokrój na kawałki podobnej wielkości.
> Pieczywo pokrój w kostkę i upiecz lub usmaż na złoto. Ostudź, aby pozostało chrupiące.
> Przygotuj dressing z oliwy, cytryny i przypraw z receptury.
> Połącz warzywa z ziołami i dressingiem tuż przed podaniem. Grzanki dodaj na sam koniec.
> Spróbuj i dopraw; podawaj, zanim pieczywo zmięknie.

# Sałatka z buraków i koziego sera
@ cat=salatki origin=FR trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sałatka,świeże,kuchnia-francuska
: Pieczone buraki, kozi ser, orzechy.
100 g | buraki
40 g | kozi ser
10 g | orzechy włoskie
20 g | rukola
12 ml | oliwa z oliwek
> Buraki upiecz w skórce lub ugotuj do miękkości, a następnie ostudź i obierz. Pokrój w cząstki.
> Przygotuj dressing z oliwy oraz składników kwaśnych z receptury. Zrównoważ słodycz buraków kwasowością.
> Ułóż buraki na talerzu, dodaj kozi ser i pozostałe składniki.
> Polej dressingiem tuż przed podaniem. Orzechy lub delikatne liście dodaj na sam koniec, aby zachowały teksturę.
> Sprawdź doprawienie i podawaj, zanim liście stracą jędrność.

# Poke bowl z łososiem
@ cat=salatki origin=US trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sałatka,świeże,kuchnia-amerykańska
: Miska z ryżem, surowym łososiem, edamame i mango.
80 g | łosoś sashimi
70 g | ryż sushi
30 g | edamame
40 g | mango
10 ml | sos sojowy
> Ryż dokładnie wypłucz i ugotuj zgodnie z instrukcją. Ostudź do temperatury pokojowej.
> Łososia przygotuj zgodnie z przeznaczeniem dania i wymaganiami bezpieczeństwa. Do podania na surowo używaj wyłącznie ryby przeznaczonej do takiego spożycia; w innym przypadku usmaż ją lub upiecz.
> Pokrój warzywa i dodatki na równe kawałki. Przygotuj sos z produktów wymienionych w recepturze.
> Do miski włóż ryż, ułóż na nim łososia i dodatki osobnymi grupami, a następnie polej sosem.
> Podawaj od razu, aby ryż nie nasiąkł nadmiernie dressingiem.

# Buddha bowl
@ cat=salatki servings=1 prep=8 cook=12 art=food tags=tradycyjne,sałatka,świeże,kuchnia-śródziemnomorska
: Komosa, pieczone warzywa, hummus, tahini.
50 g | komosa ryżowa
40 g | ciecierzyca
60 g | batat
30 g | hummus
30 g | jarmuż
> Komosę ryżową przepłucz na sicie i ugotuj w osolonej wodzie zgodnie z proporcją na opakowaniu; odstaw pod przykryciem na 5 minut, potem spulchnij widelcem.
> Batat pokrój w kostkę, wymieszaj z odrobiną oleju i solą, a następnie piecz w 200°C przez 20–25 minut, aż będzie miękki i lekko zrumieniony.
> Ciecierzycę odsącz i opłucz. Jarmuż porwij na kawałki, usuń twarde łodygi i krótko rozmasuj z odrobiną oliwy oraz szczyptą soli.
> Rozrzedź hummus lub tahini odrobiną wody i soku z cytryny, aż powstanie sos dający się polać łyżką.
> Do miski włóż komosę, batata, ciecierzycę i jarmuż. Dodaj hummusowy sos i podawaj, gdy batat jest jeszcze ciepły.

# Sałatka z komosą i granatem
@ cat=salatki servings=1 prep=8 cook=12 art=food tags=tradycyjne,sałatka,świeże,kuchnia-śródziemnomorska
: Komosa, granat, mięta, pistacje.
50 g | komosa ryżowa
40 g | granat
5 g | mięta
10 g | pistacje
0,3 szt. | cytryna
12 ml | oliwa z oliwek
> Komosę przepłucz na sicie i ugotuj do miękkości zgodnie z instrukcją na opakowaniu. Odcedź w razie potrzeby i pozostaw do przestudzenia.
> Wyłuskaj pestki granatu, pistacje posiekaj grubo, a miętę drobno posiekaj tuż przed użyciem.
> Wymieszaj sok z cytryny z oliwą, szczyptą soli i pieprzem, aż powstanie prosty dressing.
> Połącz przestudzoną komosę z pestkami granatu, miętą i pistacjami. Polej dressingiem i delikatnie wymieszaj.
> Spróbuj i skoryguj kwasowość oraz sól. Podawaj od razu albo schłodź krótko, jeśli wolisz sałatkę na zimno.

# Fondant czekoladowy
@ cat=desery origin=FR trad servings=1 prep=18 cook=28 art=dessert tags=tradycyjne,deser,kuchnia-francuska
: Czekoladowe ciasto z płynnym środkiem.
50 g | czekolada gorzka
10 g | masło
1 szt. | jajko
20 g | cukier
12 g | mąka pszenna
> Rozpuść czekoladę z masłem nad parą lub w krótkich seriach w mikrofalówce. Odstaw, aby lekko przestygła.
> Jajko utrzyj z cukrem, wmieszaj czekoladę z masłem, a następnie przesianą mąkę. Nie mieszaj dłużej, niż to konieczne.
> Napełnij natłuszczone foremki do około ¾ wysokości.
> Piecz w 200°C przez 8–12 minut: brzegi powinny być ścięte, a środek pozostać płynny.
> Odczekaj minutę, wyjmij ostrożnie z foremek i podawaj od razu.

# Panna cotta
@ cat=desery origin=IT trad servings=1 prep=13 cook=20 art=dessert tags=tradycyjne,deser,kuchnia-włoska
: Delikatna panna cotta z coulis malinowym.
100 ml | śmietanka 30%
15 g | cukier
3 g | żelatyna
1 g | wanilia
40 g | maliny
> Żelatynę zalej niewielką ilością zimnej wody i odstaw do napęcznienia.
> Podgrzej śmietankę z cukrem i wanilią, nie doprowadzając do wrzenia. Zdejmij z ognia i rozpuść w niej żelatynę.
> Rozlej do foremek, ostudź i wstaw do lodówki na co najmniej 4 godziny.
> Maliny podgrzej krótko i przetrzyj przez sito, jeśli chcesz uzyskać gładki sos.
> Podawaj panna cottę z coulis malinowym.

# Profiteroles
@ cat=desery origin=FR trad servings=1 prep=22 cook=32 art=dessert tags=tradycyjne,deser,kuchnia-francuska
: Ptysie z bitą śmietaną i czekoladą.
30 g | mąka pszenna
20 g | masło
44 g | jajko (roztrzepane)
40 ml | śmietanka 30%
25 g | czekolada
> W garnku zagotuj 40 ml wody z masłem i szczyptą soli. Zdejmij z ognia, wsyp mąkę i energicznie mieszaj, aż powstanie jednolita kula odchodząca od ścianek.
> Postaw garnek na małym ogniu i mieszaj ciasto przez 1–2 minuty, aby je odparować. Przełóż do miski i przestudź przez kilka minut.
> Jajko dodawaj stopniowo, miksując po każdej porcji, aż ciasto będzie gładkie i będzie powoli spływać z łopatki. Przełóż do rękawa cukierniczego.
> Wyciśnij małe porcje na blachę z papierem, zostawiając odstępy. Piecz w 200°C przez 10 minut, następnie obniż do 180°C i piecz kolejne 15–20 minut bez otwierania piekarnika.
> Po upieczeniu nakłuj każdy ptyś i pozostaw w wyłączonym piekarniku z uchylonymi drzwiczkami na 5 minut. Po całkowitym ostudzeniu napełnij ubitą śmietanką i polej roztopioną czekoladą.

# Brownie
@ cat=desery origin=US trad servings=1 prep=33 cook=49 art=dessert tags=tradycyjne,deser,kuchnia-amerykańska
: Wilgotne ciasto czekoladowe z orzechami.
50 g | czekolada
30 g | masło
35 g | cukier
44 g | jajko (roztrzepane)
20 g | mąka pszenna
15 g | orzechy włoskie
> Rozpuść czekoladę z masłem i odstaw do lekkiego przestudzenia.
> Wymieszaj jajko z cukrem, dodaj czekoladę, mąkę i posiekane orzechy. Nie ubijaj masy na puszysto.
> Przełóż masę do niewielkiej formy wyłożonej papierem do pieczenia.
> Piecz w 170°C przez około 18–25 minut. Środek powinien pozostać wilgotny.
> Ostudź przed porcjowaniem, aby brownie nie kruszyło się.

# Amerykańska szarlotka
@ cat=desery origin=US trad servings=1 prep=22 cook=33 art=dessert tags=tradycyjne,deser,kuchnia-amerykańska
: Amerykańska szarlotka z cynamonem.
60 g | mąka pszenna
35 g | masło
150 g | jabłko
2 g | cynamon
25 g | cukier
> Zagnieć mąkę z zimnym masłem, połową cukru i 1–2 łyżkami zimnej wody, tylko do połączenia. Spłaszcz ciasto i schłodź przez 20 minut.
> Jabłka obierz, usuń gniazda nasienne i pokrój w cienkie plasterki. Wymieszaj z pozostałym cukrem i cynamonem; jeśli puszczą dużo soku, odlej jego nadmiar.
> Większą częścią ciasta wylep małą formę, ułóż jabłka i przykryj pozostałym ciastem lub kratką. Zlep brzegi i natnij wierzch, by para mogła uchodzić.
> Piecz w 190°C przez 35–45 minut, aż ciasto będzie złociste, a jabłka miękkie. Jeśli wierzch rumieni się zbyt szybko, przykryj go luźno folią.
> Pozostaw w formie na co najmniej 20 minut, żeby nadzienie lekko zgęstniało. Podawaj ciepłą lub w temperaturze pokojowej.

# Bułeczki cynamonowe
@ cat=desery origin=US trad servings=1 prep=24 cook=36 art=dessert tags=tradycyjne,deser,kuchnia-amerykańska
: Drożdżowe bułeczki cynamonowe z lukrem.
80 g | mąka pszenna
45 ml | mleko
20 g | masło
4 g | cynamon
20 g | cukier
> Rozetrzyj drożdże z letnim mlekiem i łyżeczką cukru. Odstaw na 8–10 minut, aż zaczyn zacznie się pienić.
> Połącz mąkę z pozostałym cukrem, dodaj zaczyn i wyrabiaj kilka minut. Wgnieć miękkie masło i wyrabiaj do uzyskania gładkiego, elastycznego ciasta.
> Przykryj i pozostaw na 45–60 minut do podwojenia objętości. Rozwałkuj w prostokąt, posmaruj cienko masłem i posyp cynamonem wymieszanym z cukrem.
> Zwiń ciasto w rulon, pokrój na równe kawałki i ułóż w natłuszczonej formie. Przykryj na 20–30 minut, a następnie piecz w 180°C przez 20–25 minut.
> Wyjmij, gdy bułeczki będą złociste i wypieczone w środku. Po lekkim przestudzeniu polej lukrem, jeśli go przygotowujesz, i podawaj.

# Mochi z matchą
@ cat=desery origin=JP trad servings=1 prep=19 cook=29 art=dessert tags=tradycyjne,deser,kuchnia-japońska
: Japońskie mochi z pastą herbaty matcha.
50 g | mąka ryżowa kleista
20 g | cukier
60 ml | woda
3 g | matcha
25 g | pasta czerwonej fasoli
> Wymieszaj kleistą mąkę ryżową, cukier, matchę i wodę do uzyskania jednolitej masy bez grudek.
> Podgrzewaj masę w krótkich seriach, za każdym razem dokładnie mieszając, albo ugotuj ją na parze, aż stanie się lepka i lekko przezroczysta.
> Oprósz blat skrobią, jeśli jest w składnikach, i podziel jeszcze ciepłą masę na porcje.
> Spłaszcz porcje, nałóż pastę z czerwonej fasoli i dokładnie zlep brzegi.
> Podawaj w dniu przygotowania — po dłuższym chłodzeniu mochi twardnieją.

# Dorayaki
@ cat=desery origin=JP trad servings=1 prep=20 cook=30 art=dessert tags=tradycyjne,deser,kuchnia-japońska
: Japońskie placki z pastą anko.
40 g | mąka pszenna
33 g | jajko (roztrzepane)
18 g | cukier
30 g | pasta anko
> Wymieszaj jajko z cukrem, dodaj mąkę i pozostałe składniki ciasta. Odstaw na kilka minut.
> Rozgrzej nieprzywierającą patelnię na średnio małym ogniu i nakładaj małe porcje ciasta.
> Smaż, aż na powierzchni pojawią się pęcherzyki, a spód się zarumieni. Odwróć i krótko dosmaż drugą stronę.
> Ostudź placuszki do temperatury pokojowej.
> Nałóż pastę anko pomiędzy dwa placuszki, lekko dociśnij brzegi i podawaj.

# Churros
@ cat=desery origin=MX trad servings=1 prep=26 cook=39 art=dessert tags=tradycyjne,deser,kuchnia-meksykańska
: Smażone ciastka z cynamonem i czekoladą.
50 g | mąka pszenna
60 ml | woda
15 g | masło
2 g | cynamon
25 g | czekolada
> Zagotuj wodę z masłem i składnikami przewidzianymi na ciasto. Wsyp mąkę i energicznie mieszaj, aż powstanie gładka masa.
> Lekko przestudź ciasto i przełóż do rękawa cukierniczego z gwiazdkową końcówką.
> Rozgrzej olej do 170–175°C. Wyciskaj krótkie paski ciasta i smaż partiami na złoto, nie przepełniając garnka.
> Odsącz churros na papierze i obtocz w cukrze z cynamonem, jeśli są w składnikach.
> Podawaj z rozpuszczoną czekoladą do maczania.

# Tres leches
@ cat=desery origin=MX trad servings=1 prep=20 cook=29 art=dessert tags=tradycyjne,deser,kuchnia-meksykańska
: Biszkopt nasączony trzema rodzajami mleka.
40 g | mąka pszenna
1 szt. | jajko
40 ml | mleko skondensowane
40 ml | mleko odtłuszczone
30 ml | śmietanka 30%
> Rozgrzej piekarnik do 175°C. Oddziel jajko, ubij białko na sztywną pianę, a żółtko utrzyj z częścią mleka skondensowanego.
> Wsyp mąkę do żółtka i wymieszaj do połączenia. Delikatnie wmieszaj pianę w dwóch turach, by zachować puszystość.
> Przełóż ciasto do małej natłuszczonej formy i piecz 18–22 minuty, aż wierzch będzie sprężysty, a patyczek wyjdzie bez surowego ciasta.
> Wymieszaj mleko skondensowane, mleko odtłuszczone i śmietankę. Nakłuj ciepły biszkopt w wielu miejscach i powoli polej mieszanką, dając jej czas na wchłonięcie.
> Ostudź, przykryj i schłodź w lodówce przez co najmniej 4 godziny. Kroić dopiero po schłodzeniu, aby biszkopt utrzymał kształt.

# Baklava
@ cat=desery servings=1 prep=14 cook=20 art=dessert tags=tradycyjne,deser,kuchnia-śródziemnomorska
: Warstwowe ciasto filo z orzechami i syropem.
60 g | ciasto filo
30 g | orzechy włoskie
25 g | masło
25 g | miód
1 g | cynamon
> Posiekaj orzechy dość drobno i wymieszaj z cynamonem. Rozgrzej piekarnik do 180°C, a masło roztop i pozostaw w płynnej postaci.
> Posmaruj małą formę masłem. Układaj arkusze filo warstwami, smarując każdy cienko masłem; po kilku arkuszach rozsyp część orzechów.
> Powtarzaj warstwy filo i orzechów, kończąc kilkoma arkuszami ciasta posmarowanymi masłem. Ostrym nożem natnij porcje przed pieczeniem.
> Piecz przez 25–35 minut, aż wierzch będzie głęboko złocisty i chrupiący. Jeśli brzegi rumienią się szybciej, obniż temperaturę do 170°C.
> Podgrzej miód z 1–2 łyżkami wody, nie doprowadzając do mocnego wrzenia. Polej gorącą baklavę syropem i pozostaw do całkowitego ostygnięcia, by warstwy go wchłonęły.

# Basbousa
@ cat=desery servings=1 prep=16 cook=23 art=dessert tags=tradycyjne,deser,kuchnia-śródziemnomorska
: Kasza manna z syropem różanym.
50 g | kasza manna
40 g | jogurt
25 g | cukier
5 ml | woda różana
10 g | migdały
> Rozgrzej piekarnik do 180°C. Wymieszaj kaszę mannę z cukrem, a następnie dodaj jogurt i wodę różaną.
> Połącz składniki tylko do uzyskania gęstej, równomiernej masy. Odstaw na 5–10 minut, aby kasza manna wchłonęła część wilgoci.
> Przełóż masę do małej natłuszczonej formy i wyrównaj powierzchnię. Natnij w romby i umieść migdał na środku każdej porcji.
> Piecz 25–30 minut, aż wierzch będzie złocisty, a środek całkowicie ścięty. W razie potrzeby dopiecz kilka minut pod górną grzałką, obserwując kolor.
> Pozostaw na 5 minut, po czym polej cienko syropem cukrowym, jeśli został przygotowany, i odstaw do wchłonięcia. Pokrój wzdłuż nacięć po przestudzeniu.

# Gulab jamun
@ cat=desery origin=IN trad servings=1 prep=20 cook=29 art=dessert tags=tradycyjne,deser,kuchnia-indyjska
: Smażone kuleczki serowe w syropie różanym.
40 g | mleko w proszku
10 g | mąka pszenna
40 g | cukier
4 ml | woda różana
1 g | kardamon
> Przygotuj ciasto lub masę, łącząc składniki tylko do uzyskania jednolitej konsystencji.
> Uformuj równe porcje. Przygotuj dodatki i cukier do obtoczenia przed rozpoczęciem smażenia.
> Rozgrzej olej do temperatury właściwej dla deseru (zwykle 170–175°C). Smaż małymi partiami, aby temperatura oleju nie spadła.
> Odsącz na papierze. Jeśli deser podaje się w syropie, przełóż go do ciepłego syropu, nie wrzącego.
> Podawaj kulki po namoczeniu w ciepłym syropie cukrowym aromatyzowanym kardamonem i wodą różaną; przed podaniem daj im kilka minut, aby nasiąkły.

# Kulfi pistacjowe
@ cat=desery origin=IN trad servings=1 prep=18 cook=26 art=dessert tags=tradycyjne,deser,kuchnia-indyjska
: Indyjskie lody pistacjowe z kardamonem.
150 ml | mleko pełne
20 g | pistacje
25 g | cukier
1 g | kardamon
> Posiekaj pistacje drobno; odłóż łyżeczkę do dekoracji, a resztę utrzyj lub zmiksuj na pastę z odrobiną mleka.
> Podgrzewaj mleko z cukrem i kardamonem na małym ogniu, mieszając, aż cukier się rozpuści.
> Dodaj pastę pistacjową i gotuj bardzo łagodnie 8–10 minut, często mieszając, aż masa lekko zgęstnieje.
> Ostudź, przelej do małych foremek i zamrażaj minimum 6 godzin. Po pierwszej godzinie przemieszaj masę, jeśli nie używasz foremek do kulfi.
> Wyjmij z zamrażarki 5 minut przed podaniem i posyp odłożonymi pistacjami.


# Matcha tiramisu
@ cat=desery origin=JP trad servings=1 prep=28 cook=42 art=dessert tags=tradycyjne,deser,kuchnia-japońska
: Tiramisu z herbatą matcha zamiast kawy.
70 g | mascarpone
4 g | matcha
35 g | biszkopty
18 g | cukier
28 g | jajko (roztrzepane)
> Przesiej matchę i wymieszaj z niewielką ilością gorącej, ale nie wrzącej wody, aż powstanie gładka pasta. Odstaw do ostygnięcia.
> Oddziel jajko. Utrzyj żółtko z cukrem na jaśniejszą masę, a następnie krótko wmieszaj mascarpone, aby krem pozostał gładki.
> Ubij białko na sztywną pianę i delikatnie połącz z kremem. Jeśli nie używasz jaj pasteryzowanych, wybierz bezpieczną obróbkę lub pomiń surowe białko.
> Biszkopty szybko zanurzaj w rozcieńczonej matchy i ułóż warstwę w naczyniu. Przykryj częścią kremu, powtórz warstwy i wyrównaj wierzch.
> Przykryj i schłodź w lodówce przez co najmniej 4 godziny. Przed podaniem oprósz cienką warstwą matchy.

# Pavlova
@ cat=desery servings=1 prep=14 cook=22 art=dessert tags=tradycyjne,deser
: Beza z bitą śmietaną i owocami.
2 szt. | białko
50 g | cukier
50 ml | śmietanka 30%
60 g | owoce sezonowe
> Białka ubij do miękkiej piany. Stopniowo dodawaj cukier i ubijaj, aż piana będzie gęsta, błyszcząca i bez wyczuwalnych kryształków.
> Uformuj na papierze do pieczenia blat z lekko podniesionymi brzegami.
> Susz w 110–120°C przez około 75–90 minut, następnie wyłącz piekarnik i pozostaw bezę do stopniowego ostygnięcia.
> Ubij śmietankę dopiero przed podaniem.
> Nałóż śmietankę i owoce tuż przed serwowaniem, aby beza pozostała chrupiąca.

# Shakshuka
@ cat=inne servings=1 prep=4 cook=6 art=food tags=tradycyjne,śniadanie,kuchnia-śródziemnomorska
: Jajka usmażone w pikantnym sosie pomidorowym.
1 szt. | jajko
120 g | pomidor
40 g | papryka
0,5 szt. | cebula
1 g | kumin
3 g | kolendra
> Pokrój pomidora, paprykę i cebulę w drobną kostkę. Na patelni rozgrzej odrobinę oleju i smaż cebulę z papryką 5–6 minut, aż zmiękną.
> Dodaj pomidora, kumin, kolendrę i sól. Duś 8–10 minut, mieszając, aż powstanie gęsty sos; jeśli patelnia wysycha, dolej 1–2 łyżki wody.
> Spróbuj sosu i skoryguj przyprawy. Rozprowadź go równą warstwą i zrób łyżką małe wgłębienie.
> Wbij jajko do wgłębienia, przykryj patelnię i duś na małym ogniu 5–7 minut, aż białko się zetnie, a żółtko pozostanie płynne lub osiągnie preferowany stopień ścięcia.
> Podawaj na gorąco prosto z patelni, z pieczywem, jeśli masz je pod ręką.

# Jajka po benedyktyńsku
@ cat=inne origin=US trad servings=1 prep=4 cook=6 art=food tags=tradycyjne,śniadanie,kuchnia-amerykańska
: Jajko w koszulce na pieczywie, podane z sosem holenderskim.
1 szt. | muffin angielski
1 szt. | jajko
30 g | szynka
9 g | żółtko
10 g | masło
0,3 szt. | cytryna
> Przygotuj sos holenderski: ubij żółtko z sokiem z cytryny nad łagodną parą, po czym stopniowo wlewaj ciepłe, roztopione masło, cały czas ubijając, aż sos zgęstnieje.
> Przekrój muffin angielski i podpiecz obie połówki na suchej patelni lub w tosterze. Szynkę podgrzej krótko na patelni.
> W szerokim rondlu zagotuj wodę, po czym zmniejsz ogień do lekkiego wrzenia. Wbij jajko do miseczki i delikatnie wsuń do wody; gotuj 3–4 minuty.
> Wyjmij jajko łyżką cedzakową i odsącz. Sprawdź, czy białko jest ścięte, a żółtko pozostaje miękkie.
> Na podpieczonym muffinie ułóż szynkę i jajko w koszulce, polej sosem holenderskim i podawaj natychmiast.

# Gofry brukselskie
@ cat=inne servings=1 prep=6 cook=10 art=food tags=tradycyjne,śniadanie
: Chrupiące gofry z owocami i bitą śmietaną.
60 g | mąka pszenna
70 ml | mleko
39 g | jajko (roztrzepane)
15 g | masło
40 g | owoce
> Wymieszaj składniki suche. W osobnej misce połącz jajko, mleko i pozostałe składniki płynne, a następnie połącz obie mieszanki bez nadmiernego mieszania.
> Rozgrzej patelnię lub gofrownicę i lekko natłuść, jeśli wymaga tego urządzenie.
> Nakładaj porcje ciasta i smaż lub piecz do uzyskania złotej powierzchni. Nie dociskaj placków podczas smażenia.
> Obróć placki, gdy brzegi się zetną i pojawią się pęcherzyki, albo piecz gofry do uzyskania chrupkości.
> Podawaj od razu z dodatkami z listy.

# Owsianka z owocami
@ cat=inne servings=1 prep=10 cook=15 art=food tags=tradycyjne,śniadanie
: Owsianka na mleku z owocami sezonowymi.
50 g | płatki owsiane
150 ml | mleko
0,4 szt. | banan
8 g | miód
8 g | orzechy
> Wsyp płatki do małego rondla, wlej mleko i dodaj szczyptę soli. Doprowadź do lekkiego wrzenia, często mieszając.
> Zmniejsz ogień i gotuj 4–6 minut, aż płatki zmiękną, a owsianka osiągnie kremową konsystencję. W razie potrzeby dolej trochę mleka.
> Zdejmij rondel z ognia i odstaw na minutę. W tym czasie pokrój banana, a orzechy grubo posiekaj.
> Przełóż owsiankę do miski i dodaj banana oraz orzechy.
> Polej miodem i podawaj od razu, zanim płatki nadmiernie zgęstnieją.

# Granola bowl
@ cat=inne origin=US trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,śniadanie,kuchnia-amerykańska
: Jogurt, granola, owoce i nasiona.
120 g | jogurt naturalny
35 g | granola
50 g | owoce jagodowe
5 g | nasiona chia
> Nałóż jogurt naturalny do miski i wyrównaj powierzchnię łyżką.
> Jeśli owoce jagodowe są świeże, delikatnie je opłucz i osusz; mrożone pozostaw na kilka minut do lekkiego rozmrożenia.
> Rozsyp granolę na jogurcie, zostawiając część na wierzch, aby zachować chrupiącą teksturę.
> Posyp owocami jagodowymi i nasionami chia. Jeśli jogurt jest bardzo gęsty, możesz dodać łyżkę mleka.
> Podawaj od razu, aby granola nie nasiąkła jogurtem.

# Tost z awokado
@ cat=inne origin=US trad servings=1 prep=7 cook=10 art=food tags=tradycyjne,śniadanie,kuchnia-amerykańska
: Tost z awokado, jajkiem i chili.
50 g | chleb żytni
70 g | awokado
1 szt. | jajko
1 g | chilli płatki
0,3 szt. | cytryna
> Opiecz chleb na złoty kolor. Rozgnieć awokado z sokiem z cytryny, dopraw solą i płatkami chilli, rozsmaruj na grzance i ułóż na wierzchu jajko sadzone lub ugotowane według preferencji.
> Podpiecz pieczywo, jeśli pasuje do dania, tak aby było chrupiące z zewnątrz, ale nie wyschło.
> Rozprowadź sos lub smarowidło na pieczywie, a następnie ułóż składniki w kolejności, która utrzyma kanapkę stabilnie.
> Dodaj delikatne liście i świeże składniki na końcu, aby nie zwiędły od gorących elementów.
> Przekrój i podawaj od razu.

# Tamagoyaki
@ cat=inne origin=JP trad servings=1 prep=8 cook=13 art=food tags=tradycyjne,śniadanie,kuchnia-japońska
: Japoński omlet na słodko, zwijany.
2 szt. | jajko
5 ml | sos sojowy
8 ml | mirin
4 g | cukier
> Roztrzep jajka z sosem sojowym, mirinem i cukrem, aż składniki się połączą. Przygotuj lekko natłuszczoną patelnię na małym ogniu.
> Wlej cienką warstwę masy jajecznej i przechyl patelnię, aby pokryła dno. Gdy wierzch będzie jeszcze lekko wilgotny, zwiń omlet w rulon przy pomocy pałeczek lub łopatki.
> Przesuń rulon na brzeg patelni, natłuść wolną część i wlej kolejną cienką warstwę, unosząc rulon, aby masa wpłynęła pod spód.
> Gdy nowa warstwa prawie się zetnie, zwiń ją wokół istniejącego rulonu. Powtarzaj do wykorzystania masy, utrzymując niski ogień, by omlet nie przypalił się.
> Przełóż na deskę, pozostaw na minutę i pokrój w grube plastry. Podawaj ciepłe lub w temperaturze pokojowej.

# Onigiri z łososiem
@ cat=inne origin=JP trad servings=1 prep=6 cook=10 art=food tags=tradycyjne,śniadanie,kuchnia-japońska
: Japońskie kulki ryżowe z nadzieniem z łososia i nori.
90 g | ryż sushi
30 g | łosoś
1 szt. | nori
1 g | sól
> Ugotuj ryż sushi w proporcji zalecanej na opakowaniu, aż będzie kleisty; odstaw pod przykryciem na 10 minut.
> Upiecz łososia na patelni lub w piekarniku do pełnego ugotowania, ostudź i rozdrobnij widelcem.
> Zwilż dłonie, oprósz je solą i uformuj porcję ryżu wokół łososia w trójkąt, dokładnie zamykając farsz.
> Podziel arkusz nori na paski i owiń nimi onigiri bezpośrednio przed jedzeniem, żeby pozostały chrupiące.
> Podawaj od razu lub przechowuj krótko w lodówce, szczelnie owinięte, aby ryż nie wysechł.


# Huevos rancheros
@ cat=inne origin=MX trad servings=1 prep=7 cook=10 art=food tags=tradycyjne,śniadanie,kuchnia-meksykańska
: Jajka sadzone na tortillas z salsą.
2 szt. | jajko
2 szt. | tortilla kukurydziana
40 g | salsa
30 g | fasola
30 g | awokado
> Podgrzej tortille na suchej patelni po 20–30 sekund z każdej strony i odłóż pod przykryciem, aby nie wyschły.
> Podgrzej fasolę na małym ogniu z łyżką wody, mieszając, aż będzie gorąca. Salsę również lekko podgrzej lub podawaj w temperaturze pokojowej.
> Na patelni rozgrzej niewielką ilość oleju i usmaż jajka sadzone, aż białka się zetną; żółtka pozostaw płynne lub smaż dłużej według uznania.
> Ułóż tortille na talerzu, rozsmaruj fasolę i dodaj salsę. Na wierzchu umieść usmażone jajka.
> Na koniec dodaj pokrojone awokado i podawaj od razu, zanim tortille zmiękną.

# Croissant z masłem
@ cat=inne origin=FR trad servings=1 prep=9 cook=13 art=food tags=tradycyjne,śniadanie,kuchnia-francuska
: Wypiekany croissant z dobrym masłem.
1 szt. | croissant
10 g | masło
15 g | dżem morelowy
> Przekrój croissanta wzdłuż i podgrzej krótko w piekarniku w 170°C, aż będzie chrupiący. Podawaj z masłem i dżemem morelowym.
> Podpiecz pieczywo, jeśli pasuje do dania, tak aby było chrupiące z zewnątrz, ale nie wyschło.
> Rozprowadź sos lub smarowidło na pieczywie, a następnie ułóż składniki w kolejności, która utrzyma kanapkę stabilnie.
> Dodaj delikatne liście i świeże składniki na końcu, aby nie zwiędły od gorących elementów.
> Przekrój i podawaj od razu.

# Jajecznica po francusku
@ cat=inne origin=FR trad servings=1 prep=9 cook=13 art=food tags=tradycyjne,śniadanie,kuchnia-francuska
: Kremowa jajecznica na wolnym ogniu.
2 szt. | jajko
10 g | masło
15 ml | śmietanka 30%
3 g | szczypiorek
> Roztrzep jajka ze śmietanką i szczyptą soli. Roztop masło na małym ogniu, nie dopuszczając do zbrązowienia.
> Wlej masę jajeczną na patelnię i mieszaj silikonową łopatką powoli, zgarniając ścięte fragmenty z dna i boków.
> Utrzymuj mały ogień; jeśli jajka ścinają się zbyt szybko, na chwilę zdejmij patelnię z palnika i nadal mieszaj.
> Gdy masa zacznie gęstnieć, ale pozostanie wilgotna i kremowa, zdejmij patelnię z ognia. Ciepło resztkowe dokończy ścinanie.
> Posiekaj szczypiorek, wmieszaj połowę do jajek, a resztą posyp wierzch. Podawaj natychmiast.

# Baguette
@ cat=pieczywo origin=FR trad servings=1 prep=180 cook=24 art=bread tags=tradycyjne,pieczywo,pieczone,kuchnia-francuska
: Francuska bagietka o chrupiącej skórce i sprężystym miękiszu.
120 g | mąka pszenna
78 ml | woda
1 g | drożdże
2,4 g | sól
> Wymieszaj mąkę z wodą i odstaw na 20 minut. Dodaj drożdże oraz sól i wyrabiaj, aż ciasto stanie się gładkie i elastyczne.
> Przykryj ciasto i fermentuj około 90 minut, wykonując dwa delikatne składania w odstępach 30 minut.
> Uformuj podłużną bagietkę, zamknij łączenie i pozostaw na płótnie do wyrośnięcia przez 30–45 minut.
> Nagrzej piekarnik do 240°C z blachą w środku. Natnij bagietkę pod kątem 3–4 razy i wstaw do piekarnika, wytwarzając parę na początku wypieku.
> Piecz 20–24 minuty, aż skórka będzie głęboko złota i chrupiąca. Studź na kratce przed krojeniem.


# Ciabatta
@ cat=pieczywo origin=IT trad servings=1 prep=72 cook=108 art=bread tags=tradycyjne,pieczywo,pieczone,kuchnia-włoska
: Włoska ciabatta o dużej dziurawości.
120 g | mąka pszenna
90 ml | woda
1 g | drożdże
8 ml | oliwa z oliwek
2,4 g | sól
> Połącz składniki do uzyskania bardzo wilgotnego ciasta. Nie dosypuj mąki bez potrzeby — ciabatta powinna mieć luźną strukturę.
> Podczas fermentacji wykonaj kilka serii delikatnego składania, aby wzmocnić gluten i zatrzymać pęcherze gazu.
> Przełóż ciasto na mocno oprószony mąką blat, podziel skrobką i formuj prostokątne bochenki bez mocnego odgazowywania.
> Pozostaw do krótkiego wyrośnięcia i piecz w 230°C z parą na początku, aż skórka będzie złota.
> Studź na kratce; nie krój gorącego pieczywa.

# Precel bawarski
@ cat=pieczywo servings=1 prep=90 cook=15 art=bread tags=tradycyjne,pieczywo,pieczone
: Miękki precel z charakterystyczną, ciemnobrązową skórką.
110 g | mąka pszenna
65 ml | woda
3 g | drożdże
5 g | soda oczyszczona
3 g | sól gruba
250 ml | woda do kąpieli
> Wymieszaj mąkę, 65 ml wody i drożdże, dodaj sól i wyrabiaj 5–7 minut, aż ciasto będzie sprężyste.
> Przykryj i pozostaw na 45–60 minut, aż lekko zwiększy objętość. Podziel na porcje, rozwałkuj na wałki cieńsze na końcach i uformuj precle.
> Schłodź uformowane precle przez 10–15 minut, aby lepiej zachowały kształt. Zagotuj 250 ml wody, rozpuść w niej sodę i zdejmij z ognia.
> Zanurz każdy precel w kąpieli sodowej na 15–20 sekund, wyjmij łyżką cedzakową i ułóż na blasze wyłożonej papierem.
> Posyp grubą solą i piecz w 220°C przez 12–15 minut, aż skórka będzie głęboko brązowa. Studź na kratce.


# Pita
@ cat=pieczywo servings=1 prep=72 cook=108 art=bread tags=tradycyjne,pieczywo,pieczone,kuchnia-śródziemnomorska
: Chleb pita z kieszonką.
100 g | mąka pszenna
65 ml | woda
2 g | drożdże
8 ml | oliwa z oliwek
2 g | sól
> Zagnieć mąkę, wodę, drożdże, sól i tłuszcz przewidziane w recepturze. Pozostaw do wyrośnięcia.
> Podziel na równe porcje, zaokrąglij i odstaw na 10 minut.
> Rozwałkuj na krążki o równej grubości. Przenieś na mocno nagrzaną blachę lub kamień.
> Piecz w 240–250°C przez kilka minut, aż placki napęcznieją i utworzą kieszeń.
> Przykryj czystą ściereczką po wypieku, aby skórka pozostała miękka.

# Naan
@ cat=pieczywo origin=IN trad servings=1 prep=72 cook=108 art=bread tags=tradycyjne,pieczywo,pieczone,kuchnia-indyjska
: Indyjski naan pieczony w piecu.
100 g | mąka pszenna
30 g | jogurt
2 g | drożdże
8 g | ghee
2 g | sól
> Połącz mąkę z jogurtem, wodą, środkiem spulchniającym lub drożdżami oraz solą z receptury. Wyrób miękkie ciasto.
> Pozostaw do odpoczynku lub wyrośnięcia zgodnie z użytym spulchniaczem.
> Podziel ciasto na porcje i rozwałkuj na owalne placki.
> Piecz na bardzo gorącej suchej patelni lub na rozgrzanej powierzchni, aż pojawią się pęcherze i przypieczone plamki. Obróć i dopiecz drugą stronę.
> Posmaruj masłem lub ghee, jeśli są w składnikach, i podawaj na gorąco.

# Brioche
@ cat=pieczywo origin=FR trad servings=1 prep=72 cook=108 art=bread tags=tradycyjne,pieczywo,pieczone,kuchnia-francuska
: Maślana brioche, puszysta i złota.
100 g | mąka pszenna
39 g | jajko (roztrzepane)
30 g | masło
30 ml | mleko
10 g | cukier
3 g | drożdże
> Połącz mąkę, drożdże, jajka i cukier. Wyrabiaj, aż ciasto zacznie być elastyczne, następnie stopniowo dodawaj miękkie masło.
> Kontynuuj wyrabianie, aż ciasto będzie gładkie i zacznie odchodzić od ścianek misy.
> Przykryj i pozostaw do wyrośnięcia, a następnie schłodź, aby łatwiej je formować.
> Uformuj bułki lub bochenek, przełóż do formy i pozostaw do ponownego wyrośnięcia. Posmaruj jajkiem, jeśli znajduje się w składnikach.
> Piecz w 175–185°C do głębokiego zrumienienia i dopieczenia środka.

# Bajgiel
@ cat=pieczywo origin=US trad servings=1 prep=72 cook=108 art=bread tags=tradycyjne,pieczywo,pieczone,kuchnia-amerykańska
: Okrągłe pieczywo z dziurką, gotowane przed pieczeniem.
110 g | mąka pszenna
65 ml | woda
2 g | drożdże
4 g | słód
4 g | sezam
2 g | sól
> Zagnieć zwarte ciasto drożdżowe i pozostaw do wyrośnięcia, aż wyraźnie zwiększy objętość.
> Podziel na porcje, uformuj wałki lub kulki z otworem i dokładnie sklej łączenie. Odstaw do krótkiego wyrastania.
> Gotuj bajgle krótko w wodzie, po około 30–60 sekund z każdej strony. Odcedź i posyp dodatkami, jeśli przewidziano je w recepturze.
> Piecz w 210–220°C, aż będą złote i sprężyste.
> Studź na kratce przed przekrojeniem.

# Challah
@ cat=pieczywo servings=1 prep=72 cook=28 art=bread tags=tradycyjne,pieczywo,pieczone
: Zaplatana chałka z jajkiem, delikatnie słodka i złocista.
110 g | mąka pszenna
28 g | jajko (roztrzepane)
55 ml | woda
10 g | cukier
3 g | drożdże
10 ml | olej
> Wymieszaj wodę, cukier i drożdże, odstaw na 5 minut, następnie dodaj mąkę oraz większość jajka i wyrabiaj 5–7 minut.
> Wlej olej cienkim strumieniem i wyrabiaj dalej, aż ciasto będzie gładkie i elastyczne. Przykryj i pozostaw do podwojenia objętości.
> Podziel ciasto na trzy wałki, zapleć chałkę i przełóż na blachę z papierem do pieczenia.
> Odstaw na 30–45 minut do napuszenia, posmaruj resztą jajka i piecz w 180°C przez około 20–25 minut, aż wierzch będzie złoty.
> Przełóż na kratkę i ostudź przed krojeniem.


# Sos pomidorowy napolitano
@ cat=sosy origin=IT trad servings=1 prep=8 art=food tags=tradycyjne,sos,kuchnia-włoska
: Sos pomidorowy napolitano — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
150 g | pomidor pelati
1 szt. | czosnek
4 g | bazylia
12 ml | oliwa z oliwek
3 g | sól
> Odcedź pomidory pelati, jeśli mają dużo soku, i rozgnieć je ręcznie na nierówną, soczystą pulpę.
> Czosnek drobno posiekaj lub zetrzyj i wymieszaj z pomidorami oraz solą.
> Porwij bazylię palcami i wmieszaj ją delikatnie do pomidorów.
> Wlej oliwę i wymieszaj tylko do połączenia; nie gotuj sosu, jeśli ma trafić na pizzę neapolitańską.
> Spróbuj sosu i odstaw na 10 minut, aby czosnek i bazylia oddały aromat.

# Pesto alla genovese
@ cat=sosy origin=IT trad servings=1 prep=8 art=food tags=tradycyjne,sos,kuchnia-włoska
: Pesto alla genovese — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
30 g | bazylia
10 g | piniole
20 g | parmezan
1 szt. | czosnek
12 ml | oliwa z oliwek
> Pinii delikatnie podpraż na suchej patelni tylko do uwolnienia aromatu, po czym całkowicie ostudź.
> Bazylię osusz bardzo dokładnie; mokre liście szybciej utleniają pesto i rozwadniają konsystencję.
> Utrzyj lub krótko pulsacyjnie zmiksuj bazylię z pinolami i czosnkiem.
> Dodaj drobno starty parmezan i wlewaj oliwę cienkim strumieniem, miksując tylko do uzyskania gęstego pesto.
> Nie podgrzewaj pesto. Przełóż do czystego pojemnika i przykryj powierzchnię cienką warstwą oliwy.

# Sos carbonara
@ cat=sosy origin=IT trad servings=1 prep=8 cook=5 art=food tags=tradycyjne,sos,kuchnia-włoska
: Sos carbonara — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
1 szt. | żółtko
40 g | guanciale
25 g | pecorino
1 g | pieprz czarny
> Guanciale pokrój w drobną kostkę i wytapiaj powoli na zimnej patelni, aż tłuszcz się wytopi, a kawałki będą złociste.
> Zdejmij patelnię z ognia i zachowaj wytopiony tłuszcz; nie dopuść, by guanciale zrobiło się gorzkie.
> Żółtko utrzyj z pecorino i świeżo mielonym pieprzem na gęstą pastę.
> Dodaj łyżkę gorącej wody z gotowania makaronu do pasty, mieszając energicznie, aby ją rozluźnić.
> Wymieszaj sos z gorącym makaronem poza bezpośrednim ogniem, dodając tłuszcz z guanciale stopniowo; sos ma być kremowy, nie jajecznicowy.

# Beszamel
@ cat=sosy origin=FR trad servings=1 prep=8 cook=8 art=food tags=tradycyjne,sos,kuchnia-francuska
: Beszamel — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
150 ml | mleko
15 g | masło
15 g | mąka pszenna
0,3 g | gałka muszkatołowa
3 g | sól
> Masło rozpuść w rondlu na średnio małym ogniu, nie dopuszczając do zbrązowienia.
> Wsyp mąkę i mieszaj rózgą przez 1–2 minuty, aby powstała jasna zasmażka bez surowego zapachu mąki.
> Ciepłe mleko wlewaj partiami, każdą porcję dokładnie rozprowadzając przed dolaniem następnej.
> Gotuj łagodnie przez 5–8 minut, stale mieszając, aż sos pokryje tył łyżki i nie będzie grudek.
> Dopraw solą oraz gałką muszkatołową; jeśli sos jest zbyt gęsty, rozrzedź go niewielką ilością mleka.

# Sos pieczarkowy
@ cat=sosy origin=PL trad servings=1 prep=8 cook=10 art=food tags=tradycyjne,sos,kuchnia-polska
: Sos pieczarkowy — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
80 g | pieczarki
0,5 szt. | cebula
30 ml | śmietana 18%
10 g | masło
4 g | natka pietruszki
> Pieczarki oczyść i pokrój w równe plastry; cebulę posiekaj drobno.
> Na maśle zeszklij cebulę, następnie dodaj pieczarki i smaż na dość mocnym ogniu, aż odparuje ich płyn.
> Zmniejsz ogień, wlej śmietanę i delikatnie podgrzewaj, nie dopuszczając do gwałtownego wrzenia.
> Gotuj kilka minut do lekkiego zgęstnienia, mieszając i zeskrobując smak z dna patelni.
> Natkę posiekaj i dodaj pod koniec; spróbuj sosu i dopraw przed podaniem.

# Salsa roja
@ cat=sosy origin=MX trad servings=1 prep=8 art=food tags=tradycyjne,sos,kuchnia-meksykańska
: Salsa roja — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
120 g | pomidor
0,5 szt. | jalapeño
1 szt. | czosnek
5 g | kolendra
0,3 szt. | limonka
> Pomidora przekrój na połówki; jalapeño i czosnek przygotuj w całości.
> Opiecz pomidora, jalapeño i czosnek na suchej, mocno rozgrzanej patelni, obracając, aż pojawią się ciemne plamki.
> Ostudź składniki na tyle, by można było je bezpiecznie zblendować; obierz luźną skórkę pomidora, jeśli odchodzi.
> Zmiksuj krótko z kolendrą i sokiem z limonki, pozostawiając lekko ziarnistą teksturę.
> Odstaw salsę na 10 minut, spróbuj i w razie potrzeby skoryguj ostrość lub kwasowość.

# Satay orzechowy
@ cat=sosy servings=1 prep=8 cook=5 art=food tags=tradycyjne,sos,kuchnia-azjatycka
: Satay orzechowy — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
40 g | masło orzechowe
40 ml | mleko kokosowe
10 ml | sos sojowy
0,2 szt. | limonka
> Masło orzechowe przełóż do małego rondla i rozmieszaj z mlekiem kokosowym.
> Dodaj sos sojowy i sok z limonki, mieszając do połączenia.
> Podgrzewaj na małym ogniu, często mieszając; nie doprowadzaj do mocnego wrzenia.
> Jeśli sos jest zbyt gęsty, dodaj odrobinę wody i ponownie wymieszaj do gładkiej konsystencji.
> Spróbuj i dopasuj balans słonego, kwaśnego i orzechowego smaku; podawaj ciepły lub w temperaturze pokojowej.

# Sos teriyaki
@ cat=sosy origin=JP trad servings=1 prep=8 cook=12 art=food tags=tradycyjne,sos,kuchnia-japońska
: Sos teriyaki — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
30 ml | sos sojowy
20 ml | mirin
10 g | cukier
3 g | imbir
> Wymieszaj sos sojowy, słodki składnik i pozostałe płyny z listy w małym rondlu.
> Podgrzewaj na średnim ogniu, mieszając, aż cukier się rozpuści.
> Gotuj łagodnie, aż sos lekko zgęstnieje i zacznie błyszczeć. Nie redukuj nadmiernie — po ostudzeniu zgęstnieje jeszcze bardziej.
> Spróbuj i w razie potrzeby zrównoważ smak składnikiem kwaśnym lub wodą, jeśli są przewidziane w recepturze.
> Ostudź lub użyj od razu jako glazury do potraw.

# Chimichurri
@ cat=sosy servings=1 prep=8 art=food tags=tradycyjne,sos
: Chimichurri — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
4 g | natka pietruszki
1 szt. | czosnek
2 g | oregano
10 ml | ocet winny
12 ml | oliwa z oliwek
1 g | chilli
> Natkę pietruszki posiekaj bardzo drobno, ale nie miksuj na gładką pastę.
> Czosnek posiekaj, a oregano rozetrzyj delikatnie w dłoniach, aby uwolnić aromat.
> Wymieszaj z octem winnym i chilli, po czym odstaw na 5 minut.
> Wlewaj oliwę, mieszając, aby zioła równomiernie się rozprowadziły.
> Pozostaw sos na co najmniej 15 minut przed podaniem; nie podgrzewaj, bo straci świeży aromat.

# Aioli
@ cat=sosy servings=1 prep=8 art=food tags=tradycyjne,sos,kuchnia-śródziemnomorska
: Aioli — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
9 g | żółtko
1 szt. | czosnek
12 ml | oliwa z oliwek
0,3 szt. | cytryna
3 g | sól
> Użyj pasteryzowanego żółtka i składników w podobnej temperaturze; czosnek rozetrzyj na gładką pastę.
> Żółtko ubij z solą, a następnie dodawaj oliwę dosłownie kropla po kropli, cały czas energicznie ubijając.
> Gdy emulsja zacznie gęstnieć, zwiększaj strumień oliwy, nie przestając mieszać.
> Dodaj czosnek i sok z cytryny; wymieszaj i sprawdź, czy konsystencja jest jednolita.
> Schłodź w lodówce w czystym, zamkniętym pojemniku i zużyj zgodnie z zasadami przechowywania sosów na bazie jaj.

# Sos serowy cheddar
@ cat=sosy origin=US trad servings=1 prep=8 cook=5 art=food tags=tradycyjne,sos,kuchnia-amerykańska
: Sos serowy cheddar — sos do dań głównych, makaronu lub warzyw, o konsystencji dopasowanej do sposobu podania.
50 g | cheddar
80 ml | mleko
10 g | masło
8 g | mąka pszenna
> Masło rozpuść w rondlu na małym ogniu i wsyp mąkę.
> Mieszaj zasmażkę przez 1–2 minuty, po czym stopniowo dolej mleko, rozprowadzając je rózgą.
> Gotuj łagodnie, aż baza zgęstnieje i będzie gładka.
> Zdejmij rondel z ognia i dodawaj cheddar partiami, mieszając do całkowitego roztopienia.
> Dopraw według receptury i podawaj od razu; przy odgrzewaniu podgrzewaj łagodnie, aby sos się nie rozwarstwił.

# Manhattan
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl,bar
: Klasyczny koktajl: rye, słodki wermut, bitters.
50 ml | whisky żytnia
25 ml | wermut słodki
2 ml | angostura
> Wymieszaj whiskey, słodki wermut i bitters z lodem w szklanicy barmańskiej. Przecedź do schłodzonego szkła.
> Spróbuj i skoryguj proporcje wyłącznie w granicach składników przewidzianych w recepturze.
> Użyj świeżego lodu i schłodzonego szkła, jeśli koktajl podaje się na zimno.
> Dodaj dekorację z owoców lub ziół wymienionych w składnikach.
> Podawaj natychmiast, zanim lód nadmiernie rozcieńczy napój.

# Mai Tai
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl,bar
: Klasyczny koktajl: rum, orgeat, limonka, orange curaçao.
40 ml | rum
15 ml | orgeat
20 ml | sok z limonki
15 ml | curaçao
> Wstrząśnij rumy, likier pomarańczowy, syrop migdałowy i sok z limonki z lodem. Przelej do szklanki z kruszonym lodem.
> Spróbuj i skoryguj proporcje wyłącznie w granicach składników przewidzianych w recepturze.
> Użyj świeżego lodu i schłodzonego szkła, jeśli koktajl podaje się na zimno.
> Dodaj dekorację z owoców lub ziół wymienionych w składnikach.
> Podawaj natychmiast, zanim lód nadmiernie rozcieńczy napój.

# Paloma
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl,bar
: Klasyczny koktajl: tequila, grejpfrut, soda.
45 ml | tequila
90 ml | sok grejpfrutowy
40 ml | woda gazowana
0,2 szt. | limonka
> Wlej tequilę i sok z limonki do szklanki z lodem, dopełnij sodą grejpfrutową i delikatnie wymieszaj.
> Spróbuj i skoryguj proporcje wyłącznie w granicach składników przewidzianych w recepturze.
> Użyj świeżego lodu i schłodzonego szkła, jeśli koktajl podaje się na zimno.
> Dodaj dekorację z owoców lub ziół wymienionych w składnikach.
> Podawaj natychmiast, zanim lód nadmiernie rozcieńczy napój.

# French 75
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl,bar
: Klasyczny koktajl: gin, cytryna, cukier, szampan.
30 ml | gin
15 ml | sok z cytryny
10 ml | syrop cukrowy
60 ml | szampan
> Wstrząśnij gin, sok cytrynowy i syrop z lodem, przecedź do kieliszka i dopełnij winem musującym.
> Spróbuj i skoryguj proporcje wyłącznie w granicach składników przewidzianych w recepturze.
> Użyj świeżego lodu i schłodzonego szkła, jeśli koktajl podaje się na zimno.
> Dodaj dekorację z owoców lub ziół wymienionych w składnikach.
> Podawaj natychmiast, zanim lód nadmiernie rozcieńczy napój.

# Sidecar
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl,bar
: Klasyczny koktajl: koniak, triple sec, cytryna.
50 ml | koniak
20 ml | triple sec
20 ml | sok z cytryny
> Wstrząśnij koniak, likier pomarańczowy i sok cytrynowy z lodem. Przecedź do schłodzonego kieliszka.
> Spróbuj i skoryguj proporcje wyłącznie w granicach składników przewidzianych w recepturze.
> Użyj świeżego lodu i schłodzonego szkła, jeśli koktajl podaje się na zimno.
> Dodaj dekorację z owoców lub ziół wymienionych w składnikach.
> Podawaj natychmiast, zanim lód nadmiernie rozcieńczy napój.

# Penicillin
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl,bar
: Klasyczny koktajl: whisky, imbir, miód, cytryna.
50 ml | whisky
8 g | imbir
10 g | miód
20 ml | sok z cytryny
> Do szklanicy włóż drobno starty imbir, dodaj miód i sok z cytryny. Wymieszaj, aż miód się rozpuści, po czym dolej whisky.
> Napełnij shaker lodem i energicznie wstrząsaj przez 10–12 sekund, aby napój dobrze się schłodził, a imbir oddał aromat.
> Przecedź dokładnie przez drobne sitko do niskiej szklanki wypełnionej świeżym lodem, żeby zatrzymać włókna imbiru.
> Spróbuj; jeśli imbir dominuje, następnym razem użyj go mniej, a jeśli napój jest zbyt ostry, dodaj odrobinę wody.
> Podawaj od razu, gdy lód jest jeszcze twardy, a aromat imbiru i cytryny pozostaje wyraźny.

# Americano
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl,bar
: Klasyczny koktajl: campari, wermut, soda.
30 ml | campari
30 ml | wermut słodki
60 ml | woda gazowana
> Wlej Campari i czerwony wermut do szklanki z lodem, dopełnij wodą gazowaną i udekoruj pomarańczą.
> Spróbuj i skoryguj proporcje wyłącznie w granicach składników przewidzianych w recepturze.
> Użyj świeżego lodu i schłodzonego szkła, jeśli koktajl podaje się na zimno.
> Dodaj dekorację z owoców lub ziół wymienionych w składnikach.
> Podawaj natychmiast, zanim lód nadmiernie rozcieńczy napój.

# Lemoniada cytrynowa
@ cat=cocktaile servings=1 prep=5 cook=0 art=drink tags=napój
: Orzeźwiająca lemoniada ze świeżego soku cytrynowego i mięty.
1 szt. | cytryna
15 g | cukier
250 ml | woda
3 g | mięta
> Wyciśnij sok z cytryny i usuń pestki; kilka cienkich plasterków zachowaj do dekoracji.
> Wymieszaj cukier z 30 ml ciepłej wody, aż całkowicie się rozpuści, po czym ostudź syrop.
> Wlej syrop i sok cytrynowy do dzbanka, dolej pozostałą zimną wodę i dokładnie wymieszaj.
> Lekko ugnieć liście mięty w dłoniach, dodaj do lemoniady i schłodź przez 10–15 minut.
> Podawaj w schłodzonej szklance z plasterkiem cytryny; lód dodaj tuż przed podaniem.


# Lemoniada ogórkowa
@ cat=cocktaile servings=1 prep=5 cook=0 art=drink tags=napój
: Lekka lemoniada ogórkowa z cytryną i miodem.
60 g | ogórek
0,5 szt. | cytryna
250 ml | woda
10 g | miód
> Pokrój ogórek w cienkie plasterki, a z cytryny wyciśnij sok i usuń pestki.
> Rozmieszaj miód w 2–3 łyżkach letniej wody, aż stanie się płynny.
> Połącz wodę, sok cytrynowy i miód w dzbanku; mieszaj, aż smak będzie równomierny.
> Dodaj ogórek i schłodź napój przez co najmniej 15 minut, aby woda nabrała świeżego aromatu.
> Podawaj z plasterkami ogórka i lodem tuż przed podaniem.


# Smoothie jagodowe
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=napój
: Smoothie jagodowe — jedna szklanka.
80 g | jagody
0,4 szt. | banan
80 g | jogurt
8 g | miód
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Smoothie zielone
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=napój
: Smoothie zielone — jedna szklanka.
40 g | szpinak
0,5 szt. | banan
60 g | jabłko
80 ml | woda
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Smoothie mango-kokos
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=napój
: Smoothie mango-kokos — jedna szklanka.
90 g | mango
80 ml | mleko kokosowe
0,2 szt. | limonka
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Herbata matcha latte
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=napój
: Kremowa matcha z mlekiem, przygotowana na gorąco.
3 g | matcha
180 ml | mleko
40 ml | woda
> Przesiej matchę do małej miseczki, aby rozbić grudki.
> Podgrzej wodę do około 75–80°C, wlej ją do matchy i ubij bambusową miotełką lub spieniaczem, aż powstanie gładka pianka.
> Podgrzej mleko do około 60–65°C, nie doprowadzając do wrzenia, i spień je.
> Wlej matchę do szklanki, a następnie powoli dolej mleko.
> Podawaj od razu; jeśli chcesz, zachowaj odrobinę pianki mlecznej na wierzch.


# Herbata imbirowa
@ cat=cocktaile servings=1 prep=3 cook=8 art=drink tags=napój
: Rozgrzewający napar ze świeżego imbiru, miodu i cytryny.
12 g | imbir
250 ml | woda
10 g | miód
0,2 szt. | cytryna
> Obierz imbir i pokrój go w cienkie plasterki; wyciśnij sok z cytryny.
> Zalej imbir wodą, doprowadź do lekkiego wrzenia i gotuj łagodnie 5–7 minut.
> Zdejmij napar z ognia i odstaw na minutę, aby osad opadł.
> Przecedź do kubka i poczekaj, aż płyn lekko przestygnie.
> Dodaj miód i sok z cytryny, wymieszaj i podawaj gorące.


# Kakao na mleku
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=napój
: Gładkie, ciepłe kakao na mleku.
10 g | kakao
200 ml | mleko
8 g | cukier
> W małym garnku wymieszaj kakao z cukrem i 2 łyżkami zimnego mleka, aż powstanie gładka pasta.
> Stopniowo dolej resztę mleka, cały czas mieszając trzepaczką.
> Podgrzewaj na małym ogniu przez 3–4 minuty, nie dopuszczając do wrzenia i przypalenia dna.
> Spróbuj kakao; jeśli chcesz intensywniejszy smak, dodaj niewielką ilość kakao i dokładnie rozprowadź.
> Przelej do kubka i podawaj od razu.


# Mors
@ cat=cocktaile servings=1 prep=5 cook=8 art=drink tags=napój
: Domowy mors żurawinowy o wyraźnym, owocowym smaku.
50 g | żurawina
220 ml | woda
12 g | cukier
> Rozgnieć żurawinę widelcem lub tłuczkiem, aby popękały owoce i uwolniły sok.
> Przełóż owoce do garnka, zalej wodą i gotuj na małym ogniu 5–7 minut.
> Przecedź napar przez drobne sitko, dociskając owoce łyżką, a następnie wyrzuć wytłoki.
> Dodaj cukier do gorącego płynu i mieszaj do rozpuszczenia; spróbuj i w razie potrzeby skoryguj słodycz.
> Podawaj ciepły albo schłodzony. W wersji zimnej ostudź przed wstawieniem do lodówki.


# Orzeźwiająca woda z owocami
@ cat=cocktaile servings=1 prep=5 cook=0 art=drink tags=napój
: Woda smakowa z cytryną, ogórkiem i świeżą miętą.
300 ml | woda
0,3 szt. | cytryna
20 g | ogórek
4 g | mięta
> Pokrój ogórek w cienkie plasterki, a cytrynę w półplasterki, usuwając pestki.
> Uderz lekko liście mięty dłonią, aby uwolnić aromat, ale nie rozrywaj ich na drobne kawałki.
> Włóż owoce, ogórek i miętę do szklanki lub małego dzbanka, a następnie zalej zimną wodą.
> Odstaw do lodówki na 10–15 minut, aby woda nabrała smaku; nie trzymaj mięty zbyt długo, bo może zgorzknieć.
> Podawaj mocno schłodzoną z lodem dodanym bezpośrednio przed piciem.


# Kurczak w sosie słodko-kwaśnym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Kurczak w sosie słodko-kwaśnym — danie przygotowywane krótko na mocno rozgrzanym woku.
140 g | filet z kurczaka
15 g | ketchup
10 ml | ocet ryżowy
8 g | cukier
30 g | ananas
12 ml | olej rzepakowy
> Filet z kurczaka pokrój w cienkie, równe paski lub niewielkie kawałki. Ananasa pokrój na niewielkie kawałki.
> W miseczce rozmieszaj ketchup, ocet ryżowy i cukier, aż kryształki cukru się rozpuszczą.
> Mocno rozgrzej wok z olejem. Obsmaż partiami na mocnym ogniu, aż kawałki będą zrumienione i w pełni ugotowane; odłóż na talerz.
> Wrzuć ananasa na patelnię i smaż około minuty; wlej przygotowany sos oraz 1–2 łyżki wody, jeśli trzeba go rozrzedzić.
> Włóż filet z kurczaka z powrotem, wymieszaj i podgrzewaj do uzyskania błyszczącej glazury. Sprawdź wysmażenie i podawaj natychmiast.

# Kurczak kung pao
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Kurczak smażony w woku w pikantnej glazurze sojowej z orzeszkami ziemnymi i pieprzem syczuańskim.
140 g | filet z kurczaka
15 g | orzeszki ziemne
4 g | chilli
12 ml | sos sojowy
1 g | pieprz syczuański
12 ml | olej rzepakowy
> Filet z kurczaka pokrój w cienkie, równe paski lub niewielkie kawałki. Orzeszki ziemne przygotuj z wyprzedzeniem, a pieprz syczuański lekko rozgnieć.
> Rozgrzej wok na dużym ogniu i wlej olej. Obsmaż kurczaka partiami, aż się zrumieni i będzie w pełni usmażony; przełóż go na talerz.
> Wsyp chilli oraz pieprz syczuański i smaż przez 15–20 sekund, uważając, by przyprawy się nie przypaliły.
> Wlej sos sojowy i 1–2 łyżki wody. Szybko zamieszaj, aby powstała aromatyczna glazura.
> Włóż kurczaka z powrotem do woka, dodaj orzeszki ziemne i szybko wymieszaj przez 30–60 sekund, aż składniki pokryją się glazurą. Podawaj od razu.

# Kurczak z czarnym pieprzem
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Danie z woka z mocnym aromatem świeżo mielonego pieprzu i wytrawnym sosem.
140 g | filet z kurczaka
3 g | pieprz czarny
12 ml | sos ostrygowy
0,5 szt. | cebula
40 g | papryka
12 ml | olej rzepakowy
> Filet z kurczaka pokrój w cienkie, równe paski lub niewielkie kawałki. Cebulę pokrój w piórka, a paprykę w cienkie paski; pieprz grubo rozgnieć.
> Rozgrzej wok z olejem. Obsmaż paski kurczaka partiami, aż się zetną i lekko zrumienią; przełóż je na talerz.
> W tym samym woku krótko smaż cebulę i paprykę, aby zmiękły, ale pozostały jędrne.
> Rozmieszaj sos ostrygowy z 1–2 łyżkami wody, wlej do woka i zagotuj krótko.
> Włóż filet z kurczaka z powrotem, dodaj pieprz i wymieszaj, aż sos pokryje składniki cienką warstwą.

# Kurczak po syczuańsku
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Kurczak po syczuańsku — danie przygotowywane krótko na mocno rozgrzanym woku.
140 g | filet z kurczaka
12 g | pasta doubanjiang
1 szt. | czosnek
5 g | imbir
5 ml | sezamowy olej
12 ml | olej rzepakowy
> Filet z kurczaka pokrój w cienkie, równe paski lub niewielkie kawałki. Czosnek drobno posiekaj, a imbir zetrzyj lub pokrój w cienkie zapałki.
> Rozgrzej wok z olejem. Obsmaż kurczaka w jednej warstwie, partiami jeśli trzeba, aż z zewnątrz zbieleje i lekko się zrumieni; odłóż na bok.
> Zmniejsz nieco ogień, dodaj czosnek, imbir i pastę doubanjiang; smaż 20–30 sekund, aż uwolnią aromat.
> Wlej olej sezamowy oraz 1–2 łyżki wody, po czym zeskrob z dna przyprawy i utwórz lekki sos.
> Włóż filet z kurczaka z powrotem, dokładnie obtocz w sosie i podgrzej do pełnej gotowości. Podawaj od razu.

# Kurczak z bazylią tajską
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Szybkie danie z woka z tajską bazylią, czosnkiem i pikantno-słonym sosem.
140 g | filet z kurczaka
8 g | bazylia tajska
8 ml | sos rybny
3 g | chilli
1 szt. | czosnek
12 ml | olej rzepakowy
> Filet z kurczaka pokrój w cienkie, równe paski lub niewielkie kawałki. Czosnek drobno posiekaj, chilli pokrój cienko, a bazylię tajską przygotuj do dodania na końcu.
> Rozgrzej wok z olejem; czosnek i chilli smaż przez 15–20 sekund, tylko do uwolnienia aromatu.
> Dodaj filet z kurczaka i smaż na mocnym ogniu, często mieszając, aż będzie w pełni ugotowane.
> Dodaj sos rybny oraz łyżkę wody, jeśli składniki zaczynają przywierać; szybko wymieszaj.
> Zdejmij wok z ognia, wmieszaj bazylię tajską i podawaj natychmiast, zanim liście stracą kolor.

# Kurczak pad see ew
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tajski makaron ryżowy smażony na dużym ogniu z białkiem, warzywami i ciemnym sosem sojowym.
140 g | filet z kurczaka
80 g | makaron ryżowy
15 ml | sos sojowy ciemny
50 g | brokuł chiński
28 g | jajko (roztrzepane)
12 ml | olej rzepakowy
> Makaron ryżowy przygotuj zgodnie z instrukcją na opakowaniu i odcedź. Filet z kurczaka pokrój w cienkie, równe paski.
> Rozgrzej wok z olejem. Obsmaż paski kurczaka, aż się zrumienią i będą w pełni usmażone; przełóż je na talerz.
> Dodaj brokuł chiński i smaż krótko, aż łodyżki zmiękną, ale zachowają jędrność.
> Przesuń składniki na bok, wlej roztrzepane jajko i szybko mieszaj, aż się zetnie; dodaj makaron i ciemny sos sojowy.
> Włóż filet z kurczaka z powrotem i wymieszaj na mocnym ogniu, aż makaron pokryje się sosem i będzie gorący.

# Kurczak w sosie orzechowym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Kurczak w sosie orzechowym — danie przygotowywane krótko na mocno rozgrzanym woku.
140 g | filet z kurczaka
20 g | masło orzechowe
30 ml | mleko kokosowe
0,2 szt. | limonka
8 ml | sos sojowy
12 ml | olej rzepakowy
> Filet z kurczaka pokrój w cienkie, równe paski lub niewielkie kawałki. Limonkę przekrój i wyciśnij sok.
> W małej misce wymieszaj masło orzechowe, mleko kokosowe, sos sojowy i sok z limonki do uzyskania gładkiego sosu.
> Rozgrzej wok z olejem. Obsmaż partiami na mocnym ogniu, aż kawałki będą zrumienione i w pełni ugotowane; odłóż na talerz.
> Zmniejsz ogień i wlej sos orzechowy; mieszaj bez przerwy, aby nie przywarł ani się nie rozwarstwił.
> Jeśli sos jest zbyt gęsty, dolej trochę wody. Włóż filet z kurczaka z powrotem, obtocz i podawaj na gorąco.

# Wołowina w sosie słodko-kwaśnym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Wołowina w sosie słodko-kwaśnym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | wołowina
15 g | ketchup
10 ml | ocet ryżowy
8 g | cukier
30 g | ananas
12 ml | olej rzepakowy
> Wołowinę pokrój w cienkie, równe paski lub niewielkie kawałki. Ananasa pokrój na niewielkie kawałki.
> W miseczce rozmieszaj ketchup, ocet ryżowy i cukier, aż kryształki cukru się rozpuszczą.
> Mocno rozgrzej wok z olejem. Obsmaż partiami na mocnym ogniu, aż kawałki będą zrumienione i w pełni ugotowane; odłóż na talerz.
> Wrzuć ananasa na patelnię i smaż około minuty; wlej przygotowany sos oraz 1–2 łyżki wody, jeśli trzeba go rozrzedzić.
> Włóż wołowinę z powrotem, wymieszaj i podgrzewaj do uzyskania błyszczącej glazury. Sprawdź wysmażenie i podawaj natychmiast.

# Wołowina kung pao
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Wołowina smażona w woku w pikantnej glazurze sojowej z orzeszkami ziemnymi i pieprzem syczuańskim.
130 g | wołowina
15 g | orzeszki ziemne
4 g | chilli
12 ml | sos sojowy
1 g | pieprz syczuański
12 ml | olej rzepakowy
> Wołowinę pokrój w cienkie, równe paski. Orzeszki ziemne przygotuj z wyprzedzeniem, a pieprz syczuański lekko rozgnieć.
> Rozgrzej wok na dużym ogniu i wlej olej. Obsmaż wołowinę partiami, aż się zrumieni i będzie usmażona; przełóż mięso na talerz.
> Wsyp chilli oraz pieprz syczuański i smaż przez 15–20 sekund, uważając, by przyprawy się nie przypaliły.
> Wlej sos sojowy i 1–2 łyżki wody. Szybko zamieszaj, aby powstała aromatyczna glazura.
> Włóż wołowinę z powrotem do woka, dodaj orzeszki ziemne i wymieszaj przez 30–60 sekund, aż wszystko pokryje się sosem. Podawaj od razu.

# Wołowina z czarnym pieprzem
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Danie z woka z mocnym aromatem świeżo mielonego pieprzu i wytrawnym sosem.
130 g | wołowina
3 g | pieprz czarny
12 ml | sos ostrygowy
0,5 szt. | cebula
40 g | papryka
12 ml | olej rzepakowy
> Pokrój wołowinę w cienkie, równe paski lub niewielkie kawałki. Cebulę pokrój w piórka, a paprykę w cienkie paski; pieprz grubo rozgnieć.
> Rozgrzej wok z olejem. Obsmaż paski wołowiny partiami na mocnym ogniu, aż się zrumienią; przełóż je na talerz.
> W tym samym woku krótko smaż cebulę i paprykę, aby zmiękły, ale pozostały jędrne.
> Rozmieszaj sos ostrygowy z 1–2 łyżkami wody, wlej do woka i zagotuj krótko.
> Włóż wołowinę z powrotem, dodaj pieprz i wymieszaj, aż sos pokryje składniki cienką warstwą.

# Wołowina po syczuańsku
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Wołowina po syczuańsku — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | wołowina
12 g | pasta doubanjiang
1 szt. | czosnek
5 g | imbir
5 ml | sezamowy olej
12 ml | olej rzepakowy
> Pokrój wołowinę w cienkie, równe paski lub niewielkie kawałki. Czosnek drobno posiekaj, a imbir zetrzyj lub pokrój w cienkie zapałki.
> Rozgrzej wok mocno z olejem. Obsmaż wołowinę krótko, partiami, aż się zrumieni, ale nie przesusz; odłóż na bok.
> Zmniejsz nieco ogień, dodaj czosnek, imbir i pastę doubanjiang; smaż 20–30 sekund, aż uwolnią aromat.
> Wlej olej sezamowy oraz 1–2 łyżki wody, po czym zeskrob z dna przyprawy i utwórz lekki sos.
> Włóż wołowinę z powrotem, dokładnie obtocz w sosie i podgrzej do pełnej gotowości. Podawaj od razu.

# Wołowina z bazylią tajską
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Szybkie danie z woka z tajską bazylią, czosnkiem i pikantno-słonym sosem.
130 g | wołowina
8 g | bazylia tajska
8 ml | sos rybny
3 g | chilli
1 ząbek | czosnek
12 ml | olej rzepakowy
> Pokrój wołowinę w cienkie, równe paski. Drobno posiekaj czosnek i chilli; liście bazylii tajskiej oddziel od łodyżek i odłóż.
> Rozgrzej wok na dużym ogniu i wlej olej. Dodaj czosnek oraz chilli i smaż przez 15–20 sekund, tylko do uwolnienia aromatu.
> Dodaj wołowinę i smaż krótko, energicznie mieszając, aż paski się zrumienią i będą usmażone. Jeśli wok jest mały, smaż mięso w dwóch partiach.
> Wlej sos rybny i łyżkę wody. Szybko wymieszaj, zbierając aromaty z dna woka; płyn powinien tylko lekko oblepić mięso.
> Zdejmij wok z ognia, dodaj tajską bazylię i mieszaj do lekkiego zwiędnięcia liści. Podawaj od razu, gdy bazylia zachowuje świeży aromat.

# Wołowina pad see ew
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tajski makaron ryżowy smażony na dużym ogniu z białkiem, warzywami i ciemnym sosem sojowym.
130 g | wołowina
80 g | makaron ryżowy
15 ml | sos sojowy ciemny
50 g | brokuł chiński
28 g | jajko (roztrzepane)
12 ml | olej rzepakowy
> Makaron ryżowy przygotuj zgodnie z instrukcją na opakowaniu, odcedź i odstaw. Wołowinę pokrój w cienkie, równe paski.
> Rozgrzej wok na dużym ogniu i dodaj olej. Obsmaż wołowinę krótko, najlepiej partiami, aż się zrumieni; przełóż ją na talerz.
> Dodaj brokuł chiński i smaż przez 1–2 minuty, zaczynając od grubszych łodyżek, aż lekko zmiękną, ale pozostaną jędrne.
> Przesuń warzywa na bok. W wolne miejsce wlej roztrzepane jajko i mieszaj, aż się zetnie; dodaj makaron oraz ciemny sos sojowy.
> Włóż wołowinę z powrotem do woka. Mieszaj energicznie przez 1–2 minuty, aż makaron będzie gorący i pokryje się sosem. Podawaj natychmiast.

# Wołowina w sosie orzechowym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Wołowina w sosie orzechowym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | wołowina
20 g | masło orzechowe
30 ml | mleko kokosowe
0,2 szt. | limonka
8 ml | sos sojowy
12 ml | olej rzepakowy
> Pokrój wołowinę w cienkie, równe paski. Limonkę przekrój i wyciśnij z niej sok.
> W misce połącz masło orzechowe, mleko kokosowe, sos sojowy i sok z limonki. Mieszaj, aż powstanie gładki sos.
> Mocno rozgrzej wok i wlej olej. Obsmaż wołowinę partiami, aż paski się zrumienią i będą usmażone; przełóż mięso na talerz.
> Zmniejsz ogień, wlej sos orzechowy i mieszaj, aż będzie gorący i gładki. Nie dopuszczaj do gwałtownego wrzenia, żeby sos się nie rozwarstwił.
> Przełóż wołowinę z powrotem do woka i dokładnie obtocz ją w sosie. Jeśli sos jest zbyt gęsty, dodawaj wodę po łyżce, aż równomiernie pokryje mięso; podawaj od razu.

# Krewetki w sosie słodko-kwaśnym
@ cat=owoce-morza servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Krewetki w sosie słodko-kwaśnym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | krewetki
15 g | ketchup
10 ml | ocet ryżowy
8 g | cukier
30 g | ananas
12 ml | olej rzepakowy
> Krewetki oczyść, usuń przewód pokarmowy, a następnie dokładnie osusz. Ananasa pokrój na niewielkie kawałki.
> W miseczce rozmieszaj ketchup, ocet ryżowy i cukier, aż kryształki cukru się rozpuszczą.
> Mocno rozgrzej wok z olejem. Smaż krótko, zwykle 1–2 minuty z każdej strony, aż krewetki staną się różowe i nieprzezroczyste.
> Wrzuć ananasa na patelnię i smaż około minuty; wlej przygotowany sos oraz 1–2 łyżki wody, jeśli trzeba go rozrzedzić.
> Włóż krewetki z powrotem, wymieszaj i podgrzewaj do uzyskania błyszczącej glazury. Sprawdź wysmażenie i podawaj natychmiast.

# Krewetki kung pao
@ cat=owoce-morza servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Krewetki z woka w pikantnej glazurze sojowej z orzeszkami ziemnymi i pieprzem syczuańskim.
130 g | krewetki
15 g | orzeszki ziemne
4 g | chilli
12 ml | sos sojowy
1 g | pieprz syczuański
12 ml | olej rzepakowy
> Krewetki oczyść, usuń przewód pokarmowy, a następnie dokładnie osusz. Orzeszki ziemne przygotuj z wyprzedzeniem, a pieprz syczuański lekko rozgnieć.
> Rozgrzej wok na dużym ogniu i wlej olej. Smaż krewetki krótko, aż staną się różowe i nieprzezroczyste; przełóż je na talerz.
> Wsyp chilli oraz pieprz syczuański i smaż przez 15–20 sekund, uważając, by przyprawy się nie przypaliły.
> Wlej sos sojowy i 1–2 łyżki wody. Szybko zamieszaj, aby powstała aromatyczna glazura.
> Włóż krewetki z powrotem do woka, dodaj orzeszki ziemne i szybko wymieszaj przez 30–60 sekund, aż składniki pokryją się glazurą. Podawaj od razu.

# Krewetki z czarnym pieprzem
@ cat=owoce-morza servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Danie z woka z mocnym aromatem świeżo mielonego pieprzu i wytrawnym sosem.
130 g | krewetki
3 g | pieprz czarny
12 ml | sos ostrygowy
0,5 szt. | cebula
40 g | papryka
12 ml | olej rzepakowy
> Krewetki oczyść, usuń przewód pokarmowy, a następnie dokładnie osusz. Cebulę pokrój w piórka, a paprykę w cienkie paski; pieprz grubo rozgnieć.
> Rozgrzej wok z olejem. Smaż krewetki krótko, około 1–2 minut, aż staną się różowe i nieprzezroczyste; przełóż je na talerz.
> W tym samym woku krótko smaż cebulę i paprykę, aby zmiękły, ale pozostały jędrne.
> Rozmieszaj sos ostrygowy z 1–2 łyżkami wody, wlej do woka i zagotuj krótko.
> Włóż krewetki z powrotem, dodaj pieprz i wymieszaj, aż sos pokryje składniki cienką warstwą.

# Krewetki po syczuańsku
@ cat=owoce-morza servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Krewetki po syczuańsku — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | krewetki
12 g | pasta doubanjiang
1 szt. | czosnek
5 g | imbir
5 ml | sezamowy olej
12 ml | olej rzepakowy
> Krewetki oczyść, usuń przewód pokarmowy, a następnie dokładnie osusz. Czosnek drobno posiekaj, a imbir zetrzyj lub pokrój w cienkie zapałki.
> Rozgrzej wok z olejem. Smaż krewetki krótko, około 1–2 minut, aż zmienią kolor i staną się nieprzezroczyste; odłóż na bok.
> Zmniejsz nieco ogień, dodaj czosnek, imbir i pastę doubanjiang; smaż 20–30 sekund, aż uwolnią aromat.
> Wlej olej sezamowy oraz 1–2 łyżki wody, po czym zeskrob z dna przyprawy i utwórz lekki sos.
> Włóż krewetki z powrotem, dokładnie obtocz w sosie i podgrzej do pełnej gotowości. Podawaj od razu.

# Krewetki z bazylią tajską
@ cat=owoce-morza servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Szybkie danie z woka z tajską bazylią, czosnkiem i pikantno-słonym sosem.
130 g | krewetki
8 g | bazylia tajska
8 ml | sos rybny
3 g | chilli
1 szt. | czosnek
12 ml | olej rzepakowy
> Krewetki oczyść, usuń przewód pokarmowy, a następnie dokładnie osusz. Czosnek drobno posiekaj, chilli pokrój cienko, a bazylię tajską przygotuj do dodania na końcu.
> Rozgrzej wok z olejem; czosnek i chilli smaż przez 15–20 sekund, tylko do uwolnienia aromatu.
> Dodaj krewetki i smaż na mocnym ogniu, często mieszając, aż będzie w pełni ugotowane.
> Dodaj sos rybny oraz łyżkę wody, jeśli składniki zaczynają przywierać; szybko wymieszaj.
> Zdejmij wok z ognia, wmieszaj bazylię tajską i podawaj natychmiast, zanim liście stracą kolor.

# Krewetki pad see ew
@ cat=owoce-morza servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tajski makaron ryżowy smażony na dużym ogniu z białkiem, warzywami i ciemnym sosem sojowym.
130 g | krewetki
80 g | makaron ryżowy
15 ml | sos sojowy ciemny
50 g | brokuł chiński
28 g | jajko (roztrzepane)
12 ml | olej rzepakowy
> Makaron ryżowy przygotuj zgodnie z instrukcją na opakowaniu i odcedź. Krewetki oczyść, usuń przewód pokarmowy i dokładnie osusz.
> Rozgrzej wok z olejem. Smaż krewetki krótko, aż staną się różowe i nieprzezroczyste; przełóż je na talerz.
> Dodaj brokuł chiński i smaż krótko, aż łodyżki zmiękną, ale zachowają jędrność.
> Przesuń składniki na bok, wlej roztrzepane jajko i szybko mieszaj, aż się zetnie; dodaj makaron i ciemny sos sojowy.
> Włóż krewetki z powrotem i wymieszaj na mocnym ogniu, aż makaron pokryje się sosem i będzie gorący.

# Krewetki w sosie orzechowym
@ cat=owoce-morza servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Krewetki w sosie orzechowym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | krewetki
20 g | masło orzechowe
30 ml | mleko kokosowe
0,2 szt. | limonka
8 ml | sos sojowy
12 ml | olej rzepakowy
> Krewetki oczyść, usuń przewód pokarmowy, a następnie dokładnie osusz. Limonkę przekrój i wyciśnij sok.
> W małej misce wymieszaj masło orzechowe, mleko kokosowe, sos sojowy i sok z limonki do uzyskania gładkiego sosu.
> Rozgrzej wok z olejem. Smaż krótko, zwykle 1–2 minuty z każdej strony, aż krewetki staną się różowe i nieprzezroczyste.
> Zmniejsz ogień i wlej sos orzechowy; mieszaj bez przerwy, aby nie przywarł ani się nie rozwarstwił.
> Jeśli sos jest zbyt gęsty, dolej trochę wody. Włóż krewetki z powrotem, obtocz i podawaj na gorąco.

# Tofu w sosie słodko-kwaśnym
@ cat=warzywa servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tofu w sosie słodko-kwaśnym — danie przygotowywane krótko na mocno rozgrzanym woku.
140 g | tofu
15 g | ketchup
10 ml | ocet ryżowy
8 g | cukier
30 g | ananas
12 ml | olej rzepakowy
> Tofu osusz ręcznikiem i pokrój w równe kostki. Ananasa pokrój na niewielkie kawałki.
> W miseczce rozmieszaj ketchup, ocet ryżowy i cukier, aż kryształki cukru się rozpuszczą.
> Mocno rozgrzej wok z olejem. Smaż 3–4 minuty, obracając, aż tofu zrumieni się z kilku stron.
> Wrzuć ananasa na patelnię i smaż około minuty; wlej przygotowany sos oraz 1–2 łyżki wody, jeśli trzeba go rozrzedzić.
> Włóż tofu z powrotem, wymieszaj i podgrzewaj do uzyskania błyszczącej glazury. Sprawdź wysmażenie i podawaj natychmiast.

# Tofu kung pao
@ cat=warzywa servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tofu smażone w woku w pikantnej glazurze sojowej z orzeszkami ziemnymi i pieprzem syczuańskim.
140 g | tofu
15 g | orzeszki ziemne
4 g | chilli
12 ml | sos sojowy
1 g | pieprz syczuański
12 ml | olej rzepakowy
> Tofu osusz ręcznikiem i pokrój w równe kostki. Orzeszki ziemne przygotuj z wyprzedzeniem, a pieprz syczuański lekko rozgnieć.
> Rozgrzej wok na dużym ogniu i wlej olej. Obsmaż tofu partiami, aż kostki zrumienią się z kilku stron; przełóż je na talerz.
> Wsyp chilli oraz pieprz syczuański i smaż przez 15–20 sekund, uważając, by przyprawy się nie przypaliły.
> Wlej sos sojowy i 1–2 łyżki wody. Szybko zamieszaj, aby powstała aromatyczna glazura.
> Włóż tofu z powrotem do woka, dodaj orzeszki ziemne i wymieszaj przez 30–60 sekund, aż składniki pokryją się sosem. Podawaj od razu.

# Tofu z czarnym pieprzem
@ cat=warzywa servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Danie z woka z mocnym aromatem świeżo mielonego pieprzu i wytrawnym sosem.
140 g | tofu
3 g | pieprz czarny
12 ml | sos sojowy jasny
0,5 szt. | cebula
40 g | papryka
12 ml | olej rzepakowy
> Tofu osusz ręcznikiem i pokrój w równe kostki. Cebulę pokrój w piórka, a paprykę w cienkie paski; pieprz grubo rozgnieć.
> Rozgrzej wok z olejem. Obsmaż kostki tofu partiami, aż zrumienią się z kilku stron; przełóż je na talerz.
> W tym samym woku krótko smaż cebulę i paprykę, aby zmiękły, ale pozostały jędrne.
> Wymieszaj sos sojowy z 1–2 łyżkami wody. Wlej do woka i krótko podgrzej, aż sos zacznie lekko oblepiać składniki.
> Włóż tofu z powrotem, dodaj pieprz i wymieszaj, aż sos pokryje składniki cienką warstwą.

# Tofu po syczuańsku
@ cat=warzywa servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tofu po syczuańsku — danie przygotowywane krótko na mocno rozgrzanym woku.
140 g | tofu
12 g | pasta doubanjiang
1 szt. | czosnek
5 g | imbir
5 ml | sezamowy olej
12 ml | olej rzepakowy
> Tofu osusz ręcznikiem i pokrój w równe kostki. Czosnek drobno posiekaj, a imbir zetrzyj lub pokrój w cienkie zapałki.
> Rozgrzej wok z olejem. Osusz tofu, pokrój w kostkę i smaż w jednej warstwie, aż zrumieni się z kilku stron; odłóż na bok.
> Zmniejsz nieco ogień, dodaj czosnek, imbir i pastę doubanjiang; smaż 20–30 sekund, aż uwolnią aromat.
> Wlej olej sezamowy oraz 1–2 łyżki wody, po czym zeskrob z dna przyprawy i utwórz lekki sos.
> Włóż tofu z powrotem, dokładnie obtocz w sosie i podgrzej do pełnej gotowości. Podawaj od razu.

# Tofu z bazylią tajską
@ cat=warzywa servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Szybkie danie z woka z tajską bazylią, czosnkiem i pikantno-słonym sosem.
140 g | tofu
8 g | bazylia tajska
8 ml | sos rybny
3 g | chilli
1 szt. | czosnek
12 ml | olej rzepakowy
> Tofu osusz ręcznikiem i pokrój w równe kostki. Czosnek drobno posiekaj, chilli pokrój cienko, a bazylię tajską przygotuj do dodania na końcu.
> Rozgrzej wok z olejem; czosnek i chilli smaż przez 15–20 sekund, tylko do uwolnienia aromatu.
> Dodaj tofu i smaż na mocnym ogniu, często mieszając, aż będzie w pełni ugotowane.
> Dodaj sos rybny oraz łyżkę wody, jeśli składniki zaczynają przywierać; szybko wymieszaj.
> Zdejmij wok z ognia, wmieszaj bazylię tajską i podawaj natychmiast, zanim liście stracą kolor.

# Tofu pad see ew
@ cat=warzywa servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tajski makaron ryżowy smażony na dużym ogniu z białkiem, warzywami i ciemnym sosem sojowym.
140 g | tofu
80 g | makaron ryżowy
15 ml | sos sojowy ciemny
50 g | brokuł chiński
28 g | jajko (roztrzepane)
12 ml | olej rzepakowy
> Makaron ryżowy przygotuj zgodnie z instrukcją na opakowaniu i odcedź. Tofu osusz ręcznikiem i pokrój w równe kostki.
> Rozgrzej wok z olejem. Obsmaż kostki tofu, aż zrumienią się z kilku stron; przełóż je na talerz.
> Dodaj brokuł chiński i smaż krótko, aż łodyżki zmiękną, ale zachowają jędrność.
> Przesuń składniki na bok, wlej roztrzepane jajko i szybko mieszaj, aż się zetnie; dodaj makaron i ciemny sos sojowy.
> Włóż tofu z powrotem i wymieszaj na mocnym ogniu, aż makaron pokryje się sosem i będzie gorący.

# Tofu w sosie orzechowym
@ cat=warzywa servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tofu w sosie orzechowym — danie przygotowywane krótko na mocno rozgrzanym woku.
140 g | tofu
20 g | masło orzechowe
30 ml | mleko kokosowe
0,2 szt. | limonka
8 ml | sos sojowy
12 ml | olej rzepakowy
> Tofu osusz ręcznikiem i pokrój w równe kostki. Limonkę przekrój i wyciśnij sok.
> W małej misce wymieszaj masło orzechowe, mleko kokosowe, sos sojowy i sok z limonki do uzyskania gładkiego sosu.
> Rozgrzej wok z olejem. Smaż 3–4 minuty, obracając, aż tofu zrumieni się z kilku stron.
> Zmniejsz ogień i wlej sos orzechowy; mieszaj bez przerwy, aby nie przywarł ani się nie rozwarstwił.
> Jeśli sos jest zbyt gęsty, dolej trochę wody. Włóż tofu z powrotem, obtocz i podawaj na gorąco.

# Wieprzowina w sosie słodko-kwaśnym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Wieprzowina w sosie słodko-kwaśnym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | wieprzowina
15 g | ketchup
10 ml | ocet ryżowy
8 g | cukier
30 g | ananas
12 ml | olej rzepakowy
> Wieprzowinę pokrój w cienkie, równe paski lub niewielkie kawałki. Ananasa pokrój na niewielkie kawałki.
> W miseczce rozmieszaj ketchup, ocet ryżowy i cukier, aż kryształki cukru się rozpuszczą.
> Mocno rozgrzej wok z olejem. Obsmaż partiami na mocnym ogniu, aż kawałki będą zrumienione i w pełni ugotowane; odłóż na talerz.
> Wrzuć ananasa na patelnię i smaż około minuty; wlej przygotowany sos oraz 1–2 łyżki wody, jeśli trzeba go rozrzedzić.
> Włóż wieprzowinę z powrotem, wymieszaj i podgrzewaj do uzyskania błyszczącej glazury. Sprawdź wysmażenie i podawaj natychmiast.

# Wieprzowina kung pao
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Wieprzowina smażona w woku w pikantnej glazurze sojowej z orzeszkami ziemnymi i pieprzem syczuańskim.
130 g | wieprzowina
15 g | orzeszki ziemne
4 g | chilli
12 ml | sos sojowy
1 g | pieprz syczuański
12 ml | olej rzepakowy
> Wieprzowinę pokrój w cienkie, równe paski. Orzeszki ziemne przygotuj z wyprzedzeniem, a pieprz syczuański lekko rozgnieć.
> Rozgrzej wok na dużym ogniu i wlej olej. Obsmaż wieprzowinę partiami, aż się zrumieni i będzie usmażona; przełóż mięso na talerz.
> Wsyp chilli oraz pieprz syczuański i smaż przez 15–20 sekund, uważając, by przyprawy się nie przypaliły.
> Wlej sos sojowy i 1–2 łyżki wody. Szybko zamieszaj, aby powstała aromatyczna glazura.
> Włóż wieprzowinę z powrotem do woka, dodaj orzeszki ziemne i wymieszaj przez 30–60 sekund, aż wszystko pokryje się sosem. Podawaj od razu.

# Wieprzowina z czarnym pieprzem
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Danie z woka z mocnym aromatem świeżo mielonego pieprzu i wytrawnym sosem.
130 g | wieprzowina
3 g | pieprz czarny
12 ml | sos ostrygowy
0,5 szt. | cebula
40 g | papryka
12 ml | olej rzepakowy
> Pokrój wieprzowinę w cienkie, równe paski lub niewielkie kawałki. Cebulę pokrój w piórka, a paprykę w cienkie paski; pieprz grubo rozgnieć.
> Rozgrzej wok z olejem. Obsmaż paski wieprzowiny partiami, aż się zrumienią i będą w pełni usmażone; przełóż je na talerz.
> W tym samym woku krótko smaż cebulę i paprykę, aby zmiękły, ale pozostały jędrne.
> Rozmieszaj sos ostrygowy z 1–2 łyżkami wody, wlej do woka i zagotuj krótko.
> Włóż wieprzowinę z powrotem, dodaj pieprz i wymieszaj, aż sos pokryje składniki cienką warstwą.

# Wieprzowina po syczuańsku
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Wieprzowina po syczuańsku — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | wieprzowina
12 g | pasta doubanjiang
1 szt. | czosnek
5 g | imbir
5 ml | sezamowy olej
12 ml | olej rzepakowy
> Pokrój wieprzowinę w cienkie, równe paski lub niewielkie kawałki. Czosnek drobno posiekaj, a imbir zetrzyj lub pokrój w cienkie zapałki.
> Rozgrzej wok z olejem. Obsmaż wieprzowinę w cienkich paskach, partiami jeśli trzeba, aż się zrumieni; odłóż na bok.
> Zmniejsz nieco ogień, dodaj czosnek, imbir i pastę doubanjiang; smaż 20–30 sekund, aż uwolnią aromat.
> Wlej olej sezamowy oraz 1–2 łyżki wody, po czym zeskrob z dna przyprawy i utwórz lekki sos.
> Włóż wieprzowinę z powrotem, dokładnie obtocz w sosie i podgrzej do pełnej gotowości. Podawaj od razu.

# Wieprzowina z bazylią tajską
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Szybkie danie z woka z tajską bazylią, czosnkiem i pikantno-słonym sosem.
130 g | wieprzowina
8 g | bazylia tajska
8 ml | sos rybny
3 g | chilli
1 ząbek | czosnek
12 ml | olej rzepakowy
> Pokrój wieprzowinę w cienkie, równe paski. Drobno posiekaj czosnek i chilli; liście bazylii tajskiej oddziel od łodyżek i odłóż.
> Rozgrzej wok na dużym ogniu i wlej olej. Dodaj czosnek oraz chilli i smaż przez 15–20 sekund, tylko do uwolnienia aromatu.
> Dodaj wieprzowinę i smaż krótko, energicznie mieszając, aż paski się zrumienią i będą w pełni usmażone. Jeśli wok jest mały, smaż mięso w dwóch partiach.
> Wlej sos rybny i łyżkę wody. Szybko wymieszaj, zbierając aromaty z dna woka; płyn powinien tylko lekko oblepić mięso.
> Zdejmij wok z ognia, dodaj tajską bazylię i mieszaj do lekkiego zwiędnięcia liści. Podawaj od razu, gdy bazylia zachowuje świeży aromat.

# Wieprzowina pad see ew
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tajski makaron ryżowy smażony na dużym ogniu z białkiem, warzywami i ciemnym sosem sojowym.
130 g | wieprzowina
80 g | makaron ryżowy
15 ml | sos sojowy ciemny
50 g | brokuł chiński
28 g | jajko (roztrzepane)
12 ml | olej rzepakowy
> Makaron ryżowy przygotuj zgodnie z instrukcją na opakowaniu, odcedź i odstaw. Wieprzowinę pokrój w cienkie, równe paski.
> Rozgrzej wok na dużym ogniu i dodaj olej. Obsmaż wieprzowinę krótko, najlepiej partiami, aż się zrumieni i będzie usmażona; przełóż ją na talerz.
> Dodaj brokuł chiński i smaż przez 1–2 minuty, zaczynając od grubszych łodyżek, aż lekko zmiękną, ale pozostaną jędrne.
> Przesuń warzywa na bok. W wolne miejsce wlej roztrzepane jajko i mieszaj, aż się zetnie; dodaj makaron oraz ciemny sos sojowy.
> Włóż wieprzowinę z powrotem do woka. Mieszaj energicznie przez 1–2 minuty, aż makaron będzie gorący i pokryje się sosem. Podawaj natychmiast.

# Wieprzowina w sosie orzechowym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Wieprzowina w sosie orzechowym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | wieprzowina
20 g | masło orzechowe
30 ml | mleko kokosowe
0,2 szt. | limonka
8 ml | sos sojowy
12 ml | olej rzepakowy
> Pokrój wieprzowinę w cienkie, równe paski. Limonkę przekrój i wyciśnij z niej sok.
> W misce połącz masło orzechowe, mleko kokosowe, sos sojowy i sok z limonki. Mieszaj, aż powstanie gładki sos.
> Mocno rozgrzej wok i wlej olej. Obsmaż wieprzowinę partiami, aż paski się zrumienią i będą usmażone; przełóż mięso na talerz.
> Zmniejsz ogień, wlej sos orzechowy i mieszaj, aż będzie gorący i gładki. Nie dopuszczaj do gwałtownego wrzenia, żeby sos się nie rozwarstwił.
> Przełóż wieprzowinę z powrotem do woka i dokładnie obtocz ją w sosie. Jeśli sos jest zbyt gęsty, dodawaj wodę po łyżce, aż równomiernie pokryje mięso; podawaj od razu.

# Kaczka w sosie słodko-kwaśnym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Kaczka w sosie słodko-kwaśnym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | kaczka
15 g | ketchup
10 ml | ocet ryżowy
8 g | cukier
30 g | ananas
12 ml | olej rzepakowy
> Kaczkę pokrój w cienkie, równe paski lub niewielkie kawałki. Ananasa pokrój na niewielkie kawałki.
> W miseczce rozmieszaj ketchup, ocet ryżowy i cukier, aż kryształki cukru się rozpuszczą.
> Mocno rozgrzej wok z olejem. Obsmaż partiami na mocnym ogniu, aż kawałki będą zrumienione i w pełni ugotowane; odłóż na talerz.
> Wrzuć ananasa na patelnię i smaż około minuty; wlej przygotowany sos oraz 1–2 łyżki wody, jeśli trzeba go rozrzedzić.
> Włóż kaczkę z powrotem, wymieszaj i podgrzewaj do uzyskania błyszczącej glazury. Sprawdź wysmażenie i podawaj natychmiast.

# Kaczka kung pao
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Kaczka smażona w woku w pikantnej glazurze sojowej z orzeszkami ziemnymi i pieprzem syczuańskim.
130 g | kaczka
15 g | orzeszki ziemne
4 g | chilli
12 ml | sos sojowy
1 g | pieprz syczuański
12 ml | olej rzepakowy
> Kaczkę pokrój w cienkie, równe paski. Orzeszki ziemne przygotuj z wyprzedzeniem, a pieprz syczuański lekko rozgnieć.
> Rozgrzej wok na dużym ogniu i wlej olej. Obsmaż kaczkę partiami, aż się zrumieni i będzie w pełni usmażona; przełóż mięso na talerz.
> Wsyp chilli oraz pieprz syczuański i smaż przez 15–20 sekund, uważając, by przyprawy się nie przypaliły.
> Wlej sos sojowy i 1–2 łyżki wody. Szybko zamieszaj, aby powstała aromatyczna glazura.
> Włóż kaczkę z powrotem do woka, dodaj orzeszki ziemne i wymieszaj przez 30–60 sekund, aż wszystko pokryje się sosem. Podawaj od razu.

# Kaczka z czarnym pieprzem
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Danie z woka z mocnym aromatem świeżo mielonego pieprzu i wytrawnym sosem.
130 g | kaczka
3 g | pieprz czarny
12 ml | sos ostrygowy
0,5 szt. | cebula
40 g | papryka
12 ml | olej rzepakowy
> Pokrój kaczkę w cienkie, równe paski lub niewielkie kawałki. Cebulę pokrój w piórka, a paprykę w cienkie paski; pieprz grubo rozgnieć.
> Rozgrzej wok z olejem. Obsmaż paski kaczki partiami, aż się zrumienią i będą w pełni usmażone; przełóż je na talerz.
> W tym samym woku krótko smaż cebulę i paprykę, aby zmiękły, ale pozostały jędrne.
> Rozmieszaj sos ostrygowy z 1–2 łyżkami wody, wlej do woka i zagotuj krótko.
> Włóż kaczkę z powrotem, dodaj pieprz i wymieszaj, aż sos pokryje składniki cienką warstwą.

# Kaczka po syczuańsku
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Kaczka po syczuańsku — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | kaczka
12 g | pasta doubanjiang
1 szt. | czosnek
5 g | imbir
5 ml | sezamowy olej
12 ml | olej rzepakowy
> Pokrój kaczkę w cienkie, równe paski lub niewielkie kawałki. Czosnek drobno posiekaj, a imbir zetrzyj lub pokrój w cienkie zapałki.
> Rozgrzej wok z olejem. Obsmaż kaczkę w cienkich paskach, partiami jeśli trzeba, aż się zrumieni i będzie prawie gotowa; odłóż na bok.
> Zmniejsz nieco ogień, dodaj czosnek, imbir i pastę doubanjiang; smaż 20–30 sekund, aż uwolnią aromat.
> Wlej olej sezamowy oraz 1–2 łyżki wody, po czym zeskrob z dna przyprawy i utwórz lekki sos.
> Włóż kaczkę z powrotem, dokładnie obtocz w sosie i podgrzej do pełnej gotowości. Podawaj od razu.

# Kaczka z bazylią tajską
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Szybkie danie z woka z tajską bazylią, czosnkiem i pikantno-słonym sosem.
130 g | kaczka
8 g | bazylia tajska
8 ml | sos rybny
3 g | chilli
1 ząbek | czosnek
12 ml | olej rzepakowy
> Pokrój kaczkę w cienkie, równe paski. Drobno posiekaj czosnek i chilli; liście bazylii tajskiej oddziel od łodyżek i odłóż.
> Rozgrzej wok na dużym ogniu i wlej olej. Dodaj czosnek oraz chilli i smaż przez 15–20 sekund, tylko do uwolnienia aromatu.
> Dodaj kaczkę i smaż, energicznie mieszając, aż paski się zrumienią i będą całkowicie usmażone. Jeśli wok jest mały, smaż mięso w dwóch partiach.
> Wlej sos rybny i łyżkę wody. Szybko wymieszaj, zbierając aromaty z dna woka; płyn powinien tylko lekko oblepić mięso.
> Zdejmij wok z ognia, dodaj tajską bazylię i mieszaj do lekkiego zwiędnięcia liści. Podawaj od razu, gdy bazylia zachowuje świeży aromat.

# Kaczka pad see ew
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Tajski makaron ryżowy smażony na dużym ogniu z białkiem, warzywami i ciemnym sosem sojowym.
130 g | kaczka
80 g | makaron ryżowy
15 ml | sos sojowy ciemny
50 g | brokuł chiński
28 g | jajko (roztrzepane)
12 ml | olej rzepakowy
> Makaron ryżowy przygotuj zgodnie z instrukcją na opakowaniu, odcedź i odstaw. Kaczkę pokrój w cienkie, równe paski.
> Rozgrzej wok na dużym ogniu i dodaj olej. Obsmaż kaczkę krótko, najlepiej partiami, aż się zrumieni i będzie usmażona; przełóż ją na talerz.
> Dodaj brokuł chiński i smaż przez 1–2 minuty, zaczynając od grubszych łodyżek, aż lekko zmiękną, ale pozostaną jędrne.
> Przesuń warzywa na bok. W wolne miejsce wlej roztrzepane jajko i mieszaj, aż się zetnie; dodaj makaron oraz ciemny sos sojowy.
> Włóż kaczkę z powrotem do woka. Mieszaj energicznie przez 1–2 minuty, aż makaron będzie gorący i pokryje się sosem. Podawaj natychmiast.

# Kaczka w sosie orzechowym
@ cat=mieso servings=1 prep=8 cook=12 art=food tags=wok,azja,kuchnia-azjatycka
: Kaczka w sosie orzechowym — danie przygotowywane krótko na mocno rozgrzanym woku.
130 g | kaczka
20 g | masło orzechowe
30 ml | mleko kokosowe
0,2 szt. | limonka
8 ml | sos sojowy
12 ml | olej rzepakowy
> Pokrój kaczkę w cienkie, równe paski. Limonkę przekrój i wyciśnij z niej sok.
> W misce połącz masło orzechowe, mleko kokosowe, sos sojowy i sok z limonki. Mieszaj, aż powstanie gładki sos.
> Mocno rozgrzej wok i wlej olej. Obsmaż kaczkę partiami, aż paski się zrumienią i będą usmażone; przełóż mięso na talerz.
> Zmniejsz ogień, wlej sos orzechowy i mieszaj, aż będzie gorący i gładki. Nie dopuszczaj do gwałtownego wrzenia, żeby sos się nie rozwarstwił.
> Przełóż kaczkę z powrotem do woka i dokładnie obtocz ją w sosie. Jeśli sos jest zbyt gęsty, dodawaj wodę po łyżce, aż równomiernie pokryje mięso; podawaj od razu.

# Ziemniaki puree
@ cat=warzywa origin=PL trad servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-polska
: Ziemniaki puree — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
180 g | ziemniaki
15 g | masło
30 ml | mleko
3 g | sól
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Ziemniaki pieczone
@ cat=warzywa origin=US trad servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-amerykańska
: Ziemniaki pieczone — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
180 g | ziemniaki
12 ml | oliwa z oliwek
2 g | rozmaryn
3 g | sól
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Frytki
@ cat=warzywa origin=US trad servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-amerykańska
: Frytki — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
180 g | ziemniaki
12 ml | olej rzepakowy
3 g | sól
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Ryż jaśminowy
@ cat=warzywa servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-azjatycka
: Ryż jaśminowy — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
70 g | ryż jaśminowy
110 ml | woda
3 g | sól
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Kasza gryczana
@ cat=warzywa origin=PL trad servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-polska
: Kasza gryczana — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
70 g | kasza gryczana
140 ml | woda
10 g | masło
3 g | sól
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Kasza jaglana
@ cat=warzywa origin=PL trad servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-polska
: Kasza jaglana — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
70 g | kasza jaglana
150 ml | woda
3 g | sól
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Grillowane warzywa
@ cat=warzywa servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-śródziemnomorska
: Grillowane warzywa — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
60 g | cukinia
60 g | bakłażan
50 g | papryka
12 ml | oliwa z oliwek
1 g | oregano
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Fasolka szparagowa z migdałami
@ cat=warzywa origin=FR trad servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-francuska
: Fasolka szparagowa z migdałami — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
120 g | fasolka szparagowa
10 g | migdały
10 g | masło
3 g | sól
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Colesław
@ cat=warzywa origin=US trad servings=1 prep=10 cook=15 art=food tags=tradycyjne,dodatek,kuchnia-amerykańska
: Colesław — receptura z wyraźnym smakiem głównych składników, doprawiona i wykończona tuż przed podaniem.
80 g | kapusta
30 g | marchew
25 g | majonez
5 ml | ocet
> Umyj i przygotuj warzywa. Pokrój je równo, aby wszystkie kawałki zmiękły w podobnym czasie.
> Rozgrzej tłuszcz z receptury. Podsmaż cebulę lub czosnek, jeśli występują w składnikach, aż zmiękną i zaczną pachnieć.
> Dodaj warzywa i zastosuj metodę odpowiednią dla dania: smaż do zrumienienia, duś pod przykryciem albo piecz do miękkości.
> Dopraw stopniowo. Jeśli używasz sera, ziół lub orzechów, dodaj je pod koniec, aby zachowały aromat i teksturę.
> Podawaj od razu jako samodzielne danie lub dodatek.

# Kanapka klubowa
@ cat=inne origin=US servings=1 prep=6 cook=9 art=food tags=kanapka,śniadanie,kuchnia-amerykańska
: Kanapka klubowa — sycąca kanapka na jedną osobę.
70 g | chleb tostowy
50 g | kurczak
20 g | bekon
15 g | sałata
20 g | pomidor
> Usmaż lub podgrzej kurczaka do pełnego ugotowania, a bekon wysmaż na chrupko. Podpiecz chleb i przełóż go kurczakiem, bekonem, sałatą oraz pomidorem; przekrój kanapkę na trójkąty.
> Podpiecz pieczywo, jeśli pasuje do dania, tak aby było chrupiące z zewnątrz, ale nie wyschło.
> Rozprowadź sos lub smarowidło na pieczywie, a następnie ułóż składniki w kolejności, która utrzyma kanapkę stabilnie.
> Dodaj delikatne liście i świeże składniki na końcu, aby nie zwiędły od gorących elementów.
> Przekrój i podawaj od razu.

# Reuben
@ cat=inne origin=US servings=1 prep=6 cook=9 art=food tags=kanapka,śniadanie,kuchnia-amerykańska
: Reuben — sycąca kanapka na jedną osobę.
70 g | chleb żytni
60 g | pastrami
30 g | kapusta kiszona
20 g | ser szwajcarski
15 g | sos tysiąca wysp
> Posmaruj kromki chleba sosem tysiąca wysp. Ułóż pastrami, odciśniętą kapustę kiszoną i ser, zamknij kanapkę i opiecz na patelni z obu stron, aż chleb będzie chrupiący, a ser się roztopi.
> Podpiecz pieczywo, jeśli pasuje do dania, tak aby było chrupiące z zewnątrz, ale nie wyschło.
> Rozprowadź sos lub smarowidło na pieczywie, a następnie ułóż składniki w kolejności, która utrzyma kanapkę stabilnie.
> Dodaj delikatne liście i świeże składniki na końcu, aby nie zwiędły od gorących elementów.
> Przekrój i podawaj od razu.

# Banh mi
@ cat=inne servings=1 prep=6 cook=9 art=food tags=kanapka,śniadanie,kuchnia-azjatycka
: Banh mi — sycąca kanapka na jedną osobę.
80 g | bagietka
60 g | wieprzowina
20 g | marchew
20 g | ogórek
4 g | kolendra
> Przekrój bagietkę i lekko ją podpiecz. Wieprzowinę usmaż lub upiecz do pełnego ugotowania, pokrój w cienkie plastry i włóż do pieczywa z marchewką, ogórkiem i świeżą kolendrą.
> Podpiecz pieczywo, jeśli pasuje do dania, tak aby było chrupiące z zewnątrz, ale nie wyschło.
> Rozprowadź sos lub smarowidło na pieczywie, a następnie ułóż składniki w kolejności, która utrzyma kanapkę stabilnie.
> Dodaj delikatne liście i świeże składniki na końcu, aby nie zwiędły od gorących elementów.
> Przekrój i podawaj od razu.

# Croissant z szynką i serem
@ cat=inne origin=FR servings=1 prep=6 cook=9 art=food tags=kanapka,śniadanie,kuchnia-francuska
: Croissant z szynką i serem — sycąca kanapka na jedną osobę.
1 szt. | croissant
25 g | szynka
20 g | ser
> Przekrój croissanta, włóż szynkę i ser, a następnie podgrzej w piekarniku w 170°C przez kilka minut, aż ser się roztopi.
> Podpiecz pieczywo, jeśli pasuje do dania, tak aby było chrupiące z zewnątrz, ale nie wyschło.
> Rozprowadź sos lub smarowidło na pieczywie, a następnie ułóż składniki w kolejności, która utrzyma kanapkę stabilnie.
> Dodaj delikatne liście i świeże składniki na końcu, aby nie zwiędły od gorących elementów.
> Przekrój i podawaj od razu.

# Tost francuski
@ cat=inne origin=FR servings=1 prep=6 cook=9 art=food tags=kanapka,śniadanie,kuchnia-francuska
: Tost francuski — sycąca kanapka na jedną osobę.
60 g | chleb brioche
1 szt. | jajko
40 ml | mleko
1 g | cynamon
15 ml | syrop klonowy
> Wymieszaj składniki suche. W osobnej misce połącz jajko, mleko i pozostałe składniki płynne, a następnie połącz obie mieszanki bez nadmiernego mieszania.
> Rozgrzej patelnię lub gofrownicę i lekko natłuść, jeśli wymaga tego urządzenie.
> Nakładaj porcje ciasta i smaż lub piecz do uzyskania złotej powierzchni. Nie dociskaj placków podczas smażenia.
> Obróć placki, gdy brzegi się zetną i pojawią się pęcherzyki, albo piecz gofry do uzyskania chrupkości.
> Podawaj od razu z dodatkami z listy.

# Bagel z łososiem
@ cat=inne origin=US servings=1 prep=6 cook=9 art=food tags=kanapka,śniadanie,kuchnia-amerykańska
: Bagel z łososiem — sycąca kanapka na jedną osobę.
1 szt. | bagel
40 g | łosoś wędzony
25 g | ser śmietankowy
4 g | kapary
> Przekrój bagel i podpiecz go od strony miąższu. Posmaruj serem śmietankowym, dodaj łososia wędzonego i kapary; podawaj od razu.
> Podpiecz pieczywo, jeśli pasuje do dania, tak aby było chrupiące z zewnątrz, ale nie wyschło.
> Rozprowadź sos lub smarowidło na pieczywie, a następnie ułóż składniki w kolejności, która utrzyma kanapkę stabilnie.
> Dodaj delikatne liście i świeże składniki na końcu, aby nie zwiędły od gorących elementów.
> Przekrój i podawaj od razu.

# Krem z pieczarek
@ cat=zupy origin=PL servings=1 prep=14 cook=21 art=soup tags=zupa,krem,kuchnia-polska
: Krem z pieczarek — jedna głęboka miska.
120 g | pieczarki
220 ml | bulion warzywny
0,5 szt. | cebula
30 ml | śmietana 18%
10 g | masło
> Warzywa oczyść i pokrój na równe kawałki. Cebulę lub czosnek zeszklij w garnku na tłuszczu z receptury.
> Dodaj główny składnik zupy i krótko podsmaż, aby wydobyć aromat.
> Zalej podsmażone pieczarki gorącym bulionem warzywnym tak, by były przykryte. Gotuj 10–15 minut, zblenduj na gładki krem, dodaj śmietanę i dopraw do smaku.
> Zblenduj na gładki krem. Jeśli dodajesz śmietankę lub mleko, wmieszaj je na końcu i już mocno nie gotuj.
> Dopraw, sprawdź konsystencję i podawaj gorące.

# Krem z pomidorów pieczonych
@ cat=zupy origin=IT servings=1 prep=14 cook=21 art=soup tags=zupa,krem,kuchnia-włoska
: Krem z pomidorów pieczonych — jedna głęboka miska.
180 g | pomidor
150 ml | bulion warzywny
1 szt. | czosnek
12 ml | oliwa z oliwek
4 g | bazylia
> Warzywa oczyść i pokrój na równe kawałki. Cebulę lub czosnek zeszklij w garnku na tłuszczu z receptury.
> Dodaj główny składnik zupy i krótko podsmaż, aby wydobyć aromat.
> Piecz pomidory z czosnkiem i oliwą w 200°C przez około 25 minut, aż się skarmelizują. Zblenduj z gorącym bulionem warzywnym na gładki krem, dopraw i dodaj świeżą bazylię.
> Zblenduj na gładki krem. Jeśli dodajesz śmietankę lub mleko, wmieszaj je na końcu i już mocno nie gotuj.
> Dopraw, sprawdź konsystencję i podawaj gorące.

# Krem z marchewki i imbiru
@ cat=zupy servings=1 prep=14 cook=21 art=soup tags=zupa,krem
: Krem z marchewki i imbiru — jedna głęboka miska.
160 g | marchew
220 ml | bulion warzywny
8 g | imbir
30 ml | śmietana 18%
0,5 szt. | cebula
> Warzywa oczyść i pokrój na równe kawałki. Cebulę lub czosnek zeszklij w garnku na tłuszczu z receptury.
> Dodaj główny składnik zupy i krótko podsmaż, aby wydobyć aromat.
> Podsmaż cebulę, marchew i imbir przez 3–4 minuty. Zalej gorącym bulionem warzywnym tak, by przykrył warzywa, gotuj do miękkości, zblenduj i zabiel śmietaną.
> Zblenduj na gładki krem. Jeśli dodajesz śmietankę lub mleko, wmieszaj je na końcu i już mocno nie gotuj.
> Dopraw, sprawdź konsystencję i podawaj gorące.

# Zupa tajska z mlekiem kokosowym
@ cat=zupy servings=1 prep=14 cook=21 art=soup tags=zupa,krem,kuchnia-azjatycka
: Aromatyczna zupa kokosowa z kurczakiem, trawą cytrynową i limonką.
150 ml | mleko kokosowe
60 g | kurczak
6 g | trawa cytrynowa
0,3 szt. | limonka
200 ml | bulion drobiowy
5 g | imbir
5 ml | sos rybny
> Pokrój kurczaka w cienkie paski, rozgnieć trawę cytrynową i zetrzyj imbir. Z limonki wyciśnij sok, a skórkę zetrzyj.
> Zagotuj bulion z trawą cytrynową i imbirem przez 5 minut, aby uwolnić aromat.
> Dodaj kurczaka i gotuj łagodnie 6–8 minut, aż będzie całkowicie ugotowany.
> Wlej mleko kokosowe i sos rybny; podgrzewaj na małym ogniu bez gwałtownego wrzenia.
> Zdejmij z ognia, dodaj sok z limonki, spróbuj i dopraw do zrównoważenia słodyczy, kwasowości i słoności.


# Zupa miso z małżami
@ cat=zupy origin=JP servings=1 prep=5 cook=8 art=soup tags=zupa,owoce-morza,kuchnia-japońska
: Japońska zupa miso na bulionie dashi z małżami; pastę miso dodaj poza intensywnym wrzeniem, aby zachować jej aromat.
18 g | pasta miso
60 g | małże
220 ml | dashi
> Jeśli małże są w muszlach, dokładnie je oczyść i odrzuć muszle uszkodzone lub otwarte, które nie zamykają się po stuknięciu. Oczyszczone mięso małży przepłucz i odcedź.
> Podgrzej dashi w garnku. Dodaj małże i gotuj delikatnie do pełnej gotowości; małże w muszlach powinny się otworzyć. Odrzuć te, które po gotowaniu pozostały zamknięte.
> Odlej kilka łyżek gorącego dashi do miseczki, dodaj pastę miso i mieszaj, aż powstanie gładka zawiesina bez grudek.
> Zmniejsz ogień do minimum, wlej pastę miso do garnka i wymieszaj. Nie doprowadzaj zupy do intensywnego wrzenia po dodaniu miso.
> Przelej zupę do miski i podawaj od razu, gdy bulion jest gorący, a małże są w pełni ugotowane.

# Zupa wonton
@ cat=zupy servings=1 prep=14 cook=21 art=soup tags=zupa,krem,kuchnia-azjatycka
: Delikatna zupa z pierożkami wonton i pak choi.
80 g | wonton
220 ml | bulion
40 g | pak choi
8 ml | sos sojowy
> Zagotuj bulion, a następnie zmniejsz ogień, by tylko delikatnie pyrkał.
> Włóż wontony do bulionu i gotuj zgodnie z instrukcją opakowania, zwykle 4–6 minut; nie mieszaj energicznie, żeby ich nie rozerwać.
> Pokrój pak choi na kawałki, dodaj białe części na 2 minuty, a liście na ostatnią minutę gotowania.
> Wlej sos sojowy, spróbuj bulionu i w razie potrzeby dopraw odrobiną pieprzu lub kilku kroplami oleju sezamowego.
> Przełóż wontony i warzywa do miski, zalej bulionem i podawaj natychmiast.


# Zupa ramen miso
@ cat=zupy origin=JP servings=1 prep=6 cook=10 art=soup tags=zupa,ramen,kuchnia-japońska
: Japoński ramen miso z gorącym bulionem, makaronem ramen i jajkiem na miękko.
90 g | makaron ramen
18 g | pasta miso
240 ml | bulion
1 szt. | jajko
> Ugotuj makaron ramen zgodnie z instrukcją na opakowaniu i odcedź. W drugim garnku ugotuj jajko przez 6–7 minut; schłodź je w zimnej wodzie i obierz.
> Podgrzej bulion w garnku, utrzymując go tuż poniżej wrzenia.
> Odlej kilka łyżek gorącego bulionu do miseczki, dodaj pastę miso i mieszaj, aż będzie gładka. Wlej z powrotem do garnka; po dodaniu miso nie gotuj zupy intensywnie.
> Dodaj odcedzony makaron ramen do bulionu i podgrzewaj przez 30–60 sekund, aż będzie gorący.
> Przełóż makaron i bulion do głębokiej miski. Przekrój jajko na pół, ułóż na wierzchu i podawaj od razu.

# Zupa ramen tonkotsu
@ cat=zupy origin=JP servings=1 prep=14 cook=21 art=soup tags=zupa,krem,kuchnia-japońska
: Ramen na bogatym bulionie tonkotsu z chashu i nori.
90 g | makaron ramen
250 ml | bulion tonkotsu
40 g | chashu
1 szt. | nori
> Podgrzej bulion tonkotsu w małym garnku, utrzymując delikatne wrzenie; nie redukuj go mocno, aby nie stał się zbyt słony.
> Ugotuj makaron ramen osobno zgodnie z instrukcją na opakowaniu, odcedź i nie płucz, jeśli ma trafić od razu do miski.
> Pokrój chashu cienko i podgrzej je przez chwilę w bulionie; nori potnij na paski.
> Przełóż makaron do rozgrzanej miski, ułóż na nim chashu i nori, a następnie zalej gorącym bulionem.
> Podawaj natychmiast, zanim makaron nasiąknie bulionem i straci sprężystość.


# Fusilli ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
8 ml | oliwa z oliwek
: Makaron Fusilli ze szpinakiem i ricottą.
90 g | fusilli
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj fusilli w osolonej wodzie do al dente. Przed odcedzeniem zachowaj około 80 ml wody z gotowania.
> Czosnek drobno posiekaj i podsmaż 20–30 sekund na oliwie na średnim ogniu; nie dopuść do zbrązowienia.
> Dodaj szpinak i duś 2–3 minuty, aż zwiędnie; jeśli używasz szpinaku mrożonego, odparuj nadmiar wody.
> Zmniejsz ogień, wmieszaj ricottę i gałkę muszkatołową. Dolewaj stopniowo wodę z makaronu, aż powstanie kremowy sos.
> Dodaj fusilli, wymieszaj przez 30–60 sekund, dopraw solą i podawaj od razu.

# Farfalle ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
8 ml | oliwa z oliwek
: Makaron Farfalle ze szpinakiem i ricottą.
90 g | farfalle
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj farfalle w osolonej wodzie do al dente. Przed odcedzeniem zachowaj około 80 ml wody z gotowania.
> Czosnek drobno posiekaj i podsmaż 20–30 sekund na oliwie na średnim ogniu; nie dopuść do zbrązowienia.
> Dodaj szpinak i duś 2–3 minuty, aż zwiędnie; jeśli używasz szpinaku mrożonego, odparuj nadmiar wody.
> Zmniejsz ogień, wmieszaj ricottę i gałkę muszkatołową. Dolewaj stopniowo wodę z makaronu, aż powstanie kremowy sos.
> Dodaj farfalle, wymieszaj przez 30–60 sekund, dopraw solą i podawaj od razu.

# Rigatoni ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
8 ml | oliwa z oliwek
: Makaron Rigatoni ze szpinakiem i ricottą.
90 g | rigatoni
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj rigatoni w osolonej wodzie do al dente. Przed odcedzeniem zachowaj około 80 ml wody z gotowania.
> Czosnek drobno posiekaj i podsmaż 20–30 sekund na oliwie na średnim ogniu; nie dopuść do zbrązowienia.
> Dodaj szpinak i duś 2–3 minuty, aż zwiędnie; jeśli używasz szpinaku mrożonego, odparuj nadmiar wody.
> Zmniejsz ogień, wmieszaj ricottę i gałkę muszkatołową. Dolewaj stopniowo wodę z makaronu, aż powstanie kremowy sos.
> Dodaj rigatoni, wymieszaj przez 30–60 sekund, dopraw solą i podawaj od razu.

# Paccheri ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
8 ml | oliwa z oliwek
: Makaron Paccheri ze szpinakiem i ricottą.
90 g | paccheri
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj paccheri w osolonej wodzie do al dente. Przed odcedzeniem zachowaj około 80 ml wody z gotowania.
> Czosnek drobno posiekaj i podsmaż 20–30 sekund na oliwie na średnim ogniu; nie dopuść do zbrązowienia.
> Dodaj szpinak i duś 2–3 minuty, aż zwiędnie; jeśli używasz szpinaku mrożonego, odparuj nadmiar wody.
> Zmniejsz ogień, wmieszaj ricottę i gałkę muszkatołową. Dolewaj stopniowo wodę z makaronu, aż powstanie kremowy sos.
> Dodaj paccheri, wymieszaj przez 30–60 sekund, dopraw solą i podawaj od razu.

# Conchiglie ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
8 ml | oliwa z oliwek
: Makaron Conchiglie ze szpinakiem i ricottą.
90 g | conchiglie
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj conchiglie w osolonej wodzie do al dente. Przed odcedzeniem zachowaj około 80 ml wody z gotowania.
> Czosnek drobno posiekaj i podsmaż 20–30 sekund na oliwie na średnim ogniu; nie dopuść do zbrązowienia.
> Dodaj szpinak i duś 2–3 minuty, aż zwiędnie; jeśli używasz szpinaku mrożonego, odparuj nadmiar wody.
> Zmniejsz ogień, wmieszaj ricottę i gałkę muszkatołową. Dolewaj stopniowo wodę z makaronu, aż powstanie kremowy sos.
> Dodaj conchiglie, wymieszaj przez 30–60 sekund, dopraw solą i podawaj od razu.

# Gemelli ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
8 ml | oliwa z oliwek
: Makaron Gemelli ze szpinakiem i ricottą.
90 g | gemelli
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj gemelli w osolonej wodzie do al dente. Przed odcedzeniem zachowaj około 80 ml wody z gotowania.
> Czosnek drobno posiekaj i podsmaż 20–30 sekund na oliwie na średnim ogniu; nie dopuść do zbrązowienia.
> Dodaj szpinak i duś 2–3 minuty, aż zwiędnie; jeśli używasz szpinaku mrożonego, odparuj nadmiar wody.
> Zmniejsz ogień, wmieszaj ricottę i gałkę muszkatołową. Dolewaj stopniowo wodę z makaronu, aż powstanie kremowy sos.
> Dodaj gemelli, wymieszaj przez 30–60 sekund, dopraw solą i podawaj od razu.

# Cavatappi ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
8 ml | oliwa z oliwek
: Makaron Cavatappi ze szpinakiem i ricottą.
90 g | cavatappi
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj cavatappi w osolonej wodzie do al dente. Przed odcedzeniem zachowaj około 80 ml wody z gotowania.
> Czosnek drobno posiekaj i podsmaż 20–30 sekund na oliwie na średnim ogniu; nie dopuść do zbrązowienia.
> Dodaj szpinak i duś 2–3 minuty, aż zwiędnie; jeśli używasz szpinaku mrożonego, odparuj nadmiar wody.
> Zmniejsz ogień, wmieszaj ricottę i gałkę muszkatołową. Dolewaj stopniowo wodę z makaronu, aż powstanie kremowy sos.
> Dodaj cavatappi, wymieszaj przez 30–60 sekund, dopraw solą i podawaj od razu.

# Maccheroni ze szpinakiem i ricottą
@ cat=pasta origin=IT servings=1 prep=10 cook=15 art=pasta tags=makaron,kuchnia-włoska
8 ml | oliwa z oliwek
: Makaron Maccheroni ze szpinakiem i ricottą.
90 g | maccheroni
70 g | szpinak
50 g | ricotta
1 szt. | czosnek
0,3 g | gałka muszkatołowa
3 g | sól
> Ugotuj maccheroni w osolonej wodzie do al dente. Przed odcedzeniem zachowaj około 80 ml wody z gotowania.
> Czosnek drobno posiekaj i podsmaż 20–30 sekund na oliwie na średnim ogniu; nie dopuść do zbrązowienia.
> Dodaj szpinak i duś 2–3 minuty, aż zwiędnie; jeśli używasz szpinaku mrożonego, odparuj nadmiar wody.
> Zmniejsz ogień, wmieszaj ricottę i gałkę muszkatołową. Dolewaj stopniowo wodę z makaronu, aż powstanie kremowy sos.
> Dodaj maccheroni, wymieszaj przez 30–60 sekund, dopraw solą i podawaj od razu.

# White Russian
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl White Russian.
40 ml | wódka
20 ml | likier kawowy
20 ml | śmietanka 30%
> Napełnij niską szklankę świeżym lodem. Wlej wódkę i likier kawowy.
> Zamieszaj przez kilka sekund łyżką barmańską, aby schłodzić bazę bez nadmiernego rozcieńczania.
> Powoli wlej śmietankę po grzbiecie łyżki, aby utworzyła jasną warstwę na powierzchni.
> Jeśli gość woli jednolity smak, pozwól mu wymieszać napój tuż przed piciem; nie wstrząsaj śmietanki razem z resztą.
> Podawaj od razu w niskiej szklance z krótką słomką lub bez niej.

# Tequila Sunrise
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Tequila Sunrise.
45 ml | tequila
90 ml | sok pomarańczowy
10 ml | grenadyna
> Wypełnij wysoką szklankę lodem i wlej tequilę oraz sok pomarańczowy.
> Delikatnie zamieszaj, aby połączyć bazę, nie rozbijając lodu.
> Wlej grenadynę powoli po wewnętrznej ściance szklanki; powinna opaść na dno i utworzyć czerwono-pomarańczowy gradient.
> Nie mieszaj ponownie po dodaniu grenadyny — to zachowa charakterystyczny efekt wschodu słońca.
> Podawaj natychmiast, zanim lód rozcieńczy sok.

# Blue Lagoon
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Blue Lagoon.
40 ml | wódka
20 ml | blue curaçao
80 ml | lemoniada
> Wypełnij wysoką szklankę świeżym lodem.
> Wlej wódkę i blue curaçao, po czym krótko zamieszaj, aby równomiernie rozprowadzić kolor.
> Dopełnij lemoniadą i delikatnie zamieszaj od dna ku górze, nie pozbawiając napoju gazu.
> Spróbuj i w razie potrzeby skoryguj proporcje lemoniady, nie dodając składników spoza receptury.
> Podawaj od razu, gdy napój jest mocno schłodzony i musujący.

# Sex on the Beach
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Sex on the Beach.
40 ml | wódka
20 ml | likier brzoskwiniowy
40 ml | sok pomarańczowy
40 ml | sok żurawinowy
> Wlej wódkę, likier brzoskwiniowy, sok pomarańczowy i sok żurawinowy do shakera wypełnionego lodem.
> Wstrząsaj energicznie przez 10–12 sekund, aż shaker będzie wyraźnie zimny.
> Napełnij wysoką szklankę świeżym lodem i przecedź do niej koktajl.
> Krótko zamieszaj, aby połączyć oba soki i uzyskać jednolity, różowo-pomarańczowy kolor.
> Podawaj natychmiast, zanim lód nadmiernie rozcieńczy napój.

# Long Island
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Long Island.
15 ml | wódka
15 ml | gin
15 ml | rum
15 ml | tequila
15 ml | triple sec
40 ml | cola
> Napełnij wysoką szklankę świeżym lodem.
> Wlej wódkę, gin, rum, tequilę i triple sec. Zamieszaj krótko, aby połączyć alkohole i schłodzić bazę.
> Dopełnij colą i delikatnie zamieszaj od dna ku górze, zachowując możliwie dużo gazu.
> Spróbuj przed podaniem; przy tej proporcji cola łagodzi mocny, wieloskładnikowy alkoholowy profil.
> Podawaj od razu w wysokiej szklance, zanim lód zacznie nadmiernie rozcieńczać koktajl.

# Cuba Libre
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Cuba Libre.
45 ml | rum
120 ml | cola
0,2 szt. | limonka
> Wlej rum i sok z limonki do szklanki z lodem, dopełnij colą i delikatnie zamieszaj.
> Spróbuj i skoryguj proporcje wyłącznie w granicach składników przewidzianych w recepturze.
> Użyj świeżego lodu i schłodzonego szkła, jeśli koktajl podaje się na zimno.
> Dodaj dekorację z owoców lub ziół wymienionych w składnikach.
> Podawaj natychmiast, zanim lód nadmiernie rozcieńczy napój.

# Dark and Stormy
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Dark and Stormy.
50 ml | rum ciemny
120 ml | piwo imbirowe
0,2 szt. | limonka
> Wypełnij wysoką szklankę lodem i wyciśnij do niej sok z limonki, a następnie wrzuć kawałek owocu, jeśli pozostał po wyciskaniu.
> Wlej piwo imbirowe i delikatnie zamieszaj, aby schłodzić napój bez utraty nadmiaru gazu.
> Powoli dolej ciemny rum po grzbiecie łyżki, aby utworzył ciemniejszą warstwę na wierzchu.
> Przed pierwszym łykiem lekko zamieszaj, jeśli chcesz uzyskać równomierny smak rumu i imbiru.
> Podawaj natychmiast, mocno schłodzone.

# Irish Coffee
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Irish Coffee.
90 ml | kawa
30 ml | whisky irlandzka
8 g | cukier
20 ml | śmietanka 30%
> Podgrzej żaroodporną szklankę gorącą wodą, po chwili ją wylej i osusz.
> Do gorącej kawy dodaj cukier i mieszaj, aż całkowicie się rozpuści. Wlej whisky i ponownie krótko zamieszaj.
> Śmietankę lekko ubij, tak aby była płynna, ale gęstsza od mleka.
> Powoli przelej śmietankę po grzbiecie łyżki na powierzchnię kawy; nie mieszaj warstwy śmietankowej z kawą.
> Podawaj od razu, gdy kawa jest gorąca, a śmietanka utrzymuje się na wierzchu.

# Hot Toddy
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Hot Toddy.
40 ml | whisky
120 ml | woda
12 g | miód
0,2 szt. | cytryna
> Wlej gorącą, ale nie gwałtownie wrzącą wodę do odpornego na temperaturę kubka.
> Dodaj miód i mieszaj, aż całkowicie się rozpuści.
> Wlej whisky i sok wyciśnięty z cytryny, po czym wymieszaj delikatnie.
> Spróbuj ostrożnie; jeśli napój jest zbyt kwaśny, dodaj odrobinę miodu z podanej ilości, jeśli pozostał.
> Podawaj od razu na ciepło, zanim napój ostygnie.

# Sazerac
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl
: Koktajl Sazerac.
50 ml | whisky żytnia
3 ml | absynt
4 g | cukier
2 ml | bitters Peychaud’s
> Schłodź małą szklankę. Wlej absynt, obróć naczynie, aby zwilżyć jego wnętrze, a nadmiar płynu wylej.
> W szklanicy barmańskiej połącz cukier z bittersami Peychaud’s i dodaj odrobinę wody, aby cukier zaczął się rozpuszczać.
> Dodaj whisky żytnią oraz lód i mieszaj przez 20–30 sekund, aż koktajl będzie dobrze schłodzony.
> Przecedź bez lodu do przygotowanej szklanki z absyntowym aromatem.
> Podawaj od razu; ten koktajl tradycyjnie serwuje się bez lodu i bez dodatkowej dekoracji.

# Winegret klasyczny
@ cat=sosy origin=FR servings=1 prep=3 art=food tags=sos,dressing,kuchnia-francuska
: Winegret klasyczny — porcja sosu lub dressingu.
20 ml | oliwa z oliwek
8 ml | ocet winny
3 g | musztarda
3 g | sól
> Musztardę i sól rozmieszaj z octem winnym, aż sól zacznie się rozpuszczać.
> Oliwę dodawaj cienkim strumieniem, cały czas energicznie ubijając rózgą.
> Ubijaj do uzyskania chwilowej, jednolitej emulsji.
> Spróbuj i skoryguj kwasowość proporcją oliwy do octu, zamiast dosładzać bez potrzeby.
> Wymieszaj bezpośrednio przed podaniem, ponieważ emulsja z czasem naturalnie się rozwarstwia.

# Sos winegret malinowy
@ cat=sosy origin=FR servings=1 prep=3 art=food tags=sos,dressing,kuchnia-francuska
: Sos winegret malinowy — porcja sosu lub dressingu.
18 ml | oliwa z oliwek
8 ml | ocet malinowy
4 g | miód
> W miseczce połącz ocet malinowy z miodem i mieszaj do jego rozpuszczenia.
> Oliwę dodawaj cienkim strumieniem, energicznie ubijając.
> Kontynuuj ubijanie, aż dressing stanie się lekko kremowy i jednolity.
> Spróbuj i skoryguj balans kwaśnego octu i słodyczy miodu.
> Wymieszaj ponownie tuż przed polaniem sałatki; przechowuj krótko w lodówce.

# Sos tahini
@ cat=sosy servings=1 prep=3 art=food tags=sos,dressing,kuchnia-śródziemnomorska
: Sos tahini — porcja sosu lub dressingu.
25 g | tahini
10 ml | sok z cytryny
1 szt. | czosnek
15 ml | woda
> Tahini dokładnie wymieszaj w słoiku, jeśli olej oddzielił się na powierzchni.
> Dodaj sok z cytryny i drobno starty czosnek; masa może początkowo zgęstnieć.
> Dolewaj wodę po łyżeczce, za każdym razem energicznie mieszając.
> Kontynuuj do uzyskania gładkiego, jasnego sosu, który spływa z łyżki szeroką wstążką.
> Odstaw na 5 minut, spróbuj i podawaj; w razie potrzeby rozrzedź kolejną małą porcją wody.

# Sos czosnkowy jogurtowy
@ cat=sosy origin=PL servings=1 prep=3 art=food tags=sos,dressing,kuchnia-polska
: Sos czosnkowy jogurtowy — porcja sosu lub dressingu.
60 g | jogurt
1 szt. | czosnek
3 g | koperek
3 g | sól
> Czosnek przeciśnij przez praskę lub zetrzyj na drobnej tarce.
> Koperek posiekaj drobno, odrzucając grube łodygi.
> Wymieszaj jogurt z czosnkiem, koperkiem i solą do uzyskania jednolitej konsystencji.
> Odstaw pod przykryciem do lodówki na 10–15 minut, aby czosnek oddał aromat.
> Przed podaniem wymieszaj i spróbuj; podawaj schłodzony.

# Sos sriracha mayo
@ cat=sosy servings=1 prep=3 art=food tags=sos,dressing,kuchnia-azjatycka
: Sos sriracha mayo — porcja sosu lub dressingu.
30 g | majonez
8 g | sriracha
4 ml | sok z limonki
> Majonez przełóż do małej miski i dodaj srirachę.
> Sok z limonki dodawaj stopniowo, mieszając po każdej porcji.
> Wymieszaj do uzyskania jednolitego koloru bez smug majonezu.
> Spróbuj i dopasuj ostrość, dodając niewielką ilość srirachy tylko wtedy, gdy potrzeba.
> Schłodź przez kilka minut i podawaj jako dip lub sos do kanapek.

# Sos sojowo-imbirowy
@ cat=sosy origin=JP servings=1 prep=3 art=food tags=sos,dressing,kuchnia-japońska
: Sos na bazie sosu sojowego, imbiru, cukru i oleju sezamowego.
20 ml | sos sojowy
6 g | imbir
4 g | cukier
4 ml | sezamowy olej
> Imbir obierz i zetrzyj drobno, aby równomiernie rozprowadził się w sosie.
> Sos sojowy połącz z cukrem i mieszaj do rozpuszczenia kryształków.
> Dodaj imbir i olej sezamowy.
> Wymieszaj energicznie, aż olej rozbije się na drobne krople w sosie.
> Odstaw na 5–10 minut przed użyciem jako dressing lub marynatę; nie musisz go gotować.

# Gremolata
@ cat=sosy origin=IT servings=1 prep=3 art=food tags=sos,dressing,kuchnia-włoska
: Gremolata — porcja sosu lub dressingu.
4 g | natka pietruszki
3 g | skórka cytrynowa
1 szt. | czosnek
12 ml | oliwa z oliwek
> Natkę pietruszki osusz dokładnie i posiekaj bardzo drobno.
> Skórkę cytrynową zetrzyj drobno, unikając białej, gorzkiej części.
> Czosnek posiekaj lub rozetrzyj na pastę.
> Wymieszaj składniki tuż przed podaniem, bez podgrzewania.
> Użyj gremolaty na końcu przygotowania dania, aby zachować cytrusowy aromat i świeży kolor.

# Koktajl owocowy truskawka i banan
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: truskawka i banan.
80 g | truskawka
0,5 szt. | banan
80 g | jogurt
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Koktajl owocowy kiwi i szpinak
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: kiwi i szpinak.
60 g | kiwi
30 g | szpinak
0,4 szt. | banan
80 ml | woda
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Koktajl owocowy borówka i owies
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: borówka i owies.
70 g | borówki
20 g | płatki owsiane
120 ml | mleko
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Koktajl owocowy ananas i mięta
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: ananas i mięta.
90 g | ananas
4 g | mięta
80 ml | woda
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Koktajl owocowy kakao i banan
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: kakao i banan.
8 g | kakao
0,6 szt. | banan
140 ml | mleko
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Koktajl owocowy marchew i pomarańcza
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: marchew i pomarańcza.
80 g | marchew
1 szt. | pomarańcza
4 g | imbir
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Koktajl owocowy malina i jogurt
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: malina i jogurt.
80 g | maliny
100 g | jogurt
8 g | miód
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Koktajl owocowy gruszka i cynamon
@ cat=cocktaile servings=1 prep=3 cook=5 art=drink tags=koktajl-owocowy,napój
: Blendowany napój: gruszka i cynamon.
90 g | gruszka
1 g | cynamon
100 ml | mleko
> Owoce umyj, obierz i pokrój na mniejsze kawałki. Jeśli używasz mrożonych owoców, nie musisz ich wcześniej rozmrażać.
> Włóż składniki do blendera, zaczynając od płynu.
> Miksuj do uzyskania gładkiej konsystencji. Jeśli napój jest zbyt gęsty, dodaj trochę płynu z receptury.
> Spróbuj i w razie potrzeby skoryguj słodycz lub kwasowość.
> Podawaj od razu, najlepiej dobrze schłodzony.

# Omlet z ziołami
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Omlet z ziołami — szybkie śniadanie.
2 szt. | jajko
4 g | szczypiorek
10 g | masło
> Posiekaj szczypiorek i roztrzep jajka ze szczyptą soli. Roztop masło na patelni na średnio małym ogniu.
> Wlej jajka na patelnię i poruszaj nią, aby masa równomiernie pokryła dno.
> Gdy brzegi się zetną, delikatnie podważ je łopatką i przechyl patelnię, aby płynna masa spłynęła pod spód.
> Posyp szczypiorkiem. Gdy wierzch będzie jeszcze lekko wilgotny, złóż omlet na pół i smaż jeszcze 20–30 sekund.
> Przełóż na talerz i podawaj od razu, zanim omlet straci puszystość.

# Omlet z pieczarkami
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Omlet z rumianymi pieczarkami.
2 szt. | jajko
50 g | pieczarki
10 g | masło
> Oczyść pieczarki i pokrój je w cienkie plasterki. Roztrzep jajka ze szczyptą soli.
> Rozgrzej patelnię, dodaj połowę masła i smaż pieczarki 4–5 minut, aż odparują i lekko się zrumienią.
> Roztrzep jajka z łyżeczką wody, wlej na patelnię i rozprowadź masę po całym dnie.
> Smaż na małym ogniu, podważając brzegi, aż spód się zetnie, a wierzch pozostanie lekko wilgotny.
> Złóż omlet na pół, dodaj pozostałe masło na wierzch i podawaj od razu.


# Omlet ze szpinakiem
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Omlet ze szpinakiem i fetą.
2 szt. | jajko
40 g | szpinak
20 g | feta
> Opłucz szpinak i osusz go dokładnie. Pokrusz fetę i roztrzep jajka ze szczyptą soli.
> Rozgrzej patelnię z odrobiną masła, dodaj szpinak i smaż 1–2 minuty, aż zwiędnie i odparuje nadmiar płynu.
> Wlej jajka na patelnię i rozprowadź je równomiernie wokół szpinaku.
> Gdy spód zacznie się ścinać, posyp wierzch fetą i smaż na małym ogniu pod przykryciem, aż jajka będą ścięte.
> Złóż omlet delikatnie na pół i podawaj natychmiast, zanim feta i szpinak puszczą dodatkową wilgoć.


# Omlet z serem
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Puszysty omlet z roztopionym serem.
2 szt. | jajko
25 g | ser żółty
10 g | masło
> Zetrzyj ser na grubych oczkach i roztrzep jajka ze szczyptą soli.
> Rozgrzej patelnię na małym ogniu i roztop masło, nie dopuszczając do zbrązowienia.
> Wlej jajka i smaż bez pośpiechu, podważając brzegi, aby płynna masa spływała pod spód.
> Gdy wierzch będzie jeszcze lekko wilgotny, posyp omlet serem i przykryj patelnię na 30–60 sekund.
> Złóż omlet na pół, poczekaj aż ser się roztopi i podawaj od razu.


# Jajka sadzone na maśle
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Jajka sadzone na maśle — szybkie śniadanie.
2 szt. | jajko
10 g | masło
3 g | sól
> Przygotuj jajka i sól przy kuchence. Rozgrzej masło na patelni na średnio małym ogniu, uważając, by nie zaczęło brązowieć.
> Wbij jajka ostrożnie, zostawiając odstęp między nimi. Zmniejsz ogień, aby białka ścinały się równomiernie bez przypalania spodu.
> Smaż 3–4 minuty, aż białka będą prawie całkowicie ścięte. Posól białka, unikając posypywania żółtek, jeśli chcesz zachować ich połysk.
> Jeśli wolisz bardziej ścięte żółtka, przykryj patelnię na ostatnią minutę lub delikatnie polewaj wierzch gorącym masłem.
> Przełóż na talerz szeroką łopatką i podawaj od razu.

# Jajka w koszulce
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Jajka w koszulce — szybkie śniadanie.
2 szt. | jajko
5 ml | ocet
3 g | sól
> Zagotuj wodę w szerokim rondlu i dodaj ocet. Zmniejsz ogień tak, by woda tylko lekko drżała; jajko wbij do osobnej miseczki.
> Zamieszaj wodę, aby utworzyć delikatny wir, po czym ostrożnie wsuń jajko do środka. Nie wkładaj kilku jaj naraz, jeśli nie masz dużego rondla.
> Gotuj 3–4 minuty, aż białko będzie ścięte, a żółtko pozostanie płynne. Nie doprowadzaj wody do gwałtownego wrzenia.
> Wyjmij jajko łyżką cedzakową i dotknij delikatnie białka; powinno być sprężyste, bez surowych, przezroczystych fragmentów.
> Odsącz na ręczniku papierowym i podawaj natychmiast. Powtórz z kolejnym jajkiem, utrzymując lekkie wrzenie wody.

# Frittata z cukinią
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Frittata z cukinią i parmezanem — szybkie danie z patelni.
2 szt. | jajko
60 g | cukinia
15 g | parmezan
> Pokrój cukinię w cienkie półplasterki, zetrzyj parmezan i roztrzep jajka ze szczyptą soli.
> Rozgrzej patelnię z odrobiną oliwy, dodaj cukinię i smaż 3–4 minuty, aż zmięknie i lekko się zrumieni.
> Wlej jajka na cukinię, potrząśnij patelnią, aby masa równomiernie się rozlała, i posyp parmezanem.
> Smaż pod przykryciem na małym ogniu 4–5 minut, aż brzegi będą ścięte, a środek prawie gotowy.
> Dokończ pod gorącym grillem przez 1–2 minuty lub ostrożnie odwróć frittatę; odstaw na minutę przed podaniem.


# Frittata z ziemniakami
@ cat=inne servings=1 prep=5 cook=7 art=food tags=jajka,śniadanie
: Frittata z ziemniakami i cebulą — sycące danie z patelni.
2 szt. | jajko
70 g | ziemniaki
0,5 szt. | cebula
> Ugotowane ziemniaki pokrój w plastry, a cebulę w cienkie piórka. Roztrzep jajka ze szczyptą soli.
> Podsmaż cebulę na patelni z odrobiną oliwy przez 3–4 minuty, aż zmięknie.
> Dodaj plastry ziemniaków i smaż jeszcze 2 minuty, żeby lekko się zrumieniły.
> Wlej roztrzepane jajka, rozprowadź je między ziemniakami i smaż pod przykryciem na małym ogniu do ścięcia brzegów.
> Ostrożnie obróć frittatę lub dopiecz jej wierzch pod grillem; odstaw na minutę przed pokrojeniem.
`;
