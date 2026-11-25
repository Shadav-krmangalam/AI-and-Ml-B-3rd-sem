import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { NotebookPen, Eye, EyeOff } from "lucide-react";

const API = "http://localhost:3000/user";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) return setError("Enter a valid email address");
    if (password === "") return setError("Enter your password");

    setLoading(true);
    try {
      let response = await axios.post(`${API}/login`, { email, password }, { withCredentials: true });

      // The cookie is set now, so load the user
      // const response = await axios.get(`${API}/auth/getuser`, { withCredentials: true });
      setUser(response.data); // ADJUST: use response.data.user if your backend wraps it
      toast.success("Welcome back");
      navigate("/",{replace:true});
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Login failed. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-on-accent">
            <NotebookPen size={22} />
          </div>
          <h1 className="font-display text-3xl font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted">Log in to open your notebook.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-line bg-card p-6 shadow-sm">
          {error && <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-500">{error}</p>}

          <div>
            <label className="label">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="you@example.com" />
          </div>

          <div>
            <label className="label">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="input pr-10" placeholder="Your password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" aria-label="Show or hide password">
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted">
          New to iNotebook?{" "}
          <Link to="/signup" className="font-medium text-accent hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
