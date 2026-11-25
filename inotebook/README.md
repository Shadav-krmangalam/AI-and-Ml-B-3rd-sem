# iNotebook frontend

    npm install
    npm run dev      # http://localhost:5173

Backend must run on http://localhost:5000 with CORS set like this:

    app.use(cors({ origin: "http://localhost:5173", credentials: true }));

## Places you may need to adjust to match your backend
- `App.jsx`, `Login.jsx`, `Signup.jsx`: `GET /api/auth/getuser` is assumed to return the user object (`name`, `email`, `date`).
- `Dashboard.jsx`, `AllNotes.jsx`: `GET /api/notes/getnotes` is assumed to return an array of notes (each with `_id`).
- `NoteModal.jsx`: note fields are `title, description, content, category, link, author`. Rename to match your schema.
- `NoteCard.jsx`: the date is read from `createdAt` or `date`.
- `App.jsx`: logout calls `POST /api/auth/logout`. Your backend needs it to clear the cookie.

Not included because the backend was not confirmed to support it: attachments, favorites, profile editing, settings.
