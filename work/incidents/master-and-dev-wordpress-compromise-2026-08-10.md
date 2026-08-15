# WordPress Master and DEV Compromise — 2026-08-10

## Scope

- `mynewwebsite.co.za` (`/home/mynewwebsite/public_html`)
- `dev1.mynewwebsite.co.za`
- `dev2.mynewwebsite.co.za`
- `dev4.mynewwebsite.co.za`
- `dev7.mynewwebsite.co.za`
- `dev8.mynewwebsite.co.za`

## Confirmed indicators

- Unauthorized master-site administrator `wp2_5a7c65` using `wp2_5a7c65@wp2shell.invalid`.
- Unauthorized DEV2 administrator `yun_11` using `yun_11@wp2shell.invalid`.
- Repeated injected `wk/index.php` directories throughout WordPress core, `wp-content`, site roots, and `cgi-bin` on all six installations.
- WordPress core checksum failures caused by the injected files.

## Remediation completed

- Quarantined and removed all matching injected `wk` directories from the web roots.
- Removed all users matching `*@wp2shell.invalid` and reassigned any content to a legitimate administrator.
- Reinstalled clean WordPress 7.0.3 core files on every installation with `wp-content` preserved.
- Ran database upgrades and core checksum verification.
- Patched the security-relevant Addon Elements, Elementor, and Google Reviews plugins.
- Preserved each active theme and all Elementor content, uploads, forms, and site data.
- Rotated WordPress authentication salts on every installation.
- Set `DISALLOW_FILE_EDIT` to `true` on every installation.
- Removed stale maintenance markers and flushed WordPress caches.

## Recovery material

Server-side recovery and evidence are stored outside the web roots at:

`/home/mynewwebsite/security-quarantine-20260810`

The directory contains database exports, pre-update plugin/theme archives, pre-hardening `wp-config.php` copies, and quarantined indicators. Permissions were restricted to the hosting account.

## Verification

- No remaining `*/wk/index.php` files were found in the six scoped installations.
- No remaining users matched `*@wp2shell.invalid`.
- WordPress core 7.0.3 is installed on all six sites.
- Expected active themes remain selected.
- All sites were out of maintenance mode.
- All six public homepages returned HTTP 200 after cleanup and hardening.
- No public page showed WordPress critical-error, fatal-error, parse-error, or database-connection-error text.
- Barry's master-site application-password authentication remained operational.

## Notes

- `wp-admin/error_log` on DEV1 and DEV4 remains as an ordinary server log and is the only non-core checksum warning observed after malware removal.
- PHP files under uploads were inspected by path and were standard plugin/cache protection files.
- The common signature match was an Elementor MCP unit-test fixture, not an active shell.
