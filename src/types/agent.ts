// Contratos do ciclo do agente — espelham backend/app/Http/Resources/
// (AgentResource, MissionProgressResource, CompletionResource, DailySuggestionResource).
import type { Category } from "./mission";

export interface Agent {
  name: string;
  level: number;
  xp: number;
  level_xp: number;
  next_level_xp: number;
  missions_completed: number;
  streak: {
    current: number;
    best: number;
  };
}

export interface MissionProgress {
  mission_slug: string;
  status: "in_progress" | "completed";
  completed_coordinates: string[];
  next_coordinate: string | null;
  accepted_at: string;
  completed_at: string | null;
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
    category: Category;
  } | null;
  coordinate: {
    slug: string;
    position: number;
    title: string;
  } | null;
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
