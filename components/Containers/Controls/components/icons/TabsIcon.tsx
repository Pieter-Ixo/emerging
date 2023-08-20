import BaseIcon from "@/components/Presentational/BaseIcon";
import { palette } from "@/theme/palette";
import Icon from "@/assets/icons/tabs.svg";

export default function TabsIcon() {
  return (
    <BaseIcon
      isPointer
      Icon={Icon}
      width={24}
      status="disabled"
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
