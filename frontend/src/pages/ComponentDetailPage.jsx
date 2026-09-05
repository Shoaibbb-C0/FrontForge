import {
  ArrowLeft,
  ExternalLink,
  Heart,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ComponentDetailPage() {
  const { slug } = useParams();

  const [component, setComponent] = useState(null);
  const [activeTab, setActiveTab] = useState("preview");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComponent = async () => {
      try {
        setIsLoading(true);
        setError("");

        const API_URL = import.meta.env.VITE_API_URL;

        const response = await fetch(
          `${API_URL}/api/components/${slug}`
        );

        if (!response.ok) {
          throw new Error("Failed to load component");
        }

        const result = await response.json();

        setComponent(result.data);
      } catch (error) {
        console.error("Component detail fetch error:", error);

        setError("FrontForge couldn't load this component.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComponent();
  }, [slug]);

  if (isLoading) {
    return (
      <StateMessage
        eyebrow="Loading"
        title="Opening component..."
        description="Fetching component details."
      />
    );
  }

  if (error || !component) {
    return (
      <StateMessage
        eyebrow="Error"
        title="Component unavailable."
        description={error}
      />
    );
  }

  const tabs = [
    "preview",
    "code",
    "notes",
    "reference",
    "implementation",
  ];

  return (
    <section>
      <header className="border-b border-forge-border pb-8">
        <Link
          to="/components"
          className="inline-flex items-center gap-2 text-sm text-forge-muted transition hover:text-forge-text"
        >
          <ArrowLeft size={16} />
          Components
        </Link>

        <div className="mt-7 grid gap-7 xl:grid-cols-[1fr_360px] xl:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-accent">
                Level {component.level}
              </span>

              <span className="text-forge-subtle">/</span>

              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-muted">
                {component.category}
              </span>

              <span className="text-forge-subtle">/</span>

              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-muted">
                {component.difficulty}
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,5vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
              {component.name}
            </h1>
          </div>

          <div>
            <p className="text-[15px] leading-7 text-forge-muted">
              {component.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {component.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-forge-border px-2.5 py-1 font-mono text-[10px] text-forge-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-10 border-b border-forge-border bg-forge-bg/95 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={[
                  "shrink-0 rounded-forge-sm px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition",
                  activeTab === tab
                    ? "bg-forge-surface-soft text-forge-text"
                    : "text-forge-muted hover:text-forge-text",
                ].join(" ")}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Favorite component"
            className="text-forge-muted transition hover:text-forge-text"
          >
            <Heart size={18} />
          </button>
        </div>
      </div>

      <div className="py-8">
        {activeTab === "preview" && (
          <PreviewTab component={component} />
        )}

        {activeTab === "code" && (
          <CodeTab component={component} />
        )}

        {activeTab === "notes" && (
          <NotesTab component={component} />
        )}

        {activeTab === "reference" && (
          <ReferenceTab component={component} />
        )}

        {activeTab === "implementation" && (
          <ImplementationTab component={component} />
        )}
      </div>
    </section>
  );
}

function PreviewTab({ component }) {
  return (
    <div className="overflow-hidden rounded-forge-lg border border-forge-border bg-forge-surface">
      <div className="flex items-center justify-between border-b border-forge-border px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-muted">
            Live preview
          </span>

          <p className="mt-1 text-sm text-forge-text">
            {component.name}
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 text-xs text-forge-muted transition hover:text-forge-text"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      <div className="flex min-h-[480px] items-center justify-center bg-forge-bg p-6">
        <div className="flex h-full min-h-[360px] w-full items-center justify-center rounded-forge-md border border-dashed border-forge-border bg-forge-surface-soft">
          <div className="text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-accent">
              Preview system
            </span>

            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.045em]">
              {component.name}
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-forge-muted">
              The real runnable component preview will be mounted here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeTab({ component }) {
  const hasCode =
    component.code?.jsx ||
    component.code?.css ||
    component.code?.javascript;

  if (!hasCode) {
    return (
      <EmptySection
        title="No code saved yet."
        description="Code will appear here once this component is fully implemented."
      />
    );
  }

  return (
    <div className="space-y-5">
      {component.code?.jsx && (
        <CodeBlock title="React / JSX" code={component.code.jsx} />
      )}

      {component.code?.css && (
        <CodeBlock title="CSS" code={component.code.css} />
      )}

      {component.code?.javascript && (
        <CodeBlock
          title="JavaScript"
          code={component.code.javascript}
        />
      )}
    </div>
  );
}

function CodeBlock({ title, code }) {
  return (
    <div className="overflow-hidden rounded-forge-lg border border-forge-border bg-forge-surface">
      <div className="border-b border-forge-border px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-muted">
          {title}
        </span>
      </div>

      <pre className="overflow-x-auto p-5 font-mono text-sm leading-6 text-forge-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function NotesTab({ component }) {
  const notes = [
    ["What it is", component.notes?.whatItIs],
    ["Why it works", component.notes?.whyItWorks],
    ["When to use", component.notes?.whenToUse],
    ["When not to use", component.notes?.whenNotToUse],
    [
      "Responsive behavior",
      component.notes?.responsiveBehavior,
    ],
  ];

  return (
    <div className="grid gap-px overflow-hidden rounded-forge-lg border border-forge-border bg-forge-border md:grid-cols-2">
      {notes.map(([title, value]) => (
        <article
          key={title}
          className="min-h-[180px] bg-forge-surface p-6"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-accent">
            {title}
          </span>

          <p className="mt-5 text-sm leading-7 text-forge-muted">
            {value || "No notes added yet."}
          </p>
        </article>
      ))}
    </div>
  );
}

function ReferenceTab({ component }) {
  const hasReference =
    component.reference?.websiteName ||
    component.reference?.url;

  if (!hasReference) {
    return (
      <EmptySection
        title="No reference attached."
        description="A studied website reference can be connected to this pattern later."
      />
    );
  }

  return (
    <article className="rounded-forge-lg border border-forge-border bg-forge-surface p-6">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-accent">
        Reference
      </span>

      <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em]">
        {component.reference.websiteName ||
          "External reference"}
      </h2>

      {component.reference.url && (
        <a
          href={component.reference.url}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm text-forge-accent"
        >
          Visit reference
          <ExternalLink size={14} />
        </a>
      )}
    </article>
  );
}

function ImplementationTab({ component }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <article className="rounded-forge-lg border border-forge-border bg-forge-surface p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-accent">
          Implementation
        </span>

        <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em]">
          Rebuild the principle.
        </h2>

        <p className="mt-4 text-sm leading-7 text-forge-muted">
          Study the hierarchy, spacing, responsive behavior and
          composition before recreating this pattern in your own
          visual language.
        </p>
      </article>

      <article className="rounded-forge-lg border border-forge-border bg-forge-surface p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-accent">
          Difficulty
        </span>

        <h2 className="mt-4 font-display text-2xl font-semibold capitalize tracking-[-0.04em]">
          {component.difficulty}
        </h2>

        <p className="mt-4 text-sm leading-7 text-forge-muted">
          Focus on understanding the layout before introducing
          unnecessary complexity.
        </p>
      </article>
    </div>
  );
}

function EmptySection({ title, description }) {
  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-forge-lg border border-dashed border-forge-border bg-forge-surface/30 px-6 text-center">
      <div className="max-w-md">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.045em]">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-forge-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

function StateMessage({ eyebrow, title, description }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center text-center">
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-forge-accent">
          {eyebrow}
        </span>

        <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.05em]">
          {title}
        </h1>

        <p className="mt-3 text-sm text-forge-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ComponentDetailPage;