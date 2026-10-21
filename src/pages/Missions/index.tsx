import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMissions } from "../../services/missionService";
import { getAgent } from "../../services/agentService";
import { useAppDispatch } from "../../store/hooks";
import { logoutThunk } from "../../store/auth/authActions";
import AgentPanel from "../../components/Missions/AgentPanel";
import CategorySection from "../../components/Missions/CategorySection";
import MissionDetail from "../../components/Missions/MissionDetail";
import ModuleCard from "../../components/Missions/ModuleCard";
import type { Category, Mission } from "../../types/mission";
import type { Agent } from "../../types/agent";
import {
  GlobalMissions, PageWrapper, Navbar, NavBrand, Badge,
  LogoutButton, Content, ModulesGrid, BackButton,
  MissionsWrapper, EmptyState, ErrorBox, LoadingState,
} from "./styles";

// Sequência zerada é um convite, nunca uma perda.
const streakLabel = (current: number) =>
  current === 0 ? "comece hoje" : `${current} ${current === 1 ? "dia" : "dias"}`;

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catalog, panel] = await Promise.all([getMissions(), getAgent()]);
        setMissions(catalog);
        setAgent(panel);
      } catch {
        setError("Não foi possível carregar as missões.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/");
  };

  const groups = useMemo(() => groupByCategory(missions), [missions]);
  const selectedGroup = groups.find((group) => group.category.key === selectedCategory);
  const selectedMission = selectedGroup?.missions.find((mission) => mission.slug === selectedSlug);

  const closeModule = () => {
    setSelectedSlug(null);
    setSelectedCategory(null);
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
                  <BackButton onClick={() => setSelectedSlug(null)}>
                    ← Voltar às missões
                  </BackButton>
                  <MissionDetail mission={selectedMission} />
                </>
              ) : selectedGroup ? (
                <>
                  <BackButton onClick={closeModule}>
                    ← Voltar aos módulos
                  </BackButton>
                  <CategorySection
                    category={selectedGroup.category}
                    missions={selectedGroup.missions}
                    onSelectMission={(mission) => setSelectedSlug(mission.slug)}
                  />
                </>
              ) : (
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
