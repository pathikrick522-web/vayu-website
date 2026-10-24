# ✈️ Team Vayu — Official Website

Welcome to the official repository for **Team Vayu**, an elite university UAV and drone engineering team.

Built with a high-performance, dark and chrome-silver metallic theme inspired by the official Team Vayu logo, featuring smooth GSAP scroll animations, auto-advancing event slideshows, achievements carousels, and responsive mobile design.

---

## 🚀 Live Demo & Structure

- **`index.html`** — Main single-page application with preloader, hero video/overlay, competitions, achievements, blog, team, gallery, sponsor popup, and footer.
- **`style.css`** — Custom styling, dark/metallic color palette, fluid typography (`Orbitron`, `Inter`, `Rajdhani`), and glassmorphism UI components.
- **`script.js`** — GSAP ScrollTrigger animations, progress-tracking preloader, responsive navigation, event slider, and modal logic.
- **`images/`** — Media assets and placeholders for drone photography, team workshops, competition highlights, and the official team logo.

---

## 🛠️ Getting Started

To run the website locally:

1. Clone or download this repository.
2. Open `index.html` directly in any modern web browser, or serve it using an HTTP server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Or using Node.js / npx
   npx serve .
   ```
3. Navigate to `http://localhost:8000` in your browser.

---

## 🎨 Customizing Media & Information

To update photos, videos, and team details:
- **Logo:** Replace `images/vayu-logo.png` with your transparent PNG logo.
- **Hero Video:** Place your video file at `images/hero-video.mp4`.
- **Competitions & Events:** Replace the images in `images/` (`hero-drone.jpg`, `competition-event.jpg`, `team-workshop.jpg`, `drone-product.jpg`).
- **Social & Contact Details:** Edit social handles, emails, and address in `index.html` under `#mainHeader` and `#contact`.

---

## 📄 License & Attribution

Designed and engineered for **Team Vayu**. All rights reserved.
