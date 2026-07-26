---
date: '2026-07-26T00:00:00+08:00'
draft: false
title: 'Create Static Website with Hugo'
categories: ['Note']
tags: ['Web', 'Hugo', 'Obsidian', 'CSS']
description: 'How this site is built: install, an Obsidian-based writing workflow, the theme file structure, and the Shibui color system.'
---

This site is a from-scratch Hugo theme built around a docs-style shell and a custom color system. This post is the setup notes: installation, how I actually write posts day-to-day, how the theme's files are organized, and the color palette behind it.

## 1. Installation

```bash
brew install hugo
```

Get the **extended** edition — `brew install hugo` on macOS gives you this by default, but on other platforms make sure you're not on the plain build. Extended is required for the Sass/CSS asset pipeline (`css.Build`, `js.Build` via esbuild) that this theme relies on.

```bash
hugo version
# hugo v0.164.0+extended
```

Scaffold a new site and a new theme inside it:

```bash
hugo new site quickstart
cd quickstart
hugo new theme sumi-washi
```

Set the theme in `hugo.toml`:

```toml
theme = 'sumi-washi'
```

> [!NOTE]
> `hugo new theme` scaffolds using **modern** Hugo conventions: templates live flat in `layouts/` (`baseof.html`, `home.html`, `page.html` — no `_default/` folder), and partials live under `layouts/_partials/`. Older tutorials and themes you find online often use the pre-0.146 layout (`layouts/_default/baseof.html`, `layouts/partials/`) — both still work, but don't mix conventions inside one theme.

Delete the scaffold's placeholder demo content (`themes/<name>/content/`) if you don't want fake sample posts leaking into your site — Hugo merges a theme's `content/` into the site's own.

## 2. Daily content workflow with Obsidian

I write posts in Obsidian, not by hand-editing files in this repo. The setup:

- Posts physically live in `$HOME/Vaults/CS/blog/`, a subfolder of my existing Obsidian vault — **not** inside the Hugo repo at all.
- Hugo is pointed at that folder via a **module mount** in `hugo.toml`, not a symlink:

```toml
[module]
  [[module.mounts]]
    source = 'content'
    target = 'content'
  [[module.mounts]]
    source = '/Users/grace/Vaults/CS/blog'
    target = 'content/posts'
  # ...the other default mounts (static, layouts, data, assets, i18n,
  # archetypes) must be re-declared too, once any mount is declared explicitly.
```

> [!WARNING]
> I tried a plain OS symlink first (`ln -s ~/Vaults/CS/blog content/posts`) — it looked right in the shell, but Hugo silently does not walk symlinked *directories* placed directly under `content/`. Zero posts built, no error. Module mounts are the actual supported mechanism for pulling content from outside the project directory, and `hugo server`'s file watcher follows them correctly for live reload.

**Front matter format:** Obsidian's Properties panel only reads and writes YAML front matter (`---`), never TOML (`+++`). Since Hugo supports both natively — it auto-detects the delimiter per file — the fix is on the Hugo side: every post uses YAML, and the theme's archetype (`archetypes/default.md`) was updated to generate YAML too, so new notes created from Obsidian or via `hugo new` are consistent:

```yaml
---
date: '{{ .Date }}'
draft: true
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
---
```


One caveat worth knowing: Obsidian-only syntax (`[[wikilinks]]`, `![[embeds]]`) doesn't mean anything to Hugo's Markdown renderer, so links from a post into other (unpublished) vault notes just render as broken literal text. Practice is to inline the relevant content into the post itself rather than link out of `blog/`.

## 3. Theme structure & conventions

```
themes/sumi-washi/
├── layouts/
│   ├── baseof.html          # <html> skeleton: topbar, sidebar, content column, footer
│   ├── home.html            # "define main" for the home page
│   ├── page.html            # single post/page
│   ├── section.html         # /posts/ listing
│   ├── taxonomy.html        # /tags/, /categories/ index
│   ├── term.html            # /tags/<name>/ listing
│   ├── 404.html
│   ├── _partials/
│   │   ├── head.html, head/css.html, head/js.html
│   │   ├── header.html      # topbar: mobile toggle, brand, theme switch
│   │   ├── sidebar.html     # per-post "On this page" outline
│   │   ├── footer.html
│   │   ├── post-list.html   # shared card list (date, title, 20-word peek, tags)
│   │   ├── term-list.html   # shared card list for the tags index
│   │   └── github-card.html # build-time GitHub profile fetch
│   └── _markup/
│       └── render-blockquote.html   # GitHub-style [!NOTE]/[!TIP]/... alerts
├── assets/
│   ├── css/
│   │   ├── main.css         # single entry point — @imports everything else
│   │   ├── _palette.css     # the ONLY file allowed raw hex codes
│   │   ├── _tokens.css      # semantic --color-*/--syntax-*/--callout-* tokens
│   │   ├── base.css, layout.css
│   │   └── components/      # buttons, callout, content, syntax, github-card
│   └── js/main.js           # theme toggle, mobile sidebar drawer
└── archetypes/default.md
```

**Conventions that matter:**

