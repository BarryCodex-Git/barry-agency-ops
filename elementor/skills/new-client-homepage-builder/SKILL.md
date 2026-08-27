---
name: new-client-homepage-builder
description: Use this skill when Barry needs to onboard a new client or use an existing development domain to build a full SEO-friendly Elementor Home page from client intake data, including brand setup, service + location content, images, Yoast SEO, Elementor MCP updates, labelling, and browser review.
---

# New Client Homepage Builder

`elementor/SOPs/template-content-replacement-guardrails.md` is controlling. This skill publishes client content into the approved template; web-design authority applies only to a named change the user explicitly requests or approves.

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
2. Query Graphify for the latest new-client, Elementor, copy, image and SEO rules.
3. Directly read `elementor/SOPs/template-content-replacement-guardrails.md` and the authoritative SOPs returned by Graphify.
4. Read `elementor/SOPs/new-client-homepage-build.md`.
5. Read `elementor/SOPs/navigation-hero-footer-rules.md`.
6. Read website/client folder.
7. If client intake is missing, ask the user for it using `content/templates/client-homepage-intake.md`.
8. If the user supplies a client folder path, inspect it for logo files, images, notes, intake data, and AI image references before asking for more file paths.
   - Check `assets/AI Images/`.
   - Check `assets/AI Images/brand guide/`.
   - Read `assets/AI Images/brand-image-rules.md` if present.
   - Check approved generated images and `image-plan.md`.
9. If a logo is available, extract primary and secondary brand colours from the logo unless the user supplied preferred colours.
10. Confirm target website/domain.
11. Confirm Home page target.
12. Use Elementor MCP to read the Home page structure.
13. Use the labelling standard to understand replaceable fields.
14. Export the current Elementor page/template as the immutable baseline before any replacement.
15. Write SEO-friendly homepage content using `service + location`.
    - Use the five main Home page services for the Home service cards.
    - Keep additional services aside for later Service Pages unless asked otherwise.
    - Populate the Service Areas section from the primary service areas in intake and treat it as a future hub/spoke SEO entry point.
16. Prepare image plan and alt text.
    - Never source images from an existing or previous client website. Existing websites are context-only; use supplied client-folder assets, approved AI generation, or approved stock sources.
    - Before generating AI images, follow `images/SOPs/ai-client-image-generation.md`.
    - Use `assets/AI Images/brand guide/` and approved AI images as style references when present.
17. Apply the approved global palette as the first mutation, then update only allowlisted Elementor content/media fields through MCP.
18. Apply or prepare Yoast SEO fields.
19. Use `seo/skills/local-business-schema/SKILL.md` to establish the canonical business entity and inject/validate Home schema during the build.
20. For a full new-client build, run `elementor/SOPs/new-client-services-hub-page-build.md`.
21. Build the About Us page during the same first run using `elementor/SOPs/new-client-about-page-build.md`.
22. Confirm the Home page primary service regions are complete, then record the full Service Areas hub as a separate available add-on.
23. Do not run `elementor/SOPs/new-client-service-areas-page-build.md` unless the user explicitly requests the Service Areas add-on.
24. Perform one bounded rendered review after direct readback passes.
25. Update status files and report review notes.

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
- Leave the protected hero form and all of its text, logo, spacing, styling and structure untouched unless the user explicitly authorizes a separate global-form change.
- Target 35-40 words for Home service card descriptions where the layout supports it.
- Keep H3 headings short and scannable.
- Review every main Home Page H2 and section introduction as one coordinated SEO and client-reading hierarchy. Use slightly longer descriptive H2s, useful two-sentence introductions, and natural service/location variations without repeating keywords mechanically.
- Label the standard problem-intent section `PROBLEMS WE SOLVE`. Write its H2 and introduction in a solution-led tone that clearly says the business can help with the named problems, without making unsupported diagnosis or outcome claims.
- Build the paired Home Page `Why Choose Us` and `Why Trust Us` sections to the full standard in `content/SOPs/homepage-copywriting.md`: descriptive service/location H2s, purposeful H3s, useful two-to-three-sentence paragraphs, and three complete client-facing proof or process points per section.
- Give the two About Us sections distinct roles. `Why Choose Us` explains service fit and benefits; `Why Trust Us` explains communication, preparation, access, equipment, scope or realistic service expectations.
- Use verified proof when supplied. Otherwise create confidence with honest process detail and never invent ratings, credentials, guarantees, awards, years, insurance or response times.
- Always complete the Home Testimonials section. Use real approved testimonials or the verified Trustindex/Google review widget when available. Otherwise add exactly three handover review placeholders with plausible customer names, three approved primary-region locations and natural customer-style feedback about real services or practical site experiences.
- Keep the three placeholder reviews similar in length, locally relevant and free from exaggerated claims. Do not expose internal placeholder wording in the visible section.
- Mark the section and every placeholder name/quote widget in Elementor Navigator as `PLACEHOLDER` and `Replace With Trustindex`.
- Replace the placeholder cards manually when the client's Google profile and Trustindex connection are ready.
- Do not describe placeholder cards as verified Google reviews and do not create Review or AggregateRating schema for them.
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

- Do not design. Preserve the existing agency master template's sections, order, layout, typography, line-height, spacing, hierarchy, wrappers, overlays, hover states, responsive settings, animations, forms and global components exactly.
- Apply extracted brand colours first to Elementor Site Settings > Global Colors > System Colors by merging only the intended token values and preserving the complete Kit.
- Inventory every usable colour visibly present in the logo.
- Primary must be the main prominent logo colour.
- Secondary must be another suitable logo colour. It may contrast with Primary and is often black in a two-colour logo.
- Accent/Highlight must be another suitable logo colour when available; it does not have to be a shade of Primary.
- Additional colours from a multi-colour logo may be used as supporting/custom global colours.
- Derive shades or tonal variations only when the logo does not provide enough usable colours for the required tokens.
- Text must always be black: `#000000`.
- Never invent a hue absent from the logo unless the user explicitly supplies a palette override.
- Do not leave the correct palette only in Custom Colors while old template values remain in System Colors.
- If hard-coded template colours remain after the approved global-token update, report them as a separate design decision; do not apply local colour fixes automatically.
- Change only the owning media reference for image widgets and background image slots. Do not change their containers, background modes, overlays or styling.
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
