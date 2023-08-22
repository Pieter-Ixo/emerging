import BaseIcon from "@/components/Presentational/BaseIcon";
import FuelRawIcon from "@/assets/icons/cookstove-fuel.svg";

type Props = {
  isActive: boolean;
};

export default function CookstoveFuelIcon({ isActive }: Props) {
  return (
    <BaseIcon
      height={25}
      width={24}
      isPointer
      status={isActive ? "selected" : "notSelected"}
      Icon={FuelRawIcon}
    />
  );
}
