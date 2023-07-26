import { palette } from "@/theme/palette";
import { Flex, Progress, Text } from "@mantine/core";

export default function BatchProgress({
  amount = 0,
  minted = 0,
  retired = 0,
}: {
  amount?: number;
  minted?: number;
  retired?: number;
}) {
  const amountString = amount.toLocaleString();
  const retiredString = retired.toLocaleString();
  const mintedString = minted.toLocaleString();
  const progresPercent = !retired || !minted ? 0 : (retired / minted) * 100;
  const isProgressComplete = retired === minted;
  const progressColor = isProgressComplete
    ? palette.greenFull
    : palette.fullBlue;

  const progressPaletteText = isProgressComplete
    ? palette.greenFull
    : palette.White;

  return (
    <Flex
      direction="column"
      sx={{
        flexGrow: 1,
      }}
    >
      <Flex gap={8} align="baseline">
        <Text
          color={palette.White}
          fw={600}
          sx={{ fontFamily: "Quicksand", fontSize: "40px" }}
        >
          {amountString}
        </Text>

        <Text
          color={palette.White}
          fw={700}
          sx={{ fontFamily: "Quicksand", fontSize: "18px" }}
          transform="uppercase"
        >
          carbon
        </Text>
      </Flex>

      <Progress
        radius="xl"
        size={14}
        value={progresPercent}
        sections={[{ value: progresPercent, color: progressPalette }]}
      />

      <Text c={progressPaletteText} fw={400} sx={{ fontSize: 13 }}>
        <Text span c={progressPalette} inherit>
          {retiredString} CARBON
        </Text>{" "}
        / {mintedString} CARBON offset
      </Text>
    </Flex>
  );
}
