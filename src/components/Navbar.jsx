import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Layers, LogOut, User, ChevronRight, Menu, X } from "lucide-react";

export default function Navbar({ onAuthClick }) {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const steps = [
    { label: "Build", path: "/builder" },
    { label: "Templates", path: "/templates" },
    { label: "Preview", path: "/preview" },
  ];

  const isBuilderFlow = steps.some((s) => location.pathname.startsWith(s.path));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 border-b border-bg-border/60 glass-card">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center group-hover:bg-accent-cyan/20 transition-all">
            <Layers size={15} className="text-accent-cyan" />
          </div>
          <span className="font-display text-xl font-semibold text-ink">
            Build<span className="text-accent-cyan">folio</span>
          </span>
        </Link>

        {/* Builder steps indicator */}
        {isBuilderFlow && (
          <div className="hidden md:flex items-center gap-2">
            {steps.map((step, i) => {
              const isActive = location.pathname.startsWith(step.path);
              const isPast = steps.findIndex((s) => location.pathname.startsWith(s.path)) > i;
              return (
                <div key={step.path} className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(step.path)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30"
                        : isPast
                        ? "text-ink-muted hover:text-ink"
                        : "text-ink-faint cursor-default"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                      isActive ? "bg-accent-cyan text-bg-base" : isPast ? "bg-bg-border text-ink-muted" : "bg-bg-border text-ink-faint"
                    }`}>
                      {i + 1}
                    </span>
                    {step.label}
                  </button>
                  {i < steps.length - 1 && <ChevronRight size={14} className="text-ink-faint" />}
                </div>
              );
            })}
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-elevated border border-bg-border">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-cyan to-accent-orange flex items-center justify-center">
                  <span className="text-xs font-bold text-bg-base">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <span className="text-sm text-ink-muted font-medium">{user?.name || "User"}</span>
              </div>
              <button onClick={handleLogout} className="btn-ghost text-ink-faint hover:text-red-400">
                <LogOut size={15} />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => onAuthClick?.("login")} className="btn-ghost">
                Sign in
              </button>
              <button onClick={() => onAuthClick?.("register")} className="btn-primary text-sm py-2 px-4">
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
