import { useEffect, useState } from "react";
import ComponentCard from "../components/ComponentCard";

function FavoritesPage() {
  const [components, setComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/components`
        );

        if (!response.ok) {
          throw new Error("Failed to load favorites");
        }

        const result = await response.json();

        const favorites = (result.data ?? []).filter(
          (component) => component.isFavorite
        );

        setComponents(favorites);
      } catch (error) {
        console.error("Favorites fetch error:", error);
        setError("FrontForge couldn't load your favorites.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [API_URL]);

  const handleFavoriteToggle = async (component) => {
    try {
      const response = await fetch(
        `${API_URL}/api/components/${component.slug}/favorite`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite");
      }

      const result = await response.json();

      if (!result.data.isFavorite) {
        setComponents((currentComponents) =>
          currentComponents.filter(
            (item) => item._id !== result.data._id
          )
        );
      }
    } catch (error) {
      console.error("Favorite update error:", error);
    }
  };

  if (isLoading) {
    return (
      <LibraryMessage
        eyebrow="Loading"
        title="Opening favorites..."
        description="Fetching your saved frontend patterns."
      />
    );
  }

  if (error) {
    return (
      <LibraryMessage
        eyebrow="Error"
        title="Favorites unavailable."
        description={error}
      />
    );
  }

  return (
    <section>
      <header className="border-b border-forge-border pb-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-forge-accent">
          Library / Saved
        </span>

        <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
              Favorites.
            </h1>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-forge-muted">
              Frontend patterns worth revisiting, studying and
              reusing in future builds.
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-subtle">
              Saved items
            </span>

            <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.05em]">
              {components.length.toString().padStart(2, "0")}
            </p>
          </div>
        </div>
      </header>

      <div className="py-8">
        {components.length === 0 ? (
          <LibraryMessage
            eyebrow="Empty"
            title="No favorites yet."
            description="Save useful patterns from the component library and they will appear here."
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {components.map((component) => (
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

export default FavoritesPage;