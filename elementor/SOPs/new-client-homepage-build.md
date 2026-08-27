# SOP: New Client Homepage Build

Use this SOP when converting the first full Home page for a new client using the agency master Elementor template.

`template-content-replacement-guardrails.md` is controlling. This SOP supplies content requirements only; it does not authorize section, layout, typography, line-height, spacing, wrapper, overlay, hover, responsive, animation or form changes.

This is an Elementor template conversion SOP. Do not create or replace the Home page with WordPress block editor content, custom standalone HTML/CSS, or a non-Elementor fallback page.

For a standard New Client Build, this SOP is followed by:

- `elementor/SOPs/new-client-services-hub-page-build.md`
- `elementor/SOPs/new-client-about-page-build.md`

The full Service Areas hub is a separate add-on. The Home page must still identify and display the approved primary service regions, but Barry must not research or populate the full Service Areas page until the user explicitly requests that add-on.

## Goal

Convert the approved Elementor Home page into a client-ready, SEO-friendly, conversion-focused Home page by replacing its existing client-facing fields while preserving the complete master layout and styling.

## Required Inputs

- Website/domain to use
- Company name
- Main service category
- Five main Home page services
- Additional services for later Service Pages
- Primary location
- Primary Home Page service areas
- Additional service areas for later hub/spoke pages, if available
- Primary service area regions for the Service Areas page
- Secondary services
- Target customer
- Client folder path, if available
- Brand voice
- Primary CTA
- Phone/email/contact details, if approved for use
- Logo/brand colors, if available
- Images, if available
- AI Images folder and brand guide/example folder, if available
- Competitors/example sites, if available
- Google Business Profile or Google Maps link, if available

## Process

1. Confirm the target website exists in `website-directory.md`.
2. Confirm WordPress access is passed.
3. Confirm MCP readiness is passed.
4. Confirm the Home page target is the imported Elementor master Home page.
   - Confirm Elementor data exists before editing.
   - Do not use the WordPress block editor or normal page content body as the visible Home page.
   - If the Elementor Home page is missing or broken, stop and ask for a re-import or explicit repair approval.
5. If intake is missing, ask the user for `content/templates/client-homepage-intake.md`.
6. If a client folder path is provided, inspect it for logo files, client images, notes, intake data, and AI image references.
   - Check `assets/AI Images/`.
   - Check `assets/AI Images/brand guide/`.
   - Read `assets/AI Images/brand-image-rules.md` if it exists.
   - Never source images from the client's existing or previous website. That website is context-only.
   - Check for approved generated images and `image-plan.md`.
7. If a logo is found, derive the Elementor System Colors from the logo unless the user supplied preferred colours.
   - Apply the palette to Elementor global colors.
   - Confirm the visible global palette changes in Elementor/site CSS, not only individual widgets.
   - Specifically verify Elementor Site Settings > Global Colors > System Colors: `Primary`, `Secondary`, `Text`, and `Accent`.
   - Inventory every usable colour visibly present in the logo before assigning tokens.
   - `Primary` must be the main prominent logo colour.
   - `Secondary` must be another suitable logo colour. It may contrast with Primary and is often black in a two-colour logo.
   - `Accent` / `Highlight` must be another suitable logo colour when available; it does not have to be a shade of Primary.
   - Additional colours visibly present in a multi-colour logo may become supporting/custom global colours.
   - Derive shades or tonal variations only when the logo does not provide enough usable colours for the required tokens.
   - `Text` must always be black: `#000000`.
   - Never invent a hue absent from the logo unless the user explicitly supplies a palette override.
   - Do not leave old template values in System Colors while adding the correct colours only under Custom Colors.
   - Check hard-coded section, button, card, form, footer, and hover colors that may still show the old template palette.
   - Do not leave old brand colors visible after a new-client homepage build.
   - Treat System Colors as the brand vocabulary, not the final assignment for every element.
   - Immediately after palette readback, render the Home page once and audit the hero, one light section, one dark/image-overlay section, one icon treatment, the CTA pair, hero/global form, FAQ normal/hover/active states and footer/contact area.
   - Correct wrong semantic bindings and contrast with Elementor-native local/global colour controls under the scoped authority in `template-content-replacement-guardrails.md`.
   - Assign every hero/image overlay explicitly to the darkest suitable logo colour or a derived dark neutral. Render essential overlay text in white.
   - Block further population when the representative audit finds orange-on-orange, dark-on-dark, white-on-white, an invisible icon, a blank CTA, an unexplained old-template hue or unreadable interaction state.
   - Update and verify the Elementor kit/site logo, WordPress site logo, header logo widgets, footer logo widgets, favicon/site icon where appropriate, and Yoast site representation.
   - Do not leave old template/client logos visible in the public header, footer, favicon, schema, or social metadata.
