/* Additive product only: new Deep Blue Sapphire Spinner. Existing jewelry remains. */
(()=>{
 const name='Deep Blue Sapphire Spinner';
 const images=[
  {src:'/ns-deep-blue-sapphire-spinner.webp',label:'DEEP BLUE SAPPHIRE'},
  {src:'/ns-sapphire-opal-spinner-comparison.webp',label:'SAPPHIRE / OPAL COMPARISON'}
 ];
 function init(){
  if(document.getElementById('ns-deep-sapphire-style'))return;
  const style=document.createElement('style');style.id='ns-deep-sapphire-style';
  style.textContent=`
  .ns-deep-sapphire-viewer{width:100%;min-width:0;margin:0 0 14px}
  .ns-deep-sapphire-main{width:100%;aspect-ratio:1;display:block;background:#050505;border:1px solid rgba(214,177,113,.27);border-radius:12px;padding:10px;cursor:zoom-in;overflow:hidden}
  .ns-deep-sapphire-main img{width:100%;height:100%;object-fit:contain;display:block}
  .ns-deep-sapphire-thumbs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:9px}
  .ns-deep-sapphire-thumbs button{min-width:0;background:#0a0a0a;border:1px solid #55462f;border-radius:7px;padding:5px;cursor:pointer;color:#d5b98b}
  .ns-deep-sapphire-thumbs button[aria-pressed="true"]{border-color:#e4c394}
  .ns-deep-sapphire-thumbs img{width:100%;height:70px;object-fit:contain;display:block}
  .ns-deep-sapphire-thumbs span{display:block;font:8px/1.5 'Courier New',monospace;letter-spacing:.07em}
  .ns-deep-sapphire-info{margin-top:12px}
  .ns-deep-sapphire-info a{color:#d6b27b}
  #ns-deep-sapphire-lightbox{position:fixed;inset:0;z-index:2147483000;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.95);padding:30px}
  #ns-deep-sapphire-lightbox.open{display:flex}
  #ns-deep-sapphire-lightbox img{max-width:95vw;max-height:86vh;object-fit:contain}
  #ns-deep-sapphire-lightbox button{position:absolute;right:18px;top:18px;border:1px solid #a98c62;background:#151515;color:white;border-radius:50%;height:44px;width:44px;font-size:25px;cursor:pointer}
  `;
  document.head.append(style);
  const modal=document.createElement('div');modal.id='ns-deep-sapphire-lightbox';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');
  const large=document.createElement('img'),close=document.createElement('button');close.type='button';close.textContent='×';close.setAttribute('aria-label','Close image');
  modal.append(large,close);document.body.append(modal);
  let previous=null;
  const hide=()=>{modal.classList.remove('open');large.removeAttribute('src');previous?.focus?.()};
  close.onclick=hide;modal.addEventListener('click',e=>{if(e.target===modal)hide()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))hide()});
  function viewer(){
   const wrap=document.createElement('div');wrap.className='ns-deep-sapphire-viewer';
   const main=document.createElement('button');main.type='button';main.className='ns-deep-sapphire-main';main.setAttribute('aria-label','Enlarge deep blue sapphire spinner');
   const mainImg=document.createElement('img');mainImg.src=images[0].src;mainImg.alt='Deep blue sapphire spinner pendant';main.append(mainImg);
   main.onclick=e=>{e.stopPropagation();previous=main;large.src=mainImg.src;large.alt=mainImg.alt;modal.classList.add('open');close.focus()};
   const thumbs=document.createElement('div');thumbs.className='ns-deep-sapphire-thumbs';
   images.forEach((v,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-pressed',String(i===0));b.setAttribute('aria-label','Show '+v.label);const img=document.createElement('img');img.src=v.src;img.alt=v.label;img.loading='lazy';const text=document.createElement('span');text.textContent=v.label;b.append(img,text);b.onclick=e=>{e.stopPropagation();mainImg.src=v.src;mainImg.alt=v.label;thumbs.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))};thumbs.append(b)});
   wrap.append(main,thumbs);return wrap;
  }
  const inquiry='mailto:natesavard@outlook.com?subject='+encodeURIComponent('Deep Blue Sapphire Spinner inquiry');
  const original=document.querySelector('#designs .product-grid, #pieces .product-grid, .product-grid');
  if(original&&!original.querySelector('[data-ns-deep-sapphire]')){
   const card=document.createElement('article');card.className='product-card';card.dataset.nsDeepSapphire='1';
   const image=document.createElement('div');image.className='product-image';image.style.cssText='height:auto;display:block';image.append(viewer());
   const info=document.createElement('div');info.className='product-info';
   const title=document.createElement('div');title.className='product-name';title.textContent=name;
   const desc=document.createElement('div');desc.className='product-desc';desc.textContent='Deep royal-blue sapphire, diamond-set gold spinner. Separate design study; private commission by inquiry.';
   const link=document.createElement('a');link.className='product-link';link.href=inquiry;link.textContent='Inquire';
   info.append(title,desc,link);card.append(image,info);original.append(card);
  }
  const envy=document.querySelector('#jewelryRail .jewelry-track');
  if(envy&&!envy.querySelector('[data-ns-deep-sapphire]')){
   const card=document.createElement('article');card.className='jewelry-card';card.dataset.nsDeepSapphire='1';
   card.dataset.houseProduct=name;card.dataset.housePrice='private quote';
   card.dataset.houseImage=images[0].src;card.dataset.houseDescription='Deep blue sapphire spinner pendant. Private commission concept.';
   const media=document.createElement('div');media.className='jewelry-card-media';media.style.cssText='display:block;height:auto';media.append(viewer());
   const info=document.createElement('div');info.className='jewelry-card-copy';
   const title=document.createElement('h3');title.className='jewelry-card-title';title.textContent=name;
   const note=document.createElement('p');note.className='jewelry-card-note';note.textContent='deep blue sapphire / private commission';
   const desc=document.createElement('p');desc.className='jewelry-card-text';desc.textContent='A distinct royal-blue sapphire expression of the spinner, shown with an opal comparison view.';
   const link=document.createElement('a');link.href=inquiry;link.textContent='PRIVATE INQUIRY ↗';link.style.color='#d6b27b';
   info.append(title,note,desc,link);card.append(media,info);envy.append(card);
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
