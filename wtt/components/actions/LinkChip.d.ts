import * as React from "react";

/** Bordered crimson outbound-link chip ("Wikipedia ↗"). */
export interface LinkChipProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Label; append ↗ for outbound destinations. */
  children: React.ReactNode;
  href: string;
  style?: React.CSSProperties;
}

export declare function LinkChip(props: LinkChipProps): JSX.Element;
