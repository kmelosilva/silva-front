import type { Category, Mission } from "../../../types/mission";
import type { MissionProgress } from "../../../types/agent";
import { getCategoryVisual } from "../../../config/categoryConfig";
import MissionCard from "../MissionCard";
import { Section, CategoryBar, CategoryLabel, CategoryCount, Grid } from "./styles";

interface CategorySectionProps {
  category: Category;
  missions: Mission[];
  progress: Record<string, MissionProgress>;
  onSelectMission: (mission: Mission) => void;
}

export default function CategorySection({ category, missions, progress, onSelectMission }: CategorySectionProps) {
  const visual = getCategoryVisual(category.key);

  return (
    <Section>
      <div className="d-flex align-items-center gap-2 mb-4">
        <CategoryBar $color={visual.color} />
        <CategoryLabel $color={visual.color}>
          {visual.emoji} {category.label.toUpperCase()}
        </CategoryLabel>
        <CategoryCount>{missions.length} {missions.length === 1 ? "missão" : "missões"}</CategoryCount>
      </div>

      <Grid>
        {missions.map((mission, i) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            progress={progress[mission.slug]}
            index={i}
            onSelect={onSelectMission}
          />
        ))}
      </Grid>
    </Section>
  );
}
