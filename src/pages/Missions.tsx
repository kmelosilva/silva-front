import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMissions } from "../services/missionService";
import { useAppDispatch } from "../store/hooks";
import { logoutThunk } from "../store/auth/authActions";

export default function Missions() {
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMissions();
        setMissions(data.data);
      } catch {
        setError("Não foi possível carregar as missões. Tente novamente.");
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

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Missões</h1>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>

      {loading && (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && missions.length === 0 && (
        <p className="text-muted">Nenhuma missão encontrada.</p>
      )}

      {missions.map((mission) => (
        <div key={mission.id} className="card mb-2 p-3">
          <span>{mission.title}</span>
        </div>
      ))}
    </div>
  );
}
