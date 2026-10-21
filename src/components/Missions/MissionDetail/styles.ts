import styled, { keyframes } from "styled-components";
import { colors, fonts } from "../../../theme/tokens";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Header = styled.header<{ $color: string }>`
  background: ${colors.surface};
  border: 1px solid ${colors.raised};
  border-left: 3px solid ${({ $color }) => $color};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  animation: ${fadeUp} .4s ease both;
`;

export const CategoryTag = styled.span<{ $color: string; $bg: string }>`
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $color }) => $color}55;
  padding: 3px 8px;
  border-radius: 4px;
`;

export const StatusTag = styled.span<{ $done: boolean }>`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: ${({ $done }) => ($done ? colors.success : colors.attention)};
  background: ${colors.base};
  border: 1px solid ${({ $done }) => ($done ? colors.success : colors.attention)}55;
  padding: 3px 8px;
  border-radius: 4px;
`;

export const Title = styled.h2`
  font-family: ${fonts.display};
  font-size: 24px;
  color: ${colors.text};
  margin: 0 0 10px;
`;

export const Description = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${colors.textSecondary};
  margin: 0 0 12px;
`;

export const Meta = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${colors.textMuted};
  margin: 0;
`;

const button = `
  font-family: ${fonts.reading};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 8px;
  cursor: pointer;
  transition: all .2s ease;

  &:disabled {
    opacity: .6;
    cursor: wait;
  }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const AcceptButton = styled.button`
  ${button}
  margin-top: 20px;
  padding: 11px 20px;
  font-size: 12px;
  border: 1px solid ${colors.focus}55;
  background: ${colors.primary};
  color: ${colors.text};

  &:hover:not(:disabled) {
    background: ${colors.raised};
  }
`;

export const CompleteButton = styled.button<{ $color: string }>`
  ${button}
  margin-top: 16px;
  padding: 9px 16px;
  font-size: 11px;
  border: 1px solid ${({ $color }) => $color};
  background: ${colors.base};
  color: ${({ $color }) => $color};

  &:hover:not(:disabled) {
    background: ${({ $color }) => $color}22;
  }
`;

const noticeColors = {
  success: { fg: colors.success, bg: colors.base, border: `${colors.success}55` },
  highlight: { fg: colors.text, bg: colors.primary, border: colors.focus },
  info: { fg: colors.textSecondary, bg: colors.base, border: colors.raised },
  error: { fg: colors.error, bg: colors.base, border: `${colors.error}66` },
};

export const NoticeBox = styled.div<{ $tone: keyof typeof noticeColors }>`
  font-size: 15px;
  font-weight: ${({ $tone }) => ($tone === "highlight" ? 700 : 400)};
  line-height: 1.5;
  color: ${({ $tone }) => noticeColors[$tone].fg};
  background: ${({ $tone }) => noticeColors[$tone].bg};
  border: 1px solid ${({ $tone }) => noticeColors[$tone].border};
  border-radius: 12px;
  padding: 14px 18px;
  margin-bottom: 16px;
  animation: ${fadeUp} .3s ease both;
`;

export const NoticeSpot = styled.div`
  margin-bottom: 16px;
  font-weight: 700;
  line-height: 1.5;
`;

export const List = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Item = styled.li<{ $color: string; $state: "done" | "next" | "idle" }>`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  background: ${colors.surface};
  border: 1px solid ${({ $state, $color }) =>
    $state === "next" ? $color : $state === "done" ? `${colors.success}66` : colors.raised};
  border-radius: 16px;
  padding: 20px;
  animation: ${fadeUp} .4s ease both;
`;

export const Step = styled.span<{ $color: string }>`
  font-family: ${fonts.display};
  font-size: 18px;
  line-height: 1.3;
  color: ${({ $color }) => $color};
  min-width: 36px;
`;

export const ItemBody = styled.div`
  flex: 1;
  min-width: 0;
`;

// Título da coordenada na fonte de leitura: a fonte larga da marca fica nos títulos curtos.
export const ItemTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${colors.text};
  margin: 0 0 8px;
`;

export const ItemText = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${colors.textSecondary};
  margin: 0;
  white-space: pre-line;
`;

export const ItemXP = styled.span<{ $color: string }>`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color}55;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
`;
