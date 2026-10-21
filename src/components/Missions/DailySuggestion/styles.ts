import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const readingFont = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

export const Card = styled.section<{ $color: string }>`
  background: #080f1a;
  border: 1px solid #1e293b;
  border-left: 3px solid ${({ $color }) => $color};
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 32px;
  animation: ${fadeUp} .4s ease both;
`;

export const Label = styled.p<{ $color: string }>`
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 2px;
  color: ${({ $color }) => $color};
  margin: 0 0 8px;
`;

export const Text = styled.p`
  font-family: ${readingFont};
  font-size: 16px;
  line-height: 1.5;
  color: #e2e8f0;
  margin: 0;

  strong {
    color: #f8fafc;
  }
`;

export const Sub = styled.p`
  font-family: ${readingFont};
  font-size: 14px;
  color: #94a3b8;
  margin: 4px 0 0;
`;

export const OpenButton = styled.button<{ $color: string }>`
  margin-top: 14px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${({ $color }) => $color};
  background: transparent;
  color: ${({ $color }) => $color};
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s ease;

  &:hover {
    background: ${({ $color }) => $color}22;
  }

  &:focus-visible {
    outline: 2px solid ${({ $color }) => $color};
    outline-offset: 2px;
  }
`;
