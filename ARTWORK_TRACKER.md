# Kuchnik — rejestr ilustracji potraw

Audyt bazy startowej z `seeds.js`, `seeds-pl.js`, `seeds-world.js`, `seeds-more.js`. Stare przypisania sprawdzone w `food-photos.js` oraz w plikach repozytorium.

## Standard nowej serii
- Jedna potrawa = jedna osobna ilustracja. Nie tworzymy plansz-kolaży i nie wycinamy miniatur z plansz.
- Ręcznie rysowana ilustracja 2D / semi-flat: czytelne kontury, proste kształty, ograniczona paleta, delikatne cieniowanie.
- Bez renderu 3D, fotograficznych tekstur, ciężkich gradientów, studyjnych blików i ozdobnych złotych ramek.
- Przezroczyste tło. Ilustracja ma być czytelna na grafitowym interfejsie Kuchnika (`#111214`).
- Składniki i sposób podania muszą odpowiadać konkretnej potrawie. Nie przypisujemy jednej generycznej grafiki kilku różnym daniom.
- Nową pozycję odhaczamy dopiero po sprawdzeniu podglądu, akceptacji, dodaniu osobnego pliku i poprawnym mapowaniu.

## Wynik audytu
- Wszystkie przepisy: **225**
- Mają obecnie przypisane SVG: **56**
- Mają obecnie przypisane JPG: **27**
- Mają przynajmniej jeden istniejący plik: **68**
- Nie mają dedykowanego pliku: **157**
- Nowe grafiki zaakceptowane: **0/225**

Uwaga: istniejące pliki są oznaczone jako `legacy`. Nie są zaliczone jako ukończone w nowym stylu — cała biblioteka ma zostać ujednolicona.

## Kolejka — kolejność zgodna z bazą

