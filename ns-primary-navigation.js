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
    /* HOMEPAGE ONLY: reposition the REAL cart trigger. Its existing JS opens
       the real shopping drawer and preserves product quantities/orders. */
    body.ns-cart-top-right #ns-vault-cart-open {
      position:fixed!important; top:17px!important; right:18px!important;
      bottom:auto!important; left:auto!important;
      display:inline-flex!important; align-items:center!important;justify-content:center!important;
      box-sizing:border-box!important;
      width:auto!important; min-width:92px!important; height:35px!important;
      max-height:35px!important;
      padding:8px 13px!important;
      margin:0!important;
      writing-mode:horizontal-tb!important;
      text-orientation:mixed!important;
      transform:none!important;
      border:1px solid rgba(235,219,199,.56)!important;
      border-radius:4px!important;
      background:rgba(5,5,8,.83)!important;
      color:#eee1cf!important;
      font:600 10px/1.2 'Courier New',monospace!important;
      letter-spacing:.13em!important;
      white-space:nowrap!important;
      box-shadow:0 4px 16px #0006!important;
      cursor:pointer!important;
      z-index:18000!important;
    }
    body.ns-cart-top-right #ns-vault-cart-open::before,
    body.ns-cart-top-right #ns-vault-cart-open::after{display:none!important;content:none!important}
    body.ns-cart-top-right #ns-vault-cart-open:hover,
    body.ns-cart-top-right #ns-vault-cart-open:focus-visible{
      width:auto!important;background:rgba(26,26,32,.98)!important;
      border-color:#eee1cf!important;outline-offset:2px
    }
    #ns-home-cart-corner{display:none!important}
    @media(max-width:640px){
      body.ns-cart-top-right #ns-vault-cart-open{right:9px!important;top:12px!important;
        min-width:80px!important;padding:8px 9px!important}
    }
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

  // The homepage already owns a real functioning cart button and drawer.
  // Never create a link to another page pretending it is the cart.
  function homepageCart(){
    if(path!=='/' && path!=='/index.html') return;
    document.body.classList.add('ns-cart-top-right');
    const obsolete=document.getElementById('ns-home-cart-corner');
    if(obsolete) obsolete.remove();
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

/* Nate Savard commerce bridge: preserve native House viewer on Envynomadix and Rebirth.
   On Homepage and Vault use the same envy-house-cart data shape and a matching viewer/drawer.
   Does not modify page artwork, gallery motion, or product assets. */
(()=>{
'use strict';
if(window.__nsSitewideCommerceV1)return;
window.__nsSitewideCommerceV1=true;
const path=location.pathname.toLowerCase();
if(/^\/original(?:\/|$)/.test(path)||path.endsWith('/original.html'))return;
const KEY='envy-house-cart', LEGACY='ns-vault-boutique-cart-v1', ORIGINALS='originals-collector-cart';
const DEFAULT_PRICE=129;
const nativeHouse=()=>!!(document.getElementById('houseViewer')&&document.getElementById('houseCartShell'));
const home=path==='/'||path==='/index.html';
const vault=path==='/vault.html';
const house=/\/envynomadix(?:rebirth)?\.html$/.test(path);
const originals=path==='/originals.html';
// The native House viewer and cart are already the preferred experience.
// Add prices where none are published, but do not replace their functioning UI.
function assignPrices(){
 document.querySelectorAll('[data-house-product]').forEach(card=>{
   const val=card.getAttribute('data-house-price')||'';
   if(!/\d/.test(val)||!Number(String(val).replace(/[^0-9.]/g,'')))card.setAttribute('data-house-price','$129.00');
 });
}
if(house){
 assignPrices();
 const watcher=new MutationObserver(assignPrices);
 const go=()=>watcher.observe(document.body,{childList:true,subtree:true});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go,{once:true});else go();
}
const money=n=>'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const cost=s=>{const n=Number(String(s??'').replace(/[^\d.]/g,''));return Number.isFinite(n)&&n>0?n:DEFAULT_PRICE};
const esc=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[ch]));
const norm=s=>String(s??'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const imageKey=s=>String(s??'').split(/[?#]/)[0].split('/').pop().toLowerCase();
const getHouseCart=()=>{try{const a=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(a)?a:[]}catch{return []}};
const getOriginals=()=>{try{const a=JSON.parse(localStorage.getItem(ORIGINALS)||'[]');return Array.isArray(a)?a:[]}catch{return []}};
const getCart=()=>[...getHouseCart(),...getOriginals().map((a,i)=>({...a,id:'originals::'+i,origin:'originals',size:[a.sizeValue,a.stoneValue].filter(Boolean).join(' / ')||'custom',optionLabel:'Original collection',options:[a.sizeValue||'custom'],price:a.price||money(DEFAULT_PRICE),image:a.image||'',quantity:a.quantity||1}))];
let cart=getCart();
function save(){
 try{
  localStorage.setItem(KEY,JSON.stringify(cart.filter(x=>x.origin!=='originals')));
  const originalsItems=getOriginals();
  const fromDisplay=cart.filter(x=>x.origin==='originals');
  const keep=fromDisplay.map(x=>({...originalsItems[Number(String(x.id).split('::')[1])]||x,quantity:x.quantity}));
  // Only save Originals when its items were edited; otherwise don't overwrite its native cart.
  if(window.__nsOriginalCartEdited){localStorage.setItem(ORIGINALS,JSON.stringify(keep));window.__nsOriginalCartEdited=false;}
 }catch{};
 drawCart();badge();
}
// Bring an existing homepage/Vault boutique cart over once, without deleting it.
function migrate(){
 const marker='ns-house-cart-migrated-boutique-v1';
 const legacyHouseItems=getHouseCart();
 if(localStorage.getItem(marker))return;
 try{
   const old=JSON.parse(localStorage.getItem(LEGACY)||'[]');
   if(Array.isArray(old))for(const p of old){
     if(!p||!p.name||!cost(p.price))continue;
     const size=String(p.size||'one size').toLowerCase(),id=norm(p.name).replace(/ /g,'-')+'-'+size.replace(/\s/g,'-');
     const qty=Math.max(1,Number(p.qty)||1);const hit=legacyHouseItems.find(x=>x.id===id);
     if(hit)continue;
     legacyHouseItems.push({id,name:String(p.name),price:money(cost(p.price)),description:'Nate Savard collection',image:p.src||'',optionLabel:size==='one size'?'Select option':'Select size',options:size==='one size'?['one size']:['xs','s','m','l','xl','xxl'],size,quantity:qty});
   }
   localStorage.setItem(KEY,JSON.stringify(legacyHouseItems));
   localStorage.setItem(marker,'yes');
 }catch{}
}
migrate();
const stylesheet=document.createElement('style');stylesheet.id='ns-sitewide-commerce-css';
stylesheet.textContent=`
 /* The old side cart is still in the DOM for legacy code, but never covers the NS-logo tab. */
 body #ns-vault-cart-open{display:none!important}
 body .nsv-overlay{display:none!important;pointer-events:none!important}
 body #ns-home-cart-corner{display:none!important}
 body.originals-page #originalsCartToggle{display:none!important}
 body.ns-unified-house-active #heroCartButton,body.ns-unified-house-active #houseCartToggle{display:none!important}
 body.ns-unified-house-active #houseCartShell{visibility:hidden!important;pointer-events:none!important}
 #ns-site-cart-top{position:fixed!important;top:13px!important;right:24px!important;bottom:auto!important;left:auto!important;z-index:18000!important;display:block!important;writing-mode:horizontal-tb!important;width:auto!important;height:auto!important;min-width:0!important;margin:0!important;padding:8px 2px!important;border:0!important;border-radius:0!important;background:transparent!important;color:rgba(246,226,190,.96)!important;font:11px/1.2 Arial,sans-serif!important;letter-spacing:.12em!important;cursor:pointer!important;backdrop-filter:none!important;text-transform:uppercase!important}
 #ns-site-cart-top:hover{color:#fff4df!important;background:transparent!important}
 #ns-site-commerce-mask{position:fixed;inset:0;z-index:19000;background:rgba(0,0,0,.73);backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:12px;box-sizing:border-box;color:#ece9e1;font-family:Arial,sans-serif}
 #ns-site-commerce-mask.open{display:flex}
 #ns-site-commerce-mask *{box-sizing:border-box}
 #ns-site-commerce-mask button{cursor:pointer;font-family:inherit}
 #ns-site-commerce-mask .nsc-sheet{position:relative;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(310px,.9fr);width:min(1160px,96vw);max-height:94dvh;overflow:auto;border:1px solid rgba(220,188,139,.23);background:#080807;box-shadow:0 24px 80px #000}
 #ns-site-commerce-mask .nsc-photo{display:grid;place-items:center;min-height:65vh;padding:30px;background:radial-gradient(ellipse,rgba(70,57,44,.27),transparent 67%),#050505;overflow:hidden}
 #ns-site-commerce-mask .nsc-photo img{width:100%;height:auto;max-height:74vh;object-fit:contain;cursor:zoom-in}
 #ns-site-commerce-mask.zoomed .nsc-photo img{max-height:none;width:auto;max-width:none;transform:scale(1.5);cursor:zoom-out}
 #ns-site-commerce-mask .nsc-detail{padding:58px clamp(24px,4vw,55px) 38px;overflow:auto}
 #ns-site-commerce-mask .nsc-eyebrow{font:10px/1.6 Arial,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#b69b75}
 #ns-site-commerce-mask h2{font:400 clamp(28px,3vw,48px)/1.12 Georgia,serif;letter-spacing:.015em;color:#f4e9d6;margin:19px 0}
 #ns-site-commerce-mask .nsc-price{font-size:20px;color:#e2c7a4;margin:14px 0}
 #ns-site-commerce-mask .nsc-description{font-size:13px;line-height:1.8;color:#a9a5a0}
 #ns-site-commerce-mask .nsc-options{display:flex;flex-wrap:wrap;gap:8px;margin:20px 0}
 #ns-site-commerce-mask .nsc-options button,#ns-site-commerce-mask .nsc-actions button,#ns-site-commerce-mask .nsc-qty button,#ns-site-commerce-mask .nsc-arrows button{border:1px solid #71685a;background:transparent;color:#e8e2d5;padding:11px 14px;font-size:11px;letter-spacing:.07em}
 #ns-site-commerce-mask .nsc-options button.selected,#ns-site-commerce-mask .nsc-actions button.primary{color:#18130d;background:#e8d8bb;border-color:#e8d8bb}
 #ns-site-commerce-mask .nsc-qty{display:flex;align-items:center;gap:18px;margin:15px 0 24px}
 #ns-site-commerce-mask .nsc-actions{display:flex;flex-wrap:wrap;gap:10px}
 #ns-site-commerce-mask .nsc-actions button{min-height:44px}
 #ns-site-commerce-mask .nsc-close{position:absolute;top:12px;right:15px;border:0;background:#111b;color:#eee;font-size:28px;z-index:3}
 #ns-site-commerce-mask .nsc-arrows{position:absolute;left:22px;bottom:20px;display:flex;gap:9px;z-index:2}
 #ns-site-commerce-mask .nsc-micro{font:10px/1.7 Arial,sans-serif;letter-spacing:.06em;color:#9a938a;margin-top:17px}
 #ns-site-cart-mask{position:fixed;inset:0;z-index:19000;display:none;background:rgba(0,0,0,.6);color:#e9e4da;font-family:Arial,sans-serif}
 #ns-site-cart-mask.open{display:block}
 #ns-site-cart-mask .nsc-backdrop{position:absolute;inset:0}
 #ns-site-cart-mask .nsc-drawer{position:absolute;right:0;top:0;bottom:0;overflow:auto;width:min(455px,94vw);background:linear-gradient(180deg,rgba(10,6,4,.96),rgba(0,0,0,.98));border-left:1px solid rgba(221,176,109,.14);box-shadow:-20px 0 50px rgba(0,0,0,.42);padding:22px 20px 30px}
 #ns-site-cart-mask header{display:flex;justify-content:space-between;align-items:start;border-bottom:1px solid #5e5248;padding-bottom:23px;margin-bottom:20px}
 #ns-site-cart-mask h2{font:400 17px/1.5 "Courier New",monospace;letter-spacing:.26em;text-transform:uppercase;margin:10px 0;color:#f6e8d0}
 #ns-site-cart-mask .nsc-label{font-size:10px;letter-spacing:.21em;color:#ad9677}
 #ns-site-cart-mask button{background:transparent;color:#e9e4da;border:1px solid #675b4e;padding:7px 10px;cursor:pointer}
 #ns-site-cart-mask .nsc-cart-close{border:none;font-size:26px}
 #ns-site-cart-mask .nsc-item{display:grid;grid-template-columns:88px minmax(0,1fr);gap:16px;padding:14px 0;border-bottom:1px solid #413931}
 #ns-site-cart-mask .nsc-item img{width:86px;height:102px;object-fit:contain}
 #ns-site-cart-mask .nsc-item-name{font:12px/1.6 "Courier New",monospace;letter-spacing:.12em;text-transform:uppercase}
 #ns-site-cart-mask .nsc-item-meta{font-size:11px;color:#bea88b;margin:8px 0}
 #ns-site-cart-mask .nsc-item-actions{display:flex;gap:8px;flex-wrap:wrap}
 #ns-site-cart-mask .nsc-total{display:flex;justify-content:space-between;padding:20px 0;font-size:14px;border-bottom:1px solid #52453b}
 #ns-site-cart-mask .nsc-form{display:grid;gap:12px;margin-top:20px}
 #ns-site-cart-mask label{display:grid;gap:6px;font-size:10px;color:#c9b392;letter-spacing:.11em;text-transform:uppercase}
 #ns-site-cart-mask input,#ns-site-cart-mask textarea{width:100%;border:1px solid #5e5347;background:#080808;padding:12px;color:#fff;font:13px Arial,sans-serif}
 #ns-site-cart-mask .nsc-submit{background:#dfcdb2;color:#18130b;border-color:#dfcdb2;padding:13px}
 #ns-site-cart-mask .nsc-empty{font-size:13px;color:#c4b9a9;margin:36px 0}
 @media(max-width:720px){#ns-site-cart-top{right:12px!important;top:10px!important}#ns-site-commerce-mask .nsc-sheet{grid-template-columns:1fr;max-height:94dvh}#ns-site-commerce-mask .nsc-photo{min-height:250px;padding:15px}#ns-site-commerce-mask .nsc-photo img{max-height:37vh}#ns-site-commerce-mask .nsc-detail{padding:30px 22px}#ns-site-commerce-mask .nsc-arrows{position:static;display:flex;padding:0 18px 16px}}
`;
document.head.append(stylesheet);
const el=(name,cls)=>{const n=document.createElement(name);if(cls)n.className=cls;return n};
const cartButton=el('button');cartButton.id='ns-site-cart-top';cartButton.type='button';cartButton.setAttribute('aria-label','Open your shopping cart');document.body.append(cartButton);
let current=null,chosen='m',qty=1,products=[],viewer=null,cartModal=null,imgs=new Map(),names=new Map(),metadataLoaded=false;
function badge(){cart=getCart();cartButton.textContent='cart ('+cart.reduce((t,x)=>t+(Number(x.quantity)||0),0)+')'}
function writeImage(s){try{return new URL(s,location.href).href}catch{return s}}
function createViewer(){
 viewer=el('div');viewer.id='ns-site-commerce-mask';viewer.setAttribute('role','dialog');viewer.setAttribute('aria-modal','true');viewer.setAttribute('aria-label','Product details');
 viewer.innerHTML=`<div class="nsc-sheet"><button class="nsc-close" type="button" aria-label="Close product">×</button><div class="nsc-photo"><img alt="Product image" title="Click to enlarge"></div><div class="nsc-detail"><div class="nsc-eyebrow">envynomadix / product sheet</div><h2></h2><div class="nsc-price"></div><p class="nsc-description"></p><div class="nsc-eyebrow">SELECT OPTION</div><div class="nsc-options"></div><div class="nsc-qty"><button type="button" data-qty="-1">−</button><strong>1</strong><button type="button" data-qty="1">+</button></div><div class="nsc-actions"><button class="primary nsc-add" type="button">ADD TO CART</button><button class="nsc-view-cart" type="button">VIEW CART</button></div><p class="nsc-micro">Availability and shipping confirmed before payment. No payment is collected here.</p></div><div class="nsc-arrows"><button data-direction="-1" type="button">← PREVIOUS</button><button data-direction="1" type="button">NEXT →</button></div></div>`;
 document.body.append(viewer);
 viewer.querySelector('.nsc-close').onclick=closeViewer;
 viewer.addEventListener('click',e=>{if(e.target===viewer)closeViewer()});
 viewer.querySelector('.nsc-photo img').onclick=()=>viewer.classList.toggle('zoomed');
 viewer.querySelectorAll('[data-qty]').forEach(b=>b.onclick=()=>{qty=Math.max(1,Math.min(99,qty+Number(b.dataset.qty)));viewer.querySelector('.nsc-qty strong').textContent=qty});
 viewer.querySelector('.nsc-view-cart').onclick=()=>{closeViewer();openCart()};
 viewer.querySelector('.nsc-add').onclick=add;
 viewer.querySelectorAll('[data-direction]').forEach(b=>b.onclick=()=>{
  const i=products.findIndex(x=>x.name===current?.name);
  if(!products.length)return;
  openViewer(products[(i+Number(b.dataset.direction)+products.length)%products.length]);
 });
}
function createCart(){
 cartModal=el('div');cartModal.id='ns-site-cart-mask';cartModal.setAttribute('role','dialog');cartModal.setAttribute('aria-modal','true');cartModal.setAttribute('aria-label','Your cart');
 cartModal.innerHTML=`<div class="nsc-backdrop"></div><div class="nsc-drawer"><header><div><div class="nsc-label">NATE SAVARD / WORLDWIDE</div><h2>YOUR CART</h2></div><button type="button" class="nsc-cart-close" aria-label="Close cart">×</button></header><div class="nsc-items"></div><div class="nsc-total"><span>SUBTOTAL USD</span><strong></strong></div><p style="font-size:11px;color:#b9ad9e;line-height:1.6">Order request only. Shipping, availability and final price are confirmed by email.</p><form class="nsc-form"><label>Your name<input name="name" required autocomplete="name"></label><label>Email<input name="email" type="email" required autocomplete="email"></label><label>Shipping country / location<input name="location" required></label><label>Notes<textarea name="notes" rows="2"></textarea></label><button class="nsc-submit" type="submit">SEND ORDER REQUEST</button></form></div>`;
 document.body.append(cartModal);
 cartModal.querySelector('.nsc-backdrop').onclick=closeCart;
 cartModal.querySelector('.nsc-cart-close').onclick=closeCart;
 cartModal.querySelector('.nsc-items').onclick=e=>{
  const button=e.target.closest('button[data-action]');if(!button)return;
  const id=button.dataset.id,action=button.dataset.action;
  if(String(id).startsWith('originals::'))window.__nsOriginalCartEdited=true;
  if(action==='preview'){
    const item=cart.find(x=>x.id===id);if(item){closeCart();if(viewer)openViewer({...item,options:item.options||['one size'],price:item.price,image:item.image,description:item.description});else if(item.origin==='originals')document.getElementById('originalsCartToggle')?.click();}return;
  }
  cart=cart.reduce((out,item)=>{if(item.id!==id){out.push(item);return out}
   if(action==='remove')return out;
   item.quantity=Math.max(0,(Number(item.quantity)||1)+(action==='increase'?1:-1));if(item.quantity)out.push(item);return out;
  },[]);save();
 };
 cartModal.querySelector('form').onsubmit=e=>{
  e.preventDefault();cart=getCart();if(!cart.length)return;
  const data=new FormData(e.currentTarget);
  const lines=['NATE SAVARD — ORDER REQUEST','','Name: '+data.get('name'),'Email: '+data.get('email'),'Location: '+data.get('location'),'','Items:',...cart.map(x=>x.name+' | '+x.size+' | Qty '+x.quantity+' | '+x.price),'','Subtotal USD: '+money(cart.reduce((t,x)=>t+cost(x.price)*(Number(x.quantity)||1),0)),'Shipping/taxes not included. No payment collected.','', 'Notes: '+(data.get('notes')||'')];
  location.href='mailto:natesavard@outlook.com?subject='+encodeURIComponent('Nate Savard order request')+'&body='+encodeURIComponent(lines.join('\n'));
 };
}
function drawCart(){if(!cartModal)return;cart=getCart();
 const items=cartModal.querySelector('.nsc-items');items.replaceChildren();
 for(const it of cart){const div=el('div','nsc-item');div.innerHTML=`<img src="${esc(it.image)}" alt=""><div><div class="nsc-item-name">${esc(it.name)}</div><div class="nsc-item-meta">${esc(it.optionLabel||'Select size')}: ${esc(it.size)} / QTY ${Number(it.quantity)||1} / ${esc(it.price)}</div><div class="nsc-item-actions"><button data-action="preview" data-id="${esc(it.id)}">VIEW</button><button data-action="decrease" data-id="${esc(it.id)}">−</button><button data-action="increase" data-id="${esc(it.id)}">+</button><button data-action="remove" data-id="${esc(it.id)}">REMOVE</button></div></div>`;items.append(div)}
 if(!cart.length){const d=el('p','nsc-empty');d.textContent='Your cart is empty.';items.append(d)}
 cartModal.querySelector('.nsc-total strong').textContent=money(cart.reduce((t,x)=>t+cost(x.price)*(Number(x.quantity)||1),0));
 cartModal.querySelector('.nsc-submit').disabled=!cart.length;
}
function openCart(){closeViewer();drawCart();cartModal.classList.add('open');cartModal.setAttribute('aria-hidden','false');}
function closeCart(){cartModal.classList.remove('open');cartModal.setAttribute('aria-hidden','true')}
function closeViewer(){if(viewer)viewer.classList.remove('open')}
function readCard(card){
 const name=card.dataset.houseProduct||card.dataset.name||card.querySelector('.nsd-name,.ns-name,.card__name,.product-name,h2,h3')?.textContent?.trim()||'Nate Savard collectible';
 const src=card.dataset.houseImage||card.querySelector('img')?.getAttribute('src')||'';
 const localPrice=card.dataset.housePrice||card.dataset.price||null;
 const description=card.dataset.houseDescription||card.querySelector('.nsd-description,.card__type,.ns-label')?.textContent?.trim()||'Nate Savard / collector edition';
 const published=new Map([['nls star ’85 f/s',225],['lost dimensions: insomnia 2026',225],['envy crystal v-neck',275],['chrome star distressed tee',285],['envy legacy tee',245],['fuck up tee',295],['venus flytrap / i',295],['distressed streetwear',285],['red logo tee',195],['muscle tee',245],['speedway jersey',395],['star ashtray',185],['venus flytrap / ii',295],['fw25 technical',325],['alien graphic',275]]);
 let o={name,image:writeImage(src),price:localPrice||money(published.get(norm(name))||DEFAULT_PRICE),description,optionLabel:'Select size',options:['xs','s','m','l','xl']};
 const match=names.get(norm(name))||imgs.get(imageKey(src));
 if(match)o={...o,...match,name:match.name||name,image:match.image||o.image};
 if(!/\d/.test(String(o.price||'')))o.price=money(published.get(norm(o.name))||DEFAULT_PRICE);
 return o;
}
function allCards(){return [...document.querySelectorAll('#ns-home-collection .ns-product,#archiveGrid .card,.nsd-card,#ns-home-collection .ns-hat-card')].filter(x=>!x.closest('#ns-site-commerce-mask,#ns-site-cart-mask'))}
function optionList(p){let options=p.options&&p.options.length?p.options:['one size'];return options.map(x=>String(x).toLowerCase())}
function openViewer(p){current=p;qty=1;chosen=optionList(p)[0];
 viewer.querySelector('h2').textContent=p.name;
 viewer.querySelector('.nsc-price').textContent=money(cost(p.price))+' USD';
 viewer.querySelector('.nsc-description').textContent=p.description||'Nate Savard / collector edition';
 viewer.querySelector('.nsc-photo img').src=p.image||'';
 viewer.querySelector('.nsc-photo img').alt=p.name;
 viewer.querySelector('.nsc-qty strong').textContent='1';
 const opts=viewer.querySelector('.nsc-options');opts.replaceChildren();
 for(const option of optionList(p)){const b=el('button');b.type='button';b.textContent=option.toUpperCase();b.className=option===chosen?'selected':'';b.onclick=()=>{chosen=option;opts.querySelectorAll('button').forEach(x=>x.classList.toggle('selected',x===b))};opts.append(b)}
 const addBtn=viewer.querySelector('.nsc-add');addBtn.textContent='ADD TO CART';
 viewer.classList.add('open');viewer.setAttribute('aria-hidden','false');
}
function add(){if(!current)return;
 cart=getHouseCart();const id=norm(current.name).replace(/ /g,'-')+'-'+chosen.replace(/\s/g,'-');
 const existing=cart.find(x=>x.id===id||(x.name===current.name&&x.size===chosen));
 if(existing)existing.quantity=(Number(existing.quantity)||0)+qty;
 else cart.push({id,name:current.name,price:money(cost(current.price)),description:current.description||'',image:current.image||'',optionLabel:current.optionLabel||'Select size',options:optionList(current),size:chosen,quantity:qty});
 save();closeViewer();openCart();
}
async function loadMetadata(){if(metadataLoaded)return;metadataLoaded=true;
 for(const url of ['/envynomadixrebirth.html','/envynomadix.html']){
  try{const res=await fetch(url);if(!res.ok)continue;const html=await res.text();const doc=new DOMParser().parseFromString(html,'text/html');
   for(const node of doc.querySelectorAll('[data-house-product]')){
    const name=node.getAttribute('data-house-product');if(!name)continue;
    const src=node.getAttribute('data-house-image')||node.querySelector('img')?.getAttribute('src')||'';
    const opts=(node.getAttribute('data-house-options')||'').split(',').map(x=>x.trim().toLowerCase()).filter(Boolean);
    const p={name,image:writeImage(src),price:node.getAttribute('data-house-price'),description:node.getAttribute('data-house-description')||'',optionLabel:node.getAttribute('data-house-option-label')||'Select size',options:opts.length?opts:['xs','s','m','l','xl']};
    if(!names.has(norm(name)))names.set(norm(name),p);
    if(src&&!imgs.has(imageKey(src)))imgs.set(imageKey(src),p);
   }
  }catch{}
 }
}
function makeClickable(){
  allCards().forEach(card=>{
   if(card.tagName!=='A' && !card.hasAttribute('tabindex'))card.tabIndex=0;
   if(card.tagName!=='A')card.setAttribute('role','button');
   card.setAttribute('aria-label','View '+(card.dataset.name||card.querySelector('.nsd-name,.card__name,.ns-name')?.textContent?.trim()||'product'));
  });
 }
function init(){
 if(nativeHouse())document.body.classList.add('ns-unified-house-active');
 if(!nativeHouse())createViewer();createCart();badge();cartButton.onclick=openCart;
 products=allCards().map(readCard);
 const watchNativeCart=(selector,closeSelector)=>{
   const native=document.querySelector(selector);if(!native)return;
   new MutationObserver(()=>{
     if(!native.classList.contains('is-open'))return;
     const close=document.querySelector(closeSelector);
     if(close)close.click();else native.classList.remove('is-open');
     openCart();
   }).observe(native,{attributes:true,attributeFilter:['class']});
 };
 if(nativeHouse())watchNativeCart('#houseCartShell','#houseCartClose');
 if(originals)watchNativeCart('#originalsCartShell','#originalsCartClose');
 makeClickable();
 new MutationObserver(()=>makeClickable()).observe(document.body,{childList:true,subtree:true});
 document.addEventListener('click',e=>{
  const target=e.target.closest('#ns-vault-cart-open,#ns-home-cart-corner,#ns-site-cart-top');
  if(target&&target.id!=='ns-site-cart-top'){e.preventDefault();e.stopImmediatePropagation();openCart();return}
  if(nativeHouse())return;
  const card=e.target.closest('#ns-home-collection .ns-product,#archiveGrid .card,.nsd-card,#ns-home-collection .ns-hat-card');
  if(!card||e.target.closest('#ns-site-commerce-mask,#ns-site-cart-mask'))return;
  // Preserve explicit external navigation and contact links not belonging to the product card.
  const anchor=e.target.closest('a');if(anchor&&!anchor.closest('.nsd-card,.ns-hat-card,#archiveGrid .card,.ns-product'))return;
  e.preventDefault();e.stopImmediatePropagation();
  products=allCards().map(readCard);openViewer(readCard(card));
 },true);
 document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeViewer();closeCart()}
  if((e.key==='Enter'||e.key===' ')&&e.target.matches('#ns-home-collection .ns-product,#archiveGrid .card,.nsd-card,#ns-home-collection .ns-hat-card')){e.preventDefault();e.stopImmediatePropagation();products=allCards().map(readCard);openViewer(readCard(e.target))}
 },true);
 window.addEventListener('storage',e=>{if(e.key===KEY){cart=getCart();badge();drawCart()}});
 loadMetadata().then(()=>{products=allCards().map(readCard)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();


/* HOMEPAGE BANNER — restore clean edge-to-edge coverage without overzoom cropping.
   Preserve the original image URLs, the Insomnia video, and slide buttons. */
(()=>{
 const p=location.pathname.toLowerCase();if(p!=='/'&&p!=='/index.html')return;
 const st=document.createElement('style');st.id='ns-home-banner-no-excess-zoom';
 st.textContent=`
 .hero .scene{background-size:cover!important;background-repeat:no-repeat!important;inset:0!important}
 .hero .scene--insomnia{inset:0!important;animation:none!important;transform:scale(1)!important;background-position:61% 48%!important}
 .hero .scene.is-active{opacity:1!important}
 .hero .scene--forever{background-position:56% 46%!important}
 .hero .scene--tour{background-position:56% 47%!important}
 .hero .scene--speedway{background-position:58% 43%!important}
 .hero .scene--ghost{background-position:center!important}
 `;
 document.head.append(st);
})();
