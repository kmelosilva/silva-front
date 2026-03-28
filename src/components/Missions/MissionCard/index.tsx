import type { Mission } from "../../../types/mission";
import { getCategoryConfig } from "../../../config/categoryConfig";
import { Card, ImageBox, XPBadge, Title, AcceptButton } from "./styles";

interface MissionCardProps {
  mission: Mission;
  index: number;
}

export default function MissionCard({ mission, index }: MissionCardProps) {
  const cfg = getCategoryConfig(mission.category);

  return (
    <Card $color={cfg.color} style={{ animationDelay: `${index * 60}ms` }}>

      <ImageBox $bg={cfg.bg} $color={cfg.color}>
        <span>{cfg.emoji}</span>
        <XPBadge $bg={cfg.bg} $color={cfg.color}>
          +{mission.xp} XP
        </XPBadge>
      </ImageBox>

      <Title>{mission.title}</Title>

      <AcceptButton $color={cfg.color}>
        Aceitar missão →
      </AcceptButton>

    </Card>
  );
}
