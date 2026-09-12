import HtmlPreview from "./HtmlPreview";
import previewRegistry from "./previewRegistry";

function PreviewRenderer({ component }) {
  const preview = component?.preview;

  if (!preview) {
    const PreviewComponent = Object.hasOwn(previewRegistry, component?.slug)
      ? previewRegistry[component.slug]
      : null;

    return PreviewComponent ? <PreviewComponent /> : <PreviewFallback />;
  }

  if (preview.type === "none") {
    return <PreviewFallback />;
  }

  if (preview.type === "html") {
    if (typeof preview.html !== "string" || !preview.html.trim()) {
      return <PreviewFallback />;
    }

    return (
      <HtmlPreview
        html={preview.html}
        css={preview.css}
      />
    );
  }

  if (preview.type === "registered") {
    const registryKey =
      preview.registryKey || component.slug;

    const PreviewComponent =
      Object.hasOwn(previewRegistry, registryKey)
        ? previewRegistry[registryKey]
        : null;

    if (!PreviewComponent) {
      return <PreviewFallback />;
    }

    return <PreviewComponent />;
  }

  return <PreviewFallback />;
}

function PreviewFallback() {
  return (
    <div className="flex min-h-[360px] items-center justify-center border border-dashed border-forge-border bg-forge-surface-soft p-6 text-center">
      <div className="max-w-md">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-accent">
          Preview unavailable
        </span>

        <p className="mt-3 text-sm leading-6 text-forge-muted">
          No runnable preview has been configured for this component yet.
        </p>
      </div>
    </div>
  );
}

export default PreviewRenderer;