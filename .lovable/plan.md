## Problem

In light mode the hero and blog card images look faded/blurry because their gradient overlays use `from-background/... to-background/...` — in dark mode that's a dark veil that grounds the image, but in light mode it becomes a near-white veil that washes the photos out. The dark `merQato.digital` serif on top of a bleached image also reads as poor contrast.

Dark mode is unchanged.

## Changes

**1. `src/styles.css`** — add two reusable veil classes
- `.img-veil-hero` — default (dark mode): current gradient `linear-gradient(to bottom, var(--background)/0.5, var(--background)/0.2, var(--background)/0.7)`
- `.img-veil-card` — default (dark mode): current gradient `linear-gradient(to top, var(--background)/0.8, var(--background)/0.1, var(--background)/0.3)`
- `.light .img-veil-hero` — swap to a dark tint so the photo pops on white: `linear-gradient(to bottom, oklch(0.1 0 0 / 0.15), oklch(0.1 0 0 / 0.05), oklch(0.1 0 0 / 0.45))`
- `.light .img-veil-card` — `linear-gradient(to top, oklch(0.1 0 0 / 0.55), oklch(0.1 0 0 / 0.1), oklch(0.1 0 0 / 0.2))`
- `.light .img-crisp` — `opacity: 1` (kills the `opacity-90` haze in light mode only)

**2. `src/routes/index.tsx`** — swap inline gradient utilities for the new classes
- Hero `<img>` (line 76): add `img-crisp` so it stays at `opacity-90` in dark but `1` in light.
- Hero overlay div (line 77): replace `bg-gradient-to-b from-background/50 via-background/20 to-background/70` with `img-veil-hero`.
- Blog card overlay (line 205): replace `bg-gradient-to-t from-background/80 via-background/10 to-background/30` with `img-veil-card`.
- Hero serif headline (`merQato.digital`): in light mode the dark text on a brighter photo can clash. Wrap it with a subtle text-shadow utility class `.hero-title` that's a no-op in dark and adds `text-shadow: 0 2px 30px oklch(1 0 0 / 0.4)` in light, so the serif keeps a soft white halo and stays legible.

## What stays unchanged
- Dark mode: pixel-identical (defaults match current Tailwind classes).
- All images, fonts, layout, spacing, copy.
- Theme toggle behavior.

## Files
- edit `src/styles.css`
- edit `src/routes/index.tsx`
