import { getCategoryConfig } from "../../../config/categoryConfig";
import { Card, Emoji, Label, Count } from "./styles";

interface ModuleCardProps {
  category: string;
  count: number;
  index: number;
  onClick: () => void;
}

export default function ModuleCard({ category, count, index, onClick }: ModuleCardProps) {
  const cfg = getCategoryConfig(category);

  return (
    <Card
      $color={cfg.color}
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={onClick}
    >
      <Emoji>{cfg.emoji}</Emoji>
      <Label $color={cfg.color}>{cfg.label}</Label>
      <Count>{count} missões</Count>
    </Card>
  );
}
