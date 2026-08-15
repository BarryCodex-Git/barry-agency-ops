# Master Template Naming Standard

This reference defines Barry's standard naming system for the agency master Elementor template.

## Principle

CSS IDs identify unique major sections.

CSS classes classify reusable fields and content roles.

Barry should not rely only on visual position like "first heading" or "second button."

## CSS ID Usage

Use CSS IDs for major unique sections:

- `home-hero`
- `home-trust`
- `home-services`
- `home-process`
- `home-testimonials`
- `home-service-guarantees`
- `home-faq`
- `home-final-cta`
- `service-hero`
- `service-why-choose`
- `service-why-trust`
- `service-faq`

Do not add CSS IDs to every widget by default.

## CSS Class Usage

Use classes for reusable classification:

- `barry-section`
- `barry-field`
- `barry-heading`
- `barry-copy`
- `barry-image`
- `barry-cta`
- `barry-service-card`
- `barry-testimonial`
- `barry-faq-item`

Add page-specific classes for exact content roles:

- `home-hero-heading`
- `home-hero-copy`
- `home-hero-primary-cta`
- `home-services-heading`
- `home-service-card-title`
- `home-service-card-copy`
- `home-service-guarantees-card`
- `home-service-guarantees-icon-box`
- `service-hero-heading`
- `service-hero-copy`
- `service-hero-bubble`
- `service-why-choose-heading`
- `service-why-choose-list`
- `service-why-trust-heading`
- `service-why-trust-list`
- `service-faq-heading`
- `service-faq-accordion`

## Client Data Mapping

Barry should map template fields to client data:

- Company name
- Main service
- Primary location
- Secondary services
- Trust proof
- CTA text
- Phone number
- Email
- Service images
- FAQs

Service page reference:

- `elementor/references/master-template-service-page-map.md`

## Future Work Rule

Whenever Barry creates new Elementor sections or pages, he must apply this naming standard from the start.
