import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMissions } from "../../services/missionService";
import {
  acceptMission, apiErrorMessage, completeCoordinate, getAgent, getDailySuggestion, getMyMissions,
} from "../../services/agentService";
import { useAppDispatch } from "../../store/hooks";
import { logoutThunk } from "../../store/auth/authActions";
import AgentPanel from "../../components/Missions/AgentPanel";
import CategorySection from "../../components/Missions/CategorySection";
import DailySuggestion from "../../components/Missions/DailySuggestion";
import MissionDetail, { type Notice } from "../../components/Missions/MissionDetail";
import ModuleCard from "../../components/Missions/ModuleCard";
import type { Category, Coordinate, Mission } from "../../types/mission";
import type {
  Agent, CompletionResult, DailySuggestion as Suggestion, MissionProgress,
} from "../../types/agent";
import {
  GlobalMissions, PageWrapper, Navbar, NavBrand, Badge,
  LogoutButton, Content, ModulesGrid, BackButton,
  MissionsWrapper, EmptyState, ErrorBox, LoadingState,
} from "./styles";

// Sequência zerada é um convite, nunca uma perda.
const streakLabel = (current: number) =>
  current === 0 ? "comece hoje" : `${current} ${current === 1 ? "dia" : "dias"}`;

// O aviso depois de cumprir: missão concluída em destaque, depois o XP e o nível.
function completionNotice({ result, agent }: CompletionResult, mission: Mission): Notice {
  if (result.already_completed) {
    return { tone: "info", text: "Essa coordenada já estava cumprida." };
  }

  const parts: string[] = [];
  if (result.mission_completed) {
    parts.push(mission.coordinates_count === 1
      ? "Missão concluída! Você cumpriu a coordenada desta missão."
      : `Missão concluída! Você cumpriu as ${mission.coordinates_count} coordenadas.`);
  }
  parts.push(`+${result.xp_gained} XP. Coordenada cumprida.`);
  if (result.levels_gained > 0) {
    parts.push(`Você subiu para o nível ${agent.level}!`);
  }

  return { tone: result.mission_completed ? "highlight" : "success", text: parts.join(" ") };
}

const bySlug = (list: MissionProgress[]) =>
  Object.fromEntries(list.map((item) => [item.mission_slug, item]));

interface MissionGroup {
  category: Category;
  missions: Mission[];
}

// Agrupa pela categoria que a API mandou, na ordem em que as missões chegam.
function groupByCategory(missions: Mission[]): MissionGroup[] {
  const groups = new Map<string, MissionGroup>();

  for (const mission of missions) {
    const group = groups.get(mission.category.key);
    if (group) {
      group.missions.push(mission);
    } else {
      groups.set(mission.category.key, { category: mission.category, missions: [mission] });
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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catalog, panel, mine, today] = await Promise.all([
          getMissions(), getAgent(), getMyMissions(), getDailySuggestion(),
        ]);
        setMissions(catalog);
        setAgent(panel);
        setProgress(bySlug(mine));
        setSuggestion(today);
      } catch {
        setError("Não foi possível carregar as missões.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // A sugestão só aparece nos módulos: depois de aceitar ou cumprir, busca de novo quando o
  // agente volta para lá, sem disputar o servidor com o próximo clique.
  useEffect(() => {
    if (selectedCategory || !suggestionStale) return;

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
  }, [selectedCategory, suggestionStale]);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/");
  };

  const groups = useMemo(() => groupByCategory(missions), [missions]);
  const selectedGroup = groups.find((group) => group.category.key === selectedCategory);
  const selectedMission = selectedGroup?.missions.find((mission) => mission.slug === selectedSlug);

  const openMission = (slug: string | null) => {
    setNotice(null);
    setSelectedSlug(slug);
  };

  const closeModule = () => {
    openMission(null);
    setSelectedCategory(null);
  };

  const openSuggested = (categoryKey: string, missionSlug: string) => {
    setSelectedCategory(categoryKey);
    openMission(missionSlug);
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

  const handleAccept = async (mission: Mission) => {
    setBusy(true);
    setNotice(null);
    try {
      saveProgress(await acceptMission(mission.slug));
      setNotice({ tone: "success", text: "Missão aceita. Comece pela coordenada 1." });
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
    try {
      const completion = await completeCoordinate(mission.slug, coordinate.slug);
      saveProgress(completion.progress);
      setAgent(completion.agent);
      setNotice(completionNotice(completion, mission));
      setSuggestionStale(true);
    } catch (err) {
      setNotice({ tone: "error", text: apiErrorMessage(err, "Não foi possível marcar a coordenada. Tente de novo.") });
      await resync();
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <GlobalMissions />

      <PageWrapper>

        {/* Navbar */}
        <Navbar className="d-flex align-items-center justify-content-between">
          <NavBrand>SILVA<span>.</span></NavBrand>
          <div className="d-flex align-items-center gap-2">
            {agent && (
              <>
                <Badge $color="#f59e0b" $bg="#1c1002" $border="#f59e0b33">
                  🔥 {streakLabel(agent.streak.current)}
                </Badge>
                <Badge $color="#a78bfa" $bg="#1e1b4b" $border="#6366f133">
                  LVL {agent.level}
                </Badge>
              </>
            )}
            <LogoutButton onClick={handleLogout}>SAIR</LogoutButton>
          </div>
        </Navbar>

        <Content>

          {/* Painel do agente */}
          {agent && <AgentPanel agent={agent} />}

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
              {selectedMission ? (
                <>
                  <BackButton onClick={() => openMission(null)}>
                    ← Voltar às missões
                  </BackButton>
                  <MissionDetail
                    mission={selectedMission}
                    progress={progress[selectedMission.slug]}
                    busy={busy}
                    notice={notice}
                    onAccept={() => handleAccept(selectedMission)}
                    onComplete={(coordinate) => handleComplete(selectedMission, coordinate)}
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
    </>
  );
}
