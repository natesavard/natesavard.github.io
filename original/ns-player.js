/* NS AUDIO 85 | Single visual skin for the site's EXISTING player.
   No new audio tag, no new playlist, no autoplay, no global adapter. */
(()=>{'use strict';
  function initialize(){
    const audio=document.getElementById('backgroundMusic');
    const native=document.querySelector('.sound-player');
    const nativePlay=document.getElementById('soundPlayerPlay');
    const nativeTitle=document.getElementById('soundPlayerTrackTitle');
    const nativeVolume=document.getElementById('soundPlayerVolume');
    if(!audio||!native||!nativePlay){console.warn('[NS85] Original audio engine missing: retaining original player.');return;}
    // Earlier attempts created a competing dock. Remove its VISUAL DOM only.
    document.getElementById('ns85-dock')?.remove();
    document.getElementById('ns85-clean')?.remove();
    const ui=document.createElement('aside');
    ui.id='ns85-clean';ui.className='is-min';ui.setAttribute('aria-label','NS AUDIO 85 music player');
    ui.innerHTML=`<div class="ns85-open">
      <div class="ns85-art" aria-hidden="true"></div>
      <img class="ns85-img ns85-crest" src="/ns85-player-crest.png" alt="">
      <img class="ns85-img ns85-divleft" src="/ns85-player-divider-left.png" alt="">
      <button type="button" class="ns85-btn ns85-play" aria-label="Play or pause song"><img src="/ns85-player-play.png" alt=""></button>
      <button type="button" class="ns85-btn ns85-stop" aria-label="Stop song"><img src="/ns85-player-stop.png" alt=""></button>
      <div class="ns85-text"><span class="ns85-title">NATE SAVARD</span><span class="ns85-sub">NS COLLECTIVE</span><span class="ns85-time">00:00 / --:--</span></div>
      <input class="ns85-seek" type="range" min="0" max="1000" step="1" value="0" aria-label="Song progress">
      <img class="ns85-img ns85-divright" src="/ns85-player-divider-right.png" alt="">
      <svg class="ns85-speaker" aria-hidden="true" viewBox="0 0 24 24"><path d="M3 9v6h4l5 4V5L7 9H3ZM16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <input class="ns85-vol" type="range" min="0" max="100" step="1" value="90" aria-label="Volume">
      <button class="ns85-minimize" type="button" aria-label="Minimize music player">−</button>
    </div><button class="ns85-tab" type="button" aria-label="Expand music player"></button>`;
    document.body.appendChild(ui);
    const $=(q)=>ui.querySelector(q),seek=$('.ns85-seek'),volume=$('.ns85-vol'),play=$('.ns85-play'),tab=$('.ns85-tab');
    tab.addEventListener('click',()=>{ui.classList.remove('is-min');play.focus({preventScroll:true});});
    $('.ns85-minimize').addEventListener('click',()=>{ui.classList.add('is-min');tab.focus({preventScroll:true});});
    play.addEventListener('click',()=>nativePlay.click());
    $('.ns85-stop').addEventListener('click',()=>{audio.pause();try{audio.currentTime=0;}catch(_){}render();});
    seek.addEventListener('input',()=>{if(Number.isFinite(audio.duration)&&audio.duration>0)audio.currentTime=audio.duration*Number(seek.value)/1000;});
    volume.addEventListener('input',()=>{
      if(nativeVolume){nativeVolume.value=volume.value;nativeVolume.dispatchEvent(new Event('input',{bubbles:true}));}
      else{audio.muted=false;audio.volume=Number(volume.value)/100;}
      volume.style.setProperty('--fill',volume.value+'%');
    });
    const time=(s)=>Number.isFinite(s)&&s>=0?`${String(Math.floor(s/60)).padStart(2,'0')}:${String(Math.floor(s%60)).padStart(2,'0')}`:'--:--';
    function render(){
      const duration=audio.duration,current=audio.currentTime||0;
      $('.ns85-title').textContent=nativeTitle?.textContent?.trim()||'NATE SAVARD';
      $('.ns85-time').textContent=time(current)+' / '+time(duration);
      if(document.activeElement!==seek){seek.value=Number.isFinite(duration)&&duration>0?String(Math.round(current/duration*1000)):'0';seek.style.setProperty('--fill',(Number(seek.value)/10)+'%');}
      seek.disabled=!(Number.isFinite(duration)&&duration>0);
      if(document.activeElement!==volume){volume.value=String(Math.round(audio.volume*100));volume.style.setProperty('--fill',volume.value+'%');}
      play.setAttribute('aria-label',audio.paused?'Play song':'Pause song');
      play.setAttribute('aria-pressed',String(!audio.paused));
    }
    for(const event of ['play','pause','timeupdate','loadedmetadata','durationchange','volumechange','ended','emptied'])audio.addEventListener(event,render);
    if(nativeTitle)new MutationObserver(render).observe(nativeTitle,{subtree:true,childList:true,characterData:true});
    render();document.documentElement.classList.add('ns85-active');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});else initialize();
})();
