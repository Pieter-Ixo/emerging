import BaseIcon from "@/components/Presentational/BaseIcon";
import Icon from "@/assets/icons/cookstove-costs.svg";

type Props = {
  isActive: boolean;
};

export default function CookstoveCostsIcon({ isActive }: Props) {
  return (
    <BaseIcon
      height={25}
      width={24}
      isPointer
      status={isActive ? "selected" : "notSelected"}
      Icon={Icon}
    />
  );
}
