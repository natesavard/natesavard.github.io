/* Homepage finale: mirror the complete Vault hero, no duplicate sections. */
(()=>{const mount=()=>{
const old=document.getElementById('ns-home-grand-touring');if(old)old.remove();
const main=document.querySelector('main.content'),footer=main?.querySelector('footer.footer');if(!main||!footer)return;
const css=`#ns-home-vault-exact{position:relative;isolation:isolate;display:grid;place-items:center;min-height:68vh;padding:78px 24px 52px;text-align:center;border-top:1px solid rgba(255,255,255,.13);border-bottom:1px solid rgba(255,255,255,.13);background:#050505;overflow:hidden;width:100vw;max-width:none;margin-left:calc(50% - 50vw)}
#ns-home-vault-exact:before{content:"";position:absolute;width:min(64vw,780px);aspect-ratio:1;border:1px solid rgba(255,255,255,.07);border-radius:50%;box-shadow:0 0 0 70px rgba(255,255,255,.014),0 0 0 140px rgba(255,255,255,.009);pointer-events:none}
#ns-home-vault-exact .ns-vault-inner{position:relative;z-index:2}
#ns-home-vault-exact model-viewer{display:block;width:min(48vw,430px);height:min(48vw,430px);min-width:240px;min-height:240px;margin:0 auto;background:transparent;--poster-color:transparent;filter:drop-shadow(0 24px 34px rgba(0,0,0,.72)) drop-shadow(0 0 24px rgba(255,255,255,.10));cursor:grab;touch-action:pan-y}
#ns-home-vault-exact model-viewer:active{cursor:grabbing}
#ns-home-vault-exact model-viewer::part(default-progress-bar),#ns-home-vault-exact model-viewer::part(default-progress-mask),#ns-home-vault-exact model-viewer::part(default-progress-track){display:none}
#ns-home-vault-exact .ns-vault-eyebrow{margin:24px 0 12px;font:10px/1 "Courier New",monospace;letter-spacing:.35em;text-transform:uppercase;color:#8b8b86}
#ns-home-vault-exact .ns-vault-flags{display:block;width:min(260px,42vw);height:auto;margin:6px auto 14px;opacity:.96;filter:drop-shadow(0 0 16px rgba(255,255,255,.035))}
#ns-home-vault-exact .ns-vault-copy{max-width:620px;margin:24px auto 0;color:#aaa9a2;font:13px/1.65 "Courier New",monospace;letter-spacing:.04em}
#ns-home-vault-exact .ns-vault-hint{margin-top:28px;color:rgba(255,255,255,.34);font:9px/1 "Courier New",monospace;letter-spacing:.18em;text-transform:uppercase}
#ns-home-vault-exact .ns-vault-enter{display:inline-block;margin-top:28px;color:#f3f0e8;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.5);padding:9px 0;font:10px "Courier New",monospace;letter-spacing:.2em}
@media(max-width:760px){#ns-home-vault-exact{padding:64px 18px 55px}#ns-home-vault-exact .ns-vault-flags{width:min(190px,52vw)}#ns-home-vault-exact .ns-vault-eyebrow{font-size:8px;line-height:1.7}}`;
const style=document.createElement('style');style.textContent=css;document.head.append(style);
const section=document.createElement('section');section.id='ns-home-vault-exact';section.setAttribute('aria-label','Nate Savard Grand Touring Club');
section.innerHTML=`<div class="ns-vault-inner"><model-viewer alt="Rotating three-dimensional NS monogram" auto-rotate auto-rotate-delay="0" camera-controls disable-zoom environment-image="neutral" exposure="1.25" interaction-prompt="none" rotation-per-second="16deg" shadow-intensity="0" src="/assets/ns-monogram.glb" tone-mapping="aces"></model-viewer><div class="ns-vault-eyebrow">ultra fine luxury - SAVARD GRAND PRO TOUR - 85 - N L S M</div><img class="ns-vault-flags" src="/assets/crossed-flags-est-1985.webp" alt="Crossed flags EST. 1985"><p class="ns-vault-copy">Nate Savard - Grand Touring Club -</p><div class="ns-vault-hint">Drag the monogram / tap to pause rotation</div><a class="ns-vault-enter" href="/vault.html">ENTER THE VAULT ↗</a></div>`;
main.insertBefore(section,footer);
const viewer=section.querySelector('model-viewer');viewer.addEventListener('click',()=>{viewer.autoRotate=!viewer.autoRotate});
if(!customElements.get('model-viewer')){const script=document.createElement('script');script.type='module';script.src='https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';document.head.append(script)}
};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount()})();
