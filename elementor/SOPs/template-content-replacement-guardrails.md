# SOP: Template Content Replacement Guardrails

This is the controlling SOP for every new-client conversion and every request to set up, convert, populate, redo, or replace client-facing content in the approved Elementor template.

It overrides any broader permission elsewhere that describes Barry as a designer, permits layout polishing, or allows new sections, styling changes, plugin changes, or visual remediation. Those permissions apply only to a separately requested and explicitly approved design task.

## Fixed Role

In Template Replacement Mode, Barry's default role is template content publisher and SEO/GEO copywriter. Barry does not act as the website designer unless the user explicitly instructs Barry to redesign, restyle, restructure, repair or change a named element or scope.

Barry must preserve the approved template and:

1. apply the client's approved global colour palette and site identity;
2. replace existing client-facing copy, images, links, contact data, SEO and schema;
3. duplicate approved page templates for required hub-and-spoke pages; and
4. publish and connect those pages only when requested.

`Build`, `create`, `setup`, `redo`, `finish`, `Home`, `About`, `Services`, `service page`, `hub`, and `spoke` do not authorize a redesign. They mean duplicate the approved infrastructure where necessary and replace its client-facing fields.

## Mandatory Startup Gate

Before the first website mutation, Barry must:

1. query Graphify for the latest new-client, Elementor, copy, image, SEO and client-facing-content rules;
2. directly read the authoritative SOPs and skills returned by that query;
3. read the client folder, intake, brand material, approved references and target-page list;
4. confirm that the approved populated Elementor template is present and record a clean baseline page/template export or element map;
5. confirm the exact target domain and a proven small Elementor save/readback route; and
6. enter Template Replacement Mode in the build ledger.

Failure of any startup step is a hard stop. Graphify routing never replaces direct SOP reading.

## Mutation Allowlist

The only default mutations are:

- approved Elementor global colour tokens and WordPress/Elementor site identity;
- Elementor-native colour-role assignments and local colour overrides that are required to make the approved client palette legible and semantically correct, subject to the scoped authority below;
- existing widget text fields, headings, editor content, CTA labels and approved destinations;
- existing image or background-media references, alt text and media metadata;
- verified client contact details, menu labels/items and internal links that are in scope;
- Yoast fields, schema and site representation;
- duplication of an approved page template for a required hub or spoke, followed by the same allowlisted field replacements; and
- publication and menu linking when the user has authorized them.

Before every batch, record the target element and exact setting keys allowed to change. Send only those keys. Read them back. If any unapproved key changes, stop immediately and restore the clean baseline or an identified revision before continuing.

## Immutable Template Controls

Unless the user separately and explicitly asks for a design or structural change, Barry must not change:

- element IDs, parent IDs, hierarchy, order, widget types, containers, wrappers, classes or anchors;
- sections, columns, cards, global components, header, footer, forms or template conditions;
- typography, font family, font size, font weight, line-height or letter spacing;
- gradients unrelated to the approved palette, decorative colour effects, or opacity changes outside the scoped colour-and-contrast authority below;
- padding, margins, gaps, widths, heights, min-heights, alignment or positioning;
- backgrounds other than the background image reference itself;
- borders, radius, shadows, masks or decorative wrappers;
- image size controls, custom dimensions, object-fit or object-position;
- responsive controls, breakpoints, display rules or mobile styling;
- animations, motion effects, transitions or lazy-loading behaviour;
- dynamic bindings, custom attributes, code, CSS, JavaScript, plugins or theme settings; or
- form structure, styling, field labels, spacing, button presentation, logo placement, destinations or integrations.

Visual QA does not grant permission to change an immutable control. Report an apparent template or rendering issue and stop unless it was directly caused by an allowlisted field replacement.

These controls are immutable by default, not permanently unchangeable. A clear user instruction naming the design/structural outcome authorizes that scoped exception. The exception must be performed separately from ordinary replacement batches and does not unlock unrelated elements.

## Global Palette First

After startup and preflight, the first actual client-site mutation is the approved global palette and site identity.

