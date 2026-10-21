// "Agora não" vale até o fim da sessão do navegador: no próximo acesso, a agência pergunta de novo.
// Sem armazenamento disponível (aba privada, bloqueio), cada visita pergunta de novo.
type Reminder = "enlistment" | "priorities";

const REMINDERS: Reminder[] = ["enlistment", "priorities"];
const key = (reminder: Reminder) => `silva.later.${reminder}`;

export function isLater(reminder: Reminder): boolean {
  try {
    return sessionStorage.getItem(key(reminder)) === "1";
  } catch {
    return false;
  }
}

export function later(reminder: Reminder): void {
  try {
    sessionStorage.setItem(key(reminder), "1");
  } catch {
    // Sem armazenamento: o convite volta na próxima visita.
  }
}

// Entrar ou criar conta é um acesso novo: os "agora não" anteriores deixam de valer.
export function forgetLater(): void {
  try {
    REMINDERS.forEach((reminder) => sessionStorage.removeItem(key(reminder)));
  } catch {
    // Nada a limpar.
  }
}
