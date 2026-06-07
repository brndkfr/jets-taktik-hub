/* =============================================================
   JETS U14B – Taktik-Zentrale
   quiz.js  –  dynamisches Quiz
   ============================================================= */

const Quiz = {
  topicId: null,
  topic: null,
  questions: [],
  idx: 0,
  score: 0,
  answered: false,
  newBadges: [],
};

document.addEventListener("DOMContentLoaded", () => {
  UI.initTheme();
  setupHeader();

  const params = new URLSearchParams(location.search);
  Quiz.topicId = params.get("topic");
  if (!Quiz.topicId) { location.href = "index.html"; return; }

  // Name vorausfüllen
  document.getElementById("nameInput").value = UI.getName();

  bootQuiz();
});

/* Header-Tools (Theme/Sound) */
function setupHeader() {
  const themeBtn = document.getElementById("themeBtn");
  const soundBtn = document.getElementById("soundBtn");
  const paint = () => {
    themeBtn.innerHTML = UI.icon(UI.isDark() ? "sun" : "moon", 19);
    soundBtn.innerHTML = UI.icon(UI.soundOn() ? "sound" : "mute", 19);
  };
  paint();
  themeBtn.addEventListener("click", () => { UI.toggleTheme(); paint(); });
  soundBtn.addEventListener("click", () => { UI.toggleSound(); paint(); });
}

/* Daten laden + Startbildschirm vorbereiten */
async function bootQuiz() {
  Quiz.topic = MOCK.topics.find((t) => t.id === Quiz.topicId || t.id === Quiz.topicId.toLowerCase()) || { titel: Quiz.topicId, kategorie: "Quiz", icon: "star" };

  // Start-Header
  document.getElementById("startIcon").innerHTML = UI.SVG[Quiz.topic.icon] || UI.SVG.star;
  document.getElementById("startCat").textContent = Quiz.topic.category;
  document.getElementById("startTitle").textContent = Quiz.topic.title;

  try {
    Quiz.questions = await API.getQuestions(Quiz.topicId);
  } catch (e) {
    Quiz.questions = [];
  }

  const done = UI.getDone()[Quiz.topicId];
  document.getElementById("startCount").textContent = Quiz.questions.length;
  document.getElementById("startBest").textContent = done ? `${done.best}/${done.total}` : "–";

  const btn = document.getElementById("startBtn");
  if (!Quiz.questions.length) {
    btn.disabled = true;
    btn.textContent = "Keine Fragen vorhanden";
  } else {
    btn.addEventListener("click", startQuiz);
  }
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0 });
}

/* ---------------- Start ---------------- */
function startQuiz() {
  const name = document.getElementById("nameInput").value.trim();
  if (!name) {
    UI.toast("Gib zuerst deinen Namen ein 🙂", "bad");
    document.getElementById("nameInput").focus();
    return;
  }
  UI.setName(name);
  UI.beep("click");
  Quiz.idx = 0; Quiz.score = 0; Quiz.responses = [];
  document.getElementById("quizTopBar").style.display = "flex";
  document.getElementById("quizProgressWrap").style.display = "block";
  showScreen("screenQuestion");
  renderQuestion();
}

/* ---------------- Frage rendern ---------------- */
function renderQuestion() {
  Quiz.answered = false;
  const q = Quiz.questions[Quiz.idx];
  const n = Quiz.idx + 1, total = Quiz.questions.length;

  // Fortschritt
  document.getElementById("qNow").textContent = n;
  document.getElementById("qTotal").textContent = total;
  const pct = Math.round((Quiz.idx / total) * 100);
  document.querySelector("#quizBar > i").style.right = (100 - pct) + "%";

  document.getElementById("qText").textContent = q.question;

  const opts = [["A", q.a], ["B", q.b], ["C", q.c], ["D", q.d]].filter(([, v]) => v != null && v !== "");
  const host = document.getElementById("answers");
  host.innerHTML = opts.map(([key, val]) => `
    <button class="answer" data-key="${key}">
      <span class="key">${key}</span>
      <span class="atext">${escapeHtml(val)}</span>
      <span class="mark"></span>
    </button>`).join("");

  host.querySelectorAll(".answer").forEach((b) =>
    b.addEventListener("click", () => selectAnswer(b.dataset.key)));

  // Erklärung & Next zurücksetzen
  const ex = document.getElementById("explain");
  ex.classList.remove("show");
  document.getElementById("qFoot").innerHTML = "";
}

