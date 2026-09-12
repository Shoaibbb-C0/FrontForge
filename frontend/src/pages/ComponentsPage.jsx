import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import ComponentCard from "../components/ComponentCard";

const categories = [
  "All",
  "Navbar",
  "Hero",
  "Features",
  "Bento",
  "Portfolio",
  "Pricing",
  "Testimonials",
  "CTA",
  "Footer",
];

function ComponentsPage() {
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [components, setComponents] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/components`);

        if (!response.ok) {
          throw new Error("Failed to load components");
        }

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

  const handleFavoriteToggle = async (component) => {
    try {
      const response = await fetch(
        `${API_URL}/api/components/${component.slug}/favorite`,
        {
          method: "PATCH",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite");
      }

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

  const filteredComponents = useMemo(() => {
    return components.filter((component) => {
      const matchesCategory =
        activeCategory === "All" ||
        component.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesDifficulty =
        activeDifficulty === "All" ||
        component.difficulty?.toLowerCase() === activeDifficulty.toLowerCase();

      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        component.name.toLowerCase().includes(query) ||
        component.description.toLowerCase().includes(query) ||
        component.tags?.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch && matchesDifficulty;
    });
  }, [components, search, activeCategory, activeDifficulty]);

  return (
    <section>
      <header className="border-b border-forge-border pb-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-forge-accent">
          Library / Level 01
        </span>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
          <div>
            <h1 className="font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
              Components.
            </h1>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-forge-muted">
              A growing library of reusable interface patterns, implementation
              notes and frontend references.
            </p>
          </div>

          <div className="flex lg:justify-end">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-subtle">
                Library size
              </span>

              <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.05em]">
                {components.length.toString().padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-forge-border py-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-forge-subtle"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search components..."
              className="w-full rounded-forge-md border border-forge-border bg-forge-surface py-2.5 pl-10 pr-4 text-sm text-forge-text outline-none transition placeholder:text-forge-subtle focus:border-forge-accent"
            />
          </div>

          <div className="scrollbar-none flex items-center gap-2 overflow-x-auto">
            <SlidersHorizontal
              size={15}
              className="mr-1 shrink-0 text-forge-subtle"
            />

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={[
                  "shrink-0 rounded-forge-sm border px-3 py-2 text-xs font-medium transition",
                  activeCategory === category
                    ? "border-forge-accent bg-forge-accent-soft text-forge-accent"
                    : "border-forge-border bg-forge-surface text-forge-muted hover:text-forge-text",
                ].join(" ")}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.14em] text-forge-subtle">
            Difficulty
          </span>

          {["All", "Beginner", "Intermediate", "Advanced"].map(
            (difficulty) => (
              <button
                key={difficulty}
                type="button"
                onClick={() => setActiveDifficulty(difficulty)}
                className={[
                  "rounded-forge-sm border px-3 py-2 text-xs font-medium transition",
                  activeDifficulty === difficulty
                    ? "border-forge-accent bg-forge-accent-soft text-forge-accent"
                    : "border-forge-border bg-forge-surface text-forge-muted hover:text-forge-text",
                ].join(" ")}
              >
                {difficulty}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="py-8">
        {isLoading ? (
          <LibraryMessage
            eyebrow="Loading"
            title="Opening the forge..."
            description="Fetching your component library."
          />
        ) : error ? (
          <LibraryMessage
            eyebrow="Error"
            title="Library unavailable."
            description={error}
          />
        ) : components.length === 0 ? (
          <LibraryMessage
            eyebrow="Empty library"
            title="No components yet."
            description="Your first reusable frontend patterns will appear here once they are added to FrontForge."
          />
        ) : filteredComponents.length === 0 ? (
          <LibraryMessage
            eyebrow="No matches"
            title="Nothing found."
            description="Try another search term or select a different category."
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {filteredComponents.map((component) => (
              <ComponentCard
                key={component._id}
                component={component}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function LibraryMessage({ eyebrow, title, description }) {
  return (
    <div className="flex min-h-[360px] items-center justify-center rounded-forge-lg border border-dashed border-forge-border bg-forge-surface/30 px-6 text-center">
      <div className="max-w-md">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-forge-accent">
          {eyebrow}
        </span>

        <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.045em]">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-forge-muted">{description}</p>
      </div>
    </div>
  );
}

export default ComponentsPage;
