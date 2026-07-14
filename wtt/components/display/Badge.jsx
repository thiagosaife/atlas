import React from "react";

/**
 * Kind chip — tiny uppercase crimson badge ("EMPIRE", "LAND").
 * From the app's search results.
 */
export function Badge({ children, style, ...rest }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-2xs)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--crimson)",
        border: "1px solid rgba(138,47,34,0.5)",
        padding: "0 4px",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
