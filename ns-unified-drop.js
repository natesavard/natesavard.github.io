/* Nate Savard — Life Force Energy homepage drop.
 * Keeps homepage drop and expands existing Vault archive with LIFE FORCE ENERGY designs.
 * Does not remove existing catalog items or prices.
 */
(()=>{
'use strict';
const products=[
  {
    "name": "Envy Chrome Cross V-Neck",
    "file": "ns-drop-vneck.webp",
    "category": "garment"
  },
  {
    "name": "Nate Savard Red Logo Tee",
    "file": "nls-life-force-red-logo.webp",
    "category": "garment"
  },
  {
    "name": "Envy Nomadix Chrome Cross V-Neck",
    "file": "nls-life-force-chrome-cross.webp",
    "category": "garment"
  },
  {
    "name": "Savard Blue Venus Flytrap Tee",
    "file": "nls-life-force-blue-venus.webp",
    "category": "garment"
  },
  {
    "name": "Nate Savard Earth Tone Lookbook",
    "file": "nls-life-force-earth-tone.webp",
    "category": "garment"
  },
  {
    "name": "Savard 85 Vintage Racing Long Sleeve",
    "file": "nls-life-force-speedway-85.webp",
    "category": "garment"
  },
  {
    "name": "Nate Savard Distressed Black Tee",
    "file": "nls-life-force-distressed-black.webp",
    "category": "garment"
  },
  {
    "name": "Nate Savard Venus Flytrap Lookbook",
    "file": "nls-life-force-venus-lookbook.webp",
    "category": "garment"
  },
  {
    "name": "Savard Lost Dimensions Archive I",
    "file": "nls-life-force-lost-dimensions-i.webp",
    "category": "artwork"
  },
  {
    "name": "Savard Lost Dimensions Archive II",
    "file": "nls-life-force-lost-dimensions-ii.webp",
    "category": "artwork"
  },
  {
    "name": "Death Is Not The End / NS",
    "file": "nls-life-force-consciousness.webp",
    "category": "artwork"
  }
];
const vaultProducts=[{"name": "Envy Chrome Cross V-Neck", "file": "ns-drop-vneck.webp", "category": "garment"}, {"name": "Savard 85 Blue Tee", "file": "ns-drop-blue85.webp", "category": "garment"}, {"name": "NS Teal Chrome Hoodie", "file": "ns-drop-tealchrome.webp", "category": "garment"}, {"name": "Psychokinesis Pro Tour Tee", "file": "ns-drop-psychokinesis.webp", "category": "garment"}, {"name": "Distressed Mint NS Hoodie", "file": "ns-drop-minthood.webp", "category": "garment"}, {"name": "Nate Savard Layered Blue Tee", "file": "ns-drop-layered.webp", "category": "garment"}, {"name": "Speedway 85 Racing Jersey", "file": "ns-drop-racing.webp", "category": "garment"}, {"name": "Speedway Chrome Ashtray", "file": "ns-drop-ashtray.webp", "category": "object"}];
const init=()=>{
 if(document.getElementById('ns-unified-drop'))return;
 const grid=document.querySelector('#archiveGrid');
 const home=document.querySelector('#ns-home-collection');
 const style=document.createElement('style');style.textContent=`
 #ns-unified-drop{position:relative;z-index:2;width:min(1240px,calc(100% - 32px));margin:70px auto;padding:28px 0 65px;border-top:1px solid rgba(211,184,142,.25);color:#e9e0d0}
 #ns-unified-drop h2{font:400 clamp(32px,5vw,64px)/1.15 Georgia,serif;letter-spacing:.035em;text-transform:uppercase;margin:12px 0 12px}
 #ns-unified-drop .nsd-kicker{font:10px/1.6 'Courier New',monospace;letter-spacing:.38em;color:#c9a77a}
 #ns-unified-drop .nsd-sub{font:12px/1.9 'Courier New',monospace;letter-spacing:.14em;color:#c9bdb3;word-break:normal}
 #ns-unified-drop .nsd-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:15px;margin-top:26px}
 #ns-unified-drop .nsd-card{min-width:0}
 #ns-unified-drop .nsd-image{width:100%;aspect-ratio:4/5;display:block;object-fit:contain;background:#141313;border:1px solid rgba(201,167,122,.2);border-radius:4px}
 #ns-unified-drop .nsd-name{font:11px/1.5 'Courier New',monospace;letter-spacing:.07em;text-transform:uppercase;margin:10px 0 5px}
 #ns-unified-drop .nsd-inquiry{font:10px 'Courier New',monospace;color:#c9a77a;text-decoration:underline;text-underline-offset:3px}
 @media(max-width:700px){#ns-unified-drop .nsd-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}#ns-unified-drop{margin:42px auto}#ns-unified-drop .nsd-name{font-size:10px}#ns-unified-drop .nsd-sub{font-size:10px}}
 `;document.head.append(style);
 // Preserve exactly the pre-existing Vault additions, rather than changing that page.
 if(grid){
   const existing=[...grid.querySelectorAll('[data-name]')].map(x=>x.dataset.name.toLowerCase());
   [...vaultProducts, ...products.slice(1)].forEach(p=>{
    if(existing.some(n=>n===p.name.toLowerCase()||n.includes(p.name.toLowerCase())))return;
    const card=document.createElement('article');card.className='card';card.dataset.category=p.category==='object'?'symbol':p.category==='artwork'?'experiment':'garment';card.dataset.name=p.name;card.dataset.year='2026';
    const wrap=document.createElement('div');wrap.className='card__image-wrap';
    const image=document.createElement('img');image.className='card__image';image.src='/'+p.file;image.alt=p.name;image.loading='lazy';wrap.append(image);
    const meta=document.createElement('div');meta.className='card__meta';
    const nameWrap=document.createElement('div');const name=document.createElement('h2');name.className='card__name';name.textContent=p.name;
    const type=document.createElement('p');type.className='card__type';type.textContent=p.category==='object'?'Object / design archive':p.category==='artwork'?'Artwork / visual study':'Garment / design archive';nameWrap.append(name,type);
    const year=document.createElement('div');year.className='card__year';year.textContent='2026';meta.append(nameWrap,year);
    const inquiry=document.createElement('a');inquiry.className='card__buy';inquiry.href='mailto:natesavard@outlook.com?subject='+encodeURIComponent(p.name+' inquiry');inquiry.textContent='Private inquiry';
    card.append(wrap,meta,inquiry);grid.append(card);
   });
   const count=document.querySelector('#archiveCount');if(count)count.textContent=grid.querySelectorAll('.card').length+' archived designs';
   return;
 }
 const section=document.createElement('section');section.id='ns-unified-drop';
 const kicker=document.createElement('p');kicker.className='nsd-kicker';kicker.textContent='N L S M 85';
 const heading=document.createElement('h2');heading.textContent='LIFE FORCE ENERGY';
 const sub=document.createElement('p');sub.className='nsd-sub';sub.textContent='ロスト・ディメンションズ / インソムニア';
 const tiles=document.createElement('div');tiles.className='nsd-grid';
 products.forEach(p=>{
  const card=document.createElement('article');card.className='nsd-card';
  const image=document.createElement('img');image.className='nsd-image';image.src='/'+p.file;image.alt=p.name;image.loading='lazy';
  const title=document.createElement('div');title.className='nsd-name';title.textContent=p.name;
  const link=document.createElement('a');link.className='nsd-inquiry';link.textContent='Private inquiry ↗';link.href='mailto:natesavard@outlook.com?subject='+encodeURIComponent(p.name+' inquiry');
  card.append(image,title,link);tiles.append(card);
 });
 section.append(kicker,heading,sub,tiles);
 if(home)home.insertAdjacentElement('afterend',section);
 else {const anchor=document.querySelector('#releases');if(anchor)anchor.insertAdjacentElement('afterend',section);}
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();


/* ENVYNOMADIX REBIRTH — TOP PHOTOGRAPHIC COLLAGE ONLY
   Preserves every existing page section and all LIFE FORCE ENERGY galleries.
   Activated exclusively on /envynomadixrebirth.html. */
(()=>{
  'use strict';
  if (!/\/(?:envynomadixrebirth\.html)$/i.test(window.location.pathname)) return;
  const photos = [
    ['.rebirth-stack .rebirth-photo-main', '/rebirth-hero-01-beach.webp'],
    ['.rebirth-stack .rebirth-photo-second', '/rebirth-hero-02-purple.webp'],
    ['.rebirth-stack .rebirth-photo-third', '/rebirth-hero-03-portrait.webp'],
    ['.rebirth-stack .rebirth-photo-fourth', '/rebirth-hero-04-video-still.webp']
  ];
  function replacePhotos(){
    for(const [selector, path] of photos){
      const img=document.querySelector(selector);
      if(!img)continue;
      img.src=path;
      img.removeAttribute('srcset');
      img.decoding='async';
      img.alt='Envynomadix Rebirth campaign photograph';
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',replacePhotos,{once:true});
  else replacePhotos();
})();
