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
    Neutral50: ["#FAFAFA"],
    Neutral100: ["#F8F8F8"],
    Neutral200: ["#F1F1F1"],
    Neutral500: ["#D7D7D7"],
    Neutral800: ["#9A9A9A"],
    Black: ["#000000"],
    White: ["#FFFFFF"],
    accentActive: ["#0EB8DC"],
    accentHover: ["#17C6EB"],
    accentLight: ["#ADEBF8"],
    redBright: ["#F9909E"],
    redFull: ["#E2223B"],
    redDark: ["#A11C43"],
    orangeFull: ["#ED9526"],
    orangeBright: ["#FDC681"],
    greenFull: ["#61B43A"],
    greenDarker: ["#47822b"],
    greenBright: ["#AAE38F"],
    transparent: ["rgba(255, 255, 255, 0)"],
    whiteTransparent: ["rgba(255, 255, 255, 0.30)"],
  },
};

export default mantineTheme;
