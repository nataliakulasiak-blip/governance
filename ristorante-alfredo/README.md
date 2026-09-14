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

## Il sitemap

```sh
python3 strumenti/sitemap.py
```

Lo rifà dalle pagine che ci sono davvero. Salta da solo quelle con `noindex` — i
codici QR, il menu del giorno, la scheda della divisa: servono alla casa, non a
Google — e prende `lastmod` dalla data dell'ultima modifica **secondo git**, così
dice il vero senza che nessuno se ne debba ricordare. Ogni indirizzo porta gli
hreflang di tutte e sei le lingue.

Da rilanciare quando si aggiunge o si toglie una pagina, e prima di pubblicare.

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

## Il cosmatesco

`images/cosmati-fascia.svg` e `images/cosmati-rosone.svg` (più `-nudo`, senza
cornice, per la filigrana) sono l'ornamento della casa: i marmi geometrici dei
pavimenti romani medievali. Non è una decorazione presa a caso — **Santa Maria
Maggiore, che ha uno dei pavimenti cosmateschi più belli di Roma, sta a trecento
metri da Via Principe Amedeo**, e i colori della casa sono i colori di quei marmi:
porfido rosso, oro, marmo chiaro.

La fascia si ripete in orizzontale senza giunte (tessera da 120×40) e compare:

