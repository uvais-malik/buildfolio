import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePortfolio } from "../context/PortfolioContext";
import { X, Eye, EyeOff, Mail, Lock, User, ArrowRight, GitBranch, Globe } from "lucide-react";
import api from "../utils/api";

export default function AuthModal({ mode = "login", onClose, onSwitch }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { loadFromServer } = usePortfolio();
  const navigate = useNavigate();
  const isLogin = mode === "login";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const { data } = await api.post(endpoint, payload);
      login(data.user, data.token);
      // Load existing portfolio data from server after login
      await loadFromServer();
      onClose();
      navigate("/builder");
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-bg-base/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md glass-card rounded-2xl p-8 animate-on-load"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-bg-elevated hover:bg-bg-border flex items-center justify-center text-ink-muted hover:text-ink transition-all"
        >
          <X size={16} />
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="tag tag-cyan">{isLogin ? "Welcome back" : "Create account"}</span>
          </div>
          <h2 className="font-display text-3xl font-semibold text-ink mb-2">
            {isLogin ? "Sign in to continue" : "Start building today"}
          </h2>
          <p className="text-ink-muted text-sm">
            {isLogin ? "Access your portfolio projects and resume builder." : "Join thousands of professionals showcasing their work."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="field-input pl-10" required />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="field-input pl-10" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                name="password" type={showPass ? "text" : "password"} value={form.password}
                onChange={handleChange} placeholder="••••••••" className="field-input pl-10 pr-10" required minLength={6}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink-muted transition-colors">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" />
                </svg>
                Please wait...
              </span>
            ) : (
              <>{isLogin ? "Sign in" : "Create account"} <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-ink-muted mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={onSwitch} className="text-accent-cyan hover:underline font-medium">
            {isLogin ? "Sign up free" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
