/**
 * Stato e calcoli dell'agenzia: pacchetti, prenotazioni, contabilità.
 * Tutto ciò che è calcolabile viene ricavato dai dati (costi, pareggio,
 * prezzo last minute, scadenze); si salvano solo le scelte dell'utente.
 */
const Model = (() => {
  const KEYS = {
    packages: "tremari.packages.v1",
    bookings: "tremari.bookings.v1",
    manual: "tremari.manual.v1",
    settled: "tremari.settled.v1",
    lang: "tremari.lang",
  };

  const DEPOSIT_SHARE = 0.3; // acconto alla prenotazione
  const BALANCE_DAYS = 30; // saldo cliente: giorni prima della partenza
  const SUPPLIER_DAYS = 15; // pagamento fornitori: giorni prima della partenza
  const CHILD_DISCOUNT = 0.3;
  const MIN_SEAT_MARGIN = 0.1; // margine minimo sul costo del posto in più
  const LAST_MINUTE_WINDOW = 30; // giorni entro cui si apre il last minute

  const state = {
    packages: [],
    bookings: [],
    manual: [],
    settled: {},
  };

  /* ------------------------------------------------------- persistenza */

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage pieno o disabilitato: si continua in memoria */
    }
  }

  function init() {
    state.packages = read(KEYS.packages, null) ?? seedPackages();
    state.bookings = read(KEYS.bookings, []);
    state.manual = read(KEYS.manual, []);
    state.settled = read(KEYS.settled, {});
    save();
  }

  function save() {
    write(KEYS.packages, state.packages);
    write(KEYS.bookings, state.bookings);
    write(KEYS.manual, state.manual);
    write(KEYS.settled, state.settled);
  }

  function readLang() {
    return read(KEYS.lang, null);
  }

  function saveLang(lang) {
    write(KEYS.lang, lang);
  }

  /* ------------------------------------------------------------- date */

  function todayIso() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 10);
  }

  function daysBetween(fromIso, toIso) {
    const a = Date.parse(`${fromIso}T00:00:00Z`);
    const b = Date.parse(`${toIso}T00:00:00Z`);
    return Math.round((b - a) / 86400000);
  }

  function shiftDays(iso, days) {
    const date = new Date(`${iso}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
  }

  /* --------------------------------------------------------- pacchetti */

  const findPackage = (id) => state.packages.find((p) => p.id === id) ?? null;

  const findDeparture = (pkg, date) =>
    pkg?.departures.find((d) => d.date === date) ?? null;

  function refPax(pkg) {
    return pkg.refPax ?? Math.max(1, Math.round(pkg.groupSize * 0.8));
  }

  function upsertPackage(pkg) {
    const index = state.packages.findIndex((p) => p.id === pkg.id);
    if (index === -1) state.packages.push(pkg);
    else state.packages[index] = pkg;
    save();
  }

  function deletePackage(id) {
    state.packages = state.packages.filter((p) => p.id !== id);
    save();
  }

  function newPackageId() {
    let n = state.packages.length + 1;
    const exists = (id) => state.packages.some((p) => p.id === id);
    while (exists(`TM-N${String(n).padStart(2, "0")}`)) n += 1;
    return `TM-N${String(n).padStart(2, "0")}`;
  }

  /* ------------------------------------------------------------ costi */

  /** Costi divisi in fissi di gruppo e variabili a persona. */
  function costParts(pkg) {
    let fixed = 0;
    let variable = 0;
    (pkg.costs ?? []).forEach((c) => {
      const amount = Number(c.amount) || 0;
      if (c.unit === "person") variable += amount;
      else if (c.unit === "personNight") variable += amount * pkg.nights;
      else if (c.unit === "night") fixed += amount * pkg.nights;
      else fixed += amount;
    });
    return { fixed, variable };
  }

  const costOf = (pkg, pax) => {
    const { fixed, variable } = costParts(pkg);
    return pax > 0 ? fixed + variable * pax : fixed;
  };

  const costPerPerson = (pkg, pax) => (pax > 0 ? costOf(pkg, pax) / pax : 0);

  const suggestedPrice = (pkg) =>
    Math.ceil(
      (costPerPerson(pkg, refPax(pkg)) * (1 + (pkg.markup ?? 0.25))) / 10,
    ) * 10;

  /** Partecipanti minimi perché la partenza copra i costi. */
  function breakEven(pkg, price = pkg.price) {
    const { fixed, variable } = costParts(pkg);
    if (price <= variable) return null;
    return Math.ceil(fixed / (price - variable));
  }

  /* ------------------------------------------------------ prenotazioni */

  const activeBookings = (packageId, date) =>
    state.bookings.filter(
      (b) =>
        b.packageId === packageId &&
        b.date === date &&
        b.status !== "cancelled",
    );

  const travelersOf = (b) => b.adults + b.children;

  const seatsTaken = (packageId, date, exceptRef = null) =>
    activeBookings(packageId, date)
      .filter((b) => b.ref !== exceptRef)
      .reduce((sum, b) => sum + travelersOf(b), 0);

  const seatsLeft = (pkg, dep) =>
    Math.max(0, dep.seats - seatsTaken(pkg.id, dep.date));

  const openDepartures = (pkg) =>
    pkg.departures
      .filter((d) => d.date >= todayIso() && seatsLeft(pkg, d) > 0)
      .sort((a, b) => a.date.localeCompare(b.date));

  function nextRef() {
    const used = new Set(state.bookings.map((b) => b.ref));
    let n = state.bookings.length + 1;
    while (used.has(`TM-${String(n).padStart(4, "0")}`)) n += 1;
    return `TM-${String(n).padStart(4, "0")}`;
  }

  const priceFor = (unitPrice, adults, children) =>
    Math.round(
      unitPrice * adults + unitPrice * (1 - CHILD_DISCOUNT) * children,
    );

  function addBooking(data) {
    const booking = {
      ...data,
      ref: nextRef(),
      createdAt: new Date().toISOString(),
    };
    state.bookings.push(booking);
    save();
    return booking;
  }

  function setBookingStatus(ref, status) {
    const booking = state.bookings.find((b) => b.ref === ref);
    if (booking) booking.status = status;
    save();
    return booking;
  }

  function deleteBooking(ref) {
    state.bookings = state.bookings.filter((b) => b.ref !== ref);
    save();
  }

  function clearBookings() {
    state.bookings = [];
    save();
  }

  /* -------------------------------------------------------- last minute */

  /** Prezzo effettivo di vendita: listino oppure last minute attivo. */
  function effectivePrice(pkg, dep) {
    const lm = dep.lastMinute;
    return lm?.active && lm.price > 0 ? lm.price : pkg.price;
  }

  /**
   * Proposta last minute. Il pavimento è il costo del posto in più
   * (costo variabile) maggiorato del margine minimo: sotto quella soglia
   * ogni prenotazione peggiora i conti.
   */
  function lastMinute(pkg, dep) {
    const { variable } = costParts(pkg);
    // toFixed evita che 180 × 1,1 = 198,000000003 diventi 199.
    const floor = Math.ceil(
      Number((variable * (1 + MIN_SEAT_MARGIN)).toFixed(2)),
    );
    const days = daysBetween(todayIso(), dep.date);
    const free = seatsLeft(pkg, dep);
    const pax = seatsTaken(pkg.id, dep.date);
    const even = breakEven(pkg, pkg.price);
    const covered = even !== null && pax >= even;

    let discount = 0;
    let reason = "far";
    if (free === 0) reason = "full";
    else if (days > LAST_MINUTE_WINDOW) reason = "far";
    else {
      if (days <= 7) discount = 0.3;
      else if (days <= 15) discount = 0.2;
      else discount = 0.1;
      reason = covered ? "window" : "risk";
    }

    const price = Math.max(
      floor,
      Math.round((pkg.price * (1 - discount)) / 5) * 5,
    );
    return {
      days,
      free,
      floor,
      discount: Math.round(discount * 100),
      reason,
      price: discount > 0 ? price : pkg.price,
      offerable: free > 0 && days >= 0 && days <= LAST_MINUTE_WINDOW,
    };
  }

  function setLastMinute(packageId, date, { active, price }) {
    const pkg = findPackage(packageId);
    const dep = findDeparture(pkg, date);
    if (!dep) return null;
    dep.lastMinute = {
      active: Boolean(active),
      price: price === null || price === undefined ? null : Math.round(price),
    };
    save();
    return dep;
  }

  /* --------------------------------------------------- conto partenza */

  /** Conto economico di una singola partenza. */
  function departureStats(pkg, dep) {
    const bookings = activeBookings(pkg.id, dep.date);
    const pax = bookings.reduce((sum, b) => sum + travelersOf(b), 0);
    const revenue = bookings.reduce((sum, b) => sum + b.total, 0);
    const cost = pax > 0 ? costOf(pkg, pax) : 0;
    const price = effectivePrice(pkg, dep);
    const even = breakEven(pkg, price);
    const { variable } = costParts(pkg);

    // Quante persone mancano davvero: a partenza vuota vale il pareggio
    // teorico, altrimenti conta la differenza fra incassato e costi.
    let missing;
    if (pax === 0) missing = even;
    else if (revenue >= cost) missing = 0;
    else
      missing =
        price > variable
          ? Math.ceil((cost - revenue) / (price - variable))
          : null;

    return {
      pkg,
      dep,
      pax,
      seats: dep.seats,
      free: Math.max(0, dep.seats - pax),
      revenue,
      cost,
      margin: revenue - cost,
      marginPct: revenue > 0 ? ((revenue - cost) / revenue) * 100 : 0,
      breakEven: even,
      missing,
      days: daysBetween(todayIso(), dep.date),
      bookings,
    };
  }

  /** Tutte le partenze future, in ordine di data. */
  function upcomingDepartures() {
    const today = todayIso();
    return state.packages
      .flatMap((pkg) => pkg.departures.map((dep) => ({ pkg, dep })))
      .filter(({ dep }) => dep.date >= today)
      .sort((a, b) => a.dep.date.localeCompare(b.dep.date))
      .map(({ pkg, dep }) => departureStats(pkg, dep));
  }

  /* -------------------------------------------------------- contabilità */

  const settledOf = (id) => state.settled[id] ?? null;

  function settle(id, amount) {
    state.settled[id] = { at: todayIso(), amount };
    save();
  }

  function unsettle(id) {
    delete state.settled[id];
    save();
  }

  function decorate(movement) {
    const settled = settledOf(movement.id);
    return {
      ...movement,
      settled: Boolean(settled),
      settledAt: settled?.at ?? null,
      amount: settled ? settled.amount : movement.amount,
    };
  }

  /**
   * I movimenti nascono dai dati: acconto e saldo di ogni prenotazione,
   * costi dei fornitori di ogni partenza venduta, più le voci manuali.
   */
  function movements() {
    const list = [];

    state.bookings
      .filter((b) => b.status !== "cancelled")
      .forEach((b) => {
        const deposit = Math.round(b.total * DEPOSIT_SHARE);
        list.push({
          id: `in:${b.ref}:deposit`,
          kind: "in",
          category: "deposit",
          due: b.createdAt.slice(0, 10),
          labelKey: "acc.deposit",
          labelParams: { ref: b.ref },
          reference: b.ref,
          client: b.name,
          amount: deposit,
          source: "auto",
        });
        list.push({
          id: `in:${b.ref}:balance`,
          kind: "in",
          category: "balance",
          due: shiftDays(b.date, -BALANCE_DAYS),
          labelKey: "acc.balance",
          labelParams: { ref: b.ref },
          reference: b.ref,
          client: b.name,
          amount: b.total - deposit,
          source: "auto",
        });
      });

    state.packages.forEach((pkg) => {
      pkg.departures.forEach((dep) => {
        const pax = seatsTaken(pkg.id, dep.date);
        if (pax === 0) return;
        (pkg.costs ?? []).forEach((cost) => {
          const unit = Number(cost.amount) || 0;
          const amount = Math.round(
            cost.unit === "person"
              ? unit * pax
              : cost.unit === "personNight"
                ? unit * pax * pkg.nights
                : cost.unit === "night"
                  ? unit * pkg.nights
                  : unit,
          );
          if (amount === 0) return;
          list.push({
            id: `out:${pkg.id}:${dep.date}:${cost.id}`,
            kind: "out",
            category: cost.kind,
            due: shiftDays(dep.date, -SUPPLIER_DAYS),
            label: cost.label,
            supplier: cost.supplier,
            reference: dep.date,
            packageId: pkg.id,
            amount,
            source: "auto",
          });
        });
      });
    });

    state.manual.forEach((m) => list.push({ ...m, source: "manual" }));

    return list.map(decorate).sort((a, b) => a.due.localeCompare(b.due));
  }

  function addManual(entry) {
    state.manual.push({
      ...entry,
      id: `man:${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    });
    save();
  }

  function deleteManual(id) {
    state.manual = state.manual.filter((m) => m.id !== id);
    delete state.settled[id];
    save();
  }

  /** Totali di cassa e margine complessivo. */
  function accounts() {
    const list = movements();
    const sum = (kind, settled) =>
      list
        .filter((m) => m.kind === kind && m.settled === settled)
        .reduce((total, m) => total + m.amount, 0);

    const collected = sum("in", true);
    const toCollect = sum("in", false);
    const paid = sum("out", true);
    const toPay = sum("out", false);

    return {
      collected,
      toCollect,
      paid,
      toPay,
      cash: collected - paid,
      expected: collected + toCollect - (paid + toPay),
      overdue: list.filter((m) => !m.settled && m.due < todayIso()).length,
    };
  }

  /** Conto economico dei viaggi: ricavi, costi e margine per pacchetto. */
  function tripResults() {
    return state.packages
      .map((pkg) => {
        const stats = pkg.departures.map((dep) => departureStats(pkg, dep));
        const revenue = stats.reduce((sum, s) => sum + s.revenue, 0);
        const cost = stats.reduce((sum, s) => sum + s.cost, 0);
        const pax = stats.reduce((sum, s) => sum + s.pax, 0);
        return { pkg, revenue, cost, margin: revenue - cost, pax };
      })
      .filter((row) => row.pax > 0)
      .sort((a, b) => b.margin - a.margin);
  }

  return {
    CHILD_DISCOUNT,
    DEPOSIT_SHARE,
    state,
    init,
    save,
    readLang,
    saveLang,
    todayIso,
    daysBetween,
    shiftDays,
    findPackage,
    findDeparture,
    refPax,
    upsertPackage,
    deletePackage,
    newPackageId,
    costParts,
    costOf,
    costPerPerson,
    suggestedPrice,
    breakEven,
    activeBookings,
    travelersOf,
    seatsTaken,
    seatsLeft,
    openDepartures,
    priceFor,
    addBooking,
    setBookingStatus,
    deleteBooking,
    clearBookings,
    effectivePrice,
    lastMinute,
    setLastMinute,
    departureStats,
    upcomingDepartures,
    movements,
    settle,
    unsettle,
    addManual,
    deleteManual,
    accounts,
    tripResults,
  };
})();
