export const palette = {
  // Neutral
  Neutral50: "#FAFAFA",
  Neutral100: "#F8F8F8",
  Neutral200: "#F1F1F1",
  Neutral500: "#D7D7D7",
  Neutral800: "#9A9A9A",
  Black: "#000000",
  White: "#FFFFFF",
  // EmergingBlue
  accentActive: "#2B84A3",
  accentHover: "#3696B8",
  accentLight: "#84C8DF",
  darkestBlue: "#000000",
  // Highlights
  redBright: "#F9909E",
  redFull: "#E2223B",
  redDark: "#A11C43",
  orangeFull: "#ED9526",
  orangeBright: "#FDC681",
  greenFull: "#61B43A",
  greenDarker: "#47822b",
  greenBright: "#AAE38F",
  // Transparents
  transparent: "rgba(255, 255, 255, 0)",
  whiteTransparent: "rgba(255, 255, 255, 0.30)",
  whiteTransparentSecondary: "rgba(255, 255, 255, 0.65)",
};

export const shadow = {
  default: "0px 0px 24px rgba(0, 0, 0, 0.15)",
};

export const limeByOpacity = (rate: number) => `rgba(97, 180, 58, ${rate})`;
export const accentActiveByOpacity = (rate: number) =>
  `rgba(43, 132, 163, ${rate})`;
