import { PropsWithChildren } from "react";
import { Flex, Text } from "@mantine/core";

import { palette } from "@/theme/palette";

export default function TagForSomethingIDunnoWhat({
  children,
  label,
}: PropsWithChildren & { label: string }) {
  return (
    <Flex direction="column" gap={4} justify="center" align="center">
      <Text
        color={palette.darkestBlue}
        sx={{ fontSize: 10 }}
        transform="uppercase"
      >
        {label}
      </Text>

      <Flex
        justify="center"
        align="center"
        sx={{
          width: 150,
          height: 48,
          borderRadius: 10,
          background: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <Text color={palette.darkestBlue} sx={{ fontSize: 13 }}>
          {children}
        </Text>
      </Flex>
    </Flex>
  );
}
