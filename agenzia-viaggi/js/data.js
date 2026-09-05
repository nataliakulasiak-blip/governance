/**
 * Catalogo viaggi. Ogni pacchetto contiene titolo e descrizione nelle tre
 * lingue; le partenze sono generate a partire da oggi (offset in giorni)
 * così il catalogo resta sempre valido.
 */
const RAW_PACKAGES = [
  {
    id: "TM-SIC",
    country: "IT",
    category: "sea",
    nights: 7,
    price: 890,
    rating: 4.7,
    popularity: 95,
    emoji: "🏖️",
    hue: 190,
    departures: [
      { in: 21, seats: 18 },
      { in: 49, seats: 24 },
      { in: 84, seats: 30 },
    ],
    title: {
      it: "Sicilia orientale",
      pl: "Wschodnia Sycylia",
      en: "Eastern Sicily",
    },
    desc: {
      it: "Taormina, Siracusa e le spiagge della riserva di Vendicari, con hotel 4★ fronte mare.",
      pl: "Taormina, Syrakuzy i plaże rezerwatu Vendicari, hotel 4★ przy samej plaży.",
      en: "Taormina, Syracuse and the beaches of the Vendicari reserve, in a 4★ seafront hotel.",
    },
  },
  {
    id: "TM-KRK",
    country: "PL",
    category: "city",
    nights: 3,
    price: 420,
    rating: 4.6,
    popularity: 88,
    emoji: "🏰",
    hue: 25,
    departures: [
      { in: 12, seats: 20 },
      { in: 33, seats: 20 },
      { in: 61, seats: 16 },
    ],
    title: {
      it: "Cracovia e Wieliczka",
      pl: "Kraków i Wieliczka",
      en: "Kraków and Wieliczka",
    },
    desc: {
      it: "Centro storico, il quartiere Kazimierz e la miniera di sale di Wieliczka con guida.",
      pl: "Stare Miasto, Kazimierz i kopalnia soli w Wieliczce ze zwiedzaniem z przewodnikiem.",
      en: "The old town, the Kazimierz district and the Wieliczka salt mine with a guide.",
    },
  },
  {
    id: "TM-MAZ",
    country: "PL",
    category: "adventure",
    nights: 5,
    price: 560,
    rating: 4.4,
    popularity: 61,
    emoji: "🛶",
    hue: 150,
    departures: [
      { in: 30, seats: 14 },
      { in: 58, seats: 14 },
    ],
    title: {
      it: "Laghi Masuri in kayak",
      pl: "Mazury na kajakach",
      en: "Masurian lakes by kayak",
    },
    desc: {
      it: "Cinque giorni tra i laghi della Masuria: kayak, bivacchi e cucina locale.",
      pl: "Pięć dni na Szlaku Wielkich Jezior: kajaki, biwaki i kuchnia regionalna.",
      en: "Five days across the Masurian lakes: kayaking, lakeside camps and regional food.",
    },
  },
  {
    id: "TM-AND",
    country: "ES",
    category: "city",
    nights: 5,
    price: 780,
    rating: 4.8,
    popularity: 91,
    emoji: "🕌",
    hue: 340,
    departures: [
      { in: 18, seats: 22 },
      { in: 46, seats: 22 },
      { in: 74, seats: 12 },
    ],
    title: {
      it: "Andalusia classica",
      pl: "Klasyczna Andaluzja",
      en: "Classic Andalusia",
    },
    desc: {
      it: "Siviglia, Cordova e Granada: Alhambra inclusa, spostamenti in treno ad alta velocità.",
      pl: "Sewilla, Kordoba i Granada: Alhambra w cenie, przejazdy szybkim pociągiem.",
      en: "Seville, Córdoba and Granada: Alhambra included, high-speed rail between cities.",
    },
  },
  {
    id: "TM-CYC",
    country: "GR",
    category: "sea",
    nights: 8,
    price: 1150,
    rating: 4.9,
    popularity: 99,
    emoji: "⛵",
    hue: 205,
    departures: [
      { in: 27, seats: 16 },
      { in: 55, seats: 16 },
      { in: 90, seats: 8 },
    ],
    title: {
      it: "Cicladi: Paros e Naxos",
      pl: "Cyklady: Paros i Naksos",
      en: "Cyclades: Paros and Naxos",
    },
    desc: {
      it: "Otto notti fra due isole, traghetti inclusi e una giornata in barca a vela.",
      pl: "Osiem nocy na dwóch wyspach, promy w cenie i całodniowy rejs żaglówką.",
      en: "Eight nights across two islands, ferries included and a full day under sail.",
    },
  },
  {
    id: "TM-MAD",
    country: "PT",
    category: "mountain",
    nights: 6,
    price: 940,
    rating: 4.5,
    popularity: 72,
    emoji: "⛰️",
    hue: 130,
    departures: [
      { in: 24, seats: 18 },
      { in: 66, seats: 18 },
    ],
    title: {
      it: "Madeira, isola dei sentieri",
      pl: "Madera — wyspa szlaków",
      en: "Madeira, island of trails",
    },
    desc: {
      it: "Levadas, Pico do Arieiro e Funchal: sei giorni di trekking con guida certificata.",
      pl: "Levady, Pico do Arieiro i Funchal: sześć dni trekkingu z licencjonowanym przewodnikiem.",
      en: "Levadas, Pico do Arieiro and Funchal: six days of hiking with a certified guide.",
    },
  },
  {
    id: "TM-MAR",
    country: "MA",
    category: "adventure",
    nights: 7,
    price: 1090,
    rating: 4.6,
    popularity: 80,
    emoji: "🐫",
    hue: 35,
    departures: [
      { in: 35, seats: 20 },
      { in: 70, seats: 20 },
      { in: 105, seats: 20 },
    ],
    title: {
      it: "Marocco: deserto e medine",
      pl: "Maroko: pustynia i medyny",
      en: "Morocco: desert and medinas",
    },
    desc: {
      it: "Marrakech, gole del Dades e una notte in tenda berbera nel Sahara.",
      pl: "Marrakesz, wąwozy Dades i noc w berberyjskim namiocie na Saharze.",
      en: "Marrakesh, the Dades gorges and a night in a Berber tent in the Sahara.",
    },
  },
  {
    id: "TM-ISL",
    country: "IS",
    category: "adventure",
    nights: 6,
    price: 1980,
    rating: 4.9,
    popularity: 86,
    emoji: "🌋",
    hue: 265,
    departures: [
      { in: 40, seats: 12 },
      { in: 96, seats: 12 },
    ],
    title: {
      it: "Islanda e aurore boreali",
      pl: "Islandia i zorza polarna",
      en: "Iceland and the northern lights",
    },
    desc: {
      it: "Circolo d’oro, laguna glaciale e caccia all’aurora con fotografo al seguito.",
      pl: "Złoty Krąg, laguna lodowcowa i polowanie na zorzę z fotografem.",
      en: "The Golden Circle, the glacier lagoon and aurora hunting with a photographer.",
    },
  },
  {
    id: "TM-JPN",
    country: "JP",
    category: "city",
    nights: 11,
    price: 3250,
    rating: 4.9,
    popularity: 93,
    emoji: "⛩️",
    hue: 355,
    departures: [
      { in: 52, seats: 16 },
      { in: 118, seats: 16 },
    ],
    title: {
      it: "Giappone classico",
      pl: "Japonia klasyczna",
      en: "Classic Japan",
    },
    desc: {
      it: "Tokyo, Hakone, Kyoto e Nara con Japan Rail Pass e una notte in ryokan.",
      pl: "Tokio, Hakone, Kioto i Nara z Japan Rail Pass i nocą w ryokanie.",
      en: "Tokyo, Hakone, Kyoto and Nara with a Japan Rail Pass and a night in a ryokan.",
    },
  },
  {
    id: "TM-FJO",
    country: "NO",
    category: "cruise",
    nights: 8,
    price: 2140,
    rating: 4.7,
    popularity: 68,
    emoji: "🚢",
    hue: 215,
    departures: [
      { in: 44, seats: 26 },
      { in: 100, seats: 26 },
    ],
    title: {
      it: "Crociera nei fiordi",
      pl: "Rejs po fiordach",
      en: "Fjords cruise",
    },
    desc: {
      it: "Da Bergen a Tromsø lungo la costa, con escursioni a Geiranger e Ålesund.",
      pl: "Z Bergen do Tromsø wzdłuż wybrzeża, z wycieczkami do Geiranger i Ålesund.",
      en: "Bergen to Tromsø along the coast, with excursions to Geiranger and Ålesund.",
    },
  },
  {
    id: "TM-DLM",
    country: "HR",
    category: "sea",
    nights: 7,
    price: 830,
    rating: 4.5,
    popularity: 77,
    emoji: "🏝️",
    hue: 175,
    departures: [
      { in: 20, seats: 24 },
      { in: 48, seats: 24 },
      { in: 76, seats: 10 },
    ],
    title: {
      it: "Dalmazia e isole",
      pl: "Dalmacja i wyspy",
      en: "Dalmatia and its islands",
    },
    desc: {
      it: "Spalato, Hvar e Korčula in catamarano, con soste per il bagno lungo la rotta.",
      pl: "Split, Hvar i Korčula katamaranem, z postojami na kąpiel po drodze.",
      en: "Split, Hvar and Korčula by catamaran, with swim stops along the route.",
    },
  },
  {
    id: "TM-DOL",
    country: "IT",
    category: "wellness",
    nights: 4,
    price: 690,
    rating: 4.6,
    popularity: 64,
    emoji: "🧖",
    hue: 100,
    departures: [
      { in: 15, seats: 20 },
      { in: 43, seats: 20 },
      { in: 71, seats: 20 },
    ],
    title: {
      it: "Dolomiti benessere",
      pl: "Dolomity i spa",
      en: "Dolomites wellness",
    },
    desc: {
      it: "Quattro notti in hotel spa in Val Badia, escursioni facili e mezza pensione.",
      pl: "Cztery noce w hotelu spa w Val Badia, łatwe wędrówki i śniadania z obiadokolacją.",
      en: "Four nights in a spa hotel in Val Badia, easy hikes and half board.",
    },
  },
];

const CATEGORIES = [
  "sea",
  "city",
  "mountain",
  "adventure",
  "cruise",
  "wellness",
];

/** Converte gli offset in date ISO reali, calcolate rispetto a oggi. */
function buildPackages(today = new Date()) {
  return RAW_PACKAGES.map((pkg) => ({
    ...pkg,
    departures: pkg.departures.map((dep) => {
      const date = new Date(today);
      date.setDate(date.getDate() + dep.in);
      return { date: date.toISOString().slice(0, 10), seats: dep.seats };
    }),
  }));
}
