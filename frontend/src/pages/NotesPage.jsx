import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NotesPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/components`).then((response) => response.ok ? response.json() : Promise.reject()),
      fetch(`${API_URL}/api/animations`).then((response) => response.ok ? response.json() : Promise.reject()),
    ]).then(([componentResult, animationResult]) => {
      const components = (componentResult.data ?? []).filter((item) => Object.values(item.notes ?? {}).some(Boolean)).map((item) => ({ ...item, type: "component" }));
      const animations = (animationResult.data ?? []).filter((item) => Object.values(item.notes ?? {}).some(Boolean)).map((item) => ({ ...item, type: "animation" }));
      setItems([...components, ...animations]);
    }).catch(() => setItems([])).finally(() => setIsLoading(false));
  }, [API_URL]);

  return (
    <section>
      <header className="border-b border-forge-border pb-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-forge-accent">Knowledge / Notes</span>
        <h1 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold tracking-[-0.055em]">Learning notes.</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-7 text-forge-muted">Patterns with saved implementation, design, performance or accessibility observations.</p>
      </header>
      <div className="grid gap-4 py-8 md:grid-cols-2 2xl:grid-cols-3">
        {isLoading ? <Message text="Loading notes..." /> : items.length === 0 ? <Message text="No learning notes have been saved yet." /> : items.map((item) => (
          <Link key={`${item.type}-${item._id}`} to={`/${item.type === "component" ? "components" : "animations"}/${item.slug}`} className="rounded-forge-lg border border-forge-border bg-forge-surface p-5 transition hover:border-forge-accent/40">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-forge-accent">{item.type}</span>
            <h2 className="mt-3 font-display text-xl font-semibold">{item.name}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-forge-muted">{item.notes?.whatItIs || item.notes?.whatItDoes || item.notes?.whyItWorks || "Open the entry to review its learning notes."}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Message({ text }) {
  return <p className="col-span-full rounded-forge-lg border border-dashed border-forge-border p-10 text-center text-sm text-forge-muted">{text}</p>;
}

export default NotesPage;
