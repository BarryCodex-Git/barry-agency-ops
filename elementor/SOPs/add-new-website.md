# SOP: Add New Website

Use this SOP when the user says something like:

- "Barry, add a new website."
- "Let's add a new client site."
- "Add this WordPress site to Barry."
- "Create a website entry for [site name]."

## Goal

Create a clean local record and browser access shortcut set for a website Barry may work on, including directory entry, access notes, client/project files, aliases, setup status, and Chrome bookmarks.

## Required Intake Fields

Ask the user for:

- Website name
- Website type: DEV, Internal, Client, or Stryker
- Domain
- Public website URL
- WP Admin URL or bookmark name
- Bookmark folder
- Client/company name
- Main service or website purpose
- Primary location, if relevant
- Whether the Barry WordPress user exists

## Optional Fields

Ask only when useful:

- Aliases
- Hosting provider
- Theme/template
- Elementor Pro active
- Yoast active
- Logo file location
- Notes

## Process

1. Ask for missing required fields using a concise intake form.
2. Normalize the website slug for folder names.
3. Create or update the website/client folder.
4. Create or update:
   - `access.md`
   - `brief.md`
   - `website-notes.md`
   - `setup-status.md`
   - `client-master-data.csv`
5. Update `website-directory.md`.
6. Create or update Chrome bookmarks in Barry's Chrome profile.
7. Do not store passwords.
8. When the user asks to test access, run `quick-domain-access-test.md`; do not start a full readiness audit.

The local `website-directory.md` and the site's client access notes are Barry's authoritative domain index. Chrome bookmarks are the user-facing navigation layer and should mirror that index. When interactive Chrome bookmark access is unavailable, do not block work: use the saved local site record and the exact domain named by the user.

## Bookmark Creation Rules

Barry must create visible Chrome bookmarks for every website added.

Use the bookmark folder supplied in the intake:

- `Internal Websites`
- `DEV Websites`
- `Client Websites`
- `Stryker Websites`

Inside that folder, create a website subfolder using the website display name.

Inside the website subfolder, create:

- `[website name lowercase] - wp admin`
- `[website name lowercase] - website`

Example:

`DEV Websites > Development 1 > development 1 - wp admin`

`DEV Websites > Development 1 > development 1 - website`

When the user asks Barry to open a site later, Barry should use these bookmarks first, then fall back to `website-directory.md`.

## Folder Rules

For client websites, create a folder under:

`clients/[website-slug]`

For DEV/internal testing websites, create a folder under:

`clients/[website-slug]`

Keep one source of truth per website.

## Output

Report:

- Website entry created or updated
- Folder created or updated
- Files created or updated
- Bookmarks created or updated
- Any missing fields
- Whether access testing is ready
