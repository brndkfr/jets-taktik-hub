# JETS U14 – Taktik Hub

A gamified tactics learning platform for the U14 squad of **Kloten-Dietlikon JETS** unihockey. Players study theory, take quizzes, earn badges and compete on a leaderboard. Coaches get a PIN-protected analytics dashboard.

Built with vanilla HTML/CSS/JS — no build step, runs directly on **GitHub Pages**. Backend is optional via **Google Sheets + Apps Script**.

---

## Features

- **Theory pages** — Markdown content with embedded resources: YouTube videos, images, PDFs, Instagram links, external links. Resources can be pinned above or below the article.
- **Quiz system** — Multiple-choice quizzes with instant answer feedback, explanations, and a results screen.
- **Leaderboard** — Top 30 scores synced from Google Sheets.
- **Badges & streak** — Players earn badges for milestones and maintain a daily play streak.
- **Coach dashboard** — PIN-protected view with team stats, per-topic performance bars, player activity table, and per-question failure rates.
- **Dark / light theme** — Persisted per device.
- **Performance** — sessionStorage caching (10 min for topics/questions, 3 min for scores) and background prefetch so navigation feels instant.
- **Mock mode** — Works fully offline with example data when no API URL is configured.

---

## Project Structure

```
jets-taktik-hub/
├── index.html          # Main hub: topic cards, badges, leaderboard, hero stats
├── theory.html         # Theory page: Markdown + embedded resources
├── quiz.html           # Quiz: start screen → questions → feedback → results
├── coach.html          # Coach dashboard (PIN-protected)
├── qr.html             # QR code share page
├── css/
│   └── style.css       # Full design system (dark/light, brand colours)
├── js/
│   ├── config.js       # Central config + all mock/example data
│   ├── api.js          # API layer: live calls + sessionStorage cache + mock fallback
│   ├── ui.js           # Theme, sound, confetti, streak, badges, SVG icons
│   ├── index.js        # Hub page logic
│   ├── quiz.js         # Quiz page logic
│   ├── theory.js       # Theory page logic
│   └── vendor/
│       └── marked.min.js  # Markdown parser (marked@18 UMD build, vendored)
├── assets/
│   └── jets-logo.png   # Club logo
├── backend/
│   └── Code.gs         # Google Apps Script backend
└── .nojekyll           # Prevents GitHub Pages Jekyll processing
```

---

## Getting Started

No build step required — open `index.html` in a browser or push to GitHub Pages. Without an `API_URL` the app runs entirely on mock data.

**GitHub Pages:**
1. Push the repo to GitHub.
2. Go to **Settings → Pages → Source: main / (root)**.
3. The site is live at `https://<user>.github.io/<repo>/`.

---

## Google Sheets Backend

### 1. Create the spreadsheet

Add four tabs with exactly these column headers in row 1:

**Topics**
```
ID | Title | Description | Category | Type | Active | Icon
```

**Questions**
```
TopicID | ID | Question | A | B | C | D | Answer | Explanation
```

**Scores**
```
Timestamp | UID | Name | Points | MaxPoints | TopicID
```

**Responses** *(per-question tracking)*
```
TopicID | QuestionID | Correct | Timestamp | UID
```

### 2. Deploy the Apps Script

1. In the sheet: **Extensions → Apps Script**
2. Paste the full contents of `backend/Code.gs` and save.
3. **Deploy → New deployment → Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the `/exec` URL.

### 3. Connect the frontend

Paste the URL into `js/config.js`:

```js
API_URL: "https://script.google.com/macros/s/YOUR_ID/exec",
```

The app switches to live mode automatically. ✅

> **Redeploying after code changes:** In Apps Script go to Deploy → Manage deployments → ✏️ → set Version to **New version** → Deploy. The URL stays the same.

---

## Adding Content

### Add a topic

Add a row to the **Topics** sheet:

| Field | Example | Notes |
|---|---|---|
| ID | `Spielerrollen` | Used in URLs — keep consistent with Questions tab |
| Title | `Spielerrollen` | Displayed on the card |
| Description | `Aufgaben und Rollen auf dem Spielfeld` | Card subtitle |
| Category | `Grundlagen` | Label above the title |
| Type | `Quiz` | Display only |
| Active | `TRUE` | Set to `FALSE` to hide |
| Icon | `roles` | See icon values below |

**Icon values:** `roles`, `box`, `dice`, `star`, `shield`, `play`

### Add questions

Add rows to the **Questions** sheet — one row per question:

| Field | Notes |
|---|---|
| TopicID | Must match the topic ID exactly |
| ID | Question number (1, 2, 3 …) |
| Question | Full question text |
| A–D | Answer options |
| Answer | Correct option: `A`, `B`, `C`, or `D` |
| Explanation | Shown after the player answers |

### Add theory content

Theory text is written in Markdown inside `js/config.js` under `MOCK.theory["topicId"]`.

To attach resources (shown below or above the article), add entries to the `resources` array:

```js
"spielerrollen": {
  markdown: `# Your markdown here...`,
  resources: [
    // Pinned above the article:
    { type: "pdf",       position: "top", title: "Official poster", url: "https://..." },

    // Below the article (default):
    { type: "youtube",   title: "Tactic video",  url: "https://www.youtube.com/watch?v=XXX" },
    { type: "image",     title: "Diagram",       url: "assets/diagrams/example.png" },
    { type: "link",      title: "Rulebook",      url: "https://..." },
    { type: "instagram", title: "Post",          url: "https://www.instagram.com/p/XXX/" },
  ],
},
```

| Type | Renders as |
|---|---|
| `youtube` | Responsive iframe (youtube-nocookie.com) |
| `pdf` | Embedded viewer via Google Docs viewer |
| `image` | Full-width figure with caption |
| `link` | Styled external link card |
| `instagram` | External link card |

Add `position: "top"` to any resource to render it above the article text.

---

## Coach Access

Navigate to `/coach.html` and enter the 4-digit PIN (set via `CONFIG.COACH_PIN` in `js/config.js`).

The dashboard shows:
- **Team overview** — active players this week, total quizzes, team average score, weakest topic
- **Topic performance** — average score per topic with colour-coded bars
- **Question failure rates** — per-question failure % for any topic, sorted worst-first
- **Player activity** — per-player average score, games played, trend (↑↓→), last quiz date

---

## Configuration Reference

All settings live in `js/config.js`:

| Key | Description |
|---|---|
| `API_URL` | Google Apps Script `/exec` URL. Empty = mock mode. |
| `COACH_PIN` | 4-digit PIN for the coach dashboard. |
| `TEAM_NAME` | Displayed in the header. |
| `TEAM_SUB` | Subtitle displayed in the header. |

---

## Brand Colours

| Colour | Pantone | Hex |
|---|---|---|
| Blue | 286 C | `#0033A0` |
| Yellow | 116 C | `#FFCD00` |

---

## Licenses

| What | License |
|---|---|
| Source code (HTML, CSS, JS, Apps Script) | [MIT](LICENSE) |
| Original theory content | [CC BY-NC 4.0](LICENSE-CONTENT) — © Bernd Kiefer |
| Third-party libraries & fonts | See [NOTICE](NOTICE) — all MIT or SIL OFL |
| External embedded documents (SwissUnihockey PDFs, YouTube) | Property of their respective owners — linked, not hosted |
