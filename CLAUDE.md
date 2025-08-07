# 🚀 CLAUDE.md - プロジェクトガイド

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

---

# 🎯 プロジェクト概要

## プロジェクトの目的

**Hugo + Hextra + Tailwind CSS**を組み合わせた、モダンなドキュメントサイト・ブログサイトを構築するためのスターターキットです。Claude Codeでの開発に最適化されており、効率的なコンテンツ作成と管理が可能です。

## 🌟 特徴

- **Hextraテーマ**: 美しいドキュメントサイト用テーマ
- **Tailwind CSS統合**: `tl-`プレフィックスでカスタムデザイン
- **Claude Code最適化**: 専用エージェントと権限設定
- **FlexSearch**: 高速全文検索機能
- **レスポンシブデザイン**: 全デバイス対応

---

# 🏗️ 技術スタック・アーキテクチャ

## アーキテクチャ概要

このプロジェクトは**Hugo Static Site Generator**と**Hextraテーマ**をベースにした、学習コンテンツ配信サイトです。

| 項目 | 技術スタック |
|------|-------------|
| **静的サイト生成** | Hugo + Hextra テーマ（モジュールとして統合） |
| **スタイリング** | Tailwind CSS v3.4.3 + PostCSS + カスタムCSS |
| **コンテンツ管理** | Markdown + Hugo Front Matter |
| **検索** | FlexSearch（内蔵） |
| **ソース管理** | Git + GitHub |
| **デプロイ** | Netlify（Git連携自動デプロイ） |

## Hugo Modules 統合システム

### モジュール設定
```yaml
module:
  imports:
    - path: github.com/imfing/hextra
  mounts:
    - source: assets → target: assets
    - source: static → target: static  
    - source: node_modules → target: assets/node_modules
```

この設定により：
- Hextraテーマがモジュールとして動的に統合
- ローカルassets/staticが優先される（オーバーライド可能）
- Node.jsパッケージがHugoから参照可能

## 🎨 スタイリングシステム

### デザインアプローチ
| 用途 | 手法 | プレフィックス | 使用場所 |
|------|------|-------------|---------|
| **標準デザイン** | Hextraテーマ + Markdown | なし | 通常のコンテンツ |
| **独自デザイン** | Tailwind CSS v3.4.3 + カスタムCSS | `tl-` | rawhtml内、landingレイアウト推奨 |

### 独自デザイン使用例
```html
{{< rawhtml >}}
<div class="tl-hero-section tl-gradient-primary">
  <h1 class="tl-title-hero tl-text-glow">独自デザイン</h1>
  <p class="tl-subtitle-large">tl-プレフィックスで特別なスタイリング</p>
</div>
{{< /rawhtml >}}
```
### 自動クラス追加システム

1. **コンテンツスキャニング**: PostCSS設定で以下のファイルを監視
   - `./content/**/*.md` - Markdownコンテンツ
   - `./layouts/**/*.html` - Hugoテンプレート
   - `./hugo_stats.json` - Hugo生成統計
2. **リアルタイム処理**: Hugo開発サーバーで自動的にクラス生成
3. **ビルド時最適化**: 未使用クラスの自動削除

---

# 🛠️ 開発環境・セットアップ

`README.md` を参照して下さい

---

# 📁 プロジェクト構造・設定

## ディレクトリ構造

```
project/
├── hugo.yaml                 # メイン設定ファイル
├── content/                  # コンテンツディレクトリ
│   ├── _index.md            # ホームページ (/)
│   ├── docs/                # ドキュメントセクション
│   │   ├── _index.md        # ドキュメント一覧 (/docs/)
│   │   └── getting-started.md # 基本的なガイド
│   └── blog/                # ブログセクション（オプション）
│       ├── _index.md        # ブログ一覧 (/blog/)
│       └── first-post.md
├── static/                  # 静的ファイル
│   ├── images/             # 画像ファイル
│   └── favicon.ico         # ファビコン
├── layouts/                # カスタムレイアウト
│   ├── _partials/
│   └── shortcodes/
└── assets/css/             # スタイルファイル
    └── tailwind-enhanced.css
```



# Hugo および Hextra の設定 (hugo.yaml)

ナビ、サイドバー、右サイドバー、フッターなどの設定を行う場合、 hugo.yaml を使います。

`project-docs/hextra-configuration.md` を必要なときに参照して、設定を行なって下さい。


```yaml
# 基本設定
baseURL: "https://your-site.netlify.app"
languageCode: "ja"
title: "Your Site Title"

# モジュール設定
module:
  imports:
    - path: github.com/imfing/hextra

# パラメータ
params:
  # ナビゲーション
  navbar:
    displayTitle: true
    displayLogo: true

  # テーマ設定
  theme:
    default: system  # light, dark, system
    displayToggle: true

  # 検索設定
  search:
    enable: true
    type: flexsearch

  # 編集リンク
  editURL:
    enable: false
    base: "https://github.com/your-org/your-repo/edit/main/content"

# メニュー設定
menu:
  main:
    - name: Documentation
      pageRef: /docs
      weight: 1
    - name: Blog
      pageRef: /blog
      weight: 2
    - name: Search
      weight: 3
      params:
        type: search
```


---

# 📝 コンテンツ作成ガイド

## コンテンツ作成についての注意点

