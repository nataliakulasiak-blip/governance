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
| `en/ fr/ es/ ru/ pl/`       | le stesse pagine tradotte (generate, non si modificano a mano)        |

## I dati strutturati

Prezzi, piatti e domande si scrivono **una volta sola**, nella pagina. I blocchi
JSON-LD che Google legge si rigenerano da lì:

```sh
python3 strumenti/dati.py
```

Rilegge `menu.html` e `faq.html` e riscrive i blocchi `Menu` e `FAQPage`. Non è solo
ordine: Google chiede che domanda e risposta dei dati strutturati siano _le stesse_
che il lettore vede in pagina, altrimenti la scheda non compare. Da rilanciare dopo
ogni cambio di prezzi, piatti o domande — e poi `strumenti/traduci.py`, perché anche
i dati strutturati delle pagine tradotte seguono la lingua.

## Le lingue

Il sito è in italiano, inglese, francese, spagnolo, russo e polacco. L'italiano è
la sorgente: si modifica solo quello, poi si rigenera il resto.

```sh
python3 strumenti/estrai.py    # rifà l'elenco delle frasi e dice cosa manca
python3 strumenti/traduci.py   # riscrive en/ fr/ es/ ru/ pl/
npx prettier@3 --write "en/*.html" "fr/*.html" "es/*.html" "ru/*.html" "pl/*.html"
```

Il comando legge le cinque pagine italiane (`index`, `menu`, `vini`, `faq`,
`diario`), sostituisce le frasi con quelle dei dizionari e riscrive le cartelle
`en/ fr/ es/ ru/ pl/`. È ripetibile: rilanciarlo due volte dà lo stesso risultato.

I dizionari stanno in `strumenti/lingue/`:

- `frasi.json` — l'elenco delle frasi italiane. Lo riscrive `estrai.py`.
- `en.json`, `fr.json`, `es.json`, `ru.json`, `pl.json` — la traduzione, con per
  chiave **la frase italiana stessa**.

La chiave è il testo, non la posizione: cambiare una frase italiana non scombina il
resto, rende solo orfana quella voce. `estrai.py` le elenca — le frasi senza
traduzione da aggiungere e le traduzioni orfane da rifare.

Una frase senza traduzione resta in italiano, ed è voluto: **i nomi dei piatti e
dei vini non si traducono**. «Cacio e pepe» e «Carciofi alla giudia» restano
com'è giusto che siano, la descrizione sotto è nella lingua del lettore.

Se una traduzione deve attaccarsi alla parola accanto (per esempio in
`L'ora dell'<em>aperitivo</em>`), si lascia lo spazio dentro il valore del
dizionario: il generatore lo riporta tale e quale.

Gli articoli del diario restano solo in italiano; nelle pagine tradotte i loro
collegamenti portano `hreflang="it"`, così il lettore lo sa prima di cliccare.

Ogni pagina porta i `<link rel="alternate" hreflang>` per tutte e sei le lingue
più `x-default` sull'italiano, e le stesse alternative sono nel `sitemap.xml`.

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

## I due filmati

La copertina mostra un filmato muto in anello: `images/copertina-filmato.webm` (per
Chrome e Firefox) e `images/copertina-filmato.mp4` (per Safari), con
`images/copertina-filmato.jpg` come fotogramma di posa — si vede finché il video non
parte e resta l'unica immagine se il browser blocca la riproduzione automatica o se
l'utente ha chiesto meno animazioni.

Il montaggio parte dal video originale dei due piatti e tiene solo gli spezzoni senza
persone (10,2–14,8 s e 18–20 s), uniti in dissolvenza e poi ripetuti al contrario, così
il giro non ha stacchi. Da lì si taglia la **metà sinistra** — il video sorgente è uno
schermo diviso, pomodoro a sinistra e cacio e pepe a destra — fermandosi a 632 px per
non prendere la riga chiara che divide i due piatti.

**Il racconto in home** («Una trattoria diventata casa») si apre a metà su
`images/sala-filmato.{webm,mp4,jpg}`: il piatto, poi il brindisi in sala. Il filmato
esce dalla colonna del testo e si centra sulla pagina. La stellina che il generatore
lascia in basso a destra è tolta con il filtro `delogo` di ffmpeg, che ricostruisce
quel quadratino dai pixel intorno:

```sh
ffmpeg -i originale.mp4 -vf "delogo=x=1128:y=567:w=66:h=66" -an ... sala-filmato.mp4
```

**La pagina dei vini** ha il suo: `images/vino-filmato.{webm,mp4,jpg}`, il bianco e il
rosso versati nei calici. Il sorgente porta stampate sopra le due scritte «Un sogno di
Roma nel tuo calice» e «Il gusto autentico di Roma nei nostri rossi»: sono tagliate
via (si parte da 150 px dall'alto) perché quelle frasi le scrive già la pagina, in
tutte e sei le lingue, mentre una scritta dentro al video resterebbe in italiano.

Per sostituirlo bastano tre file con gli stessi nomi. Per toglierlo: eliminare il
blocco `<video class="copertina__filmato">` da `index.html` e la classe
`copertina--filmato` dalla sezione — la copertina torna all'illustrazione (o alle
fotografie, se ci sono).

## Le fotografie

Le sezioni dei piatti (specialità, galleria, diario) **non hanno disegni di ripiego**:
il posto della fotografia resta invisibile finché il file non c'è. Restano illustrate
solo le scene — la sala, la cantina, l'aperitivo, le bottiglie — che si sostituiscono
allo stesso modo. Per mettere le fotografie **non serve modificare il codice**: si caricano i file in `images/foto/` con
i nomi indicati in [`images/foto/LEGGIMI.md`](images/foto/LEGGIMI.md) e il sito, in
apertura, cerca ogni nome e usa la fotografia se la trova (prova `.jpg`, `.jpeg`,
`.webp`, `.png`, in quest'ordine). Se il file non c'è, resta il disegno: nessuna
immagine rotta.

Nel markup ogni illustrazione dichiara il proprio posto con `data-foto="nome"`. La
copertina è un caso a parte: cerca `copertina.jpg`, `copertina-2.jpg` … fino a
`copertina-6.jpg` e, se ne trova più di una, le fa **girare** in dissolvenza (sette
secondi ciascuna, con un lento avvicinamento dell'inquadratura che si ferma se il
sistema chiede meno animazioni). Con le foto la copertina passa a colori pieni e a una
velatura più decisa, perché il testo resti leggibile.

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
7. **Le traduzioni**: sono di lavoro, rilette ma non da un madrelingua. Prima di
   pubblicare conviene farle guardare a chi la lingua ce l'ha in casa —
   soprattutto russo e polacco, dove il tono conta più della parola.
8. **Immagini**: le illustrazioni in `images/` sono vettoriali provvisorie. Sostituirle
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
