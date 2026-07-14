/**
 * Tiny DOM helpers. No framework — the atlas is one screen and a handful of views.
 */

/**
 * Escape text destined for an HTML template literal.
 *
 * The empire data is community-contributed, so a stray `<` or `&` in a blurb
 * must never become markup. Applied to every interpolated value.
 */
export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function must<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`missing element: ${selector}`);
  return el;
}

/** Attach a click handler to every match inside a container. */
export function onClick(
  root: ParentNode,
  selector: string,
  handler: (el: HTMLElement, evt: MouseEvent) => void,
): void {
  root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    el.addEventListener("click", (evt) => handler(el, evt as MouseEvent));
  });
}

export const setText = (el: Element, text: string): void => {
  el.textContent = text;
};
