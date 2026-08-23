# Master Template Services Hub Page Map

Source site: Development 1  
Source URL: https://template.mynewwebsite.co.za/services/
Elementor page: Services  
Elementor page ID: 6217  
Last updated: 2026-06-16  
Status: applied to Elementor through page backup + structured Elementor data update

## Purpose

Barry uses this file to understand, target, and safely update the agency master Services hub page.

The Services hub page is different from a single Service Page Template:

- Services hub page: lists all primary and additional services for a client.
- Service page template: targets one service and one service/location focus.

## Applied Section Map

| Order | Section | Purpose | Elementor ID | CSS ID | CSS Classes |
|---:|---|---|---|---|---|
| 1 | Services Hero | Services overview, intro, trust bubbles and form | `8c893f2` | `services-hero` | `barry-section barry-services-page-section barry-services-hero` |
| 2 | Services Intro | Short service-hub explanation with supporting image | `7b48d0e` | `services-intro` | `barry-section barry-services-page-section barry-services-intro` |
| 3 | Services Hub | Primary + additional service card grid | `5adb476` | `services-hub` | `barry-section barry-services-page-section barry-services-hub` |
| 4 | Services FAQ | Services-page-specific booking and service questions | `5379a55` | `services-faq` | `barry-section barry-services-page-section barry-services-faq` |

## Hero Fields

| Field | Elementor ID | Widget Type | Applied Label | CSS Classes | Client Data Source |
|---|---|---|---|---|---|
| Heading | `cd5afd7` | heading | Services Hero Heading | `barry-field barry-heading services-hero-heading` | Service category + location |
| Intro copy | `a028392` | text-editor | Services Hero Copy | `barry-field barry-copy services-hero-copy` | Service hub summary |
| Trust point 01 | `3d49090` | icon-list | Services Hero Trust Point 01 | `barry-field barry-copy services-hero-trust-point` | Two-word trust signal |
| Trust point 02 | `d686603` | icon-list | Services Hero Trust Point 02 | `barry-field barry-copy services-hero-trust-point` | Two-word trust signal |
| Form prompt | `243d0ce` | text-editor | Services Hero Quote Intro | `barry-field barry-copy services-hero-quote-intro` | Static: `Need a Plumber?` |
| Form heading | `fb30028` | heading | Services Hero Quote Heading | `barry-field barry-heading services-hero-quote-heading` | Static: `Contact Us Now!` |
| Form | `6d03bd9` | form | Services Hero Form | `barry-field barry-form services-hero-form` | Existing approved form |
| Review badge image | `03c3c21` | image | Services Hero Review Badge Image | `barry-field barry-image services-hero-review-image` | Review/trust badge |

## Intro Fields

| Field | Elementor ID | Widget Type | Applied Label | CSS Classes | Client Data Source |
|---|---|---|---|---|---|
| Eyebrow | `5b924cb` | heading | Services Intro Eyebrow | `barry-field barry-heading services-intro-eyebrow` | Section label |
| Heading | `786bc25` | heading | Services Intro Heading | `barry-field barry-heading services-intro-heading` | Service/category SEO heading |
| Subheading | `92685cf` | heading | Services Intro Subheading | `barry-field barry-heading services-intro-subheading` | Short human subheading |
| Copy | `77fee99` | text-editor | Services Intro Copy | `barry-field barry-copy services-intro-copy` | Service hub explanation |
| Primary CTA | `e38b892` | button | Services Intro Primary CTA | `barry-field barry-cta services-intro-primary-cta` | Jump/link to services grid |
| Phone CTA | `878cc06` | button | Services Intro Phone CTA | `barry-field barry-cta services-phone-cta` | Approved phone |
| Image | `596a3e2` | image | Services Intro Image | `barry-field barry-image services-intro-image` | Service/support image |

## Services Hub Fields

| Field | Elementor ID | Widget Type | Applied Label | CSS Classes | Client Data Source |
|---|---|---|---|---|---|
| Eyebrow | `3f319af` | heading | Services Hub Eyebrow | `barry-field barry-heading services-hub-eyebrow` | Section label |
| Heading | `82ac492` | elementskit-heading | Services Hub Heading | `barry-field barry-heading services-hub-heading` | Service category + location |
| Cards row | `677d82d` | container | Services Hub Cards Row | `barry-card-row services-hub-cards` | All services |
| CTA row | `118ced8` | container | Services Hub CTA Row | `barry-cta-row services-hub-cta-row` | CTA wrapper |
| Primary CTA | `cf26d49` | button | Services Hub Primary CTA | `barry-field barry-cta services-hub-primary-cta` | Primary CTA |

