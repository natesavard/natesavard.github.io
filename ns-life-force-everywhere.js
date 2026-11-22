/* NATE SAVARD — LIFE FORCE ENERGY supplemental collection for other garment pages.
   Adds selected designs without replacing existing products or altering checkout. */
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

const init=()=>{
 if(document.querySelector('#ns-life-force-other-pages')||document.querySelector('#ns-unified-drop'))return;
 const page=location.pathname.toLowerCase();
 if(/journal|chapter|hippiewhip|release-studio|upload/.test(page))return;
 const target=document.querySelector('#archiveGrid') || document.querySelector('.after-enter-world') || document.querySelector('#ns-envy-edit') || document.querySelector('#ns-home-collection') || document.querySelector('.collection-grid') || document.querySelector('main');
 if(!target)return;
 if(document.querySelector('#archiveGrid')){
   // This path is already handled by ns-unified-drop.js on Vault.
   if(document.querySelector('script[src*="ns-unified-drop.js"]'))return;
 }
 const style=document.createElement('style'); style.textContent=`
 #ns-life-force-other-pages{width:min(1200px,calc(100% - 36px));margin:64px auto 100px;padding:30px 0 0;border-top:1px solid rgba(225,195,154,.25);color:#eadfce;position:relative;z-index:3}
 #ns-life-force-other-pages .lf-kicker{font:10px 'Courier New',monospace;letter-spacing:.3em;color:#c9a77a}
 #ns-life-force-other-pages h2{font:400 clamp(36px,6vw,82px)/1.05 Georgia,serif;letter-spacing:.02em;margin:14px 0;color:#eadfce}
 #ns-life-force-other-pages .lf-sub{font:11px/1.8 'Courier New',monospace;letter-spacing:.08em;color:#cfb8aa;margin:12px 0 28px}
 #ns-life-force-other-pages .lf-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
 #ns-life-force-other-pages .lf-card{min-width:0;margin:0}
 #ns-life-force-other-pages .lf-card img{width:100%;height:auto;aspect-ratio:4/5;object-fit:contain;background:#131313;border:1px solid rgba(225,195,154,.18);display:block}
 #ns-life-force-other-pages .lf-card figcaption{font:11px/1.6 'Courier New',monospace;text-transform:uppercase;letter-spacing:.06em;padding:12px 0;color:#eadfce}
 #ns-life-force-other-pages .lf-card a{font:10px 'Courier New',monospace;color:#c9a77a;text-decoration:underline;text-underline-offset:4px}
 @media(max-width:850px){#ns-life-force-other-pages .lf-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
 @media(max-width:420px){#ns-life-force-other-pages .lf-grid{gap:10px}#ns-life-force-other-pages .lf-card figcaption{font-size:10px}}
 `;document.head.append(style);
 const section=document.createElement('section');section.id='ns-life-force-other-pages';section.setAttribute('aria-label','Life Force Energy designs');
 const kicker=document.createElement('p');kicker.className='lf-kicker';kicker.textContent='N L S M 85';
 const h=document.createElement('h2');h.textContent='LIFE FORCE ENERGY';
 const sub=document.createElement('p');sub.className='lf-sub';sub.textContent='ロスト・ディメンションズ / インソムニア';
 const grid=document.createElement('div');grid.className='lf-grid';
 products.forEach(p=>{
   const figure=document.createElement('figure');figure.className='lf-card';
   const img=document.createElement('img');img.src='/'+p.file;img.alt=p.name;img.loading='lazy';img.decoding='async';
   const cap=document.createElement('figcaption');cap.textContent=p.name;
   const link=document.createElement('a');link.href='mailto:natesavard@outlook.com?subject='+encodeURIComponent(p.name+' inquiry');link.textContent='Private inquiry ↗';
   figure.append(img,cap,link);grid.append(figure);
 });
 section.append(kicker,h,sub,grid);
 // Keep existing merch catalog intact; place this collection directly after it where available.
 const anchor=document.querySelector('#ns-envy-edit')||document.querySelector('.after-enter-world')||document.querySelector('.collection-grid')||document.querySelector('#archiveGrid');
 if(anchor)anchor.insertAdjacentElement('afterend',section); else target.append(section);
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();


/* NATE SAVARD shared navigation — additive loader (preserves existing page functions). */
(()=>{
  if(document.querySelector('script[data-ns-primary-loader]') || document.querySelector('script[src*="ns-primary-navigation.js"]')) return;
  const tag=document.createElement('script');
  tag.src='/ns-primary-navigation.js?v=9';
  tag.defer=true;
  tag.dataset.nsPrimaryLoader='1';
  document.head.appendChild(tag);
})();
