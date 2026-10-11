/* NS AUDIO 85. A visual controller for the EXISTING audio engine.
   Wire window.NS85_ADAPTER to the original player BEFORE loading this script.
   This script NEVER creates an Audio instance. */
(() => {
  'use strict';
  // Replace the old dock UI while retaining its already-running audio engine.
  const existingDock = document.getElementById('ns85-dock');
  if (existingDock) existingDock.remove();
  const api = window.NS85_ADAPTER;
  const methods = ['togglePlay', 'next', 'previous', 'seek', 'setVolume', 'getState', 'subscribe'];
  if (!api || methods.some(k => typeof api[k] !== 'function')) {
    console.error('[NS AUDIO 85] Missing adapter methods. Existing player unchanged.');
    return;
  }
  const art = {
    frame: '/nate-savard-player-console-base.png',
    tab: '/nate-savard-player-minimized-tab.png',
    mark: '/nate-savard-ns-monogram.png',
    play: '/nate-savard-player-play.png',
    pause: '/nate-savard-player-pause.png',
    next: '/nate-savard-player-next.png',
    volume: '/nate-savard-player-volume.png',
    minimize: '/nate-savard-player-minimize.png'
  };
  const artButton = (action, label, image, extra) => `<button class="ns85-art-btn ${extra || ''}" data-action="${action}" aria-label="${label}"><img src="${image}" alt=""></button>`;
  const dock = document.createElement('aside');dock.id='ns85-dock';dock.setAttribute('aria-label','NS Audio 85 player');
  dock.innerHTML = `<div class="ns85-shell"><button class="ns85-min" type="button" aria-label="Expand music player" aria-expanded="false"><img src="${art.tab}" alt=""></button><div class="ns85-expanded" hidden><img class="ns85-frame" src="${art.frame}" alt=""><div class="ns85-expanded-content"><img class="ns85-mark" src="${art.mark}" alt=""><div class="ns85-brand">NS AUDIO 85<span class="ns85-sub">ORIGINAL AUDIO CONSOLE</span></div><div class="ns85-controls">${artButton('previous', 'Previous track', art.next, 'ns85-previous')}${artButton('togglePlay', 'Play', art.play, 'ns85-toggle')}${artButton('next', 'Next track', art.next, 'ns85-next')}${artButton('minimize', 'Minimize player', art.minimize, 'ns85-minimize')}</div><div class="ns85-main"><div class="ns85-track" aria-live="polite">NATE SAVARD — AUDIO</div><div class="ns85-time">00:00 / --:--</div><input class="ns85-progress" aria-label="Seek through track" type="range" min="0" max="1000" value="0" step="1"><div class="ns85-volume"><img src="${art.volume}" alt=""><input aria-label="Volume" type="range" min="0" max="100" value="75"></div></div></div></div></div>`;
  document.body.appendChild(dock);
  const $ = s => dock.querySelector(s);
  const min=$('.ns85-min'), expanded=$('.ns85-expanded'), seek=$('.ns85-progress'), vol=$('.ns85-volume input'), toggle=$('[data-action=togglePlay]');
  function setExpanded(v){min.hidden=v;expanded.hidden=!v;min.setAttribute('aria-expanded',String(v));if(v)toggle.focus();else min.focus();}
  min.addEventListener('click',()=>setExpanded(true));
  $('[data-action=minimize]').addEventListener('click',()=>setExpanded(false));
  for(const action of ['previous','togglePlay','next']) $('[data-action='+action+']').addEventListener('click',()=>api[action]());
  seek.addEventListener('input',()=>{const s=api.getState();if(Number.isFinite(s.duration)&&s.duration>0)api.seek(s.duration*Number(seek.value)/1000)});
  vol.addEventListener('input',()=>api.setVolume(Number(vol.value)/100));
  const fmt=v=>Number.isFinite(v)&&v>=0?`${Math.floor(v/60).toString().padStart(2,'0')}:${Math.floor(v%60).toString().padStart(2,'0')}`:'--:--';
  function render(){const s=api.getState()||{};const dur=Number(s.duration), cur=Number(s.currentTime)||0;$('.ns85-track').textContent=s.title||'NATE SAVARD — AUDIO';$('.ns85-time').textContent=`${fmt(cur)} / ${fmt(dur)}`;if(document.activeElement!==seek){seek.value=Number.isFinite(dur)&&dur>0?String(Math.round(cur/dur*1000)):'0';seek.style.setProperty('--fill',(Number(seek.value)/10)+'%')}seek.disabled=!(Number.isFinite(dur)&&dur>0);if(document.activeElement!==vol&&Number.isFinite(Number(s.volume))){vol.value=String(Math.round(Number(s.volume)*100));vol.style.setProperty('--fill',vol.value+'%')}const playing=!!s.playing;const image=toggle.querySelector('img');if(image)image.src=playing?art.pause:art.play;toggle.setAttribute('aria-label',playing?'Pause':'Play')}
  const unsubscribe=api.subscribe(render);render();
  const timer=setInterval(render,500);
  window.addEventListener('pagehide',()=>{clearInterval(timer);if(typeof unsubscribe==='function')unsubscribe()},{once:true});
})();
