# SOP: Website Build Pipeline

Use this SOP as Barry's master workflow for converting the approved imported Elementor master/template site into a client-ready Elementor website.

Before using this pipeline, Barry must read and follow `always-read-elementor-rules.md`, then `barry-elementor-operating-standards.md`. Those operating standards control Elementor-first building, theme fidelity, human handoff/editor parity, existing-page edits, confirmation boundaries, custom-code exceptions, verification, content completeness, and stop conditions.

## Non-Negotiable Definition

For Barry, a new-client build is an Elementor template conversion, not a blank website build.

`Build`, `create`, `redo`, `full website`, and `service pages` mean:

- update existing approved Elementor pages/templates in place, or
- duplicate approved Elementor template pages when the master workflow requires additional pages.

They do not mean WordPress block editor pages, custom standalone HTML/CSS, a new layout system, a new design direction, a recreated website, or bypassing Elementor.

`New client`, `new page`, `new section`, `new service page`, `new service area page`, and `hub-and-spoke page` mean Barry must work inside the approved imported Elementor template/theme. Barry may create fresh content and new Elementor sections when the client/page needs them, but those sections must inherit the existing template's global styles, page patterns, section structures, spacing, widths, typography, buttons, cards, image treatment, header/footer context, and responsive standards.

Barry's goal is to master design inside the provided template, not to escape the template.

## Pipeline Stages

1. Add website
2. Confirm access
3. Master-template clone confirmed
4. Quick domain access test
5. Client data intake
6. Brand conversion
7. Content replacement
8. Build-time schema injection
9. Yoast SEO setup and sitewide schema audit
10. Visual QA
11. Approval and handoff

## Stage Status Values

- `not-started`
- `in-progress`
- `blocked`
- `passed`
- `needs-review`
- `complete`

## Workflow

1. If the user says `Barry, let's create a new client called [client name]`, run `new-client-add.md`.
2. Confirm the intake source and target domain.
3. Run `add-new-website.md` if the website/domain record does not exist yet.
4. Confirm WordPress access.
5. Confirm the user has cloned the approved populated master from `https://mynewwebsite.co.za/`, or run `theme-setup.md` only when specifically required.
6. Run `quick-domain-access-test.md` using the target domain's saved application password and MCP endpoint.
7. Run the full `mcp-readiness-test.md` only when first-time MCP setup is incomplete or the quick test identifies a real access failure.
8. Confirm the target Home, Services, Service Areas, Blog and Service Page Template records are Elementor records before applying client content.
   - Confirm Elementor builder data exists for the page/template being edited.
   - If a page is missing, duplicate the approved Elementor template source rather than creating a blank/block-editor page.
   - If the imported master/template is missing or broken, stop and ask for a re-import or explicit repair approval.
9. Before any edit batch, run the MCP Save Method Preflight from `mcp-readiness-test.md` for the exact operation Barry plans to perform.
   - Read-only MCP success is not enough.
   - Prove the save route before changing client pages.
   - If a save route fails once, stop that route and switch to a smaller proven Elementor MCP element-level method.
10. Run `new-client-readiness-test.md`.
11. Read the client master data sheet.
12. Read `content/SOPs/local-service-seo-copywriting.md` before writing or applying website copy.
13. Run `client-customization.md` if still needed.
14. For a first Home page build, run `new-client-homepage-build.md`.
15. For a main Services hub page, run `new-client-services-hub-page-build.md`.
16. For a Service Areas hub page, run `new-client-service-areas-page-build.md`.
   - Use the primary service area regions from intake.
   - Research and propose 8-12 high-value sub-locations per region unless the intake supplies exact suburbs.
   - Save the final region/sub-location map in the client folder for future hub-and-spoke SEO.
17. Duplicate the approved Elementor Service Page Template and build every primary and additional service page supplied in the intake.
    - Do not redesign, reorder, add or remove template sections unless the user specifically requests a structural change.
    - Rewrite every content field as fresh, service-specific copy; do not mirror paragraph logic across services.
    - Keep every service page nested under the Services hub.
    - Use `/services/{service-location-slug}/` for service page URLs.
    - Keep the approved draft `Service Page Template` unchanged as the reusable reference copy.
    - Add completed primary service pages to the Services submenu and connect relevant service cards, related-service cards and internal links.
