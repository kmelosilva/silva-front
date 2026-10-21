import styled, { keyframes } from "styled-components";
import { colors, fonts } from "../../../theme/tokens";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Card = styled.div<{ $color: string }>`
  background: ${colors.surface};
  border: 1px solid ${colors.raised};
  border-radius: 16px;
  padding: 24px 20px;
  cursor: pointer;
  animation: ${fadeUp} .4s ease both;
  transition: all .2s ease;
  text-align: center;

  &:hover {
    border-color: ${({ $color }) => $color}88;
    transform: translateY(-2px);
    box-shadow: ${({ $color }) => `0 8px 32px ${$color}22`};
  }
`;

export const Emoji = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
`;

export const Label = styled.p<{ $color: string }>`
  font-family: ${fonts.display};
  font-size: 13px;
  letter-spacing: 1px;
  color: ${({ $color }) => $color};
  margin: 0 0 6px;
  text-transform: uppercase;
`;

export const Count = styled.p`
  font-size: 12px;
  color: ${colors.textSecondary};
  margin: 0;
`;
