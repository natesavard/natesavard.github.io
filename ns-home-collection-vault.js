/* Nate Savard homepage — clothing showcase and Vault Grand Touring finale.
   Uses assets already in the repository. Does not replace existing sections. */
(() => {
 const mount=()=>{
  if(document.getElementById('ns-home-collection'))return;
  const main=document.querySelector('main.content');
  const footer=main?.querySelector('footer.footer');
  const music=main?.querySelector('.nostalgia-transmission');
  if(!main||!footer)return;
  const css=`
  #ns-home-collection,#ns-home-grand-touring{position:relative;color:#f1ebe2}
  #ns-home-collection{padding:clamp(70px,10vw,140px) 0;border-top:1px solid rgba(255,255,255,.13)}
  #ns-home-collection .ns-kicker,#ns-home-grand-touring .ns-kicker{font:700 10px/1.5 'Courier New',monospace;letter-spacing:.24em;text-transform:uppercase;color:#d7b985}
  #ns-home-collection h2{font:400 clamp(42px,7vw,100px)/1.08 'NS Katakana',Impact,sans-serif;letter-spacing:.07em;text-transform:uppercase;margin:18px 0 28px}
  #ns-home-collection .ns-intro{font:13px/1.7 'Courier New',monospace;color:#a9a39b;max-width:560px;margin-bottom:32px}
  #ns-home-collection .ns-products{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}
  #ns-home-collection .ns-product{display:block;color:inherit;text-decoration:none;min-width:0}
  #ns-home-collection .ns-image{aspect-ratio:4/5;background:#151310;border:1px solid rgba(255,255,255,.16);overflow:hidden}
  #ns-home-collection .ns-image img{width:100%;height:100%;object-fit:contain;display:block;transition:transform .5s}
  #ns-home-collection .ns-product:hover img{transform:scale(1.04)}
  #ns-home-collection .ns-name{font:700 13px/1.3 'Courier New',monospace;letter-spacing:.1em;text-transform:uppercase;margin:14px 0 5px}
  #ns-home-collection .ns-label{font:10px 'Courier New',monospace;color:#b2a38d;letter-spacing:.12em}
  #ns-home-collection .ns-explore,#ns-home-grand-touring .ns-enter{display:inline-block;border-bottom:1px solid #d7b985;padding:14px 0;margin-top:35px;text-decoration:none;font:700 11px 'Courier New',monospace;letter-spacing:.18em;text-transform:uppercase;color:#f2e4cd}
  #ns-home-grand-touring{min-height:80vh;margin:65px 0 90px;padding:clamp(65px,9vw,120px) 15px;display:flex;flex-direction:column;align-items:center;text-align:center;justify-content:center;border-top:1px solid rgba(255,255,255,.2);border-bottom:1px solid rgba(255,255,255,.2);background:radial-gradient(ellipse at 50% 38%,rgba(180,156,119,.09),transparent 52%),#050505}
  #ns-home-grand-touring .ns-model{display:block;width:min(72vw,520px);height:min(72vw,520px);min-height:260px;--poster-color:transparent;filter:drop-shadow(0 20px 32px #000) drop-shadow(0 0 30px rgba(255,255,255,.12));cursor:grab;touch-action:pan-y}
  #ns-home-grand-touring .ns-flags{display:block;width:min(270px,55vw);height:auto;margin:6px auto 20px}
  #ns-home-grand-touring .ns-club{font:400 clamp(14px,2.2vw,21px)/1.5 'Courier New',monospace;letter-spacing:.12em;margin:10px 0;color:#c5b9a7}
  #ns-home-grand-touring .ns-hint{font:9px 'Courier New',monospace;color:#817a70;letter-spacing:.17em;margin-top:18px;text-transform:uppercase}
  @media(max-width:700px){#ns-home-collection .ns-products{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}#ns-home-collection .ns-name{font-size:11px}#ns-home-grand-touring{min-height:70vh;margin-top:40px}}
  @media(max-width:430px){#ns-home-collection .ns-products{grid-template-columns:1fr 1fr}#ns-home-grand-touring .ns-model{width:85vw;height:85vw;min-height:260px}}
  `;
  const s=document.createElement('style');s.textContent=css;document.head.append(s);
  const section=document.createElement('section');section.id='ns-home-collection';
  const products=[
   ['SPEEDWAY JERSEY','ns-envy-05.webp'],
   ['VENUS FLYTRAP / I','ns-envy-01.webp'],
   ['RED LOGO TEE','ns-envy-03.webp'],
   ['ALIEN GRAPHIC','ns-envy-09.webp'],
   ['DISTRESSED STREETWEAR','ns-envy-02.webp'],
   ['FW25 TECHNICAL','ns-envy-08.webp']
  ];
  const intro=document.createElement('div');intro.innerHTML='<p class="ns-kicker">NATE SAVARD / ORIGINALS / WORLDWIDE</p><h2>COLLECTION</h2><p class="ns-intro">Distressed garments, racing heritage, and objects for a different reality. A selection from the Nate Savard design archive.</p>';section.append(intro);
  const grid=document.createElement('div');grid.className='ns-products';
  products.forEach(([name,src])=>{const a=document.createElement('button');a.type='button';a.className='ns-product';a.style.cssText='background:none;border:0;padding:0;text-align:left;cursor:pointer;width:100%';const box=document.createElement('div');box.className='ns-image';const img=document.createElement('img');img.src='/'+src;img.alt=name;img.loading='lazy';img.classList.add('card__image');box.append(img);const title=document.createElement('div');title.className='ns-name';title.textContent=name;const sub=document.createElement('div');sub.className='ns-label';sub.textContent='VIEW DETAILS / ADD TO CART ↗';a.dataset.name=name;a.append(box,title,sub);grid.append(a)});section.append(grid);
  const explore=document.createElement('a');explore.className='ns-explore';explore.href='/vault.html';explore.textContent='EXPLORE ALL GARMENTS / VAULT ↗';section.append(explore);
  // Place clothing after music and before the existing archive feature.
  if(music)music.after(section);else main.insertBefore(section,footer);
  const finale=document.createElement('section');finale.id='ns-home-grand-touring';
  const kicker=document.createElement('p');kicker.className='ns-kicker';kicker.textContent='NATE SAVARD / PRIVATE ARCHIVE';
  const model=document.createElement('model-viewer');model.className='ns-model';model.setAttribute('src','/assets/ns-monogram.glb');model.setAttribute('alt','Large rotating NS monogram');model.setAttribute('auto-rotate','');model.setAttribute('camera-controls','');model.setAttribute('disable-zoom','');model.setAttribute('interaction-prompt','none');model.setAttribute('rotation-per-second','16deg');model.setAttribute('environment-image','neutral');model.setAttribute('exposure','1.25');model.setAttribute('shadow-intensity','0');model.setAttribute('tone-mapping','aces');
  const flags=document.createElement('img');flags.className='ns-flags';flags.src='/assets/crossed-flags-est-1985.webp';flags.alt='Crossed flags EST 1985';
  const club=document.createElement('p');club.className='ns-club';club.textContent='Nate Savard – Grand Touring Club –';
  const enter=document.createElement('a');enter.className='ns-enter';enter.href='/vault.html';enter.textContent='ENTER THE VAULT ↗';
  const hint=document.createElement('p');hint.className='ns-hint';hint.textContent='DRAG THE MONOGRAM / ENTER THE ARCHIVE';
  finale.append(kicker,model,flags,club,enter,hint);
  main.insertBefore(finale,footer);
  if(!customElements.get('model-viewer')){const loader=document.createElement('script');loader.type='module';loader.src='https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';document.head.append(loader)}
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();

/* NATE SAVARD / VAULT BOUTIQUE — product popups + persistent cart.
   Editorial prices in USD. Checkout sends an order REQUEST by email, not payment.
   Requires existing vault.html + ns-vault-additions.js. */
(() => {
  const PRODUCTS = [
    ['NLS Star ’85 F/S',225,'garment','https://nate-savard-shop.fourthwall.com/products/nls-star-85-f-s'],
    ['Lost Dimensions: Insomnia 2026',225,'garment'],
    ['Envy Crystal V-Neck',275,'garment'],
    ['Chrome Star Distressed Tee',285,'garment'],
    ['Envy Legacy Tee',245,'garment'],
    ['Fuck Up Tee',295,'garment'],
    ['NS Ritual Tee Study',null,'experiment'],
    ['NS Chrome Monogram',null,'symbol'],
    ['VENUS FLYTRAP / I',295,'garment'],
    ['DISTRESSED STREETWEAR',285,'garment'],
    ['RED LOGO TEE',195,'garment'],
    ['MUSCLE TEE',245,'garment'],
    ['SPEEDWAY JERSEY',395,'garment'],
    ['STAR ASHTRAY',185,'experiment'],
    ['VENUS FLYTRAP / II',295,'garment'],
    ['FW25 TECHNICAL',325,'garment'],
    ['ALIEN GRAPHIC',275,'garment'],
    ['CHROME PEACE / NS',null,'symbol']
  ];
  const catalog = new Map(PRODUCTS.map(([name,price,type,url])=>[name.toLowerCase(),{name,price,type,url}]));
  const key='ns-vault-boutique-cart-v1';
  let cart=[];try{cart=JSON.parse(localStorage.getItem(key)||'[]');if(!Array.isArray(cart))cart=[]}catch{}
  const money=n=>'$'+Number(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  const save=()=>{try{localStorage.setItem(key,JSON.stringify(cart))}catch{}};
  const el=(tag,cls,text)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=text;return x};
  const style=el('style');style.textContent=`
  #ns-vault-cart-open{position:fixed;right:20px;bottom:25px;z-index:150;background:#baff55;color:#050505;border:0;padding:15px 19px;font:700 12px 'Courier New',monospace;letter-spacing:.12em;cursor:pointer;box-shadow:0 12px 30px #000}
  .nsv-overlay{position:fixed;inset:0;z-index:15000;background:rgba(0,0,0,.88);backdrop-filter:blur(12px);display:none;align-items:center;justify-content:center;padding:18px;color:#f3f0e8;font-family:Arial,sans-serif}
  .nsv-overlay.open{display:flex}
  .nsv-panel{position:relative;width:min(960px,100%);max-height:93vh;overflow:auto;background:#0a0a0a;border:1px solid #555;display:grid;grid-template-columns:1.1fr .9fr;box-shadow:0 25px 90px #000}
  .nsv-photo{background:#161616;min-height:350px;display:grid;place-items:center}
  .nsv-photo img{display:block;width:100%;height:100%;max-height:80vh;object-fit:contain}
  .nsv-content{padding:46px 32px}
  .nsv-overline{color:#baff55;font:10px 'Courier New',monospace;letter-spacing:.2em}
  .nsv-content h2{font-size:clamp(30px,4vw,54px);line-height:.95;text-transform:uppercase;letter-spacing:-.05em;margin:18px 0}
  .nsv-content p,.nsv-drawer p{font:12px/1.7 'Courier New',monospace;color:#aaa}
  .nsv-price{font-size:26px;margin:15px 0}
  .nsv-sizes{display:flex;flex-wrap:wrap;gap:7px;margin:20px 0}
  .nsv-overlay button,.nsv-overlay a{border:1px solid #666;background:transparent;color:#f4f4f4;padding:11px 14px;cursor:pointer;font:11px 'Courier New',monospace;text-transform:uppercase;text-decoration:none}
  .nsv-overlay button.selected,.nsv-overlay button.primary{background:#baff55;color:#090909;border-color:#baff55}
  .nsv-overlay .nsv-close{position:absolute;top:10px;right:12px;z-index:2;font-size:25px;border:0;background:#111}
  .nsv-qty{display:flex;align-items:center;gap:15px;margin:18px 0}
  .nsv-drawer{position:relative;background:#090909;border:1px solid #555;width:min(480px,100%);max-height:93vh;overflow:auto;padding:48px 24px 28px}
  .nsv-drawer h2{font-size:40px;margin:0 0 20px}
  .nsv-line{display:grid;grid-template-columns:70px 1fr;gap:14px;padding:16px 0;border-bottom:1px solid #333}
  .nsv-line img{width:70px;height:90px;object-fit:contain;background:#151515}
  .nsv-line strong{display:block;font-size:12px}
  .nsv-line small{display:block;color:#999;margin:8px 0}
  .nsv-line button{padding:6px 9px;margin:3px}
  .nsv-total{display:flex;justify-content:space-between;font-weight:700;margin:25px 0}
  .nsv-drawer label{display:block;color:#bbb;font:11px 'Courier New',monospace;margin:14px 0 6px}
  .nsv-drawer input,.nsv-drawer textarea{width:100%;padding:12px;background:#171717;color:#fff;border:1px solid #555;font:13px Arial,sans-serif}
  .nsv-drawer .nsv-submit{width:100%;background:#baff55;color:#090909;border-color:#baff55;margin-top:18px}
  #archiveGrid .card__image-wrap{cursor:pointer}
  #archiveGrid .card__image-wrap:focus-visible{outline:2px solid #baff55;outline-offset:3px}
  @media(max-width:650px){.nsv-panel{grid-template-columns:1fr}.nsv-photo{min-height:220px}.nsv-photo img{max-height:42vh}.nsv-content{padding:26px 20px}}
  `;document.head.appendChild(style);
  const overlay=el('div','nsv-overlay');overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');
  overlay.innerHTML=`<div class="nsv-panel"><button class="nsv-close" aria-label="Close">×</button><div class="nsv-photo"><img alt=""></div><div class="nsv-content"><div class="nsv-overline">NATE SAVARD / VAULT / WORLDWIDE</div><h2></h2><p class="nsv-description"></p><div class="nsv-price"></div><div class="nsv-sizes"></div><div class="nsv-qty"><button data-qty="-1">−</button><span>1</span><button data-qty="1">+</button></div><button class="primary nsv-add">ADD TO CART</button> <button class="nsv-view-cart">VIEW CART</button><p class="nsv-notice">Prices in USD. Availability and shipping confirmed before payment.</p></div></div>`;
  const cartOverlay=el('div','nsv-overlay');cartOverlay.setAttribute('role','dialog');cartOverlay.setAttribute('aria-modal','true');
  cartOverlay.innerHTML=`<div class="nsv-drawer"><button class="nsv-close" aria-label="Close">×</button><div class="nsv-overline">NATE SAVARD / WORLDWIDE</div><h2>YOUR CART</h2><div class="nsv-items"></div><div class="nsv-total"><span>SUBTOTAL USD</span><span class="nsv-sum"></span></div><p>Order request only. No payment is collected here. Shipping, availability and final price are confirmed by email.</p><form class="nsv-form"><label>Your name</label><input name="name" required autocomplete="name"><label>Email</label><input name="email" type="email" required autocomplete="email"><label>Shipping country / location</label><input name="location" required><label>Notes</label><textarea name="notes" rows="2"></textarea><button class="nsv-submit" type="submit">SEND ORDER REQUEST</button></form></div>`;
  document.body.append(overlay,cartOverlay);
  const open=o=>{o.classList.add('open');document.body.style.overflow='hidden';o.querySelector('.nsv-close').focus()};
  const close=o=>{o.classList.remove('open');if(!document.querySelector('.nsv-overlay.open'))document.body.style.overflow=''};
  for(const o of [overlay,cartOverlay]){o.querySelector('.nsv-close').onclick=()=>close(o);o.addEventListener('click',e=>{if(e.target===o)close(o)})}
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){close(overlay);close(cartOverlay)}});
  let current=null,size='M',qty=1,src='';
  const title=overlay.querySelector('h2'),photo=overlay.querySelector('img'),sizes=overlay.querySelector('.nsv-sizes'),quantity=overlay.querySelector('.nsv-qty span');
  function show(card){
    const name=card.dataset.name||'ARCHIVE';
    current=catalog.get(name.toLowerCase())||{name,price:null,type:card.dataset.category||'experiment'};
    src=card.querySelector('.card__image')?.getAttribute('src')||'';
    photo.src=src;photo.alt=name;title.textContent=name;size='M';qty=1;quantity.textContent='1';
    overlay.querySelector('.nsv-description').textContent='Nate Savard / Garment / 2026';
    overlay.querySelector('.nsv-price').textContent=current.price==null?'ARCHIVE / INQUIRE':money(current.price)+' USD';
    sizes.replaceChildren();
    const garment=current.type==='garment';
    overlay.querySelector('.nsv-qty').hidden=current.price==null;
    overlay.querySelector('.nsv-add').textContent=current.price==null?'INQUIRE ABOUT THIS PIECE':'ADD TO CART';
    if(garment&&current.price!=null)['XS','S','M','L','XL','XXL'].forEach(v=>{const b=el('button',v===size?'selected':'',v);b.onclick=()=>{size=v;sizes.querySelectorAll('button').forEach(x=>x.classList.toggle('selected',x===b))};sizes.append(b)});
    open(overlay);
  }
  overlay.querySelectorAll('[data-qty]').forEach(b=>b.onclick=()=>{qty=Math.min(99,Math.max(1,qty+Number(b.dataset.qty)));quantity.textContent=qty});
  const updateBadge=()=>{const n=cart.reduce((s,x)=>s+x.qty,0);document.getElementById('ns-vault-cart-open').textContent='CART / '+n};
  overlay.querySelector('.nsv-add').onclick=()=>{
    if(!current)return;
    if(current.price==null){window.location.href='mailto:natesavard@outlook.com?subject='+encodeURIComponent('Vault inquiry: '+current.name);return}
    const id=current.name+'|'+(current.type==='garment'?size:'ONE SIZE');
    const found=cart.find(x=>x.id===id);
    if(found)found.qty+=qty;else cart.push({id,name:current.name,size:current.type==='garment'?size:'ONE SIZE',price:current.price,qty,src});
    save();updateBadge();close(overlay);showCart();
  };
  overlay.querySelector('.nsv-view-cart').onclick=()=>{close(overlay);showCart()};
  const badge=el('button');badge.id='ns-vault-cart-open';badge.onclick=showCart;document.body.append(badge);
  function showCart(){renderCart();open(cartOverlay)}
  function renderCart(){
    const host=cartOverlay.querySelector('.nsv-items');host.replaceChildren();
    cart.forEach((x,i)=>{
      const line=el('div','nsv-line'),img=el('img'),info=el('div'),name=el('strong','',x.name),sub=el('small','',x.size+' / '+money(x.price)+' / QTY '+x.qty);
      img.src=x.src;img.alt=x.name;
      const minus=el('button','', '−'),plus=el('button','', '+'),remove=el('button','', 'REMOVE');
      minus.onclick=()=>{x.qty--;if(x.qty<=0)cart.splice(i,1);save();updateBadge();renderCart()};
      plus.onclick=()=>{x.qty++;save();updateBadge();renderCart()};
      remove.onclick=()=>{cart.splice(i,1);save();updateBadge();renderCart()};
      info.append(name,sub,minus,plus,remove);line.append(img,info);host.append(line);
    });
    if(!cart.length)host.append(el('p','','Your cart is empty.'));
    cartOverlay.querySelector('.nsv-sum').textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
    cartOverlay.querySelector('.nsv-submit').disabled=!cart.length;
  }
  cartOverlay.querySelector('form').onsubmit=e=>{
    e.preventDefault();if(!cart.length)return;
    const d=new FormData(e.currentTarget),total=cart.reduce((s,x)=>s+x.price*x.qty,0);
    const lines=['NATE SAVARD VAULT — ORDER REQUEST','',`Name: ${d.get('name')}`,`Email: ${d.get('email')}`,`Location: ${d.get('location')}`,'','Items:',...cart.map(x=>`${x.name} | ${x.size} | Qty ${x.qty} | ${money(x.price*x.qty)}`),'',`Subtotal USD: ${money(total)}`,'Shipping/taxes not included. No payment collected.','',`Notes: ${d.get('notes')||''}`];
    window.location.href='mailto:natesavard@outlook.com?subject='+encodeURIComponent('Nate Savard Vault order request')+'&body='+encodeURIComponent(lines.join('\n'));
  };
  const init=()=>{
    const grid=document.querySelector('#ns-home-collection .ns-products');if(!grid)return;
    grid.addEventListener('click',e=>{if(e.target.closest('a'))return;const wrap=e.target.closest('.ns-product');if(wrap)show(wrap)});
    grid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.ns-product')){e.preventDefault();show(e.target.closest('.ns-product'))}});
    const makeFocus=()=>grid.querySelectorAll('.ns-product').forEach(w=>{w.setAttribute('aria-label','View '+(w.dataset.name||'product'))});
    makeFocus();new MutationObserver(makeFocus).observe(grid,{childList:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  updateBadge();
})();


/* Chrome NS side-tab cart styling for the existing Vault boutique cart. */
(()=>{const mount=()=>{const tab=document.getElementById('ns-vault-cart-open'),dialog=document.querySelector('.nsv-overlay:has(.nsv-drawer)'),drawer=dialog?.querySelector('.nsv-drawer');if(!tab||!dialog||!drawer)return;
const css=`#ns-vault-cart-open{position:fixed!important;right:0!important;top:44%!important;bottom:auto!important;width:54px!important;height:178px!important;border:1px solid rgba(230,221,209,.36)!important;border-right:0!important;border-radius:24px 0 0 24px!important;background:linear-gradient(110deg,#252525,#080808 55%,#252525)!important;color:#f3ede4!important;box-shadow:-9px 8px 32px rgba(0,0,0,.6),inset 2px 0 2px rgba(255,255,255,.18)!important;padding:12px 7px!important;writing-mode:vertical-rl!important;transform:none!important;letter-spacing:.19em!important;font:700 10px Georgia,serif!important;z-index:16000!important;transition:width .35s ease,background .35s ease!important}
#ns-vault-cart-open:before{content:'';position:absolute;left:50%;top:14px;bottom:14px;width:1px;background:linear-gradient(transparent,#c9bca7,transparent);opacity:.6}
#ns-vault-cart-open:hover,#ns-vault-cart-open:focus-visible{width:73px!important;outline:1px solid rgba(240,232,219,.55)!important;background:linear-gradient(110deg,#45413d,#0b0b0b 55%,#302d29)!important}
.nsv-overlay:has(.nsv-drawer){justify-content:flex-end!important;padding:0!important;background:rgba(0,0,0,.55)!important;backdrop-filter:blur(5px)!important;transition:background .35s ease}
.nsv-overlay .nsv-drawer{width:min(470px,calc(100vw - 18px))!important;height:100dvh!important;max-height:100dvh!important;border-radius:30px 0 0 30px!important;border:1px solid rgba(234,225,213,.25)!important;border-right:0!important;background:linear-gradient(145deg,#202020,#080808 52%,#121212)!important;box-shadow:-20px 0 70px rgba(0,0,0,.7)!important;padding:62px 30px 35px!important;transform:translateX(105%);transition:transform .48s cubic-bezier(.16,1,.3,1)!important}
.nsv-overlay.open .nsv-drawer{transform:translateX(0)}
.nsv-drawer .nsv-submit{border-radius:16px!important;background:#e8dfd1!important;border-color:#e8dfd1!important;color:#121212!important}
.nsv-drawer input,.nsv-drawer textarea{border-radius:10px!important}
.nsv-drawer .nsv-close{border-radius:50%!important;width:40px;height:40px;padding:0!important}
@media(max-width:600px){#ns-vault-cart-open{top:39%!important;width:43px!important;height:145px!important}.nsv-overlay .nsv-drawer{width:min(420px,95vw)!important;border-radius:22px 0 0 22px!important;padding:60px 20px 30px!important}}
@media(prefers-reduced-motion:reduce){.nsv-overlay .nsv-drawer{transition:none!important}}`;
const s=document.createElement('style');s.textContent=css;document.head.append(s);
tab.setAttribute('aria-label','Open Nate Savard shopping cart');tab.title='Open cart';};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();})();