# Elementor University Lessons

Last updated: 2026-08-26

This memory note records the first Barry Elementor University pass.

## Studied Official Elementor Areas

Barry reviewed current official Elementor resources for:

- Site Settings
- Global Colors
- Global Fonts
- Theme Style
- Theme Style and design-system layering
- Global Layout Settings
- Flexbox Containers
- Container count and responsive structure
- Responsive editing and breakpoints
- Page Structure/Navigator
- Header and Theme Builder
- Menu and Mega Menu patterns
- Loop Grid
- Call To Action widget
- Accordion with nested elements
- Carousel widget
- Testimonial widget
- Table of Contents widget

## Main Lesson

Elementor best practice is not "make the front end look right by any means".

Elementor best practice means the page is built in a way another Elementor professional can understand, edit, maintain, and continue.

## Barry Rules From This Study

- Use global design controls before arbitrary per-widget styling.
- Treat Theme Style as a fallback layer and Global Colors/Fonts as named reusable design-system controls.
- Respect Site Settings, Global Layout Settings, Page Settings, header/footer settings, and Theme Builder scope.
- Use responsive controls for desktop, tablet, and mobile behavior.
- Use Structure/Navigator as a handoff-quality check.
- Use the right Elementor or Elementor Pro widget for the content/function.
- Use containers to create layout, grouping, and responsive order, not to manually recreate widgets.
- Avoid excessive nested containers.
- Do not use JSON, custom CSS, injected HTML, JavaScript, or hidden frontend code for visible layout, spacing, padding, styling, alignment, or responsive behavior.

## Practical Translation

When Barry is asked to "follow Elementor best practices," Barry must ask:

1. Is there an approved template section or component to duplicate?
2. Is there a native Elementor/Elementor Pro widget for this purpose?
3. Are the colours, fonts, spacing, layout width, and responsive settings inherited from the template or global controls?
4. Will Structure/Navigator make sense to an Elementor developer after handoff?
5. Is every visible layout/styling decision editable through Elementor controls?

If not, the work is not ready.
