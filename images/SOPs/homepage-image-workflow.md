# SOP: Homepage Image Workflow

Use this SOP when preparing images for a homepage build.

## Goal

Select, prepare, and map images that support the homepage content and SEO.

## Process

1. Check the client image folder first.
2. Check `assets/AI Images/` for `brand-image-rules.md`, approved AI image references, and generated client-specific images.
3. If AI image generation is needed, follow `images/SOPs/ai-client-image-generation.md`.
4. If the client provides an existing website, use it only for factual context and copy research. Never pull, download, copy, scrape, reuse, or recreate its image assets.
5. If no suitable client, approved AI, or brand-matched images exist, use relevant approved free/Creative Commons images automatically.
6. Identify required homepage image slots:
   - hero image/background
   - service cards
   - trust/process sections
   - final CTA, if needed
7. Select relevant images that match the specific service, not only the broad industry.
8. Resize and crop images to fit the existing template containers.
9. For process, why choose us, why trust us, paired-content, service support, and similar inline support-image widget placements, prepare the actual source/upload image file as 1000x1000 square unless the template slot explicitly requires another documented ratio.
10. Treat inline support-image widgets and section background images as separate asset types:
   - Inline support images: use a square source file, normally exactly 1000x1000 pixels. Do not rely on CSS, Elementor object-fit, masks, or visual cropping to make a non-square file appear square.
   - Section background images: use actual 1920x1080 landscape `.webp` files unless the template explicitly documents another landscape size.
   - Background/overlay images must be compressed before upload. Target under 350 KB; 500 KB is the hard upper limit only when needed for acceptable visual quality.
   - Do not use square, portrait, PNG screenshot, or large uncompressed files for background/overlay image slots.
   - Do not rely on Elementor cover mode, CSS background-size, overlays, masks, or visual cropping to hide a wrong-ratio or oversized background asset.
11. If the user asks to fix stretched, zoomed, or blurry background images, update only the relevant top-level section background assets unless they also ask to change inline image widgets.
12. Do not replace process, why choose us, why trust us, service-card, or other inline images when the instruction only refers to background images.
13. Rename images with SEO-friendly filenames.
14. Prepare alt text.
15. Compress/optimize before upload. Background images must be WebP and within the size target before upload.
16. Upload or prepare for upload.
17. Map image to Elementor field/class.
18. Before marking the page complete, verify:
   - content/support image files are square where the slot requires square
   - background/overlay image files are 1920x1080 landscape WebP where the slot requires a background
   - file sizes are web-friendly and not multi-megabyte uploads

## Avoid

- unrelated stock images
- fake team/job-site images that imply false claims
- oversized files
- missing attribution where required
- service-card images that do not visually match the named service
