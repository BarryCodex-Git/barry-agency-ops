---
name: client-setup
description: Use this skill when setting up a new WordPress and Elementor client site for Barry by verifying the approved master clone, applying the logo-based global palette first, replacing only approved client-facing fields, and preparing the site for the template conversion pipeline.
---

# Client Setup

Use this skill for the first setup pass on a new client WordPress/Elementor website after the client workspace exists and the target domain has been confirmed.

This skill must enter `elementor/SOPs/template-content-replacement-guardrails.md`. Barry defaults to template content publishing and performs design/structural changes only when the user explicitly requests or approves the named change.

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
- Applying the logo-based global colour palette as the first client-site mutation after clone verification/preflight
- Replacing approved existing hero text fields with real client-facing draft copy
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
2. Query Graphify for the latest new-client conversion, Elementor, copy, image and SEO rules.
3. Directly read `elementor/SOPs/template-content-replacement-guardrails.md` and the authoritative SOPs returned by Graphify.
4. Read this skill.
5. Read `elementor/SOPs/client-setup.md`.
6. Read `elementor/SOPs/navigation-hero-footer-rules.md`.
7. Read the requested client folder and client master data sheet.
8. Confirm required assets and source state:
   - client logo
   - target domain
   - verified clone of `https://template.mynewwebsite.co.za/`, or approval to run the clone workflow
9. Open the approved Chrome profile and go to the WordPress login URL/bookmark.
10. Look in the Chrome bookmark folder named `Internal Websites` for the specified client domain's WP Admin/login URL.
11. Log in with the approved Barry WordPress account.
12. Read and follow `elementor/SOPs/master-template-management.md` and `elementor/SOPs/clone-master-template-to-target.md`.
13. Verify the target's cloned page/template inventory against `elementor/references/master-template-source-record.md`.
14. Use the live template domain as the primary clone source.
15. Use a local `.wpress` archive only as an explicitly approved recovery/fallback source; report any incomplete or unverifiable clone before conversion work.
16. Record the clean cloned baseline and prove one small save/readback route.
17. Extract the usable logo colours:
    - most prominent usable logo colour = Primary
    - Secondary = a lighter, darker, muted or richer tonal variation of Primary in the same colour family
    - Accent/Highlight = another distinguishable lighter or darker shade of Primary in the same colour family
    - Text must always be black: `#000000`
    - never introduce an unrelated or complementary colour unless the user explicitly supplies it as a palette override
18. Make the targeted global-colour update the first client-site mutation using the non-browser Global Palette Fast Path in `elementor/skills/elementor-mcp-assistant/SKILL.md`; preserve the complete Elementor Kit and read back all four System Colors.
19. Set permalinks to `Post name` and save.
20. Update site identity with the company name, logo and favicon.
21. Replace only the existing hero H1 and paragraph fields with concise, real client-facing draft copy based on the main service.
    - Use two-word trust signals for hero bubbles, not service names.
    - Follow the standard menu and footer rules in `navigation-hero-footer-rules.md`.
22. Publish the homepage only when this exact setup task requests publication.
23. Run or report readiness against `elementor/SOPs/new-client-readiness-test.md`.
24. Notify the user that the site is ready for conversion or blocked by missing readiness items.

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
