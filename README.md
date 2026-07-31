# Happy Hampers

A modern, animated e-commerce landing site for an Indian handmade gifting brand, built with React, Vite, Tailwind CSS and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/       one component per section (Navbar, Hero, FeaturedHampers, ...)
  data/              editable content: hampers, categories, testimonials, FAQs, gallery
  index.css          Tailwind + global styles, brand tokens
  App.jsx            composes the page
tailwind.config.js   full brand colour palette, fonts, custom animations
```

## Things to personalise before launch

- **WhatsApp number** — update `WHATSAPP_NUMBER` in `src/components/Customize.jsx` and the
  phone links in `src/components/Contact.jsx` and `src/components/WhatsAppButton.jsx`.
- **Contact details** — email, phone and studio address live in `src/components/Contact.jsx`.
- **Map embed** — the Google Maps iframe in `Contact.jsx` currently points to a placeholder
  search query; replace the `src` with your own location's embed URL from Google Maps
  ("Share" → "Embed a map").
- **Product photography** — `FeaturedHampers.jsx` and `Gallery.jsx` currently use illustrated
  gradient placeholders (by design, to avoid generic stock photos). Drop real photos into
  `public/images/` and swap the placeholder blocks for `<img>` tags once you have your own
  product shoot.
- **Instagram feed** — `InstagramFeed.jsx` links out to Instagram; wire it up to the real
  Instagram Basic Display API or a service like SnapWidget/Elfsight if you want live posts.
- **Content** — all copy for hampers, categories, testimonials and FAQs lives in `src/data/`.

## Notes

- Colour palette, typography (Playfair Display + Poppins) and section order follow the
  original brief exactly.
- Reduced motion is respected (`prefers-reduced-motion`) and all interactive elements have
  visible keyboard focus states.
