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
5. **Immagini**: le illustrazioni in `images/` sono vettoriali provvisorie. Sostituirle
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
