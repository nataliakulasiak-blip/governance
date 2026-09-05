/**
 * Logica dell'applicazione: catalogo, prenotazioni, riepilogo.
 * Nessuna dipendenza esterna; i dati restano in localStorage.
 */
(() => {
  const STORE_BOOKINGS = "tremari.bookings.v1";
  const STORE_LANG = "tremari.lang";
  const CHILD_DISCOUNT = 0.3;

  const packages = buildPackages();
  const byId = new Map(packages.map((p) => [p.id, p]));

  let bookings = load(STORE_BOOKINGS, []);
  let currentPackage = null;

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  /* ---------------------------------------------------------- utilità */

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota o storage disabilitato: l'app resta usabile in memoria */
    }
  }

  function money(amount) {
    return new Intl.NumberFormat(locale(), {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function longDate(iso) {
    return new Intl.DateTimeFormat(locale(), {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${iso}T00:00:00`));
  }

  function shortDate(iso) {
    return new Intl.DateTimeFormat(locale(), { dateStyle: "medium" }).format(
      new Date(`${iso}T00:00:00`),
    );
  }

  function esc(text) {
    return String(text).replace(
      /[&<>"']/g,
      (ch) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[ch],
    );
  }

  function nextRef() {
    const used = new Set(bookings.map((b) => b.ref));
    let n = bookings.length + 1;
    while (used.has(`TM-${String(n).padStart(4, "0")}`)) n += 1;
    return `TM-${String(n).padStart(4, "0")}`;
  }

  function travelersOf(booking) {
    return booking.adults + booking.children;
  }

  /** Posti già impegnati su una partenza (le prenotazioni annullate liberano il posto). */
  function seatsTaken(packageId, date, exceptRef = null) {
    return bookings
      .filter(
        (b) =>
          b.packageId === packageId &&
          b.date === date &&
          b.status !== "cancelled" &&
          b.ref !== exceptRef,
      )
      .reduce((sum, b) => sum + travelersOf(b), 0);
  }

  function seatsLeft(pkg, departure) {
    return Math.max(0, departure.seats - seatsTaken(pkg.id, departure.date));
  }

  function openDepartures(pkg) {
    return pkg.departures.filter((d) => seatsLeft(pkg, d) > 0);
  }

  function priceFor(pkg, adults, children) {
    return Math.round(
      pkg.price * adults + pkg.price * (1 - CHILD_DISCOUNT) * children,
    );
  }

  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      el.hidden = true;
    }, 3200);
  }

  /* ---------------------------------------------------------- catalogo */

  function readFilters() {
    return {
      query: $("#f-search").value.trim().toLowerCase(),
      country: $("#f-country").value,
      category: $("#f-category").value,
      maxPrice: Number($("#f-price").value),
      sort: $("#f-sort").value,
    };
  }

  function filteredPackages() {
    const f = readFilters();
    const result = packages.filter((pkg) => {
      if (f.country !== "all" && pkg.country !== f.country) return false;
      if (f.category !== "all" && pkg.category !== f.category) return false;
      if (pkg.price > f.maxPrice) return false;
      if (!f.query) return true;
      const haystack = [
        ...LANGS.map((l) => pkg.title[l]),
        ...LANGS.map((l) => pkg.desc[l]),
        t(`country.${pkg.country}`),
        t(`cat.${pkg.category}`),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(f.query);
    });

    const sorters = {
      popular: (a, b) => b.popularity - a.popularity,
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
      duration: (a, b) => a.nights - b.nights,
    };
    return result.sort(sorters[f.sort] ?? sorters.popular);
  }

  function renderCatalog() {
    const list = filteredPackages();
    const grid = $("#catalog-grid");

    $("#results-count").textContent = t("catalog.results", { n: list.length });
    $("#catalog-empty").hidden = list.length > 0;
    $("#f-price-out").textContent = money(Number($("#f-price").value));

    grid.innerHTML = list
      .map((pkg) => {
        const open = openDepartures(pkg);
        const next = open[0];
        const free = next ? seatsLeft(pkg, next) : 0;
        const soldOut = !next;

        return `
          <article class="card${soldOut ? " is-soldout" : ""}">
            <div class="card-hero" style="--hue:${pkg.hue}">
              <span class="hero-emoji">${pkg.emoji}</span>
              <span class="badge">${esc(t(`cat.${pkg.category}`))}</span>
            </div>
            <div class="card-body">
              <p class="card-place">${esc(t(`country.${pkg.country}`))}</p>
              <h3>${esc(pkg.title[currentLang])}</h3>
              <p class="card-desc">${esc(pkg.desc[currentLang])}</p>
              <ul class="card-meta">
                <li>🌙 ${esc(t("catalog.nights", { n: pkg.nights }))}</li>
                <li>⭐ ${pkg.rating.toFixed(1)}</li>
                <li>${
                  soldOut
                    ? `🚫 ${esc(t("catalog.soldOut"))}`
                    : `🎟️ ${esc(t("catalog.seats", { n: free }))}`
                }</li>
              </ul>
              ${
                next
                  ? `<p class="card-next">${esc(t("catalog.nextDeparture"))}: <strong>${esc(
                      shortDate(next.date),
                    )}</strong></p>`
                  : ""
              }
            </div>
            <footer class="card-foot">
              <p class="price">${money(pkg.price)}<span>${esc(t("catalog.perPerson"))}</span></p>
              <button class="btn primary" data-book="${pkg.id}"${soldOut ? " disabled" : ""}>
                ${esc(soldOut ? t("catalog.soldOut") : t("catalog.book"))}
              </button>
            </footer>
          </article>`;
      })
      .join("");
  }

  /* ------------------------------------------------------ prenotazioni */

  function renderBookings() {
    const filter = $("#b-status").value;
    const rows = bookings
      .filter((b) => filter === "all" || b.status === filter)
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    $("#bookings-empty").hidden = rows.length > 0;
    $("#bookings-table").hidden = rows.length === 0;

    $("#bookings-body").innerHTML = rows
      .map((b) => {
        const pkg = byId.get(b.packageId);
        const title = pkg ? pkg.title[currentLang] : b.packageId;
        return `
          <tr>
            <td class="mono">${esc(b.ref)}</td>
            <td>
              <strong>${esc(b.name)}</strong>
              <span class="muted">${esc(b.email)}</span>
              ${b.notes ? `<span class="muted">✎ ${esc(b.notes)}</span>` : ""}
            </td>
            <td>${esc(title)}</td>
            <td>${esc(shortDate(b.date))}</td>
            <td class="num">${b.adults} + ${b.children}</td>
            <td class="num">${money(b.total)}</td>
            <td><span class="pill ${b.status}">${esc(t(`status.${b.status}`))}</span></td>
            <td class="actions">
              ${
                b.status !== "confirmed"
                  ? `<button class="link" data-set="confirmed" data-ref="${esc(b.ref)}">${esc(
                      t("bookings.confirm"),
                    )}</button>`
                  : ""
              }
              ${
                b.status !== "cancelled"
                  ? `<button class="link" data-set="cancelled" data-ref="${esc(b.ref)}">${esc(
                      t("bookings.cancel"),
                    )}</button>`
                  : ""
              }
              <button class="link danger" data-del="${esc(b.ref)}">${esc(t("bookings.delete"))}</button>
            </td>
          </tr>`;
      })
      .join("");
  }

  function setStatus(ref, status) {
    const booking = bookings.find((b) => b.ref === ref);
    if (!booking) return;

    if (status === "confirmed") {
      const pkg = byId.get(booking.packageId);
      const dep = pkg?.departures.find((d) => d.date === booking.date);
      const free = dep
        ? dep.seats - seatsTaken(pkg.id, booking.date, booking.ref)
        : 0;
      if (dep && travelersOf(booking) > free) {
        toast(t("form.errSeats"));
        return;
      }
    }

    booking.status = status;
    persistAndRender(t("toast.updated", { ref }));
  }

  function deleteBooking(ref) {
    if (!confirm(t("bookings.askDelete", { ref }))) return;
    bookings = bookings.filter((b) => b.ref !== ref);
    persistAndRender(t("toast.deleted", { ref }));
  }

  function exportCsv() {
    const header = [
      t("bookings.ref"),
      t("bookings.client"),
      t("form.email"),
      t("form.phone"),
      t("bookings.trip"),
      t("bookings.departure"),
      t("form.adults"),
      t("form.children"),
      t("bookings.total"),
      t("bookings.status"),
      t("form.notes"),
    ];

    const cell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const lines = [header.map(cell).join(";")];

    bookings.forEach((b) => {
      const pkg = byId.get(b.packageId);
      lines.push(
        [
          b.ref,
          b.name,
          b.email,
          b.phone,
          pkg ? pkg.title[currentLang] : b.packageId,
          b.date,
          b.adults,
          b.children,
          b.total,
          t(`status.${b.status}`),
          b.notes,
        ]
          .map(cell)
          .join(";"),
      );
    });

    // BOM: Excel apre così il CSV in UTF-8 senza rovinare gli accenti.
    const csv = `﻿${lines.join("\r\n")}`;
    const name = `prenotazioni-${new Date().toISOString().slice(0, 10)}.csv`;
    saveFile(name, csv);
  }

  /* Scarica il file generato. Sostituito dal build a file singolo quando
     la pagina gira in un visualizzatore che intercetta i download. */
  function saveFile(filename, text) {
    const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast(t("toast.exported"));
  }

  /* --------------------------------------------------------- riepilogo */

  function renderDashboard() {
    const active = bookings.filter((b) => b.status !== "cancelled");
    const confirmed = bookings.filter((b) => b.status === "confirmed");
    const revenue = confirmed.reduce((sum, b) => sum + b.total, 0);
    const travelers = active.reduce((sum, b) => sum + travelersOf(b), 0);
    const average = confirmed.length
      ? Math.round(revenue / confirmed.length)
      : 0;

    $("#dashboard-empty").hidden = bookings.length > 0;

    $("#stats").innerHTML = [
      { label: t("dashboard.bookings"), value: bookings.length },
      { label: t("dashboard.travelers"), value: travelers },
      { label: t("dashboard.revenue"), value: money(revenue) },
      { label: t("dashboard.average"), value: money(average) },
    ]
      .map(
        (s) => `<div class="stat"><p class="stat-value">${esc(s.value)}</p>
                <p class="stat-label">${esc(s.label)}</p></div>`,
      )
      .join("");

    const counts = new Map();
    active.forEach((b) =>
      counts.set(b.packageId, (counts.get(b.packageId) ?? 0) + 1),
    );
    const ranked = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
    const max = ranked.length ? ranked[0][1] : 1;

    $("#bars").innerHTML = ranked
      .map(([id, count]) => {
        const pkg = byId.get(id);
        return `
          <div class="bar-row">
            <span class="bar-label">${esc(pkg ? pkg.title[currentLang] : id)}</span>
            <span class="bar"><span class="bar-fill" style="width:${(count / max) * 100}%"></span></span>
            <span class="bar-value">${count}</span>
          </div>`;
      })
      .join("");
  }

  /* ------------------------------------------------------------ modale */

  function updatePricePreview() {
    if (!currentPackage) return;
    const adults = Number($("#c-adults").value) || 0;
    const children = Number($("#c-children").value) || 0;
    const total = priceFor(currentPackage, adults, children);

    const detail = [];
    if (adults)
      detail.push(
        `${t("form.priceAdults", { n: adults })} — ${money(currentPackage.price * adults)}`,
      );
    if (children)
      detail.push(
        `${t("form.priceChildren", { n: children })} — ${money(
          Math.round(currentPackage.price * (1 - CHILD_DISCOUNT) * children),
        )}`,
      );

    $("#price-detail").innerHTML = detail
      .map((line) => `<span>${esc(line)}</span>`)
      .join("");
    $("#price-total").textContent = `${t("form.total")}: ${money(total)}`;
  }

  function openDialog(packageId) {
    currentPackage = byId.get(packageId);
    if (!currentPackage) return;

    $("#dlg-title").textContent = currentPackage.title[currentLang];
    $("#dlg-sub").textContent =
      `${t(`country.${currentPackage.country}`)} · ${t("catalog.nights", {
        n: currentPackage.nights,
      })} · ${money(currentPackage.price)} ${t("catalog.perPerson")}`;

    $("#c-departure").innerHTML = openDepartures(currentPackage)
      .map(
        (d) =>
          `<option value="${d.date}">${esc(longDate(d.date))} — ${esc(
            t("catalog.seats", { n: seatsLeft(currentPackage, d) }),
          )}</option>`,
      )
      .join("");

    $("#form-error").hidden = true;
    updatePricePreview();
    $("#booking-dialog").showModal();
    $("#c-name").focus();
  }

  function submitBooking(event) {
    const adults = Number($("#c-adults").value) || 0;
    const children = Number($("#c-children").value) || 0;
    const date = $("#c-departure").value;
    const departure = currentPackage.departures.find((d) => d.date === date);
    const error = $("#form-error");

    const fail = (message) => {
      event.preventDefault();
      error.textContent = message;
      error.hidden = false;
    };

    if (adults + children < 1) return fail(t("form.errTravelers"));
    if (!departure || adults + children > seatsLeft(currentPackage, departure))
      return fail(t("form.errSeats"));

    const booking = {
      ref: nextRef(),
      packageId: currentPackage.id,
      name: $("#c-name").value.trim(),
      email: $("#c-email").value.trim(),
      phone: $("#c-phone").value.trim(),
      notes: $("#c-notes").value.trim(),
      date,
      adults,
      children,
      total: priceFor(currentPackage, adults, children),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    bookings.push(booking);
    persistAndRender(t("toast.created", { ref: booking.ref }));
    $("#booking-form").reset();
    return undefined;
  }

  /* ------------------------------------------------------------- viste */

  function showView(name) {
    $$(".tab").forEach((tab) =>
      tab.classList.toggle("is-active", tab.dataset.view === name),
    );
    $$(".view").forEach((view) => {
      view.hidden = view.id !== `view-${name}`;
    });
  }

  function persistAndRender(message) {
    save(STORE_BOOKINGS, bookings);
    renderCatalog();
    renderBookings();
    renderDashboard();
    if (message) toast(message);
  }

  function fillSelects() {
    const countries = Array.from(new Set(packages.map((p) => p.country))).sort(
      (a, b) => t(`country.${a}`).localeCompare(t(`country.${b}`), locale()),
    );

    $("#f-country").innerHTML =
      `<option value="all">${esc(t("filters.allCountries"))}</option>` +
      countries
        .map((c) => `<option value="${c}">${esc(t(`country.${c}`))}</option>`)
        .join("");

    $("#f-category").innerHTML =
      `<option value="all">${esc(t("filters.allCategories"))}</option>` +
      CATEGORIES.map(
        (c) => `<option value="${c}">${esc(t(`cat.${c}`))}</option>`,
      ).join("");
  }

  function applyLanguage(lang) {
    const country = $("#f-country").value;
    const category = $("#f-category").value;

    setLang(lang);
    save(STORE_LANG, lang);
    translateDom();
    fillSelects();

    $("#f-country").value = country || "all";
    $("#f-category").value = category || "all";

    renderCatalog();
    renderBookings();
    renderDashboard();
    if (currentPackage && $("#booking-dialog").open)
      openDialog(currentPackage.id);
  }

  /* -------------------------------------------------------------- init */

  function bindEvents() {
    $("#lang-select").addEventListener("change", (e) =>
      applyLanguage(e.target.value),
    );

    $("#tabs").addEventListener("click", (e) => {
      const tab = e.target.closest(".tab");
      if (tab) showView(tab.dataset.view);
    });

    $("#filters").addEventListener("input", renderCatalog);
    $("#filters").addEventListener("reset", () => setTimeout(renderCatalog));

    $("#catalog-grid").addEventListener("click", (e) => {
      const button = e.target.closest("[data-book]");
      if (button) openDialog(button.dataset.book);
    });

    $("#b-status").addEventListener("change", renderBookings);
    $("#btn-export").addEventListener("click", exportCsv);
    $("#btn-clear").addEventListener("click", () => {
      if (!bookings.length || !confirm(t("bookings.askClear"))) return;
      bookings = [];
      persistAndRender();
    });

    $("#bookings-body").addEventListener("click", (e) => {
      const status = e.target.closest("[data-set]");
      if (status) return setStatus(status.dataset.ref, status.dataset.set);
      const del = e.target.closest("[data-del]");
      if (del) deleteBooking(del.dataset.del);
      return undefined;
    });

    ["#c-adults", "#c-children"].forEach((sel) =>
      $(sel).addEventListener("input", updatePricePreview),
    );

    $("#booking-form").addEventListener("submit", submitBooking);
    $("#dlg-close").addEventListener("click", () =>
      $("#booking-dialog").close(),
    );
    $("#dlg-cancel").addEventListener("click", () =>
      $("#booking-dialog").close(),
    );
  }

  function init() {
    const stored = load(STORE_LANG, null);
    const preferred =
      stored ||
      LANGS.find((l) => navigator.language?.toLowerCase().startsWith(l)) ||
      "it";

    $("#lang-select").value = preferred;
    bindEvents();
    applyLanguage(preferred);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
