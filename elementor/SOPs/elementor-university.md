# SOP: Elementor University

Barry uses this SOP to keep improving as an Elementor-first website builder.

Elementor University means Barry studies Elementor's official documentation and applies it through the Barry template system.

Official Elementor guidance improves Barry's judgment. It does not override Barry's approved template, Elementor MCP-first workflow, small-batch rule, human handoff rule, or the user's direct SOPs.

## Official Source Set

Barry should prefer official Elementor sources when learning Elementor best practice:

- Elementor Site Settings: `https://elementor.com/help/site-settings/`
- Theme Style and design system layers: `https://elementor.com/help/how-elementors-theme-style-and-design-system-options-work-together/`
- Global Colors: `https://elementor.com/help/view-and-edit-global-colors/`
- Global Fonts: `https://elementor.com/help/view-and-edit-global-fonts/`
- Theme Style: `https://elementor.com/help/theme-style-global-settings/`
- Global Layout Settings: `https://elementor.com/help/global-layout-settings/`
- Flexbox Containers: `https://elementor.com/help/how-do-flexbox-containers-work/`
- Container count and responsive structure: `https://elementor.com/help/how-many-containers-page/`
- Responsive editing and breakpoints: `https://elementor.com/help/mobile-editing/`
- Page Structure/Navigator: `https://elementor.com/help/navigator/`
- Header/Theme Builder: `https://elementor.com/help/header-site-part/`
- Menu/Mega Menu: `https://elementor.com/help/create-mega-menu/`
- Loop Grid: `https://elementor.com/help/loop-grid/`
- Call To Action widget: `https://elementor.com/help/call-to-action-widget/`
- Accordion with nested elements: `https://elementor.com/help/accordion-widget-with-nested-elements/`
- Carousel widget: `https://elementor.com/help/carousel-widget/`
- Testimonial widget: `https://elementor.com/help/testimonial-widget/`
- Table of Contents widget: `https://elementor.com/help/table-of-contents-pro/`

## What Barry Learned

Elementor Site Settings are the central place for site-wide controls, including global fonts, global colors, Theme Style, layout, site identity, header/footer access, backgrounds, lightbox, page transitions, and related site-level controls.

Theme Style provides broad fallback styling for HTML elements. Global Colors and Global Fonts sit above Theme Style as named design-system settings that can be reused across widgets and changed centrally later.

Elementor containers are layout boxes for widgets and nested containers. Nested containers are valid when the layout genuinely needs them, but they are not the default answer for every design problem.

Responsive editing is controlled inside Elementor. Device-specific controls should be used intentionally, and wider-device changes can affect narrower-device behavior.

Structure/Navigator exists so Elementor designers can select and maintain page elements. A page that looks correct on the front end but is confusing or overbuilt in Structure is not a clean handoff.

Elementor Pro widgets exist to solve specific design/content jobs. Barry should use the correct widget when it fits the content purpose instead of recreating the widget manually with stacked generic containers.

## University Rule

When the user says "Elementor best practices," Barry must interpret that as:

- use the correct Elementor widget for the job
- use existing global colors and global fonts where appropriate
- understand Theme Style before changing broad defaults
- respect global layout settings and page settings
- use responsive controls rather than code workarounds
- preserve header, footer, mobile header, menu, and Theme Builder scope unless approved
- build clean Structure/Navigator handoff
- keep visible layout, spacing, styling, padding, and responsive behavior inside Elementor controls
- avoid custom CSS/code/JSON layout shortcuts

## Widget-First Rule

Before building a visual/content pattern from containers, Barry must ask:

1. Is there an existing template section or component that already solves this?
2. Is there a native Elementor or Elementor Pro widget built for this purpose?
3. Would a human Elementor designer expect this to be a widget, not nested containers?
4. Would using the widget make Structure/Navigator cleaner?
5. Would the widget preserve responsive controls and future maintainability better?

If the answer points to a widget, Barry must use the widget.

Examples:

- Use Icon Box or Image Box patterns for simple icon/image + title + text blocks when the template uses that pattern.
- Use Call To Action widget or the template's approved CTA component for CTA cards where appropriate.
- Use Accordion/Toggle widgets for FAQ or collapsible content instead of hand-built show/hide structures.
- Use Loop Grid/Loop Carousel and template loop items for post/service grids when the site uses dynamic listing patterns.
- Use Menu/Mega Menu widgets for navigation instead of rebuilding menu layouts manually.
- Use Testimonial/review widgets or approved Trustindex/review integrations when the section is a testimonial pattern.
- Use Table of Contents where long hub/spoke content needs navigable heading links.

Containers are for layout. Widgets are for content/function.

Do not recreate a widget's job with container-inside-container structures unless the template already uses that pattern or the design truly requires custom composition.

## Container Discipline

Nested containers are allowed only when they create clearer Elementor structure, responsive ordering, grouped styling, or necessary layout control.

Barry must not add containers inside containers inside containers merely to recreate something Elementor already provides as a widget or template component.

Before adding a nested container, Barry must identify the purpose:

- grouping related content
- row/column layout
- responsive stacking or ordering
- shared background/border/spacing
- repeating card/item structure
- alignment control that cannot be handled by the existing widget/container

If the purpose is unclear, do not add the container.

## No JSON Or Code Styling Rule

MCP/API/JSON may be used only as a bridge to read or update Elementor-native settings.

Barry must not use JSON, raw Elementor data, custom CSS, injected HTML, JavaScript, shortcode workarounds, or hidden frontend code to create visible layout, spacing, styling, padding, alignment, or responsive behavior.

If an Elementor setting is changed through MCP, the result must still be a normal Elementor control a human designer can open and edit.

## Handoff Gate

Before sign-off, Barry must be able to say:

- the structure uses appropriate Elementor widgets and containers
- unnecessary nesting was avoided
- global design settings were respected
- page settings and layout settings were not changed outside scope
- mobile/header styling was checked where relevant
- all visible layout and styling remain editable in Elementor
