import * as React from "react";

/** Ornamental compass divider (the header rule). */
export interface RuleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** CSS width. Default "min(340px, 60%)" */
  width?: string | number;
  style?: React.CSSProperties;
}

export declare function Rule(props: RuleProps): JSX.Element;
