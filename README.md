# Barry

Barry is my marketing agency assistant workspace.

Open this folder as its own Codex project when working on agency tasks:

`C:\Users\USER\Documents\Codex\Barry`

Start each task by telling Barry which client and task you want handled.

Example:

`Barry, use Jack's Plumber client folder and update the homepage with a September blocked drains special. Draft only and ask before publishing.`

## Non-Negotiable Website SOP

Barry's only approved live master-template source is `https://template.mynewwebsite.co.za/`. The root domain `mynewwebsite.co.za` is released from the template role and must not be used as a template fallback. Master-template management follows `elementor/SOPs/master-template-management.md` and the verified inventory in `elementor/references/master-template-source-record.md`.

When the user says a new client has been created, a theme has been imported, or a master template is ready, the objective is to work inside the provided WordPress theme/template. Do not rebuild the website from scratch. Do not replace the theme structure with custom standalone HTML/CSS, a custom block build, or a new layout system.

For new client website work, Barry must:

- Preserve the imported theme, Elementor structure, header, footer, templates, global styles, forms, and design system unless the user explicitly asks for a rebuild.
- Edit and update existing pages, sections, widgets, menus, and templates in place.
- Keep client pages in Elementor/page-builder mode. Never build or replace a client page with WordPress block editor content.
- Use the site-specific Elementor MCP endpoint as the primary route for Elementor page/template content updates.
- Follow the proven Elementor MCP pattern: read structure, find the exact element, read settings, update the widget/container through MCP, read back, clear Elementor CSS/cache when needed, then verify the rendered page.
- Chunk Elementor MCP work into small, safe batches: page by page, section by section, usually 1-3 widgets per early batch and only larger low-risk batches after readback proves the page is stable.
- Replace old client copy with unique human-written content for the new client.
- Replace old client images with optimized `.webp` images and update image references inside the existing theme.
- Delete old unused media only after confirming it is no longer referenced by the active theme/pages/templates.
- Keep the provided theme's layout patterns and visual language.
- Ask before deactivating plugins, retiring templates, changing page builder mode, or changing the site architecture.

Forbidden unless the user explicitly asks for it:

- Rebuilding the site as custom HTML/CSS.
- Retiring the provided theme/header/footer/template system.
- Bypassing Elementor or the imported page builder structure.
- Building WordPress block editor pages for an Elementor theme/template client site.
- Using WordPress REST page-body/content updates as a fallback for Elementor content changes.
- Writing raw full-page `_elementor_data` as a shortcut when element-level MCP updates are available.
- Creating a custom website layout because the old template contains stale client content.
- Deactivating SEO, form, cache, or builder plugins as a workaround.

If stale template content is found, update it inside Elementor through MCP. If an MCP batch fails, split it into smaller targeted MCP element updates, send only the changed settings, re-read the target element, and continue with independent sections where safe. Stop only for real structural, permission, endpoint, malformed-data, critical-error, destructive-change, or approval-required blockers. Do not replace the website structure or take an indirect WordPress route.
