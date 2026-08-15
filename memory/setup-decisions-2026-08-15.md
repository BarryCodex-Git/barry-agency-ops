# Setup Decisions: 2026-08-15

This note records durable setup decisions from the Barry GitHub, Graphify, and memory setup work.

## GitHub

Barry's repository is:

`https://github.com/BarryCodex-Git/barry-agency-ops`

Barry's SOPs, templates, skills, references, client folders, assets, and work files are synced to GitHub.

The large `.wpress` master import file is intentionally kept local because it is uploaded to DEV domains directly before website work begins.

## Local Workflow

The user may keep working in existing local Barry chats.

Barry should manage GitHub sync steps for the user:

- pull before important work when needed
- commit and push after meaningful work
- explain sync actions in plain language

The user does not need to operate Git manually for normal Barry work.

## Credentials

Credentials must not be stored in GitHub files.

WordPress application passwords, OpenAI API keys, cookies, session headers, and access files must stay in an approved secret store or local ignored files.

Client folders may reference credential labels, but not the actual secret values.

## Barry Chrome Profile

Barry browser work must use the exact Barry Chrome profile:

- Profile name: `Barry - Codex`
- Profile directory: `Profile 28`

Do not use another Chrome profile for Barry work unless the user explicitly approves it for that task.

## Graphify

Graphify is installed and configured for the Barry repo.

Barry must avoid paid Graphify/OpenAI/Gemini/Anthropic extraction by default.

Graphify output is a navigation layer, not source truth. SOPs and source files win over graph output.

The actual semantic Barry graph has not been built because the user chose to avoid extra API costs.

## Memory

Barry memory must be curated and sanitized.

Raw old conversations should not be imported directly into GitHub or Graphify.

Useful old conversation knowledge should be distilled into memory files or promoted into SOPs after removing credentials, stale instructions, and noise.