- landing レイアウト以外のレイアウトでは、Front Matter の title が見出し1として使われる
- 従って、見出し1は使わず、基本的にコンテンツは、すぐに文章からスタートする
- landing レイアウト以外のコンテンツは、基本的にMarkdownで作成すること（ユーザーの指示がない限り）
- 記事を別のページに呼び出すときのために `<!--more-->` を入れて、excerpt となるようにする

## レイアウトシステム

| レイアウト | 用途 | 特徴 |
|-----------|------|------|
| **docs** | ドキュメント | サイドバー付き、階層構造対応 |
| **blog** | ブログ投稿 | 時系列表示、アーカイブ機能 |
| **default** | 通常ページ | シンプルな単体ページ |
| **landing** | ランディングページ | カスタムデザイン用 |

### ファイル構造の基本ルール

| ファイル種別 | 役割 | URL生成 |
|-------------|------|---------|
| `_index.md` | セクションのインデックスページ | `/section/` |
| 通常の`.md`ファイル | 個別ページ | `/section/page-name/` |
| ディレクトリ構造 | URL構造と直結 | フォルダ階層 = URL階層 |
| サイドバー | 自動生成 | アルファベット順（`weight`で調整可能） |

### セクションののページ専用設定

セクションの`_index.md`で`type`を指定：

```yaml
---
title: "ドキュメント"
type: docs
---
```

## Front Matter設定

各Markdownファイルの先頭に設定するメタデータ：

```yaml
---
title: "ページタイトル"
date: 2025-01-01
weight: 10           # サイドバー表示順序
toc: true           # 目次表示の有無
excludeSearch: false # 検索対象から除外
editURL: "custom-edit-url"  # 個別編集URL
breadcrumbs: true   # パンくずリスト表示
sidebar:
  exclude: false    # サイドバーから除外
linkTitle: "短縮タイトル"  # パンくずリスト用
---
```

## Markdownとショートコード

- 一般的なMarkdown、GFM が使える
- Hextraテーマ独自のショートコードが使える
- Hextraテーマ独自のショートコードを使う場合、`project-docs/hextra-markdown.md` を参考にする
- 特に「 card や details の使い方」を間違うことが多いので、注意すること
- iconを使う場合は、 `project-docs/hextra-icons.md` にあるものに限定するか、絵文字を使う

## HTMLとTailwind CSSを使ったカスタムデザイン

自由にデザインする、landing レイアウトを使うページでは、rawhtmlショートコードを使用して、`tl-` プレフィックス付きのTailwind CSSでデザインする。

```html
{{< rawhtml >}}
<div class="tl-feature-card tl-shadow-lg tl-rounded-lg tl-p-6">
  <h3 class="tl-text-xl tl-font-bold tl-mb-4">機能名</h3>
  <p class="tl-text-gray-600">機能説明</p>
</div>
{{< /rawhtml >}}
```

## 検索最適化

### 検索用キーワードの設定方法

スクリーンリーダー専用クラスを使用：
```markdown
{{< rawhtml >}}
<span class="hx-sr-only">Hugo 静的サイト Hextra テーマ Tailwind CSS</span>
{{< /rawhtml >}}
```

---

# 🚀 デプロイ・運用

## デプロイメント設定

- **プラットフォーム**: Netlify（推奨）
- **トリガー**: `main`ブランチへのプッシュで自動デプロイ
- **ビルドコマンド**: `hugo --gc --minify -b ${DEPLOY_PRIME_URL}`
- **Hugo Version**: 0.147.7（netlify.tomlで指定）
- **ビルド時間**: 通常1-3分程度

## 重要な設定情報

### Hugo設定の注意点
- **`build.writeStats: true`**: Tailwind CSSのPurge最適化に必要
- **`markup.goldmark.renderer.unsafe: true`**: rawHTMLショートコードを使用するために必要
- **`markup.highlight.noClasses: false`**: Hextraのシンタックスハイライトに必要

### PostCSS設定
- **設定ファイル**: `postcss.config.js`
- **自動処理**: Hugo開発サーバーで自動的にPostCSSが実行される

## Hextraテーマの主要機能

| 機能 | 特徴 | メリット |
|------|------|----------|
| **レスポンシブデザイン** | モバイル・タブレット・デスクトップ対応 | すべてのデバイスで最適表示 |
| **ダークモード** | 自動切り替え対応 | ユーザビリティ向上 |
| **全文検索** | FlexSearch内蔵 | 設定不要で高速検索 |
| **多言語対応** | Hugo多言語モード | 国際化対応 |
| **高速表示** | JavaScript/Node.js不要 | 軽量・高速 |
| **SEO最適化** | Open Graph・Twitter Cards | ソーシャル共有最適化 |

## 多言語対応

ファイル名に言語コードを付与することで多言語サイトを構築：

```
content/
├── docs/
│   ├── introduction.md     # 日本語（デフォルト）
│   ├── introduction.en.md  # 英語
│   └── introduction.fr.md  # フランス語
```

## カスタマイズオプション

### スタイリング
| 項目 | ファイルパス | 用途 |
|------|-------------|------|
| **カスタムCSS** | `assets/css/tailwind-enhanced.css` | 独自スタイルの追加 |
| **Tailwind設定** | `tailwind.config.js` | プレフィックス・色設定 |
| **PostCSS設定** | `postcss.config.js` | ビルドプロセス設定 |
| **カスタムテンプレート** | `landing.html` | プレーンなテンプレート |