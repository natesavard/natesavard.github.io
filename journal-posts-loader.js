/* NATE SAVARD / JOURNAL — CMD published entries
   Each live post uses the same original .entry layout, backgrounds,
   editorial typography, motion and responsive behaviour as journal.html.
   No change to the original ten entries, navigation, CMD or feed. */
(function () {
  'use strict';

  const FEED = '/journal-feed.json';
  const MAX_POSTS = 200;

  // Uploaded files must resolve to paths on this website. Never interpret
  // arbitrary remote addresses as a CSS background or local video file.
  function localMedia(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const url = new URL(value, location.origin);
      if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol)) return '';
      return url.pathname + url.search;
    } catch (_) { return ''; }
  }

  function youtubeEmbed(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:') return '';
      let id = '';
      if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(url.hostname)) {
        if (url.pathname === '/watch') id = url.searchParams.get('v') || '';
        else if (/^\/(shorts|embed|live)\//.test(url.pathname)) id = url.pathname.split('/')[2] || '';
      } else if (url.hostname === 'youtu.be') id = url.pathname.slice(1).split('/')[0];
      return /^[\w-]{11}$/.test(id) ? 'https://www.youtube-nocookie.com/embed/' + id : '';
    } catch (_) { return ''; }
  }

  function inlineText(parent, input) {
    const value = String(input || '');
    const tokens = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|\*([^*\n]+)\*/g;
    let offset = 0;
    for (const match of value.matchAll(tokens)) {
      if (match.index > offset) parent.append(document.createTextNode(value.slice(offset, match.index)));
      if (match[1] && match[2]) {
        const a = document.createElement('a');
        a.textContent = match[1]; a.href = match[2]; a.rel = 'noopener noreferrer'; a.target = '_blank';
        parent.append(a);
      } else if (match[3]) {
        const strong = document.createElement('strong'); strong.textContent = match[3]; parent.append(strong);
      } else if (match[4]) {
        const em = document.createElement('em'); em.textContent = match[4]; parent.append(em);
      }
      offset = match.index + match[0].length;
    }
    if (offset < value.length) parent.append(document.createTextNode(value.slice(offset)));
  }

  function writingContent(container, raw) {
    const blocks = String(raw || '').replace(/\r\n?/g, '\n').trim().split(/\n\s*\n/).filter(Boolean).slice(0, 150);
    blocks.forEach(block => {
      const p = document.createElement('p');
      inlineText(p, block.replace(/^#{1,6}\s+/, '').replace(/^[-*]\s+/gm, '• '));
      container.append(p);
    });
  }

  function addMedia(content, post) {
    const youtube = youtubeEmbed(post.youtube);
    const video = localMedia(post.video);
    if (!youtube && !video) return;
    const frame = document.createElement('div');
    frame.className = 'ns-journal-post-media';
    if (youtube) {
      const iframe = document.createElement('iframe');
      iframe.src = youtube;
      iframe.title = 'Video — ' + String(post.title || 'Journal');
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      frame.append(iframe);
    } else {
      const player = document.createElement('video');
      player.src = video; player.controls = true; player.preload = 'metadata'; player.playsInline = true;
      frame.append(player);
    }
    content.append(frame);
  }

  // The original first Journal entry is the source of truth for the animated
  // multicolour logo. Clone its SVG, including gradients and motion classes,
  // rather than approximate the design or introduce a new artwork asset.
  const overlayTypes = new Set(['journal', 'monogram']);
  const overlayPositions = new Set(['top-left', 'center', 'bottom-right']);
  const overlaySizes = new Set(['small', 'medium', 'large']);
  function overlaySettings(post) {
    const o = post.overlay;
    if (!o || typeof o !== 'object' || !overlayTypes.has(o.type)) return null;
    const opacity = Number(o.opacity);
    return {
      type: o.type,
      position: overlayPositions.has(o.position) ? o.position : 'top-left',
      size: overlaySizes.has(o.size) ? o.size : 'medium',
      opacity: Number.isFinite(opacity) ? Math.max(.2, Math.min(1, opacity)) : 1
    };
  }
  function cloneExactJournalLogo(uniqueIndex) {
    const original = document.querySelector('#entry-01 .entry-logo');
    if (!original) return null;
    const wrapper = document.createElement('div');
    wrapper.className = 'entry-logo ns-post-logo-art';
    const svg = original.querySelector('svg');
    if (!svg) return null;
    const copy = svg.cloneNode(true);
    const renamed = new Map();
    copy.querySelectorAll('[id]').forEach(el => {
      const prior = el.id;
      const next = 'ns-post-' + uniqueIndex + '-' + prior;
      renamed.set(prior, next);
      el.id = next;
    });
    copy.querySelectorAll('*').forEach(el => {
      for (const attribute of ['mask', 'filter', 'fill', 'stroke', 'href', 'xlink:href']) {
        const value = el.getAttribute(attribute);
        if (!value) continue;
        let updated = value;
        renamed.forEach((next, prior) => {
          updated = updated.replaceAll('url(#' + prior + ')', 'url(#' + next + ')');
          if (updated === '#' + prior) updated = '#' + next;
        });
        if (updated !== value) el.setAttribute(attribute, updated);
      }
    });
    wrapper.append(copy);
    return wrapper;
  }
  function addOverlay(entry, post, index) {
    const setting = overlaySettings(post);
    if (!setting) return;
    const host = document.createElement('div');
    host.className = 'ns-post-overlay ns-post-overlay--' + setting.type + ' ns-post-overlay--' + setting.position + ' ns-post-overlay--' + setting.size;
    host.style.opacity = String(setting.opacity);
    host.setAttribute('aria-hidden', 'true');
    if (setting.type === 'journal') {
      const logo = cloneExactJournalLogo(index + 1);
      if (!logo) return;
      host.append(logo);
    } else {
      const image = document.createElement('img');
      image.src = '/assets/ns-chrome-monogram.webp';
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';
      host.append(image);
    }
    entry.append(host);
  }

  function makeEntry(post, index, count) {
    const entry = document.createElement('article');
    // The original journal's first static entry is left. Keep the entire
    // run alternating, including the transition into that first static entry.
    const position = ((count - index) % 2 === 1) ? 'right' : 'left';
    entry.className = 'entry ' + position + ' ns-live-journal-entry';
    entry.id = 'journal-live-' + (index + 1);

    const image = localMedia(post.image);
    entry.style.setProperty('--image-ratio', '.7');
    if (image) {
      // Construct CSS-safe quoted URL; encodeURI leaves apostrophes, so use
      // JSON string quoting and escape CSS-significant closing characters.
      const quoted = JSON.stringify(image).replace(/</g, '\\3c ');
      entry.style.setProperty('--photo', 'url(' + quoted + ')');
    } else entry.style.setProperty('--photo', 'none');

    // IDENTICAL class/structure to original ten full-screen journal panels.
    // The existing journal script adds .entry-photo and its slow Ken Burns
    // movement before it duplicates the loop, just like the static entries.
    const shade = document.createElement('div');
    shade.className = 'shade';
    entry.append(shade);
    addOverlay(entry, post, index);

    const content = document.createElement('div');
    content.className = 'entry-content';
    const meta = document.createElement('div');
    meta.className = 'meta';
    const metaParts = ['NS / JOURNAL', String(post.date || '').slice(0, 10), 'TRANSMISSION / ' + String(index + 1).padStart(3, '0')];
    metaParts.forEach(value => {
      const span = document.createElement('span');
      span.textContent = value;
      meta.append(span);
    });
    const heading = document.createElement('h2');
    heading.textContent = String(post.title || 'UNTITLED');
    const writing = document.createElement('div');
    writing.className = 'writing';
    writingContent(writing, post.body);
    content.append(meta, heading, writing);
    addMedia(content, post);
    entry.append(content);
    const number = document.createElement('span');
    number.className = 'edge-number';
    number.textContent = 'LIVE / ' + String(index + 1).padStart(2, '0');
    entry.append(number);
    return entry;
  }

  // Only new-media details need CSS. Every other visual rule is inherited
  // from journal.html's original typography, image plane and panel styles.
  function ensureMediaStyles() {
    if (document.getElementById('ns-journal-live-media-style')) return;
    const style = document.createElement('style');
    style.id = 'ns-journal-live-media-style';
    style.textContent = '.ns-journal-post-media{width:min(100%,760px);margin:30px 0 0;position:relative;z-index:2}.ns-journal-post-media iframe,.ns-journal-post-media video{display:block;width:100%;border:1px solid rgba(255,255,255,.2);background:#000;aspect-ratio:16/9;object-fit:contain}.ns-live-journal-entry .writing{overflow-wrap:anywhere}';
    style.textContent += `
.ns-live-journal-entry .ns-post-overlay{position:absolute;z-index:0;pointer-events:none;display:flex;align-items:center;justify-content:center;max-width:calc(100% - 32px);transform:translate(-50%,-50%);isolation:isolate}
.ns-live-journal-entry .ns-post-overlay--top-left{left:28%;top:22%}
.ns-live-journal-entry .ns-post-overlay--center{left:50%;top:46%}
.ns-live-journal-entry .ns-post-overlay--bottom-right{left:75%;top:76%}
.ns-live-journal-entry .ns-post-overlay--journal.ns-post-overlay--small{width:min(33vw,420px)}
.ns-live-journal-entry .ns-post-overlay--journal.ns-post-overlay--medium{width:min(53vw,660px)}
.ns-live-journal-entry .ns-post-overlay--journal.ns-post-overlay--large{width:min(73vw,900px)}
.ns-live-journal-entry .ns-post-overlay--monogram.ns-post-overlay--small{width:min(18vw,230px)}
.ns-live-journal-entry .ns-post-overlay--monogram.ns-post-overlay--medium{width:min(29vw,390px)}
.ns-live-journal-entry .ns-post-overlay--monogram.ns-post-overlay--large{width:min(44vw,610px)}
.ns-live-journal-entry .ns-post-overlay .entry-logo{width:100%;margin:0;max-width:none}
.ns-live-journal-entry .ns-post-overlay .entry-logo svg{display:block;width:100%;height:auto}
.ns-live-journal-entry .ns-post-overlay--monogram img{display:block;width:100%;height:auto;object-fit:contain;animation:ns-journal-monogram-spin 13s linear infinite;filter:drop-shadow(0 0 20px rgba(240,225,210,.32))}
@keyframes ns-journal-monogram-spin{from{transform:rotateY(0deg)}to{transform:rotateY(360deg)}}
@media(max-width:650px){.ns-live-journal-entry .ns-post-overlay--top-left{left:38%;top:25%}.ns-live-journal-entry .ns-post-overlay--center{left:50%;top:43%}.ns-live-journal-entry .ns-post-overlay--bottom-right{left:65%;top:72%}.ns-live-journal-entry .ns-post-overlay--journal.ns-post-overlay--small{width:48vw}.ns-live-journal-entry .ns-post-overlay--journal.ns-post-overlay--medium{width:72vw}.ns-live-journal-entry .ns-post-overlay--journal.ns-post-overlay--large{width:92vw}.ns-live-journal-entry .ns-post-overlay--monogram.ns-post-overlay--small{width:28vw}.ns-live-journal-entry .ns-post-overlay--monogram.ns-post-overlay--medium{width:44vw}.ns-live-journal-entry .ns-post-overlay--monogram.ns-post-overlay--large{width:67vw}}
@media(prefers-reduced-motion:reduce){.ns-live-journal-entry .ns-post-overlay--monogram img{animation:none}}
`;
    document.head.append(style);
  }

  window.nsJournalPostsReady = (async () => {
    try {
      const response = await fetch(FEED, { cache: 'no-store' });
      if (!response.ok) throw new Error('Journal feed unavailable: ' + response.status);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Journal feed is not a list');
      const posts = data.filter(p => p && typeof p === 'object' && p.published !== false && p.title)
        .slice(0, MAX_POSTS)
        .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
      const track = document.getElementById('journal-track');
      if (!track || !posts.length) return;
      ensureMediaStyles();
      const fragment = document.createDocumentFragment();
      posts.forEach((post, index) => fragment.append(makeEntry(post, index, posts.length)));
      // Insert BEFORE the original Journal script captures its articles;
      // its original motion loop then includes published posts automatically.
      track.insertBefore(fragment, track.firstChild);
    } catch (error) {
      console.warn('Live Journal feed was not loaded; original journal entries remain intact.', error);
    }
  })();
})();
