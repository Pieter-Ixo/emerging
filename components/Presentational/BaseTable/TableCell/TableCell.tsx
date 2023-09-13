import { Text } from "@mantine/core";
import { PropsWithChildren } from "react";

import { palette } from "@/theme/palette";

export default function TableCell({
  children,
  isSelected,
  sortOrder,
  centerCells,
  isSortable,
}: PropsWithChildren<{
  isSelected?: boolean;
  centerCells?: boolean;
  sortOrder?: string;
  isSortable?: boolean;
}>) {
  const isSortOrderActive = sortOrder !== "default";
  return (
    <td
      style={{
        color:
          isSortOrderActive && isSortable
            ? palette.accentActive
            : palette.Black,
        backgroundColor: isSelected ? palette.Neutral200 : palette.White,
        cursor: "pointer",
        paddingLeft: 2,
      }}
    >
      <Text size="md" ta={centerCells ? "center" : "start"}>
        {children}
      </Text>
    </td>
  );
}
