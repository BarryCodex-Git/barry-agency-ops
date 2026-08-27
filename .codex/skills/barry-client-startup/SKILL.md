---
name: barry-client-startup
description: Start or resume Barry client WordPress and Elementor template-publishing work. Use only in the Barry project for new-client setup, client-site editing, service-page publishing, or resuming an existing Barry website build; never use for Clive or unrelated projects.
---

# Barry Client Startup

Prevent client work from beginning on stale, partial, or missing Barry guidance.

## Scope and identity

- Apply only when the active project/git root is exactly `C:\Users\USER\Documents\Codex\Barry`.
- Never import Barry instructions into `C:\Users\USER\Documents\Codex\Clive` or another project.
- If the root is wrong, stop before any external mutation and ask the user to open or re-root the task to the Barry folder.

## Fail-closed preflight

Before the first website mutation on every new or resumed client build:

1. Run `scripts/barry-preflight.ps1`, passing the client folder name when known. Stop if it fails.
2. Read the root `AGENTS.md` and obey its current routing rules.
3. Check the Barry repository state and remote without overwriting, resetting, stashing, or discarding user work.
4. Run `scripts/ensure-graphify-runtime.ps1`, then query the existing graph through `scripts/invoke-graphify.ps1` for the current page type, template-replacement rules, copy, image, SEO, Elementor, efficiency, and known incident guidance.
5. Read the controlling SOPs and skills returned by routing directly. At minimum for a new-client Elementor conversion, read:
   - `elementor/SOPs/always-read-elementor-rules.md`
   - `elementor/SOPs/template-content-replacement-guardrails.md`
   - the applicable new-client/page-type SOP or skill
   - `content/SOPs/local-service-seo-copywriting.md` before client-facing copy is written or published
6. Read the relevant client folder, intake, approved logo/palette facts, service list, locations, and available media.
7. State the operating mode. Default new-client mode is template content replacement and hub-and-spoke publishing, not redesign. A design or structural change requires the user's explicit request or approval.
8. Emit this receipt before mutation:

   `Barry Preflight Receipt`
   - `Root:` verified Barry path
   - `Graphify:` exact query completed
   - `SOPs:` exact authoritative files read
   - `Client:` folder/intake checked
   - `Mode:` template replacement or explicitly approved design change
   - `Palette:` logo-derived global palette will be set/read back before page editing
   - `First mutation:` one small, bounded update

Do not proceed if the receipt is incomplete.

## Execution invariants

- Preserve the imported template's structure and styling unless the user explicitly requests or approves a named change.
- Set and verify the logo-derived Elementor global palette first, using the approved non-browser route when available.
- Work in small, mapped batches. Never send a large full-page edit payload.
- Replace only client-facing copy, media, links, contact details, SEO/schema fields, and approved duplicated page content in ordinary template-replacement mode.
- Do not touch protected forms or template mechanics unless explicitly instructed.
- Use Chrome only when the task genuinely requires the approved Barry profile and access is available; prefer the relevant MCP/API path.

## Durable learning

Conversation history is evidence, not automatic cross-task memory. At the end of a major build or review, promote only reusable lessons into the authoritative Barry SOP or curated `memory/` file, update Graphify, and commit/push the Barry repository when authorized. One-off client preferences remain in that client's folder.
