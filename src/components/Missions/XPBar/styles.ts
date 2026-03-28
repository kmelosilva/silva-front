import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
`;

export const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: #64748b;
  margin-bottom: 4px;
`;

export const Track = styled.div`
  height: 6px;
  background: #1e293b;
  border-radius: 99px;
  overflow: hidden;
`;

export const Fill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: linear-gradient(90deg, #6366f1, #a78bfa);
  border-radius: 99px;
  box-shadow: 0 0 10px #6366f155;
  transition: width 1s cubic-bezier(.4, 0, .2, 1);
`;
