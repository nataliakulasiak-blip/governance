# -*- coding: utf-8 -*-
"""Costruisce esquilino.html: la storia del rione, punto per punto.

I punti stanno qui sotto, in ordine di tempo. Per aggiungerne uno si scrive
una riga nell'elenco e si rilancia: l'intestazione, il piè di pagina e i dati
strutturati vengono ricopiati da una pagina esistente, così restano in accordo
con il resto del sito.

    python3 strumenti/rione.py
"""
import pathlib
import re

RADICE = pathlib.Path(__file__).resolve().parent.parent
MODELLO = RADICE / "diario-esquilino.html"
USCITA = RADICE / "esquilino.html"
SITO = "https://www.ristorantealfredoroma.it"

# (quando, titolo, corpo, nota) — la nota è la riga in corsivo, se serve
PUNTI = [
    (
        "Il nome",
        "Chi sta fuori",
        "Esquilino viene forse da <em>exquiliae</em>: quelli che stanno fuori, "
        "oltre l'abitato. Il colle nasce con il nome di chi ci vive ai margini, "
        "e per venticinque secoli non smette mai del tutto di somigliargli.",
        None,
    ),
    (
        "IV secolo a.C.",
        "Le mura e l'aggere",
        "Qui il colle è pianeggiante e indifeso: non basta un muro. I romani "
        "alzano un terrapieno enorme, l'<em>aggere</em>, e ci appoggiano contro "
        "blocchi di tufo grandi come un uomo.",
        "Se ne vedono ancora i resti nel giardino di piazza Vittorio e fuori "
        "dalla stazione Termini.",
    ),
    (
        "II–I secolo a.C.",
        "Il campo dei morti",
        "Fuori dalle mura l'Esquilino è il cimitero di Roma: le fosse comuni "
        "dei poveri e degli schiavi, i <em>puticuli</em>. Orazio lo racconta "
        "nella satira ottava del primo libro.",
        "«Qui stava la fossa comune della povera gente.»",
    ),
    (
        "Attorno al 35 a.C.",
        "Gli Horti di Mecenate",
        "Mecenate, l'amico di Augusto, compra il campo dei morti e ci pianta "
        "sopra un giardino. Il quartiere più infame di Roma diventa il più "
        "ricercato. Orazio e Virgilio ci passeggiano dentro.",
        "L'Auditorium di Mecenate, in largo Leopardi, riemerge nel 1874: una "
        "sala interrata con un giardino dipinto sulle pareti.",
    ),
    (
        "64 d.C.",
        "Il fuoco e la Domus Aurea",
        "Il grande incendio brucia Roma per nove giorni. Nerone si prende il "
        "colle Oppio, che dell'Esquilino è uno sperone, e ci costruisce la "
        "Domus Aurea.",
        None,
    ),
    (
        "109 d.C.",
        "Le Terme di Traiano",
        "Traiano interra la casa di Nerone e ci fonda sopra le sue terme. "
        "Per questo la Domus Aurea è arrivata fino a noi: è stata sepolta, "
        "non demolita.",
        None,
    ),
    (
        "262 d.C.",
        "L'Arco di Gallieno",
        "La vecchia Porta Esquilina delle mura viene rivestita di travertino e "
        "dedicata all'imperatore Gallieno. È ancora là, stretta fra due case, "
        "in via di San Vito.",
        None,
    ),
    (
        "432–440",
        "Santa Maria Maggiore",
        "Papa Sisto III alza la basilica subito dopo il concilio di Efeso. I "
        "mosaici della navata sono di allora: milleseicento anni, mai rifatti.",
        "La leggenda della neve d'agosto — la Madonna che disegna con la neve "
        "il perimetro della chiesa — arriverà molti secoli più tardi.",
    ),
    (
        "Dal VI secolo",
        "Le vigne",
        "Tagliati gli acquedotti durante la guerra gotica, i colli restano "
        "senz'acqua e si svuotano. Roma scende al Tevere e l'Esquilino torna "
        "campagna: vigne e orti per mille anni, con la basilica in mezzo come "
        "un'isola.",
        None,
    ),
    (
        "Attorno al 1288",
        "Il pavimento dei Cosmati",
        "In Santa Maria Maggiore i marmorari romani intarsiano il pavimento: "
        "dischi di porfido e di serpentino, nastri di tessere, rosoni. È il "
        "disegno che questo sito porta sotto la copertina e in fondo a ogni "
        "pagina.",
        "I marmi li ricavavano dalle rovine antiche: un colle che si ricicla da "
        "sé.",
    ),
    (
        "1587",
        "Sisto V rimette l'acqua",
        "In due anni papa Sisto V fa arrivare l'Acqua Felice, pianta l'obelisco "
        "dietro l'abside della basilica e fa tirare a Domenico Fontana le "
        "strade dritte che ancora oggi tagliano il rione.",
        "La sua villa, la Montalto, coprirà l'Esquilino fino all'Ottocento: "
        "verrà rasa al suolo per fare posto alla stazione Termini.",
    ),
    (
        "Fra il 1655 e il 1680",
        "La Porta Magica",
        "Il marchese Palombara fa incidere sulla porta della sua villa una "
        "pagina di simboli alchemici. La villa non c'è più; la porta sì, nel "
        "giardino di piazza Vittorio. Nessuno l'ha mai sciolta del tutto.",
        None,
    ),
    (
        "1871–1888",
        "Piazza Vittorio",
        "Roma diventa capitale e l'Esquilino si copre di palazzi in vent'anni. "
        "Nasce piazza Vittorio Emanuele II con i portici più lunghi della "
        "città, e con lei la nostra strada: via Principe Amedeo.",
        "Ci arrivano tanti impiegati dal Piemonte che il rione se ne prende il "
        "soprannome.",
    ),
    (
        "1874",
        "Il ninfeo ritrovato",
        "Scavando in piazza Vittorio riaffiora una rovina di mattoni che i "
        "romani chiamano da sempre Trofei di Mario. Non è di Mario: è un ninfeo "
        "del terzo secolo. I trofei di marmo Sisto V li aveva già portati in "
        "Campidoglio.",
        None,
    ),
    (
        "1962",
        "Alfredo",
        "Al numero 126 di via Principe Amedeo apre una trattoria di famiglia. "
        "Porta di legno, tenda chiara con il nome sopra, nessuna insegna "
        "luminosa. Sessant'anni dopo è ancora lì.",
        None,
    ),
    (
        "2001",
        "Il Nuovo Mercato Esquilino",
        "Il mercato lascia la piazza e entra sotto il tetto dell'ex caserma, "
        "fra via Filippo Turati e la nostra via. Da allora facciamo la spesa "
        "a duecento metri da casa.",
        None,
    ),
    (
        "Oggi",
        "Il rione che cucina il mondo",
        "Sui banchi il pecorino e il cardamomo stanno a dieci metri. Noi "
        "restiamo una cucina romana ortodossa, ma è impossibile lavorare qui e "
        "non imparare niente da chi ha il banco accanto.",
        None,
    ),
]


