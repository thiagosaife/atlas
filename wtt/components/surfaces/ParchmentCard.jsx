import React from "react";

/**
 * Floating parchment surface — the app's timeline bar, legend and side-panel
 * paper: 135° paper gradient, brass border, warm floating shadow.
 */
export function ParchmentCard({ children, translucent = false, drawer = false, padding = "var(--pad-legend)", style, ...rest }) {
  return (
    <div
      style={{
        background: translucent
          ? "linear-gradient(135deg, rgba(242,227,192,0.94), rgba(220,199,159,0.94))"
          : "var(--surface-panel)",
        border: drawer ? "none" : "var(--border-card)",
        borderLeft: drawer ? "var(--border-panel)" : undefined,
        boxShadow: drawer ? "var(--shadow-drawer)" : "var(--shadow-float)",
        color: "var(--ink)",
        padding,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
