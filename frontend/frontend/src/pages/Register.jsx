import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { Lock, User, UserPlus, Mail, ArrowLeft } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  // Using 'uname' to match your previous HTML name attribute
  const [form, setForm] = useState({ uname: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Sends data to your Django backend as JSON
      await api.post("/register/", form);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      setError("Registration failed. Username might already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
            <UserPlus size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
        </div>

        {error && <div className="mb-4 text-red-500 text-sm text-center font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              required
              type="text"
              placeholder="Username (e.g., midhun)"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 outline-none transition-all"
              onChange={(e) => setForm({ ...form, uname: e.target.value })}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              required
              type="email"
              placeholder="Email (e.g., midhun@gmail.com)"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 outline-none transition-all"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              required
              type="password"
              placeholder="Strong password"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 outline-none transition-all"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/" className="text-slate-500 hover:text-indigo-600 text-sm font-semibold flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}