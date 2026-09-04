import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Components",
    path: "/components",
  },
  {
    label: "Animations",
    path: "/animations",
  },
  {
    label: "References",
    path: "/references",
  },
  {
    label: "Notes",
    path: "/notes",
  },
  {
    label: "Projects",
    path: "/projects",
  },
  {
    label: "Favorites",
    path: "/favorites",
  },
];

function Sidebar() {
  return (
    <aside className="border-forge-border bg-forge-surface lg:sticky lg:top-0 lg:h-screen lg:w-[260px] lg:shrink-0 lg:border-r">
      <div className="flex h-full flex-col px-5 py-6">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forge-muted">
            Frontend Workspace
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
            FrontForge
          </h1>
        </div>

        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                [
                  "whitespace-nowrap rounded-forge-sm px-3 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "bg-forge-accent text-white"
                    : "text-forge-muted hover:bg-forge-surface-soft hover:text-forge-text",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto hidden border-t border-forge-border pt-5 lg:block">
          <p className="text-xs leading-5 text-forge-muted">
            Build. Analyze. Save. Reuse.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;