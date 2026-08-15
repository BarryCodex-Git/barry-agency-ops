# Website Setup Status

Website: Development 1

Status date: 2026-06-14

## Access

WP admin login: confirmed

Barry user: exists

Dashboard access: confirmed

Chrome bookmarks: created

## WordPress

Plugins access: confirmed

Elementor access: confirmed

Elementor MCP plugin: installed

Elementor MCP application password: created

Elementor MCP endpoint: verified

Codex MCP config: created in read-only mode

Theme/template: n/a

Permalinks: not checked

## Pipeline

Website added: complete

Browser bookmarks created: complete

WordPress access confirmed: passed

Theme setup mode: not selected

Master source site: not selected

Theme setup status: not-started

MCP readiness status: passed

Client data status: complete for H2O Plumbers homepage intake

Branding status: applied from H2O Plumbers logo colours

Content status: Home page content applied

Yoast SEO status: applied to Home page

Images status: stock images uploaded and applied

Homepage build status: applied

QA status: Chrome visual review passed

Approval status: not-started

## Branding

Logo: H2O Plumbers logo inspected from `clients/H2O Plumbers/H2O Plumbers Logo.png`

Favicon: n/a

Colors: primary #1060B0, secondary #6090C0, white #FFFFFF, text #1F2933

Company name: H2O Plumbers

## Content

Homepage: H2O Plumbers content applied on Development 1 Home page

Hero section: updated for reliable plumbers in the Garden Route

SEO basics: focus keyphrase `plumber Garden Route`; SEO title and meta description applied through Yoast metadata

## H2O Plumbers Home Page Build Notes

Applied on 2026-06-14:
- Home page content updated for H2O Plumbers.
- Header, footer, menu labels, visible contact details, and visible form service options updated for H2O Plumbers.
- Form recipients and notification settings were not changed.
- Yoast SEO title, meta description, and focus keyphrase applied through the WordPress editor.
- Stock images uploaded with SEO filenames and relevant alt text for the Home page service cards and support sections.
- Published Home page opened in Chrome and checked.

Chrome QA:
- SEO title: `Plumber in the Garden Route | H2O Plumbers`
- Meta description: `Need a plumber in the Garden Route? H2O Plumbers helps homes and businesses in George, Mossel Bay, Knysna and Oudtshoorn with leaks, drains and general plumbing.`
- H1: `Reliable Plumbers In The Garden Route`
- Home sections preserved: hero, services, process, why choose, trust, testimonials/service promise, FAQ
- Five Home services visible: General Plumbing, Leak Detection, Blocked Drains, Core Drilling, Drain Hydro Jetting
- Old Mawby/pool text not visible on the published page
- Old `tel:216-780-1668` links removed from the published page

## H2O Plumbers Feedback Fix Pass

Applied on 2026-06-14 after first review:
- Added the review notes to Barry's future SOPs and intake templates.
- Re-applied H2O brand colours to Elementor global colours.
- Updated hard-coded old template colour values in key Home, header, footer, FAQ, and form elements where the old palette remained visible.
- Adjusted header logo sizing for desktop, tablet, and mobile.
- Shortened hero trust bubbles to two-word items: `Leak Detection` and `Blocked Drains`.
- Expanded Home service card descriptions toward the 35-40 word target.
- Replaced weak generic stock with images from the client's existing website and service pages.
- Uploaded better-matched images for general plumbing, leak detection, blocked drains, core drilling, and drain hydro jetting.
- Prepared and applied 1000x1000 support images for process, why choose us, and why trust us image slots.
- Improved H2 headings with more natural `plumber Garden Route` and related location/service variants.
- Shortened long H3-style subheading text.
- Rewrote FAQ answers with more detailed local-service wording and focus-keyphrase variants.
- Updated footer service-area wording to wrap over multiple lines.
- Replaced the old footer map embed with a service-area panel because no exact Google Business Profile map link was provided.

