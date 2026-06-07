/* =============================================================
   JETS U14B – Taktik-Zentrale
   API-Schicht  (mit automatischem Mock-Fallback)
   -------------------------------------------------------------
   Ist CONFIG.API_URL gesetzt  → echte Calls ans Apps Script.
   Ist sie leer                → die MOCK-Daten aus config.js.
   Die übrige App merkt davon nichts – Schnittstelle ist gleich.
   ============================================================= */

const API = (() => {
  const live = () => CONFIG.API_URL && CONFIG.API_URL.trim().length > 0;

  // Künstliche kleine Verzögerung, damit Lade-Animationen sichtbar sind
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function get(action, params = {}) {
    const url = new URL(CONFIG.API_URL);
    url.searchParams.set("action", action);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    const res = await fetch(url.toString(), { method: "GET" });
    if (!res.ok) throw new Error("Netzwerkfehler " + res.status);
    return res.json();
  }

  /* ---- Themen / Artikel ---- */
  async function getTopics() {
    if (!live()) { await wait(450); return MOCK.topics.filter((t) => t.active); }
    return get("getTopics");
  }

  /* ---- Fragen eines Quiz ---- */
  async function getQuestions(topicId) {
    if (!live()) { await wait(400); return (MOCK.questions[topicId] || []).slice(); }
    return get("getQuestions", { topicId });
  }

  /* ---- Highscore-Liste ---- */
  async function getHighscore() {
    if (!live()) {
      await wait(500);
      return MOCK.highscore
        .slice()
        .sort((a, b) => (b.points / b.maxPoints) - (a.points / a.maxPoints))
        .slice(0, 30);
    }
    return get("getScores");
  }

  /* ---- Theorie-Text (lokal, käme sonst aus dem Artikel-Sheet) ---- */
  function getTheory(topicId) {
    return MOCK.theory[topicId] || MOCK.theory[topicId.toLowerCase()] || null;
  }

  /* ---- Resultat speichern (POST) ---- */
  async function saveScore({ name, uid, points, maxPoints, topicId, responses }) {
    if (!live()) {
      await wait(700);
      MOCK.highscore.push({
        timestamp: new Date().toISOString(),
        uid: uid || 'u-mock', name, points, maxPoints, topicId,
      });
      return { ok: true, mock: true };
    }
    const res = await fetch(CONFIG.API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ uid, name, points, maxPoints, topicId, responses }),
    });
    if (!res.ok) throw new Error("Speichern fehlgeschlagen " + res.status);
    return res.json();
  }

  async function getQuestionStats(topicId) {
    if (!live()) return [];
    return get("getQuestionStats", { topicId });
  }

  return { getTopics, getQuestions, getHighscore, getTheory, saveScore, getQuestionStats, isLive: live };
})();
