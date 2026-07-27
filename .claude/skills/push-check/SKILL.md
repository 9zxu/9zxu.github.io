---
name: push-check
description: Review a rewritten blog post before it's pushed, checking syntax, content correctness, completeness, and format/readability. Use whenever the user says they rewrote a post (e.g. hugo.md) and wants it checked before committing/pushing, or explicitly invokes /push-check.
argument-hint: [path to the post, defaults to content/posts/hugo.md]
---

Review the target post (the path passed as an argument, or `content/posts/hugo.md` if none given) against four checks. Read the whole file first, then work through the checks in order. Report findings grouped by check, most severe first; note the check header even for a check with no findings.

## 1. Syntax check

- YAML front matter parses (matched `---` delimiters, no stray colons/quotes breaking it).
- Fenced code blocks are all closed and tagged with a real language.
- Tables have matching column counts per row.
- Markdown links/images resolve: for a page bundle, image paths must be bare filenames (not `/images/...`), and the referenced file must actually exist in the bundle folder.
- Any embedded TOML/YAML/shell snippets are themselves syntactically valid.
- Hugo-specific syntax (shortcodes, `[!NOTE]`-style alert blockquotes, `{{ }}` template snippets shown as examples) is well-formed.

## 2. Content correctness check

Don't just read the prose, verify it against the real repository state:

- Every file path, config key, or command mentioned actually exists / runs as described. Grep for it, `cat` it, or run it rather than trusting the prose.
- Claims about current behavior match the current config (`config/_default/hugo.toml`, `archetypes/default.md`, `.gitignore`, workflow files under `.github/workflows/`), not a prior version of the setup.
- No section contradicts another section in the same post (a common failure mode after partial rewrites: one section describes the old workflow, another describes the new one).
- If the post claims a build works, verify with `hugo --gc --minify` from repo root and check the output/page count, then clean up (`rm -rf public resources`).

## 3. Content completion check

- No half-finished sections, dangling TODOs, or empty placeholders.
- Every claim that needs an example has one, and the example is complete enough to run as shown (no missing imports/steps).
- Front matter fields are all filled in sensibly (title, tags, categories, description) — none left blank or stale from a copy-paste.
- Headings promised in a table of contents or intro paragraph actually exist further down, and vice versa.

## 4. Format check

Check against three rules: highly readable, easy to find, concise explanation.

- Apply `~/.claude/WRITING_STYLE.md` if present: short sentences, active voice, no em dashes, bullets over run-on prose.
- Heading hierarchy is consistent and skimmable. A reader scanning only headings should be able to find any topic in the post.
- Explanations are as short as they can be without losing the "why". Cut restating what code already shows, keep the non-obvious reasoning.
- Code fences, callouts, and lists follow the same style already used elsewhere in this post (don't introduce a new formatting pattern for one section).
- **Long-paragraph diagnose:** flag any paragraph running more than ~4-5 sentences or mixing more than one idea. Propose a concrete split, not just "this is too long":
  - A sequence of steps → numbered list.
  - Several independent facts about one subject → bullet list.
  - A caveat, aside, or a "the old way still works" note → a `[!NOTE]`/`[!TIP]`/`[!WARNING]` callout, matching whichever alert type already appears elsewhere in the post.
  - Show the proposed rewrite, don't just point at the paragraph.

## Reporting

For each check, list concrete findings as `file:line — issue`. If a check passes cleanly, say so in one line instead of omitting it. End with a short punch list of what to fix before pushing, ordered by severity.
