import ContactLinks from "../ContactLinks";
import { Box, Label, Text } from "./styles";

// A mensagem de cuidado (RF-04): fora do personagem, sem retrato e sem cor de área,
// igual em todas as áreas. O texto vem da API.
export default function CareMessage({ text }: { text: string }) {
  return (
    <Box role="status" aria-live="polite">
      <Label>UM RECADO DA SILVA</Label>
      <Text><ContactLinks text={text} /></Text>
    </Box>
  );
}
