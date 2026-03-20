import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

// Sempre use esses hooks no lugar do useDispatch/useSelector puros.
// Eles já carregam os tipos da sua store — sem necessidade de tipar na hora.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);