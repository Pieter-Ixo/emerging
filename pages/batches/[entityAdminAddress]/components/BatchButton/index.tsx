import { palette } from "@/theme/palette";
import { Button } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function BatchButton({ children }: PropsWithChildren) {
  return (
    <Button
      radius="xl"
      miw={45}
      h={45}
      p={0}
      sx={{ backgroundColor: palette.whiteTransparent }}
    >
      {children}
    </Button>
  );
}
