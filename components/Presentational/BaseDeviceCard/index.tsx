import { PropsWithChildren } from "react";
import { Flex, Text } from "@mantine/core";

import { palette } from "@/theme/palette";

type Props = {
  title: string;
} & PropsWithChildren;

function BaseDeviceCard({ children, title }: Props) {
  return (
    <Flex
      direction="column"
      mb={28}
      sx={{
        fontSize: "0.7rem",
        padding: "10px 15px 15px",
        borderRadius: "12px",
        backgroundColor: palette.whiteTransparentSecondary,
      }}
    >
      <Flex
        sx={{
          borderBottom: "3px solid white",
        }}
        justify="space-between"
        align="center"
        pb={6}
        mb={24}
      >
        <Text fw={500} size="0.8rem">
          {title}
        </Text>
      </Flex>

      {children}
    </Flex>
  );
}

export default BaseDeviceCard;
