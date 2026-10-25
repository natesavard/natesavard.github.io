/* NATE SAVARD — Vault additions. Existing 20 images in repository root. */
(() => {
  const additions = [{"name": "VENUS FLYTRAP / I", "category": "garment", "file": "ns-envy-01.webp"}, {"name": "DISTRESSED STREETWEAR", "category": "garment", "file": "ns-envy-02.webp"}, {"name": "RED LOGO TEE", "category": "garment", "file": "ns-envy-03.webp"}, {"name": "MUSCLE TEE", "category": "garment", "file": "ns-envy-04.webp"}, {"name": "SPEEDWAY JERSEY", "category": "garment", "file": "ns-envy-05.webp"}, {"name": "STAR ASHTRAY", "category": "experiment", "file": "ns-envy-06.webp"}, {"name": "VENUS FLYTRAP / II", "category": "garment", "file": "ns-envy-07.webp"}, {"name": "FW25 TECHNICAL", "category": "garment", "file": "ns-envy-08.webp"}, {"name": "ALIEN GRAPHIC", "category": "garment", "file": "ns-envy-09.webp"}, {"name": "ARCHIVE STUDY 01", "category": "experiment", "file": "ns-envy-10.webp"}, {"name": "ARCHIVE STUDY 02", "category": "experiment", "file": "ns-envy-11.webp"}, {"name": "ARCHIVE STUDY 03", "category": "experiment", "file": "ns-envy-12.webp"}, {"name": "ARCHIVE STUDY 04", "category": "experiment", "file": "ns-envy-13.webp"}, {"name": "ARCHIVE STUDY 05", "category": "experiment", "file": "ns-envy-14.webp"}, {"name": "ARCHIVE STUDY 06", "category": "experiment", "file": "ns-envy-15.webp"}, {"name": "ARCHIVE STUDY 07", "category": "experiment", "file": "ns-envy-16.webp"}, {"name": "ARCHIVE STUDY 08", "category": "experiment", "file": "ns-envy-17.webp"}, {"name": "CHROME PEACE / NS", "category": "symbol", "file": "ns-envy-18.webp"}, {"name": "ARCHIVE STUDY 09", "category": "experiment", "file": "ns-envy-19.webp"}, {"name": "ARCHIVE STUDY 10", "category": "experiment", "file": "ns-envy-20.webp"}];
  const grid = document.getElementById('archiveGrid');
  const count = document.getElementById('archiveCount');
  if (!grid || !count) return;
  additions.forEach((item, index) => {
    if (grid.querySelector(`[data-ns-addition="${index + 1}"]`)) return;
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.category = item.category;
    card.dataset.name = item.name;
    card.dataset.year = '2026';
    card.dataset.nsAddition = String(index + 1);
    const imageWrap = document.createElement('div');
    imageWrap.className = 'card__image-wrap';
    const badge = document.createElement('span');
    badge.className = 'card__badge';
    badge.textContent = item.category === 'garment' ? 'Design archive' :
      item.category === 'symbol' ? 'Symbol study' : 'Recovered artifact';
    const img = document.createElement('img');
    img.className = 'card__image';
    img.src = item.file;
    img.alt = item.name;
    img.loading = 'lazy';
    imageWrap.append(badge, img);
    const meta = document.createElement('div');
    meta.className = 'card__meta';
    const info = document.createElement('div');
    const title = document.createElement('h2');
    title.className = 'card__name';
    title.textContent = item.name;
    const type = document.createElement('p');
    type.className = 'card__type';
    type.textContent = item.category + ' / recovered design / 2026';
    const year = document.createElement('div');
    year.className = 'card__year';
    year.textContent = '2026';
    info.append(title, type);
    meta.append(info, year);
    card.append(imageWrap, meta);
    grid.append(card);
  });
  const active = document.querySelector('#filters .filter.is-active')?.dataset.filter || 'all';
  let visible = 0;
  grid.querySelectorAll('.card').forEach(card => {
    card.hidden = active !== 'all' && card.dataset.category !== active;
    if (!card.hidden) visible++;
  });
  count.textContent = `${visible} recovered design${visible === 1 ? '' : 's'}`;
})();
