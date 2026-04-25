const fmt = (d) => {
  if (!d) return "";
  const [y, m] = d.split("-");
  return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+m-1]} ${y}`;
};

export default function Template2_Creative({ data = {} }) {
  const { personal = {}, experiences = [], education = [], skills = {}, projects = [], links = {}, achievements = "" } = data;
  const acc = "#f472b6";
  const bg = "#0f0318";

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: bg, color: "#f0e6ff", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Decorative blobs */}
      <div style={{ position: "fixed", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle, ${acc}15 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-100px", left: "-100px", width: "350px", height: "350px", borderRadius: "50%", background: `radial-gradient(circle, #7c3aed20 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(15,3,24,0.7)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${acc}20` }}>
        <span style={{ fontSize: "20px", fontWeight: 800, background: `linear-gradient(135deg, ${acc}, #fbbf24)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{personal.name?.split(" ")[0] || "Portfolio"}</span>
        <div style={{ display: "flex", gap: "32px" }}>
          {["Work", "Projects", "Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "#c4b5d8", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>{l}</a>)}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "100px 48px 80px", maxWidth: "960px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "12px", color: acc, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>✦ CREATIVE PROFESSIONAL</div>
        <h1 style={{ fontSize: "clamp(48px,7vw,88px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-3px", marginBottom: "24px" }}>
          <span style={{ color: "#f0e6ff" }}>{personal.name || "Your Name"}</span>
          <br />
          <span style={{ background: `linear-gradient(135deg, ${acc} 0%, #fbbf24 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {personal.title || "Creative Developer"}
          </span>
        </h1>
        <p style={{ fontSize: "17px", color: "#9d8ab0", lineHeight: 1.8, maxWidth: "560px", marginBottom: "40px" }}>{personal.summary || "Your professional summary goes here."}</p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {personal.email && <a href={`mailto:${personal.email}`} style={{ background: `linear-gradient(135deg,${acc},#ec4899)`, color: "#fff", padding: "14px 32px", borderRadius: "100px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>Get in touch →</a>}
          {links.github && <a href={links.github} target="_blank" rel="noreferrer" style={{ border: `1px solid ${acc}40`, color: acc, padding: "14px 32px", borderRadius: "100px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>GitHub ↗</a>}
        </div>
        {(personal.location || personal.phone) && (
          <div style={{ display: "flex", gap: "24px", marginTop: "40px" }}>
            {personal.location && <span style={{ color: "#6b5a7e", fontSize: "14px" }}>📍 {personal.location}</span>}
            {personal.phone && <span style={{ color: "#6b5a7e", fontSize: "14px" }}>📞 {personal.phone}</span>}
          </div>
        )}
      </section>

      {/* Skills — horizontal scroll strip */}
      {(skills.technical?.length || skills.languages?.length) && (
        <div style={{ borderTop: `1px solid ${acc}15`, borderBottom: `1px solid ${acc}15`, padding: "20px 48px", background: `${acc}05`, overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "4px" }}>
            {[...(skills.technical||[]), ...(skills.languages||[]), ...(skills.tools||[])].map((sk, i) => (
              <span key={i} style={{ whiteSpace: "nowrap", padding: "6px 18px", borderRadius: "100px", border: `1px solid ${acc}30`, color: acc, fontSize: "13px", fontWeight: 600, background: `${acc}08` }}>{sk}</span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section style={{ padding: "80px 48px", maxWidth: "960px", margin: "0 auto", position: "relative", zIndex: 1 }} id="work">
          <div style={{ fontSize: "11px", color: acc, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>Career</div>
          <h2 style={{ fontSize: "40px", fontWeight: 800, letterSpacing: "-2px", marginBottom: "48px", color: "#f0e6ff" }}>Work Experience</h2>
          {experiences.map((exp, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "32px", paddingBottom: "40px", marginBottom: "40px", borderBottom: `1px solid ${acc}10` }}>
              <div>
                <div style={{ fontSize: "13px", color: acc, fontWeight: 600, marginBottom: "6px" }}>{fmt(exp.start)} – {exp.current ? "Present" : fmt(exp.end)}</div>
                <div style={{ fontSize: "12px", color: "#6b5a7e" }}>{exp.location}</div>
              </div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#f0e6ff", marginBottom: "4px" }}>{exp.role}</div>
                <div style={{ fontSize: "14px", color: acc, marginBottom: "14px", fontWeight: 600 }}>{exp.company}</div>
                <div style={{ fontSize: "14px", color: "#9d8ab0", lineHeight: 1.7 }}>
                  {(exp.description || "").split("\n").filter(Boolean).map((line, j) => (
                    <div key={j} style={{ marginBottom: "6px" }}>→ {line.replace(/^[•\-*]\s*/, "")}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ padding: "80px 48px", maxWidth: "960px", margin: "0 auto", position: "relative", zIndex: 1 }} id="projects">
          <div style={{ fontSize: "11px", color: acc, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>Selected Work</div>
          <h2 style={{ fontSize: "40px", fontWeight: 800, letterSpacing: "-2px", marginBottom: "48px", color: "#f0e6ff" }}>Projects</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "24px" }}>
            {projects.map((proj, i) => (
              <div key={i} style={{ background: `${acc}06`, border: `1px solid ${acc}20`, borderRadius: "20px", padding: "28px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "100px", height: "100px", borderRadius: "50%", background: `${acc}10` }} />
                {proj.featured && <span style={{ fontSize: "11px", color: acc, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>★ Featured</span>}
                <div style={{ fontSize: "18px", fontWeight: 800, color: "#f0e6ff", margin: "10px 0 8px" }}>{proj.name}</div>
                <div style={{ fontSize: "13px", color: "#9d8ab0", lineHeight: 1.65, marginBottom: "16px" }}>{proj.desc}</div>
                {proj.tech && <div style={{ fontSize: "12px", color: acc, background: `${acc}10`, display: "inline-block", padding: "4px 12px", borderRadius: "100px", marginBottom: "16px" }}>{proj.tech}</div>}
                <div style={{ display: "flex", gap: "16px" }}>
                  {proj.demo && <a href={proj.demo} target="_blank" rel="noreferrer" style={{ color: acc, fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>Live ↗</a>}
                  {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" style={{ color: "#9d8ab0", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>GitHub ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ padding: "80px 48px", maxWidth: "960px", margin: "0 auto", borderTop: `1px solid ${acc}10`, position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "40px", fontWeight: 800, letterSpacing: "-2px", marginBottom: "40px", color: "#f0e6ff" }}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "20px 0", borderBottom: `1px solid ${acc}10`, flexWrap: "wrap", gap: "8px" }}>
              <div>
                <div style={{ fontSize: "17px", fontWeight: 700, color: "#f0e6ff" }}>{edu.institution}</div>
                <div style={{ fontSize: "14px", color: "#9d8ab0", marginTop: "4px" }}>{edu.degree} in {edu.field}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}</div>
              </div>
              <div style={{ fontSize: "13px", color: acc, fontWeight: 600 }}>{fmt(edu.start)} – {fmt(edu.end)}</div>
            </div>
          ))}
        </section>
      )}

      {/* Footer */}
      <footer style={{ padding: "40px 48px", borderTop: `1px solid ${acc}10`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", position: "relative", zIndex: 1 }} id="contact">
        <div>
          <div style={{ fontSize: "24px", fontWeight: 800, background: `linear-gradient(135deg,${acc},#fbbf24)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "6px" }}>Let's work together</div>
          {personal.email && <a href={`mailto:${personal.email}`} style={{ color: "#9d8ab0", fontSize: "15px", textDecoration: "none" }}>{personal.email}</a>}
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          {links.github && <a href={links.github} target="_blank" rel="noreferrer" style={{ color: "#9d8ab0", fontSize: "14px", textDecoration: "none" }}>GitHub</a>}
          {links.linkedin && <a href={links.linkedin} target="_blank" rel="noreferrer" style={{ color: "#9d8ab0", fontSize: "14px", textDecoration: "none" }}>LinkedIn</a>}
          {links.twitter && <a href={links.twitter} target="_blank" rel="noreferrer" style={{ color: "#9d8ab0", fontSize: "14px", textDecoration: "none" }}>Twitter</a>}
        </div>
      </footer>
    </div>
  );
}
