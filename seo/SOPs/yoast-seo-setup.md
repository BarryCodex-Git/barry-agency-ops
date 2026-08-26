# SOP: Yoast SEO Setup

Use this SOP when preparing or applying SEO data for WordPress pages using Yoast.

## Goal

Create search-friendly page metadata and content structure for local service-business pages.

## Required Inputs

- Website/client folder
- Page type: home, service, blog, landing page
- Main service
- Primary location
- Company name
- Target audience
- CTA
- Related services

## Process

1. Read the client folder and master data sheet.
2. Identify the page type.
3. Create the primary keyphrase using `service + location`.
4. Write or review the H1.
5. Plan H2 sections.
6. Write SEO title.
7. Write meta description.
8. Recommend URL slug.
9. Prepare image alt text.
10. Prepare internal link suggestions.
11. Prepare FAQ section if appropriate.
12. Apply Yoast fields where available.
13. Verify the rendered public page head, not only the WordPress update response.
14. Visually check the page in browser if changes were applied.
15. Update the page SEO record.
16. Use `seo/skills/local-business-schema/SKILL.md` during the page build to inject the relevant graph pieces, then use it again here for the sitewide schema audit.
17. Confirm global business/WebSite identity, page-type coverage, stable `@id` links, FAQ/Article/Service coverage, duplicate entities and previous-client residue.
18. Validate rendered JSON-LD and update the client `schema-plan.md`.

## Yoast Green-Light Standard

Barry should aim for green Yoast SEO and readability lights on Home pages, Service pages, Services hub pages, Service Areas pages, and Blog posts.

Do not treat Yoast as optional decoration. Plan the copy so the key checks pass before the page is built.

Core green-light checks:

- Focus keyphrase appears naturally in the first visible paragraph or intro text.
- SEO title starts with, or very near starts with, the exact focus keyphrase.
- Meta description is specific, human, and normally 120-156 characters.
- Meta description includes the focus keyphrase or a close natural variant.
- H1 clearly supports the focus keyphrase.
- At least one H2 uses the exact focus keyphrase or a very close variant.
- Additional H2/H3 headings use natural synonyms and service/location variants.
- URL slug is short and includes the service/location target where appropriate.
- Image alt text includes honest visual descriptions with service/location relevance.
- Page includes useful internal links to related services, service areas, blog posts, or contact sections.
- Page includes at least one relevant outbound link only where useful and safe.
- Copy has enough depth for the page type and is not thin.
- Paragraphs are readable and not overly long.
- Sentence starts, sentence length, and paragraph rhythm are varied.
- Transition words are used naturally.
- Passive voice is kept low without making the writing awkward.

If Yoast shows a red or orange item after applying content, Barry should fix the copy or metadata before marking SEO complete, unless the user explicitly accepts the exception.

Human writing still comes first. Do not force exact keyphrases into text where it sounds unnatural. Use synonyms and variants where Yoast and readability allow it.

### Green Lights Are A Diagnostic, Not The Editorial Goal

Barry should target green Yoast SEO and readability results, but must never damage truthful, natural client-facing copy merely to change a traffic light.

- The focus keyphrase field enables Yoast's analysis; the field itself is not a public ranking signal.
- Treat red and orange checks as prompts to investigate, not instructions to insert awkward repetitions, unnecessary transition words, false claims or technically inaccurate synonyms.
- Fix genuine weaknesses such as a missing keyphrase topic, unclear title, absent description, thin copy, poor headings, missing links or unreadable paragraphs.
- Record any remaining non-green item and the human-first reason for accepting it. Do not silently ignore it.
- Truth, search intent, readability, technical accuracy and conversion clarity take precedence over mechanically satisfying every check.

## Mandatory Page SEO Record And Publication Gate

Every ranking page or post Barry creates must have a page SEO record before publication. This includes Home, Services, Service Areas, individual service pages, location pages and blog posts.

The record must include:

- WordPress page/post ID and canonical slug
- one unique primary focus keyphrase
- SEO title
- meta description
- Open Graph title, description and image
- X/Twitter title, description and image where supported
- H1 and opening-paragraph check
- at least one natural H2/keyphrase-variant check
- internal and outbound-link check
- image filename/alt-text check
- schema/page-type result
- rendered-head verification result
- Yoast SEO/readability status or a documented human-first exception

Hard gate:

- Do not publish or hand off a new ranking page while the focus keyphrase, SEO title or meta description is blank.
- Do not assume an Elementor/template import includes Yoast data. Yoast fields are post metadata and require their own application step.
- Do not reuse the source template's keyphrase or metadata on a duplicate. Every page needs unique intent-aligned metadata.
- Compare planned focus keyphrases across the site to prevent accidental duplication and cannibalisation.
- The publishing workflow must fail closed when the required page SEO record or rendered metadata is missing, unless the user explicitly approves a documented exception.

## Applying Yoast Fields

Yoast stores page SEO values as WordPress custom fields.

Preferred field keys:

- `_yoast_wpseo_focuskw`
- `_yoast_wpseo_title`
- `_yoast_wpseo_metadesc`
- `_yoast_wpseo_opengraph-title`
- `_yoast_wpseo_opengraph-description`
- `_yoast_wpseo_opengraph-image`
- `_yoast_wpseo_opengraph-image-id`

On some WordPress sites, these private Yoast fields are not writable through the normal `wp/v2/pages` REST `meta` object. A REST response may still return success while Yoast keeps the old metadata.

For Development 1 and similar WordPress setups:

