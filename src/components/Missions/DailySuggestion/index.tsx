import type { DailySuggestion as Suggestion } from "../../../types/agent";
import { categoryLabel, getCategoryVisual } from "../../../config/categoryConfig";
import MentorMessage from "../../Brand/MentorMessage";
import { Spot, Category, Note, Text, Sub, OpenButton } from "./styles";

interface DailySuggestionProps {
  suggestion: Suggestion;
  // categoryKey nulo: a missão de entrada.
  onOpen: (categoryKey: string | null, missionSlug: string) => void;
}

const joinLabels = (labels: string[]) =>
  labels.length > 1 ? `${labels.slice(0, -1).join(", ")} e ${labels[labels.length - 1]}` : labels[0];

// A sugestão do dia vem do mentor, o Agente Silva.
export default function DailySuggestion({ suggestion, onOpen }: DailySuggestionProps) {
  const { type, mission, coordinate, unavailable_priorities: unavailable } = suggestion;
  // A área escolhida sem missão nova é dita com honestidade, antes da outra sugestão.
  const gap = unavailable.length > 0
    ? `Por enquanto, não há missão nova de ${joinLabels(unavailable.map((area) => area.label))} para você.`
    : null;

  if (type === "none" || !mission) {
    return (
      <Spot>
        <MentorMessage label="Sugestão do dia">
          {gap && <Note>{gap}</Note>}
          <Text>Você concluiu todas as missões publicadas. Novas missões chegam em breve.</Text>
        </MentorMessage>
      </Spot>
    );
  }

  const visual = getCategoryVisual(mission.category?.key);

  return (
    <Spot>
      <MentorMessage label="Sugestão do dia" accent={visual.color}>
        <Category $color={visual.color}>{visual.emoji} {categoryLabel(mission.category).toUpperCase()}</Category>
        {type === "next_coordinate" && coordinate ? (
          <>
            <Text>Continue <strong>{mission.title}</strong>.</Text>
            <Sub>Próxima coordenada: {coordinate.title}</Sub>
          </>
        ) : (
          <>
            {gap && <Note>{gap} Enquanto isso:</Note>}
            <Text>Que tal começar <strong>{mission.title}</strong> hoje?</Text>
          </>
        )}
        <OpenButton type="button" $color={visual.color} onClick={() => onOpen(mission.category?.key ?? null, mission.slug)}>
          {type === "next_coordinate" ? "Abrir missão →" : "Ver coordenadas →"}
        </OpenButton>
      </MentorMessage>
    </Spot>
  );
}
