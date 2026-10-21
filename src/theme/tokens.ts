// Tokens da marca Silva: o único lugar do front com cores e fontes.
// Paleta oficial: Drive → Silva → Identidade → Cores_silva.pdf (2021).

export const palette = {
  violet500: "#571EA8",
  violet600: "#48198E",
  violet700: "#3A1373",
  violet800: "#2B0E59",

  // Cores de apoio, dos drops. Tons escolhidos com contraste garantido; conferir com as peças.
  dropGreen: "#3DD68C",  // Gente como agente
  dropYellow: "#FFC83D", // Questão de tempo

  white: "#FFFFFF",
  lilacLight: "#E6DAFF",
  lilac: "#CDB8F5",
  lilacMuted: "#B9A0EC", // 4,3:1 sobre violet500: só sobre violet800
  coral: "#FF9B9B",
} as const;

// Papéis na tela. Texto sobre roxo é branco ou lilás; roxo sobre roxo nunca é texto.
export const colors = {
  page: `linear-gradient(135deg, ${palette.violet500} 0%, ${palette.violet800} 65%)`,
  base: palette.violet800,    // fundo de campos e áreas internas
  surface: palette.violet700, // cartões e painel
  raised: palette.violet600,  // bordas e destaque
  primary: palette.violet500, // botões e barra de XP
  text: palette.white,
  textSecondary: palette.lilacLight,
  textMuted: palette.lilac,
  placeholder: palette.lilacMuted,
  focus: palette.lilac,
  success: palette.dropGreen,
  attention: palette.dropYellow,
  error: palette.coral,
} as const;

// Saúde e carreira usam as cores dos drops; as demais derivam da paleta.
export const categoryColors: Record<string, string> = {
  saude: palette.dropGreen,
  carreira: palette.dropYellow,
  mente: "#C9A8FF",
  habitos: "#FF9BD2",
  financas: "#9FB4FF",
  social: "#F2B8FF",
};

export const fonts = {
  // Sequel 100 Wide 95: licenciada, fica fora do repositório (public/fonts/, ver README).
  display: "'Sequel 100 Wide', 'Arial Black', 'Helvetica Neue', sans-serif",
  reading: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
} as const;

export const fontFiles = {
  display: "/fonts/Sequel100Wide-95.otf",
} as const;
