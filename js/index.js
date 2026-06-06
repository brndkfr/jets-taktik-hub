/* =============================================================
   JETS U14B – Taktik-Zentrale
   index.js  –  Hub-Logik
   ============================================================= */

document.addEventListener("DOMContentLoaded", () => {
  UI.initTheme();
  setupHeader();
  renderStreak();
  loadTopics();
  loadLeaderboard();
  renderBadges();
  renderHeroProgress();

  if (!API.isLive()) {
    const mb = document.getElementById("mockBanner");
    if (mb) mb.style.display = "flex";
  }
});

/* ---------------- Header-Tools ---------------- */
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

/* ---------------- Streak-Pille ---------------- */
function renderStreak() {
  const el = document.getElementById("streakPill");
  const s = UI.getStreak();
  const alive = UI.streakAlive() && s.count > 0;
  el.className = "streak-pill" + (alive ? "" : " cold");
  el.innerHTML = `<span class="flame">${alive ? "🔥" : "❄️"}</span> ${s.count}`;
  el.title = alive ? `${s.count} Tage Serie – bleib dran!` : "Spiele heute ein Quiz und starte deine Serie!";
}

/* ---------------- Hero-Gesamtfortschritt ---------------- */
function renderHeroProgress() {
  const done = UI.getDone();
  const total = MOCK.topics.length;
  const mastered = Object.values(done).filter((d) => d.best / d.total >= 0.8).length;
  const pct = total ? Math.round((mastered / total) * 100) : 0;

  document.getElementById("heroMastered").textContent = mastered;
  document.getElementById("heroTotal").textContent = total;
  document.getElementById("heroBadgeCount").textContent = UI.getBadges().length;
  const greet = UI.getName();
  if (greet) document.getElementById("heroGreet").textContent = "Hoi " + greet + "!";

  const bar = document.querySelector("#heroBar > i");
  document.getElementById("heroPct").textContent = pct + "%";
  requestAnimationFrame(() => setTimeout(() => { bar.style.right = (100 - pct) + "%"; }, 250));
}

/* ---------------- Badges ---------------- */
function renderBadges() {
  const host = document.getElementById("badgeStrip");
  const owned = UI.getBadges();
  host.innerHTML = UI.BADGE_DEFS.map((b) => {
    const got = owned.includes(b.id);
    return `<div class="badge ${got ? "earned" : ""}">
      ${got ? "" : `<span class="lock">🔒</span>`}
      <div class="medal">${b.emoji}</div>
      <b>${b.name}</b>
      <small>${b.desc}</small>
    </div>`;
  }).join("");
}

/* ---------------- Themen-Kacheln ---------------- */
async function loadTopics() {
  const host = document.getElementById("topicGrid");
  host.innerHTML = `<div class="loading" style="grid-column:1/-1"><div class="spinner"></div><span>Themen werden geladen…</span></div>`;
  try {
    const topics = await API.getTopics();
    const done = UI.getDone();
    if (!topics.length) { host.innerHTML = `<div class="empty" style="grid-column:1/-1">Noch keine Themen verfügbar.</div>`; return; }

    host.innerHTML = topics.map((t) => {
      const d = done[t.id];
      const pct = d ? Math.round((d.best / d.total) * 100) : 0;
      const finished = pct >= 80;
      return `
      <article class="card" data-id="${t.id}">
        ${finished ? `<div class="done-flag">${UI.icon("check", 15)}</div>` : ""}
        <div class="card-top">
          <div class="tile-icon">${UI.SVG[t.icon] || UI.SVG.star}</div>
          <div>
            <span class="cat">${t.category}</span>
            <h3>${t.title}</h3>
          </div>
        </div>
        <p class="desc">${t.description}</p>
        ${d ? `<div class="mini-prog">
                 <div class="bar thin blue"><i style="right:${100 - pct}%"></i></div>
                 <span>${d.best}/${d.total}</span>
               </div>`
            : `<div class="card-meta">${UI.icon("bulb",14)} <span>Noch nicht gespielt</span></div>`}
        <div class="card-actions">
          <button class="btn btn-ghost act-theory">${UI.icon("book",16)} Theorie</button>
          <button class="btn btn-primary act-quiz">${UI.icon("play",15)} Quiz</button>
        </div>
      </article>`;
    }).join("");

    host.querySelectorAll(".card").forEach((card) => {
      const id = card.dataset.id;
      card.querySelector(".act-quiz").addEventListener("click", () => {
        UI.beep("click");
        location.href = "quiz.html?topic=" + encodeURIComponent(id);
      });
      card.querySelector(".act-theory").addEventListener("click", () => {
        UI.beep("click");
        openTheory(id);
      });
    });
  } catch (e) {
    host.innerHTML = `<div class="empty" style="grid-column:1/-1">⚠️ Themen konnten nicht geladen werden.<br><small>${e.message}</small></div>`;
  }
}

