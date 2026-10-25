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
  #ns-home-collection h2{font:700 clamp(42px,7vw,100px)/.87 Impact,'Arial Narrow',sans-serif;letter-spacing:-.045em;text-transform:uppercase;margin:18px 0 28px}
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
   ['SPEEDWAY 85 / RACING JERSEY','ns-envy-05.webp'],
   ['VENUS FLYTRAP / DISTRESSED','ns-envy-01.webp'],
   ['NATE SAVARD / RED LOGO','ns-envy-03.webp'],
   ['ALIEN GRAPHIC / ARCHIVE','ns-envy-09.webp'],
   ['DISTRESSED STREETWEAR','ns-envy-02.webp'],
   ['FW25 / THE ARRIVAL','ns-envy-08.webp']
  ];
  const intro=document.createElement('div');intro.innerHTML='<p class="ns-kicker">NATE SAVARD / ORIGINALS / WORLDWIDE</p><h2>THE COLLECTION.</h2><p class="ns-intro">Distressed garments, racing heritage, and objects for a different reality. A selection from the Nate Savard design archive.</p>';section.append(intro);
  const grid=document.createElement('div');grid.className='ns-products';
  products.forEach(([name,src])=>{const a=document.createElement('a');a.className='ns-product';a.href='/vault.html';const box=document.createElement('div');box.className='ns-image';const img=document.createElement('img');img.src='/'+src;img.alt=name;img.loading='lazy';box.append(img);const title=document.createElement('div');title.className='ns-name';title.textContent=name;const sub=document.createElement('div');sub.className='ns-label';sub.textContent='EXPLORE IN THE VAULT ↗';a.append(box,title,sub);grid.append(a)});section.append(grid);
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