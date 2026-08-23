# SOP: Client Setup

Use this SOP to run the first WordPress and Elementor setup pass for a new client after the client workspace exists and the target domain has been confirmed.

## Goal

Prepare a new client WordPress site after cloning the approved live master template, then apply basic client branding, add dummy homepage hero content, and publish the homepage for review.

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
- Confirmed clone of `https://template.mynewwebsite.co.za/`, or explicit approval to perform that clone
- Approved migration tool/access for the selected clone method

## Required Folders

Plugin files:

`elementor/plugins`

Client files:

`clients/[client-name]`

## Steps

1. Read Barry's `AGENTS.md`.
2. Read `elementor/skills/client-setup/SKILL.md`.
3. Read `elementor/SOPs/navigation-hero-footer-rules.md`.
4. Read the relevant client folder.
5. Read the client master data sheet.
5. Check that the client logo exists.
6. Read `elementor/SOPs/master-template-management.md` and `elementor/SOPs/clone-master-template-to-target.md`.
7. Confirm the target was cloned from `https://template.mynewwebsite.co.za/`, or complete the approved clone workflow before client conversion.
8. Open the approved Barry Chrome profile.
9. Open Chrome bookmarks.
10. Go to the bookmark folder named `Internal Websites`.
11. Find the WP Admin/login bookmark for the specified client domain.
12. Log into WordPress using the approved Barry WordPress account.
13. Verify the cloned template inventory against `elementor/references/master-template-source-record.md`.
14. Install or activate migration tooling only when the approved clone workflow requires it; plugin changes remain subject to the normal approval boundary.
15. Use a local `.wpress` archive only as an explicitly approved recovery/fallback source, never as the default master when the live template is available.
16. If the clone is incomplete or the source cannot be verified, stop before branding/content work and report the blocker.
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
- Base theme/template cloning happens before or during this SOP through `clone-master-template-to-target.md`.
- Full page building starts only after the readiness test passes.

Do not store WordPress passwords in this SOP or client folders.
