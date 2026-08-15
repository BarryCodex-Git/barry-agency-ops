# SOP: AI Client Image Generation

Use this SOP when Barry needs to create AI-generated images for a client website, homepage section, service card, service page, or supporting visual.

## Goal

Create relevant, brand-safe, locally believable, photorealistic website images while keeping usage controlled and ensuring every client has a reusable style reference.

## Client Folder Standard

Use one simple folder:

`Barry/clients/[client-name]/assets/AI Images/`

This folder may contain:

- `brand-image-rules.md`
- `brand guide/`
- reference images
- real client images used for inspiration
- generated drafts
- approved final images
- optional `image-plan.md`

`brand guide/` is the preferred folder for manually supplied inspiration images, colour references, vehicle/team examples, service photography references, and approved client visual style examples.

Do not create extra subfolders unless the client image library becomes large enough to need them. The standard exception is `brand guide/`, which Barry may create or use when the user provides visual references.

## Required First Step

Before generating any image:

1. Inspect the client folder.
2. Inspect `assets/AI Images/`.
3. Inspect `assets/AI Images/brand guide/` if it exists.
4. Read `assets/AI Images/brand-image-rules.md` if it exists.
5. Check whether approved AI images or reference images already exist.
6. Prefer `brand guide/` examples, approved AI style references, and real client assets before creating a new style.

## Brand Guide Folder

When `assets/AI Images/brand guide/` exists, use it as the main visual reference set before generating images.

Look for:

- real client vehicles
- real uniforms, caps, and clothing
- real equipment and service setups
- existing service photography
- preferred colour balance
- location and property context
- examples of image style the user wants repeated

Use these files as inspiration for style, colours, realism, composition, and industry accuracy. Do not directly copy real people, real faces, or private client/customer scenes into generated images.

## Approval Workflow

When the user gives an instruction to generate images:

1. Generate one single image first.
2. Show the full generated image in the Codex thread for user approval.
3. Open the generated image in the Barry Chrome profile only if the user asks, if browser review is needed, or if the in-thread preview is not sufficient.
4. Ask for style approval.
5. If denied, read the user's comments carefully and regenerate one revised image.
6. Repeat single-image revisions until approved.
7. Once approved, store the approved image in `assets/AI Images/`.
8. Treat that approved image as a future style reference for the client.
9. Once the first image style is approved, generate the remaining images for that same page in a controlled batch.
10. The user does not need to approve every single image in the batch.
11. If the user flags a specific image after the batch, revise that one image rather than restarting the whole batch.

If the style direction is unclear, ask for style approval before generating a batch.

## Batch Rules

- Do not generate a full image set before style approval.
- After one approved style image, generate only the images needed for the current page.
- For later pages, check whether the approved client style still applies before generating a new batch.
- Check approved images before generating new content.
- Reuse the approved visual style unless the user asks for a new direction.
- Stop and ask if repeated revisions are needed or the image direction is becoming unclear.

## Batch Variation Rules

When generating a batch for one page, keep the brand style consistent but vary the scenes.

- Do not repeat the same worker pose across most images.
- Do not always show the worker crouched from behind.
- Use a mix of front, side, three-quarter, back, close-up, mid-shot, and wider scene angles.
- Faces may appear when they are fictional and not based on real people, but avoid close identity-style portraits unless the user asks.
- Do not include the vehicle in every image unless the section specifically needs vehicle proof.
- Use vehicle branding only where it naturally belongs and only when it matches the client's supplied brand guide/examples.
- Do not assume H2O Plumbers-style `Leak Detection` vehicle branding applies to other clients.
- Vehicle service wording should match the client examples or the relevant service in that specific image.
- Include team scenes where useful, including two workers collaborating.
- Vary team representation naturally, including African plumbers or mixed teams where appropriate for the client location and context.
- Keep every image relevant to the exact section, service card, or page area where it will be placed.
- Avoid making a batch feel like the same photo shoot repeated with only small equipment changes.
- Use close-up equipment/detail images where they fit the section better than another person-and-vehicle scene.

## Brand Rules For All Clients

