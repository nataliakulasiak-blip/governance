# Tre Mari Travel — gestionale per agenzia di viaggi

Applicazione web trilingue (**italiano · polski · English**) che segue il viaggio
dall'inizio alla fine: si costruisce il pacchetto con i costi dei fornitori, lo si
vende (anche in last minute per gruppi fino a 25 persone) e i conti dell'agenzia
si scrivono da soli. Non richiede installazione né server: HTML, CSS e JavaScript
senza dipendenze esterne.

## Avvio

Aprire `index.html` con un doppio clic, oppure servire la cartella:

```bash
cd agenzia-viaggi
python3 -m http.server 8000   # poi http://localhost:8000
```

Per ottenere un unico file HTML da inviare o pubblicare online:

```bash
python3 build.py   # crea dist/tre-mari-travel.html
```

## I tre moduli

### 1. Pacchetti — il viaggio prima di venderlo

Ogni pacchetto ha la sua scheda di costo: hotel, trasporto, guida, ingressi,
pasti, assicurazione, con importo **a persona, a persona per notte, a gruppo o a
gruppo per notte**. Da lì il programma ricava da solo:

- costi fissi del gruppo e costo variabile a persona;
- costo a persona ai partecipanti previsti;
- prezzo suggerito applicando il ricarico scelto;
- margine a persona e **punto di pareggio** (quanti partecipanti servono).

Il prezzo di listino resta un campo libero: il suggerimento si applica con un
clic, ma l'ultima parola è dell'operatore. Finché non ha almeno una data, il
pacchetto resta in bozza e non compare in catalogo.

### 2. Partenze e last minute — gruppi fino a 25 persone

Ogni partenza ha la sua scheda con posti venduti, ricavi, costi, margine e stato
del pareggio. Da lì nasce la proposta last minute:

- si apre nei 30 giorni prima della partenza e sconta 10%, 20% o 30% mano a mano
  che la data si avvicina;
- non scende mai sotto il **pavimento**: il costo del posto in più maggiorato del
  10%, cioè il punto oltre il quale una prenotazione in più fa perdere soldi;
- spiega la situazione in una riga (costi coperti, sotto il pareggio, completo).

Il prezzo si può sovrascrivere a mano: se è sotto il pavimento il programma lo
accetta e avvisa, non lo blocca. Il prezzo attivo vale subito in catalogo e nel
modulo di prenotazione.

### 3. Contabilità — i conti si scrivono da soli

I movimenti non si inseriscono a mano: nascono dai dati.

- Da ogni prenotazione: **acconto** del 30% alla firma e **saldo** trenta giorni
  prima della partenza.
- Da ogni partenza venduta: i **pagamenti ai fornitori** calcolati sui
  partecipanti effettivi, con scadenza quindici giorni prima.
- A mano si aggiunge solo ciò che non nasce da un viaggio: affitto, stipendi,
  pubblicità.

Ogni voce si segna incassata o pagata (e si riapre se serve). In cima: incassato,
da incassare, pagato, da pagare, cassa e saldo previsto; le scadenze superate
sono marcate. Esportazione CSV di prenotazioni e movimenti.

## Il resto

- **Catalogo** — filtri per testo, paese, tipo e prezzo, con il prezzo last minute
  in evidenza sulle partenze scontate.
- **Prenotazioni** — totale in tempo reale (sconto del 30% per i bambini),
  controllo dei posti, codice pratica automatico, stati e CSV.
- **Riepilogo** — ricavi, costi, margine lordo e percentuale, margine per
  destinazione e prossime partenze.
- **Tre lingue** — cambio istantaneo su tutta l'interfaccia. Date, valute e
  plurali seguono la lingua: il polacco usa le sue quattro forme plurali.
- **Dati locali** — tutto resta in `localStorage`, sul dispositivo dell'utente.

## Struttura

| File             | Contenuto                                                |
| ---------------- | -------------------------------------------------------- |
| `index.html`     | struttura delle sei viste e delle tre finestre di lavoro |
| `css/styles.css` | stili, tema chiaro e scuro automatico                    |
| `js/i18n.js`     | dizionario unico con le tre lingue affiancate            |
| `js/data.js`     | catalogo iniziale e schede di costo dimostrative         |
| `js/model.js`    | dati e calcoli: costi, pareggio, last minute, movimenti  |
| `js/ui.js`       | formati, notifiche, CSV                                  |
| `js/views.js`    | disegno delle sei viste                                  |
| `js/editors.js`  | finestre di prenotazione, pacchetto e movimento          |
| `js/app.js`      | avvio, navigazione, comandi                              |
| `build.py`       | versione a file singolo in `dist/`                       |

Per aggiungere una lingua: aggiungere il codice a `LANGS` e la relativa voce in
ogni chiave di `STRINGS` (`js/i18n.js`), più un'`<option>` nel selettore.

---

## PL — Program dla biura podróży

Trójjęzyczna aplikacja webowa prowadząca wyjazd od początku do końca. Trzy
moduły:

1. **Oferty** — karta kosztów (hotel, transport, przewodnik, bilety, wyżywienie,
   ubezpieczenie) w przeliczeniu na osobę, osobonoc, grupę lub gruponoc. Program
   sam liczy koszty stałe i zmienne, koszt na osobę, cenę sugerowaną według
   marży, marżę i **próg rentowności**. Cena katalogowa pozostaje decyzją
   operatora.
2. **Wyjazdy i last minute** — dla grup do 25 osób: sprzedane miejsca, przychód,
   koszty, marża i status progu. Propozycja last minute otwiera się na 30 dni
   przed terminem (rabat 10/20/30%) i nigdy nie schodzi poniżej kosztu
   dodatkowego miejsca powiększonego o 10%. Własną cenę można wpisać ręcznie —
   poniżej progu program ostrzega, ale jej nie blokuje.
3. **Księgowość** — operacje powstają same: zaliczka 30% przy rezerwacji, dopłata
   30 dni przed wyjazdem, płatności dla dostawców 15 dni przed wyjazdem, liczone
   według rzeczywistej liczby osób. Ręcznie dodaje się tylko czynsz, wypłaty czy
   reklamę. Podsumowanie: wpłacone, do wpłaty, zapłacone, do zapłaty, kasa i
   saldo planowane; eksport CSV.

Dane zapisywane są w `localStorage` przeglądarki.

---

## EN — Travel agency manager

A trilingual web app that follows a trip end to end, in three modules:

1. **Packages** — a cost sheet per trip (hotel, transport, guide, entrance fees,
   meals, insurance) priced per person, per person-night, per group or per
   group-night. The program derives fixed and variable costs, cost per person,
   a suggested price from your mark-up, the margin and the **break-even** count.
   The list price stays yours to set.
2. **Departures and last minute** — for groups of up to 25: seats sold, revenue,
   costs, margin and break-even status. The last-minute offer opens 30 days out
   (10/20/30% off) and never drops below the cost of one more seat plus 10%. Type
   your own price and the program warns below that floor instead of blocking it.
3. **Accounts** — entries write themselves: a 30% deposit at booking, the balance
   30 days before departure, supplier payments 15 days before departure based on
   actual head count. You only add by hand what no trip generates — rent, wages,
   advertising. Totals for collected, to collect, paid, to pay, cash and expected
   balance, with CSV export.

Data stays in the browser's `localStorage`.
