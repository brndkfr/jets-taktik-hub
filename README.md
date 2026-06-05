# JETS U14B – Taktik-Zentrale 🏒

Gamifizierte Taktik-Lernplattform für das U14B von **Unihockey JETS Kloten-Dietlikon**.
Reines Vanilla HTML/CSS/JS – läuft direkt auf **GitHub Pages**, Backend optional über **Google Sheets**.

## Was drin ist
| Datei | Zweck |
|-------|-------|
| `index.html` | Der Taktik-Hub: Kacheln, Theorie-Modal, Badges, Leaderboard |
| `quiz.html` | Dynamisches Quiz: Start → Fragen → Feedback → Resultat |
| `css/style.css` | Komplettes Design-System (Dark/Light, Brand-Farben) |
| `js/config.js` | **Hier `API_URL` eintragen** + alle Mock-/Beispieldaten |
| `js/api.js` | API-Schicht mit automatischem Mock-Fallback |
| `js/ui.js` | Theme, Sound, Konfetti, Streak, Badges, Icons |
| `js/index.js` · `js/quiz.js` | Seiten-Logik |
| `backend/Code.gs` | Google-Apps-Script-Backend (für später) |

## Demo-Modus (Standard)
Solange `API_URL` in `js/config.js` **leer** ist, läuft alles mit den Beispieldaten
(4 Themen, Fragen, Demo-Leaderboard). Perfekt zum Testen und sofort auf GitHub Pages lauffähig.

## Live schalten (Google Sheets als Backend)
1. Google Sheet mit 3 Blättern anlegen:
   - **Topics:** `ID | Title | Description | Category | Type | Active | Icon`
   - **Questions:** `TopicID | ID | Question | A | B | C | D | Answer | Explanation`
   - **Scores:** `Timestamp | UID | Name | Points | MaxPoints | TopicID`
2. *Erweiterungen → Apps Script* → Inhalt von `backend/Code.gs` einfügen.
3. *Bereitstellen → Web-App* → Zugriff: **Alle**. URL kopieren.
4. URL in `js/config.js` → `API_URL` eintragen. Fertig. ✅

> `Icon`-Werte für die Kacheln: `roles`, `box`, `dice`, `star`.

## Markenfarben
- Blau: **Pantone 286C** (`#0033A0`)
- Gelb: **Pantone 116C** (`#FFCD00`)
