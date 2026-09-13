#!/usr/bin/env python3
"""Rifà i dati strutturati leggendo le pagine stesse.

    python3 strumenti/dati.py

Prezzi e domande si scrivono una volta sola, nella pagina. Questo comando
rilegge menu.html e faq.html e riscrive i blocchi JSON-LD — quelli che Google
usa per mostrare piatti e domande nei risultati — così i due non discordano.

Non è solo ordine: Google chiede che domanda e risposta dei dati strutturati
siano *le stesse* che il lettore vede in pagina, altrimenti la scheda non esce.

Da rilanciare dopo ogni cambio di prezzi, piatti, sezioni o domande.
"""

import html as entita
import json
import pathlib
import re

RADICE = pathlib.Path(__file__).resolve().parent.parent
CARTA = RADICE / "menu.html"
DOMANDE = RADICE / "faq.html"
SITO = "https://www.ristorantealfredoroma.it"
VALUTA = "EUR"


def pulisci(frammento: str) -> str:
    """Il testo dentro un tag, senza marcatori e senza le etichette colorate."""
    frammento = re.sub(
        r'<span class="piatto__etichetta">.*?</span>', "", frammento, flags=re.S
    )
    testo = entita.unescape(" ".join(re.sub(r"<[^>]+>", " ", frammento).split()))
    # togliendo i tag resta uno spazio prima della punteggiatura: via
    return re.sub(r"\s+([,.;:!?)»])", r"\1", re.sub(r"([(«])\s+", r"\1", testo))


def sezioni() -> list:
    testo = CARTA.read_text()
    corpo = re.search(r"<main>.*?</main>", testo, re.S).group(0)
    tagli = list(re.finditer(r"<h3>(.*?)</h3>", corpo, re.S))
    raccolte = []

    for numero, taglio in enumerate(tagli):
        titolo = re.sub(r"<span>.*?</span>", "", taglio.group(1), flags=re.S)
        fine = tagli[numero + 1].start() if numero + 1 < len(tagli) else len(corpo)
        pezzo = corpo[taglio.end() : fine]

        piatti = []
        for p in re.finditer(r'<div class="piatto">(.*?)</div>', pezzo, re.S):
            dentro = p.group(1)
            nome = re.search(r'class="piatto__nome"[^>]*>(.*?)</span\s*>', dentro, re.S)
            if not nome:
                continue
            voce = {"@type": "MenuItem", "name": pulisci(nome.group(1))}

            nota = re.search(r'class="piatto__nota"[^>]*>(.*?)</span\s*>', dentro, re.S)
            if nota:
                voce["description"] = pulisci(nota.group(1))

            prezzo = re.search(r'class="piatto__prezzo"[^>]*>(.*?)</span\s*>', dentro, re.S)
            if prezzo:
                cifre = re.search(r"[\d.,]+", pulisci(prezzo.group(1)))
                if cifre:
                    voce["offers"] = {
                        "@type": "Offer",
                        "price": f"{float(cifre.group(0).replace(',', '.')):.2f}",
                        "priceCurrency": VALUTA,
                    }

            etichette = re.findall(r'class="piatto__etichetta">([^<]+)<', dentro)
            diete = {
                "vegetariano": "https://schema.org/VegetarianDiet",
                "vegano": "https://schema.org/VeganDiet",
            }
            restrizioni = [diete[e] for e in etichette if e in diete]
            if restrizioni:
                voce["suitableForDiet"] = restrizioni

            piatti.append(voce)

        if piatti:
            raccolte.append(
                {
                    "@type": "MenuSection",
                    "name": pulisci(titolo),
                    "hasMenuItem": piatti,
                }
            )
    return raccolte


def voci_faq() -> list:
    """Le domande della pagina, con la risposta come la legge il visitatore."""
    testo = DOMANDE.read_text()
    corpo = re.search(r"<main>.*?</main>", testo, re.S).group(0)
    voci = []
    for v in re.finditer(r'<div class="faq__voce">(.*?)</div>\s*</div>', corpo, re.S):
        dentro = v.group(1)
        domanda = re.search(r'class="faq__domanda"(.*?)</button>', dentro, re.S)
        risposta = re.search(r'class="faq__risposta"[^>]*>(.*?)$', dentro, re.S)
        if not (domanda and risposta):
            continue
        testo_domanda = pulisci(re.sub(r"^[^>]*>", "", domanda.group(1), count=1))
        voci.append(
            {
                "@type": "Question",
                "name": testo_domanda,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": pulisci(risposta.group(1)),
                },
            }
        )
    return voci


def riscrivi_blocco(percorso: pathlib.Path, tipo: str, dati: dict) -> None:
    """Sostituisce nel file il blocco JSON-LD di quel tipo."""
    testo = percorso.read_text()
    for blocco in re.finditer(
        r'<script type="application/ld\+json">\s*(.*?)\s*</script>', testo, re.S
    ):
        if json.loads(blocco.group(1)).get("@type") != tipo:
            continue
        nuovo = json.dumps(dati, ensure_ascii=False, indent=6)
        nuovo = "\n".join(
            ("      " + r if i else r) for i, r in enumerate(nuovo.split("\n"))
        )
        percorso.write_text(testo[: blocco.start(1)] + nuovo + testo[blocco.end(1) :])
        return
    raise SystemExit(f"in {percorso.name} non c'e' un blocco JSON-LD di tipo {tipo}")


def principale() -> None:
    dati = {
        "@context": "https://schema.org",
        "@type": "Menu",
        "name": "La carta del Ristorante Alfredo",
        "inLanguage": "it",
        "url": f"{SITO}/menu.html",
        "hasMenuSection": sezioni(),
    }

    riscrivi_blocco(CARTA, "Menu", dati)
    piatti = sum(len(s["hasMenuItem"]) for s in dati["hasMenuSection"])
    print(f"menu.html: {len(dati['hasMenuSection'])} sezioni, {piatti} piatti")

    domande = voci_faq()
    riscrivi_blocco(
        DOMANDE,
        "FAQPage",
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "inLanguage": "it",
            "url": f"{SITO}/faq.html",
            "mainEntity": domande,
        },
    )
    print(f"faq.html: {len(domande)} domande, con le risposte della pagina")


if __name__ == "__main__":
    principale()
