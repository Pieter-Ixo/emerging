import BaseIcon from "@/components/Presentational/BaseIcon";
import { palette } from "@/theme/palette";
import CollectionRawIcon from "@/assets/icons/collection.svg";

type Props = {
  isActive: boolean;
};

export default function GridViewIcon({ isActive }: Props) {
  return (
    <BaseIcon
      cursorMode="pointer"
      isStroke
      variant="circle"
      status={isActive ? "selected" : "notSelected"}
      theme={{
        notSelected: {
          bgColor: palette.Neutral200,
          fill: palette.transparent,
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
