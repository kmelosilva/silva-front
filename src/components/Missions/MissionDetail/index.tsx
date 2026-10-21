import type { Coordinate, Mission } from "../../../types/mission";
import type { MissionProgress } from "../../../types/agent";
import { categoryLabel, getCategoryVisual } from "../../../config/categoryConfig";
import MentorMessage from "../../Brand/MentorMessage";
import {
  Header, CategoryTag, StatusTag, Title, Description, Meta, AcceptButton, NoticeBox, NoticeSpot,
  List, Item, Step, ItemBody, ItemTitle, CareNote, ItemText, ItemXP, CompleteButton,
} from "./styles";

export interface Notice {
  tone: "success" | "highlight" | "info" | "error";
  text: string;
}

interface MissionDetailProps {
  mission: Mission;
  progress?: MissionProgress;
  busy: boolean;
  notice: Notice | null;
  onAccept: () => void;
  onComplete: (coordinate: Coordinate) => void;
}

export default function MissionDetail({
  mission, progress, busy, notice, onAccept, onComplete,
}: MissionDetailProps) {
  const visual = getCategoryVisual(mission.category?.key);
  const count = mission.coordinates_count;
  const done = progress?.completed_coordinates ?? [];
  const completed = progress?.status === "completed";

  return (
    <section>
      <Header $color={visual.color}>
        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
          <CategoryTag $color={visual.color} $bg={visual.bg}>
            {visual.emoji} {categoryLabel(mission.category).toUpperCase()}
          </CategoryTag>
          {progress && (
            <StatusTag $done={completed}>
              {completed ? "MISSÃO CONCLUÍDA ✓" : `EM ANDAMENTO · ${done.length}/${count}`}
            </StatusTag>
          )}
        </div>
        <Title>{mission.title}</Title>
        {mission.description && <Description>{mission.description}</Description>}
        <Meta>{count} {count === 1 ? "coordenada" : "coordenadas"} · {mission.xp_total} XP</Meta>

        {!progress && (
          <AcceptButton type="button" disabled={busy} onClick={onAccept}>
            Aceitar missão →
          </AcceptButton>
        )}
      </Header>

      {/* Missão concluída e subida de nível são da agência: quem fala é o Agente Silva. */}
      {notice?.tone === "highlight" && (
        <NoticeSpot>
          <MentorMessage tone="highlight" live>{notice.text}</MentorMessage>
        </NoticeSpot>
      )}
      {notice && notice.tone !== "highlight" && (
        <NoticeBox $tone={notice.tone} role="status" aria-live="polite">
          {notice.text}
        </NoticeBox>
      )}

      <List>
        {mission.coordinates.map((coordinate, i) => {
          const isDone = done.includes(coordinate.slug);
          const isNext = progress?.next_coordinate === coordinate.slug;

          return (
            <Item
              key={coordinate.slug}
              $color={visual.color}
              $state={isDone ? "done" : isNext ? "next" : "idle"}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Step $color={visual.color} aria-label={isDone ? `Coordenada ${i + 1}, cumprida` : undefined}>
                {isDone ? "✓" : String(i + 1).padStart(2, "0")}
              </Step>
              <ItemBody>
                <ItemTitle>{coordinate.title}</ItemTitle>
                {coordinate.care_notice && (
                  <CareNote role="note">
                    <strong>No seu ritmo</strong>
                    {coordinate.care_notice}
                  </CareNote>
                )}
                <ItemText>{coordinate.content}</ItemText>
                {isNext && (
                  <CompleteButton
                    type="button"
                    $color={visual.color}
                    disabled={busy}
                    onClick={() => onComplete(coordinate)}
                  >
                    Marcar como cumprida
                  </CompleteButton>
                )}
              </ItemBody>
              <ItemXP $color={visual.color}>+{coordinate.xp} XP</ItemXP>
            </Item>
          );
        })}
      </List>
    </section>
  );
}