Note: WordPress REST media-alt updates returned `406 Not Acceptable` from the server security layer. Image filenames are SEO-friendly and Elementor image fields were updated with intended alt text, but media-library alt fields may still need a manual WordPress media pass if the server continues blocking REST alt updates.

## H2O Plumbers Service Page Prototype

Applied on 2026-06-14:
- Audited the existing `Service Page Template` page, WordPress post ID `6077`.
- Exported the template before edits to `Barry/work/service-page-template-6077-export.json`.
- Labelled 28 service-template sections/widgets with Barry's Elementor labelling standard.
- Created service-page map: `elementor/references/master-template-service-page-map.md`.
- Added service-page section IDs/classes to `elementor/references/master-template-naming-standard.md`.
- Created and published `General Plumbing`, WordPress post ID `6329`.
- URL: `https://dev1.mynewwebsite.co.za/general-plumbing/`
- Built the page from the labelled service template structure.
- Applied H2O General Plumbing content for the Garden Route, George, Mossel Bay, Knysna and Oudtshoorn.
- Updated service page image slots with H2O plumbing media where available.
- Set the page featured image to `general-plumbing-garden-route.jpg`.

QA notes:
- Public page opens in Chrome.
- Hero, why choose, why trust and FAQ sections render.
- Why choose and why trust sections use scroll-triggered Elementor animation and reveal after scrolling.
- Old roofing/Oklahoma copy was not visible in the public page check.
- Yoast is active, but the focus keyphrase remains pending because Yoast private metadata did not accept the REST meta update.
- WordPress REST media alt updates returned `406`; Elementor image widget alt text was set where possible.

## H2O Plumbers Elementor Global Colour Correction

Applied on 2026-06-14:
- Corrected Elementor Site Settings > Global Colors > System Colors in the active Default Kit, post ID `1215`.
- Primary: `#1060B0`
- Secondary: `#6090C0`
- Text: `#1F2933`
- Accent: `#3255A3`
- Removed duplicate H2O `Primary`, `Secondary`, `Text`, and `Accent` entries that had been added under Custom Colors instead of replacing System Colors.
- Verified with Elementor MCP `get-global-settings`.

## Core Template Trust Section

Applied on 2026-06-15:
- Exported the Home page before structural changes.
- Added a new Home `Why Trust Us` trust element below Testimonials and above FAQ.
- Section ID: `home-why-trust-us`.
- Elementor section ID: `aa69916`.
- Added three icon-box cards:
  - Local Knowledge
  - Fully Insured
  - Qualified Teams
- Used a blue background based on the active primary brand colour.
- Added labels/classes to the new section, row, cards and icon boxes.
- Updated `elementor/references/master-template-homepage-map.md`.
- Updated `elementor/references/master-template-naming-standard.md`.
- Verified on the public Home page in Chrome.

Renamed/refined on 2026-06-15:
- User renamed the section title to `Service Guarantees`.
- Updated the section index and naming from `home-why-trust-us` to `home-service-guarantees`.
- Updated section classes to `barry-section barry-home-section barry-service-guarantees home-service-guarantees`.
- Renamed the child containers/widgets to `home-service-guarantees-*`.
- Copied the Home Process-style top-level background treatment onto the section.
- Added the H2O process image as the section background with a blue overlay.
- Generated Elementor CSS for post `2747` confirms the section image URL and overlay are present.
- If Chrome still shows a plain blue background, hard refresh the page because Elementor's `post-2747.css` browser cache may still be stale.

## Notes

Development domain for Barry testing.

MCP readiness passed on 2026-06-13:
- Endpoint confirmed: https://dev1.mynewwebsite.co.za/wp-json/mcp/elementor-mcp-server
- REST auth works for Barry Codex / barry
- Barry user role: administrator
- Elementor active: 3.35.5
- Elementor Pro active: 3.35.1
- EMCP Tools active: 2.2.0
- MCP initialize works: MCP Tools for Elementor Server v2.2.0
- Pages read works: 4 Elementor pages found
- Global settings read works
- Homepage structure read works: Home page ID 2747, 7 top-level elements
