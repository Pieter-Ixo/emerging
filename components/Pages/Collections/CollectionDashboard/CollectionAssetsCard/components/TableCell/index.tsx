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
        backgroundColor: isActive ? "#F8F8F8" : "inherit",
      }}
    >
      {children}
    </td>
  );
}
