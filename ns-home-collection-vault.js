
(() => {
  const PRODUCTS = [
    // KEEP YOUR EXISTING PRODUCTS ARRAY HERE — copy it from the current file.
  ];

  const catalog = new Map(PRODUCTS.map(([name, price, type, url]) => [
    name.toLowerCase(), { name, price, type, url }
  ]));

  const key = 'ns-vault-boutique-cart-v1';
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem(key) || '[]');
    if (!Array.isArray(cart)) cart = [];
  } catch {}

  const money = n => '$' + Number(n).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const save = () => {
    try { localStorage.setItem(key, JSON.stringify(cart)); } catch {}
  };

  const el = (tag, cls, text) => {
    const x = document.createElement(tag);
    if (cls) x.className = cls;
    if (text !== undefined) x.textContent = text;
    return x;
  };

  const style = el('style');
  style.textContent = `
    #ns-vault-cart-open {
      position:fixed; right:0; top:44%; z-index:16000;
      width:54px; height:178px; padding:12px 7px;
      border:1px solid rgba(215,171,82,.22); border-right:0;
      border-radius:22px 0 0 22px;
      background:linear-gradient(180deg,rgba(10,6,4,.96),rgba(0,0,0,.98));
      color:#f6e8d0; box-shadow:-9px 8px 32px rgba(0,0,0,.6);
      writing-mode:vertical-rl; letter-spacing:.19em;
      font:700 10px 'Courier New',monospace; cursor:pointer;
      transition:width .35s ease,border-color .24s ease;
    }
    #ns-vault-cart-open:before {
      content:''; position:absolute; left:50%; top:14px; bottom:14px;
      width:1px; background:linear-gradient(transparent,rgba(215,171,82,.65),transparent);
    }
    #ns-vault-cart-open:hover { width:68px; }

    .nsv-overlay {
      position:fixed; inset:0; z-index:15000;
      display:none; align-items:stretch; justify-content:flex-end;
      padding:0; color:#f3f0e8; font-family:Arial,sans-serif;
      background:rgba(0,0,0,.55); backdrop-filter:blur(5px);
    }
    .nsv-overlay.open { display:flex; }

    .nsv-panel {
      position:relative; width:min(960px,100%); max-height:93vh;
      overflow:auto; background:#0a0a0a; border:1px solid #555;
      display:grid; grid-template-columns:1.1fr .9fr;
      box-shadow:0 25px 90px #000;
    }
    .nsv-photo { background:#161616; min-height:350px; display:grid; place-items:center; }
    .nsv-photo img { display:block; width:100%; height:100%; max-height:80vh; object-fit:contain; }
    .nsv-content { padding:46px 32px; }
    .nsv-overline { color:#baff55; font:10px 'Courier New',monospace; letter-spacing:.2em; }
    .nsv-content h2 { font-size:clamp(30px,4vw,54px); line-height:.95; text-transform:uppercase; letter-spacing:-.05em; margin:18px 0; }
    .nsv-content p,.nsv-drawer p { font:12px/1.7 'Courier New',monospace; color:#aaa; }
    .nsv-price { font-size:26px; margin:15px 0; }
    .nsv-sizes { display:flex; flex-wrap:wrap; gap:7px; margin:20px 0; }
    .nsv-overlay button,.nsv-overlay a {
      border:1px solid #666; background:transparent; color:#f4f4f4;
      padding:11px 14px; cursor:pointer;
      font:11px 'Courier New',monospace; text-transform:uppercase; text-decoration:none;
    }
    .nsv-overlay button.selected,.nsv-overlay button.primary {
      background:#baff55; color:#090909; border-color:#baff55;
    }
    .nsv-overlay .nsv-close {
      position:absolute; top:10px; right:12px; z-index:2;
      font-size:25px; border:0; background:#111;
    }
    .nsv-qty { display:flex; align-items:center; gap:15px; margin:18px 0; }

    /* Originals-inspired cart drawer */
    .nsv-overlay:has(.nsv-drawer) {
      opacity:0; visibility:hidden; pointer-events:none;
      background:rgba(0,0,0,0);
      transition:opacity .45s ease,background .45s ease,visibility 0s linear .5s;
    }
    .nsv-overlay.open:has(.nsv-drawer) {
      opacity:1; visibility:visible; pointer-events:auto;
      background:rgba(0,0,0,.65);
      transition:opacity .45s ease,background .45s ease,visibility 0s;
    }
    .nsv-drawer {
      position:absolute; top:0; right:0;
      width:min(440px,92vw); height:100%; height:100dvh;
      max-height:none; overflow-y:auto;
      padding:22px 20px 30px;
      background:linear-gradient(180deg,rgba(10,6,4,.96),rgba(0,0,0,.98));
      border:0; border-left:1px solid rgba(215,171,82,.14);
      box-shadow:-20px 0 50px rgba(0,0,0,.42);
      transform:translateX(100%); opacity:0;
      transition:transform .45s cubic-bezier(.16,.9,.2,1),opacity .45s ease;
    }
    .nsv-overlay.open .nsv-drawer { transform:translateX(0); opacity:1; }

    .nsv-cart-header {
      display:flex; justify-content:space-between; align-items:flex-start;
      gap:16px; margin-bottom:22px;
    }
    .nsv-cart-heading { flex:1; min-width:0; }
    .nsv-cart-heading .nsv-overline {
      color:rgba(215,171,82,.76); margin:0 0 9px;
    }
    .nsv-cart-heading h2 {
      margin:0; color:#f6e8d0;
      font:400 1rem 'Courier New',monospace;
      letter-spacing:.26em; text-transform:uppercase; line-height:1.5;
    }
    .nsv-overlay .nsv-cart-monogram {
      display:grid; place-items:center; flex:0 0 44px;
      width:44px; height:44px; padding:5px;
      border:1px solid rgba(215,171,82,.14); border-radius:50%;
      background:rgba(255,255,255,.02);
    }
    .nsv-cart-monogram img { width:100%; height:100%; object-fit:contain; }
    .nsv-overlay .nsv-cart-close {
      position:relative; top:auto; right:auto;
      flex:0 0 44px; width:44px; height:44px; padding:0;
      border:1px solid rgba(215,171,82,.14); border-radius:50%;
      background:rgba(255,255,255,.02); color:#f6e8d0;
      font-size:18px; line-height:1;
    }
    .nsv-line {
      display:grid; grid-template-columns:92px 1fr; gap:14px;
      padding:12px 0 16px;
      border-bottom:1px solid rgba(215,171,82,.12);
    }
    .nsv-line img {
      max-width:100%; max-height:108px; min-height:110px;
      object-fit:contain;
      background:radial-gradient(circle at center,rgba(215,171,82,.1),transparent 68%);
    }
    .nsv-line strong {
      display:block; color:#f6e8d0;
      font:.8rem 'Courier New',monospace;
      letter-spacing:.16em; line-height:1.6; text-transform:uppercase;
    }
    .nsv-line small {
      display:block; margin-top:6px;
      color:rgba(215,171,82,.76);
      font:.68rem 'Courier New',monospace;
      letter-spacing:.18em; line-height:1.9; text-transform:uppercase;
    }
    .nsv-line button {
      border:0; background:transparent; color:rgba(246,230,202,.78);
      padding:0; margin:10px 12px 0 0;
      font:.62rem 'Courier New',monospace;
      letter-spacing:.16em; text-transform:uppercase;
    }
    .nsv-total {
      display:flex; justify-content:space-between; margin:10px 0 0;
      color:rgba(246,230,202,.82);
      font:.68rem 'Courier New',monospace;
      letter-spacing:.16em; line-height:1.8; text-transform:uppercase;
    }
    .nsv-drawer>p { color:rgba(246,230,202,.7); }
    .nsv-drawer .nsv-form {
      display:grid; gap:12px; margin-top:22px; padding-top:18px;
      border-top:1px solid rgba(215,171,82,.12);
    }
    .nsv-drawer label {
      display:block; margin:0 0 6px;
      color:rgba(215,171,82,.7);
      font:.62rem 'Courier New',monospace;
      letter-spacing:.22em; text-transform:uppercase;
    }
    .nsv-drawer input,.nsv-drawer textarea {
      box-sizing:border-box; width:100%; padding:12px;
      border:1px solid rgba(215,171,82,.14);
      background:rgba(10,6,4,.7); color:#f6e8d0;
      font:.78rem 'Courier New',monospace; letter-spacing:.08em;
    }
    .nsv-drawer .nsv-submit {
      width:100%; min-height:42px; margin-top:8px;
      border:1px solid rgba(215,171,82,.16);
      background:linear-gradient(180deg,rgba(214,168,79,.18),rgba(214,168,79,.08));
      color:#f6e8d0; font:.68rem 'Courier New',monospace;
      letter-spacing:.18em; text-transform:uppercase;
    }
    .nsv-drawer .nsv-submit:disabled { opacity:.35; cursor:not-allowed; }

    .nsv-line button { padding:6px 9px; margin:3px; }
    .nsv-drawer label { display:block; }
    #archiveGrid .card__image-wrap { cursor:pointer; }
    #archiveGrid .card__image-wrap:focus-visible { outline:2px solid #baff55; outline-offset:3px; }

    @media(max-width:650px) {
      .nsv-panel { grid-template-columns:1fr; }
      .nsv-photo { min-height:220px; }
      .nsv-photo img { max-height:42vh; }
      .nsv-content { padding:26px 20px; }
    }
    @media(max-width:600px) {
      #ns-vault-cart-open { top:39%; width:43px; height:145px; }
      .nsv-drawer { width:min(420px,95vw); padding:22px 20px 30px; }
    }
    @media(prefers-reduced-motion:reduce) {
      .nsv-overlay:has(.nsv-drawer),.nsv-overlay .nsv-drawer { transition:none; }
    }
  `;
  document.head.appendChild(style);

  const overlay = el('div','nsv-overlay');
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  overlay.innerHTML = `
    <div class="nsv-panel">
      <button class="nsv-close" aria-label="Close">×</button>
      <div class="nsv-photo"><img alt=""></div>
      <div class="nsv-content">
        <div class="nsv-overline">NATE SAVARD / VAULT / WORLDWIDE</div>
        <h2></h2><p class="nsv-description"></p>
        <div class="nsv-price"></div><div class="nsv-sizes"></div>
        <div class="nsv-qty"><button data-qty="-1">−</button><span>1</span><button data-qty="1">+</button></div>
        <button class="primary nsv-add">ADD TO CART</button>
        <button class="nsv-view-cart">VIEW CART</button>
        <p class="nsv-notice">Prices in USD. Availability and shipping confirmed before payment.</p>
      </div>
    </div>`;

  const cartOverlay = el('div','nsv-overlay');
  cartOverlay.setAttribute('role','dialog');
  cartOverlay.setAttribute('aria-modal','true');
  cartOverlay.innerHTML = `
    <div class="nsv-drawer">
      <header class="nsv-cart-header">
        <button class="nsv-cart-monogram" type="button" aria-label="Minimize cart" title="Minimize cart">
          <img src="/assets/ns-chrome-monogram.webp" alt="NS monogram">
        </button>
        <div class="nsv-cart-heading">
          <div class="nsv-overline">NATE SAVARD / WORLDWIDE</div>
          <h2>YOUR CART</h2>
        </div>
        <button class="nsv-close nsv-cart-close" aria-label="Close cart" type="button">×</button>
      </header>
      <div class="nsv-items"></div>
      <div class="nsv-total"><span>SUBTOTAL USD</span><span class="nsv-sum"></span></div>
      <p>Order request only. No payment is collected here. Shipping, availability and final price are confirmed by email.</p>
      <form class="nsv-form">
        <label>Your name</label><input name="name" required autocomplete="name">
        <label>Email</label><input name="email" type="email" required autocomplete="email">
        <label>Shipping country / location</label><input name="location" required>
        <label>Notes</label><textarea name="notes" rows="2"></textarea>
        <button class="nsv-submit" type="submit">SEND ORDER REQUEST</button>
      </form>
    </div>`;

  document.body.append(overlay,cartOverlay);

  const open = o => {
    o.classList.add('open');
    document.body.style.overflow='hidden';
    o.querySelector('.nsv-close').focus();
  };
  const close = o => {
    o.classList.remove('open');
    if (!document.querySelector('.nsv-overlay.open')) document.body.style.overflow='';
  };

  for (const o of [overlay,cartOverlay]) {
    o.querySelector('.nsv-close').onclick=()=>close(o);
    o.addEventListener('click',e=>{ if(e.target===o) close(o); });
  }
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){ close(overlay); close(cartOverlay); }
  });

  cartOverlay.querySelector('.nsv-cart-monogram')
    .addEventListener('click',()=>close(cartOverlay));

  let current=null,size='M',qty=1,src='';
  const title=overlay.querySelector('h2');
  const photo=overlay.querySelector('img');
  const sizes=overlay.querySelector('.nsv-sizes');
  const quantity=overlay.querySelector('.nsv-qty span');

  function show(card) {
    const name=card.dataset.name||'ARCHIVE';
    current=catalog.get(name.toLowerCase())||{
      name,price:null,type:card.dataset.category||'experiment'
    };
    src=card.querySelector('.card__image')?.getAttribute('src')||'';
    photo.src=src; photo.alt=name; title.textContent=name;
    size='M'; qty=1; quantity.textContent='1';
    overlay.querySelector('.nsv-description').textContent='Nate Savard / Garment / 2026';
    overlay.querySelector('.nsv-price').textContent=
      current.price==null?'ARCHIVE / INQUIRE':money(current.price)+' USD';
    sizes.replaceChildren();

    const garment=current.type==='garment';
    overlay.querySelector('.nsv-qty').hidden=current.price==null;
    overlay.querySelector('.nsv-add').textContent=
      current.price==null?'INQUIRE ABOUT THIS PIECE':'ADD TO CART';

    if(garment&&current.price!=null) {
      ['XS','S','M','L','XL','XXL'].forEach(v=>{
        const b=el('button',v===size?'selected':'',v);
        b.onclick=()=>{
          size=v;
          sizes.querySelectorAll('button').forEach(x=>x.classList.toggle('selected',x===b));
        };
        sizes.append(b);
      });
    }
    open(overlay);
  }

  overlay.querySelectorAll('[data-qty]').forEach(b=>{
    b.onclick=()=>{
      qty=Math.min(99,Math.max(1,qty+Number(b.dataset.qty)));
      quantity.textContent=qty;
    };
  });

  const updateBadge=()=>{
    const n=cart.reduce((s,x)=>s+x.qty,0);
    document.getElementById('ns-vault-cart-open').textContent='CART / '+n;
  };

  overlay.querySelector('.nsv-add').onclick=()=>{
    if(!current)return;
    if(current.price==null) {
      window.location.href='mailto:natesavard@outlook.com?subject='+
        encodeURIComponent('Vault inquiry: '+current.name);
      return;
    }
    const id=current.name+'|'+(current.type==='garment'?size:'ONE SIZE');
    const found=cart.find(x=>x.id===id);
    if(found)found.qty+=qty;
    else cart.push({
      id,name:current.name,size:current.type==='garment'?size:'ONE SIZE',
      price:current.price,qty,src
    });
    save(); updateBadge(); close(overlay); showCart();
  };

  overlay.querySelector('.nsv-view-cart').onclick=()=>{
    close(overlay); showCart();
  };

  const badge=el('button');
  badge.id='ns-vault-cart-open';
  badge.onclick=showCart;
  document.body.append(badge);

  function showCart(){ renderCart(); open(cartOverlay); }

  function renderCart() {
    const host=cartOverlay.querySelector('.nsv-items');
    host.replaceChildren();

    cart.forEach((x,i)=>{
      const line=el('div','nsv-line');
      const img=el('img');
      const info=el('div');
      const name=el('strong','',x.name);
      const sub=el('small','',x.size+' / '+money(x.price)+' / QTY '+x.qty);
      img.src=x.src; img.alt=x.name;

      const minus=el('button','','−');
      const plus=el('button','','+');
      const remove=el('button','','REMOVE');

      minus.onclick=()=>{
        x.qty--;
        if(x.qty<=0)cart.splice(i,1);
        save();updateBadge();renderCart();
      };
      plus.onclick=()=>{x.qty++;save();updateBadge();renderCart();};
      remove.onclick=()=>{cart.splice(i,1);save();updateBadge();renderCart();};

      info.append(name,sub,minus,plus,remove);
      line.append(img,info);
      host.append(line);
    });

    if(!cart.length)host.append(el('p','','Your cart is empty.'));
    cartOverlay.querySelector('.nsv-sum').textContent=
      money(cart.reduce((s,x)=>s+x.price*x.qty,0));
    cartOverlay.querySelector('.nsv-submit').disabled=!cart.length;
  }

  cartOverlay.querySelector('form').onsubmit=e=>{
    e.preventDefault();
    if(!cart.length)return;
    const d=new FormData(e.currentTarget);
    const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
    const lines=[
      'NATE SAVARD VAULT — ORDER REQUEST','',
      `Name: ${d.get('name')}`,
      `Email: ${d.get('email')}`,
      `Location: ${d.get('location')}`,'','Items:',
      ...cart.map(x=>`${x.name} | ${x.size} | Qty ${x.qty} | ${money(x.price*x.qty)}`),
      '',`Subtotal USD: ${money(total)}`,
      'Shipping/taxes not included. No payment collected.','',
      `Notes: ${d.get('notes')||''}`
    ];
    window.location.href='mailto:natesavard@outlook.com?subject='+
      encodeURIComponent('Nate Savard Vault order request')+
      '&body='+encodeURIComponent(lines.join('\n'));
  };

  const init=()=>{
    const grid=document.querySelector('#ns-home-collection .ns-products');
    if(!grid)return;
    grid.addEventListener('click',e=>{
      if(e.target.closest('a'))return;
      const wrap=e.target.closest('.ns-product');
      if(wrap)show(wrap);
    });
    grid.addEventListener('keydown',e=>{
      if((e.key==='Enter'||e.key===' ')&&e.target.matches('.ns-product')) {
        e.preventDefault();show(e.target.closest('.ns-product'));
      }
    });
    const makeFocus=()=>grid.querySelectorAll('.ns-product').forEach(w=>{
      w.setAttribute('aria-label','View '+(w.dataset.name||'product'));
    });
    makeFocus();
    new MutationObserver(makeFocus).observe(grid,{childList:true});
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();

  updateBadge();
})();
