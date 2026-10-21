import styled from "styled-components";
import { colors, fonts } from "../../theme/tokens";

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 560px;
  background: ${colors.surface};
  border: 1px solid ${colors.raised};
  border-radius: 20px;
  padding: 32px 32px 36px;
  box-shadow: 0 24px 64px ${colors.base}aa;

  @media (max-width: 480px) {
    padding: 24px 18px 28px;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  color: ${colors.text};
`;

export const Kicker = styled.p`
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${colors.textMuted};
`;

export const StepCount = styled.p`
  margin: 2px 0 0;
  font-size: 13px;
  color: ${colors.textSecondary};
`;

export const Title = styled.h1`
  font-family: ${fonts.display};
  font-size: 20px;
  line-height: 1.3;
  letter-spacing: .5px;
  color: ${colors.text};
  margin: 0 0 16px;
`;

export const Lead = styled.p`
  font-size: 15px;
  color: ${colors.textSecondary};
  margin: -6px 0 18px;
`;

// O juramento é para ler com calma: fonte de leitura, maior, com a margem do mentor.
export const Oath = styled.blockquote`
  margin: 0 0 16px;
  padding: 18px 20px;
  background: ${colors.base};
  border-left: 3px solid ${colors.focus};
  border-radius: 12px;
  font-size: 17px;
  line-height: 1.6;
  color: ${colors.text};
`;

export const CodeToggle = styled.button`
  background: none;
  border: none;
  padding: 4px 0;
  font-family: ${fonts.reading};
  font-size: 14px;
  font-weight: 600;
  color: ${colors.text};
  text-decoration: underline;
  text-decoration-color: ${colors.focus};
  text-underline-offset: 3px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const CodeList = styled.ol`
  margin: 12px 0 0;
  padding-left: 22px;
  font-size: 15px;
  line-height: 1.55;
  color: ${colors.textSecondary};

  li + li {
    margin-top: 10px;
  }

  strong {
    color: ${colors.text};
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
`;

export const SecondaryButton = styled.button`
  width: 100%;
  padding: 11px 0;
  border-radius: 8px;
  border: 1px solid ${colors.raised};
  background: transparent;
  color: ${colors.textSecondary};
  font-family: ${fonts.reading};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color .15s, color .15s;

  &:hover:not(:disabled) {
    border-color: ${colors.focus};
    color: ${colors.text};
  }

  &:disabled { opacity: 0.6; cursor: not-allowed; }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const MentorText = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.55;
  color: ${colors.text};
`;

// A prévia do codinome, na fonte da marca.
export const Codename = styled.p`
  font-family: ${fonts.display};
  font-size: 22px;
  line-height: 1.3;
  color: ${colors.text};
  margin: 24px 0 20px;
  overflow-wrap: anywhere;
`;

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Suffix = styled.span`
  flex-shrink: 0;
  font-size: 15px;
  font-weight: 600;
  color: ${colors.textSecondary};
`;

export const Loading = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${colors.textSecondary};
`;
