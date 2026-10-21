import { api } from "../api/api";

export const login = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password });

  const token = response.data.data.token;
  localStorage.setItem("token", token);

  return response.data.data;
};

// O cadastro já devolve a sessão: guarda o token como o login, sem pedir a senha de novo.
export const register = async (name: string, email: string, password: string, adult: boolean) => {
  const response = await api.post("/register", { name, email, password, adult });

  const token = response.data.data.token;
  localStorage.setItem("token", token);

  return response.data.data;
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