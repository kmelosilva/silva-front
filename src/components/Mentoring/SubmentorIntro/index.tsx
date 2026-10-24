import { useEffect, useRef } from "react";
import type { Submentor } from "../../../types/mentoring";
import { getCategoryVisual } from "../../../config/categoryConfig";
import { submentorPortrait } from "../../../config/submentorConfig";
import { Card, Figure, Body, Kicker, Name, Facts, Intro, GoButton } from "./styles";

interface SubmentorIntroProps {
  submentor: Submentor;
  onClose: () => void;
}

// A apresentação do submentor da área: uma vez por área, e de novo pelo retrato (RF-01).
export default function SubmentorIntro({ submentor, onClose }: SubmentorIntroProps) {
  const visual = getCategoryVisual(submentor.area.key);
  const portrait = submentorPortrait(submentor.area.key);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // O foco vai para a apresentação, para o leitor de tela começar por ela.
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <Card $color={visual.color} aria-labelledby="submentor-intro-title">
      <Figure $color={visual.color}>
        {portrait ? <img src={portrait} alt="" /> : <span aria-hidden="true">{visual.emoji}</span>}
      </Figure>
      <Body>
        <Kicker $color={visual.color}>DO NINHO · {submentor.area.label.toUpperCase()}</Kicker>
        <Name id="submentor-intro-title" ref={titleRef} tabIndex={-1}>{submentor.codename}</Name>
        <Facts>
          <span>{submentor.animal}</span>
          <span aria-hidden="true">·</span>
          <span>Power-up: {submentor.power_up}</span>
        </Facts>
        <Intro>{submentor.intro}</Intro>
        <GoButton type="button" $color={visual.color} onClick={onClose}>
          Bora
        </GoButton>
      </Body>
    </Card>
  );
}
