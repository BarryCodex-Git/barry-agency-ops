# SOP: Always-Read Elementor Rules

Barry must read and follow this SOP before any WordPress or Elementor website task.

Barry's role is to work as an Elementor website operator, not a custom-code frontend designer. For a new-client/template conversion, Barry is specifically a template content publisher and SEO/GEO copywriter, not the website designer. These rules apply to new builds, new pages, new sections, existing-page edits, copy updates, image swaps, button/link changes, spacing tweaks, responsive fixes, visual polish, templates, reusable components, and client feedback rounds.

Small edits are not an exception.

## 0. Template Replacement Mode

Every new-client conversion, template setup, content replacement, client rebrand, hub build or spoke-page build must first enter and follow `template-content-replacement-guardrails.md`.

That mode overrides general Elementor building permissions. It permits the approved global palette/site identity first, then exact replacement of existing client-facing copy, media, links, contact data, SEO and schema, plus duplication of approved page templates. It does not permit layout, typography, line-height, spacing, wrapper, overlay, hover, responsive, animation, form, widget-type, structure or plugin changes unless the user explicitly requests that exact change or approves it after Barry explains why it is required.

## 1. Elementor-First Rule

All visible page structure, spacing, styling, and content layout must be implemented through Elementor's native builder controls.

Use Elementor sections, columns, inner sections where useful, containers, rows, flexbox, grid, widgets, padding, margins, gaps, widths, max-widths, alignment, typography controls, color controls, backgrounds, borders, border radius, image controls, responsive controls, global colors, global fonts, Theme Style, and Elementor templates.

MCP, JSON, API calls, or structured page data may only be used as a technical bridge to inspect or modify Elementor-native settings. They must not be used to bypass Elementor with custom code, injected markup, raw-code layout, hidden CSS, frontend-only styling, or non-editor-friendly structures.

Do not use custom CSS, HTML, JavaScript, shortcode workarounds, raw JSON structures, or injected code for ordinary layout, styling, spacing, content structure, or responsive behavior.

Custom code is allowed only as a documented exception when Elementor-native controls cannot solve a specific approved requirement. Before using that exception, stop, explain why Elementor cannot do it natively, get explicit approval, and document the reason.

## 1A. Widget-First Structure Rule

Barry must choose the right Elementor widget or approved template component before recreating a design with generic containers.

Containers are for layout. Widgets are for content/function.

Do not add containers inside containers inside containers merely to recreate something Elementor or Elementor Pro already provides as a native widget, approved template component, Loop Item, saved section, global widget, form, menu, CTA, testimonial, accordion, gallery, carousel, icon box, image box, or Table of Contents pattern.

Nested containers are allowed only when they make the Elementor structure clearer, improve responsive ordering, group related content, or match the approved template pattern.

Best practice means clean Elementor structure, correct widget choice, global design-system use, responsive controls, and handoff quality. It does not mean custom code, raw JSON styling, or hidden layout shortcuts.

## 2. Theme-Fidelity Rule

Before creating, rebuilding, editing, polishing, or updating any page, section, template, or component, first understand the existing theme and page system relevant to that task.

All work must match the site's existing page structure, page templates, content widths, section widths, layout wrappers, sidebar/full-width conventions, spacing rhythm, gutters, typography, colors, button styles, card styles, image treatment, header behavior, footer behavior, component style, responsive patterns, and overall visual language.

A "new page" means a page that belongs to the current website. It does not mean a redesign unless the user explicitly approves a redesign.

Do not create pages that look like a different website, ignore established page widths, use the wrong page template, accidentally include/remove sidebars, bypass layout wrappers, invent a new visual language, or replace the existing theme structure without approval.

Before new page, section, template, or component work, identify the closest existing page/component pattern to follow and confirm the correct page template, content width, sidebar/full-width convention, and header/footer context.

## 3. Human-Handoff And Editor-Parity Rule

Build for the next human Elementor designer.

A human designer must be able to open the page in Elementor and understand, select, edit, resize, reposition, restyle, and maintain the visible frontend using normal Elementor UI controls.

This applies equally to small existing-page edits. A one-line text change, image adjustment, button update, spacing tweak, or responsive correction must still be made through the appropriate Elementor widget, section, container, style, advanced, or responsive control.

The Elementor editor canvas and Navigator must explain the frontend.

Spacing, padding, margins, gaps, widths, alignment, image positions, text layout, card layouts, columns, section structure, container structure, responsive behavior, widget styling, and page layout must live in Elementor controls, not hidden CSS, injected markup, frontend-only code, or unexplained workarounds.

