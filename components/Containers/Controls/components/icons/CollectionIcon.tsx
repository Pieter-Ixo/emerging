import BaseIcon from "@/components/Presentational/BaseIcon";
import { palette } from "@/theme/palette";
import CollectionRawIcon from "@/assets/icons/collection.svg";
import { ViewMods } from "@/types/stove";

type Props = {
  activeViewMode: ViewMods;
};

export default function CollectionIcon({ activeViewMode }: Props) {
  return (
    <BaseIcon
      cursorMode="pointer"
      isStroke
      variant="circle"
      status={activeViewMode === ViewMods.gridView ? "selected" : "notSelected"}
      theme={{
        disabled: {
          fill: palette.whiteTransparent,
        },
        notSelected: {
          bgColor: palette.Neutral200,
          fill: "transparent",
          stroke: palette.Black,
        },
        selected: {
          fill: palette.transparent,
          stroke: palette.White,
        },
      }}
      width={24}
      height={25}
      Icon={CollectionRawIcon}
    />
  );
}
