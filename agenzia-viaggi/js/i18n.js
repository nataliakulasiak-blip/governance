/**
 * Dizionario unico: ogni chiave porta le tre lingue affiancate, così una
 * traduzione mancante si vede subito. Le stringhe con conteggio indicano le
 * forme plurali della lingua (il polacco ne ha quattro).
 */
const LANGS = ["it", "pl", "en"];
const LOCALES = { it: "it-IT", pl: "pl-PL", en: "en-GB" };

const STRINGS = {
  /* --------------------------------------------------------- generali */
  "app.tagline": {
    it: "Agenzia viaggi — pacchetti, prenotazioni e contabilità",
    pl: "Biuro podróży — oferty, rezerwacje i księgowość",
    en: "Travel agency — packages, bookings and accounts",
  },
  "app.language": { it: "Lingua", pl: "Język", en: "Language" },
  "app.footer": {
    it: "Tre Mari Travel — dati salvati solo su questo dispositivo.",
    pl: "Tre Mari Travel — dane zapisywane wyłącznie na tym urządzeniu.",
    en: "Tre Mari Travel — data is stored on this device only.",
  },

  "nav.catalog": { it: "Catalogo", pl: "Katalog", en: "Catalogue" },
  "nav.packages": { it: "Pacchetti", pl: "Oferty", en: "Packages" },
  "nav.departures": { it: "Partenze", pl: "Wyjazdy", en: "Departures" },
  "nav.bookings": { it: "Prenotazioni", pl: "Rezerwacje", en: "Bookings" },
  "nav.accounting": { it: "Contabilità", pl: "Księgowość", en: "Accounts" },
  "nav.dashboard": { it: "Riepilogo", pl: "Podsumowanie", en: "Overview" },

  "common.save": { it: "Salva", pl: "Zapisz", en: "Save" },
  "common.cancel": { it: "Annulla", pl: "Anuluj", en: "Cancel" },
  "common.delete": { it: "Elimina", pl: "Usuń", en: "Delete" },
  "common.edit": { it: "Modifica", pl: "Edytuj", en: "Edit" },
  "common.duplicate": { it: "Duplica", pl: "Duplikuj", en: "Duplicate" },
  "common.add": { it: "Aggiungi", pl: "Dodaj", en: "Add" },
  "common.all": { it: "Tutti", pl: "Wszystkie", en: "All" },
  "common.none": { it: "—", pl: "—", en: "—" },
  "common.export": { it: "Esporta CSV", pl: "Eksport CSV", en: "Export CSV" },
  "common.perPerson": { it: "a persona", pl: "za osobę", en: "per person" },
  "common.total": { it: "Totale", pl: "Razem", en: "Total" },

  /* ---------------------------------------------------------- catalogo */
  "filters.search": { it: "Cerca", pl: "Szukaj", en: "Search" },
  "filters.searchPlaceholder": {
    it: "Destinazione, città, parola chiave…",
    pl: "Kierunek, miasto, słowo kluczowe…",
    en: "Destination, city, keyword…",
  },
  "filters.country": { it: "Paese", pl: "Kraj", en: "Country" },
  "filters.category": {
    it: "Tipo di viaggio",
    pl: "Rodzaj wyjazdu",
    en: "Trip type",
  },
  "filters.maxPrice": {
    it: "Prezzo massimo",
    pl: "Cena maksymalna",
    en: "Maximum price",
  },
  "filters.sort": { it: "Ordina per", pl: "Sortuj według", en: "Sort by" },
  "filters.sortPopular": {
    it: "Più popolari",
    pl: "Najpopularniejsze",
    en: "Most popular",
  },
  "filters.sortPriceAsc": {
    it: "Prezzo crescente",
    pl: "Cena rosnąco",
    en: "Price, low to high",
  },
  "filters.sortPriceDesc": {
    it: "Prezzo decrescente",
    pl: "Cena malejąco",
    en: "Price, high to low",
  },
  "filters.sortDuration": { it: "Durata", pl: "Czas trwania", en: "Duration" },
  "filters.reset": {
    it: "Azzera filtri",
    pl: "Wyczyść filtry",
    en: "Clear filters",
  },
  "filters.allCountries": {
    it: "Tutti i paesi",
    pl: "Wszystkie kraje",
    en: "All countries",
  },
  "filters.allCategories": {
    it: "Tutti i tipi",
    pl: "Wszystkie rodzaje",
    en: "All types",
  },

  "catalog.empty": {
    it: "Nessun viaggio corrisponde ai filtri selezionati.",
    pl: "Żadna oferta nie pasuje do wybranych filtrów.",
    en: "No trip matches the selected filters.",
  },
  "catalog.results": {
    it: { one: "{n} viaggio disponibile", other: "{n} viaggi disponibili" },
    pl: {
      one: "{n} dostępna oferta",
      few: "{n} dostępne oferty",
      many: "{n} dostępnych ofert",
      other: "{n} dostępnych ofert",
    },
    en: { one: "{n} trip available", other: "{n} trips available" },
  },
  "catalog.nights": {
    it: { one: "{n} notte", other: "{n} notti" },
    pl: {
      one: "{n} noc",
      few: "{n} noce",
      many: "{n} nocy",
      other: "{n} nocy",
    },
    en: { one: "{n} night", other: "{n} nights" },
  },
  "catalog.book": { it: "Prenota", pl: "Rezerwuj", en: "Book" },
  "catalog.seats": {
    it: { one: "{n} posto libero", other: "{n} posti liberi" },
    pl: {
      one: "{n} wolne miejsce",
      few: "{n} wolne miejsca",
      many: "{n} wolnych miejsc",
      other: "{n} wolnych miejsc",
    },
    en: { one: "{n} seat left", other: "{n} seats left" },
  },
  "catalog.soldOut": { it: "Esaurito", pl: "Brak miejsc", en: "Sold out" },
  "catalog.nextDeparture": {
    it: "Prossima partenza",
    pl: "Najbliższy wylot",
    en: "Next departure",
  },

  /* --------------------------------------------------------- categorie */
  "cat.sea": { it: "Mare", pl: "Morze", en: "Beach" },
  "cat.city": { it: "Città d’arte", pl: "Miasta i kultura", en: "City break" },
  "cat.mountain": { it: "Montagna", pl: "Góry", en: "Mountains" },
  "cat.adventure": { it: "Avventura", pl: "Przygoda", en: "Adventure" },
  "cat.cruise": { it: "Crociera", pl: "Rejs", en: "Cruise" },
  "cat.wellness": { it: "Benessere", pl: "Wellness", en: "Wellness" },

  "country.IT": { it: "Italia", pl: "Włochy", en: "Italy" },
  "country.PL": { it: "Polonia", pl: "Polska", en: "Poland" },
  "country.ES": { it: "Spagna", pl: "Hiszpania", en: "Spain" },
  "country.GR": { it: "Grecia", pl: "Grecja", en: "Greece" },
  "country.PT": { it: "Portogallo", pl: "Portugalia", en: "Portugal" },
  "country.MA": { it: "Marocco", pl: "Maroko", en: "Morocco" },
  "country.IS": { it: "Islanda", pl: "Islandia", en: "Iceland" },
  "country.JP": { it: "Giappone", pl: "Japonia", en: "Japan" },
  "country.NO": { it: "Norvegia", pl: "Norwegia", en: "Norway" },
  "country.HR": { it: "Croazia", pl: "Chorwacja", en: "Croatia" },

  /* ------------------------------------------------------ prenotazioni */
  "form.name": { it: "Nome e cognome", pl: "Imię i nazwisko", en: "Full name" },
  "form.email": { it: "Email", pl: "E-mail", en: "Email" },
  "form.phone": { it: "Telefono", pl: "Telefon", en: "Phone" },
  "form.departure": { it: "Partenza", pl: "Termin wyjazdu", en: "Departure" },
  "form.adults": { it: "Adulti", pl: "Dorośli", en: "Adults" },
  "form.children": {
    it: "Bambini (0-11)",
    pl: "Dzieci (0-11)",
    en: "Children (0-11)",
  },
  "form.notes": { it: "Note", pl: "Uwagi", en: "Notes" },
  "form.submit": {
    it: "Conferma prenotazione",
    pl: "Potwierdź rezerwację",
    en: "Confirm booking",
  },
  "form.priceAdults": {
    it: "{n} × adulti",
    pl: "{n} × dorośli",
    en: "{n} × adults",
  },
  "form.priceChildren": {
    it: "{n} × bambini (-30%)",
    pl: "{n} × dzieci (-30%)",
    en: "{n} × children (-30%)",
  },
  "form.errSeats": {
    it: "Posti insufficienti per questa partenza.",
    pl: "Za mało wolnych miejsc w tym terminie.",
    en: "Not enough seats left on this departure.",
  },
  "form.errTravelers": {
    it: "Inserisci almeno un viaggiatore.",
    pl: "Podaj co najmniej jednego podróżnego.",
    en: "Add at least one traveller.",
  },
  "form.lastMinuteApplied": {
    it: "Prezzo last minute applicato",
    pl: "Zastosowano cenę last minute",
    en: "Last-minute price applied",
  },

  "bookings.filterStatus": { it: "Stato", pl: "Status", en: "Status" },
  "bookings.ref": { it: "Codice", pl: "Numer", en: "Reference" },
  "bookings.client": { it: "Cliente", pl: "Klient", en: "Client" },
  "bookings.trip": { it: "Viaggio", pl: "Wyjazd", en: "Trip" },
  "bookings.travelers": { it: "Viaggiatori", pl: "Podróżni", en: "Travellers" },
  "bookings.actions": { it: "Azioni", pl: "Akcje", en: "Actions" },
  "bookings.empty": {
    it: "Nessuna prenotazione registrata.",
    pl: "Brak zapisanych rezerwacji.",
    en: "No bookings recorded yet.",
  },
  "bookings.clearAll": {
    it: "Elimina tutte",
    pl: "Usuń wszystkie",
    en: "Delete all",
  },
  "bookings.confirm": { it: "Conferma", pl: "Potwierdź", en: "Confirm" },
  "bookings.askDelete": {
    it: "Eliminare definitivamente la prenotazione {ref}?",
    pl: "Trwale usunąć rezerwację {ref}?",
    en: "Permanently delete booking {ref}?",
  },
  "bookings.askClear": {
    it: "Eliminare tutte le prenotazioni? L’operazione non è reversibile.",
    pl: "Usunąć wszystkie rezerwacje? Tej operacji nie można cofnąć.",
    en: "Delete every booking? This cannot be undone.",
  },

  "status.pending": { it: "In attesa", pl: "Oczekująca", en: "Pending" },
  "status.confirmed": { it: "Confermata", pl: "Potwierdzona", en: "Confirmed" },
  "status.cancelled": { it: "Annullata", pl: "Anulowana", en: "Cancelled" },

  /* ----------------------------------------------- costruttore pacchetti */
  "pkg.new": { it: "Nuovo pacchetto", pl: "Nowa oferta", en: "New package" },
  "pkg.editTitle": {
    it: "Scheda pacchetto",
    pl: "Karta oferty",
    en: "Package sheet",
  },
  "pkg.empty": {
    it: "Nessun pacchetto. Creane uno per iniziare.",
    pl: "Brak ofert. Utwórz pierwszą.",
    en: "No packages yet. Create one to start.",
  },
  "pkg.name": { it: "Nome del viaggio", pl: "Nazwa wyjazdu", en: "Trip name" },
  "pkg.description": { it: "Descrizione", pl: "Opis", en: "Description" },
  "pkg.otherLangs": {
    it: "Traduzioni (facoltative)",
    pl: "Tłumaczenia (opcjonalne)",
    en: "Translations (optional)",
  },
  "pkg.nights": { it: "Notti", pl: "Noclegi", en: "Nights" },
  "pkg.groupSize": {
    it: "Gruppo massimo",
    pl: "Maksymalna grupa",
    en: "Maximum group",
  },
  "pkg.groupHint": {
    it: "Posti per partenza, di norma 25 per i gruppi.",
    pl: "Miejsca na wyjazd, zwykle 25 dla grup.",
    en: "Seats per departure, usually 25 for groups.",
  },
  "pkg.published": { it: "In catalogo", pl: "W katalogu", en: "In catalogue" },
  "pkg.draft": { it: "Bozza", pl: "Szkic", en: "Draft" },
  "pkg.publish": {
    it: "Pubblica in catalogo",
    pl: "Opublikuj w katalogu",
    en: "Publish to catalogue",
  },
  "pkg.askDelete": {
    it: "Eliminare il pacchetto {name} e le sue partenze?",
    pl: "Usunąć ofertę {name} wraz z terminami?",
    en: "Delete package {name} and its departures?",
  },
  "pkg.hasBookings": {
    it: "Il pacchetto ha prenotazioni attive: non può essere eliminato.",
    pl: "Oferta ma aktywne rezerwacje — nie można jej usunąć.",
    en: "The package has active bookings, so it cannot be deleted.",
  },
  "pkg.saved": {
    it: "Pacchetto salvato.",
    pl: "Oferta zapisana.",
    en: "Package saved.",
  },
  "pkg.deleted": {
    it: "Pacchetto eliminato.",
    pl: "Oferta usunięta.",
    en: "Package deleted.",
  },
  "pkg.copySuffix": { it: "(copia)", pl: "(kopia)", en: "(copy)" },

  "pkg.costs": { it: "Voci di costo", pl: "Pozycje kosztów", en: "Cost items" },
  "pkg.costsHint": {
    it: "Quanto paghi ai fornitori. Il programma calcola da solo costo, prezzo e pareggio.",
    pl: "Ile płacisz dostawcom. Program sam liczy koszt, cenę i próg rentowności.",
    en: "What you pay suppliers. The program works out cost, price and break-even for you.",
  },
  "pkg.addCost": { it: "Aggiungi voce", pl: "Dodaj pozycję", en: "Add item" },
  "pkg.costLabel": { it: "Voce", pl: "Pozycja", en: "Item" },
  "pkg.costSupplier": { it: "Fornitore", pl: "Dostawca", en: "Supplier" },
  "pkg.costAmount": { it: "Importo", pl: "Kwota", en: "Amount" },
  "pkg.costUnit": { it: "Unità", pl: "Jednostka", en: "Unit" },
  "pkg.costKind": { it: "Categoria", pl: "Kategoria", en: "Category" },
  "pkg.noCosts": {
    it: "Nessuna voce di costo: aggiungi hotel, trasporto, guida…",
    pl: "Brak kosztów: dodaj hotel, transport, przewodnika…",
    en: "No cost items yet: add hotel, transport, guide…",
  },

  "unit.person": { it: "a persona", pl: "za osobę", en: "per person" },
  "unit.personNight": {
    it: "a persona / notte",
    pl: "za osobę / noc",
    en: "per person / night",
  },
  "unit.group": { it: "a gruppo", pl: "za grupę", en: "per group" },
  "unit.night": {
    it: "a gruppo / notte",
    pl: "za grupę / noc",
    en: "per group / night",
  },

  "kind.hotel": { it: "Hotel", pl: "Hotel", en: "Hotel" },
  "kind.transport": { it: "Trasporto", pl: "Transport", en: "Transport" },
  "kind.guide": { it: "Guida", pl: "Przewodnik", en: "Guide" },
  "kind.tickets": { it: "Ingressi", pl: "Bilety wstępu", en: "Entrance fees" },
  "kind.meals": { it: "Pasti", pl: "Wyżywienie", en: "Meals" },
  "kind.insurance": {
    it: "Assicurazione",
    pl: "Ubezpieczenie",
    en: "Insurance",
  },
  "kind.other": { it: "Altro", pl: "Inne", en: "Other" },
  "kind.general": {
    it: "Spese generali",
    pl: "Koszty ogólne",
    en: "Overheads",
  },
  "kind.marketing": { it: "Marketing", pl: "Marketing", en: "Marketing" },
  "kind.staff": { it: "Personale", pl: "Wynagrodzenia", en: "Staff" },
  "kind.deposit": { it: "Acconto", pl: "Zaliczka", en: "Deposit" },
  "kind.balance": { it: "Saldo", pl: "Dopłata", en: "Balance" },

  "pkg.departures": { it: "Partenze", pl: "Terminy", en: "Departures" },
  "pkg.addDeparture": {
    it: "Aggiungi partenza",
    pl: "Dodaj termin",
    en: "Add departure",
  },
  "pkg.seats": { it: "Posti", pl: "Miejsca", en: "Seats" },
  "pkg.noDepartures": {
    it: "Nessuna data: il pacchetto resta in bozza.",
    pl: "Brak terminów: oferta zostaje szkicem.",
    en: "No dates yet: the package stays a draft.",
  },
  "pkg.departureUsed": {
    it: "Partenza con prenotazioni attive: non si può togliere.",
    pl: "Termin z aktywnymi rezerwacjami — nie można go usunąć.",
    en: "This departure has active bookings and cannot be removed.",
  },

  "pkg.pricing": {
    it: "Prezzo di vendita",
    pl: "Cena sprzedaży",
    en: "Selling price",
  },
  "pkg.refPax": {
    it: "Partecipanti previsti",
    pl: "Zakładana liczba osób",
    en: "Expected participants",
  },
  "pkg.fixedCost": {
    it: "Costi fissi del gruppo",
    pl: "Koszty stałe grupy",
    en: "Fixed group costs",
  },
  "pkg.variableCost": {
    it: "Costo variabile a persona",
    pl: "Koszt zmienny na osobę",
    en: "Variable cost per person",
  },
  "pkg.costPerPerson": {
    it: "Costo a persona",
    pl: "Koszt na osobę",
    en: "Cost per person",
  },
  "pkg.markup": { it: "Ricarico", pl: "Marża", en: "Mark-up" },
  "pkg.suggested": {
    it: "Prezzo suggerito",
    pl: "Cena sugerowana",
    en: "Suggested price",
  },
  "pkg.listPrice": {
    it: "Prezzo di listino",
    pl: "Cena katalogowa",
    en: "List price",
  },
  "pkg.useSuggested": {
    it: "Usa il suggerito",
    pl: "Użyj sugerowanej",
    en: "Use suggested",
  },
  "pkg.marginPerPerson": {
    it: "Margine a persona",
    pl: "Marża na osobę",
    en: "Margin per person",
  },
  "pkg.breakEven": { it: "Pareggio", pl: "Próg rentowności", en: "Break-even" },
  "pkg.breakEvenPax": {
    it: { one: "{n} partecipante", other: "{n} partecipanti" },
    pl: {
      one: "{n} uczestnik",
      few: "{n} uczestników",
      many: "{n} uczestników",
      other: "{n} uczestników",
    },
    en: { one: "{n} participant", other: "{n} participants" },
  },
  "pkg.breakEvenNever": {
    it: "Mai: il prezzo non copre il costo variabile.",
    pl: "Nigdy: cena nie pokrywa kosztu zmiennego.",
    en: "Never: the price does not cover the variable cost.",
  },
  "pkg.colPrice": { it: "Listino", pl: "Cena", en: "List" },
  "pkg.colCost": { it: "Costo", pl: "Koszt", en: "Cost" },
  "pkg.colMargin": { it: "Margine", pl: "Marża", en: "Margin" },
  "pkg.colDepartures": { it: "Partenze", pl: "Terminy", en: "Departures" },
  "pkg.errName": {
    it: "Serve un nome.",
    pl: "Podaj nazwę.",
    en: "A name is required.",
  },

  /* -------------------------------------------------- partenze / last minute */
  "dep.empty": {
    it: "Nessuna partenza nel periodo scelto.",
    pl: "Brak terminów w wybranym okresie.",
    en: "No departures in the selected period.",
  },
  "dep.filterPeriod": { it: "Periodo", pl: "Okres", en: "Period" },
  "dep.next60": {
    it: "Prossimi 60 giorni",
    pl: "Najbliższe 60 dni",
    en: "Next 60 days",
  },
  "dep.upcoming": {
    it: "Tutte le future",
    pl: "Wszystkie przyszłe",
    en: "All upcoming",
  },
  "dep.onlyFree": {
    it: "Solo con posti liberi",
    pl: "Tylko z wolnymi miejscami",
    en: "Only with free seats",
  },
  "dep.daysLeft": {
    it: { one: "fra {n} giorno", other: "fra {n} giorni" },
    pl: {
      one: "za {n} dzień",
      few: "za {n} dni",
      many: "za {n} dni",
      other: "za {n} dni",
    },
    en: { one: "in {n} day", other: "in {n} days" },
  },
  "dep.today": { it: "Oggi", pl: "Dzisiaj", en: "Today" },
  "dep.sold": { it: "Venduti", pl: "Sprzedane", en: "Sold" },
  "dep.revenue": { it: "Ricavi", pl: "Przychód", en: "Revenue" },
  "dep.cost": { it: "Costi", pl: "Koszty", en: "Costs" },
  "dep.margin": { it: "Margine", pl: "Marża", en: "Margin" },
  "dep.breakEvenReached": {
    it: "Pareggio raggiunto",
    pl: "Próg osiągnięty",
    en: "Break-even reached",
  },
  "dep.breakEvenMissing": {
    it: {
      one: "manca {n} persona al pareggio",
      other: "mancano {n} persone al pareggio",
    },
    pl: {
      one: "brakuje {n} osoby do progu",
      few: "brakuje {n} osób do progu",
      many: "brakuje {n} osób do progu",
      other: "brakuje {n} osób do progu",
    },
    en: {
      one: "{n} person short of break-even",
      other: "{n} people short of break-even",
    },
  },
  "dep.lastMinute": { it: "Last minute", pl: "Last minute", en: "Last minute" },
  "dep.suggestedPrice": { it: "Suggerito", pl: "Sugerowana", en: "Suggested" },
  "dep.yourPrice": { it: "Il tuo prezzo", pl: "Twoja cena", en: "Your price" },
  "dep.activate": { it: "Attiva", pl: "Włącz", en: "Activate" },
  "dep.apply": { it: "Applica", pl: "Zastosuj", en: "Apply" },
  "dep.deactivate": { it: "Disattiva", pl: "Wyłącz", en: "Turn off" },
  "dep.active": { it: "Attivo", pl: "Aktywna", en: "On" },
  "dep.floor": {
    it: "Sotto questo prezzo ci rimetti",
    pl: "Poniżej tej ceny tracisz",
    en: "Below this price you lose money",
  },
  "dep.discount": { it: "Sconto {n}%", pl: "Rabat {n}%", en: "{n}% off" },
  "dep.reason.far": {
    it: "Partenza lontana: si vende a listino.",
    pl: "Termin odległy: sprzedaż w cenie katalogowej.",
    en: "Departure is far off: sell at list price.",
  },
  "dep.reason.window": {
    it: "Finestra last minute aperta: i costi fissi sono coperti.",
    pl: "Okno last minute otwarte: koszty stałe są pokryte.",
    en: "Last-minute window open: fixed costs are covered.",
  },
  "dep.reason.risk": {
    it: "Sotto il pareggio: ogni posto venduto riduce la perdita.",
    pl: "Poniżej progu: każde sprzedane miejsce zmniejsza stratę.",
    en: "Below break-even: every seat sold cuts the loss.",
  },
  "dep.reason.full": {
    it: "Partenza completa.",
    pl: "Termin wyprzedany.",
    en: "Departure is full.",
  },
  "dep.priceSaved": {
    it: "Prezzo aggiornato.",
    pl: "Cena zaktualizowana.",
    en: "Price updated.",
  },
  "dep.belowFloor": {
    it: "Prezzo sotto il costo del posto: lo tengo, ma ci perdi.",
    pl: "Cena poniżej kosztu miejsca: zapisuję, ale tracisz.",
    en: "Price below the seat's cost: saved, but you lose money.",
  },

  /* ------------------------------------------------------- contabilità */
  "acc.period": { it: "Periodo", pl: "Okres", en: "Period" },
  "acc.periodAll": { it: "Tutto", pl: "Wszystko", en: "Everything" },
  "acc.periodOpen": {
    it: "Da saldare",
    pl: "Do rozliczenia",
    en: "Outstanding",
  },
  "acc.periodMonth": { it: "Questo mese", pl: "Ten miesiąc", en: "This month" },
  "acc.periodOverdue": { it: "Scaduti", pl: "Po terminie", en: "Overdue" },
  "acc.kind": { it: "Tipo", pl: "Typ", en: "Type" },
  "acc.in": { it: "Entrate", pl: "Wpływy", en: "Money in" },
  "acc.out": { it: "Uscite", pl: "Wydatki", en: "Money out" },
  "acc.due": { it: "Scadenza", pl: "Termin", en: "Due" },
  "acc.description": { it: "Descrizione", pl: "Opis", en: "Description" },
  "acc.reference": { it: "Riferimento", pl: "Powiązanie", en: "Reference" },
  "acc.amount": { it: "Importo", pl: "Kwota", en: "Amount" },
  "acc.status": { it: "Stato", pl: "Status", en: "Status" },
  "acc.planned": { it: "Previsto", pl: "Planowane", en: "Planned" },
  "acc.settledIn": { it: "Incassato", pl: "Wpłacone", en: "Collected" },
  "acc.settledOut": { it: "Pagato", pl: "Zapłacone", en: "Paid" },
  "acc.markIn": {
    it: "Segna incassato",
    pl: "Oznacz jako wpłacone",
    en: "Mark collected",
  },
  "acc.markOut": {
    it: "Segna pagato",
    pl: "Oznacz jako zapłacone",
    en: "Mark paid",
  },
  "acc.reopen": { it: "Riapri", pl: "Cofnij", en: "Reopen" },
  "acc.overdue": { it: "Scaduto", pl: "Po terminie", en: "Overdue" },
  "acc.empty": {
    it: "Nessun movimento: nasce tutto da prenotazioni e costi dei pacchetti.",
    pl: "Brak operacji: powstają z rezerwacji i kosztów ofert.",
    en: "No entries yet: they come from bookings and package costs.",
  },
  "acc.auto": { it: "Automatico", pl: "Automatyczne", en: "Automatic" },
  "acc.manual": { it: "Manuale", pl: "Ręczne", en: "Manual" },
  "acc.addManual": {
    it: "Aggiungi movimento",
    pl: "Dodaj operację",
    en: "Add entry",
  },
  "acc.newEntry": {
    it: "Movimento manuale",
    pl: "Operacja ręczna",
    en: "Manual entry",
  },
  "acc.manualHint": {
    it: "Affitto, stipendi, pubblicità: quello che non nasce da un viaggio.",
    pl: "Czynsz, wynagrodzenia, reklama — to, co nie wynika z wyjazdu.",
    en: "Rent, wages, advertising: whatever a trip does not generate.",
  },
  "acc.deposit": {
    it: "Acconto {ref}",
    pl: "Zaliczka {ref}",
    en: "Deposit {ref}",
  },
  "acc.balance": {
    it: "Saldo {ref}",
    pl: "Dopłata {ref}",
    en: "Balance {ref}",
  },
  "acc.supplierCost": {
    it: "{item} — {supplier}",
    pl: "{item} — {supplier}",
    en: "{item} — {supplier}",
  },
  "acc.collected": { it: "Incassato", pl: "Wpłacone", en: "Collected" },
  "acc.toCollect": { it: "Da incassare", pl: "Do wpłaty", en: "To collect" },
  "acc.paid": { it: "Pagato", pl: "Zapłacone", en: "Paid" },
  "acc.toPay": { it: "Da pagare", pl: "Do zapłaty", en: "To pay" },
  "acc.cash": { it: "Cassa", pl: "Kasa", en: "Cash" },
  "acc.expected": {
    it: "Saldo previsto",
    pl: "Saldo planowane",
    en: "Expected balance",
  },
  "acc.settledDate": {
    it: "Data saldo",
    pl: "Data rozliczenia",
    en: "Settled on",
  },
  "acc.askDelete": {
    it: "Eliminare questo movimento manuale?",
    pl: "Usunąć tę ręczną operację?",
    en: "Delete this manual entry?",
  },
  "acc.errAmount": {
    it: "Importo non valido.",
    pl: "Nieprawidłowa kwota.",
    en: "Invalid amount.",
  },

  /* --------------------------------------------------------- riepilogo */
  "dash.bookings": { it: "Prenotazioni", pl: "Rezerwacje", en: "Bookings" },
  "dash.travelers": { it: "Viaggiatori", pl: "Podróżni", en: "Travellers" },
  "dash.revenue": { it: "Ricavi", pl: "Przychód", en: "Revenue" },
  "dash.costs": {
    it: "Costi dei viaggi",
    pl: "Koszty wyjazdów",
    en: "Trip costs",
  },
  "dash.margin": {
    it: "Margine lordo",
    pl: "Marża brutto",
    en: "Gross margin",
  },
  "dash.marginPct": { it: "Margine %", pl: "Marża %", en: "Margin %" },
  "dash.byDestination": {
    it: "Margine per destinazione",
    pl: "Marża wg kierunku",
    en: "Margin by destination",
  },
  "dash.empty": {
    it: "Ancora nessun dato: registra una prenotazione dal catalogo.",
    pl: "Brak danych — dodaj rezerwację z katalogu.",
    en: "No data yet — add a booking from the catalogue.",
  },
  "dash.nextDepartures": {
    it: "Prossime partenze",
    pl: "Najbliższe terminy",
    en: "Next departures",
  },

  /* ------------------------------------------------------------- toast */
  "toast.created": {
    it: "Prenotazione {ref} registrata.",
    pl: "Rezerwacja {ref} zapisana.",
    en: "Booking {ref} saved.",
  },
  "toast.updated": {
    it: "Prenotazione {ref} aggiornata.",
    pl: "Rezerwacja {ref} zaktualizowana.",
    en: "Booking {ref} updated.",
  },
  "toast.deleted": {
    it: "Prenotazione {ref} eliminata.",
    pl: "Rezerwacja {ref} usunięta.",
    en: "Booking {ref} deleted.",
  },
  "toast.exported": {
    it: "File CSV scaricato.",
    pl: "Plik CSV pobrany.",
    en: "CSV file downloaded.",
  },
  "toast.saved": { it: "Salvato.", pl: "Zapisano.", en: "Saved." },
};

let currentLang = "it";

function setLang(lang) {
  currentLang = LANGS.includes(lang) ? lang : "it";
  document.documentElement.lang = currentLang;
}

function locale() {
  return LOCALES[currentLang];
}

/** t('chiave') oppure t('chiave', { n: 3, ref: 'TM-0001' }). */
function t(key, params = {}) {
  const entry = STRINGS[key];
  if (!entry) return key;

  let value = entry[currentLang] ?? entry.it;
  if (value && typeof value === "object") {
    const rule = new Intl.PluralRules(locale()).select(Number(params.n) || 0);
    value = value[rule] ?? value.other;
  }

  return String(value).replace(/\{(\w+)\}/g, (_, name) =>
    params[name] === undefined ? `{${name}}` : params[name],
  );
}

/** Applica le traduzioni ai nodi marcati nel DOM. */
function translateDom(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  root.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attr, key] = pair.split(":");
      el.setAttribute(attr.trim(), t(key.trim()));
    });
  });
}
