import { NavLink, useNavigate } from "react-router-dom";
import { LayoutGrid, CalendarDays, Users, Settings, LogOut } from "lucide-react";
import { logout } from "../lib/auth";

const navItems = [
  { to: "/dashboard", label: "Mes événements", icon: LayoutGrid },
  { to: "/dashboard/calendrier", label: "Calendrier", icon: CalendarDays },
  { to: "/dashboard/participants", label: "Participants", icon: Users },
  { to: "/dashboard/parametres", label: "Paramètres", icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col justify-between bg-backstage px-4 py-6 text-white">
      <div>
        <div className="mb-8 flex items-center gap-2 px-2">
          <span className="h-2.5 w-2.5 rounded-full bg-ticket" />
          <span className="font-display text-lg font-semibold">Scena</span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-spotlight text-white shadow-glow"
                    : "text-white/60 hover:bg-backstage-soft hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-backstage-soft hover:text-white"
      >
        <LogOut size={18} />
        Déconnexion
      </button>
    </aside>
  );
}
