import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./authTypes";
import { loginThunk, logoutThunk, registerThunk } from "./authActions";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  authenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.authenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.authenticated = false;
      });

    // O cadastro conecta como o login: a API já devolve o token.
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.authenticated = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.authenticated = false;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.authenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;