/**
 * Buildfolio — Express App (shared between local dev & Vercel serverless)
 *
 * This file ONLY sets up the Express app.
 * MongoDB connection is handled separately by each entry point:
 *   - backend/server.js  → for local development
 *   - api/index.js       → for Vercel serverless (with connection caching)
 */

const express = require("express");
const cors = require("cors");

const app = express();

// ── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://buildfolio-one.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  /^https:\/\/.*\.vercel\.app$/,
  /^http:\/\/localhost:\d+$/,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow server-to-server / curl
      const allowed = allowedOrigins.some((o) =>
        o instanceof RegExp ? o.test(origin) : o === origin
      );
      callback(null, allowed ? origin : false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Explicit OPTIONS pre-flight handler
app.options("*", cors());

// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/auth",      require("./routes/auth"));
app.use("/api/portfolio", require("./routes/portfolio"));
app.use("/api/export",    require("./routes/export"));

if (process.env.GEMINI_API_KEY) {
  app.use("/api/gemini", require("./routes/gemini"));
}

// ── Health check ──────────────────────────────────────────────────────────────
const mongoose = require("mongoose");
app.get("/health", (_req, res) =>
  res.json({
    status: "ok",
    time: new Date(),
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  })
);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ message: "Route not found" }));

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

module.exports = app;
