#!/usr/bin/env python3
"""Safely add shared navigation script, never alter other HTML contents.

Idempotent. HTML files are read fresh at execution time on GitHub.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = '<script src="/ns-primary-navigation.js?v=1" defer></script>'

# Only pages belonging to the Nate Savard site; no Hippie Whip or storefront subfolders.
PAGES = [
    'index.html',
    'journal.html',
    'vault.html',
    'originals.html',
    'envynomadixrebirth.html',
    'envynomadix.html',
    'envynomadix-worldwide.html',
    'envynomadix-signature-collection.html',
    'main.html',
    'revelations.html',
    'insomnia-world.html',
    'scrapbook.html',
    'original/index.html',
    'natesavard/index.html',
]

changes = []
for relative in PAGES:
    path = ROOT / relative
    if not path.is_file():
        continue
    content = path.read_text(encoding='utf-8-sig')
    if 'ns-primary-navigation.js' in content:
        continue
    closing = content.lower().rfind('</body>')
    if closing < 0:
        print(f'SKIP no </body>: {relative}')
        continue
    new_content = content[:closing] + '\n' + SCRIPT + '\n' + content[closing:]
    path.write_text(new_content, encoding='utf-8')
    changes.append(relative)
    print(f'UPDATED {relative}')
print(f'Inserted shared nav script on {len(changes)} page(s).')
