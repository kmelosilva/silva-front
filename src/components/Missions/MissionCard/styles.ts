import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Card = styled.div<{ $color: string }>`
  background: #080f1a;
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  animation: ${fadeUp} .4s ease both;
  transition: all .2s ease;

  &:hover {
    background: #0f172a;
    border-color: ${({ $color }) => $color}55;
    transform: translateY(-2px);
    box-shadow: ${({ $color }) => `0 8px 32px ${$color}18`};
  }
`;

export const ImageBox = styled.div<{ $bg: string; $color: string }>`
  height: 80px;
  border-radius: 10px;
  margin-bottom: 14px;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $color }) => $color}22;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  position: relative;
  overflow: hidden;
`;

export const XPBadge = styled.span<{ $bg: string; $color: string }>`
  position: absolute;
  bottom: 6px;
  right: 8px;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 1px;
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid ${({ $color }) => $color}44;
`;

export const Title = styled.p`
  font-family: 'Syne', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
  line-height: 1.4;
  min-height: 40px;
  margin: 0 0 14px;
`;

export const AcceptButton = styled.button<{ $color: string }>`
  width: 100%;
  padding: 9px 0;
  border-radius: 8px;
  border: 1px solid ${({ $color }) => $color};
  background: transparent;
  color: ${({ $color }) => $color};
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s ease;

  &:hover {
    background: ${({ $color }) => $color}22;
  }
`;
