import MentorMessage from "../../Brand/MentorMessage";
import { Spot, Text, Actions, ActionButton, LaterButton } from "./styles";

interface AgencyInviteProps {
  label: string;
  text: string;
  actionLabel: string;
  onAction: () => void;
  // Sem "Agora não", o convite fica até a ação ser feita.
  onLater?: () => void;
}

// Um convite da agência acima dos módulos: o alistamento pela metade ou a prioridade que falta.
export default function AgencyInvite({ label, text, actionLabel, onAction, onLater }: AgencyInviteProps) {
  return (
    <Spot>
      <MentorMessage label={label}>
        <Text>{text}</Text>
        <Actions>
          <ActionButton type="button" onClick={onAction}>{actionLabel}</ActionButton>
          {onLater && <LaterButton type="button" onClick={onLater}>Agora não</LaterButton>}
        </Actions>
      </MentorMessage>
    </Spot>
  );
}
