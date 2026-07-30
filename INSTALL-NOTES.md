# Nate Savard / Revelations — branch package

Target repository: `natesavard/natesavard.github.io`  
Target branch: `sound-player-test`  
Do not add `revelations.html` to navigation yet. Do not modify `main`.

## Files for the branch root

- `revelations.html`
- `site-soundscape.js`
- `web-top-right-site-opt.png`
- `web-left-edge-site-opt.png`
- `web-bottom-edge-site-opt.png`

The existing branch assets `nate-savard-signature-corner.png`,
`ns-logo-chrome.png`, `nate-savard-forever.png`, `nate-savard-bg-3.png`,
and `nate savard speedway (1).png` remain in use.

## Site-wide sound loader

Append this once to `site-flow.js` so every page already using the shared
site-flow layer receives the interaction soundscape:

```js
(function loadNateSoundscape() {
  if (document.querySelector("script[data-nate-soundscape]")) return;
  var script = document.createElement("script");
  script.src = "site-soundscape.js";
  script.defer = true;
  script.dataset.nateSoundscape = "true";
  document.head.appendChild(script);
})();
```

Add `<script src="site-soundscape.js"></script>` before `</body>` on pages
that do not load `site-flow.js`, including `index.html` and
`envynomadixrebirth.html`.

The soundscape is procedural Web Audio: no external audio files, no copyrighted
samples, no autoplay. It starts after the first interaction and includes a
persistent SOUND ON/OFF control.
