import { Menu, Sun, Moon } from "lucide-react";

function Navbar({ user, theme, onMenu, onToggleTheme }) {
  const firstLetter = user?.name ? user.name[0].toUpperCase() : "U";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-page/80 px-4 backdrop-blur sm:px-8">
      <button onClick={onMenu} className="text-muted lg:hidden" aria-label="Open menu">
        <Menu size={22} />
      </button>
      <div className="hidden lg:block" />

      <div className="flex items-center gap-3">
        <button
          onClick={onToggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-card text-muted transition hover:text-ink"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
          {firstLetter}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
