import { palette } from "@/theme/palette";
import { BaseIconProps, IconProp } from "@/types/icons/baseIcon";
import { Box } from "@mantine/core";
import { useEffect, useState } from "react";

export type IconStatus = "selected" | "notSelected" | "disabled";

const initialTheme: Record<IconStatus, IconProp> = {
  selected: {
    stroke: palette.White,
    fill: palette.White,
    bgColor: palette.fullBlue,
  },
  notSelected: {
    stroke: palette.Black,
    fill: palette.Black,
    bgColor: palette.White,
  },
  disabled: {
    stroke: palette.Neutral800,
    fill: palette.Neutral500,
    bgColor: palette.White,
  },
};

function BaseIcon({
  status = "notSelected",
  Icon,
  theme = initialTheme,
  isPointer = false,
  isCursorDisabled = false,
  isStroke = false,
  variant = "default",
  ...svgProps
}: BaseIconProps) {
  const [selectedTheme, setSelectedTheme] = useState<any>(
    initialTheme.notSelected
  );

  useEffect(() => {
    setSelectedTheme({ ...initialTheme[status], ...theme[status] });
  }, [status, theme]);

  const cursorMode = () => {
    if (isCursorDisabled && isPointer) return "default";
    if (isCursorDisabled) return "not-allowed";
    if (isPointer) return "pointer";
    return "default";
  };

  if (variant === "default") {
    return (
      <Icon
        style={{
          cursor: cursorMode(),
        }}
        fill={selectedTheme.fill}
        stroke={isStroke ? selectedTheme.stroke : "none"}
        strokeWidth={1.25}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...svgProps}
      />
    );
  }

  return (
    <Box
      w={46}
      h={46}
      sx={{
        borderRadius: "50%",
        position: "relative",
        backgroundColor: selectedTheme.bgColor,
        cursor: cursorMode(),
      }}
    >
      <Icon
        style={{
          cursor: cursorMode(),
          transform: "translate(-50%, -50%)",
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
        fill={selectedTheme.fill}
        stroke={isStroke ? selectedTheme.stroke : "none"}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...svgProps}
      />
    </Box>
  );
}

export default BaseIcon;
