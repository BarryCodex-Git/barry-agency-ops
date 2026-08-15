# Master Template Service Page Map

This map documents the labelled `Service Page Template` page on Development 1.

Master reference pages:

- Approved example page: `Blocked Drains Garden Route`
- Approved example page ID: `6077`
- Approved example URL: `/services/blocked-drains-garden-route/`
- Draft reusable copy: `Service Page Template`
- Draft reusable copy ID: `6573`
- Draft reusable copy status: `draft`
- Parent page for both: `Services` (`6217`)
- Purpose: reusable service page structure for local service pages.

The draft `Service Page Template` is a reference copy of the approved service page. It must remain draft and should be refreshed from the approved example only after the user approves the current service-page design.

## Section Order

| Order | Section | Purpose | Elementor ID | CSS ID | CSS classes |
| --- | --- | --- | --- | --- | --- |
| 1 | Service Hero | Main service headline, intro, trust bubbles, and form | `8c893f2` | `service-hero` | `barry-section barry-service-section barry-hero` |
| 2 | Service Warning Signs | Symptoms and problem-intent section | `ee19534` | `service-blocked-drain-warning-signs` | `barry-section barry-service-section` |
| 3 | Service Approach | Service-specific process and supporting image | `4358662` | `service-why-choose` | `barry-section barry-service-section barry-why-choose` |
| 4 | Service Trust | Proof/reassurance section and supporting image | `386642a` | `service-why-trust` | `barry-section barry-service-section barry-why-trust` |
| 5 | Local Work Examples | Local examples/recent job story section | `26c91ca` | `service-local-drain-work-stories` | `barry-section barry-service-section` |
| 6 | Related Services | Internal-link service cards | `d877100` | `service-related-services` | `barry-section barry-service-section` |
| 7 | Local Authority Note | External authority link and responsibility guidance | `a1fe463` | `service-drain-responsibility-note` | `barry-section barry-service-section` |
| 8 | Service FAQ | Service-specific FAQ content | `5379a55` | `service-faq` | `barry-section barry-service-section barry-faq` |

## Hero Fields

| Field | Elementor ID | Widget | CSS classes | Notes |
| --- | --- | --- | --- | --- |
| H1 | `cd5afd7` | heading | `barry-field barry-heading service-hero-heading` | Main service + location heading |
| Intro copy | `a028392` | text-editor | `barry-field barry-copy service-hero-copy` | Short service summary |
| Trust bubble 01 | `3d49090` | icon-list | `barry-field barry-bubble service-hero-bubble service-hero-bubble-01` | Two-word trust signal |
| Trust bubble 02 | `d686603` | icon-list | `barry-field barry-bubble service-hero-bubble service-hero-bubble-02` | Two-word trust signal |
| Form prompt | `243d0ce` | text-editor | `barry-field barry-copy service-hero-form-prompt` | Static: `Need a Plumber?` |
| Form label | `fb30028` | heading | `barry-field barry-heading service-hero-form-label` | Static: `Contact Us Now!` |
| Review badge image | `03c3c21` | image | Existing image slot | Review/trust image |

## Why Choose Fields

| Field | Elementor ID | Widget | CSS classes | Notes |
| --- | --- | --- | --- | --- |
| Eyebrow | `e00c453` | heading | `barry-field barry-heading service-why-choose-eyebrow` | Section label |
| H2 | `aa059ce` | heading | `barry-field barry-heading service-why-choose-heading` | Service + location benefit heading |
| H3 | `ba594ed` | heading | `barry-field barry-heading service-why-choose-subheading` | Short subheading |
| Bullet list | `1a6d842` | icon-list | `barry-field barry-list service-why-choose-list` | Service-specific benefits |
| Primary CTA | `dde1812` | button | `barry-field barry-cta service-primary-cta` | Primary action |
| Secondary CTA | `3b9a1d6` | button | `barry-field barry-cta service-secondary-cta` | Secondary action |
| Image | `63c3393` | image | `barry-field barry-image service-why-choose-image` | Service-relevant image |

## Why Trust Fields

| Field | Elementor ID | Widget | CSS classes | Notes |
| --- | --- | --- | --- | --- |
| Eyebrow | `9d6770f` | heading | `barry-field barry-heading service-why-trust-eyebrow` | Section label |
| H2 | `cd61791` | heading | `barry-field barry-heading service-why-trust-heading` | Proof/reassurance heading |
| H3 | `7dce8ee` | heading | `barry-field barry-heading service-why-trust-subheading` | Short subheading |
| Bullet list | `a73192f` | icon-list | `barry-field barry-list service-why-trust-list` | Trust/proof points |
| Primary CTA | `8631ebf` | button | `barry-field barry-cta service-primary-cta` | Primary action |
| Secondary CTA | `1340429` | button | `barry-field barry-cta service-secondary-cta` | Secondary action |
| Image | `9204026` | image | `barry-field barry-image service-why-trust-image` | Service-relevant image |

## FAQ Fields

| Field | Elementor ID | Widget | CSS classes | Notes |
| --- | --- | --- | --- | --- |
| Eyebrow | `bfe2683` | heading | `barry-field barry-heading service-faq-eyebrow` | Section label |
| H2 | `3501291` | heading | `barry-field barry-heading service-faq-heading` | Service FAQ heading |
| Intro copy | `f0e1fa0` | text-editor | `barry-field barry-copy service-faq-copy` | Short FAQ intro |
| Accordion | `9b703bb` | nested-accordion | `barry-field barry-faq-list service-faq-accordion` | Service FAQ items |
| FAQ 01 answer | `77c725d` | text-editor |  | Why the drain keeps blocking |
| FAQ 02 answer | `52b33c5` | text-editor |  | Outside gully overflow |
| FAQ 03 answer | `4b3d608` | text-editor |  | Drain chemicals |
| FAQ 04 answer | `8de3531` | text-editor |  | Hydro jetting |
| FAQ 05 answer | `09c3709` | text-editor |  | Camera inspection |

## Content Rules

- Service pages target one service and the primary service area.
- Service pages must be nested under the main Services hub page in WordPress page hierarchy.
- The public URL pattern is `/services/{service-location-slug}/`.
- Use the format `service + location` or `service in location` naturally in the H1, opening paragraph, at least one H2, SEO title, meta description, and FAQ copy.
- Do not repeat the exact focus phrase in every H2.
- Add a warning signs/problem-intent section.
- Add local work examples or recent jobs where the client supplies real job notes.
- If real job notes are missing, use clearly approved representative local examples and do not claim they are verified real jobs.
- Add related services for internal linking.
- Add one useful high-authority external link where relevant.
- Keep service hero trust bubbles to two-word trust signals, not service names.
- Keep the two trust bubbles similar in character length.
- Do not rewrite the hero form prompt. Use `Need a Plumber?` and `Contact Us Now!` on all service pages.
- H3 headings should stay short and scannable.
- Images must match the specific service; use client/source-site images first.
- Do not change complex hero background modes without a page export or rollback point.
