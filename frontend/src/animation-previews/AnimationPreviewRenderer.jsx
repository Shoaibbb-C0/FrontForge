import HtmlPreview from "../previews/HtmlPreview";

function AnimationPreviewRenderer({ animation }) {
  const preview = animation?.preview;

  if (!preview || preview.type === "none") {
    return <PreviewFallback />;
  }

  if (preview.type === "html") {
    if (!preview.html?.trim()) {
      return <PreviewFallback />;
    }

    return (
      <HtmlPreview
        html={preview.html}
        css={preview.css}
      />
    );
  }

  return <PreviewFallback />;
}

function PreviewFallback() {
  return (
    <div className="flex min-h-[420px] items-center justify-center bg-forge-surface-soft p-6 text-center">
      <div className="max-w-md">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-accent">
          Preview unavailable
        </span>

        <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em]">
          No live animation yet.
        </h3>

        <p className="mt-3 text-sm leading-6 text-forge-muted">
          Configure a preview for this animation to see
          the motion running here.
        </p>
      </div>
    </div>
  );
}

export default AnimationPreviewRenderer;