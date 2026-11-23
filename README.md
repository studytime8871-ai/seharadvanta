# SeharAdvanta - Digital Marketing Portfolio Website

A premium, responsive static portfolio website for **SeharAdvanta**, a digital marketing and social media management brand specializing in skincare, beauty, advertising, and social media growth.

## Overview

This website is a multi-page static portfolio with a sophisticated dark editorial visual identity. It includes:

- **Home** - Hero, brand intro, bento services preview, featured portfolio, values, testimonials, and CTA
- **About** - Story, skincare/beauty specialty, values, and collaboration types
- **Services** - Detailed service offerings, process steps, and FAQ accordion
- **Portfolio** - Filterable project grid with modal/lightbox project details
- **Contact** - WhatsApp contact, contact details, and validated mailto-based contact form

## Design Direction

- **Theme:** Dark, premium editorial with warm rose-gold and mauve accents
- **Layout:** Wider responsive containers, balanced image-to-content proportions, varied section surfaces
- **Typography:** Cormorant Garamond + Outfit
- **Interactions:** Mobile nav, scroll reveal, portfolio filters, modal, FAQ accordion, validated contact form, back-to-top

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid/Flexbox, responsive design, subtle animations
- **Vanilla JavaScript** - UI interactions and form validation
- **Google Fonts** - Cormorant Garamond + Outfit

No frameworks, no backend, no build tools required.

## Folder Structure

```text
seharadvanta/
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── contact.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── images/
        ├── about-portrait.jpg
        ├── beauty-accent.jpg
        ├── beauty-editorial.jpg
        ├── beauty-flatlay.jpg
        ├── creative-workspace.jpg
        ├── hero-beauty.jpg
        ├── hero-dark.jpg
        ├── portfolio-1.jpg
        ├── portfolio-2.jpg
        ├── portfolio-3.jpg
        ├── portfolio-4.jpg
        ├── portfolio-5.jpg
        ├── portfolio-6.jpg
        ├── service-ads.jpg
        ├── service-content.jpg
        ├── service-strategy.jpg
        ├── skincare-dark.jpg
        └── skincare-specialty.jpg
```

## Running Locally

Because this is a static website, you can run it locally in any of these ways:

### Option 1: Open directly
Open `index.html` in your browser.

### Option 2: VS Code Live Server (recommended)
1. Open the `seharadvanta` folder in VS Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html` and choose **Open with Live Server**.

### Option 3: Simple local server
```bash
# Python 3
python -m http.server 5500
```
Then open `http://localhost:5500`.

## WhatsApp Integration

- **Display number:** +92 308 1415969 / 03081415969
- **WhatsApp link:** https://wa.me/923081415969
- Floating WhatsApp button appears on every page and opens chat in a new tab.

## Contact Form

The contact form is static-site friendly (no backend). It includes:
- Client-side validation (name, email, service, message)
- Inline error messages and success feedback
- A `mailto:` handoff to `seharfatima989898@gmail.com`

To change the recipient email, update:
- `assets/js/main.js` (search for `mailto:seharfatima989898@gmail.com`)
- Footer/contact email links in HTML files

## Customization

- **Colors & typography:** Edit CSS variables at the top of `assets/css/style.css`.
- **Content:** Update text directly in HTML files.
- **Images:** Replace files in `assets/images/` (keep names or update `src` paths).
- **Social links:** Replace placeholder Instagram/Facebook/LinkedIn URLs in footers.
- **WhatsApp number:** Update `923081415969` links and displayed number across HTML/JS.

## Deployment

Deploy the project root as-is on Cloudflare Pages, Netlify, or GitHub Pages (no build step needed).

## Image Credits

Images were sourced from [Unsplash](https://unsplash.com/) for portfolio/demo use. Review Unsplash licensing before commercial production use and replace with brand-owned assets as needed.