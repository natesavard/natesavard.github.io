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
