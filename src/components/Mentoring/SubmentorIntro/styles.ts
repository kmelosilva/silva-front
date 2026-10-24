import styled, { keyframes } from "styled-components";
import { colors, fonts } from "../../../theme/tokens";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Card = styled.section<{ $color: string }>`
  display: flex;
  gap: 20px;
  align-items: center;
  background: ${colors.surface};
  border: 1px solid ${colors.raised};
  border-top: 3px solid ${({ $color }) => $color};
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 24px;
  animation: ${fadeUp} .4s ease both;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    padding: 18px 16px;
  }
`;

export const Figure = styled.div<{ $color: string }>`
  flex-shrink: 0;
  width: 136px;
  height: 170px;
  border-radius: 12px;
  background: ${colors.base};
  border: 1px solid ${({ $color }) => $color}55;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 480px) {
    margin: 0 auto;
    width: 112px;
    height: 140px;
  }
`;

export const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Kicker = styled.p<{ $color: string }>`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: ${({ $color }) => $color};
  margin: 0 0 6px;
`;

export const Name = styled.h3`
  font-family: ${fonts.display};
  font-size: 20px;
  color: ${colors.text};
  margin: 0 0 6px;

  /* Recebe o foco só para o leitor de tela começar por aqui: não é um controle. */
  &:focus { outline: none; }
`;

export const Facts = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 13px;
  color: ${colors.textMuted};
  margin: 0 0 10px;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

export const Intro = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${colors.textSecondary};
  margin: 0 0 14px;
`;

export const GoButton = styled.button<{ $color: string }>`
  padding: 10px 22px;
  border-radius: 8px;
  border: 1px solid ${({ $color }) => $color};
  background: ${colors.primary};
  color: ${colors.text};
  font-family: ${fonts.reading};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s ease;

  &:hover { background: ${colors.raised}; }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;
