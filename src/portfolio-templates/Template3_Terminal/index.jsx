const fmt = (d) => {
  if (!d) return "";
  const [y, m] = d.split("-");
  return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+m-1]} ${y}`;
};

export default function Template3_Terminal({ data = {} }) {
  const { personal = {}, experiences = [], education = [], skills = {}, projects = [], links = {}, achievements = "" } = data;
  const acc = "#4ade80";
  const s = {
    root: { fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace", background: "#0d1117", color: "#c9d1d9", minHeight: "100vh" },
    chrome: { background: "#161b22", padding: "10px 16px", display: "flex", gap: "8px", alignItems: "center", borderBottom: "1px solid #30363d" },
    dot: (c) => ({ width: "12px", height: "12px", borderRadius: "50%", background: c }),
    chromeTitle: { marginLeft: "auto", marginRight: "auto", fontSize: "12px", color: "#8b949e" },
    term: { padding: "40px", maxWidth: "960px", margin: "0 auto" },
    prompt: { color: acc, fontSize: "14px", marginBottom: "6px" },
    cmd: { color: "#f0f6fc", fontSize: "15px", fontWeight: 600 },
    output: { marginTop: "6px", marginBottom: "32px", paddingLeft: "20px" },
    hl: { color: acc },
    muted: { color: "#8b949e", fontSize: "13px", lineHeight: 1.7 },
    section: { marginBottom: "48px" },
    skillRow: { display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" },
    skillBadge: { background: "#161b22", border: `1px solid ${acc}30`, color: acc, padding: "4px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: 600 },
    expItem: { borderLeft: `2px solid ${acc}40`, paddingLeft: "20px", marginBottom: "28px" },
    expTitle: { color: "#f0f6fc", fontSize: "15px", fontWeight: 700 },
    expSub: { color: acc, fontSize: "13px", margin: "2px 0 8px" },
    expDate: { color: "#8b949e", fontSize: "12px" },
    projCard: { background: "#161b22", border: "1px solid #30363d", borderRadius: "8px", padding: "20px", marginBottom: "16px" },
    projName: { color: acc, fontSize: "15px", fontWeight: 700, marginBottom: "6px" },
    projDesc: { color: "#8b949e", fontSize: "13px", lineHeight: 1.6, marginBottom: "12px" },
    projTech: { color: "#c9d1d9", fontSize: "12px", background: "#0d1117", padding: "2px 10px", borderRadius: "4px", display: "inline-block", marginBottom: "10px" },
    link: { color: acc, fontSize: "12px", textDecoration: "none", marginRight: "16px" },
  };

  return (
    <div style={s.root}>
      {/* Window chrome */}
      <div style={s.chrome}>
        <div style={s.dot("#ff5f56")} />
        <div style={s.dot("#ffbd2e")} />
        <div style={s.dot("#27c93f")} />
        <span style={s.chromeTitle}>~/portfolio — bash</span>
      </div>

      <div style={s.term}>
        {/* Greeting */}
        <div style={s.section}>
          <div style={s.prompt}>visitor@portfolio:~$ <span style={s.cmd}>cat about.txt</span></div>
          <div style={s.output}>
            <div style={{ color: acc, fontSize: "28px", fontWeight: 800, marginBottom: "8px", letterSpacing: "-1px" }}>
              {personal.name || "Your Name"}
            </div>
            <div style={{ color: "#58a6ff", fontSize: "16px", marginBottom: "16px" }}>{personal.title || "Software Engineer"}</div>
            <div style={s.muted}>{personal.summary || "Professional summary goes here."}</div>
            {(personal.email || personal.location) && (
              <div style={{ marginTop: "16px", fontSize: "13px", color: "#8b949e" }}>
                {personal.email && <div><span style={{ color: acc }}>email: </span>{personal.email}</div>}
                {personal.location && <div><span style={{ color: acc }}>location: </span>{personal.location}</div>}
                {personal.phone && <div><span style={{ color: acc }}>phone: </span>{personal.phone}</div>}
              </div>
            )}
          </div>
        </div>

        {/* Links */}
        {(links.github || links.linkedin) && (
          <div style={s.section}>
            <div style={s.prompt}>visitor@portfolio:~$ <span style={s.cmd}>ls -la ./links/</span></div>
            <div style={s.output}>
              {links.github && <div style={{ marginBottom: "6px" }}><span style={{ color: acc }}>drwxr-xr-x</span> <a href={links.github} target="_blank" rel="noreferrer" style={s.link}>github</a></div>}
              {links.linkedin && <div style={{ marginBottom: "6px" }}><span style={{ color: acc }}>drwxr-xr-x</span> <a href={links.linkedin} target="_blank" rel="noreferrer" style={s.link}>linkedin</a></div>}
              {links.twitter && <div style={{ marginBottom: "6px" }}><span style={{ color: acc }}>drwxr-xr-x</span> <a href={links.twitter} target="_blank" rel="noreferrer" style={s.link}>twitter</a></div>}
              {links.leetcode && <div><span style={{ color: acc }}>drwxr-xr-x</span> <a href={links.leetcode} target="_blank" rel="noreferrer" style={s.link}>leetcode</a></div>}
            </div>
          </div>
        )}

        {/* Skills */}
        {(skills.technical?.length || skills.languages?.length) && (
          <div style={s.section}>
            <div style={s.prompt}>visitor@portfolio:~$ <span style={s.cmd}>cat skills.json</span></div>
            <div style={s.output}>
              <div style={{ color: "#30363d", fontSize: "13px" }}>{"{"}</div>
              {[["technical", skills.technical], ["languages", skills.languages], ["tools", skills.tools], ["soft", skills.soft]].map(([k, arr]) =>
                arr?.length ? (
                  <div key={k} style={{ paddingLeft: "20px", marginBottom: "8px" }}>
                    <span style={{ color: "#79c0ff" }}>"{k}"</span><span style={{ color: "#c9d1d9" }}>: </span>
                    <span style={{ color: "#a5d6ff" }}>[{arr.map(s => `"${s}"`).join(", ")}]</span>
                  </div>
                ) : null
              )}
              <div style={{ color: "#30363d", fontSize: "13px" }}>{"}"}</div>
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div style={s.section}>
            <div style={s.prompt}>visitor@portfolio:~$ <span style={s.cmd}>git log --experience</span></div>
            <div style={s.output}>
              {experiences.map((exp, i) => (
                <div key={i} style={s.expItem}>
                  <div style={s.expDate}>commit {Math.random().toString(36).substr(2,7)} | {fmt(exp.start)} – {exp.current ? "Present" : fmt(exp.end)}</div>
                  <div style={s.expTitle}>{exp.role}</div>
                  <div style={s.expSub}>@ {exp.company} {exp.location ? `· ${exp.location}` : ""}</div>
                  <div style={s.muted}>
                    {(exp.description || "").split("\n").filter(Boolean).map((line, j) => (
                      <div key={j} style={{ marginBottom: "4px" }}><span style={{ color: acc }}>+</span> {line.replace(/^[•\-*]\s*/, "")}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div style={s.section}>
            <div style={s.prompt}>visitor@portfolio:~$ <span style={s.cmd}>ls ./projects/ | xargs cat</span></div>
            <div style={s.output}>
              {projects.map((proj, i) => (
                <div key={i} style={s.projCard}>
                  <div style={s.projName}>📁 {proj.name} {proj.featured ? "⭐" : ""}</div>
                  <div style={s.projDesc}>{proj.desc}</div>
                  {proj.tech && <div style={s.projTech}>stack: {proj.tech}</div>}
                  <div>
                    {proj.demo && <a href={proj.demo} target="_blank" rel="noreferrer" style={s.link}>→ live demo</a>}
                    {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" style={s.link}>→ github</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={s.section}>
            <div style={s.prompt}>visitor@portfolio:~$ <span style={s.cmd}>cat education.txt</span></div>
            <div style={s.output}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <div style={{ color: "#f0f6fc", fontWeight: 700 }}>{edu.institution}</div>
                  <div style={{ color: acc, fontSize: "13px" }}>{edu.degree} in {edu.field}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}</div>
                  <div style={s.muted}>{fmt(edu.start)} – {fmt(edu.end)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prompt */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "16px" }}>
          <span style={{ color: acc, fontSize: "14px" }}>visitor@portfolio:~$</span>
          <span style={{ width: "10px", height: "18px", background: acc, display: "inline-block", animation: "none", opacity: 0.9 }} />
        </div>
      </div>
    </div>
  );
}
