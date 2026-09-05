function EditorialSplitHero() {
  return (
    <section className="min-h-[560px] bg-[#f2efe8] p-6 text-[#161616] sm:p-10 lg:p-14">
      <div className="mx-auto flex min-h-[480px] max-w-6xl flex-col justify-between">
        <div className="flex items-center justify-between border-b border-black/15 pb-4">
          <span className="text-sm font-medium">
            Northline Studio
          </span>

          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/50">
            Architecture / 2026
          </span>
        </div>

        <div className="grid gap-10 py-14 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <h1 className="font-display text-[clamp(3.4rem,8vw,7.8rem)] font-semibold leading-[0.84] tracking-[-0.07em]">
            Spaces
            <br />
            shaped by
            <br />
            intention.
          </h1>

          <div className="max-w-sm lg:justify-self-end">
            <p className="text-base leading-7 text-black/60">
              We design contemporary spaces through restraint,
              material honesty and thoughtful proportion.
            </p>

            <button className="mt-7 border-b border-black pb-1 text-sm font-medium">
              Explore selected work →
            </button>
          </div>
        </div>

        <div className="flex justify-between border-t border-black/15 pt-4 text-xs text-black/50">
          <span>London / Mumbai</span>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}

export default EditorialSplitHero;