/* =============================================================
   JETS U14B – Taktik-Zentrale
   Geteilte UI-Helfer
   Theme · Sound · Konfetti · Toasts · Streak · Badges · Icons
   ============================================================= */

const UI = (() => {
  const LS = {
    theme:  "jets_theme",
    sound:  "jets_sound",
    name:   "jets_name",
    streak: "jets_streak",         // { count, last }
    done:   "jets_done_topics",    // { topicId: {best, total, ts} }
    badges: "jets_badges",         // [ids]
  };

  /* ---------------- THEME ---------------- */
  function initTheme() {
    const saved = localStorage.getItem(LS.theme) || "dark"; // Dark = Standard
    document.documentElement.setAttribute("data-theme", saved);
    return saved;
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(LS.theme, next);
    return next;
  }
  const isDark = () => document.documentElement.getAttribute("data-theme") !== "light";

  /* ---------------- SOUND ---------------- */
  let audioCtx = null;
  const soundOn = () => localStorage.getItem(LS.sound) !== "off";
  function toggleSound() {
    const on = !soundOn();
    localStorage.setItem(LS.sound, on ? "on" : "off");
    if (on) beep("click");
    return on;
  }
  function ensureCtx() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch (e) { audioCtx = null; }
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }
  // Kleine Web-Audio-Töne – keine externen Dateien nötig
  function tone(freq, start, dur, type = "sine", gain = 0.18) {
    const ctx = ensureCtx(); if (!ctx) return;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, ctx.currentTime + start);
    g.gain.setValueAtTime(0.0001, ctx.currentTime + start);
    g.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
    o.connect(g); g.connect(ctx.destination);
    o.start(ctx.currentTime + start); o.stop(ctx.currentTime + start + dur + 0.02);
  }
  function beep(kind) {
    if (!soundOn()) return;
    switch (kind) {
      case "correct": tone(660, 0, .12, "triangle", .2); tone(990, .1, .18, "triangle", .2); break;
      case "wrong":   tone(220, 0, .18, "sawtooth", .14); tone(160, .12, .22, "sawtooth", .12); break;
      case "finish":  [523,659,784,1046].forEach((f,i)=>tone(f, i*.12, .2, "triangle", .2)); break;
      case "badge":   [784,1046,1318].forEach((f,i)=>tone(f, i*.09, .22, "triangle", .22)); break;
      case "click":   tone(440, 0, .05, "sine", .12); break;
      case "save":    tone(587, 0, .1, "triangle", .18); tone(880, .1, .2, "triangle", .18); break;
    }
  }

  /* ---------------- TOAST ---------------- */
  function toast(msg, kind = "") {
    let host = document.querySelector(".toast-host");
    if (!host) { host = document.createElement("div"); host.className = "toast-host"; document.body.appendChild(host); }
    const el = document.createElement("div");
    el.className = "toast " + kind;
    el.innerHTML = (kind === "ok" ? icon("check", 18) : kind === "bad" ? icon("x", 18) : "") + "<span>" + msg + "</span>";
    host.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transform = "translateY(10px)"; el.style.transition = "all .3s"; }, 2600);
    setTimeout(() => el.remove(), 3000);
  }

  /* ---------------- KONFETTI ---------------- */
  function confetti({ count = 90, power = 1 } = {}) {
    let cv = document.getElementById("confetti");
    if (!cv) { cv = document.createElement("canvas"); cv.id = "confetti"; document.body.appendChild(cv); }
    const ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx.scale(dpr, dpr);
    const colors = ["#FFCD00", "#1A5BD6", "#2E7BFF", "#FFE066", "#ffffff"];
    const parts = Array.from({ length: count }, () => ({
      x: innerWidth / 2 + (Math.random() - .5) * 120,
      y: innerHeight * .4 + (Math.random() - .5) * 60,
      vx: (Math.random() - .5) * 13 * power,
      vy: (Math.random() * -14 - 5) * power,
      g: .42 + Math.random() * .2,
      s: 5 + Math.random() * 7,
      rot: Math.random() * 6.28, vr: (Math.random() - .5) * .35,
      c: colors[(Math.random() * colors.length) | 0],
      life: 0, max: 90 + Math.random() * 50,
    }));
    let raf;
    (function loop() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      let alive = false;
      parts.forEach((p) => {
        if (p.life > p.max) return;
        alive = true; p.life++;
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.rot += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - p.life / p.max);
        ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6);
        ctx.restore();
      });
      if (alive) raf = requestAnimationFrame(loop);
      else { ctx.clearRect(0, 0, innerWidth, innerHeight); cancelAnimationFrame(raf); }
    })();
  }

  /* ---------------- UID (Geräte-ID, persistent) ---------------- */
  function getUID() {
    let uid = localStorage.getItem("jets_uid");
    if (!uid) {
      uid = "u-" + Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
      localStorage.setItem("jets_uid", uid);
    }
    return uid;
  }

  /* ---------------- NAME ---------------- */
  const getName = () => localStorage.getItem(LS.name) || "";
  const setName = (n) => localStorage.setItem(LS.name, n.trim());

  /* ---------------- STREAK ---------------- */
  function _today() { return new Date().toISOString().slice(0, 10); }
  function getStreak() {
    try { return JSON.parse(localStorage.getItem(LS.streak)) || { count: 0, last: null }; }
    catch (e) { return { count: 0, last: null }; }
  }
  // Streak aktualisieren, wenn heute gespielt wurde
  function bumpStreak() {
    const s = getStreak(); const today = _today();
    if (s.last === today) return s; // schon heute gezählt
    const yest = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    s.count = s.last === yest ? s.count + 1 : 1;
    s.last = today;
    localStorage.setItem(LS.streak, JSON.stringify(s));
    return s;
  }
  // prüft, ob die Serie noch "warm" ist (heute oder gestern)
  function streakAlive() {
    const s = getStreak(); if (!s.last) return false;
    const yest = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    return s.last === _today() || s.last === yest;
  }

  /* ---------------- FORTSCHRITT / DONE ---------------- */
  function getDone() {
    try { return JSON.parse(localStorage.getItem(LS.done)) || {}; }
    catch (e) { return {}; }
  }
  function recordResult(topicId, best, total) {
    const d = getDone();
    const prev = d[topicId];
    d[topicId] = {
      best: prev ? Math.max(prev.best, best) : best,
      total, ts: Date.now(),
    };
    localStorage.setItem(LS.done, JSON.stringify(d));
    return d;
  }

  /* ---------------- BADGES ---------------- */
  const BADGE_DEFS = [
    { id: "first",    emoji: "🎯", name: "Erste Schritte", desc: "Erstes Quiz beendet" },
    { id: "perfect",  emoji: "⭐", name: "Perfekte Runde", desc: "Alle Fragen richtig" },
    { id: "streak3",  emoji: "🔥", name: "Heisser Lauf",   desc: "3 Tage Serie" },
    { id: "explorer", emoji: "🧭", name: "Taktik-Profi",   desc: "Alle 4 Themen gespielt" },
    { id: "defense",  emoji: "🛡️", name: "Slot-Spezialist", desc: "Boxplay gemeistert" },
    { id: "sniper",   emoji: "🏒", name: "Powerplay-Ass",  desc: "Powerplay gemeistert" },
  ];
  function getBadges() {
    try { return JSON.parse(localStorage.getItem(LS.badges)) || []; }
    catch (e) { return []; }
  }
  function awardBadge(id) {
    const b = getBadges();
    if (b.includes(id)) return false;
    b.push(id); localStorage.setItem(LS.badges, JSON.stringify(b));
    return true; // neu vergeben
  }
  // Nach einem Quiz auswerten, welche Badges neu dazukommen
  function evaluateBadges(topicId, punkte, maxPunkte) {
    const newly = [];
    const done = getDone();
    const playedCount = Object.keys(done).length;
    const perfect = punkte === maxPunkte && maxPunkte > 0;

    if (awardBadge("first")) newly.push("first");
    if (perfect && awardBadge("perfect")) newly.push("perfect");
    if (getStreak().count >= 3 && awardBadge("streak3")) newly.push("streak3");
    if (playedCount >= 4 && awardBadge("explorer")) newly.push("explorer");
    if (topicId === "boxplay" && perfect && awardBadge("defense")) newly.push("defense");
    if (topicId === "powerplay" && perfect && awardBadge("sniper")) newly.push("sniper");

    return newly.map((id) => BADGE_DEFS.find((d) => d.id === id));
  }

  /* ---------------- ICONS (Inline-SVG) ---------------- */
  const SVG = {
    // Themen-Icons (geometrisch, gelb auf Blau-Kachel)
    roles: '<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="9" r="4.5" fill="#FFCD00"/><circle cx="7" cy="20" r="3.5" fill="#fff" opacity=".9"/><circle cx="25" cy="20" r="3.5" fill="#fff" opacity=".9"/><circle cx="16" cy="24" r="3.5" fill="#FFCD00"/></svg>',
    box:   '<svg viewBox="0 0 32 32" fill="none"><rect x="6" y="6" width="20" height="20" rx="3" stroke="#FFCD00" stroke-width="2.6"/><circle cx="11" cy="11" r="1.8" fill="#fff"/><circle cx="21" cy="11" r="1.8" fill="#fff"/><circle cx="11" cy="21" r="1.8" fill="#fff"/><circle cx="21" cy="21" r="1.8" fill="#fff"/><circle cx="16" cy="16" r="2.2" fill="#FFCD00"/></svg>',
    dice:  '<svg viewBox="0 0 32 32" fill="none"><rect x="5" y="5" width="22" height="22" rx="5" stroke="#FFCD00" stroke-width="2.4"/><circle cx="11" cy="11" r="2" fill="#FFCD00"/><circle cx="21" cy="11" r="2" fill="#FFCD00"/><circle cx="16" cy="16" r="2" fill="#fff"/><circle cx="11" cy="21" r="2" fill="#FFCD00"/><circle cx="21" cy="21" r="2" fill="#FFCD00"/></svg>',
    star:  '<svg viewBox="0 0 32 32" fill="none"><path d="M16 4l3.2 7.2 7.8.8-5.9 5.2 1.8 7.6L16 23l-6.9 1.8 1.8-7.6L5 12l7.8-.8L16 4z" fill="#FFCD00"/></svg>',

    // UI-Icons
    moon:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    sun:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>',
    mute:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="m23 9-6 6M17 9l6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    x:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
    book:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z"/><path d="M4 6.5h16"/></svg>',
    play:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    bulb:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/></svg>',
    trophy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12v4a6 6 0 0 1-12 0V4z"/><path d="M6 6H3v2a3 3 0 0 0 3 3M18 6h3v2a3 3 0 0 1-3 3M9 20h6M12 14v6"/></svg>',
    qr:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none"/><rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none"/><rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none"/><path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3"/></svg>',
  };
  function icon(name, size = 20) {
    const raw = SVG[name] || "";
    return raw.replace("<svg ", `<svg width="${size}" height="${size}" `);
  }

  return {
    LS, initTheme, toggleTheme, isDark,
    soundOn, toggleSound, beep,
    toast, confetti,
    getName, setName, getUID,
    getStreak, bumpStreak, streakAlive,
    getDone, recordResult,
    BADGE_DEFS, getBadges, evaluateBadges,
    icon, SVG,
  };
})();
