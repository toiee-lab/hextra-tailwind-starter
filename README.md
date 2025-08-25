# 🚀 Hextra + Tailwind CSS Starter Kit

> [!NOTE]
> [デモはこちら](https://hextra-tailwind-starter.netlify.app/)
> 現在は、v0.3


Claude CodeでHugoサイトを構築するための、すぐに使えるスターターキットです。HextraテーマとTailwind CSSを統合し、効率的な開発環境を提供します。

## ✨ 特徴

- **Hugo + Hextra**: モダンなドキュメントサイト用テーマ
- **Tailwind CSS 統合**: カスタムスタイリング
- **Claude Code対応**: 専用エージェントと権限設定済み
- **FlexSearch**: 高速全文検索機能内蔵
- **レスポンシブ**: モバイル・タブレット・デスクトップ対応
- **ダークモード**: 自動切り替え対応
- **Netlify Ready**: そのままデプロイ可能

## 🛠️ 技術スタック

| 項目 | 技術 | バージョン |
|------|------|-----------|
| 静的サイト生成 | Hugo | Latest |
| テーマ | Hextra | v0.9.7 |
| CSS フレームワーク | Tailwind CSS | ^3.4.3 |
| ビルドツール | PostCSS | ^8.4.38 |
| 検索 | FlexSearch | 内蔵 |

## 🚀 クイックスタート

### 1. セットアップ

最初に英語名でプロジェクト名を決めて下さい。例えば、 toiee.jp のサイトを作る予定なら、シンプルに「toiee-jp」などです。

```bash
# リポジトリをクローン
git clone https://github.com/toiee-lab/hextra-tailwind-starter.git projectname 
cd projectname

# リモート接続を削除
git remote remove origin

# Hugo モジュールを初期化
hugo mod init projectname
hugo mod get github.com/imfing/hextra
hugo mod tidy

# Node.js 依存関係をインストール
npm install

# 起動テスト
npm run dev
```

ブラウザで http://localhost:1313 を開いて確認してください。

`Ctrl+C` で、サーバーを停止できます。

### 2. 開発サーバー起動

```bash
# 開発サーバーを起動
npm run dev
# または
hugo server --logLevel debug --disableFastRender -p 1313 --noHTTPCache

# ドラフト記事も含めて起動
hugo server -D
```

ブラウザで http://localhost:1313 を開いて確認してください。


## Git ワークフロー

| コマンド | 用途 | 備考 |
|----------|------|------|
| `hugo server -D` | ローカル開発サーバー起動 | ドラフト記事も表示 |
| `hugo` | 本番用ビルド | `public/`フォルダに出力 |
| `git add . && git commit -m "メッセージ"` | 変更のコミット | 適切なコミットメッセージを |
| `git push origin main` | リモートへプッシュ | Netlifyが自動デプロイ |

### 3. ビルドとデプロイ

```bash
# 本番用ビルド
npm run build
# または
hugo --gc --minify
```


### Tailwind CSS関連コマンド

```bash
# PostCSSでTailwind CSSをコンパイル（開発時は自動）
npx postcss assets/css/tailwind-enhanced.css -o assets/css/compiled/tailwind-enhanced.css

# Tailwind CSSの更新
npm update tailwindcss @tailwindcss/postcss
```

## 📁 プロジェクト構造

```
project/
├── hugo.yaml              # Hugo設定ファイル
├── content/               # コンテンツディレクトリ
│   ├── _index.md         # ホームページ
│   └── docs/             # ドキュメントセクション
├── layouts/              # カスタムレイアウト
├── static/               # 静的ファイル
├── assets/css/           # スタイルファイル
├── .claude/              # Claude Code設定
│   ├── settings.local.json
│   └── agents/           # 専用エージェント
└── package.json          # Node.js設定
```

## 🎨 Tailwind CSS カスタマイゼーション

このスターターキットではTailwind CSS v4のクラスを使用します。

### 基本的な使い方

layout に landing を指定します。

```html
{{< rawhtml >}}
<div class="bg-blue-500 text-white p-4 rounded-lg">
  カスタムデザイン要素
</div>
{{< /rawhtml >}}
```

### 設定カスタマイズ

`tailwind.config.js`でカラーパレットやスペーシングを調整できます：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#3b82f6',
        600: '#2563eb',
        // ...
      }
    }
  }
}
```

## 📝 Markdown & ショートコード

Hextraテーマの豊富なショートコードが利用できます：

### GitHub Alerts（推奨）

```markdown
> [!NOTE]
> 重要な情報をハイライト

