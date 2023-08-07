import { PropsWithChildren } from "react";
import { Text } from "@mantine/core";

import { palette } from "@/theme/palette";

export default function CardTitle({ children }: PropsWithChildren) {
  return (
    <Text
      fw={700}
      color={palette.White}
      align="center"
      sx={{
        fontFamily: "Quicksand",
        fontSize: "18px",
        letterSpacing: "0.1rem",
        textTransform: "uppercase",
      }}
    >
      {children}
    </Text>
  );
}
