import type { PriorityArea } from "../../../types/enlistment";
import { getCategoryVisual } from "../../../config/categoryConfig";
import { Grid, Option, Emoji, Name, Description, Count, Counter } from "./styles";

interface PriorityPickerProps {
  areas: PriorityArea[];
  max: number;
  selected: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
}

const missionsLabel = (count: number) =>
  count === 0 ? "Missões a caminho" : `${count} ${count === 1 ? "missão" : "missões"}`;

// As áreas do catálogo como opções, até o limite, na ordem em que foram marcadas.
// Área sem missão continua escolhível: a escolha mostra à agência onde há procura.
export default function PriorityPicker({ areas, max, selected, onChange, disabled }: PriorityPickerProps) {
  const full = selected.length >= max;

  const toggle = (key: string) => {
    if (selected.includes(key)) {
      onChange(selected.filter((item) => item !== key));
    } else if (!full) {
      onChange([...selected, key]);
    }
  };

  return (
    <>
      <Grid role="group" aria-label={`Áreas de prioridade, até ${max}`}>
        {areas.map((area) => {
          const visual = getCategoryVisual(area.key);
          const checked = selected.includes(area.key);
          const blocked = !checked && full;

          return (
            <Option key={area.key} $color={visual.color} $checked={checked} $blocked={blocked}>
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled || blocked}
                onChange={() => toggle(area.key)}
              />
              <Emoji aria-hidden="true">{visual.emoji}</Emoji>
              <span>
                <Name $color={visual.color}>{area.label}</Name>
                <Description>{area.description}</Description>
                <Count>{missionsLabel(area.missions_count)}</Count>
              </span>
            </Option>
          );
        })}
      </Grid>
      <Counter aria-live="polite">
        {full ? `${selected.length} de ${max} escolhidas. Para trocar, desmarque uma.` : `${selected.length} de ${max} escolhidas.`}
      </Counter>
    </>
  );
}