- Do not use or replicate images of real people.
- Do not recreate real team members, staff, owners, or customers.
- Do not create new logos or logo variations.
- Use only provided company logos.
- Use branded vehicles only where appropriate.
- Use only real contact details on vehicle branding.
- Vehicle licence plates must be local to the business location and positioned realistically.
- Use local relevance based on the client's exact location.
- Match local suburbs, cities, property styles, road environments, vegetation, and building types where relevant.
- Use industry-relevant photorealistic design styles.
- Never create fake tools.
- Tools must be real, relevant, and appropriate to the exact service and industry.
- Equipment must match the service and industry precisely.
- Placement of fixtures and fittings must be realistic.
- Do not place drains, pipes, equipment, fixtures, or access points in impossible or nonsensical positions.
- Logos may be placed on vehicles, uniforms, and clothing only where appropriate.
- Do not place logos on houses, walls, client property, appliances, or unrelated objects unless the user explicitly asks.
- Do not create images that imply false proof, completed work, staff, vehicles, certifications, or premises.

## Prompt Rules

Every AI image prompt should include:

- client industry
- exact service or section purpose
- location and local visual context
- required composition/aspect ratio
- relevant tools/equipment
- brand colour cues
- logo usage rules, if logo use is approved
- what must not appear
- photorealistic style direction

For Home page and service page content-section image widgets, the prompt must request a square 1000x1000 composition unless the approved template slot explicitly requires another ratio.

This applies to paired-content images, process images, approach images, why choose / why trust images, inline support images, service support images, and square service-card widgets. The generated/saved asset must be square. Do not generate a landscape image for these slots and rely on Elementor, CSS, object-fit, masks, or visual cropping to make it appear square.

Use wide landscape prompts only for hero images, hero/section backgrounds, overlay backgrounds, wide CTA/background bands, service-area landmark/location cards, and blog images where the template expects landscape.

For hero/background/overlay slots, the prompt must request `1920x1080 landscape`. After generation, convert/export the final upload asset to compressed `.webp` before upload. Do not upload square PNGs, portrait files, or multi-megabyte PNG files for background slots.

Example prompt structure:

```text
Create a photorealistic website image for [client/company], a [business type] in [location].
Scene: [specific service/section context].
Local relevance: show [suburb/city/property style/environment].
Brand style: use [primary/secondary colours] subtly through uniforms, vehicle accents, or equipment where realistic.
Tools/equipment: include only real [industry/service] tools such as [examples].
Logo rules: use the provided logo only on [vehicle/uniform] if appropriate; do not invent or alter the logo.
Avoid: fake tools, impossible fixture placement, fake people based on real staff, unrealistic branding, logos on buildings, and generic stock-photo staging.
Style: photorealistic, natural lighting, professional local service business photography.
Aspect ratio/size: [required size].
```

For content/support widgets, `[required size]` should normally be `1000x1000 square`.

For hero/background/overlay widgets, `[required size]` should normally be `1920x1080 landscape`.

## Saving Rules

Approved generated images should use SEO-friendly filenames:

`[client]-[service-or-section]-[location]-ai-[number].webp`

Examples:

- `h2o-plumbers-general-plumbing-garden-route-ai-01.webp`
- `h2o-plumbers-service-guarantees-garden-route-ai-01.webp`

For page-specific SEO, plan filenames before upload:

- Use lowercase words separated by hyphens.
- Include the client name or short brand name.
- Include the service, section, or page topic.
- Include the primary target location for that page.
- Use the page focus keyphrase where it fits naturally.
- Use a close keyword variant when several images appear on the same page.
- Do not stuff repeated keywords into every filename.
- Avoid vague names such as `hero.webp`, `image-1.webp`, `plumber-photo.webp`, or camera filenames.

Recommended patterns:

- Home page hero: `[client]-plumber-[location]-hero-ai-01.webp`
- Home service card: `[client]-[service]-[location]-ai-01.webp`
- Service page hero: `[client]-[service]-[primary-location]-hero-ai-01.webp`
- Section support image: `[client]-[section-topic]-[location]-ai-01.webp`
- Local area page image: `[client]-[service]-[local-area]-ai-01.webp`
- Home Service Areas card: `[client]-[service]-[local-area]-service-area-ai-01.webp`
- Blog post image: `[client]-[post-topic]-[location]-blog-ai-01.webp`

Dimension requirements before upload:

