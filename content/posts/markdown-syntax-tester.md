---
date: '2026-07-26T16:00:00+08:00'
draft: false
title: 'Markdown Syntax Tester'
description: 'A kitchen-sink page of Markdown elements for testing theme styles.'
tags: ['markdown', 'testing', 'theme']
---

Use this page to eyeball how every common Markdown element renders in the current theme. Nothing here is meant to make narrative sense — it exists purely as a visual stress test.

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## Paragraphs

This is a normal paragraph. It's meant to test line height, measure (max width), and paragraph spacing. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

This is a second paragraph, right after the first, so you can check the vertical rhythm between consecutive blocks of text.

## Text Formatting

**Bold text**, *italic text*, ***bold and italic text***, ~~strikethrough text~~, and `inline code`.

You can also mix them: **bold with `inline code`** and *italic with a [link](https://gohugo.io)*.

Here's a <sub>subscript</sub> and a <sup>superscript</sup>, plus a footnote reference.[^1]

[^1]: This is the footnote content.

## GitHub-Style Alert Blocks

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

## Blockquotes

> This is a simple blockquote. It should be visually distinct from a regular paragraph, usually with an indent or a left border.

> Blockquotes can also span
> multiple lines, and even
>
> > contain nested blockquotes
> > like this one.

## Lists

### Unordered List

- First item
- Second item
  - Nested item one
  - Nested item two
    - Deeply nested item
- Third item

### Ordered List

1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

### Task List

- [x] Completed task
- [x] Another completed task
- [ ] Incomplete task
- [ ] Another incomplete task

### Mixed List

1. Ordered item with an unordered sub-list:
   - Sub-item one
   - Sub-item two
2. Ordered item with a code snippet:
   ```bash
   echo "nested code block"
   ```

## Code

Inline code looks like `const x = 42;`.

Fenced code block with no language:

```
plain text block
no syntax highlighting
```

Fenced code block with syntax highlighting:

```javascript
function greet(name) {
  const message = `Hello, ${name}!`;
  console.log(message);
  return message;
}

greet('world');
```

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print(fibonacci(10))
```

```yaml
site:
  title: Markdown Syntax Tester
  draft: false
  tags:
    - markdown
    - testing
```

## Tables

| Element      | Supported | Notes                        |
|--------------|:---------:|-------------------------------|
| Headings     |    ✅     | h1–h6                         |
| Bold/Italic  |    ✅     | Including combined            |
| Code blocks  |    ✅     | Fenced, with/without language |
| Tables       |    ✅     | Including alignment           |
| Alerts       |    ⚠️      | Theme-dependent                |

| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:---------------:|---------------:|
| a            | b               | c              |
| longer cell  | short           | 123.45         |

## Links and Images

An inline link to the [Hugo homepage](https://gohugo.io), a link with a title to the [CommonMark spec](https://commonmark.org "CommonMark Specification"), and a bare URL: https://example.org.

An automatic link: <https://gohugo.io>

An image with alt text:

![Placeholder image](https://placehold.co/600x300 "A placeholder image")

## Horizontal Rule

Content above the divider.

---

Content below the divider.

## Definition List

Term 1
: Definition for term 1.

Term 2
: Definition A for term 2.
: Definition B for term 2.

## Escaped Characters

\*Not italic\*, \[not a link\](nowhere), and a literal backslash: \\

## Line Breaks

This line ends with two trailing spaces to force a hard break.
This should appear on a new line without a new paragraph.

This is a separate paragraph after a blank line.

## Emoji and Special Characters

Emoji: 🎉 🚀 ✅ ⚠️ 🐛

Special characters: © ® ™ § ¶ † ‡ … — –

Smart quotes: "double quotes" and 'single quotes'.