/* ---------------- Antwort auswählen ---------------- */
function selectAnswer(key) {
  if (Quiz.answered) return;
  Quiz.answered = true;
  const q = Quiz.questions[Quiz.idx];
  const correct = String(q.answer).trim().toUpperCase();
  const isRight = key === correct;
  if (isRight) Quiz.score++;
  Quiz.responses.push({ id: q.id, correct: isRight });

  document.querySelectorAll(".answer").forEach((b) => {
    b.disabled = true;
    const k = b.dataset.key;
    if (k === correct) { b.classList.add("correct"); b.querySelector(".mark").innerHTML = UI.icon("check", 24); }
    else if (k === key) { b.classList.add("wrong"); b.querySelector(".mark").innerHTML = UI.icon("x", 24); }
    else { b.classList.add("dimmed"); }
  });

  if (isRight) { UI.beep("correct"); UI.confetti({ count: 36, power: .7 }); }
  else { UI.beep("wrong"); }

  // Erklärungsbox
  const ex = document.getElementById("explain");
  document.getElementById("explainText").textContent = q.explanation || "—";
  ex.classList.add("show");

  // Next / Auswerten Button
  const last = Quiz.idx === Quiz.questions.length - 1;
  document.getElementById("qFoot").innerHTML =
    `<button class="btn btn-yellow btn-block btn-lg" id="nextBtn">${last ? "🏁 Auswerten" : "Nächste Frage"} ${last ? "" : UI.icon("arrow", 18)}</button>`;
  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
}

function nextQuestion() {
  UI.beep("click");
  if (Quiz.idx < Quiz.questions.length - 1) {
    Quiz.idx++;
    showScreen("screenQuestion");
    renderQuestion();
  } else {
    finishQuiz();
  }
}

/* ---------------- Endbildschirm ---------------- */
function finishQuiz() {
  const total = Quiz.questions.length;
  const pct = Math.round((Quiz.score / total) * 100);

  // Fortschritt + Streak speichern, Badges auswerten
  UI.recordResult(Quiz.topicId, Quiz.score, total);
  UI.bumpStreak();
  Quiz.newBadges = UI.evaluateBadges(Quiz.topicId, Quiz.score, total);

  // Top-Bar ausblenden
  document.getElementById("quizTopBar").style.display = "none";
  document.getElementById("quizProgressWrap").style.display = "none";

  // Verdict
  const name = UI.getName() || "Jet";
  let verdict, sub;
  if (pct === 100) { verdict = "Perfekt! 🌟"; sub = `Alle Fragen richtig – starke Leistung, ${name}!`; }
  else if (pct >= 80) { verdict = "Stark! 💪"; sub = `Du hast die Taktik fast komplett drauf, ${name}.`; }
  else if (pct >= 50) { verdict = "Gut dabei! 👍"; sub = `Schau dir die Theorie an und leg nochmal los, ${name}.`; }
  else { verdict = "Dranbleiben! 🏒"; sub = `Lies die Theorie und versuch's gleich nochmal, ${name}.`; }

  document.getElementById("endVerdict").textContent = verdict;
  document.getElementById("endSub").textContent = sub;
  document.getElementById("endScore").textContent = Quiz.score;
  document.getElementById("endTotal").textContent = total;
  document.getElementById("endPct").textContent = pct + "%";
  document.getElementById("endStreak").textContent = UI.getStreak().count;

  // Neue Badges anzeigen
  const bp = document.getElementById("newBadges");
  bp.innerHTML = Quiz.newBadges.map((b) =>
    `<div class="new-badge-pop"><span class="medal">${b.emoji}</span> Neues Abzeichen: ${b.name}!</div>`).join("");

  // Score-Ring animieren
  const ring = document.getElementById("ringFg");
  const C = 2 * Math.PI * 80; // r=80
  ring.style.strokeDasharray = C;
  ring.style.strokeDashoffset = C;
  document.getElementById("ringPct").textContent = pct;

  // Save-Button
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.disabled = false;
  saveBtn.innerHTML = `${UI.icon("trophy", 18)} Im Jets-Highscore speichern`;
  saveBtn.onclick = saveResult;
  document.getElementById("privacyHint").style.display = "";
  document.getElementById("retryBtn").onclick = () => location.reload();
  document.getElementById("homeBtn").onclick = () => location.href = "index.html";

  showScreen("screenEnd");

  // Animationen nach Anzeige
  setTimeout(() => { ring.style.strokeDashoffset = C * (1 - pct / 100); }, 200);
  if (pct >= 80) { UI.beep("finish"); setTimeout(() => UI.confetti({ count: 130, power: 1.2 }), 250); }
  if (Quiz.newBadges.length) setTimeout(() => UI.beep("badge"), 700);
}

/* ---------------- Speichern (POST) ---------------- */
async function saveResult() {
  const btn = document.getElementById("saveBtn");
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner" style="width:18px;height:18px;border-width:2px"></span> Speichern…`;
  try {
    await API.saveScore({
      name: UI.getName(),
      uid: UI.getUID(),
      points: Quiz.score,
      maxPoints: Quiz.questions.length,
      topicId: Quiz.topicId,
      responses: Quiz.responses,
    });
    UI.beep("save");
    UI.toast("Gespeichert! Auf zur Rangliste 🏆", "ok");
    btn.innerHTML = `${UI.icon("check", 18)} Gespeichert!`;
    setTimeout(() => { location.href = "index.html#leaderboard"; }, 1100);
  } catch (e) {
    UI.toast("Speichern fehlgeschlagen – versuch's nochmal.", "bad");
    btn.disabled = false;
    btn.innerHTML = `${UI.icon("trophy", 18)} Nochmal speichern`;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
