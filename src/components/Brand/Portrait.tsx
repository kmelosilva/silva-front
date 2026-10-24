import styled from "styled-components";
import { colors } from "../../theme/tokens";

// O retrato redondo de um submentor: a cabeça, recortada do desenho de corpo inteiro (800 × 1000).
const Frame = styled.span<{ $size: number; $accent: string }>`
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  overflow: hidden;
  background: ${colors.base};
  border: 1px solid ${({ $accent }) => $accent};

  img {
    position: absolute;
    width: 210%;
    left: -55%;
    top: -3%;
  }
`;

interface PortraitProps {
  src: string;
  size: number;
  accent?: string;
}

// Decorativo: quem fala está sempre escrito ao lado (codinome e área).
export default function Portrait({ src, size, accent = colors.focus }: PortraitProps) {
  return (
    <Frame $size={size} $accent={accent} aria-hidden="true">
      <img src={src} alt="" />
    </Frame>
  );
}
