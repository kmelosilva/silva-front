// Só a parte visual de cada categoria. A lista e os rótulos vêm da API
// (backend/app/Enums/Category.php); uma chave sem visual aqui usa o padrão.
// A missão de entrada não tem categoria e tem o visual da agência.
// As cores ficam em src/theme/tokens.ts.
import { categoryColors, colors } from "../theme/tokens";
import type { Category } from "../types/mission";

export interface CategoryVisual {
  color: string;
  bg: string;
  emoji: string;
}

const EMOJIS: Record<string, string> = {
  saude: "🫀",
  mente: "🧠",
  financas: "💰",
  carreira: "🚀",
  social: "🤝",
  habitos: "⚡",
};

const DEFAULT_VISUAL: CategoryVisual = { color: colors.textMuted, bg: colors.base, emoji: "🎯" };

const ENTRY_VISUAL: CategoryVisual = { color: colors.focus, bg: colors.base, emoji: "🦉" };

export function getCategoryVisual(key: string | null | undefined): CategoryVisual {
  if (!key) return ENTRY_VISUAL;
  const color = categoryColors[key];
  return color ? { color, bg: colors.base, emoji: EMOJIS[key] ?? DEFAULT_VISUAL.emoji } : DEFAULT_VISUAL;
}

export const categoryLabel = (category: Category | null) => category?.label ?? "Missão de entrada";
