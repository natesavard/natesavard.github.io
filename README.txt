REMOVE THE CIRCLE BEHIND THE SPINNING ENVY CROSS

Upload BOTH files to the repository ROOT, replacing the existing versions:
  journal.html
  site-bottom-nav.js
Commit once.

Journal's own .envy-to-top stylesheet creates its circular border, translucent
background and blur. Those have been removed in journal.html.
The shared site-bottom-nav.js now also strips background circles, borders,
halos and ::before/::after discs from Envy cross scroll-to-top buttons across
connected pages (including Rebirth and Classic).

The cross image still rotates and scrolls to top. Existing Journal entries,
Portal/Gemstone/Scrapbook links, cart, menu and gallery are preserved.

This is a source-validated fix. Visual result on the live site not verified.
