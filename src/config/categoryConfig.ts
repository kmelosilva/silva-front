// Só a parte visual de cada categoria. A lista e os rótulos vêm da API
// (backend/app/Enums/Category.php); uma chave sem visual aqui usa o padrão.

export interface CategoryVisual {
  color: string;
  bg: string;
  emoji: string;
}

const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  saude:    { color: "#4ade80", bg: "#052e16", emoji: "🫀" },
  mente:    { color: "#818cf8", bg: "#1e1b4b", emoji: "🧠" },
  financas: { color: "#fbbf24", bg: "#1c1002", emoji: "💰" },
  carreira: { color: "#38bdf8", bg: "#0c1a2e", emoji: "🚀" },
  social:   { color: "#f472b6", bg: "#2d0a1e", emoji: "🤝" },
  habitos:  { color: "#fb923c", bg: "#1f0c02", emoji: "⚡" },
};

const DEFAULT_VISUAL: CategoryVisual = { color: "#94a3b8", bg: "#0f172a", emoji: "🎯" };

export function getCategoryVisual(key: string): CategoryVisual {
  return CATEGORY_VISUALS[key] ?? DEFAULT_VISUAL;
}
