import React from "react";
import { Swatch } from "./Swatch.jsx";

/**
 * Legend row — swatch + Cinzel name + italic gold era; gold wash on hover,
 * crimson left rule when selected. From the app's timeline legend.
 */
export function LegendRow({ color, name, era, selected = false, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 8,
        padding: selected ? "3px 4px 3px 6px" : "3px 4px",
        cursor: onClick ? "pointer" : "default",
        background: selected ? "var(--surface-selected)" : hover ? "rgba(184,134,47,0.2)" : "none",
        borderLeft: selected ? "3px solid var(--crimson)" : "none",
        transition: "background var(--speed-quick)",
        ...style,
      }}
      {...rest}
    >
      <Swatch color={color} style={{ flex: "0 0 13px", transform: "translateY(2px)", verticalAlign: 0 }} />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.82rem",
          color: selected ? "var(--crimson)" : "var(--ink)",
          lineHeight: "var(--leading-tight)",
        }}
      >
        {name}
        {era && (
          <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontStyle: "italic", color: "var(--gold)" }}>
            {era}
          </span>
        )}
      </span>
    </div>
  );
}
