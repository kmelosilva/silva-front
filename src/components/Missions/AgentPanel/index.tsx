import XPBar from "../XPBar";
import {
  Panel, Avatar, AgentName, AgentStatus,
  StatNumber, StatLabel, XPLabel,
} from "./styles";

interface AgentPanelProps {
  name: string;
  level: number;
  xp: number;
  xpNext: number;
  missionsCompleted: number;
}

export default function AgentPanel({
  name, level, xp, xpNext, missionsCompleted,
}: AgentPanelProps) {
  const xpPct = Math.round((xp / xpNext) * 100);

  return (
    <Panel>
      <div className="row align-items-center g-4">

        {/* Avatar + nome */}
        <div className="col-12 col-md-3">
          <div className="d-flex align-items-center gap-3">
            <Avatar>🕵️</Avatar>
            <div>
              <AgentName>{name}</AgentName>
              <AgentStatus>AGENTE ATIVO</AgentStatus>
            </div>
          </div>
        </div>

        {/* Missões completas */}
        <div className="col-6 col-md-2">
          <StatNumber>{missionsCompleted}</StatNumber>
          <StatLabel>MISSÕES COMPLETAS</StatLabel>
        </div>

        {/* Nível */}
        <div className="col-6 col-md-2">
          <StatNumber $accent>{level}</StatNumber>
          <StatLabel>NÍVEL ATUAL</StatLabel>
        </div>

        {/* XP bar */}
        <div className="col-12 col-md-5">
          <XPLabel>PROGRESSO — {xpPct}% para nível {level + 1}</XPLabel>
          <XPBar xp={xp} xpNext={xpNext} />
        </div>

      </div>
    </Panel>
  );
}