1. Read the post's existing custom fields.
2. If the Yoast keys already exist, update the existing custom field IDs rather than adding duplicate keys.
3. Use XML-RPC `wp.getPost` to inspect `custom_fields` when REST does not expose Yoast fields.
4. Use XML-RPC `wp.editPost` with the existing custom field `id`, `key`, and new `value` to update Yoast fields.
5. If a field does not exist, create it once, then re-read custom fields to confirm its ID.
6. After updating, verify the live page head contains the new `<title>`, meta description, and Open Graph fields.
7. Do not mark Yoast complete until old client metadata is absent from the rendered page head.

Important:

- Avoid creating duplicate Yoast meta rows. Yoast may read the older row first.
- A successful WordPress REST update is not enough proof for Yoast.
- The verification source of truth is the public HTML head and Yoast's rendered metadata.
- Also re-read the admin custom fields to prove that the focus keyphrase is stored; it does not appear in the public HTML head.
- On staging/development domains, preserve the approved `noindex` setting. Before launch, switch the production site to the approved indexability state and verify robots output, canonical URLs, sitemap inclusion and rendered metadata.

## Homepage SEO

Homepage should target the primary service category and primary location.

For Barry new-client builds, use the Home Page intake fields:

- Primary service/industry
- Primary location/region

Home Page focus keyphrase patterns:

`{primary service or industry} {primary location or region}`

or, where a brand-led Home Page reads better:

`{company name} {primary location or region}`

Example:

- Focus keyphrase: `plumber Johannesburg`
- Focus keyphrase: `H2O Plumbers Garden Route`
- SEO title: `Plumber in Johannesburg | Company Name`
- Meta description: `Need a reliable plumber in Johannesburg? Company Name helps with emergency plumbing, blocked drains, geyser repairs, and more. Contact us today.`

Homepage content guidance:

- Primary location controls local language style, spelling, service-area terminology, units, and regional phrasing for Yoast titles, meta descriptions, headings, alt text, and page copy.
- H1 should use the primary service/location clearly.
- The first paragraph under the hero or first main content section should include the focus keyphrase or a close synonym.
- H2 headings should use human-readable phrasing and close variants. Do not make every H2 an exact-match SEO phrase.
- Satisfy Yoast's subheading check with one natural exact or close-match H2 where possible, then use variations elsewhere.
- A compact common-problems section should be used where the template supports it, because it adds problem-intent depth without turning the Home Page into a long article.
- FAQ answers should reinforce the focus keyphrase, primary location, service areas, and main services with useful detail.
- Service card H3s should stay short and service-specific; do not overload H3s with full keyphrases.
- SEO title should put the exact focus keyphrase at the beginning where possible.
- Meta description must fit the visible length target and should not run over Yoast's limit.

## Service Page SEO

Service pages should target one main service and one main location.

Example:

- Focus keyphrase: `blocked drain cleaning Johannesburg`
- SEO title: `Blocked Drain Cleaning in Johannesburg | Company Name`
- Meta description: `Fast blocked drain cleaning in Johannesburg. Company Name clears blocked sinks, toilets, showers, and main drains. Book reliable plumbing help today.`

Service page green-light guidance:

- Put the exact focus keyphrase in the opening paragraph.
- Use one H2 with the exact focus keyphrase or a close natural match.
- Use other H2/H3 headings for symptoms, causes, process, local relevance, FAQs, and next steps.
- Include image alt text for the service and location.
- Include internal links to the Services hub, Service Areas page, related services, and contact section.
- Keep copy long enough to answer the service properly rather than relying on thin brochure copy.

## Blog Post SEO

Blog posts should target useful question, advice, warning-sign, seasonal, or service-support topics.

Example:

- Focus keyphrase: `blocked drain warning signs Garden Route`
- SEO title: `Blocked Drain Warning Signs Garden Route | Company Name`
- Meta description: `Learn the blocked drain warning signs Garden Route property owners should watch for, including slow drains, gurgling pipes and bad smells.`

Blog post guidance:

- Use one clear focus keyphrase per post.
- Put the focus keyphrase or a close variant in the introduction.
- Use the exact focus keyphrase near the start of the SEO title where possible.
- Keep meta descriptions within Yoast's visible length target.
- Starter setup posts should normally be 600-900 words each, with enough practical detail to be useful.
- Use H2s and H3s to answer the topic properly, not just to repeat keywords.
- Include the location naturally where it helps the reader.
- Use a featured image and a mid-content image with SEO-friendly filenames and honest alt text.
- Add a useful CTA near the end.
- Verify the live page head after updating Yoast fields.

## Yoast Site Representation

For new client builds, verify that Yoast schema does not retain the previous template/client name or logo.

Check the public page source for:

- `WebSite` name
- `Organization` name
- `Organization` logo URL
- Open Graph image where relevant

If the old template/client brand remains, update Yoast site representation and re-run Yoast indexing where available. Do not mark the build complete while visible or Google-facing brand data still points to the previous client.

## Services Hub SEO

Services hub pages should target the main service category plus the primary location.

Example:

- Focus keyphrase: `plumbing services Garden Route`
- SEO title: `Plumbing Services Garden Route | Company Name`
- Meta description: `Explore Company Name services across the Garden Route, including general plumbing, leak detection, blocked drains and more.`

Services hub guidance:

- H1 should use the service category and location.
- H2 should reinforce that this is a service hub for the primary location/service area.
- Card H3s should usually be the service names only.
- FAQ should focus on booking, service coverage, customer types, urgent issues and service areas.

## Output

Report:

- Focus keyphrase
- SEO title
- Meta description
- Slug
- H1
- H2 plan
- Internal links
- Image alt text
- Yoast fields applied or pending
