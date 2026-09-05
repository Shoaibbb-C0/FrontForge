function BentoFeatureGrid() {
  const features = [
    {
      title: "Fast by default",
      description:
        "Optimized workflows with minimal configuration.",
      className: "md:col-span-2",
    },
    {
      title: "Composable",
      description:
        "Build around flexible reusable primitives.",
      className: "",
    },
    {
      title: "Responsive",
      description:
        "Layouts designed intentionally across screen sizes.",
      className: "",
    },
    {
      title: "Designed to scale",
      description:
        "A system that grows without becoming visually noisy.",
      className: "md:col-span-2",
    },
  ];

  return (
    <section className="bg-[#f5f6f8] px-6 py-14 text-[#111318] sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/40">
            Features / Bento
          </span>

          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className={`min-h-[220px] rounded-2xl border border-black/10 bg-white p-6 ${feature.className}`}
            >
              <div className="flex h-full flex-col justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/35">
                  Feature
                </span>

                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.04em]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-black/50">
                    {feature.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BentoFeatureGrid;