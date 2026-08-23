---
name: new-client-homepage-builder
description: Use this skill when Barry needs to onboard a new client or use an existing development domain to build a full SEO-friendly Elementor Home page from client intake data, including brand setup, service + location content, images, Yoast SEO, Elementor MCP updates, labelling, and browser review.
---

# New Client Homepage Builder

Use this skill when the user says things like:

- "Barry, let's take on a new client."
- "Use Development 1 and build the Home Page first."
- "Create the full homepage for this client."
- "Build a templated client homepage from intake data."

## Goal

Turn an added website/development domain into a client-ready Home page using the agency master template, Elementor MCP, client intake data, SEO content, images, and Yoast SEO.

When the user asks for a full new-client setup, continue after the Home page into the Services Hub, the mandatory About Us page, individual Service Pages and the remaining standard build stages. The full Service Areas hub is a separate add-on and requires a later explicit request.

For a full new-client website, also duplicate the approved Service Page Template for every primary and additional service in the intake, preserve its section structure, write fresh service-specific copy, nest the pages under Services, and complete the menu and internal-link structure.

## Required Before Build

- Website exists in `website-directory.md`
- WordPress access confirmed
- MCP readiness passed
- Client intake data collected
- Template/page to customize identified
- Labelling standard available

## Workflow

1. Read `AGENTS.md`.
2. Read `elementor/SOPs/new-client-homepage-build.md`.
3. Read `elementor/SOPs/navigation-hero-footer-rules.md`.
4. Read website/client folder.
4. If client intake is missing, ask the user for it using `content/templates/client-homepage-intake.md`.
5. If the user supplies a client folder path, inspect it for logo files, images, notes, intake data, and AI image references before asking for more file paths.
   - Check `assets/AI Images/`.
   - Check `assets/AI Images/brand guide/`.
   - Read `assets/AI Images/brand-image-rules.md` if present.
   - Check approved generated images and `image-plan.md`.
6. If a logo is available, extract primary and secondary brand colours from the logo unless the user supplied preferred colours.
7. Confirm target website/domain.
8. Confirm Home page target.
9. Use Elementor MCP to read the Home page structure.
10. Use the labelling standard to understand replaceable fields.
11. Export the current Elementor page/template before high-risk changes such as top-level backgrounds, global colours, headers, footers, maps, custom HTML, or global widgets.
12. Write SEO-friendly homepage content using `service + location`.
    - Use the five main Home page services for the Home service cards.
    - Keep additional services aside for later Service Pages unless asked otherwise.
    - Populate the Service Areas section from the primary service areas in intake and treat it as a future hub/spoke SEO entry point.
13. Prepare image plan and alt text.
    - Never source images from an existing or previous client website. Existing websites are context-only; use supplied client-folder assets, approved AI generation, or approved stock sources.
    - Before generating AI images, follow `images/SOPs/ai-client-image-generation.md`.
    - Use `assets/AI Images/brand guide/` and approved AI images as style references when present.
14. Update Elementor content through MCP.
15. Apply or prepare Yoast SEO fields.
16. Use `seo/skills/local-business-schema/SKILL.md` to establish the canonical business entity and inject/validate Home schema during the build.
17. For a full new-client build, run `elementor/SOPs/new-client-services-hub-page-build.md`.
18. Build the About Us page during the same first run using `elementor/SOPs/new-client-about-page-build.md`.
19. Confirm the Home page primary service regions are complete, then record the full Service Areas hub as a separate available add-on.
20. Do not run `elementor/SOPs/new-client-service-areas-page-build.md` unless the user explicitly requests the Service Areas add-on.
21. Open the published pages in Chrome for visual review.
22. Update status files and report review notes.

## Content Rules

