import { palette } from "@/theme/palette";
import { Flex, Group, Progress, Text } from "@mantine/core";

type ProgressBarProps = {
  retired?: number;
  claimable?: number;
  produced?: number;
};

export default function ProgressBar({
  retired,
  claimable,
  produced,
}: ProgressBarProps) {
  if (Number.isNaN(Number(retired)) || Number.isNaN(Number(produced)))
    return null;

  const progressBarTotal = (retired || 0) + (claimable || 0) + (produced || 0);
  const retiredPercent = ((retired || 0) / progressBarTotal) * 100;
  const claimablePercent = ((claimable || 0) / progressBarTotal) * 100;
  const producedPercent = ((produced || 0) / progressBarTotal) * 100;

  const showClaimable = claimable && `${claimable.toLocaleString()} claimable`;

  return (
    <>
      <Group align="end">
        <Text size={claimable ? "22px" : "12px"} fw="500" lts="1.1px">
          {produced}
        </Text>
        <Text size="12px" fw="300" lts="0.6px">
          {claimable ? "CARBON produced" : "CARBON Credits Available"}
        </Text>
      </Group>

      <Progress
        size={claimable ? "xl" : "md"}
        sections={[
          { value: retiredPercent, color: palette.greenFull },
          { value: claimablePercent, color: palette.fullBlue },
          { value: producedPercent, color: palette.Black },
        ]}
      />
      <Group>
        <Flex>
          <Text size="12px" lts="0.6px" pr={5} color={palette.greenFull}>
            {claimable
              ? `${retired?.toLocaleString()} retired`
              : `${retired?.toLocaleString()} Offset`}
          </Text>
          {!claimable && (
            <Text size="12px" lts="0.6px" color={palette.Black}>
              / 3800 Produced
            </Text>
          )}
        </Flex>
        {claimable ? (
          <Text size="12px" lts="0.6px" color={palette.fullBlue}>
            {showClaimable}
          </Text>
        ) : null}
      </Group>
    </>
  );
}
