import * as React from "react";

/** List row: sepia thumb + name + gold era + blurb (tooltip/panel rows). */
export interface EmpireRowProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  /** Italic gold era after the name, e.g. "1299–1922 AD" */
  era?: string;
  /** One-line IM Fell description */
  blurb?: string;
  /** Thumbnail URL; pass null for a striped placeholder, omit for no thumb */
  thumb?: string | null;
  /** Panel-style hover: gold wash + brass border */
  hoverable?: boolean;
  onClick?: () => void;
  /** Italic gold action line, e.g. "✦ reveal this empire" */
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function EmpireRow(props: EmpireRowProps): JSX.Element;
