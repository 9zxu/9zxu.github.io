# Evershibui
A minimal, quiet [Hugo](https://gohugo.io/) blog theme combining Everforest color palettes with Shibui-inspired simplicity.

Please visit https://9zxu.github.io/posts/evershibui/ for a detailed theme introduction.

![Evershibui screenshot](https://raw.githubusercontent.com/9zxu/evershibui/main/images/screenshot.png)

|         |                                                        Light                                                        |                                                        Dark                                                        |
| :-----: | :------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: |
|  Home   | ![home-light](https://raw.githubusercontent.com/9zxu/evershibui/main/images/light-home.png) | ![home-dark](https://raw.githubusercontent.com/9zxu/evershibui/main/images/dark-home.png) |
| Content | ![content-light](https://raw.githubusercontent.com/9zxu/evershibui/main/images/light-content.png) | ![content-dark](https://raw.githubusercontent.com/9zxu/evershibui/main/images/dark-content.png) |
|  Post   | ![post-light](https://raw.githubusercontent.com/9zxu/evershibui/main/images/light-posts.png) | ![post-dark](https://raw.githubusercontent.com/9zxu/evershibui/main/images/dark-posts.png) |

## Features

- Responsive layout that adapts cleanly to desktop, tablet, and mobile screens.
- Toggleable dark/light mode built on the Everforest color palette.
- Syntax highlighting for code blocks with Chroma.
- Tag-based taxonomy for organizing and browsing posts.
- Math typesetting support via KaTeX.
- Sidebar outline for quick navigation through post headings.

## Usage

Add the theme as a git submodule in your Hugo site:

```bash
git submodule add https://github.com/9zxu/evershibui.git themes/evershibui
```

Then set the theme in your site's config (e.g. `hugo.toml`):

```toml
theme = 'evershibui'
```

This theme requires Hugo `0.146.0` or later.

## Customization

### Colorscheme

- `assets/css/_palette.css`: the only file allowed to contain hex codes. Defines the "Shibui" palette (dark "Sumi" / light "Washi") as `--ef-*` CSS variables.
- `assets/css/_tokens.css`: the semantic token layer. Maps abstract names (e.g. `--color-bg`, `--color-text`) to the `--ef-*` variables. No hex codes here either.
- `assets/css/_palette-everforest.css`: the previous Everforest palette, unused, kept as a reference/rollback option.
- `assets/css/main.css`: controls which palette is active, through its `@import` order.

Layout and component CSS should never reference `--ef-*` variables or hex values directly. They only use the semantic tokens.

There are two separate ways to customize the colors:

- **Changing the colorscheme**: edit the hex values in `_palette.css`. This changes what each color looks like everywhere it's used. To switch to the Everforest palette entirely, swap the `@import` in `main.css` from `_palette.css` to `_palette-everforest.css`.
- **Changing the color mapping**: remap a token in `_tokens.css` to a different `--ef-*` variable. This changes which color a token uses, without touching the palette itself.

### Layout

Layouts live under `layouts/`:

- `baseof.html`: base template all other templates build on.
- `home.html`, `page.html`, `section.html`, `taxonomy.html`, `term.html`: content-type templates.
- `404.html`: not-found page.
- `_partials/header.html`, `_partials/footer.html`, `_partials/sidebar.html`, `_partials/menu.html`: page chrome.
- `_partials/post-list.html`, `_partials/term-list.html`, `_partials/terms.html`: listing partials.
- `_partials/head.html`, `_partials/head/css.html`, `_partials/head/js.html`: `<head>` asset includes.
- `_partials/github-card.html`: GitHub profile card shown on the homepage.
- `_markup/render-blockquote.html`: render hook for `[!NOTE]`-style callout blockquotes.

Override any of these by copying the file into your site's own `layouts/` directory with the same relative path. Hugo will prefer the site's version over the theme's.
