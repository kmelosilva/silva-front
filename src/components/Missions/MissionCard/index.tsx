import type { Mission } from "../../../types/mission";
import type { MissionProgress } from "../../../types/agent";
import { getCategoryVisual } from "../../../config/categoryConfig";
import { Card, ImageBox, XPBadge, Title, Meta, Status, OpenButton } from "./styles";

interface MissionCardProps {
  mission: Mission;
  progress?: MissionProgress;
  index: number;
  onSelect: (mission: Mission) => void;
}

export default function MissionCard({ mission, progress, index, onSelect }: MissionCardProps) {
  const visual = getCategoryVisual(mission.category.key);
  const count = mission.coordinates_count;
  const completed = progress?.status === "completed";

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

      {progress && (
        <Status $done={completed}>
          {completed
            ? "CONCLUÍDA ✓"
            : `EM ANDAMENTO · ${progress.completed_coordinates.length}/${count}`}
        </Status>
      )}

      <OpenButton type="button" $color={visual.color}>
        {!progress ? "Ver coordenadas →" : completed ? "Rever coordenadas →" : "Continuar →"}
      </OpenButton>

    </Card>
  );
}
