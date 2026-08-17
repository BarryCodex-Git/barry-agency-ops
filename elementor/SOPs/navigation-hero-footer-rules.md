# SOP: Navigation, Hero Form, Trust Bubbles, and Footer Rules

Use this SOP for every new-client setup and every page build that touches the header, hero, menu, or footer.

## Main Menu Standard

The main menu must follow this top-level naming and order:

1. `Services`
2. `Service Areas`
3. `Process`
4. `About Us`
5. `Reviews`
6. `FAQ's`

Link rules:

- `Services` links to the Services page.
- `Service Areas` links to the Service Areas page.
- `Process` anchors to the Home page Process section.
- `About Us` anchors to the Home page About/Why Choose/About section.
- `Reviews` anchors to the Home page Reviews/Testimonials section.
- `FAQ's` anchors to the Home page FAQ section.

Sub-menu rules:

- Add top-level primary services as sub-menu items under `Services`.
- Add top-level primary service areas as sub-menu items under `Service Areas`.
- Service pages must be created as child pages of the main `Services` hub page.
- Primary service-area pages must be created as child pages of the main `Service Areas` hub page.
- Sub-location/suburb pages must be created as child pages of the relevant primary service-area page.
- During design/setup, use only primary services and primary service areas unless the user instructs otherwise.
- If a service or service-area page exists, link the submenu item to that page.
- If the page does not exist yet, the submenu item may use `#` temporarily.
- Once the page is created, replace `#` with the real page URL.
- Do not add every additional service or every researched suburb into the main menu during setup unless the user explicitly asks.

URL hierarchy:

- Service page: `/services/{service-slug}/`
- Primary service-area page: `/service-areas/{region-slug}/`
- Sub-location page: `/service-areas/{region-slug}/{sub-location-slug}/`

## Global Contact CTA

The master template includes a reusable Elementor container template:

- Template: `Global Contact CTA Buttons`
- Elementor template ID: `6575`

Use this reusable CTA container for future page builds where possible. It contains the standard Call and secondary-contact button pair.

Inherited master example — replace during every new-client conversion; never copy these values into the new client site:

- Phone display: `072 651 4447`
- Call link: `tel:+27726514447`
- Use WhatsApp only when the client supplied and approved a WhatsApp number.
- When no WhatsApp number is supplied, the secondary CTA must be `Email Us` with the approved `mailto:` link. Never leave the previous client's WhatsApp number or label.

If Elementor MCP cannot insert this as a true Elementor Pro Global Widget, use the template as the approved reusable source and keep all CTA button settings aligned with it.

Before sign-off, inspect rendered CTAs rather than settings alone. Every displayed phone number must match the digits in its `tel:` target, every displayed email must match its `mailto:` target, and every no-WhatsApp build must contain no inherited `wa.me` destination. Clear stale Elementor dynamic-tag overrides when they supersede the visible configured link.

### Exact Google Tag Manager button labels

These visible labels are reserved for Google Tag Manager text-match triggers:

- Phone-call buttons must display exactly `Call Us Now`.
- WhatsApp buttons must display exactly `WhatsApp Us`.

The match is case-sensitive and text-sensitive. Do not use a phone number, `Call`, `Phone`, `Call HoneySucker`, `Call for {location}`, `WhatsApp`, punctuation or any other variation on a button with the corresponding destination.

Apply this rule to the Header, Home Page, service pages, service-area pages, CTA pairs, cards, reusable/global widgets and templates, and all future builds. Audit by `tel:` and WhatsApp destination URLs so incorrectly labelled buttons are still found. Change only the visible label when normalising tracking text; preserve the approved destination URL unless a contact-detail change is separately authorised.

Do not change these tracked labels during ordinary copywriting, SEO, design polish or service-specific CTA work. Only change the tracking contract when the user explicitly approves a corresponding Google Tag Manager change.

## Hero Form Text

The text above the hero contact form must remain static on all page types.

Use exactly:

- A client-relevant prompt of no more than three words that stays on one line on mobile, used consistently across all pages.
- `Contact Us Now!`

Do not rewrite this text into service/location-specific copy.
Do not turn it into a long heading.
Do not include multiple locations above the form.

## Hero Paragraph Copy

The paragraph under the hero H1 must always be short, readable, and conversion-friendly.

Rules:

- Use one paragraph only.
- Target 40-50 words.
- Do not place a second explanatory paragraph in the hero.
- Do not use the hero paragraph as a full About, service, location, or company history section.
- Put longer proof, service detail, story, and explanation copy in the relevant body sections below the hero.

## Hero Trust Bubbles

The two bubble/check details under the hero text are trust signals, not service chips.

Rules:

- Do not use service names such as `Leak Detection` or `Blocked Drains`.
- Use two-word trust signals.
- Keep both bubbles similar in character length so the pills look balanced.
- Use short credibility ideas such as `Qualified Team`, `Insured Work`, `Local Experts`, `Clear Advice`, `Neat Work`, or similar client-appropriate trust signals.
- Put service detail in the hero paragraph or service cards, not the bubbles.

## Footer Service Areas

The footer must include `Service Areas`.

Rules:

- List only the primary service area regions from intake.
- Do not list all researched suburbs in the main footer during setup.
- Make sure the service area text wraps cleanly and does not overflow the footer element.

## Footer Google Maps / GBP

The footer must include the client's Google Business Profile or Google Maps link when supplied in the intake.

Rules:

- Prefer the exact GBP/Maps link supplied by the user.
- If no link is supplied, leave the map/GBP slot as pending or use a clean service-area element.
- Do not guess a GBP link unless it is an exact brand/location match.
- When a map link is added, label it clearly as the client's Google Business Profile, map, or directions link.
