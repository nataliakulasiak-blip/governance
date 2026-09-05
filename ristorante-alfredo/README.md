# Ristorante Alfredo — sito web

Sito statico (HTML, CSS, JavaScript, senza dipendenze) per il **Ristorante Alfredo**,
Via Principe Amedeo 126 — 00185 Roma, rione Esquilino.

## Stile

Ispirato alle vetrine dei ristoranti di tradizione: copertina a tutto schermo,
titoli in serif, accenti in corsivo inglese, molto spazio bianco.

| Colore         | Uso                                | Valore    |
| -------------- | ---------------------------------- | --------- |
| Sabbia chiara  | fondo principale                   | `#f7efe2` |
| Sabbia         | sezioni alternate                  | `#eadfc8` |
| Bordeaux       | sezioni scure, intestazione, testi | `#5a1622` |
| Bordeaux scuro | piè di pagina, copertina           | `#3d0e17` |
| Rosso          | accenti, prezzi, sopratitoli       | `#a32a2a` |
| Oro            | filetti, fregi, cornici            | `#b8914f` |

Caratteri: _Cormorant Garamond_ (titoli), _Jost_ (testo), _Pinyon Script_ (corsivo).

## Pagine

| File                        | Contenuto                                                             |
| --------------------------- | --------------------------------------------------------------------- |
| `index.html`                | copertina, storia, valori, specialità, galleria, prenotazione, diario |
| `menu.html`                 | la carta completa con prezzi (dati strutturati `Menu`)                |
| `faq.html`                  | domande frequenti (dati strutturati `FAQPage`)                        |
| `diario.html`               | indice del blog (dati strutturati `Blog`)                             |
| `diario-*.html`             | tre articoli (dati strutturati `BlogPosting`)                         |
| `robots.txt`, `sitemap.xml` | indicizzazione                                                        |

## Codici QR

Generati in locale con [segno](https://pypi.org/project/segno/), nessun servizio
esterno: `pip install segno && python3 strumenti/genera-qr.py`. I file finiscono in
`images/qr-*.svg` (vettoriali, nitidi a qualsiasi dimensione).

| Codice              | Contenuto                                                            |
| ------------------- | -------------------------------------------------------------------- |
| `qr-menu.svg`       | l'indirizzo di `menu.html`                                           |
| `qr-wifi.svg`       | `WIFI:T:WPA;S:Alfredo-Ospiti;P:…;;` — il telefono si collega da solo |
| `qr-recensione.svg` | il modulo di recensione Google della scheda del ristorante           |

Le costanti da cambiare (indirizzo del menu, SSID e password del Wi-Fi, Place ID di
Google) sono in cima a `strumenti/genera-qr.py`; dopo la modifica si rilancia lo
script. **Il Place ID è un segnaposto**: finché non viene sostituito, il codice della
recensione non porta a nessuna scheda. Si ricava dalla
[documentazione Google Places](https://developers.google.com/maps/documentation/places/web-service/place-id).

La pagina `qr.html` stampa una scheda per pagina (Ctrl+P / Cmd+P), senza intestazione
né piè di pagina.

## Mappa

La sezione «Dove siamo» della home incorpora la mappa di OpenStreetMap (nessuna chiave
API, nessun cookie). Dietro l'iframe c'è un riquadro di riserva con l'indirizzo, che
resta visibile se la mappa non può caricarsi. **Le coordinate `41.8955, 12.5040` sono
approssimative**: vanno verificate sul posto e aggiornate in tre punti — l'`src`
dell'iframe e i due collegamenti in `index.html`, e il campo `geo` dei dati strutturati.

## Le fotografie

Le immagini in `images/` sono illustrazioni vettoriali provvisorie. Per sostituirle con
fotografie **non serve modificare il codice**: si caricano i file in `images/foto/` con
i nomi indicati in [`images/foto/LEGGIMI.md`](images/foto/LEGGIMI.md) e il sito, in
apertura, cerca ogni nome e usa la fotografia se la trova (prova `.jpg`, `.jpeg`,
`.webp`, `.png`, in quest'ordine). Se il file non c'è, resta il disegno: nessuna
immagine rotta.

Nel markup ogni illustrazione dichiara il proprio posto con `data-foto="nome"`; la
copertina usa la variabile CSS `--copertina-foto` e, quando la foto c'è, passa a colori
pieni con una velatura piu' decisa perché il testo resti leggibile.

## Prenotazioni

- **WhatsApp** — il modulo di `index.html` non invia nulla a un server: compone il
  messaggio e apre `wa.me` con il testo già pronto. Nessun dato viene salvato.
- **Telegram** e **Instagram** — collegamenti diretti al profilo.
- Pulsante WhatsApp flottante presente su tutte le pagine.

## Da personalizzare prima della pubblicazione

I dati di contatto sono segnaposto realistici: vanno sostituiti con quelli veri.

1. Numero di telefono `+39 06 4470 1234` → cercare `0644701234` in tutti i file
   (`.html`) e `WHATSAPP` in `js/main.js`.
2. Profili social `ristorantealfredoroma` (Instagram, Telegram).
3. Dominio `https://www.ristorantealfredoroma.it` nei tag `canonical`, Open Graph,
   `sitemap.xml` e `robots.txt`.
4. Partita IVA nel piè di pagina.
5. Dati dei codici QR e coordinate della mappa (vedi le due sezioni qui sopra).
6. **La foto dell'aperitivo**: la sezione «L'ora dell'aperitivo» della home usa
   `images/aperitivo.svg`, un'illustrazione provvisoria. Con una fotografia basta
   salvarla come `images/aperitivo.jpg` e cambiare `src`, `width` e `height`
   dell'immagine in `index.html` (taglio consigliato 3:2, 1600 px di lato lungo).
7. **Immagini**: le illustrazioni in `images/` sono vettoriali provvisorie. Sostituirle
   con fotografie reali (stesso nome file, oppure aggiornando `src` e
   `background-image` in `css/style.css` per `sala.svg`). Formato consigliato: JPEG o
   WebP, 1600 px di lato lungo per la galleria, 2000 px per la copertina.

## Sviluppo

Nessuna compilazione. Per una prova locale:

```sh
python3 -m http.server 8000 --directory ristorante-alfredo
```

e aprire <http://localhost:8000>.

Formattazione: `npm run format` (Prettier, configurato nella radice del repository).
