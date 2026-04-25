const fmt = (d) => {
  if (!d) return "";
  const [y, m] = d.split("-");
  return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+m-1]} ${y}`;
};

export default function Template4_Magazine({ data = {} }) {
  const { personal = {}, experiences = [], education = [], skills = {}, projects = [], links = {}, achievements = "" } = data;
  const acc = "#d97706"; // amber

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", background: "#fafaf8", color: "#111827", minHeight: "100vh" }}>
      {/* Top rule */}
      <div style={{ height: "4px", background: `linear-gradient(90deg, ${acc}, #fbbf24, ${acc})` }} />

      {/* Header */}
      <header style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 48px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #111827", paddingBottom: "24px" }}>
          <div>
            <div style={{ fontSize: "11px", fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: acc, marginBottom: "8px" }}>Buildfolio · {new Date().getFullYear()}</div>
            <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 700, letterSpacing: "-2px", lineHeight: 1, color: "#0f172a" }}>{personal.name || "Your Name"}</h1>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "15px", color: "#6b7280", marginTop: "8px", fontWeight: 500 }}>{personal.title || "Professional Title"}</p>
          </div>
          <div style={{ textAlign: "right", fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "#6b7280" }}>
            {personal.email && <div style={{ marginBottom: "4px" }}>{personal.email}</div>}
            {personal.phone && <div style={{ marginBottom: "4px" }}>{personal.phone}</div>}
            {personal.location && <div style={{ marginBottom: "4px" }}>{personal.location}</div>}
            {links.linkedin && <a href={links.linkedin} target="_blank" rel="noreferrer" style={{ color: acc, fontWeight: 600, textDecoration: "none" }}>LinkedIn ↗</a>}
          </div>
        </div>
      </header>

      {/* Summary — editorial lead paragraph */}
      {personal.summary && (
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 48px", borderBottom: "1px solid #e5e7eb" }}>
          <p style={{ fontSize: "clamp(16px,2vw,22px)", fontStyle: "italic", lineHeight: 1.6, color: "#374151", borderLeft: `4px solid ${acc}`, paddingLeft: "24px" }}>{personal.summary}</p>
        </div>
      )}

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 280px", gap: "48px" }}>
        {/* Main column */}
        <div>
          {/* Experience */}
          {experiences.length > 0 && (
            <section style={{ padding: "40px 0", borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                <h2 style={{ fontSize: "11px", fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: acc }}>Experience</h2>
                <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
              </div>
              {experiences.map((exp, i) => (
                <div key={i} style={{ marginBottom: "36px", paddingBottom: "36px", borderBottom: i < experiences.length-1 ? "1px solid #f3f4f6" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                    <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#0f172a" }}>{exp.role}</h3>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: acc, fontWeight: 600 }}>{fmt(exp.start)} – {exp.current ? "Present" : fmt(exp.end)}</span>
                  </div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "14px", color: acc, fontWeight: 600, marginBottom: "12px" }}>{exp.company} {exp.location ? `· ${exp.location}` : ""}</div>
                  <div style={{ fontSize: "15px", lineHeight: 1.75, color: "#4b5563" }}>
                    {(exp.description || "").split("\n").filter(Boolean).map((line, j) => (
                      <div key={j} style={{ marginBottom: "6px" }}>— {line.replace(/^[•\-*]\s*/, "")}</div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section style={{ padding: "40px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                <h2 style={{ fontSize: "11px", fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: acc }}>Projects</h2>
                <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
              </div>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: "28px", paddingBottom: "28px", borderBottom: i < projects.length-1 ? "1px solid #f3f4f6" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>{proj.name} {proj.featured ? "✦" : ""}</h3>
                    <div style={{ display: "flex", gap: "12px", fontFamily: "'Inter',sans-serif" }}>
                      {proj.demo && <a href={proj.demo} target="_blank" rel="noreferrer" style={{ color: acc, fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>Live ↗</a>}
                      {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" style={{ color: "#6b7280", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>Code ↗</a>}
                    </div>
                  </div>
                  {proj.tech && <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: acc, marginBottom: "8px", fontWeight: 600 }}>{proj.tech}</div>}
                  <div style={{ fontSize: "15px", lineHeight: 1.7, color: "#4b5563" }}>{proj.desc}</div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside style={{ borderLeft: "1px solid #e5e7eb", paddingLeft: "32px", paddingTop: "40px" }}>
          {/* Skills */}
          {Object.values(skills).some(a => a?.length) && (
            <div style={{ marginBottom: "36px" }}>
              <h2 style={{ fontSize: "11px", fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: acc, borderBottom: "1px solid #e5e7eb", paddingBottom: "10px", marginBottom: "20px" }}>Skills</h2>
              {[["Technical", skills.technical], ["Languages", skills.languages], ["Tools", skills.tools], ["Soft Skills", skills.soft]].map(([cat, arr]) =>
                arr?.length ? (
                  <div key={cat} style={{ marginBottom: "16px" }}>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{cat}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {arr.map((sk, i) => <span key={i} style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", background: "#f3f4f6", padding: "3px 10px", borderRadius: "4px", color: "#374151" }}>{sk}</span>)}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: "36px" }}>
              <h2 style={{ fontSize: "11px", fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: acc, borderBottom: "1px solid #e5e7eb", paddingBottom: "10px", marginBottom: "20px" }}>Education</h2>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>{edu.institution}</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "#6b7280", marginTop: "3px" }}>{edu.degree} in {edu.field}</div>
                  {edu.gpa && <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: acc, marginTop: "2px" }}>GPA: {edu.gpa}</div>}
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: "#9ca3af", marginTop: "3px" }}>{fmt(edu.start)} – {fmt(edu.end)}</div>
                </div>
              ))}
            </div>
          )}

          {/* Links */}
          {(links.github || links.linkedin || links.twitter) && (
            <div>
              <h2 style={{ fontSize: "11px", fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: acc, borderBottom: "1px solid #e5e7eb", paddingBottom: "10px", marginBottom: "20px" }}>Connect</h2>
              {[["GitHub", links.github], ["LinkedIn", links.linkedin], ["Twitter", links.twitter], ["Medium", links.medium], ["LeetCode", links.leetcode]].map(([name, url]) =>
                url ? <div key={name} style={{ marginBottom: "8px" }}><a href={url} target="_blank" rel="noreferrer" style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", color: acc, fontWeight: 600, textDecoration: "none" }}>{name} ↗</a></div> : null
              )}
            </div>
          )}
        </aside>
      </div>

      {/* Footer */}
      <div style={{ height: "4px", background: `linear-gradient(90deg, ${acc}, #fbbf24, ${acc})`, marginTop: "60px" }} />
      <footer style={{ background: "#0f172a", color: "#94a3b8", textAlign: "center", padding: "24px", fontFamily: "'Inter',sans-serif", fontSize: "13px" }}>
        {personal.name} · {personal.email} · Built with Buildfolio
      </footer>
    </div>
  );
}
