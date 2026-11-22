/* NATE SAVARD — original X Y Z right-side panel from originals.html.
 * Add the five primary routes to an existing Site Flow panel or mount the
 * same siteflow-shell/siteflow-bar UI, using its actual site-flow.css styles.
 * Never modify page artwork, cart markup, galleries, or landing screens.
 */
(()=>{
  'use strict';
  if (window.__nsPrimaryRightPanelV12) return;
  window.__nsPrimaryRightPanelV12=true;
  const path=location.pathname.toLowerCase();
  if (/^\/original(?:\/|$)/.test(path) || /\/original\.html$/.test(path)) return;
  const routes=[
    ['Home','/'],
    ['Rebirth','/envynomadixrebirth.html'],
    ['Jewelry','/originals.html'],
    ['Vault','/vault.html'],
    ['Journal','/journal.html']
  ];
  const css=`
    /* Compatibility: remove only the previously added, incorrect LEFT menu. */
    #ns-primary-menu-toggle,#ns-primary-menu-drawer,#ns-primary-menu-shade,
    #ns-custom-right-panel,#ns-primary-panel-toggle {display:none!important}
    /* This is the ORIGINAL site-flow right panel styling, not a new drawer. */
    .siteflow-shell.ns-originals-panel-copy {z-index:9997;}
    .siteflow-shell .ns-primary-five {display:flex;flex-direction:column;gap:6px;margin:0 0 7px}
    .siteflow-shell .ns-primary-five a {display:block;text-decoration:none;
      font:10px/1.3 'Trebuchet MS','Segoe UI',sans-serif;letter-spacing:.06em;
      text-transform:uppercase;color:var(--siteflow-muted,#b7bfd0)!important;
      background:transparent;border:1px solid transparent;border-radius:999px;
      padding:6px 2px;text-align:center;transition:color .2s,background .2s}
    .siteflow-shell .ns-primary-five a:hover,
    .siteflow-shell .ns-primary-five a:focus-visible,
    .siteflow-shell .ns-primary-five a[aria-current="page"]{
      color:var(--siteflow-text,#f5f0de)!important;text-shadow:0 0 12px rgba(255,216,107,.25)}
    .siteflow-shell.is-collapsed .ns-primary-five{display:none!important}
    .siteflow-shell.ns-originals-panel-copy .siteflow-player {display:grid}
    .siteflow-shell.ns-originals-panel-copy .siteflow-bar {pointer-events:auto}
    .siteflow-shell.ns-originals-panel-copy .siteflow-min-toggle{cursor:pointer}
    .siteflow-shell.ns-originals-panel-copy .siteflow-player-button{cursor:pointer}
    .siteflow-shell.ns-originals-panel-copy .siteflow-player-button:disabled{opacity:.5;cursor:default}
    /* Existing Rebirth ribbon links remain untouched. */
    @media(max-width:620px){
      .siteflow-shell .ns-primary-five{gap:5px}
      .siteflow-shell .ns-primary-five a{font-size:10px;padding:7px 10px}
    }
    /* Cart remains in homepage TOP RIGHT; no replacement cart UI in the panel. */
    body:has(.hero-main) #ns-home-cart-corner{position:fixed;right:22px;top:18px;z-index:9998;
      color:#eee1cf;text-decoration:none;text-transform:uppercase;font:10px 'Courier New',monospace;
      letter-spacing:.16em;text-shadow:0 1px 8px #000}
    @media(max-width:700px){body:has(.hero-main) #ns-home-cart-corner{right:12px;top:15px}}
  `;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function active(href){return href==='/'?path==='/'||path==='/index.html':path===href.toLowerCase();}
  function navigation(){
    const nav=document.createElement('nav');
    nav.className='ns-primary-five';
    nav.setAttribute('aria-label','Primary pages');
    for(const [title,url] of routes){
      const link=document.createElement('a');link.href=url;link.textContent=title;
      if(active(url)) link.setAttribute('aria-current','page');
      nav.append(link);
    }
    return nav;
  }
  function injectLinksIntoExisting(){
    const shell=document.querySelector('.siteflow-shell:not(.ns-originals-panel-copy)');
    if(!shell) return false;
    if(shell.querySelector('.ns-primary-five')) return true;
    const jump=shell.querySelector('.siteflow-jump');
    if(jump){jump.prepend(navigation());return true;}
    const bar=shell.querySelector('.siteflow-bar');
    if(bar){bar.prepend(navigation());return true;}
    return false;
  }
  function createPanel(){
    if(document.querySelector('.siteflow-shell')) return;
    const shell=document.createElement('div');
    shell.className='siteflow-shell ns-originals-panel-copy is-collapsed';
    shell.setAttribute('aria-label','Nate Savard X Y Z menu');
    shell.innerHTML=`
      <div class="siteflow-bar">
        <section class="siteflow-player" aria-label="Nate Savard music player">
          <div class="siteflow-player-head">
            <span class="siteflow-player-brand"><strong>NS AUDIO</strong><small>STEREO 85</small></span>
            <span class="siteflow-player-track-number">01/01</span>
          </div>
          <div class="siteflow-player-screen" aria-live="polite">
            <span class="siteflow-player-title">NATE SAVARD — CHOSEN FEW / SONG 3</span>
            <span class="siteflow-player-meta"><span data-ns-status>READY</span><time data-ns-time>00:00 / --:--</time></span>
          </div>
          <div class="siteflow-player-buttons" aria-label="Playback controls">
            <button class="siteflow-player-button" data-ns-stop type="button" aria-label="Stop track">&#9198;</button>
            <button class="siteflow-player-button is-play" data-ns-play type="button" aria-label="Play track" aria-pressed="false">&#9654;</button>
            <button class="siteflow-player-button" data-ns-next type="button" aria-label="Restart track">&#9197;</button>
          </div>
          <input class="siteflow-player-range" data-ns-seek type="range" min="0" max="1000" value="0" aria-label="Track position">
          <label class="siteflow-player-volume">VOL <input class="siteflow-player-range" data-ns-volume type="range" min="0" max="100" value="90" aria-label="Volume"></label>
        </section>
        <div class="siteflow-transmission">signal stable // private network online</div>
        <div class="siteflow-jump"></div>
        <div class="siteflow-controls">
          <button class="siteflow-control" data-ns-vip type="button">vip mode off</button>
          <button class="siteflow-control" data-ns-sound type="button">sound on</button>
          <button class="siteflow-control siteflow-min-toggle" data-ns-toggle type="button"
            aria-expanded="false" aria-label="Open X Y Z" title="Open X Y Z">X Y Z</button>
        </div>
      </div>`;
    shell.querySelector('.siteflow-jump').append(navigation());
    document.body.append(shell);
    const toggle=shell.querySelector('[data-ns-toggle]');
    const setCollapsed=collapsed=>{
      shell.classList.toggle('is-collapsed',collapsed);
      toggle.textContent=collapsed?'X Y Z':'min';
      toggle.setAttribute('aria-expanded',String(!collapsed));
      toggle.setAttribute('aria-label',collapsed?'Open X Y Z':'Minimize X Y Z');
      toggle.title=collapsed?'Open X Y Z':'Minimize X Y Z';
      try {sessionStorage.setItem('ns-main-xyz-collapsed',String(collapsed));}catch(_){}
    };
    const stored=(()=>{try{return sessionStorage.getItem('ns-main-xyz-collapsed')}catch(_){return null}})();
    setCollapsed(stored===null ? true : stored==='true');
    toggle.addEventListener('click',()=>setCollapsed(!shell.classList.contains('is-collapsed')));

    const track=new Audio('/Song%203%20FULLLL.mp3');track.preload='metadata';track.volume=.9;
    const play=shell.querySelector('[data-ns-play]');
    const status=shell.querySelector('[data-ns-status]');
    const time=shell.querySelector('[data-ns-time]');
    const seek=shell.querySelector('[data-ns-seek]');
    const volume=shell.querySelector('[data-ns-volume]');
    const fmt=n=>Number.isFinite(n)?Math.floor(n/60).toString().padStart(2,'0')+':'+Math.floor(n%60).toString().padStart(2,'0'):'--:--';
    const update=()=>{
      play.textContent=track.paused?'▶':'Ⅱ';
      play.setAttribute('aria-pressed',String(!track.paused));
      status.textContent=track.paused?'READY':'PLAYING';
      time.textContent=fmt(track.currentTime)+' / '+fmt(track.duration);
      if(Number.isFinite(track.duration)&&track.duration>0)seek.value=String(Math.round(track.currentTime/track.duration*1000));
    };
    play.addEventListener('click',()=>{if(track.paused)track.play().catch(()=>{status.textContent='UNAVAILABLE'});else track.pause();});
    shell.querySelector('[data-ns-stop]').addEventListener('click',()=>{track.pause();track.currentTime=0;update()});
    shell.querySelector('[data-ns-next]').addEventListener('click',()=>{track.currentTime=0;track.play().catch(()=>{});});
    seek.addEventListener('input',()=>{if(Number.isFinite(track.duration)) track.currentTime=(Number(seek.value)/1000)*track.duration;});
    volume.addEventListener('input',()=>{track.volume=Number(volume.value)/100;});
    ['play','pause','timeupdate','loadedmetadata','ended'].forEach(ev=>track.addEventListener(ev,update));
    shell.querySelector('[data-ns-vip]').addEventListener('click',e=>{const b=e.currentTarget;const on=b.textContent.includes('off');b.textContent=on?'vip mode on':'vip mode off';});
    shell.querySelector('[data-ns-sound]').addEventListener('click',e=>{const b=e.currentTarget;const on=b.textContent.includes('off');track.muted=on;b.textContent=on?'sound on':'sound off';});
  }
  function homepageCart(){
    if(path!=='/'&&path!=='/index.html')return;
    if(document.getElementById('ns-home-cart-corner'))return;
    const el=document.createElement('a');el.id='ns-home-cart-corner';
    el.href='/originals.html';el.textContent='CART';
    el.title='Open Jewelry shopping page';
    document.body.append(el);
  }
  function init(){
    if(!document.getElementById('ns-primary-v12-style')){
      const style=document.createElement('style');style.id='ns-primary-v12-style';style.textContent=css;document.head.append(style);
    }
    homepageCart();
    if(injectLinksIntoExisting())return;
    if(!document.querySelector('.siteflow-shell')){
      const stylesheetId='ns-primary-original-siteflow-css';
      if(!document.querySelector('link[href*="site-flow.css"]')){
        const link=document.createElement('link');link.id=stylesheetId;link.rel='stylesheet';link.href='/site-flow.css';document.head.append(link);
      }
      createPanel();
    }
    // If site-flow.js mounts its original panel after us, replace our copy
    // with the real siteflow panel so only one right-side menu exists.
    let pending=false;
    const observer=new MutationObserver(()=>{
      if(pending)return;pending=true;
      requestAnimationFrame(()=>{
        pending=false;
        const real=document.querySelector('.siteflow-shell:not(.ns-originals-panel-copy)');
        if(real){const copy=document.querySelector('.siteflow-shell.ns-originals-panel-copy');if(copy)copy.remove();injectLinksIntoExisting();}
      });
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
