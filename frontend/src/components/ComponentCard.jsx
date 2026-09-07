import { ArrowUpRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

function ComponentCard({ component, onFavoriteToggle }) {
  return (
    <article className="group overflow-hidden rounded-forge-lg border border-forge-border bg-forge-surface transition hover:border-forge-subtle">
      <div className="flex aspect-[16/10] items-center justify-center border-b border-forge-border bg-forge-bg p-6">
        <div className="flex h-full w-full items-center justify-center rounded-forge-md border border-forge-border bg-forge-surface-soft">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-subtle">
            Preview / {component.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-forge-accent">
                Level {component.level}
              </span>

              <span className="text-forge-subtle">·</span>

              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-forge-muted">
                {component.category}
              </span>
            </div>

            <h2 className="font-display text-xl font-semibold tracking-[-0.035em]">
              {component.name}
            </h2>
          </div>

          <button
            type="button"
            aria-label={
              component.isFavorite
                ? `Remove ${component.name} from favorites`
                : `Add ${component.name} to favorites`
            }
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onFavoriteToggle?.(component);
            }}
            className={[
              "transition-colors duration-200",
              component.isFavorite
                ? "text-forge-accent"
                : "text-forge-subtle hover:text-forge-text",
            ].join(" ")}
          >
            <Heart
              size={17}
              fill={component.isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-forge-muted">
          {component.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {component.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-forge-border px-2.5 py-1 font-mono text-[10px] text-forge-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          to={`/components/${component.slug}`}
          className="mt-6 flex items-center justify-between border-t border-forge-border pt-4 text-sm font-medium text-forge-muted transition group-hover:text-forge-text"
        >
          View component

          <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export default ComponentCard;