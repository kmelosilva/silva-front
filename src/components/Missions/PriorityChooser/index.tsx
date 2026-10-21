import { useEffect, useState } from "react";
import type { Agent } from "../../../types/agent";
import type { Category } from "../../../types/mission";
import type { PriorityAreas } from "../../../types/enlistment";
import { getPriorityAreas } from "../../../services/missionService";
import { apiErrorMessage, updatePriorities } from "../../../services/agentService";
import PriorityPicker from "../../Enlistment/PriorityPicker";
import { Section, Title, Lead, ErrorBox, Loading, Actions, SaveButton, CancelButton } from "./styles";

interface PriorityChooserProps {
  current: Category[];
  onSaved: (agent: Agent) => void;
  onCancel: () => void;
}

// Mudar a prioridade depois do alistamento, ou escolher pela primeira vez quem pulou.
export default function PriorityChooser({ current, onSaved, onCancel }: PriorityChooserProps) {
  const [options, setOptions] = useState<PriorityAreas | null>(null);
  const [selected, setSelected] = useState(() => current.map((area) => area.key));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getPriorityAreas()
      .then((areas) => { if (active) setOptions(areas); })
      .catch(() => { if (active) setError("Não foi possível carregar as áreas. Tente de novo."); });
    return () => {
      active = false;
    };
  }, []);

  const save = async () => {
    setBusy(true);
    setError("");
    try {
      onSaved(await updatePriorities(selected));
    } catch (err) {
      setError(apiErrorMessage(err, "Não foi possível salvar a prioridade. Tente de novo."));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Section aria-labelledby="prioridade-titulo">
      <Title id="prioridade-titulo">Sua prioridade</Title>
      <Lead>Em que área você quer evoluir primeiro? A sugestão do dia procura nelas antes das outras.</Lead>

      {error && <ErrorBox role="alert">{error}</ErrorBox>}
      {options
        ? <PriorityPicker areas={options.areas} max={options.max} selected={selected} onChange={setSelected} disabled={busy} />
        : !error && <Loading>Carregando as áreas...</Loading>}

      <Actions>
        <SaveButton type="button" disabled={busy || !options} onClick={save}>Salvar prioridade</SaveButton>
        <CancelButton type="button" disabled={busy} onClick={onCancel}>Cancelar</CancelButton>
      </Actions>
    </Section>
  );
}
