import styled, { keyframes } from "styled-components";
import { colors } from "../../../theme/tokens";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

type Tone = "surface" | "highlight";

export const Wrapper = styled.section<{ $tone: Tone; $accent?: string }>`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  background: ${({ $tone }) => ($tone === "highlight" ? colors.primary : colors.surface)};
  border: 1px solid ${({ $tone }) => ($tone === "highlight" ? colors.focus : colors.raised)};
  border-left: 3px solid ${({ $accent }) => $accent ?? colors.focus};
  border-radius: 16px;
  padding: 18px 22px;
  color: ${colors.text};
  animation: ${fadeUp} .4s ease both;
`;

export const Seal = styled.div<{ $tone: Tone }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $tone }) => ($tone === "highlight" ? colors.base : colors.primary)};
  border: 1px solid ${colors.focus};
  color: ${colors.text};
`;

export const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Signature = styled.p<{ $tone: Tone }>`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: ${({ $tone }) => ($tone === "highlight" ? colors.textSecondary : colors.textMuted)};
  margin: 0 0 6px;
`;
