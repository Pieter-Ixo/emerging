import { Flex, Text, Progress } from "@mantine/core";

import { palette } from "@/theme/palette";

// TODO: replace with BatchProgress
export default function OffsetProgres({
  offset,
  progress,
}: {
  offset?: number;
  progress?: number;
}) {
  const offsetString = offset?.toLocaleString?.() ?? 0;
  const progressString = progress?.toLocaleString?.() ?? 0;
  const progresPercent = !offset || !progress ? 0 : (progress / offset) * 100;

  return (
    <Flex direction="column">
      <Flex gap={8} align="baseline">
        <Text
          color={palette.White}
          fw={600}
          sx={{ fontFamily: "Quicksand", fontSize: "48px" }}
        >
          {progressString}
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
        sections={[{ value: progresPercent, color: palette.darkerBlue }]}
        sx={{ minWidth: 300 }}
      />

      <Text c={palette.White} fw={400} sx={{ fontSize: 13 }}>
        <Text span c={palette.darkerBlue} inherit>
          {offsetString} CARBON
        </Text>{" "}
        / {progressString} CARBON offset ( 1 CARBON = 1 kgCO₂)
      </Text>
    </Flex>
  );
}
