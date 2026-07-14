import * as React from "react";

/** White-matted, sepia-filtered field photograph with −0.5° tilt. */
export interface PhotoFrameProps extends React.HTMLAttributes<HTMLElement> {
  /** Image URL; omit to render a striped placeholder labelled with `alt` */
  src?: string;
  alt?: string;
  /** Image height in px (width fills the frame). Default 150 */
  height?: number;
  /** Italic caption under the photograph */
  caption?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function PhotoFrame(props: PhotoFrameProps): JSX.Element;
