# Barry Chrome Setup

Barry's dedicated Chrome profile is:

`Profile 28`

Visible Chrome profile name:

`Barry - Codex`

Google account:

`barendhendriks1996@gmail.com`

## Rules

- Barry must only use this Chrome profile.
- Barry must not use other Chrome profiles.
- WordPress login bookmarks should be stored in Barry's Chrome bookmark folders.
- Client setup tasks should look for the specified website name or domain inside the relevant bookmark folder.

## Bookmark Folders

Barry's Chrome profile uses this bookmark structure:

- `Internal Websites`
- `DEV Websites`
- `Client Websites`
- `Stryker Websites`

Each website should have a subfolder inside the relevant bookmark folder.

Required bookmark naming convention:

- `[website name lowercase] - wp admin`
- `[website name lowercase] - website`

Example:

`DEV Websites > Development 1 > development 1 - wp admin`

`DEV Websites > Development 1 > development 1 - website`

## Website Lookup Logic

Barry should not require exact bookmark names.

When the user asks Barry to open a site, Barry should:

1. Interpret the requested site name from the user's wording.
2. Choose the most likely bookmark folder from the task context.
3. Search that folder first, then the other Barry bookmark folders.
4. Prefer WP Admin/login bookmarks for WordPress/Elementor/plugin/theme work.
5. Prefer public site bookmarks for review/checking tasks.
6. Proceed when there is one clear match.
7. Ask the user to choose when multiple matches are plausible.

Use `DEV Websites` for testing and skill development.

Current test site:

- `my new website`

## Troubleshooting

If Chrome control fails:

1. Close all Chrome windows.
2. Open only the `Barry - Codex` Chrome profile.
3. Confirm the Codex Chrome Extension is enabled in that profile.
4. Confirm Codex shows Google Chrome as `Connected`.
5. Restart Codex if the connector still does not respond.
6. Check the native messaging host registration. Chrome can show the extension as connected while Codex still cannot control Chrome if the Windows native host manifest is missing.

Known issue from first setup:

- Codex diagnostics may fail to inspect Chrome profile folders because of filesystem sandbox permissions, even when the folders exist.
- Do not assume `User Data` is missing just because a diagnostic reports it as unavailable.

Known issue from 2026-06-19:

- Chrome extension bundle updated to `26.616.31447`.
- Browser bridge failed with `CreateProcessAsUserW failed: 5`.
- Native host diagnostic reported missing registry/manifest:
  - Registry key missing: `HKCU\Software\Google\Chrome\NativeMessagingHosts\com.openai.codexextension`
  - Manifest missing: `C:\Users\USER\AppData\Local\OpenAI\extension\com.openai.codexextension.json`
- This means the Chrome extension may appear installed/connected, but Codex cannot control Chrome until the Codex Chrome Extension native host is reinstalled/registered.
- Do not manually run plugin repair/install scripts from Barry. Reinstall or repair the Chrome plugin from the Codex plugin UI so the native host manifest and registry key are recreated correctly.

## Verified Status

Verified on 2026-06-12:

- Codex browser-control runtime starts successfully.
- Codex can connect to the Chrome extension.
- Codex can see open Chrome tabs.
- Barry Chrome profile remains `Profile 28` / `Barry - Codex`.