18. For a Blog setup, run `new-client-blog-setup.md`.
    - Create the Blog page.
    - Create the Elementor Pro Single Post template.
    - Create the Elementor Pro Post Archive template.
    - Create standard blog categories.
    - Publish three real, useful starter posts for the client, not dummy posts.
    - Generate or assign SEO-named featured images and mid-content images.
    - Apply and verify Yoast metadata per post.
19. During every page-build stage, use `seo/skills/local-business-schema/SKILL.md` to plan, inject and validate the relevant schema before that page is marked complete. Maintain one client `schema-plan.md` and one stable business entity ID.
20. Run `seo/SOPs/yoast-seo-setup.md`, including the final sitewide schema audit.
21. Use Chrome or the in-app browser for visual QA only after direct MCP/REST checks pass, unless the user explicitly asks to watch/review pages in Chrome.
22. Report what changed and what needs review.

## Credit-Efficient Execution

- Read the client brief/status, this pipeline and only the page-specific SOPs needed for the current stage. Do not reread every SOP on every instruction.
- Run the two-check domain access test once per working session. Do not repeat page lists, plugin inventories, global settings or browser-login checks unless a real failure makes them relevant.
- Export/read each page or template structure once, save the working element map locally and reuse it until the structure changes.
- Batch only after the exact save method has passed. Until then, use one tiny proof edit only.
- Prefer Elementor MCP small element/container updates over full-page imports or raw data writes.
- The default successful route is: get page structure, find the target element, read settings, update via MCP, read back, clear Elementor CSS/cache when needed, verify rendered output.
- Treat small staged batches as the default workflow, not as a fallback after a failed large request.
- Do not send broad multi-section, full-page, or mixed-purpose payloads just because many changes are known at once. Break them into page, section, and widget-level stages.
- Work in small chunks by default:
  - one page/template at a time
  - one section at a time
  - 1-3 related widgets per early MCP batch
  - up to 5-8 low-risk text/link/icon widgets only after that page has proven stable
  - one high-risk container/background/global/template/form change per batch
- Batch low-risk copy, icon, image and link updates per page only after the first small update on that page saves, reads back, and the public page returns HTTP 200.
- Send only the changed Elementor setting keys where the MCP tool supports partial element updates. Do not send large copied settings objects unless required by the tool schema.
- Keep high-risk top-level background/template changes, section removals, header/sticky changes and full-page data operations separate.
- Clear Elementor CSS/cache once after a completed update batch and reload each affected public page once.
- If a large page triggers an MCP memory, sanitation, timeout, or import error, do not retry the same request and do not switch to WordPress page-body/block content. Reduce the batch, switch to single-element MCP updates, send only the changed settings, and continue independent sections where safe. Stop only when targeted MCP updates also fail or the next step requires repair/approval.
- If a batch hangs, fails, loops, partially writes, or cannot be read back, stop using that batch shape immediately. Re-check the saved state, reduce to one element or one setting group, and continue only through a proven Elementor-native save path.
- Do not use full-page import/delete/reimport on client pages unless it has already passed on a disposable draft page on the same website.
- Never clear a live page before the replacement method has been proven on the same site.
- Never replace an Elementor page with block editor content or custom standalone HTML.
- Never use WordPress content/body updates as the primary visible output for an Elementor client page.
- Never use WordPress REST `content.raw` updates as a fallback for Elementor copy, layout, image, button, FAQ or section work.
- Run one bounded rendered-page audit for contact destinations, icons, image dimensions, overlays, placeholder residue and key text. Take screenshots only for visual decisions.
- During the image-dimension audit, verify that Home/service page content-section image widgets that require square images use actual square 1000x1000 source/media files, not landscape/portrait files hidden by CSS, Elementor object-fit, masks or visual cropping.
- During the image-dimension audit, verify that hero/background/overlay image slots use actual 1920x1080 landscape compressed WebP source/media files unless the template documents another landscape ratio.
- Flag and fix any background/overlay image that is square, portrait, PNG, a screenshot-style upload, or larger than 500 KB. Target under 350 KB whenever possible.
- Ask the user only when missing information would create a material factual, legal, structural or brand error; safely draft ordinary customer-facing content from the approved intake and guardrails.

