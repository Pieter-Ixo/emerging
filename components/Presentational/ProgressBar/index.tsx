import { palette } from "@/theme/palette";
import { Flex, Group, Progress, Text } from "@mantine/core";

type ProgressBarProps = {
  retired?: number;
  claimable?: number;
  produced?: number;
  totalTokenAmount?: number;
};

export default function ProgressBar({
  retired,
  claimable,
  produced,
  totalTokenAmount,
}: ProgressBarProps) {
  const progressBarTotal = (retired || 0) + (claimable || 0) + (produced || 0);
  const retiredPercent = ((retired || 0) / progressBarTotal) * 100;
  const claimablePercent = ((claimable || 0) / progressBarTotal) * 100;
  const producedPercent = ((produced || 0) / progressBarTotal) * 100;

  const showClaimable = claimable && `${claimable.toLocaleString()} claimable`;

  return (
    <>
      <Group align="end">
        <Text size={claimable ? "22px" : "12px"} fw="500" lts="1.1px">
          {totalTokenAmount || 0}
        </Text>
        <Text size="xs" fw="300" lts="0.6px">
          {claimable ? "CARBON produced" : "CARBON Credits Available"}
        </Text>
      </Group>

      <Progress
        size={claimable ? "xl" : "md"}
        sections={[
          { value: retiredPercent, color: palette.greenFull },
          { value: claimablePercent, color: palette.accentActive },
          { value: producedPercent, color: palette.Black },
        ]}
      />
      <Group>
        <Flex>
          <Text size="xs" lts="0.6px" pr={5} color={palette.greenFull}>
            {claimable
              ? `${retired?.toLocaleString()} retired`
              : `${retired?.toLocaleString()} Offset`}
          </Text>
          {!claimable && (
            <Text size="xs" lts="0.6px" color={palette.Black}>
              / {produced} Produced
            </Text>
          )}
        </Flex>
        {claimable ? (
          <Text size="xs" lts="0.6px" color={palette.accentActive}>
            {showClaimable}
          </Text>
        ) : null}
      </Group>
    </>
  );
}
