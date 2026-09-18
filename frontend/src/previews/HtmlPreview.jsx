function HtmlPreview({
  html = "",
  css = "",
  javascript = "",
  externalScripts = [],
}) {
  const scriptTags = externalScripts
    .map(
      (src) =>
        `<script src="${src}"></script>`,
    )
    .join("\n");

  const document = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <style>
          *, *::before, *::after {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            min-height: 100%;
          }

          body {
            background: white;
            font-family:
              system-ui,
              Arial,
              Helvetica,
              sans-serif;
          }

          ${css}
        </style>
      </head>

      <body>
        ${html}

        ${scriptTags}

        ${javascript
      ? `
              <script>
                try {
                  ${javascript}
                } catch (error) {
                  console.error(
                    "FrontForge preview error:",
                    error
                  );
                }
              </script>
            `
      : ""
    }
      </body>
    </html>
  `;

  const hasJavaScript =
    javascript.trim() ||
    externalScripts.length > 0;

  return (
    <iframe
      title="FrontForge component preview"
      srcDoc={document}
      sandbox={
        hasJavaScript
          ? "allow-scripts"
          : ""
      }
      className="block min-h-[520px] w-full border-0 bg-white"
    />
  );
}

export default HtmlPreview;