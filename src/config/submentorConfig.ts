// Só o desenho de cada submentor, pela chave da área. Os textos vêm da API
// (GET /api/submentors). Os desenhos são cópia da pasta arte/ da spec de mentoria.
import pintada from "../assets/submentors/pintada.svg";
import jabu from "../assets/submentors/jabu.svg";
import tito from "../assets/submentors/tito.svg";
import guia from "../assets/submentors/guia.svg";
import capi from "../assets/submentors/capi.svg";
import bel from "../assets/submentors/bel.svg";

const PORTRAITS: Record<string, string> = {
  saude: pintada,
  mente: jabu,
  financas: tito,
  carreira: guia,
  social: capi,
  habitos: bel,
};

// Área sem desenho: a tela mostra o emoji da categoria no lugar do retrato.
export function submentorPortrait(areaKey: string): string | null {
  return PORTRAITS[areaKey] ?? null;
}
