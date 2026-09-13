#!/usr/bin/env python3
"""Genera le versioni tradotte del sito.

    python3 strumenti/traduci.py

Legge le pagine italiane, sostituisce le frasi con quelle dei dizionari in
strumenti/lingue/*.json e scrive una cartella per lingua (en/, fr/, es/, ru/,
pl/). Le pagine italiane restano la sorgente: si modifica solo quella.

Nei dizionari la chiave è la frase italiana stessa, il valore la traduzione:
così si può cambiare il testo italiano senza scombinare tutto il resto. Le frasi
senza traduzione restano in italiano — ed è voluto per i nomi dei piatti, che in
un ristorante romano non si traducono.

strumenti/estrai.py rifà l'elenco delle frasi e dice quali sono senza traduzione.
"""

import json
import pathlib
import re

RADICE = pathlib.Path(__file__).resolve().parent.parent
PAGINE = ["index.html", "menu.html", "vini.html", "faq.html", "diario.html"]
LINGUE = {
    "en": "English",
    "fr": "Français",
    "es": "Español",
    "ru": "Русский",
    "pl": "Polski",
}
CODICI = ["it"] + list(LINGUE)
ATTRIBUTI = ["alt", "aria-label", "title", "content", "placeholder"]
SITO = "https://www.ristorantealfredoroma.it"


def frasi_di(html: str) -> list:
    """Le frasi visibili di una pagina, nello stesso ordine dell'estrazione."""
    pulito = re.sub(r"<script.*?</script>|<style.*?</style>|<!--.*?-->", "", html, flags=re.S)
    trovate = []
    for t in re.findall(r">([^<>]+)<", pulito):
        trovate.append(" ".join(t.split()))
    for attr in ATTRIBUTI:
        for t in re.findall(attr + r'="([^"]+)"', pulito):
            trovate.append(" ".join(t.split()))
    return trovate


def selettore(lingua: str, pagina: str, rientro: str = "        ") -> str:
    """Il selettore della lingua, con i collegamenti giusti per questa pagina."""
    righe = [rientro + "<!-- lingue -->", rientro + '<ul class="lingue" aria-label="Lingua">']
    for codice in CODICI:
        if codice == lingua:
            dove = pagina
        elif codice == "it":
            dove = "../" + pagina
        elif lingua == "it":
            dove = codice + "/" + pagina
        else:
            dove = "../" + codice + "/" + pagina
        corrente = ' aria-current="true"' if codice == lingua else ""
        righe.append(
            f'{rientro}  <li><a href="{dove}" hreflang="{codice}"{corrente}>'
            f"{codice.upper()}</a></li>"
        )
    righe += [rientro + "</ul>", rientro + "<!-- /lingue -->"]
    return "\n".join(righe)


def alternative(pagina: str) -> str:
    """I collegamenti hreflang: dicono a Google che è la stessa pagina."""
    righe = []
    for codice in CODICI:
        dove = f"{SITO}/{pagina}" if codice == "it" else f"{SITO}/{codice}/{pagina}"
        righe.append(f'    <link rel="alternate" hreflang="{codice}" href="{dove}" />')
    righe.append(f'    <link rel="alternate" hreflang="x-default" href="{SITO}/{pagina}" />')
    return "\n".join(righe)


