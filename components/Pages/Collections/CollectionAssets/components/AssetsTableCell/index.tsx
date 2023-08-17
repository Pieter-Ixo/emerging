import { palette } from "@/theme/palette";
import { Text } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function AssetsTableCell({
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
