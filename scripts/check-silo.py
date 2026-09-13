from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
LOCK = json.loads((ROOT / '.github' / 'silo-lock.json').read_text(encoding='utf-8'))
NAV = (ROOT / '_includes' / 'nav.html').read_text(encoding='utf-8')
FOOTER = (ROOT / '_includes' / 'footer.html').read_text(encoding='utf-8')

def links(block):
    return [(label.strip(), href) for href, label in re.findall(r'<a[^>]+href="([^"]+)"[^>]*>([^<]+)</a>', block)]

def groups(text, title_class):
    found = []
    pattern = rf'<div class="{title_class}">.*?</div>' if title_class == 'silo-group' else r'<p class="footer-heading">.*?</div>'
    if title_class == 'silo-group':
        for m in re.finditer(r'<div class="silo-group">\s*<p class="silo-title">([^<]+)</p>(.*?)</div>', text, re.S):
            found.append((m.group(1).strip(), links(m.group(2))))
    else:
        for m in re.finditer(r'<p class="footer-heading">([^<]+)</p>\s*<div class="footer-links">(.*?)</div>', text, re.S):
            found.append((m.group(1).strip(), links(m.group(2))))
    return found

expected = [(g['name'], [tuple(x) for x in g['items']]) for g in LOCK['service_groups']]
nav_groups = groups(NAV, 'silo-group')
footer_groups = groups(FOOTER, 'footer-heading')

assert nav_groups == expected, 'nav silo differs from lock manifest'
assert footer_groups[:5] == expected, 'footer service silo differs from nav/lock manifest'
expected_site = [tuple(x) for x in LOCK['site_navigation']]
site = next(v for n, v in footer_groups if n == 'Site Navigation')
assert site == expected_site, 'footer Site Navigation differs from lock manifest'
assert 'MIRRORS THE APPROVED PRIMARY SERVICE SILO' in FOOTER, 'footer lock marker missing'

for page in ROOT.rglob('*.html'):
    if any(x in page.parts for x in ('.git', '_site', 'vendor', '_includes')):
        continue
    text = page.read_text(encoding='utf-8')
    assert '{% include nav.html %}' in text, f'{page} missing shared nav include'
    assert '{% include footer.html %}' in text, f'{page} missing shared footer include'
    assert '<nav class="nav-links">' not in text, f'{page} contains hard-coded nav'
    assert 'class="site-footer"' not in text, f'{page} contains hard-coded footer'

print('SILO CHECK PASS')
