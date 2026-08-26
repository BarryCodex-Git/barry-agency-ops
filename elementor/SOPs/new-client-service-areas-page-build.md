# SOP: Service Areas Add-On Page Build

Use this SOP only when the user explicitly starts the Service Areas add-on after the standard New Client Build is complete, for example: `Let's build the Service Areas page for this client.`

The standard New Client Build identifies the primary service regions and presents them on the Home page. It does not research, populate or complete the full Service Areas hub. Do not continue into this SOP automatically from the Home page, Services hub or individual service-page workflow.

For new-client builds, the Service Areas page must be the approved Elementor Service Areas hub page from the imported master/template, or a duplicate of an approved Elementor source. Do not create or replace it with WordPress block editor content or custom standalone HTML/CSS.

## Goal

Convert the approved Elementor Service Areas hub into a complete location hub with the approved primary-region and sub-location card structure, ready for later regional hubs and service-location spoke pages.

## Add-On Trigger And Prerequisites

Begin only when:

- the user has explicitly requested the Service Areas add-on
- the standard New Client Build is complete or the user has deliberately authorised this add-on early
- the primary service regions from the intake have already been confirmed
- the Home page primary-region cards and their location-to-image mapping are known
- the approved Elementor Service Areas page exists and is safe to edit

When the standard New Client Build finishes, report this page as an available add-on. Do not treat the existence of a blank or imported Service Areas template page as permission to populate it.

## Required Inputs

- Primary location
- Primary service areas or regions
- Sub-locations inside each primary service area, if supplied
- Main service category
- Primary service keyword
- Verified local-residence, trading-history or local-expertise context supplied by the intake/client
- Client phone/CTA
- Approved region images or location image plan
- AI Images brand guide/example folder, if available

Primary location controls the Service Areas page's local copy style. Barry must use the correct English variant, local place hierarchy, terminology, units, quoting/estimate language and customer expectations for that location. If the Primary location is missing or ambiguous, ask before writing or applying final copy.

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
   - Any inline image beside this intro or another coverage/support text block must use a genuine 1000x1000 square WebP source file. Do not reuse the Service Areas hero/background landscape asset in the inline image widget.
6. Create one section per primary service area.
   - Research and select exactly 12 valuable sub-locations per primary region unless the user explicitly approves another count.
   - Use supplied sub-locations where suitable, then complete the set through local research.
   - Prioritise established suburban areas, higher-income residential zones, large residential estates, gated communities, commercial districts and industrial zones.
   - Exclude informal settlements, townships, numbered extensions and duplicated or near-duplicated place names.
   - Never use the primary region itself as a sub-location card. The primary-region cards already form the regional hub layer at the top of the page.
   - A genuinely distinct place may remain even when its name is related to the region, such as `Pretoria CBD` beneath `Pretoria Central`, but the distinction must be real and useful.
7. Each primary service area section must include:
   - eyebrow
   - H2 heading
   - description
   - exactly 12 sub-location cards unless the user explicitly approves another count
8. For each sub-location card, include:
   - location title
   - short local coverage copy
   - CTA using `service + location`
   - placeholder link unless spoke pages already exist
   - a genuine landmark, skyline, streetscape or landscape image relevant to the location group; do not use service-technician or equipment images as location-card substitutes
   - a true 3:2 landscape WebP card asset, normally 1200x800, unless the approved template map documents a different card ratio
   - a one-to-one match between the card title, destination URL, visible location, filename and alt text
9. Use existing approved service-area images first.
   - Every primary region and every visible local-area card must have its own place-relevant image. Do not reuse one image for different named locations unless the user explicitly approves a temporary placeholder pass.
   - Keep each location mapped to the same approved image wherever that location appears on the Home page and Service Areas page.
   - Keep the complete location image set visually coherent in colour, lighting and photographic style.
10. Before generating any missing location images, inspect `assets/AI Images/`, `assets/AI Images/brand guide/`, `brand-image-rules.md`, approved generated images, and `image-plan.md`.
    - Generate one representative location image first and obtain user approval before continuing with the remaining location-image set.
    - After approval, produce the remaining images in an efficient batch while preserving the approved style.
11. Prepare Yoast metadata and verify it in the rendered page head.
12. Save the service-area and sub-location map in the client folder.
13. Use `seo/skills/local-business-schema/SKILL.md` to add/verify `CollectionPage`, truthful `ItemList`/`Place` references and `areaServed` relationships. Do not create fake branches or addresses.
14. Validate the rendered schema and record the page result in `schema-plan.md`.
15. Open the page for review.

## Approved Main Service Areas Hub Design

The approved top-half design for a new-client Service Areas hub is fixed before suburb cards or deeper hub-and-spoke work begins.

### 1. Location-Led Hero

- Use a natural H1 pattern such as `Locations We Service Throughout the {Primary Region}`.
- The hero paragraph should name the current primary service regions from the client intake and explain that the visitor can share their suburb, service need and access details to confirm coverage.
- Add two short yellow trust bubbles beneath the paragraph using the approved hero-pill style.
- Keep trust-bubble wording location-relevant and count-neutral. Suitable patterns include `Primary Service Regions` and `Local Service Knowledge`.
- Never write a fixed number of regions into the H1, H2, section description or trust bubbles. The client intake may change, so the headings must remain valid when regions are added or removed.