8. Read the Home page structure through MCP.
9. Read the master template map and labelling standard.
10. Read `elementor/SOPs/navigation-hero-footer-rules.md`.
11. Before changing top-level containers, background modes, global colours, headers, footers, maps, custom HTML, or form/template widgets, export the current Elementor page/template JSON or confirm a current rollback point.
12. Identify replaceable Home page fields:
   - hero heading
   - hero copy
   - primary CTA
   - service overview
   - service cards
   - trust/why choose section
   - process section
   - testimonial/review section
   - FAQ section
   - service areas section
   - final CTA
13. Draft the homepage content.
    - Identify the Primary location from the intake before writing final copy.
    - Use the correct local language style for the Primary location: South African English for South African locations, American English for US locations, and the appropriate English variant, place hierarchy, service terminology, units, quoting/estimate language and customer expectations for other international regions.
    - If the Primary location is missing or ambiguous, ask before writing or applying final copy.
    - Use the five main Home page services for the five Home service cards.
    - Preserve additional services for later Service Pages unless the user asks otherwise.
    - Keep hero trust/check bubbles as two-word trust signals, not service names.
    - Keep both hero bubbles similar in character length.
    - Leave the protected hero form, including its prompt, supporting text, logo, spacing, colours, styling and structure, untouched unless the user explicitly authorizes a separate global-form change.
    - Target 35-40 words for Home service card descriptions where the design allows.
    - Keep H3 headings short and scannable.
    - Give H2 headings enough detail and include the focus keyphrase or variants naturally.
    - Require the H1 to include the focus service/keyphrase and primary location naturally.
    - Review all main section H2s and introductions as one hierarchy. Make them slightly longer and more descriptive where useful, and distribute the primary service, location and close keyphrase variations without repeating the same formula.
    - Give each main section a useful introduction, normally two connected sentences, that explains its client purpose rather than repeating the heading.
    - Use `PROBLEMS WE SOLVE` as the standard problem-intent eyebrow. Its H2 and introduction must clearly communicate that the business can help with the named customer problems, while avoiding unsupported diagnosis, repair or outcome promises.
    - Apply the main section H2 and introduction quality gate in `content/SOPs/homepage-copywriting.md` to Services, Problems We Solve, Process, About Us, FAQs and Service Areas.
    - Treat the paired Home Page `Why Choose Us` and `Why Trust Us` sections as substantial About Us content. Follow the exact structure, writing roles, density and quality gate in `content/SOPs/homepage-copywriting.md`.
    - Use one natural exact or close focus-keyphrase H2 across the pair and a useful service/location variation in the other. Do not repeat the exact phrase mechanically.
    - Give each section a purposeful H3, a useful two-to-three-sentence paragraph and three complete `Label: explanation` list points that tell the client why the detail matters.
    - Keep the two sections distinct: `Why Choose Us` covers service fit and benefits; `Why Trust Us` covers communication, preparation, access, equipment, scope or realistic expectations.
    - Use verified client proof when available. When it is not available, use honest process and service details without inventing trust claims.
    - Write FAQ answers with useful local-service detail and natural focus-keyphrase variants.
    - Always complete the existing Home Testimonials section during the first New Client Build.
    - Use real approved reviews or the verified Trustindex/Google review widget when available. Otherwise add exactly three handover review placeholders using plausible customer names, three approved primary-region locations and natural customer-style service feedback.
    - Update the section H2 and introduction for the client's service and primary location. Keep all three review cards similar in copy length and visually balanced.
    - Do not show `dummy`, `placeholder`, `handover` or other internal production wording in the visible section. Mark the section, names and quote widgets clearly in Elementor Navigator as placeholders to be replaced with Trustindex.
    - Replace the placeholders manually once the client's Google profile and Trustindex review connection are ready.
    - Until replacement, do not describe the cards as verified Google reviews and do not add Review or AggregateRating schema for them.
    - Fully populate trust, service-standard and “why choose” sections for the end customer. When verified certifications, guarantees or awards were not supplied, use honest general trust signals and useful process expectations without inventing claims or mentioning the absence of credentials.
    - Visually confirm every icon box renders its icon and that coloured-section eyebrow/bubble text is bold and remains one line on mobile.
    - Populate the Service Areas section from the intake. Use the primary Home Page service areas for visible cards.
    - Write Service Areas copy for local relevance and SEO, but keep it useful and natural.
    - Treat Service Areas cards as future hub/spoke entry points. Do not create broken final links unless the service-area pages already exist or the user approves the URL plan.
    - Run `content/SOPs/local-service-seo-copywriting.md` as a fail-closed gate. Record `Human-facing copy: PASS` and `SEO headings: PASS` in the client copy plan or build ledger before step 15. If either result is missing or failed, rewrite before applying anything to Elementor.
