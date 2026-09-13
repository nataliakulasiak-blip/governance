#!/usr/bin/env python3
"""Rifà l'elenco delle frasi da tradurre e dice cosa manca.

    python3 strumenti/estrai.py

Legge le pagine italiane e riscrive strumenti/lingue/frasi.json: l'elenco
ordinato delle frasi visibili, senza doppioni. Poi confronta l'elenco con i
dizionari e segnala due cose:

- le frasi **senza traduzione**, da aggiungere;
- le traduzioni **orfane**, rimaste lì dopo che la frase italiana è cambiata.

Nei dizionari la chiave è la frase italiana, non la sua posizione: cambiare il
testo italiano non scombina il resto, rende solo orfana quella voce.

Restano fuori le scritte che non si traducono: prezzi, orari, numeri di
telefono, le sigle delle lingue.
"""

import json
import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from traduci import CODICI, LINGUE, PAGINE, RADICE, frasi_di  # noqa: E402

CARTELLA = RADICE / "strumenti/lingue"
ELENCO = CARTELLA / "frasi.json"
SIGLE = {c.upper() for c in CODICI}


def da_tradurre(frase: str) -> bool:
    """Vero se la frase è testo, non un prezzo o un orario."""
    if frase in SIGLE:
        return False
    if not re.search(r"[^\W\d_]{2,}", frase):  # almeno due lettere di fila
        return False
    return True


def raccogli() -> list:
    viste, elenco = set(), []
    for pagina in PAGINE:
        for frase in frasi_di((RADICE / pagina).read_text()):
            if frase and frase not in viste and da_tradurre(frase):
                viste.add(frase)
                elenco.append(frase)
    return elenco


def principale() -> None:
    frasi = raccogli()
    ELENCO.write_text(json.dumps(frasi, ensure_ascii=False, indent=2) + "\n")
    print(f"{len(frasi)} frasi nelle pagine italiane\n")

    dentro = set(frasi)
    for lingua in LINGUE:
        percorso = CARTELLA / f"{lingua}.json"
        if not percorso.exists():
            print(f"{lingua}: dizionario mancante")
            continue
        dizionario = json.loads(percorso.read_text())
        senza = [f for f in frasi if not dizionario.get(f)]
        orfane = [f for f in dizionario if f not in dentro]
        print(
            f"{lingua}: {len(frasi) - len(senza)} tradotte,"
            f" {len(senza)} senza traduzione,"
            f" {len(orfane)} orfane"
        )
        for f in orfane[:6]:
            print(f"    orfana: {f[:72]!r}")


if __name__ == "__main__":
    principale()
