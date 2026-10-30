/* Unified NS logo controls: tap the monogram to close either cart. */
(()=>{'use strict';
 const logo='ns-logo-chrome.png';
 function install(drawer,selector){
   if(!drawer||drawer.querySelector('.ns-cart-logo'))return;
   const close=drawer.querySelector(selector);if(!close)return;
   const btn=document.createElement('button');btn.type='button';btn.className='ns-cart-logo';btn.setAttribute('aria-label','Close shopping cart');btn.title='Close cart';
   const img=document.createElement('img');img.src=logo;img.alt='Nate Savard NS monogram';btn.append(img);
   btn.addEventListener('click',()=>close.click());
   const header=drawer.querySelector('.originals-cart-header');
   if(header){header.querySelector('div')?.prepend(btn)}else{const title=drawer.querySelector('h2');if(title)title.before(btn);else drawer.prepend(btn)}
 }
 function mount(){install(document.querySelector('.originals-cart-drawer'),'#originalsCartClose');install(document.querySelector('.nsv-overlay .nsv-drawer'),'.nsv-close')}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
 const observer=new MutationObserver(mount);observer.observe(document.documentElement,{childList:true,subtree:true});
})();
