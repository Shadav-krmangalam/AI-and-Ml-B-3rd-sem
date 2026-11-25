import { Eye, Pencil, Trash2 } from "lucide-react";

// Your backend may call the date field "date" or "createdAt". We try both.
export function getNoteDate(note) {
  return note.createdAt || note.date;
}

export function formatDate(note) {
  const date = getNoteDate(note);
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function NoteCard({ note, onView, onEdit, onDelete }) {
  const preview = note.description || note.content || "";

  return (
    <div className="flex flex-col rounded-2xl border border-line bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="line-clamp-1 text-base font-semibold">{note.title}</h3>
        {note.category && (
          <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            {note.category}
          </span>
        )}
      </div>

      <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{preview}</p>

      <div className="flex items-center justify-between border-t border-line pt-3">
        <span className="text-xs text-muted">{formatDate(note)}</span>
        <div className="flex gap-1">
          <button onClick={onView} title="View" className="rounded-lg p-2 text-muted transition hover:bg-page hover:text-ink">
            <Eye size={16} />
          </button>
          <button onClick={onEdit} title="Edit" className="rounded-lg p-2 text-muted transition hover:bg-page hover:text-ink">
            <Pencil size={16} />
          </button>
          <button onClick={onDelete} title="Delete" className="rounded-lg p-2 text-muted transition hover:bg-red-500/10 hover:text-red-500">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
