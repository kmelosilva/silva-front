import { Wrapper, Labels, Track, Fill } from "./styles";

interface XPBarProps {
  xp: number;
  xpNext: number;
}

export default function XPBar({ xp, xpNext }: XPBarProps) {
  const pct = Math.round((xp / xpNext) * 100);

  return (
    <Wrapper>
      <Labels>
        <span>{xp.toLocaleString()} XP</span>
        <span>{xpNext.toLocaleString()} XP</span>
      </Labels>
      <Track>
        <Fill $pct={pct} />
      </Track>
    </Wrapper>
  );
}
