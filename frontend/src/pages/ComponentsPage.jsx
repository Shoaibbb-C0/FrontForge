import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import ComponentCard from "../components/ComponentCard";

const categories = [
  { label: "Navbar", slug: "navbar" },
  { label: "Hero", slug: "hero" },
  { label: "Features", slug: "features" },
  { label: "Bento", slug: "bento" },
  { label: "Portfolio", slug: "portfolio" },
  { label: "Pricing", slug: "pricing" },
  { label: "Testimonials", slug: "testimonials" },
  { label: "CTA", slug: "cta" },
  { label: "Footer", slug: "footer" },
];

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

function ComponentsPage() {
  const { category: categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const routeCategory = categories.find(
    (category) => category.slug === categorySlug?.toLowerCase(),
  );
  const isCategoryPage = Boolean(categorySlug);

  const [components, setComponents] = useState([]);
  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState(
    () => searchParams.get("category") || "All",
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
    const fetchComponents = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(`${API_URL}/api/components`);
        if (!response.ok) throw new Error("Failed to load components");
        const result = await response.json();
        setComponents(result.data ?? []);
      } catch (error) {
        console.error("Component fetch error:", error);
        setError("FrontForge couldn't load the component library.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComponents();
  }, [API_URL]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (!isCategoryPage && activeCategory !== "All") {
      params.set("category", activeCategory);
    }
    if (activeDifficulty !== "All") params.set("difficulty", activeDifficulty);
    if (showFavoritesOnly) params.set("favorites", "true");
    setSearchParams(params, { replace: true });
  }, [
    search,
    activeCategory,
    activeDifficulty,
    showFavoritesOnly,
    isCategoryPage,
    setSearchParams,
  ]);

  useEffect(() => {
    const handleHistoryChange = () => {
      const params = new URLSearchParams(window.location.search);
      setSearch(params.get("search") || "");
      setActiveCategory(params.get("category") || "All");
      setActiveDifficulty(params.get("difficulty") || "All");
      setShowFavoritesOnly(params.get("favorites") === "true");
    };

    window.addEventListener("popstate", handleHistoryChange);
    return () => window.removeEventListener("popstate", handleHistoryChange);
  }, [routeCategory?.label]);

  const handleFavoriteToggle = async (component) => {
    try {
      const response = await fetch(
        `${API_URL}/api/components/${component.slug}/favorite`,
        { method: "PATCH" },
      );
      if (!response.ok) throw new Error("Failed to update favorite");
      const result = await response.json();
      setComponents((currentComponents) =>
        currentComponents.map((item) =>
          item._id === result.data._id ? result.data : item,
        ),
      );
    } catch (error) {
      console.error("Favorite update error:", error);
    }
  };

  const selectedCategory = routeCategory?.label || activeCategory;

  const categorySize = routeCategory
    ? components.filter(
        (component) =>
          component.category?.toLowerCase() === routeCategory.label.toLowerCase(),
      ).length
    : components.length;

  const filteredComponents = components.filter((component) => {
      const matchesCategory =
        selectedCategory === "All" ||
        component.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesDifficulty =
        activeDifficulty === "All" ||
        component.difficulty?.toLowerCase() === activeDifficulty.toLowerCase();
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        component.name?.toLowerCase().includes(query) ||
        component.description?.toLowerCase().includes(query) ||
        component.tags?.some((tag) => String(tag).toLowerCase().includes(query));
      const matchesFavorite = !showFavoritesOnly || component.isFavorite;

      return matchesCategory && matchesSearch && matchesDifficulty && matchesFavorite;
  });

  const hasActiveFilters =
    search.trim() ||
    (!isCategoryPage && activeCategory !== "All") ||
    activeDifficulty !== "All" ||
    showFavoritesOnly;

  const clearFilters = () => {
    setSearch("");
    setActiveCategory(routeCategory?.label || "All");
    setActiveDifficulty("All");
    setShowFavoritesOnly(false);
  };

  return (
    <section>
      <header className="border-b border-forge-border pb-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-forge-accent">
          {routeCategory ? "Components / Category" : "Library / Level 01"}
        </span>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
          <div>
            <h1 className="font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
              {routeCategory ? `${routeCategory.label}.` : "Components."}
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-forge-muted">
              {routeCategory
                ? `Study and reuse ${routeCategory.label.toLowerCase()} patterns, implementation notes and frontend references.`
                : "A growing library of reusable interface patterns, implementation notes and frontend references."}
            </p>
            {routeCategory && (
              <Link
                to="/components"
                className="mt-5 inline-flex font-mono text-[10px] uppercase tracking-[0.14em] text-forge-muted transition hover:text-forge-accent"
              >
                ← All component types
              </Link>
            )}
          </div>

          <div className="flex lg:justify-end">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-subtle">
                {routeCategory ? "Category size" : "Library size"}
              </span>
              <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.05em]">
                {categorySize.toString().padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-6 border-b border-forge-border py-7 sm:py-8">
        <div>
          <label
            htmlFor="component-search"
            className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-forge-subtle"
          >
            Search library
          </label>
          <div className="relative w-full max-w-xl">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-forge-subtle" />
            <input
              id="component-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={routeCategory ? `Search ${routeCategory.label.toLowerCase()} components...` : "Search components..."}
              className="w-full rounded-forge-md border border-forge-border bg-forge-surface py-3 pl-11 pr-4 text-sm text-forge-text outline-none transition placeholder:text-forge-subtle focus:border-forge-accent"
            />
          </div>
        </div>

        <FilterGroup label="Component type">
          <Link
            to="/components"
            aria-current={!routeCategory && activeCategory === "All" ? "page" : undefined}
            className={filterButtonClass(!routeCategory && activeCategory === "All")}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/components/category/${category.slug}`}
              aria-current={selectedCategory === category.label ? "page" : undefined}
              className={filterButtonClass(selectedCategory === category.label)}
            >
              {category.label}
            </Link>
          ))}
        </FilterGroup>

        <FilterGroup label="Difficulty">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              type="button"
              onClick={() => setActiveDifficulty(difficulty)}
              className={filterButtonClass(activeDifficulty === difficulty)}
            >
              {difficulty}
            </button>
          ))}
        </FilterGroup>

        <FilterGroup label="Saved">
          <button
            type="button"
            onClick={() => setShowFavoritesOnly((current) => !current)}
            className={filterButtonClass(showFavoritesOnly)}
          >
            Favorites only
          </button>
        </FilterGroup>
      </div>

      <div className="flex items-center justify-between gap-4 border-b border-forge-border py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-subtle">
          {filteredComponents.length.toString().padStart(2, "0")} {filteredComponents.length === 1 ? "result" : "results"}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-forge-muted transition hover:text-forge-accent"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="py-8">
        {isLoading ? (
          <LibraryMessage eyebrow="Loading" title="Opening the forge..." description="Fetching your component library." />
        ) : error ? (
          <LibraryMessage eyebrow="Error" title="Library unavailable." description={error} />
        ) : isCategoryPage && !routeCategory ? (
          <LibraryMessage eyebrow="Unknown category" title="Component type not found." description="Choose a component type from the library to continue browsing." />
        ) : components.length === 0 ? (
          <LibraryMessage eyebrow="Empty library" title="No components yet." description="Your first reusable frontend patterns will appear here once they are added to FrontForge." />
        ) : filteredComponents.length === 0 ? (
          <LibraryMessage eyebrow="No matches" title="Nothing found." description="Try another search term or select a different filter." />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {filteredComponents.map((component) => (
              <ComponentCard key={component._id} component={component} onFavoriteToggle={handleFavoriteToggle} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FilterGroup({ label, children }) {
  return (
    <div className="grid gap-3 sm:grid-cols-[120px_minmax(0,1fr)] sm:items-start sm:gap-5">
      <div className="flex min-h-9 items-center gap-2">
        <SlidersHorizontal size={14} className="shrink-0 text-forge-subtle" />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-subtle">{label}</span>
      </div>
      <div className="scrollbar-none flex gap-2.5 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">{children}</div>
    </div>
  );
}

function filterButtonClass(isActive) {
  return [
    "shrink-0 rounded-forge-sm border px-3 py-2 text-xs font-medium transition",
    isActive
      ? "border-forge-accent bg-forge-accent-soft text-forge-accent"
      : "border-forge-border bg-forge-surface text-forge-muted hover:text-forge-text",
  ].join(" ");
}

function LibraryMessage({ eyebrow, title, description }) {
  return (
    <div className="flex min-h-[360px] items-center justify-center rounded-forge-lg border border-dashed border-forge-border bg-forge-surface/30 px-6 text-center">
      <div className="max-w-md">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-forge-accent">{eyebrow}</span>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.045em]">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-forge-muted">{description}</p>
      </div>
    </div>
  );
}

export default ComponentsPage;
