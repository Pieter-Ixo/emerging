import { Button, Flex, Group, Text, Progress, Box } from "@mantine/core";

import { palette } from "@/theme/palette";
import useDetailPortal from "@/hooks/useDetailPortal";
import ProfileCard from "@/components/ProfileCard";

import { FieldText } from "../styledComponents";
import { ImpactAssetProps } from "./props";

function ProgressBar({ retired, claimable, produced }) {
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

export default function Identifier({
  entity,
  collectionAssetsAmount,
  retired,
  claimable,
  produced,
}: ImpactAssetProps) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Identifier");
  const label = entity?.alsoKnownAs.split("}")[1];

  const PortalChild = (
    <ProfileCard
      entity={entity}
      measure={
        <Box>
          <ProgressBar
            retired={retired}
            claimable={claimable}
            produced={produced}
          />
          <Group spacing="4px" pt="xs">
            <Text>{label}</Text>
            <Text color="dimmed" size="12px">
              of {collectionAssetsAmount}
            </Text>
          </Group>
        </Box>
      }
    />
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Identifier</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {label}
      </Button>
    </Flex>
  );
}
