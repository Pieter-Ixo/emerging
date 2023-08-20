import BaseIcon from "@/components/Presentational/BaseIcon";
import Icon from "@/assets/icons/cookstove-usage.svg";

type Props = {
  isActive: boolean;
};

export default function CookstoveUsageIcon({ isActive }: Props) {
  return (
    <BaseIcon
      status={isActive ? "selected" : "notSelected"}
      width={19}
      height={23}
      Icon={Icon}
    />
  );
}
