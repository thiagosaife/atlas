// Card support: resolve the design-system namespace.
// Tries an already-loaded bundle global, then dynamically loads _ds_bundle.js,
// then falls back to fetching and Babel-compiling the component .jsx sources.
window.loadCardComponents = async function (entries, bundlePath) {
  const findNS = () => {
    for (const k of Object.keys(window)) {
      try {
        const v = window[k];
        if (v && typeof v === "object" && v.Button && v.TornNote && v.EmpireRow) return v;
      } catch (e) {}
    }
    return null;
  };
  let ns = findNS();
  if (!ns && bundlePath) {
    await new Promise((done) => {
      const s = document.createElement("script");
      s.src = bundlePath; s.onload = done; s.onerror = done;
      document.head.appendChild(s);
    });
    ns = findNS();
  }
  if (ns) return ns;
  ns = {};
  for (const [path, name] of entries) {
    let src = await (await fetch(path)).text();
    src = src.replace(/^import[^\n]*$/gm, "").replace(/export function/g, "function");
    const code = Babel.transform(src, { presets: [["react", { runtime: "classic" }]] }).code + "\nreturn " + name + ";";
    ns[name] = new Function("React", "Swatch", code)(window.React, ns.Swatch);
  }
  return ns;
};
