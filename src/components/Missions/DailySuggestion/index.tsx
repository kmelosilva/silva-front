import type { DailySuggestion as Suggestion } from "../../../types/agent";
import { getCategoryVisual } from "../../../config/categoryConfig";
import { Card, Label, Text, Sub, OpenButton } from "./styles";

interface DailySuggestionProps {
  suggestion: Suggestion;
  onOpen: (categoryKey: string, missionSlug: string) => void;
}

export default function DailySuggestion({ suggestion, onOpen }: DailySuggestionProps) {
  const { type, mission, coordinate } = suggestion;

  if (type === "none" || !mission) {
    return (
      <Card $color="#94a3b8">
        <Label $color="#94a3b8">SUGESTÃO DO DIA</Label>
        <Text>Você concluiu todas as missões publicadas. Novas missões chegam em breve.</Text>
      </Card>
    );
  }

  const visual = getCategoryVisual(mission.category.key);

  return (
    <Card $color={visual.color}>
      <Label $color={visual.color}>SUGESTÃO DO DIA · {visual.emoji} {mission.category.label.toUpperCase()}</Label>
      {type === "next_coordinate" && coordinate ? (
        <>
          <Text>Continue <strong>{mission.title}</strong>.</Text>
          <Sub>Próxima coordenada: {coordinate.title}</Sub>
        </>
      ) : (
        <Text>Que tal começar <strong>{mission.title}</strong> hoje?</Text>
      )}
      <OpenButton type="button" $color={visual.color} onClick={() => onOpen(mission.category.key, mission.slug)}>
        {type === "next_coordinate" ? "Abrir missão →" : "Ver coordenadas →"}
      </OpenButton>
    </Card>
  );
}
