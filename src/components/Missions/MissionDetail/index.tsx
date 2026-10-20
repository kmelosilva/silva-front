import type { Mission } from "../../../types/mission";
import { getCategoryVisual } from "../../../config/categoryConfig";
import {
  Header, CategoryTag, Title, Description, Meta,
  List, Item, Step, ItemBody, ItemTitle, ItemText, ItemXP,
} from "./styles";

interface MissionDetailProps {
  mission: Mission;
}

export default function MissionDetail({ mission }: MissionDetailProps) {
  const visual = getCategoryVisual(mission.category.key);
  const count = mission.coordinates_count;

  return (
    <section>
      <Header $color={visual.color}>
        <CategoryTag $color={visual.color} $bg={visual.bg}>
          {visual.emoji} {mission.category.label.toUpperCase()}
        </CategoryTag>
        <Title>{mission.title}</Title>
        {mission.description && <Description>{mission.description}</Description>}
        <Meta>{count} {count === 1 ? "coordenada" : "coordenadas"} · {mission.xp_total} XP</Meta>
      </Header>

      <List>
        {mission.coordinates.map((coordinate, i) => (
          <Item key={coordinate.slug} style={{ animationDelay: `${i * 60}ms` }}>
            <Step $color={visual.color}>{String(i + 1).padStart(2, "0")}</Step>
            <ItemBody>
              <ItemTitle>{coordinate.title}</ItemTitle>
              <ItemText>{coordinate.content}</ItemText>
            </ItemBody>
            <ItemXP $color={visual.color}>+{coordinate.xp} XP</ItemXP>
          </Item>
        ))}
      </List>
    </section>
  );
}
