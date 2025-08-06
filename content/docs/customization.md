---
title: "Customization"
weight: 2
---

# 🎨 Customization

Learn how to customize your Hugo site with Hextra theme and Tailwind CSS to match your brand and requirements.

## Site Configuration

### Basic Settings

Edit the `hugo.yaml` file to customize basic site settings:

```yaml
title: "Your Site Title"
baseURL: "https://your-domain.com"
languageCode: "en"

params:
  navbar:
    displayTitle: true
    displayLogo: true
  theme:
    default: system  # light, dark, system
    displayToggle: true
```

### Menu Configuration

Customize the navigation menu:

```yaml
menu:
  main:
    - name: Documentation
      pageRef: /docs
      weight: 1
    - name: Blog
      pageRef: /blog
      weight: 2
    - name: GitHub
      url: "https://github.com/your-org/your-repo"
      weight: 3
      params:
        icon: github
```

## Styling with Tailwind CSS

### Using Tailwind Classes

This starter kit uses Tailwind CSS with the `tl-` prefix to avoid conflicts with the Hextra theme:

{{< rawhtml >}}
<div class="tl-grid tl-grid-cols-1 md:tl-grid-cols-2 tl-gap-4 tl-my-6">
  <div class="tl-bg-gradient-to-r tl-from-blue-500 tl-to-purple-600 tl-text-white tl-p-6 tl-rounded-lg">
    <h3 class="tl-text-xl tl-font-bold tl-mb-2">Gradient Card</h3>
    <p>This card uses Tailwind CSS gradients.</p>
  </div>
  <div class="tl-bg-gray-100 tl-p-6 tl-rounded-lg tl-border tl-border-gray-200">
    <h3 class="tl-text-xl tl-font-bold tl-mb-2 tl-text-gray-800">Simple Card</h3>
    <p class="tl-text-gray-600">This card uses simple background and border.</p>
  </div>
</div>
{{< /rawhtml >}}

### Custom Color Palette

Modify the `tailwind.config.js` file to customize your color palette:

```javascript
theme: {
  extend: {
    colors: {
      brand: {
        50: '#eff6ff',
        500: '#3b82f6',
        900: '#1e3a8a',
      }
    }
  }
}
```

### Responsive Design

Use Tailwind's responsive prefixes with your custom classes:

{{< rawhtml >}}
<div class="tl-text-sm md:tl-text-base lg:tl-text-lg tl-p-4 tl-bg-yellow-50 tl-border tl-border-yellow-200 tl-rounded">
  This text changes size based on screen width: small on mobile, base on tablet, large on desktop.
</div>
{{< /rawhtml >}}

## Custom Layouts

### Creating Custom Shortcodes

Create custom shortcodes in the `layouts/shortcodes/` directory. For example, create a feature box shortcode:

```html
<!-- layouts/shortcodes/feature-box.html -->
<div class="tl-bg-blue-50 tl-border tl-border-blue-200 tl-rounded-lg tl-p-6 tl-my-4">
  <h3 class="tl-text-blue-800 tl-font-semibold tl-text-lg tl-mb-2">
    {{ .Get "title" }}
  </h3>
  <p class="tl-text-blue-700">{{ .Inner | markdownify }}</p>
</div>
```

Then use it in your content:

```markdown
{{< feature-box title="Custom Feature" >}}
This is a custom feature box created with a shortcode.
{{< /feature-box >}}
```

### Page Layouts

Create custom page layouts in the `layouts/` directory:

```html
<!-- layouts/landing.html -->
{{ define "main" }}
<div class="tl-min-h-screen tl-bg-gradient-to-br tl-from-blue-50 tl-to-indigo-100">
  <div class="tl-container tl-mx-auto tl-px-4 tl-py-16">
    {{ .Content }}
  </div>
</div>
{{ end }}
```

## Logo and Branding

### Adding a Logo

1. Add your logo files to the `static/images/` directory
2. Update the `hugo.yaml` configuration:

```yaml
params:
  navbar:
    displayLogo: true
    logo:
      path: images/logo.svg
      dark: images/logo-dark.svg
      width: 40
      height: 40
```

### Custom Favicon

Replace the default favicon by adding your favicon files to the `static/` directory:

- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`

## Advanced Customization

### Custom CSS

Add custom CSS in the `assets/css/custom.css` file:

```css
/* Custom styles that work alongside Tailwind */
.my-custom-class {
  @apply tl-bg-blue-500 tl-text-white tl-p-4 tl-rounded;
}

/* Pure CSS for complex customizations */
.gradient-text {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Dark Mode Support

Tailwind CSS includes built-in dark mode support. Use the `dark:` prefix with your custom classes:

{{< rawhtml >}}
<div class="tl-bg-white dark:tl-bg-gray-800 tl-p-4 tl-rounded tl-border">
  <p class="tl-text-gray-800 dark:tl-text-gray-200">
    This content adapts to dark mode automatically.
  </p>
</div>
{{< /rawhtml >}}

## Testing Your Changes

Always test your customizations:

{{% steps %}}

### Run the development server

```bash
npm run dev
```

### Test on different screen sizes

Use your browser's developer tools to test responsive design.

### Check both light and dark modes

Toggle the theme switcher to ensure your customizations work in both modes.

### Build for production

```bash
npm run build
```

{{% /steps %}}

> [!TIP]
> Keep your customizations modular and well-documented for easier maintenance.

{{< rawhtml >}}
<span class="sr-only">Hugo Hextra customization Tailwind CSS theming branding responsive design</span>
{{< /rawhtml >}}