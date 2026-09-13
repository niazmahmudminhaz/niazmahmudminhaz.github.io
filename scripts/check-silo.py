from pathlib import Path
from html import unescape
import json
import re

ROOT = Path(__file__).resolve().parents[1]
LOCK = json.loads((ROOT / '.github' / 'silo-lock.json').read_text(encoding='utf-8'))
NAV = (ROOT / '_includes' / 'nav.html').read_text(encoding='utf-8')
FOOTER = (ROOT / '_includes' / 'footer.html').read_text(encoding='utf-8')


def clean(value):
    return unescape(re.sub(r'<[^>]+>', '', value)).strip()


def links(block):
    pairs = re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', block, re.S)
    return [(clean(label), href) for href, label in pairs]


def groups(text, mode):
    found = []
    if mode == 'nav':
        pattern = r'<div class="silo-group">\s*<p class="silo-title">(.*?)</p>(.*?)</div>'
    else:
        pattern = r'<p class="footer-heading">(.*?)</p>\s*<div class="footer-links">(.*?)</div>'
    for match in re.finditer(pattern, text, re.S):
        found.append((clean(match.group(1)), links(match.group(2))))
    return found


def normalized_service_groups(manifest):
    expected = [(g['name'], [tuple(x) for x in g['items']]) for g in manifest['service_groups']]
    overview = next(group for group in expected if group[0] == 'Overview')
    service_groups = [group for group in expected if group[0] != 'Overview']
    return service_groups, overview[1]


def is_redirect_page(text):
    front_matter = re.match(r'^---\s*\n(.*?)\n---\s*\n', text, re.S)
    if front_matter:
        metadata = front_matter.group(1)
        if bool(re.search(r'^redirect_to:\s*\S+\s*$', metadata, re.M)) and not re.search(r'^redirect_from:', metadata, re.M):
            return True

    noindex = bool(re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\'][^"\']*noindex', text, re.I | re.S))
    meta_refresh = bool(re.search(r'<meta[^>]+http-equiv=["\']refresh["\'][^>]*>', text, re.I | re.S))
    location_redirect = bool(re.search(r'window\.location(?:\.replace)?\s*\(', text, re.I))
    return noindex and (meta_refresh or location_redirect)


expected_services, expected_overview = normalized_service_groups(LOCK)

nav_groups = groups(NAV, 'nav')
assert nav_groups == expected_services + [('Overview', expected_overview)], 'nav silo differs from lock manifest'

footer_groups = groups(FOOTER, 'footer')
footer_services = [group for group in footer_groups if group[0] != 'Site Navigation']
assert footer_services == expected_services, 'footer service silo differs from nav/lock manifest'

expected_site = [tuple(x) for x in LOCK['site_navigation']]
site = next(items for name, items in footer_groups if name == 'Site Navigation')
assert site == expected_site, 'footer Site Navigation differs from lock manifest'
assert ('All Services', '/services/') in site, 'footer Site Navigation must contain All Services'
assert 'MIRRORS THE APPROVED PRIMARY SERVICE SILO' in FOOTER, 'footer lock marker missing'

for page in ROOT.rglob('*.html'):
    if any(x in page.parts for x in ('.git', '_site', 'vendor', '_includes')):
        continue
    text = page.read_text(encoding='utf-8')
    if is_redirect_page(text):
        continue
    assert '{% include nav.html %}' in text, f'{page} missing shared nav include'
    assert '{% include footer.html %}' in text, f'{page} missing shared footer include'
    assert '<nav class="nav-links">' not in text, f'{page} contains hard-coded nav'
    assert 'class="site-footer"' not in text, f'{page} contains hard-coded footer'

print('SILO CHECK PASS')
