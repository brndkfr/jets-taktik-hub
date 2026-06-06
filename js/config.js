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
  API_URL: "https://script.google.com/macros/s/AKfycbxtdijMRGkqrlRvyIlyRc0CJ1J9FbkkvGbN_JiPmxO6_rjD20x7q1fBpL0xI_9XW6UxXg/exec",

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

  /* --- Theorie-Texte  (→ theory.html?topic=<id>)
         Jeder Eintrag hat zwei Felder:
           markdown  – Artikeltext als Markdown-String
           resources – Array mit Zusatzmaterial (leer lassen wenn nichts da)
         Ressource-Typen: youtube | image | link | instagram
         Beispiele (auskommentiert) bei "spielerrollen".              --- */
  theory: {
    "spielerrollen": {
      markdown: `
# Taktik-Fokus: Die 4 Spielerrollen im Unihockey

Im modernen Unihockey spielen feste Positionen (wie „Stürmer" oder „Verteidiger") eine immer kleinere Rolle. Sobald du das Spielfeld betrittst, verändert sich deine Aufgabe im Sekundentakt. Entscheidend ist nur, wer den Ball hat und wo du dich befindest.

Es gibt **4 Spielerrollen**. Alle vier sind für den Erfolg des Teams exakt gleich wichtig.

---

### Phase 1: Unser Team hat den Ball (Offensive)

#### Rolle 1: ICH mit dem Ball

Du führst den Ball und trägst die Verantwortung für die aktuelle Aktion.

* **Grundregel:** Bleibe immer in Bewegung, um für die Abwehr unberechenbar zu sein.
* **Deine Optionen im Kopf (Entscheidungs-Matrix):**
1. **Best Case:** Kann ich direkt aufs Tor schiessen oder einen Pass spielen, der sofort zu einem Tor führt? (Hohe Belohnung bei tiefem Risiko).
2. **Bessere Position:** Wenn der Weg zum Tor zu ist: Kann ich den Ball zu einem Mitspieler passen, der freier steht, oder mich selbst durch Laufen in eine bessere Position bringen? *(Ein Pass ist fast immer schneller als ein Dribbling).*
3. **Notausgang:** Ist alles zugestellt? Sichere den Ballbesitz. Spiel den Ball kontrolliert nach hinten oder halte ihn in den eigenen Reihen, anstatt einen Ballverlust zu riskieren.

#### Rolle 2: Mein Mitspieler hat den Ball

Du hast den Ball nicht, aber dein Team ist im Ballbesitz.

* **Deine Aufgabe:** Unterstütze den Ballführenden aktiv durch Laufarbeit. Das Ziel ist es, dem Mitspieler immer **drei Anspielstationen** anzubieten.
* **Verhalten:** Laufe intelligent in freie Räume, um Passwege zu öffnen, und kommuniziere klar auf dem Feld.

---

### Phase 2: Der Gegner hat den Ball (Defensive)

#### Rolle 3: Direkter Gegenspieler MIT Ball

Du bist der Verteidiger, der direkt vor dem ballführenden Gegner steht.

* **Deine Aufgabe:** Such den direkten Zweikampf, übe Druck aus und zwinge den Gegner zu Fehlern.
* **Verhalten:** Stelle Pass- und Schusswege mit dem Stock zu. Steuere den Gegner bewusst nach aussen an die Bande, weg von der gefährlichen Mitte. Schüsse werden konsequent geblockt.

#### Rolle 4: Direkter Gegenspieler OHNE Ball

Der Ball ist auf der anderen Feldseite, aber du teilst dich für den gegnerischen Spieler ein, der ohne Ball mitläuft.

* **Deine Aufgabe:** Den Raum absichern und Pässe verhindern.
* **Verhalten:** **Stehe immer INSIDE!** Das bedeutet: Du befindest dich immer auf der inneren Linie zwischen deinem Gegenspieler und unserem Tor. Richte dich nicht nur starr nach dem Ball aus. Halte deinen Körper offen zum Spielfeld, damit du den Ball UND deinen Gegenspieler gleichzeitig im Blick hast. Schliesse Passwege und rede mit deinen Mitspielern für eine lückenlose Zuteilung.

---

**Fazit:** Unihockey ist zu schnell für starres Denken. Wer am schnellsten zwischen diesen vier Rollen umschaltet, kontrolliert das Spiel.
`,
      resources: [
        // { type: "youtube",   title: "Video-Titel",  url: "https://www.youtube.com/watch?v=XXXX" },
        // { type: "image",     title: "Bildtitel",    url: "assets/diagrams/spielerrollen.png" },
        // { type: "link",      title: "Linktitel",    url: "https://..." },
        // { type: "instagram", title: "Post-Titel",   url: "https://www.instagram.com/p/XXXX/" },
      ],
    },

    "boxplay": {
      markdown: `
Boxplay ist deine Verteidigung in Unterzahl (z.B. nach einer 2-Minuten-Strafe).
Vier Feldspieler bilden einen kompakten Block in Form einer «Box» und schützen den gefährlichen Slot vor dem eigenen Tor.

## So funktioniert's

- Vier Spieler bilden ein Viereck (Box) vor dem eigenen Tor.
- Der Slot – die Zone direkt vor dem Goali – wird **immer** zugemacht.
- Aktiv die Schusslinien blocken, nicht wild hinterherlaufen.
- Geduldig bleiben: Die Strafe läuft für dich – Fehler erzwingen, nicht riskieren.

## Schweizer Begriffe

- **Block** – sich aktiv in die Schusslinie stellen.
- **Slot** – die Top-Chancen-Zone zentral vor dem Tor.
- **Chischtli** – das Tor / der Torraum des Goalis.
`,
      resources: [],
    },

    "wuerfel-2-1-2": {
      markdown: `
Das 2-1-2 ist unser Standard-Aufbau im Grossfeld. Die fünf Positionen sehen aus wie die Fünf auf einem Würfel: zwei hinten, einer in der Mitte, zwei vorne. Daher der Name «Würfel-System».

## Die Anordnung

- **2 hinten** – die Verteidiger, breit gestaffelt für die Absicherung.
- **1 in der Mitte** – der Center als Drehscheibe und Verbindungsspieler.
- **2 vorne** – die Flügel, bereit für Pässe in den Slot.

## Vorteile

- Gute Balance zwischen Offensive und Defensive.
- Klare Passwege – die Scheibe kann sauber laufen.
- Schnelles Umschalten: aus der Verteidigung wird sofort der Angriff.
`,
      resources: [],
    },

    "powerplay": {
      markdown: `
Powerplay ist dein Angriff in Überzahl. Jetzt heisst es: Ruhe bewahren, die Scheibe laufen lassen
und durch geduldiges Passspiel eine Lücke im gegnerischen Block finden.

## Die Idee

- Die Scheibe ist schneller als jeder Gegner – lass sie laufen!
- Breit aufstellen, damit der gegnerische Block auseinandergezogen wird.
- Einen Spieler im Slot postieren für Abpraller und Direktabnahmen.
- Den Goali zur Bewegung zwingen: schnelle Seitenwechsel.

## Worauf achten

- Keine Hektik – ihr habt einen Mann mehr, also die Zeit nutzen.
- Schüsse aufs Tor bringen, dann den Rebound im Slot abstauben.
- Nach Scheibenverlust sofort umschalten und zurückarbeiten.
`,
      resources: [],
    },
  },

  /* --- Sheet "Questions" --- */
  questions: {
    "spielerrollen": [
      { id: 1,  question: "Du fängst einen Pass ab und kontrollierst den Ball am Stock. In welcher Spielerrolle befindest du dich in diesem Moment?", a: "Spielerrolle 1 – Ich mit Ball", b: "Spielerrolle 2 – Mitspieler mit Ball", c: "Spielerrolle 3 – Direkter Gegenspieler mit Ball", d: "Spielerrolle 4 – Direkter Gegenspieler ohne Ball", answer: "A", explanation: "Sobald du die direkte Kontrolle über das Spielgerät übernimmst, bist du der ballführende Akteur." },
      { id: 2,  question: "Was ist laut der Entscheidungs-Matrix der allererste Gedanke, den du in «Spielerrolle 1 – Ich mit Ball» haben solltest?", a: "Sicherung des Ballbesitzes durch einen kontrollierten Rückpass", b: "Best Case (Direkte Torgefahr kreieren)", c: "Ein langes Dribbling an der Bande starten", d: "Den Ball sofort hoch nach vorne löffeln", answer: "B", explanation: "Der erste Blick muss immer dem gegnerischen Tor gelten, um zu prüfen, ob ein Abschluss oder ein tödlicher Pass möglich ist." },
      { id: 3,  question: "Wann wählst du in «Spielerrolle 1 – Ich mit Ball» die Option «Bessere Position»?", a: "Wenn keine direkte «Best Case»-Möglichkeit (Torgefahr) vorhanden ist", b: "Sobald der Trainer es von der Bande aus zuruft", c: "Nur in den letzten Sekunden des Drittels", d: "Wenn du müde bist und wechseln willst", answer: "A", explanation: "Ist der direkte Weg zum Tor zu, versucht man die Position für das Team durch einen Pass oder Laufweg zu verbessern." },
      { id: 4,  question: "Was versteht man unter dem Begriff «Notausgang», wenn du dich in «Spielerrolle 1 – Ich mit Ball» befindest?", a: "Den Ball absichtlich ins Aus schlagen, um Zeit zu gewinnen", b: "Den Ballbesitz sichern und hinten herum in den eigenen Reihen halten", c: "Ein schnelles Foul ziehen, um das Spiel zu stoppen", d: "Den Ball blockieren und sich darauf knien", answer: "B", explanation: "Wenn nach vorne alles dicht ist, hat die reine Sicherung des Balles oberste Priorität." },
      { id: 5,  question: "Wie verhältst du dich in «Spielerrolle 1 – Ich mit Ball» idealerweise, um für die gegnerische Abwehr schwer berechenbar zu sein?", a: "Du bleibst an der Bande stehen und wartest auf Unterstützung", b: "Du bleibst ständig in Bewegung", c: "Du schaust beim Laufen starr auf das Lochmuster des Balles", d: "Du spielst den Ball immer sofort nach einem Kontakt blind weg", answer: "B", explanation: "Laufarbeit mit dem Ball öffnet Räume, zieht Verteidiger mit und schafft Passwege." },
      { id: 6,  question: "Dein Teamkollege führt den Ball und du läufst ohne Ball im gegnerischen Drittel mit. Welche Rolle hast du?", a: "Spielerrolle 1 – Ich mit Ball", b: "Spielerrolle 2 – Mitspieler mit Ball", c: "Spielerrolle 3 – Direkter Gegenspieler mit Ball", d: "Spielerrolle 4 – Direkter Gegenspieler ohne Ball", answer: "B", explanation: "Rolle 2 definiert das Verhalten aller angreifenden Spieler, die sich ohne Ball für den Pass anbieten." },
      { id: 7,  question: "Wie viele Anspielstationen sollten dem ballführenden Spieler durch gutes Freilaufen in «Spielerrolle 2 – Mitspieler mit Ball» im Idealfall angeboten werden?", a: "Keine, der Ballführende muss sich im 1:1 durchsetzen", b: "Genau eine feste Station", c: "Drei Anspielstationen", d: "Alle vier Mitspieler müssen auf einer engen Linie stehen", answer: "C", explanation: "Drei Optionen bieten dem Ballführenden die beste Auswahl für ein variables und schnelles Passspiel." },
      { id: 8,  question: "Was ist die Hauptaufgabe, wenn du dich in «Spielerrolle 2 – Mitspieler mit Ball» befindest?", a: "Raum schaffen und sich aktiv als Anspielstation anbieten", b: "Sich hinter dem gegnerischen Center verstecken, um Kraft zu sparen", c: "Den eigenen Torhüter vor eventuellen Befreiungsschlägen schützen", d: "Stehen bleiben und den Spielzug beobachten", answer: "A", explanation: "Durch ständige Laufarbeit in freie Zonen unterstützt du deinen ballführenden Kollegen." },
      { id: 9,  question: "Was ist bei der Option «Bessere Position» (Spielerrolle 1) laut Playbook grundsätzlich vorzuziehen?", a: "Ein langes Dribbling durch die gesamte gegnerische Box", b: "Ein gezielter Pass zu einem besser positionierten Mitspieler", c: "Den Ball unkontrolliert per Rückhand in die Mitte schlagen", d: "Der Versuch, ein Foul des Gegners zu provozieren", answer: "B", explanation: "Ein Pass bewegt den Ball schneller als jeder Laufweg und schont die Kräfte des Teams." },
      { id: 10, question: "Welche Eigenschaften sind für «Spielerrolle 2 – Mitspieler mit Ball» besonders entscheidend?", a: "Reine Körpergrösse für harte Checks", b: "Laufbereitschaft und Spielintelligenz", c: "Ein besonders harter Schlagschuss", d: "Möglichst laut an der Bande zu rufen", answer: "B", explanation: "Du musst Situationen schnell voraussehen und viel laufen, um Lücken in die Abwehr zu reissen." },
      { id: 11, question: "Der Gegner führt den Ball und du stehst als Verteidiger direkt vor ihm. Welche Rolle nimmst du ein?", a: "Spielerrolle 1 – Ich mit Ball", b: "Spielerrolle 2 – Mitspieler mit Ball", c: "Spielerrolle 3 – Direkter Gegenspieler mit Ball", d: "Spielerrolle 4 – Direkter Gegenspieler ohne Ball", answer: "C", explanation: "Rolle 3 definiert den direkten, aggressiven Verteidigerdruck auf den ballführenden Gegenspieler." },
      { id: 12, question: "Was ist dein primäres Ziel in «Spielerrolle 3 – Direkter Gegenspieler mit Ball»?", a: "Den direkten Zweikampf suchen, Druck ausüben und Fehler erzwingen", b: "Rückwärts weglaufen, um den Abstand zum Gegner zu vergrössern", c: "Sich flach auf den Boden legen, um den Ball abzufangen", d: "Den eigenen Center im Auge behalten", answer: "A", explanation: "Durch aktives Zustellen und Stören soll der gegnerische Angriffsfluss unterbrochen werden." },
      { id: 13, question: "Wohin solltest du den ballführenden Gegner in «Spielerrolle 3 – Direkter Gegenspieler mit Ball» idealerweise steuern?", a: "In die gefährliche Mitte direkt vor unserem Tor", b: "In ungefährliche Zonen (z. B. nach aussen an die Bande)", c: "Direkt in den Sichtbereich unseres Torhüters, um ihn zu prüfen", d: "Gar nirgends hin, man sollte ihn einfach laufen lassen", answer: "B", explanation: "An der Bande ist der Winkel zum Tor schlecht und die Passoptionen des Gegners sind stark eingeschränkt." },
      { id: 14, question: "Was bedeutet der taktische Begriff «Inside stehen», wenn du dich in «Spielerrolle 4 – Direkter Gegenspieler ohne Ball» befindest?", a: "Dass du dich innerhalb der Auswechselbox aufhalten musst", b: "Dass du immer auf der inneren Linie zwischen deinem Gegenspieler und unserem Tor stehst", c: "Dass du dich im Torraum des Gegners positionierst", d: "Dass du deinen Schläger flach auf die Torlinie legst", answer: "B", explanation: "Dadurch verwehrst du dem Angreifer den direkten, gefährlichen Weg zu unserem Gehäuse." },
      { id: 15, question: "Welche Blick- und Körperausrichtung ist in «Spielerrolle 4 – Direkter Gegenspieler ohne Ball» korrekt?", a: "Starr und ausschliesslich auf den Ball schauen (Ball-Hypnose)", b: "Offen zum Spielfeld stehen, um den Ball UND den Gegenspieler zu sehen", c: "Mit dem Rücken zum Ball stehen und nur den Gegner fixieren", d: "Zum eigenen Torhüter schauen und Anweisungen abwarten", answer: "B", explanation: "Diese offene Position sichert die Übersicht und verhindert, dass du vom Pass überrascht wirst." },
      { id: 16, question: "Was passiert meistens, wenn du in «Spielerrolle 4 – Direkter Gegenspieler ohne Ball» nur starr auf den Ball schaust?", a: "Du fängst jeden gegnerischen Querpass automatisch ab", b: "Dein Gegenspieler kann sich unbemerkt in deinem Rücken freilaufen und gefährlich werden", c: "Der Schiedsrichter pfeift sofort ein Bodenspiel ab", d: "Der gegnerische Ball verliert dadurch an Geschwindigkeit", answer: "B", explanation: "Ohne Schulterblick und offene Stellung reissen in der Abwehr sofort tödliche Lücken auf." },
      { id: 17, question: "Warum ist die Kommunikation in «Spielerrolle 4 – Direkter Gegenspieler ohne Ball» so wichtig für das Team?", a: "Um die richtige Zuteilung der Gegenspieler bei Kreuzbewegungen abzusprechen", b: "Um den gegnerischen Trainer zu verunsichern", c: "Damit die Schiedsrichter sehen, dass wir motiviert sind", d: "Es ist laut Reglement verboten, in dieser Rolle zu sprechen", answer: "A", explanation: "Bei schnellen Spielzügen verhindert lautes Reden, dass ein Angreifer komplett vergessen wird." },
      { id: 18, question: "Wie verhält sich das Verhältnis von Risiko und Belohnung bei einer «Best Case»-Aktion in Spielerrolle 1?", a: "Das Risiko muss hoch und die Belohnung tief sein", b: "Das Risiko muss tief und die Belohnung hoch sein", c: "Das Risiko und die Belohnung müssen exakt ausgeglichen sein", d: "Das Risiko spielt im Juniorenbereich überhaupt keine Rolle", answer: "B", explanation: "Man sucht die klare, effektive Aktion zum Torerfolg, ohne das Team für Konter zu öffnen." },
      { id: 19, question: "Welche Fähigkeit erleichtert dir die Aufgaben in «Spielerrolle 4 – Direkter Gegenspieler ohne Ball» erheblich?", a: "Richtige Antizipation (das Spiel und die Pässe voraussehen)", b: "Möglichst schwere Schlägermodelle zu benutzen", c: "Das Spiel permanent im Knien zu absolvieren", d: "Den Ball absichtlich mit dem Fuss ins Toraus zu kicken", answer: "A", explanation: "Wer erahnt, wohin der Ball gleich fliegt, steht bereits richtig und spart Laufwege." },
      { id: 20, question: "Was fordert das U14-Playbook beim Blocken von Schüssen in «Spielerrolle 3 – Direkter Gegenspieler mit Ball» ein?", a: "Dass man sich wegdreht oder wegduckt, wenn der Schuss hart ist", b: "Richtiges Blocken im Training fordern – keine Ausreden", c: "Dass ausschliesslich der Torhüter für Schüsse zuständig ist", d: "Dass man den Schläger wirft, um den Ball abzufangen", answer: "B", explanation: "Schüsse blocken ist eine Frage der Einstellung und für eine kompakte Defensivreihe Pflicht." },
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
