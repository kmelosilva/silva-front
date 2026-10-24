import { api } from "../api/api";
import { authHeaders } from "./agentService";
import type { Reflection, Submentor } from "../types/mentoring";

// Os submentores das áreas com missão, com o que o agente já conheceu.
export const getSubmentors = async (): Promise<Submentor[]> => {
  const response = await api.get<{ data: Submentor[] }>("/submentors", { headers: authHeaders() });
  return response.data.data;
};

// A apresentação vista: não aparece mais sozinha, só pelo retrato.
export const meetSubmentor = async (area: string): Promise<void> => {
  await api.post(`/submentors/${area}/met`, null, { headers: authHeaders() });
};

// 201 com a reflexão nova ou 200 com a que já existia: nos dois casos, a mesma resposta.
export const sendReflection = async (
  missionSlug: string, coordinateSlug: string, text: string
): Promise<Reflection> => {
  const response = await api.post<{ data: Reflection }>(
    `/missions/${missionSlug}/coordinates/${coordinateSlug}/reflection`, { text }, { headers: authHeaders() }
  );
  return response.data.data;
};

// Sem missão, todas as reflexões do agente, na ordem das missões e das coordenadas.
export const getReflections = async (missionSlug?: string): Promise<Reflection[]> => {
  const response = await api.get<{ data: Reflection[] }>("/reflections", {
    headers: authHeaders(),
    params: missionSlug ? { mission: missionSlug } : undefined,
  });
  return response.data.data;
};

export const deleteReflection = async (id: number): Promise<void> => {
  await api.delete(`/reflections/${id}`, { headers: authHeaders() });
};

export const deleteAllReflections = async (): Promise<void> => {
  await api.delete("/reflections", { headers: authHeaders() });
};

// Troca os marcadores dos textos do submentor: o codinome do agente e o título da missão.
export const fillMarkers = (text: string, markers: { codinome: string; missao?: string }): string =>
  text.replaceAll(":codinome", markers.codinome).replaceAll(":missao", markers.missao ?? "");
