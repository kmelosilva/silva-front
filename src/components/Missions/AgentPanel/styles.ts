import styled, { keyframes } from "styled-components";
import { colors, fonts } from "../../../theme/tokens";

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 ${colors.focus}44; }
  50%       { box-shadow: 0 0 0 8px ${colors.focus}00; }
`;

export const Panel = styled.div`
  background: ${colors.surface};
  border: 1px solid ${colors.raised};
  border-radius: 20px;
  padding: 28px 32px;
  margin-bottom: 40px;
`;

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${colors.base};
  border: 2px solid ${colors.focus};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  animation: ${pulseGlow} 3s ease infinite;
  flex-shrink: 0;
`;

export const AgentName = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.text};
  margin: 0;
`;

export const AgentStatus = styled.p`
  font-size: 10px;
  font-weight: 600;
  color: ${colors.textMuted};
  letter-spacing: 1px;
  margin: 2px 0 0;
`;

export const StatNumber = styled.p<{ $accent?: boolean }>`
  font-family: ${fonts.display};
  font-size: 28px;
  color: ${({ $accent }) => ($accent ? colors.focus : colors.text)};
  margin: 0;
`;

export const StatLabel = styled.p`
  font-size: 10px;
  font-weight: 600;
  color: ${colors.textSecondary};
  letter-spacing: 1px;
  margin: 4px 0 0;
`;

export const XPLabel = styled.p`
  font-size: 11px;
  font-weight: 700;
  color: ${colors.textMuted};
  letter-spacing: 1px;
  margin: 0 0 8px;
`;

export const Hint = styled.p`
  font-size: 12px;
  color: ${colors.textSecondary};
  margin: 8px 0 0;
`;
