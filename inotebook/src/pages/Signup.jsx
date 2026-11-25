import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { NotebookPen, Eye, EyeOff } from "lucide-react";

const API = "http://localhost:3000/user";

function Signup({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.name.trim().length < 3) return setError("Name must be at least 3 characters");
    if (!form.email.includes("@")) return setError("Enter a valid email address");
    if (form.password.length < 5) return setError("Password must be at least 5 characters");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match");

    setLoading(true);
    try {
     let user = await axios.post(
        `${API}/signup`,
        { name: form.name, email: form.email, password: form.password },
        { withCredentials: true }
      );
      setUser(user.data)
      navigate("/")
     
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Could not create the account");
      setLoading(false);
      return;
    }

    // Account created. If the backend also set the cookie, getuser works and we go to the dashboard.
    // If not, we send the user to Login.
    // try {
    //   const response = await axios.get(`${API}/auth/getuser`, { withCredentials: true });
    //   setUser(response.data); // ADJUST: use response.data.user if your backend wraps it
    //   toast.success("Account created");
    //   navigate("/");
    // } catch (err) {
    //   toast.success("Account created. Please log in.");
    //   navigate("/login");
    // } finally {
    //   setLoading(false);
    // }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-on-accent">
            <NotebookPen size={22} />
          </div>
          <h1 className="font-display text-3xl font-semibold">Start your notebook</h1>
          <p className="mt-1 text-sm text-muted">Create an account to save your notes.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-line bg-card p-6 shadow-sm">
          {error && <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-500">{error}</p>}

          <div>
            <label className="label">Full name</label>
            <input name="name" value={form.name} onChange={handleChange} className="input" placeholder="Your name" />
          </div>
          <div>
            <label className="label">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="input" placeholder="you@example.com" />
          </div>
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} className="input pr-10" placeholder="At least 5 characters" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" aria-label="Show or hide password">
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>
          <div>
            <label className="label">Confirm password</label>
            <input name="confirmPassword" type={showPassword ? "text" : "password"} value={form.confirmPassword} onChange={handleChange} className="input" placeholder="Type it again" />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-accent hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
