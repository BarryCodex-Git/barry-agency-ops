# SOP: New Client Readiness Test

Use this SOP after client setup and before page building.

## Goal

Confirm Barry has everything needed to safely build the Home Page, Services Hub, Service Areas Hub, every primary and additional Service Page, and Blog infrastructure.

## Readiness Checks

### Client Workspace

- Client folder exists.
- Intake form exists or intake data has been pasted into the client notes.
- `brief.md` or equivalent client summary is populated.
- `setup-status.md` exists and is current.

### Domain And Site

- Target domain is confirmed.
- Build mode is confirmed:
  - development domain, or
  - direct client domain.
- WordPress admin access works for the approved Barry user.
- Elementor is active.
- Elementor Pro is active if required by the template.
- Yoast SEO is active.
- Elementor MCP is available where possible.
- Domain scope is clear and limited to the selected site.

### Base Template

- The populated master from `https://mynewwebsite.co.za/` has been cloned to the target domain.
- Permalinks are set to Post Name.
- Home page, Services page, Service Areas page, Service Page Template source page, Blog page, Single Post template, and Post Archive template are available or ready to create.
- The Home, Services, Service Areas and Blog records are Elementor pages, not WordPress block editor replacement pages.
- The Service Page Template source is an Elementor template/page that can be duplicated for service pages.
- Creating missing client pages means duplicating an approved Elementor template source, not creating blank/block-editor pages.
- Header, footer, global CTA, form and blog templates are published/active unless the user explicitly approved a template change.
- Current master references are known:
  - Home page: `2747`
  - Services hub: `6217`
  - Service Areas hub: `6414`
  - Service Page Template draft: `6573`
  - Blog page: `6425`
  - Single Post template: `6432`
  - Post Archive template: `6434`
  - Global Contact CTA Buttons reusable template: `6575`
- A rollback/export point exists before major content work.
- The inherited example content will be replaced in place, not blanked before the build.

### Brand And Assets

- Logo is present or missing logo has been flagged.
- Primary, secondary and text colours are confirmed or extracted from logo.
- Elementor Global Colors System Colors are ready to update:
  - Primary from logo
  - Secondary from logo or primary variation
  - Text black `#000000`
- Client image folders have been inspected.
- `assets/AI Images/` has been inspected.
- `assets/AI Images/brand guide/` has been inspected if present.
- `brand-image-rules.md` has been read if present.

### Content And SEO

- Company name is confirmed.
- Main service category is confirmed.
- Five primary Home Page services are confirmed.
- Additional Services for Services Hub are confirmed.
- Primary service area regions are confirmed.
- Barry is ready to research 8-12 sub-locations per service area region if suburbs are not supplied.
- Phone, email and WhatsApp are confirmed on separate line items.
- Phone and WhatsApp are ready to apply to the reusable Contact CTA buttons source.
- Primary CTA and secondary CTA are confirmed.
- Primary SEO keyword and secondary SEO keywords are confirmed or ready for Barry to propose.
- Schema facts are recorded or explicitly marked `N/A`: truthful business type, public-address status, service-area status, phone, email, opening hours, official logo, Google Business Profile, verified social profiles, real branch locations and approved review sources.
- Missing schema facts that would create false business, licence, location, review or profile claims are identified before the build; unsupported properties will be omitted rather than guessed.
- Blog setup is confirmed or not required.
- Three starter blog post topics are supplied or Barry is approved to propose and create them from the intake.
- Blog categories are supplied or Barry is approved to create sensible defaults from the client services and locations.

### Inherited Content Replacement

Barry must replace and verify all inherited master-site values before client approval:

- company name, logo, favicon and global colours
- phone, email, WhatsApp, form recipients and CTA links
- services, locations, FAQs, testimonials and local proof
- page copy, blog content, menus, footer and maps links
- images, filenames, alt text and media metadata
- Yoast titles, descriptions, focus keyphrases and schema/site representation
- internal and external links
- analytics, Tag Manager and other tracking identifiers where applicable

Search for the previous example company name and contact details across the rendered site and stored Elementor/WordPress content before marking the build complete.

Barry must not pass readiness if the target site is missing the imported Elementor master/template and would require a blank rebuild. In that case, stop and ask for a template import or explicit repair instruction.

## Pass / Block Rules

Readiness passes when:

- Domain is confirmed.
- Base template is imported or the target site already has the approved template.
- WordPress, Elementor, Yoast and MCP access are usable.
- Intake contains enough information to build the first pages.
- Intake contains enough information to create three useful starter posts, or the user has approved Barry's proposed topics.
- Logo and key contact data are confirmed or explicitly marked pending.

Readiness is blocked when:

- No target domain is confirmed.
- WordPress access is missing.
- Base template import is not complete.
- Imported Elementor pages/templates are missing or have been replaced with block editor pages.
- Required intake data is missing and cannot be inferred safely.
- Logo/contact details are missing and the user has not approved placeholders.

## Output

Report:

- Ready / Not Ready
- Target domain
- Build mode
- Missing items
- Next build steps
- Any risks or approval items
