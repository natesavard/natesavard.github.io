/* Nate Savard — luxury spinner product viewer, v2. Replaces old thumbnail layout. */
(()=>{
const views=[{"src": "/ns-spinner-front.webp", "label": "FRONT / OPAL"}, {"src": "/ns-spinner-front-alt.webp", "label": "FRONT DETAIL"}, {"src": "/ns-spinner-side-detail.webp", "label": "SIDE PROFILE"}, {"src": "/ns-spinner-side.webp", "label": "SIDE VIEW"}, {"src": "/ns-spinner-reverse.webp", "label": "REVERSE / SAPPHIRE"}, {"src": "/ns-spinner-reverse-detail.webp", "label": "REVERSE DETAIL"}];
function init(){
 if(document.getElementById('ns-spinner-lux-style'))return;
 const style=document.createElement('style');style.id='ns-spinner-lux-style';
 style.textContent=`
 .ns-spinner-lux{width:100%;min-width:0;margin:14px 0 22px}
 .ns-spinner-lux-main{width:100%;height:auto;aspect-ratio:1/1;display:grid;place-items:center;background:radial-gradient(circle at 50% 48%,#171514,#070707 72%);border:1px solid rgba(211,179,127,.24);border-radius:15px;overflow:hidden;padding:16px;cursor:zoom-in}
 .ns-spinner-lux-main img{width:100%;height:100%;max-height:480px;object-fit:contain;display:block;transition:opacity .18s ease,transform .4s ease}
 .ns-spinner-lux-main:hover img{transform:scale(1.035)}
 .ns-spinner-lux-thumbs{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:7px;margin-top:11px}
 .ns-spinner-lux-thumb{padding:3px;aspect-ratio:1/1;background:#0b0a09;border:1px solid rgba(211,179,127,.25);border-radius:7px;cursor:pointer;overflow:hidden}
 .ns-spinner-lux-thumb[aria-pressed="true"]{border-color:#e4c394;box-shadow:0 0 0 1px #e4c394 inset}
 .ns-spinner-lux-thumb img{display:block;width:100%;height:100%;object-fit:contain}
 .ns-spinner-lux-caption{margin-top:9px;font:10px/1.4 'Courier New',monospace;letter-spacing:.16em;color:#cbb795;text-transform:uppercase}
 .ns-spinner-lux-hero{max-width:660px;margin:24px auto 0}
 .ns-spinner-lux-hero .ns-spinner-lux-main{aspect-ratio:5/4}
 #ns-spinner-lux-modal{position:fixed;inset:0;z-index:2147483000;display:none;place-items:center;background:rgba(0,0,0,.96);padding:35px 15px}
 #ns-spinner-lux-modal.open{display:grid}
 #ns-spinner-lux-modal img{max-width:95vw;max-height:86vh;object-fit:contain}
 #ns-spinner-lux-modal button{position:absolute;right:16px;top:16px;border:1px solid #bda37b;background:#111;color:white;border-radius:50%;width:44px;height:44px;font-size:27px;cursor:pointer}
 @media(max-width:600px){.ns-spinner-lux-main{padding:8px}.ns-spinner-lux-thumbs{gap:4px}.ns-spinner-lux-thumb{border-radius:4px}}
 `;
 document.head.append(style);
 // Remove previous script's thumbnail strips if present.
 document.querySelectorAll('.ns-spinner-views').forEach(el=>el.remove());
 const modal=document.createElement('div');modal.id='ns-spinner-lux-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');
 const modalImg=document.createElement('img');const close=document.createElement('button');close.type='button';close.textContent='×';close.setAttribute('aria-label','Close');
 modal.append(modalImg,close);document.body.append(modal);
 let focusReturn=null;
 const hide=()=>{modal.classList.remove('open');modalImg.removeAttribute('src');focusReturn?.focus?.()};
 close.addEventListener('click',hide);modal.addEventListener('click',e=>{if(e.target===modal)hide()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))hide()});
 function viewer(hero=false){
  const box=document.createElement('div');box.className='ns-spinner-lux'+(hero?' ns-spinner-lux-hero':'');
  const main=document.createElement('button');main.type='button';main.className='ns-spinner-lux-main';main.setAttribute('aria-label','Enlarge spinner image');
  const large=document.createElement('img');large.src=views[0].src;large.alt='Nate Savard opal spinner front view';main.append(large);
  const thumbs=document.createElement('div');thumbs.className='ns-spinner-lux-thumbs';
  const caption=document.createElement('div');caption.className='ns-spinner-lux-caption';caption.textContent=views[0].label;
  views.forEach((v,i)=>{const b=document.createElement('button');b.type='button';b.className='ns-spinner-lux-thumb';b.setAttribute('aria-label','Show '+v.label);b.setAttribute('aria-pressed',String(i===0));const img=document.createElement('img');img.src=v.src;img.alt=v.label;img.loading='lazy';b.append(img);b.addEventListener('click',e=>{e.stopPropagation();large.style.opacity='.35';large.src=v.src;large.alt=v.label;large.onload=()=>{large.style.opacity='1'};caption.textContent=v.label;thumbs.querySelectorAll('button').forEach(t=>t.setAttribute('aria-pressed',String(t===b)))});thumbs.append(b)});
  main.addEventListener('click',e=>{e.stopPropagation();focusReturn=main;modalImg.src=large.src;modalImg.alt=large.alt;modal.classList.add('open');close.focus()});
  box.append(main,thumbs,caption);return box;
 }
 function mount(){
  document.querySelectorAll('.product-card').forEach(card=>{const name=card.querySelector('.product-name')?.textContent||'';if(!/spinner/i.test(name)||card.querySelector('.ns-spinner-lux'))return;
   const old=card.querySelector('.product-image');if(old)old.replaceWith(viewer());else card.prepend(viewer());
  });
  document.querySelectorAll('.jewelry-card').forEach(card=>{const name=card.dataset.houseProduct||card.querySelector('.jewelry-card-title')?.textContent||'';if(!/spinner/i.test(name)||card.querySelector('.ns-spinner-lux'))return;
   const old=card.querySelector('.jewelry-card-media');if(old)old.replaceWith(viewer());else card.prepend(viewer());
  });
  const hero=document.querySelector('.hero-showcase');
  if(hero&&!hero.parentElement.querySelector('.ns-spinner-lux-hero'))hero.replaceWith(viewer(true));
 }
 mount();window.addEventListener('load',mount,{once:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
