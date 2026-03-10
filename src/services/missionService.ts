import { api } from "../api/api";

export const getMissions = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/missions", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
