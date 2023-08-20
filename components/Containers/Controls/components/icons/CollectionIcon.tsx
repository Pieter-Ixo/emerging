import BaseIcon from "@/components/Presentational/BaseIcon";
import { palette } from "@/theme/palette";
import Icon from "@/assets/icons/collection.svg";

export default function CollectionIcon() {
  return (
    <BaseIcon
      isPointer
      isStroke
      variant="circle"
      status="disabled"
      theme={{
        disabled: {
          fill: palette.whiteTransparent,
        },
        notSelected: {
          bgColor: palette.Neutral200,
          stroke: palette.Black,
        },
        selected: {
          stroke: palette.White,
        },
      }}
      width={24}
      height={25}
      Icon={Icon}
    />
  );
}
