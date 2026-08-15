# Incident: Development 1 Home Page Break

Date: 2026-06-14

Site: Development 1  
URL: https://dev1.mynewwebsite.co.za/  
Page: Home, post ID 2747

Later clarification:

- The server was still working.
- The likely issue was a server/firewall IP block triggered during automated work.
- The broad WHM/shared-server failure assumption was an overreaction and should not be kept as a standing rule.

## What Happened

The first H2O Plumbers Home page build completed and passed a public Chrome check.

The break happened during the later feedback-fix pass, after broad Elementor MCP updates were applied to:

- Home page content
- top-level hero container styling
- global colours
- header logo sizing
- footer map/service-area HTML
- several image widgets

After that pass, the public site became unreachable from Codex, and Chrome navigation timed out.

## Most Likely Breaking Change

The highest-risk change was made to the top-level Home Hero container:

- Elementor element ID: `8c893f2`
- Section: `home-hero`
- Change type: complex background-mode/style update

The update changed the hero background from the existing video/slideshow-style setup to a classic image-background setup, while also writing several related background/video/overlay/slideshow fields in the same batch.

This mixed incompatible Elementor background modes on a complex top-level container and should not have been done without first exporting the page JSON and testing the single element change in isolation.

## Access / Firewall Lesson

The unreachable-site symptom was most likely caused by a server/firewall IP block, not a destroyed WHM server.

Automated WordPress/Elementor work can still trigger temporary blocks when it combines:

- authenticated MCP/REST requests
- repeated page reads/writes
- media uploads
- public page reloads through Chrome
- failed or repeated verification attempts

Future workflows should pace requests, keep them scoped to the approved domain, and consider local/server IP whitelisting for repeated authenticated automation.

## Why This Was My Error

I made too many high-risk visual/system changes in one batch:

- top-level container background mode
- global colour palette
- hard-coded colours
- images
- footer HTML
- header sizing

Because those changes were batched together, the exact rollback point was not cleanly isolated. The top-level hero background update should have been treated as a structural change, not a normal content edit.

## Immediate Recovery Plan When WordPress Is Reachable

1. Restore or simplify the `home-hero` container first.
2. Remove mixed background/video/slideshow settings from `8c893f2`.
3. Set the hero to a safe static background colour or the previous known-safe background mode.
4. Regenerate Elementor CSS/files.
5. Check `/wp-admin/` and the public Home page.
6. Only after the page opens, re-apply content-level fixes one small group at a time.

## New Prevention Rules

- Always export Elementor page JSON before modifying top-level containers, backgrounds, videos, maps, global colours, headers, or footers.
- Do not batch structural/style changes with content copy updates.
- Do not change Elementor background mode on top-level sections unless the page export backup is confirmed.
- Do not write blank media/video fields into existing Elementor containers.
- For image feedback fixes, prefer updating image widgets over changing section backgrounds.
- Verify after each risky element update, not after a large batch.
- Keep a rollback payload/plan before applying any high-risk update.
- Keep automation scoped to the exact approved domain.
- Do not inspect or test adjacent domains on the same server unless requested.
- Pace authenticated MCP/REST/browser/media workflows.
- If requests begin timing out, stop and check for firewall/IP blocking before assuming page corruption or server failure.
- Discuss whitelisting the user's local IP or required automation IPs for repeated work.
