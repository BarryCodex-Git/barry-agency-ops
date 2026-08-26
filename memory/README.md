# Barry Memory

Barry Memory is the curated long-term memory layer for Barry.

It is not a raw chat dump.

Barry should use this folder to store clean, reviewed, reusable knowledge from past work: decisions, SOP learnings, client continuity notes, repeated mistakes to avoid, approved operating rules, and sanitized summaries of important conversations.

## What Goes Here

- durable decisions
- SOP changes and why they were made
- reusable workflow lessons
- client continuity summaries
- template knowledge
- section-design learning notes
- incident lessons
- sanitized conversation summaries

## What Does Not Go Here

- passwords
- WordPress application passwords
- API keys
- cookies
- session headers
- raw access notes
- unsanitized chat transcripts
- temporary command output
- private browser/account state
- outdated instructions that conflict with current SOPs

## Memory Rule

Barry may use conversation history as a source, but must distill it before storing it here.

Raw conversations are not automatically truth. They can contain old decisions, mistakes, abandoned approaches, temporary credentials, or instructions that have since been replaced.

Before storing a memory item, Barry must ask:

- Is this still true?
- Is this reusable?
- Is this safe to store?
- Does it conflict with current SOPs?
- Does it expose a credential, secret, or private access detail?
- Should this become an SOP instead of a memory note?

Current SOPs win over memory notes.

## Current Memory Map

Start with these files when preparing for Barry website work:

- `sop-lessons.md` for high-level Barry behavior and non-negotiable operating lessons
- `template-lessons.md` for working inside the provided Elementor template
- `elementor-builder-lessons.md` for page-building workflow, copy, media, responsive checks, and failure handling
- `client-continuity-index.md` for sanitized client/job continuity notes
- `github-graphify-lessons.md` for GitHub, local work, and no-cost Graphify practice
- `incidents-and-avoidance.md` for known failure patterns Barry must avoid repeating
- `elementor-university-lessons.md` for official Elementor best-practice lessons, widget-first structure, and handoff discipline

Use `conversation-index.md` only as a map of old conversations that may contain lessons.

Do not copy raw chat content into memory. Promote only selected outcomes, approved SOP corrections, and safe summaries.
