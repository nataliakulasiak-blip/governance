/** Funzioni di supporto condivise: formati, DOM, notifiche, file. */
const UI = (() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const HTML_ESCAPES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  const esc = (text) =>
    String(text ?? "").replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);

  // Lo zero negativo (-0) esiste in JavaScript e stamperebbe "-0 €".
  const zero = (value) => (value === 0 ? 0 : value);

  const money = (amount) =>
    new Intl.NumberFormat(locale(), {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(zero(Math.round(amount)));

  /** Come money(), ma con i centesimi: per i valori divisi fra i partecipanti. */
  const money2 = (amount) =>
    new Intl.NumberFormat(locale(), {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(zero(amount));

  const percent = (value) =>
    new Intl.NumberFormat(locale(), { maximumFractionDigits: 0 }).format(
      value,
    ) + "%";

  const longDate = (iso) =>
    new Intl.DateTimeFormat(locale(), {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${iso}T00:00:00`));

  const shortDate = (iso) =>
    new Intl.DateTimeFormat(locale(), { dateStyle: "medium" }).format(
      new Date(`${iso}T00:00:00`),
    );

  /** "fra 12 giorni", "Oggi" oppure la data se è passata. */
  function relativeDays(days) {
    if (days === 0) return t("dep.today");
    if (days < 0) return "—";
    return t("dep.daysLeft", { n: days });
  }

  /** Opzioni di una select da una lista di valori tradotti. */
  function options(values, translate, selected, allLabel) {
    const head = allLabel
      ? `<option value="all"${selected === "all" ? " selected" : ""}>${esc(allLabel)}</option>`
      : "";
    return (
      head +
      values
        .map(
          (value) =>
            `<option value="${esc(value)}"${value === selected ? " selected" : ""}>${esc(
              translate(value),
            )}</option>`,
        )
        .join("")
    );
  }

  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      el.hidden = true;
    }, 3600);
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

  /** Righe CSV con separatore ";", come si aspetta Excel in Europa. */
  function toCsv(header, rows) {
    const cell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const lines = [header.map(cell).join(";")];
    rows.forEach((row) => lines.push(row.map(cell).join(";")));
    // BOM: Excel apre così il CSV in UTF-8 senza rovinare gli accenti.
    return `﻿${lines.join("\r\n")}`;
  }

  const stamp = () => Model.todayIso();

  return {
    $,
    $$,
    esc,
    money,
    money2,
    percent,
    longDate,
    shortDate,
    relativeDays,
    options,
    toast,
    saveFile,
    toCsv,
    stamp,
  };
})();