- Derive the palette from the approved logo unless the user supplies an explicit palette override.
- Inventory all usable colours visibly present in the provided logo before assigning tokens.
- `Primary`: the main prominent usable brand colour selected from the logo.
- `Secondary`: another suitable colour selected from the logo. It may contrast strongly with Primary; black is often the correct Secondary in orange-and-black or other two-colour logos.
- `Accent` / `Highlight`: another suitable colour selected from the logo when available. It does not have to be a shade of Primary.
- `Text`: black, `#000000`.
- Supporting/custom global colours may use additional colours visibly present in a multi-colour logo. Derive shades or tonal variations only when the logo does not provide enough usable colours for the required tokens.
- Never invent a hue that is absent from the logo. White and transparent template utility tokens remain preserved.
- Update only the intended global colour values while preserving the complete Elementor Kit, token IDs and every unrelated setting.
- Never replace the whole Kit settings object with a partial object.
- Read the global colours back before continuing.
- Use the exact non-browser Global Palette Fast Path in `elementor/skills/elementor-mcp-assistant/SKILL.md`: resolve the active Kit, call `elementor-mcp-update-page-settings` with only the complete four-item `system_colors` array, then verify with `elementor-mcp-get-global-settings`.
- Do not use the currently defective `elementor-mcp-update-global-colors` tool until an independent test proves that it updates System Colors rather than appending duplicate Custom Colors.

The global palette is the approved brand vocabulary, not a promise that every inherited token binding is correct. Immediately after the global-token readback, render the Home page once and run the representative colour-role audit below before populating the rest of the page.

## Scoped Colour And Contrast Authority

During a new-client conversion, Barry may correct Elementor-native colour settings without separate design approval when the global palette exposes an inherited binding that is visibly wrong, carries an old-template hue, or fails reasonable contrast. This authority is deliberately limited to:

- text and heading colour;
- icon foreground and icon-circle/background colour;
- button background, text and border colour;
- card, form and field border/background/text colour;
- section background overlays and their opacity;
- separators and neutral borders; and
- normal, hover, focus, active and selected colour states.

Use global tokens where their semantic role is correct. Reassign the element to the correct global token, or apply a local Elementor colour only when the inherited binding is coupled to the wrong role. Never invent a new hue when the logo palette or a derived neutral can solve the problem. These changes must remain editable in Elementor and must not use CSS, JavaScript, code injection or raw full-page data writes.

This authority does not permit changes to layout, structure, spacing, typography, sizing, responsive behaviour, form function, dynamic data, animation, theme settings or template conditions. Keep colour correction in its own mapped batch and read back the exact changed settings.

Use these semantic roles even if the active Kit uses different token names:

- `Brand Primary`: the main logo colour for emphasis and selected accents;
- `Brand Dark`: the darkest suitable logo colour or a derived dark neutral;
- `Body Text`: black or the approved near-black used on light surfaces;
- `Light Surface`: white or an approved near-white;
- `Text On Dark`: white;
- `Neutral Border`: a restrained neutral that remains visible; and
- `Supporting Tint`: optional and used only when the logo genuinely supports it.

The first representative audit must inspect the hero, one light section, one dark or image-overlay section, one icon treatment, one primary/secondary CTA pair, the hero/global form, the FAQ normal/hover/active states and the footer/contact area. Fix the mapped colour-role problems before broad copy or media replacement continues. Hard failures include orange-on-orange, dark-on-dark, white-on-white, an unexplained old-template hue, a blank or invisible CTA, an icon that disappears into its circle, and an interaction state whose text loses contrast.

## Dark Overlay Contract

Every hero or full-width image-overlay section must use the darkest suitable colour from the approved logo, such as black, navy or dark green. If the logo has no usable dark colour, derive a dark tonal neutral. Assign the overlay explicitly to the owning Elementor container instead of trusting a global token binding.

Headings, paragraphs, lists, labels and other essential copy on the dark overlay must render white unless a documented approved design uses another accessible light colour. Start from the approved Home overlay intensity and strengthen it only when the image prevents reliable text legibility. Approved secondary pages inherit the Home overlay treatment unless the user requests a deliberate exception.

## Exact Copy Replacement Contract

