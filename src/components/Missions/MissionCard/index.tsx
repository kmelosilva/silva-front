import type { Mission } from "../../../types/mission";
import { getCategoryVisual } from "../../../config/categoryConfig";
import { Card, ImageBox, XPBadge, Title, AcceptButton } from "./styles";

interface MissionCardProps {
  mission: Mission;
  index: number;
}

export default function MissionCard({ mission, index }: MissionCardProps) {
  const visual = getCategoryVisual(mission.category.key);

  return (
    <Card $color={visual.color} style={{ animationDelay: `${index * 60}ms` }}>

      <ImageBox $bg={visual.bg} $color={visual.color}>
        <span>{visual.emoji}</span>
        <XPBadge $bg={visual.bg} $color={visual.color}>
          +{mission.xp_total} XP
        </XPBadge>
      </ImageBox>

      <Title>{mission.title}</Title>

      <AcceptButton $color={visual.color}>
        Aceitar missão →
      </AcceptButton>

    </Card>
  );
}
