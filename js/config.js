/* =============================================================
   JETS U14B – Taktik-Zentrale
   KONFIGURATION + MOCK-DATEN
   -------------------------------------------------------------
   ► Solange API_URL leer ist, läuft alles mit den Beispiel-
     Daten unten (perfekt für die Vorschau & GitHub Pages-Test).
   ► Sobald das Google-Apps-Script deployed ist, einfach die
     Web-App-URL hier eintragen — der Rest funktioniert automatisch.
   ============================================================= */

const CONFIG = {
  // 🔧 HIER später die Google-Apps-Script Web-App-URL eintragen:
  // z.B. "https://script.google.com/macros/s/AKfyc.../exec"
  API_URL: "",

  TEAM_NAME: "JETS U14",
  TEAM_SUB:  "Kloten-Dietlikon · Taktik Hub",

  // Coach-Ansicht PIN (nur browserseitige Absicherung)
  COACH_PIN: "1909",
};

/* =============================================================
   MOCK-DATEN  (entsprechen exakt dem Sheet-Schema)
   ============================================================= */
const MOCK = {

  /* --- Sheet "Topics" --- */
  topics: [
    {
      id: "spielerrollen",
      title: "Spielerrollen",
      description: "Goali, Verteidiger, Center & Flügel – wer macht was auf dem Grossfeld?",
      category: "Grundlagen",
      type: "Quiz",
      active: true,
      icon: "roles",
    },
    {
      id: "boxplay",
      title: "Boxplay",
      description: "So verteidigst du clever in Unterzahl und hältst den Slot dicht.",
      category: "Defensive",
      type: "Quiz",
      active: true,
      icon: "box",
    },
    {
      id: "wuerfel-2-1-2",
      title: "Würfel-System 2-1-2",
      description: "Unser Standard-Aufbau im Grossfeld – Positionen wie auf dem Würfel.",
      category: "System",
      type: "Quiz",
      active: true,
      icon: "dice",
    },
    {
      id: "powerplay",
      title: "Powerplay",
      description: "Überzahl ausnutzen: Scheiben laufen lassen und den Goali bezwingen.",
      category: "Offensive",
      type: "Quiz",
      active: true,
      icon: "star",
    },
  ],

  /* --- Theorie-Texte (für das "Theorie lesen"-Modal) --- */
  theory: {
    "spielerrollen": {
      intro: "Im Unihockey-Grossfeld stehen 5 Feldspieler plus der Goali auf dem Feld. Jede Position hat eine klare Aufgabe – nur wenn alle ihre Rolle kennen, funktioniert das Team.",
      sections: [
        { h: "Die Positionen", list: [
          "<b>Goali</b> – steht im «Chischtli» und ist der letzte Mann. Liest das Spiel und dirigiert die Verteidigung.",
          "<b>Verteidiger (2x)</b> – sichern hinten ab, gewinnen den Banden-Zweikampf und starten den Spielaufbau.",
          "<b>Center</b> – das Herz im Mittelfeld: unterstützt vorne und hinten, gewinnt Bullys.",
          "<b>Flügel (2x)</b> – schnell auf den Aussenbahnen, suchen den Abschluss aus dem Slot.",
        ]},
        { h: "Merke dir", list: [
          "Jeder verteidigt und jeder greift an – Unihockey ist Teamsport.",
          "Ohne Scheibe heisst es: Räume zumachen und den Gegner zum Fehler zwingen.",
          "Kommunikation ist alles – rede mit deinen Mitspielern!",
        ]},
      ],
    },
    "boxplay": {
      intro: "Boxplay ist deine Verteidigung in Unterzahl (z.B. nach einer 2-Minuten-Strafe). Vier Feldspieler bilden einen kompakten Block in Form einer «Box» und schützen den gefährlichen Slot vor dem eigenen Tor.",
      sections: [
        { h: "So funktioniert's", list: [
          "Vier Spieler bilden ein Viereck (Box) vor dem eigenen Tor.",
          "Der Slot – die Zone direkt vor dem Goali – wird <b>immer</b> zugemacht.",
          "Aktiv die Schusslinien blocken, nicht wild hinterherlaufen.",
          "Geduldig bleiben: Die Strafe läuft für dich – Fehler erzwingen, nicht riskieren.",
        ]},
        { h: "Schweizer Begriffe", list: [
          "<b>Block</b> – sich aktiv in die Schusslinie stellen.",
          "<b>Slot</b> – die Top-Chancen-Zone zentral vor dem Tor.",
          "<b>Chischtli</b> – das Tor / der Torraum des Goalis.",
        ]},
      ],
    },
    "wuerfel-2-1-2": {
      intro: "Das 2-1-2 ist unser Standard-Aufbau im Grossfeld. Die fünf Positionen sehen aus wie die Fünf auf einem Würfel: zwei hinten, einer in der Mitte, zwei vorne. Daher der Name «Würfel-System».",
      sections: [
        { h: "Die Anordnung", list: [
          "<b>2 hinten</b> – die Verteidiger, breit gestaffelt für die Absicherung.",
          "<b>1 in der Mitte</b> – der Center als Drehscheibe und Verbindungsspieler.",
          "<b>2 vorne</b> – die Flügel, bereit für Pässe in den Slot.",
        ]},
        { h: "Vorteile", list: [
          "Gute Balance zwischen Offensive und Defensive.",
          "Klare Passwege – die Scheibe kann sauber laufen.",
          "Schnelles Umschalten: aus der Verteidigung wird sofort der Angriff.",
        ]},
      ],
    },
    "powerplay": {
      intro: "Powerplay ist dein Angriff in Überzahl. Jetzt heisst es: Ruhe bewahren, die Scheibe laufen lassen und durch geduldiges Passspiel eine Lücke im gegnerischen Block finden.",
      sections: [
        { h: "Die Idee", list: [
          "Die Scheibe ist schneller als jeder Gegner – lass sie laufen!",
          "Breit aufstellen, damit der gegnerische Block auseinandergezogen wird.",
          "Einen Spieler im Slot postieren für Abpraller und Direktabnahmen.",
          "Den Goali zur Bewegung zwingen: schnelle Seitenwechsel.",
        ]},
        { h: "Worauf achten", list: [
          "Keine Hektik – ihr habt einen Mann mehr, also die Zeit nutzen.",
          "Schüsse aufs Tor bringen, dann den Rebound im Slot abstauben.",
          "Nach Scheibenverlust sofort umschalten und zurückarbeiten.",
        ]},
      ],
    },
  },

  /* --- Sheet "Questions" --- */
  questions: {
    "spielerrollen": [
      { id: 1, question: "Wie heisst der Spieler, der im Tor steht und es verteidigt?", a: "Center", b: "Goali", c: "Flügel", d: "Libero", answer: "B", explanation: "Der Goali (Torhüter) ist der letzte Mann und steht im «Chischtli». Er liest das Spiel und dirigiert die Verteidigung vor sich." },
      { id: 2, question: "Wie viele Feldspieler stehen pro Team im Grossfeld auf dem Feld (ohne Goali)?", a: "4", b: "6", c: "5", d: "7", answer: "C", explanation: "Im Grossfeld spielen 5 Feldspieler plus der Goali pro Team – zusammen also 6 Spieler auf dem Feld." },
      { id: 3, question: "Welche Aufgabe hat der Center vor allem?", a: "Nur Tore schiessen", b: "Verbindung zwischen Defensive und Offensive", c: "Im Tor stehen", d: "Nur an der Bande warten", answer: "B", explanation: "Der Center ist die Drehscheibe im Mittelfeld: Er unterstützt vorne wie hinten und gewinnt wichtige Bullys." },
      { id: 4, question: "Wo sind die Flügelspieler hauptsächlich unterwegs?", a: "Im eigenen Tor", b: "Zentral vor dem Tor", c: "Auf den Aussenbahnen", d: "Hinter dem Tor", answer: "C", explanation: "Die Flügel sind die schnellen Aussenspieler. Von der Aussenbahn suchen sie den Abschluss aus dem Slot." },
      { id: 5, question: "Was gilt für ALLE Feldspieler im Unihockey?", a: "Nur angreifen", b: "Nur verteidigen", c: "Angreifen UND verteidigen", d: "Nur passen", answer: "C", explanation: "Unihockey ist Teamsport: Jeder greift an und jeder verteidigt mit. Ohne Scheibe macht man Räume zu." },
      { id: 6, question: "Was ist die wichtigste «Waffe» zwischen den Spielern auf dem Feld?", a: "Schnelligkeit", b: "Kommunikation", c: "Ein harter Schuss", d: "Grösse", answer: "B", explanation: "Reden, rufen, dirigieren – ohne Kommunikation findet das Team keine Ordnung. Sie ist die Basis für gutes Zusammenspiel." },
    ],

    "boxplay": [
      { id: 1, question: "Wann spielst du Boxplay?", a: "In Überzahl", b: "In Unterzahl", c: "Beim Bully", d: "Immer", answer: "B", explanation: "Boxplay ist die Verteidigung in Unterzahl – z.B. wenn ein Mitspieler eine 2-Minuten-Strafe kassiert hat." },
      { id: 2, question: "Welche Form bilden die vier Spieler beim Boxplay?", a: "Eine Linie", b: "Einen Kreis", c: "Ein Viereck (Box)", d: "Ein Dreieck", answer: "C", explanation: "Vier Feldspieler stellen sich zu einer kompakten Box (Viereck) vor dem eigenen Tor auf – daher der Name Boxplay." },
      { id: 3, question: "Welche Zone muss beim Boxplay unbedingt zugemacht werden?", a: "Die Bande", b: "Der Slot", c: "Die Mittellinie", d: "Die gegnerische Hälfte", answer: "B", explanation: "Der Slot – die Top-Chancen-Zone direkt vor dem Goali – wird immer zuerst geschützt. Dort fallen die gefährlichsten Tore." },
      { id: 4, question: "Wie verhältst du dich beim Boxplay richtig?", a: "Wild jedem Gegner hinterherlaufen", b: "Geduldig bleiben und Schusslinien blocken", c: "Alle stürmen nach vorne", d: "Den Goali verlassen", answer: "B", explanation: "Ruhe bewahren! Aktiv die Schusslinien blocken statt hinterherzulaufen. Die Strafzeit läuft für dich – Fehler erzwingen." },
      { id: 5, question: "Was bedeutet der Schweizer Begriff «Chischtli»?", a: "Der Schläger", b: "Das Tor / der Torraum", c: "Der Ball", d: "Die Strafbank", answer: "B", explanation: "«Chischtli» (Kistchen) ist Schweizer Unihockey-Slang für das Tor bzw. den Torraum des Goalis." },
      { id: 6, question: "Was heisst «einen Schuss blocken»?", a: "Den Gegner foulen", b: "Sich aktiv in die Schusslinie stellen", c: "Den Goali ersetzen", d: "Aus dem Feld gehen", answer: "B", explanation: "Beim Block stellst du dich bewusst in die Schusslinie, damit die Scheibe gar nicht erst zum Tor durchkommt." },
    ],

    "wuerfel-2-1-2": [
      { id: 1, question: "Warum heisst das 2-1-2 auch «Würfel-System»?", a: "Es wird ausgewürfelt", b: "Die Positionen sehen aus wie die 5 auf einem Würfel", c: "Es gibt 6 Spieler", d: "Es ist Glückssache", answer: "B", explanation: "Zwei hinten, einer in der Mitte, zwei vorne – genau wie die Fünf-Augen auf einem Würfel. Daher der Name." },
      { id: 2, question: "Wie viele Spieler stehen beim 2-1-2 hinten (Defensive)?", a: "1", b: "2", c: "3", d: "0", answer: "B", explanation: "Die erste «2» steht für zwei Verteidiger hinten, die breit gestaffelt für Absicherung sorgen." },
      { id: 3, question: "Welche Position besetzt die «1» in der Mitte?", a: "Der Goali", b: "Ein Verteidiger", c: "Der Center", d: "Ein Flügel", answer: "C", explanation: "Die «1» ist der Center – die Drehscheibe, die Defensive und Offensive miteinander verbindet." },
      { id: 4, question: "Was ist ein grosser Vorteil des 2-1-2?", a: "Man muss nicht verteidigen", b: "Gute Balance zwischen Angriff und Verteidigung", c: "Man braucht keinen Goali", d: "Es ist nur für Kleinfeld", answer: "B", explanation: "Das 2-1-2 ist ausgewogen: Es bietet Sicherheit hinten und trotzdem genug Druck nach vorne." },
      { id: 5, question: "Warum sind klare Passwege im 2-1-2 wichtig?", a: "Damit der Goali schläft", b: "Damit die Scheibe sauber laufen kann", c: "Damit niemand rennt", d: "Gar nicht wichtig", answer: "B", explanation: "Durch die Staffelung entstehen saubere Passwege – die Scheibe kann schnell und sicher zirkulieren." },
      { id: 6, question: "Was passiert beim schnellen Umschalten?", a: "Man bleibt stehen", b: "Aus der Verteidigung wird sofort der Angriff", c: "Man wechselt den Goali", d: "Das Spiel ist zu Ende", answer: "B", explanation: "Sobald ihr die Scheibe erobert, schaltet ihr blitzschnell um: aus der Defensive entsteht direkt der nächste Angriff." },
    ],

    "powerplay": [
      { id: 1, question: "Wann spielst du Powerplay?", a: "In Unterzahl", b: "In Überzahl", c: "Beim Bully", d: "Wenn du müde bist", answer: "B", explanation: "Powerplay ist der Angriff in Überzahl – du hast einen Spieler mehr auf dem Feld als der Gegner." },
      { id: 2, question: "Was ist die wichtigste Grundregel im Powerplay?", a: "Sofort draufhauen", b: "Hektisch werden", c: "Ruhe bewahren und die Scheibe laufen lassen", d: "Alle nach hinten", answer: "C", explanation: "Geduld! Die Scheibe ist schneller als jeder Gegner. Lass sie zirkulieren, bis sich eine Lücke öffnet." },
      { id: 3, question: "Warum stellt man sich im Powerplay breit auf?", a: "Damit man sich ausruhen kann", b: "Um den gegnerischen Block auseinanderzuziehen", c: "Damit der Goali besser sieht", d: "Aus Langeweile", answer: "B", explanation: "Breite Aufstellung zieht den gegnerischen Block auseinander und öffnet Passwege und Schusslinien." },
      { id: 4, question: "Was macht der Spieler, der im Slot postiert ist?", a: "Er schläft", b: "Er lauert auf Abpraller und Direktabnahmen", c: "Er verteidigt das eigene Tor", d: "Er verlässt das Feld", answer: "B", explanation: "Der Slot-Spieler steht zentral vor dem Tor und staubt Rebounds ab oder verwertet Direktabnahmen." },
      { id: 5, question: "Wie zwingst du den Goali zu Fehlern?", a: "Gar nicht schiessen", b: "Schnelle Seitenwechsel", c: "Immer von derselben Seite", d: "Den Goali anschreien", answer: "B", explanation: "Schnelle Seitenwechsel zwingen den Goali, sich zu bewegen – dabei entstehen Lücken im «Chischtli»." },
      { id: 6, question: "Was musst du nach einem Scheibenverlust im Powerplay tun?", a: "Stehenbleiben", b: "Sofort umschalten und zurückarbeiten", c: "Weiter nach vorne stürmen", d: "Aufgeben", answer: "B", explanation: "Auch in Überzahl gilt: Nach Ballverlust sofort umschalten und zurückarbeiten, sonst droht ein Konter." },
    ],
  },

  /* --- Sheet "Scores" (demo entries with UID + 2-week history) --- */
  highscore: [
    // Luca – very active, top scorer
    { timestamp: "2026-06-04T19:22:00", uid: "uid-luca",  name: "Luca",  points: 6, maxPoints: 6, topicId: "powerplay" },
    { timestamp: "2026-06-04T17:10:00", uid: "uid-luca",  name: "Luca",  points: 6, maxPoints: 6, topicId: "spielerrollen" },
    { timestamp: "2026-06-03T20:05:00", uid: "uid-luca",  name: "Luca",  points: 5, maxPoints: 6, topicId: "boxplay" },
    { timestamp: "2026-06-02T18:30:00", uid: "uid-luca",  name: "Luca",  points: 6, maxPoints: 6, topicId: "wuerfel-2-1-2" },
    { timestamp: "2026-05-31T19:00:00", uid: "uid-luca",  name: "Luca",  points: 4, maxPoints: 6, topicId: "boxplay" },
    // Mia – active, solid
    { timestamp: "2026-06-04T18:40:00", uid: "uid-mia",   name: "Mia",   points: 6, maxPoints: 6, topicId: "boxplay" },
    { timestamp: "2026-06-02T19:15:00", uid: "uid-mia",   name: "Mia",   points: 5, maxPoints: 6, topicId: "spielerrollen" },
    { timestamp: "2026-05-31T17:20:00", uid: "uid-mia",   name: "Mia",   points: 5, maxPoints: 6, topicId: "powerplay" },
    { timestamp: "2026-05-28T16:00:00", uid: "uid-mia",   name: "Mia",   points: 4, maxPoints: 6, topicId: "wuerfel-2-1-2" },
    // Nael – active, mid scores
    { timestamp: "2026-06-03T20:11:00", uid: "uid-nael",  name: "Nael",  points: 5, maxPoints: 6, topicId: "spielerrollen" },
    { timestamp: "2026-06-01T19:00:00", uid: "uid-nael",  name: "Nael",  points: 3, maxPoints: 6, topicId: "boxplay" },
    { timestamp: "2026-05-30T18:10:00", uid: "uid-nael",  name: "Nael",  points: 4, maxPoints: 6, topicId: "powerplay" },
    // Elin – consistent, improving
    { timestamp: "2026-06-03T17:55:00", uid: "uid-elin",  name: "Elin",  points: 5, maxPoints: 6, topicId: "wuerfel-2-1-2" },
    { timestamp: "2026-06-01T16:30:00", uid: "uid-elin",  name: "Elin",  points: 4, maxPoints: 6, topicId: "spielerrollen" },
    { timestamp: "2026-05-29T19:40:00", uid: "uid-elin",  name: "Elin",  points: 3, maxPoints: 6, topicId: "boxplay" },
    { timestamp: "2026-05-25T17:00:00", uid: "uid-elin",  name: "Elin",  points: 2, maxPoints: 6, topicId: "wuerfel-2-1-2" },
    // Janis – semi-active
    { timestamp: "2026-06-01T19:30:00", uid: "uid-janis", name: "Janis", points: 5, maxPoints: 6, topicId: "powerplay" },
    { timestamp: "2026-05-28T18:00:00", uid: "uid-janis", name: "Janis", points: 4, maxPoints: 6, topicId: "spielerrollen" },
    // Lena – sporadic
    { timestamp: "2026-06-04T15:20:00", uid: "uid-lena",  name: "Lena",  points: 4, maxPoints: 6, topicId: "wuerfel-2-1-2" },
    { timestamp: "2026-05-28T14:00:00", uid: "uid-lena",  name: "Lena",  points: 3, maxPoints: 6, topicId: "boxplay" },
    // Finn – just started
    { timestamp: "2026-06-03T19:00:00", uid: "uid-finn",  name: "Finn",  points: 3, maxPoints: 6, topicId: "powerplay" },
    { timestamp: "2026-06-03T19:45:00", uid: "uid-finn",  name: "Finn",  points: 4, maxPoints: 6, topicId: "spielerrollen" },
    // Aaron – struggling
    { timestamp: "2026-05-31T14:20:00", uid: "uid-aaron", name: "Aaron", points: 3, maxPoints: 6, topicId: "boxplay" },
    { timestamp: "2026-05-30T16:10:00", uid: "uid-aaron", name: "Aaron", points: 2, maxPoints: 6, topicId: "powerplay" },
    // Sofia – barely active
    { timestamp: "2026-05-28T16:12:00", uid: "uid-sofia", name: "Sofia", points: 4, maxPoints: 6, topicId: "boxplay" },
    { timestamp: "2026-05-25T15:00:00", uid: "uid-sofia", name: "Sofia", points: 3, maxPoints: 6, topicId: "spielerrollen" },
    // Timo – inactive
    { timestamp: "2026-05-25T18:05:00", uid: "uid-timo",  name: "Timo",  points: 4, maxPoints: 6, topicId: "spielerrollen" },
    { timestamp: "2026-05-21T17:30:00", uid: "uid-timo",  name: "Timo",  points: 3, maxPoints: 6, topicId: "wuerfel-2-1-2" },
  ],
};
