import { Button, Flex, Group, Text, Progress, Box } from "@mantine/core";

import useDetailPortal from "@/hooks/useDetailPortal";
import ProfileCard from "@/components/ProfileCard";

import { FieldText } from "../styledComponents";
import { ImpactAssetProps } from "./props";

export default function Identifier({
  entity,
  collectionAssetsAmount,
}: ImpactAssetProps) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Identifier");
  const label = entity?.alsoKnownAs.split("}")[1];
  const orderNumberOfAsset = Number(label?.substring(1));
  const isShowProgress =
    !Number.isNaN(orderNumberOfAsset) && collectionAssetsAmount;

  const PortalChild = (
    <ProfileCard
      entity={entity}
      measure={
        <Box>
          {isShowProgress && (
            <Progress
              value={(orderNumberOfAsset / collectionAssetsAmount) * 100}
              mt="xl"
            />
          )}
          <Group spacing="4px" pt="xs">
            <Text>{collectionAssetsAmount}</Text>
            <Text color="dimmed" size="12px">
              clean cookstoves distributed
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
