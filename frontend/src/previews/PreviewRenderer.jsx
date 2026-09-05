import previewRegistry from "./previewRegistry";

function PreviewRenderer({ slug }) {
  const PreviewComponent = previewRegistry[slug];

  if (!PreviewComponent) {
    return (
      <div className="flex min-h-[360px] items-center justify-center border border-dashed border-forge-border bg-forge-surface-soft p-6 text-center">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-accent">
            Preview unavailable
          </span>

          <p className="mt-3 text-sm text-forge-muted">
            No runnable preview has been registered for this
            component yet.
          </p>
        </div>
      </div>
    );
  }

  return <PreviewComponent />;
}

export default PreviewRenderer;