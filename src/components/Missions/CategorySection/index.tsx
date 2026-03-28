import type { Mission } from "../../../types/mission";
import { getCategoryConfig } from "../../../config/categoryConfig";
import MissionCard from "../MissionCard";
import { Section, CategoryBar, CategoryLabel, CategoryCount, Grid } from "./styles";

interface CategorySectionProps {
  category: string;
  missions: Mission[];
}

export default function CategorySection({ category, missions }: CategorySectionProps) {
  const cfg = getCategoryConfig(category);

  return (
    <Section>
      <div className="d-flex align-items-center gap-2 mb-4">
        <CategoryBar $color={cfg.color} />
        <CategoryLabel $color={cfg.color}>
          {cfg.emoji} {cfg.label.toUpperCase()}
        </CategoryLabel>
        <CategoryCount>{missions.length} missões</CategoryCount>
      </div>

      <Grid>
        {missions.map((mission, i) => (
          <MissionCard key={mission.id} mission={mission} index={i} />
        ))}
      </Grid>
    </Section>
  );
}
