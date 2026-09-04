# Urania Travel — strona kontaktowa

Statyczna, wielojęzyczna strona biura podróży. Bez frameworków, bez kroku budowania —
wystarczy wgrać katalog na dowolny hosting (Netlify, Vercel, GitHub Pages, zwykły FTP).

## Struktura

```
website/
├── index.html                      strona główna (hero, kanały kontaktu, oferta, blog, CTA)
├── kontakt.html                    pełna strona kontaktowa (kanały, godziny, dane firmy, formularz, mapa, FAQ)
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

## Dane do podmiany przed publikacją

Wszystkie poniższe wartości są **przykładowe** — oryginalna strona uraniatravel.pl
nie była osiągalna z tego środowiska, więc dane trzeba wpisać ręcznie.
Najszybciej: `grep -rn "<szukana wartość>" .`

| Co | Wartość przykładowa | Gdzie |
|---|---|---|
| Telefon biura | `+48 22 123 45 67` / `tel:+48221234567` | wszystkie pliki HTML |
| Telefon alarmowy / WhatsApp | `+48 600 100 200` / `wa.me/48600100200` | wszystkie pliki HTML |
| E-mail | `kontakt@uraniatravel.pl` | HTML + `assets/js/main.js` |
| Telegram | `t.me/uraniatravel` | HTML |
| Facebook / Instagram | `/uraniatravel` | HTML |
| Adres | `ul. Podróżnicza 12/3, 00-001 Warszawa` | `kontakt.html`, stopka, JSON-LD |
| Współrzędne mapy | `52.2310, 21.0150` | `kontakt.html` (`data-map-src`, link „Wyznacz trasę"), JSON-LD |
| NIP / REGON / nr rejestru / konto | zera | `kontakt.html`, stopka, JSON-LD |
| Domena | `https://uraniatravel.pl` | `canonical`, `hreflang`, OG, `sitemap.xml`, `robots.txt`, JSON-LD |
| Godziny otwarcia | Pn–Pt 9–18, Sb 10–14 | `kontakt.html` (`data-open` / `data-close`), stopka, JSON-LD |

Do katalogu `assets/img/` trzeba dodać: `og-cover.jpg` (1200×630), `logo.png`,
`icon-192.png`, `icon-512.png`.

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
