import type { DailySuggestion as Suggestion } from "../../../types/agent";
import { getCategoryVisual } from "../../../config/categoryConfig";
import MentorMessage from "../../Brand/MentorMessage";
import { Spot, Category, Text, Sub, OpenButton } from "./styles";

interface DailySuggestionProps {
  suggestion: Suggestion;
  onOpen: (categoryKey: string, missionSlug: string) => void;
}

// A sugestão do dia vem do mentor, o Agente Silva.
export default function DailySuggestion({ suggestion, onOpen }: DailySuggestionProps) {
  const { type, mission, coordinate } = suggestion;

  if (type === "none" || !mission) {
    return (
      <Spot>
        <MentorMessage label="Sugestão do dia">
          <Text>Você concluiu todas as missões publicadas. Novas missões chegam em breve.</Text>
        </MentorMessage>
      </Spot>
    );
  }

  const visual = getCategoryVisual(mission.category.key);

  return (
    <Spot>
      <MentorMessage label="Sugestão do dia" accent={visual.color}>
        <Category $color={visual.color}>{visual.emoji} {mission.category.label.toUpperCase()}</Category>
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
      </MentorMessage>
    </Spot>
  );
}
