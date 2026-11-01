/* NATE SAVARD — Originals-style homepage cart drawer.
   Add this script after ns-home-collection-vault.js in index.html. */
(() => {
  const mount = () => {
    const dialog = document.querySelector('.nsv-overlay:has(.nsv-drawer)');
    const drawer = dialog?.querySelector('.nsv-drawer');
    const tab = document.getElementById('ns-vault-cart-open');
    if (!dialog || !drawer || !tab || drawer.dataset.originalsStyleApplied) return !!drawer?.dataset.originalsStyleApplied;
    drawer.dataset.originalsStyleApplied = 'true';

    const overline = drawer.querySelector('.nsv-overline');
    const title = drawer.querySelector('h2');
    const close = drawer.querySelector('.nsv-close');
    if (overline && title && close) {
      const header = document.createElement('div');
      header.className = 'nsv-cart-header';
      const minimize = document.createElement('button');
      minimize.className = 'nsv-cart-monogram';
      minimize.type = 'button';
      minimize.setAttribute('aria-label', 'Minimize cart');
      minimize.title = 'Minimize cart';
      const logo = document.createElement('img');
      logo.src = '/assets/ns-chrome-monogram.webp';
      logo.alt = 'NS monogram';
      minimize.append(logo);
      const heading = document.createElement('div');
      heading.className = 'nsv-cart-heading';
      heading.append(overline, title);
      close.classList.add('nsv-cart-close');
      close.setAttribute('aria-label', 'Close cart');
      header.append(minimize, heading, close);
      drawer.insertBefore(header, drawer.firstChild);
      minimize.addEventListener('click', () => close.click());
    }

    const css = `
#ns-vault-cart-open{position:fixed!important;right:0!important;top:44%!important;bottom:auto!important;width:54px!important;height:178px!important;border:1px solid rgba(215,171,82,.22)!important;border-right:0!important;border-radius:22px 0 0 22px!important;background:linear-gradient(180deg,rgba(10,6,4,.96),rgba(0,0,0,.98))!important;color:#f6e8d0!important;box-shadow:-9px 8px 32px rgba(0,0,0,.6)!important;padding:12px 7px!important;writing-mode:vertical-rl!important;letter-spacing:.19em!important;font:700 10px 'Courier New',monospace!important;z-index:16000!important;transition:width .35s ease,border-color .24s ease!important}
#ns-vault-cart-open:before{content:'';position:absolute;left:50%;top:14px;bottom:14px;width:1px;background:linear-gradient(transparent,rgba(215,171,82,.65),transparent)}
#ns-vault-cart-open:hover,#ns-vault-cart-open:focus-visible{width:68px!important;outline:0!important;border-color:rgba(215,171,82,.4)!important}
.nsv-overlay:has(.nsv-drawer){display:flex!important;align-items:stretch!important;justify-content:flex-end!important;padding:0!important;background:rgba(0,0,0,.55)!important;backdrop-filter:blur(5px)!important;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .45s ease,visibility 0s linear .45s!important}
.nsv-overlay.open:has(.nsv-drawer){opacity:1;visibility:visible;pointer-events:auto;transition:opacity .45s ease,visibility 0s!important}
.nsv-overlay .nsv-drawer{position:absolute!important;top:0!important;right:0!important;width:min(440px,92vw)!important;height:100%!important;height:100dvh!important;max-height:none!important;margin:0!important;padding:22px 20px 30px!important;background:linear-gradient(180deg,rgba(10,6,4,.96),rgba(0,0,0,.98)),rgba(0,0,0,.94)!important;border:0!important;border-left:1px solid rgba(215,171,82,.14)!important;border-radius:0!important;box-shadow:-20px 0 50px rgba(0,0,0,.42)!important;transform:translateX(100%)!important;opacity:0;overflow-y:auto!important;transition:transform .45s cubic-bezier(.16,.9,.2,1),opacity .45s ease!important}
.nsv-overlay.open .nsv-drawer{transform:translateX(0)!important;opacity:1}
.nsv-cart-header{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:22px}
.nsv-cart-heading{flex:1;min-width:0}
.nsv-cart-heading .nsv-overline{color:rgba(215,171,82,.76)!important;font:10px 'Courier New',monospace!important;letter-spacing:.2em!important;margin:0 0 9px!important}
.nsv-cart-heading h2{margin:0!important;color:#f6e8d0!important;font:400 1rem 'Courier New',monospace!important;letter-spacing:.26em!important;text-transform:uppercase!important;line-height:1.5!important}
.nsv-overlay .nsv-cart-monogram{display:grid!important;place-items:center!important;flex:0 0 44px!important;width:44px!important;height:44px!important;padding:5px!important;border:1px solid rgba(215,171,82,.14)!important;border-radius:50%!important;background:rgba(255,255,255,.02)!important;cursor:pointer!important;transition:transform .24s ease,border-color .24s ease,background .24s ease!important}
.nsv-overlay .nsv-cart-monogram:hover{transform:translateY(-1px)!important;border-color:rgba(215,171,82,.28)!important;background:rgba(215,171,82,.12)!important}
.nsv-cart-monogram img{display:block;width:100%;height:100%;object-fit:contain}
.nsv-overlay .nsv-cart-close{position:relative!important;top:auto!important;right:auto!important;z-index:2;flex:0 0 44px;width:44px;height:44px;padding:0!important;border:1px solid rgba(215,171,82,.14)!important;border-radius:50%!important;background:rgba(255,255,255,.02)!important;color:#f6e8d0!important;font-size:18px!important;line-height:1!important;cursor:pointer;transition:transform .24s ease,border-color .24s ease,background .24s ease!important}
.nsv-overlay .nsv-cart-close:hover{transform:translateY(-1px)!important;border-color:rgba(215,171,82,.28)!important;background:rgba(215,171,82,.12)!important}
.nsv-drawer .nsv-items{display:grid;gap:14px}
.nsv-drawer .nsv-line{display:grid;grid-template-columns:92px 1fr;gap:14px;padding:12px 0 16px;border-bottom:1px solid rgba(215,171,82,.12)}
.nsv-drawer .nsv-line img{display:block;width:auto;height:auto;max-width:100%;max-height:108px;min-height:110px;object-fit:contain;background:radial-gradient(circle at center,rgba(215,171,82,.1),transparent 68%);filter:drop-shadow(0 18px 26px rgba(0,0,0,.4)) drop-shadow(0 0 14px rgba(215,171,82,.1))}
.nsv-drawer .nsv-line strong{display:block;color:#f6e8d0;font: .8rem 'Courier New',monospace;letter-spacing:.16em;line-height:1.6;text-transform:uppercase}
.nsv-drawer .nsv-line small{display:block;margin-top:6px;color:rgba(215,171,82,.76);font:.68rem 'Courier New',monospace;letter-spacing:.18em;line-height:1.9;text-transform:uppercase}
.nsv-drawer .nsv-line button{border:0!important;padding:0!important;margin:10px 12px 0 0!important;background:transparent!important;color:rgba(246,230,202,.78)!important;font:.62rem 'Courier New',monospace!important;letter-spacing:.16em!important;text-transform:uppercase;cursor:pointer}
.nsv-drawer .nsv-total{display:flex;justify-content:space-between;margin:10px 0 0;color:rgba(246,230,202,.82);font:.68rem 'Courier New',monospace;letter-spacing:.16em;line-height:1.8;text-transform:uppercase}
.nsv-drawer>p{font:12px/1.7 'Courier New',monospace!important;color:rgba(246,230,202,.7)!important}
.nsv-drawer .nsv-form{display:grid;gap:12px;margin-top:22px;padding-top:18px;border-top:1px solid rgba(215,171,82,.12)}
.nsv-drawer .nsv-form label{display:grid;gap:6px;margin:0;color:rgba(215,171,82,.7)!important;font:.62rem 'Courier New',monospace!important;letter-spacing:.22em!important;text-transform:uppercase}
.nsv-drawer input,.nsv-drawer textarea{box-sizing:border-box;width:100%;border:1px solid rgba(215,171,82,.14)!important;background:rgba(10,6,4,.7)!important;color:#f6e8d0!important;font:.78rem 'Courier New',monospace!important;letter-spacing:.08em;padding:12px!important;resize:vertical}
.nsv-drawer .nsv-submit{width:100%;min-height:42px;margin-top:8px;border:1px solid rgba(215,171,82,.16)!important;background:linear-gradient(180deg,rgba(214,168,79,.18),rgba(214,168,79,.08))!important;color:#f6e8d0!important;font:.68rem 'Courier New',monospace!important;letter-spacing:.18em!important;text-transform:uppercase;cursor:pointer}
.nsv-drawer .nsv-submit:disabled{opacity:.35;cursor:not-allowed}
@media(max-width:600px){#ns-vault-cart-open{top:39%!important;width:43px!important;height:145px!important}.nsv-overlay .nsv-drawer{width:min(440px,95vw)!important;padding:22px 20px 30px!important}}
@media(prefers-reduced-motion:reduce){.nsv-overlay:has(.nsv-drawer),.nsv-overlay .nsv-drawer{transition:none!important}}
`;
    const style = document.createElement('style');
    style.id = 'nsv-originals-cart-style';
    style.textContent = css;
    document.head.append(style);
    tab.setAttribute('aria-label', 'Open Nate Savard shopping cart');
    tab.title = 'Open cart';
    return true;
  };
  if (!mount()) {
    const observer = new MutationObserver(() => {
      if (mount()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
