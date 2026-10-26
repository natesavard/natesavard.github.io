/* NATE SAVARD — shared jewelry archive. No folders. */
(() => {
  const pieces=[{"file": "ns-jewel-blue-opal.webp", "name": "BLUE FIRE OPAL SIGNET"}, {"file": "ns-jewel-emerald.webp", "name": "EMERALD CREST SIGNET"}, {"file": "ns-jewel-rainbow-opal.webp", "name": "RAINBOW OPAL CREST"}, {"file": "ns-jewel-blue-opal-editorial.webp", "name": "BLUE OPAL / EDITORIAL"}, {"file": "ns-jewel-amber.webp", "name": "AMBER MARQUISE SIGNET"}, {"file": "ns-jewel-monogram.webp", "name": "NS MONOGRAM SIGNET"}, {"file": "ns-jewel-locket.webp", "name": "NS HEIRLOOM LOCKET"}, {"file": "ns-jewel-locket-study.webp", "name": "NS LOCKET / ARCHITECTURE"}, {"file": "ns-jewel-legacy.webp", "name": "LEGACY 001 SIGNET"}];
  const init=()=>{
    const original=document.querySelector('body:has(#builder) #builder');
    const envy=document.querySelector('#jewelryPhase');
    if(!original&&!envy)return;
    if(document.getElementById('ns-new-jewels'))return;
    const css=`#ns-new-jewels{position:relative;z-index:5;max-width:1180px;width:calc(100% - 36px);margin:45px auto 90px;color:#e7d9be;font-family:Georgia,serif}
    #ns-new-jewels .nsj-kicker{font:10px 'Courier New',monospace;letter-spacing:.26em;text-transform:uppercase;color:#c9a36c}
    #ns-new-jewels h2{font:400 clamp(32px,5vw,66px)/1.1 Georgia,serif;letter-spacing:.04em;text-transform:uppercase;margin:15px 0}
    #ns-new-jewels .nsj-sub{font:12px/1.8 'Courier New',monospace;color:#a99b85;max-width:680px}
    #ns-new-jewels .nsj-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:34px}
    #ns-new-jewels .nsj-card{min-width:0}
    #ns-new-jewels .nsj-image{width:100%;aspect-ratio:1/1;display:block;padding:0;border:1px solid #4d4030;background:#0b0b0b;cursor:pointer;overflow:hidden}
    #ns-new-jewels .nsj-image img{width:100%;height:100%;object-fit:contain;transition:transform .5s}
    #ns-new-jewels .nsj-image:hover img{transform:scale(1.05)}
    #ns-new-jewels .nsj-name{font:11px/1.5 'Courier New',monospace;letter-spacing:.12em;margin:12px 0 6px}
    #ns-new-jewels .nsj-link{font:10px 'Courier New',monospace;color:#d3ae75;text-decoration:none;letter-spacing:.08em}
    #nsj-lightbox{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:20000;display:none;align-items:center;justify-content:center;padding:24px}
    #nsj-lightbox.open{display:flex}
    #nsj-lightbox img{max-width:min(95vw,1050px);max-height:88vh;object-fit:contain}
    #nsj-lightbox button{position:absolute;right:20px;top:20px;background:#171717;color:white;border:1px solid #777;border-radius:50%;width:42px;height:42px;font-size:26px;cursor:pointer}
    @media(max-width:650px){#ns-new-jewels .nsj-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}#ns-new-jewels .nsj-name{font-size:9px}}
    `;
    const style=document.createElement('style');style.textContent=css;document.head.append(style);
    const section=document.createElement('section');section.id='ns-new-jewels';
    const kicker=document.createElement('p');kicker.className='nsj-kicker';kicker.textContent='NATE SAVARD / THE ORIGINAL COLLECTION';
    const title=document.createElement('h2');title.textContent='THE JEWEL ARCHIVE';
    const sub=document.createElement('p');sub.className='nsj-sub';sub.textContent='Rings, signets, and heirloom lockets. Private commissions and availability by inquiry; imagery represents design concepts, not confirmed inventory.';
    const grid=document.createElement('div');grid.className='nsj-grid';
    const lightbox=document.createElement('div');lightbox.id='nsj-lightbox';lightbox.setAttribute('role','dialog');lightbox.setAttribute('aria-modal','true');
    const close=document.createElement('button');close.type='button';close.setAttribute('aria-label','Close image');close.textContent='×';
    const enlarged=document.createElement('img');lightbox.append(close,enlarged);
    const dismiss=()=>{lightbox.classList.remove('open');enlarged.removeAttribute('src')};
    close.onclick=dismiss;lightbox.onclick=e=>{if(e.target===lightbox)dismiss()};
    document.addEventListener('keydown',e=>{if(e.key==='Escape')dismiss()});
    pieces.forEach(piece=>{
      const card=document.createElement('article');card.className='nsj-card';
      const imageBtn=document.createElement('button');imageBtn.className='nsj-image';imageBtn.type='button';imageBtn.setAttribute('aria-label','View '+piece.name);
      const img=document.createElement('img');img.src='/'+piece.file;img.alt=piece.name;img.loading='lazy';imageBtn.append(img);
      imageBtn.onclick=()=>{enlarged.src=img.src;enlarged.alt=img.alt;lightbox.classList.add('open')};
      const label=document.createElement('div');label.className='nsj-name';label.textContent=piece.name;
      const link=document.createElement('a');link.className='nsj-link';link.textContent='PRIVATE INQUIRY ↗';link.href='mailto:natesavard@outlook.com?subject='+encodeURIComponent('Nate Savard jewel inquiry — '+piece.name);
      card.append(imageBtn,label,link);grid.append(card);
    });
    section.append(kicker,title,sub,grid);document.body.append(lightbox);
    if(original){original.replaceWith(section);
      // Keep any links pointing to the builder useful.
      document.querySelectorAll('a[href="#builder"]').forEach(a=>a.href='#ns-new-jewels');
    } else if(envy) envy.after(section);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