- sotto la copertina della home, dove il filmato incontra la pagina;
- sopra il piè di pagina, su tutte e trentacinque le pagine (`.pie::before`, quindi
  senza toccare l'HTML);
- sul bordo del foglio del giorno e ai piedi della copertina della carta in PDF.

Il rosone è il **quinconce**: un disco grande e quattro piccoli legati dai nastri, lo
schema che si trova ovunque in quei pavimenti. Si usa in filigrana al 6%, come un
marmo intravisto sotto la tovaglia.

Sono disegni vettoriali: si ingrandiscono quanto si vuole senza perdere un filo, in
stampa come sullo schermo.

## La carta in PDF

Il PDF della carta **non è un file a parte**: è la stampa della pagina stessa, in
qualsiasi lingua. Dal menu si clicca «Stampa la carta», oppure si stampa la pagina
dal browser. Così quando cambiano i prezzi il PDF si rifà senza rifare il lavoro, e
le sei lingue restano allineate da sole.

Esce così: una copertina — nome, slogan «Poche cose, fatte bene», indirizzo — e poi
le facciate della carta. Cinque facciate in tutte e sei le lingue. Il margine di
stampa lo tiene `@page` (16 mm sopra, 18 ai lati, 14 sotto), la copertina fa storia a
sé con `@page copertina { margin: 0 }`, e nessun piatto si spezza fra due facciate.

Per rigenerare i sei file da riga di comando serve un browser senza finestra
(Playwright): si apre ogni `menu.html`, si aspettano i caratteri e si chiede il PDF
in formato A4 con `preferCSSPageSize`.

## I caratteri

Stanno **in casa**, in `css/caratteri/`, richiamati da `css/caratteri.css`. Prima si
prendevano da Google a ogni apertura di pagina. Tenerli qui serve a tre cose: le
pagine si aprono prima, la stampa e i PDF escono con i caratteri giusti anche senza
rete, e non si manda l'indirizzo IP di chi legge a un server terzo — che in Europa,
per un sito con un modulo di prenotazione, è una cosa che conta.

```sh
python3 strumenti/caratteri.py
```

Scarica solo i sottoinsiemi che servono alle sei lingue — latino, latino esteso per
il polacco, cirillico per il russo — e riscrive `css/caratteri.css`. Ventisette file,
640 kB in tutto. Da rilanciare solo se si cambia un carattere o serve un altro peso.

## Il menu del giorno

`menu-del-giorno.html` è un foglio A4 da stampare e mettere sui tavoli. Non è
indicizzato (`noindex`), come la pagina dei QR, e si raggiunge dal piè di pagina.

Si cambiano i piatti direttamente nel file: ogni voce è un blocco `.foglio__piatto`
con nome, prezzo e una riga di ingredienti. **La data non si tocca**: la scrive il
foglio da solo, in italiano, ogni volta che si apre.

Il bottone «Stampa» apre la finestra di stampa del browser. Il foglio è tarato su una
pagina sola: se si aggiungono piatti bisogna toglierne altrettanti, altrimenti va a
capo su una seconda facciata.

Niente fondi pieni di colore: il bordeaux e l'oro stanno nella scritta e nei filetti.
Su carta buona si legge meglio e non si svuota una cartuccia per ogni servizio.

## La divisa di sala

`divisa.html` è la scheda da dare al fornitore: un foglio A4 con i tre capi
disegnati, le tinte con i codici e le note di confezione. Anche questa `noindex`.

I disegni sono **piatti tecnici** vettoriali — `images/divisa-*.svg` — non fotografie
né illustrazioni d'atmosfera: è quello che un confezionista si aspetta di ricevere.
Si ingrandiscono quanto serve senza perdere un filo.

Nella pagina stanno **in linea**, non dentro un `<img>`: un SVG dentro `<img>` è un
documento a parte e non vede i caratteri della pagina, quindi il marchio ricamato
usciva con un corsivo qualunque.

Il nastro cosmatesco del grembiule è lo stesso ornamento del sito: il legame fra il
sito e la sala passa da lì.

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

**La scena dell'aperitivo** ha `images/aperitivo-filmato.*`: spritz, vermouth e le
mura romane. Il video originale finiva con la scritta «The Authentic Taste of Rome»:
tagliata via a 7,9 s, perché su un sito in sei lingue una scritta stampata in una
lingua sola la leggono male le altre cinque — e quella frase il sito la scrive già di
suo, tradotta, come slogan dei rossi.

**Le due scene del vino nella copertina** hanno i loro:
`images/vino-bianco-filmato.*` e `images/vino-rosso-filmato.*`, le due metà del
filmato del vino tagliate a 632 px per non prendere la riga che le divide. Partono
solo quando tocca alla loro scritta (`preload="none"`), si rimettono da capo ogni
volta e si fermano quando escono di scena: la copertina alterna il piatto, il bianco
e il rosso, sette secondi l'uno.

**Il racconto in home** («Una trattoria diventata casa») si apre a metà su
`images/piatti-filmato.{webm,mp4,jpg}`: una sequenza di piatti, uno dopo l'altro. Il
filmato esce dalla colonna del testo e si centra sulla pagina.

Tutti i filmati del sito sono **muti**: l'audio non entra proprio nel file, si
ricodifica con `-an`. Se un generatore lascia la sua stellina in un angolo si toglie
con `delogo`, che ricostruisce quel quadratino dai pixel intorno:

```sh
ffmpeg -i originale.mp4 -an -vf "delogo=x=1128:y=567:w=66:h=66" ... uscita.mp4
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

## Aggiornare tutto

Nell'ordine, che uno dipende dall'altro:

```sh
python3 strumenti/dati.py       # i dati strutturati dalla carta e dalle domande
python3 strumenti/estrai.py     # l'elenco delle frasi, e cosa manca
python3 strumenti/traduci.py    # le cinque cartelle tradotte
python3 strumenti/sitemap.py    # il sitemap, con le date vere
npm run format                  # Prettier su tutto
```

`strumenti/caratteri.py` e `strumenti/genera-qr.py` si lanciano solo quando cambia
qualcosa che li riguarda: non fanno parte del giro normale.

## Sviluppo

Nessuna compilazione. Per una prova locale:

```sh
python3 -m http.server 8000 --directory ristorante-alfredo
```

e aprire <http://localhost:8000>.

Formattazione: `npm run format` (Prettier, configurato nella radice del repository).
