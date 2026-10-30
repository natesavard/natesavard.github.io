/* NATE SAVARD — Insomnia purple visual world + hats. Homepage only. */
(()=>{
 const setup=()=>{
  if(document.getElementById('ns-insomnia-motion-style'))return;
  const style=document.createElement('style');style.id='ns-insomnia-motion-style';
  style.textContent=`
  .scene--insomnia{position:absolute!important;inset:0!important;overflow:hidden!important;animation:none!important;transform:none!important;background:#090515!important}
  .scene--insomnia .ns-insomnia-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 47%;opacity:.74;filter:saturate(1.4) contrast(1.18) brightness(.8);pointer-events:none}
  .scene--insomnia .ns-insomnia-tint{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 60% 48%,rgba(104,33,183,.19),transparent 58%),linear-gradient(90deg,rgba(5,2,13,.72),rgba(25,7,57,.12) 55%,rgba(6,2,16,.52));mix-blend-mode:normal}
  .scene--insomnia::after{z-index:2;pointer-events:none;background:linear-gradient(90deg,rgba(3,2,9,.58),rgba(3,2,9,.06) 65%,rgba(3,2,9,.4)),linear-gradient(0deg,rgba(0,0,0,.62),transparent 44%,rgba(0,0,0,.1))}
  #ns-home-collection .ns-hat-card{display:block;min-width:0;color:inherit;text-decoration:none}
  #ns-home-collection .ns-hat-card .ns-image img{object-fit:contain}
  #ns-home-collection .ns-hat-card .ns-label{line-height:1.6}
  @media(max-width:680px){.scene--insomnia .ns-insomnia-video{object-position:center;opacity:.62}}
  @media(prefers-reduced-motion:reduce){.scene--insomnia .ns-insomnia-video{display:none}}
  `;document.head.append(style);
  const scene=document.querySelector('.scene--insomnia');
  if(scene&&!scene.querySelector('.ns-insomnia-video')){
   const v=document.createElement('video');v.className='ns-insomnia-video';v.src='/ns-insomnia-purple-loop.mp4';v.muted=true;v.loop=true;v.autoplay=true;v.playsInline=true;v.preload='auto';v.setAttribute('playsinline','');v.setAttribute('muted','');v.setAttribute('aria-hidden','true');
   const tint=document.createElement('div');tint.className='ns-insomnia-tint';scene.prepend(v,tint);
   const update=()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||!scene.classList.contains('is-active')||document.hidden){v.pause()}else{v.play().catch(()=>{})}};
   document.querySelectorAll('.scene-tab').forEach(b=>b.addEventListener('click',()=>{requestAnimationFrame(update);setTimeout(update,500)}));
   document.addEventListener('visibilitychange',update);
   // The homepage sets the NLS scene active later during DOMContentLoaded.
   // Observe that state so playback begins without switching tabs twice.
   const observer=new MutationObserver(update);
   observer.observe(scene,{attributes:true,attributeFilter:['class']});
   v.addEventListener('canplay',update);
   window.addEventListener('pageshow',update);
   requestAnimationFrame(update);
   setTimeout(update,250);
   setTimeout(update,900);
  }
  const grid=document.querySelector('#ns-home-collection .ns-products');
  if(grid&&!grid.querySelector('.ns-hat-card')){
   [['FLAME DISTRESSED CAP','/ns-hat-flames.webp'],['DISTRESSED CAPS / BLACK + BLUE','/ns-hats-distressed.webp']].forEach(([name,img])=>{
    const a=document.createElement('a');a.className='ns-hat-card';a.href='mailto:natesavard@outlook.com?subject='+encodeURIComponent('Nate Savard cap inquiry — '+name);
    const frame=document.createElement('div');frame.className='ns-image';
    const photo=document.createElement('img');photo.src=img;photo.alt=name;photo.loading='lazy';frame.append(photo);
    const title=document.createElement('div');title.className='ns-name';title.textContent=name;
    const label=document.createElement('div');label.className='ns-label';label.textContent='CAP / AVAILABILITY INQUIRY ↗';
    a.append(frame,title,label);grid.append(a);
   });
  }
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
 window.addEventListener('load',setup,{once:true});
})();
