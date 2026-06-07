/* =============================================================
   JETS U14B – Taktik-Zentrale
   API-Schicht  (mit automatischem Mock-Fallback + sessionStorage-Cache)
   -------------------------------------------------------------
   Ist CONFIG.API_URL gesetzt  → echte Calls ans Apps Script.
   Ist sie leer                → die MOCK-Daten aus config.js.
   Die übrige App merkt davon nichts – Schnittstelle ist gleich.
   ============================================================= */

const API = (() => {
  const live = () => CONFIG.API_URL && CONFIG.API_URL.trim().length > 0;

  /* ---- Cache (sessionStorage, TTL in ms) ---- */
  const TTL = { topics: 10 * 60000, questions: 10 * 60000, scores: 3 * 60000 };

  function cacheGet(key) {
    try {
      const raw = sessionStorage.getItem('jets_api_' + key);
      if (!raw) return null;
      const { ts, data } = JSON.parse(raw);
      const bucket = key.split('_')[0];
      if (Date.now() - ts > (TTL[bucket] || 0)) {
        sessionStorage.removeItem('jets_api_' + key);
        return null;
      }
      return data;
    } catch { return null; }
  }

  function cacheSet(key, data) {
    try { sessionStorage.setItem('jets_api_' + key, JSON.stringify({ ts: Date.now(), data })); } catch {}
  }

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
    if (!live()) return MOCK.topics.filter((t) => t.active);
    const cached = cacheGet('topics');
    if (cached) return cached;
    const data = await get("getTopics");
    cacheSet('topics', data);
    return data;
  }

  /* ---- Fragen eines Quiz ---- */
  async function getQuestions(topicId) {
    if (!live()) return (MOCK.questions[topicId] || MOCK.questions[topicId.toLowerCase()] || []).slice();
    const key = 'questions_' + topicId.toLowerCase();
    const cached = cacheGet(key);
    if (cached) return cached;
    const data = await get("getQuestions", { topicId });
    cacheSet(key, data);
    return data;
  }

  /* ---- Highscore-Liste ---- */
  async function getHighscore() {
    if (!live()) {
      return MOCK.highscore
        .slice()
        .sort((a, b) => (b.points / b.maxPoints) - (a.points / a.maxPoints))
        .slice(0, 30);
    }
    const cached = cacheGet('scores');
    if (cached) return cached;
    const data = await get("getScores");
    cacheSet('scores', data);
    return data;
  }

  /* ---- Theorie-Text (lokal) ---- */
  function getTheory(topicId) {
    return MOCK.theory[topicId] || MOCK.theory[topicId.toLowerCase()] || null;
  }

  /* ---- Resultat speichern (POST) ---- */
  async function saveScore({ name, uid, points, maxPoints, topicId, responses }) {
    if (!live()) {
      MOCK.highscore.push({
        timestamp: new Date().toISOString(),
        uid: uid || 'u-mock', name, points, maxPoints, topicId,
      });
      return { ok: true, mock: true };
    }
    // Invalidate scores cache so leaderboard reflects new result
    try { sessionStorage.removeItem('jets_api_scores'); } catch {}
    const res = await fetch(CONFIG.API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ uid, name, points, maxPoints, topicId, responses }),
    });
    if (!res.ok) throw new Error("Speichern fehlgeschlagen " + res.status);
    return res.json();
  }

  /* ---- Fragen-Fehlerrate (Coach) ---- */
  async function getQuestionStats(topicId) {
    if (!live()) return [];
    return get("getQuestionStats", { topicId });
  }

  /* ---- Prefetch: Fragen im Hintergrund laden ---- */
  function prefetch(topicIds) {
    topicIds.forEach(id => getQuestions(id).catch(() => {}));
  }

  return { getTopics, getQuestions, getHighscore, getTheory, saveScore, getQuestionStats, prefetch, isLive: live };
})();
