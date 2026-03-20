import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { ReactElement } from "react";

export default function PrivateRoute({ children }: { children: ReactElement }) {
  const authenticated = useAppSelector((state) => state.auth.authenticated);

  return authenticated ? children : <Navigate to="/" replace />;
}
