import styled from "styled-components";
import { colors, fonts } from "../../../theme/tokens";

export const Spot = styled.div`
  margin-bottom: 20px;
`;

export const Text = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.textSecondary};
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
`;

const button = `
  padding: 8px 16px;
  border-radius: 8px;
  font-family: ${fonts.reading};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s ease;

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const ActionButton = styled.button`
  ${button}
  border: 1px solid ${colors.focus};
  background: ${colors.primary};
  color: ${colors.text};

  &:hover { background: ${colors.raised}; }
`;

export const LaterButton = styled.button`
  ${button}
  border: 1px solid ${colors.raised};
  background: transparent;
  color: ${colors.textSecondary};

  &:hover { border-color: ${colors.focus}; color: ${colors.text}; }
`;
