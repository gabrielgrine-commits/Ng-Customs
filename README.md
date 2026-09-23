# NG Customs · Webseite

Cinematische Scroll-Webseite für NG Customs (Webseiten und KI-Rezeptionistinnen für KMU).
Gebaut nach der Anleitung „10K Websites“ (`10k-websites-skill.zip`).

- `website/` ist der Ordner, der online geht: `index.html` plus `assets/` (Film, Bilder, Schriften).
  Kein Build, keine Frameworks, Schriften liegen lokal (DSGVO).
- Vorschau mit Scroll-Film: im Ordner `website/` einen lokalen Server starten
  (`python3 -m http.server` oder `npx http-server`) und `http://localhost:8000` öffnen.
  Doppelklick auf `index.html` zeigt die Standbild-Variante.
- Film und Bilder wurden mit KI erstellt (Higgsfield), das steht auch im Footer.

## Vor dem Livegang
- Echte Telefonnummer (E-Mail ng-customs@hotmail.com ist eingetragen)
- Preise prüfen (Pakete und KI-Rezeptionistin)
- `impressum.html` und `datenschutz.html` mit echten Angaben füllen
- `og:image` und `og:url` beim Deploy auf die Live-Adresse setzen (Kommentar `DEPLOY STEP`)
