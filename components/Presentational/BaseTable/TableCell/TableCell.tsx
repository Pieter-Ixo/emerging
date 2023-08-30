import { Text } from "@mantine/core";
import { PropsWithChildren } from "react";

import { palette } from "@/theme/palette";

export default function TableCell({
  children,
  isSelected,
  isActive,
}: PropsWithChildren<{ isActive: boolean; isSelected?: boolean }>) {
  return (
    <td
      style={{
        color: isActive ? palette.lightBlue : palette.Black,
        backgroundColor: isSelected ? palette.Neutral200 : palette.White,
        cursor: "pointer",
        paddingLeft: 2,
      }}
    >
      <Text size="md">{children}</Text>
    </td>
  );
}