import { Menu } from "lucide-react";

function MinimalProductNavbar() {
  return (
    <div className="min-h-[420px] bg-white text-[#111111]">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-6 lg:px-10">
        <a
          href="#"
          className="shrink-0 font-display text-lg font-semibold tracking-[-0.04em] sm:text-xl"
        >
          Linearis
        </a>

        <nav className="hidden items-center gap-6 text-sm text-black/60 lg:flex">
          <a href="#">Product</a>
          <a href="#">Solutions</a>
          <a href="#">Resources</a>
          <a href="#">Pricing</a>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button className="px-3 py-2 text-sm">
            Sign in
          </button>

          <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white">
            Get started
          </button>
        </div>

        <button
          className="flex items-center justify-center lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      </header>

      <div className="mx-auto flex min-h-[300px] max-w-4xl items-center justify-center px-5 text-center sm:px-6">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/40">
            Product navigation
          </span>

          <h2 className="mt-4 font-display text-[clamp(2.2rem,9vw,4rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
            Navigation without noise.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-black/55">
            A compact product navbar that keeps branding,
            navigation and one primary action obvious.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MinimalProductNavbar;