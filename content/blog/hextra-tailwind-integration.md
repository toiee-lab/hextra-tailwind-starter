---
title: "Hextra + Tailwind CSS統合：美しさと柔軟性の両立"
date: 2025-01-20
weight: 20
---

前回のポストでプロジェクトの全体像をお話ししましたが、今回は最も重要な技術的決定の一つ、**HextraテーマとTailwind CSSの統合**について深掘りします。

<!--more-->

## 課題：2つのスタイリングシステムの共存

プロジェクト初期に直面した最大の課題は、Hextraテーマの既存スタイルとTailwind CSSのユーティリティクラスを衝突させずに共存させることでした。

### 解決策：プレフィックス戦略

```javascript
// tailwind.config.js
module.exports = {
  // No prefix needed for Tailwind v4 and Hextra compatibility
  content: [
    './content/**/*.md',
    './layouts/**/*.html',
    './hugo_stats.json'
  ],
  theme: {
    extend: {
      // カスタムデザインシステム
    }
  }
}
```

Tailwind CSS v4とHextra v0.10+では、適切な名前空間により衝突を回避できます。

## デザインシステムの階層化

| レイヤー | 用途 | 実装 |
|---------|------|------|
| **ベース** | Hextraテーマのデフォルト | 通常のMarkdown |
| **拡張** | カスタムコンポーネント | 標準Tailwindクラス |
| **特別** | ランディングページ | フルカスタムHTML |

### 実際の使用例

```html
{{< rawhtml >}}
<div class="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg">
  <h3 class="text-white text-2xl font-bold">
    カスタムヒーローセクション
  </h3>
  <p class="text-blue-100 mt-4">
    Hextraの美しさとTailwindの柔軟性を両立
  </p>
</div>
{{< /rawhtml >}}
```

## PostCSSによる自動最適化

開発効率を向上させるため、PostCSSで自動処理パイプラインを構築：

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Hugo開発サーバーが自動的に：
1. Markdownをスキャン
2. 使用されているクラスを検出
3. 必要なCSSのみを生成

## 開発体験の向上

この統合により実現できたこと：

- 🎨 **統一されたデザインシステム**
- ⚡ **高速な開発サイクル**
- 🔧 **完全なカスタマイズ自由度**
- 📱 **レスポンシブ対応の簡素化**

次回は、このプロジェクトをClaude Codeでの開発に最適化した際の工夫について書きます！