def traduci(html: str, dizionario: dict, frasi: list, lingua: str, pagina: str) -> str:
    """Sostituisce le frasi, i percorsi e le intestazioni della pagina."""
    coppie = [
        (frase, dizionario[frase])
        for frase in frasi
        if dizionario.get(frase) and dizionario[frase].strip() != frase
    ]
    # prima le frasi lunghe: una corta potrebbe stare dentro una lunga
    coppie.sort(key=lambda c: -len(c[0]))

    for frase, tradotta in coppie:
        # nel file le frasi lunghe vanno a capo: si cerca con spazi elastici
        elastico = r"\s+".join(re.escape(parola) for parola in frase.split())
        # lo spazio intorno alla frase si conserva: a volte separa due parole
        # che stanno in tag diversi ("Prima il <span>Lazio</span>")
        html = re.compile(r">(\s*)" + elastico + r"(\s*)<").sub(
            lambda m, t=tradotta: ">" + m.group(1) + t + m.group(2) + "<", html
        )
        for attr in ATTRIBUTI:
            html = re.compile(attr + r'="\s*' + elastico + r'\s*"').sub(
                lambda _m, a=attr, t=tradotta: f'{a}="{t}"', html
            )

    # anche i dati strutturati parlano la lingua della pagina: sono quelli che
    # Google legge per mostrare piatti, domande e articoli nei risultati
    def traduci_dati(blocco):
        dentro = blocco.group(1)
        for chiave in ("name", "description", "headline", "text", "servesCuisine"):
            def sostituisci(m, k=chiave):
                valore = json.loads(f'"{m.group(1)}"')
                tradotta = dizionario.get(valore)
                if not tradotta:
                    # una risposta lunga nasce da piu' pezzi di pagina: si
                    # traduce pezzo per pezzo, dai piu' lunghi ai piu' corti
                    tradotta = valore
                    for frase, altra in coppie:
                        if frase in tradotta:
                            tradotta = tradotta.replace(frase, altra)
                    if tradotta == valore:
                        return m.group(0)
                return f'"{k}": ' + json.dumps(tradotta, ensure_ascii=False)

            dentro = re.sub(
                r'"' + chiave + r'":\s*"((?:[^"\\]|\\.)*)"', sostituisci, dentro
            )
        return blocco.group(0).replace(blocco.group(1), dentro)

    html = re.sub(
        r'(?s)<script type="application/ld\+json">(.*?)</script>', traduci_dati, html
    )

    # le pagine tradotte stanno in una cartella: fogli, immagini e script salgono
    html = re.sub(r'(href|src|poster)="(css|js|images)/', r'\1="../\2/', html)
    # gli articoli del diario e i codici QR restano in italiano, alla radice:
    # li segnaliamo con hreflang="it" perché il lettore sappia cosa lo aspetta
    html = re.sub(
        r'href="(diario-[a-z-]+\.html)"', r'href="../\1" hreflang="it"', html
    )
    html = re.sub(r'href="qr\.html"', r'href="../qr.html"', html)

    html = html.replace('<html lang="it">', f'<html lang="{lingua}">')
    html = html.replace(
        f'<link rel="canonical" href="{SITO}/{"" if pagina == "index.html" else pagina}" />',
        f'<link rel="canonical" href="{SITO}/{lingua}/{pagina}" />\n' + alternative(pagina),
    )
    html = html.replace('<meta property="og:locale" content="it_IT" />',
                        f'<meta property="og:locale" content="{lingua}" />')
    html = html.replace('"inLanguage": "it"', f'"inLanguage": "{lingua}"')

    blocco = re.search(r"([ \t]*)<!-- lingue -->.*?<!-- /lingue -->", html, re.S)
    if blocco:
        html = html.replace(blocco.group(0), selettore(lingua, pagina, blocco.group(1)))
    return html


def principale() -> None:
    frasi = json.loads((RADICE / "strumenti/lingue/frasi.json").read_text())

    for lingua in LINGUE:
        percorso = RADICE / "strumenti/lingue" / f"{lingua}.json"
        if not percorso.exists():
            print(f"{lingua}: dizionario mancante, saltata")
            continue
        dizionario = json.loads(percorso.read_text())
        cartella = RADICE / lingua
        cartella.mkdir(exist_ok=True)

        for pagina in PAGINE:
            html = (RADICE / pagina).read_text()
            (cartella / pagina).write_text(traduci(html, dizionario, frasi, lingua, pagina))

        tradotte = sum(1 for f in frasi if dizionario.get(f))
        print(
            f"{lingua}: {len(PAGINE)} pagine, {tradotte} frasi tradotte"
            f" su {len(frasi)}"
        )

    # anche le pagine italiane portano gli hreflang e il selettore aggiornato
    for pagina in PAGINE:
        percorso = RADICE / pagina
        html = percorso.read_text()
        if "hreflang=\"x-default\"" not in html:
            html = html.replace(
                f'<link rel="canonical" href="{SITO}/{"" if pagina == "index.html" else pagina}" />',
                f'<link rel="canonical" href="{SITO}/{"" if pagina == "index.html" else pagina}" />\n'
                + alternative(pagina),
            )
        blocco = re.search(r"([ \t]*)<!-- lingue -->.*?<!-- /lingue -->", html, re.S)
        if blocco:
            html = html.replace(blocco.group(0), selettore("it", pagina, blocco.group(1)))
        percorso.write_text(html)
    print("italiano: hreflang e selettore aggiornati")


if __name__ == "__main__":
    principale()
