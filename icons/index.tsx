import { palette } from "@/theme/palette";
import { Box } from "@mantine/core";
import { ElementType, SVGProps, useEffect, useState } from "react";

type Status = "selected" | "notSelected" | "disabled";
type IconProp = { stroke: string; fill: string; bgColor: string };

const initialTheme: Record<Status, IconProp> = {
  disabled: {
    stroke: palette.Neutral800,
    fill: palette.Neutral500,
    bgColor: palette.White,
  },
  selected: {
    stroke: palette.White,
    fill: palette.White,
    bgColor: palette.fullBlue,
  },
  notSelected: {
    stroke: palette.lightBlue,
    fill: palette.Black,
    bgColor: palette.White,
  },
};

type Props = SVGProps<SVGSVGElement> & {
  status: Status;
  Icon: ElementType;
  isStroke?: boolean;
  isCursor?: boolean;
  isBgCircle?: boolean;
};

function BaseIcon({
  status,
  Icon,
  isCursor = false,
  isStroke = false,
  isBgCircle = false,
  ...svgProps
}: Props) {
  const [selectedTheme, setSelectedTheme] = useState<any>(
    initialTheme.notSelected
  );

  useEffect(() => {
    setSelectedTheme(initialTheme[status]);
  }, [status]);

  if (!isBgCircle) {
    return (
      <Icon
        style={{
          cursor: isCursor ? "pointer" : "default",
        }}
        fill={selectedTheme.fill}
        stroke={isStroke ? selectedTheme.stroke : "none"}
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
        cursor: isCursor ? "pointer" : "default",
      }}
    >
      <Icon
        style={{
          cursor: isCursor ? "pointer" : "default",
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
