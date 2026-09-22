import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

test("animation previews preserve isolation and supported runtimes", async () => {
  const server = await createServer({
    root: fileURLToPath(new URL("../../", import.meta.url)),
    server: { middlewareMode: true },
    appType: "custom",
  });

  try {
    const { default: AnimationPreviewRenderer } = await server.ssrLoadModule(
      "/src/animation-previews/AnimationPreviewRenderer.jsx",
    );
    const render = (animation) =>
      renderToStaticMarkup(
        React.createElement(AnimationPreviewRenderer, { animation }),
      );

    assert.match(render(), /Preview unavailable/);
    assert.match(
      render({ preview: { type: "registered", registryKey: "missing" } }),
      /Preview unavailable/,
    );
    assert.doesNotMatch(
      render({ preview: { type: "registered", registryKey: "motion-fade-up" } }),
      /Preview unavailable/,
    );

    const javascriptMarkup = render({
      name: "Click example",
      library: "javascript",
      code: { javascript: "document.body.dataset.ready = 'true';" },
      preview: { type: "html", html: "<button>Run</button>", css: "" },
    });
    assert.match(javascriptMarkup, /allow-scripts/);
    assert.match(javascriptMarkup, /prefers-reduced-motion/);
    assert.match(javascriptMarkup, /Click example preview/);

    const gsapMarkup = render({
      name: "GSAP example",
      library: "gsap",
      code: { javascript: "gsap.to('button', { opacity: 1 });" },
      preview: { type: "html", html: "<button>Run</button>", css: "" },
    });
    assert.match(gsapMarkup, /gsap@3\.13\.0/);
    assert.doesNotMatch(gsapMarkup, /allow-same-origin/);
  } finally {
    await server.close();
  }
});
