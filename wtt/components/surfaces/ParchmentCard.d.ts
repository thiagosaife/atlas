import * as React from "react";

/**
 * Floating parchment surface (bars, legends, drawers).
 * @startingPoint section="Components" subtitle="Parchment card / floating paper surface" viewport="700x220"
 */
export interface ParchmentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** 0.94-alpha paper for surfaces floating over the map */
  translucent?: boolean;
  /** Side-drawer treatment: 3px double brass left border + leftward shadow */
  drawer?: boolean;
  padding?: string | number;
  style?: React.CSSProperties;
}

export declare function ParchmentCard(props: ParchmentCardProps): JSX.Element;
