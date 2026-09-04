import {
  Boxes,
  Clapperboard,
  FileText,
  FolderKanban,
  Heart,
  LayoutDashboard,
  Library,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Components", path: "/components", icon: Boxes },
  { label: "Animations", path: "/animations", icon: Clapperboard },
  { label: "References", path: "/references", icon: Library },
  { label: "Notes", path: "/notes", icon: FileText },
  { label: "Projects", path: "/projects", icon: FolderKanban },
  { label: "Favorites", path: "/favorites", icon: Heart },
];

function Sidebar() {
  return (
    <aside className="border-forge-border bg-forge-surface lg:sticky lg:top-0 lg:h-screen lg:w-[250px] lg:shrink-0 lg:border-r">
      <div className="flex h-full flex-col px-4 py-5">
        <div className="mb-7 px-2">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-forge-md bg-forge-accent font-mono text-sm font-semibold text-white">
              FF
            </div>

            <div>
              <h1 className="font-display text-lg font-semibold tracking-[-0.035em]">
                FrontForge
              </h1>

              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-forge-muted">
                Workspace / v0.0
              </p>
            </div>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  [
                    "flex shrink-0 items-center gap-3 rounded-forge-sm px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-forge-surface-soft text-forge-text"
                      : "text-forge-muted hover:bg-forge-surface-soft hover:text-forge-text",
                  ].join(" ")
                }
              >
                <Icon size={17} strokeWidth={1.8} />

                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto hidden border-t border-forge-border pt-5 lg:block">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-forge-subtle">
            Build / Analyze / Reuse
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;