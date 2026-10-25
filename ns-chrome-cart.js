/* Chrome NS side-tab cart styling for the existing Vault boutique cart. */
(()=>{const mount=()=>{const tab=document.getElementById('ns-vault-cart-open'),dialog=document.querySelector('.nsv-overlay:has(.nsv-drawer)'),drawer=dialog?.querySelector('.nsv-drawer');if(!tab||!dialog||!drawer)return;
const css=`#ns-vault-cart-open{position:fixed!important;right:0!important;top:44%!important;bottom:auto!important;width:54px!important;height:178px!important;border:1px solid rgba(230,221,209,.36)!important;border-right:0!important;border-radius:24px 0 0 24px!important;background:linear-gradient(110deg,#252525,#080808 55%,#252525)!important;color:#f3ede4!important;box-shadow:-9px 8px 32px rgba(0,0,0,.6),inset 2px 0 2px rgba(255,255,255,.18)!important;padding:12px 7px!important;writing-mode:vertical-rl!important;transform:none!important;letter-spacing:.19em!important;font:700 10px Georgia,serif!important;z-index:16000!important;transition:width .35s ease,background .35s ease!important}
#ns-vault-cart-open:before{content:'';position:absolute;left:50%;top:14px;bottom:14px;width:1px;background:linear-gradient(transparent,#c9bca7,transparent);opacity:.6}
#ns-vault-cart-open:hover,#ns-vault-cart-open:focus-visible{width:73px!important;outline:1px solid rgba(240,232,219,.55)!important;background:linear-gradient(110deg,#45413d,#0b0b0b 55%,#302d29)!important}
.nsv-overlay:has(.nsv-drawer){justify-content:flex-end!important;padding:0!important;background:rgba(0,0,0,.55)!important;backdrop-filter:blur(5px)!important;transition:background .35s ease}
.nsv-overlay .nsv-drawer{width:min(470px,calc(100vw - 18px))!important;height:100dvh!important;max-height:100dvh!important;border-radius:30px 0 0 30px!important;border:1px solid rgba(234,225,213,.25)!important;border-right:0!important;background:linear-gradient(145deg,#202020,#080808 52%,#121212)!important;box-shadow:-20px 0 70px rgba(0,0,0,.7)!important;padding:62px 30px 35px!important;transform:translateX(105%);transition:transform .48s cubic-bezier(.16,1,.3,1)!important}
.nsv-overlay.open .nsv-drawer{transform:translateX(0)}
.nsv-drawer .nsv-submit{border-radius:16px!important;background:#e8dfd1!important;border-color:#e8dfd1!important;color:#121212!important}
.nsv-drawer input,.nsv-drawer textarea{border-radius:10px!important}
.nsv-drawer .nsv-close{border-radius:50%!important;width:40px;height:40px;padding:0!important}
@media(max-width:600px){#ns-vault-cart-open{top:39%!important;width:43px!important;height:145px!important}.nsv-overlay .nsv-drawer{width:min(420px,95vw)!important;border-radius:22px 0 0 22px!important;padding:60px 20px 30px!important}}
@media(prefers-reduced-motion:reduce){.nsv-overlay .nsv-drawer{transition:none!important}}`;
const s=document.createElement('style');s.textContent=css;document.head.append(s);
tab.setAttribute('aria-label','Open Nate Savard shopping cart');tab.title='Open cart';};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();})();