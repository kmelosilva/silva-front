import type { Mission } from "../../../types/mission";
import { getCategoryVisual } from "../../../config/categoryConfig";
import { Card, ImageBox, XPBadge, Title, Meta, OpenButton } from "./styles";

interface MissionCardProps {
  mission: Mission;
  index: number;
  onSelect: (mission: Mission) => void;
}

export default function MissionCard({ mission, index, onSelect }: MissionCardProps) {
  const visual = getCategoryVisual(mission.category.key);
  const count = mission.coordinates_count;

  return (
    <Card
      $color={visual.color}
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={() => onSelect(mission)}
    >

      <ImageBox $bg={visual.bg} $color={visual.color}>
        <span>{visual.emoji}</span>
        <XPBadge $bg={visual.bg} $color={visual.color}>
          +{mission.xp_total} XP
        </XPBadge>
      </ImageBox>

      <Title>{mission.title}</Title>
      <Meta>{count} {count === 1 ? "coordenada" : "coordenadas"}</Meta>

      <OpenButton type="button" $color={visual.color}>
        Ver coordenadas →
      </OpenButton>

    </Card>
  );
}
