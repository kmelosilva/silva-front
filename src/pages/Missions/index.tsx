import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getEntryMission, getMissions } from "../../services/missionService";
import {
  acceptMission, apiErrorMessage, completeCoordinate, getAgent, getDailySuggestion, getMyMissions,
} from "../../services/agentService";
import { isLater, later } from "../../services/later";
import { getSubmentors, meetSubmentor } from "../../services/mentoringService";
import { useAppDispatch } from "../../store/hooks";
import { logoutThunk } from "../../store/auth/authActions";
import AgencyInvite from "../../components/Missions/AgencyInvite";
import AgentPanel from "../../components/Missions/AgentPanel";
import CategorySection from "../../components/Missions/CategorySection";
import DailySuggestion from "../../components/Missions/DailySuggestion";
import MissionDetail, { type Notice } from "../../components/Missions/MissionDetail";
import ModuleCard from "../../components/Missions/ModuleCard";
import PriorityChooser from "../../components/Missions/PriorityChooser";
import Logo from "../../components/Brand/Logo";
import { colors } from "../../theme/tokens";
import type { Category, Coordinate, Mission } from "../../types/mission";
import type { Reflection, Submentor } from "../../types/mentoring";
import type {
  Agent, CompletionResult, DailySuggestion as Suggestion, MissionProgress,
} from "../../types/agent";
import {
  PageWrapper, Navbar, NavBrand, Badge,
  LogoutButton, Content, ModulesGrid, BackButton,
  MissionsWrapper, EmptyState, ErrorBox, LoadingState,
} from "./styles";

// Sequência zerada é um convite, nunca uma perda.
const streakLabel = (current: number) =>
  current === 0 ? "comece hoje" : `${current} ${current === 1 ? "dia" : "dias"}`;

// O aviso depois de cumprir: missão concluída em destaque, depois o XP e o nível.
// Missão concluída e subida de nível são momentos da agência, assinados pelo mentor.
function completionNotice({ result, agent }: CompletionResult, mission: Mission): Notice {
  if (result.already_completed) {
    return { tone: "info", text: "Essa coordenada já estava cumprida." };
  }

  const parts: string[] = [];
  if (result.mission_completed && mission.category === null) {
    parts.push("Missão de entrada concluída! Agora você é um agente da Silva de verdade.");
  } else if (result.mission_completed) {
    parts.push(mission.coordinates_count === 1
      ? "Missão concluída! Você cumpriu a coordenada desta missão."
      : `Missão concluída! Você cumpriu as ${mission.coordinates_count} coordenadas.`);
  }
  parts.push(`+${result.xp_gained} XP. Coordenada cumprida.`);
  if (result.levels_gained > 0) {
    parts.push(`Você subiu para o nível ${agent.level}!`);
  }

  const fromAgency = result.mission_completed || result.levels_gained > 0;
  return { tone: fromAgency ? "highlight" : "success", text: parts.join(" ") };
}

// O estado que o alistamento deixa na navegação: o codinome de quem acabou de se alistar.
function welcomeFrom(state: unknown): Notice | null {
  if (!state || typeof state !== "object" || !("enlisted" in state)) return null;
  const codename = typeof state.enlisted === "string" ? `, ${state.enlisted}` : "";
  return { tone: "highlight", text: `Alistamento concluído${codename}! Sua primeira missão já está em andamento.` };
}

const bySlug = (list: MissionProgress[]) =>
  Object.fromEntries(list.map((item) => [item.mission_slug, item]));

interface MissionGroup {
  category: Category;
  missions: Mission[];
}

// Agrupa pela categoria que a API mandou, na ordem em que as missões chegam.
// As missões dos módulos sempre têm categoria; só a de entrada não tem, e ela não vem aqui.
function groupByCategory(missions: Mission[]): MissionGroup[] {
  const groups = new Map<string, MissionGroup>();

  for (const mission of missions) {
    const category = mission.category;
    if (!category) continue;

    const group = groups.get(category.key);
    if (group) {
      group.missions.push(mission);
    } else {
      groups.set(category.key, { category, missions: [mission] });
    }
  }

  return [...groups.values()];
}

