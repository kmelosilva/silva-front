import { useState } from "react";
import type { Coordinate, Mission } from "../../../types/mission";
import type { MissionProgress } from "../../../types/agent";
import type { Submentor } from "../../../types/mentoring";
import { categoryLabel, getCategoryVisual } from "../../../config/categoryConfig";
import { submentorPortrait } from "../../../config/submentorConfig";
import MentorMessage from "../../Brand/MentorMessage";
import Portrait from "../../Brand/Portrait";
import SubmentorIntro from "../../Mentoring/SubmentorIntro";
import {
  Header, CategoryTag, StatusTag, Title, Description, Meta, AcceptButton, NoticeBox, NoticeSpot,
  MessageSpot, MessageHint, PortraitButton,
  List, Item, Step, ItemBody, ItemTitle, CareNote, ItemText, ItemXP, CompleteButton,
} from "./styles";

export interface Notice {
  // "briefing" é a fala do submentor ao aceitar; "highlight" é do Agente Silva.
  tone: "success" | "highlight" | "info" | "error" | "briefing";
  text: string;
}

interface MissionDetailProps {
  mission: Mission;
  progress?: MissionProgress;
  // O submentor da área; a missão de entrada não tem (fala o Agente Silva).
  submentor?: Submentor;
  busy: boolean;
  notice: Notice | null;
  onAccept: () => void;
  onComplete: (coordinate: Coordinate) => void;
  onMeet: (submentor: Submentor) => void;
}

export default function MissionDetail({
  mission, progress, submentor, busy, notice, onAccept, onComplete, onMeet,
}: MissionDetailProps) {
  const visual = getCategoryVisual(mission.category?.key);
  const count = mission.coordinates_count;
  const done = progress?.completed_coordinates ?? [];
  const completed = progress?.status === "completed";
  // A apresentação abre sozinha na primeira visita à área, e de novo pelo retrato.
  const [introOpen, setIntroOpen] = useState(() => submentor !== undefined && !submentor.met);
  const portrait = submentor ? submentorPortrait(submentor.area.key) : null;
  const signer = submentor ? { name: submentor.codename, image: portrait } : undefined;

  const closeIntro = () => {
    setIntroOpen(false);
    if (submentor && !submentor.met) onMeet(submentor);
  };

  return (
    <section>
      {submentor && introOpen && <SubmentorIntro submentor={submentor} onClose={closeIntro} />}

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
          {submentor && !introOpen && (
            <PortraitButton
              type="button"
              $color={visual.color}
              onClick={() => setIntroOpen(true)}
              aria-label={`Rever a apresentação de ${submentor.codename}`}
            >
              {portrait ? <Portrait src={portrait} size={32} accent={visual.color} /> : visual.emoji}
              {submentor.codename}
            </PortraitButton>
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

      {/* O briefing é do submentor da área, logo depois de aceitar (RF-02). */}
      {notice?.tone === "briefing" && submentor && (
        <MessageSpot>
          <MentorMessage signer={signer} label={submentor.area.label} accent={visual.color} live>
            <p>{notice.text}</p>
            <MessageHint>Missão aceita. Comece pela coordenada 1.</MessageHint>
          </MentorMessage>
        </MessageSpot>
      )}

      {/* Missão concluída e subida de nível são da agência: quem fala é o Agente Silva. */}
      {notice?.tone === "highlight" && (
        <NoticeSpot>
          <MentorMessage tone="highlight" live>{notice.text}</MentorMessage>
        </NoticeSpot>
      )}
      {notice && notice.tone !== "highlight" && notice.tone !== "briefing" && (
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
