# SOP: Master Template Management

Use this SOP whenever Barry is asked to inspect, manage, edit, verify, document, clone, or discuss the agency master template.

## Authoritative Domain

Barry's only approved master-template domain is:

`https://template.mynewwebsite.co.za/`

WordPress Admin:

`https://template.mynewwebsite.co.za/wp-admin/`

Elementor MCP:

`https://template.mynewwebsite.co.za/wp-json/mcp/elementor-mcp-server`

The root domain `mynewwebsite.co.za` is released from the template role. Do not access, inspect, test, modify, log in to, clone from, document as current, or use it as a fallback for template work. It may only re-enter scope when the user explicitly names that exact root domain for a separate non-template task.

## Template Role

The template domain contains the completed HoneySucker-derived Elementor website that now serves as:

- the source of truth for future master-template development
- the populated source for new client and development-domain clones
- the reference implementation for page structure, responsive behaviour, reusable components, forms, global styles, navigation, SEO patterns, image slots and editor handoff

Keep the master populated. Do not neutralise, blank, retire, draft, replace, or convert its approved Elementor pages and templates merely to make cloning or later conversion easier.

## Access And Routing

- Use the approved WordPress administrator `barry`.
- Use the encrypted site-specific application-password record in `secrets/template-my-new-website-elementor-mcp.json`.
- Use Elementor MCP first for Elementor structure and content work.
- Use WordPress REST only for the permitted supporting operations defined in the Elementor operating standards.
- Use the `Barry - Codex` Chrome profile when browser work is required.
- Keep every request scoped to the template subdomain unless the user explicitly names another target.

## Editing Boundary

Before any master-template edit:

1. Read `always-read-elementor-rules.md` and `barry-elementor-operating-standards.md`.
2. Read `master-template-source-record.md` and the relevant page/template map.
3. Identify whether the requested change is page-local, reusable/global, structural, integration-related, or clone-governance related.
4. Confirm the existing Elementor owner of the change.
5. Use Elementor-native controls and small MCP batches with readback.

Routine approved page-local edits may proceed normally. Ask before:

- global colours, typography or Theme Style changes
- Header, Footer, Hero Form, global CTA or Theme Builder condition changes
- form destinations, notifications, storage or integrations
- navigation architecture or page hierarchy changes
- plugin, theme, WordPress core, tracking, code or hosting changes
- publishing a new template page or changing a template page's public/indexing status
- deleting, retiring or replacing pages, templates, kits, media or reusable components
- cloning from or overwriting the master

Do not rebuild template pages, inject CSS/HTML/JavaScript for ordinary design work, write raw full-page Elementor data as a shortcut, or switch pages out of Elementor.

## Verification And Recordkeeping

After meaningful template changes:

1. Read back the changed Elementor settings or structure.
2. Verify the rendered public result on the template subdomain.
3. Check desktop, tablet and mobile when layout or responsive behaviour changed.
4. Check affected reusable/global consumers when a global item changed.
5. Update `master-template-source-record.md` when page IDs, reusable template IDs, routes, active source components or known maintenance observations change.
6. Update the relevant page map when approved structure or labelled Elementor owners change.
7. Refresh Graphify after approved SOP, skill, reference-map or project-structure changes.
8. Commit and push approved governance changes without including credentials, Graphify temporary files, caches or unrelated client work.

## Clone Rule

The live template domain is the primary clone source. Follow `clone-master-template-to-target.md` for migration and destination safeguards.

A local `.wpress` archive is a recovery/fallback artifact only. Do not treat an old local archive as newer or more authoritative than the live template domain unless the user explicitly approves that version for a specific recovery or import.

