import { useId, useState } from "react";
import { isAxiosError } from "axios";
import type { Coordinate } from "../../../types/mission";
import type { Reflection, Submentor } from "../../../types/mentoring";
import { apiErrorMessage } from "../../../services/agentService";
import { sendReflection } from "../../../services/mentoringService";
import { submentorPortrait } from "../../../config/submentorConfig";
import MentorMessage from "../../Brand/MentorMessage";
import CareMessage from "../CareMessage";
import ContactLinks from "../ContactLinks";
import {
  Box, Prompt, Field, Counter, Notice, Footer, Actions, SendButton, LaterButton, FieldError, Written, Answer,
} from "./styles";

const MAX_LENGTH = 500;

interface ReflectionBoxProps {
  submentor: Submentor;
  missionSlug: string;
  coordinate: Coordinate;
  accent: string;
  // Chamado com a reflexão respondida, ou com null em "Agora não".
  onFinish: (reflection: Reflection | null) => void;
}

// Recusa sem texto em PT-BR (limite de envios) e falha de rede têm mensagem própria.
function errorMessage(error: unknown): string {
  if (isAxiosError(error) && !error.response) return "Não deu para enviar agora. Tente de novo.";
  if (isAxiosError(error) && error.response?.status === 429) {
    return "Foram muitos envios em pouco tempo. Espere um minuto e tente de novo.";
  }
  return apiErrorMessage(error, "Não deu para enviar agora. Tente de novo.");
}

// A reflexão depois de cumprir a coordenada (RF-03): opcional, até 500 caracteres, com o
// aviso de IA e a linha do CVV sempre visíveis. O XP já chegou antes dela.
export default function ReflectionBox({ submentor, missionSlug, coordinate, accent, onFinish }: ReflectionBoxProps) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [reflection, setReflection] = useState<Reflection | null>(null);
  const ids = useId();

  const send = async () => {
    setSending(true);
    setError("");
    try {
      const answered = await sendReflection(missionSlug, coordinate.slug, text);
      setReflection(answered);
      onFinish(answered);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSending(false);
    }
  };

  if (reflection) {
    return (
      <Box $accent={accent}>
        <Written>
          <span>Você escreveu</span>
          {reflection.text}
        </Written>
        <Answer>
          {reflection.reply_source === "care" ? (
            <CareMessage text={reflection.reply} />
          ) : (
            <MentorMessage
              signer={{ name: submentor.codename, image: submentorPortrait(submentor.area.key) }}
              label={submentor.area.label}
              accent={accent}
              live
            >
              {reflection.reply}
            </MentorMessage>
          )}
        </Answer>
        <Footer><ContactLinks text={submentor.care_footer} /></Footer>
      </Box>
    );
  }

  return (
    <Box $accent={accent} aria-labelledby={`${ids}-prompt`}>
      <Prompt id={`${ids}-prompt`}>Como foi? Se quiser, conte para {submentor.codename}.</Prompt>
      <Field
        value={text}
        onChange={(event) => setText(event.target.value)}
        maxLength={MAX_LENGTH}
        rows={4}
        disabled={sending}
        aria-labelledby={`${ids}-prompt`}
        aria-describedby={`${ids}-counter ${ids}-notice${error ? ` ${ids}-error` : ""}`}
        aria-invalid={error ? true : undefined}
        placeholder="O que você viveu nessa coordenada?"
      />
      <Counter id={`${ids}-counter`}>{text.length}/{MAX_LENGTH}</Counter>
      {error && <FieldError id={`${ids}-error`} role="alert">{error}</FieldError>}
      <Notice id={`${ids}-notice`}>{submentor.notice}</Notice>
      <Actions>
        <SendButton type="button" $accent={accent} disabled={sending || text.trim() === ""} onClick={send}>
          {sending ? `${submentor.codename} está lendo…` : "Enviar"}
        </SendButton>
        <LaterButton type="button" disabled={sending} onClick={() => onFinish(null)}>
          Agora não
        </LaterButton>
      </Actions>
      <span className="visually-hidden" role="status">{sending ? `${submentor.codename} está lendo…` : ""}</span>
      <Footer><ContactLinks text={submentor.care_footer} /></Footer>
    </Box>
  );
}
