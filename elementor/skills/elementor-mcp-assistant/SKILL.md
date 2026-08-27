---
name: elementor-mcp-assistant
description: Use this skill when Barry needs to inspect or modify Elementor pages through Elementor MCP, including listing pages, reading page structure, updating widgets, containers, global colors, typography, media, templates, and verifying Elementor changes with minimal browser clicking.
---

# Elementor MCP Assistant

Use Elementor MCP as Barry's preferred technical route for repeatable Elementor work.

## Use This Skill For

- Listing Elementor pages
- Reading page structure
- Finding headings, buttons, images, containers, and widgets
- Labelling and classifying sections, containers, and widgets
- Reading global colors and typography
- Updating Elementor widgets or containers
- Building or importing Elementor page sections
- Updating global design tokens
- Preparing page changes before browser review

## Fast Path: Development 1

For `Development 1`, `dev 1`, or `dev1.mynewwebsite.co.za`, use:

Endpoint:

`https://dev1.mynewwebsite.co.za/wp-json/mcp/elementor-mcp-server`

Secret:

`secrets/development-1-elementor-mcp.json`

Initial read-only tools:

- `elementor-mcp-list-pages`
- `elementor-mcp-get-global-settings`
- `elementor-mcp-get-page-structure`

If Codex does not expose MCP tools directly, call the HTTP MCP endpoint manually:

1. Send MCP `initialize`.
2. Reuse the returned `Mcp-Session-Id`.
3. Call only the specific tool needed.

## Global Palette Fast Path

For a new-client clone, the palette is the first website mutation. Do not open Chrome to edit Site Settings.

Use this supported route:

1. Call `elementor-mcp-get-global-settings` and retain the four active `system_colors` tokens.
2. Resolve the active Elementor Kit ID. Prefer a connector result that supplies the active Kit ID. When it does not, list `elementor_library` records through authenticated WordPress REST with edit context, filter to `_elementor_template_type = kit`, and select the unique Kit whose stored `system_colors` exactly match the global-settings readback. Never assume a cloned Kit keeps a particular ID.
3. Build the four-token palette deterministically: `primary` from the logo, `secondary` as a tonal variation of Primary, `accent` as another highlight shade of Primary, and `text` as `#000000`. Do not introduce an unrelated hue unless the user explicitly supplies a palette override.
4. Call `elementor-mcp-update-page-settings` once against that Kit ID with a settings object containing only the complete four-item `system_colors` array: `primary`, `secondary`, `text`, and `accent`. Preserve those token IDs and titles.
5. Immediately call `elementor-mcp-get-global-settings` again and compare all four IDs and normalized hex values with the approved palette.
6. Stop the build if the active Kit cannot be resolved uniquely, the write fails, or readback differs. Do not fall back to browser clicking or a full Kit write automatically.
7. Clear Elementor CSS/cache once if required, then use one rendered check to confirm global bindings resolve. Chrome is optional verification only.

Do not use `elementor-mcp-update-global-colors` with the currently deployed EMCP Tools implementation. It has returned success while appending duplicate entries to `custom_colors` and leaving `system_colors` unchanged. It may be used again only after a connector fix is independently proven by immediate readback.

The new-client setup instruction authorizes this four-token update on the approved development/staging target. A separate confirmation is still required for an unrequested palette change on a production site.

## Credit-Saving Rules

- Do not list all tools unless the user asks what tools are available.
- Do not list MCP resources/templates for Elementor MCP tasks.
- Do not inspect unrelated files when the website directory already identifies the site.
- Prefer one targeted read-only call before making a plan.
- For known sites with saved credentials and endpoint records, do not repeat the full readiness checklist on every task.
- Use the normal working pattern: targeted read, batched update, targeted verification.
- Reuse the active MCP session ID within the same task where possible.
- If manual HTTP MCP is required, initialize once per task and then batch related calls through that session.
- Use WordPress REST as a fallback for actions MCP does not expose, not as a competing route to re-check the same information.
- Do not run page-list, tool-list, global-settings, browser login, and REST auth checks together unless diagnosing a real access problem.
- Use Chrome only for visual verification unless the task specifically needs browser interaction.
- Summarize large Elementor JSON instead of dumping it.
- Treat `we are working on [site], test access please` as the two-check process in `elementor/SOPs/quick-domain-access-test.md`: one WordPress authentication request and one MCP initialize request, then stop.
- A successful quick access test must not trigger page lists, plugin checks, global settings reads, browser checks, or a full readiness audit.

## Domain Scope

