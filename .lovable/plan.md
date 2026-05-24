## The actual bug

In the screenshot you're already in **light mode** — the page background is cream, so the toggle is working. What looks broken is the giant `merQato.digital` serif headline: it uses `text-ink`, which in light mode becomes dark text, and it's sitting on top of a dark sunset photo. Dark text on a dark photo is unreadable. Same issue affects all overlay labels on the hero image and the category/meta labels on blog cards.

The fix is to lock any text that sits on top of a dark photo to stay in "dark-mode" colors regardless of the page theme — like a movie poster.

## Changes

**1. `src/styles.css`**
- Add `.on-dark-media` utility that overrides `--ink`, `--ink-dim`, `--ink-mute`, `--line`, `--line-soft` to their dark-theme oklch values. Any child using `text-ink`, `text-ink-dim`, `border-line`, etc. inherits these.
- Strengthen `.light .img-veil-hero` (currently 0.15→0.45 dark tint, bumping to ~0.35→0.6) so the photo is grounded enough for the title to pop in light mode.
- Replace `.light .hero-title` white halo with a universal `.hero-title` rule: light text color + soft dark text-shadow that works on both bright sun pixels and dark silhouettes.

**2. `src/routes/index.tsx`**
- Hero: add `on-dark-media` to the inner aspect-ratio container (line 75) so every overlay child (asset meta, ladder, coords, system status box, build log box, center title block) gets dark-theme ink tokens.
- Blog card: add `on-dark-media` to the image aspect-ratio container (line 197) so the category and meta labels over the photo stay readable in both themes. The card's text body below the image (date, title, arrow) is unaffected — those use the normal themed tokens since they sit on the surface background.

## What stays unchanged
- Dark mode: pixel-identical (the on-dark-media token values match current `:root`).
- Light mode page chrome: header, body, blog card body text, footer, legal pages still flip light.
- Toggle behavior, layout, fonts, copy, images, animations.

## Why the toggle "didn't work"
It does. The visual result in light mode just looked broken because the headline text disappeared into the photo, so it felt like nothing changed. Once overlay text is locked to light colors, light mode will actually look different and intentional.

## Files
- edit `src/styles.css`
- edit `src/routes/index.tsx`
