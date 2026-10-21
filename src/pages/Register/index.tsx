import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerThunk } from "../../store/auth/authActions";
import { clearError } from "../../store/auth/authSlice";
import Logo from "../../components/Brand/Logo";
import {
  PageWrapper, Card, Brand, Slogan, Subtitle,
  Label, Input, CheckRow, SubmitButton, FooterText, ErrorAlert, ErrorClose,
} from "../Login/styles";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adult, setAdult] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(registerThunk({ name, email, password, adult }));
    // A conta nova já está conectada: segue sem pedir a senha de novo.
    if (registerThunk.fulfilled.match(result)) navigate("/missions");
  };

  return (
    <>
      <PageWrapper className="d-flex align-items-center justify-content-center">
        <Card>

          <Brand><Logo height={48} /></Brand>
          <Slogan>Gente como agente</Slogan>
          <Subtitle>Crie sua conta de agente.</Subtitle>

          {error && (
            <ErrorAlert className="d-flex justify-content-between align-items-center">
              {error}
              <ErrorClose type="button" aria-label="Fechar aviso" onClick={() => dispatch(clearError())}>×</ErrorClose>
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

            <div className="mb-3">
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

            <div className="mb-4">
              <CheckRow>
                <input
                  type="checkbox"
                  checked={adult}
                  onChange={(e) => { setAdult(e.target.checked); if (error) dispatch(clearError()); }}
                  required
                />
                Tenho 18 anos ou mais
              </CheckRow>
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
