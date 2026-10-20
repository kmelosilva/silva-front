import { getCategoryVisual } from "../../../config/categoryConfig";
import type { Category } from "../../../types/mission";
import { Card, Emoji, Label, Count } from "./styles";

interface ModuleCardProps {
  category: Category;
  count: number;
  index: number;
  onClick: () => void;
}

export default function ModuleCard({ category, count, index, onClick }: ModuleCardProps) {
  const visual = getCategoryVisual(category.key);

  return (
    <Card
      $color={visual.color}
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={onClick}
    >
      <Emoji>{visual.emoji}</Emoji>
      <Label $color={visual.color}>{category.label}</Label>
      <Count>{count} {count === 1 ? "missão" : "missões"}</Count>
    </Card>
  );
}
