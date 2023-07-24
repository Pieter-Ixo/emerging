import { palette } from "@/theme/palette";
import { Box, Flex, Group, Progress, Text } from "@mantine/core";

export default function ProgressBar({ retired, claimable, produced }) {
  if (Number.isNaN(Number(retired)) || Number.isNaN(Number(produced)))
    return null;

  const isClaimableArrived = claimable && !Number.isNaN(Number(claimable));

  let claimablePercent = 0;
  let progressBarTotal = 0;

  progressBarTotal = retired + produced;

  if (isClaimableArrived) {
    progressBarTotal += claimable;
    claimablePercent = (claimable / progressBarTotal) * 100;
  }

  const retiredPercent = (retired / progressBarTotal) * 100;
  const producedPercent = (produced / progressBarTotal) * 100;

  const progressSections = [
    { value: retiredPercent, color: palette.greenFull },
    { value: producedPercent, color: palette.Black },
  ];

  if (isClaimableArrived) {
    progressSections.splice(1, 0, {
      value: claimablePercent,
      color: palette.fullBlue,
    });
  }

  const showClaimable = claimable && `${claimable.toLocaleString()} claimable`;

  return (
    <>
      <Group align="end">
        <Text size={isClaimableArrived ? "22px" : "12px"} fw="500" lts="1.1px">
          {produced}
        </Text>
        <Text size="12px" fw="300" lts="0.6px">
          {isClaimableArrived ? "CARBON produced" : "CARBON Credits Available"}
        </Text>
      </Group>

      <Progress
        size={isClaimableArrived ? "xl" : "md"}
        sections={progressSections}
      />
      <Group>
        <Flex>
          <Text size="12px" lts="0.6px" pr={5} color={palette.greenFull}>
            {isClaimableArrived
              ? `${retired.toLocaleString()} retired`
              : `1200 Offset`}
          </Text>
          {!isClaimableArrived && (
            <Text size="12px" lts="0.6px" color={palette.Black}>
              / 3800 Produced
            </Text>
          )}
        </Flex>
        <Text size="12px" lts="0.6px" color={palette.fullBlue}>
          {showClaimable}
        </Text>
      </Group>
    </>
  );
}
