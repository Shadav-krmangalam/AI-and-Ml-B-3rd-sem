import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";

import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AllNotes from "./pages/AllNotes.jsx";
import Profile from "./pages/Profile.jsx";

const API = "http://localhost:3000/api";

function App() {
  const [user, setUser] = useState(null); // null = not logged in
  const [checking, setChecking] = useState(true); // true while we ask the backend who is logged in
  const [menuOpen, setMenuOpen] = useState(false); // mobile sidebar
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply the theme (only the theme is stored in localStorage, never the login)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // When the app starts, ask the backend if the cookie is valid
  useEffect(() => {
    async function checkUser() {
      try {
        const response = await axios.get(`${API}/notes`, { withCredentials: true });
        setUser(response.data); // ADJUST: if your backend returns { user: {...} } use response.data.user
      } catch (error) {
        setUser(null);
      } finally {
        setChecking(false);
      }
    }
    checkUser();
  }, []);

  async function handleLogout() {
    try {
      // NOTE: your backend needs this endpoint to clear the cookie (see README notes)
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      setMenuOpen(false);
      toast.success("Logged out");
    } catch (error) {
      toast.error("Logout failed. Does POST /api/auth/logout exist on your backend?");
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">
        Loading your notebook...
      </div>
    );
  }

  // Wraps a page with the sidebar + navbar. Logged-out users are sent to Login.
  function privatePage(page) {
    if (!user) return <Navigate to="/login" replace />;
    return (
      <div className="min-h-screen">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />
        <div className="lg:pl-64">
          <Navbar
            user={user}
            theme={theme}
            onMenu={() => setMenuOpen(true)}
            onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">{page}</main>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster richColors position="top-right" theme={theme} />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login setUser={setUser} />} />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup setUser={setUser} />} />
        <Route path="/" element={privatePage(<Dashboard user={user} />)} />
        <Route path="/notes" element={privatePage(<AllNotes />)} />
        <Route path="/profile" element={privatePage(<Profile user={user} onLogout={handleLogout} />)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
