import styled from "styled-components";
import { colors } from "../../../theme/tokens";

export const Spot = styled.div`
  margin-top: 24px;
  font-size: 15px;
  line-height: 1.6;

  p { margin: 0; }
`;

export const Path = styled.div`
  margin-top: 14px;
`;

export const PathTitle = styled.p`
  && { margin-bottom: 8px; }
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${colors.textSecondary};
`;

export const Step = styled.blockquote<{ $accent: string }>`
  margin: 0 0 10px;
  padding: 8px 12px;
  border-left: 3px solid ${({ $accent }) => $accent};
  border-radius: 6px;
  background: ${colors.base};
`;

export const StepTitle = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: ${colors.textMuted};
`;

export const StepText = styled.p`
  font-size: 14px;
  color: ${colors.text};
  white-space: pre-line;
`;
