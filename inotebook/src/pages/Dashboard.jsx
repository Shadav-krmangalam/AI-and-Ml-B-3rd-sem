import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Plus, Search, StickyNote, Tags, NotebookPen } from "lucide-react";
import NoteCard, { getNoteDate } from "../components/NoteCard.jsx";
import NoteModal from "../components/NoteModal.jsx";

const API = "http://localhost:3000/api";

function Dashboard({ user }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // null or { mode: "view" | "add" | "edit" | "delete", note }

  async function getNotes() {
    try {
      const response = await axios.get(`${API}/notes`, { withCredentials: true });
      // ADJUST: this expects an array. If your backend sends { notes: [...] } it is handled too.
      setNotes(Array.isArray(response.data) ? response.data : response.data.notes || []);
    } catch (error) {
      toast.error("Could not load your notes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  // Newest first
  const newestFirst = [...notes].sort((a, b) => new Date(getNoteDate(b)) - new Date(getNoteDate(a)));

  // Searching shows all matches, otherwise only the 6 most recent notes
  const text = search.toLowerCase();
  const shownNotes = search
    ? newestFirst.filter(
        (note) =>
          (note.title || "").toLowerCase().includes(text) ||
          (note.description || "").toLowerCase().includes(text) ||
          (note.content || "").toLowerCase().includes(text)
      )
    : newestFirst.slice(0, 6);

  const categoryCount = new Set(notes.map((note) => note.category).filter(Boolean)).size;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const firstName = user?.name ? user.name.split(" ")[0] : "there";

  function handleDone() {
    setModal(null);
    getNotes();
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">{greeting}, {firstName}</h1>
          <p className="mt-1 text-muted">Here is what is in your notebook today.</p>
        </div>
        <button onClick={() => setModal({ mode: "add" })} className="btn-primary">
          <Plus size={18} /> Add note
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:max-w-md">
        <div className="rounded-2xl border border-line bg-card p-4">
          <StickyNote size={18} className="mb-3 text-accent" />
          <p className="text-2xl font-semibold">{notes.length}</p>
          <p className="text-sm text-muted">Total notes</p>
        </div>
        <div className="rounded-2xl border border-line bg-card p-4">
          <Tags size={18} className="mb-3 text-accent" />
          <p className="text-2xl font-semibold">{categoryCount}</p>
          <p className="text-sm text-muted">Categories</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-10" placeholder="Search your notes" />
      </div>

      <h2 className="mb-4 text-lg font-semibold">{search ? "Search results" : "Recent notes"}</h2>

      {loading ? (
        <p className="text-muted">Loading notes...</p>
      ) : shownNotes.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-line px-6 py-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <NotebookPen size={26} />
          </div>
          <h3 className="font-display text-xl font-semibold">{search ? "No notes match your search" : "Your notebook is empty"}</h3>
          <p className="mt-1 max-w-xs text-sm text-muted">
            {search ? "Try a different word." : "Write your first note to get started."}
          </p>
          {!search && (
            <button onClick={() => setModal({ mode: "add" })} className="btn-primary mt-5">
              <Plus size={18} /> Add your first note
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shownNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onView={() => setModal({ mode: "view", note })}
              onEdit={() => setModal({ mode: "edit", note })}
              onDelete={() => setModal({ mode: "delete", note })}
            />
          ))}
        </div>
      )}

      {modal && <NoteModal mode={modal.mode} note={modal.note} onClose={() => setModal(null)} onDone={handleDone} />}
    </div>
  );
}

export default Dashboard;
