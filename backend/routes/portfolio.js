/**
 * Portfolio Routes
 * GET    /api/portfolio       — get current user's portfolio
 * POST   /api/portfolio       — create or update portfolio (upsert)
 * DELETE /api/portfolio       — delete portfolio
 */

const express = require("express");
const Portfolio = require("../models/Portfolio");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// All portfolio routes are protected
router.use(authMiddleware);

// GET /api/portfolio — fetch the logged-in user's portfolio
router.get("/", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id });
    if (!portfolio) {
      return res.json(null); // No portfolio yet — that's OK
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch portfolio", error: err.message });
  }
});

// POST /api/portfolio — create or update portfolio (upsert)
router.post("/", async (req, res) => {
  try {
    const {
      personal, experiences, education,
      skills, projects, links, achievements,
      selectedTemplate, aiPrompt, aiGeneratedTemplate,
    } = req.body;

    const portfolio = await Portfolio.findOneAndUpdate(
      { user: req.user._id },
      {
        user: req.user._id,
        personal, experiences, education,
        skills, projects, links, achievements,
        selectedTemplate, aiPrompt, aiGeneratedTemplate,
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ message: "Portfolio saved", portfolio });
  } catch (err) {
    res.status(500).json({ message: "Failed to save portfolio", error: err.message });
  }
});

// DELETE /api/portfolio — clear portfolio data
router.delete("/", async (req, res) => {
  try {
    await Portfolio.findOneAndDelete({ user: req.user._id });
    res.json({ message: "Portfolio deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete portfolio", error: err.message });
  }
});

module.exports = router;
