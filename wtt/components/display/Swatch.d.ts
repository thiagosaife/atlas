import * as React from "react";

/** 13px ink-bordered colour square for legends. */
export interface SwatchProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Any CSS colour; use the --era-* palette for categorical data */
  color?: string;
  /** Side length in px. Default 13 */
  size?: number;
  style?: React.CSSProperties;
}

export declare function Swatch(props: SwatchProps): JSX.Element;
