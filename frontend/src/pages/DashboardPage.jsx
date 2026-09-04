const stats = [
  {
    label: "Components",
    value: "00",
  },
  {
    label: "Animations",
    value: "00",
  },
  {
    label: "References",
    value: "00",
  },
  {
    label: "Notes",
    value: "00",
  },
];

function DashboardPage() {
  return (
    <section>
      <header className="mb-14 border-b border-forge-border pb-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-forge-accent">
          Dashboard / 01
        </p>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <h2 className="max-w-4xl text-[clamp(2.8rem,7vw,6.75rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
            Build better
            <br />
            frontend.
          </h2>

          <p className="max-w-sm text-base leading-7 text-forge-muted">
            Study interfaces, save patterns, understand motion, and turn what
            you learn into reusable frontend knowledge.
          </p>
        </div>
      </header>

      <div className="grid gap-px overflow-hidden rounded-forge-lg border border-forge-border bg-forge-border sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="bg-forge-surface p-6 sm:p-7"
          >
            <span className="text-sm text-forge-muted">
              {stat.label}
            </span>

            <strong className="mt-8 block text-5xl font-semibold tracking-[-0.06em]">
              {stat.value}
            </strong>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <article className="min-h-[300px] rounded-forge-lg border border-forge-border bg-forge-surface p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forge-muted">
            Continue learning
          </p>

          <div className="mt-20">
            <p className="text-2xl font-semibold tracking-[-0.04em]">
              Your learning queue will appear here.
            </p>

            <p className="mt-3 max-w-lg leading-7 text-forge-muted">
              As FrontForge grows, this area will surface components,
              animation concepts, references, and projects worth revisiting.
            </p>
          </div>
        </article>

        <article className="min-h-[300px] rounded-forge-lg border border-forge-border bg-forge-accent p-7 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
            Current track
          </p>

          <div className="mt-20">
            <span className="font-mono text-sm text-white/70">
              LEVEL / 01
            </span>

            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">
              Clean websites
            </h3>

            <p className="mt-3 leading-7 text-white/75">
              Typography, layout, responsive systems, reusable sections and
              polished interface patterns.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default DashboardPage;