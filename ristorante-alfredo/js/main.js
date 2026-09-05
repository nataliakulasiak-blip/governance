/* Ristorante Alfredo — comportamenti dell'interfaccia */
(function () {
  "use strict";

  /* Numero WhatsApp del ristorante (solo cifre, con prefisso internazionale) */
  var WHATSAPP = "390644701234";

  /* ---- Intestazione compatta allo scorrimento ---- */
  var intestazione = document.querySelector(".intestazione");
  if (
    intestazione &&
    !intestazione.classList.contains("intestazione--solida")
  ) {
    var aggiornaIntestazione = function () {
      intestazione.classList.toggle("is-compatta", window.scrollY > 60);
    };
    aggiornaIntestazione();
    window.addEventListener("scroll", aggiornaIntestazione, { passive: true });
  }

  /* ---- Menu di navigazione su mobile ---- */
  var pulsanteMenu = document.querySelector(".menu-mobile");
  var navigazione = document.querySelector(".navigazione");
  if (pulsanteMenu && navigazione) {
    pulsanteMenu.addEventListener("click", function () {
      var aperto = pulsanteMenu.getAttribute("aria-expanded") === "true";
      pulsanteMenu.setAttribute("aria-expanded", String(!aperto));
      navigazione.classList.toggle("is-aperta", !aperto);
    });

    navigazione.addEventListener("click", function (evento) {
      if (evento.target.closest("a")) {
        pulsanteMenu.setAttribute("aria-expanded", "false");
        navigazione.classList.remove("is-aperta");
      }
    });
  }

  /* ---- Comparsa progressiva delle sezioni ---- */
  var daRivelare = document.querySelectorAll(".rivela");
  if ("IntersectionObserver" in window && daRivelare.length) {
    var osservatore = new IntersectionObserver(
      function (voci) {
        voci.forEach(function (voce) {
          if (voce.isIntersecting) {
            voce.target.classList.add("is-visibile");
            osservatore.unobserve(voce.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" },
    );
    daRivelare.forEach(function (elemento) {
      osservatore.observe(elemento);
    });
  } else {
    daRivelare.forEach(function (elemento) {
      elemento.classList.add("is-visibile");
    });
  }

  /* ---- Domande frequenti ---- */
  document.querySelectorAll(".faq__domanda").forEach(function (domanda) {
    var risposta = document.getElementById(
      domanda.getAttribute("aria-controls"),
    );
    if (!risposta) return;

    domanda.addEventListener("click", function () {
      var aperta = domanda.getAttribute("aria-expanded") === "true";
      domanda.setAttribute("aria-expanded", String(!aperta));
      risposta.style.maxHeight = aperta ? null : risposta.scrollHeight + "px";
    });
  });

  window.addEventListener("resize", function () {
    document
      .querySelectorAll('.faq__domanda[aria-expanded="true"]')
      .forEach(function (d) {
        var risposta = document.getElementById(d.getAttribute("aria-controls"));
        if (risposta) risposta.style.maxHeight = risposta.scrollHeight + "px";
      });
  });

  /* ---- Modulo di prenotazione: invio tramite WhatsApp ---- */
  var modulo = document.querySelector("[data-modulo-prenotazione]");
  if (modulo) {
    var esito = modulo.querySelector(".modulo__esito");

    modulo.addEventListener("submit", function (evento) {
      evento.preventDefault();
      var dati = new FormData(modulo);

      /* La data arriva come 2026-09-12: la scriviamo all'italiana */
      var data = (dati.get("data") || "").toString();
      var pezzi = data.split("-");
      if (pezzi.length === 3) data = pezzi[2] + "/" + pezzi[1] + "/" + pezzi[0];

      var testo = [
        "Buongiorno Ristorante Alfredo, vorrei prenotare un tavolo.",
        "",
        "Nome: " + (dati.get("nome") || ""),
        "Telefono: " + (dati.get("telefono") || ""),
        "Data: " + data,
        "Orario: " + (dati.get("orario") || ""),
        "Persone: " + (dati.get("persone") || ""),
      ];

      var sala = (dati.get("sala") || "").toString();
      if (sala && sala !== "Nessuna") testo.push("Preferenza: " + sala);

      var note = (dati.get("note") || "").toString().trim();
      if (note) testo.push("Note: " + note);

      var indirizzo =
        "https://wa.me/" +
        WHATSAPP +
        "?text=" +
        encodeURIComponent(testo.join("\n"));

      window.open(indirizzo, "_blank", "noopener");

      if (esito) {
        esito.hidden = false;
        esito.textContent =
          "Grazie! Abbiamo aperto WhatsApp con la sua richiesta: prema invio per " +
          "spedirla. Le rispondiamo entro poche ore. Per la stessa sera preferiamo " +
          "una telefonata allo 06 4470 1234.";
        esito.focus({ preventScroll: true });
      }
    });
  }

  /* ---- Il cassetto delle foto ----
     Ogni disegno dichiara un nome con data-foto. Se in images/foto/ esiste
     un file con quel nome (.jpg o .webp), prende il posto dell'illustrazione:
     basta caricare la fotografia, senza toccare il codice. */
  (function () {
    var ESTENSIONI = [".jpg", ".jpeg", ".webp", ".png"];

    function cerca(nome, quandoTrovata) {
      var indice = 0;

      function prova() {
        if (indice >= ESTENSIONI.length) return;
        var immagine = new Image();
        var percorso = "images/foto/" + nome + ESTENSIONI[indice];
        indice += 1;
        immagine.onload = function () {
          quandoTrovata(percorso);
        };
        immagine.onerror = prova;
        immagine.src = percorso;
      }

      prova();
    }

    document.querySelectorAll("img[data-foto]").forEach(function (disegno) {
      cerca(disegno.dataset.foto, function (percorso) {
        disegno.removeAttribute("width");
        disegno.removeAttribute("height");
        disegno.src = percorso;
      });
    });

    var copertina = document.querySelector(".copertina");
    if (copertina) {
      cerca("copertina", function (percorso) {
        copertina.style.setProperty(
          "--copertina-foto",
          'url("' + percorso + '")',
        );
        copertina.classList.add("copertina--foto");
      });
    }
  })();

  /* ---- Mappa: la carichiamo solo se OpenStreetMap è raggiungibile ----
     Se la rete la blocca resta il riquadro con l'indirizzo, senza schermate
     di errore del browser. */
  var mappa = document.querySelector("[data-mappa]");
  if (mappa) {
    var sonda = new Image();

    sonda.onload = function () {
      var telaio = document.createElement("iframe");
      telaio.title = "Mappa: Via Principe Amedeo 126, Roma";
      telaio.loading = "lazy";
      telaio.referrerPolicy = "no-referrer-when-downgrade";
      telaio.src =
        "https://www.openstreetmap.org/export/embed.html?bbox=" +
        encodeURIComponent(mappa.dataset.bbox) +
        "&layer=mapnik&marker=" +
        encodeURIComponent(mappa.dataset.marker);
      mappa.appendChild(telaio);
    };

    /* piastrella della zona di piazza Vittorio */
    sonda.src = "https://tile.openstreetmap.org/16/35044/24353.png";
  }

  /* ---- Anno corrente nel piè di pagina ---- */
  document.querySelectorAll("[data-anno]").forEach(function (elemento) {
    elemento.textContent = String(new Date().getFullYear());
  });
})();
