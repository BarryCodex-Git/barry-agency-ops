# SOP: New Client Service Page Build

Use this SOP when creating or refining an individual service page for a local service business.

For new-client builds, `creating` a service page means duplicating the approved Elementor Service Page Template and editing that Elementor page. It never means creating a blank WordPress block editor page or a custom standalone HTML/CSS page.

## Goal

Build a useful, conversion-focused, SEO-ready service page that targets one service and one primary location/region without keyword stuffing.

Default focus pattern:

`{service} in {location}`

or, where the shorter query reads better:

`{service} {location}`

Example:

`Blocked Drains in the Garden Route`

## Required Inputs

- Client name
- Service name
- Primary location/region
- Primary service areas
- Real job notes or approved representative local examples
- Related services
- Client images or approved AI images
- Primary CTA and secondary CTA
- Yoast focus keyphrase

## Page Hierarchy

- Individual service pages must be nested under the main Services hub page.
- Individual service pages must remain Elementor pages based on the approved Service Page Template.
- Default URL pattern:
  - `/services/{service-location-slug}/`
- Keep only the Services hub at the top level.
- Add primary service pages as Services submenu items only once the pages exist.

## Active Service Set Changes

When services are added, replaced, hidden or restored, treat the active service set as a site-wide relationship change rather than a card-copy edit.

- Update the Home service cards, Services hub cards, their button links and the image-widget links. An inherited image link can remain wrong even when the visible button is correct.
- Update the primary navigation and any separate Services menu from the same approved active-service list.
- Update every `RELATED SERVICES` card so it links only to active published service pages.
- Update the service selector in the source global hero form and the footer form. Where Elementor stores a synchronized settings copy inside global-widget instances, sync every page instance while preserving `widgetType: global` and the original global template relationship.
- Verify the rendered public form options; checking only the global template settings is insufficient.
- If the user says to hide but not delete outgoing service pages, preserve those pages and their Elementor data. Remove their active cards, menu items and internal navigation links without deleting the pages.
- Finish with a rendered link audit proving that Home, the Services hub, Service Areas and active service pages contain no links to the hidden service URLs.

## Standard Section Order

1. Service Hero
2. Warning Signs / When To Call
3. Service Approach / How The Work Is Handled
4. Trust / Why It Matters
5. Local Work Examples / Recent Jobs
6. Related Services
7. Local Authority / Responsibility Note
8. Service FAQ

This order and the approved template containers/widgets must be preserved during normal new-client builds. Populate the template; do not redesign it.

If the approved Service Page Template is missing, malformed, or no longer editable in Elementor, stop and ask for a template import/repair decision before building service pages.

## Content Rules

- Write for people first and search engines second.
- Use the exact focus phrase in the SEO title, meta description, H1 or opening paragraph, and one natural H2 where possible.
- Use variants everywhere else.
- Do not repeat the exact phrase across every H2.
- Keep H2s human-readable and useful.
- H3s must stay short and scannable.
- Every major service detail section that has an H3 under the H2 must include a short descriptive paragraph directly under that H3 before the checklist/cards below it.
- The H3 description paragraph must be unique to that service and section, written in a natural human tone, and normally stay within 60-70 words.
- The H3 description must support the theme of that section. Do not reuse the same “bridge” paragraph across services or between the Approach and Trust sections.
- H3 description paragraph colour must match the section background. Use black/text global colour on white sections and white text only on blue/image-overlay sections.
- Explain symptoms, causes, process, customer decisions, and next steps.
- Include internal links to the Home page, Services hub, Service Areas page, related services and relevant blog posts where available.
- Include one useful high-authority external link where relevant, preferably local government, official guidance, or a trusted public resource.
- Do not add random external links just to satisfy an SEO checklist.

### Helpful Local Knowledge Section

Every individual service page must retain a useful information section after the related-services content. Label it `HELPFUL LOCAL KNOWLEDGE` unless the approved template requires an equivalent client-facing label.

