# Il cassetto delle foto

Qui dentro vanno le fotografie. **Una per piatto, file separati** — non una tavola
unica con tanti piatti insieme: il sito le monta lui, ognuna al suo posto, e così
ognuna può essere ritagliata, ingrandita e cambiata da sola.

Non serve toccare il codice: basta il nome giusto. All'apertura la pagina cerca ogni
nome e, se lo trova, mette la fotografia; se non lo trova, il posto resta invisibile
e non lascia buchi.

## Quello che c'è già

Le fotografie dentro sono quelle mandate in chat: la sala di giorno e la sera, la
facciata dalla strada, il muro dipinto, l'aperitivo sulle mura al tramonto, i
crostini, le bruschette, i ravioli, la gricia, il ragù, le fettuccine, la cacio e
pepe, la mozzarella e il tiramisù. Più i due poster del vino.

**La sala, la sala della sera, la facciata e il muro dipinto sono fotografie vere
del locale**, mandate dal proprietario. Hanno preso il posto di una `sala.jpg`
d'archivio che non era questo ristorante — ci si leggeva «dal 1919» sull'insegna,
mentre il sito dice dal 1962.

**Mancano ancora**, e il loro posto resta invisibile finché non arrivano:
`carciofi.jpg`, `scoglio.jpg`, `grigliata.jpg`, `gnocchi.jpg`, `cantina.jpg`,
`esquilino.jpg`. Per sostituirne una che c'è già basta caricare un file con lo stesso
nome.

## I nomi

| Nome del file            | Dove appare                          | Taglio     |
| ------------------------ | ------------------------------------ | ---------- |
| `sala.jpg`               | galleria                             | quadrato   |
| `sala-sera.jpg`          | galleria                             | quadrato   |
| `facciata.jpg`           | «Come arrivare» e galleria           | 4:3        |
| `muro-roma.jpg`          | pagina del rione e scheda del diario | panoramica |
| `aperitivo.jpg`          | «L'ora dell'aperitivo»               | 3:2        |
| `cantina.jpg`            | pagina dei vini                      | quadrato   |
| `esquilino.jpg`          | diario e galleria                    | quadrato   |
| `fettuccine-alfredo.jpg` | specialità della home                | quadrato   |
| `cacio-e-pepe.jpg`       | specialità, galleria, diario         | quadrato   |
| `carciofi.jpg`           | specialità, galleria, diario         | quadrato   |
| `crostini.jpg`           | galleria                             | quadrato   |
| `mozzarella.jpg`         | galleria                             | quadrato   |
| `scoglio.jpg`            | galleria                             | quadrato   |
| `ragu.jpg`               | galleria                             | quadrato   |
| `gnocchi.jpg`            | galleria                             | quadrato   |
| `grigliata.jpg`          | galleria                             | quadrato   |
| `tiramisu.jpg`           | galleria                             | quadrato   |

## I due poster del vino

| Nome del file               | Dove appare                                     |
| --------------------------- | ----------------------------------------------- |
| `copertina-vino-bianco.jpg` | copertina, e bottiglia bianca nella pagina vini |
| `copertina-vino-rosso.jpg`  | copertina, e bottiglia rossa nella pagina vini  |

Sono i due poster con «Un sogno di Roma nel tuo calice» e «Il gusto autentico di Roma
nei nostri rossi». **Un file solo serve per tutti e due i posti.** Verticali va bene:
nella copertina il sito centra e ritaglia da solo.

Se si vuole un taglio diverso per la pagina dei vini si aggiungono `vino-casa.jpg` e
`vino-casa-rosso.jpg` (verticali, 4:5), che hanno la precedenza.

## La copertina

Sopra il filmato girano tre scritte. Se ci sono `copertina-vino-bianco.jpg` e
`copertina-vino-rosso.jpg`, ognuna prende il posto del filmato mentre la sua scritta è
in scena. Senza quei file resta il filmato, e le scritte si alternano lo stesso.

Con `copertina.jpg` (e volendo `copertina-2.jpg` fino a `copertina-6.jpg`) la
copertina diventa una sequenza di fotografie: sette secondi l'una, in dissolvenza, con
un lentissimo avvicinamento. Chi ha attivato la riduzione delle animazioni la vede
ferma.

Meglio fotografie che reggano il testo bianco sopra: scure, o con lo spazio libero al
centro. Il sito ci mette comunque una velatura bordeaux.

## Come devono essere

- Una fotografia **per file**, non tavole con più piatti insieme.
- Vanno bene `.jpg`, `.jpeg`, `.webp`, `.png`: il sito prova in quest'ordine.
- Sotto i 400 kB l'una (la copertina fino a 800 kB), altrimenti sul telefono la
  pagina si apre lenta.
- Lato lungo 1600 px basta e avanza; 2000 px per la copertina.
- **Niente scritte dentro la fotografia**: i nomi dei piatti li scrive già il sito, in
  ogni lingua. Una scritta nell'immagine resta in una lingua sola e non si può
  correggere.

## Come caricarle da GitHub

Aprire questa cartella, **Add file → Upload files**, trascinare le fotografie con i
nomi giusti e confermare con **Commit changes**.