Do not create frontend results that are not honestly represented in the Elementor editor.

If the frontend depends on something a normal designer cannot see and adjust in Elementor, stop and rebuild it with Elementor-native controls or ask for explicit approval for a documented exception.

## 4. Existing-Page Edit Rule

For existing pages, edit the existing Elementor owner of the requested change wherever possible.

Examples:

- text change: edit the existing heading, text editor, or content widget
- image change: edit the existing image widget, background image control, or media field
- button change: edit the existing button widget
- spacing change: edit the existing section, container, widget padding, margin, gap, width, or responsive control
- mobile issue: edit the relevant Elementor responsive control
- layout issue: edit the relevant section, container, column, grid, flexbox, or page-template setting
- global style issue: edit the correct global color, global font, Theme Style, or reusable template only if that scope is approved

Do not layer new wrappers, duplicate widgets, hidden CSS, injected code, or frontend-only overrides on top of an existing design just to make a quick visible fix.

When the request is content or image replacement, change only the owning content/media field. Preserve every style, advanced and responsive setting. If longer copy does not fit, rewrite the copy to fit; do not change line-height or layout. If a replacement image does not fit, prepare the correct-ratio asset; do not change its container or image styling.

Small edits are not an exception.

## 5. Current-Action Checkpoint

Do not lock the entire task into a rigid mode. Barry may move fluidly between learning, editing, checking, refining, and reporting.

Before each meaningful action, identify the current action type and apply its safety boundary:

- read-only learning/checking: inspect, compare, document, or verify only
- Navigator labelling: change only approved Elementor Navigator labels
- routine Elementor edit: make approved reversible edits through Elementor-native controls
- high-impact action: pause for explicit confirmation before broad, destructive, inherited, production, integration, code, plugin/theme, credential, database, form-destination, global-style, template-condition, or difficult-to-reverse changes
- production action: act only when production is explicitly identified and authorized

## 6. Verification Rule

After meaningful layout or visual work, verify both:

- the saved Elementor structure
- the rendered frontend

One does not prove the other.

Confirm editor parity:

- can a human Elementor designer find and edit the sections, containers, widgets, spacing controls, responsive settings, and style controls that produce the frontend result?
- does the Elementor editor canvas broadly match the frontend layout?
- were changes made in the correct Elementor/WordPress owner rather than through an added workaround?
- do desktop, tablet, and mobile views behave correctly?

Do not claim checks passed unless they were actually performed.

## 7. Content Completeness Rule

Published pages, client-facing drafts, examples, and reusable templates must use real, complete, visitor-facing web copy.

Do not publish placeholder, internal-source, or example wording such as "client brief", "legacy content", "to be added", "where this should live", "example copy", "final copy to be approved", "placeholder text", or "lorem ipsum".

If final facts are not verified, write clean public copy that avoids the unverified claim rather than exposing internal notes.

### Approved New-Client Testimonial Handover Exception

The approved Home Page Testimonials section is a narrow exception for agency New Client Builds when verified reviews or a Trustindex connection are not available yet.

- Build the existing Testimonials section with exactly three clearly managed handover review placeholders.
- The visible cards may use plausible customer names, natural customer-style wording and locations from the client's approved primary service regions so the development and handover design is complete.
- Mark the section and every placeholder name/quote clearly in Elementor Navigator as `PLACEHOLDER` and `Replace With Trustindex`. These backend labels must not appear in the visible copy.
- Manually replace the cards with the approved Trustindex or Google review widget once the client's Google profile and review connection are ready.
- Until replacement, do not describe the cards as verified Google reviews, do not create an aggregate rating claim, and do not include the placeholder reviews in Review or AggregateRating schema.
- This exception applies only to the approved New Client Build Testimonials section. It does not permit invented reviews, ratings or customer proof elsewhere on the website.

## 8. Square Paired-Content Image Gate

Across every page type, any standard inline image widget used beside text in a two-column content section must use a genuine 1000x1000 square source/upload file unless that exact template slot has a documented approved exception.

This includes Home, Services hub, individual service, Service Areas, About and other pages, and covers professional-service, why book, why choose, why trust, process, approach, coverage, service-support and similar alternating text/image sections.

A landscape hero or background asset must never be placed into one of these inline image widgets. A square-looking frame, Elementor crop, object-fit, mask, fixed height or rounded container does not make a landscape source compliant.

Before page sign-off, audit the source file used by every inline image widget in these section patterns. Confirm the actual uploaded/media dimensions are 1000x1000, the format is WebP and the desktop result is visually square and balanced. If the source is landscape or portrait, replace it with an approved square asset or prepare a dedicated square export before placement.
