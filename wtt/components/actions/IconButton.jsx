import React from "react";

/**
 * Round ghost icon button — hairline ink circle, crimson wash on hover.
 * Verbatim from the app's panel-close (✕) control.
 */
export function IconButton({ children, title, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "rgba(138,47,34,0.15)" : "none",
        border: "1px solid var(--ink-soft)",
        color: "var(--ink)",
        width: 30,
        height: 30,
        borderRadius: "var(--radius-full)",
        cursor: "pointer",
        fontSize: "1rem",
        fontFamily: "var(--font-display)",
        lineHeight: 1,
        transition: "background var(--speed-fast)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
