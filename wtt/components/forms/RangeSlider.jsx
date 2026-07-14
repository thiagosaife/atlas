import React from "react";

/**
 * Timeline slider — native range input with crimson accent, as in the
 * app's 4500 BC → 2000 AD timeline bar.
 */
export function RangeSlider({ min = 0, max = 100, step = 1, value, onChange, style, ...rest }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange && onChange(+e.target.value, e)}
      style={{
        flex: 1,
        accentColor: "var(--crimson)",
        cursor: "pointer",
        height: 4,
        ...style,
      }}
      {...rest}
    />
  );
}
