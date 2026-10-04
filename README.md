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
    whatsappNumber: "918149405841",
    phone: "YOUR_PHONE_NUMBER",
    websiteUrl: "https://pravaahsolutions.com",
    formEndpoint: "",
};
```

- `whatsappNumber` should be digits with country code, for example `9198XXXXXXXX`.
- `formEndpoint` can be a Formspree, Web3Forms, Google Apps Script or similar URL. Leave it empty to fall back to WhatsApp or email.
- Brand colours live in `:root` at the top of `css/style.css`.

## Portfolio URLs

- Scrapsure App: https://app.scrapsure.in
- Scrapsure.in (product website): https://scrapsure.in
- Kaleshwar Arts: https://www.kaleshwararts.in

## Replacing assets

| Asset | Path |
| --- | --- |
| Logo | `assets/images/logo.png` |
| Favicon | `assets/icons/favicon.png` |
| Hero laptop | `assets/images/hero-laptop.png` |
| Scrapsure App login | `assets/screenshots/scrapsure-app-desktop.png`, `scrapsure-app-mobile.png` |
| Scrapsure.in | `assets/screenshots/scrapsure-in-desktop.png`, `scrapsure-in-mobile.png` |
| Kaleshwar Arts | `assets/screenshots/kaleshwar-desktop.png`, `kaleshwar-mobile.png` |
