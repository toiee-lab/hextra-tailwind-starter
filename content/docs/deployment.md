---
title: "Deployment"
weight: 3
---

# 🚀 Deployment

Learn how to deploy your Hugo site to various hosting platforms and make it available to the world.

## Netlify (Recommended)

Netlify offers the easiest deployment experience with automatic builds from Git repositories.

{{% steps %}}

### Connect your repository

1. Push your code to GitHub, GitLab, or Bitbucket
2. Sign up for [Netlify](https://netlify.com) if you haven't already
3. Click "New site from Git" and connect your repository

### Configure build settings

Netlify should auto-detect Hugo, but you can manually set:

- **Build command**: `hugo --gc --minify`
- **Publish directory**: `public`
- **Hugo version**: Set in `netlify.toml` (already configured)

### Deploy

Click "Deploy site" and your site will be live in minutes!

{{% /steps %}}

The included `netlify.toml` file ensures optimal configuration:

```toml
[build]
publish = "public"
command = "hugo --gc --minify -b ${DEPLOY_PRIME_URL}"

[build.environment]
HUGO_VERSION = "0.147.7"
```

## Vercel

Vercel offers excellent performance and integration with Git providers.

{{% steps %}}

### Import project

1. Sign up for [Vercel](https://vercel.com)
2. Click "New Project" and import your Git repository
3. Vercel auto-detects Hugo and configures the build

### Custom configuration (optional)

Create a `vercel.json` file if you need custom settings:

```json
{
  "build": {
    "env": {
      "HUGO_VERSION": "0.147.7"
    }
  }
}
```

### Deploy

Your site will be deployed automatically on every push to your main branch.

{{% /steps %}}

## GitHub Pages

Deploy directly from your GitHub repository.

{{% steps %}}

### Create GitHub Actions workflow

Create `.github/workflows/hugo.yml`:

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.147.7'
          extended: true

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build with Hugo
        run: hugo --minify

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

### Enable GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select "GitHub Actions" as the source

### Push and deploy

Your site will be deployed automatically on every push to the main branch.

{{% /steps %}}

## Cloudflare Pages

Cloudflare Pages offers global CDN and excellent performance.

{{% steps %}}

### Connect repository

1. Sign up for [Cloudflare Pages](https://pages.cloudflare.com)
2. Click "Create a project" and connect your Git provider
3. Select your repository

### Configure build

Set the build configuration:

- **Build command**: `hugo --gc --minify`
- **Build output directory**: `public`
- **Root directory**: `/` (leave empty)

### Environment variables

Add these environment variables:

- `HUGO_VERSION`: `0.147.7`
- `NODE_VERSION`: `18`

### Deploy

Your site will be built and deployed automatically.

{{% /steps %}}

## Custom Server

For deployment on your own server or VPS:

{{% steps %}}

### Build locally

```bash
hugo --gc --minify
```

### Upload files

Upload the contents of the `public/` directory to your web server's document root.

### Configure web server

Ensure your web server is configured to serve static files and handle clean URLs.

{{% /steps %}}

## Domain Configuration

### Custom Domain on Netlify

1. Go to your site's "Domain settings"
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

### Custom Domain on Vercel

1. Go to your project's "Settings" → "Domains"
2. Add your custom domain
3. Configure your DNS records as instructed

### SSL/TLS

Most modern hosting platforms (Netlify, Vercel, Cloudflare Pages) provide automatic HTTPS certificates. For custom servers, consider using:

- [Let's Encrypt](https://letsencrypt.org/) for free SSL certificates
- Cloudflare for SSL proxy and CDN services

## Performance Optimization

### Image Optimization

Use Hugo's built-in image processing:

```markdown
{{< figure src="image.jpg" alt="Description" width="800" height="600" >}}
```

### CDN Configuration

Most hosting platforms include CDN by default. For custom deployments, consider:

- Cloudflare (free tier available)
- AWS CloudFront
- KeyCDN

### Caching Headers

Configure appropriate caching headers for static assets:

```
# Netlify _headers file
/*
  Cache-Control: public, max-age=31536000

/*.html
  Cache-Control: public, max-age=3600
```

## Monitoring and Analytics

### Google Analytics

Add your tracking ID to `hugo.yaml`:

```yaml
googleAnalytics: "G-MEASUREMENT-ID"
```

### Performance Monitoring

- **Lighthouse**: Built into Chrome DevTools
- **WebPageTest**: Free online testing tool
- **GTmetrix**: Performance analysis and monitoring

## Troubleshooting

### Common Issues

{{< details title="Build fails with module errors" closed="true" >}}
Run `hugo mod tidy` to clean up module dependencies.
{{< /details >}}

{{< details title="Styles not loading correctly" closed="true" >}}
Ensure PostCSS is processing your Tailwind CSS files correctly. Check that `build.writeStats` is enabled in `hugo.yaml`.
{{< /details >}}

{{< details title="Images not displaying" closed="true" >}}
Verify image paths are correct relative to the `static/` directory.
{{< /details >}}

> [!TIP]
> Always test your deployment locally with `hugo server` before pushing to production.

> [!NOTE]
> Different hosting platforms may have different build environments. Always check the platform's documentation for specific requirements.

{{< rawhtml >}}
<span class="sr-only">Hugo deployment hosting Netlify Vercel GitHub Pages Cloudflare Pages SSL CDN performance</span>
{{< /rawhtml >}}