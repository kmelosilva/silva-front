import { createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginService, logout as logoutService, register as registerService } from "../../services/authService";
import type { LoginCredentials, RegisterCredentials, AuthResponse } from "./authTypes";

export const loginThunk = createAsyncThunk<AuthResponse, LoginCredentials>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginService(credentials.email, credentials.password);
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Email ou senha inválidos.";
      return rejectWithValue(message);
    }
  }
);

export const registerThunk = createAsyncThunk<void, RegisterCredentials>(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      await registerService(credentials.name, credentials.email, credentials.password);
    } catch (err: any) {
      const message = err.response?.data?.message || "Erro ao criar conta. Tente novamente.";
      return rejectWithValue(message);
    }
  }
);

export const logoutThunk = createAsyncThunk<void, void>(
  "auth/logout",
  async () => {
    await logoutService();
  }
);