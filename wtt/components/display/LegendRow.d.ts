import * as React from "react";

/** Legend row: swatch + name + era; hover wash, crimson selected rule. */
export interface LegendRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Swatch colour (use --era-*) */
  color: string;
  name: string;
  /** Italic gold sub-line, e.g. "1299–1922 AD" */
  era?: string;
  selected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export declare function LegendRow(props: LegendRowProps): JSX.Element;
