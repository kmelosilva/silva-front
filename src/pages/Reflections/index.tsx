import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiErrorMessage } from "../../services/agentService";
import { deleteAllReflections, deleteReflection, getReflections } from "../../services/mentoringService";
import { useAppDispatch } from "../../store/hooks";
import { logoutThunk } from "../../store/auth/authActions";
import { getCategoryVisual } from "../../config/categoryConfig";
import Logo from "../../components/Brand/Logo";
import ContactLinks from "../../components/Mentoring/ContactLinks";
import type { Reflection } from "../../types/mentoring";
import {
  PageWrapper, Navbar, NavBrand, LogoutButton, Content, BackButton, ErrorBox, LoadingState,
} from "../Missions/styles";
import {
  Title, Lead, Toolbar, DangerButton, CancelButton, Confirm, Empty, MissionBlock, MissionTitle,
  Card, CardHead, CoordinateTitle, When, Written, Reply, ReplyLabel, Feedback,
} from "./styles";

interface MissionGroup {
  slug: string;
  title: string;
  reflections: Reflection[];
}

// A API já manda na ordem das missões e das coordenadas; aqui só agrupa.
function byMission(reflections: Reflection[]): MissionGroup[] {
  const groups = new Map<string, MissionGroup>();
  for (const reflection of reflections) {
    const group = groups.get(reflection.mission_slug);
    if (group) {
      group.reflections.push(reflection);
    } else {
      groups.set(reflection.mission_slug, {
        slug: reflection.mission_slug, title: reflection.mission_title, reflections: [reflection],
      });
    }
  }
  return [...groups.values()];
}

const when = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" });

// "Minhas reflexões" (RF-07): só do agente, por missão, com a resposta; apagar uma ou todas.
// Apagar tira o texto e a resposta, e não mexe em XP, nível, sequência nem progresso.
export default function Reflections() {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [confirming, setConfirming] = useState<number | "all" | null>(null);
  const [busy, setBusy] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    getReflections()
      .then((list) => {
        if (active) setReflections(list);
      })
      .catch(() => {
        if (active) setError("Não foi possível carregar as suas reflexões.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/");
  };

  const remove = async (target: number | "all") => {
    setBusy(true);
    setFeedback("");
    try {
      if (target === "all") {
        await deleteAllReflections();
        setReflections([]);
        setFeedback("Todas as reflexões foram apagadas.");
      } else {
        await deleteReflection(target);
        setReflections((current) => current.filter((reflection) => reflection.id !== target));
        setFeedback("Reflexão apagada.");
      }
      setConfirming(null);
    } catch (err) {
      setFeedback(apiErrorMessage(err, "Não foi possível apagar agora. Tente de novo."));
    } finally {
      setBusy(false);
    }
  };

  const groups = byMission(reflections);

  return (
    <PageWrapper>
      <Navbar className="d-flex align-items-center justify-content-between">
        <NavBrand><Logo height={28} /></NavBrand>
        <LogoutButton onClick={handleLogout}>SAIR</LogoutButton>
      </Navbar>

      <Content>
        <BackButton onClick={() => navigate("/missions")}>← Voltar às missões</BackButton>

        <Title>Minhas reflexões</Title>
        <Lead>Só você vê o que escreveu aqui. Apagar tira o texto e a resposta, e não mexe no seu XP nem nas missões.</Lead>

        {feedback && <Feedback role="status">{feedback}</Feedback>}

        {loading && <LoadingState>CARREGANDO...</LoadingState>}
        {error && <ErrorBox>⚠ {error}</ErrorBox>}

        {!loading && !error && reflections.length === 0 && (
          <Empty>
            Você ainda não escreveu nenhuma reflexão. Ela aparece aqui depois que você cumprir uma coordenada e contar como foi.
          </Empty>
        )}

        {reflections.length > 0 && (
          <Toolbar>
            {confirming === "all" ? (
              <Confirm>
                <span>Apagar todas as {reflections.length} reflexões? Não dá para desfazer.</span>
                <DangerButton type="button" disabled={busy} onClick={() => remove("all")}>Sim, apagar todas</DangerButton>
                <CancelButton type="button" disabled={busy} onClick={() => setConfirming(null)}>Cancelar</CancelButton>
              </Confirm>
            ) : (
              <CancelButton type="button" onClick={() => setConfirming("all")}>Apagar todas</CancelButton>
            )}
          </Toolbar>
        )}

        {groups.map((group) => (
          <MissionBlock key={group.slug} aria-labelledby={`missao-${group.slug}`}>
            <MissionTitle id={`missao-${group.slug}`}>{group.title}</MissionTitle>
            {group.reflections.map((reflection) => {
              const accent = getCategoryVisual(reflection.submentor.area).color;

              return (
                <Card key={reflection.id} $accent={accent}>
                  <CardHead>
                    <CoordinateTitle>{reflection.coordinate_title}</CoordinateTitle>
                    <When dateTime={reflection.created_at}>{when(reflection.created_at)}</When>
                  </CardHead>
                  <Written>{reflection.text}</Written>
                  <Reply>
                    <ReplyLabel>
                      {reflection.reply_source === "care" ? "Um recado da Silva" : reflection.submentor.codename}
                    </ReplyLabel>
                    <ContactLinks text={reflection.reply} />
                  </Reply>
                  {confirming === reflection.id ? (
                    <Confirm>
                      <span>Apagar esta reflexão?</span>
                      <DangerButton type="button" disabled={busy} onClick={() => remove(reflection.id)}>Sim, apagar</DangerButton>
                      <CancelButton type="button" disabled={busy} onClick={() => setConfirming(null)}>Cancelar</CancelButton>
                    </Confirm>
                  ) : (
                    <CancelButton
                      type="button"
                      onClick={() => setConfirming(reflection.id)}
                      aria-label={`Apagar a reflexão de ${reflection.coordinate_title}`}
                    >
                      Apagar
                    </CancelButton>
                  )}
                </Card>
              );
            })}
          </MissionBlock>
        ))}
      </Content>
    </PageWrapper>
  );
}
