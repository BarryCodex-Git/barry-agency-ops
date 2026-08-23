# Master Template Homepage Map

Source site: Development 1  
Source URL: https://template.mynewwebsite.co.za/
Elementor page: Home  
Elementor page ID: 2747  
Last updated: 2026-06-19  
Status: applied to Elementor through MCP

## Purpose

Barry uses this file to understand, target, and safely update the agency master Home page when preparing future client builds.

This map records:

- Top-level section labels
- Elementor element IDs
- CSS IDs
- CSS classes
- Key editable widgets
- Client data mapping notes

## Applied Section Map

| Order | Section | Purpose | Elementor ID | CSS ID | CSS Classes |
|---:|---|---|---|---|---|
| 1 | Home Hero | Above-the-fold value proposition and quote entry point | `8c893f2` | `home-hero` | `barry-section barry-home-section barry-hero` |
| 2 | Home Services | Primary service card grid | `5adb476` | `home-services` | `barry-section barry-home-section barry-services` |
| 3 | Home Common Problems | Compact problem-intent SEO section | `3b5331d` | `home-common-problems` | `barry-section barry-home-section barry-common-problems` |
| 4 | Home Process | Three-step process and CTA | `e7a018d` | `home-process` | `barry-section barry-home-section barry-process` |
| 5 | Home Why Choose Us | Differentiators and trust reasons | `4358662` | `home-why-choose` | `barry-section barry-home-section barry-trust barry-why-choose` |
| 6 | Home Why Trust Us | Trust proof and reassurance section | `1c8e80a` | `home-trust` | `barry-section barry-home-section barry-trust barry-why-trust` |
| 7 | Home Testimonials | Client reviews/testimonials | `8cdc84b` | `home-testimonials` | `barry-section barry-home-section barry-testimonials` |
| 8 | Home Service Guarantees | Guarantee icons under testimonials | `aa69916` | `home-service-guarantees` | `barry-section barry-home-section barry-service-guarantees home-service-guarantees` |
| 9 | Home FAQ | Frequently asked questions | `5379a55` | `home-faq` | `barry-section barry-home-section barry-faq` |
| 10 | Home Service Areas | Local SEO service-area cards and future hub/spoke entry points | `adfae7c` | `home-service-areas` | `barry-section barry-home-section barry-service-areas` |

## Hero Fields

| Field | Elementor ID | Widget Type | Applied Label | CSS Classes | Client Data Source |
|---|---|---|---|---|---|
| Main heading | `cd5afd7` | heading | Home Hero Heading | `barry-field barry-heading home-hero-heading` | Company name, main service, location |
| Intro copy | `a028392` | text-editor | Home Hero Copy | `barry-field barry-copy home-hero-copy` | Brand summary and primary service promise |
| Trust point 01 | `3d49090` | icon-list | Home Hero Trust Point 01 | `barry-field barry-copy home-hero-trust-point` | Key service/trust proof |
| Trust point 02 | `d686603` | icon-list | Home Hero Trust Point 02 | `barry-field barry-copy home-hero-trust-point` | Key service/trust proof |
| Quote intro | `243d0ce` | text-editor | Home Hero Quote Intro | `barry-field barry-copy home-hero-quote-intro` | CTA intro copy |
| Quote heading | `fb30028` | heading | Home Hero Quote Heading | `barry-field barry-heading home-hero-quote-heading` | CTA heading |
| Quote/global widget | `800515f` | global | Home Hero Quote Form Global Widget | `barry-field barry-form home-hero-form` | Approval required before form changes |
| Review badge image | `03c3c21` | image | Home Hero Review Badge Image | `barry-field barry-image home-hero-review-image` | Review badge or trust image |

Current Home Page SEO focus can use `{primary service or industry} {primary location or region}` or a brand-led pattern `{company name} {primary location or region}` where that reads more naturally. For H2O Plumbers the focus keyphrase is `H2O Plumbers Garden Route`.

## Services Fields

Section widgets:

