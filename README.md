# Pravaah Solutions Website

Static marketing website for Pravaah Solutions. No build step, no backend, no JavaScript framework.

Open `index.html` locally, or push the repository and enable GitHub Pages.

## Local preview

Open `index.html` in a browser, or serve the folder with any static file server.

## GitHub Pages

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Set the source to **Deploy from a branch**.
4. Choose `main` (or `master`) and `/ (root)`.
5. Save. The site will be available at `https://<user>.github.io/<repo>/`.

This repository includes a `CNAME` file for `www.pravaahsolutions.com`. Remove or edit it if you are not using that domain.

Relative paths are used throughout so the site also works from a project subdirectory.

## Configuration

Edit `js/script.js`:

```javascript
const CONFIG = {
    companyName: "Pravaah Solutions",
    email: "connect@pravaahsolutions.com",
    whatsappNumber: "YOUR_WHATSAPP_NUMBER",
    phone: "YOUR_PHONE_NUMBER",
    websiteUrl: "https://pravaahsolutions.com",
    formEndpoint: "",
};
```

- `whatsappNumber` should be digits with country code, for example `9198XXXXXXXX`.
- `formEndpoint` can be a Formspree, Web3Forms, Google Apps Script or similar URL. Leave it empty to fall back to WhatsApp or email.
- Brand colours live in `:root` at the top of `css/style.css`. Changing those variables rethemes the site.

## Replacing assets

| Asset | Path |
| --- | --- |
| Logo | `assets/images/logo.svg` (or swap the `src` to your PNG) |
| Favicon | `assets/icons/favicon.svg` |
| Founder photos | `assets/images/ketan-mestry.jpg`, `assets/images/gaurav-kothmire.jpg` |
| Scrapsure screenshots | `assets/screenshots/scrapsure-overview.png` and `scrapsure-shipments.png` |

If a PNG screenshot is added next to the SVG placeholder, the `<picture>` tags will prefer the PNG automatically.
