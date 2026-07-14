import * as React from "react";

/**
 * Expedition control button (parchment face, ink border, Cinzel).
 * @startingPoint section="Components" subtitle="Parchment button with gilt hover" viewport="700x180"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** "md" (default, timeline-bar size) or "sm" (dense/mobile size) */
  size?: "md" | "sm";
  /** Renders the gilt (selected) fill permanently */
  active?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare function Button(props: ButtonProps): JSX.Element;
