# SOP: Add New Client

Use this SOP when the user says:

`Barry, let's create a new client called [client name]`

## Goal

Create the client workspace inside Barry, prepare the intake location, and stop before website setup or page building until the user confirms the intake and target domain.

## What This Command Does

This is a setup-start command, not a page-build command.

In Barry's workflow, a `new client` website means converting the approved imported Elementor master/template site in place after intake and domain confirmation. It does not mean building a blank site, WordPress block editor pages, custom HTML pages, or a replacement design system.

Barry should:

1. Create the client folder:
   - `clients/[client-name]/`
2. Create the standard client subfolders:
   - `assets/`
   - `assets/AI Images/`
   - `assets/AI Images/brand guide/`
   - `notes/`
   - `work/`
3. Add placeholder/status files:
   - `brief.md`
   - `setup-status.md`
   - `service-areas.md`
   - `assets/AI Images/image-plan.md`
   - `blog-plan.md`
   - `schema-plan.md`
4. Add or copy the blank New Client Intake Form when a Word template exists.
5. Check whether an intake form is already present in the client folder.
6. If no intake is present, ask the user to provide it by:
   - uploading it in chat, or
   - placing it inside the client folder.
7. Ask/confirm which domain will be used:
   - development domain, or
   - direct client domain.
8. Stop and wait for the intake and domain confirmation.

## What This Command Does Not Do Yet

Do not start the website build from this command alone.

Do not:

- clone/import the master template
- edit WordPress
- apply branding
- build Home/Services/Service Areas pages
- create WordPress block editor pages
- bypass Elementor or the imported master template
- generate AI images
- create service pages
- create blog posts

Those steps happen after intake and domain confirmation.

## Next Step

After the user confirms the intake and target domain, run:

1. `elementor/SOPs/client-setup.md`
2. `elementor/SOPs/new-client-readiness-test.md`
3. `elementor/SOPs/navigation-hero-footer-rules.md`
4. `content/SOPs/local-service-seo-copywriting.md`
5. Full build workflow if readiness passes:
   - Home Page
   - Services Hub Page
   - Service Areas Hub Page
   - All primary and additional Service Pages, duplicated from the approved Service Page Template
   - Blog Page, Single Post Template, Post Archive Template, and three real starter posts

## Notes

- The client folder is the source location for logo, intake, notes, client images, AI image brand guide examples, and future service-area planning.
- If the user gives only a client name, create the folder and ask for the intake/domain details.
- If the user gives the client name plus intake and domain in the same message, create the folder, save/extract the supplied data, then continue into setup after confirming the target domain.
- A standard full build preserves the approved master template structure and replaces its inherited branding, content, images, contact data, links and SEO.
