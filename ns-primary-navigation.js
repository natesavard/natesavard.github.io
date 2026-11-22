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

    /* Five links use the exact plain divider-row look of Originals, not pills. */
    .siteflow-shell .ns-primary-five {display:contents!important}
    .siteflow-shell .ns-primary-five a{
      display:flex!important;align-items:center!important;justify-content:space-between!important;
      min-height:40px!important;padding:10px 2px!important;
      border:0!important;border-bottom:1px solid #ffffff1e!important;
      border-radius:0!important;background:none!important;color:#ddd!important;
      font:12px/1.4 Arial,sans-serif!important;
      letter-spacing:.02em!important;text-transform:none!important;
      text-align:left!important;box-shadow:none!important;
      transform:none!important;text-shadow:none!important
    }
    .siteflow-shell .ns-primary-five a::after {
      content:'›';color:#aaa;font-size:20px;line-height:1
    }
    .siteflow-shell .ns-primary-five a:hover,
    .siteflow-shell .ns-primary-five a[aria-current="page"] {
      color:#fff!important;background:#ffffff0b!important
    }

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
            <button class="siteflow-player-button" id="siteflowPlayerPrevious" data-ns-stop type="button" aria-label="Stop track">&#9198;</button>
            <button class="siteflow-player-button is-play" id="siteflowPlayerPlay" data-ns-play type="button" aria-label="Play track" aria-pressed="false">&#9654;</button>
            <button class="siteflow-player-button" id="siteflowPlayerNext" data-ns-next type="button" aria-label="Restart track">&#9197;</button>
          </div>
          <input class="siteflow-player-range" data-ns-seek type="range" min="0" max="1000" value="0" aria-label="Track position">
          <label class="siteflow-player-volume">VOL <input class="siteflow-player-range" data-ns-volume type="range" min="0" max="100" value="90" aria-label="Volume"></label>
        </section>
        <div class="siteflow-transmission">signal stable // private network online</div>
        <div class="siteflow-jump"></div>
        <div class="siteflow-controls">
          <button class="siteflow-control" id="siteflowVipToggle" data-ns-vip type="button">vip mode off</button>
          <button class="siteflow-control" id="siteflowSoundToggle" data-ns-sound type="button">sound on</button>
          <button class="siteflow-control siteflow-min-toggle" id="siteflowMinToggle" data-ns-toggle type="button"
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

  /*
   * The exact right-side slide-out and NS-logo tab are not from site-flow.css.
   * They are the separate, ORIGINAL ns-originals-gothic.css stylesheet.
   * Reuse those rules verbatim, with only its body class scoped to this page.
   * This changes no homepage/collection artwork or page-wide layout.
   */
  function applyExactOriginalsSkin(){
    if(path==='/originals.html') return; // Originals already has the exact original CSS.
    document.body.classList.add('ns-originals-menu-skin');
    const id='ns-originals-gothic-exact-shared';
    if(document.getElementById(id)) return;
    fetch('/ns-originals-gothic.css',{cache:'no-store'})
      .then(response=>{
        if(!response.ok) throw new Error('Original Gothic stylesheet unavailable');
        return response.text();
      })
      .then(source=>{
        const style=document.createElement('style');
        style.id=id;
        style.textContent=source.replaceAll('body.originals-page','body.ns-originals-menu-skin');
        document.head.append(style);
      })
      .catch(()=>{ // Keep panel functional if its original stylesheet fails to load.
        const link=document.createElement('link');
        link.rel='stylesheet';
        link.href='/ns-originals-gothic.css';
        document.head.append(link);
      });
  }


  function applyOriginalsCriticalSkin(){
    if(path==='/originals.html')return;
    const id='ns-originals-critical-skin';
    if(document.getElementById(id))return;
    const style=document.createElement('style');style.id=id;
    style.textContent=`
      body.ns-originals-menu-skin .siteflow-shell {position:fixed!important;top:0!important;right:0!important;left:auto!important;bottom:0!important;width:min(350px,92vw)!important;max-height:100dvh!important;transform:none!important;z-index:9997!important;pointer-events:none!important;}
      body.ns-originals-menu-skin .siteflow-shell::before{display:none!important}
      body.ns-originals-menu-skin .siteflow-bar {position:relative!important;display:flex!important;flex-direction:column!important;gap:0!important;width:100%!important;height:100dvh!important;max-height:100dvh!important;padding:22px 26px!important;overflow-x:hidden!important;overflow-y:auto!important;border:0!important;border-radius:0!important;background:rgba(5,7,11,.26)!important;backdrop-filter:blur(5px)!important;box-shadow:none!important;color:#eee!important;pointer-events:auto!important;}
      body.ns-originals-menu-skin .siteflow-player{position:relative!important;display:grid!important;gap:8px!important;padding:65px 0 17px!important;margin:0 0 15px!important;border:0!important;border-bottom:1px solid #ffffff35!important;border-radius:0!important;background:none!important;box-shadow:none!important;color:#eee!important;font-family:Arial,Helvetica,sans-serif!important}
      body.ns-originals-menu-skin .siteflow-player::before{content:""!important;position:absolute!important;top:0!important;left:0!important;width:60px!important;height:60px!important;background:url('/logo.png') center/contain no-repeat!important}
      body.ns-originals-menu-skin .siteflow-jump{display:flex!important;flex-direction:column!important;gap:0!important;margin:4px 0 10px!important}
      body.ns-originals-menu-skin .siteflow-jump a{display:flex!important;align-items:center!important;justify-content:space-between!important;min-height:40px!important;padding:10px 2px!important;border:0!important;border-bottom:1px solid #ffffff1e!important;border-radius:0!important;background:none!important;color:#ddd!important;font:12px/1.4 Arial,sans-serif!important;letter-spacing:.02em!important;text-transform:none!important;text-align:left!important;box-shadow:none!important}
      body.ns-originals-menu-skin .siteflow-jump a::after{content:'›'!important;color:#aaa!important;font-size:20px!important;line-height:1!important}
      body.ns-originals-menu-skin .siteflow-shell.is-collapsed{top:50%!important;right:-13px!important;bottom:auto!important;width:52px!important;height:82px!important;max-height:none!important;transform:translateY(-50%)!important;overflow:visible!important}
      body.ns-originals-menu-skin .siteflow-shell.is-collapsed .siteflow-bar{width:52px!important;height:82px!important;max-height:82px!important;padding:0!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important;background:transparent!important;box-shadow:none!important;backdrop-filter:none!important;border:0!important}
      body.ns-originals-menu-skin .siteflow-shell.is-collapsed .siteflow-player,body.ns-originals-menu-skin .siteflow-shell.is-collapsed .siteflow-transmission,body.ns-originals-menu-skin .siteflow-shell.is-collapsed .siteflow-dossier,body.ns-originals-menu-skin .siteflow-shell.is-collapsed .siteflow-jump{display:none!important}
      body.ns-originals-menu-skin .siteflow-shell.is-collapsed .siteflow-controls{display:flex!important;margin:0!important;padding:0!important;gap:0!important}
      body.ns-originals-menu-skin .siteflow-shell.is-collapsed #siteflowVipToggle,body.ns-originals-menu-skin .siteflow-shell.is-collapsed #siteflowSoundToggle{display:none!important}
      body.ns-originals-menu-skin .siteflow-shell.is-collapsed #siteflowMinToggle{position:relative!important;display:block!important;flex:0 0 52px!important;width:52px!important;min-width:52px!important;max-width:52px!important;height:82px!important;min-height:82px!important;padding:0!important;margin:0!important;border:0!important;border-radius:22px 0 0 22px!important;background:linear-gradient(135deg,#1c1d21d9,#050509ec)!important;color:transparent!important;font-size:0!important;box-shadow:-5px 5px 22px #0007,inset 1px 0 0 #ffffff35!important;cursor:pointer!important;overflow:hidden!important;clip-path:none!important;transform:none!important}
      body.ns-originals-menu-skin .siteflow-shell.is-collapsed #siteflowMinToggle::before{content:""!important;position:absolute!important;inset:0!important;display:block!important;background:url('/logo.png') 27% center/34px auto no-repeat!important}
      body.ns-originals-menu-skin .siteflow-shell.is-collapsed #siteflowMinToggle::after{content:none!important;display:none!important}
      @media(max-width:600px){body.ns-originals-menu-skin .siteflow-shell{width:min(340px,90vw)!important}body.ns-originals-menu-skin .siteflow-shell.is-collapsed{right:-10px!important}}
    `;
    document.head.append(style);
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
    applyOriginalsCriticalSkin();
    applyExactOriginalsSkin();
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
