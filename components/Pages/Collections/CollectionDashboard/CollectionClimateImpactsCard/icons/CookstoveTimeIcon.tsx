import BaseIcon from "@/components/Presentational/BaseIcon";
import Icon from "@/assets/icons/cookstove-time.svg";

type Props = {
  isActive: boolean;
};
export default function CookstoveTimeIcon({ isActive }: Props) {
  return (
    <BaseIcon
      status={isActive ? "selected" : "notSelected"}
      width={24}
      height={25}
      Icon={Icon}
    />
  );
}
