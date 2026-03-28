import styled from "styled-components";

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
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: ${({ $color }) => $color};
  letter-spacing: 2px;
`;

export const CategoryCount = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: #334155;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`;