| Field | Elementor ID | Widget Type | Applied Label | CSS Classes | Client Data Source |
|---|---|---|---|---|---|
| Eyebrow | `3f319af` | heading | Home Services Eyebrow | `barry-field barry-heading home-services-eyebrow` | Section label |
| Main heading | `82ac492` | elementskit-heading | Home Services Heading | `barry-field barry-heading home-services-heading` | Service category and location |
| Section CTA | `cf26d49` | button | Home Services Section CTA | `barry-field barry-cta home-services-primary-cta` | CTA text and target |

Service cards:

| Card | Container ID | Container Classes | Image ID | Title ID | Copy ID | CTA ID |
|---:|---|---|---|---|---|---|
| 01 | `1d6f89b` | `barry-service-card home-service-card home-service-card-01` | `76a6001` | `0d7fdcc` | `2b5782a` | `628c228` |
| 02 | `b8b1452` | `barry-service-card home-service-card home-service-card-02` | `ef1b9bd` | `a97eb9f` | `fa787d7` | `ca08deb` |
| 03 | `8c6b5d1` | `barry-service-card home-service-card home-service-card-03` | `4dc0823` | `16b393a` | `1b0fce8` | `651e4c3` |
| 04 | `1e4c95d` | `barry-service-card home-service-card home-service-card-04` | `e4135fd` | `28e3e7a` | `e72db25` | `eb092d5` |
| 05 | `270d644` | `barry-service-card home-service-card home-service-card-05` | `35a0be0` | `18b4101` | `b1f4573` | `02dd18c` |

Repeated field classes:

- Service images: `barry-field barry-image home-service-card-image`
- Service titles: `barry-field barry-heading home-service-card-title`
- Service copy: `barry-field barry-copy home-service-card-copy`
- Service CTAs: `barry-field barry-cta home-service-card-cta`

## Common Problems Fields

| Field | Elementor ID | Widget Type | Applied Label | CSS Classes | Client Data Source |
|---|---|---|---|---|---|
| Section | `3b5331d` | container | Home Common Plumbing Problems Section | `barry-section barry-home-section barry-common-problems` | Primary service problem intent |
| Eyebrow | `46f2058` | heading | Home Common Problems Eyebrow | `barry-field barry-heading home-common-problems-eyebrow` | Section label |
| Heading block | `a8a7146` | elementskit-heading | Home Common Problems Heading | `barry-field barry-heading home-common-problems-heading` | Section label, H2 and short intro |
| Card grid | `f0cdf6c` | container | Home Common Problems Card Grid | `barry-grid home-common-problems-grid` | Four compact problem cards |

Problem cards:

| Card | Icon Box ID | Heading | Purpose |
|---:|---|---|---|
| 01 | `e78bae5` | Hidden Leaks | Leak symptoms and hidden water-damage intent |
| 02 | `e5bc063` | Slow Drains | Blockage symptoms and drain-clearing intent |
| 03 | `c277e45` | Faulty Fixtures | Everyday plumbing repairs and fixture intent |
| 04 | `920f545` | Pressure Changes | Pressure, valve, blockage or leak investigation intent |

Content note:

- This section belongs after Home Services and before Home Process.
- Keep it compact and conversion-friendly.
- Use customer symptom language, not generic service-card repetition.
- Use the same heading-area stack as the other Home Page sections: blue bubble/eyebrow, `elementskit-heading` H2 block, separator, intro copy and matching spacing.

## Process Fields

| Field | Elementor ID | Widget Type | Applied Label | CSS Classes | Client Data Source |
|---|---|---|---|---|---|
| Eyebrow | `386797f` | heading | Home Process Eyebrow | `barry-field barry-heading home-process-eyebrow` | Section label |
| Heading | `5f330f0` | elementskit-heading | Home Process Heading | `barry-field barry-heading home-process-heading` | Process headline |
| Step 01 | `5ce4f31` | icon-box | Home Process Step 01 | `barry-field barry-process-step home-process-step` | Process step |
| Step 02 | `ade04b8` | icon-box | Home Process Step 02 | `barry-field barry-process-step home-process-step` | Process step |
| Step 03 | `7d7f2f1` | icon-box | Home Process Step 03 | `barry-field barry-process-step home-process-step` | Process step |
| Image | `28e4d06` | image | Home Process Image | `barry-field barry-image home-process-image` | Process/supporting image |
| CTA | `c3f8626` | button | Home Process CTA | `barry-field barry-cta home-process-cta` | CTA text and target |

