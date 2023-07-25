import { palette } from "@/theme/palette";
import { Flex, Progress, Text } from "@mantine/core";

export default function BatchProgress({
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
        sections={[{ value: progresPercent, color: palette.fullBlue }]}
      />

      <Text c={palette.White} fw={400} sx={{ fontSize: 13 }}>
        <Text span c={palette.fullBlue} inherit>
          {offsetString} CARBON
        </Text>{" "}
        / {progressString} CARBON offset
      </Text>
    </Flex>
  );
}
