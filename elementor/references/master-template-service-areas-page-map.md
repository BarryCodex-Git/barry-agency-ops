# Master Template Service Areas Page Map

Source site: Development 1  
Source URL: https://dev1.mynewwebsite.co.za/service-areas/  
Elementor page: Service Areas  
Elementor page ID: 6414  
Last updated: 2026-06-17  
Status: applied to Elementor through Services page structure clone

## Purpose

Barry uses this file to understand, target, and safely update the Service Areas hub page.

This page prepares a hub-and-spoke local SEO structure:

- Service Areas page: main location hub.
- Primary service area sections: regional hubs.
- Sub-location cards: future suburb/town spoke page targets.

## Applied Section Map

| Order | Section | Purpose | CSS ID | CSS Classes |
|---:|---|---|---|---|
| 1 | Service Areas Hero | Main location hub headline, intro and form | `service-areas-hero` | `barry-section barry-service-areas-page-section barry-service-areas-hero` |
| 2 | Service Areas Intro | Explains local coverage and SEO planning purpose | `service-areas-intro` | `barry-section barry-service-areas-page-section barry-service-areas-intro` |
| 3 | George Region | George sub-location cards | `service-area-george` | `barry-section barry-service-areas-page-section barry-service-area-region` |
| 4 | Mossel Bay Region | Mossel Bay sub-location cards | `service-area-mossel-bay` | `barry-section barry-service-areas-page-section barry-service-area-region` |
| 5 | Knysna Region | Knysna sub-location cards | `service-area-knysna` | `barry-section barry-service-areas-page-section barry-service-area-region` |
| 6 | Oudtshoorn Region | Oudtshoorn sub-location cards | `service-area-oudtshoorn` | `barry-section barry-service-areas-page-section barry-service-area-region` |
| 7 | Wilderness Region | Wilderness sub-location cards | `service-area-wilderness` | `barry-section barry-service-areas-page-section barry-service-area-region` |
| 8 | Service Areas FAQ | Hub-and-spoke/location coverage FAQ | `service-areas-faq` | `barry-section barry-service-areas-page-section barry-service-areas-faq` |

## Repeated Region Fields

Each primary region section uses:

- Eyebrow: `barry-field barry-heading service-area-region-eyebrow`
- Heading: `barry-field barry-heading service-area-region-heading`
- Cards row: `barry-card-row service-area-suburb-cards`
- CTA row: `barry-cta-row service-area-region-cta-row`
- CTA: `barry-field barry-cta service-area-region-primary-cta`

Each sub-location card uses:

- Card container: `barry-service-area-card service-area-suburb-card service-area-[region]-card-[number]`
- Image: `barry-field barry-image service-area-suburb-card-image`
- Title: `barry-field barry-heading service-area-suburb-card-title`
- Copy: `barry-field barry-copy service-area-suburb-card-copy`
- CTA: `barry-field barry-cta service-area-suburb-card-cta`

## Content Rules

- The Service Areas page is a hub page, not a final bulk SEO build.
- The hero form prompt and heading stay static: `Need a Plumber?` and `Contact Us Now!`.
- Hero trust bubbles must be two-word trust signals, not service-area or service names.
- Each primary service area must have its own H2 and description.
- Each primary service area should list 8-12 sub-locations when enough local targets exist.
- Sub-locations should favour high-value residential, estate, coastal, central business and commercial areas.
- Card CTAs should use natural service + location wording, such as `Plumber in Heather Park`.
- Card links remain placeholders until the spoke URL structure is approved.
- Location pages should only be created later if the client signs up for SEO and the keyword plan is approved.
