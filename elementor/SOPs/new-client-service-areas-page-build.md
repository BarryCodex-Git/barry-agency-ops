# SOP: New Client Service Areas Page Build

Use this SOP when creating the main Service Areas page for a new client.

For new-client builds, the Service Areas page must be the approved Elementor Service Areas hub page from the imported master/template, or a duplicate of an approved Elementor source. Do not create or replace it with WordPress block editor content or custom standalone HTML/CSS.

## Goal

Convert the approved Elementor Service Areas hub into a location hub page that prepares the client's site for future hub-and-spoke local SEO pages.

## Required Inputs

- Primary location
- Primary service areas or regions
- Sub-locations inside each primary service area, if supplied
- Main service category
- Primary service keyword
- Client phone/CTA
- Approved region images or location image plan
- AI Images brand guide/example folder, if available

## Process

1. Confirm the `Service Areas` page is an Elementor page from the approved imported master/template.
   - If missing, duplicate the approved Elementor Service Areas source or stop and ask.
   - Do not use the WordPress block editor content body as the visible Service Areas page.
2. Read `content/SOPs/local-service-seo-copywriting.md`.
3. Use the Services hub page style and structure as the design base unless the user requests a different layout.
4. Use `elementor/references/master-template-service-areas-page-map.md` as the structural reference.
5. Add hero and opening intro content explaining service coverage.
   - Eyebrow/bubble must match the page purpose.
   - H1/H2/H3 content must be client-specific and based on the intake.
   - Body copy must use the company name, main service category, primary location, primary service areas, and target customer type.
   - This top content area must never remain demo/template wording.
6. Create one section per primary service area.
   - If sub-locations are not supplied, Barry researches 8-12 high-value sub-locations per region.
   - Prioritise residential suburbs, commercial districts, estates, coastal pockets, high-value smaller towns, and locally relevant areas.
7. Each primary service area section must include:
   - eyebrow
   - H2 heading
   - description
   - 8-12 sub-location cards where appropriate
8. For each sub-location card, include:
   - location title
   - short local coverage copy
   - CTA using `service + location`
   - placeholder link unless spoke pages already exist
   - a genuine landmark, skyline, streetscape or landscape image relevant to the location group; do not use service-technician or equipment images as location-card substitutes
9. Use existing approved service-area images first.
   - A small approved set may be reused across nearby sub-locations, but every image must still read as a place/landscape image.
10. Before generating any missing location images, inspect `assets/AI Images/`, `assets/AI Images/brand guide/`, `brand-image-rules.md`, approved generated images, and `image-plan.md`.
11. Prepare Yoast metadata and verify it in the rendered page head.
12. Save the service-area and sub-location map in the client folder.
13. Use `seo/skills/local-business-schema/SKILL.md` to add/verify `CollectionPage`, truthful `ItemList`/`Place` references and `areaServed` relationships. Do not create fake branches or addresses.
14. Validate the rendered schema and record the page result in `schema-plan.md`.
15. Open the page for review.

## Hub-And-Spoke Rules

