from pathlib import Path
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://niazmahmudminhaz.github.io"


def page_url(path: Path) -> str:
    relative = path.relative_to(ROOT).as_posix()
    if relative == "index.html":
        return BASE + "/"
    return BASE + "/" + relative.removesuffix("/index.html").rstrip("/") + "/"


def is_redirect_page(text: str) -> bool:
    front_matter = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.S)
    if front_matter:
        metadata = front_matter.group(1)
        if re.search(r"^redirect_to:\s*\S+\s*$", metadata, re.M) and not re.search(r"^redirect_from:", metadata, re.M):
            return True

    noindex = False
    for tag in re.findall(r"<meta\b[^>]*>", text, re.I):
        name = re.search(r'\bname=["\']([^"\']+)["\']', tag, re.I)
        content = re.search(r'\bcontent=["\']([^"\']+)["\']', tag, re.I)
        if name and content and name.group(1).strip().lower() == "robots":
            if re.search(r"\bnoindex\b", content.group(1), re.I):
                noindex = True
                break
    meta_refresh = bool(re.search(r'''<meta[^>]+http-equiv=["']refresh["']''', text, re.I))
    js_redirect = bool(re.search(r"window\.location(?:\.replace|\.assign)?\s*\(", text, re.I))
    return noindex and (meta_refresh or js_redirect)


def canonical_from(text: str):
    match = re.search(
        r'''<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)''',
        text,
        re.I,
    )
    if not match:
        match = re.search(
            r'''<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']''',
            text,
            re.I,
        )
    return match.group(1) if match else None


sitemap = ROOT / "sitemap.xml"
tree = ET.parse(sitemap)
root = tree.getroot()
ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

sitemap_urls = [
    loc.text.strip()
    for loc in root.findall("sm:url/sm:loc", ns)
    if loc.text and loc.text.strip()
]

errors = []

if len(sitemap_urls) != len(set(sitemap_urls)):
    errors.append("sitemap.xml contains duplicate URLs")

if any(not url.startswith(BASE + "/") for url in sitemap_urls):
    errors.append("sitemap.xml contains a URL outside the primary site")

indexable = {}
redirects = {}

for path in ROOT.rglob("*.html"):
    if any(part in {".git", "_site", "vendor", "_includes"} for part in path.parts):
        continue
    if path.name == "404.html":
        continue

    text = path.read_text(encoding="utf-8")
    url = page_url(path)

    if is_redirect_page(text):
        redirects[url] = path
        continue

    indexable[url] = (path, text)

sitemap_set = set(sitemap_urls)
indexable_set = set(indexable)
redirect_set = set(redirects)

for url in sorted(sitemap_set & redirect_set):
    errors.append(f"sitemap contains redirect/noindex URL: {url}")

for url in sorted(sitemap_set - indexable_set - redirect_set):
    errors.append(f"sitemap URL has no matching source page: {url}")

for url in sorted(indexable_set - sitemap_set):
    errors.append(f"indexable page missing from sitemap: {url}")

for url, (path, text) in indexable.items():
    canonical = canonical_from(text)
    if not canonical:
        errors.append(f"indexable page missing canonical: {path}")
    elif canonical.rstrip("/") != url.rstrip("/"):
        errors.append(f"canonical mismatch: {path} -> {canonical} (expected {url})")

if errors:
    print("\n".join(errors))
    raise SystemExit(f"Indexability integrity check failed with {len(errors)} issue(s).")

print(f"INDEXABILITY CHECK PASS: {len(indexable)} indexable pages, {len(redirects)} redirect/noindex pages, {len(sitemap_urls)} sitemap URLs.")
