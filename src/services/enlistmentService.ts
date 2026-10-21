import { api } from "../api/api";
import { authHeaders } from "./agentService";
import type { Enlistment } from "../types/enlistment";

export const getEnlistment = async (): Promise<Enlistment> => {
  const response = await api.get<{ data: Enlistment }>("/enlistment", { headers: authHeaders() });
  return response.data.data;
};

export const acceptOath = async (): Promise<Enlistment> => {
  const response = await api.post<{ data: Enlistment }>("/enlistment/oath", null, { headers: authHeaders() });
  return response.data.data;
};

// Só a parte do nome: o "da Silva" é fixo e a API acrescenta.
export const chooseCodename = async (name: string): Promise<Enlistment> => {
  const response = await api.post<{ data: Enlistment }>(
    "/enlistment/codename", { name }, { headers: authHeaders() }
  );
  return response.data.data;
};

// Lista vazia é pular a escolha de prioridade.
export const completeEnlistment = async (priorities: string[]): Promise<Enlistment> => {
  const response = await api.post<{ data: Enlistment }>(
    "/enlistment/complete", { priorities }, { headers: authHeaders() }
  );
  return response.data.data;
};