## Why Choose Us Fields

| Field | Elementor ID | Widget Type | Applied Label | CSS Classes | Client Data Source |
|---|---|---|---|---|---|
| Eyebrow | `e00c453` | heading | Home Why Choose Eyebrow | `barry-field barry-heading home-why-choose-eyebrow` | Section label |
| Heading | `aa059ce` | heading | Home Why Choose Heading | `barry-field barry-heading home-why-choose-heading` | Differentiator headline |
| Copy | `ce88c0f` | text-editor | Home Why Choose Copy | `barry-field barry-copy home-why-choose-copy` | Differentiator copy |
| Trust list | `1a6d842` | icon-list | Home Why Choose Trust List | `barry-field barry-copy home-why-choose-trust-list` | Differentiators/proof points |
| Primary CTA | `dde1812` | button | Home Why Choose Primary CTA | `barry-field barry-cta home-why-choose-primary-cta` | CTA text and target |
| Phone CTA | `3b9a1d6` | button | Home Why Choose Phone CTA | `barry-field barry-cta home-phone-cta` | Approval required before contact changes |
| Image | `63c3393` | image | Home Why Choose Image | `barry-field barry-image home-why-choose-image` | Trust/supporting image |

## Why Trust Us Fields

| Field | Elementor ID | Widget Type | Applied Label | CSS Classes | Client Data Source |
|---|---|---|---|---|---|
| Eyebrow | `71106a0` | heading | Home Trust Eyebrow | `barry-field barry-heading home-trust-eyebrow` | Section label |
| Heading | `f73077f` | heading | Home Trust Heading | `barry-field barry-heading home-trust-heading` | Trust headline |
| Subheading | `3a85d6e` | heading | Home Trust Subheading | `barry-field barry-heading home-trust-subheading` | Trust supporting statement |
| Proof list | `ab95a5e` | icon-list | Home Trust Proof List | `barry-field barry-copy home-trust-proof-list` | Trust proof points |
| Primary CTA | `59a32b2` | button | Home Trust Primary CTA | `barry-field barry-cta home-trust-primary-cta` | CTA text and target |
| Phone CTA | `5bffc87` | button | Home Trust Phone CTA | `barry-field barry-cta home-phone-cta` | Approval required before contact changes |
| Image | `da981c3` | image | Home Trust Image | `barry-field barry-image home-trust-image` | Trust/supporting image |

## Testimonials Fields

Section widgets:

| Field | Elementor ID | Widget Type | Applied Label | CSS Classes | Client Data Source |
|---|---|---|---|---|---|
| Eyebrow | `dad2408` | heading | Home Testimonials Eyebrow | `barry-field barry-heading home-testimonials-eyebrow` | Section label |
| Heading | `deb445d` | elementskit-heading | Home Testimonials Heading | `barry-field barry-heading home-testimonials-heading` | Testimonials headline |

Testimonial cards:

| Card | Container ID | Container Classes | Name ID | Quote ID |
|---:|---|---|---|---|
| 01 | `0f13815` | `barry-testimonial home-testimonial home-testimonial-01` | `d3267a8` | `6968c98` |
| 02 | `4f470fe` | `barry-testimonial home-testimonial home-testimonial-02` | `45c72f6` | `c78390a` |
| 03 | `54d15ba` | `barry-testimonial home-testimonial home-testimonial-03` | `9e64e2b` | `b146dae` |

Repeated field classes:

- Testimonial names: `barry-field barry-heading home-testimonial-name`
- Testimonial quotes: `barry-field barry-copy home-testimonial-quote`

Approved New Client Build state:

