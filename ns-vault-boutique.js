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
    const name=card.dataset.name||card.querySelector('.card__name')?.textContent||'ARCHIVE';
    current=catalog.get(name.toLowerCase())||{name,price:null,type:card.dataset.category||'experiment'};
    src=card.querySelector('.card__image')?.getAttribute('src')||'';
    photo.src=src;photo.alt=name;title.textContent=name;size='M';qty=1;quantity.textContent='1';
    overlay.querySelector('.nsv-description').textContent=card.querySelector('.card__type')?.textContent||'Archive study';
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
    const grid=document.getElementById('archiveGrid');if(!grid)return;
    grid.addEventListener('click',e=>{if(e.target.closest('a'))return;const wrap=e.target.closest('.card__image-wrap');if(wrap)show(wrap.closest('.card'))});
    grid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.card__image-wrap')){e.preventDefault();show(e.target.closest('.card'))}});
    const makeFocus=()=>grid.querySelectorAll('.card__image-wrap').forEach(w=>{w.tabIndex=0;w.setAttribute('role','button');w.setAttribute('aria-label','View '+(w.closest('.card')?.dataset.name||'product'))});
    makeFocus();new MutationObserver(makeFocus).observe(grid,{childList:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  updateBadge();
})();
