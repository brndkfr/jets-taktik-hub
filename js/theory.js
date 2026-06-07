/* =============================================================
   theory.js  –  Logik für theory.html?topic=<id>
   ============================================================= */

(function () {
  const params  = new URLSearchParams(location.search);
  const topicId = params.get("topic");

  UI.initTheme();

  const themeBtn = document.getElementById("themeBtn");
  themeBtn.innerHTML = UI.icon(UI.isDark() ? "sun" : "moon", 19);
  themeBtn.addEventListener("click", () => {
    UI.toggleTheme();
    themeBtn.innerHTML = UI.icon(UI.isDark() ? "sun" : "moon", 19);
  });

  document.getElementById("backLink").innerHTML = UI.icon("back", 17) + " Zurück";

  /* ---- Daten laden ---- */
  API.getTopics().then(function (topics) {
    const idLower = topicId.toLowerCase();
    const topic   = topics.find((t) => t.id === topicId || t.id.toLowerCase() === idLower);
    const theory  = API.getTheory(topicId);

    if (!topic || !theory) {
      document.getElementById("theoryBody").innerHTML =
        "<p>Theorie für dieses Thema wurde nicht gefunden.</p>";
      return;
    }

    /* ---- Kopf ---- */
    document.title = topic.title + " · Theorie · JETS U14";
    document.getElementById("tIcon").innerHTML   = UI.SVG[topic.icon] || UI.SVG.star;
    document.getElementById("tCat").textContent  = topic.category;
    document.getElementById("tTitle").textContent = topic.title;

    /* ---- Markdown-Text ---- */
    document.getElementById("theoryBody").innerHTML = marked.parse(theory.markdown);

    /* ---- Ressourcen ---- */
    const resEl = document.getElementById("theoryResources");
    if (theory.resources && theory.resources.length > 0) {
      resEl.innerHTML =
        '<h2 class="resources-heading">Zusatzmaterial</h2>' +
        '<div class="resources-grid">' +
        theory.resources.map(renderResource).join("") +
        "</div>";
    }

    /* ---- Quiz-Button ---- */
    document.getElementById("startBtn").addEventListener("click", () => {
      location.href = "quiz.html?topic=" + encodeURIComponent(topicId);
    });
  });

  /* ---- Ressource-Renderer ---- */
  function renderResource(r) {
    if (r.type === "youtube") {
      const id = youtubeId(r.url);
      if (!id) return linkCard(r, "▶");
      return `
        <div class="resource-card resource-yt">
          <div class="yt-wrap">
            <iframe src="https://www.youtube-nocookie.com/embed/${id}"
              title="${esc(r.title)}" frameborder="0" allowfullscreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
            </iframe>
          </div>
          <div class="resource-label">${esc(r.title)}</div>
        </div>`;
    }

    if (r.type === "image") {
      return `
        <div class="resource-card resource-img">
          <figure>
            <img src="${esc(r.url)}" alt="${esc(r.title)}" loading="lazy">
            <figcaption>${esc(r.title)}</figcaption>
          </figure>
        </div>`;
    }

    if (r.type === "pdf") {
      const viewerUrl = "https://docs.google.com/viewer?url=" + encodeURIComponent(r.url) + "&embedded=true";
      return `
        <div class="resource-card resource-pdf">
          <div class="pdf-wrap">
            <iframe src="${viewerUrl}" title="${esc(r.title)}" frameborder="0"></iframe>
          </div>
          <div class="resource-label">📄 ${esc(r.title)}</div>
        </div>`;
    }

    if (r.type === "instagram") {
      return linkCard(r, "📸");
    }

    return linkCard(r, "↗");
  }

  function linkCard(r, icon) {
    return `
      <a class="resource-card resource-link" href="${esc(r.url)}" target="_blank" rel="noopener">
        <span class="resource-link-icon">${icon}</span>
        <span class="resource-link-title">${esc(r.title)}</span>
        <span class="resource-link-arrow">→</span>
      </a>`;
  }

  function youtubeId(url) {
    const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }
})();
