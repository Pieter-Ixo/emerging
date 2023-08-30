import BaseIcon from "@/components/Presentational/BaseIcon";
import CookstoveTimeRawIcon from "@/assets/icons/cookstove-time.svg";

type Props = {
  isActive: boolean;
};
export default function CookstoveTimeIcon({ isActive }: Props) {
  return (
    <BaseIcon
      status={isActive ? "selected" : "notSelected"}
      width={24}
      cursorMode="pointer"
      height={25}
      Icon={CookstoveTimeRawIcon}
    />
  );
}
