#!/usr/bin/env python3
"""Add Life Force collection references to the actual HTML pages without changing content."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = [
    'originals.html',
    'envynomadix.html',
    'envynomadixrebirth.html',
    'envynomadix-worldwide.html',
    'envynomadix-signature-collection.html',
    'natesavard/index.html',
]
TAG = '<script src="/ns-life-force-everywhere.js?v=2" defer></script>'

for name in PAGES:
    page = ROOT / name
    if not page.exists():
        raise SystemExit(f'Missing expected page: {name}; stopping to avoid partial update')

for name in PAGES:
    page = ROOT / name
    original = page.read_text(encoding='utf-8')
    if '/ns-life-force-everywhere.js' in original:
        import re
        updated = re.sub(r'<script\b[^>]*\bsrc=["\']/ns-life-force-everywhere\.js[^"\']*["\'][^>]*>\s*</script>', TAG, original, flags=re.I)
    else:
        # Check for closing tag case-insensitively; preserve all other bytes/content.
        import re
        matches = list(re.finditer(r'</body\s*>', original, flags=re.I))
        if len(matches) != 1:
            raise SystemExit(f'Expected one </body> in {name}; found {len(matches)}')
        m = matches[0]
        updated = original[:m.start()] + TAG + '\n' + original[m.start():]
    if updated != original:
        page.write_text(updated, encoding='utf-8')
        print('Updated:', name)
    else:
        print('Already current:', name)

# Force an updated script fetch on the two existing collection entry points.
for name in ['index.html', 'vault.html']:
    page = ROOT / name
    if not page.exists():
        continue
    original = page.read_text(encoding='utf-8')
    updated = original.replace('/ns-unified-drop.js?v=1', '/ns-unified-drop.js?v=2')
    if updated != original:
        page.write_text(updated, encoding='utf-8')
        print('Bumped asset version:', name)
