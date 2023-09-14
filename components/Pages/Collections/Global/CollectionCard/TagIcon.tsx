import SDG7 from "@/assets/sdg-icons/SDG7.svg";
import SDG13 from "@/assets/sdg-icons/SDG13.svg";

type Props = { name: string };

export default function TagIcon({ name }: Props) {
  let IconComponent;

  if (name === "SDG13 – Climate Action") IconComponent = SDG13;
  if (name === "SDG7 – Affordable and Clean Energy") IconComponent = SDG7;

  return <IconComponent alt={name} width={30} height={30} fill="white" />;
}
