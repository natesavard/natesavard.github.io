(function () {
  const pages = [
    { file: "index.html", key: "home", title: "Nate's World", short: "Home", section: "Core hub", summary: "Main gateway for the archive, music, visuals, and outbound nodes.", clearance: "public node", dossier: "Entry terminal for the full underground system.", hum: "soft" },
    { file: "transmissions.html", key: "transmissions", title: "Transmission Updates", short: "Transmissions", section: "Signal log", summary: "Active updates, collector notices, and private network movement.", clearance: "signal stable", dossier: "Rolling log of new drops, active routes, and underground status updates.", hum: "signal" },
    { file: "timeline.html", key: "timeline", title: "Timeline", short: "Timeline", section: "Archive chronology", summary: "Long-view chronology for the site, lore, jewelry, and signal evolution.", clearance: "archive line", dossier: "Chronology node mapping the build, story, and collector path over time.", hum: "soft" },
    { file: "field-notes.html", key: "field-notes", title: "Field Notes", short: "Field Notes", section: "Travel archive", summary: "Travel logs, land memories, port signals, and world-built fragments from the road.", clearance: "travel log", dossier: "Private notes from coastlines, ports, cities, estates, and moving years.", hum: "soft" },
    { file: "legend-file.html", key: "legend-file", title: "Legend File", short: "Legend", section: "Identity file", summary: "Myth-forward dossier on Nate as operator, jeweler, traveler, builder, and private strategist.", clearance: "legend file", dossier: "Identity archive for the operator behind the network.", hum: "signal" },
    { file: "envynomadix-worldwide.html", key: "envynomadix", title: "Envynomadix", short: "Envynomadix", section: "Fashion house", summary: "Dark luxury streetwear archive with cathedral visuals, distressed garments, and campaign-grade artwork.", clearance: "fashion signal", dossier: "Digital flagship for the Envynomadix clothing world and active collection imagery.", hum: "soft" },
    { file: "starboy.html", key: "starboy", title: "NLX Starboy", short: "Starboy", section: "Story hub", summary: "Enter the comic archive, lore, and active entities inside the Starboy system.", clearance: "restricted archive", dossier: "Signal-heavy story node tied to the oracle line.", hum: "signal" },
    { file: "Chapter-one.html", key: "chapter-one", title: "Chapter One", short: "Chapter 1", section: "Comic issue", summary: "The first fracture point in the Starboy timeline.", clearance: "story file", dossier: "Initial fracture log recovered from the archive stream.", hum: "signal" },
    { file: "Chapter-two.html", key: "chapter-two", title: "Chapter Two", short: "Chapter 2", section: "Comic issue", summary: "The next signal in the Starboy story flow.", clearance: "oracle file", dossier: "Oracle chamber record naming the Anchor event.", hum: "signal" },
    { file: "NLXStarboyChapterOne.html", key: "reader", title: "Full Comic Reader", short: "Reader", section: "Reader node", summary: "Long-form chapter reader for the Starboy sequence.", clearance: "deep reader", dossier: "Long-scroll reader intended for full immersion.", hum: "soft" },
    { file: "gemstone-field-distortion-paradox.html", key: "gemstone", title: "Gemstone Paradox", short: "Gemstone", section: "Concept portal", summary: "Field distortion lore, signal breakdown, and paradox chapters.", clearance: "vip vault", dossier: "Gemstone resonance research marked as high-interest lore.", hum: "resonance" },
    { file: "nlxblackbox.html", key: "sage", title: "The Sage", short: "The Sage", section: "Talismans // Rings // Relics // Custom Signature Pieces", summary: "Jewelry pieces, relic visuals, and private collection pathway.", clearance: "private collection", dossier: "Talismans and relics private collection tied to the luxury node.", hum: "soft" },
    { file: "transmission-intake.html", key: "intake", title: "Transmission Intake", short: "Intake", section: "Commission ritual", summary: "Private commission intake shaped around metal, stone, symbolism, mood, life chapter, and budget.", clearance: "collector intake", dossier: "Direct ritual-style commission intake for serious custom work.", hum: "resonance" },
    { file: "rare-drop.html", key: "rare-drop", title: "Artifact Window", short: "Artifact", section: "Hidden collector node", summary: "Rare drop window unlocked through Horus with hidden collector-facing access.", clearance: "guardian approved", dossier: "Hidden artifact node for gated drops and brief access windows.", hum: "guard" },
    { file: "horus.html", key: "horus", title: "Horus Node", short: "Horus", section: "Guardian gate", summary: "Protection gateway and ceremonial landing page.", clearance: "guardian gate", dossier: "Protective threshold node with elevated lock state.", hum: "guard" }
  ];

  const transmissions = [
    "signal stable // private network online",
    "underground node active // oracle line stable",
    "vip vault pulse // gemstone engine resonance online",
    "blackbox echo signal stable // truth in artifact",
    "private route active // resonance lock online",
    "oracle network breathing // underground signal stable"
  ];

  const loreFragments = [
    { id: "engine", glyph: "◇", title: "Gemstone Engine", body: "Resonance holds the route together when the surface system starts to lie." },
    { id: "oracle", glyph: "◈", title: "Oracle Note", body: "The private network stays online when truth in the artifact is kept intact." },
    { id: "blackbox", glyph: "▣", title: "Blackbox Echo", body: "Underground nodes remember what the loud world tried to overwrite." }
  ];

  const storageKeys = {
    vip: "siteflow_vip_mode",
    sound: "siteflow_sound_on",
    fragment: "siteflow_fragment_seen",
    fragmentCollapsed: "siteflow_fragment_collapsed",
    chatCollapsed: "siteflow_chat_collapsed",
    collapsed: "siteflow_panel_collapsed",
    horusAccess: "siteflow_horus_access",
    rareSeen: "siteflow_rare_seen"
  };

  const aliasToFile = {
    "/": "index.html",
    "/index": "index.html",
    "/index.html": "index.html",
    "/arcade": "arcade.html",
    "/arcade.html": "arcade.html",
    "/transmissions": "transmissions.html",
    "/transmissions.html": "transmissions.html",
    "/timeline": "timeline.html",
    "/timeline.html": "timeline.html",
    "/field-notes": "field-notes.html",
    "/field-notes.html": "field-notes.html",
    "/legend-file": "legend-file.html",
    "/legend-file.html": "legend-file.html",
    "/envynomadix": "envynomadix.html",
    "/envynomadix.html": "envynomadix.html",
    "/envynomadix-worldwide": "envynomadix-worldwide.html",
    "/envynomadix-worldwide.html": "envynomadix-worldwide.html",
    "/starboy": "starboy.html",
    "/starboy.html": "starboy.html",
    "/chapter-one": "Chapter-one.html",
    "/chapter-one.html": "Chapter-one.html",
    "/chapter-two": "Chapter-two.html",
    "/chapter-two.html": "Chapter-two.html",
    "/nlxstarboychapterone": "NLXStarboyChapterOne.html",
    "/nlxstarboychapterone.html": "NLXStarboyChapterOne.html",
    "/gemstone-field-distortion-paradox": "gemstone-field-distortion-paradox.html",
    "/gemstone-field-distortion-paradox.html": "gemstone-field-distortion-paradox.html",
    "/nlxblackbox": "nlxblackbox.html",
    "/nlxblackbox.html": "nlxblackbox.html",
    "/transmission-intake": "transmission-intake.html",
    "/transmission-intake.html": "transmission-intake.html",
    "/rare-drop": "rare-drop.html",
    "/rare-drop.html": "rare-drop.html",
    "/horus": "horus.html",
    "/horus.html": "horus.html",
    "/main.html": "index.html"
  };

  const keyLinks = [
    { label: "Home", href: "index.html", key: "home" },
    { label: "Transmissions", href: "transmissions.html", key: "transmissions" },
    { label: "Timeline", href: "timeline.html", key: "timeline" },
    { label: "Envynomadix", href: "envynomadix.html", key: "envynomadix" },
    { label: "Starboy", href: "starboy.html", key: "starboy" },
    { label: "Reader", href: "NLXStarboyChapterOne.html", key: "reader" },
    { label: "Gemstone", href: "gemstone-field-distortion-paradox.html", key: "gemstone" },
    { label: "The Sage", href: "nlxblackbox.html", key: "sage" },
    { label: "Horus", href: "horus.html", key: "horus" }
  ];

  const sharedTopbarPages = ["starboy", "timeline", "transmissions", "reader", "field-notes", "legend-file", "envynomadix", "intake"];

  const sharedTopbarMessages = [
    "NLS GHOST NETWORK // PROTOCOL ONLINE",
    "ORACLE LINK DETECTED // ANCHOR SIGNAL CONFIRMED",
    "TEMPORAL FRACTURE FOUND // SCAN IN PROGRESS",
    "SWAP ANOMALY // HOSTILE FORCE ACTIVE",
    "TRACE DETECTED // PARASITE PATTERN LOCKED",
    "GEMSTONE ENGINE // 14 24",
    "SIGNAL CLEAN // PORTAL WINDOW APPROACHING",
    "NLX SYMBOL LIVE // THE ANCHOR BETWEEN WORLDS",
    "PARADOX NODE READY // FRACTURE PORTAL ARMED"
  ];


  const path = normalizePath(window.location.pathname);
  const currentFile = aliasToFile[path] || decodeFileName(path) || "index.html";
  const currentIndex = pages.findIndex((page) => page.file.toLowerCase() === currentFile.toLowerCase());
  const currentPage = currentIndex >= 0 ? pages[currentIndex] : pages[0];
  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : pages[pages.length - 1];
  const nextPage = currentIndex >= 0 && currentIndex < pages.length - 1 ? pages[currentIndex + 1] : pages[0];
  const activeFragment = getActiveFragment();
  let soundEngine = null;

  document.addEventListener("DOMContentLoaded", function () {
    enforceProtectedRoutes();
    document.body.classList.add("siteflow-ready");
    injectSignalTopbar();
    if (document.querySelector(".nlx-topbar")) {
      document.body.classList.add("siteflow-has-topbar");
    }
    if (window.getComputedStyle(document.body).overflow === "hidden") {
      document.body.classList.add("siteflow-no-pager");
    }

    rewriteLocalLinks();
    prepareYouTubeEmbeds();
    applyVipMode();
    injectTopFlow();
    injectSharedChat();
    injectLoreFragment();
    injectRareDropSignal();
    if (!document.body.classList.contains("siteflow-no-pager")) {
      injectBottomPager();
    }
    installTransitions();
    installAudioIdentity();
    startTransmissions();
    setupHorusNode();
    installLoreGlyphs();
    installSecretUnlocks();
  });

  function normalizePath(value) {
    return (value || "/index.html").replace(/\\/g, "/").toLowerCase();
  }

  function decodeFileName(value) {
    const cleaned = (value || "").split("/").pop() || "";
    return cleaned ? decodeURIComponent(cleaned) : "";
  }

  function rewriteLocalLinks() {
    const anchors = document.querySelectorAll("a[href]");
    anchors.forEach((anchor) => {
      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;

      if (/^https?:\/\/nates-world\.neocities\.org/i.test(rawHref)) {
        try {
          const url = new URL(rawHref);
          const replacement = aliasToFile[normalizePath(url.pathname)];
          if (replacement) {
            anchor.setAttribute("href", replacement);
            if (anchor.getAttribute("target") === "_blank") {
              anchor.removeAttribute("target");
            }
          }
        } catch (error) {
          console.warn("siteflow: could not rewrite neocities link", error);
        }
      }

      if (rawHref === "/index.html") anchor.setAttribute("href", "index.html");
      if (rawHref === "/arcade.html") anchor.setAttribute("href", "arcade.html");
      if (rawHref === "/transmissions.html") anchor.setAttribute("href", "transmissions.html");
      if (rawHref === "/timeline.html") anchor.setAttribute("href", "timeline.html");
      if (rawHref === "/field-notes.html") anchor.setAttribute("href", "field-notes.html");
      if (rawHref === "/legend-file.html") anchor.setAttribute("href", "legend-file.html");
      if (rawHref === "/envynomadix.html") anchor.setAttribute("href", "envynomadix.html");
      if (rawHref === "/envynomadix-worldwide.html") anchor.setAttribute("href", "envynomadix-worldwide.html");
      if (rawHref === "/gemstone-field-distortion-paradox.html") anchor.setAttribute("href", "gemstone-field-distortion-paradox.html");
      if (rawHref === "/transmission-intake.html") anchor.setAttribute("href", "transmission-intake.html");
      if (rawHref === "main.html") anchor.setAttribute("href", "index.html");
    });
  }

  function injectTopFlow() {
    if (document.querySelector(".siteflow-shell")) return;
    const vipMode = getVipMode();
    const soundOn = getSoundEnabled();
    const collapsed = getPanelCollapsed();
    const shell = document.createElement("div");
    shell.className = "siteflow-shell" + (collapsed ? " is-collapsed" : "");
    shell.innerHTML = [
      '<div class="siteflow-bar">',
      '  <div class="siteflow-head">',
      '  <div class="siteflow-brand">',
      '    <span class="siteflow-badge" aria-hidden="true"></span>',
      '    <div class="siteflow-brand-copy">',
      '      <span class="siteflow-label">site flow active</span>',
      '      <span class="siteflow-page">' + escapeHtml(currentPage.title) + ' / ' + escapeHtml(currentPage.section) + '</span>',
      '      <span class="siteflow-clearance">' + escapeHtml(currentPage.clearance) + '</span>',
      '    </div>',
      '  </div>',
      '  </div>',
      '  <div class="siteflow-transmission" id="siteflowTransmission">' + escapeHtml(transmissions[0]) + '</div>',
      '  <div class="siteflow-dossier">',
      '    <div class="siteflow-kicker">dossier</div>',
      '    <div class="siteflow-small">' + escapeHtml(currentPage.dossier) + '</div>',
      '  </div>',
      '  <div class="siteflow-jump">' +
        '<a class="siteflow-link siteflow-secondary" href="' + escapeHtml(prevPage.file) + '">Back</a>' +
        keyLinks.map(renderNavLink).join("") +
        '<a class="siteflow-link siteflow-secondary" href="' + escapeHtml(nextPage.file) + '">Next</a>' +
      '</div>',
      '  <div class="siteflow-controls">',
      '    <button class="siteflow-control" id="siteflowVipToggle" type="button">' + (vipMode ? 'vip mode on' : 'vip mode off') + '</button>',
      '    <button class="siteflow-control" id="siteflowSoundToggle" type="button">' + (soundOn ? 'sound on' : 'sound off') + '</button>',
      '    <button class="siteflow-control siteflow-min-toggle" id="siteflowMinToggle" type="button" aria-expanded="' + (!collapsed ? "true" : "false") + '" aria-label="' + (collapsed ? "Open site flow" : "Minimize site flow") + '" title="' + (collapsed ? "Open site flow" : "Minimize site flow") + '">' + (collapsed ? "flow" : "min") + '</button>',
      '  </div>',
      '</div>'
    ].join("");
    document.body.appendChild(shell);
    bindControls();
  }

  function injectSignalTopbar() {
    if (!sharedTopbarPages.includes(currentPage.key)) return;
    if (document.querySelector(".nlx-topbar") || document.querySelector(".nlx-shared-topbar")) return;

    const topbar = document.createElement("div");
    topbar.className = "nlx-shared-topbar nlx-topbar";
    topbar.innerHTML = [
      '<div class="nlx-shared-scanlines"></div>',
      '<div class="nlx-shared-glow"></div>',
      '<div class="nlx-shared-topbar-inner">',
      '  <div class="nlx-shared-left">',
      '    <span class="nlx-shared-dot"></span>',
      '    <span class="nlx-shared-status">SIGNAL ACTIVE</span>',
      '  </div>',
      '  <div class="nlx-shared-center">',
      '    <button class="nlx-shared-symbol-wrap top-scroll-trigger" type="button" aria-label="Scroll to top"><span class="nlx-shared-symbol"></span></button>',
      '    <span class="nlx-shared-message" id="nlxSharedMessage">NLS GHOST NETWORK // PROTOCOL ONLINE</span>',
      '  </div>',
      '  <div class="nlx-shared-right">',
      '    <span class="nlx-shared-node">' + escapeHtml(currentPage.short) + ' NODE</span>',
      '  </div>',
      '</div>'
    ].join("");

    document.body.prepend(topbar);
    document.body.classList.add("siteflow-shared-topbar");
    startSharedTopbarMessages();
  }

  function startSharedTopbarMessages() {
    const message = document.getElementById("nlxSharedMessage");
    if (!message) return;

    let index = Math.abs(hashString(currentPage.key)) % sharedTopbarMessages.length;
    const cycleMessage = function () {
      message.textContent = sharedTopbarMessages[index];
      message.classList.add("glitching");
      setTimeout(function () {
        message.classList.remove("glitching");
      }, 180);
      index = (index + 1) % sharedTopbarMessages.length;
    };

    cycleMessage();
    setInterval(cycleMessage, 2800);
    setInterval(function () {
      if (Math.random() < 0.42) {
        message.classList.add("glitching");
        setTimeout(function () {
          message.classList.remove("glitching");
        }, 150);
      }
    }, 900);
  }

  function injectBottomPager() {
    if (document.querySelector(".siteflow-pager")) return;
    const pager = document.createElement("section");
    pager.className = "siteflow-pager";
    pager.setAttribute("aria-label", "Site navigation flow");
    pager.innerHTML = [
      '<div class="siteflow-pager-grid">',
      renderCard("Previous node", prevPage, "step back through the signal trail", "siteflow-secondary"),
      [
        '<div class="siteflow-card siteflow-card-center">',
        '  <div class="siteflow-kicker">current node</div>',
        '  <div class="siteflow-card-title">' + escapeHtml(currentPage.title) + '</div>',
        '  <div class="siteflow-path">' + escapeHtml(currentPage.clearance) + '</div>',
        '  <div class="siteflow-small">' + escapeHtml(currentPage.summary) + '</div>',
        '  <div class="siteflow-card-actions">',
        '    <a class="siteflow-link" href="index.html">return home</a>',
        '    <a class="siteflow-link siteflow-secondary" href="' + escapeHtml(nextPage.file) + '">continue forward</a>',
        '  </div>',
        '</div>'
      ].join(""),
      renderCard("Next node", nextPage, "keep moving through the connected pages", ""),
      '</div>',
      '<div class="siteflow-directory">' + pages.map(renderDirectoryLink).join("") + '</div>'
    ].join("");
    document.body.appendChild(pager);
  }

  function injectLoreFragment() {
    if (document.querySelector(".siteflow-fragment") || !activeFragment) return;
    const card = document.createElement("aside");
    card.className = "siteflow-fragment";
    const savedState = window.localStorage.getItem(storageKeys.fragmentCollapsed);
    const collapsed = savedState === null ? isMobileViewport() : savedState === "true";
    if (!collapsed) card.classList.add("is-open");
    else card.classList.add("is-collapsed");
    card.setAttribute("aria-expanded", collapsed ? "false" : "true");
    card.innerHTML = [
      '<div class="siteflow-fragment-head">',
      '  <button class="siteflow-fragment-main" type="button" aria-label="Open oracle note">',
      '    <span class="siteflow-fragment-glyph"><span class="siteflow-diamond-mark"></span></span>',
      '    <span class="siteflow-fragment-copy">',
      '      <span class="siteflow-fragment-title">' + escapeHtml(activeFragment.title) + '</span>',
      '      <span class="siteflow-fragment-body">' + escapeHtml(activeFragment.body) + '</span>',
      '      <span class="siteflow-fragment-hint">cycle fragments</span>',
      '    </span>',
      '  </button>',
      '  <button class="siteflow-fragment-toggle" type="button" aria-label="Minimize oracle note">' + (collapsed ? '<span class="siteflow-diamond-mark"></span>' : "−") + '</button>',
      '</div>'
    ].join("");
    card.dataset.fragmentId = activeFragment.id;
    const openState = function (nextOpen) {
      card.classList.toggle("is-open", nextOpen);
      card.classList.toggle("is-collapsed", !nextOpen);
      card.setAttribute("aria-expanded", nextOpen ? "true" : "false");
      const toggle = card.querySelector(".siteflow-fragment-toggle");
      if (toggle) {
        toggle.innerHTML = nextOpen ? "−" : '<span class="siteflow-diamond-mark"></span>';
        toggle.setAttribute("aria-label", nextOpen ? "Minimize oracle note" : "Open oracle note");
      }
      window.localStorage.setItem(storageKeys.fragmentCollapsed, nextOpen ? "false" : "true");
    };
    card.querySelector(".siteflow-fragment-main").addEventListener("click", function () {
      const isOpen = card.classList.contains("is-open");
      if (!isOpen) {
        openState(true);
        if (soundEngine) soundEngine.click();
        return;
      }
      const nextFragment = getShiftedFragment(card.dataset.fragmentId || activeFragment.id);
      if (nextFragment) {
        card.dataset.fragmentId = nextFragment.id;
        card.querySelector(".siteflow-fragment-title").textContent = nextFragment.title;
        card.querySelector(".siteflow-fragment-body").textContent = nextFragment.body;
        window.localStorage.setItem(storageKeys.fragment, nextFragment.id);
      }
      if (soundEngine) soundEngine.click();
    });
    card.querySelector(".siteflow-fragment-toggle").addEventListener("click", function (event) {
      event.stopPropagation();
      openState(!card.classList.contains("is-open"));
      if (soundEngine) soundEngine.click();
    });
    document.body.appendChild(card);
  }

  function injectRareDropSignal() {
    if (document.querySelector(".siteflow-rare-drop")) return;
    if (currentPage.key === "horus" || currentPage.key === "sage" || currentPage.key === "reader") return;
    const shouldShow = !window.localStorage.getItem(storageKeys.rareSeen) && (Math.abs(hashString(currentPage.key + new Date().getDate())) % 3 === 0);
    if (!shouldShow) return;
    const note = document.createElement("aside");
    note.className = "siteflow-rare-drop";
    note.innerHTML = [
      '<div class="siteflow-rare-kicker">rare window //</div>',
      '<div class="siteflow-rare-title">Artifact Window Open</div>',
      '<p class="siteflow-rare-copy">A hidden collector node is pulsing in the network. Horus can unlock it, or enter directly if the gate already knows your signal.</p>',
      '<div class="siteflow-rare-actions">',
      '  <a class="siteflow-link" href="' + (hasHorusAccess() ? "rare-drop.html" : "horus.html") + '">' + (hasHorusAccess() ? "open hidden node" : "pass through horus") + '</a>',
      '</div>'
    ].join("");
    note.addEventListener("click", function () {
      window.localStorage.setItem(storageKeys.rareSeen, "true");
      note.remove();
    }, { once: true });
    document.body.appendChild(note);
  }

  function injectSharedChat() {
    if (currentPage.key === "sage" || currentPage.key === "horus" || currentPage.key === "gemstone" || currentPage.key === "rare-drop") return;
    if (document.querySelector(".siteflow-chat")) return;
    const panel = document.createElement("section");
    panel.className = "siteflow-chat";
    panel.setAttribute("aria-label", "Shared live channel");
    const savedState = window.localStorage.getItem(storageKeys.chatCollapsed);
    const collapsed = savedState === null ? isMobileViewport() : savedState === "true";
    if (collapsed) panel.classList.add("is-collapsed");
    panel.setAttribute("aria-expanded", collapsed ? "false" : "true");
    panel.innerHTML = [
      '<div class="siteflow-chat-head">',
      '  <span class="siteflow-chat-kicker">live channel</span>',
      '  <span class="siteflow-chat-status">public uplink</span>',
      '  <button class="siteflow-chat-toggle" type="button" aria-label="' + (collapsed ? "Open live channel" : "Minimize live channel") + '">' + (collapsed ? "◈" : "−") + '</button>',
      '</div>',
      '<div class="siteflow-chat-frame-wrap">',
      '  <iframe',
      '    class="siteflow-chat-frame"',
      '    src="https://www3.cbox.ws/box/?boxid=3553357&boxtag=AkzTVJ"',
      '    title="Shared site chat"',
      '    loading="lazy"',
      '    frameborder="0"',
      '    scrolling="auto">',
      '  </iframe>',
      '</div>'
    ].join("");
    panel.querySelector(".siteflow-chat-toggle").addEventListener("click", function () {
      const nextCollapsed = !panel.classList.contains("is-collapsed");
      panel.classList.toggle("is-collapsed", nextCollapsed);
      panel.setAttribute("aria-expanded", nextCollapsed ? "false" : "true");
      this.textContent = nextCollapsed ? "◈" : "−";
      this.setAttribute("aria-label", nextCollapsed ? "Open live channel" : "Minimize live channel");
      window.localStorage.setItem(storageKeys.chatCollapsed, nextCollapsed ? "true" : "false");
      if (soundEngine) soundEngine.click();
    });
    document.body.appendChild(panel);
  }

  function isMobileViewport() {
    return window.matchMedia("(max-width: 620px)").matches;
  }

  function renderNavLink(link) {
    const active = link.key === currentPage.key ? " siteflow-active" : "";
    return '<a class="siteflow-link' + active + '" href="' + escapeHtml(link.href) + '">' + escapeHtml(link.label) + '</a>';
  }

  function renderDirectoryLink(page) {
    const active = page.key === currentPage.key ? " siteflow-active" : "";
    return '<a class="' + active.trim() + '" href="' + escapeHtml(page.file) + '">' + escapeHtml(page.short) + '</a>';
  }

  function renderCard(kicker, page, small, extraClass) {
    return [
      '<div class="siteflow-card">',
      '  <div class="siteflow-kicker">' + escapeHtml(kicker) + '</div>',
      '  <div class="siteflow-card-title">' + escapeHtml(page.title) + '</div>',
      '  <div class="siteflow-path">' + escapeHtml(page.section) + '</div>',
      '  <div class="siteflow-small">' + escapeHtml(small) + '</div>',
      '  <div class="siteflow-card-actions">',
      '    <a class="siteflow-link ' + extraClass + '" href="' + escapeHtml(page.file) + '">open page</a>',
      '  </div>',
      '</div>'
    ].join("");
  }

  function installTransitions() {
    const anchors = document.querySelectorAll("a[href]");
    anchors.forEach((anchor) => {
      anchor.addEventListener("mouseenter", function () {
        if (soundEngine) soundEngine.hover();
      });
      anchor.addEventListener("click", function (event) {
        const href = anchor.getAttribute("href");
        if (!href) return;
        if (soundEngine) soundEngine.click();
        if (anchor.target === "_blank") return;
        if (href === "#") {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
        if (/^https?:/i.test(href)) return;

        const targetUrl = new URL(href, window.location.href);
        if (targetUrl.origin !== window.location.origin) return;
        if (targetUrl.pathname === window.location.pathname && targetUrl.hash) return;

        event.preventDefault();
        document.body.classList.add("siteflow-leaving");
        window.setTimeout(function () {
          window.location.href = targetUrl.href;
        }, 180);
      });
    });

    const topTriggers = document.querySelectorAll(".top-scroll-trigger");
    topTriggers.forEach((trigger) => {
      trigger.addEventListener("mouseenter", function () {
        if (soundEngine) soundEngine.hover();
      });
      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        if (soundEngine) soundEngine.click();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  function bindControls() {
    const minToggle = document.getElementById("siteflowMinToggle");
    const vipToggle = document.getElementById("siteflowVipToggle");
    const soundToggle = document.getElementById("siteflowSoundToggle");
    if (minToggle) {
      minToggle.addEventListener("click", function () {
        const shell = document.querySelector(".siteflow-shell");
        if (!shell) return;
        const nextState = !shell.classList.contains("is-collapsed");
        window.localStorage.setItem(storageKeys.collapsed, nextState ? "true" : "false");
        applyPanelState(nextState);
        if (soundEngine) soundEngine.click();
      });
    }
    if (vipToggle) {
      vipToggle.addEventListener("click", function () {
        const nextState = !getVipMode();
        window.localStorage.setItem(storageKeys.vip, nextState ? "true" : "false");
        applyVipMode();
        vipToggle.textContent = nextState ? "vip mode on" : "vip mode off";
        if (soundEngine) soundEngine.click();
      });
    }
    if (soundToggle) {
      soundToggle.addEventListener("click", function () {
        const nextState = !getSoundEnabled();
        window.localStorage.setItem(storageKeys.sound, nextState ? "true" : "false");
        soundToggle.textContent = nextState ? "sound on" : "sound off";
        if (soundEngine) {
          soundEngine.setEnabled(nextState);
          soundEngine.click();
        }
        syncYouTubePlayback(nextState);
      });
    }
  }

  function applyVipMode() {
    document.body.classList.toggle("siteflow-vip-mode", getVipMode());
  }

  function hasHorusAccess() {
    return window.localStorage.getItem(storageKeys.horusAccess) === "true";
  }

  function applyPanelState(collapsed) {
    const shell = document.querySelector(".siteflow-shell");
    const toggle = document.getElementById("siteflowMinToggle");
    if (shell) {
      shell.classList.toggle("is-collapsed", collapsed);
    }
    if (toggle) {
      toggle.textContent = collapsed ? "flow" : "min";
      toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
      toggle.setAttribute("aria-label", collapsed ? "Open site flow" : "Minimize site flow");
      toggle.title = collapsed ? "Open site flow" : "Minimize site flow";
    }
  }

  function getVipMode() {
    return window.localStorage.getItem(storageKeys.vip) === "true";
  }

  function getSoundEnabled() {
    return window.localStorage.getItem(storageKeys.sound) !== "false";
  }

  function getPanelCollapsed() {
    const stored = window.localStorage.getItem(storageKeys.collapsed);
    if (stored === "true") return true;
    if (stored === "false") return false;
    return window.matchMedia("(max-width: 620px)").matches;
  }

  function enforceProtectedRoutes() {
    if (currentFile.toLowerCase() === "rare-drop.html" && !hasHorusAccess()) {
      window.location.replace("horus.html");
    }
  }

  function setupHorusNode() {
    if (currentPage.key !== "horus") return;
    const enter = document.querySelector(".enter-btn");
    const logo = document.querySelector(".logo");
    const status = document.querySelector(".subsignal");
    const container = document.querySelector(".container");
    const godLink = document.querySelector(".god-link");
    let logoHits = 0;

    const unlock = function () {
      window.localStorage.setItem(storageKeys.horusAccess, "true");
      if (status) status.textContent = "SIGNAL LOCKED // GUARDIAN FIELD RECOGNIZED";
      if (enter) {
        enter.textContent = "ENTER THE GRID";
        enter.setAttribute("href", "index.html");
      }
      if (!document.querySelector(".horus-rare-link") && container) {
        const rareLink = document.createElement("a");
        rareLink.className = "horus-rare-link";
        rareLink.href = "rare-drop.html";
        rareLink.textContent = "open hidden artifact node";
        container.appendChild(rareLink);
      }
    };

    if (hasHorusAccess()) unlock();

    if (logo) {
      logo.addEventListener("click", function () {
        logoHits += 1;
        if (logoHits >= 3) unlock();
      });
    }

    if (godLink) {
      godLink.addEventListener("click", function () {
        window.localStorage.setItem(storageKeys.horusAccess, "true");
      });
    }

    document.addEventListener("click", function (event) {
      if (event.target.closest(".enter-btn, .logo-wrap, .horus-rare-link, .god-link")) return;
      document.body.classList.add("horus-warning");
      window.setTimeout(function () {
        document.body.classList.remove("horus-warning");
      }, 320);
    });
  }

  function installLoreGlyphs() {
    const glyphs = document.querySelectorAll("[data-lore-glyph]");
    glyphs.forEach(function (glyph) {
      glyph.addEventListener("click", function () {
        const targetId = glyph.getAttribute("data-lore-glyph");
        const note = document.getElementById(targetId);
        if (!note) return;
        note.classList.toggle("is-open");
        glyph.classList.toggle("is-active");
        if (soundEngine) soundEngine.click();
      });
    });
  }

  function installSecretUnlocks() {
    const locks = document.querySelectorAll("[data-secret-unlock]");
    locks.forEach(function (lock) {
      const revealId = lock.getAttribute("data-secret-unlock");
      const revealNode = document.getElementById(revealId);
      const glyphs = lock.querySelectorAll("[data-lore-glyph]");
      if (!revealNode || !glyphs.length) return;

      const syncState = function () {
        const allActive = Array.from(glyphs).every(function (glyph) {
          return glyph.classList.contains("is-active");
        });
        revealNode.classList.toggle("is-open", allActive);
      };

      glyphs.forEach(function (glyph) {
        glyph.addEventListener("click", function () {
          window.setTimeout(syncState, 0);
        });
      });

      syncState();
    });
  }

  function getShiftedFragment(currentId) {
    const pool = getFragmentPool();
    const currentIndex = pool.findIndex(function (fragment) { return fragment.id === currentId; });
    if (currentIndex === -1) return pool[0];
    return pool[(currentIndex + 1) % pool.length];
  }

  function getFragmentPool() {
    return loreFragments.concat([
      { id: "field", glyph: "✦", title: "Field Log", body: "Ports, coastlines, cities, estates, and late-night routes all feed the same legend when the signal stays intact." },
      { id: "collector", glyph: "⬡", title: "Collector Ledger", body: "The serious pieces are not products. They are artifacts placed with intention and remembered like relics." },
      { id: "horus-gate", glyph: "⟁", title: "Guardian Gate", body: "Horus does not decorate the network. Horus decides what gets through and what gets burned off." }
    ]);
  }

  function startTransmissions() {
    const node = document.getElementById("siteflowTransmission");
    if (!node) return;
    let index = Math.abs(hashString(currentPage.key)) % transmissions.length;
    node.textContent = transmissions[index];
    window.setInterval(function () {
      index = (index + 1) % transmissions.length;
      node.classList.remove("is-live");
      void node.offsetWidth;
      node.textContent = transmissions[index];
      node.classList.add("is-live");
    }, 3600);
  }

  function installAudioIdentity() {
    soundEngine = createSoundEngine(currentPage.hum);
    const arm = function () {
      if (soundEngine) soundEngine.arm();
      if (getSoundEnabled()) {
        syncYouTubePlayback(true);
      }
      document.removeEventListener("pointerdown", arm);
      document.removeEventListener("keydown", arm);
    };
    document.addEventListener("pointerdown", arm, { once: true });
    document.addEventListener("keydown", arm, { once: true });
  }

  function createSoundEngine(profile) {
    let context = null;
    let master = null;
    let humOsc = null;
    let humGain = null;
    let armed = false;

    function ensureContext() {
      if (context) return true;
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return false;
      context = new Ctx();
      master = context.createGain();
      master.gain.value = 0.075;
      master.connect(context.destination);
      return true;
    }

    function arm() {
      if (armed) return;
      if (!ensureContext()) return;
      armed = true;
      if (context.state === "suspended") context.resume();
      if (getSoundEnabled()) startHum(profile);
    }

    function setEnabled(enabled) {
      if (!armed) return;
      if (enabled) startHum(profile);
      else stopHum();
    }

    function hover() {
      if (!armed || !getSoundEnabled() || !ensureContext()) return;
      pulse(profile === "guard" ? 540 : 820, 0.042, 0.05, "triangle");
    }

    function click() {
      if (!armed || !getSoundEnabled() || !ensureContext()) return;
      pulse(profile === "resonance" ? 220 : 190, 0.065, 0.08, "square");
    }

    function pulse(freq, amount, duration, type) {
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(amount, context.currentTime + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
      osc.connect(gain);
      gain.connect(master);
      osc.start();
      osc.stop(context.currentTime + duration + 0.02);
    }

    function startHum(mode) {
      if (!ensureContext()) return;
      stopHum();
      humOsc = context.createOscillator();
      humGain = context.createGain();
      humOsc.type = mode === "guard" ? "sawtooth" : "sine";
      humOsc.frequency.value = mode === "guard" ? 56 : mode === "resonance" ? 132 : mode === "signal" ? 88 : 72;
      humGain.gain.value = mode === "guard" ? 0.012 : mode === "resonance" ? 0.009 : 0.007;
      humOsc.connect(humGain);
      humGain.connect(master);
      humOsc.start();
    }

    function stopHum() {
      if (humOsc) {
        humOsc.stop();
        humOsc.disconnect();
        humOsc = null;
      }
      if (humGain) {
        humGain.disconnect();
        humGain = null;
      }
    }

    return { arm: arm, hover: hover, click: click, setEnabled: setEnabled };
  }

  function getActiveFragment() {
    if (currentPage.key === "intake") {
      return {
        id: "ritual-intake",
        glyph: "⬡",
        title: "Transmission Intake",
        body: "Metal, stone, symbolism, mood, life chapter, and budget all enter here before a piece can be forged into the right form."
      };
    }
    if (currentPage.key === "field-notes") {
      return {
        id: "field-notes",
        glyph: "✦",
        title: "Field Notes",
        body: "Jungle estates, winter cities, night roads, ports, and vanished rooms stay alive here as proof of a life lived at full signal."
      };
    }
    if (currentPage.key === "rare-drop") {
      return {
        id: "artifact-window",
        glyph: "◬",
        title: "Artifact Window",
        body: "A hidden node opened through Horus. Keep this kind of page rare and it will always feel powerful."
      };
    }
    if (currentPage.key === "legend-file") {
      return {
        id: "legend-file",
        glyph: "◬",
        title: "Legend File",
        body: "Operator. Traveler. Jeweler. Musician. Builder. Collector. The file is open for anyone trying to understand the full range."
      };
    }
    if (currentPage.key === "sage") {
      return {
        id: "sage-private-note",
        glyph: "◈",
        title: "Private Collection Note",
        body: "Welcome to your next piece. Let us connect and shape a talisman or ring meant to move with you for life - rare, personal, and worthy of a man or woman building legacy."
      };
    }
    if (currentPage.key === "transmissions") {
      return {
        id: "transmission-note",
        glyph: "▣",
        title: "Signal Update",
        body: "Private network online. Collector routes, transmission drops, and commission openings are posted here first."
      };
    }
    if (currentPage.key === "timeline") {
      return {
        id: "timeline-note",
        glyph: "◇",
        title: "Archive Timeline",
        body: "Every phase leaves an artifact. This node maps the rise of the signal, the collection, and the myth around it."
      };
    }
    if (currentPage.key === "arcade") {
      return {
        id: "arcade-note",
        glyph: "▣",
        title: "Burnout Arcade",
        body: "Live playable nodes for stress, signal, reflex, and style. Enter the games and burn through the static."
      };
    }
    return loreFragments[Math.abs(hashString(currentPage.key + "fragment")) % loreFragments.length];
  }

  function prepareYouTubeEmbeds() {
    const iframes = document.querySelectorAll('iframe[src*="youtube.com/embed/"]');
    iframes.forEach((iframe) => {
      try {
        const url = new URL(iframe.src, window.location.href);
        url.searchParams.set("enablejsapi", "1");
        url.searchParams.set("playsinline", "1");
        url.searchParams.set("origin", window.location.origin);
        iframe.src = url.toString();
      } catch (error) {
        console.warn("siteflow: could not prepare youtube embed", error);
      }
    });
  }

  function syncYouTubePlayback(shouldPlay) {
    const iframes = document.querySelectorAll('iframe[src*="youtube.com/embed/"]');
    iframes.forEach((iframe) => {
      try {
        iframe.contentWindow.postMessage(JSON.stringify({
          event: "command",
          func: shouldPlay ? "playVideo" : "pauseVideo",
          args: []
        }), "https://www.youtube.com");
      } catch (error) {
        console.warn("siteflow: could not sync youtube playback", error);
      }
    });
  }

  function hashString(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = ((hash << 5) - hash) + value.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
