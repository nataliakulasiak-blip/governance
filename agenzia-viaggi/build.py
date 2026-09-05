#!/usr/bin/env python3
"""Genera una versione a file singolo dell'applicazione.

CSS e JavaScript vengono incorporati in `dist/tre-mari-travel.html`: un unico
file da inviare per email, mettere su una chiavetta o pubblicare online.

La funzione `saveFile` viene sostituita con una variante che usa l'API dei
download di claude.ai quando la pagina è pubblicata lì (i visualizzatori in
sandbox bloccano i link `blob:`), con ritorno al link classico altrove.

    python3 build.py
"""

import pathlib
import re

BASE = pathlib.Path(__file__).parent

SAVE_FILE_ARTIFACT = '''  /* Scarica il file generato: dentro un visualizzatore in sandbox il link
     "blob:" non funziona, quindi si passa dall'API dei download quando c'è. */
  async function saveFile(filename, text) {
    const downloads = window.claude?.use
      ? await window.claude.use("downloads")
      : null;

    if (downloads) {
      try {
        await downloads.save({ filename, data: text });
        toast(t("toast.exported"));
      } catch (error) {
        if (error?.code !== "declined") toast(error?.message ?? "");
      }
      return;
    }

    const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast(t("toast.exported"));
  }
'''


def patch_save_file(source: str) -> str:
    """Sostituisce la funzione saveFile con la variante compatibile."""
    start = source.index("  /* Scarica il file generato.")
    end = source.index("\n  }\n", source.index("function saveFile", start)) + len("\n  }\n")
    return source[:start] + SAVE_FILE_ARTIFACT + source[end:]


def main() -> None:
    html = (BASE / "index.html").read_text(encoding="utf-8")
    css = (BASE / "css/styles.css").read_text(encoding="utf-8")
    scripts = [
        (BASE / f"js/{name}.js").read_text(encoding="utf-8")
        for name in ("i18n", "data", "app")
    ]
    scripts[-1] = patch_save_file(scripts[-1])

    body = html.split("<body>", 1)[1].rsplit("</body>", 1)[0]
    body = re.sub(r'\s*<script src="js/\w+\.js"></script>', "", body)

    head = html.split("<head>", 1)[1].split("</head>", 1)[0].strip()
    parts = [
        "<!DOCTYPE html>",
        '<html lang="it">',
        "<head>",
        head,
        "<style>",
        css.strip(),
        "</style>",
        "</head>",
        "<body>",
        body.strip(),
        *[f"<script>\n{s.strip()}\n</script>" for s in scripts],
        "</body>",
        "</html>",
    ]

    out = BASE / "dist/tre-mari-travel.html"
    out.parent.mkdir(exist_ok=True)
    out.write_text("\n".join(parts), encoding="utf-8")
    print(f"scritto {out} ({out.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
