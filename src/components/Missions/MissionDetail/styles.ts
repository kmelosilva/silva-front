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
`;

export const StatusTag = styled.span<{ $done: boolean }>`
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 2px;
  color: ${({ $done }) => ($done ? "#86efac" : "#fcd34d")};
  border: 1px solid ${({ $done }) => ($done ? "#86efac44" : "#fcd34d44")};
  padding: 3px 8px;
  border-radius: 4px;
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

const button = (color: string) => `
  font-family: 'DM Mono', monospace;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 8px;
  cursor: pointer;
  transition: all .2s ease;

  &:disabled {
    opacity: .5;
    cursor: wait;
  }

  &:focus-visible {
    outline: 2px solid ${color};
    outline-offset: 2px;
  }
`;

export const AcceptButton = styled.button<{ $color: string }>`
  ${({ $color }) => button($color)}
  margin-top: 20px;
  padding: 11px 20px;
  font-size: 12px;
  border: 1px solid ${({ $color }) => $color};
  background: ${({ $color }) => $color};
  color: #0b1020;

  &:hover:not(:disabled) {
    filter: brightness(1.1);
  }
`;

export const CompleteButton = styled.button<{ $color: string }>`
  ${({ $color }) => button($color)}
  margin-top: 16px;
  padding: 9px 16px;
  font-size: 11px;
  border: 1px solid ${({ $color }) => $color};
  background: transparent;
  color: ${({ $color }) => $color};

  &:hover:not(:disabled) {
    background: ${({ $color }) => $color}22;
  }
`;

const noticeColors = {
  success: { fg: "#bbf7d0", bg: "#052e16", border: "#22c55e55" },
  highlight: { fg: "#ede9fe", bg: "#2e1065", border: "#a78bfa" },
  info: { fg: "#cbd5e1", bg: "#0f172a", border: "#33415588" },
  error: { fg: "#fecaca", bg: "#1c0a0a", border: "#f8717155" },
};

export const NoticeBox = styled.div<{ $tone: keyof typeof noticeColors }>`
  font-family: ${readingFont};
  font-size: 15px;
  font-weight: ${({ $tone }) => ($tone === "highlight" ? 700 : 400)};
  line-height: 1.5;
  color: ${({ $tone }) => noticeColors[$tone].fg};
  background: ${({ $tone }) => noticeColors[$tone].bg};
  border: 1px solid ${({ $tone }) => noticeColors[$tone].border};
  border-radius: 12px;
  padding: 14px 18px;
  margin-bottom: 16px;
  animation: ${fadeUp} .3s ease both;
`;

export const List = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Item = styled.li<{ $color: string; $state: "done" | "next" | "idle" }>`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  background: #080f1a;
  border: 1px solid ${({ $state, $color }) =>
    $state === "next" ? $color : $state === "done" ? "#86efac55" : "#1e293b"};
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
