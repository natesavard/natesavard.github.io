/* Remove Envy cross BUTTON discs across all pages using the shared site script. */
(()=>{
  if(document.getElementById('ns-clean-envy-cross-sitewide-v1'))return;
  const style=document.createElement('style');
  style.id='ns-clean-envy-cross-sitewide-v1';
  style.textContent=`
/* Sitewide standalone spinning Envy cross — same clean transparency as Vault.
   Does not touch the NS audio/menu tab, Cart, product cards, or other buttons. */
button.top-ribbon,
button.floating-envy-star,
button.envy-to-top,
button#floatingTopCross,
button.floating-top-cross {
  background:transparent!important;
  background-image:none!important;
  border:0!important;
  border-radius:0!important;
  box-shadow:none!important;
  -webkit-backdrop-filter:none!important;
  backdrop-filter:none!important;
  outline-offset:4px;
}
button.top-ribbon::before,
button.top-ribbon::after,
button.floating-envy-star::before,
button.floating-envy-star::after,
button.envy-to-top::before,
button.envy-to-top::after,
button#floatingTopCross::before,
button#floatingTopCross::after {
  background:none!important;
  background-image:none!important;
  border:0!important;
  box-shadow:none!important;
  -webkit-backdrop-filter:none!important;
  backdrop-filter:none!important;
  content:none!important;
  display:none!important;
}
button.top-ribbon:hover,
button.floating-envy-star:hover,
button.envy-to-top:hover,
button#floatingTopCross:hover,
button.floating-top-cross:hover {
  background:transparent!important;
  border:0!important;
  box-shadow:none!important;
}
`;
  (document.head||document.documentElement).appendChild(style);
})();

