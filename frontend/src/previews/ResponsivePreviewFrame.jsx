import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
} from "lucide-react";
import { useState } from "react";

const previewModes = {
  desktop: {
    label: "Desktop",
    width: "100%",
    icon: Monitor,
  },

  tablet: {
    label: "Tablet",
    width: "768px",
    icon: Tablet,
  },

  mobile: {
    label: "Mobile",
    width: "390px",
    icon: Smartphone,
  },
};

function ResponsivePreviewFrame({ children }) {
  const [mode, setMode] = useState("desktop");

  return (
    <div className="overflow-hidden rounded-forge-lg border border-forge-border bg-forge-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forge-border px-4 py-3">
        <div className="flex items-center gap-1">
          {Object.entries(previewModes).map(
            ([key, config]) => {
              const Icon = config.icon;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  className={[
                    "flex items-center gap-2 rounded-forge-sm px-3 py-2 text-xs transition",
                    mode === key
                      ? "bg-forge-surface-soft text-forge-text"
                      : "text-forge-muted hover:text-forge-text",
                  ].join(" ")}
                >
                  <Icon size={15} />
                  <span className="hidden sm:inline">
                    {config.label}
                  </span>
                </button>
              );
            }
          )}
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-forge-subtle">
          <Maximize2 size={13} />

          {mode === "desktop"
            ? "Fluid"
            : previewModes[mode].width}
        </div>
      </div>

      <div className="overflow-x-auto bg-[#090c10] p-4 sm:p-6">
        <div
          className="mx-auto overflow-hidden bg-white transition-[width] duration-300"
          style={{
            width: previewModes[mode].width,
            maxWidth: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default ResponsivePreviewFrame;