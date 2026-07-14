/**
 * The hover tooltip — a torn note listing every empire that ever ruled a land.
 */
import type { CountryName } from "@domain/types";
import { hydrateThumbs } from "@services/wikipedia";
import { esc } from "./dom";
import type { Frame } from "./frame";

/** Long chronicles are cut off here; the pinned panel carries the rest. */
const MAX_ROWS = 5;

export class TooltipView {
  private country: CountryName | null = null;

  constructor(private readonly el: HTMLElement) {}

  show(country: CountryName, frame: Frame): void {
    const rulers = frame.atlas.rulersOf(country);
    if (!rulers.length) return this.hide();

    this.country = country;
    const { t } = frame;
    const shown = rulers.slice(0, MAX_ROWS).map((e) => frame.loc(e.id)!);
    const more = rulers.length - shown.length;

    const rows = shown
      .map(
        (e) =>
          `<li class="emprow"><div class="thumb" data-tid="${esc(e.id)}"></div><div>` +
          `<span class="empire">${esc(e.name)}</span><span class="era">${esc(e.era)}</span>` +
          `<span class="blurb">${esc(e.blurb)}</span></div></li>`,
      )
      .join("");

    const hint = (more > 0 ? `${esc(t.ui.moreEmpires(more))} · ` : "") + esc(t.ui.pinHint);
    this.el.innerHTML =
      `<div class="modern">${esc(t.country(country))}</div>` +
      `<ul>${rows}</ul><div class="hint">${hint}</div>`;
    this.el.classList.add("show");

    hydrateThumbs(this.el, shown, t, () => this.country === country);
  }

  hide(): void {
    this.country = null;
    this.el.classList.remove("show");
  }

  /** Follow the cursor, but never leave the viewport. */
  moveTo(evt: MouseEvent): void {
    const pad = 18;
    const r = this.el.getBoundingClientRect();
    let x = evt.clientX + pad;
    let y = evt.clientY + pad;
    if (x + r.width > window.innerWidth - 10) x = evt.clientX - r.width - pad;
    if (y + r.height > window.innerHeight - 10) y = evt.clientY - r.height - pad;
    this.el.style.left = `${Math.max(10, x)}px`;
    this.el.style.top = `${Math.max(10, y)}px`;
  }
}