/* ---------------- Theorie-Modal ---------------- */
function openTheory(topicId) {
  const topic = MOCK.topics.find((t) => t.id === topicId);
  const theory = API.getTheory(topicId);
  if (!topic || !theory) { UI.toast("Theorie folgt bald.", "bad"); return; }

  const back = document.getElementById("modalBack");
  document.getElementById("mIcon").innerHTML = UI.SVG[topic.icon] || UI.SVG.star;
  document.getElementById("mCat").textContent = topic.category;
  document.getElementById("mTitle").textContent = topic.title;

  const body = document.getElementById("mBody");
  body.innerHTML =
    `<p>${theory.intro}</p>` +
    theory.sections.map((s) =>
      `<h4>${s.h}</h4><ul>${s.list.map((li) => `<li><span>${li}</span></li>`).join("")}</ul>`
    ).join("");

  document.getElementById("mStart").onclick = () => {
    location.href = "quiz.html?topic=" + encodeURIComponent(topicId);
  };

  back.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeTheory() {
  document.getElementById("modalBack").classList.remove("open");
  document.body.style.overflow = "";
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("mClose").addEventListener("click", closeTheory);
  document.getElementById("modalBack").addEventListener("click", (e) => {
    if (e.target.id === "modalBack") closeTheory();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeTheory(); });
});

/* ---------------- Leaderboard ---------------- */
async function loadLeaderboard() {
  const host = document.getElementById("board");
  host.innerHTML = `<div class="loading"><div class="spinner"></div><span>Liga-Rangliste lädt…</span></div>`;
  try {
    const rows = await API.getHighscore();
    const myName = (UI.getName() || "").toLowerCase();
    const topicTitle = (id) => (MOCK.topics.find((t) => t.id === id) || {}).title || id;

    if (!rows.length) { host.innerHTML = `<div class="empty">Noch keine Einträge – sei die/der Erste! 🏒</div>`; return; }

    host.innerHTML =
      `<div class="board-row head"><span>#</span><span>Spieler</span><span>Punkte</span></div>` +
      rows.map((r, i) => {
        const pct = Math.round((r.points / r.maxPoints) * 100);
        const rankCls = i === 0 ? "r1" : i === 1 ? "r2" : i === 2 ? "r3" : "";
        const me = myName && r.name.toLowerCase() === myName;
        return `<div class="board-row ${me ? "me" : ""}">
          <div class="rank ${rankCls}">${i + 1}</div>
          <div class="bl-name"><b>${escapeHtml(r.name)}${me ? " (du)" : ""}</b><small>${topicTitle(r.topicId)}</small></div>
          <div class="bl-score"><b>${pct}%</b><small>${r.points}/${r.maxPoints}</small></div>
        </div>`;
      }).join("");
  } catch (e) {
    host.innerHTML = `<div class="empty">⚠️ Rangliste nicht erreichbar.<br><small>${e.message}</small></div>`;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
