import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { acceptOath, chooseCodename, completeEnlistment, getEnlistment } from "../../services/enlistmentService";
import { getPriorityAreas } from "../../services/missionService";
import { apiErrorMessage } from "../../services/agentService";
import { later } from "../../services/later";
import Logo from "../../components/Brand/Logo";
import MentorMessage from "../../components/Brand/MentorMessage";
import PriorityPicker from "../../components/Enlistment/PriorityPicker";
import type { Enlistment as EnlistmentState, PriorityAreas } from "../../types/enlistment";
import { Input, Label, SubmitButton, ErrorAlert } from "../Login/styles";
import {
  PageWrapper, Card, Header, Kicker, StepCount, Title, Lead, Oath, CodeToggle, CodeList,
  Actions, SecondaryButton, NameRow, Suffix, Codename, MentorText, Loading,
} from "./styles";

const STEP_NUMBER = { oath: 1, codename: 2, priorities: 3 } as const;

// O alistamento em três passos: juramento, codinome e prioridade. O passo vem da API,
// então fechar a aba e voltar retoma de onde parou.
export default function Enlistment() {
  const [enlistment, setEnlistment] = useState<EnlistmentState | null>(null);
  const [options, setOptions] = useState<PriorityAreas | null>(null);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [showCode, setShowCode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [loadFailed, setLoadFailed] = useState(false);

  const navigate = useNavigate();

  const load = useCallback(async () => {
    setLoadFailed(false);
    try {
      const [state, areas] = await Promise.all([getEnlistment(), getPriorityAreas()]);
      // O alistamento é uma vez só.
      if (state.step === "done") {
        navigate("/missions", { replace: true });
        return;
      }
      setEnlistment(state);
      setOptions(areas);
      setName(state.suggested_name ?? "");
      setSelected(state.priorities.map((area) => area.key));
    } catch {
      setLoadFailed(true);
    }
  }, [navigate]);

  useEffect(() => {
    load();
  }, [load]);

  const run = async (action: () => Promise<EnlistmentState>, fallback: string) => {
    setBusy(true);
    setError("");
    try {
      const state = await action();
      setEnlistment(state);
      return state;
    } catch (err) {
      setError(apiErrorMessage(err, fallback));
      return null;
    } finally {
      setBusy(false);
    }
  };

  const handleOath = () => run(acceptOath, "Não foi possível registrar o juramento. Tente de novo.");

  const handleNotNow = () => {
    later("enlistment");
    navigate("/missions");
  };

  const handleCodename = (e: React.FormEvent) => {
    e.preventDefault();
    run(() => chooseCodename(name), "Não foi possível guardar o codinome. Tente de novo.");
  };

  const handleFinish = async (priorities: string[]) => {
    const state = await run(() => completeEnlistment(priorities), "Não foi possível concluir o alistamento. Tente de novo.");
    if (state?.step === "done") {
      navigate("/missions", { replace: true, state: { enlisted: state.codename } });
    }
  };

  if (loadFailed) {
    return (
      <PageWrapper>
        <Card>
          <ErrorAlert role="alert">Não foi possível carregar sua ficha de alistamento.</ErrorAlert>
          <SubmitButton type="button" onClick={load}>Tentar de novo</SubmitButton>
        </Card>
      </PageWrapper>
    );
  }

  if (!enlistment || !options) {
    return (
      <PageWrapper>
        <Loading>Carregando sua ficha...</Loading>
      </PageWrapper>
    );
  }

  const step = enlistment.step === "done" ? "priorities" : enlistment.step;

  return (
    <PageWrapper>
      <Card>
        <Header>
          <Logo variant="coruja" height={36} />
          <div>
            <Kicker>Agência Silva · Alistamento</Kicker>
            <StepCount>Passo {STEP_NUMBER[step]} de 3</StepCount>
          </div>
        </Header>

        {error && <ErrorAlert role="alert">{error}</ErrorAlert>}

        {step === "oath" && (
          <>
            <Title>Ficha de alistamento</Title>
            <Oath>{enlistment.oath}</Oath>

            <CodeToggle
              type="button"
              aria-expanded={showCode}
              aria-controls="codigo-de-etica"
              onClick={() => setShowCode((open) => !open)}
            >
              {showCode ? "Fechar o código" : "Ler o código de ética e conduta"}
            </CodeToggle>
            {showCode && (
              <CodeList id="codigo-de-etica">
                {enlistment.code_of_conduct.map((item) => (
                  <li key={item.title}><strong>{item.title}</strong> {item.text}</li>
                ))}
              </CodeList>
            )}

            <Actions>
              <SubmitButton type="button" disabled={busy} onClick={handleOath}>Aceito o juramento</SubmitButton>
              <SecondaryButton type="button" disabled={busy} onClick={handleNotNow}>Agora não</SecondaryButton>
            </Actions>
          </>
        )}

        {step === "codename" && (
          <form onSubmit={handleCodename}>
            <MentorMessage label="Alistamento" tone="highlight">
              <MentorText>
                Juramento aceito. Bem-vindo à Agência Silva! Aqui todo mundo é Silva, e este é o seu
                codinome. Pode ajustar o nome, se quiser.
              </MentorText>
            </MentorMessage>

            <Codename>{name.trim() || "…"} {enlistment.codename_suffix}</Codename>

            <Label htmlFor="codinome">Seu nome de agente</Label>
            <NameRow>
              <Input
                id="codinome"
                value={name}
                onChange={(e) => { setName(e.target.value); if (error) setError(""); }}
                maxLength={30}
                autoComplete="off"
                required
              />
              <Suffix>{enlistment.codename_suffix}</Suffix>
            </NameRow>

            <Actions>
              <SubmitButton type="submit" disabled={busy || name.trim() === ""}>Esse é meu codinome →</SubmitButton>
            </Actions>
          </form>
        )}

        {step === "priorities" && (
          <>
            <Title>Em que área você quer evoluir primeiro?</Title>
            <Lead>Escolha até {options.max}. Dá para mudar depois.</Lead>

            <PriorityPicker
              areas={options.areas}
              max={options.max}
              selected={selected}
              onChange={setSelected}
              disabled={busy}
            />

            <Actions>
              <SubmitButton type="button" disabled={busy || selected.length === 0} onClick={() => handleFinish(selected)}>
                Concluir alistamento →
              </SubmitButton>
              <SecondaryButton type="button" disabled={busy} onClick={() => handleFinish([])}>
                Pular por agora
              </SecondaryButton>
            </Actions>
          </>
        )}
      </Card>
    </PageWrapper>
  );
}
