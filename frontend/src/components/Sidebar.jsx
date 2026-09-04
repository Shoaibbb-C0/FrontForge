import { NavLink } from "react-router-dom";

const navigation = [
  { label: "Dashboard", path: "/" },
  { label: "Components", path: "/components" },
  { label: "Animations", path: "/animations" },
  { label: "References", path: "/references" },
  { label: "Notes", path: "/notes" },
  { label: "Projects", path: "/projects" },
  { label: "Favorites", path: "/favorites" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <strong>FrontForge</strong>
      </div>

      <nav>
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;