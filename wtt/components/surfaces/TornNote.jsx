import React from "react";

/**
 * Torn field note — the hover tooltip: brighter paper, slight tilt,
 * deep warm shadow, optional uppercase crimson title.
 */
export function TornNote({ title, children, hint, style, ...rest }) {
  return (
    <div
      style={{
        maxWidth: 290,
        background: "var(--surface-note)",
        color: "var(--ink)",
        padding: "var(--pad-note)",
        border: "var(--border-card)",
        boxShadow: "var(--shadow-note)",
        transform: "var(--tilt-note)",
        ...style,
      }}
      {...rest}
    >
      {title && (
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "var(--text-xs)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--crimson)",
            borderBottom: "1px solid var(--ink-faint)",
            paddingBottom: 4,
            marginBottom: 7,
          }}
        >
          {title}
        </div>
      )}
      {children}
      {hint && (
        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontStyle: "italic", color: "var(--gold)", marginTop: 8, textAlign: "right" }}>
          {hint}
        </div>
      )}
    </div>
  );
}
