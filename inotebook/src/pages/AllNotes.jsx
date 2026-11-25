import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Plus, Search, NotebookPen } from "lucide-react";
import NoteCard, { getNoteDate } from "../components/NoteCard.jsx";
import NoteModal from "../components/NoteModal.jsx";

const API = "http://localhost:3000/api";

function AllNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [modal, setModal] = useState(null); // null or { mode, note }

  async function getNotes() {
    try {
      const response = await axios.get(`${API}/notes/getnotes`, { withCredentials: true });
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

  // Category buttons come from the notes the user already has
  const categories = ["All", ...new Set(notes.map((note) => note.category).filter(Boolean))];

  // Search + category filter, then newest first
  const text = search.toLowerCase();
  const visibleNotes = notes
    .filter((note) => {
      const matchesSearch =
        (note.title || "").toLowerCase().includes(text) ||
        (note.description || "").toLowerCase().includes(text) ||
        (note.content || "").toLowerCase().includes(text);
      const matchesCategory = category === "All" || note.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(getNoteDate(b)) - new Date(getNoteDate(a)));

  function handleDone() {
    setModal(null);
    getNotes();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold">All notes</h1>
        <button onClick={() => setModal({ mode: "add" })} className="btn-primary">
          <Plus size={18} /> Add note
        </button>
      </div>

      <div className="relative mb-4">
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-10" placeholder="Search by title, description or content" />
      </div>

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((name) => (
          <button
            key={name}
            onClick={() => setCategory(name)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
              category === name ? "border-accent bg-accent/10 font-medium text-accent" : "border-line bg-card text-muted hover:text-ink"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-muted">Loading notes...</p>
      ) : visibleNotes.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-line px-6 py-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <NotebookPen size={26} />
          </div>
          <h3 className="font-display text-xl font-semibold">{notes.length === 0 ? "No notes yet" : "Nothing found"}</h3>
          <p className="mt-1 max-w-xs text-sm text-muted">
            {notes.length === 0 ? "Add a note and it will show up here." : "Try another search or category."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleNotes.map((note) => (
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

export default AllNotes;
