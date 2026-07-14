/**
 * Page chrome: the text-size control, the language switcher, and every static
 * string on the page (title, tagline, footer) — all of which must re-render
 * when the locale changes.
 */
import type { Store } from "@state/store";
import { LOCALES, persistLocale, type Locale, type Translator, type UiStrings } from "@i18n/index";
import { esc, must } from "./dom";
import type { Frame } from "./frame";

const FONT_KEY = "atlas-font";
const FONT_MIN = 0.75;
const FONT_MAX = 1.5;
const FONT_STEP = 0.125;
const FONT_BASE_PX = 16;

/** A− / A+ scale every rem in the app, map labels included. Persisted. */
export function mountFontControl(): void {
  let scale = Number(localStorage.getItem(FONT_KEY) ?? 1) || 1;

  const apply = (): void => {
    scale = Math.max(FONT_MIN, Math.min(FONT_MAX, scale));
    document.documentElement.style.fontSize = `${FONT_BASE_PX * scale}px`;
    try {
      localStorage.setItem(FONT_KEY, String(scale));
    } catch {
      /* storage blocked — the size still applies for this session */
    }
  };

  apply();
  must<HTMLButtonElement>("#fontMinus").addEventListener("click", () => {
    scale -= FONT_STEP;
    apply();
  });
  must<HTMLButtonElement>("#fontPlus").addEventListener("click", () => {
    scale += FONT_STEP;
    apply();
  });
}

export class ChromeView {
  private readonly langSelect: HTMLSelectElement;

  constructor(store: Store, translators: Record<Locale, Translator>) {
    this.langSelect = must<HTMLSelectElement>("#lang");
    this.langSelect.innerHTML = LOCALES.map(
      (l) => `<option value="${l}">${esc(translators[l].ui.languageName)}</option>`,
    ).join("");

    this.langSelect.addEventListener("change", () => {
      const next = this.langSelect.value as Locale;
      persistLocale(next);
      store.setLocale(next);
      // keep the URL shareable in the chosen language
      const url = new URL(location.href);
      url.searchParams.set("lang", next);
      history.replaceState(null, "", url);
    });
  }

  /** Re-render every static string for the active locale. */
  render(frame: Frame): void {
    const { ui } = frame.t;
    this.ui = ui;

    document.documentElement.lang = ui.htmlLang;
    // drives the flag tint on the language button and the wash over the sheet
    document.documentElement.dataset["locale"] = frame.state.locale;
    document.title = ui.appTitle;
    this.langSelect.value = frame.state.locale;
    this.langSelect.title = ui.language;

    must("#title").textContent = ui.appTitle;
    must("#tagline").textContent = ui.tagline;
    must("#footerLegend").textContent = ui.footerLegend;
    must("#footerCount").textContent = ui.empiresCharted(frame.atlas.empires.length);

    must("#panelClose").setAttribute("title", ui.close);
    must("#fontMinus").setAttribute("title", ui.smallerText);
    must("#fontPlus").setAttribute("title", ui.largerText);

    // chart marginalia
    must("#scaleCaption").textContent = ui.chart.scale;
    must("#projectionNote").textContent = ui.chart.projection;
    must("#sheetNote").textContent = ui.chart.sheet;
    this.renderScale();
  }

  /** The scale bar's ground distance, refreshed on every zoom. */
  setScale(km: number): void {
    this.km = km;
    this.renderScale();
  }

  private ui: UiStrings | null = null;
  private km = 0;

  private renderScale(): void {
    if (!this.ui || !this.km) return;
    must("#scaleValue").textContent = `0 — ${roundish(this.km)} ${this.ui.chart.km}`;
  }
}

/** A scale bar reads "2 000 km", never "1 987.34 km" — round to one nice figure. */
function roundish(km: number): string {
  const magnitude = 10 ** Math.floor(Math.log10(km));
  const value = Math.round(km / magnitude) * magnitude;
  return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
}
