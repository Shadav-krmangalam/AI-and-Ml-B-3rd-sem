import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { X, ExternalLink } from "lucide-react";
import { formatDate } from "./NoteCard";

const API = "http://localhost:3000/api";

// One modal for 4 modes: "view", "add", "edit", "delete"
// ADJUST: the field names below (title, description, content, category, link, author)
// must match your Mongoose Note schema.
function NoteModal({ mode, note, onClose, onDone }) {
  const [form, setForm] = useState({
    title: note?.title || "",
    description: note?.description || "",
    notes: note?.notes || "",
    category: note?.category || "General",
    referenceLink: note?.referenceLink || "",
    authorName: note?.authorName || "",
  });
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave(e) {
    e.preventDefault();
    if (form.title.trim() === "") {
      toast.error("Please add a title");
      return;
    }

    setSaving(true);
    try {
      if (mode === "add") {
        await axios.post(`${API}/notes`, form, { withCredentials: true });
        toast.success("Note added");
      } else {
        await axios.put(`${API}/update-note/${note._id}`, form, { withCredentials: true });
        toast.success("Note updated");
      }
      onDone(); // parent reloads notes and closes the modal
    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message || "Could not save the note");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setSaving(true);
    try {
      await axios.delete(`${API}/delete-note/${note._id}`, { withCredentials: true });
      toast.success("Note deleted");
      onDone();
    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message || "Could not delete the note");
    } finally {
      setSaving(false);
    }
  }

  const titles = { view: "Note details", add: "New note", edit: "Edit note", delete: "Delete note" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-card p-6 shadow-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">{titles[mode]}</h2>
          <button onClick={onClose} className="text-muted hover:text-ink" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* ---------- VIEW ---------- */}
        {mode === "view" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
                {note.category && (
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-medium text-accent">{note.category}</span>
                )}
                <span>{formatDate(note)}</span>
                {note.author && <span>by {note.author}</span>}
              </div>
            </div>
            {note.description && <p className="text-sm text-muted">{note.description}</p>}
            {note.content && <p className="whitespace-pre-wrap text-sm leading-relaxed">{note.notes}</p>}
            {note.link && (
              <a href={note.referenceLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
                <ExternalLink size={15} /> Reference link
              </a>
            )}
          </div>
        )}

        {/* ---------- ADD / EDIT ---------- */}
        {(mode === "add" || mode === "edit") && (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="label">Title</label>
              <input name="title" value={form.title} onChange={handleChange} className="input" placeholder="Note title" />
            </div>
            <div>
              <label className="label">Description</label>
              <input name="description" value={form.description} onChange={handleChange} className="input" placeholder="A short summary" />
            </div>
            <div>
              <label className="label">Notes</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={5} className="input resize-none" placeholder="Write your note here..." />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Category</label>
                <input name="category" value={form.category} onChange={handleChange} list="category-list" className="input" />
                <datalist id="category-list">
                  <option value="General" />
                  <option value="Personal" />
                  <option value="Work" />
                  <option value="Study" />
                  <option value="Ideas" />
                </datalist>
              </div>
              <div>
                <label className="label">Author</label>
                <input name="authorName" value={form.authorName} onChange={handleChange} className="input" placeholder="Your name" />
              </div>
            </div>
            <div>
              <label className="label">Reference link</label>
              <input name="referenceLink" value={form.referenceLink} onChange={handleChange} className="input" placeholder="https://..." />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Saving..." : mode === "add" ? "Add note" : "Save changes"}
              </button>
            </div>
          </form>
        )}

        {/* ---------- DELETE CONFIRMATION ---------- */}
        {mode === "delete" && (
          <div>
            <p className="text-sm text-muted">
              Delete <span className="font-medium text-ink">"{note.title}"</span>? This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={onClose} className="btn-ghost">Cancel</button>
              <button onClick={handleDelete} disabled={saving} className="inline-flex items-center justify-center rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-60">
                {saving ? "Deleting..." : "Delete note"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteModal;
