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

## Current approved information architecture
Primary navigation: Home → Services → About → Case Studies → Contact.
Certifications are a section of About at `/about/#certifications` and are not a primary-nav item.
FAQ remains `/faq/` as a supporting resource and is not a primary-nav item.
Use **Blog**, not Insights, for the main educational content concept.
Do not present SEO Mentorship as an offered service. The owner is not an SEO mentor.
The owner genuinely works with Webflow, Wix, and Squarespace CMS-based websites; these are
legitimate platform-specific SEO services alongside WordPress, WooCommerce, and Shopify.
White-Hat SEO may be a service/methodology page when it provides distinct value.

## Existing-site preservation rule
Do NOT rebuild or redesign the website from scratch. Preserve the homepage structure,
main introduction image, current visual assets, fonts, typography, colors, CSS language,
existing animations/transitions, buttons, cards, layout patterns, theme system, responsive
behavior, navigation behavior, forms, and overall visual identity. Improve by keeping,
refining, reorganizing, and adding around what already works. Prefer:
**Keep → Improve → Expand → Reorganize → Enhance**.
When uncertain whether an existing element should be removed, preserve it and ask first.

## Batches
When a user explicitly authorizes completion of the full approved scope, you may proceed
through all necessary batches after inspection. Otherwise use the normal staged plan:
1. Services architecture and platform pages
2. Core service pages
3. Authority/evidence pages
4. Blog structure and articles

Always stop and ask before any destructive or ambiguous change, especially anything that
could alter URLs, redirects, schema, sitemap, robots, forms, functionality or compatibility.

## Validation before push
- HTML: valid structure, no missing/duplicated tags, no malformed markup
- Content: useful, intent-satisfying, no filler, no fabricated evidence
- Links: no broken internal links or nonexistent destinations
- Responsive: no overflow; mobile and desktop remain usable
- Functionality: navigation, theme toggle, forms and CAPTCHA remain intact
- Protected systems: robots, sitemap, schema, canonicals, meta robots, Web3Forms, CAPTCHA,
  published URLs, redirects, functional JS and CSS remain unchanged unless separately authorized
- Review the complete Git diff before push

## GitHub publishing rule
Changes may be pushed to `main` only after they have been inspected, validated, tested,
and reviewed in full. Never push a partially completed or unverified implementation.
If anything is uncertain or potentially risky, STOP and ask the owner.

## Internal-linking model
Home → Services hub → individual services → relevant Blog resources → related Case Studies → Contact.
Use meaningful anchor text and genuine topical relationships. Avoid linking everything to everything.
The cluster map lives in `_data/topic-map.yml` (not rendered into public HTML).
