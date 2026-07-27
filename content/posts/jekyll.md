---
date: '2025-11-29T00:00:00+08:00'
draft: false
title: 'Create Static Website with GitPage and Jekyll'
categories: ['Note']
tags: ['jekyll', 'github-pages', 'web']
---

- The theme: [chirpy](https://chirpy.cotes.page)
- Official tutorial: [setting up a github pages site with jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll)
- typography reference: [text and typography](https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/_posts/2019-08-08-text-and-typography.md?plain=1)

# workflow
1. make changes
2. local test
If the change is made in `_config.ymal` or it is the first-time building, run
```sh
bundle exec jekyll serve
```
then visit [http://localhost:4000](http://localhost:4000).
Otherwise, just save the file and jekyll will complete auto-regeneration, then refresh the demo page to view the changes.
3. state and commit
4. push to remote

> [!NOTE]
> Changes are updated once the file is save during local testing. However, if the change is made in `_config.ymal`, the site needs to be rebuilt by `bundle exec jekyll serve`.
