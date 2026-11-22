/* NATE SAVARD / PRIMARY NAVIGATION
   Additive only: Home, Rebirth, Jewelry, Vault, Journal always lead.
   Existing menus, carts, original links, media and animations are preserved.
*/
(()=>{
  'use strict';
  if(window.__nsPrimaryNavigationInstalled) return;
  window.__nsPrimaryNavigationInstalled=true;

  const MAIN=[
    ['Home','/'],
    ['Rebirth','/envynomadixrebirth.html'],
    ['Jewelry','/originals.html'],
    ['Vault','/vault.html'],
    ['Journal','/journal.html']
  ];
  const STYLE='ns-primary-navigation-style';
  const css=`
    .ns-primary-link{white-space:nowrap}
    .ns-primary-link[aria-current="page"]{text-decoration:underline;text-underline-offset:4px}
    .ns-primary-nav-group{display:flex;align-items:center;flex-wrap:wrap;gap:10px 16px;margin:0;min-width:0}
    .ns-primary-nav-group a{font-family:inherit;font-size:inherit;color:inherit;text-decoration:none}
    .ns-primary-nav-group a:hover,.ns-primary-nav-group a:focus-visible{opacity:1;text-decoration:underline;text-underline-offset:4px}
    /* Separate site-wide drawer, deliberately small to preserve page artwork */
    #ns-primary-menu-toggle{position:fixed;left:12px;bottom:18px;z-index:14860;
      border:1px solid rgba(218,189,143,.46);border-radius:3px;
      background:rgba(7,6,7,.88);color:#eee5d8;
      font:10px/1.2 'Courier New',monospace;letter-spacing:.19em;
      padding:10px 12px;cursor:pointer;backdrop-filter:blur(8px);
      box-shadow:0 6px 25px rgba(0,0,0,.28)}
    #ns-primary-menu-toggle:hover,#ns-primary-menu-toggle:focus-visible{border-color:#ead8c2;background:#151115}
    #ns-primary-menu-drawer{position:fixed;inset:0 auto 0 0;width:min(340px,88vw);
      z-index:14861;box-sizing:border-box;padding:64px 24px 30px;
      overflow-y:auto;background:rgba(8,7,9,.97);color:#ede2d5;
      border-right:1px solid rgba(220,194,152,.32);
      box-shadow:12px 0 42px rgba(0,0,0,.55);transform:translateX(-105%);
      transition:transform .28s ease;visibility:hidden}
    #ns-primary-menu-drawer.is-open{transform:translateX(0);visibility:visible}
    #ns-primary-menu-drawer .ns-primary-menu-label{font:10px/1.6 'Courier New',monospace;
      text-transform:uppercase;letter-spacing:.28em;color:#b4a48e;margin:0 0 30px}
    #ns-primary-menu-drawer .ns-primary-menu-items{display:flex;flex-direction:column;gap:0}
    #ns-primary-menu-drawer .ns-primary-menu-items a{display:block;padding:16px 0;
      border-bottom:1px solid rgba(231,207,174,.14);color:#f3eade;text-decoration:none;
      font:400 clamp(24px,5vw,32px)/1.15 Georgia,'Times New Roman',serif;letter-spacing:.035em}
    #ns-primary-menu-drawer .ns-primary-menu-items a:hover,
    #ns-primary-menu-drawer .ns-primary-menu-items a:focus-visible{color:#fff;text-decoration:underline}
    #ns-primary-menu-close{position:absolute;top:16px;right:18px;border:0;
      background:transparent;color:#eee5d8;cursor:pointer;font:12px 'Courier New',monospace;letter-spacing:.12em;padding:10px}
    #ns-primary-menu-shade{position:fixed;inset:0;z-index:14859;background:rgba(0,0,0,.54);
      opacity:0;visibility:hidden;transition:opacity .25s ease}
    #ns-primary-menu-shade.is-open{opacity:1;visibility:visible}
    @media(prefers-reduced-motion:reduce){#ns-primary-menu-drawer,#ns-primary-menu-shade{transition:none}}
    @media(max-width:760px){#ns-primary-menu-toggle{left:8px;bottom:max(10px,env(safe-area-inset-bottom));padding:9px 10px;font-size:9px}
      .header .nav .ns-primary-link{font-size:10px}}
  `;

  const current=()=>{
    let p=location.pathname.toLowerCase();
    return p==='/'||p.endsWith('/index.html') ? '/' : p;
  };
  const makeLink=([label,href],className='ns-primary-link')=>{
    const a=document.createElement('a');
    a.className=className;
    a.href=href;
    a.textContent=label;
    if(current()===href.toLowerCase())a.setAttribute('aria-current','page');
    return a;
  };

  function prependLinks(nav){
    if(!nav||nav.dataset.nsPrimaryNavigation==='1')return;
    nav.dataset.nsPrimaryNavigation='1';
    // Existing links are not removed; add five main destinations in the requested order.
    const group=document.createElement('span');
    group.className='ns-primary-nav-group';
    group.setAttribute('aria-label','Main destinations');
    MAIN.forEach(entry=>group.append(makeLink(entry)));
    nav.prepend(group);
  }

  function updateMenus(){
    // The homepage's own top navigation gets a direct Journal link.
    const homepage=document.querySelector('.header .nav');
    if(homepage&&!homepage.querySelector('[data-ns-top-journal]')){
      const journal=makeLink(['Journal','/journal.html']);
      journal.dataset.nsTopJournal='1';
      homepage.append(journal);
    }
    // Main built-in menus across existing site pages.
    const targets=[
      '.lux-nav', '.utility-menu', '.ns-bottom-nav__links',
      '.siteflow-directory', '.siteflow-nav', '.siteflow-links',
      '.siteflow-routes', '.siteflow-navigation',
      '.originals-primary-nav', '.originals-nav'
    ];
    document.querySelectorAll(targets.join(',')).forEach(prependLinks);
    // Keep the Journal's own compact header otherwise unchanged.
  }

  function buildDrawer(){
    if(document.getElementById('ns-primary-menu-toggle'))return;
    const shade=document.createElement('div');shade.id='ns-primary-menu-shade';shade.setAttribute('aria-hidden','true');
    const toggle=document.createElement('button');toggle.id='ns-primary-menu-toggle';
    toggle.type='button';toggle.textContent='MENU';toggle.setAttribute('aria-controls','ns-primary-menu-drawer');toggle.setAttribute('aria-expanded','false');
    const drawer=document.createElement('nav');drawer.id='ns-primary-menu-drawer';drawer.setAttribute('aria-label','Nate Savard main navigation');
    drawer.setAttribute('aria-hidden','true');
    const close=document.createElement('button');close.type='button';close.id='ns-primary-menu-close';close.textContent='CLOSE ×';close.setAttribute('aria-label','Close main navigation');
    const caption=document.createElement('p');caption.className='ns-primary-menu-label';caption.textContent='NATE SAVARD / EXPLORE';
    const links=document.createElement('div');links.className='ns-primary-menu-items';
    MAIN.forEach(item=>links.append(makeLink(item)));
    drawer.append(close,caption,links);
    document.body.append(shade,toggle,drawer);
    let previousFocus=null;
    const setOpen=open=>{
      drawer.classList.toggle('is-open',open);shade.classList.toggle('is-open',open);
      drawer.setAttribute('aria-hidden',String(!open));toggle.setAttribute('aria-expanded',String(open));
      if(open){previousFocus=document.activeElement;close.focus();}
      else if(previousFocus&&previousFocus.focus){previousFocus.focus();}
    };
    toggle.addEventListener('click',()=>setOpen(toggle.getAttribute('aria-expanded')!=='true'));
    close.addEventListener('click',()=>setOpen(false));
    shade.addEventListener('click',()=>setOpen(false));
    document.addEventListener('keydown',ev=>{
      if(ev.key==='Escape'&&drawer.classList.contains('is-open'))setOpen(false);
      if(ev.key==='Tab'&&drawer.classList.contains('is-open')){
        const focusables=[close,...drawer.querySelectorAll('a[href]')];
        const first=focusables[0],last=focusables[focusables.length-1];
        if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus();}
        else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus();}
      }
    });
  }

  function init(){
    if(!document.getElementById(STYLE)){
      const style=document.createElement('style');style.id=STYLE;style.textContent=css;
      document.head.append(style);
    }
    buildDrawer();
    updateMenus();
    let scheduled=false;
    const observer=new MutationObserver(()=>{
      if(scheduled)return;
      scheduled=true;
      requestAnimationFrame(()=>{scheduled=false;updateMenus();});
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
