/**
 * The legend: which realms are alive in the current year, and in which colour.
 */
import type { EmpireId } from "@domain/types";
import { formatYear } from "@domain/era";
import { esc, onClick } from "./dom";
import type { Frame } from "./frame";

export class LegendView {
  constructor(
    private readonly el: HTMLElement,
    private readonly onReveal: (id: EmpireId) => void,
  ) {}

  render(frame: Frame): void {
    const { state, t, active, colors } = frame;
    if (!state.timelineOn || !active.length) {
      this.el.classList.remove("show");
      return;
    }

    const rows = [...active]
      .sort((a, b) => a.start - b.start)
      .map((empire) => {
        const e = frame.loc(empire.id)!;
        const selected = e.id === state.focused ? " sel" : "";
        return (
          `<div class="row${selected}" data-id="${esc(e.id)}">` +
          `<span class="sw" style="background:${esc(colors.get(e.id) ?? "")}"></span>` +
          `<span class="ln">${esc(e.name)}<span class="le">${esc(e.era)}</span></span></div>`
        );
      })
      .join("");

    const heading = `${formatYear(state.year, t.ui.era)} — ${t.ui.realms(active.length)}`;
    this.el.innerHTML = `<h3>${esc(heading)}</h3>${rows}`;
    this.el.classList.add("show");

    onClick(this.el, ".row", (row) => {
      const id = row.dataset["id"];
      if (id) this.onReveal(id);
    });
  }
}
