---
name: website-image-assistant
description: Use this skill when Barry needs to source, select, rename, optimize, upload, map, or write alt text for website images used in Elementor pages, including homepage and service page builds.
---

# Website Image Assistant

Use this skill for website image planning and preparation.

## Priority

1. Client-provided images
2. Approved internal image library
3. Free/Creative Commons images when no client images exist
4. Generated images only when appropriate and approved

## Rules

- Images must match the service and location context.
- Avoid generic or misleading stock images.
- Use descriptive SEO filenames.
- Write useful alt text.
- Resize images to fit existing Elementor/template containers.
- Keep images web-friendly and compressed where possible.
- Track source/attribution when required.

## Square Content Image Rule

For Home pages and service pages, paired-content images, process images, approach images, why choose / why trust images, inline support images, service support images, and square service-card image widgets must use square source assets.

- Prepare the uploaded/source file as 1000x1000 pixels unless a documented template slot explicitly requires another ratio.
- Do not place a landscape or portrait image into a square-looking widget and rely on CSS, Elementor object-fit, masks, or cropping to hide the mismatch.
- If the source is not square, crop/export a new 1000x1000 version before upload or placement.
- Never upload generated PNG/JPG files directly for content slots. Export the final production asset as a compressed `.webp` first, normally under 200 KB.
- Verify image dimensions before marking the page complete.

This rule does not apply to hero images, top-level section backgrounds, wide CTA/background bands, service-area landmark/location cards, or blog images when the template expects a landscape ratio.

## Background Image Rule

Hero images, top-level section backgrounds, overlay backgrounds, colour-band backgrounds, CTA background bands, and other full-width background image slots must use prepared landscape WebP files.

- Use 1920x1080 pixels unless a documented template slot explicitly requires another landscape size.
- Export as `.webp` before upload.
- Compress before upload.
- Target under 350 KB. Use 500 KB as the hard upper limit only when needed for acceptable visual quality.
- Do not use square, portrait, PNG screenshot, or large uncompressed files for background/overlay sections.
- Never upload multi-megabyte generated PNG/JPG files as website backgrounds. Convert and compress to `.webp` before upload.
- Do not rely on Elementor cover mode, CSS background-size, overlays, masks, or cropping to hide a wrong-ratio or oversized background asset.
- Verify dimensions, format, and file size before upload and before marking the page complete.

Background images and inline content images are separate asset types. Do not use a 1000x1000 content image as a background image.

## Filename Pattern

Use `.webp` for website uploads unless the user explicitly approves another format.

`service-location-context.webp`

Examples:

- `blocked-drain-cleaning-johannesburg-plumber.webp`
- `geyser-repair-pretoria-technician.webp`

## Alt Text Pattern

Describe the image naturally.

Example:

`Plumber clearing a blocked drain at a Johannesburg property`

## Output

Report:

- images selected
- image source
- filename
- alt text
- placement recommendation
- upload status
