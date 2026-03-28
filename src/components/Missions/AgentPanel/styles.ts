import styled, { keyframes } from "styled-components";

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 #6366f133; }
  50%       { box-shadow: 0 0 0 8px #6366f100; }
`;

export const Panel = styled.div`
  background: #080f1a;
  border: 1px solid #1e293b;
  border-radius: 20px;
  padding: 28px 32px;
  margin-bottom: 40px;
`;

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #1e1b4b;
  border: 2px solid #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  animation: ${pulseGlow} 3s ease infinite;
  flex-shrink: 0;
`;

export const AgentName = styled.p`
  font-family: 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #f8fafc;
  margin: 0;
`;

export const AgentStatus = styled.p`
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  color: #6366f1;
  letter-spacing: 1px;
  margin: 2px 0 0;
`;

export const StatNumber = styled.p<{ $accent?: boolean }>`
  font-family: 'Syne', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: ${({ $accent }) => ($accent ? "#a78bfa" : "#f8fafc")};
  margin: 0;
`;

export const StatLabel = styled.p`
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  color: #475569;
  letter-spacing: 1px;
  margin: 2px 0 0;
`;

export const XPLabel = styled.p`
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: #a78bfa;
  letter-spacing: 1px;
  margin: 0 0 8px;
`;
