# SOP: Website Build Pipeline

Use this SOP as Barry's master workflow for converting the approved imported Elementor master/template site into a client-ready Elementor website.

Before using this pipeline, Barry must read and follow `always-read-elementor-rules.md`, `template-content-replacement-guardrails.md`, then `barry-elementor-operating-standards.md`. The replacement guardrails control client-conversion scope and override broader design permissions.

## Automatic New-Client Startup Gate

The user does not need to remind Barry to read the SOPs or consult the operational knowledge base.

Before inspecting or changing a new client website, Barry must:

1. Check the local Barry operations repository status and configured GitHub remote, fetch the latest remote state, and confirm whether the current branch is synchronized. Fast-forward only when the worktree is clean and there is no ambiguity; never discard or overwrite local work automatically.
2. Query the existing Graphify graph for the current new-client conversion rules and the specific page, content, image, SEO and Elementor patterns involved in the build.
3. Open and read the authoritative SOPs and skills returned by the routing rules. Graphify helps locate and connect instructions but never replaces direct SOP reading.
4. Read the client intake, client folder, credentials/access notes, image plan, brand rules and any approved references.
5. Confirm the template/theme, required global items and safe editing route before the first mutation.

At the end of the build, run an SOP-gap review. Capture genuinely reusable lessons in the appropriate high-level rule, detailed SOP and memory; refresh Graphify; commit and push approved operational changes to GitHub. Keep one-off client preferences in the client folder rather than turning them into global rules.

## Non-Negotiable Definition

For Barry, a new-client build is an Elementor template conversion, not a blank website build.

`Build`, `create`, `redo`, `full website`, and `service pages` mean:

- update existing approved Elementor pages/templates in place, or
- duplicate approved Elementor template pages when the master workflow requires additional pages.

They do not mean WordPress block editor pages, custom standalone HTML/CSS, a new layout system, a new design direction, a recreated website, or bypassing Elementor.

`New client`, `new page`, `new section`, `new service page`, `new service area page`, and `hub-and-spoke page` mean Barry must work inside the approved imported Elementor template/theme. Barry may create fresh copy and duplicate approved page templates, but may not create, reorder, restyle or remove sections unless the user separately approves that exact structural change.

Barry's goal is to publish the new client's content inside the provided template, not to redesign it.

## Pipeline Stages

1. Add website
2. Confirm access
3. Master-template clone confirmed
4. Quick domain access test
5. Client data intake
6. Brand conversion
7. Content replacement
8. Mandatory About Us page build
9. Build-time schema injection
10. Yoast SEO setup and sitewide schema audit
11. Visual QA
12. Approval and handoff

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
5. Confirm the user has cloned the approved populated master from `https://template.mynewwebsite.co.za/`, or run `theme-setup.md` only when specifically required.
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
   - Record the target element and exact allowlisted keys before every mutation; read them back and stop on any styling or structural drift.
10. Run `new-client-readiness-test.md`.
11. Read the client master data sheet.
12. Read `content/SOPs/local-service-seo-copywriting.md` before writing or applying website copy.
    - Treat it as a fail-closed publication gate. Store the human-facing copy and SEO heading `PASS` results before the first Elementor copy mutation.
13. Run `client-customization.md` if still needed.
14. For a first Home page build, run `new-client-homepage-build.md`.
    - Apply and read back the global palette first.
    - Immediately render the Home page and complete the representative colour-role audit before broad copy/media population.
    - Save the corrected Home colour/overlay treatment as the client baseline.
15. For a main Services hub page, run `new-client-services-hub-page-build.md`.
16. Build the About Us page during the same first-run New Client Build using `new-client-about-page-build.md`.
   - This is mandatory standard scope, not a later add-on.
   - Reuse the approved Home hero bubbles, global form, CTA, bullet-list treatment and nested FAQ widget.
   - Preserve the approved About page spacing and keep the closing CTA visually separate from the footer.
17. Record the Service Areas hub as a separate add-on. Do not run `new-client-service-areas-page-build.md` during the standard New Client Build.
   - The standard build still confirms the primary service regions and displays them on the Home page.
   - Start the Service Areas add-on only after an explicit later request from the user.
