---
name: hugo-content-optimizer
description: HugoとHextraテーマでMarkdownコンテンツを分析し、最適化推奨事項を提示するスキル。「コンテンツを調整して」「Hugoに合うように調整して」といったリクエストに使用します。
---

# Hugo Content Optimizer

Hugo + Hextra テーマ環境でのコンテンツ分析・最適化推奨スキル。

## When to Use

Invoke this skill when:
- 新しいMarkdownファイルをHugoサイトに追加した後
- 「コンテンツを調整して」「Hugoに合うように最適化して」と要求された場合
- Hextraショートコードの適用候補を確認したい場合
- Front Matterの推奨事項を確認したい場合

## Analysis Script

Use the content analyzer:

```bash
node .claude/skills/hugo-content-optimizer/content-analyzer.js [options]
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
node .claude/skills/hugo-content-optimizer/content-analyzer.js --file content/docs/getting-started.md

# Analyze all content
node .claude/skills/hugo-content-optimizer/content-analyzer.js

# Detailed output
node .claude/skills/hugo-content-optimizer/content-analyzer.js --verbose
```

## Optimization Categories

### 1. Front Matter Recommendations

Required fields:
- `title`: Page title (used as H1)
- `date`: Publication date
- `weight`: Sidebar order (for docs)

Optional but recommended:
- `toc`: Table of contents (true for long pages)
- `breadcrumbs`: Navigation breadcrumbs
- `type`: Section type (docs, blog)

### 2. Hextra Shortcode Opportunities

The analyzer detects opportunities to use Hextra shortcodes:

| Pattern | Suggested Shortcode |
|---------|---------------------|
| Important notes | `{{% callout %}}` or GitHub Alerts |
| Sequential steps | `{{% steps %}}` |
| Collapsible content | `{{< details >}}` |
| Feature cards | `{{< cards >}}` |
| Alternative views | `{{< tabs >}}` |
| Internal links | `{{< ref >}}` |

### 3. Content Structure

- Heading hierarchy (start with H2 since title is H1)
- Paragraph length optimization
- List formatting
- Code block syntax highlighting

### 4. Hugo-specific Formatting

- Proper shortcode syntax (`{{% %}}` vs `{{< >}}`)
- Internal link format
- Image optimization
- Excerpt markers (`<!--more-->`)

## Report Format

```
# Content Optimization Report

## File: content/docs/example.md

### Front Matter Analysis

#### Current Front Matter
title: "Example Page"
date: 2025-01-01

#### Recommendations
- Add `weight` for sidebar ordering
- Add `toc: true` for this long document
- Consider adding `breadcrumbs: true`

### Shortcode Opportunities

#### Callouts (Found: 3 opportunities)
Line 15: "**Note:**" pattern detected
- Suggest: {{% callout type="info" %}}

Line 42: "**Warning:**" pattern detected
- Suggest: {{% callout type="warning" %}}

#### Steps (Found: 1 opportunity)
Lines 25-45: Sequential numbered list detected
- Suggest: {{% steps %}}

#### Cards (Found: 1 opportunity)
Lines 80-95: Related links section detected
- Suggest: {{< cards >}}

### Structure Analysis

#### Headings
- H1 count: 0 (correct - title from Front Matter)
- H2 count: 5
- H3 count: 8
- Status: Proper hierarchy

#### Content Stats
- Word count: 1,234
- Paragraph count: 15
- Code blocks: 3
- Lists: 4

### Recommendations Summary

1. Add missing Front Matter fields
2. Convert 3 note patterns to callouts
3. Use steps shortcode for installation guide
4. Add cards for related pages section
```

## Shortcode Syntax Reference

### Callouts
```markdown
{{% callout type="info" %}}
Your content here
{{% /callout %}}
```

Types: `info`, `warning`, `error`

### GitHub Alerts (Alternative)
```markdown
> [!NOTE]
> Your note here

> [!WARNING]
> Your warning here
```

### Steps
```markdown
{{% steps %}}

### Step 1

Content for step 1

### Step 2

Content for step 2

{{% /steps %}}
```

### Details
```markdown
{{< details title="Click to expand" closed="true" >}}
Hidden content here
{{< /details >}}
```

### Cards
```markdown
{{< cards >}}
  {{< card link="/docs/page" title="Title" icon="rocket" >}}
  {{< card link="/docs/other" title="Other" icon="cog" >}}
{{< /cards >}}
```

### Tabs
```markdown
{{< tabs items="Tab1,Tab2" >}}

{{< tab >}}
Content for Tab 1
{{< /tab >}}

{{< tab >}}
Content for Tab 2
{{< /tab >}}

{{< /tabs >}}
```

## Common Issues to Detect

### Front Matter Issues
- Missing required fields
- Invalid YAML syntax
- Incorrect date format

### Content Issues
- H1 in content (should only be in title)
- Broken internal links
- Unclosed shortcodes
- Invalid shortcode syntax

### Hugo/Hextra Specific
- Wrong shortcode delimiter (`{{< >}}` vs `{{% %}}`)
- Missing language in code blocks
- Incorrect card syntax

## Important Notes

- This skill ONLY analyzes and recommends - it does NOT modify files
- File modifications are handled by Claude Code main conversation
- Always verify shortcode syntax before applying
- Reference `project-docs/hextra-markdown.md` for full documentation
- Use `hextra-icon-validator` skill when adding icons to cards
