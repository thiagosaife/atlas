/**
 * The map view: projection, country paths, capital markers, zoom, and framing.
 *
 * Owns all d3 and all SVG. Everything it needs to draw arrives in a `Frame`;
 * it never reaches into the store.
 */
import { select, type Selection } from "d3-selection";
import {
  geoNaturalEarth1,
  geoPath,
  geoGraticule10,
  geoDistance,
  type GeoPath,
  type GeoProjection,
} from "d3-geo";
import {
  zoom as d3zoom,
  zoomIdentity,
  type ZoomBehavior,
  type D3ZoomEvent,
  type ZoomTransform,
} from "d3-zoom";
import "d3-transition"; // extends Selection with .transition()

import type { CountryName, Coords, EmpireId } from "@domain/types";
import type { World, CountryProps, Relief, ReliefProps } from "@services/geography";
import type { Frame } from "./frame";
import type { Feature, Geometry } from "geojson";

type CountryFeature = Feature<Geometry, CountryProps>;
type ReliefFeature = Feature<Geometry, ReliefProps>;

interface Marker {
  readonly id: EmpireId;
  readonly label: string;
  readonly coords: Coords;
  readonly color: string;
}

export interface MapCallbacks {
  onHoverLand(country: CountryName | null, evt: MouseEvent): void;
  onClickLand(country: CountryName | null): void;
  /** Ground distance the scale bar currently spans — changes as you zoom. */
  onScale(km: number): void;
  /**
   * The current pan/zoom, for chrome that lives outside the SVG but is drawn
   * *on the map* rather than on the glass — the pen scribbles.
   */
  onTransform(x: number, y: number, k: number): void;
}

/** Chart lines printed on every real map. Latitudes are the true obliquity. */
const PARALLELS = [
  { lat: 23.4368, key: "cancer" },
  { lat: 0, key: "equator" },
  { lat: -23.4368, key: "capricorn" },
] as const;

export type ParallelKey = (typeof PARALLELS)[number]["key"];

/** Where the parallel labels sit: empty mid-Pacific, clear of any land. */
const LABEL_LNG = -158;
/** Screen length of the scale bar, matching the 108px drawn in the cartouche. */
const SCALE_BAR_PX = 108;
const EARTH_RADIUS_KM = 6371;

/** How far the framing animation runs. Zero for reduced-motion and ?instant=1 tests. */
const FRAME_MS =
  new URLSearchParams(location.search).has("instant") ||
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 0
    : 700;

export class MapView {
  private readonly svg: Selection<SVGSVGElement, unknown, null, undefined>;
  private readonly gRoot: Selection<SVGGElement, unknown, null, undefined>;
  private readonly gCountries: Selection<SVGGElement, unknown, null, undefined>;
  private readonly gRelief: Selection<SVGGElement, unknown, null, undefined>;
  private readonly gGlobe: Selection<SVGGElement, unknown, null, undefined>;
  private readonly gDecor: Selection<SVGGElement, unknown, null, undefined>;
  private readonly gMarkers: Selection<SVGGElement, unknown, null, undefined>;
  private readonly projection: GeoProjection = geoNaturalEarth1();
  private readonly path: GeoPath;
  private readonly zoom: ZoomBehavior<SVGSVGElement, unknown>;
  private readonly stage: HTMLElement;
  private readonly cb: MapCallbacks;
  private scale = 1; // markers counter-scale by 1/k to stay legible
  private transform: ZoomTransform = zoomIdentity;

