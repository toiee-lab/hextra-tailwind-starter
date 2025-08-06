---
title: "Getting Started"
weight: 1
---

# 🚀 Getting Started

Welcome to your Hugo + Hextra + Tailwind CSS starter kit! This guide will help you set up your development environment and start building your site.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Hugo** (Extended version recommended)
- **Node.js** and **npm** (for Tailwind CSS)
- **Git** (for version control)

## Installation

{{% steps %}}

### Clone the repository

```bash
git clone <your-repo-url> my-site
cd my-site
```

### Install dependencies

```bash
# Install Hugo modules
hugo mod tidy

# Install Node.js dependencies
npm install
```

### Start the development server

```bash
npm run dev
```

Your site should now be running at http://localhost:1313

{{% /steps %}}

## Project Structure

Here's an overview of the project structure:

```
my-site/
├── content/           # Your content files
│   ├── _index.md     # Homepage
│   └── docs/         # Documentation section
├── layouts/          # Custom layouts
├── static/           # Static files (images, etc.)
├── assets/           # CSS and other assets
├── hugo.yaml         # Hugo configuration
└── package.json      # Node.js dependencies
```

## Writing Content

### Creating a new page

Create a new Markdown file in the `content/` directory:

```bash
hugo new docs/new-page.md
```

### Using Hextra shortcodes

Hextra provides many useful shortcodes for enhanced content:

#### GitHub Alerts

> [!NOTE]
> This is a note using GitHub Alert syntax.

> [!TIP]
> This is a helpful tip!

> [!WARNING]
> This is a warning message.

#### Cards

{{< cards >}}
  {{< card link="/docs" title="Documentation" icon="book-open" >}}
  {{< card link="/blog" title="Blog" icon="pencil" >}}
{{< /cards >}}

#### Steps

{{% steps %}}

### Step 1
First step description

### Step 2
Second step description

{{% /steps %}}

#### Details (Collapsible)

{{< details title="Click to expand" closed="true" >}}
Hidden content goes here.
{{< /details >}}

### Custom Styling with Tailwind CSS

You can use Tailwind CSS classes with the `tl-` prefix for custom styling:

{{< rawhtml >}}
<div class="tl-bg-blue-100 tl-border tl-border-blue-200 tl-rounded-lg tl-p-4 tl-mb-4">
  <h4 class="tl-text-blue-800 tl-font-semibold tl-mb-2">Custom Styled Box</h4>
  <p class="tl-text-blue-700">This box uses Tailwind CSS classes with the tl- prefix.</p>
</div>
{{< /rawhtml >}}

## Next Steps

- Explore the [Customization](customization) guide
- Learn about [Deployment](deployment) options
- Check out the [Hugo documentation](https://gohugo.io/documentation/)
- Browse the [Hextra theme documentation](https://imfing.github.io/hextra/)

{{< rawhtml >}}
<span class="sr-only">Hugo getting started tutorial setup guide Hextra theme development</span>
{{< /rawhtml >}}