(() => {
  const mount = () => {
    if (document.querySelector('.ns-bottom-nav')) return;

    const style = document.createElement('style');
    style.textContent = `
      .ns-bottom-nav { margin: 64px 0 0; padding: 26px 20px calc(26px + env(safe-area-inset-bottom)); border-top: 1px solid rgba(255,255,255,.16); background: rgba(0,0,0,.82); color: #f3f0e8; text-align: center; font: 10px/1.3 "Courier New", monospace; letter-spacing: .16em; text-transform: uppercase; }
      .ns-bottom-nav__label { display: block; margin-bottom: 14px; color: rgba(255,255,255,.48); font-size: 8px; }
      .ns-bottom-nav__links { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 20px; }
      .ns-bottom-nav a { color: inherit; text-decoration: none; opacity: .82; transition: opacity .2s ease, color .2s ease; }
      .ns-bottom-nav a:hover, .ns-bottom-nav a:focus-visible { color: #fff; opacity: 1; }
    `;

    const nav = document.createElement('nav');
    nav.className = 'ns-bottom-nav';
    nav.setAttribute('aria-label', 'Nate Savard destinations');
    nav.innerHTML = `
      <span class="ns-bottom-nav__label">Nate Savard / explore</span>
      <div class="ns-bottom-nav__links">
        <a href="/revelations.html">Revelations</a>
        <a href="/vault.html">Vault</a>
        <a href="/insomnia-world.html">Insomnia World</a>
      </div>`;

    document.head.appendChild(style);
    document.body.appendChild(nav);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();


/* NATE SAVARD shared navigation — additive loader (preserves existing page functions). */
(()=>{
  if(document.querySelector('script[data-ns-primary-loader]') || document.querySelector('script[src*="ns-primary-navigation.js"]')) return;
  const tag=document.createElement('script');
  tag.src='/ns-primary-navigation.js?v=28';
  tag.defer=true;
  tag.dataset.nsPrimaryLoader='1';
  document.head.appendChild(tag);
})();


/* Rebirth Signature Collection: house pieces first, new apparel next, shoes last.
   This is deliberately scoped to Rebirth and does not alter saved product data,
   the native product viewer, cart, banner, or any other website page. */
(()=>{
  'use strict';
  if (!/\/envynomadixrebirth\.html$/i.test(location.pathname)) return;

  const FEATURED_SHIRTS = [
    'Envy Chrome Cross V-Neck',
    'Nate Savard Red Logo Tee',
    'Envy Nomadix Chrome Cross V-Neck',
    'Savard Blue Venus Flytrap Tee',
    'Savard 85 Vintage Racing Long Sleeve',
    'Nate Savard Distressed Black Tee'
  ];
  const shirtSet = new Set(FEATURED_SHIRTS.map(s=>s.toLowerCase()));
  const $ = (sel,root=document)=>root.querySelector(sel);
  const nameOf = card => (card.dataset.houseProduct||'').trim().toLowerCase();
  let finished=false;
  let observer;

  function reorder(){
    if(finished)return;
    const track=$('.catalogue-rail .catalogue-track');
    const source=$('#ns-life-force-other-pages .lf-grid');
    // The LIFE FORCE ENERGY cards are generated after page parsing. Only reorder
    // once both original cards and their current apparel cards are present.
    if(!track||!source)return;
    const originals=Array.from(track.children).filter(el=>el.matches('.catalogue-card'));
    const hood=originals.find(el=>nameOf(el)==='distressed vicuna hood');
    const fuckUp=originals.find(el=>nameOf(el)==='fuck up tee');
    if(!hood||!fuckUp)return;

    const sourceCards=Array.from(source.querySelectorAll('.lf-card'));
    const extras=[];
    for(const wanted of FEATURED_SHIRTS){
      const card=sourceCards.find(el=>{
        const label=el.querySelector('figcaption');
        // Figcaption is plain product name in the existing script.
        return label&&label.textContent.trim().toLowerCase()===wanted.toLowerCase();
      });
      if(!card)continue;
      const img=card.querySelector('img');
      if(!img)continue;
      const item=document.createElement('article');
      item.className='catalogue-card ns-new-life-force-shirt';
      item.dataset.houseProduct=wanted;
      item.dataset.housePrice='$129.00';
      item.dataset.houseDescription='Nate Savard / Life Force Energy collection';
      item.dataset.houseImage=img.getAttribute('src')||img.src;
      item.setAttribute('role','button');
      item.tabIndex=0;
      item.setAttribute('aria-label','Open '+wanted+' full size');
      const picture=document.createElement('img');
      picture.src=item.dataset.houseImage;
      picture.alt=img.alt||wanted;
      picture.loading='lazy';
      const copy=document.createElement('div');copy.className='catalogue-card-copy';
      const title=document.createElement('h3');title.className='catalogue-card-title';title.textContent=wanted;
      const note=document.createElement('p');note.className='catalogue-card-note';note.textContent='Life Force Energy / shirt / collector edition';
      copy.append(title,note);item.append(picture,copy);
      extras.push(item);
      // Remove duplicate from the secondary grid; its artwork entries remain.
      card.remove();
    }

    const shoes=originals.filter(el=>/\b(?:shoe|shoes|skate|sneaker|trainer)\b/i.test(nameOf(el)) || nameOf(el).startsWith("ns sz 66"));
    const others=originals.filter(el=>el!==hood&&el!==fuckUp&&!shoes.includes(el));
    // Keep original legacy apparel ahead of non-apparel campaign imagery.
    const legacyShirts=others.filter(el=>/\b(?:tee|shirt|hood|jersey|sweater|jacket)\b/i.test(nameOf(el)));
    const remaining=others.filter(el=>!legacyShirts.includes(el));
    track.replaceChildren(hood,fuckUp,...extras,...legacyShirts,...remaining,...shoes);
    finished=true;
    if(observer)observer.disconnect();

    // Inline Rebirth handlers bind only the original catalogue nodes. For new
    // shirts, temporarily lend their details to the existing native viewer's
    // bound garment card so the genuine viewer/cart opens, with its real controls.
    const proxy=legacyShirts.find(el=>nameOf(el)==='envy shirt legacy tee')||fuckUp;
    const ATTRS=['data-house-product','data-house-price','data-house-description','data-house-image','data-house-option-label','data-house-options'];
    function openNewShirt(newCard){
      if(!proxy)return;
      const before=new Map(ATTRS.map(a=>[a,proxy.getAttribute(a)]));
      for(const key of ATTRS){
        const value=newCard.getAttribute(key);
        if(value==null)proxy.removeAttribute(key);else proxy.setAttribute(key,value);
      }
      try{proxy.click()}finally{
        for(const [key,value] of before){
          if(value==null)proxy.removeAttribute(key);else proxy.setAttribute(key,value);
        }
      }
    }
    for(const item of extras){
      item.addEventListener('click',()=>openNewShirt(item));
      item.addEventListener('keydown',e=>{
        if(e.key==='Enter'||e.key===' '){e.preventDefault();openNewShirt(item)}
      });
    }
  }

  function start(){
    reorder();
    if(finished)return;
    observer=new MutationObserver(reorder);
    observer.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();


/* NATE SAVARD / 2026-11-22 / visual control corrections.
 * Keep ONE working global cart, and keep the original Envy cross art.
 * Only repositions the actual shared-cart button on the Envynomadix pages.
 */
(()=>{
  'use strict';
  const path=location.pathname.toLowerCase();
  const isEnvy=/\/(envynomadixrebirth|envynomadix)\.html$/.test(path);
  if(!isEnvy)return;

  const css=document.createElement('style');
  css.id='ns-envy-clean-control-layout-v33';
  css.textContent=`
    /* Exact Vault-style cross: image alone, no button circle or halo. */
    body .top-ribbon,
    body.is-entered .top-ribbon,
    body .top-ribbon:hover {
      width:clamp(64px,8vw,96px)!important;
      height:auto!important;
      aspect-ratio:1/1!important;
      padding:0!important;
      border:0!important;
      border-radius:0!important;
      outline:0!important;
      background:transparent!important;
      background-image:none!important;
      box-shadow:none!important;
      backdrop-filter:none!important;
      -webkit-backdrop-filter:none!important;
      filter:drop-shadow(0 16px 28px rgba(0,0,0,.42))!important;
    }
    body .top-ribbon::before,
    body .top-ribbon::after {content:none!important;display:none!important;}
    body .top-ribbon img {
      position:relative!important;
      inset:auto!important;
      left:auto!important;
      top:auto!important;
      display:block!important;
      width:100%!important;
      min-width:0!important;
      height:auto!important;
      transform:none!important;
      transform-origin:center!important;
      animation:ns-vault-cross-spin 8.5s linear infinite!important;
    }
    body .top-ribbon:hover img {animation-duration:1.8s!important;}
    @keyframes ns-vault-cross-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

    /* Align native SHOP and the real universal CART on one horizontal row. */
    body .hero-quick-actions {
      position:fixed!important;
      top:13px!important;
      right:24px!important;
      left:auto!important;
      bottom:auto!important;
      display:inline-flex!important;
      flex-direction:row!important;
      flex-wrap:nowrap!important;
      align-items:center!important;
      justify-content:flex-end!important;
      gap:22px!important;
      width:auto!important;
      height:auto!important;
      min-height:0!important;
      padding:0!important;
      isolation:isolate!important;
      z-index:18020!important;
    }
    body .hero-quick-actions::before,
    body .hero-quick-actions::after {content:none!important;display:none!important;}
    body .hero-quick-actions #heroShopButton,
    body .hero-quick-actions #ns-site-cart-top {
      position:relative!important;
      inset:auto!important;
      top:auto!important;
      right:auto!important;
      bottom:auto!important;
      left:auto!important;
      display:inline-flex!important;
      align-items:center!important;
      justify-content:center!important;
      width:auto!important;
      min-width:0!important;
      height:auto!important;
      min-height:0!important;
      margin:0!important;
      padding:8px 0!important;
      border:0!important;
      border-radius:0!important;
      background:transparent!important;
      box-shadow:none!important;
      color:rgba(246,226,190,.96)!important;
      font:11px/1.2 'Courier New',monospace!important;
      letter-spacing:.14em!important;
      text-transform:uppercase!important;
      white-space:nowrap!important;
      vertical-align:middle!important;
      pointer-events:auto!important;
      visibility:visible!important;
    }
    body .hero-quick-actions #heroCartButton{display:none!important;}
    @media(max-width:600px){
      body .hero-quick-actions{right:12px!important;gap:16px!important;}
      body .top-ribbon{right:16px!important;bottom:16px!important;width:72px!important;}
    }
  `;
  document.head.appendChild(css);

  function alignSharedCart(){
    const row=document.querySelector('.hero-quick-actions');
    const shared=document.getElementById('ns-site-cart-top');
    if(!row||!shared)return false;
    if(shared.parentElement!==row)row.appendChild(shared);
    return true;
  }
  function mount(){
    if(alignSharedCart())return;
    const observer=new MutationObserver(()=>{
      if(alignSharedCart())observer.disconnect();
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
