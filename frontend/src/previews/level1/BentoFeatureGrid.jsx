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
    <section className="bg-[#f5f6f8] px-5 py-10 text-[#111318] sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/40">
            Features / Bento
          </span>

          <h2 className="mt-4 font-display text-[clamp(2.3rem,9vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className={`min-h-[180px] rounded-2xl border border-black/10 bg-white p-5 sm:min-h-[220px] sm:p-6 ${feature.className}`}
            >
              <div className="flex h-full flex-col justify-between gap-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/35">
                  Feature
                </span>

                <div>
                  <h3 className="font-display text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
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