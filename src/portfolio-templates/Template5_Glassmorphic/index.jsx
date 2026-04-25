const fmt = (d) => {
  if (!d) return "";
  const [y, m] = d.split("-");
  return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+m-1]} ${y}`;
};

export default function Template5_Glassmorphic({ data = {} }) {
  const { personal = {}, experiences = [], education = [], skills = {}, projects = [], links = {}, achievements = "" } = data;
  const acc = "#a78bfa";

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", minHeight: "100vh", background: "linear-gradient(135deg, #0f0523 0%, #020617 50%, #0a1628 100%)", color: "#e2e0ff", position: "relative", overflowX: "hidden" }}>
      {/* Background orbs */}
      <div style={{ position: "fixed", top: "10%", left: "5%", width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle, ${acc}25 0%, transparent 70%)`, pointerEvents: "none", filter: "blur(40px)" }} />
      <div style={{ position: "fixed", bottom: "10%", right: "5%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, #3b82f625 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, #7c3aed10 0%, transparent 70%)", pointerEvents: "none", filter: "blur(60px)" }} />

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(15,5,35,0.5)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: `1px solid ${acc}20`, padding: "16px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "18px", fontWeight: 800, background: `linear-gradient(135deg, ${acc}, #60a5fa)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{personal.name?.split(" ")[0] || "Portfolio"}</span>
        <div style={{ display: "flex", gap: "8px" }}>
          {["About", "Work", "Projects"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "#a5b4fc", fontSize: "13px", fontWeight: 500, textDecoration: "none", padding: "6px 14px", borderRadius: "100px", background: `${acc}10`, border: `1px solid ${acc}20` }}>{l}</a>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 40px 80px", position: "relative", zIndex: 1 }}>
        {/* Hero */}
        <section style={{ padding: "100px 0 80px", textAlign: "center" }} id="about">
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: `linear-gradient(135deg, ${acc}, #60a5fa)`, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", fontWeight: 800, color: "#fff", boxShadow: `0 0 40px ${acc}50` }}>
            {personal.name?.[0] || "P"}
          </div>
          <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 800, letterSpacing: "-2px", marginBottom: "12px", background: `linear-gradient(135deg, #fff 0%, ${acc} 60%, #60a5fa 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {personal.name || "Your Name"}
          </h1>
          <p style={{ fontSize: "18px", color: "#a5b4fc", fontWeight: 600, marginBottom: "20px" }}>{personal.title || "Developer & Designer"}</p>
          <p style={{ fontSize: "16px", color: "#8b9cf7", lineHeight: 1.8, maxWidth: "580px", margin: "0 auto 36px" }}>{personal.summary || "Your professional summary."}</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            {links.github && <a href={links.github} target="_blank" rel="noreferrer" style={{ background: `linear-gradient(135deg,${acc},#7c3aed)`, color: "#fff", padding: "12px 28px", borderRadius: "100px", fontWeight: 700, fontSize: "14px", textDecoration: "none", boxShadow: `0 0 20px ${acc}40` }}>GitHub ↗</a>}
            {links.linkedin && <a href={links.linkedin} target="_blank" rel="noreferrer" style={{ background: "rgba(167,139,250,0.1)", border: `1px solid ${acc}40`, color: acc, padding: "12px 28px", borderRadius: "100px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>LinkedIn ↗</a>}
            {personal.email && <a href={`mailto:${personal.email}`} style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.3)", color: "#60a5fa", padding: "12px 28px", borderRadius: "100px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>Email Me</a>}
          </div>
          {(personal.location || personal.phone) && (
            <div style={{ marginTop: "28px", color: "#6366f1", fontSize: "14px", display: "flex", gap: "24px", justifyContent: "center" }}>
              {personal.location && <span>📍 {personal.location}</span>}
              {personal.phone && <span>📞 {personal.phone}</span>}
            </div>
          )}
        </section>

        {/* Skills */}
        {Object.values(skills).some(a => a?.length) && (
          <section style={{ marginBottom: "60px" }}>
            <div style={{ background: "rgba(167,139,250,0.05)", backdropFilter: "blur(16px)", border: `1px solid ${acc}20`, borderRadius: "24px", padding: "32px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#e2e0ff", marginBottom: "24px", textAlign: "center" }}>Skills & Technologies</h2>
              {[["Technical", skills.technical, acc], ["Languages", skills.languages, "#60a5fa"], ["Tools", skills.tools, "#34d399"], ["Soft Skills", skills.soft, "#f472b6"]].map(([cat, arr, color]) =>
                arr?.length ? (
                  <div key={cat} style={{ marginBottom: "20px" }}>
                    <div style={{ fontSize: "11px", color, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>{cat}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {arr.map((sk, i) => (
                        <span key={i} style={{ background: `${color}12`, border: `1px solid ${color}30`, color, padding: "5px 14px", borderRadius: "100px", fontSize: "13px", fontWeight: 600 }}>{sk}</span>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section style={{ marginBottom: "60px" }} id="work">
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#e2e0ff", marginBottom: "28px", textAlign: "center", letterSpacing: "-1px" }}>Experience</h2>
            {experiences.map((exp, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", border: `1px solid ${acc}15`, borderRadius: "20px", padding: "28px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "#f0eeff" }}>{exp.role}</div>
                    <div style={{ fontSize: "14px", color: acc, fontWeight: 600, marginTop: "2px" }}>{exp.company} {exp.location ? `· ${exp.location}` : ""}</div>
                  </div>
                  <span style={{ background: `${acc}15`, border: `1px solid ${acc}30`, color: acc, padding: "4px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 600 }}>
                    {fmt(exp.start)} – {exp.current ? "Present" : fmt(exp.end)}
                  </span>
                </div>
                <div style={{ fontSize: "14px", color: "#8b9cf7", lineHeight: 1.7 }}>
                  {(exp.description || "").split("\n").filter(Boolean).map((line, j) => (
                    <div key={j} style={{ marginBottom: "5px" }}>◆ {line.replace(/^[•\-*]\s*/, "")}</div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section style={{ marginBottom: "60px" }} id="projects">
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#e2e0ff", marginBottom: "28px", textAlign: "center", letterSpacing: "-1px" }}>Projects</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px" }}>
              {projects.map((proj, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", border: `1px solid ${acc}15`, borderRadius: "20px", padding: "24px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "120px", height: "120px", borderRadius: "50%", background: `${acc}08`, filter: "blur(20px)" }} />
                  {proj.featured && <div style={{ fontSize: "11px", color: "#fbbf24", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>★ Featured</div>}
                  <div style={{ fontSize: "17px", fontWeight: 700, color: "#f0eeff", marginBottom: "8px" }}>{proj.name}</div>
                  {proj.tech && <div style={{ fontSize: "12px", color: acc, background: `${acc}12`, display: "inline-block", padding: "3px 12px", borderRadius: "100px", marginBottom: "12px" }}>{proj.tech}</div>}
                  <div style={{ fontSize: "13px", color: "#8b9cf7", lineHeight: 1.65, marginBottom: "16px" }}>{proj.desc}</div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    {proj.demo && <a href={proj.demo} target="_blank" rel="noreferrer" style={{ color: acc, fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>Live ↗</a>}
                    {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" style={{ color: "#60a5fa", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>GitHub ↗</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#e2e0ff", marginBottom: "28px", textAlign: "center", letterSpacing: "-1px" }}>Education</h2>
            {education.map((edu, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", border: `1px solid ${acc}15`, borderRadius: "20px", padding: "24px", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <div style={{ fontSize: "17px", fontWeight: 700, color: "#f0eeff" }}>{edu.institution}</div>
                  <div style={{ fontSize: "14px", color: "#8b9cf7", marginTop: "4px" }}>{edu.degree} in {edu.field}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}</div>
                </div>
                <div style={{ background: `${acc}15`, border: `1px solid ${acc}30`, color: acc, padding: "4px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 600 }}>
                  {fmt(edu.start)} – {fmt(edu.end)}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Footer */}
        <footer style={{ textAlign: "center", borderTop: `1px solid ${acc}15`, paddingTop: "40px" }}>
          <div style={{ fontSize: "28px", fontWeight: 800, background: `linear-gradient(135deg,${acc},#60a5fa)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "16px" }}>Let's build something great</div>
          {personal.email && <a href={`mailto:${personal.email}`} style={{ color: acc, fontSize: "16px", textDecoration: "none", fontWeight: 600 }}>{personal.email}</a>}
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "24px" }}>
            {[["GitHub", links.github], ["LinkedIn", links.linkedin], ["Twitter", links.twitter]].map(([n,u]) => u ? (
              <a key={n} href={u} target="_blank" rel="noreferrer" style={{ color: "#6366f1", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>{n}</a>
            ) : null)}
          </div>
          <p style={{ color: "#4c4f7a", fontSize: "13px", marginTop: "24px" }}>© {new Date().getFullYear()} {personal.name}</p>
        </footer>
      </div>
    </div>
  );
}
