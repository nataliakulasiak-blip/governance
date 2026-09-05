/** Disegno delle sei viste. Nessuna vista modifica i dati: quello sta in app.js. */
const Views = (() => {
  const { $, esc, money, percent, shortDate, relativeDays } = UI;

  const titleOf = (pkg) => pkg.title[currentLang] ?? pkg.title.it;
  const descOf = (pkg) => pkg.desc[currentLang] ?? pkg.desc.it ?? "";

  /* ---------------------------------------------------------- catalogo */

  /** Prezzo esposto in catalogo: last minute della prima partenza utile. */
  function shopPrice(pkg) {
    const next = Model.openDepartures(pkg)[0] ?? null;
    const price = next ? Model.effectivePrice(pkg, next) : pkg.price;
    const discount =
      price < pkg.price ? Math.round((1 - price / pkg.price) * 100) : 0;
    return { next, price, discount };
  }

  function readFilters() {
    return {
      query: $("#f-search").value.trim().toLowerCase(),
      country: $("#f-country").value,
      category: $("#f-category").value,
      maxPrice: Number($("#f-price").value),
      sort: $("#f-sort").value,
    };
  }

  function catalogList() {
    const f = readFilters();
    const sorters = {
      popular: (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0),
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
      duration: (a, b) => a.nights - b.nights,
    };

    return Model.state.packages
      .filter((pkg) => {
        if (!pkg.published) return false;
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
      })
      .sort(sorters[f.sort] ?? sorters.popular);
  }

  function catalog() {
    const list = catalogList();
    $("#results-count").textContent = t("catalog.results", { n: list.length });
    $("#catalog-empty").hidden = list.length > 0;
    $("#f-price-out").textContent = money(Number($("#f-price").value));

    $("#catalog-grid").innerHTML = list
      .map((pkg) => {
        const { next, price, discount } = shopPrice(pkg);
        const free = next ? Model.seatsLeft(pkg, next) : 0;

        return `
          <article class="card${next ? "" : " is-soldout"}">
            <div class="card-hero" style="--hue:${pkg.hue ?? 200}">
              <span class="hero-emoji">${pkg.emoji ?? "🌍"}</span>
              <span class="badge">${esc(t(`cat.${pkg.category}`))}</span>
              ${
                discount > 0
                  ? `<span class="badge flash">${esc(t("dep.lastMinute"))} −${discount}%</span>`
                  : ""
              }
            </div>
            <div class="card-body">
              <p class="card-place">${esc(t(`country.${pkg.country}`))}</p>
              <h3>${esc(titleOf(pkg))}</h3>
              <p class="card-desc">${esc(descOf(pkg))}</p>
              <ul class="card-meta">
                <li>🌙 ${esc(t("catalog.nights", { n: pkg.nights }))}</li>
                <li>⭐ ${(pkg.rating ?? 4.5).toFixed(1)}</li>
                <li>${
                  next
                    ? `🎟️ ${esc(t("catalog.seats", { n: free }))}`
                    : `🚫 ${esc(t("catalog.soldOut"))}`
                }</li>
              </ul>
              ${
                next
                  ? `<p class="card-next">${esc(t("catalog.nextDeparture"))}:
                     <strong>${esc(shortDate(next.date))}</strong></p>`
                  : ""
              }
            </div>
            <footer class="card-foot">
              <p class="price">
                ${discount > 0 ? `<s>${money(pkg.price)}</s> ` : ""}${money(price)}
                <span>${esc(t("common.perPerson"))}</span>
              </p>
              <button class="btn primary" data-book="${esc(pkg.id)}"${next ? "" : " disabled"}>
                ${esc(next ? t("catalog.book") : t("catalog.soldOut"))}
              </button>
            </footer>
          </article>`;
      })
      .join("");
  }

  /* --------------------------------------------------------- pacchetti */

  function packages() {
    const list = Model.state.packages;
    $("#packages-empty").hidden = list.length > 0;
    $("#packages-table").hidden = list.length === 0;

    $("#packages-body").innerHTML = list
      .map((pkg) => {
        const pax = Model.refPax(pkg);
        const cost = Model.costPerPerson(pkg, pax);
        const margin = pkg.price - cost;
        const even = Model.breakEven(pkg, pkg.price);
        const future = pkg.departures.filter(
          (d) => d.date >= Model.todayIso(),
        ).length;

        return `
          <tr>
            <td>
              <strong>${esc(titleOf(pkg))}</strong>
              <span class="muted">${esc(t(`country.${pkg.country}`))} ·
                ${esc(t("catalog.nights", { n: pkg.nights }))} ·
                ${esc(t("pkg.groupSize"))} ${pkg.groupSize}</span>
            </td>
            <td class="num">${money(pkg.price)}</td>
            <td class="num">${money(cost)}</td>
            <td class="num ${margin < 0 ? "bad" : "good"}">
              ${money(margin)}
              <span class="muted">${pkg.price > 0 ? percent((margin / pkg.price) * 100) : "—"}</span>
            </td>
            <td class="num">${even === null ? "—" : even}</td>
            <td class="num">${future}</td>
            <td>
              <span class="pill ${pkg.published ? "confirmed" : "pending"}">
                ${esc(pkg.published ? t("pkg.published") : t("pkg.draft"))}
              </span>
            </td>
            <td class="actions">
              <button class="link" data-edit-pkg="${esc(pkg.id)}">${esc(t("common.edit"))}</button>
              <button class="link" data-copy-pkg="${esc(pkg.id)}">${esc(t("common.duplicate"))}</button>
              <button class="link danger" data-del-pkg="${esc(pkg.id)}">${esc(t("common.delete"))}</button>
            </td>
          </tr>`;
      })
      .join("");
  }

  /* ---------------------------------------------------- partenze / last minute */

  function departureCard(stats) {
    const { pkg, dep } = stats;
    const lm = Model.lastMinute(pkg, dep);
    const active = Boolean(dep.lastMinute?.active);
    const current = Model.effectivePrice(pkg, dep);
    const sold = `${stats.pax}/${stats.seats}`;
    const fill = stats.seats > 0 ? (stats.pax / stats.seats) * 100 : 0;

    const evenLine =
      stats.missing === null
        ? t("pkg.breakEvenNever")
        : stats.missing === 0
          ? t("dep.breakEvenReached")
          : t("dep.breakEvenMissing", { n: stats.missing });

    return `
      <article class="dep-card${active ? " is-flash" : ""}">
        <header class="dep-head">
          <div>
            <h3>${esc(titleOf(pkg))}</h3>
            <p class="muted">${esc(shortDate(dep.date))} · ${esc(relativeDays(stats.days))}</p>
          </div>
          ${active ? `<span class="pill flash">${esc(t("dep.lastMinute"))}</span>` : ""}
        </header>

        <div class="dep-figures">
          <div><span class="muted">${esc(t("dep.sold"))}</span><strong>${sold}</strong></div>
          <div><span class="muted">${esc(t("dep.revenue"))}</span><strong>${money(stats.revenue)}</strong></div>
          <div><span class="muted">${esc(t("dep.cost"))}</span><strong>${money(stats.cost)}</strong></div>
          <div>
            <span class="muted">${esc(t("dep.margin"))}</span>
            <strong class="${stats.margin < 0 ? "bad" : "good"}">${money(stats.margin)}</strong>
          </div>
        </div>

        <div class="meter"><span style="width:${Math.min(100, fill)}%"></span></div>
        <p class="dep-even ${stats.missing === 0 ? "good" : ""}">${esc(evenLine)}</p>

        <div class="dep-lm">
          <p class="hint">${esc(t(`dep.reason.${lm.reason}`))}</p>
          <div class="dep-lm-row">
            <span class="muted">${esc(t("dep.suggestedPrice"))}</span>
            <strong>${money(lm.price)}</strong>
            ${lm.discount > 0 ? `<span class="tag">${esc(t("dep.discount", { n: lm.discount }))}</span>` : ""}
          </div>
          <div class="dep-lm-row">
            <!-- Il campo parte dal prezzo suggerito: un clic su Attiva lo applica. -->
            <label class="sr-only" for="lm-${esc(dep.id)}">${esc(t("dep.yourPrice"))}</label>
            <input
              id="lm-${esc(dep.id)}"
              class="lm-input"
              type="number"
              min="0"
              step="5"
              value="${active ? current : lm.price}"
              data-price-for="${esc(pkg.id)}|${esc(dep.date)}"
            />
            <button class="btn ghost small" data-apply-lm="${esc(pkg.id)}|${esc(dep.date)}">
              ${esc(active ? t("dep.apply") : t("dep.activate"))}
            </button>
            ${
              active
                ? `<button class="btn ghost small" data-off-lm="${esc(pkg.id)}|${esc(dep.date)}">
                     ${esc(t("dep.deactivate"))}
                   </button>`
                : ""
            }
          </div>
          <p class="hint">${esc(t("dep.floor"))}: ${money(lm.floor)}</p>
        </div>
      </article>`;
  }

  function departures() {
    const period = $("#d-period").value;
    const onlyFree = $("#d-free").checked;

    const list = Model.upcomingDepartures().filter((s) => {
      if (period === "60" && s.days > 60) return false;
      if (onlyFree && s.free === 0) return false;
      return true;
    });

    $("#departures-empty").hidden = list.length > 0;
    $("#departures-list").innerHTML = list.map(departureCard).join("");
  }

  /* ------------------------------------------------------ prenotazioni */

  function bookings() {
    const filter = $("#b-status").value;
    const rows = Model.state.bookings
      .filter((b) => filter === "all" || b.status === filter)
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    $("#bookings-empty").hidden = rows.length > 0;
    $("#bookings-table").hidden = rows.length === 0;

    $("#bookings-body").innerHTML = rows
      .map((b) => {
        const pkg = Model.findPackage(b.packageId);
        return `
          <tr>
            <td class="mono">${esc(b.ref)}</td>
            <td>
              <strong>${esc(b.name)}</strong>
              <span class="muted">${esc(b.email)}</span>
              ${b.notes ? `<span class="muted">✎ ${esc(b.notes)}</span>` : ""}
            </td>
            <td>${esc(pkg ? titleOf(pkg) : b.packageId)}</td>
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
                      t("common.cancel"),
                    )}</button>`
                  : ""
              }
              <button class="link danger" data-del="${esc(b.ref)}">${esc(t("common.delete"))}</button>
            </td>
          </tr>`;
      })
      .join("");
  }

  /* -------------------------------------------------------- contabilità */

  /** Descrizione leggibile di un movimento, automatico o manuale. */
  function movementLabel(m) {
    if (m.labelKey) return t(m.labelKey, m.labelParams ?? {});
    if (m.label) return m.label;
    const kind = t(`kind.${m.category}`);
    return m.supplier
      ? t("acc.supplierCost", { item: kind, supplier: m.supplier })
      : kind;
  }

  function movementReference(m) {
    if (m.client) return `${m.reference} · ${m.client}`;
    if (m.packageId) {
      const pkg = Model.findPackage(m.packageId);
      return pkg ? `${titleOf(pkg)} · ${shortDate(m.reference)}` : m.reference;
    }
    return t("acc.manual");
  }

  function accountingRows() {
    const period = $("#a-period").value;
    const kind = $("#a-kind").value;
    const today = Model.todayIso();
    const month = today.slice(0, 7);

    return Model.movements().filter((m) => {
      if (kind !== "all" && m.kind !== kind) return false;
      if (period === "open") return !m.settled;
      if (period === "overdue") return !m.settled && m.due < today;
      if (period === "month") return m.due.slice(0, 7) === month;
      return true;
    });
  }

  function accounting() {
    const totals = Model.accounts();
    $("#acc-stats").innerHTML = [
      { label: t("acc.collected"), value: money(totals.collected) },
      { label: t("acc.toCollect"), value: money(totals.toCollect) },
      { label: t("acc.paid"), value: money(totals.paid) },
      { label: t("acc.toPay"), value: money(totals.toPay) },
      {
        label: t("acc.cash"),
        value: money(totals.cash),
        tone: totals.cash < 0 ? "bad" : "good",
      },
      {
        label: t("acc.expected"),
        value: money(totals.expected),
        tone: totals.expected < 0 ? "bad" : "good",
      },
    ]
      .map(
        (s) => `<div class="stat">
          <p class="stat-value ${s.tone ?? ""}">${esc(s.value)}</p>
          <p class="stat-label">${esc(s.label)}</p>
        </div>`,
      )
      .join("");

    const rows = accountingRows();
    const today = Model.todayIso();
    $("#acc-empty").hidden = rows.length > 0;
    $("#acc-table").hidden = rows.length === 0;

    $("#acc-body").innerHTML = rows
      .map((m) => {
        const overdue = !m.settled && m.due < today;
        const settledLabel =
          m.kind === "in" ? t("acc.settledIn") : t("acc.settledOut");
        const markLabel = m.kind === "in" ? t("acc.markIn") : t("acc.markOut");

        return `
          <tr>
            <td>
              ${esc(shortDate(m.due))}
              ${overdue ? `<span class="muted bad">${esc(t("acc.overdue"))}</span>` : ""}
            </td>
            <td>
              <strong>${esc(movementLabel(m))}</strong>
              <span class="muted">${esc(m.source === "manual" ? t("acc.manual") : t("acc.auto"))}</span>
            </td>
            <td>${esc(movementReference(m))}</td>
            <td>${esc(t(`kind.${m.category}`))}</td>
            <td class="num ${m.kind === "in" ? "good" : "bad"}">
              ${m.kind === "in" ? "+" : "−"}${money(m.amount)}
            </td>
            <td>
              <span class="pill ${m.settled ? "confirmed" : "pending"}">
                ${esc(m.settled ? settledLabel : t("acc.planned"))}
              </span>
            </td>
            <td class="actions">
              ${
                m.settled
                  ? `<button class="link" data-unsettle="${esc(m.id)}">${esc(t("acc.reopen"))}</button>`
                  : `<button class="link" data-settle="${esc(m.id)}" data-amount="${m.amount}">${esc(
                      markLabel,
                    )}</button>`
              }
              ${
                m.source === "manual"
                  ? `<button class="link danger" data-del-man="${esc(m.id)}">${esc(
                      t("common.delete"),
                    )}</button>`
                  : ""
              }
            </td>
          </tr>`;
      })
      .join("");
  }

  /* ---------------------------------------------------------- riepilogo */

  function dashboard() {
    const results = Model.tripResults();
    const revenue = results.reduce((sum, r) => sum + r.revenue, 0);
    const cost = results.reduce((sum, r) => sum + r.cost, 0);
    const margin = revenue - cost;
    const active = Model.state.bookings.filter((b) => b.status !== "cancelled");
    const travelers = active.reduce((sum, b) => sum + Model.travelersOf(b), 0);

    $("#dashboard-empty").hidden = Model.state.bookings.length > 0;

    $("#stats").innerHTML = [
      { label: t("dash.bookings"), value: Model.state.bookings.length },
      { label: t("dash.travelers"), value: travelers },
      { label: t("dash.revenue"), value: money(revenue) },
      { label: t("dash.costs"), value: money(cost) },
      {
        label: t("dash.margin"),
        value: money(margin),
        tone: margin < 0 ? "bad" : "good",
      },
      {
        label: t("dash.marginPct"),
        value: revenue > 0 ? percent((margin / revenue) * 100) : "—",
        tone: margin < 0 ? "bad" : "good",
      },
    ]
      .map(
        (s) => `<div class="stat">
          <p class="stat-value ${s.tone ?? ""}">${esc(s.value)}</p>
          <p class="stat-label">${esc(s.label)}</p>
        </div>`,
      )
      .join("");

    const max = results.reduce(
      (top, r) => Math.max(top, Math.abs(r.margin)),
      1,
    );
    $("#bars").innerHTML = results
      .map(
        (r) => `
        <div class="bar-row">
          <span class="bar-label">${esc(titleOf(r.pkg))}</span>
          <span class="bar">
            <span class="bar-fill ${r.margin < 0 ? "bad" : ""}"
                  style="width:${(Math.abs(r.margin) / max) * 100}%"></span>
          </span>
          <span class="bar-value">${money(r.margin)}</span>
        </div>`,
      )
      .join("");

    const next = Model.upcomingDepartures().filter((s) => s.pax > 0);
    $("#dash-table").hidden = next.length === 0;
    $("#dash-body").innerHTML = next
      .slice(0, 10)
      .map(
        (s) => `
        <tr>
          <td>${esc(titleOf(s.pkg))}</td>
          <td>${esc(shortDate(s.dep.date))} <span class="muted">${esc(relativeDays(s.days))}</span></td>
          <td class="num">${s.pax}/${s.seats}</td>
          <td class="num">${money(s.revenue)}</td>
          <td class="num ${s.margin < 0 ? "bad" : "good"}">${money(s.margin)}</td>
          <td>${esc(
            s.missing === null
              ? t("pkg.breakEvenNever")
              : s.missing === 0
                ? t("dep.breakEvenReached")
                : t("dep.breakEvenMissing", { n: s.missing }),
          )}</td>
        </tr>`,
      )
      .join("");
  }

  function all() {
    catalog();
    packages();
    departures();
    bookings();
    accounting();
    dashboard();
  }

  return {
    all,
    catalog,
    packages,
    departures,
    bookings,
    accounting,
    dashboard,
    titleOf,
    descOf,
    movementLabel,
    movementReference,
    accountingRows,
  };
})();
