import React from "react";

/**
 * Expedition control button — parchment face, ink border, Cinzel small caps,
 * gilt wash on hover. Verbatim from the app's timeline buttons.
 */
export function Button({ children, size = "md", active = false, disabled = false, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const lit = !disabled && (hover || active);
  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: size === "sm" ? "var(--text-xs)" : "var(--text-md)",
        letterSpacing: "var(--track-button)",
        background: lit ? "var(--gilt)" : "var(--surface-control)",
        color: "var(--ink)",
        border: "var(--border-control)",
        borderRadius: "var(--radius-none)",
        padding: size === "sm" ? "var(--pad-button-sm)" : "var(--pad-button)",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        whiteSpace: "nowrap",
        transition: "background var(--speed-fast)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
