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
  padding: 20px;
  cursor: pointer;
  animation: ${fadeUp} .4s ease both;
  transition: all .2s ease;

  &:hover {
    border-color: ${({ $color }) => $color}88;
    transform: translateY(-2px);
    box-shadow: ${({ $color }) => `0 8px 32px ${$color}22`};
  }
`;

export const ImageBox = styled.div<{ $bg: string; $color: string }>`
  height: 80px;
  border-radius: 10px;
  margin-bottom: 14px;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $color }) => $color}33;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  position: relative;
  overflow: hidden;
`;

export const XPBadge = styled.span<{ $bg: string; $color: string }>`
  position: absolute;
  bottom: 6px;
  right: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid ${({ $color }) => $color}55;
`;

export const Title = styled.p`
  font-family: ${fonts.display};
  font-size: 13px;
  color: ${colors.text};
  line-height: 1.5;
  min-height: 40px;
  margin: 0 0 6px;
`;

export const Meta = styled.p`
  font-size: 12px;
  color: ${colors.textSecondary};
  margin: 0 0 14px;
`;

export const Status = styled.p<{ $done: boolean }>`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${({ $done }) => ($done ? colors.success : colors.attention)};
  margin: -8px 0 14px;
`;

export const OpenButton = styled.button<{ $color: string }>`
  width: 100%;
  padding: 9px 0;
  border-radius: 8px;
  border: 1px solid ${({ $color }) => $color};
  background: ${colors.base};
  color: ${({ $color }) => $color};
  font-family: ${fonts.reading};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s ease;

  &:hover {
    background: ${({ $color }) => $color}22;
  }
`;
