import { Fragment } from "react";

// Os contatos de ajuda viram links, para ligar ou abrir com um toque no celular.
const CONTACTS: Record<string, string> = {
  "188": "tel:188",
  "190": "tel:190",
  "192": "tel:192",
  "cvv.org.br": "https://cvv.org.br",
};
const CONTACT_PATTERN = /(188|190|192|cvv\.org\.br)/;

export default function ContactLinks({ text }: { text: string }) {
  return (
    <>
      {text.split(CONTACT_PATTERN).map((part, i) =>
        CONTACTS[part] ? (
          <a key={i} href={CONTACTS[part]} target={part.startsWith("cvv") ? "_blank" : undefined} rel="noreferrer">
            {part}
          </a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ))}
    </>
  );
}
