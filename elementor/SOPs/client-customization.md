# SOP: Client Customization

Use this SOP after theme setup and MCP readiness have passed.

For new-client work, this SOP replaces client-facing fields in the imported Elementor master/template site. It must follow `template-content-replacement-guardrails.md` and must not redesign, restyle or rebuild the template.

## Goal

Convert a standard agency template using the client data sheet and brand assets while preserving its structure and styling.

## Required Inputs

- Client master data sheet
- Company name
- Logo
- Main services
- Primary location
- Contact details
- CTA preference
- Brand voice
- Target pages

## Process

1. Read the client folder.
2. Read the client master data sheet.
3. Confirm MCP readiness has passed.
4. Confirm the target pages/templates are Elementor records from the approved imported master/template.
   - Do not continue if the site is missing the imported Elementor structure.
   - Do not create or replace pages with WordPress block editor content.
   - If a page is missing, duplicate the approved Elementor template source or stop and ask.
5. Confirm the exact save method for the planned work has passed:
   - targeted global-colour merge/save/readback that preserves the complete Elementor Kit
   - one widget save/readback before copy/link batches
   - one owning media/background field save/readback before image-reference batches
6. Use the proven Elementor MCP working route:
   - get page/template structure
   - find the exact element
   - get element settings
   - update that widget/container/template setting through MCP
   - read the changed settings back
   - clear Elementor CSS/cache once after a completed batch when needed
   - verify the changed public section
7. Extract or confirm logo colours.
8. Create the approved brand palette.
9. Make the approved global palette and site identity the first site mutation; read them back before page work.
10. Prepare client-facing Home, About, Services hub and service-page copy using the current copy SOP.
11. Prepare varied, correctly sized images and honest alt text for the existing slots.
12. Replace only existing content/media/link fields through MCP in small allowlisted batches.
13. Duplicate the approved page template for required hub-and-spoke pages, then replace its existing fields only.
14. Audit the active WordPress header menu before any menu save:
   - remove inherited previous-client labels and custom links
   - inspect unsaved `Pending` items
   - do not save until only the approved client hierarchy remains
   - verify the published desktop and mobile menu after saving
15. Use browser for visual QA only after direct checks pass, unless the user specifically asks for Chrome visual review.
16. Update status files.

## Efficient Editing Rules

- Do not send large page payloads as the first edit method.
- Do not clear a live page before the replacement path has been proven on the same site.
- Do not publish WordPress block editor content over an Elementor client page.
- Do not use custom HTML/CSS pages as a fallback for Elementor save problems.
- Do not use WordPress REST page-body/content updates for visible Elementor content.
- If an MCP batch fails, split the same work into smaller MCP element updates. If targeted MCP updates also fail, stop and report the blocker instead of inventing another route.
- Prefer small MCP `update-element` or `update-multiple-elements` batches.
- Verify saved settings by reading them back before checking the rendered page.
- Verify public HTTP 200 after each completed page.
- Keep header/sticky/logo changes separate from body copy changes.
- Do not perform structural deletes or layout/style updates during ordinary template conversion.

## Template Preservation Rules

- Do not use custom CSS, injected CSS, pseudo-content, HTML inline styles, JavaScript, snippets or code shortcuts for normal Elementor styling.
- Do not change alignment, spacing, padding, margins, widths, typography, line-height, local colours, borders, shadows, overlays, hover states, wrappers, responsive behaviour, animations, forms or structure during ordinary conversion.
- Replace an image by changing only its media fields. Prepare the correct asset ratio before placement; never alter the slot to fit it.
- Replace copy by changing only its text fields. Rewrite overlong copy to fit; never alter heading styling or line-height.
- Treat any design or structural need as a separate scope requiring explicit approval.

## Confirmation Stops

Ask before:
- Changing contact details
- Changing form recipients or notification emails
- Publishing final changes on live client sites
- Replacing large sections of live content
- Removing existing content
- Repairing malformed Elementor data
- Using raw `_elementor_data` writes on live client pages

## Output

Report:
- Brand colors applied
- Company/site identity updates
- Content updated
- Pages affected
- Visual QA notes
- Approval items
