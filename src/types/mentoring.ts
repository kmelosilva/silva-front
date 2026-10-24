// Contratos da mentoria — espelham backend/app/Http/Resources/ (SubmentorResource, ReflectionResource).
import type { Category } from "./mission";

// Um submentor do Ninho. Os textos usam :codinome e :missao, trocados na tela.
export interface Submentor {
  area: Category;
  codename: string;
  animal: string;
  power_up: string;
  intro: string;
  closing: string;
  welcome_backs: string[];
  // O aviso antes de escrever (IA, guarda, apagar), já com o codinome do submentor.
  notice: string;
  // A linha discreta do CVV, sempre visível na caixa de reflexão.
  care_footer: string;
  met: boolean;
}

// "care" é a mensagem de cuidado, fora do personagem: a tela não usa o submentor nela.
export type ReplySource = "ai" | "written" | "care";

export interface Reflection {
  id: number;
  mission_slug: string;
  mission_title: string;
  coordinate_slug: string;
  coordinate_title: string;
  text: string;
  reply: string;
  reply_source: ReplySource;
  submentor: {
    area: string;
    codename: string;
  };
  created_at: string;
}