- Content/support widget images: crop/export as 1000x1000 square unless the slot explicitly requires another ratio.
- Background/hero/overlay images: crop/export as 1920x1080 landscape unless the slot explicitly requires another landscape ratio.
- Background/hero/overlay images must be `.webp`, compressed before upload, and normally under 350 KB. Use 500 KB as the hard upper limit only when visual quality would otherwise be poor.
- Do not upload a non-square source file for a square content widget.
- Do not upload a square, portrait, PNG screenshot, or multi-megabyte PNG file for a background/overlay widget.

## Blog Image Rules

For Blog posts, images should support the article topic and not feel like repeated service-card images.

Use:

- practical service scenarios that match the post topic
- local home, business, or area context where relevant
- helpful detail shots, tools, equipment, warning signs, maintenance scenes, or team-at-work scenes
- the approved client image style from `assets/AI Images/` and `brand guide/`

Avoid:

- generic stock-style smiling portraits
- unrelated vehicles in every post image
- repeating the same worker pose from other page sections
- images that overclaim real completed work or real client staff

Blog filenames and alt text must target the post focus keyphrase naturally. Example:

- Filename: `h2o-plumbers-blocked-drain-warning-signs-garden-route-blog-ai-01.webp`
- Alt text: `H2O Plumbers checking an outdoor drain for blocked drain warning signs in the Garden Route`

## Service Areas Image Rules

For Home Page Service Areas sections, images should show the actual place rather than the trade work.

Use:

- local skyline, landscape, coastline, mountain, town, suburb, road, or landmark views
- property and environment details that feel accurate to the specific location
- clean photorealistic image style that sits comfortably with the rest of the page

Avoid:

- plumber action shots
- repeated branded vehicles
- fictional signage that could look like a fake business location
- logos on public landmarks or private property

Service Areas filenames and alt text must still target SEO naturally with `{service + location}`. Example:

- Filename: `h2o-plumbers-plumber-knysna-service-area-ai-01.webp`
- Alt text: `Knysna Lagoon and Heads for plumber services in Knysna`

Record image usage in `image-plan.md` when available:

- filename
- page/section/service
- prompt summary
- approval status
- alt text
- notes for future style matching

## Alt Text Rules

Alt text should describe the image honestly.

Do:

- describe the service, location, and visible context
- keep it useful and concise
- use the page focus keyphrase or a close variant where it reads naturally
- match the image to the exact page and section purpose
- write in a human tone, not a keyword list

Do not:

- claim the image shows the real client team unless it does
- claim the image shows completed real work unless it does
- stuff keywords
- repeat the exact same alt text across multiple images
- describe invisible details just to add keywords

Alt text format:

`[Natural description of visible image] for [service/page topic] in [location]`

Examples:

- `H2O Plumbers bakkie and technician ready for plumber callouts in the Garden Route`
- `Leak detection equipment used for hidden plumbing leaks in George`
- `Drain hydro jetting equipment for blocked drains in the Garden Route`
- `Core drilling setup for plumbing installations in George`

## Yoast And Per-Page SEO Rules

Before generating or uploading images for a page:

1. Identify the page focus keyphrase.
2. Identify secondary keyword variants and service/location combinations.
3. Map each image to a section, service, or page topic.
4. Create the filename and alt text before upload.
5. Upload the image with the correct title, alt text, caption only if useful, and description only if useful.
6. After Elementor placement, confirm the media library alt text and Elementor widget alt text match the plan.
7. Confirm square content/support images are actual square files, not only visually cropped in the page layout.
8. Confirm background/overlay images are actual 1920x1080 landscape WebP files and not multi-megabyte uploads.

For Home pages, rotate service and location variants across the image set. Do not force the same exact focus keyphrase into every image.

For Service pages, prioritise the service page focus keyphrase in the hero image and one supporting image, then use natural variants for the rest.

## Usage Control

AI image generation can use credits quickly.

Control usage by:

- generating one image for style approval first
- generating the remaining page batch only after the first image style is approved
- revising specific problem images individually instead of regenerating the whole page set
- reusing approved style references
- using real client images where suitable
- stopping after 1-2 revision rounds unless the user approves more
- generating only required page/section/service images

## Completion Report

Report:

- images generated
- approval status
- saved filenames
- where images were used
- remaining image gaps
- whether more user approval is needed
