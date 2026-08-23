# Master Template Blog Map

Use this reference when creating or checking the Blog infrastructure for a client build.

Current Development 1 references:

- Blog page: `Blog` (`6425`) at `/blog/`
- Single Post template: `Barry Blog Single Post` (`6432`)
- Archive template: `Barry Blog Archive` (`6434`)

## Blog Page / Blog Index

Purpose: curated main blog index with latest posts.

This is normally a standard Elementor page using a Posts widget or Loop Grid. It is not the same thing as a WordPress archive template.

New WordPress posts should appear here automatically when the Posts widget query is set to recent/all posts.

Sections:

| Section | Purpose | Label/Class Standard |
| --- | --- | --- |
| Blog Hero | Blog H1 and short introduction | `blog-hero`, `barry-section barry-blog-section barry-blog-hero` |
| Blog Content | Posts grid and sidebar | `blog-content`, `barry-section barry-blog-section barry-blog-content` |

Required widgets:

- Heading
- Text editor
- Elementor Pro Posts widget or Loop Grid
- Search
- Categories
- Recent Posts

## Single Post Template

Purpose: display individual WordPress posts.

Sections:

| Section | Purpose | Label/Class Standard |
| --- | --- | --- |
| Blog Single Intro | Post title, excerpt and post info | `blog-single-intro`, `barry-section barry-blog-single-intro` |
| Blog Single Content | Featured image, post content, navigation and sidebar | `blog-single-content`, `barry-section barry-blog-single-content` |

Required widgets:

- Theme Post Title
- Post Info
- Theme Post Excerpt
- Theme Post Featured Image
- Theme Post Content
- Post Navigation
- Search
- Categories
- Recent Posts

Layout rules:

- Use the approved client/template Single Post structure as the source of truth.
- The intro/header area should contain the post title, excerpt and post info.
- The featured image should sit at the top of the main article/content column, before the post body.
- Do not place a table of contents at the top of the article by default.
- Elementor may show placeholder text in the editor/settings summary for dynamic widgets; the public post URL is the source of truth.
- Visible placeholder Elementor heading/image output on the public post must be treated as a failed template.
- Verify with an actual public post URL.
- Show the author name and formatted publication date. Do not show a time-only value in place of the date.
- Use an editable boxed content width consistent with the approved template. The approved HoneySucker result uses 1350px.
- Align the main column and sidebar to the top. Disable sidebar flex growth so the sidebar stops after its own widgets.
- Control hero height with Elementor padding. Do not use a forced minimum height for routine spacing.

## Post Archive Template

Purpose: display blog, category, tag, author, date, or search archives depending on template conditions.

This is the Theme Builder archive template. It is used for WordPress archive routes such as category, tag, author, date and search archives. It may also handle the main posts archive if WordPress `Posts page` is assigned and the template condition covers it.

Sections:

| Section | Purpose | Label/Class Standard |
| --- | --- | --- |
| Blog Archive Hero | Archive title and context | `blog-archive-hero`, `barry-section barry-blog-archive-hero` |
| Blog Archive Content | Archive posts and sidebar | `blog-archive-content`, `barry-section barry-blog-archive-content` |

Required widgets:

- Theme Archive Title
- Archive Posts or Loop Grid
- Search
- Categories
- Recent Posts

## Rules

- Blog starter posts must be real posts, not dummy posts.
- Blog starter posts should normally be 600-900 words each.
- Use WordPress posts and categories correctly.
- Do not hard-code individual post content into the templates.
- Featured images and mid-content images must use SEO filenames and honest alt text.
- Apply and verify Yoast metadata on each starter post.
- New client builds use the current approved Blog page, Single Post template and Archive template structure as the master reference.
- The Blog page is a normal Elementor page with a posts grid/sidebar experience.
- The Theme Builder Single Post and Archive templates must remain active for normal WordPress post/category/archive behaviour.
- The normal Blog page and Theme Builder Archive template are separate records. Confirm the target before editing.
- On the Blog page, Single Post template and Archive template, set the content parent to align items at the start and disable flex growth on the sidebar.
- Each sidebar must end after Search, Categories and Recent Posts instead of stretching to the main content height.
- Stack the main content and sidebar on tablet/mobile while preserving 100% responsive widths.
- Add `Blog` once as a published top-level item in the primary navigation, linked to the Blog page.