def pezzo(testo, da, a):
    i = testo.index(da)
    j = testo.index(a, i) + len(a)
    return testo[i:j]


def voce(numero, quando, titolo, corpo, nota):
    nota_html = (
        f'\n            <p class="cronologia__nota">{nota}</p>' if nota else ""
    )
    return f"""          <li class="cronologia__voce" data-punto="{numero}">
            <span class="cronologia__perla" aria-hidden="true"></span>
            <p class="cronologia__quando">{quando}</p>
            <h2 class="cronologia__titolo">{titolo}</h2>
            <p>{corpo}</p>{nota_html}
          </li>"""


def senza_tag(testo):
    return re.sub(r"<[^>]+>", "", testo)


def costruisci():
    modello = MODELLO.read_text(encoding="utf-8")
    intestazione = pezzo(modello, '<header class="intestazione', "</header>")
    piede = pezzo(modello, '<footer class="pie">', "</footer>")
    flottante = pezzo(modello, '<a\n      class="whatsapp-flottante"', "</a>\n")

    voci = "\n\n".join(
        voce(i, *p) for i, p in enumerate(PUNTI)
    )

    elenco_dati = ",\n".join(
        f"""            {{
              "@type": "ListItem",
              "position": {i + 1},
              "name": "{senza_tag(p[0])} — {senza_tag(p[1])}"
            }}"""
        for i, p in enumerate(PUNTI)
    )

    return f"""<!doctype html>
<html lang="it">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Storia dell'Esquilino, punto per punto | Alfredo</title>
    <meta
      name="description"
      content="Venticinque secoli di rione in {len(PUNTI)} punti: le mura serviane, gli Horti di Mecenate, Santa Maria Maggiore, la Porta Magica e il mercato di piazza Vittorio."
    />
    <meta
      name="keywords"
      content="storia Esquilino, rione Esquilino Roma, mura serviane, Horti di Mecenate, Porta Magica, piazza Vittorio, Santa Maria Maggiore, Trofei di Mario"
    />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#5a1622" />
    <link rel="canonical" href="{SITO}/esquilino.html" />
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="it_IT" />
    <meta property="og:title" content="Storia dell'Esquilino, punto per punto" />
    <meta
      property="og:description"
      content="Venticinque secoli di rione in {len(PUNTI)} punti, dal terrapieno delle mura al mercato di oggi."
    />
    <meta property="og:url" content="{SITO}/esquilino.html" />
    <meta property="og:image" content="{SITO}/images/social.jpg" />
    <script type="application/ld+json">
      {{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Storia dell'Esquilino, punto per punto",
        "inLanguage": "it",
        "datePublished": "2026-09-14",
        "dateModified": "2026-09-14",
        "author": {{ "@type": "Person", "name": "Marco Sabatini" }},
        "publisher": {{
          "@type": "Restaurant",
          "name": "Ristorante Alfredo",
          "@id": "{SITO}/#ristorante"
        }},
        "image": "{SITO}/images/social.jpg",
        "mainEntityOfPage": "{SITO}/esquilino.html",
        "about": {{
          "@type": "Place",
          "name": "Esquilino",
          "address": {{
            "@type": "PostalAddress",
            "addressLocality": "Roma",
            "addressRegion": "RM",
            "addressCountry": "IT"
          }}
        }},
        "hasPart": {{
          "@type": "ItemList",
          "name": "I punti della storia dell'Esquilino",
          "numberOfItems": {len(PUNTI)},
          "itemListElement": [
{elenco_dati}
          ]
        }}
      }}
    </script>
    <link rel="icon" href="images/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="css/caratteri.css" />
    <link rel="stylesheet" href="css/style.css" />
  </head>

  <body>
    {intestazione}

    <main>
      <section class="testata testata--rione">
        <div class="contenitore">
          <h1>L'Esquilino</h1>
          <p>venticinque secoli, punto per punto</p>
        </div>
      </section>

      <div class="fascia-cosmati" aria-hidden="true"></div>

      <section class="sezione">
        <div class="contenitore">
          <div
            class="centrato rivela"
            style="max-width: 660px; margin-inline: auto"
          >
            <span class="sopratitolo">Il rione</span>
            <h2 class="titolo-sezione">
              Il colle di <em>chi sta fuori</em>
            </h2>
            <div class="fregio"><span></span></div>
            <p>
              Lavoriamo da sessant'anni in una strada che ha sotto i piedi il
              cimitero di Roma, il giardino di Mecenate e le terme di Traiano.
              Ce la siamo fatta raccontare, e l'abbiamo messa in fila:
              {len(PUNTI)} punti, dal terrapieno delle mura al mercato di
              stamattina.
            </p>
          </div>

          <aside class="oggi-rione rivela" data-oggi-rione hidden>
            <p class="oggi-rione__soprascritta">
              Oggi all'Esquilino · <span data-oggi></span>
            </p>
            <p class="oggi-rione__quando" data-oggi-quando></p>
            <h2 class="oggi-rione__titolo" data-oggi-titolo></h2>
            <p class="oggi-rione__invito">
              <a href="#" data-oggi-collegamento>Leggi questo punto</a>
            </p>
          </aside>

          <figure class="muro-dipinto rivela">
            <div
              class="posto-foto"
              data-foto="muro-roma"
              role="img"
              aria-label="La veduta di Roma dipinta sulla parete della sala"
            ></div>
            <figcaption>
              Roma dipinta sulla parete della sala: il tempio rotondo del Foro
              Boario, i pini, e il pannello con la poesia in romanesco. Non è
              una stampa antica — è il muro di casa nostra.
            </figcaption>
          </figure>

          <ol class="cronologia rivela">
{voci}
          </ol>

          <div class="cronologia__chiusa centrato">
            <p class="mano" style="font-size: 1.9rem">
              Il rione si racconta meglio a tavola.
            </p>
            <p style="margin-top: 1.6rem">
              <a class="bottone" href="index.html#prenota">Prenota un tavolo</a>
              <a
                class="bottone bottone--vuoto"
                href="diario-esquilino.html"
                style="margin-left: 0.6rem"
                >Il rione di oggi</a
              >
            </p>
          </div>
        </div>
      </section>
    </main>

    {piede}

    {flottante}
    <script src="js/main.js" defer></script>
  </body>
</html>
"""


if __name__ == "__main__":
    USCITA.write_text(costruisci(), encoding="utf-8")
    print(f"scritto {USCITA.name} — {len(PUNTI)} punti")
