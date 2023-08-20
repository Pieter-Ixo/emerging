import BaseIcon from "@/components/Presentational/BaseIcon";
import Icon from "@/assets/icons/cookstove-location.svg";

type Props = {
  isActive: boolean;
};

export default function CookstoveLocationIcon({ isActive }: Props) {
  return (
    <BaseIcon
      width={24}
      height={25}
      status={isActive ? "selected" : "notSelected"}
      Icon={Icon}
    />
  );
}
