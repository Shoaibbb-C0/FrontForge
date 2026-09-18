import HtmlPreview from "../previews/HtmlPreview";

const reducedMotionCss = `
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;
import animationPreviewRegistry from "./animationPreviewRegistry";

const GSAP_CDN =
  "https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js";

function AnimationPreviewRenderer({ animation }) {
  const preview = animation?.preview;

  if (!preview || preview.type === "none") {
    return <PreviewFallback />;
  }

  if (preview.type === "registered") {
    const RegisteredPreview =
      animationPreviewRegistry[preview.registryKey];

    if (!RegisteredPreview) {
      return <PreviewFallback />;
    }

    return <RegisteredPreview />;
  }

  if (preview.type === "html") {
    if (!preview.html?.trim()) {
      return <PreviewFallback />;
    }

    const previewCss = `
      ${preview.css || ""}
      ${reducedMotionCss}
    `;

    const isGsap =
      animation.library?.toLowerCase() === "gsap";

    const externalScripts = isGsap
      ? [GSAP_CDN]
      : [];

    const javascript = isGsap
      ? `
      const prefersReducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

      if (!prefersReducedMotion) {
        ${animation.code?.javascript || ""}
      }
    `
      : "";

    return (
      <HtmlPreview
        html={preview.html}
        css={previewCss}
        javascript={javascript}
        externalScripts={externalScripts}
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