import { isAxiosError } from "axios";
import { api } from "../api/api";
import type {
  Agent, ApiErrorBody, CompletionResult, DailySuggestion, MissionProgress,
} from "../types/agent";

export const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`
});

export const getAgent = async (): Promise<Agent> => {
  const response = await api.get<{ data: Agent }>("/agent", { headers: authHeaders() });
  return response.data.data;
};

export const getMyMissions = async (): Promise<MissionProgress[]> => {
  const response = await api.get<{ data: MissionProgress[] }>("/missions/my", { headers: authHeaders() });
  return response.data.data;
};

export const getDailySuggestion = async (): Promise<DailySuggestion> => {
  const response = await api.get<{ data: DailySuggestion }>("/missions/today", { headers: authHeaders() });
  return response.data.data;
};

export const acceptMission = async (missionSlug: string): Promise<MissionProgress> => {
  const response = await api.post<{ data: MissionProgress }>(
    `/missions/${missionSlug}/accept`, null, { headers: authHeaders() }
  );
  return response.data.data;
};

export const completeCoordinate = async (
  missionSlug: string, coordinateSlug: string
): Promise<CompletionResult> => {
  const response = await api.post<{ data: CompletionResult }>(
    `/missions/${missionSlug}/coordinates/${coordinateSlug}/complete`, null, { headers: authHeaders() }
  );
  return response.data.data;
};

// A API já manda a recusa em PT-BR, pronta para a tela; sem ela, usa o texto padrão.
// Na validação, a primeira mensagem de campo vem antes do resumo, que o Laravel completa em inglês.
export const apiErrorMessage = (error: unknown, fallback: string): string => {
  if (isAxiosError<ApiErrorBody>(error)) {
    const body = error.response?.data;
    const firstFieldError = Object.values(body?.errors ?? {})[0]?.[0];
    return body?.error?.message ?? firstFieldError ?? body?.message ?? fallback;
  }
  return fallback;
};
