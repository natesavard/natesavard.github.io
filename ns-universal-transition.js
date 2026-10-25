/* NS universal page transitions. Add once per page before </body>. */
(()=>{if(window.__nsUniversalTransition)return;window.__nsUniversalTransition=true;
const css=`#ns-universal-transition{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;background:rgba(0,0,0,.84);backdrop-filter:blur(7px);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .22s ease,visibility .22s}
#ns-universal-transition.ns-active{opacity:1;visibility:visible;pointer-events:all}
#ns-universal-transition img{width:clamp(105px,15vw,185px);max-height:185px;object-fit:contain;filter:drop-shadow(0 0 22px rgba(255,255,255,.22));animation:ns-universal-passage .7s cubic-bezier(.22,.78,.25,1) both}
@keyframes ns-universal-passage{0%{opacity:0;transform:scale(.7)}40%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.3)}}
@media(prefers-reduced-motion:reduce){#ns-universal-transition img{animation:none;opacity:1}}`;
const style=document.createElement('style');style.textContent=css;document.head.append(style);
const panel=document.createElement('div');panel.id='ns-universal-transition';panel.setAttribute('aria-hidden','true');const img=document.createElement('img');img.src='/assets/ns-chrome-monogram.webp';img.alt='';panel.append(img);document.body.append(panel);
let navigating=false;const show=()=>panel.classList.add('ns-active');const reset=()=>{navigating=false;panel.classList.remove('ns-active')};
document.addEventListener('click',e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||navigating)return;
const a=e.target.closest?.('a[href]');if(!a||a.hasAttribute('download')||a.target&&a.target!=='_self'||a.hasAttribute('data-no-transition'))return;
const url=new URL(a.href,location.href);if(!['http:','https:'].includes(url.protocol)||url.origin!==location.origin)return;
if(url.pathname===location.pathname&&url.search===location.search)return;
e.preventDefault();navigating=true;show();setTimeout(()=>{location.assign(url.href)},window.matchMedia('(prefers-reduced-motion: reduce)').matches?100:570);
},true);
window.addEventListener('pageshow',reset);
})();