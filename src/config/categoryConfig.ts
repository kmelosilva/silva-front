export interface CategoryConfig {
    label: string;
    color: string;
    bg: string;
    emoji: string;
  }
  
  export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
    saude:    { label: "Saúde",    color: "#4ade80", bg: "#052e16", emoji: "🫀" },
    mente:    { label: "Mente",    color: "#818cf8", bg: "#1e1b4b", emoji: "🧠" },
    financas: { label: "Finanças", color: "#fbbf24", bg: "#1c1002", emoji: "💰" },
    carreira: { label: "Carreira", color: "#38bdf8", bg: "#0c1a2e", emoji: "🚀" },
    social:   { label: "Social",   color: "#f472b6", bg: "#2d0a1e", emoji: "🤝" },
    habitos:  { label: "Hábitos",  color: "#fb923c", bg: "#1f0c02", emoji: "⚡" },
    default:  { label: "Geral",    color: "#94a3b8", bg: "#0f172a", emoji: "🎯" },
  };
  
  export function getCategoryConfig(category: string): CategoryConfig {
    const key = category?.toLowerCase().replace(/\s/g, "") ?? "default";
    return CATEGORY_CONFIG[key] ?? CATEGORY_CONFIG.default;
  }