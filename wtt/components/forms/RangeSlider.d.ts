import * as React from "react";

/** Crimson-accented range slider (the timeline control). */
export interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange?: (value: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

export declare function RangeSlider(props: RangeSliderProps): JSX.Element;
