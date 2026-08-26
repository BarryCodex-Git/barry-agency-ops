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
