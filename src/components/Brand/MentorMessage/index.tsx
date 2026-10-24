import type { ReactNode } from "react";
import Logo from "../Logo";
import Portrait from "../Portrait";
import { Wrapper, Seal, Body, Signature } from "./styles";

// Quem assina, quando não é o Agente Silva: um submentor do Ninho, com o retrato.
export interface Signer {
  name: string;
  image: string | null;
}

interface MentorMessageProps {
  // O assunto ao lado da assinatura, ex.: "Sugestão do dia".
  label?: string;
  // "highlight" é para os momentos da agência: missão concluída, subida de nível.
  tone?: "surface" | "highlight";
  accent?: string;
  live?: boolean;
  // Sem ele, assina o Agente Silva.
  signer?: Signer;
  children: ReactNode;
}

// Uma mensagem da agência, assinada pelo Agente Silva, o mentor (nunca o agente), ou por
// um submentor do Ninho, dentro das missões da área dele.
export default function MentorMessage({ label, tone = "surface", accent, live, signer, children }: MentorMessageProps) {
  const name = signer?.name ?? "Agente Silva";

  return (
    <Wrapper $tone={tone} $accent={accent} role={live ? "status" : undefined} aria-live={live ? "polite" : undefined}>
      {signer?.image ? (
        <Portrait src={signer.image} size={40} accent={accent} />
      ) : (
        <Seal $tone={tone} aria-hidden="true">
          <Logo variant="coruja" height={20} />
        </Seal>
      )}
      <Body>
        <Signature $tone={tone}>{name.toUpperCase()}{label ? ` · ${label.toUpperCase()}` : ""}</Signature>
        {children}
      </Body>
    </Wrapper>
  );
}
