import styled from "styled-components";
import { colors } from "../../../theme/tokens";

export const Wrapper = styled.div`
  width: 100%;
`;

export const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${colors.textSecondary};
  margin-bottom: 4px;
`;

export const Track = styled.div`
  height: 8px;
  background: ${colors.base};
  border: 1px solid ${colors.raised};
  border-radius: 99px;
  overflow: hidden;
`;

export const Fill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: linear-gradient(90deg, ${colors.primary}, ${colors.focus});
  border-radius: 99px;
  box-shadow: 0 0 10px ${colors.focus}55;
  transition: width 1s cubic-bezier(.4, 0, .2, 1);
`;
