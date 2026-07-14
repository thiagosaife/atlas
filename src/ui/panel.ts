/**
 * The side drawer. Two faces:
 *   - a pinned land: every empire that ruled here, each revealable
 *   - a revealed empire: field photograph, summary, links, capital, territory
 */
import type { CountryName, EmpireId } from "@domain/types";
import { fetchFieldNote, hydrateThumbs } from "@services/wikipedia";
import { esc, onClick } from "./dom";
import type { Frame } from "./frame";

export class PanelView {
  constructor(
    private readonly panel: HTMLElement,
    private readonly body: HTMLElement,
    private readonly onReveal: (id: EmpireId) => void,
  ) {}

  close(): void {
    this.panel.classList.remove("open");
  }

  render(frame: Frame): void {
    const { state } = frame;
    if (state.focused) this.renderEmpire(state.focused, frame);
    else if (state.pinned) this.renderLand(state.pinned, frame);
    else this.close();
  }

  private renderLand(country: CountryName, frame: Frame): void {
    const { t } = frame;
    const rulers = frame.atlas.rulersOf(country).map((e) => frame.loc(e.id)!);

    const rows = rulers
      .map(
        (e) =>
          `<li class="emprow" data-id="${esc(e.id)}">` +
          `<div class="thumb" data-tid="${esc(e.id)}"></div><div>` +
          `<span class="empire">${esc(e.name)}</span><span class="era">${esc(e.era)}</span>` +
          `<span class="blurb">${esc(e.blurb)}</span>` +
          `<span class="jump">${esc(t.ui.revealEmpire)} · ` +
          `<a class="rowlink" href="${esc(t.wikiUrl(e))}" target="_blank" rel="noopener">` +
          `${esc(t.ui.wikipedia)}</a></span></div></li>`,
      )
      .join("");

    this.body.innerHTML =
      `<h2>${esc(t.country(country))}</h2>` +
      `<div class="sub">${esc(t.ui.empiresRuledHere(rulers.length))}</div>` +
      `<ul>${rows}</ul>`;

    onClick(this.body, "li.emprow", (li) => {
      const id = li.dataset["id"];
      if (id) this.onReveal(id);
    });
    // the link inside a row must not also reveal the empire
    onClick(this.body, "a.rowlink", (_el, evt) => evt.stopPropagation());

    this.panel.classList.add("open");
    hydrateThumbs(this.body, rulers, t, () => frame.state.pinned === country);
  }

  private renderEmpire(id: EmpireId, frame: Frame): void {
    const { t } = frame;
    const e = frame.loc(id);
    if (!e) return;

    this.body.innerHTML =
      `<h2>${esc(e.name)}</h2>` +
      `<div class="sub">${esc(e.era)} · ${esc(t.ui.modernLands(e.territory.length))}</div>` +
      `<figure class="wframe" id="wframe"><img id="wimg" alt="${esc(e.name)}"></figure>` +
      `<p class="blurb" style="margin:0 0 10px">${esc(e.blurb)}</p>` +
      `<p class="extract" id="wextract"></p>` +
      `<div class="links">` +
      `<a id="wlink" href="${esc(t.wikiUrl(e))}" target="_blank" rel="noopener">${esc(t.ui.wikipedia)}</a>` +
      `<a href="${esc(t.britannicaUrl(e))}" target="_blank" rel="noopener">${esc(t.ui.britannica)}</a>` +
      `</div>` +
      `<div class="empire" style="font-size:.8rem;color:var(--crimson);margin-bottom:4px">` +
      `${esc(t.ui.capital)} · ${esc(e.capitalName)}</div>` +
      `<div style="font-size:.82rem;line-height:1.55;color:var(--ink-soft)">` +
      `${e.territoryLabels.map(esc).join(" · ")}</div>`;

    this.panel.classList.add("open");

    void fetchFieldNote(e, t).then((note) => {
      // the drawer may have moved on while the request was in flight
      if (frame.state.focused !== id) return;
      const img = this.body.querySelector<HTMLImageElement>("#wimg");
      const fig = this.body.querySelector<HTMLElement>("#wframe");
      const extract = this.body.querySelector<HTMLElement>("#wextract");
      const link = this.body.querySelector<HTMLAnchorElement>("#wlink");
      if (note.thumb && img && fig) {
        img.src = note.thumb;
        fig.classList.add("on");
      }
      if (note.extract && extract) extract.textContent = note.extract;
      if (link) link.href = note.url;
    });
  }
}
