import styled, { keyframes } from "styled-components";
import { colors, fonts } from "../../../theme/tokens";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Box = styled.section<{ $accent: string }>`
  margin-top: 16px;
  padding: 16px;
  border-radius: 12px;
  background: ${colors.base};
  border: 1px solid ${({ $accent }) => $accent}55;
  animation: ${fadeUp} .3s ease both;
`;

export const Prompt = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.text};
  margin: 0 0 10px;
`;

export const Field = styled.textarea`
  display: block;
  width: 100%;
  resize: vertical;
  min-height: 96px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${colors.raised};
  background: ${colors.surface};
  color: ${colors.text};
  font-family: ${fonts.reading};
  font-size: 15px;
  line-height: 1.5;

  &::placeholder { color: ${colors.placeholder}; }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 1px;
  }
`;

export const Counter = styled.p`
  font-size: 12px;
  color: ${colors.textMuted};
  text-align: right;
  margin: 4px 0 0;
`;

export const FieldError = styled.p`
  font-size: 14px;
  color: ${colors.error};
  margin: 6px 0 0;
`;

export const Notice = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: ${colors.textMuted};
  margin: 10px 0 0;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
`;

const button = `
  padding: 9px 16px;
  border-radius: 8px;
  font-family: ${fonts.reading};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s ease;

  &:disabled {
    opacity: .6;
    cursor: default;
  }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const SendButton = styled.button<{ $accent: string }>`
  ${button}
  border: 1px solid ${({ $accent }) => $accent};
  background: ${colors.primary};
  color: ${colors.text};

  &:hover:not(:disabled) { background: ${colors.raised}; }
`;

export const LaterButton = styled.button`
  ${button}
  border: 1px solid ${colors.raised};
  background: transparent;
  color: ${colors.textSecondary};

  &:hover:not(:disabled) { border-color: ${colors.focus}; color: ${colors.text}; }
`;

// A linha do CVV: discreta, mas sempre ali (RF-04.3).
export const Footer = styled.p`
  font-size: 12px;
  line-height: 1.5;
  color: ${colors.textMuted};
  margin: 12px 0 0;
  padding-top: 10px;
  border-top: 1px solid ${colors.raised};

  a {
    color: ${colors.textSecondary};
    font-weight: 700;
  }

  a:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const Written = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${colors.textSecondary};
  margin: 0 0 12px;
  white-space: pre-line;

  span {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${colors.textMuted};
    margin-bottom: 4px;
  }
`;

export const Answer = styled.div`
  font-size: 15px;
  line-height: 1.6;
`;
