/**
 * Composition root.
 *
 * Wires the layers together and owns the render loop — the only place that
 * knows about all of them. Domain, data, and i18n stay ignorant of the DOM;
 * the UI stays ignorant of where the data came from.
 */
import "./styles/app.css";

import { EMPIRES } from "@data/empires/index";
import { createAtlas } from "@domain/atlas";
import { midEra } from "@domain/era";
import type { CountryName, EmpireId } from "@domain/types";
import { resolveLocale, Translator, LOCALES, type Locale } from "@i18n/index";
import { loadWorld } from "@services/geography";
import { createStore } from "@state/store";

import { must } from "@ui/dom";
import { buildFrame, Localizer, type Frame } from "@ui/frame";
import { MapView, type Rect } from "@ui/map";
import { TooltipView } from "@ui/tooltip";
import { PanelView } from "@ui/panel";
import { LegendView } from "@ui/legend";
import { TimelineView } from "@ui/timeline";
import { SearchView } from "@ui/search";
import { ChromeView, mountFontControl } from "@ui/chrome";
import { PatinaView } from "@ui/patina";

const WORLD_URL = `${import.meta.env.BASE_URL}countries-110m.json`;

async function main(): Promise<void> {
  const stage = must<HTMLElement>("#stage");
  const loading = must<HTMLElement>("#loading");

  const translators = Object.fromEntries(
    LOCALES.map((l) => [l, new Translator(l)]),
  ) as Record<Locale, Translator>;

  const store = createStore({ locale: resolveLocale() });

  let world;
  try {
    world = await loadWorld(WORLD_URL);
  } catch (err) {
    loading.textContent = translators[store.get().locale].ui.loadError;
    console.error(err);
    return;
  }

  const atlas = createAtlas(EMPIRES, world.adjacency);
  const localizer = new Localizer(atlas, translators[store.get().locale]);

  // ---- actions ----
  const revealEmpire = (id: EmpireId): void => {
    const empire = atlas.byId(id);
    if (!empire) return;
    timeline.stop();
    // land the timeline mid-reign, so the realm appears among its contemporaries
    store.focusEmpire(id, midEra(empire));
    map.frameCountries(empire.territory, visibleRect());
  };

  const pinLand = (country: CountryName | null): void => {
    if (!country || !atlas.rulersOf(country).length) {
      store.reset();
      return;
    }
    store.pinLand(country);
  };

  // ---- views ----
  const notes = must<HTMLElement>("#notes");

  const map = new MapView(must<SVGSVGElement>("#map"), stage, world, {
    onHoverLand(country, evt) {
      if (!country || !atlas.rulersOf(country).length) return tooltip.hide();
      tooltip.show(country, frame);
      tooltip.moveTo(evt);
    },
    onClickLand: pinLand,
    onScale: (km) => chrome.setScale(km),
    // The scribbles were written *on the chart*, not on the glass, so they
    // travel and grow with it. Their CSS positions are percentages of the stage,
    // which is exactly the map's untransformed space — so the map's own zoom
    // transform applies to them unchanged.
    onTransform: (x, y, k) => {
      notes.style.transform = `translate(${x}px, ${y}px) scale(${k})`;
    },
  });

  const tooltip = new TooltipView(must<HTMLElement>("#tip"));
  const panel = new PanelView(must<HTMLElement>("#panel"), must<HTMLElement>("#panelBody"), revealEmpire);
  const legend = new LegendView(must<HTMLElement>("#legend"), revealEmpire);
  const timeline = new TimelineView(
    must<HTMLInputElement>("#slider"),
    must<HTMLElement>("#year"),
    must<HTMLButtonElement>("#play"),
    must<HTMLButtonElement>("#allEras"),
    store,
  );
  const search = new SearchView(must<HTMLInputElement>("#search"), must<HTMLElement>("#results"), {
    onEmpire: revealEmpire,
    onLand: (country) => {
      pinLand(country);
      map.frameCountries([country], visibleRect());
    },
    onYear: (year) => {
      timeline.stop();
      store.showYear(year); // the legend then lists every realm standing that year
    },
  });
  const chrome = new ChromeView(store, translators);
  // the sheet itself ages as the timeline advances
  const patina = new PatinaView(document.documentElement);

  mountFontControl();
  must<HTMLButtonElement>("#panelClose").addEventListener("click", () => store.reset());
  document.addEventListener("keydown", (evt) => {
    if (evt.key !== "Escape") return;
    search.hide();
    timeline.stop();
    store.reset();
  });

  /**
   * The rectangle the map can actually use: the drawer, legend, and timeline
   * bar all float over the stage, so framing must avoid them.
   */
  function visibleRect(): Rect {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    const mobile = window.innerWidth <= 640;
    const panelEl = must<HTMLElement>("#panel");
    const open = panelEl.classList.contains("open");

    let x0 = 20;
    let x1 = w - 20;
    let y0 = 90;
    let y1 = h - 110;

    if (!mobile) {
      if (must<HTMLElement>("#legend").classList.contains("show")) x0 = 270;
      if (open) x1 = w - panelEl.offsetWidth - 20;
    } else if (open) {
      y1 = Math.min(y1, h - panelEl.offsetHeight - 16);
    }
    if (x1 - x0 < 120) ((x0 = 20), (x1 = w - 20));
    if (y1 - y0 < 120) ((y0 = 90), (y1 = h - 110));
    return { x0, x1, y0, y1 };
  }

  // ---- render loop ----
  let frame: Frame;

  function render(): void {
    const state = store.get();
    const t = translators[state.locale];
    localizer.retarget(t);
    search.sync(atlas, localizer, t);
    search.setLabels(t);

    frame = buildFrame(state, t, atlas, localizer);

    chrome.render(frame);
    patina.render(frame);
    map.paint(frame);
    panel.render(frame);
    legend.render(frame);
    timeline.render(frame);
    search.render(frame);
  }

  store.subscribe(render);
  window.addEventListener("resize", () => map.resize());

  loading.remove();
  map.resize();
  render();
}

void main();
