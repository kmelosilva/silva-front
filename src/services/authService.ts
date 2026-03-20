import { api } from "../api/api";

export const login = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password });

  const token = response.data.data.token;
  localStorage.setItem("token", token);

  return response.data.data;
};

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post("/register", { name, email, password });
  return response.data;
};

export const logout = async () => {
  try {
    await api.post("/logout");
  } finally {
    localStorage.removeItem("token");
  }
};

export const getToken = () => localStorage.getItem("token");

export const isAuthenticated = () => !!getToken();