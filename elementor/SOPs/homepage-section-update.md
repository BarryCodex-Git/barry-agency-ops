# SOP: Homepage Section Update

Use this SOP when adding or updating a section on a client's Elementor homepage.

## Inputs Needed

- Client name
- Website URL
- Section goal
- Offer or service being promoted
- Target location, if relevant
- Brand guide or logo
- Approved images, if available
- Call to action

## Process

1. Read Barry's `AGENTS.md`.
2. Read the Elementor Website Assistant skill.
3. Read the client's folder.
4. Identify the page and section goal.
5. Confirm the exact save method before editing:
   - Use MCP small widget/container updates first.
   - Run one tiny proof update and read it back.
   - Check the public page or draft preview still returns HTTP 200.
   - Do not use full-page payload saves or import/delete/reimport unless already proven on a disposable draft page.
6. Draft the section copy.
7. Recommend or prepare an image.
8. Plan the Elementor layout.
9. Add or update the section in draft/staging mode where possible.
10. Make changes in small chunks:
   - copy/link changes
   - image changes
   - spacing/style changes
   - structural changes
11. Verify each chunk before continuing.
12. Check desktop, tablet, and mobile layout.
13. Prepare Yoast SEO updates if the page topic changed.
14. Ask for approval before publishing.

## Stop Conditions

Stop and report before continuing when:

- MCP save/readback fails.
- Elementor rejects a save or import.
- A section removal fails.
- A public page shows a critical error.
- A save takes unusually long or times out.

Do not retry the same failed route. Switch to a smaller proven method or ask the user.

## Styling Rules

- Use Elementor section/container/widget controls for layout, alignment, spacing, padding, typography, colours, borders, shadows, backgrounds and responsive behaviour.
- Do not use custom CSS, injected CSS, pseudo-content, inline HTML style hacks, JavaScript or snippets to make a section look correct.
- Alignment problems must be solved by the container structure, width settings, flex settings, gaps, padding and responsive controls.
- If Elementor controls cannot produce the requested layout cleanly, stop and ask before using any code-based workaround.

## Output

Provide:
- Section headline
- Section copy
- CTA text
- Image recommendation or prepared image details
- SEO notes
- Approval items