> [!WARNING]
> 注意が必要な内容

> [!TIP]
> 便利なヒント
```

### Steps（手順表示）

```markdown
{{% steps %}}

### Step 1
最初のステップの説明

### Step 2
次のステップの説明

{{% /steps %}}
```

### Cards（カード表示）

```markdown
{{< cards >}}
  {{< card link="/docs/getting-started" title="Getting Started" >}}
  {{< card link="/docs/features" title="Features" >}}
{{< /cards >}}
```

### Details（折りたたみ）

```markdown
{{< details title="詳細を見る" closed="true" >}}
詳細な内容をここに記述
{{< /details >}}
```

## 🤖 Claude Code 専用機能とヒント

Claude Codeを使って、Webサイトを構築しやすいように、専用の `CLAUDE.md` を作成しました。この内容をベースに、ご自身のプロジェクトに合わせて追記したり、作り直して下さい。あなたからの依頼を処理する際に、適切な動作をするように、細かく知識や、前提、情報源などを与えています。

### 専用エージェント

- **hugo-content-optimizer**: コンテンツをHextra形式に最適化
- **search-keyword-generator**: 検索キーワードを自動生成

### 権限設定

`.claude/settings.local.json`でHugo/Tailwind開発に必要なコマンド権限を設定済み。

### Claude Projectを活用

1. Claude.ai でログインし、設定でGithubと連携を有効にしておく
2. プロジェクトの新規作成
3. ナレッジの追加で、 `https://github.com/imfing/hextra.git` を入れる
4. `exampleSite/content/docs` を追加する（これにより、Hextraのショートコードなどを理解してもらえる）

## 🚀 デプロイ設定

### Netlify

`netlify.toml`が設定済みで、以下の環境で自動デプロイされます：

- **Hugo Version**: 0.147.7
- **Build Command**: `hugo --gc --minify -b ${DEPLOY_PRIME_URL}`
- **Publish Directory**: `public`

### その他のプラットフォーム

- **Vercel**: `hugo --gc --minify`
- **GitHub Pages**: Actions設定が必要
- **Cloudflare Pages**: 自動検出対応

## ⚙️ 設定カスタマイズ

### hugo.yaml

```yaml
title: "Your Site Title"
baseURL: "https://your-domain.com"
params:
  navbar:
    displayTitle: true
    displayLogo: true
  theme:
    default: system
    displayToggle: true
```

### メニュー設定

```yaml
menu:
  main:
    - name: Documentation
      pageRef: /docs
      weight: 1
    - name: Blog
      pageRef: /blog
      weight: 2
```

## 🔍 検索機能

FlexSearchが自動で設定されており、以下の要素をインデックス化します：

- ページタイトル
- ページ内容
- 見出し

検索キーワードを追加したい場合：

```markdown
{{< rawhtml >}}
<span class="hx:sr-only">検索用キーワード Claude AI Hugo 開発</span>
{{< /rawhtml >}}
```

## 📚 参考リンク

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Hextra Theme](https://imfing.github.io/hextra/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Claude Code](https://claude.ai/code)

## 🆘 サポート

- Issues: [GitHub Issues](https://github.com/toiee-lab/hextra-tailwind-starter/issues)


---

**Happy Coding with Claude! 🎉**