import React from "react";

/**
 * Compass rule — the header's ornamental divider: two ink lines meeting a
 * diamond-and-ring compass motif. Copied from the app's header.
 */
export function Rule({ width = "min(340px, 60%)", style, ...rest }) {
  return (
    <div
      style={{
        width,
        height: 14,
        margin: "6px auto 0",
        background:
          "no-repeat center/contain url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='340' height='14'><path d='M0 7 H150 M190 7 H340' stroke='%235c3a1e' stroke-width='1.4'/><path d='M170 7 l-12 -5 l0 10 z M170 7 l12 -5 l0 10 z' fill='%235c3a1e'/><circle cx='170' cy='7' r='3' fill='none' stroke='%235c3a1e' stroke-width='1.2'/></svg>\")",
        opacity: 0.8,
        ...style,
      }}
      {...rest}
    />
  );
}
