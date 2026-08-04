(() => {
  const mount = () => {
    if (document.querySelector('.ns-bottom-nav')) return;

    const style = document.createElement('style');
    style.textContent = `
      .ns-bottom-nav { margin: 64px 0 0; padding: 26px 20px calc(26px + env(safe-area-inset-bottom)); border-top: 1px solid rgba(255,255,255,.16); background: rgba(0,0,0,.82); color: #f3f0e8; text-align: center; font: 10px/1.3 "Courier New", monospace; letter-spacing: .16em; text-transform: uppercase; }
      .ns-bottom-nav__label { display: block; margin-bottom: 14px; color: rgba(255,255,255,.48); font-size: 8px; }
      .ns-bottom-nav__links { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 20px; }
      .ns-bottom-nav a { color: inherit; text-decoration: none; opacity: .82; transition: opacity .2s ease, color .2s ease; }
      .ns-bottom-nav a:hover, .ns-bottom-nav a:focus-visible { color: #fff; opacity: 1; }
    `;

    const nav = document.createElement('nav');
    nav.className = 'ns-bottom-nav';
    nav.setAttribute('aria-label', 'Nate Savard destinations');
    nav.innerHTML = `
      <span class="ns-bottom-nav__label">Nate Savard / explore</span>
      <div class="ns-bottom-nav__links">
        <a href="/revelations.html">Revelations</a>
        <a href="/vault.html">Vault</a>
        <a href="/insomnia-world.html">Insomnia World</a>
      </div>`;

    document.head.appendChild(style);
    document.body.appendChild(nav);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