- Use Elementor MCP only on the exact domain or development site approved for the current task.
- Do not inspect, crawl, test, log in to, or make requests against other domains on the same shared server unless the user explicitly asks for that site.
- Keep browser, MCP, REST, and media-upload actions scoped to the approved WordPress domain and its known endpoints.
- Pace repeated MCP, REST, media-upload, and browser reload actions in small groups to reduce the chance of triggering server security rules.
- If access appears blocked or rate-limited, pause and check whether a firewall, WAF, ModSecurity, CSF/LFD, Imunify, or hosting IP block is involved before continuing.

## Safe Update Route

- Prefer `elementor-mcp-batch-update` for multiple widget/container setting changes.
- Prefer targeted `elementor-mcp-update-element` or `elementor-mcp-update-container` for single-element changes.
- Use the proven route for content changes: get page structure, find element, get element settings, update through MCP, read back, clear Elementor CSS/cache when needed, then verify the public section.
- Chunk work deliberately:
  - one page/template at a time
  - one section at a time
  - 1-3 related widgets per early batch
  - up to 5-8 low-risk text/link/icon widgets only after the page has proven stable
  - one high-risk background/container/global/form/template change per batch
- Send only changed setting keys where the MCP tool supports it. Avoid copying huge full settings objects into routine updates.
- Avoid full-page `_elementor_data` REST writes unless the user has approved a controlled repair and no MCP element-level tool can do the job.
- Do not use WordPress REST page-body/content updates, block editor content, or custom HTML as a fallback for Elementor page content.
- If an MCP batch fails, split the same work into smaller MCP element updates, then single-element updates, and continue independent sections where safe. If targeted MCP updates fail or a repair/approval step is required, stop and report the blocker instead of steering into a different build method.
- For image widgets, upload media first, set media alt text, then update only the mapped image widget settings.
- For background images, prepare the correct asset before upload: actual 1920x1080 landscape `.webp`, compressed before upload, target under 350 KB and never above 500 KB unless the user explicitly approves an exception.
- Do not set square, portrait, PNG screenshot, uncompressed PNG, or multi-megabyte files as Elementor container background/overlay images.
- For background images, update the mapped container background settings, then clear Elementor cache/CSS.
- After image or background changes, call the Elementor cache endpoint if available:
  - `DELETE /wp-json/elementor/v1/cache`
- Reload the public page after cache clear so Elementor can rebuild `post-[id].css`.
- Verify background-image changes in `wp-content/uploads/elementor/css/post-[id].css`.
- Verify the chosen background media item dimensions, MIME/extension, and file size before marking the page complete.
- For ordinary content, button, FAQ, heading, image-alt, and SEO updates, verify the changed element or rendered public page once. Do not run repeated structural exports unless the verification fails.
- On large Elementor pages, do not retry the same oversized request after memory/timeout/sanitation errors. Continue with smaller Elementor MCP element-level updates, paced slowly, or ask the user before any controlled maintenance/repair route.
- Keep one local structure/export snapshot per page or template for the active build and reuse its element map. Re-export only after a structural change or a failed verification.
- Batch low-risk text, icon, image and link changes by post. Isolate top-level backgrounds, templates and other high-risk changes so failures are easy to diagnose.
- Clear Elementor CSS/cache once after the affected batch, not after every widget update. Reload each public page once for final verification.
- Elementor background images may be lazy-loaded. Scroll the target section into the viewport before concluding that its computed background image is missing.
- Prefer one bounded DOM audit per page that checks contact targets, missing icons, required image dimensions, hero overlay and placeholder residue together. Use screenshots only where visual judgement is genuinely needed.

## Labelling Rule

When creating or modifying Elementor content, follow:

`elementor/SOPs/elementor-labelling-standard.md`

Use CSS IDs for unique top-level sections.

Use CSS classes for reusable field classification.

Update reference maps when labelling master template pages:

- `elementor/references/master-template-homepage-map.md`
- `elementor/references/master-template-naming-standard.md`

Do not add CSS IDs to every widget by default. IDs must remain unique per page.

## Safety

Read-only actions are allowed.

Ask before:
- Publishing live changes
- Deleting Elementor content
- Removing elements
- Updating global colors/typography on a production site when that change was not already requested
- Making large layout rewrites
- Using paid assets or paid plugin features
- Changing WHM, cPanel, firewall, WAF, ModSecurity, Imunify, CSF/LFD, IP whitelist, DNS, or server-level security settings

Development/staging test sites may be modified when the user clearly asks for testing.