export default function Missions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [progress, setProgress] = useState<Record<string, MissionProgress>>({});
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [suggestionStale, setSuggestionStale] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [entryMission, setEntryMission] = useState<Mission | null>(null);
  const [submentors, setSubmentors] = useState<Submentor[]>([]);
  // A coordenada recém-cumprida que oferece a reflexão.
  const [reflectingOn, setReflectingOn] = useState<string | null>(null);
  const [choosingPriority, setChoosingPriority] = useState(false);
  const [priorityLater, setPriorityLater] = useState(() => isLater("priorities"));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Vindo do alistamento, a página abre a primeira missão com a boas-vindas do mentor.
  const [welcome] = useState(() => welcomeFrom(location.state));

  // Uma carga desmontada (ou repetida pelo StrictMode) não pode mexer na tela: sem isso, a
  // segunda resposta reabria a missão de entrada depois de o agente já ter saído dela.
  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        // Sem os submentores, as missões funcionam como antes: a mentoria nunca segura a página.
        const [catalog, panel, mine, today, ninho] = await Promise.all([
          getMissions(), getAgent(), getMyMissions(), getDailySuggestion(),
          getSubmentors().catch(() => [] as Submentor[]),
        ]);
        if (!active) return;

        // Quem ainda não se alistou vai para o alistamento, a não ser que tenha dito
        // "agora não" nesta sessão.
        if (!panel.enlisted && !isLater("enlistment")) {
          navigate("/alistamento", { replace: true });
          return;
        }

        // A missão de entrada fica fora dos módulos: só é buscada quando vai aparecer.
        const entryShown = welcome !== null || (today.mission !== null && today.mission.category === null);
        const entry = entryShown ? await getEntryMission().catch(() => null) : null;
        if (!active) return;

        setMissions(catalog);
        setAgent(panel);
        setProgress(bySlug(mine));
        setSuggestion(today);
        setEntryMission(entry);
        setSubmentors(ninho);

        if (welcome !== null && entry) {
          setSelectedSlug(entry.slug);
          setNotice(welcome);
        }
        if (welcome !== null) {
          // A boas-vindas aparece uma vez: recarregar a página não a repete.
          navigate("/missions", { replace: true, state: null });
        }
      } catch {
        if (active) setError("Não foi possível carregar as missões.");
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchData();

    return () => {
      active = false;
    };
  }, [navigate, welcome]);

  // A sugestão só aparece nos módulos: depois de aceitar ou cumprir, busca de novo quando o
  // agente volta para lá, sem disputar o servidor com o próximo clique.
  useEffect(() => {
    if (selectedCategory || selectedSlug || choosingPriority || !suggestionStale) return;

    let active = true;
    getDailySuggestion()
      .then((today) => {
        if (!active) return;
        setSuggestion(today);
        setSuggestionStale(false);
      })
      .catch(() => {
        // Fica a sugestão anterior.
      });

    return () => {
      active = false;
    };
  }, [selectedCategory, selectedSlug, choosingPriority, suggestionStale]);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/");
  };

  const groups = useMemo(() => groupByCategory(missions), [missions]);
  const selectedGroup = groups.find((group) => group.category.key === selectedCategory);
  // A missão de entrada não está em nenhum módulo: abre sem categoria selecionada.
  const selectedMission = selectedGroup?.missions.find((mission) => mission.slug === selectedSlug)
    ?? (selectedSlug !== null && entryMission?.slug === selectedSlug ? entryMission : undefined);

  // O submentor da área da missão; a de entrada não tem.
  const submentorOf = (mission: Mission) =>
    submentors.find((submentor) => submentor.area.key === mission.category?.key);

  // A apresentação vista não volta sozinha; se a API falhar, ela volta na próxima visita.
  const handleMeet = (met: Submentor) => {
    setSubmentors((current) =>
      current.map((submentor) => (submentor.area.key === met.area.key ? { ...submentor, met: true } : submentor)));
    meetSubmentor(met.area.key).catch(() => {});
  };

  const openMission = (slug: string | null) => {
    setNotice(null);
    setReflectingOn(null);
    setSelectedSlug(slug);
  };

  const closeModule = () => {
    openMission(null);
    setSelectedCategory(null);
  };

  const openSuggested = (categoryKey: string | null, missionSlug: string) => {
    setSelectedCategory(categoryKey);
    openMission(missionSlug);
  };

  const openPriorities = () => {
    closeModule();
    setChoosingPriority(true);
  };

  const savePriorities = (updated: Agent) => {
    setAgent(updated);
    setChoosingPriority(false);
    setSuggestionStale(true);
  };

  const saveProgress = (item: MissionProgress) =>
    setProgress((current) => ({ ...current, [item.mission_slug]: item }));

  // Depois de uma recusa, o progresso da tela pode estar velho: busca de novo.
  const resync = async () => {
    try {
      setProgress(bySlug(await getMyMissions()));
    } catch {
      // Mantém o que está na tela; o aviso de erro já foi mostrado.
    }
  };

  // "Agora não" fecha a caixa; respondida, a resposta fica na tela até o próximo passo.
  const handleReflectionFinish = (reflection: Reflection | null) => {
    if (reflection === null) setReflectingOn(null);
  };

  const handleAccept = async (mission: Mission) => {
    setBusy(true);
    setNotice(null);
    try {
      saveProgress(await acceptMission(mission.slug));
      // Com briefing, quem recebe o agente é o submentor da área (RF-02).
      setNotice(mission.briefing && submentorOf(mission)
        ? { tone: "briefing", text: mission.briefing }
        : { tone: "success", text: "Missão aceita. Comece pela coordenada 1." });
      setSuggestionStale(true);
    } catch (err) {
      setNotice({ tone: "error", text: apiErrorMessage(err, "Não foi possível aceitar a missão. Tente de novo.") });
      await resync();
    } finally {
      setBusy(false);
    }
  };

  const handleComplete = async (mission: Mission, coordinate: Coordinate) => {
    setBusy(true);
    setNotice(null);
    setReflectingOn(null);
    try {
      const completion = await completeCoordinate(mission.slug, coordinate.slug);
      saveProgress(completion.progress);
      setAgent(completion.agent);
      setNotice(completionNotice(completion, mission));
      setSuggestionStale(true);
      // O XP já chegou; escrever é opcional e vem depois (RF-03).
      if (submentorOf(mission) && !completion.result.already_completed) {
        setReflectingOn(coordinate.slug);
      }
    } catch (err) {
      setNotice({ tone: "error", text: apiErrorMessage(err, "Não foi possível marcar a coordenada. Tente de novo.") });
      await resync();
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageWrapper>

      {/* Navbar */}
      <Navbar className="d-flex align-items-center justify-content-between">
        <NavBrand><Logo height={28} /></NavBrand>
        <div className="d-flex align-items-center gap-2">
          {agent && (
            <>
              <Badge $color={colors.attention}>
                🔥 {streakLabel(agent.streak.current)}
              </Badge>
              <Badge $color={colors.focus}>
                LVL {agent.level}
              </Badge>
            </>
          )}
          <LogoutButton onClick={handleLogout}>SAIR</LogoutButton>
        </div>
      </Navbar>

      <Content>

        {/* Painel do agente */}
        {agent && <AgentPanel agent={agent} onChangePriorities={openPriorities} />}

        {/* Estados */}
        {loading && (
          <LoadingState>
            <div style={{ fontSize: 32, marginBottom: 16 }}>⟳</div>
            CARREGANDO MISSÕES...
          </LoadingState>
        )}

        {error && <ErrorBox>⚠ {error}</ErrorBox>}

        {/* Módulos → missões do módulo → coordenadas da missão */}
        {!loading && !error && (
          <MissionsWrapper>
            {choosingPriority && agent ? (
              <PriorityChooser
                current={agent.priorities}
                onSaved={savePriorities}
                onCancel={() => setChoosingPriority(false)}
              />
            ) : selectedMission ? (
              <>
                {selectedGroup ? (
                  <BackButton onClick={() => openMission(null)}>
                    ← Voltar às missões
                  </BackButton>
                ) : (
                  <BackButton onClick={closeModule}>
                    ← Voltar aos módulos
                  </BackButton>
                )}
                <MissionDetail
                  key={selectedMission.slug}
                  mission={selectedMission}
                  progress={progress[selectedMission.slug]}
                  submentor={submentorOf(selectedMission)}
                  busy={busy}
                  notice={notice}
                  reflectingOn={reflectingOn}
                  onAccept={() => handleAccept(selectedMission)}
                  onComplete={(coordinate) => handleComplete(selectedMission, coordinate)}
                  onMeet={handleMeet}
                  onReflectionFinish={handleReflectionFinish}
                />
              </>
            ) : selectedGroup ? (
              <>
                <BackButton onClick={closeModule}>
                  ← Voltar aos módulos
                </BackButton>
                <CategorySection
                  category={selectedGroup.category}
                  missions={selectedGroup.missions}
                  progress={progress}
                  onSelectMission={(mission) => openMission(mission.slug)}
                />
              </>
            ) : (
              <>
                {agent && !agent.enlisted && (
                  <AgencyInvite
                    label="Alistamento"
                    text="Sua ficha de alistamento está esperando por você."
                    actionLabel="Continuar alistamento →"
                    onAction={() => navigate("/alistamento")}
                  />
                )}
                {agent?.enlisted && agent.priorities.length === 0 && !priorityLater && (
                  <AgencyInvite
                    label="Prioridade"
                    text="Em que área você quer evoluir primeiro? Assim a sugestão do dia fica do seu jeito."
                    actionLabel="Escolher prioridade"
                    onAction={openPriorities}
                    onLater={() => { later("priorities"); setPriorityLater(true); }}
                  />
                )}
                {suggestion && <DailySuggestion suggestion={suggestion} onOpen={openSuggested} />}
                <ModulesGrid>
                  {groups.map((group, i) => (
                    <ModuleCard
                      key={group.category.key}
                      category={group.category}
                      count={group.missions.length}
                      index={i}
                      onClick={() => setSelectedCategory(group.category.key)}
                    />
                  ))}
                </ModulesGrid>
              </>
            )}

            {missions.length === 0 && (
              <EmptyState>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
                NENHUMA MISSÃO PUBLICADA AINDA
              </EmptyState>
            )}
          </MissionsWrapper>
        )}

      </Content>
    </PageWrapper>
  );
}
