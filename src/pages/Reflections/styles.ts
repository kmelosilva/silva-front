import styled from "styled-components";
import { colors, fonts } from "../../theme/tokens";

export const Title = styled.h1`
  font-family: ${fonts.display};
  font-size: 26px;
  color: ${colors.text};
  margin: 0 0 8px;
`;

export const Lead = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${colors.textSecondary};
  margin: 0 0 24px;
`;

export const Feedback = styled.p`
  font-size: 14px;
  color: ${colors.success};
  background: ${colors.base};
  border: 1px solid ${colors.success}55;
  border-radius: 10px;
  padding: 10px 14px;
  margin: 0 0 16px;
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

export const Confirm = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${colors.text};
`;

const button = `
  padding: 7px 14px;
  border-radius: 8px;
  font-family: ${fonts.reading};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s ease;

  &:disabled { opacity: .6; cursor: wait; }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const CancelButton = styled.button`
  ${button}
  border: 1px solid ${colors.raised};
  background: transparent;
  color: ${colors.textSecondary};

  &:hover:not(:disabled) { border-color: ${colors.focus}; color: ${colors.text}; }
`;

export const DangerButton = styled.button`
  ${button}
  border: 1px solid ${colors.error};
  background: ${colors.base};
  color: ${colors.error};

  &:hover:not(:disabled) { background: ${colors.surface}; }
`;

export const Empty = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${colors.textSecondary};
  background: ${colors.surface};
  border: 1px solid ${colors.raised};
  border-radius: 16px;
  padding: 24px;
`;

export const MissionBlock = styled.section`
  margin-bottom: 28px;
`;

export const MissionTitle = styled.h2`
  font-family: ${fonts.display};
  font-size: 18px;
  color: ${colors.text};
  margin: 0 0 12px;
`;

export const Card = styled.article<{ $accent: string }>`
  background: ${colors.surface};
  border: 1px solid ${colors.raised};
  border-left: 3px solid ${({ $accent }) => $accent};
  border-radius: 14px;
  padding: 16px 18px;
  margin-bottom: 12px;
`;

export const CardHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 6px 12px;
  margin-bottom: 8px;
`;

export const CoordinateTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.text};
  margin: 0;
`;

export const When = styled.time`
  font-size: 12px;
  color: ${colors.textMuted};
`;

export const Written = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${colors.text};
  margin: 0 0 12px;
  white-space: pre-line;
`;

export const Reply = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: ${colors.textSecondary};
  background: ${colors.base};
  border-radius: 10px;
  padding: 10px 12px;
  margin-bottom: 12px;

  a {
    color: ${colors.text};
    font-weight: 700;
  }
`;

export const ReplyLabel = styled.span`
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${colors.textMuted};
  margin-bottom: 2px;
`;
