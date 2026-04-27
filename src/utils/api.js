// Buildfolio — API utility
// DEV  → http://localhost:5000  (local Express server)
// PROD → /api  (same-domain Vercel serverless function, set via .env.production)
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000" : "/api"),
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("pb_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global error handler
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Token expired — clear auth
      localStorage.removeItem("pb_token");
      localStorage.removeItem("pb_user");
    }
    return Promise.reject(err);
  }
);

export default api;
