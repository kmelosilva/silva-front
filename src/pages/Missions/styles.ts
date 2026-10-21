import styled, { keyframes } from "styled-components";
import { colors, fonts } from "../../theme/tokens";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  color: ${colors.text};
`;

export const Navbar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  height: 64px;
  padding: 0 32px;
  border-bottom: 1px solid ${colors.raised};
  background: ${colors.base}e6;
  backdrop-filter: blur(12px);
`;

export const NavBrand = styled.span`
  color: ${colors.text};
  line-height: 0;
`;

export const Badge = styled.span<{ $color: string }>`
  font-size: 11px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  background: ${colors.base};
  border: 1px solid ${({ $color }) => $color}55;
  padding: 3px 9px;
  border-radius: 4px;
  letter-spacing: 1px;
`;

export const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid ${colors.raised};
  color: ${colors.textSecondary};
  padding: 6px 14px;
  border-radius: 8px;
  font-family: ${fonts.reading};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all .15s;

  &:hover {
    border-color: ${colors.error};
    color: ${colors.error};
  }
`;

export const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px;
`;

export const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  animation: ${fadeUp} .5s .1s ease both;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${colors.base};
  border: 1px solid ${colors.raised};
  color: ${colors.textSecondary};
  padding: 7px 14px;
  border-radius: 8px;
  font-family: ${fonts.reading};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 24px;
  transition: all .15s;

  &:hover {
    border-color: ${colors.focus};
    color: ${colors.text};
  }
`;

export const MissionsWrapper = styled.div`
  animation: ${fadeUp} .5s .2s ease both;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 80px 0;
  color: ${colors.textSecondary};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
`;

export const ErrorBox = styled.div`
  background: ${colors.base};
  border: 1px solid ${colors.error}66;
  border-radius: 12px;
  padding: 16px 20px;
  color: ${colors.error};
  font-size: 13px;
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 80px 0;
  color: ${colors.textSecondary};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
`;
