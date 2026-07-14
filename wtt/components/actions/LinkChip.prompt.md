Bordered crimson Cinzel link chip on a faint crimson wash — the app's outbound "Wikipedia ↗ / Britannica ↗" links.

```jsx
<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
  <LinkChip href="https://en.wikipedia.org/wiki/Ottoman_Empire">Wikipedia ↗</LinkChip>
  <LinkChip href="https://www.britannica.com">Britannica ↗</LinkChip>
</div>
```

Append `↗` to outbound labels. For inline prose links use a plain `<a>` — base.css styles it with the dotted crimson underline.
