#!/usr/bin/env python3
"""Scarica i caratteri e li mette dentro al sito.

    python3 strumenti/caratteri.py

Il sito li prendeva da Google a ogni apertura. Tenerli in casa serve a tre
cose: le pagine si aprono prima, la stampa e i PDF escono con i caratteri
giusti anche senza rete, e non si manda l'indirizzo IP di chi legge a un
server terzo — che in Europa, per un sito con un modulo di prenotazione, e'
una cosa che conta.

Scrive i file in css/caratteri/ e il foglio css/caratteri.css.
Da rilanciare solo se si cambiano i caratteri o se ne serve un altro peso.
"""

import pathlib
import re
import urllib.request

RADICE = pathlib.Path(__file__).resolve().parent.parent
CARTELLA = RADICE / "css/caratteri"
FOGLIO = RADICE / "css/caratteri.css"

RICHIESTA = (
    "https://fonts.googleapis.com/css2"
    "?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400"
    "&family=Jost:wght@200;300;400"
    "&family=Pinyon+Script"
    "&display=swap"
)
# Il sito parla sei lingue: servono i segni latini, quelli dell'Europa
# centrale (polacco) e il cirillico (russo). Il resto non si scarica.
SOTTOINSIEMI = {"latin", "latin-ext", "cyrillic", "cyrillic-ext"}
FINTO_BROWSER = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120 Safari/537.36"
)


def scarica(indirizzo: str) -> bytes:
    richiesta = urllib.request.Request(indirizzo, headers={"User-Agent": FINTO_BROWSER})
    with urllib.request.urlopen(richiesta, timeout=30) as risposta:
        return risposta.read()


def principale() -> None:
    css = scarica(RICHIESTA).decode()
    CARTELLA.mkdir(parents=True, exist_ok=True)

    blocchi = re.findall(r"(/\* ([a-z-]+) \*/\s*@font-face \{.*?\})", css, re.S)
    fuori, presi, saltati = [], 0, 0

    for blocco, sottoinsieme in blocchi:
        if sottoinsieme not in SOTTOINSIEMI:
            saltati += 1
            continue
        url = re.search(r"url\((https://[^)]+\.woff2)\)", blocco).group(1)
        famiglia = re.search(r"font-family: '([^']+)'", blocco).group(1)
        peso = re.search(r"font-weight: (\d+)", blocco).group(1)
        corsivo = "italic" in blocco
        nome = (
            famiglia.lower().replace(" ", "-")
            + f"-{peso}"
            + ("-italic" if corsivo else "")
            + f"-{sottoinsieme}.woff2"
        )
        percorso = CARTELLA / nome
        if not percorso.exists():
            percorso.write_bytes(scarica(url))
        presi += 1
        fuori.append(
            blocco.replace(url, f"caratteri/{nome}").replace(
                "/* " + sottoinsieme + " */", f"/* {famiglia} · {sottoinsieme} */"
            )
        )

    intestazione = (
        "/* I caratteri del sito, tenuti in casa.\n"
        "   Li rifà strumenti/caratteri.py: non si modifica a mano. */\n\n"
    )
    FOGLIO.write_text(intestazione + "\n\n".join(fuori) + "\n")
    peso = sum(f.stat().st_size for f in CARTELLA.glob("*.woff2"))
    print(f"{presi} file scaricati ({saltati} sottoinsiemi saltati), {peso // 1024} kB")


if __name__ == "__main__":
    principale()
