// Qual boas-vindas o submentor mostra ao abrir uma missão parada (RF-06.3): a seguinte à
// última que apareceu naquela missão, para a mesma não aparecer duas vezes seguidas.
// A posição fica no navegador; em outro aparelho, a sequência recomeça.
// Sem armazenamento disponível (aba privada, bloqueio), começa sempre pela do slug.
const key = (missionSlug: string) => `silva.welcomeBack.${missionSlug}`;

// Missões diferentes não abrem com o mesmo texto.
const startFor = (missionSlug: string, count: number) =>
  [...missionSlug].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 0) % count;

// Só lê: a tela grava a posição depois de mostrar (rememberWelcomeBack), e ler duas vezes
// (o StrictMode faz isso no desenvolvimento) dá o mesmo resultado.
export function nextWelcomeBack(missionSlug: string, count: number): number {
  try {
    const last = Number(localStorage.getItem(key(missionSlug)));
    const stored = localStorage.getItem(key(missionSlug)) !== null && Number.isInteger(last) && last >= 0 && last < count;
    return stored ? (last + 1) % count : startFor(missionSlug, count);
  } catch {
    return startFor(missionSlug, count);
  }
}

export function rememberWelcomeBack(missionSlug: string, index: number): void {
  try {
    localStorage.setItem(key(missionSlug), String(index));
  } catch {
    // Sem armazenamento: na próxima vez, começa de novo pela do slug.
  }
}
