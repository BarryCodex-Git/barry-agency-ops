# SOP: Client Customization

Use this SOP after theme setup and MCP readiness have passed.

For new-client work, this SOP customizes the imported Elementor master/template site. It must not be used to rebuild pages outside Elementor.

## Goal

Customize a standard agency theme/site using the client data sheet and brand assets.

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
   - global settings save/readback for colour and typography changes
   - one widget save/readback before copy/link batches
   - one container save/readback before layout/style batches
   - disposable draft test before section deletion, full-page import, or raw Elementor data writes
6. Use the proven Elementor MCP working route:
   - get page/template structure
   - find the exact element
   - get element settings
   - update that widget/container/template setting through MCP
   - read the changed settings back
   - clear Elementor CSS/cache once after a completed batch when needed
   - verify the changed public section
7. Extract or confirm logo colors.
8. Create a brand palette.
9. Prepare homepage copy.
10. Prepare service section copy.
11. Prepare image plan and alt text.
12. Update Elementor global colors through MCP where appropriate.
13. Update company name and basic site identity.
14. Update page content through MCP in small chunks where appropriate.
15. Apply Barry's Elementor labelling standard to any new or modified sections/widgets.
16. Use browser for visual QA only after direct checks pass, unless the user specifically asks for Chrome visual review.
17. Update status files.

## Efficient Editing Rules

- Do not send large page payloads as the first edit method.
- Do not clear a live page before the replacement path has been proven on the same site.
- Do not publish WordPress block editor content over an Elementor client page.
- Do not use custom HTML/CSS pages as a fallback for Elementor save problems.
- Do not use WordPress REST page-body/content updates for visible Elementor content.
- If an MCP batch fails, split the same work into smaller MCP element updates. If targeted MCP updates also fail, stop and report the blocker instead of inventing another route.
- Prefer small MCP `update-element` or `update-multiple-elements` batches.
- Verify saved settings by reading them back before checking the rendered page.
- Verify public HTTP 200 after each high-risk chunk.
- Keep header/sticky/logo changes separate from body copy changes.
- Keep structural deletes separate from style/copy updates.
- If MCP rejects section deletion because of legacy Elementor data, stop that route and report it. Do not keep retrying.

## Styling Rules

- Do not use custom CSS, injected CSS, pseudo-content, HTML inline styles, JavaScript, snippets or code shortcuts for normal Elementor styling.
- Use Elementor's own section, container, column and widget controls for all alignment, spacing, padding, margins, widths, typography, colours, borders, shadows, backgrounds, hover states and responsive behaviour.
- Header, footer, menu, button and form alignment must be solved with container structure and Elementor controls first.
- Keep the result client-editable inside Elementor. If a client cannot easily adjust the styling from Elementor controls, the method is not acceptable for normal build work.
- Only consider code after stopping and asking the user, and only for a clearly exceptional requirement that Elementor controls cannot handle.

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
