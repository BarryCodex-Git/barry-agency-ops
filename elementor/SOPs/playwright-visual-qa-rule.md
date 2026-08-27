# SOP: Playwright Visual QA Rule

Playwright is a visual QA and verification tool for Barry.

It is not Barry's primary website-building route.

Barry must continue to build and edit Elementor websites through Elementor-native controls and Elementor MCP wherever available.

## When To Use Playwright

Use Playwright after meaningful Elementor batches to check public rendered pages.

Playwright is useful for:

- desktop, tablet, and mobile screenshots
- spotting horizontal overflow
- spotting clipped text candidates
- checking whether the public page loads
- checking image crop/ratio problems
- checking whether visible sections still match the approved template style
- saving before/after visual evidence for QA
- checking colour contrast and interaction-state candidates after a palette change

## When Not To Use Playwright

Do not use Playwright to:

- bypass Elementor
- edit website content
- perform broad crawling without permission
- replace Elementor MCP verification
- take over the user's active Chrome profile
- log in to private dashboards unless the user explicitly asks and the Barry Chrome profile rule is satisfied

## Chrome Profile Boundary

For ordinary public-page visual QA, headless Playwright screenshots are allowed because no private browser profile or logged-in user state is required.

For authenticated WordPress, Elementor, GitHub, Google, or dashboard work, Barry must use the exact Barry Chrome profile rule from `AGENTS.md`.

Barry must not use Playwright to control the user's personal Chrome profile or whichever Chrome window the user is actively using.

## Standard Command

From the Barry workspace:

`npm run qa:visual -- https://example.com/page/`

The script saves desktop, tablet, mobile screenshots and a small JSON summary under:

`outputs/playwright-qa/`

Generated QA output is local and ignored by Git.

## QA Judgment

Playwright can flag likely issues, but Barry must still use human visual judgment.

Before signing off, Barry should inspect screenshots and check:

- image aspect ratios and crops
- hero/background framing
- square image slots
- text overlap
- broken mobile stacking
- button visibility
- template style consistency
- obvious spacing problems
- theme/page-title residue above the Elementor hero
- white text on every dark/image-overlay section
- visible, complete CTA labels and contrasting button states
- icon foreground/background contrast
- form background, field and border contrast
- FAQ normal, hover and active colours
- old-template hues or unexplained colours that remain after client branding

## Two-Pass Colour QA

Run one representative colour check immediately after the global palette is applied and read back. It covers the Home hero, one light section, one dark/image-overlay section, one icon treatment, CTA pair, form, FAQ states and footer/contact area. Correct mapped colour-role failures before broad page population.

Run the final responsive check after page content is complete. Review desktop and mobile screenshots plus meaningful hover/focus/active states. This second pass confirms the approved Home treatment and catches local widgets that do not inherit it correctly. It is not permission to change layout or structure.

## Rendered Component Match Receipt

When a page or template is instructed to match an already approved page, Barry must verify parity component by component. A palette-value scan, a search for old colour codes, or a single representative screenshot is not sufficient evidence.

Before reporting the styling complete, record for every unique repeated component pattern:

- the approved source page and component purpose;
- the target page and owning Elementor element IDs;
- the rendered background or overlay colour;
- the rendered heading, body, icon, border and button colours that apply;
- normal plus meaningful hover, focus, active or selected colours; and
- desktop and mobile results, including horizontal overflow.

The receipt must cover every in-scope target page. Do not infer that a supporting page passed because Home passed, or that a widget passed because its global token contains the intended hex value. The rendered target is authoritative.

Hard failure examples include same-colour foreground/background pairs, old-template interaction colours, blank or invisible labels, a light form panel where the approved component is dark, a non-dark image overlay, dark copy on a dark overlay, and a target component whose states differ from its approved source without a documented exception.

At least one screenshot must be visually inspected for each unique section or component pattern. Computed-style checks can support the receipt, but cannot replace the screenshot judgment. Barry must not claim completion while any receipt row is missing, failed or based only on source settings.
