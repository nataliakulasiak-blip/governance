#!/usr/bin/env python3
"""Rifà sitemap.xml dalle pagine che ci sono davvero.

    python3 strumenti/sitemap.py

Legge le pagine, salta quelle con `noindex` (i codici QR, il menu del giorno,
la scheda della divisa: servono alla casa, non a Google) e prende la data
dell'ultima modifica da git, così `lastmod` dice il vero senza che nessuno se
ne ricordi. Ogni pagina porta gli hreflang di tutte e sei le lingue.
"""

import datetime
import pathlib
import re
import subprocess

RADICE = pathlib.Path(__file__).resolve().parent.parent
SITO = "https://www.ristorantealfredoroma.it"
LINGUE = ["en", "fr", "es", "ru", "pl"]
# quanto conta una pagina, e ogni quanto cambia
PESO = {
    "": (1.0, "weekly"),
    "menu.html": (0.9, "weekly"),
    "vini.html": (0.8, "monthly"),
    "faq.html": (0.7, "monthly"),
    "diario.html": (0.7, "monthly"),
}
ARTICOLO = (0.6, "monthly")


def data_di(percorso: pathlib.Path) -> str:
    """L'ultima modifica secondo git; se il file è nuovo, oggi."""
    try:
        uscita = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", str(percorso)],
            cwd=RADICE, capture_output=True, text=True, timeout=20,
        ).stdout.strip()
        if uscita:
            return uscita
    except Exception:
        pass
    return datetime.date.today().isoformat()


def alternative(pagina: str) -> list:
    indirizzo = f"{SITO}/{pagina}"
    righe = [f'    <xhtml:link rel="alternate" hreflang="it" href="{indirizzo}" />']
    for lingua in LINGUE:
        dove = f"{SITO}/{lingua}/{pagina or 'index.html'}"
        righe.append(f'    <xhtml:link rel="alternate" hreflang="{lingua}" href="{dove}" />')
    righe.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{indirizzo}" />')
    return righe


def voce(indirizzo: str, pagina: str, data: str, priorita: float, frequenza: str) -> str:
    righe = [f"    <loc>{indirizzo}</loc>"]
    righe += alternative(pagina)
    righe.append(f"    <lastmod>{data}</lastmod>")
    righe.append(f"    <changefreq>{frequenza}</changefreq>")
    righe.append(f"    <priority>{priorita}</priority>")
    return "  <url>\n" + "\n".join(righe) + "\n  </url>"


def principale() -> None:
    voci, saltate = [], []
    for f in sorted(RADICE.glob("*.html")):
        testo = f.read_text()
        if re.search(r'name="robots"\s+content="noindex', testo):
            saltate.append(f.name)
            continue
        pagina = "" if f.name == "index.html" else f.name
        data = data_di(f)
        priorita, frequenza = PESO.get(pagina, ARTICOLO)
        voci.append(voce(f"{SITO}/{pagina}", pagina, data, priorita, frequenza))
        # le traduzioni esistono solo per le pagine che il generatore rifà
        for lingua in LINGUE:
            tradotta = RADICE / lingua / (pagina or "index.html")
            if not tradotta.exists():
                continue
            voci.append(
                voce(
                    f"{SITO}/{lingua}/{pagina or 'index.html'}",
                    pagina,
                    data_di(tradotta),
                    max(round(priorita - 0.1, 1), 0.1),
                    frequenza,
                )
            )

    fuori = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        "<urlset\n"
        '  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
        '  xmlns:xhtml="http://www.w3.org/1999/xhtml"\n'
        ">\n" + "\n".join(voci) + "\n</urlset>\n"
    )
    (RADICE / "sitemap.xml").write_text(fuori)
    print(f"{len(voci)} indirizzi nel sitemap")
    if saltate:
        print("fuori perché noindex:", ", ".join(saltate))


if __name__ == "__main__":
    principale()