- **One CSS entry point.** `assets/css/main.css` is the only file wired into the pipeline (`_partials/head/css.html` → `resources.Get` → `css.Build` → minify/fingerprint). Every other stylesheet is added as an `@import` line in `main.css`, not a new `<link>` tag — esbuild inlines the imports at build time.
- **Color abstraction, strictly enforced.** Raw hex only exists in `_palette.css`. Every other file references semantic names from `_tokens.css` (`--color-bg`, `--color-text-muted`, `--syntax-keyword`, `--callout-warning`, …). I check this holds with:
  ```bash
  grep -rIln --include="*.css" -E '#[0-9a-fA-F]{3,8}\b' assets/css/
  ```
  This one rule is what made the whole Shibui rewrite (section 4) a single-file change — nothing else in the theme had to know a color's actual value.
- **Shared partials over duplication.** `post-list.html` and `term-list.html` back every place a list of posts/terms appears (home, `/posts/`, `/tags/`, each tag's page) — one `.card` style, one template, instead of copy-pasted markup per page kind.
- **`.Kind`-gated layout.** The left sidebar (page outline) only renders `{{ if eq .Kind "page" }}` — i.e. on individual posts — so the home page, post list, and taxonomy pages collapse to a single centered column (`.shell--no-sidebar`) instead of showing an empty rail.
- **Render hooks over string-matching.** GitHub-style `> [!TIP]` alerts are handled by Hugo's native blockquote render hook (`.Type == "alert"`, `.AlertType`), not regex against the raw text.

## 4. The Shibui color system

The theme started on the [Everforest](https://github.com/sainnhe/everforest) colorscheme, but its light-theme accent colors turned out too low-contrast for real reading (several syntax colors measured under 3:1 against the code background — WCAG AA wants 4.5:1). Rather than patch individual colors, I designed a full replacement palette: **Shibui** (渋い) — a quiet, muted ink-and-paper aesthetic instead of a saturated one. The old Everforest values are kept, unused, in `_palette-everforest.css` for reference.

Two variants, keyed off `:root` vs `:root[data-theme='light']`, exactly like Everforest was:

**Dark — "Sumi" (ink on charcoal)**

| role | hex |
|---|---|
| background | `#26231f` |
| surface / code block | `#2d2a25` |
| text | `#d8cfc0` |
| red | `#d9846f` |
| orange | `#d3a066` |
| yellow | `#cbb573` |
| green | `#a3b088` |
| aqua | `#8fb0a0` |
| blue | `#83a6c4` |
| purple | `#b39bcf` |

**Light — "Washi" (rice paper)**

| role | hex |
|---|---|
| background | `#f7f1e4` |
| surface / code block | `#f0e9da` |
| text | `#3d3a34` |
| red | `#a24632` |
| orange | `#805c1c` |
| yellow | `#71621b` |
| green | `#546935` |
| aqua | `#336c64` |
| blue | `#37648a` |
| purple | `#725693` |

> [!TIP]
> Every light-theme accent above is tuned to land at roughly **5:1 contrast** against the code-block background — checked with the actual relative-luminance formula, not eyeballed. The dark theme was never the problem; its accents naturally sit at 5.5–7.7:1 without any adjustment.

Here's the actual proposal page I built while designing this — swatches, a mock code block in both themes, and the measured contrast ratios per color:

<iframe src="/shibui-preview.html" style="width:100%; height:640px; border:1px solid var(--color-border); border-radius:8px;" loading="lazy" title="Shibui palette proposal"></iframe>

A couple of small details that make the theme feel coherent rather than just "recolored":

- **Theme-switch transitions are global**, not just on `body` — every element transitions `background-color`/`border-color`/`color` over 0.15s, so toggling dark/light fades uniformly instead of some elements snapping instantly while others fade.
- **Code block background is a step brighter than page background** in light mode (`#f0e9da` vs `#f7f1e4`), separated further by a 1px border — enough to read as a distinct block without going murky.
- Math-heavy posts (`math: true` in front matter) load [KaTeX](https://katex.org/) from a CDN with self-verified SRI hashes, gated so it never loads on pages that don't need it — paired with Goldmark's `passthrough` extension so `$...$` math isn't mangled by Markdown's own typography rules first.

## 5. Deploying to GitHub Pages

GitHub Actions runs on a fresh Ubuntu VM with no access to my Mac or the Obsidian vault, so the module-mount trick from section 2 only works for local `hugo server`. Config is split by environment:

- `config/_default/hugo.toml` — no vault mount; `content/posts` is a real, git-tracked directory
- `config/development/hugo.toml` — overrides the mount back to the vault, applied automatically whenever `hugo server` runs (Hugo defaults to the `development` environment for `server`, `production` for `build`)

### Publish

Publishing a post is now an explicit step, not automatic:

```bash
./scripts/sync-posts.sh    # rsync mirror: vault -> content/posts/
git status content/posts   # review what changed
git add content/posts
git commit -m "..."
git push
```

### Deploy

Push to `main` triggers `.github/workflows/hugo.yaml` (Hugo's official Actions workflow), which builds with `hugo build --gc --minify` and deploys via `actions/deploy-pages`. Pages' source is set to **GitHub Actions** (Settings → Pages → Source), not a branch, so there's no `gh-pages` branch to manage.

> [!TIP]
> After a deploy, GitHub's edge CDN refreshes almost immediately (`cache-control: max-age=600`, so worst case ~10 minutes) — but the **browser** may still show a stale cached copy well after that. Don't wait it out, hard refresh instead:
> - macOS Chrome/Firefox/Edge: `Cmd+Shift+R`
> - macOS Safari: `Cmd+Option+R` (or Develop → Empty Caches)
> - Or just open the URL in a private/incognito window
