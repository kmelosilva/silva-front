import { useEffect, useState } from "react";
import type { Mission } from "../../../types/mission";
import type { Reflection, Submentor } from "../../../types/mentoring";
import { fillMarkers, getReflections } from "../../../services/mentoringService";
import { submentorPortrait } from "../../../config/submentorConfig";
import MentorMessage from "../../Brand/MentorMessage";
import { Spot, Path, PathTitle, Step, StepTitle, StepText } from "./styles";

interface MissionClosingProps {
  submentor: Submentor;
  mission: Mission;
  codename: string;
  accent: string;
}

// O fechamento da missão (RF-05): o texto escrito do submentor e as reflexões do agente
// nessa missão, nas palavras dele, sem gerar texto novo.
export default function MissionClosing({ submentor, mission, codename, accent }: MissionClosingProps) {
  const [reflections, setReflections] = useState<Reflection[]>([]);

  useEffect(() => {
    let active = true;
    getReflections(mission.slug)
      .then((list) => {
        if (active) setReflections(list);
      })
      .catch(() => {
        // Sem a lista, o fechamento sai só com o texto do submentor.
      });

    return () => {
      active = false;
    };
  }, [mission.slug]);

  // A mensagem de cuidado não volta no fechamento: só o que o agente escreveu, com resposta de submentor.
  const path = reflections.filter((reflection) => reflection.reply_source !== "care");

  return (
    <Spot>
      <MentorMessage
        signer={{ name: submentor.codename, image: submentorPortrait(submentor.area.key) }}
        label={submentor.area.label}
        accent={accent}
        tone="highlight"
        live
      >
        <p>{fillMarkers(submentor.closing, { codinome: codename, missao: mission.title })}</p>
        {path.length > 0 && (
          <Path>
            <PathTitle>O caminho que você contou</PathTitle>
            {path.map((reflection) => (
              <Step key={reflection.id} $accent={accent}>
                <StepTitle>{reflection.coordinate_title}</StepTitle>
                <StepText>{reflection.text}</StepText>
              </Step>
            ))}
          </Path>
        )}
      </MentorMessage>
    </Spot>
  );
}
