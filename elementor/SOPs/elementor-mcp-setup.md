# SOP: Elementor MCP Setup

Use this SOP when connecting Barry to a WordPress/Elementor site through Elementor MCP.

## Goal

Give Barry structured tool access to a WordPress/Elementor website so he can inspect and update pages more reliably than browser-only clicking.

## Required Inputs

- Website entry in `website-directory.md`
- WordPress admin access for Barry
- Elementor installed
- Elementor MCP plugin installed and active
- WordPress application password for Barry
- MCP endpoint URL from the plugin settings page

## Process

### Fast Path: Development 1

Use this fast path when the user asks to test or use Elementor MCP on `Development 1`, `dev 1`, or `dev1.mynewwebsite.co.za`.

Do not repeat broad discovery first.

Known endpoint:

`https://dev1.mynewwebsite.co.za/wp-json/mcp/elementor-mcp-server`

Known secret:

`secrets/development-1-elementor-mcp.json`

Known status:

- WordPress REST auth works.
- Barry user is administrator.
- Elementor is active.
- Elementor Pro is active.
- EMCP Tools v2.2.0 is active.
- MCP initialize works.

First read-only test tools:

- `elementor-mcp-list-pages`
- `elementor-mcp-get-global-settings`
- `elementor-mcp-get-page-structure`

If Codex does not expose the Elementor MCP tools directly, use the known HTTP MCP endpoint and perform the MCP handshake directly:

1. Send `initialize`.
2. Store the returned `Mcp-Session-Id`.
3. Call only the needed read-only tool.
4. Do not list every tool unless the task specifically requires tool discovery.

### Domain Scope

- Connect MCP only to the exact domain or development site approved for the current task.
- Do not inspect, crawl, test, log in to, or make requests against other domains on the same shared server unless the user explicitly asks for that site.
- Keep WordPress REST checks, Elementor MCP calls, Chrome verification, and media uploads scoped to the approved domain and known endpoint.
- If a task needs WHM, cPanel, DNS, firewall, WAF, ModSecurity, Imunify, CSF/LFD, or IP whitelist work, ask before taking action.

### IP Whitelist Guidance

- Whitelist only the specific public IP that is making the approved WordPress, MCP, REST, or Chrome requests.
- For Codex desktop work, this is usually Barry's current local public IP because the requests are made from the local machine/session.
- Do not disable the firewall, WAF, ModSecurity, Imunify, CSF/LFD, or rate limiting globally to solve an automation block.
- If a whitelist is needed, prefer a narrow allow rule for the approved domain, WordPress admin, REST API, MCP endpoint, or Barry admin user where the hosting stack supports it.
- Treat cloud/browser-search IPs as unstable unless the provider gives a fixed egress IP; do not depend on broad cloud allowlisting for admin work.
- Keep request pacing in place even when an IP is whitelisted.

### New Site Setup Path

1. Read `AGENTS.md`.
2. Read `chrome-setup.md`.
3. Read the website/client folder.
4. Confirm WordPress dashboard access.
5. Open the Elementor MCP plugin settings page.
6. Record the MCP endpoint URL.
7. Store the WordPress application password in `secrets/` as an encrypted local secret.
8. Test WordPress REST authentication.
9. Create or update project MCP config.
10. Restart or refresh Codex if needed so the MCP server loads.
11. Test one safe MCP action:
    - list tools
    - list pages
    - read homepage structure
12. Do not make content/layout changes until the read-only tests pass.

## Credit-Saving Rules

- Do not list MCP resources/templates when the task is Elementor MCP tool use; this server exposes tools, not resources.
- Do not search all local files when `website-directory.md` already identifies the site.
- Do not list the full Elementor MCP tool catalog unless the user asks for available tools.
- Prefer one targeted read-only call over broad exploration.
- For Development 1, use the known endpoint and known secret immediately.
- For repeated MCP calls in the same task, reuse the active MCP session ID where possible.
- Summarize results instead of dumping large JSON responses unless debugging is needed.
- Pace repeated MCP, REST, media-upload, and browser reload actions in small groups to reduce the chance of triggering server security rules.
- If access appears blocked or rate-limited, pause and check whether a firewall, WAF, ModSecurity, CSF/LFD, Imunify, or hosting IP block is involved before retrying.

## Confirmation Stops

Ask before:
- Adding MCP access to a live client site
- Changing plugin settings that expose public access
- Publishing layout or content changes
- Using paid MCP/plugin features
- Changing WordPress users, roles, or security settings
- Changing WHM, cPanel, firewall, WAF, ModSecurity, Imunify, CSF/LFD, IP whitelist, DNS, or server-level security settings

## Output

Report:
- Site connected or blocked
- MCP endpoint
- Authentication status
- Available Elementor MCP tools, if visible
- First successful read-only test
