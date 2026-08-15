# SOP: Elementor Labelling Standard

Use this SOP whenever Barry creates, audits, or modifies Elementor pages, sections, containers, widgets, or reusable templates.

## Goal

Make every important Elementor page easy for Barry and humans to understand, update, document, and reuse.

## Core Rule

Use CSS IDs for unique major page sections.

Use CSS classes for reusable classification and content fields.

Use Barry map files for the full element registry.

Do not put CSS IDs on every widget unless there is a specific need.

CSS IDs and CSS classes are for anchors, labelling, semantic mapping and maintainability. They must not be used as an excuse to style normal layouts with custom CSS. Styling must be controlled through Elementor's native section, container and widget controls.

## Why

HTML IDs should be unique on a page. Classes are better for reusable categorisation.

Barry uses:

- CSS IDs for unique anchors and top-level targeting
- CSS classes for field roles and repeatable targeting
- MCP element IDs for exact technical updates
- reference maps for long-term understanding

## Naming Format

Use lowercase kebab-case.

Good:

- `home-hero`
- `home-services-overview`
- `home-final-cta`
- `barry-field`
- `home-hero-heading`

Avoid:

- spaces
- random numbers unless needed
- vague names like `section-1`
- visual-only names like `blue-box`

## Section IDs

Top-level page sections should use CSS IDs.

Examples:

- `home-hero`
- `home-trust`
- `home-services`
- `home-process`
- `home-testimonials`
- `home-faq`
- `home-final-cta`

## Section Classes

Top-level sections should also use classes.

Examples:

- `barry-section`
- `barry-home-section`
- `barry-hero`
- `barry-services`
- `barry-cta-section`

## Field Classes

Important editable widgets should use classes, not usually IDs.

Examples:

- `barry-field`
- `barry-heading`
- `barry-copy`
- `barry-image`
- `barry-cta`
- `barry-service-card`
- `barry-testimonial`
- `barry-faq-item`

Page-specific field classes may be added:

- `home-hero-heading`
- `home-hero-copy`
- `home-hero-primary-cta`
- `home-service-card-title`
- `home-service-card-copy`

## Example Structure

Hero container:

- CSS ID: `home-hero`
- CSS classes: `barry-section barry-home-section barry-hero`

Hero H1:

- CSS classes: `barry-field barry-heading home-hero-heading`

Hero paragraph:

- CSS classes: `barry-field barry-copy home-hero-copy`

Hero button:

- CSS classes: `barry-field barry-cta home-hero-primary-cta`

Hero image:

- CSS classes: `barry-field barry-image home-hero-image`

## New Section Uniformity

When Barry creates a new standard content section inside an existing Elementor template, the section must match the template's existing section heading pattern.

For the current master Home Page, a standard section heading stack includes:

1. Blue bubble/eyebrow heading widget above the H2.
2. Main heading widget using the same third-party/template heading style as the other sections.
3. Intro/description text controlled by that heading widget where the template uses it.
4. Matching spacing between eyebrow, H2, separator and intro copy.

Do not create a new section with only a basic Elementor H2 if the surrounding template uses a separate eyebrow bubble and a third-party heading widget.

Preferred method:

1. Copy or recreate the closest existing section eyebrow widget.
2. Copy or recreate the closest existing section heading widget.
3. Change only the text, labels, CSS classes and client-specific content.
4. Keep typography, padding, separator, margins and mobile spacing aligned unless the user asks for a design change.
5. Label both widgets:
   - Eyebrow: `barry-field barry-heading [section]-eyebrow`
   - Heading block: `barry-field barry-heading [section]-heading`

If a new section looks visually different from neighbouring sections, treat it as incomplete until the heading stack and spacing are corrected.

## Documentation Requirement

Whenever Barry labels or updates a template page, update:

- `elementor/references/master-template-homepage-map.md`
- `elementor/references/master-template-naming-standard.md`

Each mapped item should include:

- Page
- Section name
- Purpose
- Elementor element ID
- CSS ID, if any
- CSS classes
- Widget type
- Editable field role
- Client data source
- Notes

## Workflow

1. Audit page structure with MCP.
2. Propose labels before changing large areas.
3. Apply labels section by section.
4. Open the published page in Chrome after changes.
5. Confirm layout still looks correct.
6. Update reference files.

## Confirmation Stops

Ask before:

- Labelling a live client site for the first time
- Renaming existing CSS IDs that may be used by anchors, CSS, or scripts
- Removing existing custom classes
- Changing forms, contact details, or tracking-related elements