- Treat the current local-service copywriting SOP as a fail-closed publishing gate, never as optional reference material.
- Draft and review the full page copy outside Elementor before the first copy mutation. Record a `PASS` for the human-facing copy gate and the SEO heading gate in the build ledger or client copy plan.
- Do not apply copy when either gate is missing or failed. Field completeness is not proof that the writing is publishable.
- Change only the existing text-owning fields.
- Preserve the template's heading levels, typography, line-height, spacing and responsive behaviour.
- If copy wraps poorly, rewrite it more concisely to fit the approved template. Do not restyle the widget.
- Write natural, client-facing copy based on the current copy SOP, not generic agency jargon.
- Use the focus keyphrase, primary service, location and close variations naturally across relevant H2s without repeating one mechanical construction.
- Keep pages distinct, useful and sufficiently detailed. Never keyword-swap or reuse one paragraph skeleton across spokes.
- Use verified facts only and complete the required zero-placeholder and zero-em-dash checks.
- Require one H1 that naturally contains the focus service/keyphrase and primary location. Require useful H2 keyphrase variations across the reading journey rather than generic abstractions or repeated exact-match formulas.

## Exact Image Replacement Contract

- For an Image widget, change only its media ID/URL, alt text and required source/size reference.
- For a background slot, change only its background-image/fallback-media reference.
- Preserve the slot's wrapper, fill, overlay, opacity, positioning, sizing, padding, radius, border, responsive settings and animation.
- Prepare the asset to the documented slot ratio and size before upload. Never change the slot to accommodate the asset.
- Replace like for like: square with a true square asset, landscape with a true landscape asset, and logo with a properly prepared logo.
- Use varied, section-relevant imagery. Do not repeat one image across the hero, content panels and background bands unless the approved template/client plan explicitly calls for that repetition.

If a simple image swap produces a grey frame, changed dimensions, lost radius or other styling drift, treat that as an unapproved mutation and restore the baseline. Never blame the template for drift introduced by the update.

## Protected Forms And Global Components

Forms are protected. Ordinary template conversion does not authorize changes to form layout, fields, styling, text colours, spacing, buttons, logo placement or presentation.

Only an explicitly authorized contact-data or recipient update may be made, in its own small batch, to the correct reusable/global owner. Do not redesign or repair a local form during page work.

## Small-Batch Execution Contract

- Work on one page and one section at a time.
- Default to 1-3 related low-risk fields per batch until the route and page are proven. Once the page/template is stable, use 5-8 related low-risk text, link, icon or colour-assignment fields per batch when they share one clear purpose.
- Never send full-page, multi-section, mixed-purpose or broad raw Elementor writes.
- Keep global colours, site identity, menus, global components, page copy, page media, SEO and publication in separate batches.
- After one hang, timeout, partial write or unexpected result, abandon that batch shape immediately and re-check saved state.
- After two failures on the same path, stop and report the blocker. Do not loop, improvise a workaround or broaden scope.

The efficient default is one targeted read, one small update, one readback and one targeted rendered check.

## Bounded QA

For each completed page:

1. verify the changed Elementor fields and their links/media;
2. perform one targeted rendered check of the changed areas at the required responsive sizes;
3. check for stale client-facing copy/media, broken destinations, incorrect image ratios, SEO/schema omissions, page-title residue, incomplete CTAs, icon contrast and normal/hover/active colour failures; and
4. record pass, blocker or user decision.

QA is diagnostic, not a redesign loop. Do not run repeated full-site audits, browser reload cycles, speculative cleanup, animation removal, wrapper cleanup, forensic remediation or unrelated template repair. A screenshot timing, lazy-load or CSS-regeneration artefact is not proof of a production defect.

## Completion Gate

Barry may report a page or site complete only when:

- every in-scope original client-facing field has been replaced;
- the stored human-facing copy and SEO heading gates show `PASS` before Elementor application;
- page-specific copy and imagery are present and no stale client residue remains;
- the global palette/site identity, contact data, menus and destinations are correct;
- the representative colour-role audit and final responsive colour/state audit passed;
- approved hub-and-spoke pages use duplicated template infrastructure and the correct hierarchy;
- Yoast, schema, titles, descriptions, links and media metadata are complete;
- all actual mutations stayed inside the allowlist; and
- the one bounded readback/render verification passed.

Do not redefine completion to include redesign, styling improvement, animation cleanup, template remediation or forensic auditing.

## Hard Stop And Scope Expansion

If the user explicitly requests a layout, style, responsive, form, global-component, template-condition, code, plugin or structural change, Barry may perform that named change using the relevant safety SOP and a separate batch. If Barry discovers that such a change is genuinely required but the user did not request it, Barry must stop, describe the exact element, reason and proposed change, and request approval.

Approval for one exception does not disable Template Replacement Mode for the rest of the project.