- Give the section a service-specific H2 that naturally includes the service, decision or local concern. Do not reuse one generic heading across every page.
- Use two short, substantial paragraphs: first explain practical customer guidance, safety, access, planning, compliance or maintenance considerations; then connect the subject to a trustworthy public resource.
- Include one directly relevant external link to an authoritative source. Prefer the applicable municipality, national government department, regulator, standards body or established public-information source.
- The external link must improve the reader's understanding. Do not claim that an outbound link automatically improves rankings.
- Open external resources in a new tab with `rel="noopener"`, and style the link so it is visibly actionable against the section background.
- Check that the authority page is live and supports the surrounding statement before publishing.
- Write unique copy for hidden/unlinked service pages as well as menu-visible pages; hidden pages remain part of the site and must meet the same quality standard.

## Recent Work Completed / Local Work Examples

These sections are key SEO and LLM-citation sections. They must showcase completed-work style examples that connect the page topic to real local areas, suburbs, property types and service problems.

Barry may create these completed-work examples when the client operates in the area and provides the relevant service. These are not to be treated as fake jobs when they are normal, plausible jobs for the client’s service area. Write them as practical recent-work examples, not as cautious hypothetical scenarios.

Allowed:

- Completed-work examples for the target service and local area.
- Specific suburbs, towns, estates, commercial areas, landmarks, property types and local conditions where they are plausible and useful.
- Technical problem-solving details that match the service, for example symptoms, checks, cause, repair method, equipment used, and customer outcome.
- Natural local phrasing such as `A homeowner in Heather Park called about...`, `At a guesthouse near George Central...`, or `A rental property in Blanco had...`.

Not allowed:

- Fake customer names.
- Fake exact street addresses or house numbers.
- Fake reviews, ratings or testimonial quotes.
- Fake guarantees, licensing, insurance, awards, emergency availability, same-day availability, years in business or project counts.
- Technical outcomes that do not match the service reality.

Each local work example should include:

- specific local area or property context
- customer problem
- technical cause, inspection finding or diagnostic path
- practical work completed, repair method used, or next step handled
- useful outcome for the customer, property or business

Target 90-130 words per story unless the layout needs shorter copy.

Every page must have unique local work examples. Do not reuse the same story structure, same opening line, same suburb order, same problem set, or same repair logic across pages.

## Design Rules

- New standard sections must use the existing template heading stack:
  - blue bubble/eyebrow
  - matching H2 style
  - intro copy
  - matching spacing
- Keep section order consistent unless the user approves a layout change.
- Preserve the approved heading stack in each major service section: bubble/eyebrow, H2, separator where present, H3 where present, short H3 description paragraph, then checklist/cards/content.
- Do not skip the H3 description paragraph or jump directly from H3 to bullet list/icon list unless the approved template slot has been deliberately removed by the user.
- Do not use weak generic eyebrow copy such as `WHY IT MATTERS` on service pages. Use a short service-specific eyebrow that explains the section context, for example `DRAIN CARE`, `LEAK CONTROL`, `DAMAGE CONTROL`, `PRESSURE CONTROL`, or another relevant two-to-three-word label.
- Use service-relevant images close to service-relevant copy.
- Use related-service cards to strengthen internal linking.
- Informational icon-box sections such as `PROBLEMS WE SOLVE`, `GEORGE PLUMBING`, symptoms, support points, trust points, process points or issue-summary cards must not link out. These boxes are for scanning and SEO context, not navigation.
- Only dedicated navigation sections such as `RELATED SERVICES`, service cards, service-area cards, menus and approved CTA buttons should contain hyperlinks.
- Every related-service card must link to the published service page through the card/title link, not only through nearby paragraph copy.
- Replace unsupported or inherited icon names and visually verify that every icon circle contains a rendered icon.
- Keep hero overlay intensity identical to the approved Home hero unless the user explicitly approves a page-specific exception.
- Keep eyebrow/bubble labels short enough to remain on one line on mobile. On coloured or image backgrounds, set the bubble text to a bold weight for legibility; do not automatically bold bubbles on white backgrounds.
- Use `RECENT WORK`, `WORK COMPLETED`, `LOCAL WORK`, or another approved compact work-section eyebrow for completed local examples. Do not label these sections as hypothetical or `scenarios` unless the user specifically requests a draft-only version.
- Do not repeat the same technician pose in both feature-image slots across multiple service pages; introduce a small number of approved pose/scene variations while preserving the brand image style.
- Do not use the exact same image in two separate image widgets on the same service page. If the template has two service image slots, use two distinct service-relevant images in the same approved brand style.
- CTAs should appear after decision-heavy sections, not only in the hero.

