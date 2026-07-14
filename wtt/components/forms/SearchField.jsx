import React from "react";

/**
 * Expedition search field — parchment paper input with italic IM Fell
 * placeholder, plus an optional torn-paper results dropdown.
 * Verbatim from the app's "Search an empire or land…" control.
 */
export function SearchField({ value, onChange, placeholder = "Search an empire or land…", results, onSelect, width = 232, style, ...rest }) {
  const [hoverIdx, setHoverIdx] = React.useState(-1);
  return (
    <div style={{ position: "relative", width, ...style }}>
      <input
        type="text"
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value, e)}
        placeholder={placeholder}
        style={{
          width: "100%",
          boxSizing: "border-box",
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-lg)",
          color: "var(--ink)",
          background: "linear-gradient(135deg, rgba(242,227,192,0.96), rgba(220,199,159,0.96))",
          border: "var(--border-card)",
          borderRadius: "var(--radius-none)",
          padding: "var(--pad-input)",
          outline: "none",
          boxShadow: "var(--shadow-input)",
        }}
        {...rest}
      />
      {results && results.length > 0 && (
        <div
          style={{
            marginTop: 4,
            maxHeight: 300,
            overflowY: "auto",
            background: "var(--surface-note)",
            border: "var(--border-card)",
            boxShadow: "var(--shadow-float)",
          }}
        >
          {results.map((r, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(-1)}
              onClick={() => onSelect && onSelect(r, i)}
              style={{
                padding: "6px 12px",
                cursor: "pointer",
                borderBottom: i < results.length - 1 ? "1px solid var(--ink-hairline)" : "none",
                background: hoverIdx === i ? "var(--surface-hover-strong)" : "none",
                transition: "background var(--speed-quick)",
              }}
            >
              {r.kind && (
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
                    marginRight: 7,
                    verticalAlign: 1,
                  }}
                >
                  {r.kind}
                </span>
              )}
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.86rem", color: "var(--ink)" }}>{r.name}</span>
              {r.meta && (
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontStyle: "italic", color: "var(--gold)", marginLeft: 6 }}>{r.meta}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
