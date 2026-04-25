import Template1_Minimal from "./Template1_Minimal/index.jsx";
import Template2_Creative from "./Template2_Creative/index.jsx";
import Template3_Terminal from "./Template3_Terminal/index.jsx";
import Template4_Magazine from "./Template4_Magazine/index.jsx";
import Template5_Glassmorphic from "./Template5_Glassmorphic/index.jsx";

export const TEMPLATES = [
  {
    id: "minimal",
    name: "Minimal Dark",
    description: "Clean, typography-forward layout with subtle animations. Perfect for developers who let their work speak.",
    tags: ["Minimal", "Dark", "Developer"],
    accentColor: "#22d3ee",
    thumbnail: "minimal",
    component: Template1_Minimal,
  },
  {
    id: "creative",
    name: "Creative Bold",
    description: "Vibrant, expressive layout with large visuals and bold typography. Ideal for designers and creatives.",
    tags: ["Creative", "Colorful", "Designer"],
    accentColor: "#f472b6",
    thumbnail: "creative",
    component: Template2_Creative,
  },
  {
    id: "terminal",
    name: "Terminal Pro",
    description: "Retro terminal aesthetic with green-on-black styling, typewriter effects, and command-line personality.",
    tags: ["Retro", "Terminal", "Hacker"],
    accentColor: "#4ade80",
    thumbnail: "terminal",
    component: Template3_Terminal,
  },
  {
    id: "magazine",
    name: "Editorial",
    description: "Magazine-quality layout with large hero sections, editorial typography, and refined spacing.",
    tags: ["Editorial", "Elegant", "Premium"],
    accentColor: "#fbbf24",
    thumbnail: "magazine",
    component: Template4_Magazine,
  },
  {
    id: "glassmorphic",
    name: "Glassmorphic 3D",
    description: "Modern frosted glass aesthetic with depth, gradients, and immersive visual effects.",
    tags: ["Modern", "3D", "Glassmorphic"],
    accentColor: "#a78bfa",
    thumbnail: "glassmorphic",
    component: Template5_Glassmorphic,
  },
];

export const getTemplateComponent = (id) => {
  const t = TEMPLATES.find(t => t.id === id);
  return t?.component || Template1_Minimal;
};

export default TEMPLATES;
