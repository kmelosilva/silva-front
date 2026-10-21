// Contratos do alistamento — espelham backend/app/Http/Resources/EnlistmentResource.php
// e GET /api/priority-areas (PriorityAreaController).
import type { Category } from "./mission";

export type EnlistmentStep = "oath" | "codename" | "priorities" | "done";

export interface CodeItem {
  title: string;
  text: string;
}

export interface Enlistment {
  step: EnlistmentStep;
  oath: string;
  code_of_conduct: CodeItem[];
  oath_accepted_at: string | null;
  suggested_name: string | null;
  codename_suffix: string;
  codename: string | null;
  priorities: Category[];
  enlisted_at: string | null;
}

export interface PriorityArea extends Category {
  description: string;
  missions_count: number;
}

export interface PriorityAreas {
  max: number;
  areas: PriorityArea[];
}
