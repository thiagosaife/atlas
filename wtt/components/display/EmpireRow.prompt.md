The system's list row: optional 46px sepia thumbnail, Cinzel name, italic gold era, one-line IM Fell blurb, optional italic action footer.

```jsx
<EmpireRow
  thumb={null}
  name="Ottoman Empire" era="1299–1922 AD"
  blurb="Six centuries astride three continents."
  footer="✦ reveal this empire"
  hoverable onClick={select}
/>
```

- `thumb`: URL, or `null` for striped placeholder; omit entirely for text-only rows
- `hoverable`: adds the panel's gold-wash + brass-border hover
