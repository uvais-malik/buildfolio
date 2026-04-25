import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import { usePortfolio } from "../context/PortfolioContext";
import {
  User, Briefcase, GraduationCap, Code2, FolderOpen, Link2,
  Plus, Trash2, ChevronRight, ChevronLeft, Save, CheckCircle2, Sparkles, Upload
} from "lucide-react";

const STEPS = [
  { id: "personal", label: "Personal", icon: <User size={16} />, desc: "Basic info & contact" },
  { id: "experience", label: "Experience", icon: <Briefcase size={16} />, desc: "Work history" },
  { id: "education", label: "Education", icon: <GraduationCap size={16} />, desc: "Academic background" },
  { id: "skills", label: "Skills", icon: <Code2 size={16} />, desc: "Tech & soft skills" },
  { id: "projects", label: "Projects", icon: <FolderOpen size={16} />, desc: "Showcase your work" },
  { id: "links", label: "Links", icon: <Link2 size={16} />, desc: "Social & portfolio" },
];

function FieldLabel({ children, required }) {
  return (
    <label className="block text-sm font-medium text-ink-muted mb-1.5">
      {children} {required && <span className="text-accent-cyan">*</span>}
    </label>
  );
}

function SectionCard({ title, subtitle, children }) {
  return (
    <div className="glass-card rounded-2xl p-6 mb-5">
      <div className="mb-5 pb-4 border-b border-bg-border">
        <h3 className="font-semibold text-ink text-base">{title}</h3>
        {subtitle && <p className="text-ink-muted text-sm mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function PersonalStep({ register, initialData, onAvatarChange }) {
  const [preview, setPreview] = useState(initialData?.avatar || "");
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target.result);
      onAvatarChange(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <SectionCard title="Personal Information" subtitle="This will be the header of your portfolio and resume.">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <FieldLabel required>Full Name</FieldLabel>
            <input {...register("name", { required: true })} placeholder="John Doe" className="field-input" />
          </div>
          <div>
            <FieldLabel required>Professional Title</FieldLabel>
            <input {...register("title", { required: true })} placeholder="Full Stack Developer" className="field-input" />
          </div>
          <div className="md:col-span-2">
            <FieldLabel required>Professional Summary</FieldLabel>
            <textarea {...register("summary", { required: true })} placeholder="Write a compelling 2-3 sentence summary..." className="field-input resize-none h-28" />
            <p className="text-xs text-ink-faint mt-1">💡 Mention 2-3 key skills and your years of experience for better ATS scoring.</p>
          </div>
          <div>
            <FieldLabel required>Email</FieldLabel>
            <input {...register("email", { required: true })} type="email" placeholder="you@example.com" className="field-input" />
          </div>
          <div>
            <FieldLabel>Phone</FieldLabel>
            <input {...register("phone")} placeholder="+91 9876543210" className="field-input" />
          </div>
          <div>
            <FieldLabel>Location</FieldLabel>
            <input {...register("location")} placeholder="Delhi, India" className="field-input" />
          </div>
          <div>
            <FieldLabel>Website / Portfolio URL</FieldLabel>
            <input {...register("website")} placeholder="https://yoursite.com" className="field-input" />
          </div>
        </div>
      </SectionCard>
      <SectionCard title="Profile Photo" subtitle="Upload a professional headshot (optional but recommended).">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-bg-elevated border-2 border-dashed border-bg-border flex items-center justify-center text-ink-faint overflow-hidden flex-shrink-0">
            {preview ? <img src={preview} alt="avatar" className="w-full h-full object-cover" /> : <User size={28} />}
          </div>
          <div>
            <button onClick={() => fileRef.current?.click()} className="btn-secondary text-sm py-2 px-4 mb-2 flex items-center gap-2">
              <Upload size={14} /> Upload Photo
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            <p className="text-xs text-ink-faint">JPG or PNG, max 2MB. Square crop recommended.</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function ExperienceStep({ value, onChange }) {
  const [experiences, setExperiences] = useState(
    value?.length ? value : [{ id: 1, company: "", role: "", start: "", end: "", current: false, description: "", location: "" }]
  );
  const add = () => { const l = [...experiences, { id: Date.now(), company: "", role: "", start: "", end: "", current: false, description: "", location: "" }]; setExperiences(l); onChange(l); };
  const remove = (id) => { const l = experiences.filter(e => e.id !== id); setExperiences(l); onChange(l); };
  const update = (id, field, val) => { const l = experiences.map(e => e.id === id ? { ...e, [field]: val } : e); setExperiences(l); onChange(l); };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div><h3 className="font-semibold text-ink">Work Experience</h3><p className="text-ink-muted text-sm">List your most recent experience first.</p></div>
        <button onClick={add} className="btn-secondary text-sm py-2 px-4 flex items-center gap-1.5"><Plus size={14} /> Add Position</button>
      </div>
      {experiences.map((exp, i) => (
        <div key={exp.id} className="glass-card rounded-2xl p-6 mb-4 border border-bg-border hover:border-accent-cyan/20 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="tag tag-cyan">Position {i + 1}</span>
            {experiences.length > 1 && <button onClick={() => remove(exp.id)} className="btn-ghost text-red-400 hover:text-red-300 text-sm py-1 px-2"><Trash2 size={13} /></button>}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><FieldLabel required>Company Name</FieldLabel><input value={exp.company} onChange={e => update(exp.id, "company", e.target.value)} placeholder="Google" className="field-input" /></div>
            <div><FieldLabel required>Job Title / Role</FieldLabel><input value={exp.role} onChange={e => update(exp.id, "role", e.target.value)} placeholder="Senior Software Engineer" className="field-input" /></div>
            <div><FieldLabel>Start Date</FieldLabel><input type="month" value={exp.start} onChange={e => update(exp.id, "start", e.target.value)} className="field-input" /></div>
            <div>
              <FieldLabel>End Date</FieldLabel>
              <div className="flex items-center gap-3">
                <input type="month" value={exp.end} onChange={e => update(exp.id, "end", e.target.value)} disabled={exp.current} className="field-input flex-1" />
                <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap">
                  <input type="checkbox" checked={exp.current} onChange={e => update(exp.id, "current", e.target.checked)} className="w-4 h-4 accent-accent-cyan" />
                  <span className="text-sm text-ink-muted">Present</span>
                </label>
              </div>
            </div>
            <div><FieldLabel>Location</FieldLabel><input value={exp.location} onChange={e => update(exp.id, "location", e.target.value)} placeholder="Remote / New Delhi, India" className="field-input" /></div>
            <div className="md:col-span-2">
              <FieldLabel required>Description & Achievements</FieldLabel>
              <textarea value={exp.description} onChange={e => update(exp.id, "description", e.target.value)} placeholder={"• Led development of X feature\n• Increased Y by Z%\n• Built APIs serving 100K+ daily requests"} className="field-input resize-none h-28" />
              <p className="text-xs text-ink-faint mt-1">💡 Use bullet points with action verbs. Quantify achievements for higher ATS score.</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationStep({ value, onChange }) {
  const [education, setEducation] = useState(value?.length ? value : [{ id: 1, institution: "", degree: "", field: "", start: "", end: "", gpa: "" }]);
  const add = () => { const l = [...education, { id: Date.now(), institution: "", degree: "", field: "", start: "", end: "", gpa: "" }]; setEducation(l); onChange(l); };
  const remove = (id) => { const l = education.filter(e => e.id !== id); setEducation(l); onChange(l); };
  const update = (id, field, val) => { const l = education.map(e => e.id === id ? { ...e, [field]: val } : e); setEducation(l); onChange(l); };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div><h3 className="font-semibold text-ink">Education</h3><p className="text-ink-muted text-sm">Degrees, certifications, and courses.</p></div>
        <button onClick={add} className="btn-secondary text-sm py-2 px-4 flex items-center gap-1.5"><Plus size={14} /> Add Education</button>
      </div>
      {education.map((edu, i) => (
        <div key={edu.id} className="glass-card rounded-2xl p-6 mb-4 border border-bg-border hover:border-accent-cyan/20 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="tag tag-orange">Education {i + 1}</span>
            {education.length > 1 && <button onClick={() => remove(edu.id)} className="btn-ghost text-red-400 text-sm py-1 px-2"><Trash2 size={13} /></button>}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><FieldLabel required>Institution</FieldLabel><input value={edu.institution} onChange={e => update(edu.id, "institution", e.target.value)} placeholder="Delhi Technological University" className="field-input" /></div>
            <div><FieldLabel required>Degree</FieldLabel><input value={edu.degree} onChange={e => update(edu.id, "degree", e.target.value)} placeholder="B.Tech / B.Sc / MBA" className="field-input" /></div>
            <div><FieldLabel required>Field of Study</FieldLabel><input value={edu.field} onChange={e => update(edu.id, "field", e.target.value)} placeholder="Computer Science" className="field-input" /></div>
            <div><FieldLabel>GPA / Percentage</FieldLabel><input value={edu.gpa} onChange={e => update(edu.id, "gpa", e.target.value)} placeholder="8.5 / 10 or 85%" className="field-input" /></div>
            <div><FieldLabel>Start</FieldLabel><input type="month" value={edu.start} onChange={e => update(edu.id, "start", e.target.value)} className="field-input" /></div>
            <div><FieldLabel>End</FieldLabel><input type="month" value={edu.end} onChange={e => update(edu.id, "end", e.target.value)} className="field-input" /></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsStep({ value, onChange }) {
  const [skills, setSkills] = useState(value?.technical ? value : { technical: ["React", "Node.js", "MongoDB"], soft: ["Communication", "Problem Solving"], tools: ["VS Code", "Git", "Figma"], languages: ["JavaScript", "Python"] });
  const [input, setInput] = useState({ technical: "", soft: "", tools: "", languages: "" });

  const addSkill = (cat) => {
    if (!input[cat].trim()) return;
    const newSkills = { ...skills, [cat]: [...(skills[cat] || []), input[cat].trim()] };
    setSkills(newSkills); onChange(newSkills); setInput({ ...input, [cat]: "" });
  };
  const removeSkill = (cat, idx) => {
    const newSkills = { ...skills, [cat]: skills[cat].filter((_, i) => i !== idx) };
    setSkills(newSkills); onChange(newSkills);
  };

  const cats = [
    { key: "technical", label: "Technical Skills", hint: "e.g. React, Docker, PostgreSQL", color: "cyan" },
    { key: "languages", label: "Programming Languages", hint: "e.g. JavaScript, Python, Go", color: "orange" },
    { key: "tools", label: "Tools & Platforms", hint: "e.g. AWS, Git, Figma", color: "gold" },
    { key: "soft", label: "Soft Skills", hint: "e.g. Leadership, Agile", color: "cyan" },
  ];

  return (
    <div className="space-y-4">
      {cats.map(cat => (
        <div key={cat.key} className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold text-ink mb-1">{cat.label}</h3>
          <p className="text-xs text-ink-faint mb-4">{cat.hint}</p>
          <div className="flex gap-2 mb-4">
            <input value={input[cat.key]} onChange={e => setInput({ ...input, [cat.key]: e.target.value })} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill(cat.key))} placeholder={`Add ${cat.label.toLowerCase()}...`} className="field-input flex-1" />
            <button onClick={() => addSkill(cat.key)} className="btn-primary py-2 px-4 text-sm"><Plus size={14} /></button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(skills[cat.key] || []).map((sk, i) => (
              <span key={i} className={`tag ${cat.color === "orange" ? "tag-orange" : cat.color === "gold" ? "tag-gold" : "tag-cyan"} cursor-pointer hover:opacity-70`} onClick={() => removeSkill(cat.key, i)}>
                {sk} <span className="opacity-60 ml-1">×</span>
              </span>
            ))}
            {!(skills[cat.key]?.length) && <span className="text-ink-faint text-sm italic">No skills added yet</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsStep({ value, onChange }) {
  const [projects, setProjects] = useState(value?.length ? value : [{ id: 1, name: "", desc: "", tech: "", demo: "", github: "", featured: false }]);
  const add = () => { const l = [...projects, { id: Date.now(), name: "", desc: "", tech: "", demo: "", github: "", featured: false }]; setProjects(l); onChange(l); };
  const remove = (id) => { const l = projects.filter(p => p.id !== id); setProjects(l); onChange(l); };
  const update = (id, field, val) => { const l = projects.map(p => p.id === id ? { ...p, [field]: val } : p); setProjects(l); onChange(l); };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div><h3 className="font-semibold text-ink">Projects</h3><p className="text-ink-muted text-sm">Showcase your best work.</p></div>
        <button onClick={add} className="btn-secondary text-sm py-2 px-4 flex items-center gap-1.5"><Plus size={14} /> Add Project</button>
      </div>
      {projects.map((proj, i) => (
        <div key={proj.id} className="glass-card rounded-2xl p-6 mb-4 border border-bg-border hover:border-accent-cyan/20 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="tag tag-orange">Project {i + 1}</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={proj.featured} onChange={e => update(proj.id, "featured", e.target.checked)} className="w-4 h-4 accent-accent-cyan" />
                <span className="text-xs text-ink-muted">Featured</span>
              </label>
            </div>
            {projects.length > 1 && <button onClick={() => remove(proj.id)} className="btn-ghost text-red-400 text-sm py-1 px-2"><Trash2 size={13} /></button>}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><FieldLabel required>Project Name</FieldLabel><input value={proj.name} onChange={e => update(proj.id, "name", e.target.value)} placeholder="My Awesome Project" className="field-input" /></div>
            <div><FieldLabel>Tech Stack</FieldLabel><input value={proj.tech} onChange={e => update(proj.id, "tech", e.target.value)} placeholder="React, Node.js, MongoDB" className="field-input" /></div>
            <div className="md:col-span-2"><FieldLabel required>Description</FieldLabel><textarea value={proj.desc} onChange={e => update(proj.id, "desc", e.target.value)} placeholder="Describe what you built and the impact..." className="field-input resize-none h-24" /></div>
            <div><FieldLabel>Live Demo URL</FieldLabel><input value={proj.demo} onChange={e => update(proj.id, "demo", e.target.value)} placeholder="https://project.vercel.app" className="field-input" /></div>
            <div><FieldLabel>GitHub URL</FieldLabel><input value={proj.github} onChange={e => update(proj.id, "github", e.target.value)} placeholder="https://github.com/user/project" className="field-input" /></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LinksStep({ register }) {
  const socialLinks = [
    { name: "github", label: "GitHub", placeholder: "https://github.com/username" },
    { name: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
    { name: "twitter", label: "Twitter / X", placeholder: "https://x.com/username" },
    { name: "dribbble", label: "Dribbble", placeholder: "https://dribbble.com/username" },
    { name: "medium", label: "Medium / Blog", placeholder: "https://medium.com/@username" },
    { name: "leetcode", label: "LeetCode", placeholder: "https://leetcode.com/username" },
  ];
  return (
    <div>
      <SectionCard title="Social & Professional Links" subtitle="Links appear on your portfolio and resume header.">
        <div className="grid md:grid-cols-2 gap-4">
          {socialLinks.map(link => (
            <div key={link.name}>
              <FieldLabel>{link.label}</FieldLabel>
              <input {...register(`links.${link.name}`)} placeholder={link.placeholder} className="field-input" />
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Achievements & Certifications" subtitle="Awards, certifications, publications.">
        <textarea {...register("achievements")} placeholder={"• AWS Certified Solutions Architect\n• 1st place - HackIndia 2024\n• Published paper: 'Optimizing RAG pipelines'"} className="field-input resize-none h-32" />
      </SectionCard>
      <div className="glass-card rounded-2xl p-5 border border-accent-cyan/20 bg-accent-cyan/5">
        <div className="flex items-center gap-3 mb-2"><Sparkles size={16} className="text-accent-cyan" /><h4 className="font-semibold text-ink text-sm">ATS Optimization Active</h4></div>
        <p className="text-ink-muted text-sm">Your resume is automatically structured for maximum ATS parsing accuracy. Target score: <strong className="text-accent-cyan">90+</strong></p>
      </div>
    </div>
  );
}

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const navigate = useNavigate();
  const { portfolioData, setPortfolioData, syncToServer } = usePortfolio();

  const { register, watch, setValue, getValues, reset } = useForm({
    defaultValues: {
      name: portfolioData.personal?.name || "",
      title: portfolioData.personal?.title || "",
      summary: portfolioData.personal?.summary || "",
      email: portfolioData.personal?.email || "",
      phone: portfolioData.personal?.phone || "",
      location: portfolioData.personal?.location || "",
      website: portfolioData.personal?.website || "",
      links: portfolioData.links || {},
      achievements: portfolioData.achievements || "",
    },
  });

  // States for complex steps
  const [experiences, setExperiences] = useState(portfolioData.experiences || []);
  const [education, setEducation] = useState(portfolioData.education || []);
  const [skills, setSkills] = useState(portfolioData.skills || { technical: [], languages: [], tools: [], soft: [] });
  const [projects, setProjects] = useState(portfolioData.projects || []);
  const [avatar, setAvatar] = useState(portfolioData.personal?.avatar || "");

  const collectAndSave = async (showMsg = true) => {
    const formVals = getValues();
    const newData = {
      personal: { name: formVals.name, title: formVals.title, summary: formVals.summary, email: formVals.email, phone: formVals.phone, location: formVals.location, website: formVals.website, avatar },
      experiences,
      education,
      skills,
      projects,
      links: formVals.links || {},
      achievements: formVals.achievements || "",
    };
    setPortfolioData(newData);
    if (showMsg) {
      setSaving(true);
      setSaveMsg("Saving...");
      try { await syncToServer(newData); setSaveMsg("Saved!"); } catch { setSaveMsg("Saved locally"); }
      setTimeout(() => { setSaving(false); setSaveMsg(""); }, 2000);
    }
    return newData;
  };

  const handleNext = async () => {
    await collectAndSave(false);
    if (currentStep < STEPS.length - 1) setCurrentStep(s => s + 1);
    else { await collectAndSave(true); navigate("/templates"); }
  };

  const handleBack = () => { collectAndSave(false); setCurrentStep(s => s - 1); };

  const renderStep = () => {
    switch (STEPS[currentStep].id) {
      case "personal": return <PersonalStep register={register} initialData={portfolioData.personal} onAvatarChange={setAvatar} />;
      case "experience": return <ExperienceStep value={experiences} onChange={setExperiences} />;
      case "education": return <EducationStep value={education} onChange={setEducation} />;
      case "skills": return <SkillsStep value={skills} onChange={setSkills} />;
      case "projects": return <ProjectsStep value={projects} onChange={setProjects} />;
      case "links": return <LinksStep register={register} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar />
      <div className="pt-16">
        <div className="border-b border-bg-border bg-bg-surface">
          <div className="max-w-5xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-display text-3xl font-semibold text-ink">Build your profile</h1>
                <p className="text-ink-muted text-sm mt-1">Fill in the details — your resume and portfolio will be generated automatically.</p>
              </div>
              <button onClick={() => collectAndSave(true)} className={`btn-secondary text-sm py-2 px-4 flex items-center gap-1.5 transition-all ${saveMsg === "Saved!" ? "border-green-500/40 text-green-400" : ""}`}>
                {saveMsg ? <><CheckCircle2 size={14} /> {saveMsg}</> : <><Save size={14} /> Save Progress</>}
              </button>
            </div>
            <div className="flex gap-1 overflow-x-auto pb-1">
              {STEPS.map((step, i) => (
                <button key={step.id} onClick={() => { collectAndSave(false); setCurrentStep(i); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${i === currentStep ? "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30" : i < currentStep ? "text-ink-muted hover:text-ink hover:bg-bg-elevated" : "text-ink-faint hover:text-ink-muted"}`}>
                  {i < currentStep ? <CheckCircle2 size={14} className="text-accent-cyan" /> : step.icon}
                  {step.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="mb-4 flex items-center gap-2">
            <div className="w-1 h-6 rounded-full bg-accent-cyan" />
            <div>
              <p className="font-semibold text-ink">{STEPS[currentStep].label}</p>
              <p className="text-ink-muted text-xs">{STEPS[currentStep].desc}</p>
            </div>
          </div>
          {renderStep()}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-bg-border">
            <button onClick={handleBack} disabled={currentStep === 0} className="btn-secondary py-2.5 px-6 flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronLeft size={16} /> Back
            </button>
            <div className="flex items-center gap-2">
              {STEPS.map((_, i) => (<div key={i} className={`h-1.5 rounded-full transition-all ${i === currentStep ? "w-6 bg-accent-cyan" : i < currentStep ? "w-3 bg-accent-cyan/40" : "w-3 bg-bg-border"}`} />))}
            </div>
            <button onClick={handleNext} className="btn-primary py-2.5 px-6 flex items-center gap-2">
              {currentStep === STEPS.length - 1 ? "Choose Template" : "Next"} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
