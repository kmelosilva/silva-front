import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Texto corrido em fonte de leitura: a DM Mono cansa em parágrafo longo.
const readingFont = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

export const Header = styled.header<{ $color: string }>`
  background: #080f1a;
  border: 1px solid #1e293b;
  border-left: 3px solid ${({ $color }) => $color};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  animation: ${fadeUp} .4s ease both;
`;

export const CategoryTag = styled.span<{ $color: string; $bg: string }>`
  display: inline-block;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 2px;
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $color }) => $color}44;
  padding: 3px 8px;
  border-radius: 4px;
  margin-bottom: 12px;
`;

export const Title = styled.h2`
  font-family: 'Syne', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #f8fafc;
  margin: 0 0 8px;
`;

export const Description = styled.p`
  font-family: ${readingFont};
  font-size: 15px;
  line-height: 1.6;
  color: #cbd5e1;
  margin: 0 0 12px;
`;

export const Meta = styled.p`
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #94a3b8;
  margin: 0;
`;

export const List = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Item = styled.li`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  background: #080f1a;
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 20px;
  animation: ${fadeUp} .4s ease both;
`;

export const Step = styled.span<{ $color: string }>`
  font-family: 'Syne', sans-serif;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.2;
  color: ${({ $color }) => $color};
  min-width: 32px;
`;

export const ItemBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ItemTitle = styled.h3`
  font-family: 'Syne', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #f8fafc;
  margin: 0 0 8px;
`;

export const ItemText = styled.p`
  font-family: ${readingFont};
  font-size: 15px;
  line-height: 1.7;
  color: #cbd5e1;
  margin: 0;
  white-space: pre-line;
`;

export const ItemXP = styled.span<{ $color: string }>`
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 1px;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color}44;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
`;
