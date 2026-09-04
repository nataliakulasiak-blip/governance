# Urania — Języki, Podróże, Wolność

Statyczna, wielojęzyczna strona biura podróży (kursy językowe, wycieczki szkolne, wyjazdy grupowe). Bez frameworków, bez kroku budowania —
wystarczy wgrać katalog na dowolny hosting (Netlify, Vercel, GitHub Pages, zwykły FTP).

## Struktura

```
website/
├── index.html                      strona główna (hero, kanały kontaktu, oferta, blog, CTA)
├── kontakt.html                    pełna strona kontaktowa (kanały, godziny, dane firmy, dokumenty, formularz, mapa, FAQ)
├── faq.html                        FAQ z filtrami, wyszukiwarką i danymi strukturalnymi
├── blog.html                       lista wpisów
├── blog/
│   ├── jak-wybrac-kierunek.html
│   ├── ubezpieczenie-turystyczne.html
│   └── pakowanie-walizka-kabinowa.html
├── assets/
│   ├── css/style.css               jeden arkusz: tokeny, motyw jasny/ciemny, komponenty
│   ├── js/i18n.js                  słowniki 6 języków + silnik tłumaczeń
│   ├── js/main.js                  motyw, menu, dok, godziny, mapa, FAQ, formularz
│   └── img/                        miejsce na og-cover.jpg, logo.png, icon-192/512.png
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

## Języki

Polski, angielski, francuski, hiszpański, rosyjski i włoski. Wybór języka:
`?lang=en` w adresie → `localStorage` → język przeglądarki → polski.

Treść w HTML jest po polsku (to wersja indeksowana przez wyszukiwarki), a pozostałe
języki podmieniane są w przeglądarce przez `assets/js/i18n.js`.

**Jak dodać lub zmienić tekst:**

1. w HTML oznacz element atrybutem `data-i18n="klucz"` (tekst) lub
   `data-i18n-attr="placeholder:klucz"` (atrybut),
2. dopisz `klucz` do **wszystkich sześciu** obiektów `window.UT_I18N.*` w `assets/js/i18n.js`.

Pytania FAQ i zajawki wpisów mają osobne tablice `UT_FAQ` i `UT_POSTS` — kolejność
musi się zgadzać z atrybutami `data-faq-index` / `data-post-index` w HTML.

Pełne treści artykułów na blogu pozostają po polsku.

## Dane firmy w serwisie

Wpisane są prawdziwe dane przekazane przez klienta:

| Pole | Wartość |
|---|---|
| Nazwa | Urania — Języki, Podróże, Wolność |
| E-mail | info@uraniatravel.pl |
| Telefon / WhatsApp | +48 573 533 847 |
| NIP | 5632464558 |
| REGON | 543565701 |
| Konto | PL15 1160 2202 0000 0006 9907 4199 |

## Co jeszcze trzeba uzupełnić

Poniższe pozycje są oznaczone w kodzie komentarzem `TODO` albo widocznym
napisem `[ADRES — UZUPEŁNIJ]`, żeby nie trafiły przypadkiem na produkcję.
Wyszukiwanie: `grep -rn "TODO\|UZUPEŁNIJ" .`

| Co | Gdzie |
|---|---|
| Adres siedziby | `kontakt.html` — tabela danych firmy oraz sekcja mapy (trzy wystąpienia `[ADRES — UZUPEŁNIJ]`) |
| Współrzędne mapy | `kontakt.html` — atrybut `data-map-src` i link „Wyznacz trasę" (obecnie 52.2310, 21.0150) |
| Adresy profili społecznościowych | stopka każdej strony oraz sekcja kanałów w `index.html` i `kontakt.html` (obecnie `uraniatravel` na FB, IG, Telegramie) |
| Pliki PDF dla klienta | linki `href="#"` w kolumnie „Dla klienta" w stopce i w `kontakt.html` |
| Godziny otwarcia | `kontakt.html` (atrybuty `data-open` / `data-close`), stopka, JSON-LD — założono Pn–Pt 09:00–18:00 |
| Domena | `https://uraniatravel.pl` w `canonical`, `hreflang`, Open Graph, `sitemap.xml`, `robots.txt`, JSON-LD |
| Obrazy | do `assets/img/`: `og-cover.jpg` (1200×630), `logo.png`, `icon-192.png`, `icon-512.png` |

Świadomie **nie** ma na stronie liczby klientów, ocen ani liczby lat
działalności — takich danych nie otrzymaliśmy, a wpisywanie ich „na oko"
(zwłaszcza `aggregateRating` w danych strukturalnych) naraża serwis na
karę od wyszukiwarki. Jeśli masz prawdziwe liczby, dopisz je w hero
`index.html` i w JSON-LD.

## Formularz kontaktowy

Domyślnie formularz otwiera program pocztowy użytkownika (`mailto:`). Aby wysyłał
wiadomości w tle, dodaj do znacznika `<form>` w `kontakt.html` atrybut z adresem
usługi przyjmującej `POST` z `FormData`, np.:

```html
<form data-contact-form data-endpoint="https://formspree.io/f/TWOJ_ID" ...>
```

Formularz ma walidację po stronie przeglądarki i ukryte pole-pułapkę `_gotcha`
przeciw botom.

## SEO

- `title`, `description`, `keywords`, Open Graph i Twitter Card na każdej stronie,
- `canonical` + `hreflang` dla sześciu języków (i `x-default`),
- dane strukturalne JSON-LD: `TravelAgency`, `ContactPage`, `BreadcrumbList`,
  `FAQPage` (generowane z tych samych treści co widoczne pytania), `BlogPosting`,
- `sitemap.xml` z odnośnikami alternatywnych języków, `robots.txt`, manifest PWA.

## Dostępność i wydajność

- Nawigacja klawiaturą, `skip-link`, widoczny focus, `aria-*` na elementach interaktywnych.
- Pełne wsparcie `prefers-reduced-motion` (animacje wyłączają się same).
- Mapa ładuje się dopiero po kliknięciu — żadne dane nie trafiają do zewnętrznego
  serwisu bez zgody użytkownika.
- Zero zależności zewnętrznych poza krojem pisma z Google Fonts (jest fallback systemowy).

## Podgląd lokalny

```bash
cd website
python3 -m http.server 8000
# http://127.0.0.1:8000/index.html
```
