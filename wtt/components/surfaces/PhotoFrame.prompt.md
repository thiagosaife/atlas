Every image in the system goes through this: white paper mat, brass border, sepia filter, −0.5° tilt. Without `src` it renders a striped placeholder labelled by `alt`.

```jsx
<PhotoFrame src={thumb} alt="Machu Picchu" height={150} caption="The Inca citadel, 1911 expedition" />
<PhotoFrame alt="product shot" height={120} style={{ width: 220 }} />
```

Never place a bare `<img>` in a design — frame it.
