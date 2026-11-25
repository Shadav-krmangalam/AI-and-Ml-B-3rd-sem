import { NavLink } from "react-router-dom";
import { NotebookPen, LayoutDashboard, StickyNote, User, LogOut, X } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/notes", label: "All Notes", icon: StickyNote },
  { to: "/profile", label: "Profile", icon: User },
];

function Sidebar({ open, onClose, onLogout }) {
  return (
    <>
      {/* Dark overlay behind the sidebar on mobile */}
      {open && <div onClick={onClose} className="fixed inset-0 z-30 bg-black/40 lg:hidden" />}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-side p-5 transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-on-accent">
              <NotebookPen size={18} />
            </div>
            <span className="font-display text-xl font-semibold">iNotebook</span>
          </div>
          <button onClick={onClose} className="text-muted lg:hidden" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? "bg-accent/10 text-accent" : "text-muted hover:bg-page hover:text-ink"
                }`
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={onLogout}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-page hover:text-ink"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