| # | Przepis | Kategoria | Kraj | Obecny plik (legacy) | Nowa grafika zaakceptowana |
|---:|---|---|---|---|:---:|
| 1 | Rosół z kury | zupy | PL | brak | [ ] |
| 2 | Żurek na zakwasie | zupy | PL | brak | [ ] |
| 3 | Barszcz czerwony | zupy | PL | JPG: food-barszcz.jpg | [ ] |
| 4 | Zupa pomidorowa | zupy | PL | SVG: tomato-soup.svg<br>JPG: food-soup-tomato.jpg | [ ] |
| 5 | Krem z dyni | zupy | — | brak | [ ] |
| 6 | Tom yum z krewetkami | zupy | TH | SVG: tom-yum.svg | [ ] |
| 7 | Gazpacho | zupy | ES | brak | [ ] |
| 8 | Kotlet schabowy | mieso | PL | JPG: food-schnitzel.jpg | [ ] |
| 9 | Bigos staropolski | mieso | PL | JPG: food-bigos.jpg | [ ] |
| 10 | Gołąbki w sosie pomidorowym | mieso | PL | brak | [ ] |
| 11 | Gulasz węgierski | mieso | HU | SVG: gulasz-wegierski.svg | [ ] |
| 12 | Wiener Schnitzel | mieso | AT | JPG: food-schnitzel.jpg | [ ] |
| 13 | Chili con carne | mieso | US | brak | [ ] |
| 14 | Burger domowy | mieso | US | JPG: food-burger.jpg | [ ] |
| 15 | Kurczak tikka masala | mieso | IN | SVG: chicken-curry.svg<br>JPG: food-chicken-curry.jpg | [ ] |
| 16 | Coq au vin | mieso | FR | SVG: coq-au-vin.svg | [ ] |
| 17 | Pierogi ruskie | inne | PL | SVG: pierogi.svg<br>JPG: food-pierogi.jpg | [ ] |
| 18 | Naleśniki | inne | PL | brak | [ ] |
| 19 | Placki ziemniaczane | warzywa | PL | brak | [ ] |
| 20 | Szakszuka | inne | IL | brak | [ ] |
| 21 | Tortilla española | inne | ES | brak | [ ] |
| 22 | Spaghetti aglio e olio | pasta | IT | SVG: spaghetti-aglio-olio.svg | [ ] |
| 23 | Cacio e pepe | pasta | IT | SVG: cacio-e-pepe.svg | [ ] |
| 24 | Lasagne alla bolognese | pasta | IT | SVG: lasagna.svg<br>JPG: food-lasagna.jpg | [ ] |
| 25 | Pad thai z krewetkami | pasta | TH | SVG: pad-thai.svg | [ ] |
| 26 | Pesto genovese | sosy | IT | brak | [ ] |
| 27 | Guacamole | sosy | MX | brak | [ ] |
| 28 | Hummus | sosy | LB | brak | [ ] |
| 29 | Tzatziki | sosy | GR | brak | [ ] |
| 30 | Sos beszamel | sosy-bazowe | FR | brak | [ ] |
| 31 | Sos holenderski | sosy-bazowe | FR | brak | [ ] |
| 32 | Majonez domowy | sosy-bazowe | — | brak | [ ] |
| 33 | Vinaigrette | sosy-bazowe | FR | brak | [ ] |
| 34 | Bulion drobiowy (fond) | prep | — | JPG: food-soup.jpg | [ ] |
| 35 | Masło ziołowe | prep | — | brak | [ ] |
| 36 | Cebula karmelizowana | prep | — | brak | [ ] |
| 37 | Marynowana czerwona cebula | prep | — | brak | [ ] |
| 38 | Łosoś pieczony z cytryną | ryby | — | SVG: salmon.svg<br>JPG: food-salmon.jpg | [ ] |
| 39 | Fish and chips | ryby | GB | SVG: fish-and-chips.svg | [ ] |
| 40 | Gambas al ajillo | owoce-morza | ES | SVG: gambas-al-ajillo.svg | [ ] |
| 41 | Ratatouille | warzywa | FR | SVG: ratatouille.svg | [ ] |
| 42 | Mizeria | salatki | PL | brak | [ ] |
| 43 | Sernik klasyczny | desery | PL | SVG: cheesecake.svg<br>JPG: food-sernik.jpg | [ ] |
| 44 | Szarlotka | desery | PL | SVG: apple-pie.svg | [ ] |
| 45 | Tiramisu | desery | IT | SVG: tiramisu.svg | [ ] |
| 46 | Panna cotta z truskawkami | desery | IT | SVG: panna-cotta.svg | [ ] |
| 47 | Brownie czekoladowe | desery | US | brak | [ ] |
| 48 | Crème brûlée | desery | FR | SVG: creme-brulee.svg | [ ] |
| 49 | Pancakes amerykańskie | desery | US | SVG: pancakes.svg | [ ] |
| 50 | Focaccia | pieczywo | IT | SVG: focaccia.svg<br>JPG: food-focaccia.jpg | [ ] |
| 51 | Chleb na zakwasie | pieczywo | — | brak | [ ] |
| 52 | Chleb pszenny na drożdżach | pieczywo | — | brak | [ ] |
| 53 | Sałatka grecka | salatki | GR | SVG: greek-salad.svg | [ ] |
| 54 | Sałatka caprese | salatki | IT | brak | [ ] |
| 55 | Sałatka Cezar | salatki | US | SVG: caesar-salad.svg<br>JPG: food-caesar-salad.jpg | [ ] |
| 56 | Sałatka jarzynowa | salatki | PL | brak | [ ] |
| 57 | Margarita | cocktaile | MX | brak | [ ] |
| 58 | Negroni | cocktaile | IT | brak | [ ] |
| 59 | Aperol Spritz | cocktaile | IT | JPG: food-aperol.jpg | [ ] |
| 60 | Old Fashioned | cocktaile | US | brak | [ ] |
| 61 | Mojito | cocktaile | — | SVG: mojito.svg | [ ] |
| 62 | Espresso Martini | cocktaile | GB | brak | [ ] |
| 63 | Zupa ogórkowa | zupy | PL | JPG: food-soup.jpg | [ ] |
| 64 | Zupa grzybowa | zupy | PL | JPG: food-soup.jpg | [ ] |
| 65 | Kapuśniak | zupy | PL | brak | [ ] |
| 66 | Krupnik z kaszą jęczmienną | zupy | PL | JPG: food-soup.jpg | [ ] |
| 67 | Zupa koperkowa | zupy | PL | brak | [ ] |
| 68 | Flaki wołowe | zupy | PL | brak | [ ] |
| 69 | Chłodnik litewski | zupy | LT | brak | [ ] |
| 70 | Zupa szczawiowa | zupy | PL | brak | [ ] |
| 71 | Grochówka | zupy | PL | brak | [ ] |
| 72 | Zupa fasolowa | zupy | PL | brak | [ ] |
| 73 | Kotlet mielony | mieso | PL | brak | [ ] |
| 74 | Pieczeń rzymska | mieso | PL | brak | [ ] |
| 75 | Zrazy zawijane | mieso | PL | brak | [ ] |
| 76 | Karkówka pieczona | mieso | PL | brak | [ ] |
| 77 | Kaczka pieczona z jabłkami | mieso | PL | brak | [ ] |
| 78 | Kurczak pieczony | mieso | PL | brak | [ ] |
| 79 | Pulpety w sosie koperkowym | mieso | PL | brak | [ ] |
| 80 | Wątróbka z cebulą | mieso | PL | brak | [ ] |
| 81 | Żeberka w miodzie | mieso | — | brak | [ ] |
| 82 | Schab pieczony w sosie własnym | mieso | PL | brak | [ ] |
| 83 | Kopytka | inne | PL | brak | [ ] |
| 84 | Kluski śląskie | inne | PL | brak | [ ] |
| 85 | Pierogi z kapustą i grzybami | inne | PL | SVG: pierogi.svg<br>JPG: food-pierogi.jpg | [ ] |
| 86 | Pierogi z jagodami | desery | PL | SVG: pierogi.svg<br>JPG: food-pierogi.jpg | [ ] |
| 87 | Pierogi leniwe | inne | PL | SVG: pierogi.svg<br>JPG: food-pierogi.jpg | [ ] |
| 88 | Naleśniki z serem | desery | PL | brak | [ ] |
| 89 | Racuchy z jabłkami | desery | PL | brak | [ ] |
| 90 | Knedle ze śliwkami | desery | PL | brak | [ ] |
| 91 | Łazanki z kapustą | inne | PL | brak | [ ] |
| 92 | Śledź w oleju z cebulą | ryby | PL | brak | [ ] |
| 93 | Ryba po grecku | ryby | PL | brak | [ ] |
| 94 | Karp smażony | ryby | PL | brak | [ ] |
| 95 | Pstrąg z masłem i migdałami | ryby | — | brak | [ ] |
| 96 | Kapusta zasmażana | warzywa | PL | brak | [ ] |
| 97 | Surówka z marchewki i jabłka | salatki | PL | brak | [ ] |
| 98 | Buraczki zasmażane | warzywa | PL | brak | [ ] |
| 99 | Ogórki kiszone | prep | PL | brak | [ ] |
| 100 | Fasolka szparagowa z bułką tartą | warzywa | PL | brak | [ ] |
| 101 | Makowiec | desery | PL | brak | [ ] |
| 102 | Sernik na zimno z galaretką | desery | PL | SVG: cheesecake.svg<br>JPG: food-sernik.jpg | [ ] |
| 103 | Drożdżówka z serem | pieczywo | PL | brak | [ ] |
| 104 | Babka piaskowa | desery | PL | brak | [ ] |
| 105 | Mazurek kajmakowy | desery | PL | brak | [ ] |
| 106 | Pączki | desery | PL | brak | [ ] |
| 107 | Faworki | desery | PL | brak | [ ] |
| 108 | Kisiel żurawinowy | desery | PL | brak | [ ] |
| 109 | Ciasto marchewkowe | desery | — | brak | [ ] |
| 110 | Placek drożdżowy ze śliwkami | desery | PL | brak | [ ] |
| 111 | Kutia | desery | PL | brak | [ ] |
| 112 | Pierniczki | desery | PL | brak | [ ] |
| 113 | Śledzie w śmietanie | ryby | PL | brak | [ ] |
| 114 | Pasta jajeczna | inne | PL | brak | [ ] |
| 115 | Smalec ze skwarkami | prep | PL | brak | [ ] |
| 116 | Uszka do barszczu | inne | PL | brak | [ ] |
| 117 | Risotto alla milanese | inne | IT | SVG: risotto-milanese.svg | [ ] |
| 118 | Gnocchi z masłem szałwiowym | pasta | IT | SVG: gnocchi-burro-salvia.svg | [ ] |
| 119 | Spaghetti alla puttanesca | pasta | IT | SVG: spaghetti-puttanesca.svg | [ ] |
| 120 | Spaghetti all'amatriciana | pasta | IT | SVG: spaghetti-amatriciana.svg | [ ] |
| 121 | Ragù alla bolognese | sosy | IT | brak | [ ] |
| 122 | Penne all'arrabbiata | pasta | IT | JPG: food-pasta-tomato.jpg | [ ] |
| 123 | Fettuccine Alfredo | pasta | IT | brak | [ ] |
| 124 | Minestrone | zupy | IT | SVG: minestrone.svg | [ ] |
| 125 | Bruschetta z pomidorami | inne | IT | SVG: bruschetta.svg | [ ] |
| 126 | Panzanella | salatki | IT | SVG: panzanella.svg | [ ] |
| 127 | Saltimbocca alla romana | mieso | IT | SVG: saltimbocca-romana.svg | [ ] |
| 128 | Parmigiana di melanzane | warzywa | IT | SVG: parmigiana-di-melanzane.svg | [ ] |
| 129 | Pizza pepperoni | pizza | US | brak | [ ] |
| 130 | Pizza quattro formaggi | pizza | IT | brak | [ ] |
| 131 | Calzone | pizza | IT | brak | [ ] |
| 132 | Zupa cebulowa | zupy | FR | SVG: french-onion-soup.svg | [ ] |
| 133 | Quiche Lorraine | inne | FR | SVG: quiche-lorraine.svg | [ ] |
| 134 | Boeuf bourguignon | mieso | FR | SVG: boeuf-bourguignon.svg | [ ] |
| 135 | Croque monsieur | inne | FR | brak | [ ] |
| 136 | Moules marinières | owoce-morza | FR | SVG: moules-mariniere.svg | [ ] |
| 137 | Sałatka niçoise | salatki | FR | brak | [ ] |
| 138 | Tarte tatin | desery | FR | SVG: tarte-tatin.svg | [ ] |
| 139 | Crêpes | desery | FR | brak | [ ] |
| 140 | Paella z owocami morza | inne | ES | SVG: paella-marisco.svg | [ ] |
| 141 | Patatas bravas | warzywa | ES | brak | [ ] |
| 142 | Albóndigas w sosie pomidorowym | mieso | ES | brak | [ ] |
| 143 | Mussaka | mieso | GR | SVG: moussaka.svg | [ ] |
| 144 | Souvlaki z kurczaka | mieso | GR | brak | [ ] |
| 145 | Spanakopita | inne | GR | SVG: spanakopita.svg | [ ] |
| 146 | Tacos al pastor | mieso | MX | SVG: tacos.svg | [ ] |
| 147 | Quesadilla z serem i kurczakiem | inne | MX | brak | [ ] |
| 148 | Enchiladas z kurczakiem | mieso | MX | brak | [ ] |
| 149 | Pico de gallo | sosy | MX | brak | [ ] |
| 150 | Burrito bowl | inne | MX | brak | [ ] |
| 151 | Mac and cheese | pasta | US | brak | [ ] |
| 152 | BBQ ribs | mieso | US | brak | [ ] |
| 153 | Pulled pork | mieso | US | brak | [ ] |
| 154 | Skrzydełka buffalo | mieso | US | brak | [ ] |
| 155 | Sałatka Cobb | salatki | US | brak | [ ] |
| 156 | Ramen shoyu | zupy | JP | SVG: ramen-shoyu.svg | [ ] |
| 157 | Sushi maki z ogórkiem i łososiem | ryby | JP | SVG: sushi-maki.svg<br>JPG: food-sushi-maki.jpg | [ ] |
| 158 | Zielone curry tajskie | mieso | TH | brak | [ ] |
| 159 | Kurczak teriyaki | mieso | JP | brak | [ ] |
| 160 | Smażony ryż z jajkiem | inne | CN | brak | [ ] |
| 161 | Pho bo | zupy | VN | SVG: pho-bo.svg | [ ] |
| 162 | Bibimbap | inne | KR | SVG: bibimbap.svg | [ ] |
| 163 | Gyoza | inne | JP | SVG: dumplings.svg | [ ] |
| 164 | Kung pao z kurczakiem | mieso | CN | brak | [ ] |
| 165 | Zupa miso | zupy | JP | brak | [ ] |
| 166 | Satay z kurczaka z sosem orzechowym | mieso | TH | brak | [ ] |
| 167 | Dal z soczewicy | zupy | IN | brak | [ ] |
| 168 | Biryani z kurczakiem | inne | IN | SVG: biryani.svg | [ ] |
| 169 | Falafel | inne | LB | SVG: falafel.svg | [ ] |
| 170 | Tabbouleh | salatki | LB | brak | [ ] |
| 171 | Baba ganoush | sosy | LB | brak | [ ] |
| 172 | Kofta z jagnięciny | mieso | TR | brak | [ ] |
| 173 | Shawarma z kurczaka | mieso | LB | brak | [ ] |
| 174 | Spätzle z serem | pasta | DE | brak | [ ] |
| 175 | Currywurst | mieso | DE | brak | [ ] |
| 176 | Leczo | warzywa | HU | brak | [ ] |
| 177 | Langosz | pieczywo | HU | brak | [ ] |
| 178 | Boeuf Stroganow | mieso | RU | brak | [ ] |
| 179 | Chaczapuri adżarskie | pieczywo | GE | brak | [ ] |
| 180 | Tagine z kurczakiem i morelami | mieso | MA | brak | [ ] |
| 181 | Shepherd's pie | mieso | GB | brak | [ ] |
| 182 | Owsianka z owocami i orzechami | inne | — | brak | [ ] |
| 183 | Jajecznica na maśle | inne | — | brak | [ ] |
| 184 | Jajka w koszulkach | inne | — | brak | [ ] |
| 185 | Tosty francuskie | desery | — | brak | [ ] |
| 186 | Granola domowa | prep | — | brak | [ ] |
| 187 | Tost z awokado i jajkiem | inne | — | brak | [ ] |
| 188 | Smoothie bowl truskawkowy | desery | — | brak | [ ] |
| 189 | Placuszki bananowe | desery | — | brak | [ ] |
| 190 | Curry z ciecierzycy i szpinaku | warzywa | IN | brak | [ ] |
| 191 | Kotlety z soczewicy | warzywa | — | brak | [ ] |
| 192 | Burger wegański z czarnej fasoli | warzywa | — | brak | [ ] |
| 193 | Tofu z warzywami na woku | warzywa | CN | brak | [ ] |
| 194 | Krem z brokułów | zupy | — | brak | [ ] |
| 195 | Zapiekanka makaronowa z warzywami | pasta | — | brak | [ ] |
| 196 | Muffinki czekoladowe | desery | — | brak | [ ] |
| 197 | Ciastka owsiane z żurawiną | desery | — | brak | [ ] |
| 198 | Lody waniliowe domowe | desery | — | brak | [ ] |
| 199 | Mus czekoladowy | desery | FR | brak | [ ] |
| 200 | Sernik nowojorski | desery | US | SVG: cheesecake.svg<br>JPG: food-sernik.jpg | [ ] |
| 201 | Tarta cytrynowa | desery | FR | brak | [ ] |
| 202 | Ciasto czekoladowe bez mąki | desery | — | brak | [ ] |
| 203 | Biszkopt | desery | — | brak | [ ] |
| 204 | Bulion warzywny | prep | — | brak | [ ] |
| 205 | Sos BBQ domowy | sosy-bazowe | US | brak | [ ] |
| 206 | Sos czosnkowy | sosy-bazowe | — | brak | [ ] |
| 207 | Dżem truskawkowy | prep | — | brak | [ ] |
| 208 | Kruche ciasto uniwersalne | prep | — | brak | [ ] |
| 209 | Ciasto na pierogi | prep | PL | SVG: pierogi.svg<br>JPG: food-pierogi.jpg | [ ] |
| 210 | Zakwas żytni (zaczyn na chleb) | prep | — | brak | [ ] |
| 211 | Marynata do kurczaka | prep | — | brak | [ ] |
| 212 | Nachos z serem | inne | MX | brak | [ ] |
| 213 | Frytki z piekarnika | warzywa | — | SVG: fries.svg | [ ] |
| 214 | Kanapka club | inne | US | brak | [ ] |
| 215 | Cosmopolitan | cocktaile | US | brak | [ ] |
| 216 | Daiquiri | cocktaile | CU | brak | [ ] |
| 217 | Moscow Mule | cocktaile | US | JPG: food-cocktail.jpg | [ ] |
| 218 | Piña colada | cocktaile | PR | brak | [ ] |
| 219 | Whisky sour | cocktaile | US | brak | [ ] |
| 220 | Gin tonic | cocktaile | GB | brak | [ ] |
| 221 | Caipirinha | cocktaile | BR | brak | [ ] |
| 222 | Bloody Mary | cocktaile | US | brak | [ ] |
| 223 | Hugo | cocktaile | IT | brak | [ ] |
| 224 | Grzaniec | cocktaile | DE | brak | [ ] |
| 225 | Lemoniada domowa | cocktaile | — | brak | [ ] |

## Workflow
1. Wygeneruj tylko jedną konkretną potrawę z kolejki.
2. Sprawdź, czy styl odpowiada zaakceptowanemu wzorcowi i czy składniki są poprawne.
3. Pokaż podgląd do akceptacji — bez wdrażania.
4. Po akceptacji utwórz osobny plik, dodaj mapowanie, cache offline i test.
5. Zaznacz pozycję jako wykonaną. Przejdź do następnej.