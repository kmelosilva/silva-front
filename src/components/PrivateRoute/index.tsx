import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export default function PrivateRoute({ children }: { children: ReactElement }) {
  const authenticated = useAppSelector((state) => state.auth.authenticated);
  return authenticated ? children : <Navigate to="/" replace />;
}
