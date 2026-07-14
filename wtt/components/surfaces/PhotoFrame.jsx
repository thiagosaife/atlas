import React from "react";

/**
 * Field photograph — white-matted, brass-bordered, sepia-filtered image
 * with a −0.5° tilt. The app's empire-panel "wframe".
 */
export function PhotoFrame({ src, alt = "", height = 150, caption, style, ...rest }) {
  return (
    <figure
      style={{
        margin: 0,
        padding: "5px 5px 6px",
        background: "var(--paper-2)",
        border: "var(--border-frame)",
        boxShadow: "var(--shadow-input)",
        transform: "var(--tilt-frame)",
        display: "inline-block",
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%", height, objectFit: "cover", display: "block",
            border: "var(--border-card)", filter: "var(--filter-sepia)",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%", height, display: "flex", alignItems: "center", justifyContent: "center",
            border: "var(--border-card)", color: "var(--ink-soft)",
            background: "repeating-linear-gradient(45deg, #cbb489 0 8px, #c2aa7e 8px 16px)",
            fontFamily: "monospace", fontSize: 11,
          }}
        >
          {alt || "field photograph"}
        </div>
      )}
      {caption && (
        <figcaption style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "var(--text-xs)", color: "var(--ink-soft)", padding: "5px 2px 0" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
