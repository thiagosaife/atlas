import React from "react";

/**
 * Empire list row — optional sepia thumbnail + Cinzel name + gold era +
 * IM Fell blurb. The app's tooltip/panel "emprow".
 */
export function EmpireRow({ name, era, blurb, thumb, hoverable = false, onClick, footer, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        padding: hoverable ? "8px 10px" : 0,
        cursor: onClick ? "pointer" : "default",
        border: hoverable ? `1px solid ${hover ? "var(--gold)" : "transparent"}` : "none",
        background: hoverable && hover ? "var(--surface-hover)" : "none",
        transition: "background var(--speed-fast), border-color var(--speed-fast)",
        ...style,
      }}
      {...rest}
    >
      {thumb !== undefined && (
        <div
          style={{
            width: 46, height: 46, flex: "0 0 46px",
            background: thumb ? `#cbb489 center/cover no-repeat url("${thumb}")` : "repeating-linear-gradient(45deg, #cbb489 0 6px, #c2aa7e 6px 12px)",
            border: "var(--border-frame)",
            boxShadow: "var(--shadow-chip)",
            filter: "var(--filter-sepia)",
          }}
        />
      )}
      <div style={{ minWidth: 0 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-xl)", color: "var(--ink)" }}>{name}</span>
        {era && <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.76rem", color: "var(--gold)", marginLeft: 6 }}>{era}</span>}
        {blurb && (
          <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "var(--text-base)", lineHeight: 1.35, color: "var(--ink-soft)", marginTop: 1 }}>
            {blurb}
          </span>
        )}
        {footer && (
          <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontStyle: "italic", color: "var(--gold)", marginTop: 4 }}>
            {footer}
          </span>
        )}
      </div>
    </div>
  );
}
