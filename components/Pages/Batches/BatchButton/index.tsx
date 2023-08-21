import { palette } from "@/theme/palette";
import { Button } from "@mantine/core";
import { MouseEvent, PropsWithChildren } from "react";

export default function BatchButton({ children }: PropsWithChildren) {
  const onBtnClick = (e: MouseEvent<any>) => {
    e.stopPropagation();
  };
  return (
    <Button
      radius="xl"
      miw={45}
      h={45}
      p={0}
      sx={{
        backgroundColor: palette.whiteTransparent,
        cursor: "default",
        "&[data-disabled]": { backgroundColor: palette.whiteTransparent },
        ":hover": { backgroundColor: palette.whiteTransparent },
      }}
      disabled
    >
      {children}
    </Button>
  );
}