- Write like a human, not a generic SEO bot.
- Use clear, helpful service-business language.
- Mention service and location naturally.
- Avoid keyword stuffing.
- Prioritize conversion: problem, trust, service, CTA.
- Use concrete client-specific details from intake.
- Do not write like a sales pitch.
- Tone should feel relevant, local, authentic, and human-written.
- Keep hero trust/check bubbles as two-word trust signals, not service names.
- Keep both hero trust bubbles similar in character length.
- Replace the inherited hero-form prompt with one client-relevant phrase of no more than three words that remains on one line on mobile. Use it consistently on every page with `Contact Us Now!` beneath it.
- Target 35-40 words for Home service card descriptions where the layout supports it.
- Keep H3 headings short and scannable.
- Review every main Home Page H2 and section introduction as one coordinated SEO and client-reading hierarchy. Use slightly longer descriptive H2s, useful two-sentence introductions, and natural service/location variations without repeating keywords mechanically.
- Label the standard problem-intent section `PROBLEMS WE SOLVE`. Write its H2 and introduction in a solution-led tone that clearly says the business can help with the named problems, without making unsupported diagnosis or outcome claims.
- Build the paired Home Page `Why Choose Us` and `Why Trust Us` sections to the full standard in `content/SOPs/homepage-copywriting.md`: descriptive service/location H2s, purposeful H3s, useful two-to-three-sentence paragraphs, and three complete client-facing proof or process points per section.
- Give the two About Us sections distinct roles. `Why Choose Us` explains service fit and benefits; `Why Trust Us` explains communication, preparation, access, equipment, scope or realistic service expectations.
- Use verified proof when supplied. Otherwise create confidence with honest process detail and never invent ratings, reviews, credentials, guarantees, awards, years, insurance or response times.
- Keep the testimonials/reviews section as real approved testimonials, a verified Google Reviews/Trustindex-style widget, or a clearly labelled pending-review state.
- Do not use generic service standards or invented quotes inside Google-style review cards.
- Include a Home Service Areas section when the template contains one.
- Service Areas cards should use real locations from intake, local natural copy, and future-page CTA wording such as `Plumber in George`.
- Keep Service Areas links as placeholders until the hub/spoke pages exist or the user approves the URL structure.
- Use the standard main menu order: `Services`, `Service Areas`, `Process`, `About Us`, `Reviews`, `FAQ's`.
- Add only primary services and primary service areas as setup-phase submenu items.
- Use `#` for submenu items until their real pages exist, then replace `#` with the page URL.
- Services Hub page uses the five primary Home services plus all additional services from intake.
- The standard build records and displays the primary service regions on the Home page but does not populate the full Service Areas hub.
- The standard build always includes a complete About Us page during the first run. Use the approved Home hero bubbles, global form and CTAs, client-facing `Who We Are` bullets, Home nested FAQ widget and visually separated final CTA treatment.
- When the user later requests the Service Areas add-on, Barry follows `elementor/SOPs/new-client-service-areas-page-build.md`, researches exactly 12 suitable sub-locations per primary region, and saves the approved map in the client folder.
- The primary region itself must never be repeated as a sub-location card inside its own section.

## Design Rules

- Follow the existing agency master template style.
- Preserve the current homepage section order unless the user requests a restructure.
- Keep section layout consistent.
- Do not invent a new design language unless requested.
- Preserve spacing, hierarchy, and responsive structure.
- Label any new/changed sections and fields using Barry's labelling standard.
- Apply extracted brand colors to Elementor Site Settings > Global Colors > System Colors, verify the visible global palette changed, and check hard-coded old template colors on sections, buttons, cards, forms, footer, and hover states.
- Primary must be the most prominent usable colour from the logo.
- Secondary must be the next most prominent usable logo colour. If the logo has only one usable colour, use a suitable variation or contrasting shade of the primary.
- Text must always be black: `#000000`.
- Do not leave the correct palette only in Custom Colors while old template values remain in System Colors.
- Do not batch top-level background/container changes with copy or image-widget updates.
- Do not change complex hero background modes unless the page export/rollback point is confirmed first.
- Prefer replacing image widgets over changing top-level section backgrounds only when the requested change is an inline image-widget change.
- Keep inline support images and section background images scoped separately.
- 1000x1000 square support images are standard for process, why choose, trust, service card, and similar inline image slots.
- Wide high-resolution WebP assets are for hero/blue section/top-level background images only, unless the user explicitly asks to change an inline image widget.

## SEO Rules

Use Yoast as the default SEO plugin.

Prepare:

- focus keyphrase
- SEO title
- meta description
- slug
- H1
- H2 structure
- image alt text
- internal links
- FAQs where useful
- H2 headings that naturally include the focus keyphrase and close variants
- FAQ answers with useful local detail and natural focus-keyphrase variants

## Image Rules

- Prefer client-provided images when available.
- If the user provides a client folder path, inspect that folder for usable images before using stock images.
- Before generating AI images, inspect `assets/AI Images/`, `assets/AI Images/brand guide/`, `brand-image-rules.md`, approved generated images, and `image-plan.md`.
- Treat the brand guide/example folder as the main style reference set for AI images.
- If no client images exist, automatically use relevant approved free/Creative Commons image sources.
- Use images that are relevant, specific, and professional.
- Match service-card images to the named service.
- For Service Areas cards, use local skyline, landscape, landmark, coastline, town, suburb, or regional images rather than plumber action images.
- Name Service Areas images with natural `{service + location}` SEO targeting and write honest local alt text.
- Use 1000x1000 square images for process, why choose, trust, and similar inline support-image widget slots unless the template requires another ratio.
- Do not replace inline support-image widgets when the instruction is only about fixing background image quality, crop, stretch, or zoom.
- Footer must include Service Areas with only primary service area regions.
- Footer must include the client's exact Google Business Profile/Maps link when supplied.
- Avoid generic-looking stock where possible.
- Prepare SEO-friendly filenames and alt text.
- Resize images to fit the existing template containers.
- Compress/optimize images where possible before upload.

## Safety

On development domains, Barry may make real edits when the user asks for a build.

Ask before:

- changing contact details
- changing form recipients
- purchasing assets/plugins/templates
- publishing changes to a live client domain
- deleting large sections/content
- changing DNS/hosting/email settings

## Output

Report:

- Target website/page
- Content sections updated
- Images used or recommended
- Yoast SEO fields prepared/applied
- Labels/classes added
- Visual QA status
- Items needing review
