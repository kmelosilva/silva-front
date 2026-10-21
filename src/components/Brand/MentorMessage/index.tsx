import type { ReactNode } from "react";
import Logo from "../Logo";
import { Wrapper, Seal, Body, Signature } from "./styles";

interface MentorMessageProps {
  // O assunto ao lado da assinatura, ex.: "Sugestão do dia".
  label?: string;
  // "highlight" é para os momentos da agência: missão concluída, subida de nível.
  tone?: "surface" | "highlight";
  accent?: string;
  live?: boolean;
  children: ReactNode;
}

// Uma mensagem da agência, assinada pelo Agente Silva, o mentor (nunca o agente).
export default function MentorMessage({ label, tone = "surface", accent, live, children }: MentorMessageProps) {
  return (
    <Wrapper $tone={tone} $accent={accent} role={live ? "status" : undefined} aria-live={live ? "polite" : undefined}>
      <Seal $tone={tone} aria-hidden="true">
        <Logo variant="coruja" height={20} />
      </Seal>
      <Body>
        <Signature $tone={tone}>AGENTE SILVA{label ? ` · ${label.toUpperCase()}` : ""}</Signature>
        {children}
      </Body>
    </Wrapper>
  );
}
