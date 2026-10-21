import styled from "styled-components";
import { colors, fonts } from "../../../theme/tokens";

export const Section = styled.section`
  background: ${colors.surface};
  border: 1px solid ${colors.raised};
  border-radius: 20px;
  padding: 28px 32px;

  @media (max-width: 480px) {
    padding: 22px 18px;
  }
`;

export const Title = styled.h2`
  font-family: ${fonts.display};
  font-size: 20px;
  color: ${colors.text};
  margin: 0 0 8px;
`;

export const Lead = styled.p`
  font-size: 15px;
  color: ${colors.textSecondary};
  margin: 0 0 20px;
`;

export const ErrorBox = styled.div`
  background: ${colors.base};
  border: 1px solid ${colors.error}66;
  border-radius: 8px;
  padding: 10px 14px;
  color: ${colors.error};
  font-size: 13px;
  margin-bottom: 16px;
`;

export const Loading = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${colors.textSecondary};
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
`;

const button = `
  padding: 11px 20px;
  border-radius: 8px;
  font-family: ${fonts.reading};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;

  &:disabled { opacity: 0.6; cursor: not-allowed; }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const SaveButton = styled.button`
  ${button}
  border: 1px solid ${colors.focus}55;
  background: ${colors.primary};
  color: ${colors.text};

  &:hover:not(:disabled) { background: ${colors.raised}; }
`;

export const CancelButton = styled.button`
  ${button}
  border: 1px solid ${colors.raised};
  background: transparent;
  color: ${colors.textSecondary};

  &:hover:not(:disabled) { border-color: ${colors.focus}; color: ${colors.text}; }
`;
