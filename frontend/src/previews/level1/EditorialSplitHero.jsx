function EditorialSplitHero() {
  return (
    <section className="bg-[#f2efe8] p-5 text-[#161616] sm:p-8 lg:p-14">
      <div className="mx-auto flex min-h-[520px] max-w-6xl flex-col justify-between">
        <div className="flex flex-col gap-3 border-b border-black/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium">
            Northline Studio
          </span>

          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/50">
            Architecture / 2026
          </span>
        </div>

        <div className="grid gap-10 py-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:py-14">
          <h1 className="font-display text-[clamp(2.7rem,10vw,7.8rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
            Spaces
            <br />
            shaped by
            <br />
            intention.
          </h1>

          <div className="max-w-sm lg:justify-self-end">
            <p className="text-sm leading-6 text-black/60 sm:text-base sm:leading-7">
              We design contemporary spaces through restraint,
              material honesty and thoughtful proportion.
            </p>

            <button className="mt-6 border-b border-black pb-1 text-sm font-medium">
              Explore selected work →
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-black/15 pt-4 text-xs text-black/50 sm:flex-row sm:justify-between">
          <span>London / Mumbai</span>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}

export default EditorialSplitHero;