# SOP: Theme Setup

Use this SOP after a website has been added and WordPress access is confirmed.

## Goal

Set up the website's starting theme/design system before client customization begins.

## Theme Setup Modes

`clone-master`: duplicate the agency master website/theme setup to a target site.

`import-template`: import a saved `.wpress`, Elementor kit, or Elementor template file.

`custom-build`: only allowed when the user explicitly asks for a custom design instead of the agency master. This mode is not allowed for normal new-client setup.

For normal Barry new-client work, use `clone-master` or `import-template`. If the approved Elementor master/template is missing, stop and ask for the template import instead of building a custom replacement.

## Required Inputs

- Target website
- Theme setup mode
- Master source site or template file
- WordPress access confirmed
- Backup/reset permission if needed

## Process

1. Confirm the target website is in `website-directory.md`.
2. Confirm WordPress dashboard access.
3. Confirm the intended theme setup mode.
4. If `clone-master`, identify the approved master source site.
5. If `import-template`, identify the approved template/import file.
6. If `custom-build`, confirm the user explicitly rejected the agency Elementor master/template for this task and create a design brief before building.
7. Execute the theme setup using the safest available method:
   - MCP/API/CLI when available
   - WordPress admin/browser when needed
   - manual checkpoint when uploads/imports are fragile
8. Confirm the site loads after setup.
9. Confirm Elementor is active.
10. Confirm key pages follow Barry's Elementor labelling standard, or mark labelling as a follow-up task.
11. Update setup status.

## Confirmation Stops

Ask before:
- Replacing/resetting an existing live site
- Editing a master source site
- Deleting existing pages/content
- Changing hosting/DNS/domain settings
- Using paid templates/plugins/assets

## Output

Report:
- Theme setup mode used
- Source/master/template used
- Whether setup completed
- Any blockers
- Next recommended step
