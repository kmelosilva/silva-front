import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMissions } from "../../services/missionService";
import { useAppDispatch } from "../../store/hooks";
import { logoutThunk } from "../../store/auth/authActions";
import AgentPanel from "../../components/Missions/AgentPanel";
import CategorySection from "../../components/Missions/CategorySection";
import ModuleCard from "../../components/Missions/ModuleCard";
import type { Mission } from "../../types/mission";
import {
  GlobalMissions, PageWrapper, Navbar, NavBrand, Badge,
  LogoutButton, Content, ModulesGrid, BackButton,
  MissionsWrapper, EmptyState, ErrorBox, LoadingState,
} from "./styles";

// Mock — substituir por selector Redux na Fase 2
const AGENT = {
  name: "Agente Silva",
  level: 4,
  xp: 1340,
  xpNext: 2000,
  missionsCompleted: 17,
  streak: 5,
};

export default function Missions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMissions();
        setMissions(data.data);
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

  const grouped = missions.reduce<Record<string, Mission[]>>((acc, m) => {
    const key = m.category?.toLowerCase().replace(/\s/g, "") ?? "default";
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <>
      <GlobalMissions />

      <PageWrapper>

        {/* Navbar */}
        <Navbar className="d-flex align-items-center justify-content-between">
          <NavBrand>SILVA<span>.</span></NavBrand>
          <div className="d-flex align-items-center gap-2">
            <Badge $color="#f59e0b" $bg="#1c1002" $border="#f59e0b33">
              🔥 {AGENT.streak} dias
            </Badge>
            <Badge $color="#a78bfa" $bg="#1e1b4b" $border="#6366f133">
              LVL {AGENT.level}
            </Badge>
            <LogoutButton onClick={handleLogout}>SAIR</LogoutButton>
          </div>
        </Navbar>

        <Content>

          {/* Painel do agente */}
          <AgentPanel
            name={AGENT.name}
            level={AGENT.level}
            xp={AGENT.xp}
            xpNext={AGENT.xpNext}
            missionsCompleted={AGENT.missionsCompleted}
          />

          {/* Estados */}
          {loading && (
            <LoadingState>
              <div style={{ fontSize: 32, marginBottom: 16 }}>⟳</div>
              CARREGANDO MISSÕES...
            </LoadingState>
          )}

          {error && <ErrorBox>⚠ {error}</ErrorBox>}

          {/* Grid de módulos ou missões do módulo selecionado */}
          {!loading && !error && (
            <MissionsWrapper>
              {selectedCategory === null ? (
                <ModulesGrid>
                  {categories.map((cat, i) => (
                    <ModuleCard
                      key={cat}
                      category={cat}
                      count={grouped[cat].length}
                      index={i}
                      onClick={() => setSelectedCategory(cat)}
                    />
                  ))}
                </ModulesGrid>
              ) : (
                <>
                  <BackButton onClick={() => setSelectedCategory(null)}>
                    ← Voltar aos módulos
                  </BackButton>
                  <CategorySection
                    category={selectedCategory}
                    missions={grouped[selectedCategory] ?? []}
                  />
                </>
              )}

              {missions.length === 0 && (
                <EmptyState>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
                  NENHUMA MISSÃO DISPONÍVEL
                </EmptyState>
              )}
            </MissionsWrapper>
          )}

        </Content>
      </PageWrapper>
    </>
  );
}
