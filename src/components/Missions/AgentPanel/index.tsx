import type { Agent } from "../../../types/agent";
import XPBar from "../XPBar";
import {
  Panel, Avatar, AgentName, AgentStatus,
  StatNumber, StatLabel, XPLabel, Hint,
} from "./styles";

interface AgentPanelProps {
  agent: Agent;
}

const days = (count: number) => `${count} ${count === 1 ? "dia" : "dias"}`;

// Primeira letra do primeiro e do último nome, até existir avatar personalizável.
function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = Array.from(words[0])[0];
  const last = words.length > 1 ? Array.from(words[words.length - 1])[0] : "";
  return (first + last).toUpperCase();
}

export default function AgentPanel({ agent }: AgentPanelProps) {
  const missing = Math.max(agent.next_level_xp - agent.xp, 0);

  return (
    <Panel>
      <div className="row align-items-center g-4">

        {/* Avatar + nome */}
        <div className="col-12 col-md-3">
          <div className="d-flex align-items-center gap-3">
            <Avatar role="img" aria-label={`Iniciais de ${agent.name}`}>{initials(agent.name)}</Avatar>
            <div>
              <AgentName>{agent.name}</AgentName>
              <AgentStatus>AGENTE ATIVO</AgentStatus>
            </div>
          </div>
        </div>

        {/* Missões concluídas */}
        <div className="col-6 col-md-2">
          <StatNumber>{agent.missions_completed}</StatNumber>
          <StatLabel>MISSÕES CONCLUÍDAS</StatLabel>
        </div>

        {/* Nível */}
        <div className="col-6 col-md-2">
          <StatNumber $accent>{agent.level}</StatNumber>
          <StatLabel>NÍVEL ATUAL</StatLabel>
        </div>

        {/* XP bar */}
        <div className="col-12 col-md-5">
          <XPLabel>FALTAM {missing.toLocaleString("pt-BR")} XP PARA O NÍVEL {agent.level + 1}</XPLabel>
          <XPBar xp={agent.xp} from={agent.level_xp} to={agent.next_level_xp} />
          {agent.streak.best > 0 && (
            <Hint>Melhor sequência: {days(agent.streak.best)}</Hint>
          )}
        </div>

      </div>
    </Panel>
  );
}