18. Duplicate the approved Elementor Service Page Template and build every primary and additional service page supplied in the intake.
    - The client-provided Service Page Template is the section contract. Complete exactly the sections it contains; do not add an SOP-listed section that the template owner removed.
    - Do not redesign, reorder, add or remove template sections unless the user specifically requests a structural change.
    - When approval of one page is requested, complete and approve one representative service page first, save it as the client baseline, then build the remaining pages.
    - Rewrite every content field as fresh, service-specific copy; do not mirror paragraph logic across services.
    - Keep every service page nested under the Services hub.
    - Use `/services/{service-location-slug}/` for service page URLs.
    - Keep the approved draft `Service Page Template` unchanged as the reusable reference copy.
    - Add completed primary service pages to the Services submenu and connect relevant service cards, related-service cards and internal links.
19. For a Blog setup, run `new-client-blog-setup.md`.
    - Create the Blog page.
    - Create the Elementor Pro Single Post template.
    - Create the Elementor Pro Post Archive template.
    - Create standard blog categories.
    - Publish three real, useful starter posts for the client, not dummy posts.
    - Generate or assign SEO-named featured images and mid-content images.
    - Apply and verify Yoast metadata per post.
20. During every page-build stage, use `seo/skills/local-business-schema/SKILL.md` to plan, inject and validate the relevant schema before that page is marked complete. Maintain one client `schema-plan.md` and one stable business entity ID.
21. Run `seo/SOPs/yoast-seo-setup.md`, including the final sitewide schema audit.
22. Use Chrome or the in-app browser for visual QA only after direct MCP/REST checks pass, unless the user explicitly asks to watch/review pages in Chrome.
23. Report what changed and what needs review.

## Credit-Efficient Execution

- Read the client brief/status, this pipeline and only the page-specific SOPs needed for the current stage. Do not reread every SOP on every instruction.
- Run the two-check domain access test once per working session. Do not repeat page lists, plugin inventories, global settings or browser-login checks unless a real failure makes them relevant.
- Export/read each page or template structure once, save the working element map locally and reuse it until the structure changes.
- Batch only after the exact save method has passed. Until then, use one tiny proof edit only.
- Prefer Elementor MCP small element/container updates over full-page imports or raw data writes.
- The default successful route is: get page structure, find the target element, read settings, update via MCP, read back, clear Elementor CSS/cache when needed, verify rendered output.
- Treat small staged batches as the default workflow, not as a fallback after a failed large request.
- Do not turn safe chunking into repeated micro-work after a route is proven. Once a page/template is stable, batch 5-8 related low-risk text, link, icon or colour-assignment fields that share one purpose.
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
- Before creating a page, inventory existing pages and check the intended title, slug, parent and template source. Never create speculative batches of blank pages.
- Create and validate one intended page first. Confirm its WordPress ID, parent, slug, Elementor structure and global-item relationships before repeating the operation for additional pages.
- After duplicating any page template, audit all inherited contact details in ordinary widget settings, global widgets and Elementor dynamic tags. Dynamic link metadata can override a visibly corrected phone or CTA destination, so rendered-link verification is mandatory before batching or publishing more pages.
- Treat Yoast as a separate mandatory build track for every new ranking page. Before publication, require a page SEO record plus non-empty stored focus keyphrase, SEO title and meta description; then verify title, description and social metadata in the rendered head. Elementor completion alone cannot satisfy the publication gate.
- Aim for green Yoast results without rewriting truthful, technically accurate, human-facing copy into awkward keyword or readability patterns. Document justified exceptions.
- Keep a build ledger of every page ID created during automation and its intended final title, slug and status. The number of created records must equal the approved page list.
- A failed, duplicate or unused page-creation attempt must not be renamed to `Archived Empty Page`, left as an empty draft, or used as a WordPress-side archive. Preserve reusable source work as a local/template export instead.
- If removal of an unused page is required, identify the exact page IDs, confirm that they contain no needed content or links, obtain approval for the destructive action, and move them to WordPress Trash so the cleanup is recoverable. Never accumulate empty draft records as a cleanup method.
- Never clear a live page before the replacement method has been proven on the same site.
- Never replace an Elementor page with block editor content or custom standalone HTML.
- Never use WordPress content/body updates as the primary visible output for an Elementor client page.
- Never use WordPress REST `content.raw` updates as a fallback for Elementor copy, layout, image, button, FAQ or section work.
- Run one bounded rendered-page audit for contact destinations, icons, image dimensions, overlays, placeholder residue and key text. Take screenshots only for visual decisions.
- Run the palette/colour-role audit early, not only at final QA. Global tokens are the palette vocabulary; local Elementor assignments remain mandatory where semantic roles or contrast are wrong.
- During the image-dimension audit, verify that Home/service page content-section image widgets that require square images use actual square 1000x1000 source/media files, not landscape/portrait files hidden by CSS, Elementor object-fit, masks or visual cropping.
- During the image-dimension audit, verify that hero/background/overlay image slots use actual 1920x1080 landscape compressed WebP source/media files unless the template documents another landscape ratio.
- Flag and fix any background/overlay image that is square, portrait, PNG, a screenshot-style upload, or larger than 500 KB. Target under 350 KB whenever possible.
- Ask the user only when missing information would create a material factual, legal, structural or brand error; safely draft ordinary customer-facing content from the approved intake and guardrails.

