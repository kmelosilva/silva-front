import styled from "styled-components";
import { colors, fonts } from "../../../theme/tokens";

export const Section = styled.section`
  margin-bottom: 48px;
`;

export const CategoryBar = styled.span<{ $color: string }>`
  width: 3px;
  height: 22px;
  border-radius: 99px;
  background: ${({ $color }) => $color};
  box-shadow: ${({ $color }) => `0 0 8px ${$color}`};
  display: inline-block;
  flex-shrink: 0;
`;

export const CategoryLabel = styled.span<{ $color: string }>`
  font-family: ${fonts.display};
  font-size: 13px;
  color: ${({ $color }) => $color};
  letter-spacing: 2px;
`;

export const CategoryCount = styled.span`
  font-size: 12px;
  color: ${colors.textSecondary};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`;
