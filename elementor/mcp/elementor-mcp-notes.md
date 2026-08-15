# Elementor MCP Notes

Elementor MCP is the preferred technical route for Barry's repeatable Elementor work.

Use Elementor MCP so Barry can act through structured WordPress/Elementor tools instead of relying only on browser clicks.

## Current Test Site

Development 1:

`https://dev1.mynewwebsite.co.za`

Barry WordPress user:

`barry`

Application password name:

`Barry MCP`

Encrypted local secret:

`secrets/development-1-elementor-mcp.json`

Do not store the plain application password in normal notes or GitHub.

## Use Chrome First For

- WordPress login
- Plugin installation
- Migration import
- Permalink settings
- Visual review

## Use Elementor MCP Later For

- Reading Elementor page structure
- Updating sections/widgets directly
- Applying template and global style changes more reliably
- Creating repeatable page edits without manual browser clicking

## Setup Steps

1. Confirm Elementor and the Elementor MCP plugin are installed on Development 1.
2. Confirm the plugin settings page is visible in WordPress.
3. Confirm the MCP endpoint URL from the plugin settings page.
4. Test WordPress application-password authentication with the Barry user.
5. Add a project-scoped MCP config in `Barry/.codex/config.toml`.
6. Test the MCP server in Codex.
7. Create a dedicated Elementor MCP skill once the available tools are confirmed.

## Current Connection Status

Verified on 2026-06-13:

- WordPress REST authentication works for `barry`.
- Barry has administrator role on Development 1.
- Elementor is active.
- Elementor Pro is active.
- EMCP Tools is active.
- MCP endpoint responds successfully:

`https://dev1.mynewwebsite.co.za/wp-json/mcp/elementor-mcp-server`

- Server name: `MCP Tools for Elementor Server`
- Server version: `v2.2.0`
- Project MCP config created:

`Barry/.codex/config.toml`

The MCP config contains an authorization header and must not be committed to GitHub.

For the first Codex MCP test, only read-only Elementor tools are enabled.

## Fast Path For Future Runs

When working with Development 1, avoid repeating broad setup discovery.

Use:

- Endpoint: `https://dev1.mynewwebsite.co.za/wp-json/mcp/elementor-mcp-server`
- Secret: `secrets/development-1-elementor-mcp.json`
- First test tools:
  - `elementor-mcp-list-pages`
  - `elementor-mcp-get-global-settings`
  - `elementor-mcp-get-page-structure`

If Codex does not show the Elementor MCP tools directly, call the HTTP endpoint manually with the MCP initialize/session flow.

Do not list resources/templates first; this server is useful through tools.

## Setup Questions To Resolve

- Exact Elementor MCP plugin/package source
- WordPress permission level required
- Authentication method
- Whether one MCP connection is needed per client site
- Whether staging and live sites need separate connections
