import corujaSvg from "../../assets/brand/coruja.svg?raw";
import completoSvg from "../../assets/brand/silva-logo.svg?raw";

// O desenho vem dos arquivos da marca, a única fonte do vetor, e é pintado com a cor do texto.
function readArt(svg: string) {
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 1 1";
  const [, , width, height] = viewBox.split(" ").map(Number);
  return { viewBox, d: svg.match(/ d="([^"]+)"/)?.[1] ?? "", ratio: width / height };
}

const ART = {
  coruja: readArt(corujaSvg),
  completo: readArt(completoSvg),
};

interface LogoProps {
  variant?: keyof typeof ART;
  height: number;
  className?: string;
}

export default function Logo({ variant = "completo", height, className }: LogoProps) {
  const art = ART[variant];

  return (
    <svg
      role="img"
      aria-label="Silva"
      viewBox={art.viewBox}
      width={Math.round(height * art.ratio)}
      height={height}
      fill="currentColor"
      className={className}
    >
      <path fillRule="evenodd" d={art.d} />
    </svg>
  );
}
