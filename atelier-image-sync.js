/* Match published Atelier photos to existing storefront products. */
(() => {
  'use strict';
  const rules = [
    ['[data-house-product][data-house-image]', 'houseProduct', 'houseImage'],
    ['[data-product][data-shirt-viewer]', 'product', 'shirtViewer'],
    ['[data-piece-title][data-piece-image]', 'pieceTitle', 'pieceImage'],
    ['#archiveGrid .card[data-name], #ns-home-collection .ns-product[data-name]', 'name'],
    ['#ns-unified-drop .nsd-card'],
  ];

  function key(value) {
    const name = String(value || '').normalize('NFKC').toLowerCase().trim()
      .replace(/[\u2010-\u2015]/g, '-').replace(/\s+/g, ' ');
    if (name === 'ns sz 66 - custom skate low') return 'nate savard sz 66 - custom skate low';
    return name;
  }

  function imagePath(value) {
    if (typeof value !== 'string' || !/^\/(?!\/)/.test(value)) return '';
    const url = new URL(value, location.origin);
    return url.origin === location.origin && /\.(?:png|jpe?g|webp|gif|avif)$/i.test(url.pathname) ? value : '';
  }

  function collect(list) {
    const photos = new Map();
    for (const product of list) {
      if (!product || product.visible === false) continue;
      const name = key(product.name);
      const image = imagePath(product.image);
      if (name && image) photos.set(name, photos.has(name) ? '' : image);
    }
    return photos;
  }

  function sync(scope, photos) {
    for (const [selector, nameField, viewerField] of rules) {
      const cards = [...scope.querySelectorAll(selector)];
      if (scope.matches?.(selector)) cards.unshift(scope);
      for (const card of cards) {
        const label = nameField ? card.dataset[nameField] : card.querySelector('.nsd-name')?.textContent;
        const image = photos.get(key(label));
        const thumbnail = card.querySelector('img');
        if (!image || !thumbnail) continue;
        if (thumbnail.getAttribute('src') !== image) {
          thumbnail.removeAttribute('srcset');
          thumbnail.src = image;
        }
        if (viewerField && card.dataset[viewerField] !== image) card.dataset[viewerField] = image;
      }
    }
  }

  fetch('/atelier-catalog.json', {cache:'no-store'})
    .then(response => {
      if (!response.ok) throw Error('Atelier catalog unavailable');
      return response.json();
    })
    .then(list => {
      if (!Array.isArray(list)) return;
      const photos = collect(list);
      if (!photos.size) return;
      sync(document, photos);
      const selector = rules.map(([value]) => value).join(',');
      let scheduled = false;
      new MutationObserver(records => {
        if (scheduled || !records.some(record => Array.from(record.addedNodes).some(node =>
          node.nodeType === 1 && (node.matches(selector) || node.querySelector(selector) ||
            (node.matches('img') && node.closest(selector)))))) return;
        scheduled = true;
        requestAnimationFrame(() => {
          scheduled = false;
          sync(document, photos);
        });
      }).observe(document.body, {childList:true,subtree:true});
    })
    .catch(error => console.warn('Atelier image sync skipped.', error));
})();
