---
name: search-keyword-generator
description: HugoサイトのFlexSearch機能を強化するため、コンテンツファイルを分析し検索キーワードを提案するスキル。「検索キーワードを追加して」「検索性を向上させて」といったリクエストに使用します。
---

# Search Keyword Generator

HugoサイトのFlexSearch検索機能を強化するためのキーワード分析・提案スキル。

## When to Use

Invoke this skill when:
- ユーザーが「検索キーワードを追加して」「検索性を向上させて」と明示的に要求した場合
- 新しいページが作成されスタイリングが完了した後
- 既存コンテンツの検索性を向上させたい場合

## Analysis Script

Use the keyword analyzer:

```bash
node .claude/skills/search-keyword-generator/keyword-analyzer.js [options]
```

### Options

| Option | Description |
|--------|-------------|
| `--file <path>` | Analyze specific file |
| `--dir <path>` | Analyze directory (default: content/) |
| `--verbose` | Show detailed analysis |
| `--json` | Output as JSON |

### Examples

```bash
# Analyze specific file
node .claude/skills/search-keyword-generator/keyword-analyzer.js --file content/docs/getting-started.md

# Analyze all content
node .claude/skills/search-keyword-generator/keyword-analyzer.js

# Detailed output
node .claude/skills/search-keyword-generator/keyword-analyzer.js --file content/blog/post.md --verbose
```

## Keyword Priority

### Highest Priority (Must Include)
1. **Page Title**: Main words from Front Matter `title`
2. **Major Headings**: Keywords from H2, H3 headings
3. **Domain-specific Terms**: Industry jargon, product names, service names
4. **Proper Nouns**: Person names, place names, company names, brand names

### High Priority
5. **Technical Terms**: Programming languages, frameworks, tool names
6. **Action Words**: Verbs users search for (setup, install, deploy)
7. **Problem-solving Words**: Troubleshooting terms (error, fix, solution)
8. **Frequent Concepts**: Important concepts mentioned multiple times

### Medium Priority
9. **Related Tech**: Related tools/libraries
10. **Category Terms**: Category or section descriptors
11. **Synonyms**: Alternative words for main keywords
12. **Variations**: Japanese kanji/hiragana/katakana variations

### Exclude
- Generic words: もの, こと, について
- Particles: の, を, に, は, が
- Too-short words: 1-2 character meaningless words
- Irrelevant words: Terms unrelated to content

## Implementation Format

Keywords are added using screen-reader-only spans:

```html
{{< rawhtml >}}
<span class="hx:sr-only">keyword1 keyword2 keyword3</span>
{{< /rawhtml >}}
```

### Placement
- At the end of content, before closing tags
- After the main content body
- Not inside other shortcodes

### Formatting Rules
- Space-separated keywords
- Lowercase (except proper nouns)
- No duplicates of visible content
- 10-30 keywords per page

## Report Format

```
# Keyword Analysis Report

## File: content/docs/example.md

### Extracted Keywords

#### Highest Priority
- Hugo (from title)
- 設定 (from H2)
- Hextra (proper noun)

#### High Priority
- インストール (action word)
- 静的サイト (technical term)
- ビルド (action word)

#### Medium Priority
- ドキュメント (category)
- セットアップ (synonym)

### Suggested Implementation

{{< rawhtml >}}
<span class="hx:sr-only">Hugo 設定 Hextra インストール 静的サイト ビルド ドキュメント セットアップ</span>
{{< /rawhtml >}}

### Notes
- Existing keywords found: None
- Recommended keyword count: 15
```

## Quality Guidelines

### DO
- Focus on user search intent
- Include both Japanese and English terms for bilingual content
- Add abbreviation expansions (CSS → Cascading Style Sheets)
- Consider common misspellings
- Balance comprehensiveness with relevance

### DON'T
- Keyword stuff (avoid excessive keywords)
- Add irrelevant popular terms
- Duplicate visible content excessively
- Break HTML syntax
- Affect visual display

## Japanese Content Considerations

For Japanese content, include:
- Kanji variations: 設定, セットアップ
- Romaji for technical terms: Hugo, Hextra
- Both full and abbreviated forms: ドキュメント/ドキュメンテーション

## Update Strategy

When updating existing keywords:
1. Remove old keyword spans first
2. Analyze content changes
3. Keep valuable existing keywords
4. Add new relevant keywords
5. Document changes made

## Important Notes

- This skill ONLY analyzes and suggests - it does NOT modify files
- File modifications are handled by Claude Code main conversation
- Always verify suggested keywords are relevant
- Test search functionality after implementation