## Elementor Styling Discipline

Barry must style Elementor sites with Elementor controls, not custom-code shortcuts.

- Do not use Elementor `custom_css`, page-level CSS, injected CSS, pseudo-content, HTML style hacks, JavaScript, or code snippets to fix ordinary layout, alignment, spacing, typography, colours, buttons, forms, headers, footers, cards, or responsive behaviour.
- Use Elementor's native section/container/widget controls for flex direction, width, align, justify, wrap, gap, padding, margin, typography, colours, borders, radius, shadows, backgrounds, hover states and responsive settings.
- If a design cannot be achieved cleanly with Elementor controls, stop and report the limitation before using code.
- CSS IDs/classes are allowed for anchors, labelling, semantic mapping and future maintainability. They are not a substitute for proper Elementor layout controls.
- Client-deliverable pages must remain editable and understandable inside Elementor after Barry finishes.
- If Barry is tempted to use CSS because Elementor alignment is difficult, reduce the layout complexity, adjust the container structure, or ask for approval instead.

## Stop Conditions

Barry must stop and report instead of retrying when:

- MCP or REST returns a WordPress critical error.
- Elementor rejects a save with `sanitize_settings`, `null settings`, global-widget, import, memory, or timeout errors.
- A public page changes to a critical-error screen.
- A destructive action has run but the restoration path fails once.
- The same save method fails twice in a row.
- More than one large payload attempt has been made without a verified save/readback.

When a stop condition occurs, report:

- What worked.
- What failed.
- Which page/template is affected.
- Whether the public page is still live.
- The safest next action.

## Barry Chrome Page Completion Rule

For full client website builds, use the approved `Barry - Codex` Chrome profile.

- As each public page is completed and passes its targeted verification, open that page in a new Chrome tab.
- Keep every completed page tab open for the user to review; do not reuse one tab for multiple completed pages.
- Open the completed Home page in its own tab as soon as the Home page is finished.
- Open hub pages, service pages, service-area pages, the Blog page, and completed starter posts in separate tabs as each one is completed.
- Do not open a page as completed when it still contains inherited client content, unapproved placeholder images, broken links, or known QA failures.
- At handoff, leave the completed-page tabs open as user-facing deliverables.

## Rules

- Do not customize a client site until access is confirmed.
- Do not perform serious Elementor work until MCP readiness and the exact save-method preflight pass, unless the user explicitly asks for browser/manual mode.
- Do not start a new-client conversion until the approved imported Elementor master/template is confirmed on the target domain.
- Treat `https://mynewwebsite.co.za/` as the approved master source-of-truth website. Do not use it as a client build target.
- Use Development sites for testing and skill refinement.
- Keep every website's status files updated as work progresses.
- Keep all actions scoped to the exact domain approved for the task.
- Do not inspect or test other domains on the same server unless the user explicitly asks for them.
- Pace MCP, REST, media upload, and browser reload workflows so they do not look like abusive traffic.
- If requests start timing out or security responses appear, pause and check whether IP whitelisting or firewall rules are needed.
- A new client build normally includes the Home page, Services hub page, Service Areas hub page, every primary and additional service page from intake, Blog page, Single Post template, Post Archive template, and three real starter blog posts unless the user explicitly limits scope.
- The current My New Website master structure is the approved source of truth. The cloned WordPress IDs normally remain:
  - Home page `2747`
  - Services hub `6217`
  - Service Areas hub `6414`
  - Service Page Template draft `6573`
  - Blog page `6425`
  - Single Post template `6432`
  - Post Archive template `6434`
  - Global Contact CTA Buttons template `6575`
