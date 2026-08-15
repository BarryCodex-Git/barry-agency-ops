# SOP: New Client Services Hub Page Build

Use this SOP when creating or customizing the main Services page for a new client.

For new-client builds, the Services page must be the approved Elementor Services hub page from the imported master/template, or a duplicate of an approved Elementor source. Do not create or replace it with WordPress block editor content or custom standalone HTML/CSS.

## Goal

Convert the approved Elementor Services hub into a page that lists the client's primary Home Page services and additional services in one SEO-friendly Elementor page.

## Required Inputs

- Company name
- Business type
- Main service category
- Primary location
- Secondary locations/service areas
- Five primary Home Page services
- Additional services for later service pages
- Primary CTA
- Phone/WhatsApp/email, if approved
- Brand voice
- Client images or approved AI image direction
- AI Images brand guide/example folder, if available
- Yoast focus keyphrase for the Services page

## Process

1. Confirm the target Services page and page ID.
2. Confirm the Services page is an Elementor page with the imported master structure.
   - If missing, duplicate the approved Elementor Services hub source or stop and ask.
   - Do not use the WordPress block editor content body as the visible Services page.
3. Read `content/SOPs/local-service-seo-copywriting.md`.
4. Read `elementor/references/master-template-services-hub-page-map.md`.
5. Export or save a backup of the current Elementor page data before adding/removing service cards.
6. Inspect the existing Services page structure.
7. Apply Barry labels/classes to all sections, widgets and service cards.
8. Populate the hero with service category + primary location.
9. Populate the opening intro content area and image.
   - Eyebrow/bubble must match the page purpose.
   - H2 must be client-specific and human-readable.
   - H3/subheading must support the page intent.
   - Body copy must use the client name, main service category, primary location, secondary service areas, target customer type, and core service list from intake.
   - This area must never remain demo/template wording.
10. Populate the Services Hub cards:
   - Add the five primary Home Page services first.
   - Add all additional services underneath.
   - Ensure every service has a card.
11. Reuse approved Home Page service images where they match the same service.
12. Before generating missing images, inspect `assets/AI Images/`, `assets/AI Images/brand guide/`, `brand-image-rules.md`, approved generated images, and `image-plan.md`.
13. Generate or source new images only for missing/additional services.
14. Upload images with SEO filenames and alt text.
15. Populate a Services-specific FAQ.
16. Prepare Yoast SEO:
   - focus keyphrase
   - SEO title
   - meta description
   - H1/H2 checks
   - image alt text checks
   - rendered public page head verification
17. Use `seo/skills/local-business-schema/SKILL.md` to add/verify `CollectionPage` and an `ItemList` or service catalogue linked to the published service pages and the canonical provider `@id`.
18. Validate the rendered schema and record the page result in `schema-plan.md` before completion.
19. Clear Elementor cache/CSS.
20. Open the published Services page for review.
21. Update the service hub map/status notes when the structure changes.

## Content Rules

- This page is a service hub, not a single service page.
- Write in a local, useful, human tone.
- Do not make the page sound like a generic sales pitch.
- Do not publish internal build language such as `demo`, `template`, `future SEO`, `SEO growth`, `if the client signs up`, `if the client expands`, `hub-and-spoke`, or `prepares the website`. Public copy must speak to customers, not describe Barry's setup process.
- Do not reuse paragraph openings, card rhythm, or explanation logic across service cards.
- Each card must reflect the actual service problem and technical reality.
- Keep H1 and H2 headings focused on `service category + location`.
- Complete every top-of-page content area from intake data during setup. Do not leave demo copy in the hero, opening intro section, section descriptions, FAQs, or CTA support text.
- Keep service card H3s short: usually the service name only.
- Write 35-45 word service card descriptions where the design allows.
- Mention primary and secondary locations naturally.
- Use short CTA wording such as `View service`, `Call Us Now`, or service-specific CTA text.
- Do not point service card CTAs to final URLs until the individual service pages exist or the URL plan is approved.
- Do not edit global contact button text after the buttons are set. Button text may be used later by Google Tag Manager for conversion tracking. Update button links/contact values only through the approved global CTA source or explicit contact-detail process.

## FAQ Rules

Services page FAQs must be unique to the service hub.

Good topics:

- How do I book?
- What services do you offer?
- Do you help homes and businesses?
- Can you help with urgent issues?
- Which areas do you serve?

Avoid:

- Copying Home Page FAQs exactly.
- Writing fake guarantees or unsupported claims.
- Overusing the exact same focus keyphrase in every answer.
- Reusing the same FAQ question structure with different service names.

## Image Rules

- Reuse Home Page AI/client images for matching primary services where appropriate.
- Generate new images for additional services only when no suitable image exists.
- Use `assets/AI Images/brand guide/` and approved AI images as the main AI image style reference.
- Services intro/support images and service-card images that display in square card/support slots must use actual 1000x1000 square source/upload files unless the approved template explicitly documents another ratio.
- Do not use non-square files in square Services hub image widgets and rely on CSS, Elementor object-fit, masks, or visual cropping to hide the mismatch.
- If a selected image is landscape or portrait, crop/export a dedicated 1000x1000 square version before upload or placement.
- Services hero, intro background, overlay background, and other top-level background image slots must use actual 1920x1080 landscape `.webp` assets unless a documented template slot explicitly requires another landscape size.
- Background/overlay images must be compressed before upload. Target under 350 KB; 500 KB is the hard upper limit only when needed for acceptable visual quality.
- Do not use square, portrait, PNG screenshot, or multi-megabyte files for background/overlay sections.
- Use filenames like `[client]-[service]-[location]-ai-01.webp`.
- Use honest alt text like `[Visible service context] for [service] in [location]`.
- Do not use repetitive vehicle shots for every service.
- Service images must match the exact service card.

## Completion Criteria

The Services hub page is complete when:

- hero and intro content are client-specific
- page remains an Elementor Services hub page from the approved template structure
- all primary and additional services from intake are represented
- every service has a card, relevant image, title, copy and CTA
- Services FAQ is unique and relevant
- elements follow Barry's labelling standard
- image filenames and alt text follow SEO rules
- square card/support image widgets use actual square 1000x1000 source files where required
- background/overlay image widgets use actual 1920x1080 landscape compressed WebP files where required
- Yoast SEO fields are applied and verified in the rendered public page head
- public page opens and visible content is verified
