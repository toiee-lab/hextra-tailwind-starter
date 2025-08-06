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
| **独自デザイン** | Tailwind CSS v3.4.3 + カスタムCSS | `tl-` | rawhtml内 |

### 自動クラス追加システム

#### 自動検出の仕組み
1. **コンテンツスキャニング**: PostCSS設定で以下のファイルを監視
   - `./content/**/*.md` - Markdownコンテンツ
   - `./layouts/**/*.html` - Hugoテンプレート
   - `./static/**/*.html` - 静的HTMLファイル
   - `./hugo_stats.json` - Hugo生成統計

2. **リアルタイム処理**: Hugo開発サーバーで自動的にクラス生成
3. **ビルド時最適化**: 未使用クラスの自動削除

#### 独自デザイン使用例
```html
{{< rawhtml >}}
<div class="tl-hero-section tl-gradient-primary">
  <h1 class="tl-title-hero tl-text-glow">独自デザイン</h1>
  <p class="tl-subtitle-large">tl-プレフィックスで特別なスタイリング</p>
</div>
{{< /rawhtml >}}
```

---

# 🛠️ 開発環境・セットアップ

## 初期セットアップ
```bash
# リポジトリをクローン
git clone <your-repo-url> my-site
cd my-site

# Hugoモジュールの依存関係を整理
hugo mod tidy

# Node.js依存関係をインストール（Tailwind CSS用）
npm install
```

## 開発サーバー
```bash
# 開発サーバーを起動（推奨：キャッシュ無効化付き）
hugo server --logLevel debug --disableFastRender -p 1313 --noHTTPCache

# ドラフト記事も含めて起動
hugo server -D --logLevel debug --disableFastRender -p 1313 --noHTTPCache

# npm scriptsを使用
npm run dev

# 特定のポートで起動
hugo server -p 8080 --noHTTPCache
```

## ビルドとテスト
```bash
# 本番用ビルド
hugo --gc --minify

# npm scriptsを使用
npm run build

# Hugoモジュールの更新
hugo mod get -u
hugo mod tidy
```

## Tailwind CSS関連コマンド
```bash
# PostCSSでTailwind CSSをコンパイル（開発時は自動）
npx postcss assets/css/tailwind-enhanced.css -o assets/css/compiled/tailwind-enhanced.css

# Tailwind CSSの更新
npm update tailwindcss @tailwindcss/postcss
```

## Git ワークフロー

| コマンド | 用途 | 備考 |
|----------|------|------|
| `hugo server -D` | ローカル開発サーバー起動 | ドラフト記事も表示 |
| `hugo` | 本番用ビルド | `public/`フォルダに出力 |
| `git add . && git commit -m "メッセージ"` | 変更のコミット | 適切なコミットメッセージを |
| `git push origin main` | リモートへプッシュ | Netlifyが自動デプロイ |

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

### ファイル構造の基本ルール

| ファイル種別 | 役割 | URL生成 |
|-------------|------|---------|
| `_index.md` | セクションのインデックスページ | `/section/` |
| 通常の`.md`ファイル | 個別ページ | `/section/page-name/` |
| ディレクトリ構造 | URL構造と直結 | フォルダ階層 = URL階層 |
| サイドバー | 自動生成 | アルファベット順（`weight`で調整可能） |

## レイアウトシステム

### 利用可能なレイアウトタイプ

| レイアウト | 用途 | 特徴 |
|-----------|------|------|
| **docs** | ドキュメント | サイドバー付き、階層構造対応 |
| **blog** | ブログ投稿 | 時系列表示、アーカイブ機能 |
| **default** | 通常ページ | シンプルな単体ページ |
| **landing** | ランディングページ | カスタムデザイン用 |

#### レイアウトの指定方法

セクションの`_index.md`で`type`を指定：

```yaml
---
title: "ドキュメント"
type: docs
---
```

## Hugo設定 (hugo.yaml)

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
    displayLogo: false

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
    enable: true
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
    - name: GitHub
      url: "https://github.com/your-org/your-repo"
      weight: 4
      params:
        icon: github
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

---

# 📝 コンテンツ作成ガイド

## Markdownとショートコード

### GitHub Alerts（推奨）

```markdown
> [!NOTE]
> 重要な情報をハイライト表示

> [!TIP]
> 便利なヒントやコツ

> [!WARNING]
> 注意が必要な内容

> [!CAUTION]
> 危険な操作や重大な注意点
```

### Hextraショートコード

#### Steps（手順表示）
```markdown
{{% steps %}}

### Step 1
最初のステップの説明

### Step 2
次のステップの説明

{{% /steps %}}
```

#### Cards（カード表示）
```markdown
{{< cards >}}
  {{< card link="/docs/getting-started" title="Getting Started" >}}
  {{< card link="/docs/features" title="Features" >}}
{{< /cards >}}
```

#### Details（折りたたみ）
```markdown
{{< details title="詳細を見る" closed="true" >}}
詳細な内容をここに記述
{{< /details >}}
```

#### Callout（注意喚起）
```markdown
{{< callout type="info" >}}
情報メッセージ
{{< /callout >}}

{{< callout type="warning" >}}
警告メッセージ
{{< /callout >}}
```

## HTMLとTailwind CSSを使ったカスタムデザイン

rawhtmlショートコードを使用してカスタムHTML要素を追加：

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
<span class="sr-only">Hugo 静的サイト Hextra テーマ Tailwind CSS</span>
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
│   ├── introduction.md     # 英語（デフォルト）
│   ├── introduction.ja.md  # 日本語
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