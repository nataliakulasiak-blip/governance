# Tre Mari Travel — gestionale per agenzia di viaggi

Applicazione web trilingue (**italiano · polski · English**) per gestire il catalogo
viaggi e le prenotazioni di un'agenzia. Non richiede installazione né server: è
HTML, CSS e JavaScript senza dipendenze esterne.

## Avvio

Aprire `index.html` con un doppio clic, oppure servire la cartella:

```bash
cd agenzia-viaggi
python3 -m http.server 8000   # poi http://localhost:8000
```

## Funzionalità

- **Catalogo** — 12 pacchetti con filtri per testo, paese, tipo di viaggio e prezzo
  massimo, ordinamento per popolarità, prezzo o durata.
- **Prenotazioni** — form con calcolo del totale in tempo reale (sconto del 30% per
  i bambini), controllo dei posti disponibili, codice pratica automatico, stati
  _in attesa / confermata / annullata_ ed esportazione CSV.
- **Riepilogo** — numero di prenotazioni, viaggiatori, fatturato confermato, valore
  medio e classifica delle destinazioni.
- **Tre lingue** — cambio lingua istantaneo su tutta l'interfaccia, comprese le
  descrizioni dei viaggi. Date, prezzi e plurali seguono la lingua attiva: il
  polacco usa le sue quattro forme plurali tramite `Intl.PluralRules`.
- **Persistenza locale** — prenotazioni e lingua scelta restano in `localStorage`,
  sul dispositivo dell'utente.

## Struttura

| File             | Contenuto                                               |
| ---------------- | ------------------------------------------------------- |
| `index.html`     | struttura della pagina, marcata con `data-i18n`         |
| `css/styles.css` | stili, tema chiaro e scuro automatico                   |
| `js/i18n.js`     | dizionari IT/PL/EN e funzione `t()` con plurali         |
| `js/data.js`     | catalogo viaggi (titoli e descrizioni nelle tre lingue) |
| `js/app.js`      | filtri, prenotazioni, riepilogo, persistenza            |

Per aggiungere una lingua: inserire il dizionario in `js/i18n.js`, aggiungere il
codice a `LANGS`, una `<option>` nel selettore lingua e le traduzioni di
`title`/`desc` in `js/data.js`.

---

## PL — Program dla biura podróży

Trójjęzyczna aplikacja webowa (włoski, polski, angielski) do obsługi katalogu
wycieczek i rezerwacji. Nie wymaga instalacji ani serwera — wystarczy otworzyć
`index.html`.

Funkcje: katalog z filtrami i sortowaniem, formularz rezerwacji z bieżącym
wyliczaniem ceny (30% zniżki dla dzieci) i kontrolą wolnych miejsc, lista
rezerwacji ze statusami i eksportem CSV, podsumowanie sprzedaży. Ceny, daty i
formy liczby mnogiej dostosowują się do wybranego języka; dane zapisywane są w
`localStorage` przeglądarki.

---

## EN — Travel agency manager

A trilingual web app (Italian, Polish, English) for managing a travel catalogue
and its bookings. No installation, no server, no dependencies — just open
`index.html`.

Features: filterable and sortable catalogue, booking form with live pricing (30%
child discount) and seat-availability checks, booking list with statuses and CSV
export, and a sales overview. Prices, dates and plural forms follow the selected
language; data is kept in the browser's `localStorage`.
