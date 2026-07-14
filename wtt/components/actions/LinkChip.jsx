import React from "react";

/**
 * Outbound link chip — bordered crimson Cinzel label on a faint crimson wash.
 * Verbatim from the app's "Wikipedia ↗ / Britannica ↗" links.
 */
export function LinkChip({ children, href, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "var(--text-sm)",
        letterSpacing: "var(--track-name)",
        color: "var(--crimson)",
        textDecoration: "none",
        border: "1px solid rgba(138,47,34,0.45)",
        borderBottom: "1px solid rgba(138,47,34,0.45)",
        padding: "var(--pad-chip)",
        background: hover ? "rgba(138,47,34,0.16)" : "var(--surface-link)",
        transition: "background var(--speed-fast)",
        display: "inline-block",
        ...style,
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
