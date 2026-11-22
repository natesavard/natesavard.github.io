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
/* NATE SAVARD / shared shop bridge v1
 * The Rebirth / Envynomadix house cart is the canonical cart.
 * Non-house pages get the same product-sheet pattern and a compatible cart.
 * Does not change existing page artwork, gallery images, or Rebirth video.
 */
(()=>{
  'use strict';
  if(window.__nsSharedHouseShop) return;
  window.__nsSharedHouseShop=true;
  const path=location.pathname.toLowerCase();
  if(/^\/original(?:\/|$)/.test(path)||path.endsWith('/original.html'))return;
  const publishedPrices=new Map([
    ['nls star ’85 f/s',225],['lost dimensions: insomnia 2026',225],['envy crystal v-neck',275],
    ['chrome star distressed tee',285],['envy legacy tee',245],['fuck up tee',295],
    ['venus flytrap / i',295],['distressed streetwear',285],['red logo tee',195],
    ['muscle tee',245],['speedway jersey',395],['star ashtray',185],
    ['venus flytrap / ii',295],['fw25 technical',325],['alien graphic',275]
  ]);
  const HOUSE_KEY='envy-house-cart';
  const LEGACY_KEY='ns-vault-boutique-cart-v1';
  const DEFAULT_PRICE=129;
  const isHouse=path.includes('envynomadixrebirth.html')||path.endsWith('/envynomadix.html')||path.endsWith('/envynomadix-signature-collection.html');
  const isJewelry=path.endsWith('/originals.html');
  const money=n=>'$'+Number(n).toFixed(2);
  const numPrice=v=>{let n=Number(String(v??'').replace(/[^\d.]/g,''));return Number.isFinite(n)&&n>0?n:DEFAULT_PRICE;};
  const load=()=>{try{let x=JSON.parse(localStorage.getItem(HOUSE_KEY)||'[]');return Array.isArray(x)?x:[]}catch{return []}};
  const save=items=>{try{localStorage.setItem(HOUSE_KEY,JSON.stringify(items));}catch{} document.dispatchEvent(new Event('ns-house-cart-updated'));};
  const safe=(s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Rebirth and Envynomadix keep their OWN native product sheets and drawer.
  // Only replace missing / private-inquiry price attributes with the requested $129.
  function priceNative(){
    document.querySelectorAll('[data-house-product]').forEach(card=>{
      const raw=card.getAttribute('data-house-price')||'';
      if(!/\d/.test(raw)||Number(String(raw).replace(/[^\d.]/g,''))<=0)card.setAttribute('data-house-price',money(DEFAULT_PRICE));
    });
  }
  priceNative();
  if(isHouse){
    const watch=new MutationObserver(priceNative);
    watch.observe(document.documentElement,{childList:true,subtree:true});
    document.addEventListener('DOMContentLoaded',priceNative,{once:true});
    return;
  }
  // Collector Jewelry uses its own item-customization cart; leave it alone rather
  // than accidentally stripping out engraving / collector-specific fields.
  if(isJewelry)return;

  // Bring any historical homepage/Vault selections into the house cart ONCE.
  // Preserve IDs and quantities, avoid double-counting across reloads.
  try{
    const flag='ns-house-cart-import-v1';
    if(!localStorage.getItem(flag)){
      const old=JSON.parse(localStorage.getItem(LEGACY_KEY)||'[]');
      if(Array.isArray(old)&&old.length){
        const items=load();
        for(const x of old){
          const name=String(x.name||'').trim();if(!name)continue;
          const size=String(x.size||'ONE SIZE').toLowerCase();
          const id=name.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'-'+size;
          if(items.some(i=>i.id===id))continue;
          items.push({id,name,size,price:money(numPrice(x.price)),description:'Nate Savard / collector edition',image:x.src||'',optionLabel:size==='one size'?'Finish':'Select size',options:[size],quantity:Math.max(1,Number(x.qty)||1)});
        }
        save(items);
      }
      localStorage.setItem(flag,'1');
    }
  }catch{}

  const css=document.createElement('style');css.id='ns-unified-house-shop-style';
  css.textContent=`
    /* Retire only the old duplicate CART button, never the product section. */
    body.ns-cart-top-right #ns-vault-cart-open,body #ns-vault-cart-open,body #ns-home-cart-corner{display:none!important}
    #ns-house-cart-corner{position:fixed!important;top:13px!important;right:18px!important;left:auto!important;bottom:auto!important;z-index:17020!important;border:1px solid #d6b16e55!important;border-radius:2px!important;padding:10px 14px!important;background:#070706e8!important;color:#f4e5d1!important;cursor:pointer!important;font:11px/1.2 'Courier New',monospace!important;letter-spacing:.13em!important;text-transform:uppercase!important;writing-mode:horizontal-tb!important;box-shadow:0 5px 20px #0006!important;min-width:80px!important;width:auto!important;height:auto!important}
    #ns-house-cart-corner:hover{border-color:#d6b16e!important}
    #ns-house-shop-backdrop{position:fixed;inset:0;z-index:18000;background:#000b;backdrop-filter:blur(5px);display:none;align-items:stretch;justify-content:flex-end}
    #ns-house-shop-backdrop.is-open{display:flex}
    #ns-house-shop-backdrop *{box-sizing:border-box}
    #ns-house-shop-backdrop button{cursor:pointer}
    #ns-house-shop-backdrop .nsh-drawer{position:relative;width:min(480px,95vw);height:100dvh;overflow-y:auto;padding:27px 25px 35px;background:linear-gradient(180deg,#0d0908f7,#030303);border-left:1px solid #d6b16e44;color:#ede1d0;box-shadow:-18px 0 55px #0008;font-family:Arial,sans-serif}
    #ns-house-shop-backdrop .nsh-top{display:flex;gap:20px;justify-content:space-between;align-items:center;border-bottom:1px solid #d6b16e44;padding-bottom:18px;margin-bottom:21px}
    #ns-house-shop-backdrop .nsh-eyebrow{font:10px/1.7 'Courier New',monospace;letter-spacing:.2em;color:#bb9969;text-transform:uppercase}
    #ns-house-shop-backdrop h2{margin:3px 0 0;font:400 clamp(22px,3vw,34px)/1.2 Georgia,serif;letter-spacing:.07em;color:#f2e5d5}
    #ns-house-shop-backdrop .nsh-close{padding:6px 12px;font-size:25px;color:#fff;background:none;border:1px solid #d6b16e55}
    #ns-house-shop-backdrop .nsh-item{display:grid;grid-template-columns:78px 1fr;gap:14px;border-bottom:1px solid #d6b16e33;padding:15px 0}
    #ns-house-shop-backdrop .nsh-item img{width:78px;height:96px;object-fit:contain;background:#171311}
    #ns-house-shop-backdrop .nsh-item h3{font:13px/1.4 Georgia,serif;margin:0 0 5px;color:#fff}
    #ns-house-shop-backdrop .nsh-meta{font:10px/1.65 'Courier New',monospace;color:#c9ac84}
    #ns-house-shop-backdrop .nsh-actions{display:flex;gap:10px;margin-top:8px}
    #ns-house-shop-backdrop .nsh-actions button{border:1px solid #d6b16e44;background:transparent;color:#eee;padding:5px 8px}
    #ns-house-shop-backdrop .nsh-total{display:flex;justify-content:space-between;border-top:1px solid #d6b16e66;margin:18px 0;padding-top:14px;font:12px 'Courier New',monospace}
    #ns-house-shop-backdrop .nsh-form{display:grid;gap:10px;margin-top:20px}
    #ns-house-shop-backdrop .nsh-form label{font:10px 'Courier New',monospace;color:#c9ac84;text-transform:uppercase;letter-spacing:.1em}
    #ns-house-shop-backdrop .nsh-form input,#ns-house-shop-backdrop .nsh-form textarea{display:block;width:100%;margin-top:5px;padding:12px;border:1px solid #d6b16e44;background:#100d0d;color:#fff;font:13px Arial,sans-serif}
    #ns-house-shop-backdrop .nsh-primary{padding:13px 16px;background:#e6d1ae;color:#19120d;border:0;font:11px 'Courier New',monospace;letter-spacing:.14em;text-transform:uppercase}
    #ns-house-shop-backdrop .nsh-primary:disabled{opacity:.45;cursor:default}
    #ns-house-shop-backdrop .nsh-product-photo{width:100%;height:min(42vh,420px);object-fit:contain;background:#141010;margin-bottom:18px}
    #ns-house-shop-backdrop .nsh-choice{display:flex;flex-wrap:wrap;gap:7px;padding:13px 0}
    #ns-house-shop-backdrop .nsh-choice button{padding:9px 12px;border:1px solid #d6b16e55;color:#ddd;background:transparent;text-transform:uppercase}
    #ns-house-shop-backdrop .nsh-choice button[aria-pressed=true]{background:#d6b16e;color:#16100a}
    #ns-house-shop-backdrop .nsh-note{font:11px/1.7 'Courier New',monospace;color:#bda98c}
    #ns-unified-drop .nsd-card,#archiveGrid .card__image-wrap,#ns-home-collection .ns-product{cursor:pointer}
    @media(max-width:650px){#ns-house-cart-corner{right:9px!important;top:11px!important;padding:9px 10px!important}#ns-house-shop-backdrop .nsh-drawer{padding:18px 17px 30px}}
  `;document.head.append(css);

  const button=document.createElement('button');button.type='button';button.id='ns-house-cart-corner';button.textContent='CART / 0';button.setAttribute('aria-label','Open shared shopping cart');document.body.append(button);
  const backdrop=document.createElement('div');backdrop.id='ns-house-shop-backdrop';backdrop.setAttribute('aria-hidden','true');
  const drawer=document.createElement('section');drawer.className='nsh-drawer';drawer.setAttribute('role','dialog');drawer.setAttribute('aria-modal','true');drawer.setAttribute('aria-label','Nate Savard shopping');backdrop.append(drawer);document.body.append(backdrop);
  let active=null,chosen='m',qty=1,mode='cart';
  function count(){let n=load().reduce((a,x)=>a+Math.max(0,Number(x.quantity)||0),0);button.textContent='CART / '+n;}
  function open(){backdrop.classList.add('is-open');backdrop.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';drawer.querySelector('.nsh-close')?.focus();}
  function close(){backdrop.classList.remove('is-open');backdrop.setAttribute('aria-hidden','true');document.body.style.overflow='';active=null;}
  function head(label){return `<div class="nsh-top"><div><div class="nsh-eyebrow">NATE SAVARD / WORLDWIDE</div><h2>${label}</h2></div><button type="button" class="nsh-close" aria-label="Close">×</button></div>`}
  function cart(){mode='cart';const items=load();const total=items.reduce((sum,x)=>sum+numPrice(x.price)*Math.max(1,Number(x.quantity)||1),0);
    drawer.innerHTML=head('YOUR CART')+(items.length?items.map((x,i)=>`<div class="nsh-item"><img src="${safe(x.image)}" alt=""><div><h3>${safe(x.name)}</h3><div class="nsh-meta">${safe(x.optionLabel||'Size')}: ${safe(x.size)} / ${money(numPrice(x.price))} / qty ${Number(x.quantity)||1}</div><div class="nsh-actions"><button data-i="${i}" data-action="minus" aria-label="Reduce quantity">−</button><button data-i="${i}" data-action="plus" aria-label="Increase quantity">+</button><button data-i="${i}" data-action="remove">REMOVE</button></div></div></div>`).join(''):'<p class="nsh-note">Your cart is empty.</p>')+`<div class="nsh-total"><span>SUBTOTAL USD</span><strong>${money(total)}</strong></div><p class="nsh-note">Order request only. No payment is collected here. Shipping and availability are confirmed by email.</p><form class="nsh-form"><label>Your name<input name="name" required autocomplete="name"></label><label>Email<input name="email" type="email" required autocomplete="email"></label><label>Shipping country / location<input name="location" required></label><label>Notes<textarea name="notes" rows="2"></textarea></label><button class="nsh-primary" type="submit" ${items.length?'':'disabled'}>SEND ORDER REQUEST</button></form>`;
    count();open();
  }
  // Match prices on existing products where available; otherwise exactly $129 USD.
  const productFrom=(card)=>{
    const name=(card.dataset.houseProduct||card.dataset.name||card.querySelector('.nsd-name,.ns-name,.card__name,.ns-product-name,h2,h3')?.textContent||'Nate Savard piece').trim();
    const image=card.dataset.houseImage||card.querySelector('img')?.getAttribute('src')||'';
    const priceText=card.dataset.housePrice||card.dataset.price||card.querySelector('[data-price],.ns-price,.card__price,.nsd-price')?.textContent||'';
    const price=/\d/.test(String(priceText)) ? numPrice(priceText) : (publishedPrices.get(name.toLowerCase())||DEFAULT_PRICE);
    const description=card.dataset.houseDescription||card.querySelector('.card__type,.nsd-sub,.ns-label')?.textContent||'Nate Savard / collector collection';
    const category=String(card.dataset.category||card.querySelector('.card__type')?.textContent||'').toLowerCase();
    const garment=!/object|artwork|experiment|symbol|hat|cap|accessory|jewelry/.test(category+' '+name.toLowerCase());
    return {name,image,price,description,garment,options:garment?['xs','s','m','l','xl','xxl']:['one size']};
  };
  function product(card){active=productFrom(card);mode='product';chosen=active.options.includes('m')?'m':active.options[0];qty=1;
    drawer.innerHTML=head('PRODUCT SHEET')+`<img class="nsh-product-photo" src="${safe(active.image)}" alt="${safe(active.name)}"><div class="nsh-eyebrow">ENVYNOMADIX / PRODUCT SHEET</div><h2>${safe(active.name)}</h2><p class="nsh-note">${safe(active.description)}</p><h2>${money(active.price)} USD</h2><div class="nsh-eyebrow">${active.garment?'Select size':'Option'}</div><div class="nsh-choice">${active.options.map(o=>`<button type="button" data-size="${safe(o)}" aria-pressed="${o===chosen}">${safe(o)}</button>`).join('')}</div><div class="nsh-eyebrow">Quantity: <span class="nsh-qty">1</span></div><div class="nsh-choice"><button data-qty="-1" type="button">−</button><button data-qty="1" type="button">+</button></div><button type="button" class="nsh-primary" data-add>Add to cart</button><p><button type="button" class="nsh-primary" data-view>View cart</button></p>`;
    open();
  }
  function add(){if(!active)return;const items=load(),id=active.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'-'+chosen;let same=items.find(x=>x.id===id);
    if(same)same.quantity+=qty;else items.push({id,name:active.name,price:money(active.price),description:active.description,image:active.image,optionLabel:active.garment?'Select size':'Option',options:active.options,size:chosen,quantity:qty});
    save(items);cart();
  }
  button.addEventListener('click',cart);
  backdrop.addEventListener('click',e=>{if(e.target===backdrop||e.target.closest('.nsh-close')){close();return;}
    const size=e.target.closest('[data-size]');if(size){chosen=size.dataset.size;drawer.querySelectorAll('[data-size]').forEach(b=>b.setAttribute('aria-pressed',String(b===size)));return;}
    const adjust=e.target.closest('[data-qty]');if(adjust){qty=Math.min(99,Math.max(1,qty+Number(adjust.dataset.qty)));drawer.querySelector('.nsh-qty').textContent=qty;return;}
    if(e.target.closest('[data-add]')){add();return;}
    if(e.target.closest('[data-view]')){cart();return;}
    const action=e.target.closest('[data-action]');if(action){const list=load(),i=Number(action.dataset.i),item=list[i];if(!item)return;
      if(action.dataset.action==='remove')list.splice(i,1);
      else item.quantity=Math.max(0,(Number(item.quantity)||1)+(action.dataset.action==='plus'?1:-1));
      if(item.quantity===0)list.splice(i,1);save(list);cart();
    }
  });
  backdrop.addEventListener('submit',e=>{if(!e.target.matches('.nsh-form'))return;e.preventDefault();const items=load();if(!items.length)return;const d=new FormData(e.target);const total=items.reduce((n,x)=>n+numPrice(x.price)*(Number(x.quantity)||1),0);const lines=['NATE SAVARD / ORDER REQUEST','',`Name: ${d.get('name')}`,`Email: ${d.get('email')}`,`Location: ${d.get('location')}`,'','Items:',...items.map(x=>`${x.name} | ${x.size} | Qty ${x.quantity} | ${money(numPrice(x.price)*(Number(x.quantity)||1))}`),'',`Subtotal USD: ${money(total)}`,'Shipping/taxes not included. No payment collected.','',`Notes: ${d.get('notes')||''}`];location.href='mailto:natesavard@outlook.com?subject='+encodeURIComponent('Nate Savard order request')+'&body='+encodeURIComponent(lines.join('\n'));});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&backdrop.classList.contains('is-open'))close();});
  document.addEventListener('ns-house-cart-updated',count);
  window.addEventListener('storage',e=>{if(e.key===HOUSE_KEY)count();});
  // Capture clicks BEFORE the older Vault/homepage handlers so only one viewer opens.
  document.addEventListener('click',e=>{
    const card=e.target.closest('#ns-unified-drop .nsd-card, #archiveGrid .card, #ns-home-collection .ns-product');
    if(!card||e.target.closest('#ns-house-shop-backdrop'))return;
    if(e.target.closest('.nsd-inquiry,.card__buy,a[href^="mailto:"]'))return;
    e.preventDefault();e.stopImmediatePropagation();product(card);
  },true);
  document.addEventListener('keydown',e=>{
    if(e.key!=='Enter'&&e.key!==' ')return;
    const card=e.target.closest('#ns-unified-drop .nsd-card, #archiveGrid .card, #ns-home-collection .ns-product');
    if(!card||e.target.matches('a,button,input'))return;
    e.preventDefault();e.stopImmediatePropagation();product(card);
  },true);
  count();
})();
