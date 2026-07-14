Parchment-faced control button with ink border, Cinzel type and a gilt hover wash — the app's timeline-bar button.

```jsx
<Button onClick={play}>▶ Play</Button>
<Button active>✦ all eras</Button>
<Button size="sm">A−</Button>
```

- `size`: `md` (default) | `sm` (dense, used on mobile / A− A+ text controls)
- `active`: holds the gilt selected fill
- Icons are unicode glyphs (▶ ❚❚ ✦ ✕), never SVG or emoji.
