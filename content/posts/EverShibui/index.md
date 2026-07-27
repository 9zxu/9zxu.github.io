
This theme is inspired by:
- [Everforest](https://github.com/sainnhe/everforest)
- [Obsidian Baseline](https://github.com/aaaaalexis/obsidian-baseline)
- [Hugo Shibui](https://github.com/ntk148v/shibui)

# Evershibui

The spirit inside this design is to create a comfortable reading experience. Applying the spirit of japanese shibui to design a minimal layout. The color scheme is based on everforest. 
The base of this color theme is everforest, a eye-friendly comfortable color scheme. And further extends with the japanese shibui idea to create a minimal, useful, delightful layout, navigating experience.

## Performance
1. [Performance result](https://pagespeed.web.dev/analysis/https-9zxu-github-io-posts-hugo/sjl9pjwd89?form_factor=mobile "Performance result
    (https://pagespeed.web.dev/analysis/https-9zxu-github-io-posts-hugo/sjl9pjwd89?form_factor=mobile)") on [this page](https://9zxu.github.io/posts/hugo/ "this page
    (https://9zxu.github.io/posts/hugo/)") (there is an inline html render)
    
2. This is a minimal-everforest-shibui theme
    
3. The Klatex support [demo](https://9zxu.github.io/posts/linear-algebra/ "demo
    (https://9zxu.github.io/posts/linear-algebra/)") on linear algebra.
    
4. The image test is available [here](https://9zxu.github.io/posts/git-collaborate-tutorial/ "here
    (https://9zxu.github.io/posts/git-collaborate-tutorial/)").

## Theme structure & conventions

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
│   │   ├── main.css         # single entry point, @imports everything else
│   │   ├── _palette.css     # the ONLY file allowed raw hex codes
│   │   ├── _tokens.css      # semantic --color-*/--syntax-*/--callout-* tokens
│   │   ├── base.css, layout.css
│   │   └── components/      # buttons, callout, content, syntax, github-card
│   └── js/main.js           # theme toggle, mobile sidebar drawer
└── archetypes/default.md
```

**Conventions that matter:**

- **One CSS entry point.** `assets/css/main.css` is the only file wired into the pipeline (`_partials/head/css.html` → `resources.Get` → `css.Build` → minify/fingerprint). Every other stylesheet is added as an `@import` line in `main.css`, not a new `<link>` tag. esbuild inlines the imports at build time.
- **Color abstraction, strictly enforced.** Raw hex only exists in `_palette.css`. Every other file references semantic names from `_tokens.css` (`--color-bg`, `--color-text-muted`, `--syntax-keyword`, `--callout-warning`, and so on). This one rule is what made the whole Shibui color rewrite a single-file change: nothing else in the theme had to know a color's actual value.

  Verify it holds:
  ```bash
  grep -rIln --include="*.css" -E '#[0-9a-fA-F]{3,8}\b' assets/css/
  ```
- **Shared partials over duplication.** `post-list.html` and `term-list.html` back every place a list of posts/terms appears (home, `/posts/`, `/tags/`, each tag's page). One `.card` style, one template, instead of copy-pasted markup per page kind.
- **`.Kind`-gated layout.** The left sidebar (page outline) only renders `{{ if eq .Kind "page" }}`, i.e. on individual posts. So the home page, post list, and taxonomy pages collapse to a single centered column (`.shell--no-sidebar`) instead of showing an empty rail.
- **Render hooks over string-matching.** GitHub-style `> [!TIP]` alerts are handled by Hugo's native blockquote render hook (`.Type == "alert"`, `.AlertType`), not regex against the raw text.

## The Shibui color system

The theme started on the [Everforest](https://github.com/sainnhe/everforest) colorscheme, but its light-theme accent colors turned out too low-contrast for real reading (several syntax colors measured under 3:1 against the code background, and WCAG AA wants 4.5:1). Rather than patch individual colors, I designed a full replacement palette: **Shibui** (渋い), a quiet, muted ink-and-paper aesthetic instead of a saturated one. The old Everforest values are kept, unused, in `_palette-everforest.css` for reference.

> [!NOTE]
> The name (and general "quiet, muted" direction) was also inspired by the existing [Shibui Hugo theme](https://themes.gohugo.io/themes/shibui/). This palette and that theme are unrelated in code, but credit where it's due for the name.

Two variants, keyed off `:root` vs `:root[data-theme='light']`, exactly like Everforest was:

**Dark: "Sumi" (ink on charcoal)**

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

**Light: "Washi" (rice paper)**

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
> Every light-theme accent above is tuned to land at roughly **5:1 contrast** against the code-block background, checked with the actual relative-luminance formula, not eyeballed. The dark theme was never the problem. Its accents naturally sit at 5.5-7.7:1 without any adjustment.

Here's the actual proposal page I built while designing this: swatches, a mock code block in both themes, and the measured contrast ratios per color.



<iframe src="/shibui-preview.html" style="width:100%; height:640px; border:1px solid var(--color-border); border-radius:8px;" loading="lazy" title="Shibui palette proposal"></iframe>

A couple of small details that make the theme feel coherent rather than just "recolored":

- **Theme-switch transitions are global**, not just on `body`. Every element transitions `background-color`/`border-color`/`color` over 0.15s, so toggling dark/light fades uniformly instead of some elements snapping instantly while others fade.
- **Code block background is a step brighter than page background** in light mode (`#f0e9da` vs `#f7f1e4`), separated further by a 1px border. Enough to read as a distinct block without going murky.
- Math-heavy posts (`math: true` in front matter) load [KaTeX](https://katex.org/) from a CDN with self-verified SRI hashes, gated so it never loads on pages that don't need it. This is paired with Goldmark's `passthrough` extension so `$...$` math isn't mangled by Markdown's own typography rules first.
