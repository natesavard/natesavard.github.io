/* NS spinner jewelry: multi-angle views on Originals + Envynomadix */
(()=>{
const views=[{"src": "/ns-spinner-side-detail.webp", "label": "SIDE PROFILE"}, {"src": "/ns-spinner-side.webp", "label": "SIDE VIEW"}, {"src": "/ns-spinner-front.webp", "label": "FRONT / OPAL"}, {"src": "/ns-spinner-front-alt.webp", "label": "FRONT DETAIL"}, {"src": "/ns-spinner-reverse.webp", "label": "REVERSE / SAPPHIRE"}, {"src": "/ns-spinner-reverse-detail.webp", "label": "REVERSE DETAIL"}];
const init=()=>{
 if(document.getElementById('ns-spinner-view-styles'))return;
 const style=document.createElement('style');style.id='ns-spinner-view-styles';
 style.textContent=`
 .ns-spinner-views{margin:12px 0 15px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;width:100%;max-width:100%;position:relative;z-index:5}
 .ns-spinner-view{min-width:0;appearance:none;border:1px solid rgba(215,177,110,.32);border-radius:8px;padding:4px;background:#0c0b0b;cursor:pointer;color:#cbb590;transition:border-color .2s,transform .2s}
 .ns-spinner-view:hover,.ns-spinner-view:focus-visible{border-color:#e5c18a;transform:translateY(-2px)}
 .ns-spinner-view img{display:block;width:100%;height:clamp(60px,8vw,110px);object-fit:contain}
 .ns-spinner-view span{display:block;font:8px/1.35 'Courier New',monospace;letter-spacing:.08em;text-align:center;padding:4px 0;text-transform:uppercase}
 .ns-spinner-hero-views{max-width:500px;margin:18px auto 0}
 #ns-spinner-lightbox{position:fixed;inset:0;z-index:2147482000;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.94);padding:40px 16px}
 #ns-spinner-lightbox.open{display:flex}
 #ns-spinner-lightbox img{display:block;max-width:min(96vw,1100px);max-height:86vh;object-fit:contain}
 #ns-spinner-lightbox .ns-spinner-close{position:absolute;top:16px;right:16px;width:44px;height:44px;border:1px solid #c2aa83;border-radius:50%;background:#111;color:white;font-size:25px;cursor:pointer}
 #ns-spinner-lightbox .ns-spinner-caption{position:absolute;bottom:15px;color:#d3bea0;font:11px 'Courier New',monospace;letter-spacing:.16em}
 @media(max-width:600px){.ns-spinner-views{gap:5px}.ns-spinner-view img{height:70px}.ns-spinner-view span{font-size:7px}}
 `;
 document.head.append(style);
 const modal=document.createElement('div');modal.id='ns-spinner-lightbox';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Spinner jewelry detail');
 const close=document.createElement('button');close.type='button';close.className='ns-spinner-close';close.textContent='×';close.setAttribute('aria-label','Close');
 const full=document.createElement('img'),caption=document.createElement('div');caption.className='ns-spinner-caption';modal.append(close,full,caption);document.body.append(modal);
 let lastFocus=null;const hide=()=>{modal.classList.remove('open');full.removeAttribute('src');lastFocus?.focus?.()};
 close.addEventListener('click',hide);modal.addEventListener('click',e=>{if(e.target===modal)hide()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))hide()});
 const createGallery=extra=>{
 const gallery=document.createElement('div');gallery.className='ns-spinner-views'+(extra?' ns-spinner-hero-views':'');
 gallery.setAttribute('aria-label','Spinner pendant additional views');
 views.forEach(view=>{
  const b=document.createElement('button');b.type='button';b.className='ns-spinner-view';b.setAttribute('aria-label','View spinner '+view.label);
  const im=document.createElement('img');im.src=view.src;im.alt='Nate Savard spinner '+view.label;im.loading='lazy';
  const label=document.createElement('span');label.textContent=view.label;b.append(im,label);
  b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();lastFocus=b;full.src=view.src;full.alt=im.alt;caption.textContent=view.label;modal.classList.add('open');close.focus()});
  gallery.append(b);
 });
 return gallery;
 };
 const scan=()=>{
 // Add multi-angle views to each existing spinner product on Originals.
 document.querySelectorAll('.product-card').forEach(card=>{
  const name=card.querySelector('.product-name')?.textContent||'';
  if(!/spinner/i.test(name)||card.querySelector('.ns-spinner-views'))return;
  const info=card.querySelector('.product-info');if(info)info.insertBefore(createGallery(false),info.querySelector('.product-link'));
 });
 // Add multi-angle views to all spinner jewelry cards in Envynomadix.
 document.querySelectorAll('.jewelry-card').forEach(card=>{
  const name=card.dataset.houseProduct||card.querySelector('.jewelry-card-title')?.textContent||'';
  if(!/spinner/i.test(name)||card.querySelector('.ns-spinner-views'))return;
  const copy=card.querySelector('.jewelry-card-copy');if(copy)copy.append(createGallery(false));
 });
 // Original Collection hero: display all views beneath the large existing pendant.
 const hero=document.querySelector('.hero-showcase');
 if(hero&&!hero.parentElement.querySelector('.ns-spinner-hero-views'))hero.insertAdjacentElement('afterend',createGallery(true));
 };
 scan();
 // Recheck when deferred jewelry scripts insert new cards, without observing our own mutations.
 window.addEventListener('load',scan,{once:true});
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
