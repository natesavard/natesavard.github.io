/* NS AUDIO 85. A visual controller for the EXISTING audio engine.
   Wire window.NS85_ADAPTER to the original player BEFORE loading this script.
   See INTEGRATION.md. This script NEVER creates an Audio instance. */
(() => {
  'use strict';
  if (document.getElementById('ns85-dock')) return;
  const api = window.NS85_ADAPTER;
  const methods = ['togglePlay', 'next', 'previous', 'seek', 'setVolume', 'getState', 'subscribe'];
  if (!api || methods.some(k => typeof api[k] !== 'function')) {
    console.error('[NS AUDIO 85] Missing adapter methods. Read INTEGRATION.md. Existing player unchanged.');
    return;
  }
  const icon = (name) => ({prev:'<path d="M7 5v14H5V5zm12 1v12L9 12z"/>',next:'<path d="M17 5v14h2V5zM5 6v12l10-6z"/>',play:'<path d="M7 4v16l13-8z"/>',pause:'<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>',minus:'<path d="M5 11h14v2H5z"/>'}[name]);
  const svg = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${icon(name)}</svg>`;
  const dock = document.createElement('aside');dock.id='ns85-dock';dock.setAttribute('aria-label','NS Audio 85 player');
  const monogram = '/nate-savard-ns-monogram.png';
  dock.innerHTML = `<div class="ns85-shell"><button class="ns85-min" type="button" aria-label="Expand music player" aria-expanded="false"><img class="ns85-mark" src="${monogram}" alt=""><span class="ns85-min-label">NS AUDIO 85</span><span class="ns85-mini-indicator">♫</span></button><div class="ns85-expanded" hidden><div class="ns85-top"><img class="ns85-mark" src="${monogram}" alt=""><div class="ns85-brand">NS AUDIO 85<span class="ns85-sub">ORIGINAL AUDIO CONSOLE</span></div><div class="ns85-controls"><button class="ns85-btn" data-action="previous" aria-label="Previous track">${svg('prev')}</button><button class="ns85-btn" data-action="togglePlay" aria-label="Play">${svg('play')}</button><button class="ns85-btn" data-action="next" aria-label="Next track">${svg('next')}</button><button class="ns85-btn" data-action="minimize" aria-label="Minimize player">${svg('minus')}</button></div></div><div class="ns85-main"><div class="ns85-track" aria-live="polite">NATE SAVARD — AUDIO</div><div class="ns85-time">00:00 / --:--</div><input class="ns85-progress" aria-label="Seek through track" type="range" min="0" max="1000" value="0" step="1"><div class="ns85-volume"><span>VOL</span><input aria-label="Volume" type="range" min="0" max="100" value="75"></div></div></div></div>`;
  document.body.appendChild(dock);
  const $ = s => dock.querySelector(s);
  const min=$('.ns85-min'), expanded=$('.ns85-expanded'), seek=$('.ns85-progress'), vol=$('.ns85-volume input'), toggle=$('[data-action=togglePlay]');
  function setExpanded(v){dock.classList.toggle('is-expanded',v);min.hidden=v;expanded.hidden=!v;min.setAttribute('aria-expanded',String(v));if(v)toggle.focus();else min.focus();}
  min.addEventListener('click',()=>setExpanded(true));
  $('[data-action=minimize]').addEventListener('click',()=>setExpanded(false));
  for(const action of ['previous','togglePlay','next']) $('[data-action='+action+']').addEventListener('click',()=>api[action]());
  seek.addEventListener('input',()=>{const s=api.getState();if(Number.isFinite(s.duration)&&s.duration>0)api.seek(s.duration*Number(seek.value)/1000)});
  vol.addEventListener('input',()=>api.setVolume(Number(vol.value)/100));
  const fmt=v=>Number.isFinite(v)&&v>=0?`${Math.floor(v/60).toString().padStart(2,'0')}:${Math.floor(v%60).toString().padStart(2,'0')}`:'--:--';
  function render(){const s=api.getState()||{};const dur=Number(s.duration), cur=Number(s.currentTime)||0;$('.ns85-track').textContent=s.title||'NATE SAVARD — AUDIO';$('.ns85-time').textContent=`${fmt(cur)} / ${fmt(dur)}`;if(document.activeElement!==seek){seek.value=Number.isFinite(dur)&&dur>0?String(Math.round(cur/dur*1000)):'0';seek.style.setProperty('--fill',(Number(seek.value)/10)+'%')}seek.disabled=!(Number.isFinite(dur)&&dur>0);if(document.activeElement!==vol&&Number.isFinite(Number(s.volume))){vol.value=String(Math.round(Number(s.volume)*100));vol.style.setProperty('--fill',vol.value+'%')}const playing=!!s.playing;toggle.innerHTML=svg(playing?'pause':'play');toggle.setAttribute('aria-label',playing?'Pause':'Play');$('.ns85-mini-indicator').textContent=playing?'♫':'▷'}
  const unsubscribe=api.subscribe(render);render();
  document.documentElement.classList.add('ns85-ready');
  const timer=setInterval(render,500);
  window.addEventListener('pagehide',()=>{clearInterval(timer);if(typeof unsubscribe==='function')unsubscribe()},{once:true});
})();
