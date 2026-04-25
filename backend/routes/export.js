/**
 * Export Routes
 * POST /api/export/pdf  — generate ATS resume HTML (print-to-PDF on client)
 * POST /api/export/zip  — generate portfolio ZIP
 */

const express = require("express");
const archiver = require("archiver");
const Portfolio = require("../models/Portfolio");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
router.use(authMiddleware);

// POST /api/export/pdf — returns ATS-optimized resume HTML for client-side printing
router.post("/pdf", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) return res.status(404).json({ message: "No portfolio found" });

    const { personal, experiences, education, skills, projects, achievements, links } = portfolio;

    const resumeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${personal?.name || "Resume"}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; color: #111; line-height: 1.5; padding: 40px 50px; max-width: 800px; margin: 0 auto; }
  h1 { font-size: 24pt; font-weight: 700; margin-bottom: 4px; }
  h2 { font-size: 12pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1.5px solid #111; padding-bottom: 3px; margin: 18px 0 8px; }
  h3 { font-size: 11pt; font-weight: 700; margin-bottom: 2px; }
  p { margin-bottom: 4px; }
  ul { padding-left: 18px; }
  li { margin-bottom: 2px; }
  .contact-row { font-size: 10pt; color: #333; margin-bottom: 2px; }
  .role-header { display: flex; justify-content: space-between; align-items: baseline; }
  .date-loc { font-size: 10pt; color: #555; white-space: nowrap; margin-left: 8px; }
  .skills-line { margin-bottom: 4px; }
  a { color: #111; text-decoration: none; }
  @media print { body { padding: 20px 30px; } }
</style>
</head>
<body>
<header>
  <h1>${personal?.name || ""}</h1>
  <p class="contact-row">${[personal?.title, personal?.email, personal?.phone, personal?.location, links?.linkedin].filter(Boolean).join(" | ")}</p>
</header>

${personal?.summary ? `<section id="summary"><h2>Professional Summary</h2><p>${personal.summary}</p></section>` : ""}

${experiences?.length ? `
<section id="experience">
  <h2>Work Experience</h2>
  ${experiences.map(exp => `
  <article style="margin-bottom:12px">
    <div class="role-header">
      <h3>${exp.role} — ${exp.company}</h3>
      <span class="date-loc">${exp.start || ""} – ${exp.current ? "Present" : exp.end || ""} | ${exp.location || ""}</span>
    </div>
    <ul>${(exp.description || "").split("\n").filter(l => l.trim()).map(l => `<li>${l.replace(/^[•\-*]\s*/, "")}</li>`).join("")}</ul>
  </article>`).join("")}
</section>` : ""}

${education?.length ? `
<section id="education">
  <h2>Education</h2>
  ${education.map(edu => `
  <article style="margin-bottom:8px">
    <div class="role-header">
      <h3>${edu.degree} in ${edu.field} — ${edu.institution}</h3>
      <span class="date-loc">${edu.start || ""} – ${edu.end || ""}${edu.gpa ? ` | GPA: ${edu.gpa}` : ""}</span>
    </div>
  </article>`).join("")}
</section>` : ""}

${Object.values(skills || {}).some(a => a?.length) ? `
<section id="skills">
  <h2>Skills</h2>
  ${skills?.technical?.length ? `<p class="skills-line"><strong>Technical:</strong> ${skills.technical.join(", ")}</p>` : ""}
  ${skills?.languages?.length ? `<p class="skills-line"><strong>Languages:</strong> ${skills.languages.join(", ")}</p>` : ""}
  ${skills?.tools?.length ? `<p class="skills-line"><strong>Tools & Platforms:</strong> ${skills.tools.join(", ")}</p>` : ""}
  ${skills?.soft?.length ? `<p class="skills-line"><strong>Soft Skills:</strong> ${skills.soft.join(", ")}</p>` : ""}
</section>` : ""}

${projects?.length ? `
<section id="projects">
  <h2>Projects</h2>
  ${projects.map(proj => `
  <article style="margin-bottom:10px">
    <h3>${proj.name}${proj.demo ? ` — <a href="${proj.demo}">${proj.demo}</a>` : ""}${proj.github ? ` | <a href="${proj.github}">GitHub</a>` : ""}</h3>
    <p>${proj.desc || ""}</p>
    ${proj.tech ? `<p><strong>Stack:</strong> ${proj.tech}</p>` : ""}
  </article>`).join("")}
</section>` : ""}

${achievements ? `<section id="achievements"><h2>Achievements & Certifications</h2>${achievements.split("\n").filter(l => l.trim()).map(l => `<p>${l.replace(/^[•\-*]\s*/, "")}</p>`).join("")}</section>` : ""}

</body>
</html>`;

    res.json({ html: resumeHTML });
  } catch (err) {
    res.status(500).json({ message: "Resume generation failed", error: err.message });
  }
});

// POST /api/export/zip — Portfolio source code ZIP
router.post("/zip", async (req, res) => {
  try {
    const { templateHtml, templateCss, templateJs, name } = req.body;

    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${(name || "portfolio").replace(/\s+/g, "_")}_portfolio.zip"`,
    });

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);

    archive.append(templateHtml || "<h1>Portfolio</h1>", { name: "index.html" });
    archive.append(templateCss || "", { name: "style.css" });
    archive.append(templateJs || "// Portfolio JS", { name: "script.js" });
    archive.append(JSON.stringify({ name, generated: new Date() }, null, 2), { name: "portfolio.json" });

    archive.append(`# Deploy Your Portfolio

## Netlify (Easiest — 30 seconds)
1. Go to netlify.com
2. Drag and drop this folder into the deploy area
3. Done! Live URL instantly.

## GitHub Pages
1. Create a new repo on github.com
2. Upload these files
3. Go to Settings → Pages → Deploy from main branch

## Vercel
1. Install Vercel CLI: npm i -g vercel
2. Run: vercel
3. Follow the prompts
`, { name: "DEPLOY.md" });

    await archive.finalize();
  } catch (err) {
    res.status(500).json({ message: "ZIP creation failed", error: err.message });
  }
});

module.exports = router;
