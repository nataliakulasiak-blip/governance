/** Avvio, navigazione fra le viste e collegamento dei comandi. */
(() => {
  const { $, $$, esc, money, options, toast, saveFile, toCsv } = UI;

  /* ------------------------------------------------------- navigazione */

  function showView(name) {
    $$(".tab").forEach((tab) =>
      tab.classList.toggle("is-active", tab.dataset.view === name),
    );
    $$(".view").forEach((view) => {
      view.hidden = view.id !== `view-${name}`;
    });
  }

  /** Elenco dei paesi presenti a catalogo, ordinato nella lingua attiva. */
  function fillFilters() {
    const countries = Array.from(
      new Set(Model.state.packages.map((p) => p.country)),
    ).sort((a, b) =>
      t(`country.${a}`).localeCompare(t(`country.${b}`), locale()),
    );

    const country = $("#f-country").value || "all";
    const category = $("#f-category").value || "all";

    $("#f-country").innerHTML = options(
      countries,
      (c) => t(`country.${c}`),
      country,
      t("filters.allCountries"),
    );
    $("#f-category").innerHTML = options(
      CATEGORIES,
      (c) => t(`cat.${c}`),
      category,
      t("filters.allCategories"),
    );
  }

  function applyLanguage(lang) {
    setLang(lang);
    Model.saveLang(lang);
    translateDom();
    fillFilters();
    Views.all();
    Editors.refresh();
  }

  /* ------------------------------------------------------- esportazioni */

  function exportBookings() {
    const rows = Model.state.bookings.map((b) => {
      const pkg = Model.findPackage(b.packageId);
      return [
        b.ref,
        b.name,
        b.email,
        b.phone,
        pkg ? Views.titleOf(pkg) : b.packageId,
        b.date,
        b.adults,
        b.children,
        b.total,
        t(`status.${b.status}`),
        b.notes,
      ];
    });

    saveFile(
      `prenotazioni-${Model.todayIso()}.csv`,
      toCsv(
        [
          t("bookings.ref"),
          t("bookings.client"),
          t("form.email"),
          t("form.phone"),
          t("bookings.trip"),
          t("form.departure"),
          t("form.adults"),
          t("form.children"),
          t("common.total"),
          t("acc.status"),
          t("form.notes"),
        ],
        rows,
      ),
    );
  }

  function exportAccounting() {
    const rows = Views.accountingRows().map((m) => [
      m.due,
      m.kind === "in" ? t("acc.in") : t("acc.out"),
      Views.movementLabel(m),
      Views.movementReference(m),
      t(`kind.${m.category}`),
      m.kind === "in" ? m.amount : -m.amount,
      m.settled
        ? m.kind === "in"
          ? t("acc.settledIn")
          : t("acc.settledOut")
        : t("acc.planned"),
      m.settledAt ?? "",
    ]);

    saveFile(
      `contabilita-${Model.todayIso()}.csv`,
      toCsv(
        [
          t("acc.due"),
          t("acc.kind"),
          t("acc.description"),
          t("acc.reference"),
          t("pkg.costKind"),
          t("acc.amount"),
          t("acc.status"),
          t("acc.settledDate"),
        ],
        rows,
      ),
    );
  }

  /* ------------------------------------------------------------ azioni */

  function confirmBooking(ref) {
    const booking = Model.state.bookings.find((b) => b.ref === ref);
    const pkg = booking && Model.findPackage(booking.packageId);
    const dep = pkg && Model.findDeparture(pkg, booking.date);
    if (dep) {
      const free = dep.seats - Model.seatsTaken(pkg.id, booking.date, ref);
      if (Model.travelersOf(booking) > free) {
        toast(t("form.errSeats"));
        return;
      }
    }
    Model.setBookingStatus(ref, "confirmed");
    Views.all();
    toast(t("toast.updated", { ref }));
  }

  function removePackage(id) {
    const pkg = Model.findPackage(id);
    if (!pkg) return;
    const used = Model.state.bookings.some(
      (b) => b.packageId === id && b.status !== "cancelled",
    );
    if (used) {
      toast(t("pkg.hasBookings"));
      return;
    }
    if (!confirm(t("pkg.askDelete", { name: Views.titleOf(pkg) }))) return;
    Model.deletePackage(id);
    fillFilters();
    Views.all();
    toast(t("pkg.deleted"));
  }

  /** Attiva il last minute con il prezzo scritto dall'operatore. */
  function applyLastMinute(target) {
    const [packageId, date] = target.split("|");
    const pkg = Model.findPackage(packageId);
    const dep = Model.findDeparture(pkg, date);
    if (!dep) return;

    const input = $(`[data-price-for="${target}"]`);
    const price = Math.max(0, Number(input.value) || 0);
    const floor = Model.lastMinute(pkg, dep).floor;

    Model.setLastMinute(packageId, date, { active: true, price });
    Views.all();
    toast(price < floor ? t("dep.belowFloor") : t("dep.priceSaved"));
  }

  function clearLastMinute(target) {
    const [packageId, date] = target.split("|");
    Model.setLastMinute(packageId, date, { active: false, price: null });
    Views.all();
    toast(t("dep.priceSaved"));
  }

  /* ------------------------------------------------------------ eventi */

  function bindGlobal() {
    $("#lang-select").addEventListener("change", (e) =>
      applyLanguage(e.target.value),
    );
    $("#tabs").addEventListener("click", (e) => {
      const tab = e.target.closest(".tab");
      if (tab) showView(tab.dataset.view);
    });
  }

  function bindCatalog() {
    $("#filters").addEventListener("input", Views.catalog);
    $("#filters").addEventListener("reset", () => setTimeout(Views.catalog));
    $("#catalog-grid").addEventListener("click", (e) => {
      const button = e.target.closest("[data-book]");
      if (button) Editors.openBooking(button.dataset.book);
    });
  }

  function bindPackages() {
    $("#btn-new-package").addEventListener("click", () =>
      Editors.openPackage(null),
    );
    $("#packages-body").addEventListener("click", (e) => {
      const edit = e.target.closest("[data-edit-pkg]");
      if (edit) return Editors.openPackage(edit.dataset.editPkg);
      const copy = e.target.closest("[data-copy-pkg]");
      if (copy) return Editors.duplicatePackage(copy.dataset.copyPkg);
      const del = e.target.closest("[data-del-pkg]");
      if (del) removePackage(del.dataset.delPkg);
      return undefined;
    });
  }

  function bindDepartures() {
    $("#d-period").addEventListener("change", Views.departures);
    $("#d-free").addEventListener("change", Views.departures);
    $("#departures-list").addEventListener("click", (e) => {
      const apply = e.target.closest("[data-apply-lm]");
      if (apply) return applyLastMinute(apply.dataset.applyLm);
      const off = e.target.closest("[data-off-lm]");
      if (off) clearLastMinute(off.dataset.offLm);
      return undefined;
    });
  }

  function bindBookings() {
    $("#b-status").addEventListener("change", Views.bookings);
    $("#btn-export").addEventListener("click", exportBookings);
    $("#btn-clear").addEventListener("click", () => {
      if (!Model.state.bookings.length || !confirm(t("bookings.askClear")))
        return;
      Model.clearBookings();
      Views.all();
    });

    $("#bookings-body").addEventListener("click", (e) => {
      const set = e.target.closest("[data-set]");
      if (set) {
        if (set.dataset.set === "confirmed")
          return confirmBooking(set.dataset.ref);
        Model.setBookingStatus(set.dataset.ref, "cancelled");
        Views.all();
        toast(t("toast.updated", { ref: set.dataset.ref }));
        return undefined;
      }
      const del = e.target.closest("[data-del]");
      if (del && confirm(t("bookings.askDelete", { ref: del.dataset.del }))) {
        Model.deleteBooking(del.dataset.del);
        Views.all();
        toast(t("toast.deleted", { ref: del.dataset.del }));
      }
      return undefined;
    });
  }

  function bindAccounting() {
    $("#a-period").addEventListener("change", Views.accounting);
    $("#a-kind").addEventListener("change", Views.accounting);
    $("#btn-manual").addEventListener("click", Editors.openManual);
    $("#btn-acc-export").addEventListener("click", exportAccounting);

    $("#acc-body").addEventListener("click", (e) => {
      const settle = e.target.closest("[data-settle]");
      if (settle) {
        Model.settle(settle.dataset.settle, Number(settle.dataset.amount));
        Views.all();
        return undefined;
      }
      const reopen = e.target.closest("[data-unsettle]");
      if (reopen) {
        Model.unsettle(reopen.dataset.unsettle);
        Views.all();
        return undefined;
      }
      const del = e.target.closest("[data-del-man]");
      if (del && confirm(t("acc.askDelete"))) {
        Model.deleteManual(del.dataset.delMan);
        Views.all();
      }
      return undefined;
    });
  }

  function bindDialogs() {
    // prenotazione
    ["#c-adults", "#c-children", "#c-departure"].forEach((sel) =>
      $(sel).addEventListener("input", Editors.bookingPreview),
    );
    $("#booking-form").addEventListener("submit", Editors.submitBooking);
    $("#dlg-close").addEventListener("click", () =>
      $("#booking-dialog").close(),
    );
    $("#dlg-cancel").addEventListener("click", () =>
      $("#booking-dialog").close(),
    );

    // scheda pacchetto
    $("#package-form").addEventListener("input", (e) => {
      if (e.target.closest("#p-langs")) return;
      Editors.syncDraft();
      Editors.renderFigures();
    });
    $("#p-add-cost").addEventListener("click", Editors.addCost);
    $("#p-add-departure").addEventListener("click", Editors.addDeparture);
    $("#p-use-suggested").addEventListener("click", Editors.useSuggested);
    $("#p-costs").addEventListener("click", (e) => {
      const drop = e.target.closest("[data-drop-cost]");
      if (drop) Editors.dropCost(drop.dataset.dropCost);
    });
    $("#p-departures").addEventListener("click", (e) => {
      const drop = e.target.closest("[data-drop-departure]");
      if (drop) Editors.dropDeparture(drop.dataset.dropDeparture);
    });
    $("#package-form").addEventListener("submit", Editors.submitPackage);
    $("#pkg-close").addEventListener("click", () =>
      $("#package-dialog").close(),
    );
    $("#pkg-cancel").addEventListener("click", () =>
      $("#package-dialog").close(),
    );

    // movimento manuale
    $("#manual-form").addEventListener("submit", Editors.submitManual);
    $("#man-close").addEventListener("click", () =>
      $("#manual-dialog").close(),
    );
    $("#man-cancel").addEventListener("click", () =>
      $("#manual-dialog").close(),
    );
  }

  function init() {
    Model.init();

    const stored = Model.readLang();
    const preferred =
      stored ??
      LANGS.find((l) => navigator.language?.toLowerCase().startsWith(l)) ??
      "it";

    $("#lang-select").value = preferred;
    bindGlobal();
    bindCatalog();
    bindPackages();
    bindDepartures();
    bindBookings();
    bindAccounting();
    bindDialogs();
    applyLanguage(preferred);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
