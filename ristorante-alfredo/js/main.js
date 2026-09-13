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
     un file con quel nome, prende il posto dell'illustrazione: basta caricare
     la fotografia, senza toccare il codice. La copertina cerca anche
     copertina-2, copertina-3… e le fa girare in dissolvenza. */
  (function () {
    var ESTENSIONI = [".jpg", ".jpeg", ".webp", ".png"];
    /* nelle versioni tradotte le pagine stanno in una cartella: si risale */
    var RADICE = /\/(en|fr|es|ru|pl)\/[^/]*$/.test(location.pathname)
      ? "../"
      : "";
    var COPERTINE = 6;
    var ATTESA = 7000;
    var memoria = {};

    /* Cerca una foto una volta sola per nome e ricorda l'esito. */
    function cerca(nome, quandoTrovata, quandoAssente) {
      if (nome in memoria) {
        if (memoria[nome]) quandoTrovata(memoria[nome]);
        else if (quandoAssente) quandoAssente();
        return;
      }

      var indice = 0;

      function prova() {
        if (indice >= ESTENSIONI.length) {
          memoria[nome] = null;
          if (quandoAssente) quandoAssente();
          return;
        }

        var percorso = RADICE + "images/foto/" + nome + ESTENSIONI[indice];
        var immagine = new Image();
        indice += 1;
        immagine.onload = function () {
          memoria[nome] = percorso;
          quandoTrovata(percorso);
        };
        immagine.onerror = prova;
        immagine.src = percorso;
      }

      prova();
    }

    /* Un posto puo' accettare piu' nomi, separati da virgola: si prende il
       primo che esiste. Cosi lo stesso poster serve in due punti del sito
       senza doverlo caricare due volte. */
    function cercaFraNomi(nomi, quandoTrovata) {
      var elenco = nomi.split(",").map(function (n) {
        return n.trim();
      });

      function passo(i) {
        if (i >= elenco.length) return;
        cerca(elenco[i], quandoTrovata, function () {
          passo(i + 1);
        });
      }

      passo(0);
    }

    /* Le sezioni: dove c'e' un'immagine la sostituisce, dove c'e' un posto
       vuoto lo riempie e lo fa comparire. */
    document.querySelectorAll("[data-foto]").forEach(function (posto) {
      cercaFraNomi(posto.dataset.foto, function (percorso) {
        if (posto.tagName === "IMG") {
          posto.removeAttribute("width");
          posto.removeAttribute("height");
          posto.src = percorso;
          return;
        }
        posto.style.backgroundImage = 'url("' + percorso + '")';
        posto.classList.add("is-piena");
      });
    });

    /* La copertina: si cercano in fila, ci si ferma al primo numero mancante */
    var copertina = document.querySelector(".copertina");
    if (!copertina) return;

    var ATTESA = 7000;

    function lastraDa(percorso) {
      var lastra = document.createElement("div");
      lastra.className = "copertina__lastra";
      lastra.style.backgroundImage = 'url("' + percorso + '")';
      copertina.insertBefore(lastra, copertina.firstChild);
      return lastra;
    }

    /* Con il filmato: restano le scritte a girare, il filmato non si ferma.
       Se per una scena c'e' una fotografia, prende il posto del filmato
       mentre quella scritta e' in scena. */
    var parole = [].slice.call(document.querySelectorAll(".copertina__parola"));
    if (parole.length > 1) {
      var sfondi = parole.map(function (parola) {
        var scena = parola.dataset.scena;
        if (!scena) return null;
        var lastra = null;
        cercaFraNomi(scena, function (percorso) {
          lastra = lastraDa(percorso);
          parola.lastra = lastra;
        });
        return null;
      });

      var corrente = 0;
      setInterval(function () {
        parole[corrente].classList.remove("is-in-scena");
        if (parole[corrente].lastra) {
          parole[corrente].lastra.classList.remove("is-in-scena");
        }

        corrente = (corrente + 1) % parole.length;

        parole[corrente].classList.add("is-in-scena");
        if (parole[corrente].lastra) {
          parole[corrente].lastra.classList.add("is-in-scena");
        }
      }, ATTESA);
      return;
    }

    /* Senza filmato: le fotografie della copertina, in fila */
    var trovate = [];

    function inScena() {
      if (!trovate.length) return;
      copertina.classList.add("copertina--foto");

      var lastre = trovate.map(lastraDa);
      lastre[0].classList.add("is-in-scena");
      if (lastre.length < 2) return;

      var quale = 0;
      setInterval(function () {
        lastre[quale].classList.remove("is-in-scena");
        quale = (quale + 1) % lastre.length;
        lastre[quale].classList.add("is-in-scena");
      }, ATTESA);
    }

    function prossima(numero) {
      if (numero > 6) return inScena();
      var nome = numero === 1 ? "copertina" : "copertina-" + numero;
      cerca(
        nome,
        function (percorso) {
          trovate.push(percorso);
          prossima(numero + 1);
        },
        inScena,
      );
    }

    prossima(1);
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
