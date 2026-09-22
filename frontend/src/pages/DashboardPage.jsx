import {
  ArrowUpRight,
  Boxes,
  Clapperboard,
  FileText,
  Library,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const statDefinitions = [
  {
    label: "Components",
    key: "components",
    icon: Boxes,
  },
  {
    label: "Animations",
    key: "animations",
    icon: Clapperboard,
  },
  {
    label: "References",
    key: "references",
    icon: Library,
  },
  {
    label: "Notes",
    key: "notes",
    icon: FileText,
  },
];

function DashboardPage() {
  const [counts, setCounts] = useState({ components: 0, animations: 0, references: 0, notes: 0 });

  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [componentResponse, animationResponse] = await Promise.all([
          fetch(`${API_URL}/api/components`),
          fetch(`${API_URL}/api/animations`),
        ]);
        if (!componentResponse.ok || !animationResponse.ok) return;

        const [componentResult, animationResult] = await Promise.all([
          componentResponse.json(),
          animationResponse.json(),
        ]);
        const components = componentResult.data ?? [];
        const animations = animationResult.data ?? [];

        setCounts({
          components: components.length,
          animations: animations.length,
          references: components.filter((item) => item.reference?.url).length,
          notes: components.filter((item) => Object.values(item.notes ?? {}).some(Boolean)).length + animations.filter((item) => Object.values(item.notes ?? {}).some(Boolean)).length,
        });
      } catch (error) {
        console.error("Dashboard count error:", error);
      }
    };

    fetchCounts();
  }, [API_URL]);

  const stats = statDefinitions.map((stat) => ({
    ...stat,
    value: counts[stat.key].toString().padStart(2, "0"),
  }));

  return (
    <section>
      <header className="border-b border-forge-border pb-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-forge-muted">
            Workspace / Dashboard
          </span>

          <Link to="/components/new" className="flex items-center gap-2 rounded-forge-md bg-forge-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-forge-accent-strong">
            <Plus size={16} />
            Add resource
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_400px] xl:items-end">
          <div>
            <h2 className="max-w-4xl font-display text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
              Your frontend
              <br />
              knowledge system.
            </h2>
          </div>

          <p className="max-w-md text-[15px] leading-7 text-forge-muted">
            Study interfaces, break down patterns, understand motion and turn
            everything you learn into reusable frontend knowledge.
          </p>
        </div>
      </header>

      <div className="grid border-b border-forge-border sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className={[
                "py-6 sm:px-6",
                index !== 0 ? "sm:border-l sm:border-forge-border" : "",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-forge-muted">
                  {stat.label}
                </span>

                <Icon
                  size={17}
                  strokeWidth={1.7}
                  className="text-forge-subtle"
                />
              </div>

              <strong className="mt-8 block font-display text-4xl font-semibold tracking-[-0.055em]">
                {stat.value}
              </strong>
            </article>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
        <article className="rounded-forge-lg border border-forge-border bg-forge-surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-forge-muted">
                Continue learning
              </span>

              <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.035em]">
                Learning queue
              </h3>
            </div>

            <Link to="/components" aria-label="Open component library" className="text-forge-muted transition hover:text-forge-text">
              <ArrowUpRight size={19} />
            </Link>
          </div>

          <div className="mt-12 rounded-forge-md border border-forge-border bg-forge-bg p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-forge-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-forge-accent">
                Level 01
              </span>

              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-forge-subtle">
                Layout
              </span>
            </div>

            <h4 className="mt-5 font-display text-2xl font-medium tracking-[-0.04em]">
              Responsive editorial layouts
            </h4>

            <p className="mt-2 max-w-xl text-sm leading-6 text-forge-muted">
              Study spacing, hierarchy, grid composition and responsive
              art-direction before moving deeper into motion.
            </p>
          </div>
        </article>

        <article className="rounded-forge-lg border border-forge-border bg-forge-surface p-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-forge-muted">
            Current track
          </span>

          <div className="mt-12">
            <span className="font-mono text-xs text-forge-accent">
              LEVEL / 01
            </span>

            <h3 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.05em]">
              Clean
              <br />
              websites.
            </h3>

            <p className="mt-4 text-sm leading-6 text-forge-muted">
              Typography, responsive layout, reusable sections and polished
              interface patterns.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default DashboardPage;
