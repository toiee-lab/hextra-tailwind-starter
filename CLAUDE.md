# CLAUDE.md - Project Guide

This file provides guidance for Claude Code (claude.ai/code) when working with this repository.

## Project Overview

**Hugo + Hextra + Tailwind CSS** starter kit for modern documentation and blog sites, optimized for Claude Code development.

### Tech Stack
- **Static Site Generator**: Hugo with Hextra theme (as module)
- **Styling**: Tailwind CSS v4.1.12 with standard classes for custom styles
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

### Language

- User's Language is Japanese. You should to write content in Japanese
- If user instruct "Write contents in English", you can use English

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
- **Custom**: Use standard Tailwind classes in rawhtml

### Custom Design Example

At first, set `layout: landing` into Front Matter.

```html
{{< rawhtml >}}
<div class="hero-section p-6">
  <h3 class="text-xl font-bold">Feature</h3>
</div>
{{< /rawhtml >}}
```

Custom Design is "自由にデザイン" in Japanese.

**Note**: Use standard responsive prefixes:
- ✅ Correct: `md:grid-cols-2`
- ✅ Correct: `hover:scale-105`

### Image

### 画像取得プロセス
- 画像が提供されていない場合、`unsplash-image-finder`サブエージェントを呼び出してUnsplashから検索
- Unsplash URLを最適化: `https://images.unsplash.com/[photo-id]?w=800&q=80`
- 画像リンクが機能していることを常に確認
- lazy loadingとasync decodingを適用

### unsplash-image-finderサブエージェント
- Webページ作成・編集時に画像が必要でユーザーから提供されていない場合に使用
- dev-tools/unsplash-search.jsを利用してUnsplash APIで画像を検索
- Claudeの学習データからUnsplash画像を取得しない（リンク切れやハルシネーションを防ぐため）


## 🎨 Tailwind CSS Configuration

### Tailwind CSS v4 Integration
このプロジェクトはTailwind CSS v4.1.12を使用し、Hextra v0.10.2との互換性を保ちながら標準クラスを使用できます。

### よく使用するクラス
- **グラデーション**:
  - `bg-gradient-to-*` (br, r, b, l, t など)
  - `from-*`, `to-*`, `via-*` (色指定)
- **テキストグラデーション**:
  - `bg-clip-text`, `text-transparent`
- **アニメーション**:
  - `animate-*` (bounce, pulse, spin など)
- **トランスフォーム**:
  - `rotate-*`, `scale-*`, `translate-*`
- **その他の効果**:
  - `backdrop-blur-*`, `mix-blend-*`

### 新しいページ/コンポーネント作成時のチェックリスト
1. 標準的なTailwindクラスを使用
2. Hextraの`hx:`プレフィックスとの競合を避ける
3. `npm run build:css`でCSSをビルド
4. ブラウザで表示確認

### トラブルシューティング
- **クラスが効かない場合**: Hugo statsファイル（`hugo_stats.json`）にクラスが含まれているかチェック
- **ビルド後も反映されない**: PostCSSの処理を確認
- **Hextraとの競合**: Hextraは`hx:`と`hextra-`プレフィックスを使用

## Hextra Shortcodes

- Refer to `project-docs/hextra-markdown.md` for Hextra-specific shortcodes
- Pay attention to `card` and `details` syntax
- Use icons from `project-docs/hextra-icons.md` or emojis

## Search Optimization

Add hidden keywords for search:
```markdown
{{< rawhtml >}}
<span class="hx:sr-only">keywords for search</span>
{{< /rawhtml >}}
```

**注**: Hextraのクラス（`hx:`プレフィックス）はそのまま使用してください。

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
6. **ALWAYS** verify Tailwind classes are defined when using custom styles
