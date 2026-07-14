/**
 * Applies the sheet's wear to the page.
 *
 * The wear layers (grime, stain, scribbles, char) are pure CSS; all this does is
 * publish four numbers as custom properties, which those layers multiply into
 * their own opacity. Nothing here knows what a coffee ring looks like.
 */
import { patinaAt, type Patina } from "@domain/aging";
import type { Frame } from "./frame";

export class PatinaView {
  private last: Patina | null = null;

  constructor(private readonly root: HTMLElement) {}

  render(frame: Frame): void {
    // The sheet's age always follows where the slider sits — including on load,
    // when it rests at the dawn of the atlas and the paper is therefore pristine.
    // (Tying this to `timelineOn` would open a brand-new map onto a filthy sheet.)
    const p = patinaAt(frame.state.year);

    if (
      this.last &&
      this.last.paper === p.paper &&
      this.last.ink === p.ink &&
      this.last.stain === p.stain &&
      this.last.burn === p.burn
    ) {
      return; // nothing moved — don't touch the style object every frame
    }
    this.last = p;

    const s = this.root.style;
    s.setProperty("--age-paper", p.paper.toFixed(3));
    s.setProperty("--age-ink", p.ink.toFixed(3));
    s.setProperty("--age-stain", p.stain.toFixed(3));
    s.setProperty("--age-burn", p.burn.toFixed(3));
  }
}
