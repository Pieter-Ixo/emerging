import { MantineThemeOverride } from "@mantine/core";

const mantineTheme: MantineThemeOverride = {
  fontFamily: "RobotoCondensed",
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "40px",
    xl: "56px",
  },
  headings: {
    sizes: {
      h1: { fontSize: "56px" },
      h2: { fontSize: "40px" },
      h3: { fontSize: "32px" },
      h4: { fontSize: "24px" },
    },
  },
  colors: {
    FullBlue: [
      "#CEDCEA",
      "#ACC9E3",
      "#88B7E3",
      "#2B94F5",
      "#5297D7",
      "#4988C2",
      "#487AA8",
      "#4A6E8F",
      "#49627A",
      "#46586A",
    ],
    GreenFull: [
      "#95B885",
      "#83B46C",
      "#71B650",
      "#61B43A",
      "#5B973F",
      "#558041",
      "#4F6E40",
      "#485E3E",
      "#42523A",
      "#3C4837",
    ],
    White: [
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
    ],
    Grey: [
      "#F8F8F8",
      "#F8F8F8",
      "#D7D7D7",
      "#F8F8F8",
      "#F8F8F8",
      "#F8F8F8",
      "#F8F8F8",
      "#F8F8F8",
      "#F8F8F8",
      "#F8F8F8",
    ],
  },
};

export default mantineTheme;