13. Prepare Yoast SEO fields.
    - Use `seo/skills/local-business-schema/SKILL.md` to create or correct the global business, WebSite and Home WebPage graph while the Home page is built.
    - Establish the canonical business `@id` in the client `schema-plan.md`; all later page schema must reference it.
    - Validate the rendered Home JSON-LD and remove inherited client entities before marking Home complete.
14. Prepare image plan and alt text.
    - Use client images first.
    - Before generating AI images, follow `images/SOPs/ai-client-image-generation.md`.
    - Use `assets/AI Images/brand guide/` examples as the main style/reference set when present.
    - Use approved AI images already in `assets/AI Images/` as client style references.
    - Read `assets/AI Images/brand-image-rules.md` before prompting if it exists.
    - If an existing client website/example site is supplied, inspect it for client-owned or better-matched brand images before using generic stock.
    - Match each service-card image to that specific service.
    - Use actual 1000x1000 square source/upload image files for process, why choose, trust, paired-content, service support, and similar inline support-image widget slots unless the template explicitly documents another ratio.
    - Do not use non-square files in square content image widgets and rely on CSS, Elementor object-fit, masks, or visual cropping to hide the mismatch.
    - If a suitable image is landscape or portrait, crop/export a dedicated 1000x1000 square version before uploading or placing it.
    - Do not replace inline support-image widgets when the instruction is only about section background images.
    - For blue section backgrounds, hero backgrounds, overlay backgrounds, and other top-level background images, use actual 1920x1080 landscape `.webp` assets unless a documented template slot explicitly requires another landscape size.
    - Background/overlay images must be compressed before upload. Target under 350 KB; 500 KB is the hard upper limit only when needed for acceptable visual quality.
    - Do not use square, portrait, PNG screenshot, or multi-megabyte files for background/overlay sections.
    - Do not rely on Elementor cover mode, CSS background-size, overlays, masks, or cropping to hide a wrong-ratio or oversized background asset.
    - If background images look stretched, zoomed, blurry, or poorly cropped, create or source a new wide background asset rather than replacing square inline images.
    - For Service Areas cards, use a unique real or approved generated image of the named place: a skyline, city landscape, aerial view, landmark, coastline, town, suburb or recognisable regional scene. Do not use service vehicles, technicians, tools, job-site activity or generic industry imagery as a substitute for place imagery.
    - Prepare primary Service Areas card media as consistent 3:2 landscape WebP files, normally 1200x800, unless the approved template map documents a different card ratio. This card-media exception does not override the 1000x1000 rule for paired-content/support image widgets or the 1920x1080 rule for hero and section backgrounds.
    - Give every named location its own image. Do not duplicate one location image across different locations, and keep the set visually coherent in colour, lighting and overall photographic style.
    - Reuse the same approved image for the same named location on the Home page and main Service Areas page so the visual mapping remains consistent across the site.
    - Name Service Areas images with natural `{client + service + location}` SEO targeting, such as `[client]-[service]-[location]-service-area-1200x800.webp`.
    - Write alt text as an honest description of what is visibly shown and include the actual location naturally. Do not add a service keyword that the visible image does not support.
    - Record downloaded image source, creator and licence in the client asset manifest, and add required attribution metadata before sign-off.
    - For footer map slots, use the client's exact Google Business Profile/Maps link only when provided or confidently matched to brand and location. Otherwise replace the map with a clean service-area element.
    - Footer Service Areas must list only the primary service area regions from intake.
14. Apply the standard menu structure from `navigation-hero-footer-rules.md`.
15. Apply content through Elementor MCP.
    - Separate content updates from structural/style updates.
    - Do not batch high-risk top-level container/background/template changes with normal text/image changes.
    - Verify the published page after each high-risk update group.
    - Do not clear, blank, bypass, or replace the Elementor Home page as a shortcut.
    - Do not publish block editor fallback content over the Elementor Home page.
    - Use Elementor's native section/container/widget controls for styling and alignment. Do not use custom CSS, injected CSS, pseudo-content, inline style hacks, JavaScript or snippets for normal layout, spacing, typography, button, form, header, footer, or responsive fixes.
16. Apply labels/classes to any new or modified elements.
17. Open the published Home page in Chrome.
18. Check desktop view visually.
19. Check tablet/mobile and the normal/hover/active colour states that are meaningful at each size. Confirm the page title is hidden, every CTA is visible and labelled, icons remain legible, overlay text is white and no old-template colour remains.
20. If the user requested the full new-client build, continue to the Services Hub page SOP and the mandatory About Us page SOP.
21. Build the About Us page during the first run. Do not defer it to a later cleanup phase.
22. Record the Service Areas page as a separate available add-on. Do not continue into its SOP without an explicit later request.
23. Update website setup status.

