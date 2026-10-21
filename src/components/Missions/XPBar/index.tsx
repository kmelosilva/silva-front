import { Wrapper, Labels, Track, Fill } from "./styles";

interface XPBarProps {
  xp: number;
  from: number;
  to: number;
}

// Progresso dentro do nível atual: de `from` (início do nível) a `to` (próximo nível).
export default function XPBar({ xp, from, to }: XPBarProps) {
  const span = Math.max(to - from, 1);
  const pct = Math.min(100, Math.max(0, Math.round(((xp - from) / span) * 100)));

  return (
    <Wrapper>
      <Labels>
        <span>{xp.toLocaleString("pt-BR")} XP</span>
        <span>{to.toLocaleString("pt-BR")} XP</span>
      </Labels>
      <Track role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        <Fill $pct={pct} />
      </Track>
    </Wrapper>
  );
}
