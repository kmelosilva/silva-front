// Contratos do ciclo do agente — espelham backend/app/Http/Resources/
// (AgentResource, MissionProgressResource, CompletionResource, DailySuggestionResource).
import type { Category } from "./mission";

export interface Agent {
  name: string;
  // Nulo até o alistamento.
  codename: string | null;
  level: number;
  xp: number;
  level_xp: number;
  next_level_xp: number;
  missions_completed: number;
  streak: {
    current: number;
    best: number;
  };
  priorities: Category[];
  enlisted: boolean;
}

export interface MissionProgress {
  mission_slug: string;
  status: "in_progress" | "completed";
  completed_coordinates: string[];
  next_coordinate: string | null;
  accepted_at: string;
  completed_at: string | null;
  // Em andamento e parada há 7 dias ou mais: o submentor recebe o agente de volta.
  welcome_back: boolean;
}

export interface CompletionResult {
  progress: MissionProgress;
  agent: Agent;
  result: {
    xp_gained: number;
    levels_gained: number;
    mission_completed: boolean;
    already_completed: boolean;
  };
}

export interface DailySuggestion {
  type: "next_coordinate" | "suggested_mission" | "none";
  mission: {
    slug: string;
    title: string;
    // Nula na missão de entrada.
    category: Category | null;
  } | null;
  coordinate: {
    slug: string;
    position: number;
    title: string;
  } | null;
  // Áreas de prioridade sem missão nova, quando a sugestão não é de continuar.
  unavailable_priorities: Category[];
}

export interface ApiErrorBody {
  error?: {
    code: string;
    message: string;
  };
  message?: string;
  // Validação do Laravel (422): as mensagens de cada campo, já em PT-BR.
  errors?: Record<string, string[]>;
}
