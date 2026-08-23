# SOP: Graphify Project Memory Rule

Barry uses Graphify as a project-memory map for the Barry repository.

Graphify helps Barry find relationships between SOPs, templates, skills, client notes, reference maps, and work files faster. It is a navigation layer, not the final source of truth.

## When Barry Should Use Graphify

Use Graphify before broad or unclear work such as:

- finding which SOP controls a page type
- locating the right Elementor template map
- understanding how Barry's SOPs, skills, and references connect
- continuing work after a long gap
- checking which client folder or work file relates to a task
- answering project-structure questions
- reducing repeated file searching across the Barry repo

When `graphify-out/graph.json` exists, Barry should prefer scoped Graphify queries such as:

- `graphify query "Which SOP controls service page builds?"`
- `graphify explain "Barry Elementor Operating Standards"`
- `graphify path "website-build-pipeline" "service page SOP"`

## Runtime Bootstrap Rule

Graphify is a local repository knowledge graph, not a remote MCP connection. A missing shell `PATH` entry does not mean the graph or runtime is unavailable.

Before querying or updating Graphify, run:

`scripts/ensure-graphify-runtime.ps1`

The helper must resolve the saved interpreter first, then the bundled Codex Python runtime, then an available system Python. It also resolves the Graphify command wrapper and restores `graphify-out/.graphify_python` and `.graphify_root` when a desktop session has lost them.

Use `scripts/invoke-graphify.ps1` for normal `query`, `path`, `explain` and other command calls so Graphify does not depend on a global shell `PATH` entry.

If `graphify-out/graph.json` exists and the bootstrap helper succeeds, Barry must use the graph. Do not report Graphify as disconnected merely because `Get-Command graphify` returns nothing.

## What Graphify Does Not Replace

Graphify does not replace:

- reading the actual SOP before acting
- checking current client files
- verifying Elementor structure
- verifying rendered frontend
- checking exact credentials through the approved secret store
- user approval for high-impact actions

Graphify can show likely relationships, but Barry must still open and verify the source file before making decisions.

## Source-Truth Rule

If Graphify and a source file disagree, the source file wins.

If Graphify output looks stale, incomplete, or surprising, Barry must verify against the repo files before acting.

## Update Rule

After meaningful SOP, template, skill, or project-structure changes, Barry should refresh the graph.

For small code-only changes, `graphify update .` may be enough.

For SOP/document changes, a full Graphify extraction may require an approved LLM backend key. Do not store that key in GitHub files.

Barry must avoid paid Graphify API usage by default. Do not run Graphify commands that require OpenAI, Gemini, Anthropic, Kimi, DeepSeek, or another paid/hosted LLM backend unless the user explicitly approves that cost for the current task.

For no-cost use, Barry may use Graphify's local/code-only features where they are useful. Barry may also keep the project Graphify skill installed so future graph use is ready.

Markdown headings and code structure can be refreshed locally without a paid backend. Use that deterministic structural extraction after approved SOP and memory changes when it captures the required rules. Record clearly when the refresh is structural rather than semantic.

Run `scripts/refresh-graphify-structural.ps1` for this no-cost structural refresh. It rebuilds the graph, report, community labels, HTML and structural manifest using the current repository files and records zero hosted-LLM token usage.

If the user later approves paid graph extraction, the preferred backend variable is `OPENAI_API_KEY`, stored as a secure local or cloud environment secret.

Local setup helper:

- `scripts/set-graphify-openai-key.ps1` sets the key for a session or Windows user environment, only after user approval.
- `scripts/build-graphify-barry-graph.ps1` builds the Barry graph after the key is available and paid extraction is approved.

Do not paste OpenAI keys into normal chats, SOP files, client notes, commits, screenshots, or GitHub files.

## Security Rule

Do not include secrets, access files, cookies, session headers, or raw credentials in Graphify output.

Graphify must respect `.graphifyignore`, `.gitignore`, and Barry's credential rules.
