/* NATE SAVARD — shared right-side NS AUDIO / X Y Z navigation.
   Matches the existing originals.html siteflow panel; no extra left MENU.
   Only mounts the panel on pages that do not already have it.
*/
(()=>{
  'use strict';
  if(window.__nsUnifiedRightNavigation) return;
  window.__nsUnifiedRightNavigation=true;
  const path=location.pathname.toLowerCase();
  if(path==='/original.html'||path==='/original/'||path==='/original/index.html') return;
  const links=[
    ['Home','/'],
    ['Rebirth','/envynomadixrebirth.html'],
    ['Jewelry','/originals.html'],
    ['Vault','/vault.html'],
    ['Journal','/journal.html']
  ];
  const STYLE_ID='ns-unified-right-nav-styles-v1';
  const SVG_NOT_USED='';
  const css=`
   /* Only scope custom overrides to new panel and the primary links themselves. */
   .ns-unified-primary-links{display:flex;flex-direction:column;gap:5px;
      padding:0 0 10px;margin:0 0 8px;border-bottom:1px solid rgba(255,216,107,.17)}
   .siteflow-jump .ns-unified-primary-links a{display:block;border:1px solid rgba(255,216,107,.12)!important;
      background:rgba(255,216,107,.035)!important;padding:8px 9px!important;
      font:10px/1.3 'Courier New',monospace!important;letter-spacing:.11em!important;
      border-radius:999px!important;text-decoration:none!important;text-align:center!important;
      color:#f1e7d8!important;text-transform:uppercase!important;white-space:nowrap}
   .siteflow-jump .ns-unified-primary-links a:hover,
   .siteflow-jump .ns-unified-primary-links a:focus-visible{background:rgba(255,216,107,.16)!important;color:#fff!important}
   .siteflow-jump .ns-unified-primary-links a[aria-current=page]{background:rgba(255,216,107,.17)!important;border-color:rgba(255,216,107,.38)!important}
   .ns-unified-right-panel .siteflow-bar{font-family:'Trebuchet MS','Segoe UI',sans-serif}
   .ns-unified-right-panel .siteflow-min-toggle{cursor:pointer}
   .ns-unified-right-panel .ns-right-nav-player-status{font-size:8px;opacity:.76}
   .ns-unified-right-panel .siteflow-player{display:grid;gap:7px}
   .ns-unified-right-panel.is-collapsed .siteflow-player{display:none}
   .ns-unified-right-panel .siteflow-jump{display:flex;flex-direction:column}
   .ns-unified-right-panel.is-collapsed .siteflow-jump{display:none}
   @media(max-width:620px){
     .ns-unified-right-panel.siteflow-shell,.ns-unified-right-panel.siteflow-shell.is-collapsed{
       top:50%!important;right:8px!important;bottom:auto!important;transform:translateY(-50%)!important}
     .ns-unified-right-panel .siteflow-jump .ns-unified-primary-links{display:flex;flex-direction:column}
   }
  `;
  function buildLink(label,href){
    const a=document.createElement('a');
    a.textContent=label;a.href=href;a.className='siteflow-link';
    if((path==='/'?'/':path)===href.toLowerCase())a.setAttribute('aria-current','page');
    return a;
  }
  function style(){
    if(document.getElementById(STYLE_ID))return;
    const tag=document.createElement('style');tag.id=STYLE_ID;tag.textContent=css;document.head.appendChild(tag);
  }
  function addFiveToPanel(panel){
    const jump=panel.querySelector('.siteflow-jump');
    if(!jump || jump.querySelector('.ns-unified-primary-links'))return;
    const group=document.createElement('div');group.className='ns-unified-primary-links';
    links.forEach(([label,href])=>group.appendChild(buildLink(label,href)));
    jump.prepend(group);
  }
  function addJournalTop(){
    if(path!=='/'&&path!=='/index.html')return;
    const nav=document.querySelector('.header .nav');
    if(!nav||nav.querySelector('a[href="/journal.html"]'))return;
    const a=buildLink('Journal','/journal.html');a.className='ns-top-journal-link';
    nav.appendChild(a);
  }
  function ensureSiteflowCSS(){
    if(document.querySelector('link[href*="site-flow.css"]'))return;
    const link=document.createElement('link');link.rel='stylesheet';link.href='/site-flow.css';
    link.dataset.nsRightPanelStyle='1';document.head.appendChild(link);
  }
  function createRightPanel(){
    if(document.querySelector('.siteflow-shell'))return;
    ensureSiteflowCSS();
    const shell=document.createElement('div');
    shell.className='siteflow-shell ns-unified-right-panel is-collapsed';
    shell.setAttribute('aria-label','Nate Savard NS AUDIO and navigation');
    shell.innerHTML=`
      <div class="siteflow-bar">
        <section class="siteflow-player" aria-label="NS Audio player">
          <div class="siteflow-player-head"><span class="siteflow-player-brand"><strong>NS AUDIO</strong><small>STEREO 85</small></span><span class="siteflow-player-track-number">01/01</span></div>
          <div class="siteflow-player-screen"><span class="siteflow-player-title">NATE SAVARD — CHOSEN FEW / SONG 3</span><span class="siteflow-player-meta"><span class="ns-right-nav-player-status">READY</span><time class="ns-right-nav-player-time">00:00 / --:--</time></span></div>
          <div class="siteflow-player-buttons">
            <button class="siteflow-player-button" type="button" data-ns-stop aria-label="Stop track">■</button>
            <button class="siteflow-player-button is-play" type="button" data-ns-play aria-label="Play track">▶</button>
            <button class="siteflow-player-button" type="button" data-ns-restart aria-label="Restart track">↺</button>
          </div>
          <input class="siteflow-player-range" data-ns-seek type="range" min="0" max="1000" value="0" aria-label="Track position" />
          <label class="siteflow-player-volume">VOL <input class="siteflow-player-range" data-ns-volume type="range" min="0" max="100" value="85" aria-label="Volume" /></label>
        </section>
        <div class="siteflow-transmission">NATE SAVARD / WORLD ARCHIVE</div>
        <nav class="siteflow-jump" aria-label="Main site destinations"></nav>
        <div class="siteflow-controls">
          <button class="siteflow-control" type="button" data-ns-vip>vip mode off</button>
          <button class="siteflow-control" type="button" data-ns-sound>sound on</button>
          <button class="siteflow-control siteflow-min-toggle" type="button" data-ns-collapse aria-expanded="false" aria-label="Open X Y Z" title="Open X Y Z">X Y Z</button>
        </div>
      </div>`;
    document.body.appendChild(shell);
    addFiveToPanel(shell);
    const collapse=shell.querySelector('[data-ns-collapse]');
    const changeCollapsed=(value)=>{
      shell.classList.toggle('is-collapsed',value);
      collapse.setAttribute('aria-expanded',String(!value));
      collapse.setAttribute('aria-label',value?'Open X Y Z':'Minimize X Y Z');
      collapse.title=value?'Open X Y Z':'Minimize X Y Z';
      collapse.textContent=value?'X Y Z':'min';
    };
    collapse.addEventListener('click',()=>changeCollapsed(!shell.classList.contains('is-collapsed')));
    const audio=new Audio('/Song%203%20FULLLL.mp3');audio.preload='none';audio.loop=true;audio.volume=.85;
    const play=shell.querySelector('[data-ns-play]'),status=shell.querySelector('.ns-right-nav-player-status');
    const time=shell.querySelector('.ns-right-nav-player-time');
    const seek=shell.querySelector('[data-ns-seek]');
    const format=t=>Number.isFinite(t)?`${Math.floor(t/60).toString().padStart(2,'0')}:${Math.floor(t%60).toString().padStart(2,'0')}`:'--:--';
    const sync=()=>{
      play.textContent=audio.paused?'▶':'Ⅱ';play.setAttribute('aria-label',audio.paused?'Play track':'Pause track');
      status.textContent=audio.paused?'READY':'PLAYING';
      time.textContent=`${format(audio.currentTime)} / ${format(audio.duration)}`;
      if(Number.isFinite(audio.duration)&&audio.duration>0)seek.value=Math.round(1000*audio.currentTime/audio.duration);
    };
    play.addEventListener('click',()=>{if(audio.paused)audio.play().catch(()=>{status.textContent='TAP TO PLAY';});else audio.pause();sync();});
    shell.querySelector('[data-ns-stop]').addEventListener('click',()=>{audio.pause();audio.currentTime=0;sync();});
    shell.querySelector('[data-ns-restart]').addEventListener('click',()=>{audio.currentTime=0;audio.play().catch(()=>{});sync();});
    shell.querySelector('[data-ns-volume]').addEventListener('input',e=>audio.volume=Number(e.target.value)/100);
    seek.addEventListener('input',e=>{if(Number.isFinite(audio.duration))audio.currentTime=audio.duration*Number(e.target.value)/1000;});
    audio.addEventListener('timeupdate',sync);audio.addEventListener('play',sync);audio.addEventListener('pause',sync);
    const vip=shell.querySelector('[data-ns-vip]');
    vip.addEventListener('click',()=>{const on=document.body.classList.toggle('siteflow-vip-mode');vip.textContent=on?'vip mode on':'vip mode off';});
    const sound=shell.querySelector('[data-ns-sound]');
    sound.addEventListener('click',()=>{audio.muted=!audio.muted;sound.textContent=audio.muted?'sound off':'sound on';});
    return shell;
  }
  function mount(){
    style();addJournalTop();
    const existing=document.querySelector('.siteflow-shell:not(.ns-unified-right-panel)');
    if(existing){
      const ours=document.querySelector('.ns-unified-right-panel');if(ours)ours.remove();
      addFiveToPanel(existing);return;
    }
    if(!document.querySelector('.siteflow-shell'))createRightPanel();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
  // The genuine Jewelry siteflow panel is injected dynamically; add links once it appears.
  const observe=()=>{
    let queued=false;
    const watcher=new MutationObserver(()=>{
      if(queued)return;queued=true;
      requestAnimationFrame(()=>{queued=false;
        const real=document.querySelector('.siteflow-shell:not(.ns-unified-right-panel)');
        if(real){const surrogate=document.querySelector('.ns-unified-right-panel');if(surrogate)surrogate.remove();addFiveToPanel(real);}
        addJournalTop();
      });
    });
    watcher.observe(document.body,{childList:true,subtree:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',observe,{once:true});
  else observe();
})();
