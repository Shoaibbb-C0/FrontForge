import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Load the real JSX with the existing Vite toolchain; no test dependency needed.
test("preview rendering modes and isolation", async () => {
  const server = await createServer({ root: fileURLToPath(new URL("../../", import.meta.url)), server: { middlewareMode: true }, appType: "custom" });
  try {
    const { default: PreviewRenderer } = await server.ssrLoadModule("/src/previews/PreviewRenderer.jsx");
    const render = (component) => renderToStaticMarkup(React.createElement(PreviewRenderer, { component }));
    for (const component of [undefined, {}, { preview: { type: "none" } },
      { preview: { type: "unknown" } }, { preview: { type: "html", html: "  " } },
      { preview: { type: "html", html: 42 } },
      { preview: { type: "registered", registryKey: "missing" } },
      { preview: { type: "registered", registryKey: "constructor" } },
      { slug: "toString" },
      { slug: "editorial-split-hero", preview: { type: "none" } }]) {
      assert.match(render(component), /Preview unavailable/);
    }
    for (const slug of ["editorial-split-hero", "minimal-product-navbar", "bento-feature-grid"]) {
      assert.doesNotMatch(render({ slug }), /Preview unavailable/);
      assert.doesNotMatch(render({ slug, preview: { type: "registered" } }), /Preview unavailable/);
      assert.doesNotMatch(render({ slug: "different", preview: { type: "registered", registryKey: slug } }), /Preview unavailable/);
    }
    const markup = render({ preview: { type: "html", html: "<h1>Automatic preview</h1>", css: "h1 { color: red; }" } });
    assert.match(markup, /<iframe/);
    assert.match(markup, /sandbox=""/);
    assert.match(markup, /srcDoc=/);
    assert.match(markup, /Automatic preview/);
    assert.match(markup, /color: red/);
    assert.doesNotMatch(markup, /allow-scripts|allow-same-origin/);
  } finally {
    await server.close();
  }
});
