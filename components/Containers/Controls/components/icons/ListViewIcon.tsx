import BaseIcon from "@/components/Presentational/BaseIcon";

import { palette } from "@/theme/palette";
import TabsRawIcon from "@/assets/icons/tabs.svg";

type Props = {
  isActive: boolean;
};

export default function ListViewIcon({ isActive }: Props) {
  return (
    <BaseIcon
      cursorMode="pointer"
      Icon={TabsRawIcon}
      width={24}
      status={isActive ? "selected" : "notSelected"}
      variant="circle"
      height={25}
      theme={{
        notSelected: {
          bgColor: palette.Neutral200,
        },
      }}
    />
  );
}
