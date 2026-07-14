---
name: long-gone-empires-design
description: Use this skill to generate well-branded interfaces and assets for the Atlas of Long Gone Empires (weathered expedition-map / 1930s pulp-adventure aesthetic — parchment, sepia ink, brass, crimson), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Non-negotiables when designing with this system:
- Link `styles.css` (or copy the `tokens/` files) — never hardcode colors; every color must sit in the old-paper sepia range defined in `tokens/colors.css`.
- Cinzel for display/labels, IM Fell English for prose. Square corners. Warm umber shadows. Sepia-filtered imagery in tilted frames.
- Scrollbars are part of the brand: `tokens/scrollbars.css` must be in the CSS closure of anything scrollable.
- No emoji; use the ornamental glyphs ✦ ▶ ❚❚ ✕ ↗ ·