## High-Risk Elementor Change Rules

Treat these as high risk:

- top-level section/container background mode changes
- video/slideshow/background image changes on top-level sections
- Elementor global colour changes
- header/footer template edits
- footer map or custom HTML edits
- form/global widget edits

Rules:

- Export the page/template before making the change.
- Make one high-risk group at a time.
- Do not write blank video/media fields into existing Elementor settings.
- Do not solve alignment or design problems with custom CSS/code shortcuts. Use Elementor controls for width, flex, align, justify, wrap, gap, padding, margin, typography, colours, borders, shadows, backgrounds, hover states and responsive settings.
- Prefer changing image widgets instead of changing a complex section background when the requested change is an inline image change.
- Keep image-widget changes and background-image changes scoped separately. Square inline image widgets must use actual 1000x1000 square source files; 1920x1080 compressed WebP files are for section backgrounds only.
- After each high-risk group, open the public page before continuing.
- If the page fails to open, stop immediately and roll back the last high-risk group.

## Default Home Page Section Plan

Preserve the existing agency master template section order unless the user requests a restructure.

If a new build needs a fallback order, use:

1. Hero: service + location value proposition
2. Trust strip: quick credibility points
3. Services overview
4. Main service/service category explanation
5. Why choose us
6. Process/how it works
7. Service area/local relevance
8. Testimonials/reviews
9. FAQs
10. Service Areas
11. Final CTA

## Content Standard

- Human and useful first
- SEO-friendly second
- Clear CTA throughout
- Rotate CTA language where appropriate, using options like `Get a Quote`, `Contact Us`, `Book a Call`, or a context-specific service CTA.
- Short paragraphs
- Specific services and locations
- No filler promises
- No exaggerated claims unless supplied by user
- Do not write like a sales pitch.
- Tone should feel relevant, local, authentic, and human-written.

## Completion Criteria

The Home page build is complete when:

- main content is replaced
- hero is client-specific
- H1 contains the focus service/keyphrase and primary location, and the H2 hierarchy uses natural close variations
- the stored human-facing copy and SEO heading gates show `PASS`
- service sections match intake
- service area section matches intake, uses one unique place-relevant image per named location, and repeats the same location-to-image mapping on the main Service Areas page
- images are relevant or clearly marked pending
- support images fit their containers and required aspect ratios
- content/support image widgets that require square images use actual square 1000x1000 source files, not visually cropped landscape/portrait files
- hero/background/overlay images use actual 1920x1080 landscape WebP files, compressed before upload and not multi-megabyte PNGs
- testimonial/review section uses real approved reviews, a verified Trustindex widget, or exactly three completed handover review placeholders with backend-only replacement labels
- placeholder reviews are excluded from Review and AggregateRating schema and are scheduled for manual Trustindex replacement when the live-domain review connection is ready
- Yoast SEO fields are prepared/applied
- changed elements follow labelling standard
- page remains editable in Elementor and has not been replaced by block editor content
- published page opens for visual review
- representative and final colour-role audits pass across light, dark, overlay, icon, form, CTA, FAQ and footer treatments
- the theme/page title is not visibly injected above the Elementor hero
- status files are updated

## Standard New-Client Build Continuation

Unless the user specifically says to build only the Home page, a new-client setup should continue after the Home page with:

1. Services Hub page:
   - Use the five primary Home Page services first.
   - Add all additional services from intake.
   - Give every service one card.
   - Use/reuse relevant service images and SEO image metadata.
   - Check the AI Images folder and brand guide before generating missing service images.
2. About Us page:
   - Run `elementor/SOPs/new-client-about-page-build.md` during the same first build.
   - Use the approved company-profile structure, Home hero bubbles, global form and CTAs, client-facing trust bullets, Home nested FAQ widget and footer-separated final CTA treatment.
   - Complete unique Yoast metadata, internal links, schema checks and responsive QA.
3. Individual Service Pages and remaining standard build stages:
   - Build every approved active service page from the Service Page Template.
   - Complete the global form, navigation, CTA, SEO, schema, responsive and residue checks required by the main pipeline.
4. Service Areas add-on handoff:
   - Confirm that the primary regions are present on the Home page.
   - Stop before researching sub-locations or populating the full Service Areas hub.
   - Continue only after an explicit later request such as `Let's build the Service Areas page for this client.`
   - When requested, use `elementor/SOPs/new-client-service-areas-page-build.md`.

When the user says `Home page only`, that is a hard sequencing boundary. Complete and obtain approval for Home before creating service pages, service-page copy plans, service-page images or later-stage assets.
