import { api } from "../api/api";
import { authHeaders } from "./agentService";
import type { Mission, MissionsResponse } from "../types/mission";
import type { PriorityAreas } from "../types/enlistment";

export const getMissions = async (): Promise<Mission[]> => {
  const token = localStorage.getItem("token");

  const response = await api.get<MissionsResponse>("/missions", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data.data;
};

// As áreas que o agente pode escolher como prioridade, com o limite de escolha.
export const getPriorityAreas = async (): Promise<PriorityAreas> => {
  const response = await api.get<{ data: PriorityAreas }>("/priority-areas", { headers: authHeaders() });
  return response.data.data;
};
