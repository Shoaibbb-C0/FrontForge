import { ArrowLeft, Copy, Heart, Pencil, Trash2 } from "lucide-react";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import AnimationPreviewRenderer from "../animation-previews/AnimationPreviewRenderer";
import ResponsivePreviewFrame from "../previews/ResponsivePreviewFrame";

function AnimationDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [animation, setAnimation] = useState(null);
  const [activeTab, setActiveTab] = useState("preview");

  const [isLoading, setIsLoading] = useState(true);

  const [isDeleting, setIsDeleting] = useState(false);

  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);

  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/animations/${slug}`);

        if (!response.ok) {
          throw new Error("Failed to load animation");
        }

        const result = await response.json();

        setAnimation(result.data);
      } catch (error) {
        console.error("Animation detail fetch error:", error);

        setError("FrontForge couldn't load this animation.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimation();
  }, [API_URL, slug]);

  const handleFavoriteToggle = async () => {
    if (!animation || isUpdatingFavorite) {
      return;
    }

    try {
      setIsUpdatingFavorite(true);

      const response = await fetch(
        `${API_URL}/api/animations/${animation.slug}/favorite`,
        {
          method: "PATCH",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite");
      }

      const result = await response.json();

      setAnimation(result.data);
    } catch (error) {
      console.error("Animation favorite update error:", error);

      window.alert("FrontForge couldn't update this favorite.");
    } finally {
      setIsUpdatingFavorite(false);
    }
  };

  const handleDelete = async () => {
    if (!animation || isDeleting) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${animation.name}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);

      const response = await fetch(
        `${API_URL}/api/animations/${animation.slug}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete animation");
      }

      navigate("/animations");
    } catch (error) {
      console.error("Animation delete error:", error);

      window.alert("FrontForge couldn't delete this animation.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <StateMessage
        eyebrow="Loading"
        title="Opening animation..."
        description="Fetching animation details."
      />
    );
  }

  if (error || !animation) {
    return (
      <StateMessage
        eyebrow="Error"
        title="Animation unavailable."
        description={error}
      />
    );
  }

  const tabs = ["preview", "code", "notes", "performance", "accessibility"];

  return (
    <section>
      <header className="border-b border-forge-border pb-8">
        <Link
          to="/animations"
          className="inline-flex items-center gap-2 text-sm text-forge-muted transition hover:text-forge-text"
        >
          <ArrowLeft size={16} />
          Animations
        </Link>

        <div className="mt-7 grid gap-7 xl:grid-cols-[1fr_360px] xl:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-accent">
                {animation.library}
              </span>

              <span className="text-forge-subtle">/</span>

              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-muted">
                {animation.trigger}
              </span>

              <span className="text-forge-subtle">/</span>

              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-muted">
                {animation.difficulty}
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,5vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
              {animation.name}
            </h1>
          </div>

          <div>
            <p className="text-[15px] leading-7 text-forge-muted">
              {animation.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {animation.tags?.map((tag) => (
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={
                animation.isFavorite
                  ? `Remove ${animation.name} from favorites`
                  : `Add ${animation.name} to favorites`
              }
              onClick={handleFavoriteToggle}
              disabled={isUpdatingFavorite}
              className={[
                "transition disabled:cursor-not-allowed disabled:opacity-50",
                animation.isFavorite
                  ? "text-forge-accent"
                  : "text-forge-muted hover:text-forge-text",
              ].join(" ")}
            >
              <Heart
                size={18}
                fill={animation.isFavorite ? "currentColor" : "none"}
              />
            </button>

            <Link
              to={`/animations/${animation.slug}/edit`}
              className="flex items-center gap-2 rounded-forge-sm px-3 py-2 text-xs text-forge-muted transition hover:bg-forge-surface-soft hover:text-forge-text"
            >
              <Pencil size={15} />
              Edit
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 rounded-forge-sm px-3 py-2 text-xs text-forge-muted transition hover:bg-forge-danger/10 hover:text-forge-danger disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={15} />

              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>

      <div className="py-8">
        {activeTab === "preview" && <PreviewTab animation={animation} />}

        {activeTab === "code" && <CodeTab animation={animation} />}

        {activeTab === "notes" && <NotesTab animation={animation} />}

        {activeTab === "performance" && (
          <TextPanel
            eyebrow="Performance"
            title="Performance notes"
            text={animation.notes?.performanceNotes}
          />
        )}

        {activeTab === "accessibility" && (
          <TextPanel
            eyebrow="Accessibility"
            title="Accessibility notes"
            text={animation.notes?.accessibilityNotes}
          />
        )}
      </div>
    </section>
  );
}

function PreviewTab({ animation }) {
  const [previewKey, setPreviewKey] = useState(0);

  const handleReplay = () => {
    setPreviewKey((current) => current + 1);
  };

  return (
    <div>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-muted">
            Live animation
          </span>

          <p className="mt-1 text-sm text-forge-text">
            {animation.name}
          </p>
        </div>

        <button
          type="button"
          onClick={handleReplay}
          className="rounded-forge-sm border border-forge-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-forge-muted transition hover:border-forge-accent hover:text-forge-text"
        >
          Replay
        </button>
      </div>

      <ResponsivePreviewFrame>
        <AnimationPreviewRenderer
          key={previewKey}
          animation={animation}
        />
      </ResponsivePreviewFrame>
    </div>
  );
}

function CodeTab({ animation }) {
  const hasCode =
    animation.code?.jsx || animation.code?.css || animation.code?.javascript;

  if (!hasCode) {
    return (
      <EmptySection
        title="No code saved yet."
        description="Implementation code will appear here once it has been added."
      />
    );
  }

  return (
    <div className="space-y-5">
      {animation.code?.jsx && (
        <CodeBlock title="React / JSX" code={animation.code.jsx} />
      )}

      {animation.code?.css && (
        <CodeBlock title="CSS" code={animation.code.css} />
      )}

      {animation.code?.javascript && (
        <CodeBlock title="JavaScript" code={animation.code.javascript} />
      )}
    </div>
  );
}

function CodeBlock({ title, code }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.error("Animation copy failed:", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-forge-lg border border-forge-border bg-forge-surface">
      <div className="flex items-center justify-between border-b border-forge-border px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-muted">
          {title}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 text-xs text-forge-muted transition hover:text-forge-text"
        >
          <Copy size={14} />
          Copy
        </button>
      </div>

      <pre className="overflow-x-auto p-5 font-mono text-sm leading-6 text-forge-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function NotesTab({ animation }) {
  const notes = [
    ["What it does", animation.notes?.whatItDoes],
    ["Why it works", animation.notes?.whyItWorks],
    ["When to use", animation.notes?.whenToUse],
  ];

  return (
    <div className="grid gap-px overflow-hidden rounded-forge-lg border border-forge-border bg-forge-border md:grid-cols-2">
      {notes.map(([title, value]) => (
        <article key={title} className="min-h-[180px] bg-forge-surface p-6">
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

function TextPanel({ eyebrow, title, text }) {
  return (
    <article className="rounded-forge-lg border border-forge-border bg-forge-surface p-6">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-accent">
        {eyebrow}
      </span>

      <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em]">
        {title}
      </h2>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-forge-muted">
        {text || "No notes added yet."}
      </p>
    </article>
  );
}

function EmptySection({ title, description }) {
  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-forge-lg border border-dashed border-forge-border bg-forge-surface/30 px-6 text-center">
      <div className="max-w-md">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.045em]">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-forge-muted">{description}</p>
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

        <p className="mt-3 text-sm text-forge-muted">{description}</p>
      </div>
    </div>
  );
}

export default AnimationDetailPage;