- Populate all three cards with real approved reviews or, when the review source is not connected yet, three completed handover review placeholders.
- Use three plausible customer names and three approved primary-region locations. Write natural customer-style reviews of similar length that relate to real client services.
- Keep internal placeholder wording out of the visible H2, introduction, names and review copy.
- Change the Elementor Navigator labels for the section and all six name/quote widgets to include `PLACEHOLDER` and `Replace With Trustindex`.
- Manually replace the three cards with the verified Trustindex widget when the client's Google profile and review connection are ready.
- Never include the placeholder reviews in Review or AggregateRating schema and never describe them as verified Google reviews.

## Service Guarantees Fields

Section widgets:

| Field | Elementor ID | Widget Type | Applied Label | CSS Classes | Client Data Source |
|---|---|---|---|---|---|
| Section | `aa69916` | container | Home Service Guarantees Section | `barry-section barry-home-section barry-service-guarantees home-service-guarantees` | Core template guarantees section |
| Inner container | `5a5ede9` | container | Home Service Guarantees Inner | `barry-container home-service-guarantees-inner` | Layout wrapper |
| Eyebrow | `8c6cd38` | heading | Home Service Guarantees Eyebrow | `barry-field barry-heading home-service-guarantees-eyebrow` | Section label |
| Heading | `b60c29d` | heading | Home Service Guarantees Heading | `barry-field barry-heading home-service-guarantees-heading` | Guarantees headline |
| Intro copy | `fe9e0d7` | text-editor | Home Service Guarantees Intro Copy | `barry-field barry-copy home-service-guarantees-copy` | Guarantees intro |
| Cards row | `4253d55` | container | Home Service Guarantees Cards Row | `barry-card-row home-service-guarantees-cards` | Three guarantee cards |

Trust card content:

| Card | Container ID | Icon Box ID | Heading | Purpose |
|---:|---|---|---|---|
| 01 | `09ca1e1` | `68b1cf1` | Local Knowledge | Show local/service-area familiarity |
| 02 | `c8b6dd9` | `84bec0c` | Fully Insured | Show professional protection and responsibility |
| 03 | `696607e` | `7b4adf7` | Qualified Teams | Show training, standards and workmanship |

Repeated card classes:

- Guarantee cards: `barry-card barry-guarantee-card home-service-guarantees-card`
- Icon boxes: `barry-field barry-icon-box home-service-guarantees-icon-box`

Style note:

- Service Guarantees copies the Home Process top-level section background/video overlay and mountain shape dividers.

## Image Slot Rules

- Inline support-image widgets for Process, Why Choose Us, Why Trust Us, service cards, and similar card/support slots keep their template ratio.
- The standard inline support-image source/upload file size is 1000x1000 square unless a specific slot requires another documented ratio.
- Do not use landscape or portrait source files in square support-image widgets and rely on CSS, Elementor object-fit, masks, or visual cropping to hide the mismatch.
- Do not replace inline support-image widgets when the user only asks about background-image quality, crop, stretch, zoom or resolution.
- Top-level section background images use wide landscape assets, preferably 1920x1080 or larger, optimised as `.webp`.
- Background images and inline image widgets must be treated as separate asset types and updated separately.

## FAQ Fields

| Field | Elementor ID | Widget Type | Applied Label | CSS Classes | Client Data Source |
|---|---|---|---|---|---|
| Eyebrow | `bfe2683` | heading | Home FAQ Eyebrow | `barry-field barry-heading home-faq-eyebrow` | Section label |
| Heading | `fa6a362` | elementskit-heading | Home FAQ Heading | `barry-field barry-heading home-faq-heading` | FAQ headline |
| Accordion | `9b703bb` | nested-accordion | Home FAQ Accordion | `barry-faq-item home-faq-accordion` | FAQ questions |
| FAQ 01 answer | `77c725d` | text-editor | Home FAQ 01 Answer | `barry-field barry-copy home-faq-answer` | FAQ answer |
| FAQ 02 answer | `52b33c5` | text-editor | Home FAQ 02 Answer | `barry-field barry-copy home-faq-answer` | FAQ answer |
| FAQ 03 answer | `4b3d608` | text-editor | Home FAQ 03 Answer | `barry-field barry-copy home-faq-answer` | FAQ answer |
| FAQ 04 answer | `3c037e4` | text-editor | Home FAQ 04 Answer | `barry-field barry-copy home-faq-answer` | FAQ answer |
| FAQ 05 answer | `8c303b5` | text-editor | Home FAQ 05 Answer | `barry-field barry-copy home-faq-answer` | FAQ answer |

