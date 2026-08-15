---
name: local-business-schema
description: Plan, inject, extend, audit, and maintain JSON-LD schema for local-service WordPress websites while pages are being built. Use for new Home, Services, Service Areas, individual service, FAQ, Blog, article, contact, about, or location pages; Yoast schema-graph changes; business entity/site representation; schema residue checks; and final SEO reviews.
---

# Local Business Schema

Build schema alongside visible page content. Treat the final SEO check as verification, not the first implementation stage.

## Required References

Read `references/schema-patterns.md` when choosing types, properties, page mappings, or validation rules.

Also follow:

- `C:\Users\USER\Documents\Codex\Barry\seo\SOPs\yoast-seo-setup.md`
- `C:\Users\USER\Documents\Codex\Barry\content\SOPs\local-service-seo-copywriting.md`

## Build-Time Workflow

1. Read the client brief, master data, page type, visible content, contact data, service areas, logo and verified profiles.
2. Inspect the rendered page for existing JSON-LD before adding anything.
3. Create or update the client `schema-plan.md` with the global entity ID, business type decision, verified properties and page map.
4. Ask only for missing facts that would otherwise create a false entity, location, licence, review, opening-hours or profile claim. Accept `N/A`; omit unsupported properties.
5. Plan schema before writing the page so headings, FAQs, services and visible claims provide the source content.
6. Build the visible page.
7. Inject or extend the relevant schema before marking that page complete.
8. Validate the rendered public JSON-LD and record the result in `schema-plan.md`.

## Global Graph

Create one canonical business entity and reuse its `@id` everywhere.

Default IDs:

- Business: `{canonical-home-url}#organization`
- Website: `{canonical-home-url}#website`
- Page: `{canonical-page-url}#webpage`
- Service: `{canonical-page-url}#service`
- FAQ: `{canonical-page-url}#faq`

Prefer Yoast's existing IDs when it already emits the correct entity. Never create a second competing Organisation/LocalBusiness graph.

The global graph may include only verified values:

- truthful `Organization`, `LocalBusiness`, or narrower subtype
- name, canonical URL, logo and description
- telephone and email
- public address and geo only when confirmed
- `areaServed`
- opening hours only when confirmed
- verified social/profile URLs through `sameAs`
- service catalogue relationships

Do not force a narrow trade subtype merely for keywords. If a service-area business has no confirmed public address, do not invent one to satisfy LocalBusiness rich-result requirements.

## Page Schema

- Home: `WebPage` plus the global business and `WebSite` graph.
- Services hub: `CollectionPage` with an `ItemList` or offer/service catalogue linked to published service pages.
- Individual service: `WebPage` plus one `Service` entity with provider, service type, area served, URL, image and description.
- Service Areas hub: `CollectionPage` and `ItemList`/`Place` references; use `areaServed` and never invent branch locations.
- Location page: use a page/place/service relationship; do not create a separate LocalBusiness unless a real staffed branch exists.
- FAQ section: `FAQPage` only when every question and answer is visible and materially identical on the page.
- Blog post: verify Yoast's `Article`/`BlogPosting`, author, publisher, dates and image; extend only when required.
- Contact/About: use `ContactPage`/`AboutPage` where the page genuinely serves that purpose.

## Injection Route

Use this order:

1. Correct Yoast Site Representation and its existing schema graph.
2. Extend Yoast through supported WordPress filters/schema pieces, linked by `@id`.
3. Use a small site-specific plugin or MU plugin for repeatable per-page graph pieces when needed.
4. Use an Elementor HTML widget only as a last resort for a simple page-specific block.

WordPress/Yoast access is sufficient. An external MCP is not required. Elementor MCP may help map pages, but it is not a schema dependency.

Keep one source of truth. Do not output the same FAQ, Organisation, Service, Article or breadcrumb entity from multiple plugins/widgets.

## Safety Rules

- Schema must describe visible, current and truthful content.
- Never invent addresses, coordinates, licences, prices, ratings, review counts, opening hours or profiles.
- Add `Review` or `AggregateRating` only from verified, visible and approved review data.
- Do not create fake local branches or city entities for service-area SEO.
- Do not mark ordinary sales copy as a FAQ.
- Do not promise rankings, rich results or LLM citations.
- Preserve one canonical URL and stable `@id` per entity.

## Validation

After each page build:

1. Inspect the rendered `<script type="application/ld+json">` output.
2. Confirm expected types and stable IDs.
3. Check for previous-client names, logos, phone numbers, URLs and duplicate entity types.
4. Confirm FAQ text matches the visible page.
5. Confirm every referenced image and URL resolves.
6. Run `scripts/audit_schema.py` for a fast site/page inventory.
7. Use Schema.org Validator for vocabulary/graph checks and Google Rich Results Test for Google-supported features when accessible.

The audit script is diagnostic; rendered output and official validators remain the source of truth.

## Final SEO Check

During the sitewide SEO check:

- audit the global business/website graph
- audit every published ranking page and post
- detect duplicates and inherited-client residue
- verify service, service-area, FAQ and article coverage
- verify social/profile relationships
- compare schema facts with visible content and client records
- report valid, missing, unsupported and intentionally omitted properties
- update `schema-plan.md` with maintenance notes

Do not rebuild valid schema merely to change style or formatting.