### 2. Primary Service Areas Section

- Use the exact eyebrow `PRIMARY SERVICE AREAS`.
- Use a count-neutral H2 pattern such as `Primary {Service Category} Service Areas Across the {Primary Region}`.
- The cards immediately below this heading represent the primary service regions supplied on the client intake form.
- Populate the cards from the current intake; do not assume there will always be four, five or another fixed number.
- Keep this section conceptually separate from suburb/sub-location cards. Primary-region cards are the first regional hub layer; suburb cards are a later spoke-planning layer.

### 3. Local Trust Sections

Place two complementary paired text/image trust sections after the primary-region cards and before FAQs or the later suburb/spoke section.

The first uses the eyebrow `{PRIMARY LOCATION} RESIDENTS` and should explain the business's verified local connection. When the client/intake confirms that the owners or team live in the area, explain naturally that years of local residence help them understand neighbourhood layouts, property access and travel considerations. Do not invent a local-residence or trading-history claim when it has not been verified.

The second uses the exact eyebrow `LOCAL EXPERTISE` and should explain how local familiarity improves the customer experience: clearer coverage confirmation, better access questions, realistic service preparation and a practical next step.

Each trust section must include:

- a descriptive service-and-location H2
- a purposeful customer-facing H3
- a human paragraph of two or three connected sentences
- three complete `Label: explanation` trust points
- the approved tracked contact actions where the template provides them

Keep their purposes distinct. `{PRIMARY LOCATION} RESIDENTS` establishes the verified local connection; `LOCAL EXPERTISE` explains how that connection improves planning and booking.

### Add-On Scope Boundary

This add-on completes the main Service Areas hub, including the hero, primary-region cards, local-trust sections and exactly 12 researched sub-location cards per primary region. It does not automatically create regional child hubs, suburb hubs or service-location spoke pages. Card links remain approved placeholders until those future pages and their URL structure are authorised.

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
- On the main Service Areas page, no sub-location card may duplicate its parent primary region. The primary-region cards at the top of the page already represent those destinations.
- Every local-area card must have matching title, description and button text. Do not allow shifted card data where one suburb title uses another suburb's description or CTA.
- Each local-area card should use a unique relevant landscape, skyline, estate, suburb, streetscape or landmark image for that specific local area. Do not duplicate the same location image across all cards unless the user explicitly approves a temporary placeholder pass.
- This unique-place rule applies to every linked card throughout the hierarchy: primary regional hubs, suburb/estate/town/neighbourhood hubs, sub-location cards and service-plus-location spoke cards. Any service card whose link target is location-led is a location card for image-selection purposes.
- Before publishing links, run a one-to-one matrix audit for `card title -> CTA destination -> visible place -> media filename -> alt text`. Every row must resolve to the same named location.
- Service-area card imagery represents the named place, not the trade. Never use a service truck, technician, equipment or job-site image as a substitute for a city, suburb, landscape, aerial view or landmark image.
- Prepare card media as true 3:2 landscape WebP files, normally 1200x800, unless the approved template map documents another card ratio. Do not confuse card media with paired-content/support image widgets, which remain true 1000x1000 square files, or with hero/section backgrounds, which remain true 1920x1080 files.
- Local-area image filenames must use a natural `[client]-[service]-[location]-service-area-1200x800.webp` pattern. Alt text must honestly describe the visible place and name the correct location; do not force a service keyword into a purely geographic photograph.
- Record stock/download source, creator and licence in the client asset manifest, and preserve required attribution in media metadata or another approved attribution location.
- Regional hub content blocks must not repeat the same square/support image across adjacent two-column sections. Use a distinct service/team image and a distinct location/landscape image where the layout has multiple image blocks.
- Square image containers must receive true 1000x1000 `.webp` files that fill the rounded image frame edge-to-edge. Do not place landscape images into square containers, do not leave generated white borders/bands inside the file, and do not leave copied non-square custom dimensions such as 1366x1080 on square image widgets.
- This square rule applies to the main Service Areas page as well as regional and suburb hubs. It specifically includes the opening coverage section and every repeated two-column text/image support section, not only cards or regional-page content blocks.
- Before sign-off, audit every inline image widget on the page by actual media dimensions and verify the desktop two-column sections use 1000x1000 WebP sources. Do not approve a page because Elementor happens to crop a landscape source into a square-looking frame.
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
- Select exactly 12 useful sub-locations per primary region unless the user explicitly approves another count.
- Exclude townships, informal settlements, numbered extensions and exact or near-duplicate names. Run a duplicate audit both within each region and across the complete page.
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
- Give every sub-location card its own location-specific title, useful client-facing description and CTA. Do not reuse generic copy with only the place name swapped.
- Keep every sub-location card mapped one-to-one to its title, copy, CTA, future URL, image filename, visible scene and alt text.
- Use `assets/AI Images/brand guide/` and approved AI images as the main style reference for any generated location images.
- Use local references only where they are believable and useful.
