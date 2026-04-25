const fmt = (d) => {
  if (!d) return "";
  const [y, m] = d.split("-");
  return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+m-1]} ${y}`;
};

export default function Template1_Minimal({ data = {} }) {
  const { personal = {}, experiences = [], education = [], skills = {}, projects = [], links = {}, achievements = "" } = data;
  const allSkills = [...(skills.technical||[]), ...(skills.languages||[]), ...(skills.tools||[]), ...(skills.soft||[])];

  const s = {
    root: { fontFamily: "'Inter','Segoe UI',sans-serif", background: "#07080f", color: "#e2e8f0", minHeight: "100vh" },
    nav: { position: "sticky", top: 0, background: "rgba(7,8,15,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px", zIndex: 100 },
    navLogo: { fontSize: "18px", fontWeight: 700, color: "#22d3ee", letterSpacing: "-0.5px" },
    navLinks: { display: "flex", gap: "28px" },
    navLink: { color: "#94a3b8", fontSize: "14px", fontWeight: 500, textDecoration: "none", cursor: "pointer" },
    hero: { maxWidth: "900px", margin: "0 auto", padding: "100px 40px 80px" },
    badge: { display: "inline-block", background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.25)", color: "#22d3ee", padding: "4px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "24px" },
    h1: { fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 700, letterSpacing: "-2px", lineHeight: 1.05, marginBottom: "20px", color: "#f1f5f9" },
    cyan: { color: "#22d3ee" },
    summary: { fontSize: "17px", color: "#94a3b8", lineHeight: 1.8, maxWidth: "620px", marginBottom: "36px" },
    btnRow: { display: "flex", gap: "12px", marginBottom: "48px", flexWrap: "wrap" },
    btnPrimary: { background: "#22d3ee", color: "#07080f", padding: "12px 28px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", border: "none", cursor: "pointer" },
    btnSecondary: { background: "transparent", color: "#e2e8f0", padding: "12px 28px", borderRadius: "10px", fontWeight: 600, fontSize: "14px", border: "1px solid rgba(255,255,255,0.12)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" },
    metaRow: { display: "flex", gap: "24px", flexWrap: "wrap" },
    metaItem: { display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "14px" },
    section: { maxWidth: "900px", margin: "0 auto", padding: "60px 40px" },
    sectionBorder: { maxWidth: "900px", margin: "0 auto", padding: "60px 40px", borderTop: "1px solid rgba(255,255,255,0.06)" },
    sLabel: { fontSize: "11px", fontWeight: 700, color: "#22d3ee", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" },
    sTitle: { fontSize: "32px", fontWeight: 700, color: "#f1f5f9", letterSpacing: "-1px", marginBottom: "40px" },
    skillsGrid: { display: "flex", flexWrap: "wrap", gap: "8px" },
    skillTag: { background: "rgba(30,33,48,0.8)", border: "1px solid rgba(255,255,255,0.08)", padding: "6px 14px", borderRadius: "8px", fontSize: "13px", color: "#94a3b8", fontWeight: 500 },
    timeline: { display: "flex", flexDirection: "column", gap: "32px" },
    timelineItem: { display: "grid", gridTemplateColumns: "1fr 3fr", gap: "24px" },
    timeMeta: { textAlign: "right" },
    timeDate: { color: "#22d3ee", fontSize: "13px", fontWeight: 600 },
    timeLoc: { color: "#475569", fontSize: "12px", marginTop: "4px" },
    expRole: { fontSize: "16px", fontWeight: 700, color: "#f1f5f9", marginBottom: "2px" },
    expCo: { fontSize: "14px", color: "#94a3b8", marginBottom: "10px" },
    expDesc: { fontSize: "14px", color: "#64748b", lineHeight: 1.7 },
    projectsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" },
    card: { background: "rgba(14,16,24,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px", transition: "border-color 0.2s" },
    cardTitle: { fontSize: "16px", fontWeight: 700, color: "#f1f5f9", marginBottom: "8px" },
    cardDesc: { fontSize: "13px", color: "#64748b", lineHeight: 1.65, marginBottom: "16px" },
    cardTech: { fontSize: "12px", color: "#22d3ee", background: "rgba(34,211,238,0.08)", padding: "4px 10px", borderRadius: "6px", display: "inline-block", marginBottom: "12px" },
    cardLinks: { display: "flex", gap: "12px" },
    cardLink: { fontSize: "12px", color: "#94a3b8", textDecoration: "none", fontWeight: 500 },
    eduCard: { background: "rgba(14,16,24,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px", marginBottom: "16px" },
    eduInst: { fontSize: "16px", fontWeight: 700, color: "#f1f5f9", marginBottom: "4px" },
    eduDeg: { fontSize: "14px", color: "#94a3b8" },
    eduDate: { fontSize: "13px", color: "#22d3ee", marginTop: "8px" },
    footer: { borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" },
    footerLeft: { color: "#475569", fontSize: "14px" },
    footerLinks: { display: "flex", gap: "20px" },
    footerLink: { color: "#64748b", fontSize: "14px", textDecoration: "none", fontWeight: 500 },
  };

  return (
    <div style={s.root}>
      {/* Nav */}
      <nav style={s.nav}>
        <div style={s.navLogo}>{personal.name || "Portfolio"}</div>
        <div style={s.navLinks}>
          {["About", "Experience", "Projects", "Education", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={s.navLink}>{l}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <div style={s.hero} id="about">
        <div style={s.badge}>✦ Available for opportunities</div>
        <h1 style={s.h1}>
          {personal.name ? <><span>{personal.name.split(" ")[0]}</span>{" "}<span style={s.cyan}>{personal.name.split(" ").slice(1).join(" ")}</span></> : "Your Name"}
        </h1>
        <p style={{ ...s.summary, fontWeight: 600, fontSize: "20px", color: "#cbd5e1", marginBottom: "16px" }}>
          {personal.title || "Full Stack Developer"}
        </p>
        <p style={s.summary}>{personal.summary || "Add your professional summary in the builder."}</p>
        <div style={s.btnRow}>
          {links.github && <a href={links.github} target="_blank" rel="noreferrer" style={s.btnPrimary}>GitHub ↗</a>}
          {links.linkedin && <a href={links.linkedin} target="_blank" rel="noreferrer" style={s.btnSecondary}>LinkedIn ↗</a>}
          {personal.email && <a href={`mailto:${personal.email}`} style={s.btnSecondary}>{personal.email}</a>}
        </div>
        <div style={s.metaRow}>
          {personal.location && <span style={s.metaItem}>📍 {personal.location}</span>}
          {personal.phone && <span style={s.metaItem}>📞 {personal.phone}</span>}
          {personal.website && <a href={personal.website} target="_blank" rel="noreferrer" style={{ ...s.metaItem, color: "#22d3ee", textDecoration: "none" }}>🌐 {personal.website}</a>}
        </div>
      </div>

      {/* Skills */}
      {allSkills.length > 0 && (
        <div style={s.sectionBorder}>
          <div style={s.sLabel}>What I work with</div>
          <div style={s.sTitle}>Skills & Technologies</div>
          {[["Technical", skills.technical], ["Languages", skills.languages], ["Tools", skills.tools], ["Soft Skills", skills.soft]].map(([cat, arr]) =>
            arr?.length ? (
              <div key={cat} style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "12px", color: "#475569", fontWeight: 600, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{cat}</div>
                <div style={s.skillsGrid}>{arr.map(sk => <span key={sk} style={s.skillTag}>{sk}</span>)}</div>
              </div>
            ) : null
          )}
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={s.sectionBorder} id="experience">
          <div style={s.sLabel}>Where I've worked</div>
          <div style={s.sTitle}>Experience</div>
          <div style={s.timeline}>
            {experiences.map((exp, i) => (
              <div key={i} style={s.timelineItem}>
                <div style={s.timeMeta}>
                  <div style={s.timeDate}>{fmt(exp.start)} — {exp.current ? "Present" : fmt(exp.end)}</div>
                  {exp.location && <div style={s.timeLoc}>{exp.location}</div>}
                </div>
                <div>
                  <div style={s.expRole}>{exp.role}</div>
                  <div style={s.expCo}>{exp.company}</div>
                  <div style={s.expDesc}>
                    {(exp.description || "").split("\n").filter(Boolean).map((line, j) => (
                      <div key={j} style={{ marginBottom: "4px" }}>• {line.replace(/^[•\-*]\s*/, "")}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={s.sectionBorder} id="projects">
          <div style={s.sLabel}>Things I've built</div>
          <div style={s.sTitle}>Projects</div>
          <div style={s.projectsGrid}>
            {projects.map((proj, i) => (
              <div key={i} style={s.card}>
                <div style={s.cardTitle}>{proj.name}</div>
                {proj.tech && <div style={s.cardTech}>{proj.tech}</div>}
                <div style={s.cardDesc}>{proj.desc}</div>
                <div style={s.cardLinks}>
                  {proj.demo && <a href={proj.demo} target="_blank" rel="noreferrer" style={s.cardLink}>Live Demo ↗</a>}
                  {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" style={s.cardLink}>GitHub ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={s.sectionBorder} id="education">
          <div style={s.sLabel}>Academic background</div>
          <div style={s.sTitle}>Education</div>
          {education.map((edu, i) => (
            <div key={i} style={s.eduCard}>
              <div style={s.eduInst}>{edu.institution}</div>
              <div style={s.eduDeg}>{edu.degree} {edu.field ? `in ${edu.field}` : ""} {edu.gpa ? `· GPA: ${edu.gpa}` : ""}</div>
              <div style={s.eduDate}>{fmt(edu.start)} — {fmt(edu.end)}</div>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {achievements && (
        <div style={s.sectionBorder}>
          <div style={s.sLabel}>Recognition</div>
          <div style={s.sTitle}>Achievements</div>
          {achievements.split("\n").filter(Boolean).map((a, i) => (
            <div key={i} style={{ color: "#94a3b8", fontSize: "15px", marginBottom: "10px" }}>✦ {a.replace(/^[•\-*]\s*/, "")}</div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer style={s.footer} id="contact">
        <div style={s.footerLeft}>© {new Date().getFullYear()} {personal.name} · Built with Buildfolio</div>
        <div style={s.footerLinks}>
          {links.github && <a href={links.github} target="_blank" rel="noreferrer" style={s.footerLink}>GitHub</a>}
          {links.linkedin && <a href={links.linkedin} target="_blank" rel="noreferrer" style={s.footerLink}>LinkedIn</a>}
          {links.twitter && <a href={links.twitter} target="_blank" rel="noreferrer" style={s.footerLink}>Twitter</a>}
          {personal.email && <a href={`mailto:${personal.email}`} style={s.footerLink}>Email</a>}
        </div>
      </footer>
    </div>
  );
}
