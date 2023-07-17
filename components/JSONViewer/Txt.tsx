import { PropsWithChildren } from "react";
import { TextProps, Text } from "@mantine/core";

import { palette } from "@/theme/palette";

export default function Txt({
  children,
  ...props
}: PropsWithChildren & TextProps) {
  return (
    <Text
      color={palette.darkestBlue}
      ff="RobotoCondensed"
      size="13px"
      lh="200%"
      lts="1.3px"
      style={{
        ...props.style,
        whiteSpace: "nowrap",
        alignContent: "left",
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Text>
  );
}
