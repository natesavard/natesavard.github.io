/* NATE SAVARD / L'ATELIER — THE STOCKROOM
   Read-only visual inventory of real existing site entries plus managed catalog.
   Clicking a piece loads its details into the EXISTING editor; publication remains manual.
   No modifications to original store HTML, cart, or Journal. */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const clean=x=>String(x||'').trim();
const safe=(value)=>{try{let u=new URL(clean(value),location.origin);return u.origin===location.origin&&['http:','https:'].includes(u.protocol)?u.pathname+u.search:''}catch{return ''}};
const num=x=>{let n=parseFloat(String(x||'').replace(/[^.\d]/g,''));return Number.isFinite(n)?n:0};
const norm=x=>clean(x).toLowerCase().replace(/[^a-z0-9]/g,'');
let stock=[],filter='all',search='',booted=false;
const create=(name,collection,image,alt,price,description,source,status='ON SITE',id='')=>({name:clean(name),collection:clean(collection)||'Archive',image:safe(image),alt:safe(alt),price:num(price),description:clean(description),source,status,id});
function add(arr,p){if(!p.name||!p.image)return;const existing=arr.find(x=>norm(x.name)===norm(p.name));if(!existing)arr.push(p);else if(p.source==='signature'&&existing.source!=='managed')Object.assign(existing,p)}
async function signature(arr){
 const r=await fetch('/envynomadix-signature-collection.html',{cache:'no-store'});if(!r.ok)throw Error('Signature collection '+r.status);
 const d=new DOMParser().parseFromString(await r.text(),'text/html');
 d.querySelectorAll('.catalogue-item[data-product],.product-card[data-shirt-viewer],.floating-garment[data-product]').forEach(el=>{
  const images=[...el.querySelectorAll('.catalogue-image img, img')].map(x=>x.getAttribute('src')).filter(Boolean);
  add(arr,create(el.dataset.product||el.querySelector('h3,.catalogue-label')?.textContent,'Signature Collection',images[0]||el.dataset.shirtViewer,images[1],el.dataset.price,el.dataset.description,'signature'));
 });
}
async function vault(arr){
 const r=await fetch('/vault.html',{cache:'no-store'});if(!r.ok)throw Error('Vault '+r.status);
 const d=new DOMParser().parseFromString(await r.text(),'text/html');
 d.querySelectorAll('#archiveGrid .card[data-name]').forEach(el=>{
  const t=el.dataset.category||'archive';const c=t==='garment'?'Vault / Garments':'Vault / '+t[0].toUpperCase()+t.slice(1);
  add(arr,create(el.dataset.name,c,el.querySelector('.card__image')?.getAttribute('src'),'','',el.querySelector('.card__type')?.textContent,'vault'));
 });
}
async function life(arr){
 const r=await fetch('/ns-unified-drop.js',{cache:'no-store'});if(!r.ok)throw Error('Life Force '+r.status);
 const t=await r.text();const m=t.match(/const products\s*=\s*(\[[\s\S]*?\]);/);if(!m)return;
 let data;try{data=JSON.parse(m[1])}catch{return}
 data.forEach(p=>add(arr,create(p.name,'Life Force Energy','/'+String(p.file||'').replace(/^\/+/,''),'','','','life')));
}
async function managed(arr){
 const r=await fetch('/atelier-catalog.json',{cache:'no-store'});if(!r.ok)throw Error('Managed catalog '+r.status);
 const data=await r.json();if(!Array.isArray(data))return;
 data.forEach(p=>{
  const e=arr.find(x=>norm(x.name)===norm(p.name));const item=create(p.name,p.collection,p.image,p.alt,p.price,p.description,'managed',p.visible===false?'HIDDEN / MANAGED':'MANAGED',p.id);
  if(e){Object.assign(e,{...item,image:item.image||e.image,alt:item.alt||e.alt,source:e.source,id:p.id,status:item.status})}
  else add(arr,item);
 });
}
function mount(){
 let wrap=$('ns-stockroom');if(wrap)return wrap;
 wrap=document.createElement('section');wrap.id='ns-stockroom';wrap.innerHTML=`
  <div class="ns-st-top"><div><div class="eyebrow">HOUSE INVENTORY / ALL EXISTING PIECES</div><h2>The Stockroom.</h2></div><button class="btn secondary" id="ns-st-refresh" type="button">↻ REFRESH</button></div>
  <div class="ns-st-tools"><input id="ns-st-search" type="search" placeholder="Search by piece, collection or detail…" aria-label="Search inventory"><select id="ns-st-filter" aria-label="Filter collection"><option value="all">All collections</option></select></div>
  <div class="ns-st-count" id="ns-st-count">Loading existing collections…</div><div class="ns-st-grid" id="ns-st-grid"></div>
  <p class="ns-st-help">Select any piece to load its real site photo, name, and available details into the editor below. <b>Save Piece</b> then <b>Publish Catalog</b> only when you want a managed listing. Original hardcoded storefront cards are preserved; editing here does not automatically replace or delete their original copies.</p>`;
 const layout=$('workspace')?.querySelector('.layout');if(!layout)return null;layout.before(wrap);
 $('ns-st-search').oninput=e=>{search=e.target.value.trim().toLowerCase();draw()};
 $('ns-st-filter').onchange=e=>{filter=e.target.value;draw()};
 $('ns-st-refresh').onclick=refresh;
 return wrap;
}
function draw(){
 if(!$('ns-stockroom'))return;
 const options=[...new Set(stock.map(x=>x.collection))].sort();const select=$('ns-st-filter');select.replaceChildren(new Option('All collections','all'),...options.map(x=>new Option(x,x)));select.value=options.includes(filter)?filter:'all';
 const selected=stock.filter(p=>(select.value==='all'||p.collection===select.value)&&(!search||(p.name+' '+p.collection+' '+p.description).toLowerCase().includes(search)));
 $('ns-st-count').textContent=`${selected.length} / ${stock.length} PIECES  •  ${stock.filter(x=>x.status.includes('MANAGED')).length} MANAGED`;
 const grid=$('ns-st-grid');grid.replaceChildren();
 if(!selected.length){const p=document.createElement('p');p.textContent='Nothing matches this view.';p.className='ns-st-help';grid.append(p)}
 selected.forEach(p=>{
  const btn=document.createElement('button');btn.type='button';btn.className='ns-st-card';btn.setAttribute('aria-label','Edit '+p.name);
  const pic=document.createElement('div');pic.className='ns-st-photo';
  const img=new Image;img.src=p.image;img.alt=p.name;img.loading='lazy';pic.append(img);
  if(p.alt){const other=new Image;other.src=p.alt;other.alt=p.name+' alternate image';other.loading='lazy';other.className='ns-st-alt';pic.append(other)}
  const tag=document.createElement('span');tag.className='ns-st-badge';tag.textContent=p.status;pic.append(tag);
  const info=document.createElement('div');info.className='ns-st-info';
  const name=document.createElement('strong');name.textContent=p.name;
  const category=document.createElement('small');category.textContent=p.collection;
  const price=document.createElement('small');price.textContent=p.price?'$'+p.price.toFixed(2):'Price not set';
  info.append(name,category,price);btn.append(pic,info);btn.onclick=()=>edit(p);grid.append(btn);
 });
}
function edit(p){
 // Use existing editor's click handlers to preserve its active ID when managed.
 $('filter').value='all';$('filter').dispatchEvent(new Event('change'));
 const existing=[...$('catalog').querySelectorAll('.catalog-card')].find(b=>norm(b.querySelector('strong')?.textContent)===norm(p.name));
 if(existing){existing.click();$('formHeading').scrollIntoView({behavior:'smooth',block:'start'});return}
 // Copy site-only items into a NEW, not-yet-saved editor form; never silently publish.
 $('add').click();
 for(const [id,value] of Object.entries({name:p.name,collection:p.collection,price:p.price||'',description:p.description,image:p.image,alt:p.alt}))$(id).value=value;
 $('home').checked=false;$('signature').checked=p.source==='signature'||p.source==='life';$('vault').checked=p.source==='vault';$('visible').checked=true;
 for(const [id,path] of [['preview1',p.image],['preview2',p.alt]]){let el=$(id);if(path){el.src=path;el.classList.remove('empty')}else{el.removeAttribute('src');el.classList.add('empty')}}
 $('formHeading').textContent=p.name;$('formStatus').textContent='Existing site piece copied into the editor. It is not saved or published yet.';
 $('formHeading').scrollIntoView({behavior:'smooth',block:'start'});
}
async function refresh(){
 if(!mount())return;
 $('ns-st-count').textContent='Reading existing website products…';const list=[];
 const settled=await Promise.allSettled([signature(list),vault(list),life(list)]);
 let errors=settled.filter(x=>x.status==='rejected').map(x=>String(x.reason));
 try{await managed(list)}catch(e){errors.push(String(e))}
 stock=list;draw();if(errors.length){$('ns-st-count').textContent+=' • Some sources unavailable';console.warn('Stockroom inventory:',errors)}
}
function start(){if(booted||!$('workspace')||$('workspace').classList.contains('hidden'))return;booted=true;refresh()}
const workspace=$('workspace');if(workspace){new MutationObserver(start).observe(workspace,{attributes:true,attributeFilter:['class']});start()}
})();