FAQ question titles are stored inside nested accordion item settings.

## Service Areas Fields

Section widgets:

| Field | Elementor ID | Widget Type | Applied Label | CSS Classes | Client Data Source |
|---|---|---|---|---|---|
| Section | `adfae7c` | container | Home Service Areas Section | `barry-section barry-home-section barry-service-areas` | Primary service areas |
| Inner container | `48f6af6` | container | Home Service Areas Inner |  | Layout wrapper |
| Eyebrow | `97fa801` | heading | Home Service Areas Eyebrow | `barry-field barry-heading home-service-areas-eyebrow` | Section label |
| Heading | `f2a9f85` | elementskit-heading | Home Service Areas Heading | `barry-field barry-heading home-service-areas-heading` | Service category and locations |
| Cards row | `61f3182` | container | Home Service Areas Cards Row | `barry-card-row home-service-areas-cards` | Service-area cards |
| CTA row | `348bf72` | container | Home Service Areas CTA Row | `barry-cta-row home-service-areas-cta-row` | Service-area CTA wrapper |
| Primary CTA | `43cf741` | button | Home Service Areas Primary CTA | `barry-field barry-cta home-service-areas-primary-cta` | Link to all service areas or future hub page |

Service area cards:

| Card | Container ID | Container Classes | Image ID | Title ID | Copy ID | CTA ID |
|---:|---|---|---|---|---|---|
| 01 | `7dbe426` | `barry-service-area-card home-service-area-card home-service-area-card-01` | `2cbee7d` | `09cb4b3` | `31d1f8a` | `93ac44f` |
| 02 | `a051f98` | `barry-service-area-card home-service-area-card home-service-area-card-02` | `400d819` | `aff157d` | `d3236a3` | `ea47b59` |
| 03 | `02c8e9d` | `barry-service-area-card home-service-area-card home-service-area-card-03` | `f8fe57c` | `4972953` | `a63d7d3` | `70458e2` |
| 04 | `fdb2a19` | `barry-service-area-card home-service-area-card home-service-area-card-04` | `02198d1` | `c117667` | `77d1277` | `61068aa` |
| 05 | `f86aec5` | `barry-service-area-card home-service-area-card home-service-area-card-05` | `73decc2` | `d342891` | `17e30e4` | `db116d2` |

Repeated field classes:

- Service area images: `barry-field barry-image home-service-area-card-image`
- Service area titles: `barry-field barry-heading home-service-area-card-title`
- Service area copy: `barry-field barry-copy home-service-area-card-copy`
- Service area CTAs: `barry-field barry-cta home-service-area-card-cta`

Content note:

- Use real service areas from intake.
- Use local skyline, landscape, landmark, coastline, town, suburb, or regional images for these cards, not plumber action/service images.
- SEO image filenames and alt text should naturally target `{service + location}`.
- Treat these cards as future internal links for service-area hub/spoke SEO pages. Keep links as placeholders until the destination pages exist or the user approves the URL plan.

## Published Page Verification

Verified in Chrome on 2026-06-14:

- 7 top-level `home-*` section IDs render.
- 7 top-level sections include `barry-section`.
- 5 service card containers render with `barry-service-card home-service-card`.
- 3 testimonial containers render with `barry-testimonial home-testimonial`.
- 66 editable widgets render with `barry-field`.

## Notes And Guardrails

- Development 1 is Barry's safe training site.
- The hero H1 is still the lab test heading and should be replaced before using this as a client-facing master.
- Form/global widget changes still require care. The labelling pass did not change form recipients, storage, notifications, or integrations.
- Phone CTA widgets are labelled, but contact details should not be changed on live client sites without approval.
- CSS IDs are only used on major top-level sections.
- Widget-level targeting should prefer classes and MCP element IDs, not extra CSS IDs.
