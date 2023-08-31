import BaseIcon from "@/components/Presentational/BaseIcon";
import { ViewMods } from "@/types/stove";
import { palette } from "@/theme/palette";
import TabsRawIcon from "@/assets/icons/tabs.svg";

type Props = {
  activeViewMode: ViewMods;
};

export default function TabsIcon({ activeViewMode }: Props) {
  return (
    <BaseIcon
      cursorMode="pointer"
      Icon={TabsRawIcon}
      width={24}
      status={activeViewMode === ViewMods.listView ? "selected" : "notSelected"}
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
