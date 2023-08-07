import { Button, Flex, Group, Text, Box } from "@mantine/core";
import ProgressBar from "@/components/Presentational/ProgressBar";
import useDetailPortal from "@/hooks/useDetailPortal";
import ProfileCard from "@/components/Containers/ProfileCard";
import dateLocale from "@/utils/dateLocale";

import { FieldText } from "../styledComponents";
import { ImpactAssetProps } from "./props";

export default function Identifier({
  entity,
  collectionAssetsAmount,
  retired,
  claimable,
  totalTokenAmount,
  produced,
}: ImpactAssetProps) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Identifier");
  const label = entity?.alsoKnownAs.split("}")[1];

  const startDate = dateLocale(entity?.metadata.created);
  const price = entity?._profile?.metrics[0];

  const PortalChild = (
    <ProfileCard
      entity={entity}
      measure={
        <>
          <Box>
            <ProgressBar
              totalTokenAmount={totalTokenAmount}
              retired={retired}
              produced={produced}
            />
            <Group spacing="4px" pt="xs">
              <Text>{label}</Text>
              <Text color="dimmed" size="12px">
                of {collectionAssetsAmount}
              </Text>
            </Group>
          </Box>
          <Flex mt="md" direction="row" justify="space-between">
            <Text color="dimmed" size="12px" lh="100%">
              {startDate}
            </Text>
            {price && (
              <Text color="dimmed" size="12px" lh="100%">
                {`${price?.prefix} ${price?.metric}`}
              </Text>
            )}
          </Flex>
        </>
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