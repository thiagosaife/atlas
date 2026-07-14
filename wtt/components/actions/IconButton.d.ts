import * as React from "react";

/** Round ghost icon button (✕ close, etc.) with crimson hover wash. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** A single unicode glyph: ✕ ✦ ▶ … */
  children: React.ReactNode;
  title?: string;
  style?: React.CSSProperties;
}

export declare function IconButton(props: IconButtonProps): JSX.Element;
