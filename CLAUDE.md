# JETS Taktik Hub – Project Guidelines

## Theory content format

Theory articles live in `js/config.js` under `MOCK.theory["topicId"].markdown`.

### Structure
- `#` — Page title (one per article)
- `###` — Phase/section heading (e.g. "Phase 1: Offensive")
- `####` — Role or sub-topic heading (e.g. "Rolle 2: Mein Mitspieler hat den Ball")
- `**Label**` on its own line, followed by the explanation as a plain paragraph on the next line — do NOT embed labels inside bullet points

### Label + explanation pattern
```markdown
**Deine Aufgabe**
Unterstütze den Ballführenden aktiv durch Laufarbeit.

**Verhalten**
Laufe intelligent in freie Räume und kommuniziere klar.
```

Never write: `* **Deine Aufgabe:** Unterstütze den...` — this jams label and text onto one line and breaks on mobile.

### Lists
Use numbered lists (`1.`, `2.`, `3.`) for sequential steps or decision trees.
Use bullet lists (`*`) only for genuinely unordered items, without embedded bold labels.

Do NOT put bold text inside a numbered list item as a label prefix — it breaks on mobile:
```markdown
// bad
1. **Best Case:** Kann ich direkt aufs Tor schiessen...

// good - use a bold label paragraph before the list
**Deine Optionen im Kopf**

1. Best Case: Kann ich direkt aufs Tor schiessen...
2. Bessere Position: Wenn der Weg zum Tor zu ist...
3. Notausgang: Ist alles zugestellt?
```

### Bold / emphasis
- `**bold**` — key terms, role names, important concepts (renders in accent colour)
- `*italic*` — secondary notes, caveats

### Resources
Attach resources via the `resources` array, not inline in the markdown:
```js
resources: [
  { type: "pdf", position: "top", title: "...", url: "https://..." },
  { type: "youtube", title: "...", url: "https://..." },
]
```

Use `position: "top"` to pin a resource above the article (e.g. a poster PDF).
