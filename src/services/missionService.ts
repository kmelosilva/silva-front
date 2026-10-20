import { api } from "../api/api";
import type { Mission, MissionsResponse } from "../types/mission";

export const getMissions = async (): Promise<Mission[]> => {
  const token = localStorage.getItem("token");

  const response = await api.get<MissionsResponse>("/missions", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data.data;
};
