import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ReferencesPage() {
  const [components, setComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    fetch(`${API_URL}/api/components`)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((result) => setComponents((result.data ?? []).filter((item) => item.reference?.url)))
      .catch(() => setComponents([]))
      .finally(() => setIsLoading(false));
  }, [API_URL]);

  return (
    <section>
      <header className="border-b border-forge-border pb-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-forge-accent">Knowledge / Sources</span>
        <h1 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold tracking-[-0.055em]">References.</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-7 text-forge-muted">The websites and sources attached to studied component patterns.</p>
      </header>
      <div className="grid gap-4 py-8 md:grid-cols-2">
        {isLoading ? <Message text="Loading references..." /> : components.length === 0 ? <Message text="No component references have been saved yet." /> : components.map((component) => (
          <article key={component._id} className="rounded-forge-lg border border-forge-border bg-forge-surface p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-forge-accent">{component.category}</span>
            <h2 className="mt-3 font-display text-xl font-semibold">{component.reference.websiteName || component.name}</h2>
            <Link to={`/components/${component.slug}`} className="mt-4 block text-sm text-forge-muted hover:text-forge-text">Connected to {component.name}</Link>
            <a href={component.reference.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-forge-accent">Visit source <ExternalLink size={14} /></a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Message({ text }) {
  return <p className="col-span-full rounded-forge-lg border border-dashed border-forge-border p-10 text-center text-sm text-forge-muted">{text}</p>;
}

export default ReferencesPage;