- The Service Areas page is the main location hub.
- The main Service Areas page targets the broad service-region relationship, for example `Plumber Garden Route`.
- Primary service-area sections/cards are future regional hub pages, for example `Plumber George`, `Plumber Mossel Bay`, `Plumber Knysna`, `Plumber Oudtshoorn`.
- Build and approve the primary regional hub pages before building suburb hubs.
- Regional hub pages must nest under the main Service Areas page, for example `/service-areas/george/`.
- Regional hub pages must list the relevant local suburbs/areas for that region and prepare those pages as the next hub layer.
- Regional and suburb hub heroes must be copied from the approved hero source for that page type. Only update the H1, concise hero paragraph, trust bubbles if needed, SEO data, and the intended hero background image media fields.
- When replacing a hero image, do not change overlay opacity, overlay color, background position, background size, blend mode, fallback style, shape dividers, hero height, form placement, section width, spacing, or responsive settings unless the user explicitly asks for those hero settings to change.
- Regional hub pages must use the approved local-area card section copied from the main Service Areas page for the bottom suburb/local-area section. Copy the existing Elementor section/container structure first, then update only text, images, links, labels and SEO fields. Do not manually recreate the section when a matching approved section already exists.
- This is a high-level uniformity rule: preserve the original widget choices, fonts, sizes, spacing, cards, divider, button styling, responsive behaviour and section widths from the approved section.
- Do not redesign approved repeated sections to solve content-order problems. If copied widget order is wrong, fix the copied widgets while preserving the approved structure, or copy a clean source section again.
- A regional hub local-area section must keep the uniform heading stack: blue bubble/eyebrow, H2, separator, centred description, then the boxed card grid.
- The first local-area card on a regional hub must be a prime suburb/local area, not the region overview title. The section H2 must stay in the heading area above the grid.
- Every local-area card must have matching title, description and button text. Do not allow shifted card data where one suburb title uses another suburb's description or CTA.
- Each local-area card should use a unique relevant landscape, skyline, estate, suburb, streetscape or landmark image for that specific local area. Do not duplicate the same location image across all cards unless the user explicitly approves a temporary placeholder pass.
- Local-area image filenames and alt text must target `plumber + suburb + region`, for example `h2o-plumbers-plumber-heather-park-george-service-area.webp`.
- Regional hub content blocks must not repeat the same square/support image across adjacent two-column sections. Use a distinct service/team image and a distinct location/landscape image where the layout has multiple image blocks.
- Square image containers must receive true 1000x1000 `.webp` files that fill the rounded image frame edge-to-edge. Do not place landscape images into square containers, do not leave generated white borders/bands inside the file, and do not leave copied non-square custom dimensions such as 1366x1080 on square image widgets.
- Do not add extra mid-page CTA rows on regional hub pages unless explicitly approved after visual review. Use the existing template CTA positions by default.
- On regional hubs, service cards must not link back to broad region service pages such as `/services/blocked-drains-garden-route/`. Use temporary placeholder links until the correct service-location spokes are created.
- Informational icon-box sections on location hubs, such as problem summaries, property-type support cards, trust points, process points or local issue cards, must not link out. Only dedicated service cards, service-area cards, menus and approved CTA buttons should contain hyperlinks.
- Regional hub H1s should include a natural quality adjective where appropriate, for example `Professional Plumber In George` or `Top Rated Plumber In George`, without keyword stuffing.
- Sub-location/suburb hub pages nest under their regional hub, for example `/service-areas/george/heather-park/`.
- Sub-location hub pages target `{service category} + {suburb}`, for example `Plumber Heather Park`, and must include a spoke section linking to all service-location pages for that suburb.
- Service-location spoke pages nest below the suburb hub, for example `/service-areas/george/heather-park/blocked-drains/`, and target `{service} + {suburb}`.
- Do not create bulk spoke pages until the client signs up for SEO and the user approves the plan.
- After any service-location spoke pages are created, Barry must update the parent hub page links immediately. The parent hub service cards, related-service cards, and any relevant spoke/list section must link to the newly created child pages instead of broad service pages or placeholder `#` links.
- Verify the internal link pass after creation: every new spoke must return HTTP 200, must have the correct parent page, must contain the target location in its copy, and the parent hub must contain links to each new spoke page.
- Do not invent areas randomly. Use intake data first, then local research for suburbs, business districts, estates, coastal pockets, high-value smaller towns and high-value residential areas.
- Keep location targeting practical and locally believable.
- Vary local descriptions between regions and sub-locations.
- Do not reuse the same suburb-card sentence pattern across a region.
- Complete every top-of-page content area from intake data during setup. Do not leave demo copy in the hero, opening intro section, regional descriptions, FAQs, or CTA support text.
- Do not publish internal build language such as `demo`, `template`, `future SEO`, `SEO growth`, `if the client signs up`, `if the client expands`, `hub-and-spoke`, or `prepares the website`. Public copy must speak to customers, not describe Barry's setup process.
- Do not edit global contact button text after the buttons are set. Button text may be used later by Google Tag Manager for conversion tracking. Update button links/contact values only through the approved global CTA source or explicit contact-detail process.
- The Area Note section must have a real reader and SEO purpose. It should explain one useful local boundary, practical customer issue, regulation, municipal/reporting point, safety consideration, or service limitation that fits the page.
- Each Area Note must include one relevant external authority link where possible, such as a local municipality, government department, recognised public resource, industry body, or high-authority reference. Do not use the Area Note for repetitive filler or to restate the same service coverage copy already used elsewhere on the page.

## Recent Work Completed / Local Examples On Location Pages

- Location hubs and future spoke pages must use the local examples section for completed-work style examples in the target area.
- These examples are SEO-critical and must show real-world service problems solved in local suburbs, estates, commercial areas, guesthouses, rentals or homes.
- Barry may create realistic completed-work examples when the client provides that service in the area. Do not weaken this section with public wording such as `scenario`, `hypothetical`, `not a fake claim`, or `representative example`.
- Each example must include a specific local area, property context, service problem, practical checks, work completed and useful outcome.
- Do not invent customer names, exact street addresses, reviews, ratings, guarantees, licences, awards, emergency promises or project counts.
- Every page must have unique examples. Vary suburb order, job type, opening line, diagnosis, repair logic and outcome so the content does not read like a template.

## SEO Rules

- Main focus keyphrase example: `plumber service areas Garden Route`.
- Regional H2 example: `Plumber in George and Nearby Areas`.
- Sub-location CTA example: `Plumber in Heather Park`.
- Use natural local copy and avoid keyword stuffing.
- Save final sub-location lists in the client folder for future SEO planning.
- Use `assets/AI Images/brand guide/` and approved AI images as the main style reference for any generated location images.
- Use local references only where they are believable and useful.
