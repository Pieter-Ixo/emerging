import { palette } from "@/theme/palette";
import { Flex, Group, Progress, Text } from "@mantine/core";

export default function ProgressBar({
  retired,
  claimable,
  produced,
  isAssetView,
}) {
  if (
    Number.isNaN(Number(retired)) ||
    Number.isNaN(Number(claimable)) ||
    Number.isNaN(Number(produced))
  )
    return null;

  const progressBarTotal = retired + claimable + produced;
  const retiredPercent = (retired / progressBarTotal) * 100;
  const claimablePercent = (claimable / progressBarTotal) * 100;
  const producedPercent = (produced / progressBarTotal) * 100;

  const showClaimable = claimable && `${claimable.toLocaleString()} claimable`;

  return (
    <>
      <Group align="end">
        <Text size={isAssetView ? "22px" : "12px"} fw="500" lts="1.1px">
          {produced}
        </Text>
        <Text size="12px" fw="300" lts="0.6px">
          {isAssetView ? "CARBON produced" : "CARBON Credits Available"}
        </Text>
      </Group>

      <Progress
        size={isAssetView ? "xl" : "md"}
        sections={[
          { value: retiredPercent, color: palette.greenFull },
          { value: claimablePercent, color: palette.fullBlue },
          { value: producedPercent, color: palette.Black },
        ]}
      />
      <Group>
        <Flex>
          <Text size="12px" lts="0.6px" pr={5} color={palette.greenFull}>
            {isAssetView
              ? `${retired.toLocaleString()} retired`
              : `${retired.toLocaleString()} Offset`}
          </Text>
          {!isAssetView && (
            <Text size="12px" lts="0.6px" color={palette.Black}>
              / 3800 Produced
            </Text>
          )}
        </Flex>
        {isAssetView ? (
          <Text size="12px" lts="0.6px" color={palette.fullBlue}>
            {showClaimable}
          </Text>
        ) : null}
      </Group>
    </>
  );
}
