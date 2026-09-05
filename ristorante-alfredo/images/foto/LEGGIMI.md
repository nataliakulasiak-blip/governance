# Il cassetto delle foto

Le immagini che si vedono ora sul sito sono **illustrazioni vettoriali provvisorie**.
Per sostituirle con fotografie vere non serve toccare il codice: basta caricare qui
dentro i file con i nomi esatti dell'elenco. Il sito, all'apertura, cerca ogni nome e
usa la fotografia se la trova; altrimenti resta il disegno.

| Nome del file      | Dove appare                                         | Taglio consigliato |
| ------------------ | --------------------------------------------------- | ------------------ |
| `copertina.jpg`    | sfondo della copertina e foto grande della galleria | 16:9, 2000 px      |
| `sala.jpg`         | sezione «Una trattoria diventata casa» e galleria   | verticale 3:4      |
| `aperitivo.jpg`    | sezione «L'ora dell'aperitivo»                      | 3:2, 1600 px       |
| `cacio-e-pepe.jpg` | specialità e galleria                               | quadrato           |
| `carbonara.jpg`    | specialità                                          | quadrato           |
| `carciofi.jpg`     | specialità e galleria                               | quadrato           |
| `dolce.jpg`        | galleria                                            | quadrato           |
| `cantina.jpg`      | galleria                                            | quadrato           |

## La copertina gira

Se oltre a `copertina.jpg` ci sono anche `copertina-2.jpg`, `copertina-3.jpg` e così
via (fino a `copertina-6.jpg`), la copertina le fa scorrere una dopo l'altra: ognuna
resta sette secondi e passa alla successiva in dissolvenza, con un lentissimo
avvicinamento dell'inquadratura. Con una sola foto resta ferma. Chi ha attivato la
riduzione delle animazioni vede l'immagine ferma, senza movimento.

Scegliere fotografie che reggano il testo bianco sopra: meglio scure o con lo spazio
libero al centro. Il sito ci mette comunque una velatura bordeaux.

Vanno bene anche `.jpeg`, `.webp` e `.png`: il sito prova le estensioni in
quest'ordine. Tenere i file sotto i 400 kB l'uno (per la copertina fino a 800 kB),
altrimenti la pagina si apre lenta sul telefono.

Come caricarle da GitHub: aprire questa cartella, **Add file → Upload files**,
trascinare le fotografie con i nomi giusti e confermare con **Commit changes**.
