import styled from "styled-components";
import { colors, fonts } from "../../../theme/tokens";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// O cartão inteiro é o rótulo: clicar em qualquer parte marca a área.
export const Option = styled.label<{ $color: string; $checked: boolean; $blocked: boolean }>`
  position: relative;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: 12px;
  background: ${({ $checked }) => ($checked ? colors.primary : colors.base)};
  border: 2px solid ${({ $checked, $color }) => ($checked ? $color : colors.raised)};
  cursor: ${({ $blocked }) => ($blocked ? "not-allowed" : "pointer")};
  transition: border-color .15s, background .15s;

  &:hover {
    border-color: ${({ $blocked, $color }) => ($blocked ? colors.raised : $color)};
  }

  &:focus-within {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }

  input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }
`;

export const Emoji = styled.span`
  font-size: 22px;
  line-height: 1.2;
`;

export const Name = styled.span<{ $color: string }>`
  display: block;
  font-family: ${fonts.display};
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  margin-bottom: 4px;
`;

export const Description = styled.span`
  display: block;
  font-size: 14px;
  line-height: 1.45;
  color: ${colors.textSecondary};
`;

export const Count = styled.span`
  display: block;
  margin-top: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.textMuted};
`;

export const Counter = styled.p`
  margin: 12px 0 0;
  font-size: 13px;
  color: ${colors.textMuted};
`;
