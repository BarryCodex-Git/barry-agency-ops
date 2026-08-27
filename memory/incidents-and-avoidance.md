# Incidents and Avoidance

Last updated: 2026-08-27

This file records problems Barry must avoid repeating.

## Problem: Barry Instructions Not Loaded At Task Start

Risk: a sidebar project can be named `Barry` while its actual root is the parent `C:\Users\USER\Documents\Codex`. Codex then does not discover Barry's repository `AGENTS.md` or project-local skills. A large `AGENTS.md` can also be truncated at the default project-instruction byte limit, cutting off later startup rules. Barry may consequently begin from generic behavior despite correct SOPs existing on disk.

Avoidance rule: Barry tasks must be rooted exactly at `C:\Users\USER\Documents\Codex\Barry`. Keep the identity/startup gate at the top of `AGENTS.md`, maintain a project instruction budget large enough to load the complete file, run `scripts/barry-preflight.ps1`, query Graphify, read the routed SOPs directly, and emit the Barry Preflight Receipt before any client-site mutation. Barry's bootstrap remains project-local and must never be applied to Clive.

## Problem: Working Outside Elementor

Risk: the page becomes hard for a human Elementor designer to edit.

Avoidance rule: visible page design must be made through Elementor controls unless the user approves a separate technical fix.

## Problem: Rebuilding Instead of Adapting

Risk: Barry drifts away from the provided template and creates a different website style.

Avoidance rule: duplicate, adapt, and extend the imported template. Do not redesign the site from scratch.

## Problem: Huge Payload Updates

Risk: site updates fail, hang, or cause loops.

Avoidance rule: work in small batches and verify after each batch.

## Problem: Workaround Loops

Risk: a failed batch leads to increasingly messy fixes.

Avoidance rule: when a method fails, reduce scope and return to Elementor-native editing.

## Problem: Secret Leakage

Risk: WordPress application passwords or API keys could be exposed in GitHub or memory files.

Avoidance rule: never store actual secrets in repo files. Store only safe labels that point to an approved secret store.

## Problem: Raw Conversation Memory

Risk: old chats may contain outdated instructions, mistakes, credentials, or half-finished ideas.

Avoidance rule: only selected, sanitized, user-approved lessons become memory.

## Problem: Landscape Assets In Square Paired-Content Sections

Risk: a 1920x1080 hero asset placed in a two-column inline image widget can look acceptable in some cropped states but appears visibly landscape, unbalanced and poor on desktop. A square Elementor frame is not proof that the source file is square.

Avoidance rule: audit the actual media dimensions across all repeated paired text/image sections on Home, Services, Service Areas, About and individual service pages. Inline paired-content sources must be genuine 1000x1000 WebP files. Hero and background assets remain separate 1920x1080 files and must never be reused in these widgets.

## Problem: Saving Pending Previous-Client Menu Items

Risk: WordPress menu items marked `Pending` are unsaved, but clicking `Save Menu` publishes them. Imported-template service names and custom links can therefore reintroduce old-client residue even when the current public menu is clean.

Avoidance rule: audit the complete menu form by label, URL, item type and parent before saving. Remove all inherited items first. If the approved public menu is already correct and unwanted items exist only as pending browser state, discard the unsaved state instead of saving it. Verify the published desktop and mobile navigation after every legitimate menu save.
