/**
 * Buildfolio — Local Development Server
 *
 * Run: node server.js  (or: npm run dev with nodemon)
 * Requires: .env with MONGO_URI, JWT_SECRET
 *
 * For Vercel deployment, see: /api/index.js
 */

const mongoose = require("mongoose");
const dotenv   = require("dotenv");

dotenv.config();

const app  = require("./app");
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🔍 Health check: http://localhost:${PORT}/health`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
