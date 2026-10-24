// Contrato de GET /api/missions — espelha backend/app/Http/Resources/MissionResource.php.

export interface Category {
  key: string;
  label: string;
}

export interface Coordinate {
  slug: string;
  position: number;
  title: string;
  content: string;
  xp: number;
  // Só nas coordenadas com esforço físico: o aviso de cuidado, mostrado acima do texto.
  care_notice: string | null;
}

export interface Mission {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  // A fala do submentor da área ao aceitar a missão. Nulo na de entrada (fala o Agente Silva).
  briefing: string | null;
  // Nula só na missão de entrada (GET /api/missions/entry); as dos módulos sempre têm.
  category: Category | null;
  coordinates_count: number;
  xp_total: number;
  coordinates: Coordinate[];
}

export interface MissionsResponse {
  data: Mission[];
}
