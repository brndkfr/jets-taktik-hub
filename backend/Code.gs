/**************************************************************
 * JETS U14B – Taktik-Zentrale  ·  Google Apps Script Backend
 * ------------------------------------------------------------
 * Dieses Skript läuft IM Google Sheet und stellt eine kleine
 * JSON-API für die GitHub-Pages-Seite bereit.
 *
 * REQUIRED SHEETS (Row 1 = header):
 *   "Topics":    ID | Title | Description | Category | Type | Active | Icon
 *   "Questions": TopicID | ID | Question | A | B | C | D | Answer | Explanation
 *   "Scores":    Timestamp | UID | Name | Points | MaxPoints | TopicID
 *
 * DEPLOY (einmalig):
 *   1) Sheet öffnen → Erweiterungen → Apps Script → diesen Code einfügen
 *   2) Bereitstellen → Neue Bereitstellung → Typ: Web-App
 *   3) "Ausführen als: ich"  +  "Zugriff: Alle (auch anonym)"
 *   4) Die /exec-URL kopieren und in js/config.js bei API_URL eintragen.
 **************************************************************/

// ---- Endpunkt: GET ----------------------------------------
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || "";
  try {
    switch (action) {
      case "getTopics":    return json(getTopics());
      case "getQuestions": return json(getQuestions(e.parameter.topicId));
      case "getScores":    return json(getScores());
      default:             return json({ ok: true, info: "JETS U14B API läuft." });
    }
  } catch (err) {
    return json({ error: String(err) });
  }
}

// ---- Endpunkt: POST (Highscore speichern) -----------------
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sh = sheet("Scores");
    sh.appendRow([
      new Date(),
      String(data.uid || "").substring(0, 40),
      String(data.name || "Unknown").substring(0, 20),
      Number(data.points) || 0,
      Number(data.maxPoints) || 0,
      String(data.topicId || "")
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// ---- Data: Topics ------------------------------
function getTopics() {
  return rows("Topics")
    .filter(function (r) { return String(r.Active).toUpperCase() === "TRUE"; })
    .map(function (r) {
      return {
        id: r.ID, title: r.Title, description: r.Description,
        category: r.Category, type: r.Type, active: true,
        icon: r.Icon || "star"
      };
    });
}

// ---- Data: Questions for a topic ---------------------------
function getQuestions(topicId) {
  return rows("Questions")
    .filter(function (r) { return String(r.TopicID) === String(topicId); })
    .map(function (r) {
      return {
        id: r.ID, question: r.Question,
        a: r.A, b: r.B, c: r.C, d: r.D,
        answer: String(r.Answer).trim().toUpperCase(),
        explanation: r.Explanation
      };
    });
}

// ---- Data: Scores (top 30 by percentage) ---------------
function getScores() {
  return rows("Scores")
    .map(function (r) {
      var max = Number(r.MaxPoints) || 1;
      return {
        timestamp: r.Timestamp, uid: r.UID, name: r.Name,
        points: Number(r.Points) || 0, maxPoints: max,
        topicId: r.TopicID, _pct: (Number(r.Points) || 0) / max
      };
    })
    .sort(function (a, b) { return b._pct - a._pct; })
    .slice(0, 30)
    .map(function (r) { delete r._pct; return r; });
}

// ---- Helpers ------------------------------------------------
function sheet(name) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
}

// Reads a sheet as an array of objects (header row = keys)
function rows(name) {
  var sh = sheet(name);
  if (!sh) throw "Sheet '" + name + "' not found.";
  var data = sh.getDataRange().getValues();
  if (data.length < 2) return [];
  var head = data[0];
  return data.slice(1).map(function (row) {
    var o = {};
    head.forEach(function (h, i) { o[h] = row[i]; });
    return o;
  });
}

// JSON response with correct MIME type (CORS-friendly)
function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
