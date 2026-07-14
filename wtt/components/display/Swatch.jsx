import React from "react";

/**
 * Colour swatch — 13px ink-bordered square, used in legends and footers.
 */
export function Swatch({ color = "var(--land-empire)", size = 13, style, ...rest }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        background: color,
        border: "var(--border-swatch)",
        verticalAlign: -2,
        ...style,
      }}
      {...rest}
    />
  );
}
