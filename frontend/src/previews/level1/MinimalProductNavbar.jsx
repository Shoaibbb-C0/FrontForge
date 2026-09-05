import { Menu } from "lucide-react";

function MinimalProductNavbar() {
  return (
    <div className="min-h-[420px] bg-white text-[#111111]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
        <a
          href="#"
          className="font-display text-xl font-semibold tracking-[-0.04em]"
        >
          Linearis
        </a>

        <nav className="hidden items-center gap-8 text-sm text-black/60 md:flex">
          <a href="#">Product</a>
          <a href="#">Solutions</a>
          <a href="#">Resources</a>
          <a href="#">Pricing</a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button className="px-3 py-2 text-sm">
            Sign in
          </button>

          <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white">
            Get started
          </button>
        </div>

        <button
          className="md:hidden"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      </header>

      <div className="mx-auto flex min-h-[310px] max-w-4xl items-center justify-center px-6 text-center">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/40">
            Product navigation
          </span>

          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
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