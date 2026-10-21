import { createGlobalStyle } from "styled-components";
import { colors, fontFiles, fonts } from "./tokens";

// Base visual de todas as telas. Fica depois do Bootstrap e ganha dele.
export const GlobalBrand = createGlobalStyle`
  @font-face {
    font-family: 'Sequel 100 Wide';
    src: url('${fontFiles.display}') format('opentype');
    font-weight: 400 900;
    font-style: normal;
    font-display: swap;
  }

  body {
    min-height: 100vh;
    background: ${colors.page};
    background-attachment: fixed;
    color: ${colors.text};
    font-family: ${fonts.reading};
  }

  ::selection {
    background: ${colors.primary};
    color: ${colors.text};
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${colors.base}; }
  ::-webkit-scrollbar-thumb { background: ${colors.raised}; border-radius: 99px; }
`;
