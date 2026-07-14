import * as React from "react";

export interface SearchResult {
  /** Tiny uppercase kind chip, e.g. "Empire" | "Land" */
  kind?: string;
  name: string;
  /** Italic gold meta text, e.g. an era or a count */
  meta?: string;
}

/** Parchment search input with optional torn-paper results dropdown. */
export interface SearchFieldProps {
  value: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  /** When present and non-empty, renders the dropdown */
  results?: SearchResult[];
  onSelect?: (result: SearchResult, index: number) => void;
  width?: number | string;
  style?: React.CSSProperties;
}

export declare function SearchField(props: SearchFieldProps): JSX.Element;