Service cards:

| Card | Container ID | Container Classes | Image ID | Title ID | Copy ID | CTA ID |
|---:|---|---|---|---|---|---|
| 01 | `1d6f89b` | `barry-service-card services-service-card services-service-card-01` | `76a6001` | `0d7fdcc` | `2b5782a` | `628c228` |
| 02 | `b8b1452` | `barry-service-card services-service-card services-service-card-02` | `ef1b9bd` | `a97eb9f` | `fa787d7` | `ca08deb` |
| 03 | `8c6b5d1` | `barry-service-card services-service-card services-service-card-03` | `4dc0823` | `16b393a` | `1b0fce8` | `651e4c3` |
| 04 | `1e4c95d` | `barry-service-card services-service-card services-service-card-04` | `e4135fd` | `28e3e7a` | `e72db25` | `eb092d5` |
| 05 | `270d644` | `barry-service-card services-service-card services-service-card-05` | `35a0be0` | `18b4101` | `b1f4573` | `02dd18c` |
| 06 | `4d5bfbc` | `barry-service-card services-service-card services-service-card-06` | `f792308` | `d02fa3b` | `26dffda` | `199c939` |
| 07 | `a710001` | `barry-service-card services-service-card services-service-card-07` | `a710002` | `a710003` | `a710004` | `a710005` |
| 08 | `a720001` | `barry-service-card services-service-card services-service-card-08` | `a720002` | `a720003` | `a720004` | `a720005` |
| 09 | `a730001` | `barry-service-card services-service-card services-service-card-09` | `a730002` | `a730003` | `a730004` | `a730005` |
| 10 | `a740001` | `barry-service-card services-service-card services-service-card-10` | `a740002` | `a740003` | `a740004` | `a740005` |

Repeated field classes:

- Service hub images: `barry-field barry-image services-service-card-image`
- Service hub titles: `barry-field barry-heading services-service-card-title`
- Service hub copy: `barry-field barry-copy services-service-card-copy`
- Service hub CTAs: `barry-field barry-cta services-service-card-cta`

## Services FAQ Fields

| Field | Elementor ID | Widget Type | Applied Label | CSS Classes | Client Data Source |
|---|---|---|---|---|---|
| Eyebrow | `bfe2683` | heading | Services FAQ Eyebrow | `barry-field barry-heading services-faq-eyebrow` | Section label |
| Heading | `fa6a362` | elementskit-heading | Services FAQ Heading | `barry-field barry-heading services-faq-heading` | Services FAQ heading |
| Accordion | `9b703bb` | nested-accordion | Services FAQ Accordion | `barry-faq-item services-faq-accordion` | Services FAQ questions |
| FAQ 01 answer | `77c725d` | text-editor | Services FAQ 01 Answer | `barry-field barry-copy services-faq-answer` | Booking answer |
| FAQ 02 answer | `52b33c5` | text-editor | Services FAQ 02 Answer | `barry-field barry-copy services-faq-answer` | Service list answer |
| FAQ 03 answer | `4b3d608` | text-editor | Services FAQ 03 Answer | `barry-field barry-copy services-faq-answer` | Customer type answer |
| FAQ 04 answer | `3c037e4` | text-editor | Services FAQ 04 Answer | `barry-field barry-copy services-faq-answer` | Urgent service answer |
| FAQ 05 answer | `8c303b5` | text-editor | Services FAQ 05 Answer | `barry-field barry-copy services-faq-answer` | Service area answer |

## Content Rules

- The Services hub page should list the five primary Home Page services first.
- Add all additional services from intake underneath the primary services.
- Every listed service gets one service card.
- Reuse existing approved AI/client images where a Home Page service image already exists.
- Generate new images only for additional service cards or missing service visuals.
- Services intro/support and service-card image widgets that use square visual slots must use actual 1000x1000 square source/upload files.
- Do not rely on Elementor/CSS cropping, object-fit, masks, or container styling to make non-square files look square.
- Keep service card copy around 35-45 words where the layout supports it.
- Services FAQ must be unique to the Services hub page and focus on booking, what services are offered, customer types, urgent services, and service areas.
- Service card CTAs may stay as placeholders until the individual service pages exist. Update links once spoke pages are created.
- Yoast focus keyphrase should target the service hub, such as `plumbing services Garden Route`, with natural variants in H1/H2/FAQ/image alt text.
- Hero trust bubbles must be trust signals, not service names.
- Hero form prompt and heading stay static: `Need a Plumber?` and `Contact Us Now!`.
