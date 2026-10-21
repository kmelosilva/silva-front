import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginThunk } from "../../store/auth/authActions";
import { clearError } from "../../store/auth/authSlice";
import Logo from "../../components/Brand/Logo";
import {
  PageWrapper, Card, Brand, Slogan, Subtitle,
  Label, Input, SubmitButton, FooterText, ErrorAlert, ErrorClose,
} from "./styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginThunk({ email, password }));
    if (loginThunk.fulfilled.match(result)) navigate("/missions");
  };

  return (
    <>
      <PageWrapper className="d-flex align-items-center justify-content-center">
        <Card>

          <Brand><Logo height={48} /></Brand>
          <Slogan>Gente como agente</Slogan>
          <Subtitle>Acesse sua conta de agente.</Subtitle>

          {error && (
            <ErrorAlert className="d-flex justify-content-between align-items-center">
              {error}
              <ErrorClose type="button" aria-label="Fechar aviso" onClick={() => dispatch(clearError())}>×</ErrorClose>
            </ErrorAlert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="agente@silva.app"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) dispatch(clearError()); }}
                required
              />
            </div>

            <div className="mb-4">
              <Label>Senha</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <SubmitButton type="submit" disabled={loading}>
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" />Entrando...</>
                : "Entrar →"
              }
            </SubmitButton>
          </form>

          <FooterText>
            Não tem conta? <a href="/register">Registrar</a>
          </FooterText>

        </Card>
      </PageWrapper>
    </>
  );
}
