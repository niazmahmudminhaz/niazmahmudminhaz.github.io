# CLAUDE.md — Niaz Mahmud Minhaz SEO Consultant Website

## Project
Personal SEO consultant portfolio. Jekyll-processed static site on GitHub Pages.
~71 published pages. Production: https://niazmahmudminhaz.github.io/
Subject/owner: Niaz Mahmud Minhaz — SEO consultant, Dhaka, Bangladesh, global remote.

## Current working phase
Content, topical authority, internal linking, and conversion enhancement — **content layer only.**
This is NOT a redesign. Guiding principle: improve information architecture and content
quality with the smallest possible technical change. Optimize for better outcomes at lower
risk, never for "more changes."

## PROTECTED — do NOT modify without explicit, per-change authorization
- `robots.txt` (directives, sitemap reference)
- `sitemap.xml` (URLs, order, structure — no add / remove / reorder)
- JSON-LD / structured data (types, `@id`, properties, entity relationships) — already audited, keep untouched
- Canonical tags
- Meta robots
- Existing `<title>` tags and meta descriptions — do not weaken; optimize only with explicit approval
- Web3Forms endpoint, fields, submission logic, success/failure behavior, email workflow
- hCaptcha / reCAPTCHA structure
- Published URLs and directory names — no renames or redirects without approval
- Functional JavaScript (theme toggle, mobile nav, services "silo" menu, blog-nav injection, article CTA) — no refactor for cleanliness
- CSS / design system (colors, typography, spacing, components, responsive behavior)
- Existing SEO fundamentals (heading structure, alt text, internal links) — never remove or weaken

Whenever a file is touched, the changelog must report these systems as unchanged.

## Content objective
Strengthen content quality, topical authority, search-intent coverage, semantic/entity
relevance, E-E-A-T, internal linking, information architecture, and conversion clarity.
Target ~1,500+ meaningful words on major commercial/informational pages ONLY where the
page intent supports it. Depth and usefulness beat word count. No filler, padding,
repeated definitions, unnecessary headings, repeated CTAs, or keyword stuffing.

## Truthfulness (hard rules)
Never invent clients, results, traffic numbers, testimonials, reviews, certifications,
awards, case-study outcomes, statistics, or personal experience. Never promise guaranteed
rankings, traffic, leads, or indexing. Where evidence is unavailable, use general
educational wording. E-E-A-T signals must reflect the owner's real, current experience.

## Keyword approach
Primary keyword + close variants + semantic entities + related concepts + question-based
queries + long-tail phrases + geographic modifiers where genuinely relevant. Write for a
knowledgeable human reader. Never force exact-match keywords into every heading.

## Editing workflow (per file)
1. Read the entire file. 2. Understand its role and page type. 3. Identify protected vs.
content-editable regions. 4. Make the smallest safe change. 5. Reuse existing components,
typography, and spacing. 6. Preserve formatting and behavior. 7. Validate. 8. Log.

Never run a blind bulk find/replace across pages. **Page templates differ** — at least two
service-page generations exist, and navigation / conversion-CTA structures vary between
pages. Always compare page types before editing any shared block.

## Batches (STOP for approval after each; never auto-continue)
1. Homepage, About, Services hub
2. Technical SEO, SEO Audits, On-Page SEO, Local SEO
3. Off-Page SEO, AI Search SEO, AEO, GEO, Hyperlocal SEO
4. Remaining service pages
5. Case Studies, Reviews, FAQ, SEO Strategy Lab
6. Insights hub + insight articles
7. Blog articles

## Validation after each batch
- HTML: valid structure, no missing/duplicated tags, no malformed markup
- SEO: titles, meta descriptions, canonicals, meta robots, and schema all unchanged
- Links: no broken internal links, no URL changes, no references to nonexistent pages
- Forms: Web3Forms works; captcha structure unchanged
- JavaScript: existing interactions intact, no console errors
- Responsive: mobile no overflow, desktop layout intact, cards/tables usable
- Content: no duplicate paragraphs, keyword stuffing, fabricated evidence, or filler

## Changelog (report per modified page)
file path · page topic · main content changes · word count before → after · primary search
intent · primary topic · internal links added · design/CSS modified? (should be "no") ·
protected systems line: `robots.txt / sitemap.xml / schema / canonical / Web3Forms / captcha: unchanged`.

## Internal-linking model
Home → service hubs → individual services → supporting articles → related services →
contact. Use meaningful anchor text and clear topical clusters/silos; avoid linking
everything to everything. Priority: connect deep-but-orphaned pages (tier-2 service pages
and long blog articles) into their clusters, and route link equity toward conversion pages.
The cluster map lives in `_data/topic-map.yml` (not rendered to HTML).
