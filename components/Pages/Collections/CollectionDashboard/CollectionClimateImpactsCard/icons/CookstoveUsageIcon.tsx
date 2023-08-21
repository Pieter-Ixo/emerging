import BaseIcon from "@/components/Presentational/BaseIcon";
import CookstoveUsageRawIcon from "@/assets/icons/cookstove-usage.svg";

type Props = {
  isActive: boolean;
};

export default function CookstoveUsageIcon({ isActive }: Props) {
  return (
    <BaseIcon
      status={isActive ? "selected" : "notSelected"}
      isPointer
      width={19}
      height={23}
      Icon={CookstoveUsageRawIcon}
    />
  );
}
