/**
 * Search over empires and lands, in the active locale.
 *
 * The index is rebuilt whenever the locale changes, so a French visitor
 * searches French names.
 */
import { createSearchIndex, type SearchHit, type SearchIndex } from "@domain/search";
import { formatYear } from "@domain/era";
import type { CountryName, EmpireId, Year } from "@domain/types";
import { esc, onClick } from "./dom";
import type { Frame } from "./frame";
import type { Localizer } from "./frame";
import type { Atlas } from "@domain/atlas";
import type { Translator } from "@i18n/index";

export interface SearchCallbacks {
  onEmpire(id: EmpireId): void;
  onLand(country: CountryName): void;
  onYear(year: Year): void;
}

export class SearchView {
  private index: SearchIndex | null = null;
  private hits: readonly SearchHit[] = [];
  private locale = "";

  constructor(
    private readonly input: HTMLInputElement,
    private readonly results: HTMLElement,
    private readonly cb: SearchCallbacks,
  ) {
    input.addEventListener("input", () => this.run());
    input.addEventListener("focus", () => {
      if (input.value) this.run();
    });
    input.addEventListener("keydown", (evt) => {
      if (evt.key === "Enter" && this.hits.length) this.choose(this.hits[0]!);
      else if (evt.key === "Escape") this.dismiss();
    });
    document.addEventListener("click", (evt) => {
      if (!(evt.target as Element | null)?.closest("#search-wrap")) this.hide();
    });
  }

  /** Rebuild the index for the active locale (cheap; 78 empires + 113 lands). */
  sync(atlas: Atlas, localizer: Localizer, t: Translator): void {
    if (this.locale === t.locale && this.index) return;
    this.locale = t.locale;

    const lands = [...atlas.chartedLands]
      .map((country) => ({
        country,
        label: t.country(country),
        rulerCount: atlas.rulersOf(country).length,
      }))
      .sort((a, b) => a.label.localeCompare(b.label, t.ui.htmlLang));

    this.index = createSearchIndex(localizer.all(), lands, (n) => t.ui.empiresRuledHere(n), {
      words: t.ui.era,
      format: (y) => formatYear(y, t.ui.era),
      realmsAt: (y) => atlas.activeAt(y).length,
      meta: (n) => t.ui.realms(n),
    });
    this.input.placeholder = t.ui.searchPlaceholder;
    this.hide();
    this.input.value = "";
  }

  render(frame: Frame): void {
    this.input.placeholder = frame.t.ui.searchPlaceholder;
  }

  private run(): void {
    if (!this.index) return;
    const q = this.input.value;
    if (!q.trim()) return this.hide();

    this.hits = this.index.query(q);
    if (!this.hits.length) {
      this.results.innerHTML = `<div class="empty">${esc(this.emptyText)}</div>`;
      this.results.classList.add("show");
      return;
    }

    this.results.innerHTML = this.hits
      .map(
        (h, i) =>
          `<div class="res" data-i="${i}">` +
          `<span class="rk">${esc(this.kindLabel(h))}</span>` +
          `<span class="rn">${esc(h.label)}</span><span class="rm">${esc(h.meta)}</span></div>`,
      )
      .join("");
    this.results.classList.add("show");

    onClick(this.results, ".res", (el) => {
      const i = Number(el.dataset["i"]);
      const hit = this.hits[i];
      if (hit) this.choose(hit);
    });
  }

  private kindLabel(hit: SearchHit): string {
    switch (hit.kind) {
      case "year":
        return this.yearLabel;
      case "empire":
        return this.empireLabel;
      case "land":
        return this.landLabel;
    }
  }

  private choose(hit: SearchHit): void {
    this.dismiss();
    switch (hit.kind) {
      case "year":
        this.cb.onYear(hit.year);
        break;
      case "empire":
        this.cb.onEmpire(hit.id);
        break;
      case "land":
        this.cb.onLand(hit.country);
        break;
    }
  }

  private dismiss(): void {
    this.hide();
    this.input.blur();
  }

  hide(): void {
    this.results.classList.remove("show");
  }

  // Filled by sync(); kept as fields so run() stays synchronous and cheap.
  private emptyText = "";
  private empireLabel = "";
  private landLabel = "";
  private yearLabel = "";

  setLabels(t: Translator): void {
    this.emptyText = t.ui.searchEmpty;
    this.empireLabel = t.ui.kindEmpire;
    this.landLabel = t.ui.kindLand;
    this.yearLabel = t.ui.kindYear;
  }
}
