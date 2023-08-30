import { Flex } from "@mantine/core";
import { PropsWithChildren } from "react";

import { palette } from "@/theme/palette";

export default function TableCell({
  children,
  isSelected,
  isActive,
  centerCells,
}: PropsWithChildren<{
  isActive?: boolean;
  isSelected?: boolean;
  centerCells?: boolean;
}>) {
  return (
    <td
      style={{
        color: isActive ? palette.lightBlue : palette.Black,
        backgroundColor: isSelected ? palette.Neutral200 : palette.White,
        cursor: "pointer",
        paddingLeft: 0,
      }}
    >
      <Flex
        sx={{
          fontSize: 16,
        }}
        justify={centerCells ? "center" : "flex-start"}
      >
        {children}
      </Flex>
    </td>
  );
}
