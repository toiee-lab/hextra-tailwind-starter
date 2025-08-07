# CLAUDE.md - Project Guide

This file provides guidance for Claude Code (claude.ai/code) when working with this repository.

## Project Overview

**Hugo + Hextra + Tailwind CSS** starter kit for modern documentation and blog sites, optimized for Claude Code development.

### Tech Stack
- **Static Site Generator**: Hugo with Hextra theme (as module)
- **Styling**: Tailwind CSS v3.4.3 with `tl-` prefix for custom styles
- **Search**: Built-in FlexSearch
- **Deploy**: Netlify (auto-deploy on main branch push)

## Project Structure

```
├── hugo.yaml              # Main config
├── content/               # Content files
│   ├── _index.md         # Homepage
│   ├── docs/             # Documentation section
│   └── blog/             # Blog section
├── static/               # Static assets
├── layouts/              # Custom layouts
└── assets/css/           # Styles
```

## Content Creation Rules

### Important Notes
- **NO H1 headers** in content (except landing layout) - Front Matter title is used as H1
- Use `<!--more-->` for excerpts
- Prefer Markdown unless custom HTML is explicitly needed
- Only create documentation files when explicitly requested

### Layouts
- **docs**: Documentation with sidebar
- **blog**: Blog posts with chronological order
- **landing**: Custom design pages
- **default**: Simple pages

### Front Matter
```yaml
---
title: "Page Title"
date: 2025-01-01
weight: 10              # Sidebar order
type: docs              # Section type
toc: true               # Table of contents
---
```

## Styling System

### Standard vs Custom
- **Standard**: Use Hextra theme + Markdown
- **Custom**: Use `tl-` prefixed Tailwind classes in rawhtml

### Custom Design Example
```html
{{< rawhtml >}}
<div class="tl-hero-section tl-p-6">
  <h3 class="tl-text-xl tl-font-bold">Feature</h3>
</div>
{{< /rawhtml >}}
```

**Note**: Responsive prefixes don't use `tl-`:
- ✅ Correct: `md:tl-grid-cols-2`
- ❌ Wrong: `tl-md:tl-grid-cols-2`

## Hextra Shortcodes

- Refer to `project-docs/hextra-markdown.md` for Hextra-specific shortcodes
- Pay attention to `card` and `details` syntax
- Use icons from `project-docs/hextra-icons.md` or emojis

## Search Optimization

Add hidden keywords for search:
```markdown
{{< rawhtml >}}
<span class="hx-sr-only">keywords for search</span>
{{< /rawhtml >}}
```

## Configuration (hugo.yaml)

For navigation, sidebar, footer settings, refer to `project-docs/hextra-configuration.md` when needed.

### Key Settings
```yaml
baseURL: "https://your-site.netlify.app"
languageCode: "en"
title: "Site Title"

module:
  imports:
    - path: github.com/imfing/hextra

params:
  theme:
    default: system
  search:
    enable: true
    type: flexsearch
```

## Critical Build Settings

- `build.writeStats: true` - Required for Tailwind CSS purging
- `markup.goldmark.renderer.unsafe: true` - Required for rawHTML shortcode
- `markup.highlight.noClasses: false` - Required for Hextra syntax highlighting

## Development

See `README.md` for setup instructions.

## Key Reminders

1. **NEVER** create files unless absolutely necessary
2. **ALWAYS** prefer editing existing files
3. **NEVER** proactively create documentation unless requested
4. Use Markdown by default, HTML only when explicitly needed
5. Check existing code patterns before implementing new features