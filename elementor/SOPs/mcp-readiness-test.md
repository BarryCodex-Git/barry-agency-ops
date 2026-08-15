# SOP: MCP Readiness Test

Use this SOP after WordPress access and theme setup are complete.

## Goal

Confirm Barry can safely inspect and work with a WordPress/Elementor site through Elementor MCP.

## Required Inputs

- Website entry
- WordPress admin access for Barry
- Elementor active
- Elementor Pro active if the theme requires it
- EMCP Tools active
- Barry application password stored in `secrets/`
- MCP endpoint URL

## Process

Use the full readiness process only when:

- setting up MCP on a new website
- the target website/domain is unknown
- credentials or endpoint records are missing
- the user reports access is broken
- a previous MCP/REST request failed in a way that suggests auth, plugin, firewall, or endpoint trouble
- Elementor, EMCP Tools, WordPress, hosting security, or the domain has recently changed

For ordinary work on a known site that already passed readiness, use the lean working access process instead:

1. Use the saved site record, endpoint, and approved Barry credential.
2. Run one targeted Elementor MCP read for the exact page/template/setting needed.
3. Use the proven Elementor MCP route: page structure, find element, get element settings, update element/container, read back, then public verify.
4. Batch related changes where possible only after the first small MCP update on that page/template reads back correctly.
5. Verify only the changed area once.
6. If verification fails, diagnose the failed layer only instead of repeating the full checklist.

Do not run the full readiness test before every normal Elementor edit.

When the user only says `test access`, do not use the full process below. Use `quick-domain-access-test.md`.

## Save Method Preflight

Before any build, redesign, cleanup, section removal, final review fix batch, or broad Elementor update, Barry must test the exact save method that will be used for the work.

This is not optional. Read-only MCP access is not enough.

Run the smallest safe preflight that matches the planned operation:

- For global colour or typography work: read global settings, update one intended global token, then read it back.
- For a widget text/link edit: update one low-risk target widget, then read the widget settings back and check the public page still returns HTTP 200.
- For a container/style edit: update one low-risk target container setting, then read it back and check the public page still returns HTTP 200.
- For section removal: test `elementor-mcp-remove-element` on a disposable draft page or duplicated draft section first. Do not test destructive section removal on a live production section.
- For page import/full-page replacement: test on a disposable draft page first. Do not use this method on client pages until it has passed on the same site.
WordPress REST is not an Elementor content-editing route. Use it for authentication checks, media uploads/metadata, menus, Yoast fields, cache endpoints, and ordinary non-Elementor metadata only.

Do not use REST `content.raw`, block editor content, or page-body updates to change visible Elementor page content. Do not use raw `_elementor_data` writes as a normal fallback.

Raw Elementor data maintenance is allowed only as a controlled repair after user approval, with a current export/rollback point and a proven disposable-draft test on the same site.

Pass criteria for the exact save method:

- The tool returns success or a known safe response.
- The changed setting can be read back.
- The affected public/draft preview URL does not show a WordPress critical error.
- The page still returns HTTP 200.

If the exact save method fails once:

- Stop using that method immediately.
- Do not retry the same large request.
- Diagnose the failed layer only.
- Switch to a smaller Elementor MCP element-level method.
- Send only the changed setting keys where the tool supports it.
- Continue independent Elementor sections where safe if one widget/section is isolated as problematic.
- Ask the user only when targeted MCP updates fail or the next step requires structural repair, browser/manual edits, raw data maintenance, plugin/template changes, or re-import.

Known Elementor warning:

- Some cloned/legacy Elementor pages can contain malformed or `null` settings. These may allow read access and small updates but reject section deletion, import, or full-page saves with `Controls_Stack::sanitize_settings(): Argument #1 ($settings) must be of type array, null given`.
- When this appears, do not keep retrying MCP remove/import/full-page update and do not switch to WordPress block/content replacement. Use small verified element updates only, or stop and ask before repairing malformed Elementor data through a controlled maintenance step.

1. Read the website folder.
2. Confirm the site has a Barry application password stored securely.
3. Confirm WordPress REST authentication works.
4. Confirm Elementor plugin is active.
5. Confirm Elementor Pro is active if required.
6. Confirm EMCP Tools plugin is active.
7. Confirm MCP endpoint responds.
8. Initialize MCP session.
9. Run `elementor-mcp-list-pages`.
10. Run `elementor-mcp-get-global-settings`.
11. Optionally run `elementor-mcp-get-page-structure` on a known Elementor page.
12. Run the Save Method Preflight for the planned work.
13. Update website status.

## Pass Criteria

MCP readiness passes only when:
- REST authentication works
- Barry user has required permissions
- Elementor is active
- EMCP Tools is active
- MCP initialize succeeds
- Page list can be read
- Global settings can be read
- The exact planned save method has passed, when the task includes edits

## Output

Report:
- MCP readiness: passed/blocked
- Endpoint
- Auth status
- Elementor status
- Pages read status
- Global settings read status
- Save method tested
- Save method status: passed/blocked
- Next step
