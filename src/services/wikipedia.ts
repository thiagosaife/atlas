/**
 * Wikipedia field notes: a thumbnail, a summary, and a canonical link per empire.
 *
 * Two articles are fetched: the empire's own (for the text) and, when curated,
 * a monument article whose lead image actually evokes the realm — Machu Picchu
 * rather than a flag. Results are cached per (locale, empire) for the session.
 *
 * Entirely optional: offline or on failure the app still works, images simply
 * stay absent and links fall back to a constructed URL.
 */
import type { EmpireId, LocalizedEmpire } from "@domain/types";
import type { Translator } from "@i18n/index";

export interface FieldNote {
  readonly thumb: string | null;
  readonly extract: string | null;
  readonly url: string;
}

interface Summary {
  thumbnail?: { source?: string };
  extract?: string;
  content_urls?: { desktop?: { page?: string } };
}

const cache = new Map<string, Promise<FieldNote>>();

async function summary(lang: string, title: string): Promise<Summary | null> {
  try {
    const res = await fetch(
      `https://${lang}.wikipedia.org/api/rest_v1/page/summary/` +
        encodeURIComponent(title.replace(/ /g, "_")),
    );
    return res.ok ? ((await res.json()) as Summary) : null;
  } catch {
    return null;
  }
}

export function fetchFieldNote(empire: LocalizedEmpire, t: Translator): Promise<FieldNote> {
  const key = `${t.locale}:${empire.id}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const { lang, title, imageTitle } = t.wikiApi(empire);
  const note = Promise.all([
    summary(lang, title),
    // Curated monument articles are English titles.
    imageTitle ? summary("en", imageTitle) : Promise.resolve(null),
  ]).then(([article, image]) => ({
    thumb: image?.thumbnail?.source ?? article?.thumbnail?.source ?? null,
    extract: article?.extract ?? null,
    url: article?.content_urls?.desktop?.page ?? t.wikiUrl(empire),
  }));

  cache.set(key, note);
  return note;
}

/**
 * Fill in `.thumb[data-tid]` placeholders once their images arrive.
 * `stillValid` guards against a slow response painting a panel the user has left.
 */
export function hydrateThumbs(
  container: HTMLElement,
  empires: readonly LocalizedEmpire[],
  t: Translator,
  stillValid: () => boolean,
): void {
  for (const e of empires) {
    void fetchFieldNote(e, t).then((note) => {
      if (!note.thumb || !stillValid()) return;
      const el = container.querySelector<HTMLElement>(`.thumb[data-tid="${cssEscape(e.id)}"]`);
      if (!el) return;
      el.style.backgroundImage = `url("${note.thumb}")`;
      el.classList.add("on");
    });
  }
}

const cssEscape = (s: EmpireId): string =>
  typeof CSS !== "undefined" && CSS.escape ? CSS.escape(s) : s;
