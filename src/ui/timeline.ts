/**
 * The timeline bar: the year slider, playback, and the "all eras" escape hatch.
 */
import { FIRST_YEAR, LAST_YEAR, YEAR_STEP, formatYear } from "@domain/era";
import type { Store } from "@state/store";
import type { Frame } from "./frame";

/** Wall-clock between playback ticks. */
const TICK_MS = 90;

export class TimelineView {
  private timer: number | null = null;

  constructor(
    private readonly slider: HTMLInputElement,
    private readonly yearLabel: HTMLElement,
    private readonly playBtn: HTMLButtonElement,
    private readonly allErasBtn: HTMLButtonElement,
    private readonly store: Store,
  ) {
    slider.min = String(FIRST_YEAR);
    slider.max = String(LAST_YEAR);
    slider.step = String(YEAR_STEP);
    slider.value = String(FIRST_YEAR);

    slider.addEventListener("input", () => {
      this.stop();
      store.setYear(Number(slider.value));
    });
    playBtn.addEventListener("click", () => {
      if (this.timer !== null) this.stop();
      else this.start();
    });
    allErasBtn.addEventListener("click", () => {
      this.stop();
      store.reset();
    });
  }

  private start(): void {
    const s = this.store.get();
    // restart from the dawn of the atlas when finished or not yet begun
    const from = !s.timelineOn || s.year >= LAST_YEAR ? FIRST_YEAR : s.year;
    this.store.setTimeline(true, from);
    this.store.setPlaying(true);

    this.timer = window.setInterval(() => {
      const { year } = this.store.get();
      const next = year + YEAR_STEP;
      this.store.setYear(next > LAST_YEAR ? FIRST_YEAR : next);
    }, TICK_MS);
  }

  stop(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.store.setPlaying(false);
  }

  render(frame: Frame): void {
    const { state, t } = frame;
    this.slider.value = String(state.year);
    this.yearLabel.textContent = state.timelineOn
      ? formatYear(state.year, t.ui.era)
      : t.ui.allEras;
    this.allErasBtn.classList.toggle("show", state.timelineOn);
    this.allErasBtn.textContent = t.ui.clearEras;
    this.playBtn.textContent = state.playing ? "❚❚" : "▶";
    this.playBtn.title = state.playing ? t.ui.pause : t.ui.play;

    // playback was stopped from elsewhere (Escape, "all eras", a reveal)
    if (!state.playing && this.timer !== null) this.stop();
  }
}
