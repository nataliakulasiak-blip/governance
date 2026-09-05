#!/usr/bin/env python3
"""Genera i codici QR del Ristorante Alfredo in formato SVG.

    pip install segno
    python3 strumenti/genera-qr.py

I file finiscono in images/qr-*.svg. Modificare le costanti qui sotto con i
dati veri prima di stampare i codici.
"""

import pathlib
import segno

# --- Dati da personalizzare -------------------------------------------------

MENU_URL = "https://www.ristorantealfredoroma.it/menu.html"

WIFI_SSID = "Alfredo-Ospiti"
WIFI_PASSWORD = "buonappetito2026"
WIFI_SICUREZZA = "WPA"  # WPA, WEP oppure nopass per una rete aperta

# Place ID della scheda Google del ristorante: si ricava da
# https://developers.google.com/maps/documentation/places/web-service/place-id
# Con il segnaposto qui sotto il codice non porta a nessuna scheda.
GOOGLE_PLACE_ID = "INSERIRE_PLACE_ID"
RECENSIONE_URL = f"https://search.google.com/local/writereview?placeid={GOOGLE_PLACE_ID}"

# --- Aspetto ----------------------------------------------------------------

SCURO = "#5a1622"  # bordeaux
CHIARO = None  # sfondo trasparente

DESTINAZIONE = pathlib.Path(__file__).resolve().parent.parent / "images"


def wifi_payload() -> str:
    """Stringa standard letta dalle fotocamere di iOS e Android."""
    if WIFI_SICUREZZA.lower() == "nopass":
        return f"WIFI:T:nopass;S:{WIFI_SSID};;"
    return f"WIFI:T:{WIFI_SICUREZZA};S:{WIFI_SSID};P:{WIFI_PASSWORD};;"


def salva(nome: str, contenuto: str, correzione: str = "m") -> None:
    qr = segno.make(contenuto, error=correzione)
    percorso = DESTINAZIONE / nome
    qr.save(str(percorso), scale=10, border=2, dark=SCURO, light=CHIARO)
    print(f"{nome}: {contenuto[:60]}{'…' if len(contenuto) > 60 else ''}")


if __name__ == "__main__":
    DESTINAZIONE.mkdir(exist_ok=True)
    salva("qr-menu.svg", MENU_URL)
    salva("qr-wifi.svg", wifi_payload())
    # correzione alta: il codice della recensione finisce spesso su adesivi
    salva("qr-recensione.svg", RECENSIONE_URL, correzione="h")
