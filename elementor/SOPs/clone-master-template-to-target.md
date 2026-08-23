# SOP: Clone Master Template To Target

Use this SOP when Barry is asked to clone the approved master template to a new development or client domain.

Read `master-template-management.md` and `../references/master-template-source-record.md` before using this SOP.

## Approved Master Source

The approved master website is:

`https://template.mynewwebsite.co.za/`

It contains the complete approved page structures, Elementor templates, global elements, example content, image placements, navigation, Yoast setup patterns and design system.

The approved master is an Elementor master/template. New-client work after cloning must preserve and convert that Elementor structure in place. Do not use a cloned site as a starting point for block editor pages, custom standalone HTML/CSS, or a replacement layout system.

Development 1 is retained as the H2O Plumbers example site and is no longer the master clone source.

The user normally performs the clone and initial target-domain preparation manually. Barry begins once the user names the prepared domain and asks to test access.

Use `quick-domain-access-test.md` for that access check.

## Standard Future Command

When the user says:

`Barry, let's clone our template onto DEV3 and get ready for a new client intake.`

Barry or the user should use the approved master source:

`https://template.mynewwebsite.co.za/`

and clone it to the named target domain.

## Preferred Clone Tool

Primary: Migrate Guru.

Fallbacks:

- a current All-in-One WP Migration export/import created from the approved live template, with explicit confirmation that the archive is the intended source
- WP Migrate
- host-level clone only with explicit user approval

## Access Rules

- Barry WordPress username should remain `barry` across all sites.
- WordPress login credentials can be common across Barry-managed sites.
- WordPress Application Passwords must be treated as site/domain-specific.
- Do not assume a Development 1 application password will work on another domain.
- After each clone, create or verify a fresh Barry application password on the target domain.
- Store each target site's MCP endpoint and application-password secret in the correct site/client access notes.

## Migrate Guru Rules

- Confirm source and destination before starting the migration.
- Source is the site being copied from.
- Destination is the site being overwritten/prepared.
- Use Barry's Gmail address in the plugin if Migrate Guru asks for an email.
- Migrate Guru's normal flow requires the migration key from the destination site.
- If Barry cannot control Chrome or cannot log into the destination WordPress site yet, ask the user to open Migrate Guru on the destination and paste the destination migration key.
- Paste the destination key only into the source site's Migrate Guru flow.
- Do not start the final migration if the source/destination labels are unclear.
- Do not clean or neutralise client content during the clone step unless the user explicitly asks.

## Keep The Master Populated

Do not blank the master website before cloning.

The existing example content and imagery help preserve:

- complete page structure and spacing
- responsive behaviour
- widget configuration and styling
- content-length guidance
- image dimensions and placement rules
- Yoast and internal-linking examples

During a new client build, replace inherited content in place from the approved intake. Do not treat inherited example copy as acceptable final client content.

If inherited content is difficult to update, fix it inside Elementor or stop and ask. Do not blank, retire, draft or bypass the Elementor templates as a shortcut.

Before client approval, run an inherited-content residue check across pages, templates and global settings for the previous company name, logo, contact details, locations, services, images, alt text, metadata, schema, form recipients, maps links, reviews, analytics or tracking IDs and internal links.

## Readiness Check

Before cloning:

1. Confirm source public site loads.
2. Confirm source WP Admin loads.
3. Confirm source Barry access works.
4. Confirm Migrate Guru is installed and active on the source.
5. Confirm destination public site loads.
6. Confirm destination WP Admin loads.
7. Confirm Barry can log into destination WordPress.
8. Confirm Migrate Guru is installed and active on the destination.
9. Get or request the destination Migrate Guru migration key.
10. Confirm the target site can safely be overwritten or prepared for the clone.

## After Clone

1. Log into the destination as Barry.
2. Set permalinks to Post Name and save.
3. Clear Elementor CSS/cache.
4. Confirm Elementor, Elementor Pro, Yoast SEO, forms, header, footer, Home, Services, Service Areas, Blog, Service Page Template, Single Post template, and Archive template exist.
5. Create or verify the target domain Barry application password.
6. Confirm the target domain MCP endpoint.
7. Run `quick-domain-access-test.md`; use the full readiness test only when setup data or access is incomplete.
8. Stop before client branding/content work unless the user has supplied intake and requested the build.
