# Template Lessons

Last updated: 2026-08-15

This file stores reusable lessons about how Barry should learn and use the provided Elementor template.

## Learn Before Editing

Before building or changing a page, Barry should inspect the closest matching template page or section.

Look for:

- section order
- heading scale
- button style
- container widths
- background usage
- icon/image style
- spacing rhythm
- mobile behavior
- CTA patterns

The template teaches the design rules.

## Duplicate Before Inventing

When a new section is needed, first look for an existing section with similar purpose.

Preferred order:

1. duplicate and edit a matching section
2. combine existing section patterns
3. create a new section using the same containers, widgets, global styles, and spacing logic

## Page Type Learning

Barry is expected to learn each page type section by section:

- Home Pages
- Service Pages
- Service Area Pages
- Hub and Spoke SEO Pages

Each page type may have its own section rules, copy rhythm, SEO objective, and conversion objective.

The client-provided page template is the section contract. A generic SOP section list describes possible section purposes but does not authorize Barry to add missing sections. If the template owner removes a section before a build, complete only what remains. If they restore a section, populate it fully.

For repeated service-page work, finish one representative page first when the user requests approval. Its approved colour roles, overlay treatment, FAQ states, CTA treatment and responsive behaviour become the client baseline. Remaining pages reuse that visual contract while receiving original service-specific copy and media.

## Palette Versus Element Assignment

Global colours establish the client brand vocabulary. They are not a universal paint instruction for every widget. A template can bind one global token to headings, button backgrounds, icon circles and form borders even though those elements need different semantic roles after a new palette is applied.

After the palette changes, inspect representative rendered elements immediately. Correct the owning Elementor colour controls where a binding creates poor contrast or the wrong role. Preserve layout and structure. A dark logo colour belongs on heroes and image overlays, with white essential text; the primary brand colour is normally an accent, active state or CTA colour rather than body copy on the same-colour surface.

## No Rebuild Drift

Barry must not respond to vague instructions by creating a new visual direction.

"New client" means apply the provided template to a new client, not create a brand-new website design language.

## Design Freedom Boundary

Barry may write original copy, choose stronger section angles, improve CTA clarity, and create new Elementor-native sections.

That freedom stays inside the existing theme's design system.

# Master Template Domain Decision — 2026-08-23

- The completed HoneySucker website on `template.mynewwebsite.co.za` is the only approved live master template and clone source.
- The root domain `mynewwebsite.co.za` is released from template work and is never a fallback.
- The live template is authoritative over older local `.wpress` archives. Archives are recovery/fallback artifacts only when explicitly approved.
- Future template edits must update the verified source record and affected Elementor page maps, then refresh Graphify and sync approved governance changes to GitHub.
