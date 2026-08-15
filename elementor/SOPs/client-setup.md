# SOP: Client Setup

Use this SOP to run the first WordPress and Elementor setup pass for a new client after the client workspace exists and the target domain has been confirmed.

## Goal

Prepare a new client WordPress site by logging in, installing required migration tools, importing the clean master template, applying basic client branding, adding dummy homepage hero content, and publishing the homepage for review.

This is the site setup/import phase. It follows `new-client-add.md` and comes before `new-client-readiness-test.md`.

## Required Inputs

- Client name
- Client folder path
- Confirmed target domain name
- Build mode: development domain or direct client domain
- WordPress login URL or bookmark inside Chrome bookmark folder `Internal Websites`
- Company name
- Main service
- Client logo
- Client master data sheet
- Provided All-in-One WP Migration plugin file
- Clean master template import file

## Required Folders

Plugin files:

`elementor/plugins`

Master template files:

`elementor/templates` or `elementor/templates/master-theme`

Client files:

`clients/[client-name]`

## Steps

1. Read Barry's `AGENTS.md`.
2. Read `elementor/skills/client-setup/SKILL.md`.
3. Read `elementor/SOPs/navigation-hero-footer-rules.md`.
4. Read the relevant client folder.
5. Read the client master data sheet.
5. Check that the client logo exists.
6. Check that the provided All-in-One WP Migration plugin exists in `elementor/plugins`.
7. Check that the master template import file exists in `elementor/templates` or `elementor/templates/master-theme`.
8. Open the approved Barry Chrome profile.
9. Open Chrome bookmarks.
10. Go to the bookmark folder named `Internal Websites`.
11. Find the WP Admin/login bookmark for the specified client domain.
12. Log into WordPress using the approved Barry WordPress account.
13. Install and activate the provided All-in-One WP Migration plugin.
14. Install and activate WP Migrate from the WordPress plugin library as a future fallback.
15. Import the clean master template/theme `.wpress` file using All-in-One WP Migration.
16. If All-in-One WP Migration is blocked or takes too long, report the blocker and use WP Migrate as the planned fallback path if available.
17. Go to Settings > Permalinks.
18. Select Post Name.
19. Save permalink settings.
20. Update the theme/site settings with the client company name only.
21. Upload the logo.
22. Create or set a favicon from the logo.
23. Extract the usable logo colours.
24. Set theme/global color settings using:
    - Primary: most prominent usable logo colour
    - Secondary: next most prominent usable logo colour, or a suitable variation/contrasting shade of Primary when the logo has only one usable colour
    - Text: always black, `#000000`
25. Verify Elementor Site Settings > Global Colors > System Colors, not only Custom Colors.
26. Populate the remaining theme custom colors with suitable palette variations.
27. Add a dummy homepage hero H1 related to the main service.
28. Add a dummy homepage hero paragraph related to the main service.
29. Replace the inherited hero-form prompt with a client-relevant phrase of no more than three words that remains on one line on mobile (for example, `Need Solar Help?`). Keep the same prompt on every page unless the user approves a page-specific variation. The supporting line may remain `Contact Us Now!`.
30. Use two-word trust signals for hero bubbles, not service names.
31. Prepare the standard menu and footer rules for the build:
    - menu order: `Services`, `Service Areas`, `Process`, `About Us`, `Reviews`, `FAQ's`
    - footer Service Areas uses only primary service area regions
    - footer Google Maps/GBP uses the exact intake link when supplied
32. Publish the homepage live.
33. Notify the user that the homepage is ready for review.
34. Run `elementor/SOPs/new-client-readiness-test.md` before starting the full page build.

## Confirmation Stops

Stop and ask before:
- Any purchase, subscription, paid upgrade, or paid template/asset/tool use
- Major DNS, hosting, domain, nameserver, email routing, or package-level hosting changes
- Client contact detail changes
- Form recipient, notification, entry, storage, or integration changes
- Deleting important live data

## Notes

Do not update actual page content beyond the company name, logo, favicon, colors, and dummy homepage hero unless the task specifically says to continue.

Domain selection and base theme import are part of setup.

- Domain selection is confirmed before this SOP starts.
- Base theme/template import happens during this SOP.
- Full page building starts only after the readiness test passes.

Do not store WordPress passwords in this SOP or client folders.
