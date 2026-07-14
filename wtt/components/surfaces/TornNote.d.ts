import * as React from "react";

/** Torn field-note tooltip: bright paper, −0.6° tilt, deep warm shadow. */
export interface TornNoteProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Uppercase crimson header with hairline underline (e.g. the land's name) */
  title?: string;
  children: React.ReactNode;
  /** Right-aligned italic gold footer, e.g. "click to pin ✦" */
  hint?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function TornNote(props: TornNoteProps): JSX.Element;
