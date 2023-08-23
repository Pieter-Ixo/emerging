import { Text } from "@mantine/core";
import { PropsWithChildren } from "react";

import { palette } from "@/theme/palette";

export default function TableCell({
  children,
  isActive,
}: PropsWithChildren<{ isActive: boolean }>) {
  return (
    <td
      style={{
        color: isActive ? palette.lightBlue : palette.Black,
        cursor: "pointer",
        paddingLeft: 2,
      }}
    >
      <Text size="md">{children}</Text>
    </td>
  );
}
