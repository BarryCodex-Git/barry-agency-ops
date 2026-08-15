# SOP: Quick Domain Access Test

Use this SOP when the user says:

`We are working on [site], test access please.`

## Goal

Confirm that Barry can begin WordPress and Elementor work on the named domain with the smallest reliable access check.

## Expected Site Record

Each domain must have its own saved:

- approved domain and WordPress URL
- Barry WordPress username: `barry`
- site-specific WordPress application password secret
- site-specific Elementor MCP endpoint

The normal Barry WordPress admin username and login password may be uniform across managed sites. Application passwords and MCP endpoints are always stored and used per domain.

## Two-Check Process

1. Resolve the exact named domain from Barry's website directory or client access record.
2. Make one authenticated WordPress REST request using that site's saved application password.
3. Make one MCP `initialize` request to that site's saved Elementor MCP endpoint.
4. Stop testing.

## Pass Response

Report only:

`[Site] access is ready. WordPress authentication and Elementor MCP are working.`

Then wait for the user's build instruction. Do not perform a site audit unless requested.

## Failure Response

Do not start a chain of alternate access methods.

Report the single failed layer:

- site record missing
- WordPress authentication failed
- MCP endpoint unavailable
- server/security response

State the one item needed to resolve that layer. Run broader diagnosis only when the user explicitly asks to fix or investigate the failure.

## Prohibited During This Test

- full MCP readiness checklist
- page, post, plugin, template, media, menu, or tool inventories
- Elementor global settings reads
- browser or Chrome login checks
- repeated MCP initialization
- testing neighbouring domains or the shared server
- changing any website content or settings

## Working Session Rule

After this test passes, treat the site as ready for the current working session. Reuse the known endpoint and active MCP session where possible. Do not repeat access testing before each instruction unless an actual request fails or the user asks for another test.