## Image Rules

- Use client images first.
- Reuse approved AI images where they match the exact service.
- Generate new images only when no suitable image exists.
- Treat inline image widgets and section background images as separate asset types.
- Standard paired-content and inline service/support image widgets must use actual purpose-cropped 1000x1000 square source/upload assets unless the approved template explicitly defines another ratio.
- Both standard paired-content image slots on every individual service page must be audited; neither slot may inherit or reuse the page's 1920x1080 hero/background asset.
- Do not place a landscape or portrait file into a square content image widget and rely on CSS, Elementor object-fit, masks, or visual cropping to make it appear square.
- If the selected image is not square, crop/export a dedicated 1000x1000 version before upload or placement.
- Verify source/media dimensions before marking the page complete.
- Verify all individual service pages as a set before site sign-off so a correct template or one corrected page is not mistaken for compliance across the remaining duplicated pages.
- The 1000x1000 rule does not apply to hero or section backgrounds, service-area landmark cards, or blog cards; those use their approved landscape ratios.
- Blue section backgrounds, hero backgrounds, overlay backgrounds and other top-level background images must use actual 1920x1080 landscape `.webp` assets unless a documented template slot explicitly requires another landscape size.
- Background/overlay images must be compressed before upload. Target under 350 KB; 500 KB is the hard upper limit only when needed for acceptable visual quality.
- Do not use square, portrait, PNG screenshot, or multi-megabyte files for background/overlay sections.
- Do not rely on Elementor cover mode, CSS background-size, overlays, masks, or cropping to hide a wrong-ratio or oversized background asset.
- If a user asks to fix a stretched, zoomed or blurry background image, update only the background asset unless they explicitly ask to change inline image widgets.
- Service page filename pattern:
  - `[client]-[service]-[location]-hero-ai-01.webp`
  - `[client]-[service]-[location]-support-ai-01.webp`
- Alt text must honestly describe the visible image and naturally include the service/location.

## Yoast Rules

For each service page, apply and verify:

- focus keyphrase
- SEO title
- meta description
- slug
- Open Graph title/description/image
- H1 and H2 support
- intro keyphrase support
- internal links
- image alt text
- FAQ content

Do not mark Yoast complete until the rendered public head is verified.

## Build-Time Schema

- Use `seo/skills/local-business-schema/SKILL.md` while building every service page.
- Add/verify one `Service` entity linked to the canonical business provider `@id`, with truthful service type, page URL, description, image and `areaServed` values supported by the visible page.
- Add `FAQPage` only when the visible FAQs match the schema and no other widget/plugin already emits the same FAQ entity.
- Validate the rendered JSON-LD and update `schema-plan.md` before marking the page complete.

## FAQ Depth

Use 5 service-specific FAQ items by default where the page layout allows it.

If the existing accordion only exposes fewer editable FAQ items, duplicate the existing accordion item structure before publishing instead of leaving thin FAQ coverage.

Every FAQ must answer a real concern for that service. Do not reuse generic question templates across services.

The approved service-page master structure uses 5 FAQ questions and 5 answer containers.

## Completion Criteria

The page is ready for review when:

- section order matches this SOP
- page was duplicated from the approved Elementor Service Page Template or updated as an Elementor page
- copy is useful, local and service-specific
- each H3-led service detail section includes a unique 60-70 word-or-less descriptive paragraph before its bullet list or cards
- exact keyword use is controlled and natural
- local examples are verified or clearly representative
- images are relevant and alt text is correct
- square content/support images are actual 1000x1000 source files where required
- repeated service image slots use distinct images, not the same file duplicated
- background/overlay images are actual 1920x1080 landscape compressed WebP files where required
- Yoast metadata renders correctly
- no old-template/client metadata remains
- public page opens for review
- the active service list matches across cards, menus, related-service links and global form selectors
- hidden-but-retained service pages have no links from active site navigation or service-card sections
