import { createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginService, logout as logoutService, register as registerService } from "../../services/authService";
import { apiErrorMessage } from "../../services/agentService";
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

export const registerThunk = createAsyncThunk<AuthResponse, RegisterCredentials>(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      return await registerService(credentials.name, credentials.email, credentials.password, credentials.adult);
    } catch (err) {
      return rejectWithValue(apiErrorMessage(err, "Não foi possível criar a conta. Tente de novo."));
    }
  }
);

export const logoutThunk = createAsyncThunk<void, void>(
  "auth/logout",
  async () => {
    await logoutService();
  }
);