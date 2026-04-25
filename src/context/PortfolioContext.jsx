import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../utils/api";

const PortfolioContext = createContext(null);

const DEFAULT_DATA = {
  personal: { name: "", title: "", summary: "", email: "", phone: "", location: "", website: "", avatar: "" },
  experiences: [],
  education: [],
  skills: { technical: [], languages: [], tools: [], soft: [] },
  projects: [],
  links: { github: "", linkedin: "", twitter: "", dribbble: "", medium: "", leetcode: "" },
  achievements: "",
};

function loadFromStorage() {
  try {
    const saved = localStorage.getItem("pb_portfolio");
    return saved ? { ...DEFAULT_DATA, ...JSON.parse(saved) } : DEFAULT_DATA;
  } catch { return DEFAULT_DATA; }
}

export function PortfolioProvider({ children }) {
  const [portfolioData, setPortfolioDataState] = useState(loadFromStorage);
  const [selectedTemplate, setSelectedTemplateState] = useState(
    () => localStorage.getItem("pb_template") || "minimal"
  );
  const [syncing, setSyncing] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Save to localStorage every time data changes
  const setPortfolioData = useCallback((data) => {
    const merged = { ...DEFAULT_DATA, ...data };
    setPortfolioDataState(merged);
    localStorage.setItem("pb_portfolio", JSON.stringify(merged));
  }, []);

  const setSelectedTemplate = useCallback((id) => {
    setSelectedTemplateState(id);
    localStorage.setItem("pb_template", id);
  }, []);

  // Sync to MongoDB (called after login and on save)
  const syncToServer = useCallback(async (data = portfolioData, template = selectedTemplate) => {
    const token = localStorage.getItem("pb_token");
    if (!token) return;
    try {
      setSyncing(true);
      await api.post("/api/portfolio", { ...data, selectedTemplate: template });
      setLastSaved(new Date());
    } catch (err) {
      console.warn("Portfolio sync failed:", err.message);
    } finally {
      setSyncing(false);
    }
  }, [portfolioData, selectedTemplate]);

  // Load from MongoDB (called after login)
  const loadFromServer = useCallback(async () => {
    const token = localStorage.getItem("pb_token");
    if (!token) return;
    try {
      const { data } = await api.get("/api/portfolio");
      if (data) {
        const loaded = {
          personal: data.personal || DEFAULT_DATA.personal,
          experiences: data.experiences || [],
          education: data.education || [],
          skills: data.skills || DEFAULT_DATA.skills,
          projects: data.projects || [],
          links: data.links || DEFAULT_DATA.links,
          achievements: data.achievements || "",
        };
        setPortfolioData(loaded);
        if (data.selectedTemplate) setSelectedTemplate(data.selectedTemplate);
      }
    } catch (err) {
      console.warn("Failed to load portfolio from server:", err.message);
    }
  }, [setPortfolioData, setSelectedTemplate]);

  // Clear all portfolio data (on logout)
  const clearPortfolio = useCallback(() => {
    setPortfolioDataState(DEFAULT_DATA);
    setSelectedTemplateState("minimal");
    localStorage.removeItem("pb_portfolio");
    localStorage.removeItem("pb_template");
  }, []);

  // Update a single top-level section
  const updateSection = useCallback((section, value) => {
    setPortfolioData({ ...portfolioData, [section]: value });
  }, [portfolioData, setPortfolioData]);

  return (
    <PortfolioContext.Provider value={{
      portfolioData,
      setPortfolioData,
      updateSection,
      selectedTemplate,
      setSelectedTemplate,
      syncToServer,
      loadFromServer,
      clearPortfolio,
      syncing,
      lastSaved,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
};
