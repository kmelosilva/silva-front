import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { registerThunk } from "../store/auth/authActions";
import { clearError } from "../store/auth/authSlice";

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

    if (registerThunk.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <form
        className="w-100"
        style={{ maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <h3 className="mb-4 text-center">Criar conta</h3>

        {error && (
          <div
            className="alert alert-danger py-2 d-flex justify-content-between"
            role="alert"
          >
            {error}
            <button
              type="button"
              className="btn-close btn-sm"
              onClick={() => dispatch(clearError())}
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) dispatch(clearError());
            }}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) dispatch(clearError());
            }}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Criando conta...
            </>
          ) : (
            "Registrar"
          )}
        </button>

        <p className="text-center mt-3 text-muted small">
          Já tem conta?{" "}
          <a href="/" className="text-decoration-none">
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}
