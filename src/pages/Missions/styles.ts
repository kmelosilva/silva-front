import styled, { keyframes, createGlobalStyle } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const GlobalMissions = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #080f1a; }
  ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 99px; }
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: #040810;
  color: #e2e8f0;
  font-family: 'DM Mono', monospace;
`;

export const Navbar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  height: 56px;
  padding: 0 32px;
  border-bottom: 1px solid #0f172a;
  background: #04081099;
  backdrop-filter: blur(12px);
`;

export const NavBrand = styled.span`
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: -0.5px;
  color: #f8fafc;

  span { color: #6366f1; }
`;

export const Badge = styled.span<{ $color: string; $bg: string; $border: string }>`
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  padding: 2px 8px;
  border-radius: 4px;
  letter-spacing: 1px;
`;

export const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid #1e293b;
  color: #475569;
  padding: 6px 14px;
  border-radius: 8px;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all .15s;

  &:hover {
    border-color: #ef4444;
    color: #ef4444;
  }
`;

export const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px;
`;

export const FilterButton = styled.button<{ $color: string; $active: boolean }>`
  padding: 7px 16px;
  border-radius: 99px;
  border: 1px solid ${({ $color, $active }) => ($active ? $color : "#1e293b")};
  background: ${({ $color, $active }) => ($active ? $color + "18" : "transparent")};
  color: ${({ $color, $active }) => ($active ? $color : "#475569")};
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .15s;
`;

export const FiltersWrapper = styled.div`
  animation: ${fadeUp} .5s .1s ease both;
`;

export const MissionsWrapper = styled.div`
  animation: ${fadeUp} .5s .2s ease both;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 80px 0;
  color: #334155;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 2px;
`;

export const ErrorBox = styled.div`
  background: #1a0505;
  border: 1px solid #ef444433;
  border-radius: 12px;
  padding: 16px 20px;
  color: #ef4444;
  font-size: 12px;
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 80px 0;
  color: #334155;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 2px;
`;
