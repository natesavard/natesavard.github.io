/* Nate Savard — Blue Venus Flytrap, shared collection addition. */
(() => {
 const file='/ns-blue-venus-flytrap.webp', name='BLUE VENUS FLYTRAP';
 const add=()=>{
   // Home: existing product popup and shared cart handle dynamically added buttons.
   const home=document.querySelector('#ns-home-collection .ns-products');
   if(home&&!home.querySelector('[data-blue-venus]')){
     const card=document.createElement('button');
     card.type='button';card.className='ns-product';card.dataset.name=name;card.dataset.blueVenus='1';
     card.style.cssText='background:none;border:0;padding:0;text-align:left;cursor:pointer;width:100%';
     card.innerHTML='<div class="ns-image"><img class="card__image" src="'+file+'" alt="Blue Venus Flytrap shirt" loading="lazy"></div><div class="ns-name">BLUE VENUS FLYTRAP</div><div class="ns-label">VIEW DETAILS ↗</div>';
     home.append(card);
   }
   // Vault: existing card click opens the boutique popup.
   const vault=document.getElementById('archiveGrid');
   if(vault&&!vault.querySelector('[data-blue-venus]')){
     const card=document.createElement('article');card.className='card';
     card.dataset.category='garment';card.dataset.name=name;card.dataset.year='2026';card.dataset.blueVenus='1';
     card.innerHTML='<div class="card__image-wrap"><span class="card__badge">Design archive</span><img class="card__image" src="'+file+'" alt="Blue Venus Flytrap shirt" loading="lazy"></div><div class="card__meta"><div><h2 class="card__name">BLUE VENUS FLYTRAP</h2><p class="card__type">Garment / Blue colourway / 2026</p></div><div class="card__year">2026</div></div>';
     vault.append(card);
     const count=document.getElementById('archiveCount');
     if(count){const visible=[...vault.querySelectorAll('.card')].filter(x=>!x.hidden).length;count.textContent=visible+' recovered designs'}
   }
   // Envynomadix: use the existing editorial thumbnail layout and lightbox.
   const envy=document.querySelector('#ns-envy-edit .ns-grid');
   if(envy&&!envy.querySelector('[data-blue-venus]')){
     const figure=document.createElement('figure');figure.dataset.blueVenus='1';
     const button=document.createElement('button');button.type='button';button.className='ns-frame';
     const img=document.createElement('img');img.src=file;img.alt='Blue Venus Flytrap shirt';img.loading='lazy';button.append(img);
     const caption=document.createElement('figcaption');caption.textContent=name;
     const small=document.createElement('small');small.textContent='apparel';caption.append(small);
     figure.append(button,caption);envy.prepend(figure);
     button.addEventListener('click',()=>{const lightbox=document.getElementById('ns-envy-lightbox');if(!lightbox)return;const preview=lightbox.querySelector('img');preview.src=file;preview.alt=name;lightbox.classList.add('open')});
   }
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add);else add();
 // Envynomadix gallery is built by a deferred script; retry once after full load.
 window.addEventListener('load',add,{once:true});
})();
