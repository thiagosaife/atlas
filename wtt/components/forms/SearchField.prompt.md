Parchment search input (italic IM Fell placeholder, brass border, warm shadow) with an optional results dropdown of kind-chip + name + gold meta rows.

```jsx
<SearchField
  value={q}
  onChange={setQ}
  results={[
    { kind: "Empire", name: "Ottoman Empire", meta: "1299–1922 AD" },
    { kind: "Land", name: "Turkey", meta: "9 empires" },
  ]}
  onSelect={(r) => choose(r)}
/>
```

Also the pattern for any text input: reuse the input styling without `results`.