## Elementor Styling Discipline

During Template Replacement Mode, styling is locked by default. This section governs only design work the user explicitly requested or approved after Barry explained why it was required; it never authorizes unrequested repair or improvement during content replacement.

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
- Treat `https://template.mynewwebsite.co.za/` as the approved master source-of-truth website. Do not use it as a client build target.
- The root domain `mynewwebsite.co.za` is released from the template workflow and must not be accessed or used as a template fallback unless the user explicitly authorizes a separate non-template task on that exact domain.
- Use Development sites for testing and skill refinement.
- Keep every website's status files updated as work progresses.
- Keep all actions scoped to the exact domain approved for the task.
- Do not inspect or test other domains on the same server unless the user explicitly asks for them.
- Pace MCP, REST, media upload, and browser reload workflows so they do not look like abusive traffic.
- If requests start timing out or security responses appear, pause and check whether IP whitelisting or firewall rules are needed.
- A standard New Client Build normally includes the Home page, Services hub page, About Us page, every primary and additional service page from intake, Blog page, Single Post template, Post Archive template, three real starter blog posts, global items, SEO, schema and QA unless the user explicitly limits scope.
- The About Us page is a mandatory first-run ranking and company-profile page. Build it from `new-client-about-page-build.md`; do not defer it to a later cleanup phase.
- The full Service Areas hub is a separate add-on. It begins only after an explicit user request once the standard build has established the primary regions on the Home page.
- The current Barry Master Template structure on `template.mynewwebsite.co.za` is the approved source of truth. The cloned WordPress IDs normally remain:
  - Home page `2747`
  - Services hub `6217`
  - Service Areas hub `6414`
  - About Us page `6606`
  - Service Page Template `6655`
  - Blog page `6425`
  - Single Post template `6432`
  - Post Archive template `6434`
  - Global Contact CTA Buttons template `6575`
- Home uses the five primary services.
- Services hub uses the five primary services plus all additional services from intake.
- The later Service Areas add-on uses the primary regions already confirmed during the standard build and researches exactly 12 suitable sub-locations for each region unless the user explicitly approves another count.
- Primary service area pages nest under Service Areas, and suburb/spoke pages nest under the relevant primary service area.
- Blog setup uses intake services, locations, FAQs, common customer questions, and SEO keywords to create genuinely useful starter posts.
- Use the reusable Contact CTA source for Call and WhatsApp buttons wherever possible; if Elementor MCP cannot insert it as a true global widget, copy from the approved reusable template and keep links/display text synchronized.
- WhatsApp is conditional. If intake does not provide an approved WhatsApp number, convert every WhatsApp CTA to `Email Us` and remove all inherited `wa.me` links.
- Before visual sign-off, run a full CTA residue scan for old phone numbers, `tel:` links, `wa.me` links, email links, `#` service-card links and inherited global-widget settings.
- For every contact CTA, compare the rendered label/value with its actual target. Displayed phone digits must match the `tel:` digits, and displayed email text must match the `mailto:` address; clear inherited dynamic-link overrides that silently replace the configured target.
- Apply and verify the favicon/site icon before the first design-review handoff.
- Keep the header logo large enough to read without overpowering navigation, and verify desktop/tablet/mobile widths.
- Preserve the protected global hero form unchanged unless the user explicitly authorizes a separate global-form change.
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
