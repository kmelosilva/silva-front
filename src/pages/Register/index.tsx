import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerThunk } from "../../store/auth/authActions";
import { clearError } from "../../store/auth/authSlice";
import {
  GlobalAuth, PageWrapper, Card, Brand, Subtitle,
  Label, Input, SubmitButton, FooterText, ErrorAlert,
} from "../Login/styles";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(registerThunk({ name, email, password }));
    if (registerThunk.fulfilled.match(result)) navigate("/");
  };

  return (
    <>
      <GlobalAuth />
      <PageWrapper className="d-flex align-items-center justify-content-center">
        <Card>

          <Brand>SILVA<span>.</span></Brand>
          <Subtitle>CRIE SUA CONTA DE AGENTE</Subtitle>

          {error && (
            <ErrorAlert className="d-flex justify-content-between align-items-center">
              {error}
              <button
                onClick={() => dispatch(clearError())}
                style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 16, lineHeight: 1 }}
              >×</button>
            </ErrorAlert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Label>Nome</Label>
              <Input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => { setName(e.target.value); if (error) dispatch(clearError()); }}
                required
              />
            </div>

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
                minLength={6}
                required
              />
            </div>

            <SubmitButton type="submit" disabled={loading}>
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" />Criando conta...</>
                : "Criar conta →"
              }
            </SubmitButton>
          </form>

          <FooterText>
            Já tem conta? <a href="/">Entrar</a>
          </FooterText>

        </Card>
      </PageWrapper>
    </>
  );
}
