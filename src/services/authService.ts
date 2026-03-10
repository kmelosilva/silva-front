import { api } from "../api/api";

export const login = async (email: string, password: string) => {
  const response = await api.post("/login", {
    email,
    password
  });

  const token = response.data.data.token;
  localStorage.setItem("token", token);

  return response.data.data;
};

export const register = async (data: any) => {
  const response = await api.post("/register", data);
  return response.data;
};
