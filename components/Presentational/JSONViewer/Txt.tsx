import { PropsWithChildren, forwardRef } from "react";
import { TextProps, Text } from "@mantine/core";

import { palette } from "@/theme/palette";

const Txt = forwardRef<any, PropsWithChildren<TextProps>>((props, ref) => (
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
    ref={ref}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    {props.children}
  </Text>
));

Txt.displayName = "Txt";

export default Txt;
