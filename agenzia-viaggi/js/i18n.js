/**
 * i18n — dizionari e helper di traduzione (IT / PL / EN).
 * Le stringhe con conteggio usano Intl.PluralRules: il polacco ha
 * quattro forme (one/few/many/other), l'italiano e l'inglese due.
 */
const I18N = {
  it: {
    _locale: "it-IT",
    "app.tagline": "Agenzia viaggi — gestione cataloghi e prenotazioni",
    "app.language": "Lingua",
    "app.footer": "Tre Mari Travel — dati salvati solo su questo dispositivo.",

    "nav.catalog": "Catalogo",
    "nav.bookings": "Prenotazioni",
    "nav.dashboard": "Riepilogo",

    "filters.search": "Cerca",
    "filters.searchPlaceholder": "Destinazione, città, parola chiave…",
    "filters.country": "Paese",
    "filters.category": "Tipo di viaggio",
    "filters.maxPrice": "Prezzo massimo",
    "filters.sort": "Ordina per",
    "filters.sortPopular": "Più popolari",
    "filters.sortPriceAsc": "Prezzo crescente",
    "filters.sortPriceDesc": "Prezzo decrescente",
    "filters.sortDuration": "Durata",
    "filters.reset": "Azzera filtri",
    "filters.allCountries": "Tutti i paesi",
    "filters.allCategories": "Tutti i tipi",

    "catalog.empty": "Nessun viaggio corrisponde ai filtri selezionati.",
    "catalog.results": {
      one: "{n} viaggio disponibile",
      other: "{n} viaggi disponibili",
    },
    "catalog.nights": { one: "{n} notte", other: "{n} notti" },
    "catalog.perPerson": "a persona",
    "catalog.book": "Prenota",
    "catalog.seats": { one: "{n} posto libero", other: "{n} posti liberi" },
    "catalog.soldOut": "Esaurito",
    "catalog.nextDeparture": "Prossima partenza",
    "catalog.rating": "Valutazione",

    "cat.sea": "Mare",
    "cat.city": "Città d’arte",
    "cat.mountain": "Montagna",
    "cat.adventure": "Avventura",
    "cat.cruise": "Crociera",
    "cat.wellness": "Benessere",

    "country.IT": "Italia",
    "country.PL": "Polonia",
    "country.ES": "Spagna",
    "country.GR": "Grecia",
    "country.PT": "Portogallo",
    "country.MA": "Marocco",
    "country.IS": "Islanda",
    "country.JP": "Giappone",
    "country.NO": "Norvegia",
    "country.HR": "Croazia",

    "form.titleNew": "Nuova prenotazione",
    "form.name": "Nome e cognome",
    "form.email": "Email",
    "form.phone": "Telefono",
    "form.departure": "Partenza",
    "form.adults": "Adulti",
    "form.children": "Bambini (0-11)",
    "form.notes": "Note",
    "form.cancel": "Annulla",
    "form.submit": "Conferma prenotazione",
    "form.priceAdults": "{n} × adulti",
    "form.priceChildren": "{n} × bambini (-30%)",
    "form.total": "Totale",
    "form.errSeats": "Posti insufficienti per questa partenza.",
    "form.errTravelers": "Inserisci almeno un viaggiatore.",

    "bookings.filterStatus": "Stato",
    "bookings.statusAll": "Tutti",
    "bookings.ref": "Codice",
    "bookings.client": "Cliente",
    "bookings.trip": "Viaggio",
    "bookings.departure": "Partenza",
    "bookings.travelers": "Viaggiatori",
    "bookings.total": "Totale",
    "bookings.status": "Stato",
    "bookings.actions": "Azioni",
    "bookings.empty": "Nessuna prenotazione registrata.",
    "bookings.export": "Esporta CSV",
    "bookings.clearAll": "Elimina tutte",
    "bookings.confirm": "Conferma",
    "bookings.cancel": "Annulla",
    "bookings.delete": "Elimina",
    "bookings.askDelete": "Eliminare definitivamente la prenotazione {ref}?",
    "bookings.askClear":
      "Eliminare tutte le prenotazioni? L’operazione non è reversibile.",

    "status.pending": "In attesa",
    "status.confirmed": "Confermata",
    "status.cancelled": "Annullata",

    "dashboard.bookings": "Prenotazioni",
    "dashboard.travelers": "Viaggiatori",
    "dashboard.revenue": "Fatturato confermato",
    "dashboard.average": "Valore medio",
    "dashboard.byDestination": "Prenotazioni per destinazione",
    "dashboard.empty":
      "Ancora nessun dato: registra una prenotazione dal catalogo.",

    "toast.created": "Prenotazione {ref} registrata.",
    "toast.updated": "Prenotazione {ref} aggiornata.",
    "toast.deleted": "Prenotazione {ref} eliminata.",
    "toast.exported": "File CSV scaricato.",
  },

  pl: {
    _locale: "pl-PL",
    "app.tagline": "Biuro podróży — katalog i rezerwacje",
    "app.language": "Język",
    "app.footer":
      "Tre Mari Travel — dane zapisywane wyłącznie na tym urządzeniu.",

    "nav.catalog": "Katalog",
    "nav.bookings": "Rezerwacje",
    "nav.dashboard": "Podsumowanie",

    "filters.search": "Szukaj",
    "filters.searchPlaceholder": "Kierunek, miasto, słowo kluczowe…",
    "filters.country": "Kraj",
    "filters.category": "Rodzaj wyjazdu",
    "filters.maxPrice": "Cena maksymalna",
    "filters.sort": "Sortuj według",
    "filters.sortPopular": "Najpopularniejsze",
    "filters.sortPriceAsc": "Cena rosnąco",
    "filters.sortPriceDesc": "Cena malejąco",
    "filters.sortDuration": "Czas trwania",
    "filters.reset": "Wyczyść filtry",
    "filters.allCountries": "Wszystkie kraje",
    "filters.allCategories": "Wszystkie rodzaje",

    "catalog.empty": "Żadna oferta nie pasuje do wybranych filtrów.",
    "catalog.results": {
      one: "{n} dostępna oferta",
      few: "{n} dostępne oferty",
      many: "{n} dostępnych ofert",
      other: "{n} dostępnych ofert",
    },
    "catalog.nights": {
      one: "{n} noc",
      few: "{n} noce",
      many: "{n} nocy",
      other: "{n} nocy",
    },
    "catalog.perPerson": "za osobę",
    "catalog.book": "Rezerwuj",
    "catalog.seats": {
      one: "{n} wolne miejsce",
      few: "{n} wolne miejsca",
      many: "{n} wolnych miejsc",
      other: "{n} wolnych miejsc",
    },
    "catalog.soldOut": "Brak miejsc",
    "catalog.nextDeparture": "Najbliższy wylot",
    "catalog.rating": "Ocena",

    "cat.sea": "Morze",
    "cat.city": "Miasta i kultura",
    "cat.mountain": "Góry",
    "cat.adventure": "Przygoda",
    "cat.cruise": "Rejs",
    "cat.wellness": "Wellness",

    "country.IT": "Włochy",
    "country.PL": "Polska",
    "country.ES": "Hiszpania",
    "country.GR": "Grecja",
    "country.PT": "Portugalia",
    "country.MA": "Maroko",
    "country.IS": "Islandia",
    "country.JP": "Japonia",
    "country.NO": "Norwegia",
    "country.HR": "Chorwacja",

    "form.titleNew": "Nowa rezerwacja",
    "form.name": "Imię i nazwisko",
    "form.email": "E-mail",
    "form.phone": "Telefon",
    "form.departure": "Termin wyjazdu",
    "form.adults": "Dorośli",
    "form.children": "Dzieci (0-11)",
    "form.notes": "Uwagi",
    "form.cancel": "Anuluj",
    "form.submit": "Potwierdź rezerwację",
    "form.priceAdults": "{n} × dorośli",
    "form.priceChildren": "{n} × dzieci (-30%)",
    "form.total": "Razem",
    "form.errSeats": "Za mało wolnych miejsc w tym terminie.",
    "form.errTravelers": "Podaj co najmniej jednego podróżnego.",

    "bookings.filterStatus": "Status",
    "bookings.statusAll": "Wszystkie",
    "bookings.ref": "Numer",
    "bookings.client": "Klient",
    "bookings.trip": "Wyjazd",
    "bookings.departure": "Termin",
    "bookings.travelers": "Podróżni",
    "bookings.total": "Razem",
    "bookings.status": "Status",
    "bookings.actions": "Akcje",
    "bookings.empty": "Brak zapisanych rezerwacji.",
    "bookings.export": "Eksport CSV",
    "bookings.clearAll": "Usuń wszystkie",
    "bookings.confirm": "Potwierdź",
    "bookings.cancel": "Anuluj",
    "bookings.delete": "Usuń",
    "bookings.askDelete": "Trwale usunąć rezerwację {ref}?",
    "bookings.askClear":
      "Usunąć wszystkie rezerwacje? Tej operacji nie można cofnąć.",

    "status.pending": "Oczekująca",
    "status.confirmed": "Potwierdzona",
    "status.cancelled": "Anulowana",

    "dashboard.bookings": "Rezerwacje",
    "dashboard.travelers": "Podróżni",
    "dashboard.revenue": "Potwierdzony obrót",
    "dashboard.average": "Średnia wartość",
    "dashboard.byDestination": "Rezerwacje wg kierunku",
    "dashboard.empty": "Brak danych — dodaj rezerwację z katalogu.",

    "toast.created": "Rezerwacja {ref} zapisana.",
    "toast.updated": "Rezerwacja {ref} zaktualizowana.",
    "toast.deleted": "Rezerwacja {ref} usunięta.",
    "toast.exported": "Plik CSV pobrany.",
  },

  en: {
    _locale: "en-GB",
    "app.tagline": "Travel agency — catalogue and booking management",
    "app.language": "Language",
    "app.footer": "Tre Mari Travel — data is stored on this device only.",

    "nav.catalog": "Catalogue",
    "nav.bookings": "Bookings",
    "nav.dashboard": "Overview",

    "filters.search": "Search",
    "filters.searchPlaceholder": "Destination, city, keyword…",
    "filters.country": "Country",
    "filters.category": "Trip type",
    "filters.maxPrice": "Maximum price",
    "filters.sort": "Sort by",
    "filters.sortPopular": "Most popular",
    "filters.sortPriceAsc": "Price, low to high",
    "filters.sortPriceDesc": "Price, high to low",
    "filters.sortDuration": "Duration",
    "filters.reset": "Clear filters",
    "filters.allCountries": "All countries",
    "filters.allCategories": "All types",

    "catalog.empty": "No trip matches the selected filters.",
    "catalog.results": {
      one: "{n} trip available",
      other: "{n} trips available",
    },
    "catalog.nights": { one: "{n} night", other: "{n} nights" },
    "catalog.perPerson": "per person",
    "catalog.book": "Book",
    "catalog.seats": { one: "{n} seat left", other: "{n} seats left" },
    "catalog.soldOut": "Sold out",
    "catalog.nextDeparture": "Next departure",
    "catalog.rating": "Rating",

    "cat.sea": "Beach",
    "cat.city": "City break",
    "cat.mountain": "Mountains",
    "cat.adventure": "Adventure",
    "cat.cruise": "Cruise",
    "cat.wellness": "Wellness",

    "country.IT": "Italy",
    "country.PL": "Poland",
    "country.ES": "Spain",
    "country.GR": "Greece",
    "country.PT": "Portugal",
    "country.MA": "Morocco",
    "country.IS": "Iceland",
    "country.JP": "Japan",
    "country.NO": "Norway",
    "country.HR": "Croatia",

    "form.titleNew": "New booking",
    "form.name": "Full name",
    "form.email": "Email",
    "form.phone": "Phone",
    "form.departure": "Departure",
    "form.adults": "Adults",
    "form.children": "Children (0-11)",
    "form.notes": "Notes",
    "form.cancel": "Cancel",
    "form.submit": "Confirm booking",
    "form.priceAdults": "{n} × adults",
    "form.priceChildren": "{n} × children (-30%)",
    "form.total": "Total",
    "form.errSeats": "Not enough seats left on this departure.",
    "form.errTravelers": "Add at least one traveller.",

    "bookings.filterStatus": "Status",
    "bookings.statusAll": "All",
    "bookings.ref": "Reference",
    "bookings.client": "Client",
    "bookings.trip": "Trip",
    "bookings.departure": "Departure",
    "bookings.travelers": "Travellers",
    "bookings.total": "Total",
    "bookings.status": "Status",
    "bookings.actions": "Actions",
    "bookings.empty": "No bookings recorded yet.",
    "bookings.export": "Export CSV",
    "bookings.clearAll": "Delete all",
    "bookings.confirm": "Confirm",
    "bookings.cancel": "Cancel",
    "bookings.delete": "Delete",
    "bookings.askDelete": "Permanently delete booking {ref}?",
    "bookings.askClear": "Delete every booking? This cannot be undone.",

    "status.pending": "Pending",
    "status.confirmed": "Confirmed",
    "status.cancelled": "Cancelled",

    "dashboard.bookings": "Bookings",
    "dashboard.travelers": "Travellers",
    "dashboard.revenue": "Confirmed revenue",
    "dashboard.average": "Average value",
    "dashboard.byDestination": "Bookings by destination",
    "dashboard.empty": "No data yet — add a booking from the catalogue.",

    "toast.created": "Booking {ref} saved.",
    "toast.updated": "Booking {ref} updated.",
    "toast.deleted": "Booking {ref} deleted.",
    "toast.exported": "CSV file downloaded.",
  },
};

const LANGS = ["it", "pl", "en"];

/** Lingua corrente, con fallback sull'italiano. */
let currentLang = "it";

function setLang(lang) {
  currentLang = LANGS.includes(lang) ? lang : "it";
  document.documentElement.lang = currentLang;
}

function locale() {
  return I18N[currentLang]._locale;
}

/**
 * t('chiave') oppure t('chiave', { n: 3, ref: 'TM-1234' }).
 * Se il valore è un oggetto di forme plurali, sceglie quella corretta
 * per la lingua attiva in base a params.n.
 */
function t(key, params = {}) {
  let value = I18N[currentLang][key] ?? I18N.it[key] ?? key;

  if (value && typeof value === "object") {
    const rule = new Intl.PluralRules(locale()).select(Number(params.n) || 0);
    value = value[rule] ?? value.other ?? key;
  }

  return String(value).replace(/\{(\w+)\}/g, (_, name) =>
    params[name] === undefined ? `{${name}}` : params[name],
  );
}

/** Applica le traduzioni a tutti i nodi marcati nel DOM. */
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
