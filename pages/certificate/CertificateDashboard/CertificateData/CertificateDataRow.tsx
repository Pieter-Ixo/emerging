import { PropsWithChildren } from "react";
import { Flex, Text } from "@mantine/core";

import { palette } from "@/theme/palette";

export default function CertificateDataRow({
  rowName,
  children,
}: PropsWithChildren & { rowName: string }) {
  return (
    <Flex justify="space-between" align="center">
      <Text fw={400} size={13} color={palette.darkestBlue}>
        {rowName}
      </Text>
      <Text fw={400} size={13} color={palette.darkestBlue}>
        {children}
      </Text>
    </Flex>
  );
}
