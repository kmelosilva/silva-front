import { useState } from "react";
import { login } from "../services/authService";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    await login(email, password);

    alert("Login realizado");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button type="submit">
        Entrar
      </button>
    </form>
  );
}