- Home uses the five primary services.
- Services hub uses the five primary services plus all additional services from intake.
- Service Areas hub uses primary service area regions from intake; Barry researches sub-locations for each region.
- Primary service area pages nest under Service Areas, and suburb/spoke pages nest under the relevant primary service area.
- Blog setup uses intake services, locations, FAQs, common customer questions, and SEO keywords to create genuinely useful starter posts.
- Use the reusable Contact CTA source for Call and WhatsApp buttons wherever possible; if Elementor MCP cannot insert it as a true global widget, copy from the approved reusable template and keep links/display text synchronized.
- WhatsApp is conditional. If intake does not provide an approved WhatsApp number, convert every WhatsApp CTA to `Email Us` and remove all inherited `wa.me` links.
- Before visual sign-off, run a full CTA residue scan for old phone numbers, `tel:` links, `wa.me` links, email links, `#` service-card links and inherited global-widget settings.
- For every contact CTA, compare the rendered label/value with its actual target. Displayed phone digits must match the `tel:` digits, and displayed email text must match the `mailto:` address; clear inherited dynamic-link overrides that silently replace the configured target.
- Apply and verify the favicon/site icon before the first design-review handoff.
- Keep the header logo large enough to read without overpowering navigation, and verify desktop/tablet/mobile widths.
- Use one client-relevant hero-form prompt of no more than three words across the site; verify one-line mobile rendering.
- Keep every hero paragraph under the H1 to one concise paragraph of 40-50 words. Do not place multi-paragraph About, service, location, or company explanations in the hero.
- Match all secondary-page hero overlays to the approved Home overlay intensity.
- Every linked location card must use a unique image of its exact named place. This includes primary region, suburb, estate, town, neighbourhood, sub-location and service-plus-location spoke cards. The title, CTA destination, filename, visible scene and alt text must all resolve to the same location; never substitute trade, truck, technician, equipment or generic job-site imagery.
- Reuse the approved image when the same location appears on multiple pages, but never reuse one image for different named locations. Audit the entire linked card grid before sign-off.
- Every icon box must visibly render an icon, and every related-service card must link to its published service page.
- Trust/service-standard sections must contain complete customer-facing content. If intake and the old site provide no verified trust facts, use truthful general signals such as clear communication, careful checks, local focus and practical options; never expose drafting notes, “prefill” language or commentary about missing credentials.
- Standard paired-content and inline support-image slots must use actual purpose-cropped 1000x1000 square source/upload assets. This does not apply to hero/section backgrounds, service-area landmark cards or blog cards, which retain their intended landscape ratios.
- Do not mark a page complete if a square content/support image slot is using a non-square source file, even when the visible crop appears square.
- Hero, section background, overlay background and CTA background image slots must use actual 1920x1080 landscape compressed WebP assets unless the approved template explicitly requires another landscape size.
- Do not mark a page complete if a background/overlay slot uses a square image, portrait image, PNG screenshot, uncompressed PNG, or multi-megabyte file.
- Global text links must remain legible on coloured sections; use the approved secondary colour for normal and hover states unless a section-specific style is intentionally stronger.
- All copy must follow `content/SOPs/local-service-seo-copywriting.md`.
- Do not publish mirrored, thin, generic, or fill-in-the-blank service/location content.
- Keep the master populated. Replace all inherited example content during client conversion and run an inherited-content residue check before approval.
- Preserve the approved master section order, containers, widgets, image-slot dimensions and overall design structure. Client conversion changes branding, global styles, content, images, links, SEO and data, not the approved layout.
- Do not create WordPress block editor pages for new-client builds. If a page is needed, duplicate or update the relevant Elementor template source.
- Do not deactivate plugins, draft/retire templates, change page-builder mode, or alter site architecture as a workaround for stale inherited content.
- Ask one concise clarification question when missing or contradictory intake data would cause incorrect claims, weak copy or the wrong site structure. Do not guess material facts, but do not interrupt for details Barry can safely research or draft.
- When AI imagery is required and no approved client style exists, generate one image first and wait for style approval before creating the page batch.
