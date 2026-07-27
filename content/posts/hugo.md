---
date: 2026-07-26T00:00:00+08:00
draft: false
title: Create Static Website with Hugo
categories:
tags:
  - web
  - hugo
  - obsidian
  - css
description: "How this site is built: install, an Obsidian-based writing workflow, the theme file structure, and the Shibui color system."
---

This site is a from-scratch Hugo theme built around a docs-style shell and a custom color system. This post is the setup notes: installation, how I actually write posts day-to-day, how the theme's files are organized, and the color palette behind it.

## 1. Installation

```bash
brew install hugo
```

Get the **extended** edition. `brew install hugo` on macOS gives you this by default, but on other platforms make sure you're not on the plain build. Extended is required for the Sass/CSS asset pipeline (`css.Build`, `js.Build` via esbuild) that this theme relies on.

```bash
hugo version
# hugo v0.164.0+extended
```

Scaffold a new site and a new theme inside it:

```bash
hugo new site quickstart # Replace quickstart to your blog name.
cd quickstart
hugo new theme evershibui # Replace evershibui to your custom theme name.
```

Set the theme in `hugo.toml`:

```toml
theme = 'evershibui'
```

> [!NOTE]
> `hugo new theme` scaffolds using **modern** Hugo conventions: templates live flat in `layouts/` (`baseof.html`, `home.html`, `page.html`, no `_default/` folder), and partials live under `layouts/_partials/`. Older tutorials and themes you find online often use the pre-0.146 layout (`layouts/_default/baseof.html`, `layouts/partials/`). Both still work, but don't mix conventions inside one theme.

Delete the scaffold's placeholder demo content (`themes/<name>/content/`) if you don't want fake sample posts leaking into your site. Hugo merges a theme's `content/` into the site's own.

## 2. Obsidian workflow setup

This is a step by step guide to setup obsidian as a main editor to write posts.

Here is a checklist:
- [ ] `.obsidian` appears in `.gitignore`
- [ ] `content/posts/Templates/` appears in `.gitignore`
- [ ] `ignoreFiles = ['/posts/Templates/']` is set in `config/_default/hugo.toml`

### Obsidian Vault
1. Open a vault inside `content/posts/` and set `.obsidian` folder to `.gitignore`.
2. Set Obsidian's default attachment location is set to **"Same folder as current file"**, so pasted images land straight in the right post bundle.

### Template
1. Create a `Templates/` folder inside `content/posts/` and add it to `.gitignore` and to Hugo's `ignoreFiles`, so it never shows up as a post. This folder is gitignored, so recreate it by hand on a fresh clone.
2. Inside it, create `Post Template.md` with the settings below. Obsidian's Core Templates plugin fills in the current date and time for you once you apply the template to a note.

```yaml
---
date: {{date:YYYY-MM-DD}}T{{time:HH:mm:ss}}+08:00
draft: true
title: 
categories:
tags:
description:
math: false
---
```

**Tag convention:** Obsidian tags can't contain spaces. This site uses kebab-case instead.

An example:

```yaml
tags: ['linear-algebra', 'math']
```

**Creating a new post:** in Obsidian, create a new note and name it `my-new-post/index`. The slash makes Obsidian create the `my-new-post/` folder automatically. Then apply the template to that `index.md`.

This ignore setting also matters if you create posts with `hugo new posts/<slug>/index.md` from the terminal. Without it, Hugo would try to build the `Templates/` folder as a page.

There are two scaffolds to keep aligned by hand:

| |`archetypes/default.md`|`Templates/Post Template.md`|
|---|---|---|
|Used by|`hugo new posts/<slug>/index.md` (terminal)|Obsidian's template-apply command|
|Fires|Once, at file creation via CLI|Whenever you manually apply/insert it in Obsidian|

**Front matter format:** Obsidian's Properties panel only reads and writes YAML front matter (`---`), never TOML (`+++`). Hugo supports both natively and auto-detects the delimiter per file, so the fix is on the Hugo side. Every post uses YAML, and the theme's archetype (`archetypes/default.md`) was updated to generate YAML too. New notes created from Obsidian or via `hugo new` stay consistent:

```yaml
---
date: '{{ .Date }}'
draft: true
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
---
```

### Attachments

One caveat worth knowing: Obsidian-only syntax (`[[wikilinks]]`, `![[embeds]]`) doesn't mean anything to Hugo's Markdown renderer, so links from a post into other (unpublished) vault notes just render as broken literal text. Practice is to inline the relevant content into the post itself rather than link out of `blog/`.

**Images: page bundles, created from the start.** Every post with images is created as a leaf bundle, not a flat file:

```bash
hugo new posts/my-new-post/index.md
```

This gives a `my-new-post/` folder with `index.md` inside it, generated from `archetypes/default.md`. From there:

- Images get dropped straight into that same folder and referenced by filename, like `![alt](photo.png)`.
- No separate `static/images/<slug>/` tree with absolute paths.
- Post and assets stay together as one movable unit.
- Obsidian's "default location for new attachments" is set to "Same folder as current file," so screenshots pasted while editing `index.md` land next to it automatically. No manual sorting after the fact.

> [!NOTE]
> A post started the old way (flat `<slug>.md` plus `static/images/<slug>/`) still works, but has to be converted by hand:
> 1. `mkdir` the bundle folder.
> 2. `git mv` the `.md` in as `index.md`.
> 3. `git mv` each image in alongside it.
> 4. Strip the `/images/<slug>/` prefix from the Markdown image links so they resolve as bundle-relative filenames.


## 3. Deploying to GitHub Pages

### Publish

`content/posts/` is a real, git-tracked directory, the same folder Obsidian edits directly. Publishing a post is just a normal commit:

```bash
git status content/posts   # review what changed
git add content/posts
git commit -m "..."
git push
```

### Deploy

Push to `main` triggers `.github/workflows/hugo.yaml` (Hugo's official Actions workflow), which builds with `hugo build --gc --minify` and deploys via `actions/deploy-pages`. Pages' source is set to **GitHub Actions** (Settings → Pages → Source), not a branch, so there's no `gh-pages` branch to manage.

> [!TIP]
> After a deploy, GitHub's edge CDN refreshes almost immediately (`cache-control: max-age=600`, so worst case ~10 minutes). But the **browser** may still show a stale cached copy well after that. Don't wait it out, hard refresh instead:
> - macOS Chrome/Firefox/Edge: `Cmd+Shift+R`
> - macOS Safari: `Cmd+Option+R` (or Develop → Empty Caches)
> - Or just open the URL in a private/incognito window