  constructor(
    svgEl: SVGSVGElement,
    stage: HTMLElement,
    private readonly world: World,
    relief: Relief,
    cb: MapCallbacks,
  ) {
    this.stage = stage;
    this.cb = cb;
    this.svg = select(svgEl);
    const defs = this.svg.append("defs");
    this.defineGlobeShading(defs);
    this.defineReliefPatterns(defs);
    this.gRoot = this.svg.append("g");
    this.gCountries = this.gRoot.append("g");
    // relief sits over the land, so a range still reads across an empire's fill
    this.gRelief = this.gRoot.append("g");
    // shading rides over both so the whole disc reads as a sphere, but under
    // the chart lines and markers, which must stay crisp
    this.gGlobe = this.gRoot.append("g");
    this.gDecor = this.gRoot.append("g");
    this.gMarkers = this.gRoot.append("g");
    this.path = geoPath(this.projection);

    this.gRelief
      .selectAll<SVGPathElement, ReliefFeature>("path.relief")
      .data(relief.features)
      .join("path")
      .attr("class", (d) => `relief ${d.properties.kind}`);

    this.gGlobe
      .append("path")
      .attr("class", "globe-shade")
      .datum({ type: "Sphere" });
    this.gGlobe
      .append("path")
      .attr("class", "globe-light")
      .datum({ type: "Sphere" });

    this.gDecor
      .selectAll("path.chartline")
      .data(PARALLELS)
      .join("path")
      .attr("class", "chartline");
    this.gDecor
      .selectAll("text.chartlabel")
      .data(PARALLELS)
      .join("text")
      .attr("class", "chartlabel");

    this.gCountries.append("path").attr("class", "sphere").datum({ type: "Sphere" });
    this.gCountries.append("path").attr("class", "graticule").datum(geoGraticule10());

    this.gCountries
      .selectAll<SVGPathElement, CountryFeature>("path.country")
      .data(world.countries.features)
      .join("path")
      .attr("class", "country")
      .on("mousemove", (evt: MouseEvent, d) => cb.onHoverLand(d.properties.name, evt))
      .on("mouseenter", (evt: MouseEvent, d) => cb.onHoverLand(d.properties.name, evt))
      .on("mouseleave", (evt: MouseEvent) => cb.onHoverLand(null, evt))
      .on("click", (evt: MouseEvent, d) => {
        evt.stopPropagation();
        cb.onClickLand(d.properties.name);
      });

    this.gCountries.select("path.sphere").on("click", () => cb.onClickLand(null));

    this.zoom = d3zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 12])
      .translateExtent([[0, 0], [stage.clientWidth, stage.clientHeight]])
      .on("zoom", (evt: D3ZoomEvent<SVGSVGElement, unknown>) => {
        this.scale = evt.transform.k;
        this.transform = evt.transform;
        this.gRoot.attr("transform", evt.transform.toString());
        this.positionOverlays();
        this.emitScale();
        this.cb.onTransform(evt.transform.x, evt.transform.y, evt.transform.k);
      })
      .on("start", () => this.svg.classed("grabbing", true))
      .on("end", () => this.svg.classed("grabbing", false));

    this.svg.call(this.zoom).on("dblclick.zoom", null);
  }

  /**
   * The relief textures.
   *
   * Two conventions straight off an old chart: ranges get **chevrons** — little
   * carets marching over the range, the way a draughtsman would draw hills — and
   * plateaus get a **stipple** of dots. Neither pretends to know an elevation;
   * they say "high ground here", which is exactly what a hand-drawn chart says.
   *
   * The patterns are in user space, so they magnify with the map: you are zooming
   * into a printed sheet, and the printed texture grows with it.
   */
  private defineReliefPatterns(defs: Selection<SVGDefsElement, unknown, null, undefined>): void {
    const chevrons = defs
      .append("pattern")
      .attr("id", "relief-mtn")
      .attr("patternUnits", "userSpaceOnUse")
      .attr("width", 7)
      .attr("height", 6);
    chevrons.append("rect").attr("width", 7).attr("height", 6).attr("fill", "rgba(150,112,64,0.10)");
    chevrons
      .append("path")
      // two carets, offset, so the rows interlock instead of forming stripes
      .attr("d", "M0.8 4.4 L2.4 1.6 L4 4.4 M4.2 5.6 L5.2 3.9 L6.2 5.6")
      .attr("fill", "none")
      .attr("stroke", "#7a5a30")
      .attr("stroke-width", 0.55)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("opacity", 0.75);

    const stipple = defs
      .append("pattern")
      .attr("id", "relief-plateau")
      .attr("patternUnits", "userSpaceOnUse")
      .attr("width", 6)
      .attr("height", 6);
    stipple.append("rect").attr("width", 6).attr("height", 6).attr("fill", "rgba(150,112,64,0.08)");
    const dots: [number, number][] = [
      [1.4, 1.4],
      [4.3, 3.1],
      [2.6, 4.7],
    ];
    for (const [cx, cy] of dots) {
      stipple
        .append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", 0.42)
        .attr("fill", "#7a5a30")
        .attr("opacity", 0.6);
    }
  }

  /**
   * Give the disc some volume.
   *
   * Two washes over the sphere: limb darkening, which deepens sharply toward the
   * rim the way a lit sphere falls away from the viewer, and a soft highlight up
   * and to the left where the light comes from. Both are painted through the
   * sphere's own path, so they follow the projection exactly and travel with the
   * map when it is panned or zoomed.
   */
  private defineGlobeShading(defs: Selection<SVGDefsElement, unknown, null, undefined>): void {
    const shade = defs
      .append("radialGradient")
      .attr("id", "globe-shade")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");
    const shadeStops: [string, string][] = [
      ["0%", "rgba(60,34,12,0)"],
      ["62%", "rgba(60,34,12,0.02)"],
      ["85%", "rgba(60,34,12,0.07)"],
      ["96%", "rgba(45,24,8,0.15)"],
      ["100%", "rgba(35,18,6,0.22)"],
    ];
    for (const [offset, color] of shadeStops) {
      shade.append("stop").attr("offset", offset).attr("stop-color", color);
    }

    // the light sits up and to the left, matching the page's own vignette
    const light = defs
      .append("radialGradient")
      .attr("id", "globe-light")
      .attr("cx", "36%")
      .attr("cy", "27%")
      .attr("r", "58%");
    const lightStops: [string, string][] = [
      ["0%", "rgba(255,248,228,0.2)"],
      ["45%", "rgba(255,248,228,0.05)"],
      ["100%", "rgba(255,248,228,0)"],
    ];
    for (const [offset, color] of lightStops) {
      light.append("stop").attr("offset", offset).attr("stop-color", color);
    }
  }

  /** Fit the projection to the stage. Call on mount and on resize. */
  resize(): void {
    const w = this.stage.clientWidth;
    const h = this.stage.clientHeight;
    this.svg.attr("viewBox", `0 0 ${w} ${h}`);
    this.projection.fitExtent(
      [
        [20, 84],
        [w - 20, h - 70],
      ],
      this.world.countries,
    );
    this.gCountries.selectAll<SVGPathElement, never>("path").attr("d", this.path as never);
    this.gRelief.selectAll<SVGPathElement, never>("path").attr("d", this.path as never);
    this.gGlobe.selectAll<SVGPathElement, never>("path").attr("d", this.path as never);

    // Parallels are drawn as real geography, so they curve with the projection
    // and travel with the map when you pan or zoom.
    this.gDecor.selectAll<SVGPathElement, (typeof PARALLELS)[number]>("path.chartline").attr(
      "d",
      (d) =>
        this.path({
          type: "LineString",
          coordinates: Array.from({ length: 181 }, (_, i) => [-180 + i * 2, d.lat]),
        } as never) ?? "",
    );

    this.positionOverlays();
    this.emitScale();
  }

  paint(frame: Frame): void {
    const { state, atlas, colors, active, focusTerritory } = frame;

    this.gCountries
      .selectAll<SVGPathElement, CountryFeature>("path.country")
      .each((d, i, nodes) => {
        const name = d.properties.name;
        const el = select(nodes[i]!);
        const inFocus = focusTerritory?.has(name) ?? false;

        el.classed("has-empire", atlas.chartedLands.has(name));
        el.classed("pinned", name === state.pinned);
        el.classed("focus", inFocus);
        // outside the revealed empire, the world recedes to a ghostly backdrop
        el.classed("backdrop", focusTerritory !== null && !inFocus);

        if (state.timelineOn) {
          const dominant = atlas.dominantIn(name, active);
          el.classed("era-on", dominant !== null);
          el.classed("dim", dominant === null && atlas.chartedLands.has(name));
          // a revealed empire owns its lands outright, even where realms overlap
          const focusColor = state.focused ? colors.get(state.focused) : undefined;
          const fill = inFocus
            ? (focusColor ?? "var(--land-hover)")
            : dominant
              ? (colors.get(dominant.id) ?? null)
              : null;
          // `.style(name, fn)` is the overload that accepts a nullable value
          el.style("fill", () => fill);
        } else {
          el.classed("era-on", false).classed("dim", false);
          el.style("fill", () => (inFocus ? "var(--land-hover)" : null));
        }
      });

    this.paintMarkers(frame);
    this.paintDecor(frame);
  }

  private paintMarkers(frame: Frame): void {
    const { state, colors, active, loc } = frame;
    const markers: Marker[] = [];
    const seen = new Set<EmpireId>();

    const add = (id: EmpireId, fallback: string): void => {
      if (seen.has(id)) return;
      seen.add(id);
      const e = loc(id);
      if (!e) return;
      markers.push({
        id,
        label: e.capitalName,
        coords: e.capitalCoords,
        color: colors.get(id) ?? fallback,
      });
    };

    for (const e of active) add(e.id, "var(--crimson)");
    if (state.focused) add(state.focused, "var(--crimson)");

    const sel = this.gMarkers
      .selectAll<SVGGElement, Marker>("g.marker")
      .data(markers, (d) => d.id);

    sel.exit().remove();
    const enter = sel.enter().append("g").attr("class", "marker");
    enter.append("circle").attr("class", "ring").attr("r", 5);
    enter.append("circle").attr("class", "dot").attr("r", 3);
    enter.append("text").attr("dx", 8).attr("dy", 3);

    const all = enter.merge(sel);
    all
      .classed("focused", (d) => d.id === state.focused)
      .classed("faded", (d) => state.focused !== null && d.id !== state.focused);
    all.select("circle.ring").attr("stroke", (d) => d.color);
    all
      .select("circle.dot")
      .attr("fill", (d) => d.color)
      .attr("r", (d) => (d.id === state.focused ? 4.5 : 3));
    all
      .select("text")
      .text((d) => d.label)
      .attr("fill", (d) => d.color);

    this.positionOverlays();
  }

  /** Counter-scale by 1/k so dots and labels keep a constant size at any zoom. */
  private positionOverlays(): void {
    const place = (coords: readonly [number, number]): string => {
      const p = this.projection(coords as [number, number]);
      return p ? `translate(${p[0]},${p[1]}) scale(${1 / this.scale})` : "translate(-999,-999)";
    };

    this.gMarkers
      .selectAll<SVGGElement, Marker>("g.marker")
      .attr("transform", (d) => place(d.coords));

    this.gDecor
      .selectAll<SVGTextElement, (typeof PARALLELS)[number]>("text.chartlabel")
      .attr("transform", (d) => place([LABEL_LNG, d.lat]))
      .attr("dy", -3);

  }

  /**
   * How much ground the scale bar covers right now.
   *
   * Measured across the middle of the viewport rather than at the equator, so
   * the figure tracks where you actually are — Natural Earth stretches badly
   * toward the poles, and a fixed equatorial figure would be a lie once zoomed.
   */
  private emitScale(): void {
    const invert = this.projection.invert;
    if (!invert) return;

    const w = this.stage.clientWidth;
    const h = this.stage.clientHeight;
    // a hidden or not-yet-laid-out stage measures 0×0; sampling it would
    // invert points around the map's origin and report nonsense
    if (!w || !h) return;

    const cx = w / 2;
    const cy = h / 2;
    const half = SCALE_BAR_PX / 2;
    // screen → pre-zoom map space → lon/lat
    const toLonLat = (sx: number): [number, number] | null =>
      invert([(sx - this.transform.x) / this.transform.k, (cy - this.transform.y) / this.transform.k]) ??
      null;

    const a = toLonLat(cx - half);
    const b = toLonLat(cx + half);
    if (!a || !b) return;

    this.cb.onScale(geoDistance(a, b) * EARTH_RADIUS_KM);
  }

  /** Chart-line labels, in the active language. */
  private paintDecor(frame: Frame): void {
    const { chart } = frame.t.ui;
    this.gDecor
      .selectAll<SVGTextElement, (typeof PARALLELS)[number]>("text.chartlabel")
      .text((d) => chart[d.key]);
  }

  /**
   * Zoom to a set of lands, centring them in the area not covered by chrome
   * (the drawer, legend, and timeline all eat into the stage).
   */
  frameCountries(names: readonly CountryName[], visible: Rect): void {
    const set = new Set(names);
    const features = this.world.countries.features.filter((f) => set.has(f.properties.name));
    if (!features.length) return;

    const [[bx0, by0], [bx1, by1]] = this.path.bounds({
      type: "FeatureCollection",
      features,
    } as never);

    const vw = visible.x1 - visible.x0;
    const vh = visible.y1 - visible.y0;
    const dx = bx1 - bx0;
    const dy = by1 - by0;
    const k = Math.max(1, Math.min(10, 0.85 / Math.max(dx / vw, dy / vh)));
    const cx = (bx0 + bx1) / 2;
    const cy = (by0 + by1) / 2;

    const transform = zoomIdentity
      .translate((visible.x0 + visible.x1) / 2 - k * cx, (visible.y0 + visible.y1) / 2 - k * cy)
      .scale(k);

    // A 0ms transition still waits for an animation frame, which a throttled or
    // background tab may never deliver — apply synchronously when not animating.
    if (FRAME_MS) {
      this.svg.transition().duration(FRAME_MS).call(this.zoom.transform, transform);
    } else {
      this.svg.call(this.zoom.transform, transform);
    }
  }
}

export interface Rect {
  readonly x0: number;
  readonly x1: number;
  readonly y0: number;
  readonly y1: number;
}
