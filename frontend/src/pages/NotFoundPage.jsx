import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center text-center">
      <div className="max-w-md">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-forge-accent">
          Error / 404
        </span>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.055em]">
          Page not found.
        </h1>
        <p className="mt-4 text-sm leading-7 text-forge-muted">
          This FrontForge route does not exist or may have moved.
        </p>
        <Link to="/" className="mt-7 inline-flex items-center gap-2 rounded-forge-md bg-forge-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-forge-accent-strong">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
