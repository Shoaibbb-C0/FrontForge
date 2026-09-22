import { Heart, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

const libraries = ["All", "CSS", "GSAP", "Framer Motion", "JavaScript"];

const triggers = [
  "All",
  "Load",
  "Hover",
  "Click",
  "Scroll",
  "Cursor",
  "Continuous",
];

const difficulties = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
];

function AnimationsPage() {
  const [animations, setAnimations] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(
    () => searchParams.get("search") || "",
  );

  const [activeLibrary, setActiveLibrary] = useState(
    () => searchParams.get("library") || "All",
  );

  const [activeTrigger, setActiveTrigger] = useState(
    () => searchParams.get("trigger") || "All",
  );

  const [activeDifficulty, setActiveDifficulty] = useState(
    () => searchParams.get("difficulty") || "All",
  );

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(
    () => searchParams.get("favorites") === "true",
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchAnimations = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/animations`);

        if (!response.ok) {
          throw new Error("Failed to load animations");
        }

        const result = await response.json();

        setAnimations(result.data ?? []);
      } catch (error) {
        console.error("Animation fetch error:", error);

        setError("FrontForge couldn't load the animation library.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimations();
  }, [API_URL]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (activeLibrary !== "All") {
      params.set("library", activeLibrary);
    }

    if (activeTrigger !== "All") {
      params.set("trigger", activeTrigger);
    }

    if (activeDifficulty !== "All") {
      params.set("difficulty", activeDifficulty);
    }

    if (showFavoritesOnly) {
      params.set("favorites", "true");
    }

    setSearchParams(params, {
      replace: true,
    });
  }, [
    search,
    activeLibrary,
    activeTrigger,
    activeDifficulty,
    showFavoritesOnly,
    setSearchParams,
  ]);

  const filteredAnimations = useMemo(() => {
    return animations.filter((animation) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        animation.name?.toLowerCase().includes(query) ||
        animation.description?.toLowerCase().includes(query) ||
        animation.tags?.some((tag) =>
          String(tag).toLowerCase().includes(query),
        );

      const normalizedLibrary =
        animation.library === "framer-motion"
          ? "Framer Motion"
          : animation.library === "css"
            ? "CSS"
            : animation.library === "gsap"
              ? "GSAP"
              : animation.library === "javascript"
                ? "JavaScript"
                : animation.library;

      const matchesLibrary =
        activeLibrary === "All" ||
        normalizedLibrary === activeLibrary;

      const matchesTrigger =
        activeTrigger === "All" ||
        animation.trigger?.toLowerCase() ===
        activeTrigger.toLowerCase();

      const matchesDifficulty =
        activeDifficulty === "All" ||
        animation.difficulty?.toLowerCase() ===
        activeDifficulty.toLowerCase();

      const matchesFavorite =
        !showFavoritesOnly || animation.isFavorite;

      return (
        matchesSearch &&
        matchesLibrary &&
        matchesTrigger &&
        matchesDifficulty &&
        matchesFavorite
      );
    });
  }, [
    animations,
    search,
    activeLibrary,
    activeTrigger,
    activeDifficulty,
    showFavoritesOnly,
  ]);

  const hasActiveFilters =
    search.trim() !== "" ||
    activeLibrary !== "All" ||
    activeTrigger !== "All" ||
    activeDifficulty !== "All" ||
    showFavoritesOnly;

  const clearFilters = () => {
    setSearch("");
    setActiveLibrary("All");
    setActiveTrigger("All");
    setActiveDifficulty("All");
    setShowFavoritesOnly(false);

    setSearchParams({}, { replace: true });
  };

  const handleFavoriteToggle = async (animation) => {
    try {
      const response = await fetch(
        `${API_URL}/api/animations/${animation.slug}/favorite`,
        { method: "PATCH" },
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite");
      }

      const result = await response.json();

      setAnimations((currentAnimations) =>
        currentAnimations.map((item) =>
          item._id === result.data._id ? result.data : item,
        ),
      );
    } catch (error) {
      console.error("Animation favorite update error:", error);
      setError("FrontForge couldn't update that favorite. Please try again.");
    }
  };

  return (
    <section>
      <header className="border-b border-forge-border pb-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-forge-accent">
          Motion / Library
        </span>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <h1 className="font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
              Animations.
            </h1>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-forge-muted">
              Study motion patterns, triggers, implementation techniques and
              the reasoning behind effective interface animation.
            </p>
          </div>

          <div className="lg:text-right">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-subtle">
              Library size
            </span>

            <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.05em]">
              {animations.length.toString().padStart(2, "0")}
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-5 border-b border-forge-border py-5">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-forge-subtle"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search animations..."
            className="w-full rounded-forge-md border border-forge-border bg-forge-surface py-2.5 pl-10 pr-4 text-sm text-forge-text outline-none transition placeholder:text-forge-subtle focus:border-forge-accent"
          />
        </div>

        <FilterRow
          label="Library"
          values={libraries}
          activeValue={activeLibrary}
          onChange={setActiveLibrary}
        />

        <FilterRow
          label="Trigger"
          values={triggers}
          activeValue={activeTrigger}
          onChange={setActiveTrigger}
        />

        <FilterRow
          label="Difficulty"
          values={difficulties}
          activeValue={activeDifficulty}
          onChange={setActiveDifficulty}
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setShowFavoritesOnly((current) => !current)
            }
            className={[
              "rounded-forge-sm border px-3 py-2 text-xs font-medium transition",
              showFavoritesOnly
                ? "border-forge-accent bg-forge-accent-soft text-forge-accent"
                : "border-forge-border bg-forge-surface text-forge-muted hover:text-forge-text",
            ].join(" ")}
          >
            Favorites only
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-b border-forge-border py-4">
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-forge-subtle">
          {filteredAnimations.length.toString().padStart(2, "0")}{" "}
          {filteredAnimations.length === 1 ? "result" : "results"}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-forge-muted transition hover:text-forge-accent"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="py-8">
        {isLoading ? (
          <LibraryMessage
            eyebrow="Loading"
            title="Opening motion library..."
            description="Fetching animation patterns."
          />
        ) : error ? (
          <LibraryMessage
            eyebrow="Error"
            title="Animation library unavailable."
            description={error}
          />
        ) : animations.length === 0 ? (
          <LibraryMessage
            eyebrow="Empty library"
            title="No animations yet."
            description="Your first motion patterns will appear here once they are added to FrontForge."
          />
        ) : filteredAnimations.length === 0 ? (
          <LibraryMessage
            eyebrow="No matches"
            title="Nothing found."
            description="Try another search term or filter combination."
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {filteredAnimations.map((animation) => (
              <AnimationCard
                key={animation._id}
                animation={animation}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FilterRow({
  label,
  values,
  activeValue,
  onChange,
}) {
  return (
    <div className="scrollbar-none flex items-center gap-2 overflow-x-auto pb-1">
      <div className="mr-2 flex shrink-0 items-center gap-2">
        <SlidersHorizontal
          size={14}
          className="text-forge-subtle"
        />

        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-subtle">
          {label}
        </span>
      </div>

      {values.map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={[
            "shrink-0 rounded-forge-sm border px-3 py-2 text-xs font-medium transition",
            activeValue === value
              ? "border-forge-accent bg-forge-accent-soft text-forge-accent"
              : "border-forge-border bg-forge-surface text-forge-muted hover:text-forge-text",
          ].join(" ")}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

function AnimationCard({ animation, onFavoriteToggle }) {
  const libraryLabel =
    animation.library === "framer-motion"
      ? "Framer Motion"
      : animation.library?.toUpperCase();

  return (
      <article className="group relative overflow-hidden rounded-forge-lg border border-forge-border bg-forge-surface transition hover:border-forge-accent/40">
        <button
          type="button"
          aria-label={animation.isFavorite ? `Remove ${animation.name} from favorites` : `Add ${animation.name} to favorites`}
          onClick={() => onFavoriteToggle?.(animation)}
          className={[
            "absolute right-4 top-4 z-10 rounded-forge-sm border border-forge-border bg-forge-surface p-2 transition",
            animation.isFavorite ? "text-forge-accent" : "text-forge-muted hover:text-forge-text",
          ].join(" ")}
        >
          <Heart size={17} fill={animation.isFavorite ? "currentColor" : "none"} />
        </button>

        <Link to={`/animations/${animation.slug}`} className="block">
        <div className="flex min-h-[220px] items-center justify-center border-b border-forge-border bg-forge-bg p-6">
          <div className="flex h-full min-h-[170px] w-full items-center justify-center rounded-forge-md border border-dashed border-forge-border bg-forge-surface-soft">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-subtle">
              Open live preview
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-forge-accent">
              {libraryLabel}
            </span>

            <span className="text-forge-subtle">/</span>

            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-forge-muted">
              {animation.trigger}
            </span>
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <h2 className="font-display text-xl font-semibold tracking-[-0.035em]">
              {animation.name}
            </h2>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-forge-muted">
            {animation.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {animation.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-forge-border px-2.5 py-1 font-mono text-[10px] text-forge-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        </Link>
      </article>
  );
}

function LibraryMessage({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="flex min-h-[360px] items-center justify-center rounded-forge-lg border border-dashed border-forge-border bg-forge-surface/30 px-6 text-center">
      <div className="max-w-md">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-forge-accent">
          {eyebrow}
        </span>

        <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.045em]">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-forge-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

export default AnimationsPage;
