import { PropsWithChildren } from "react";
import { Flex, Image, Text } from "@mantine/core";

import { palette } from "@/theme/palette";

export default function DataPartTitle({
  children,
  iconsrc,
}: PropsWithChildren & { iconsrc: string }) {
  return (
    <Flex
      sx={{
        borderBottom: `1px solid ${palette.Black}`,
        paddingBottom: "8px",
        marginBottom: "8px",
      }}
      gap={8}
      align="center"
    >
      <Image width={24} height={24} src={iconsrc} alt="" />
      <Text
        fw={400}
        sx={{ fontSize: 13 }}
        color={palette.darkestBlue}
        transform="uppercase"
      >
        {children}
      </Text>
    </Flex>
  );
}
