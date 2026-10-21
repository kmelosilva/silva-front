import styled from "styled-components";
import { colors, fonts } from "../../theme/tokens";

export const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 24px 16px;
`;

export const Card = styled.div`
  background: ${colors.surface};
  border: 1px solid ${colors.raised};
  border-radius: 20px;
  padding: 40px 36px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 24px 64px ${colors.base}aa;
`;

// O logo é vetor; o h1 dá a ele o papel de título da página.
export const Brand = styled.h1`
  color: ${colors.text};
  line-height: 0;
  margin: 0 0 16px;
`;

export const Slogan = styled.p`
  font-family: ${fonts.display};
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${colors.textMuted};
  margin: 0 0 6px;
`;

export const Subtitle = styled.p`
  font-size: 13px;
  color: ${colors.textSecondary};
  margin: 0 0 28px;
`;

export const Label = styled.label`
  font-size: 11px;
  font-weight: 600;
  color: ${colors.textSecondary};
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 6px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  background: ${colors.base};
  border: 1px solid ${colors.raised};
  border-radius: 8px;
  padding: 10px 14px;
  color: ${colors.text};
  font-family: ${fonts.reading};
  font-size: 14px;
  transition: border-color .15s;
  outline: none;

  &::placeholder { color: ${colors.placeholder}; }

  &:focus {
    border-color: ${colors.focus};
    box-shadow: 0 0 0 3px ${colors.focus}33;
  }
`;

// Caixa de seleção com rótulo clicável, ex.: a declaração de 18+ do cadastro.
export const CheckRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: ${colors.textSecondary};
  cursor: pointer;

  input {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin-top: 1px;
    accent-color: ${colors.primary};
    cursor: pointer;
  }

  input:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px 0;
  border-radius: 8px;
  border: 1px solid ${colors.focus}55;
  background: ${colors.primary};
  color: ${colors.text};
  font-family: ${fonts.reading};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background .15s;

  &:hover:not(:disabled) { background: ${colors.raised}; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const FooterText = styled.p`
  font-size: 13px;
  color: ${colors.textSecondary};
  text-align: center;
  margin: 20px 0 0;

  a {
    color: ${colors.text};
    font-weight: 600;
    text-decoration: underline;
    text-decoration-color: ${colors.focus};
    text-underline-offset: 3px;
  }
`;

export const ErrorAlert = styled.div`
  background: ${colors.base};
  border: 1px solid ${colors.error}66;
  border-radius: 8px;
  padding: 10px 14px;
  color: ${colors.error};
  font-size: 13px;
  margin-bottom: 20px;
`;

export const ErrorClose = styled.button`
  background: none;
  border: none;
  color: ${colors.error};
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
`;
