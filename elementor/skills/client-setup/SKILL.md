---
name: client-setup
description: Use this skill when setting up a new WordPress and Elementor client site for Barry, including WordPress login, plugin installation, master template import, permalink setup, client branding, logo/favicon setup, logo-based color palette, dummy hero content, and publishing the homepage for review.
---

# Client Setup

Use this skill for the first setup pass on a new client WordPress/Elementor website after the client workspace exists and the target domain has been confirmed.

## Inputs

Required:
- Client folder under `clients/`
- Client master data sheet
- Confirmed target domain name
- Build mode: development domain or direct client domain
- WordPress login URL found in Chrome bookmarks under `Internal Websites`
- Barry WordPress credentials approved by the user
- Client logo file
- Main service
- Company name

Expected Barry asset folder:
- Plugin files: `elementor/plugins`

Approved live master source:
- `https://template.mynewwebsite.co.za/`

Do not store passwords in this skill or in client files.

Barry WordPress sites are expected to have an admin user named `barry`.

Use the approved Barry WordPress credential from:

`secrets/barry-wordpress-admin.json`

## Preferred Tools

Use Elementor MCP for direct Elementor operations when configured and available.

Use Chrome for:
- WordPress login
- Plugin installation checks
- Template import steps
- Theme customizer or site settings
- Visual checks
- Final review confirmation

Only use the Chrome profile connected to `barendhendriks1996@gmail.com`.

## Autonomy

Barry may complete normal setup steps without stopping, including:
- Logging into WordPress with the approved Barry account
- Installing and activating approved free plugins
- Installing and activating provided plugin `.zip` files from `elementor/plugins`
- Verifying or completing an approved clone from `https://template.mynewwebsite.co.za/`
- Setting permalinks to Post Name
- Updating ordinary theme/site identity settings
- Uploading the client logo and favicon
- Applying a logo-based color palette
- Adding dummy homepage hero copy
- Publishing the homepage live for review when this exact setup task requests it

## Confirmation Required

Ask before:
- Buying anything
- Starting subscriptions
- Upgrading paid software, plugins, themes, templates, hosting, ads, or services
- Using paid templates, paid stock assets, or paid third-party tools
- Making major DNS, domain, hosting, email routing, nameserver, server, or package-level hosting changes
- Changing client contact details anywhere
- Changing form recipients, notification emails, form entries, form storage, or form integrations
- Deleting important live pages, posts, users, forms, orders, leads, analytics, backups, or client data
- Sending messages, submitting external forms, or making external account changes on behalf of the client

## Process

1. Read `AGENTS.md`.
2. Read this skill.
3. Read `elementor/SOPs/client-setup.md`.
4. Read `elementor/SOPs/navigation-hero-footer-rules.md`.
5. Read the requested client folder.
5. Read the client master data sheet.
6. Confirm required assets and source state:
   - client logo
   - target domain
   - verified clone of `https://template.mynewwebsite.co.za/`, or approval to run the clone workflow
7. Open the approved Chrome profile and go to the WordPress login URL/bookmark.
8. Look in the Chrome bookmark folder named `Internal Websites` for the specified client domain's WP Admin/login URL.
9. Log in with the approved Barry WordPress account.
10. Read and follow `elementor/SOPs/master-template-management.md` and `elementor/SOPs/clone-master-template-to-target.md`.
11. Verify the target's cloned page/template inventory against `elementor/references/master-template-source-record.md`.
12. Use the live template domain as the primary clone source.
13. Use a local `.wpress` archive only as an explicitly approved recovery/fallback source; report any incomplete or unverifiable clone before conversion work.
14. Set permalinks to `Post name` and save.
15. Update theme/site settings with the client company name only.
16. Upload the client logo.
17. Create or set a favicon from the logo.
18. Extract the usable logo colours:
    - most prominent usable logo colour = Primary
    - next most prominent usable logo colour = Secondary
    - if the logo has only one usable colour, Secondary must be a suitable variation or contrasting shade of Primary
    - Text must always be black: `#000000`
19. Fill the theme/global color settings using the derived palette and verify Elementor System Colors, not only Custom Colors.
20. Add a relevant dummy H1 and paragraph to the homepage hero based on the main service.
    - Replace the inherited prompt with one client-relevant phrase of no more than three words that remains on one line on mobile; use the same prompt site-wide with `Contact Us Now!` beneath it.
    - Use two-word trust signals for hero bubbles, not service names.
    - Follow the standard menu and footer rules in `navigation-hero-footer-rules.md`.
21. Publish the homepage live for this Client Setup workflow.
22. Run or report readiness against `elementor/SOPs/new-client-readiness-test.md`.
23. Notify the user that the site is ready for review or blocked by missing readiness items.

## Setup Boundary

Domain selection and base theme import are part of setup.

- The target domain must be confirmed before this skill starts.
- The approved live master clone is verified or completed through the clone SOP during this skill.
- Full page building starts only after the New Client Readiness Test passes.

## Output Report

Report:
- WordPress login success or blocker
- Plugins installed and activated
- Template import result
- Permalink status
- Company name applied
- Logo/favicon status
- Primary and secondary colors chosen
- Homepage hero H1 and paragraph used
- Homepage publish status
- Anything needing review or confirmation
