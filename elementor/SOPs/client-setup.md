# SOP: Client Setup

Use this SOP to run the first WordPress and Elementor setup pass for a new client after the client workspace exists and the target domain has been confirmed.

## Goal

Prepare a new client WordPress site after cloning the approved live master template. Apply the logo-based global palette first, then replace only the approved client-facing setup fields. Do not redesign or restyle the template.

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
2. Query Graphify for the latest new-client conversion, Elementor, copy, image and SEO rules.
3. Directly read `elementor/SOPs/template-content-replacement-guardrails.md` and every authoritative SOP routed for this setup.
4. Read `elementor/skills/client-setup/SKILL.md`.
5. Read `elementor/SOPs/navigation-hero-footer-rules.md`.
6. Read the relevant client folder and client master data sheet.
7. Check that the client logo exists.
8. Read `elementor/SOPs/master-template-management.md` and `elementor/SOPs/clone-master-template-to-target.md`.
9. Confirm the target was cloned from `https://template.mynewwebsite.co.za/`, or complete the approved clone workflow before client conversion.
10. Open the approved Barry Chrome profile.
11. Open Chrome bookmarks.
12. Go to the bookmark folder named `Internal Websites`.
13. Find the WP Admin/login bookmark for the specified client domain.
14. Log into WordPress using the approved Barry WordPress account.
15. Verify the cloned template inventory against `elementor/references/master-template-source-record.md`.
16. Install or activate migration tooling only when the approved clone workflow requires it; plugin changes remain subject to the normal approval boundary.
17. Use a local `.wpress` archive only as an explicitly approved recovery/fallback source, never as the default master when the live template is available.
18. If the clone is incomplete or the source cannot be verified, stop before branding/content work and report the blocker.
19. Record a clean baseline of the cloned template and prove a small save/readback route.
20. Extract the usable logo colours.
21. As the first client-site mutation, merge only the intended theme/global colour values while preserving the complete Elementor Kit:
    - Primary: most prominent usable logo colour
    - Secondary: next most prominent usable logo colour, or a suitable variation/contrasting shade of Primary when the logo has only one usable colour
    - Text: always black, `#000000`
22. Read back and verify Elementor Site Settings > Global Colors > System Colors, not only Custom Colors.
23. Go to Settings > Permalinks, select Post Name and save.
24. Update site identity with the client company name, logo and favicon.
25. Replace only the existing homepage hero H1 and paragraph fields with concise, real client-facing draft copy related to the main service.
26. Leave the protected hero form untouched unless the user explicitly authorizes a separate global form change.
27. Use two-word trust signals for hero bubbles, not service names.
28. Prepare the standard menu and footer rules for the build:
    - menu order: `Services`, `Service Areas`, `Process`, `About Us`, `Reviews`, `FAQ's`
    - footer Service Areas uses only primary service area regions
    - footer Google Maps/GBP uses the exact intake link when supplied
29. Publish the homepage only when the exact setup request authorizes publication.
30. Notify the user that the site is ready for conversion or blocked.
31. Run `elementor/SOPs/new-client-readiness-test.md` before starting the full page conversion.

## Confirmation Stops

Stop and ask before:
- Any purchase, subscription, paid upgrade, or paid template/asset/tool use
- Major DNS, hosting, domain, nameserver, email routing, or package-level hosting changes
- Client contact detail changes
- Form recipient, notification, entry, storage, or integration changes
- Deleting important live data

## Notes

Do not update page content beyond the approved site identity, global colours and existing hero text fields unless the task specifically says to continue. Every edit remains subject to the replacement guardrails.

Domain selection and base theme import are part of setup.

- Domain selection is confirmed before this SOP starts.
- Base theme/template cloning happens before or during this SOP through `clone-master-template-to-target.md`.
- Full page building starts only after the readiness test passes.

Do not store WordPress passwords in this SOP or client folders.
