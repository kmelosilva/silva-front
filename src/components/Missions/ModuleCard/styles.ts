import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Card = styled.div<{ $color: string }>`
  background: #080f1a;
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 24px 20px;
  cursor: pointer;
  animation: ${fadeUp} .4s ease both;
  transition: all .2s ease;
  text-align: center;

  &:hover {
    background: #0f172a;
    border-color: ${({ $color }) => $color}55;
    transform: translateY(-2px);
    box-shadow: ${({ $color }) => `0 8px 32px ${$color}18`};
  }
`;

export const Emoji = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
`;

export const Label = styled.p<{ $color: string }>`
  font-family: 'Syne', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${({ $color }) => $color};
  margin: 0 0 6px;
  text-transform: uppercase;
`;

export const Count = styled.p`
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: #475569;
  margin: 0;
`;
