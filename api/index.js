/**
 * Buildfolio — Vercel Serverless Entry Point
 *
 * Vercel maps all  /api/*  and  /health  requests here via vercel.json.
 * MongoDB connection is cached across warm invocations to avoid
 * opening a new connection on every function call.
 */

const mongoose = require("mongoose");
const dotenv   = require("dotenv");

dotenv.config({ path: require("path").resolve(__dirname, "../backend/.env") });

// ── Cached connection (persists across warm Lambda invocations) ───────────────
let cachedConnection = null;

async function connectDB() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }
  mongoose.set("bufferCommands", false);
  cachedConnection = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  return cachedConnection;
}

// ── Import the shared Express app ─────────────────────────────────────────────
const app = require("../backend/app");

// ── Vercel serverless handler ─────────────────────────────────────────────────
module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
