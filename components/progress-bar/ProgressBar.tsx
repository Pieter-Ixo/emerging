import { palette } from "@/theme/palette";
import { Group, Progress, Text } from "@mantine/core";

export default function ProgressBar({ retired, claimable, produced }) {
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

  return (
    <>
      <Group align="end">
        <Text size="22px" fw="500" lts="1.1px">
          {produced}
        </Text>
        <Text size="12px" fw="300" lts="0.6px">
          CARBON produced
        </Text>
      </Group>
      <Progress
        size="xl"
        sections={[
          { value: retiredPercent, color: palette.greenFull },
          { value: claimablePercent, color: palette.fullBlue },
          { value: producedPercent, color: palette.Black },
        ]}
      />
      <Group>
        <Text size="12px" lts="0.6px" color={palette.greenFull}>
          {retired.toLocaleString()} retired
        </Text>
        <Text size="12px" lts="0.6px" color={palette.fullBlue}>
          {claimable.toLocaleString()} claimable
        </Text>
      </Group>
    </>
  );
}
