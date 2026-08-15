# SOP: New Client Blog Setup

Use this SOP when creating the Blog infrastructure for a new client website.

For new-client builds, Blog infrastructure must use the approved Elementor Blog page, Elementor Pro Single Post template and Elementor Pro Archive template from the imported master/template, or duplicates of approved Elementor sources. Do not build the Blog page or templates as WordPress block editor pages or custom standalone HTML/CSS.

## Goal

Convert or complete a working Blog section that matches the client's Elementor template, supports proper WordPress posts, and starts with three real, relevant, SEO-ready posts.

## Required Inputs

- Client folder and intake data
- Target domain
- Business type
- Main service category
- Primary location and service areas
- Five Home Page services
- Additional services, if available
- Brand voice
- SEO keywords
- AI image brand guide and approved image references, if available

## Build Scope

Confirm, update, or duplicate from approved Elementor sources:

1. Blog page
2. Elementor Pro Single Post template
3. Elementor Pro Post Archive template
4. Standard blog categories
5. Three real starter posts
6. Featured images and one mid-content image per post
7. Yoast SEO metadata per post
8. Visual QA for Blog page, one post, and one category/archive page

Use `elementor/references/master-template-blog-map.md` as the current approved Blog structure reference.

Before editing, confirm the Blog page and Theme Builder templates are Elementor records. If the imported Blog structure is missing, stop and ask for a template import/repair decision before building a replacement.

Before writing post titles, outlines, body copy, FAQs, or Yoast text, read:

`content/SOPs/local-service-seo-copywriting.md`

## Blog Page Structure

The Blog page should use the current client template style.

Required sections:

1. Blog Hero
   - H1: clear blog title using service/category and location where natural.
   - Short intro in the client's tone.
   - Use an approved wide background image with the site navy overlay at the same intensity as the Home hero; do not leave an inherited flat-blue heading band.
   - Keep the title bold and legible over the overlay.
2. Blog Content
   - Main area: latest posts grid.
   - Sidebar: search, categories, and recent posts.

Use Elementor Pro post widgets where possible. Keep the layout clean, readable, and consistent with the core template.

## Single Post Template

Create a Theme Builder Single Post template for all posts.

Required elements:

- Post title
- Post date or post info
- Post excerpt or short intro
- Featured image
- Post content
- Mid-content image inside each post body
- Post navigation
- Sidebar with search, categories, and recent posts

The post body should remain the real WordPress post content, not hard-coded template copy.

Single Post template rules:

- The hero/header area must use the same visual language as the Blog Archive header.
- Use the same approved background-image, navy-overlay and bold-title treatment as the Blog page.
- The featured image belongs in the main hero/media position, not below a table of contents.
- Do not place a table of contents above the article content by default.
- Do not leave Elementor placeholder text such as `Add Your Heading Text Here`.
- Do not leave Elementor placeholder images.
- Verify on a real public post URL that the dynamic title, featured image, excerpt and content render correctly.
- When using Elementor dynamic tags, verify the rendered public output, not only the Elementor structure response.

## Post Archive Template

Create a Theme Builder Archive template for blog/category archives.

Required elements:

- Archive title
- Short archive intro if supported by the template
- Archive posts/grid
- Sidebar with search, categories, and recent posts

Apply the archive template to WordPress archives unless a narrower condition is needed.
The archive hero must match the Blog and Single Post heroes: approved wide background image, uniform navy overlay and bold readable title.

## Categories

Create practical client-relevant categories. For local service businesses, default categories may include:

- Tips or Advice
- Primary service category
- One or two major service categories
- Maintenance
- Service Areas
- Company News

Do not create too many empty categories.

## Starter Posts

Create three real starter posts for every new setup build unless the user asks to skip blog content.

Rules:

- Posts must be useful to the target customer.
- Do not create dummy/lorem posts.
- Starter posts should normally be 600-900 words each unless the user requests shorter posts.
- Use human, local, authentic copy.
- Avoid sales-pitch tone.
- Do not produce thin content.
- Do not reuse paragraph structures or story rhythm from other starter posts.
- Each post must answer a real customer question or solve a real service problem.
- Tie topics to the client's services, location, seasonal needs, common questions, or booking concerns.
- Use clear H2/H3 structure.
- Include a natural CTA near the end.
- Include one featured image and one mid-content image.

Example post topic types:

- How to spot a common problem before it becomes expensive
- What warning signs customers should not ignore
- Seasonal maintenance tips for local homes and businesses
- How to choose or book the right service

## AI Image Rules

Before generating blog images, run the AI image workflow:

1. Inspect `assets/AI Images/`.
2. Inspect `assets/AI Images/brand guide/`.
3. Read `brand-image-rules.md` if present.
4. Check approved generated images and `image-plan.md`.
5. Reuse the approved client image style unless a new blog style is required.

Blog image filename pattern:

`[client]-[post-topic]-[location]-blog-ai-01.webp`

Alt text should describe the image honestly and include the topic/location naturally.

Example:

`H2O Plumbers checking an outdoor drain for blocked drain warning signs in the Garden Route`

## Yoast SEO

For each post:

1. Choose one focus keyphrase.
2. Write an SEO title.
3. Write a meta description.
4. Set the slug.
5. Set featured image alt text.
6. Set Open Graph title/description/image where possible.
7. Verify the rendered public page head after applying Yoast fields.

Do not mark Yoast complete based only on a save response.

Use `seo/skills/local-business-schema/SKILL.md` during the Blog build:

- verify the Blog hub page type and relationships
- verify each post emits a correct `Article`/`BlogPosting` linked to the canonical publisher
- verify author, dates, featured image and main page entity
- add FAQ schema only when a visible FAQ section warrants it
- validate rendered JSON-LD and record each result in `schema-plan.md`

## Visual QA

Check:

- Blog page loads and shows the three posts.
- Single post template is active on at least one post.
- Archive template is active on at least one category/archive page.
- Featured images render.
- Mid-content image renders.
- Sidebar search/categories/recent posts are visible.
- Mobile layout does not crowd or overlap.
- Header, footer, WordPress site logo, Elementor Site Logo, favicon/site icon and Yoast site representation do not show the previous template/client brand.

## Completion Report

Report:

- Blog page URL
- Single Post template name/ID
- Archive template name/ID
- Categories created
- Starter posts created
- Images used
- Yoast status
- Any items that need review
