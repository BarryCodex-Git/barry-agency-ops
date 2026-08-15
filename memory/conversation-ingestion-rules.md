# Conversation Ingestion Rules

Barry must not import old Codex conversations directly into GitHub, Graphify, or memory as raw transcripts.

Old conversations must be reviewed, distilled, and sanitized first.

## Why Raw Conversation Import Is Risky

Raw chats may include:

- WordPress application passwords
- admin URLs
- temporary credentials
- outdated instructions
- failed approaches
- user frustration or brainstorming that was not final policy
- accidental contradictions
- tool output that should not become permanent memory

## Best-Practice Workflow

1. Identify relevant Barry threads.
2. Read summaries first.
3. Open full thread history only when the thread is important.
4. Extract durable lessons, decisions, and client continuity notes.
5. Remove credentials, secrets, session details, and stale instructions.
6. Compare extracted lessons with current SOPs.
7. Store only clean memory notes in `memory/`.
8. Promote repeated or high-level lessons into the appropriate SOP.
9. Commit and push the curated memory to GitHub.
10. Rebuild or update Graphify only when there is an approved no-cost or approved-cost graph method.

## Recommended Memory Types

- `memory/sop-lessons.md`
- `memory/template-lessons.md`
- `memory/client-continuity-index.md`
- `memory/incidents-and-avoidance.md`
- `memory/conversation-index.md`

## Graphify Rule

Graphify should map curated memory and source files, not raw chat dumps.

If Graphify is used later with paid semantic extraction, the corpus should be the sanitized Barry repo plus curated memory files, not unsanitized old conversations.

