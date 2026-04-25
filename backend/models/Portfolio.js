const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  company: String, role: String, start: String, end: String,
  current: { type: Boolean, default: false }, description: String, location: String,
});

const EducationSchema = new mongoose.Schema({
  institution: String, degree: String, field: String,
  start: String, end: String, gpa: String,
});

const ProjectSchema = new mongoose.Schema({
  name: String, desc: String, tech: String,
  demo: String, github: String, featured: { type: Boolean, default: false },
});

const PortfolioSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    personal: {
      name: String, title: String, summary: String, email: String,
      phone: String, location: String, website: String, avatar: String,
    },
    experiences: [ExperienceSchema],
    education: [EducationSchema],
    skills: {
      technical: [String], languages: [String], tools: [String], soft: [String],
    },
    projects: [ProjectSchema],
    links: {
      github: String, linkedin: String, twitter: String,
      dribbble: String, medium: String, leetcode: String,
    },
    achievements: String,
    selectedTemplate: { type: String, default: "minimal" },
    aiPrompt: String,
    aiGeneratedTemplate: String, // stores AI-generated HTML/CSS
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", PortfolioSchema);
