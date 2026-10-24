import styled from "styled-components";
import { colors } from "../../../theme/tokens";

export const Box = styled.section`
  background: ${colors.base};
  border: 1px solid ${colors.focus};
  border-radius: 12px;
  padding: 16px 18px;
`;

export const Label = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: ${colors.textMuted};
  margin: 0 0 8px;
`;

export const Text = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${colors.text};
  margin: 0;

  a {
    color: ${colors.text};
    font-weight: 700;
    text-decoration: underline;
  }

  a:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;
