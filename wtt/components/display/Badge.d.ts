import * as React from "react";

/** Tiny uppercase crimson kind chip ("EMPIRE", "LAND"). */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function Badge(props: BadgeProps): JSX.Element;
