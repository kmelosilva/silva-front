import styled, { keyframes } from "styled-components";
import { colors, fonts } from "../../../theme/tokens";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Card = styled.section<{ $color: string }>`
  background: ${colors.surface};
  border: 1px solid ${colors.raised};
  border-left: 3px solid ${({ $color }) => $color};
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 32px;
  animation: ${fadeUp} .4s ease both;
`;

export const Label = styled.p<{ $color: string }>`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: ${({ $color }) => $color};
  margin: 0 0 8px;
`;

export const Text = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.textSecondary};
  margin: 0;

  strong {
    color: ${colors.text};
  }
`;

export const Sub = styled.p`
  font-size: 14px;
  color: ${colors.textMuted};
  margin: 4px 0 0;
`;

export const OpenButton = styled.button<{ $color: string }>`
  margin-top: 14px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${({ $color }) => $color};
  background: ${colors.base};
  color: ${({ $color }) => $color};
  font-family: ${fonts.reading};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s ease;

  &:hover {
    background: ${({ $color }) => $color}22;
  }

  &:focus-visible {
    outline: 2px solid ${({ $color }) => $color};
    outline-offset: 2px;
  }
`;
