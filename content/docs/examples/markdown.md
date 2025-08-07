---
title: "Markdown例"
weight: 23
type: docs
---

# Markdownの基本記法とデモ

このページでは、Hugoで利用できるMarkdown記法の実例を紹介します。

## 見出し

見出しは`#`記号で作成できます：

### 中見出し
#### 小見出し
##### より小さい見出し

## テキスト装飾

**太字テキスト**と*斜体テキスト*、~~取り消し線~~、`インラインコード`が使用できます。

## リスト

### 順序なしリスト
- 項目1
- 項目2
  - ネストした項目
  - もう一つのネスト項目
- 項目3

### 順序ありリスト
1. 最初の項目
2. 二番目の項目
3. 三番目の項目

## リンクと画像

[外部リンクの例](https://gohugo.io/)

[内部リンクの例](/docs/getting-started/)

## 引用

> これは引用文の例です。
> 複数行にわたって引用することができます。
> 
> > ネストした引用も可能です。

## コードブロック

### インラインコード
変数`var example = "hello"`を定義します。

### コードブロック
```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

const message = greet("World");
console.log(message);
```

```yaml
# YAML設定例
title: "サイトタイトル"
baseURL: "https://example.com"
params:
  author: "作者名"
```

## テーブル

| 項目 | 説明 | 価格 |
|------|------|------|
| 商品A | 高品質な商品 | ¥1,000 |
| 商品B | お手頃価格 | ¥500 |
| 商品C | プレミアム商品 | ¥2,000 |

## 水平線

---

## タスクリスト

- [x] 完了したタスク
- [ ] 未完了のタスク
- [x] もう一つの完了タスク
- [ ] 進行中のタスク

## 脚注

ここに脚注の参照があります[^1]。

複数の脚注も使用できます[^note]。

[^1]: これは脚注の内容です。

[^note]: 名前付きの脚注例です。

## 数式（MathJax対応時）

インライン数式: $E = mc^2$

ブロック数式:
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$

## 特殊文字とエスケープ

HTML特殊文字: &lt;tag&gt; &amp; &quot;quote&quot;

Markdown記号のエスケープ: \*asterisk\* \`backtick\`

## 絵文字

GitHub風絵文字: :smile: :rocket: :heart: :thumbsup:

Unicode絵文字: 😊 🚀 ❤️ 👍