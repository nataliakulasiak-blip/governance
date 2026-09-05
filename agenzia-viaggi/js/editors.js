/** Le tre finestre di lavoro: prenotazione, scheda pacchetto, movimento manuale. */
const Editors = (() => {
  const { $, $$, esc, money, options, toast } = UI;

  /* ====================================================== prenotazione */

  let bookingPkg = null;

  /** Prezzo unitario della partenza scelta nel modulo. */
  function bookingUnitPrice() {
    const dep = Model.findDeparture(bookingPkg, $("#c-departure").value);
    return dep ? Model.effectivePrice(bookingPkg, dep) : bookingPkg.price;
  }

  function bookingPreview() {
    if (!bookingPkg) return;
    const adults = Number($("#c-adults").value) || 0;
    const children = Number($("#c-children").value) || 0;
    const unit = bookingUnitPrice();
    const detail = [];

    if (adults)
      detail.push(
        `${t("form.priceAdults", { n: adults })} — ${money(unit * adults)}`,
      );
    if (children)
      detail.push(
        `${t("form.priceChildren", { n: children })} — ${money(
          unit * (1 - Model.CHILD_DISCOUNT) * children,
        )}`,
      );
    if (unit < bookingPkg.price) detail.push(t("form.lastMinuteApplied"));

    $("#price-detail").innerHTML = detail
      .map((line) => `<span>${esc(line)}</span>`)
      .join("");
    $("#price-total").textContent = `${t("common.total")}: ${money(
      Model.priceFor(unit, adults, children),
    )}`;
  }

  function openBooking(packageId) {
    bookingPkg = Model.findPackage(packageId);
    if (!bookingPkg) return;

    const open = Model.openDepartures(bookingPkg);
    if (!open.length) return;

    $("#dlg-title").textContent = Views.titleOf(bookingPkg);
    $("#dlg-sub").textContent = `${t(`country.${bookingPkg.country}`)} · ${t(
      "catalog.nights",
      {
        n: bookingPkg.nights,
      },
    )} · ${money(bookingPkg.price)} ${t("common.perPerson")}`;

    $("#c-departure").innerHTML = open
      .map((d) => {
        const price = Model.effectivePrice(bookingPkg, d);
        const flag =
          price < bookingPkg.price ? ` · ${t("dep.lastMinute")}` : "";
        return `<option value="${d.date}">${esc(UI.longDate(d.date))} — ${esc(
          t("catalog.seats", { n: Model.seatsLeft(bookingPkg, d) }),
        )} — ${money(price)}${esc(flag)}</option>`;
      })
      .join("");

    $("#form-error").hidden = true;
    bookingPreview();
    $("#booking-dialog").showModal();
    $("#c-name").focus();
  }

  function submitBooking(event) {
    const error = $("#form-error");
    const fail = (message) => {
      event.preventDefault();
      error.textContent = message;
      error.hidden = false;
    };

    const adults = Number($("#c-adults").value) || 0;
    const children = Number($("#c-children").value) || 0;
    const date = $("#c-departure").value;
    const dep = Model.findDeparture(bookingPkg, date);

    if (adults + children < 1) return fail(t("form.errTravelers"));
    if (!dep || adults + children > Model.seatsLeft(bookingPkg, dep))
      return fail(t("form.errSeats"));

    const unit = Model.effectivePrice(bookingPkg, dep);
    const booking = Model.addBooking({
      packageId: bookingPkg.id,
      date,
      name: $("#c-name").value.trim(),
      email: $("#c-email").value.trim(),
      phone: $("#c-phone").value.trim(),
      notes: $("#c-notes").value.trim(),
      adults,
      children,
      unitPrice: unit,
      total: Model.priceFor(unit, adults, children),
      status: "pending",
    });

    Views.all();
    toast(t("toast.created", { ref: booking.ref }));
    $("#booking-form").reset();
    return undefined;
  }

  /* ==================================================== scheda pacchetto */

  let draft = null;

  const uid = (prefix) =>
    `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;

  function emptyPackage() {
    return {
      id: Model.newPackageId(),
      title: { it: "", pl: "", en: "" },
      desc: { it: "", pl: "", en: "" },
      country: "IT",
      category: "sea",
      nights: 7,
      groupSize: GROUP_SIZE,
      refPax: Math.round(GROUP_SIZE * 0.8),
      markup: DEFAULT_MARKUP,
      price: 0,
      published: false,
      emoji: "🌍",
      hue: Math.floor(Math.random() * 360),
      rating: 4.5,
      popularity: 50,
      costs: [],
      departures: [],
    };
  }

  function costRow(cost) {
    return `
      <div class="cost-row" data-cost="${esc(cost.id)}">
        <select data-field="kind">
          ${options(COST_KINDS, (k) => t(`kind.${k}`), cost.kind)}
        </select>
        <input data-field="label" value="${esc(cost.label)}"
               placeholder="${esc(t("pkg.costLabel"))}" />
        <input data-field="supplier" value="${esc(cost.supplier)}"
               placeholder="${esc(t("pkg.costSupplier"))}" />
        <input data-field="amount" type="number" min="0" step="1" value="${cost.amount}"
               aria-label="${esc(t("pkg.costAmount"))}" />
        <select data-field="unit">
          ${options(COST_UNITS, (u) => t(`unit.${u}`), cost.unit)}
        </select>
        <button type="button" class="icon-btn" data-drop-cost="${esc(cost.id)}"
                aria-label="${esc(t("common.delete"))}">×</button>
      </div>`;
  }

  function departureRow(dep) {
    return `
      <div class="cost-row narrow" data-departure="${esc(dep.id)}">
        <input data-field="date" type="date" value="${esc(dep.date)}"
               aria-label="${esc(t("form.departure"))}" />
        <input data-field="seats" type="number" min="1" max="60" value="${dep.seats}"
               aria-label="${esc(t("pkg.seats"))}" />
        <span class="hint">${esc(t("pkg.seats"))}</span>
        <button type="button" class="icon-btn" data-drop-departure="${esc(dep.id)}"
                aria-label="${esc(t("common.delete"))}">×</button>
      </div>`;
  }

  function renderCosts() {
    $("#p-costs").innerHTML = draft.costs.map(costRow).join("");
    $("#p-costs-empty").hidden = draft.costs.length > 0;
  }

  function renderDepartures() {
    const sorted = draft.departures
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date));
    $("#p-departures").innerHTML = sorted.map(departureRow).join("");
    $("#p-departures-empty").hidden = draft.departures.length > 0;
  }

  function renderFigures() {
    const { fixed, variable } = Model.costParts(draft);
    const pax = Model.refPax(draft);
    const cost = Model.costPerPerson(draft, pax);
    const suggested = Model.suggestedPrice(draft);
    const margin = draft.price - cost;
    const even = Model.breakEven(draft, draft.price);

    $("#p-markup-out").textContent =
      `${Math.round((draft.markup ?? 0) * 100)}%`;
    $("#p-figures").innerHTML = [
      { label: t("pkg.fixedCost"), value: money(fixed) },
      { label: t("pkg.variableCost"), value: money(variable) },
      { label: t("pkg.costPerPerson"), value: money(cost) },
      { label: t("pkg.suggested"), value: money(suggested) },
      {
        label: t("pkg.marginPerPerson"),
        value: money(margin),
        tone: margin < 0 ? "bad" : "good",
      },
      {
        label: t("pkg.breakEven"),
        value:
          even === null
            ? t("pkg.breakEvenNever")
            : t("pkg.breakEvenPax", { n: even }),
        tone: even === null ? "bad" : "",
      },
    ]
      .map(
        (f) => `<div class="figure">
          <span class="muted">${esc(f.label)}</span>
          <strong class="${f.tone ?? ""}">${esc(f.value)}</strong>
        </div>`,
      )
      .join("");
  }

  function renderLangs() {
    $("#p-langs").innerHTML = LANGS.map(
      (lang) => `
      <div class="lang-col">
        <p class="lang-name">${lang.toUpperCase()}</p>
        <input data-lang-title="${lang}" value="${esc(draft.title[lang] ?? "")}"
               placeholder="${esc(t("pkg.name"))}" />
        <input data-lang-desc="${lang}" value="${esc(draft.desc[lang] ?? "")}"
               placeholder="${esc(t("pkg.description"))}" />
      </div>`,
    ).join("");
  }

  function openPackage(packageId) {
    const existing = Model.findPackage(packageId);
    draft = existing
      ? JSON.parse(JSON.stringify(existing))
      : { ...emptyPackage(), id: Model.newPackageId() };
    draft.refPax = Model.refPax(draft);

    $("#p-country").innerHTML = options(
      Object.keys(STRINGS)
        .filter((k) => k.startsWith("country."))
        .map((k) => k.slice(8)),
      (c) => t(`country.${c}`),
      draft.country,
    );
    $("#p-category").innerHTML = options(
      CATEGORIES,
      (c) => t(`cat.${c}`),
      draft.category,
    );

    $("#p-name").value = draft.title[currentLang] ?? "";
    $("#p-desc").value = draft.desc[currentLang] ?? "";
    $("#p-nights").value = draft.nights;
    $("#p-group").value = draft.groupSize;
    $("#p-refpax").value = draft.refPax;
    $("#p-markup").value = Math.round((draft.markup ?? 0) * 100);
    $("#p-price").value = draft.price;
    $("#p-published").checked = Boolean(draft.published);
    $("#p-error").hidden = true;

    renderLangs();
    renderCosts();
    renderDepartures();
    renderFigures();
    $("#package-dialog").showModal();
    $("#p-name").focus();
  }

  /** Legge i campi fissi del modulo dentro la bozza. */
  function syncDraft() {
    if (!draft) return;
    // Prima le traduzioni, poi i campi principali: quello che l'operatore
    // scrive in alto vince sulla casella della lingua attiva.
    $$("#p-langs [data-lang-title]").forEach((input) => {
      draft.title[input.dataset.langTitle] = input.value.trim();
    });
    $$("#p-langs [data-lang-desc]").forEach((input) => {
      draft.desc[input.dataset.langDesc] = input.value.trim();
    });

    draft.title[currentLang] = $("#p-name").value.trim();
    draft.desc[currentLang] = $("#p-desc").value.trim();
    const mirrorTitle = $(`#p-langs [data-lang-title="${currentLang}"]`);
    const mirrorDesc = $(`#p-langs [data-lang-desc="${currentLang}"]`);
    if (mirrorTitle) mirrorTitle.value = draft.title[currentLang];
    if (mirrorDesc) mirrorDesc.value = draft.desc[currentLang];

    draft.country = $("#p-country").value;
    draft.category = $("#p-category").value;
    draft.nights = Math.max(1, Number($("#p-nights").value) || 1);
    draft.groupSize = Math.max(1, Number($("#p-group").value) || 1);
    draft.refPax = Math.max(1, Number($("#p-refpax").value) || 1);
    draft.markup = (Number($("#p-markup").value) || 0) / 100;
    draft.price = Math.max(0, Number($("#p-price").value) || 0);
    draft.published = $("#p-published").checked;

    $$("#p-costs .cost-row").forEach((row) => {
      const cost = draft.costs.find((c) => c.id === row.dataset.cost);
      if (!cost) return;
      cost.kind = $("[data-field=kind]", row).value;
      cost.label = $("[data-field=label]", row).value.trim();
      cost.supplier = $("[data-field=supplier]", row).value.trim();
      cost.amount = Math.max(
        0,
        Number($("[data-field=amount]", row).value) || 0,
      );
      cost.unit = $("[data-field=unit]", row).value;
    });

    $$("#p-departures .cost-row").forEach((row) => {
      const dep = draft.departures.find((d) => d.id === row.dataset.departure);
      if (!dep) return;
      dep.date = $("[data-field=date]", row).value || dep.date;
      dep.seats = Math.max(1, Number($("[data-field=seats]", row).value) || 1);
    });
  }

  function addCost() {
    syncDraft();
    draft.costs.push({
      id: uid("c"),
      kind: "hotel",
      label: "",
      supplier: "",
      amount: 0,
      unit: "person",
    });
    renderCosts();
    renderFigures();
  }

  function dropCost(id) {
    syncDraft();
    draft.costs = draft.costs.filter((c) => c.id !== id);
    renderCosts();
    renderFigures();
  }

  function addDeparture() {
    syncDraft();
    const last = draft.departures
      .map((d) => d.date)
      .sort()
      .pop();
    const base = last && last > Model.todayIso() ? last : Model.todayIso();
    draft.departures.push({
      id: uid("d"),
      date: Model.shiftDays(base, 28),
      seats: draft.groupSize,
      lastMinute: { active: false, price: null },
    });
    renderDepartures();
  }

  function dropDeparture(id) {
    syncDraft();
    const dep = draft.departures.find((d) => d.id === id);
    if (dep && Model.seatsTaken(draft.id, dep.date) > 0) {
      toast(t("pkg.departureUsed"));
      return;
    }
    draft.departures = draft.departures.filter((d) => d.id !== id);
    renderDepartures();
  }

  function useSuggested() {
    syncDraft();
    draft.price = Model.suggestedPrice(draft);
    $("#p-price").value = draft.price;
    renderFigures();
  }

  function submitPackage(event) {
    syncDraft();
    const name = draft.title[currentLang];
    if (!name) {
      event.preventDefault();
      $("#p-error").textContent = t("pkg.errName");
      $("#p-error").hidden = false;
      return;
    }

    // Le lingue lasciate vuote ricadono sul nome inserito.
    LANGS.forEach((lang) => {
      if (!draft.title[lang]) draft.title[lang] = name;
      if (!draft.desc[lang]) draft.desc[lang] = draft.desc[currentLang] ?? "";
    });
    if (!draft.departures.length) draft.published = false;

    Model.upsertPackage(draft);
    Views.all();
    toast(t("pkg.saved"));
  }

  function duplicatePackage(id) {
    const source = Model.findPackage(id);
    if (!source) return;
    const copy = JSON.parse(JSON.stringify(source));
    copy.id = Model.newPackageId();
    copy.published = false;
    LANGS.forEach((lang) => {
      copy.title[lang] = `${copy.title[lang]} ${t("pkg.copySuffix")}`;
    });
    copy.costs = copy.costs.map((c) => ({ ...c, id: uid("c") }));
    copy.departures = copy.departures.map((d) => ({
      ...d,
      id: uid("d"),
      lastMinute: { active: false, price: null },
    }));
    Model.upsertPackage(copy);
    Views.all();
    toast(t("pkg.saved"));
  }

  /* ================================================== movimento manuale */

  function openManual() {
    $("#m-due").value = Model.todayIso();
    $("#m-category").innerHTML = options(
      MOVEMENT_KINDS,
      (k) => t(`kind.${k}`),
      "general",
    );
    $("#m-error").hidden = true;
    $("#manual-dialog").showModal();
    $("#m-label").focus();
  }

  function submitManual(event) {
    const amount = Number($("#m-amount").value);
    if (!Number.isFinite(amount) || amount <= 0) {
      event.preventDefault();
      $("#m-error").textContent = t("acc.errAmount");
      $("#m-error").hidden = false;
      return;
    }

    Model.addManual({
      kind: $("#m-kind").value,
      due: $("#m-due").value || Model.todayIso(),
      category: $("#m-category").value,
      label: $("#m-label").value.trim(),
      amount: Math.round(amount),
    });

    Views.all();
    toast(t("toast.saved"));
    $("#manual-form").reset();
  }

  /** Ridisegna le parti dinamiche delle finestre aperte (cambio lingua). */
  function refresh() {
    if ($("#booking-dialog").open && bookingPkg) {
      const chosen = $("#c-departure").value;
      const open = Model.openDepartures(bookingPkg);
      $("#dlg-sub").textContent = `${t(`country.${bookingPkg.country}`)} · ${t(
        "catalog.nights",
        {
          n: bookingPkg.nights,
        },
      )} · ${money(bookingPkg.price)} ${t("common.perPerson")}`;
      $("#c-departure").innerHTML = open
        .map((d) => {
          const price = Model.effectivePrice(bookingPkg, d);
          const flag =
            price < bookingPkg.price ? ` · ${t("dep.lastMinute")}` : "";
          return `<option value="${d.date}"${d.date === chosen ? " selected" : ""}>${esc(
            UI.longDate(d.date),
          )} — ${esc(t("catalog.seats", { n: Model.seatsLeft(bookingPkg, d) }))} — ${money(
            price,
          )}${esc(flag)}</option>`;
        })
        .join("");
      bookingPreview();
    }

    if ($("#package-dialog").open && draft) {
      syncDraft();
      $("#p-country").innerHTML = options(
        Object.keys(STRINGS)
          .filter((k) => k.startsWith("country."))
          .map((k) => k.slice(8)),
        (c) => t(`country.${c}`),
        draft.country,
      );
      $("#p-category").innerHTML = options(
        CATEGORIES,
        (c) => t(`cat.${c}`),
        draft.category,
      );
      $("#p-name").value = draft.title[currentLang] ?? "";
      $("#p-desc").value = draft.desc[currentLang] ?? "";
      renderLangs();
      renderCosts();
      renderDepartures();
      renderFigures();
    }

    if ($("#manual-dialog").open) {
      const chosen = $("#m-category").value;
      $("#m-category").innerHTML = options(
        MOVEMENT_KINDS,
        (k) => t(`kind.${k}`),
        chosen,
      );
    }
  }

  return {
    refresh,
    openBooking,
    bookingPreview,
    submitBooking,
    openPackage,
    syncDraft,
    renderFigures,
    addCost,
    dropCost,
    addDeparture,
    dropDeparture,
    useSuggested,
    submitPackage,
    duplicatePackage,
    openManual,
    submitManual,
  };
})();
