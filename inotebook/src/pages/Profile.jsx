import { Mail, CalendarDays, LogOut } from "lucide-react";

// "user" comes from GET /api/auth/getuser, which App.jsx already called on startup
function Profile({ user, onLogout }) {
  const joined = user.date || user.createdAt; // ADJUST to your user schema
  const joinedText = joined
    ? new Date(joined).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "Not available";

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 font-display text-3xl font-semibold">Profile</h1>

      <div className="rounded-2xl border border-line bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 font-display text-2xl font-semibold text-accent">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-muted">iNotebook member</p>
          </div>
        </div>

        <div className="space-y-4 border-t border-line pt-5 text-sm">
          <div className="flex items-center gap-3">
            <Mail size={17} className="text-muted" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <CalendarDays size={17} className="text-muted" />
            <span>Joined {joinedText}</span>
          </div>
        </div>

        <button onClick={onLogout} className="btn-ghost mt-6">
          <LogOut size={17} /> Log out
        </button>
      </div>
    </div>
  );
}

export default Profile;
